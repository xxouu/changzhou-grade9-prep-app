export const STORAGE_KEY = "changzhou-grade9-preview-progress-v1";

export function createDefaultProgress(today = getTodayString()) {
  return {
    startedOn: today,
    lastStudiedOn: today,
    streak: 0,
    completedActivities: [],
    flashcards: {},
    knowledgeCards: {},
    retrievalCards: {},
    microDrills: {},
    examTargets: {},
    studyOutputs: {},
    glossaryItems: {},
    previewWorkflowSteps: {},
    reflectionSteps: {},
    dictationWords: {},
    writingMissions: {},
    selfChecks: {},
    chapterMastery: {},
    scienceObservations: {},
    entryDiagnostics: {},
    mathAttempts: {},
    mathMistakes: [],
    mathTierProgress: {},
    quickCheckAttempts: {},
    quickCheckMistakes: [],
    grammarAttempts: {},
    grammarMastery: {},
    grammarMistakes: [],
    translationAttempts: {},
    translationMistakes: [],
    practiceAttempts: {},
    practiceMistakes: [],
    weakTags: [],
    quizScores: {},
  };
}

export function loadProgress(storage = globalThis.localStorage, today = getTodayString()) {
  if (!storage) return createDefaultProgress(today);

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return createDefaultProgress(today);

  try {
    return { ...createDefaultProgress(today), ...JSON.parse(raw) };
  } catch {
    return createDefaultProgress(today);
  }
}

export function saveProgress(storage = globalThis.localStorage, progress) {
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getVisibleActivities(curriculum, subjectId, mode = "child") {
  const activities = curriculum[subjectId]?.activities ?? [];
  if (mode === "reviewer") return activities;
  return activities.filter((activity) => activity.reviewStatus === "approved");
}

export function getTodayPlan(curriculum, progress, mode = "child") {
  const subjectIds = ["english", "math", "chinese", "physics", "chemistry"];
  const picks = subjectIds
    .map((subjectId) => {
      const activities = getVisibleActivities(curriculum, subjectId, mode);
      const preferred = activities.find((activity) => !progress.completedActivities.includes(activity.id));
      return preferred ?? activities[0];
    })
    .filter(Boolean);

  return trimPlanToWindow(picks, subjectIds, curriculum, progress, mode, 20, 30);
}

export function getAdaptivePreviewSession(curriculum, progress) {
  const steps = [];
  const reviewQueue = getCrossSubjectReviewQueue(curriculum, progress, 3);
  const wordMission = getEnglishDailyWordMission(curriculum, progress);
  const grammarQueue = getGrammarReviewQueue(curriculum, progress, 3);
  const knowledgeQueue = getKnowledgeReviewQueue(curriculum, progress, 5);
  const quickQueue = getQuickCheckPracticeQueue(curriculum, progress, 10);
  const dictationQueue = getDictationReviewQueue(curriculum, progress, 4);
  const writingQueue = getWritingMissionQueue(curriculum, progress, 2);
  const mathAdvice = getMathLearningAdvice(curriculum, progress);

  const firstReview = reviewQueue[0];
  if (firstReview) {
    steps.push({
      id: `session-correction-${firstReview.id}`,
      kind: "correction",
      subject: firstReview.subject,
      subjectName: subjectName(curriculum, firstReview.subject),
      title: "先订正最高优先级错项",
      action: `${firstReview.title}：${firstReview.action}`,
      reason: "先处理不会和错题，能避免今天继续在同一个点上重复失分。",
      minutes: 5,
      targetId: firstReview.id,
      tags: [firstReview.title],
    });
  }

  steps.push({
    id: `session-memory-${wordMission.unitId}-${wordMission.day}`,
    kind: "memory",
    subject: "english",
    subjectName: curriculum.english.name,
    title: `${wordMission.unitTitle} Day ${wordMission.day}`,
    action: `背 ${wordMission.words.length} 个词/短语：${wordMission.words.map((word) => word.word).join("、")}`,
    reason: "先英文回忆中文，再反向中译英，避免只看着眼熟。",
    minutes: 6,
    targetId: wordMission.unitId,
    tags: ["英语词汇", wordMission.unitTitle],
  });

  const firstGrammar = grammarQueue[0];
  if (firstGrammar) {
    steps.push({
      id: `session-grammar-${firstGrammar.id}`,
      kind: "concept",
      subject: "english",
      subjectName: curriculum.english.name,
      title: `语法：${firstGrammar.title}`,
      action: `看例句后完成 1 道小测：${firstGrammar.quiz.question}`,
      reason: "语法用“例句 + 判断题”马上检查，比只读规则更稳。",
      minutes: 5,
      targetId: firstGrammar.id,
      tags: ["英语语法", firstGrammar.title],
    });
  }

  const firstKnowledge = knowledgeQueue.find((item) => item.subjectId !== "english") ?? knowledgeQueue[0];
  if (firstKnowledge) {
    steps.push({
      id: `session-knowledge-${firstKnowledge.id}`,
      kind: "concept",
      subject: firstKnowledge.subjectId,
      subjectName: firstKnowledge.subjectName,
      title: `知识卡：${firstKnowledge.concept}`,
      action: firstKnowledge.retrievalPrompt,
      reason: "用主动回忆检查概念，比重新浏览整课更省时间。",
      minutes: 4,
      targetId: firstKnowledge.id,
      tags: [firstKnowledge.concept, firstKnowledge.chapterTitle],
    });
  }

  const firstQuick = pickQuickPractice(quickQueue);
  if (firstQuick) {
    steps.push({
      id: `session-practice-${firstQuick.id}`,
      kind: "practice",
      subject: firstQuick.subject,
      subjectName: firstQuick.subjectName,
      title: `${firstQuick.subjectName}快测`,
      action: firstQuick.check.question,
      reason: firstQuick.status === "missed" ? "这题刚错过，趁热重做能修正判断路径。" : "用一道快测确认本课是否真的会迁移。",
      minutes: 5,
      targetId: firstQuick.id,
      tags: firstQuick.check.knowledgeTags ?? [],
    });
  }

  const firstDictation = dictationQueue[0];
  if (firstDictation) {
    steps.push({
      id: `session-dictation-${firstDictation.id}`,
      kind: "memory",
      subject: "chinese",
      subjectName: curriculum.chinese.name,
      title: `语文默写：${firstDictation.word}`,
      action: firstDictation.retrievalPrompt,
      reason: "每天少量默写，能把课文字词从“认识”推进到“会写”。",
      minutes: 4,
      targetId: firstDictation.id,
      tags: ["语文默写", firstDictation.lessonTitle],
    });
  }

  const totalBeforeWriting = sumMinutes(steps);
  const firstWriting = writingQueue[0];
  if (firstWriting && totalBeforeWriting <= 24) {
    steps.push({
      id: `session-writing-${firstWriting.id}`,
      kind: "output",
      subject: "chinese",
      subjectName: curriculum.chinese.name,
      title: `写作迁移：${firstWriting.lessonTitle}`,
      action: firstWriting.task,
      reason: "用短输出把阅读、字词和作文素材接起来，预习效果会更可见。",
      minutes: 5,
      targetId: firstWriting.id,
      tags: ["写作迁移", firstWriting.chapterTitle],
    });
  }

  const fittedSteps = fitSessionSteps(steps, 20, 30);
  return {
    title: "今日智能预习路线",
    totalMinutes: sumMinutes(fittedSteps),
    focusTags: unique([...(progress.weakTags ?? []), ...(mathAdvice.weakTags ?? []), mathAdvice.focus].filter(Boolean)).slice(0, 6),
    steps: fittedSteps,
  };
}

export function updateFlashcardProgress(progress, cardId, status, now = new Date().toISOString()) {
  const nextReview = {
    unknown: addDays(now, 1),
    fuzzy: addDays(now, 2),
    known: addDays(now, 5),
  }[status];

  return {
    ...progress,
    flashcards: {
      ...progress.flashcards,
      [cardId]: {
        status,
        reviewedAt: now,
        nextReviewAt: nextReview,
      },
    },
  };
}

export function getReviewQueue(flashcards, progress) {
  const weight = { unknown: 0, fuzzy: 1, new: 2, known: 3 };
  return [...flashcards].sort((a, b) => {
    const aState = progress.flashcards[a.id]?.status ?? "new";
    const bState = progress.flashcards[b.id]?.status ?? "new";
    if (weight[aState] !== weight[bState]) return weight[aState] - weight[bState];
    return a.word.localeCompare(b.word);
  });
}

export function getEnglishDailyWordMission(curriculum, progress) {
  const cardByUnitWord = new Map(
    curriculum.english.flashcards.map((card) => [`${card.unit}::${card.word}`, card]),
  );
  const units = curriculum.english.chapters ?? [];

  for (const unit of units) {
    for (const day of unit.dailyWords ?? []) {
      const words = day.words.map((word) => {
        const card = cardByUnitWord.get(`${unit.title}::${word.word}`);
        return {
          ...word,
          cardId: card?.id,
          status: card?.id ? (progress.flashcards?.[card.id]?.status ?? "new") : "new",
        };
      });

      if (words.some((word) => word.status !== "known")) {
        return buildEnglishDailyMission(unit, day, words);
      }
    }
  }

  const firstUnit = units[0];
  const firstDay = firstUnit?.dailyWords?.[0];
  const words = (firstDay?.words ?? []).map((word) => {
    const card = cardByUnitWord.get(`${firstUnit.title}::${word.word}`);
    return {
      ...word,
      cardId: card?.id,
      status: card?.id ? (progress.flashcards?.[card.id]?.status ?? "new") : "new",
    };
  });
  return buildEnglishDailyMission(firstUnit, firstDay, words);
}

export function updateKnowledgeCardProgress(progress, cardId, status, now = new Date().toISOString()) {
  const nextReview = {
    weak: addDays(now, 1),
    learning: addDays(now, 2),
    known: addDays(now, 6),
  }[status];

  return {
    ...progress,
    knowledgeCards: {
      ...(progress.knowledgeCards ?? {}),
      [cardId]: {
        status,
        reviewedAt: now,
        nextReviewAt: nextReview,
      },
    },
  };
}

export function updateRetrievalCardProgress(progress, cardId, status, now = new Date().toISOString()) {
  return {
    ...progress,
    retrievalCards: {
      ...(progress.retrievalCards ?? {}),
      [cardId]: {
        status,
        reviewedAt: now,
      },
    },
  };
}

export function getRetrievalDeckSummary(lesson, progress) {
  const cards = (lesson.retrievalDeck ?? []).map((card) => {
    const state = progress.retrievalCards?.[card.id];
    return {
      ...card,
      status: state?.status ?? "new",
      reviewedAt: state?.reviewedAt,
    };
  });
  const knownCount = cards.filter((card) => card.status === "known").length;
  const weakCount = cards.filter((card) => card.status === "weak").length;
  const learningCount = cards.filter((card) => card.status === "learning").length;

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    totalCount: cards.length,
    knownCount,
    weakCount,
    learningCount,
    percent: cards.length ? Math.round((knownCount / cards.length) * 100) : 0,
    cards,
  };
}

export function getRetrievalReviewQueue(curriculum, progress, limit = 12) {
  const weight = { weak: 0, learning: 1, new: 2, known: 3 };
  const cards = Object.entries(curriculum)
    .filter(([subjectId, subject]) => subjectId !== "meta" && Array.isArray(subject.chapters))
    .flatMap(([subjectId, subject]) =>
      subject.chapters.flatMap((chapter) =>
        chapter.lessons.flatMap((lesson) =>
          (lesson.retrievalDeck ?? []).map((card) => {
            const state = progress.retrievalCards?.[card.id];
            return {
              ...card,
              subject: subjectId,
              subjectName: subject.name,
              chapterTitle: chapter.title,
              lessonTitle: lesson.title,
              status: state?.status ?? "new",
              reviewedAt: state?.reviewedAt,
            };
          }),
        ),
      ),
    );

  return cards
    .sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      if ((a.reviewedAt ?? "") !== (b.reviewedAt ?? "")) {
        return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "");
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function updateMicroDrillProgress(progress, drillId, status, now = new Date().toISOString()) {
  return {
    ...progress,
    microDrills: {
      ...(progress.microDrills ?? {}),
      [drillId]: {
        status,
        reviewedAt: now,
      },
    },
  };
}

export function getMicroDrillSummary(lesson, progress) {
  const drills = (lesson.microDrills ?? []).map((drill) => {
    const state = progress.microDrills?.[drill.id];
    return {
      ...drill,
      status: state?.status ?? "new",
      reviewedAt: state?.reviewedAt,
    };
  });
  const doneCount = drills.filter((drill) => drill.status === "done").length;
  const weakCount = drills.filter((drill) => drill.status === "weak").length;
  const learningCount = drills.filter((drill) => drill.status === "learning").length;

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    totalCount: drills.length,
    doneCount,
    weakCount,
    learningCount,
    percent: drills.length ? Math.round((doneCount / drills.length) * 100) : 0,
    drills,
  };
}

export function getMicroDrillReviewQueue(curriculum, progress, limit = 12) {
  const weight = { weak: 0, learning: 1, new: 2, done: 3 };
  const drills = Object.entries(curriculum)
    .filter(([subjectId, subject]) => subjectId !== "meta" && Array.isArray(subject.chapters))
    .flatMap(([subjectId, subject]) =>
      subject.chapters.flatMap((chapter) =>
        chapter.lessons.flatMap((lesson) =>
          (lesson.microDrills ?? []).map((drill) => {
            const state = progress.microDrills?.[drill.id];
            return {
              ...drill,
              subject: subjectId,
              subjectName: subject.name,
              chapterTitle: chapter.title,
              lessonTitle: lesson.title,
              status: state?.status ?? "new",
              reviewedAt: state?.reviewedAt,
            };
          }),
        ),
      ),
    );

  return drills
    .sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      if ((a.reviewedAt ?? "") !== (b.reviewedAt ?? "")) {
        return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "");
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function updateExamTargetProgress(progress, targetId, status, now = new Date().toISOString()) {
  return {
    ...progress,
    examTargets: {
      ...(progress.examTargets ?? {}),
      [targetId]: {
        status,
        reviewedAt: now,
      },
    },
  };
}

export function getExamTargetSummary(lesson, progress) {
  const targets = (lesson.lessonExamTargets ?? []).map((target) => {
    const state = progress.examTargets?.[target.id];
    return {
      ...target,
      status: state?.status ?? "new",
      reviewedAt: state?.reviewedAt,
    };
  });
  const masteredCount = targets.filter((target) => target.status === "mastered").length;
  const weakCount = targets.filter((target) => target.status === "weak").length;
  const learningCount = targets.filter((target) => target.status === "learning").length;

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    totalCount: targets.length,
    masteredCount,
    weakCount,
    learningCount,
    percent: targets.length ? Math.round((masteredCount / targets.length) * 100) : 0,
    targets,
  };
}

export function getExamTargetReviewQueue(curriculum, progress, limit = 12) {
  const weight = { weak: 0, learning: 1, new: 2, mastered: 3 };
  const targets = Object.entries(curriculum)
    .filter(([subjectId, subject]) => subjectId !== "meta" && Array.isArray(subject.chapters))
    .flatMap(([subjectId, subject]) =>
      subject.chapters.flatMap((chapter) =>
        chapter.lessons.flatMap((lesson) =>
          (lesson.lessonExamTargets ?? []).map((target) => {
            const state = progress.examTargets?.[target.id];
            return {
              ...target,
              subject: subjectId,
              subjectName: subject.name,
              chapterTitle: chapter.title,
              lessonTitle: lesson.title,
              status: state?.status ?? "new",
              reviewedAt: state?.reviewedAt,
            };
          }),
        ),
      ),
    );

  return targets
    .sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      if ((a.reviewedAt ?? "") !== (b.reviewedAt ?? "")) {
        return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "");
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function updateStudyOutputProgress(progress, outputId, status, now = new Date().toISOString()) {
  return {
    ...progress,
    studyOutputs: {
      ...(progress.studyOutputs ?? {}),
      [outputId]: {
        status,
        reviewedAt: now,
      },
    },
  };
}

export function getStudyOutputSummary(lesson, progress) {
  const output = lesson.studyPacket?.output;
  const state = output?.id ? progress.studyOutputs?.[output.id] : undefined;
  const status = state?.status ?? "new";
  return {
    id: output?.id,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    task: output?.task ?? "",
    evidence: output?.evidence ?? "",
    status,
    done: status === "done",
    reviewedAt: state?.reviewedAt,
  };
}

export function getStudyOutputReviewQueue(curriculum, progress, limit = 12) {
  const weight = { weak: 0, learning: 1, new: 2, done: 3 };
  const outputs = Object.entries(curriculum)
    .filter(([subjectId, subject]) => subjectId !== "meta" && Array.isArray(subject.chapters))
    .flatMap(([subjectId, subject]) =>
      subject.chapters.flatMap((chapter) =>
        chapter.lessons
          .filter((lesson) => lesson.studyPacket?.output?.id)
          .map((lesson) => {
            const output = lesson.studyPacket.output;
            const state = progress.studyOutputs?.[output.id];
            return {
              id: output.id,
              subject: subjectId,
              subjectName: subject.name,
              chapterTitle: chapter.title,
              lessonTitle: lesson.title,
              task: output.task,
              evidence: output.evidence,
              status: state?.status ?? "new",
              reviewedAt: state?.reviewedAt,
            };
          }),
      ),
    );

  return outputs
    .sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      if ((a.reviewedAt ?? "") !== (b.reviewedAt ?? "")) {
        return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "");
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function updateGlossaryProgress(progress, itemId, status, now = new Date().toISOString()) {
  return {
    ...progress,
    glossaryItems: {
      ...(progress.glossaryItems ?? {}),
      [itemId]: {
        status,
        reviewedAt: now,
      },
    },
  };
}

export function getGlossarySummary(lesson, progress) {
  const items = (lesson.lessonGlossary ?? []).map((item) => {
    const state = progress.glossaryItems?.[item.id];
    return {
      ...item,
      status: state?.status ?? "new",
      reviewedAt: state?.reviewedAt,
    };
  });
  const knownCount = items.filter((item) => item.status === "known").length;
  const weakCount = items.filter((item) => item.status === "weak").length;
  const learningCount = items.filter((item) => item.status === "learning").length;

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    totalCount: items.length,
    knownCount,
    weakCount,
    learningCount,
    percent: items.length ? Math.round((knownCount / items.length) * 100) : 0,
    items,
  };
}

export function getGlossaryReviewQueue(curriculum, progress, limit = 12) {
  const weight = { weak: 0, learning: 1, new: 2, known: 3 };
  const items = Object.entries(curriculum)
    .filter(([subjectId, subject]) => subjectId !== "meta" && Array.isArray(subject.chapters))
    .flatMap(([subjectId, subject]) =>
      subject.chapters.flatMap((chapter) =>
        chapter.lessons.flatMap((lesson) =>
          (lesson.lessonGlossary ?? []).map((item) => {
            const state = progress.glossaryItems?.[item.id];
            return {
              ...item,
              subject: subjectId,
              subjectName: subject.name,
              chapterTitle: chapter.title,
              lessonTitle: lesson.title,
              status: state?.status ?? "new",
              reviewedAt: state?.reviewedAt,
            };
          }),
        ),
      ),
    );

  return items
    .sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      if ((a.reviewedAt ?? "") !== (b.reviewedAt ?? "")) {
        return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "");
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function updatePreviewWorkflowProgress(progress, stepId, status, now = new Date().toISOString()) {
  return {
    ...progress,
    previewWorkflowSteps: {
      ...(progress.previewWorkflowSteps ?? {}),
      [stepId]: {
        status,
        reviewedAt: now,
      },
    },
  };
}

export function getPreviewWorkflowSummary(lesson, progress) {
  const steps = (lesson.previewWorkflow ?? []).map((step, index) => {
    const id = step.id ?? `${lesson.id}-workflow-${step.kind ?? "step"}-${index + 1}`;
    const state = progress.previewWorkflowSteps?.[id];
    return {
      ...step,
      id,
      status: state?.status ?? "new",
      reviewedAt: state?.reviewedAt,
    };
  });
  const doneCount = steps.filter((step) => step.status === "done").length;
  const stuckCount = steps.filter((step) => step.status === "stuck").length;
  const learningCount = steps.filter((step) => step.status === "learning").length;

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    totalCount: steps.length,
    doneCount,
    stuckCount,
    learningCount,
    percent: steps.length ? Math.round((doneCount / steps.length) * 100) : 0,
    totalMinutes: steps.reduce((sum, step) => sum + step.minutes, 0),
    steps,
  };
}

export function getPreviewWorkflowReviewQueue(curriculum, progress, limit = 12) {
  const weight = { stuck: 0, learning: 1, new: 2, done: 3 };
  const steps = Object.entries(curriculum)
    .filter(([subjectId, subject]) => subjectId !== "meta" && Array.isArray(subject.chapters))
    .flatMap(([subjectId, subject]) =>
      subject.chapters.flatMap((chapter) =>
        chapter.lessons.flatMap((lesson) =>
          (lesson.previewWorkflow ?? []).map((step, index) => {
            const id = step.id ?? `${lesson.id}-workflow-${step.kind ?? "step"}-${index + 1}`;
            const state = progress.previewWorkflowSteps?.[id];
            return {
              ...step,
              id,
              subject: subjectId,
              subjectName: subject.name,
              chapterTitle: chapter.title,
              lessonTitle: lesson.title,
              status: state?.status ?? "new",
              reviewedAt: state?.reviewedAt,
            };
          }),
        ),
      ),
    );

  return steps
    .sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      if ((a.reviewedAt ?? "") !== (b.reviewedAt ?? "")) {
        return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "");
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function updateReflectionStepProgress(progress, stepId, status, now = new Date().toISOString()) {
  return {
    ...progress,
    reflectionSteps: {
      ...(progress.reflectionSteps ?? {}),
      [stepId]: {
        status,
        reviewedAt: now,
      },
    },
  };
}

export function getReflectionStepSummary(lesson, progress) {
  const steps = (lesson.reflectionCoach?.correctionSteps ?? []).map((step, index) => {
    const id = step.id ?? `${lesson.id}-reflection-${index + 1}`;
    const text = step.text ?? String(step);
    const state = progress.reflectionSteps?.[id];
    return {
      id,
      text,
      status: state?.status ?? "new",
      reviewedAt: state?.reviewedAt,
    };
  });
  const doneCount = steps.filter((step) => step.status === "done").length;
  const stuckCount = steps.filter((step) => step.status === "stuck").length;
  const learningCount = steps.filter((step) => step.status === "learning").length;

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    totalCount: steps.length,
    doneCount,
    stuckCount,
    learningCount,
    percent: steps.length ? Math.round((doneCount / steps.length) * 100) : 0,
    steps,
  };
}

export function getReflectionStepReviewQueue(curriculum, progress, limit = 12) {
  const weight = { stuck: 0, learning: 1, new: 2, done: 3 };
  const steps = Object.entries(curriculum)
    .filter(([subjectId, subject]) => subjectId !== "meta" && Array.isArray(subject.chapters))
    .flatMap(([subjectId, subject]) =>
      subject.chapters.flatMap((chapter) =>
        chapter.lessons.flatMap((lesson) =>
          (lesson.reflectionCoach?.correctionSteps ?? []).map((step, index) => {
            const id = step.id ?? `${lesson.id}-reflection-${index + 1}`;
            const state = progress.reflectionSteps?.[id];
            return {
              id,
              text: step.text ?? String(step),
              subject: subjectId,
              subjectName: subject.name,
              chapterTitle: chapter.title,
              lessonTitle: lesson.title,
              weakPoint: lesson.reflectionCoach?.weakPoint,
              status: state?.status ?? "new",
              reviewedAt: state?.reviewedAt,
            };
          }),
        ),
      ),
    );

  return steps
    .sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      if ((a.reviewedAt ?? "") !== (b.reviewedAt ?? "")) {
        return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "");
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function getKnowledgeReviewQueue(curriculum, progress, limit = 6) {
  const weight = { weak: 0, learning: 1, new: 2, known: 3 };
  const cards = Object.entries(curriculum)
    .filter(([subjectId, subject]) => subjectId !== "meta" && Array.isArray(subject.chapters))
    .flatMap(([subjectId, subject]) =>
      subject.chapters.flatMap((chapter) =>
        chapter.lessons.flatMap((lesson) =>
          (lesson.knowledgeCards ?? []).map((card) => {
            const state = progress.knowledgeCards?.[card.id];
            return {
              ...card,
              subjectId,
              subjectName: subject.name,
              chapterTitle: chapter.title,
              lessonTitle: lesson.title,
              status: state?.status ?? "new",
              reviewedAt: state?.reviewedAt,
            };
          }),
        ),
      ),
    );

  return cards
    .sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      if ((a.reviewedAt ?? "") !== (b.reviewedAt ?? "")) {
        return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "");
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function getChapterKnowledgeChecklist(curriculum, subjectId, chapterId, progress) {
  const subject = curriculum[subjectId];
  const chapter = subject?.chapters?.find((item) => item.id === chapterId);
  if (!subject || !chapter) {
    return {
      subject: subjectId,
      subjectName: subject?.name ?? subjectId,
      chapterId,
      chapterTitle: "",
      knownCount: 0,
      totalCount: 0,
      percent: 0,
      items: [],
      lessonGroups: [],
    };
  }

  const lessonGroups = chapter.lessons.map((lesson) => {
    const lessonItems = (lesson.knowledgeCards ?? []).map((card) => {
      const state = progress.knowledgeCards?.[card.id];
      return {
        ...card,
        lessonTitle: lesson.title,
        status: state?.status ?? "new",
        reviewedAt: state?.reviewedAt,
      };
    });

    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      knownCount: lessonItems.filter((item) => item.status === "known").length,
      totalCount: lessonItems.length,
      items: lessonItems,
    };
  });
  const items = lessonGroups.flatMap((group) => group.items);
  const knownCount = items.filter((item) => item.status === "known").length;
  const weight = { weak: 0, learning: 1, new: 2, known: 3 };

  const sortedItems = [...items].sort((a, b) => {
    if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
    return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "") || a.id.localeCompare(b.id);
  });

  return {
    subject: subjectId,
    subjectName: subject.name,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    knownCount,
    totalCount: items.length,
    percent: items.length ? Math.round((knownCount / items.length) * 100) : 0,
    items: sortedItems,
    lessonGroups,
  };
}

export function getSubjectKnowledgeBank(curriculum, subjectId, progress) {
  const subject = curriculum[subjectId];
  if (!subject?.chapters) {
    return {
      subject: subjectId,
      subjectName: subject?.name ?? subjectId,
      knownCount: 0,
      totalCount: 0,
      percent: 0,
      items: [],
    };
  }

  const items = subject.chapters.flatMap((chapter) =>
    chapter.lessons.flatMap((lesson) =>
      (lesson.knowledgeCards ?? []).map((card) => {
        const state = progress.knowledgeCards?.[card.id];
        return {
          ...card,
          subjectId,
          subjectName: subject.name,
          chapterTitle: chapter.title,
          lessonTitle: lesson.title,
          status: state?.status ?? "new",
          reviewedAt: state?.reviewedAt,
        };
      }),
    ),
  );
  const knownCount = items.filter((item) => item.status === "known").length;
  const weight = { weak: 0, learning: 1, new: 2, known: 3 };

  return {
    subject: subjectId,
    subjectName: subject.name,
    knownCount,
    totalCount: items.length,
    percent: items.length ? Math.round((knownCount / items.length) * 100) : 0,
    items: items.sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "") || a.id.localeCompare(b.id);
    }),
  };
}

export function filterSubjectKnowledgeBank(bank, { query = "", status = "all" } = {}) {
  const normalizedQuery = query.trim().toLowerCase();
  const items = bank.items.filter((item) => {
    const matchesStatus =
      status === "all" ||
      (status === "unmastered" ? item.status !== "known" : item.status === status);
    if (!matchesStatus) return false;
    if (!normalizedQuery) return true;

    return [
      item.concept,
      item.explanation,
      item.examCue,
      item.trap,
      item.retrievalPrompt,
      item.chapterTitle,
      item.lessonTitle,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });
  const knownCount = items.filter((item) => item.status === "known").length;

  return {
    ...bank,
    knownCount,
    totalCount: items.length,
    percent: items.length ? Math.round((knownCount / items.length) * 100) : 0,
    items,
  };
}

export function updateDictationProgress(progress, wordId, status, now = new Date().toISOString()) {
  const nextReview = {
    weak: addDays(now, 1),
    learning: addDays(now, 2),
    known: addDays(now, 5),
  }[status];

  return {
    ...progress,
    dictationWords: {
      ...(progress.dictationWords ?? {}),
      [wordId]: {
        status,
        reviewedAt: now,
        nextReviewAt: nextReview,
      },
    },
  };
}

export function updateWritingMissionProgress(progress, missionId, status, now = new Date().toISOString(), selfAssessment = {}) {
  const criteria = ["evidence", "structure", "language"];
  const normalizedAssessment = Object.fromEntries(
    criteria.map((criterion) => [criterion, Boolean(selfAssessment[criterion])]),
  );
  const weakCriteria = criteria.filter((criterion) => normalizedAssessment[criterion] === false);

  return {
    ...progress,
    writingMissions: {
      ...(progress.writingMissions ?? {}),
      [missionId]: {
        status,
        completedAt: now,
        selfAssessment: {
          ...normalizedAssessment,
          weakCriteria,
        },
      },
    },
  };
}

export function updateScienceObservationProgress(progress, observationId, status, now = new Date().toISOString()) {
  const nextReview = {
    weak: addDays(now, 1),
    learning: addDays(now, 2),
    known: addDays(now, 5),
  }[status];

  return {
    ...progress,
    scienceObservations: {
      ...(progress.scienceObservations ?? {}),
      [observationId]: {
        status,
        reviewedAt: now,
        nextReviewAt: nextReview,
      },
    },
  };
}

export function getWritingMissionQueue(curriculum, progress, limit = 6) {
  const missions = (curriculum.chinese.chapters ?? []).flatMap((chapter) =>
    chapter.lessons
      .filter((lesson) => lesson.writingTask)
      .map((lesson) => {
        const id = `${lesson.id}-writing`;
        const state = progress.writingMissions?.[id];
        return {
          id,
          subject: "chinese",
          chapterTitle: chapter.title,
          lessonTitle: lesson.title,
          task: lesson.writingTask,
          status: state?.status ?? "new",
          completedAt: state?.completedAt,
          selfAssessment: state?.selfAssessment ?? { weakCriteria: [] },
        };
      }),
  );

  return missions
    .sort((a, b) => {
      const weight = { new: 0, done: 1 };
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      return (a.completedAt ?? "").localeCompare(b.completedAt ?? "") || a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function getChineseDailyLessonMission(curriculum, progress) {
  const lessons = (curriculum.chinese.chapters ?? []).flatMap((chapter) =>
    chapter.lessons.map((lesson) => {
      const writingId = `${lesson.id}-writing`;
      const state = progress.writingMissions?.[writingId];
      return {
        chapter,
        lesson,
        writingId,
        status: state?.status ?? "new",
        completedAt: state?.completedAt,
        selfAssessment: state?.selfAssessment ?? { evidence: true, structure: true, language: true, weakCriteria: [] },
      };
    }),
  );
  const pick = lessons.find((item) => item.status !== "done") ?? lessons[0];
  const practice = pick.lesson.literacyPractice;
  const dictationWords = practice?.dictation?.words?.length
    ? practice.dictation.words
    : (pick.lesson.dictationWords ?? []).slice(0, 6);
  const readingPrompt = practice?.reading?.prompt ?? pick.lesson.readingQuestions?.[0] ?? "写出本课阅读问题的文本依据。";
  const readingCheck = practice?.reading?.check ?? "答案必须包含文本依据、关键词或原文词句。";
  const writingTask = practice?.writing?.prompt ?? pick.lesson.writingTask ?? "完成 60-80 字批注或仿写。";
  const writingCheck = practice?.writing?.check ?? "输出要包含表达方法、文本依据或仿写痕迹。";

  return {
    subject: "chinese",
    chapterId: pick.chapter.id,
    chapterTitle: pick.chapter.title,
    lessonId: pick.lesson.id,
    lessonTitle: pick.lesson.title,
    status: pick.status,
    selfAssessment: pick.selfAssessment,
    dictation: {
      words: dictationWords,
      prompt: practice?.dictation?.prompt ?? `遮住答案默写：${dictationWords.slice(0, 4).join("、")}。`,
      checkRule: practice?.dictation?.check ?? "检查字形、偏旁、易混音，再把错字单独重写 2 遍。",
    },
    reading: {
      prompt: readingPrompt,
      checkRule: readingCheck,
      output: practice?.reading?.output ?? "写出“观点 + 文本依据 + 分析”的三句话答案。",
    },
    writing: {
      id: pick.writingId,
      task: writingTask,
      checkRule: writingCheck,
      output: practice?.writing?.output ?? "完成 60-80 字片段，并圈出 1 个可迁移的表达方法。",
    },
  };
}

export function getDictationReviewQueue(curriculum, progress, limit = 8) {
  const weight = { weak: 0, learning: 1, new: 2, known: 3 };
  const words = (curriculum.chinese.chapters ?? []).flatMap((chapter) =>
    chapter.lessons.flatMap((lesson) =>
      (lesson.dictationWords ?? []).map((word, index) => {
        const id = `${lesson.id}-dictation-${index + 1}`;
        const state = progress.dictationWords?.[id];
        return {
          id,
          subject: "chinese",
          word,
          chapterTitle: chapter.title,
          lessonTitle: lesson.title,
          status: state?.status ?? "new",
          reviewedAt: state?.reviewedAt,
          retrievalPrompt: `先遮住答案默写“${word}”，再说出它在《${stripLessonNumber(lesson.title)}》预习中的含义或语境。`,
        };
      }),
    ),
  );

  return words
    .sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      if ((a.reviewedAt ?? "") !== (b.reviewedAt ?? "")) {
        return (a.reviewedAt ?? "").localeCompare(b.reviewedAt ?? "");
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function getCrossSubjectReviewQueue(curriculum, progress, limit = 8) {
  const wordItems = uniqueReviewItemsByKey(curriculum.english.flashcards
    .filter((card) => ["unknown", "fuzzy"].includes(progress.flashcards[card.id]?.status))
    .map((card) => {
      const status = progress.flashcards[card.id].status;
      return {
        id: `word-${card.id}`,
        dedupeKey: `word-${normalizeReviewKey(card.word)}-${normalizeReviewKey(card.meaning)}`,
        type: "word",
        subject: "english",
        title: card.word,
        detail: `${card.meaning} · ${status === "unknown" ? "不会" : "模糊"}`,
        priority: status === "unknown" ? 1 : 2,
        createdAt: progress.flashcards[card.id].reviewedAt,
        action: status === "unknown" ? "先中译英，再造句" : "快速回忆后听写",
      };
    }));

  const dictationItems = getDictationReviewQueue(curriculum, progress, 100)
    .filter((item) => ["weak", "learning"].includes(item.status))
    .map((item) => ({
      id: `dictation-${item.id}`,
      type: "dictation",
      subject: "chinese",
      title: item.word,
      detail: `${item.chapterTitle} · ${item.lessonTitle} · ${item.status === "weak" ? "不会写" : "再练"}`,
      priority: item.status === "weak" ? 1 : 2,
      createdAt: item.reviewedAt,
      action: `重写默写：${item.retrievalPrompt}`,
    }));

  const retrievalItems = getRetrievalReviewQueue(curriculum, progress, 100)
    .filter((item) => ["weak", "learning"].includes(item.status))
    .map((item) => ({
      id: `retrieval-${item.id}`,
      type: "retrieval",
      subject: item.subject,
      title: `${item.level}：${item.prompt}`,
      detail: `${item.chapterTitle} · ${item.lessonTitle} · ${item.status === "weak" ? "回忆不稳" : "再练"}`,
      priority: item.status === "weak" ? 1 : 2,
      createdAt: item.reviewedAt,
      action: `合上资料重答：${item.checkRule}；${item.nextAction}`,
    }));

  const microDrillItems = getMicroDrillReviewQueue(curriculum, progress, 100)
    .filter((item) => ["weak", "learning"].includes(item.status))
    .map((item) => ({
      id: `micro-drill-${item.id}`,
      type: "micro-drill",
      subject: item.subject,
      title: `${item.method}：${item.task}`,
      detail: `${item.chapterTitle} · ${item.lessonTitle} · ${item.status === "weak" ? "不稳" : "再练"}`,
      priority: item.status === "weak" ? 1 : 2,
      createdAt: item.reviewedAt,
      action: `重做微练习：${item.success}`,
    }));

  const examTargetItems = getExamTargetReviewQueue(curriculum, progress, 100)
    .filter((item) => ["weak", "learning"].includes(item.status))
    .map((item) => ({
      id: `exam-target-${item.id}`,
      type: "exam-target",
      subject: item.subject,
      title: `${item.questionType}：${item.point}`,
      detail: `${item.chapterTitle} · ${item.lessonTitle} · ${item.status === "weak" ? "考点不稳" : "再练"}`,
      priority: item.status === "weak" ? 1 : 2,
      createdAt: item.reviewedAt,
      action: `按考点重做：${item.answerMove}；证据：${item.evidence}`,
    }));

  const studyOutputItems = getStudyOutputReviewQueue(curriculum, progress, 100)
    .filter((item) => ["weak", "learning"].includes(item.status))
    .map((item) => ({
      id: `study-output-${item.id}`,
      type: "study-output",
      subject: item.subject,
      title: `本课输出：${item.lessonTitle}`,
      detail: `${item.chapterTitle} · ${item.status === "weak" ? "输出不稳" : "再补一次"}`,
      priority: item.status === "weak" ? 1 : 2,
      createdAt: item.reviewedAt,
      action: `重做输出：${item.task}；证据：${item.evidence}`,
    }));

  const glossaryItems = getGlossaryReviewQueue(curriculum, progress, 100)
    .filter((item) => ["weak", "learning"].includes(item.status))
    .map((item) => ({
      id: `glossary-${item.id}`,
      type: "glossary",
      subject: item.subject,
      title: item.term,
      detail: `${item.chapterTitle} · ${item.lessonTitle} · ${item.status === "weak" ? "不熟" : "再练"}`,
      priority: item.status === "weak" ? 1 : 2,
      createdAt: item.reviewedAt,
      action: `重过必会项：${item.checkPrompt}`,
    }));

  const previewStepItems = getPreviewWorkflowReviewQueue(curriculum, progress, 100)
    .filter((item) => ["stuck", "learning"].includes(item.status))
    .map((item) => ({
      id: `preview-step-${item.id}`,
      type: "preview-step",
      subject: item.subject,
      title: `${item.title}：${item.lessonTitle}`,
      detail: `${item.chapterTitle} · ${item.status === "stuck" ? "卡住" : "再做"}`,
      priority: item.status === "stuck" ? 1 : 2,
      createdAt: item.reviewedAt,
      action: `重做流程：${item.action}；证据：${item.evidence}`,
    }));

  const reflectionStepItems = getReflectionStepReviewQueue(curriculum, progress, 100)
    .filter((item) => ["stuck", "learning"].includes(item.status))
    .map((item) => ({
      id: `reflection-step-${item.id}`,
      type: "reflection-step",
      subject: item.subject,
      title: item.text,
      detail: `${item.chapterTitle} · ${item.lessonTitle} · ${item.status === "stuck" ? "订正卡住" : "再订一次"}`,
      priority: item.status === "stuck" ? 1 : 2,
      createdAt: item.reviewedAt,
      action: `继续订正：${item.text}；错因：${item.weakPoint}`,
    }));

  const writingCriterionLabels = {
    evidence: "文本依据",
    structure: "结构",
    language: "语言",
  };
  const writingItems = getWritingMissionQueue(curriculum, progress, 100)
    .filter((item) => item.status === "done" && item.selfAssessment?.weakCriteria?.length)
    .map((item) => {
      const weakLabels = item.selfAssessment.weakCriteria.map((criterion) => writingCriterionLabels[criterion] ?? criterion);
      return {
        id: `writing-${item.id}-${item.completedAt}`,
        type: "writing",
        subject: "chinese",
        title: `写作复盘：${item.lessonTitle}`,
        detail: `${item.chapterTitle} · 待改：${weakLabels.join("、")}`,
        priority: 2,
        createdAt: item.completedAt,
        action: `修改复盘：补 ${weakLabels.join("、")}，再把片段重写一遍。`,
      };
    });

  const scienceObservationItems = ["physics", "chemistry"].flatMap((subjectId) => {
    const subject = curriculum[subjectId];
    return (subject?.chapters ?? []).flatMap((chapter) =>
      chapter.lessons
        .map((lesson) => {
          const observationId = `${subjectId}-${lesson.id}-observation`;
          const state = progress.scienceObservations?.[observationId];
          if (!["weak", "learning"].includes(state?.status)) return undefined;
          const observationText = lesson.experiment || lesson.safety || lesson.keyPoints?.[1] || lesson.title;
          return {
            id: `science-observation-${observationId}`,
            type: "science-observation",
            subject: subjectId,
            title: subjectId === "physics" ? `实验观察：${lesson.title}` : `现象/安全：${lesson.title}`,
            detail: `${chapter.title} · ${state.status === "weak" ? "还模糊" : "再练"}`,
            priority: state.status === "weak" ? 1 : 2,
            createdAt: state.reviewedAt,
            action: subjectId === "physics"
              ? `重说观察：${observationText}；补变量、条件、单位和结论。`
              : `重说现象：${observationText}；补现象、条件、本质和安全。`,
          };
        })
        .filter(Boolean),
    );
  });

  const quickItems = (progress.quickCheckMistakes ?? []).map((mistake) => ({
    id: `quick-${mistake.checkId}-${mistake.createdAt}`,
    type: "quick-check",
    subject: mistake.subject,
    title: mistake.knowledgeTags?.slice(0, 2).join(" · ") || "随堂自测错题",
    detail: `错选：${mistake.selectedAnswer}`,
    priority: 1,
    createdAt: mistake.createdAt,
    action: `重做：${mistake.correctAnswer}`,
    diagnosis: mistake.diagnosis,
    repairAction: mistake.repairAction,
  }));

  const practiceItems = (progress.practiceMistakes ?? []).map((mistake) => ({
    id: `practice-${mistake.questionId}-${mistake.createdAt}`,
    type: "practice",
    subject: mistake.subject,
    title: mistake.knowledgeTags?.slice(0, 2).join(" · ") || mistake.concept || "课内练习错题",
    detail: `错选：${mistake.selectedAnswer}`,
    priority: 1,
    createdAt: mistake.createdAt,
    action: `重练：${mistake.correctAnswer}`,
    diagnosis: mistake.diagnosis,
    repairAction: mistake.repairAction,
  }));

  const grammarItems = (progress.grammarMistakes ?? []).map((mistake) => ({
    id: `grammar-${mistake.quizId}-${mistake.createdAt}`,
    type: "grammar",
    subject: "english",
    title: mistake.knowledgeTags?.slice(0, 2).join(" · ") || mistake.grammarTitle || "英语语法错题",
    detail: `错选：${mistake.selectedAnswer}`,
    priority: 1,
    createdAt: mistake.createdAt,
    action: `重做：${mistake.correctAnswer}`,
  }));

  const translationItems = (progress.translationMistakes ?? []).map((mistake) => ({
    id: `translation-${mistake.drillId}-${mistake.createdAt}`,
    type: "translation",
    subject: "english",
    title: `翻译：${mistake.focus}`,
    detail: `作答：${mistake.selectedAnswer}`,
    priority: 1,
    createdAt: mistake.createdAt,
    action: `对照重译：${mistake.correctAnswer}`,
    diagnosis: mistake.diagnosis,
    repairAction: mistake.repairAction,
  }));

  const mathItems = (progress.mathMistakes ?? []).map((mistake) => ({
    id: `math-${mistake.exerciseId}-${mistake.createdAt}`,
    type: "math",
    subject: "math",
    title: mistake.concept,
    detail: `错选：${mistake.selectedAnswer}`,
    priority: 2,
    createdAt: mistake.createdAt,
    action: `看步骤并重做：${mistake.correctAnswer}`,
    diagnosis: mistake.diagnosis,
    repairAction: mistake.repairAction,
  }));

  const mathTierItems = (curriculum.math.chapters ?? []).flatMap((chapter) =>
    Object.entries(progress.mathTierProgress?.[chapter.id] ?? {})
      .filter(([, state]) => state.status === "weak")
      .map(([level, state]) => ({
        id: `math-tier-${chapter.id}-${level}`,
        type: "math-tier",
        subject: "math",
        title: `分层练习：${chapter.title}`,
        detail: `${level}层还不稳`,
        priority: 2,
        createdAt: state.updatedAt,
        action: `重做${level}层，先写错因，再做同层第 2 题。`,
      })),
  );

  return [
    ...wordItems,
    ...dictationItems,
    ...retrievalItems,
    ...microDrillItems,
    ...examTargetItems,
    ...studyOutputItems,
    ...glossaryItems,
    ...previewStepItems,
    ...reflectionStepItems,
    ...grammarItems,
    ...translationItems,
    ...quickItems,
    ...practiceItems,
    ...mathItems,
    ...mathTierItems,
    ...writingItems,
    ...scienceObservationItems,
  ]
    .sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      const typeRank = { math: 0, "math-tier": 1, word: 2, dictation: 3, retrieval: 4, "micro-drill": 5, "exam-target": 6, "study-output": 7, glossary: 8, "preview-step": 9, "reflection-step": 10, grammar: 11, translation: 12, "quick-check": 13, practice: 14, writing: 15, "science-observation": 16 };
      if (typeRank[a.type] !== typeRank[b.type]) return typeRank[a.type] - typeRank[b.type];
      return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
    })
    .slice(0, limit);
}

function uniqueReviewItemsByKey(items) {
  return [...items.reduce((map, item) => {
    const key = item.dedupeKey ?? item.id;
    const existing = map.get(key);
    if (!existing || isHigherReviewPriority(item, existing)) {
      map.set(key, item);
    }
    return map;
  }, new Map()).values()].map(({ dedupeKey, ...item }) => item);
}

function isHigherReviewPriority(candidate, existing) {
  if (candidate.priority !== existing.priority) return candidate.priority < existing.priority;
  return (candidate.createdAt ?? "").localeCompare(existing.createdAt ?? "") > 0;
}

function normalizeReviewKey(value) {
  return String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

export function getGrammarReviewQueue(curriculum, progress, limit = 24) {
  const missedQuizIds = new Set((progress.grammarMistakes ?? []).map((mistake) => mistake.quizId));
  const items = (curriculum.english.chapters ?? []).flatMap((chapter) =>
    (chapter.grammarNotes ?? []).map((note) => {
      const quiz = note.miniQuiz;
      const attempt = progress.grammarAttempts?.[quiz.id];
      const status = missedQuizIds.has(quiz.id) ? "missed" : attempt?.correct ? "known" : "new";
      return {
        id: quiz.id,
        unitTitle: chapter.title,
        title: note.title,
        explanation: note.explanation,
        example: note.example,
        drill: note.drill,
        checkpoint: note.checkpoint,
        quiz,
        status,
        answeredAt: attempt?.answeredAt,
      };
    }),
  );

  const weight = { missed: 0, new: 1, known: 2 };
  return items
    .sort((a, b) => {
      if (weight[a.status] !== weight[b.status]) return weight[a.status] - weight[b.status];
      return (a.answeredAt ?? "").localeCompare(b.answeredAt ?? "") || a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function updateGrammarMasteryProgress(progress, grammarId, done, now = new Date().toISOString()) {
  return {
    ...progress,
    grammarMastery: {
      ...(progress.grammarMastery ?? {}),
      [grammarId]: {
        done,
        updatedAt: now,
      },
    },
  };
}

export function getGrammarMasterySummary(unit, progress) {
  const notes = unit.grammarNotes ?? [];
  const items = notes.map((note, index) => {
    const id = note.id ?? note.miniQuiz?.id ?? `${unit.id}-grammar-${index + 1}`;
    const state = progress.grammarMastery?.[id];
    return {
      id,
      title: note.title,
      done: Boolean(state?.done),
      updatedAt: state?.updatedAt,
    };
  });
  const doneCount = items.filter((item) => item.done).length;

  return {
    unitId: unit.id,
    doneCount,
    totalCount: items.length,
    percent: items.length ? Math.round((doneCount / items.length) * 100) : 0,
    items,
  };
}

export function updateChapterMasteryProgress(progress, itemId, done, now = new Date().toISOString()) {
  return {
    ...progress,
    chapterMastery: {
      ...(progress.chapterMastery ?? {}),
      [itemId]: {
        done,
        updatedAt: now,
      },
    },
  };
}

export function getChapterMasterySummary(chapter, progress) {
  const checklist = chapter.chapterMasteryChecklist;
  if (!checklist) {
    return {
      chapterId: chapter.id,
      title: "",
      summary: "",
      doneCount: 0,
      totalCount: 0,
      percent: 0,
      groups: [],
    };
  }

  const groups = [
    ["mustKnow", "必会材料", checklist.mustKnow ?? []],
    ["outputTasks", "输出检测", checklist.outputTasks ?? []],
    ["repairPrompts", "错因修补", checklist.repairPrompts ?? []],
    ["masteryEvidence", "掌握证据", checklist.masteryEvidence ?? []],
  ].map(([key, label, sourceItems]) => {
    const items = sourceItems.map((text, index) => {
      const id = `${chapter.id}-mastery-${key}-${index + 1}`;
      const state = progress.chapterMastery?.[id];
      return {
        id,
        text,
        done: Boolean(state?.done),
        updatedAt: state?.updatedAt,
      };
    });
    const doneCount = items.filter((item) => item.done).length;
    return {
      key,
      label,
      doneCount,
      totalCount: items.length,
      items,
    };
  });
  const totalCount = groups.reduce((sum, group) => sum + group.totalCount, 0);
  const doneCount = groups.reduce((sum, group) => sum + group.doneCount, 0);

  return {
    chapterId: chapter.id,
    title: checklist.title,
    summary: checklist.summary,
    doneCount,
    totalCount,
    percent: totalCount ? Math.round((doneCount / totalCount) * 100) : 0,
    groups,
  };
}

export function getQuickCheckPracticeQueue(curriculum, progress, limit = 12) {
  const missedCheckIds = new Set((progress.quickCheckMistakes ?? []).map((mistake) => mistake.checkId));
  const subjectOrder = ["english", "math", "chinese", "physics", "chemistry"];
  const items = Object.entries(curriculum)
    .filter(([subjectId, subject]) => subjectId !== "meta" && Array.isArray(subject.chapters))
    .flatMap(([subjectId, subject]) =>
      subject.chapters.flatMap((chapter) =>
        chapter.lessons
          .filter((lesson) => lesson.quickCheck)
          .map((lesson) => {
            const check = lesson.quickCheck;
            const attempt = progress.quickCheckAttempts?.[check.id];
            const status = missedCheckIds.has(check.id) ? "missed" : attempt?.correct ? "known" : "new";
            return {
              id: check.id,
              subject: subjectId,
              subjectName: subject.name,
              chapterTitle: chapter.title,
              lessonTitle: lesson.title,
              check,
              status,
              answeredAt: attempt?.answeredAt,
            };
          }),
      ),
    );

  const missed = items
    .filter((item) => item.status === "missed")
    .sort((a, b) => (a.answeredAt ?? "").localeCompare(b.answeredAt ?? "") || a.id.localeCompare(b.id));
  const newItems = roundRobinBySubject(
    items.filter((item) => item.status === "new"),
    subjectOrder,
  );
  const known = roundRobinBySubject(
    items.filter((item) => item.status === "known"),
    subjectOrder,
  );

  return [...missed, ...newItems, ...known].slice(0, limit);
}

export function getScienceDailyLessonMission(curriculum, progress, subjectId) {
  if (!["physics", "chemistry"].includes(subjectId)) {
    throw new Error("science daily mission only supports physics or chemistry");
  }

  const subject = curriculum[subjectId];
  const lessons = (subject?.chapters ?? []).flatMap((chapter) =>
    chapter.lessons
      .filter((lesson) => lesson.quickCheck)
      .map((lesson) => {
        const observationId = `${subjectId}-${lesson.id}-observation`;
        return {
          chapter,
          lesson,
          observationId,
          observationState: progress.scienceObservations?.[observationId],
          attempt: progress.quickCheckAttempts?.[lesson.quickCheck.id],
        };
      }),
  );
  const pick = lessons.find((item) => ["weak", "learning"].includes(item.observationState?.status))
    ?? lessons.find((item) => !item.attempt?.correct)
    ?? lessons[0];
  const lesson = pick.lesson;
  const firstConcept = lesson.keyPoints?.[0] ?? lesson.title;
  const observationSource = lesson.experiment || lesson.safety || lesson.keyPoints?.[1] || firstConcept;
  const trap = lesson.commonMistakes?.[0] ?? (subjectId === "physics" ? "只背结论，忽略条件、单位或图示" : "只看现象，忽略本质、符号或安全");

  return {
    subject: subjectId,
    subjectName: subject.name,
    chapterId: pick.chapter.id,
    chapterTitle: pick.chapter.title,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    concepts: (lesson.keyPoints ?? []).slice(0, 4),
    conceptPrompt: subjectId === "physics"
      ? `先画小图，标出“${firstConcept}”涉及的物理量、单位和条件。`
      : `先把“${firstConcept}”拆成宏观现象、微观本质、符号表达和安全规范。`,
    observation: {
      id: pick.observationId,
      status: pick.observationState?.status ?? "new",
      prompt: observationSource,
      checkRule: subjectId === "physics"
        ? "说明观察现象、变量关系和适用条件，不能只背公式。"
        : "写出现象、判断依据、微观本质或安全要求，不能只写结论。",
    },
    trap: {
      prompt: trap,
      repairAction: subjectId === "physics"
        ? "错了先回到图示，重新标变量、单位和条件。"
        : "错了先补证据链：现象 -> 本质 -> 符号/安全。",
    },
    quickCheck: lesson.quickCheck,
  };
}

export function getChapterLearningPath(curriculum, subjectId, progress) {
  const subject = curriculum[subjectId];
  if (!subject?.chapters) return [];

  return subject.chapters.map((chapter) => {
    const lessonSteps = chapter.lessons.flatMap((lesson) => {
      const quickStep = lesson.quickCheck
        ? [
            {
              id: lesson.quickCheck.id,
              type: "quickCheck",
              label: "先做快测",
              lessonTitle: lesson.title,
              done: Boolean(progress.quickCheckAttempts?.[lesson.quickCheck.id]?.correct),
            },
          ]
        : [];
      const firstPractice = lesson.practiceSet?.[0];
      const practiceStep = firstPractice
        ? [
            {
              id: firstPractice.id,
              type: "practice",
              label: "再做练习",
              lessonTitle: lesson.title,
              done: Boolean(progress.practiceAttempts?.[firstPractice.id]?.correct),
            },
          ]
        : [];
      return [...quickStep, ...practiceStep];
    });
    const completedSteps = lessonSteps.filter((step) => step.done).length;
    const nextAction = lessonSteps.find((step) => !step.done) ?? lessonSteps.at(-1);

    return {
      id: chapter.id,
      subject: subjectId,
      subjectName: subject.name,
      title: chapter.title,
      overview: chapter.overview,
      completedSteps,
      totalSteps: lessonSteps.length,
      percent: lessonSteps.length ? Math.round((completedSteps / lessonSteps.length) * 100) : 0,
      nextAction,
    };
  });
}

export function getChapterLearningLoopSummary(chapter, progress) {
  const lessons = (chapter.lessons ?? []).map((lesson) => {
    const loop = getLessonLearningLoopSummary(lesson, progress);
    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      percent: loop.percent,
      doneCount: loop.doneCount,
      totalCount: loop.totalCount,
      reviewCount: loop.reviewCount,
      weakStages: loop.stages.filter((stage) => stage.status === "needs-review"),
    };
  });
  const totalCount = lessons.reduce((sum, lesson) => sum + lesson.totalCount, 0);
  const doneCount = lessons.reduce((sum, lesson) => sum + lesson.doneCount, 0);
  const reviewLessonCount = lessons.filter((lesson) => lesson.reviewCount > 0).length;
  const nextLesson = lessons.find((lesson) => lesson.percent < 100) ?? lessons.at(-1);

  return {
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    lessonCount: lessons.length,
    doneCount,
    totalCount,
    percent: totalCount ? Math.round((doneCount / totalCount) * 100) : 0,
    reviewLessonCount,
    nextLesson,
    lessons,
  };
}

export function getSubjectLearningLoopSummary(subject, progress) {
  const chapters = (subject.chapters ?? []).map((chapter) => getChapterLearningLoopSummary(chapter, progress));
  const totalCount = chapters.reduce((sum, chapter) => sum + chapter.totalCount, 0);
  const doneCount = chapters.reduce((sum, chapter) => sum + chapter.doneCount, 0);
  const reviewChapterCount = chapters.filter((chapter) => chapter.reviewLessonCount > 0).length;
  const nextChapter = chapters.find((chapter) => chapter.percent < 100) ?? chapters.at(-1);

  return {
    subjectName: subject.name,
    chapterCount: chapters.length,
    doneCount,
    totalCount,
    percent: totalCount ? Math.round((doneCount / totalCount) * 100) : 0,
    reviewChapterCount,
    nextChapter,
    chapters,
  };
}

export function getAllSubjectLearningLoopSummary(curriculum, progress) {
  const order = ["english", "math", "chinese", "physics", "chemistry"].filter((subjectId) => curriculum[subjectId]);
  const subjects = order.map((subjectId) => {
    const subject = curriculum[subjectId];
    const summary = getSubjectLearningLoopSummary(subject, progress);

    return {
      subjectId,
      subjectName: subject.name,
      chapterCount: summary.chapterCount,
      doneCount: summary.doneCount,
      totalCount: summary.totalCount,
      percent: summary.percent,
      reviewChapterCount: summary.reviewChapterCount,
      nextChapter: summary.nextChapter,
    };
  });
  const totalCount = subjects.reduce((sum, subject) => sum + subject.totalCount, 0);
  const doneCount = subjects.reduce((sum, subject) => sum + subject.doneCount, 0);
  const reviewSubjectCount = subjects.filter((subject) => subject.reviewChapterCount > 0).length;
  const nextSubject = subjects.find((subject) => subject.reviewChapterCount > 0)
    ?? subjects.find((subject) => subject.percent < 100)
    ?? subjects.at(-1);

  return {
    subjectCount: subjects.length,
    doneCount,
    totalCount,
    percent: totalCount ? Math.round((doneCount / totalCount) * 100) : 0,
    reviewSubjectCount,
    nextSubject,
    subjects,
  };
}

export function updateSelfCheckProgress(progress, lessonId, itemText, done, now = new Date().toISOString()) {
  const currentLesson = progress.selfChecks?.[lessonId] ?? {};
  const nextLesson = {
    ...currentLesson,
    [itemText]: done
      ? {
          done: true,
          updatedAt: now,
        }
      : {
          done: false,
          updatedAt: now,
        },
  };

  return {
    ...progress,
    selfChecks: {
      ...(progress.selfChecks ?? {}),
      [lessonId]: nextLesson,
    },
  };
}

export function getLessonSelfCheckSummary(lesson, progress) {
  const checks = lesson.selfCheck ?? [];
  const lessonState = progress.selfChecks?.[lesson.id] ?? {};
  const items = checks.map((text) => ({
    text,
    done: Boolean(lessonState[text]?.done),
    updatedAt: lessonState[text]?.updatedAt,
  }));
  const doneCount = items.filter((item) => item.done).length;

  return {
    lessonId: lesson.id,
    doneCount,
    totalCount: items.length,
    percent: items.length ? Math.round((doneCount / items.length) * 100) : 0,
    items,
  };
}

export function answerEntryDiagnostic(progress, lesson, questionId, selectedAnswer, now = new Date().toISOString()) {
  const diagnostic = lesson.entryDiagnostic;
  const question = diagnostic?.questions?.find((item) => item.id === questionId);
  if (!question) {
    return progress;
  }

  const correct = selectedAnswer === question.answer;
  const nextLessonState = {
    ...(progress.entryDiagnostics?.[lesson.id] ?? {}),
    [questionId]: {
      selectedAnswer,
      correct,
      answeredAt: now,
      route: question.ifWrong?.route ?? question.route,
      action: question.ifWrong?.action,
    },
  };

  return {
    ...progress,
    entryDiagnostics: {
      ...(progress.entryDiagnostics ?? {}),
      [lesson.id]: nextLessonState,
    },
    weakTags: correct ? progress.weakTags : unique([...(progress.weakTags ?? []), question.skill]),
  };
}

export function getLessonDiagnosticSummary(lesson, progress) {
  const questions = lesson.entryDiagnostic?.questions ?? [];
  const lessonState = progress.entryDiagnostics?.[lesson.id] ?? {};
  const items = questions.map((question) => {
    const state = lessonState[question.id];
    return {
      ...question,
      selectedAnswer: state?.selectedAnswer,
      correct: state?.correct,
      answeredAt: state?.answeredAt,
      done: Boolean(state),
    };
  });
  const doneCount = items.filter((item) => item.done).length;
  const wrongItems = items.filter((item) => item.done && !item.correct);
  const firstWrong = wrongItems[0];
  const route = firstWrong?.ifWrong?.route ?? (doneCount ? "按预习流程推进" : "先做诊断");
  const recommendation = firstWrong?.ifWrong?.action ?? (doneCount ? "进入四步预习路线" : "先用 3 题判断从哪里开始");

  return {
    lessonId: lesson.id,
    doneCount,
    totalCount: questions.length,
    wrongCount: wrongItems.length,
    percent: questions.length ? Math.round((doneCount / questions.length) * 100) : 0,
    route,
    recommendation,
    items,
  };
}

export function getLessonNextStepAdvice(lesson, progress) {
  const diagnostic = getLessonDiagnosticSummary(lesson, progress);
  if (diagnostic.totalCount && diagnostic.doneCount === 0) {
    return {
      type: "diagnostic",
      title: "先做入口诊断",
      action: `先完成 ${diagnostic.totalCount} 道入口诊断，再决定从讲解、练习还是复盘开始。`,
      reason: "先判断会不会，可以避免把时间花在已经掌握的部分。",
    };
  }

  const wrongDiagnostic = diagnostic.items.find((item) => item.done && !item.correct);
  if (wrongDiagnostic) {
    return {
      type: "diagnostic-repair",
      title: `先补：${wrongDiagnostic.skill}`,
      action: wrongDiagnostic.ifWrong?.action ?? diagnostic.recommendation,
      reason: `入口诊断暴露了“${wrongDiagnostic.skill}”还不稳，先补这一点再继续。`,
    };
  }

  const lessonPracticeMistake = [...(progress.practiceMistakes ?? [])]
    .reverse()
    .find((mistake) => mistake.lessonId === lesson.id);
  if (lessonPracticeMistake) {
    return {
      type: "practice-repair",
      title: `订正：${lessonPracticeMistake.concept}`,
      action: `先订正“${lessonPracticeMistake.concept}”错题：${lessonPracticeMistake.repairAction?.steps?.[0] ?? "写出错因并重做一遍。"}`,
      reason: lessonPracticeMistake.diagnosis?.reason ?? "刚出现的错题优先处理，能减少重复失分。",
    };
  }

  const lessonQuickMistake = [...(progress.quickCheckMistakes ?? [])]
    .reverse()
    .find((mistake) => mistake.lessonId === lesson.id);
  if (lessonQuickMistake) {
    const concept = lessonQuickMistake.knowledgeTags?.at(-1) ?? "随堂自测";
    return {
      type: "quick-check-repair",
      title: `复盘：${concept}`,
      action: `重做本课快测，并用一句话解释正确答案为什么成立。`,
      reason: lessonQuickMistake.diagnosis?.reason ?? "快测错题说明本课核心判断还需要再确认。",
    };
  }

  const selfCheck = getLessonSelfCheckSummary(lesson, progress);
  const firstOpenCheck = selfCheck.items.find((item) => !item.done);
  if (firstOpenCheck) {
    return {
      type: "self-check",
      title: "完成输出检测",
      action: `自查：${firstOpenCheck.text}`,
      reason: "没有输出检测就容易停留在“看过了”，先证明自己能说出、写出或做出。",
    };
  }

  return {
    type: "advance",
    title: "进入下一课",
    action: "本课诊断、订正和自查已完成，可以进入下一课或做章节回顾。",
    reason: "当前课的预习闭环已经完成，继续推进比重复浏览更高效。",
  };
}

export function getLessonProgressSummary(lesson, progress) {
  const diagnostic = getLessonDiagnosticSummary(lesson, progress);
  const selfCheck = getLessonSelfCheckSummary(lesson, progress);
  const practiceQuestions = lesson.practiceSet ?? [];
  const practiceDoneCount = practiceQuestions.filter((question) => progress.practiceAttempts?.[question.id]?.correct).length;
  const practiceMistakeCount = (progress.practiceMistakes ?? []).filter((mistake) => mistake.lessonId === lesson.id).length;
  const quickAttempt = lesson.quickCheck ? progress.quickCheckAttempts?.[lesson.quickCheck.id] : undefined;
  const quickTotal = lesson.quickCheck ? 1 : 0;
  const quickDoneCount = quickAttempt?.correct ? 1 : 0;
  const totalSteps = diagnostic.totalCount + practiceQuestions.length + selfCheck.totalCount + quickTotal;
  const completedSteps = diagnostic.items.filter((item) => item.done && item.correct).length + practiceDoneCount + selfCheck.doneCount + quickDoneCount;
  const nextStep = getLessonNextStepAdvice(lesson, progress);
  const chips = [
    `诊断 ${diagnostic.doneCount}/${diagnostic.totalCount}`,
    `练习 ${practiceDoneCount}/${practiceQuestions.length}`,
    lesson.quickCheck ? `快测 ${quickAttempt?.correct ? "已过" : quickAttempt ? "待订正" : "未测"}` : "",
    `自查 ${selfCheck.doneCount}/${selfCheck.totalCount}`,
    practiceMistakeCount ? `错题 ${practiceMistakeCount}` : "",
  ].filter(Boolean);

  return {
    lessonId: lesson.id,
    completedSteps,
    totalSteps,
    percent: totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0,
    diagnostic,
    selfCheck,
    practiceDoneCount,
    practiceTotalCount: practiceQuestions.length,
    practiceMistakeCount,
    quickCheckStatus: lesson.quickCheck ? (quickAttempt?.correct ? "correct" : quickAttempt ? "wrong" : "new") : "none",
    nextStep,
    chips,
  };
}

export function getLessonLearningLoopSummary(lesson, progress) {
  const diagnostic = getLessonDiagnosticSummary(lesson, progress);
  const workflow = getPreviewWorkflowSummary(lesson, progress);
  const glossary = getGlossarySummary(lesson, progress);
  const studyOutput = getStudyOutputSummary(lesson, progress);
  const retrieval = getRetrievalDeckSummary(lesson, progress);
  const microDrill = getMicroDrillSummary(lesson, progress);
  const examTarget = getExamTargetSummary(lesson, progress);
  const reflection = getReflectionStepSummary(lesson, progress);
  const selfCheck = getLessonSelfCheckSummary(lesson, progress);
  const stages = [
    {
      id: "diagnostic",
      title: "入口诊断",
      doneCount: diagnostic.items.filter((item) => item.done && item.correct).length,
      totalCount: diagnostic.totalCount,
      status: diagnostic.wrongCount ? "needs-review" : diagnostic.doneCount === diagnostic.totalCount && diagnostic.totalCount ? "done" : "new",
      hint: diagnostic.route,
    },
    {
      id: "preview-workflow",
      title: "预习流程",
      doneCount: workflow.doneCount,
      totalCount: workflow.totalCount,
      status: workflow.stuckCount ? "needs-review" : workflow.doneCount === workflow.totalCount && workflow.totalCount ? "done" : "new",
      hint: workflow.stuckCount ? `${workflow.stuckCount} 步卡住` : `${workflow.totalMinutes} 分钟流程`,
    },
    {
      id: "glossary",
      title: "本课必会",
      doneCount: glossary.knownCount,
      totalCount: glossary.totalCount,
      status: glossary.weakCount ? "needs-review" : glossary.knownCount === glossary.totalCount && glossary.totalCount ? "done" : "new",
      hint: glossary.weakCount ? `${glossary.weakCount} 项不熟` : "词语/概念/公式",
    },
    {
      id: "study-output",
      title: "学习输出",
      doneCount: studyOutput.done ? 1 : 0,
      totalCount: studyOutput.id ? 1 : 0,
      status: studyOutput.status === "weak" || studyOutput.status === "learning" ? "needs-review" : studyOutput.done ? "done" : "new",
      hint: studyOutput.task || "完成本课输出",
    },
    {
      id: "retrieval",
      title: "主动回忆",
      doneCount: retrieval.knownCount,
      totalCount: retrieval.totalCount,
      status: retrieval.weakCount ? "needs-review" : retrieval.knownCount === retrieval.totalCount && retrieval.totalCount ? "done" : "new",
      hint: retrieval.weakCount ? `${retrieval.weakCount} 张不稳` : "合上资料回忆",
    },
    {
      id: "micro-drill",
      title: "微练习",
      doneCount: microDrill.doneCount,
      totalCount: microDrill.totalCount,
      status: microDrill.weakCount ? "needs-review" : microDrill.doneCount === microDrill.totalCount && microDrill.totalCount ? "done" : "new",
      hint: microDrill.weakCount ? `${microDrill.weakCount} 题不稳` : "小步练习",
    },
    {
      id: "exam-target",
      title: "考点证据",
      doneCount: examTarget.masteredCount,
      totalCount: examTarget.totalCount,
      status: examTarget.weakCount ? "needs-review" : examTarget.masteredCount === examTarget.totalCount && examTarget.totalCount ? "done" : "new",
      hint: examTarget.weakCount ? `${examTarget.weakCount} 个考点不稳` : "题型/答题动作",
    },
    {
      id: "reflection",
      title: "错因订正",
      doneCount: reflection.doneCount,
      totalCount: reflection.totalCount,
      status: reflection.stuckCount ? "needs-review" : reflection.doneCount === reflection.totalCount && reflection.totalCount ? "done" : "new",
      hint: reflection.stuckCount ? `${reflection.stuckCount} 步卡住` : "订正三步",
    },
    {
      id: "self-check",
      title: "退出自查",
      doneCount: selfCheck.doneCount,
      totalCount: selfCheck.totalCount,
      status: selfCheck.doneCount === selfCheck.totalCount && selfCheck.totalCount ? "done" : "new",
      hint: "会说、会写、会迁移",
    },
  ].filter((stage) => stage.totalCount > 0);
  const totalCount = stages.reduce((sum, stage) => sum + stage.totalCount, 0);
  const doneCount = stages.reduce((sum, stage) => sum + stage.doneCount, 0);
  const reviewCount = stages.filter((stage) => stage.status === "needs-review").length;

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    doneCount,
    totalCount,
    percent: totalCount ? Math.round((doneCount / totalCount) * 100) : 0,
    reviewCount,
    stages,
  };
}

export function answerGrammarQuiz(progress, quiz, selectedAnswer, now = new Date().toISOString()) {
  const correct = selectedAnswer === quiz.answer;
  const nextAttempts = {
    ...(progress.grammarAttempts ?? {}),
    [quiz.id]: {
      selectedAnswer,
      correct,
      answeredAt: now,
    },
  };

  if (correct) {
    return { ...progress, grammarAttempts: nextAttempts };
  }

  const mistake = {
    quizId: quiz.id,
    grammarTitle: quiz.grammarTitle,
    selectedAnswer,
    correctAnswer: quiz.answer,
    knowledgeTags: quiz.knowledgeTags ?? [],
    createdAt: now,
  };

  return {
    ...progress,
    grammarAttempts: nextAttempts,
    grammarMistakes: [...(progress.grammarMistakes ?? []), mistake],
    weakTags: unique([...progress.weakTags, ...(quiz.knowledgeTags ?? [])]),
  };
}

export function answerTranslationDrill(progress, drill, selectedAnswer, now = new Date().toISOString()) {
  const correct = selectedAnswer === drill.answer;
  const nextAttempts = {
    ...(progress.translationAttempts ?? {}),
    [drill.id]: {
      selectedAnswer,
      correct,
      answeredAt: now,
    },
  };

  if (correct) {
    return { ...progress, translationAttempts: nextAttempts };
  }

  const mistake = {
    drillId: drill.id,
    focus: drill.focus,
    direction: drill.direction,
    selectedAnswer,
    correctAnswer: drill.answer,
    knowledgeTags: ["英语翻译", drill.focus, drill.direction],
    diagnosis: buildMistakeDiagnosis("english", {
      concept: drill.focus,
      selectedAnswer,
      correctAnswer: drill.answer,
      explanation: drill.explanation,
      knowledgeTags: ["英语翻译", drill.focus],
    }),
    repairAction: buildRepairAction("english", {
      concept: drill.focus,
      correctAnswer: drill.answer,
      trap: drill.hint,
      explanation: drill.explanation,
    }),
    createdAt: now,
  };

  return {
    ...progress,
    translationAttempts: nextAttempts,
    translationMistakes: [...(progress.translationMistakes ?? []), mistake],
    weakTags: unique([...(progress.weakTags ?? []), "英语翻译", drill.focus]),
  };
}

export function getTranslationMasterySummary(unit, progress) {
  const drills = unit.translationDrills ?? [];
  const directions = ["cn-en", "en-cn", "phrase"].map((direction) => {
    const items = drills.filter((drill) => drill.direction === direction);
    const correctCount = items.filter((drill) => progress.translationAttempts?.[drill.id]?.correct).length;
    const wrongCount = items.filter((drill) => progress.translationAttempts?.[drill.id]?.correct === false).length;

    return {
      direction,
      totalCount: items.length,
      correctCount,
      wrongCount,
      percent: items.length ? Math.round((correctCount / items.length) * 100) : 0,
    };
  });
  const correctCount = drills.filter((drill) => progress.translationAttempts?.[drill.id]?.correct).length;
  const wrongCount = drills.filter((drill) => progress.translationAttempts?.[drill.id]?.correct === false).length;

  return {
    unitId: unit.id,
    unitTitle: unit.title,
    totalCount: drills.length,
    correctCount,
    wrongCount,
    percent: drills.length ? Math.round((correctCount / drills.length) * 100) : 0,
    directions,
  };
}

export function answerPracticeQuestion(progress, question, selectedAnswer, now = new Date().toISOString()) {
  const correct = selectedAnswer === question.answer;
  const nextAttempts = {
    ...progress.practiceAttempts,
    [question.id]: {
      selectedAnswer,
      correct,
      answeredAt: now,
    },
  };

  if (correct) {
    return { ...progress, practiceAttempts: nextAttempts };
  }

  const mistake = {
    questionId: question.id,
    subject: question.subject,
    lessonId: question.lessonId,
    concept: question.concept,
    selectedAnswer,
    correctAnswer: question.answer,
    knowledgeTags: question.knowledgeTags ?? [],
    diagnosis: buildMistakeDiagnosis(question.subject, {
      concept: question.concept,
      selectedAnswer,
      correctAnswer: question.answer,
      trap: question.trap,
      explanation: question.explanation,
      knowledgeTags: question.knowledgeTags ?? [],
    }),
    repairAction: buildRepairAction(question.subject, {
      concept: question.concept,
      correctAnswer: question.answer,
      trap: question.trap,
      explanation: question.explanation,
    }),
    createdAt: now,
  };

  return {
    ...progress,
    practiceAttempts: nextAttempts,
    practiceMistakes: [...(progress.practiceMistakes ?? []), mistake],
    weakTags: unique([...progress.weakTags, ...(question.knowledgeTags ?? [])]),
  };
}

export function answerMathExercise(progress, exercise, selectedAnswer, now = new Date().toISOString()) {
  const correct = selectedAnswer === exercise.answer;
  const nextAttempts = {
    ...progress.mathAttempts,
    [exercise.id]: {
      selectedAnswer,
      correct,
      answeredAt: now,
    },
  };

  if (correct) {
    return { ...progress, mathAttempts: nextAttempts };
  }

  const mistake = {
    exerciseId: exercise.id,
    concept: exercise.concept,
    selectedAnswer,
    correctAnswer: exercise.answer,
    knowledgeTags: exercise.knowledgeTags,
    diagnosis: buildMistakeDiagnosis("math", {
      concept: exercise.concept,
      selectedAnswer,
      correctAnswer: exercise.answer,
      trap: exercise.trap,
      explanation: exercise.solution,
      knowledgeTags: exercise.knowledgeTags ?? [],
    }),
    repairAction: buildRepairAction("math", {
      concept: exercise.concept,
      correctAnswer: exercise.answer,
      trap: exercise.trap,
      explanation: exercise.solution,
    }),
    createdAt: now,
  };

  return {
    ...progress,
    mathAttempts: nextAttempts,
    mathMistakes: [...progress.mathMistakes, mistake],
    weakTags: unique([...progress.weakTags, ...exercise.knowledgeTags]),
  };
}

export function getMathDailyLessonMission(curriculum, progress) {
  const subject = curriculum.math;
  const candidates = (subject?.chapters ?? []).flatMap((chapter) =>
    chapter.lessons.flatMap((lesson) =>
      (lesson.practiceSet ?? []).map((question) => ({
        chapter,
        lesson,
        question,
        attempt: progress.practiceAttempts?.[question.id],
      })),
    ),
  );
  const pick = candidates.find((item) => !item.attempt?.correct) ?? candidates[0];
  const target = pick.lesson.lessonExamTargets?.[0];
  const firstPoint = pick.lesson.keyPoints?.[0] ?? pick.question.concept ?? pick.lesson.title;
  const trap = pick.lesson.commonMistakes?.[0] ?? pick.question.trap ?? "只写答案，不写条件和步骤";

  return {
    subject: "math",
    subjectName: subject.name,
    chapterId: pick.chapter.id,
    chapterTitle: pick.chapter.title,
    lessonId: pick.lesson.id,
    lessonTitle: pick.lesson.title,
    target: {
      concept: target?.point ?? firstPoint,
      questionType: target?.questionType ?? "方法应用",
      examCue: target?.answerMove ?? `先判断“${firstPoint}”的条件，再写步骤。`,
    },
    model: {
      question: pick.question.question,
      steps: [
        `圈出条件：${firstPoint}`,
        `选择方法：${pick.question.concept ?? target?.questionType ?? "本课方法"}`,
        `写出依据后再计算或判断，最后核对答案“${pick.question.answer}”。`,
      ],
    },
    practice: pick.question,
    trap: {
      prompt: trap,
      repairAction: `错了先写错因：条件漏看、方法选错、步骤跳步还是计算错误；再重做“${pick.question.concept ?? firstPoint}”。`,
    },
  };
}

export function updateMathTierProgress(progress, chapterId, level, status, now = new Date().toISOString()) {
  return {
    ...progress,
    mathTierProgress: {
      ...(progress.mathTierProgress ?? {}),
      [chapterId]: {
        ...(progress.mathTierProgress?.[chapterId] ?? {}),
        [level]: {
          status,
          updatedAt: now,
        },
      },
    },
  };
}

export function getMathTieredPracticePlan(curriculum, progress, chapterId) {
  const chapter = curriculum.math.chapters.find((item) => item.id === chapterId) ?? curriculum.math.chapters[0];
  const tiers = chapter.chapterTieredPractice ?? [];
  const tierState = progress.mathTierProgress?.[chapter.id] ?? {};
  const completedLevels = tiers.filter((tier) => tierState[tier.level]?.status === "done").map((tier) => tier.level);
  const weakLevels = tiers.filter((tier) => tierState[tier.level]?.status === "weak").map((tier) => tier.level);
  const currentTier = tiers.find((tier) => tierState[tier.level]?.status === "weak")
    ?? tiers.find((tier) => tierState[tier.level]?.status !== "done")
    ?? tiers.at(-1);

  return {
    subject: "math",
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    currentLevel: currentTier?.level ?? "",
    currentTier,
    completedLevels,
    weakLevels,
    progress: tiers.length ? Math.round((completedLevels.length / tiers.length) * 100) : 0,
    nextAction: weakLevels.includes(currentTier?.level)
      ? `先重做“${currentTier.level}”层，写出错因后再进入下一层。`
      : `先完成“${currentTier?.level ?? "基础"}”层：${currentTier?.goal ?? "确认本章方法入口"}。`,
  };
}

export function getMathLearningAdvice(curriculum, progress) {
  const exercises = curriculum.math?.exercises ?? [];
  const mistakes = progress.mathMistakes ?? [];

  if (!mistakes.length) {
    return {
      focus: "二次函数图像预热",
      reason: "还没有数学错题记录，先按章节顺序建立题型手感。",
      weakTags: [],
      recommendedExerciseIds: exercises.slice(0, 2).map((exercise) => exercise.id),
      nextSteps: [
        "先看章节考点，把概念、图像和常见问法各说一遍。",
        "完成 1 道基础题，答完后必须复述第一步为什么这样做。",
        "把不会解释的词写入薄弱点，下一次优先重练。",
      ],
    };
  }

  const tagCounts = new Map();
  for (const mistake of mistakes) {
    for (const tag of mistake.knowledgeTags ?? [mistake.concept]) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const weakTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
  const focus = weakTags[0] ?? mistakes.at(-1).concept;
  const relatedExerciseIds = exercises
    .filter((exercise) => {
      const exerciseTags = exercise.knowledgeTags ?? [];
      return exercise.concept === focus || exerciseTags.includes(focus);
    })
    .map((exercise) => exercise.id);
  const recentMistakeIds = mistakes.map((mistake) => mistake.exerciseId);
  const recommendedExerciseIds = unique([...relatedExerciseIds, ...recentMistakeIds]).slice(0, 3);

  return {
    focus,
    reason: `最近错题集中在“${focus}”，说明这个考点还需要从概念、步骤和易错点三处补一遍。`,
    weakTags: weakTags.slice(0, 4),
    recommendedExerciseIds,
    nextSteps: [
      `先重看“${focus}”相关例题，遮住解析说出每一步依据。`,
      "重做最近错题，写出错因：看错条件、公式不熟，还是步骤跳得太快。",
      "再做 1 道同标签题，能连续答对再进入下一考点。",
    ],
  };
}

export function answerQuickCheck(progress, check, selectedAnswer, now = new Date().toISOString()) {
  const correct = selectedAnswer === check.answer;
  const nextAttempts = {
    ...progress.quickCheckAttempts,
    [check.id]: {
      selectedAnswer,
      correct,
      answeredAt: now,
    },
  };

  if (correct) {
    return { ...progress, quickCheckAttempts: nextAttempts };
  }

  const mistake = {
    checkId: check.id,
    subject: check.subject,
    lessonId: check.lessonId,
    selectedAnswer,
    correctAnswer: check.answer,
    knowledgeTags: check.knowledgeTags ?? [],
    diagnosis: buildMistakeDiagnosis(check.subject, {
      concept: check.knowledgeTags?.at(-1) ?? "随堂自测",
      selectedAnswer,
      correctAnswer: check.answer,
      explanation: check.explanation,
      knowledgeTags: check.knowledgeTags ?? [],
    }),
    repairAction: buildRepairAction(check.subject, {
      concept: check.knowledgeTags?.at(-1) ?? "随堂自测",
      correctAnswer: check.answer,
      explanation: check.explanation,
    }),
    createdAt: now,
  };

  return {
    ...progress,
    quickCheckAttempts: nextAttempts,
    quickCheckMistakes: [...progress.quickCheckMistakes, mistake],
    weakTags: unique([...progress.weakTags, ...(check.knowledgeTags ?? [])]),
  };
}

function buildMistakeDiagnosis(subject, { concept, selectedAnswer, correctAnswer, trap = "", explanation = "", knowledgeTags = [] }) {
  const text = [concept, selectedAnswer, correctAnswer, trap, explanation, ...knowledgeTags].join(" ");
  const labelBySubject = {
    english: "句型/词义迁移错误",
    math: "条件识别或步骤断裂",
    chinese: "文本依据不足",
    physics: "条件、图示或物理量混淆",
    chemistry: "现象、本质或实验条件混淆",
  };
  let label = labelBySubject[subject] ?? "概念依据不清";

  if (/单位|量|变量|图|条件|公式|力臂|电流|电压|电阻/.test(text)) {
    label = subject === "math" ? "公式条件未核对" : "条件或物理量未核对";
  }
  if (/现象|实验|安全|生成|物质|氧气|方程式|守恒/.test(text)) {
    label = "实验证据或本质判断不足";
  }
  if (/文本|词句|表达|默写|观点|情感|人物/.test(text)) {
    label = "文本依据或表达方法不足";
  }
  if (/语序|句型|单词|英文|词义|连接词/.test(text)) {
    label = "词义句型没有迁移";
  }

  return {
    label,
    reason: `错选“${selectedAnswer}”说明“${concept}”还不能稳定迁移；先对照正确答案“${correctAnswer}”找依据。`,
    evidence: trap || explanation || `相关标签：${knowledgeTags.slice(0, 2).join("、")}`,
  };
}

function buildRepairAction(subject, { concept, correctAnswer, trap = "", explanation = "" }) {
  const commonFirstStep = `遮住解析，先说出“${concept}”的适用条件或判断依据。`;
  const subjectSteps = {
    english: [
      `把正确答案“${correctAnswer}”放进一个 8-12 词英文句子。`,
      "再做一次中译英，检查词义、语序和连接词。",
    ],
    math: [
      "重写已知条件，圈出决定方法的关键词。",
      `不看答案重做一遍，最后用“${correctAnswer}”核对结论。`,
    ],
    chinese: [
      "回到文本找 1 处词句证据，先口头解释再写答案。",
      "把答案整理成“观点 + 文本依据 + 表达作用”。",
    ],
    physics: [
      "补一张小图，标出物理量、单位和方向。",
      `重做时先判断条件，再核对正确答案“${correctAnswer}”。`,
    ],
    chemistry: [
      "按“宏观现象 -> 微观本质 -> 符号/安全”重说一遍。",
      `用正确答案“${correctAnswer}”倒推题目给出的证据。`,
    ],
  };

  return {
    title: `补救：${concept}`,
    steps: [commonFirstStep, ...(subjectSteps[subject] ?? ["重做同类题，并写出错因。"])],
    success: trap || explanation || "能独立说出为什么原答案错、正确答案为什么对。",
  };
}

export function completeActivity(progress, activityId, today = getTodayString()) {
  const alreadyDone = progress.completedActivities.includes(activityId);
  return {
    ...progress,
    lastStudiedOn: today,
    streak: calculateStreak(progress, today),
    completedActivities: alreadyDone
      ? progress.completedActivities
      : [...progress.completedActivities, activityId],
  };
}

export function getMasterySummary(flashcards, progress) {
  const counts = { known: 0, fuzzy: 0, unknown: 0, new: 0 };
  for (const card of flashcards) {
    const status = progress.flashcards[card.id]?.status ?? "new";
    counts[status] += 1;
  }
  return counts;
}

function fitIntoTimeWindow(activities, minMinutes, maxMinutes) {
  const result = [];
  let total = 0;

  for (const activity of activities) {
    if (total + activity.minutes <= maxMinutes) {
      result.push(activity);
      total += activity.minutes;
    }
    if (total >= minMinutes) break;
  }

  return result;
}

function trimPlanToWindow(plan, subjectIds, curriculum, progress, mode, minMinutes, maxMinutes) {
  let result = [...plan];
  let total = sumMinutes(result);

  const reductionOrder = ["math", "chinese", "physics", "chemistry", "english"];
  for (const subjectId of reductionOrder) {
    if (total <= maxMinutes) break;
    const currentIndex = result.findIndex((activity) => activity.subject === subjectId);
    if (currentIndex === -1) continue;

    const current = result[currentIndex];
    const alternatives = getVisibleActivities(curriculum, subjectId, mode)
      .filter((activity) => !progress.completedActivities.includes(activity.id) || activity.id === current.id)
      .filter((activity) => activity.minutes < current.minutes)
      .sort((a, b) => a.minutes - b.minutes);

    if (!alternatives.length) continue;
    result[currentIndex] = alternatives[0];
    total = sumMinutes(result);
  }

  if (total >= minMinutes && total <= maxMinutes) return result;
  return fitIntoTimeWindow(
    subjectIds.flatMap((subjectId) => getVisibleActivities(curriculum, subjectId, mode)),
    minMinutes,
    maxMinutes,
  );
}

function sumMinutes(items) {
  return items.reduce((sum, item) => sum + item.minutes, 0);
}

function fitSessionSteps(steps, minMinutes, maxMinutes) {
  const result = [...steps];
  while (sumMinutes(result) > maxMinutes) {
    const removableIndex = result.findLastIndex((step) => step.kind === "output" || step.kind === "concept");
    if (removableIndex < 0) break;
    result.splice(removableIndex, 1);
  }

  return sumMinutes(result) >= minMinutes ? result : steps.slice(0, 5);
}

function pickQuickPractice(queue) {
  if (!queue.length) return undefined;
  return queue.find((item) => item.status === "missed") ?? queue.find((item) => item.subject !== "english") ?? queue[0];
}

function subjectName(curriculum, subjectId) {
  return curriculum[subjectId]?.name ?? subjectId;
}

function roundRobinBySubject(items, subjectOrder) {
  const groups = new Map(subjectOrder.map((subjectId) => [subjectId, []]));
  for (const item of items.sort((a, b) => a.id.localeCompare(b.id))) {
    if (!groups.has(item.subject)) groups.set(item.subject, []);
    groups.get(item.subject).push(item);
  }

  const result = [];
  let hasMore = true;
  while (hasMore) {
    hasMore = false;
    for (const subjectId of subjectOrder) {
      const group = groups.get(subjectId) ?? [];
      const next = group.shift();
      if (next) {
        result.push(next);
        hasMore = true;
      }
    }
  }

  return result;
}

function buildEnglishDailyMission(unit, day, words) {
  const grammarNotes = unit?.grammarNotes ?? [];
  const translationDrills = unit?.translationDrills ?? [];
  const grammarFocus = grammarNotes.length
    ? grammarNotes[(Math.max(1, day?.day ?? 1) - 1) % grammarNotes.length]
    : undefined;
  const wordText = words.map((word) => word.word).join("、");
  const matchingDrill = translationDrills.find((drill) =>
    words.some((word) => [drill.prompt, drill.answer, drill.focus].join(" ").includes(word.word)),
  ) ?? translationDrills[(Math.max(1, day?.day ?? 1) - 1) % Math.max(1, translationDrills.length)];
  const firstWord = words[0];
  const secondWord = words[1] ?? firstWord;
  const translationTask = matchingDrill
    ? {
        prompt: matchingDrill.prompt,
        answer: matchingDrill.answer,
        hint: matchingDrill.hint,
        checkRule: `至少用到当天词：${wordText || matchingDrill.focus}；检查拼写、语序和中文意思。`,
        focus: matchingDrill.focus,
      }
    : {
        prompt: `用 ${firstWord?.word ?? "本课单词"} 和 ${secondWord?.word ?? "本课短语"} 写 1 个英文句子，再翻译成中文。`,
        answer: `句子需包含 ${firstWord?.word ?? "本课单词"}，并能说出中文意思。`,
        hint: "先写主语和谓语，再加入当天词或短语。",
        checkRule: `至少用到当天词：${wordText || "本课单词"}；检查拼写、语序和中文意思。`,
        focus: "当天词汇输出",
      };

  return {
    unitId: unit?.id ?? "",
    unitTitle: unit?.title ?? "",
    overview: unit?.overview ?? "",
    day: day?.day ?? 1,
    words,
    knownCount: words.filter((word) => word.status === "known").length,
    totalCount: words.length,
    grammarFocus: grammarFocus
      ? {
          id: grammarFocus.id,
          title: grammarFocus.title,
          explanation: grammarFocus.explanation,
          example: grammarFocus.example,
          checkpoint: grammarFocus.checkpoint,
        }
      : undefined,
    translationTask,
  };
}

function calculateStreak(progress, today) {
  if (progress.lastStudiedOn === today) return Math.max(1, progress.streak || 1);
  const yesterday = addDays(`${today}T00:00:00.000Z`, -1).slice(0, 10);
  if (progress.lastStudiedOn === yesterday) return (progress.streak || 0) + 1;
  return 1;
}

function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(isoString, days) {
  const date = new Date(isoString);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

function stripLessonNumber(title) {
  return title.replace(/^\d+\s*/, "");
}

function unique(values) {
  return [...new Set(values)];
}
