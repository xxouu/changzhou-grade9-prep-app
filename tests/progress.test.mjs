import test from "node:test";
import assert from "node:assert/strict";

import {
  createDefaultProgress,
  getTodayPlan,
  getAdaptivePreviewSession,
  getCrossSubjectReviewQueue,
  getDictationReviewQueue,
  getChineseDailyLessonMission,
  getEnglishDailyWordMission,
  getGrammarReviewQueue,
  getGrammarMasterySummary,
  getTranslationMasterySummary,
  getChapterLearningPath,
  getChapterLearningLoopSummary,
  getSubjectLearningLoopSummary,
  getAllSubjectLearningLoopSummary,
  getChapterKnowledgeChecklist,
  getChapterMasterySummary,
  getSubjectKnowledgeBank,
  filterSubjectKnowledgeBank,
  getKnowledgeReviewQueue,
  getMathDailyLessonMission,
  getMathLearningAdvice,
  getMathTieredPracticePlan,
  getQuickCheckPracticeQueue,
  getScienceDailyLessonMission,
  getReviewQueue,
  getLessonSelfCheckSummary,
  getRetrievalDeckSummary,
  getRetrievalReviewQueue,
  getMicroDrillSummary,
  getMicroDrillReviewQueue,
  getExamTargetSummary,
  getExamTargetReviewQueue,
  getStudyOutputSummary,
  getStudyOutputReviewQueue,
  getGlossarySummary,
  getGlossaryReviewQueue,
  getPreviewWorkflowSummary,
  getPreviewWorkflowReviewQueue,
  getReflectionStepSummary,
  getReflectionStepReviewQueue,
  getWritingMissionQueue,
  updateDictationProgress,
  updateFlashcardProgress,
  updateWritingMissionProgress,
  updateKnowledgeCardProgress,
  updateSelfCheckProgress,
  updateRetrievalCardProgress,
  updateMicroDrillProgress,
  updateExamTargetProgress,
  updateStudyOutputProgress,
  updateGlossaryProgress,
  updatePreviewWorkflowProgress,
  updateReflectionStepProgress,
  updateGrammarMasteryProgress,
  updateChapterMasteryProgress,
  updateScienceObservationProgress,
  updateMathTierProgress,
  answerQuickCheck,
  answerPracticeQuestion,
  answerGrammarQuiz,
  answerTranslationDrill,
  answerMathExercise,
  loadProgress,
  saveProgress,
  getVisibleActivities,
  answerEntryDiagnostic,
  getLessonDiagnosticSummary,
  getLessonNextStepAdvice,
  getLessonProgressSummary,
  getLessonLearningLoopSummary,
} from "../src/progress.mjs";
import { curriculum } from "../src/content.mjs";

test("today plan stays inside the 20-30 minute preview window and uses approved content", () => {
  const progress = createDefaultProgress("2026-06-28");
  const plan = getTodayPlan(curriculum, progress);

  const totalMinutes = plan.reduce((sum, item) => sum + item.minutes, 0);
  assert.ok(totalMinutes >= 20);
  assert.ok(totalMinutes <= 30);
  assert.ok(plan.some((item) => item.subject === "english"));
  assert.ok(plan.some((item) => item.subject === "math"));
  assert.ok(plan.some((item) => item.subject === "chinese"));
  assert.ok(plan.some((item) => item.subject === "physics"));
  assert.ok(plan.some((item) => item.subject === "chemistry"));
  assert.ok(plan.some((item) => item.id === "eng-flashcards"));
  assert.equal(plan.every((item) => item.reviewStatus === "approved"), true);
});

test("adaptive preview session combines memory, concept, practice, and correction inside 20-30 minutes", () => {
  let progress = createDefaultProgress("2026-06-28");
  progress = updateFlashcardProgress(progress, "eng-u1-1-race", "unknown", "2026-06-28T08:00:00.000Z");
  progress = answerMathExercise(progress, curriculum.math.exercises[0], "wrong", "2026-06-28T08:05:00.000Z");
  const chemistryCheck = curriculum.chemistry.chapters[0].lessons[0].quickCheck;
  const wrongQuickAnswer = chemistryCheck.choices.find((choice) => choice !== chemistryCheck.answer);
  progress = answerQuickCheck(progress, chemistryCheck, wrongQuickAnswer, "2026-06-28T08:10:00.000Z");

  const session = getAdaptivePreviewSession(curriculum, progress);

  assert.ok(session.totalMinutes >= 20);
  assert.ok(session.totalMinutes <= 30);
  assert.ok(session.steps.every((step) => step.id && step.title && step.action && step.reason && step.minutes > 0));
  assert.ok(session.steps.some((step) => step.kind === "memory" && step.subject === "english"));
  assert.ok(session.steps.some((step) => step.kind === "concept"));
  assert.ok(session.steps.some((step) => step.kind === "practice"));
  assert.ok(session.steps.some((step) => step.kind === "correction"));
  assert.equal(session.steps[0].kind, "correction");
  assert.ok(session.focusTags.includes("二次函数顶点") || session.focusTags.includes("顶点式"));
});

test("pending AI generated activities are hidden from the child view by default", () => {
  const sampleCurriculum = {
    chinese: {
      activities: [
        { id: "approved", reviewStatus: "approved" },
        { id: "pending", reviewStatus: "pending" },
      ],
    },
  };
  const childActivities = getVisibleActivities(sampleCurriculum, "chinese", "child");
  const reviewerActivities = getVisibleActivities(sampleCurriculum, "chinese", "reviewer");

  assert.equal(childActivities.every((activity) => activity.reviewStatus === "approved"), true);
  assert.ok(reviewerActivities.some((activity) => activity.reviewStatus === "pending"));
});

test("curated Chinese composition material is visible in the child learning path", () => {
  const childActivities = getVisibleActivities(curriculum, "chinese", "child");
  const composition = childActivities.find((activity) => activity.id === "chi-composition-growth");

  assert.ok(composition);
  assert.equal(composition.reviewStatus, "approved");
  assert.match(composition.prompt, /成长|责任|错误|经历/);
  assert.match(composition.answer, /情境|细节|心理|认识/);
});

test("flashcards marked fuzzy or unknown move ahead of known cards", () => {
  let progress = createDefaultProgress("2026-06-28");
  progress = updateFlashcardProgress(progress, "eng-u1-1-race", "known", "2026-06-28T08:00:00.000Z");
  progress = updateFlashcardProgress(progress, "eng-u1-8-creative", "fuzzy", "2026-06-28T08:01:00.000Z");
  progress = updateFlashcardProgress(progress, "eng-u1-51-curious", "unknown", "2026-06-28T08:02:00.000Z");

  const queue = getReviewQueue(curriculum.english.flashcards, progress);

  assert.deepEqual(
    queue.slice(0, 2).map((card) => card.id),
    ["eng-u1-51-curious", "eng-u1-8-creative"],
  );
  assert.equal(queue.at(-1).id, "eng-u1-1-race");
});

test("English word review queue deduplicates repeated wordlist entries across units", () => {
  let progress = createDefaultProgress("2026-06-28");
  progress = updateFlashcardProgress(progress, "eng-u4-19-achievement", "unknown", "2026-06-28T08:01:00.000Z");
  progress = updateFlashcardProgress(progress, "eng-u7-28-achievement", "unknown", "2026-06-28T08:02:00.000Z");

  const queue = getCrossSubjectReviewQueue(curriculum, progress);
  const achievementItems = queue.filter((item) => item.type === "word" && item.title === "achievement");

  assert.equal(achievementItems.length, 1);
  assert.equal(achievementItems[0].id, "word-eng-u7-28-achievement");
});

test("English daily word mission advances by textbook unit day", () => {
  let progress = createDefaultProgress("2026-06-28");
  const firstMission = getEnglishDailyWordMission(curriculum, progress);

  assert.equal(firstMission.unitTitle, "Unit 1 Know yourself");
  assert.equal(firstMission.day, 1);
  assert.equal(firstMission.words.length, 5);
  assert.deepEqual(firstMission.words.map((item) => item.word), ["race", "Miss", "attention", "pay attention to", "fixed"]);
  assert.ok(firstMission.words.every((item) => item.cn));
  assert.ok(firstMission.grammarFocus?.title);
  assert.ok(firstMission.grammarFocus.explanation);
  assert.ok(firstMission.translationTask?.prompt);
  assert.ok(firstMission.translationTask.answer);
  assert.ok(firstMission.translationTask.checkRule);
  assert.ok(
    firstMission.words.some((word) =>
      [firstMission.translationTask.prompt, firstMission.translationTask.answer, firstMission.translationTask.checkRule].join(" ").includes(word.word),
    ),
  );

  for (const word of firstMission.words) {
    progress = updateFlashcardProgress(progress, word.cardId, "known", "2026-06-28T08:00:00.000Z");
  }

  const secondMission = getEnglishDailyWordMission(curriculum, progress);
  assert.equal(secondMission.unitTitle, "Unit 1 Know yourself");
  assert.equal(secondMission.day, 2);
  assert.deepEqual(secondMission.words.map((item) => item.word), ["either...or...", "order", "creative", "appear", "shape"]);
});

test("English translation drills record mistakes for review", () => {
  const progress = createDefaultProgress("2026-06-28");
  const drill = curriculum.english.chapters[0].translationDrills[0];
  const next = answerTranslationDrill(progress, drill, "wrong", "2026-06-28T08:12:00.000Z");

  assert.equal(next.translationAttempts[drill.id].correct, false);
  assert.equal(next.translationMistakes.length, 1);
  assert.equal(next.translationMistakes[0].drillId, drill.id);
  assert.equal(next.translationMistakes[0].correctAnswer, drill.answer);
  assert.ok(next.translationMistakes[0].diagnosis?.label);
  assert.ok(next.translationMistakes[0].repairAction?.steps?.length >= 2);

  const queue = getCrossSubjectReviewQueue(curriculum, next);
  assert.ok(queue.some((item) => item.type === "translation" && item.title.includes(drill.focus)));
});

test("English translation mastery summary tracks unit direction progress", () => {
  const unit = curriculum.english.chapters[0];
  let progress = createDefaultProgress("2026-06-28");
  let summary = getTranslationMasterySummary(unit, progress);

  assert.equal(summary.totalCount, unit.translationDrills.length);
  assert.equal(summary.correctCount, 0);
  assert.equal(summary.wrongCount, 0);
  assert.equal(summary.percent, 0);
  assert.deepEqual(summary.directions.map((item) => item.direction), ["cn-en", "en-cn", "phrase"]);

  progress = answerTranslationDrill(progress, unit.translationDrills[0], unit.translationDrills[0].answer, "2026-06-28T08:10:00.000Z");
  progress = answerTranslationDrill(progress, unit.translationDrills[1], "wrong", "2026-06-28T08:12:00.000Z");
  summary = getTranslationMasterySummary(unit, progress);

  assert.equal(summary.correctCount, 1);
  assert.equal(summary.wrongCount, 1);
  assert.equal(summary.percent, Math.round((1 / unit.translationDrills.length) * 100));
  assert.equal(summary.directions.find((item) => item.direction === "cn-en").correctCount, 1);
  assert.equal(summary.directions.find((item) => item.direction === "en-cn").wrongCount, 1);
});

test("wrong math answers create mistake records and weak point tags", () => {
  const progress = createDefaultProgress("2026-06-28");
  const exercise = curriculum.math.exercises[0];
  const next = answerMathExercise(progress, exercise, "B", "2026-06-28T08:10:00.000Z");

  assert.equal(next.mathMistakes.length, 1);
  assert.equal(next.mathMistakes[0].exerciseId, exercise.id);
  assert.ok(next.weakTags.includes(exercise.knowledgeTags[0]));
  assert.equal(next.mathAttempts[exercise.id].correct, false);
});

test("math learning advice focuses on repeated weak concepts after mistakes", () => {
  let progress = createDefaultProgress("2026-06-28");
  const vertexExercise = curriculum.math.exercises[0];
  const minValueExercise = curriculum.math.exercises[2];

  const initialAdvice = getMathLearningAdvice(curriculum, progress);
  assert.equal(initialAdvice.focus, "二次函数图像预热");
  assert.ok(initialAdvice.nextSteps.length >= 3);

  progress = answerMathExercise(progress, vertexExercise, "B", "2026-06-28T08:10:00.000Z");
  progress = answerMathExercise(progress, minValueExercise, "A", "2026-06-28T08:15:00.000Z");

  const advice = getMathLearningAdvice(curriculum, progress);

  assert.equal(advice.focus, "顶点式");
  assert.match(advice.reason, /错题|薄弱|顶点式/);
  assert.ok(advice.weakTags.includes("顶点式"));
  assert.ok(advice.recommendedExerciseIds.includes(vertexExercise.id));
  assert.ok(advice.recommendedExerciseIds.includes(minValueExercise.id));
  assert.ok(advice.nextSteps.some((step) => step.includes("重做")));
});

test("math daily lesson mission combines target, model steps, tiered practice and trap repair", () => {
  let progress = createDefaultProgress("2026-06-28");
  const mission = getMathDailyLessonMission(curriculum, progress);

  assert.equal(mission.subject, "math");
  assert.ok(mission.chapterTitle);
  assert.ok(mission.lessonTitle);
  assert.ok(mission.target.concept);
  assert.ok(mission.target.examCue);
  assert.ok(mission.model.question);
  assert.ok(mission.model.steps.length >= 3);
  assert.ok(mission.practice.question && mission.practice.answer && mission.practice.explanation);
  assert.ok(mission.trap.prompt);
  assert.match(mission.trap.repairAction, /条件|步骤|错因|重做/);

  progress = answerPracticeQuestion(progress, mission.practice, mission.practice.answer, "2026-06-28T09:10:00.000Z");
  const nextMission = getMathDailyLessonMission(curriculum, progress);

  assert.notEqual(nextMission.practice.id, mission.practice.id);
});

test("math tiered practice plan advances through levels and reviews weak tiers", () => {
  let progress = createDefaultProgress("2026-06-28");
  const chapter = curriculum.math.chapters[0];
  let plan = getMathTieredPracticePlan(curriculum, progress, chapter.id);

  assert.equal(plan.currentLevel, "基础");
  assert.equal(plan.currentTier.questions.length >= 2, true);
  assert.match(plan.nextAction, /基础|先/);

  progress = updateMathTierProgress(progress, chapter.id, "基础", "done", "2026-06-28T09:20:00.000Z");
  plan = getMathTieredPracticePlan(curriculum, progress, chapter.id);

  assert.equal(plan.currentLevel, "巩固");
  assert.equal(plan.completedLevels.includes("基础"), true);

  progress = updateMathTierProgress(progress, chapter.id, "巩固", "weak", "2026-06-28T09:25:00.000Z");
  plan = getMathTieredPracticePlan(curriculum, progress, chapter.id);

  assert.equal(plan.currentLevel, "巩固");
  assert.equal(plan.weakLevels.includes("巩固"), true);
  assert.ok(getCrossSubjectReviewQueue(curriculum, progress).some((item) => item.type === "math-tier" && item.title.includes(chapter.title)));
});

test("wrong quick-check answers are recorded for cross-subject review", () => {
  const progress = createDefaultProgress("2026-06-28");
  const check = curriculum.physics.chapters[0].lessons[0].quickCheck;
  const wrongAnswer = check.choices.find((choice) => choice !== check.answer);
  const next = answerQuickCheck(progress, check, wrongAnswer, "2026-06-28T08:30:00.000Z");

  assert.equal(next.quickCheckMistakes.length, 1);
  assert.equal(next.quickCheckMistakes[0].checkId, check.id);
  assert.equal(next.quickCheckAttempts[check.id].correct, false);
  assert.ok(next.weakTags.includes(check.knowledgeTags[0]));
});

test("quick-check practice queue covers all subjects and prioritizes missed checks", () => {
  let progress = createDefaultProgress("2026-06-28");
  const check = curriculum.chemistry.chapters[0].lessons[0].quickCheck;
  const wrongAnswer = check.choices.find((choice) => choice !== check.answer);

  const initialQueue = getQuickCheckPracticeQueue(curriculum, progress, 50);
  const subjects = new Set(initialQueue.map((item) => item.subject));

  assert.deepEqual([...subjects].sort(), ["chemistry", "chinese", "english", "math", "physics"]);
  assert.ok(initialQueue.every((item) => item.check.question && item.chapterTitle && item.lessonTitle));
  assert.equal(initialQueue[0].status, "new");

  progress = answerQuickCheck(progress, check, wrongAnswer, "2026-06-28T08:20:00.000Z");
  const reviewQueue = getQuickCheckPracticeQueue(curriculum, progress, 50);

  assert.equal(reviewQueue[0].status, "missed");
  assert.equal(reviewQueue[0].check.id, check.id);
  assert.equal(reviewQueue[0].subject, "chemistry");
});

test("science daily lesson mission combines concept, experiment or safety, trap and quick check", () => {
  let progress = createDefaultProgress("2026-06-28");

  for (const subjectId of ["physics", "chemistry"]) {
    const mission = getScienceDailyLessonMission(curriculum, progress, subjectId);

    assert.equal(mission.subject, subjectId);
    assert.ok(mission.lessonTitle);
    assert.ok(mission.concepts.length >= 3);
    assert.ok(mission.conceptPrompt);
    assert.ok(mission.observation.prompt);
    assert.ok(mission.observation.checkRule);
    assert.ok(mission.trap.prompt);
    assert.ok(mission.trap.repairAction);
    assert.ok(mission.quickCheck.id && mission.quickCheck.question);
  }

  const firstChemistry = getScienceDailyLessonMission(curriculum, progress, "chemistry");
  progress = answerQuickCheck(progress, firstChemistry.quickCheck, firstChemistry.quickCheck.answer, "2026-06-28T09:00:00.000Z");
  const nextChemistry = getScienceDailyLessonMission(curriculum, progress, "chemistry");

  assert.notEqual(nextChemistry.lessonId, firstChemistry.lessonId);
});

test("weak science observations enter the cross-subject review queue", () => {
  let progress = createDefaultProgress("2026-06-28");
  const mission = getScienceDailyLessonMission(curriculum, progress, "chemistry");

  progress = updateScienceObservationProgress(progress, mission.observation.id, "weak", "2026-06-28T09:08:00.000Z");

  const reviewItem = getCrossSubjectReviewQueue(curriculum, progress).find(
    (item) => item.type === "science-observation" && item.subject === "chemistry",
  );

  assert.ok(reviewItem);
  assert.match(reviewItem.title, /实验|观察|现象|安全/);
  assert.match(reviewItem.action, /现象|条件|本质|安全|重说/);
});

test("chapter learning path gives per-chapter next actions and progress", () => {
  let progress = createDefaultProgress("2026-06-28");
  const initialPath = getChapterLearningPath(curriculum, "chemistry", progress);
  const firstChapter = initialPath[0];

  assert.equal(firstChapter.subject, "chemistry");
  assert.match(firstChapter.title, /化学/);
  assert.equal(firstChapter.completedSteps, 0);
  assert.ok(firstChapter.totalSteps > 0);
  assert.ok(firstChapter.nextAction.lessonTitle);
  assert.equal(firstChapter.nextAction.type, "quickCheck");

  const check = curriculum.chemistry.chapters[0].lessons[0].quickCheck;
  const question = curriculum.chemistry.chapters[0].lessons[0].practiceSet[0];
  progress = answerQuickCheck(progress, check, check.answer, "2026-06-28T09:00:00.000Z");
  progress = answerPracticeQuestion(progress, question, question.answer, "2026-06-28T09:05:00.000Z");

  const updatedPath = getChapterLearningPath(curriculum, "chemistry", progress);

  assert.ok(updatedPath[0].completedSteps >= 2);
  assert.equal(updatedPath[0].nextAction.type, "quickCheck");
  assert.notEqual(updatedPath[0].nextAction.lessonTitle, firstChapter.nextAction.lessonTitle);
});

test("chapter learning path is available for every subject", () => {
  const progress = createDefaultProgress("2026-06-28");
  const subjects = ["english", "math", "chinese", "physics", "chemistry"];

  for (const subject of subjects) {
    const path = getChapterLearningPath(curriculum, subject, progress);

    assert.ok(path.length > 0);
    assert.ok(path.every((chapter) => chapter.title && chapter.totalSteps > 0));
    assert.ok(path.some((chapter) => chapter.nextAction));
  }
});

test("lesson self-check progress can be toggled and summarized", () => {
  let progress = createDefaultProgress("2026-06-28");
  const lesson = curriculum.physics.chapters[0].lessons[0];
  const firstItem = lesson.selfCheck[0];

  const initialSummary = getLessonSelfCheckSummary(lesson, progress);
  assert.equal(initialSummary.doneCount, 0);
  assert.equal(initialSummary.totalCount, lesson.selfCheck.length);

  progress = updateSelfCheckProgress(progress, lesson.id, firstItem, true, "2026-06-28T09:20:00.000Z");
  const checkedSummary = getLessonSelfCheckSummary(lesson, progress);

  assert.equal(checkedSummary.doneCount, 1);
  assert.equal(checkedSummary.items[0].done, true);
  assert.equal(checkedSummary.percent, Math.round((1 / lesson.selfCheck.length) * 100));

  progress = updateSelfCheckProgress(progress, lesson.id, firstItem, false, "2026-06-28T09:25:00.000Z");
  const uncheckedSummary = getLessonSelfCheckSummary(lesson, progress);

  assert.equal(uncheckedSummary.doneCount, 0);
  assert.equal(uncheckedSummary.items[0].done, false);
});

test("retrieval deck cards can be marked and weak recall enters review queue", () => {
  const lesson = curriculum.physics.chapters[0].lessons[0];
  const firstCard = lesson.retrievalDeck[0];
  let progress = createDefaultProgress("2026-06-28");
  let summary = getRetrievalDeckSummary(lesson, progress);

  assert.equal(summary.lessonId, lesson.id);
  assert.equal(summary.totalCount, lesson.retrievalDeck.length);
  assert.equal(summary.knownCount, 0);
  assert.equal(summary.weakCount, 0);
  assert.ok(summary.cards.every((card) => card.status === "new"));

  progress = updateRetrievalCardProgress(progress, firstCard.id, "weak", "2026-06-28T10:10:00.000Z");
  summary = getRetrievalDeckSummary(lesson, progress);

  assert.equal(summary.weakCount, 1);
  assert.equal(summary.cards[0].status, "weak");
  assert.equal(getRetrievalReviewQueue(curriculum, progress)[0].id, firstCard.id);
  assert.ok(getCrossSubjectReviewQueue(curriculum, progress).some((item) => item.type === "retrieval" && item.title.includes(firstCard.level)));
});

test("micro drills track completion and weak drills enter review queue", () => {
  const lesson = curriculum.chemistry.chapters[0].lessons[0];
  const firstDrill = lesson.microDrills[0];
  let progress = createDefaultProgress("2026-06-28");
  let summary = getMicroDrillSummary(lesson, progress);

  assert.equal(summary.lessonId, lesson.id);
  assert.equal(summary.totalCount, lesson.microDrills.length);
  assert.equal(summary.doneCount, 0);
  assert.ok(summary.drills.every((drill) => drill.status === "new"));

  progress = updateMicroDrillProgress(progress, firstDrill.id, "weak", "2026-06-28T10:20:00.000Z");
  summary = getMicroDrillSummary(lesson, progress);

  assert.equal(summary.weakCount, 1);
  assert.equal(summary.drills[0].status, "weak");
  assert.equal(getMicroDrillReviewQueue(curriculum, progress)[0].id, firstDrill.id);
  assert.ok(getCrossSubjectReviewQueue(curriculum, progress).some((item) => item.type === "micro-drill" && item.title.includes(firstDrill.method)));
});

test("exam targets track mastery and weak targets enter review queue", () => {
  const lesson = curriculum.math.chapters[0].lessons[0];
  const firstTarget = lesson.lessonExamTargets[0];
  let progress = createDefaultProgress("2026-06-28");
  let summary = getExamTargetSummary(lesson, progress);

  assert.equal(summary.lessonId, lesson.id);
  assert.equal(summary.totalCount, lesson.lessonExamTargets.length);
  assert.equal(summary.masteredCount, 0);
  assert.ok(summary.targets.every((target) => target.status === "new"));

  progress = updateExamTargetProgress(progress, firstTarget.id, "weak", "2026-06-28T10:30:00.000Z");
  summary = getExamTargetSummary(lesson, progress);

  assert.equal(summary.weakCount, 1);
  assert.equal(summary.targets[0].status, "weak");
  assert.equal(getExamTargetReviewQueue(curriculum, progress)[0].id, firstTarget.id);
  assert.ok(getCrossSubjectReviewQueue(curriculum, progress).some((item) => item.type === "exam-target" && item.title.includes(firstTarget.questionType)));
});

test("study packet output tracks completion and weak output enters review queue", () => {
  const lesson = curriculum.chinese.chapters[0].lessons[0];
  let progress = createDefaultProgress("2026-06-28");
  let summary = getStudyOutputSummary(lesson, progress);

  assert.equal(summary.lessonId, lesson.id);
  assert.equal(summary.id, lesson.studyPacket.output.id);
  assert.equal(summary.status, "new");
  assert.equal(summary.done, false);

  progress = updateStudyOutputProgress(progress, summary.id, "weak", "2026-06-28T10:40:00.000Z");
  summary = getStudyOutputSummary(lesson, progress);

  assert.equal(summary.status, "weak");
  assert.equal(summary.done, false);
  assert.equal(getStudyOutputReviewQueue(curriculum, progress)[0].id, lesson.studyPacket.output.id);
  assert.ok(getCrossSubjectReviewQueue(curriculum, progress).some((item) => item.type === "study-output" && item.title.includes("本课输出")));
});

test("glossary items track mastery and weak terms enter review queue", () => {
  const lesson = curriculum.math.chapters[0].lessons[0];
  const firstItem = lesson.lessonGlossary[0];
  let progress = createDefaultProgress("2026-06-28");
  let summary = getGlossarySummary(lesson, progress);

  assert.equal(summary.lessonId, lesson.id);
  assert.equal(summary.totalCount, lesson.lessonGlossary.length);
  assert.equal(summary.knownCount, 0);
  assert.ok(summary.items.every((item) => item.status === "new"));

  progress = updateGlossaryProgress(progress, firstItem.id, "weak", "2026-06-28T10:50:00.000Z");
  summary = getGlossarySummary(lesson, progress);

  assert.equal(summary.weakCount, 1);
  assert.equal(summary.items[0].status, "weak");
  assert.equal(getGlossaryReviewQueue(curriculum, progress)[0].id, firstItem.id);
  assert.ok(getCrossSubjectReviewQueue(curriculum, progress).some((item) => item.type === "glossary" && item.title.includes(firstItem.term)));
});

test("preview workflow steps track execution and stuck steps enter review queue", () => {
  const lesson = curriculum.physics.chapters[0].lessons[0];
  const firstStep = lesson.previewWorkflow[0];
  let progress = createDefaultProgress("2026-06-28");
  let summary = getPreviewWorkflowSummary(lesson, progress);

  assert.equal(summary.lessonId, lesson.id);
  assert.equal(summary.totalCount, lesson.previewWorkflow.length);
  assert.equal(summary.doneCount, 0);
  assert.ok(summary.steps.every((step) => step.status === "new"));

  progress = updatePreviewWorkflowProgress(progress, firstStep.id, "stuck", "2026-06-28T11:00:00.000Z");
  summary = getPreviewWorkflowSummary(lesson, progress);

  assert.equal(summary.stuckCount, 1);
  assert.equal(summary.steps[0].status, "stuck");
  assert.equal(getPreviewWorkflowReviewQueue(curriculum, progress)[0].id, firstStep.id);
  assert.ok(getCrossSubjectReviewQueue(curriculum, progress).some((item) => item.type === "preview-step" && item.title.includes(firstStep.title)));
});

test("reflection correction steps track repair progress and stuck steps enter review queue", () => {
  const lesson = curriculum.chemistry.chapters[0].lessons[0];
  const firstStep = lesson.reflectionCoach.correctionSteps[0];
  let progress = createDefaultProgress("2026-06-28");
  let summary = getReflectionStepSummary(lesson, progress);

  assert.equal(summary.lessonId, lesson.id);
  assert.equal(summary.totalCount, lesson.reflectionCoach.correctionSteps.length);
  assert.equal(summary.doneCount, 0);
  assert.ok(summary.steps.every((step) => step.status === "new"));

  progress = updateReflectionStepProgress(progress, firstStep.id, "stuck", "2026-06-28T11:10:00.000Z");
  summary = getReflectionStepSummary(lesson, progress);

  assert.equal(summary.stuckCount, 1);
  assert.equal(summary.steps[0].status, "stuck");
  assert.equal(getReflectionStepReviewQueue(curriculum, progress)[0].id, firstStep.id);
  assert.ok(getCrossSubjectReviewQueue(curriculum, progress).some((item) => item.type === "reflection-step" && item.title.includes(firstStep.text.slice(0, 8))));
});

test("entry diagnostic answers produce route advice before lesson preview", () => {
  let progress = createDefaultProgress("2026-06-28");
  const lesson = curriculum.english.chapters[0].lessons[0];
  const firstQuestion = lesson.entryDiagnostic.questions[0];
  const wrongAnswer = firstQuestion.choices.find((choice) => choice !== firstQuestion.answer);

  const initial = getLessonDiagnosticSummary(lesson, progress);
  assert.equal(initial.doneCount, 0);
  assert.equal(initial.totalCount, lesson.entryDiagnostic.questions.length);
  assert.equal(initial.route, "先做诊断");

  progress = answerEntryDiagnostic(progress, lesson, firstQuestion.id, wrongAnswer, "2026-06-28T08:00:00.000Z");
  const summary = getLessonDiagnosticSummary(lesson, progress);

  assert.equal(summary.doneCount, 1);
  assert.equal(summary.wrongCount, 1);
  assert.equal(summary.items[0].correct, false);
  assert.equal(summary.route, firstQuestion.ifWrong.route);
  assert.match(summary.recommendation, new RegExp(firstQuestion.ifWrong.action.slice(0, 6)));
  assert.ok(progress.weakTags.includes(firstQuestion.skill));
});

test("lesson next-step advice prioritizes diagnosis, correction, self-check and then next lesson", () => {
  const lesson = curriculum.math.chapters[0].lessons[0];
  const diagnostic = lesson.entryDiagnostic.questions[0];
  const wrongDiagnosticAnswer = diagnostic.choices.find((choice) => choice !== diagnostic.answer);
  let progress = createDefaultProgress("2026-06-28");

  let advice = getLessonNextStepAdvice(lesson, progress);
  assert.equal(advice.type, "diagnostic");
  assert.match(advice.action, /入口诊断/);

  progress = answerEntryDiagnostic(progress, lesson, diagnostic.id, wrongDiagnosticAnswer, "2026-06-28T08:00:00.000Z");
  advice = getLessonNextStepAdvice(lesson, progress);
  assert.equal(advice.type, "diagnostic-repair");
  assert.equal(advice.action, diagnostic.ifWrong.action);

  const practice = lesson.practiceSet[0];
  const wrongPracticeAnswer = practice.choices.find((choice) => choice !== practice.answer);
  progress = answerEntryDiagnostic(createDefaultProgress("2026-06-28"), lesson, diagnostic.id, diagnostic.answer, "2026-06-28T08:05:00.000Z");
  progress = answerPracticeQuestion(progress, practice, wrongPracticeAnswer, "2026-06-28T08:10:00.000Z");
  advice = getLessonNextStepAdvice(lesson, progress);
  assert.equal(advice.type, "practice-repair");
  assert.match(advice.action, /订正/);

  progress = createDefaultProgress("2026-06-28");
  for (const question of lesson.entryDiagnostic.questions) {
    progress = answerEntryDiagnostic(progress, lesson, question.id, question.answer, "2026-06-28T08:20:00.000Z");
  }
  advice = getLessonNextStepAdvice(lesson, progress);
  assert.equal(advice.type, "self-check");
  assert.match(advice.action, /输出检测|自查/);

  for (const item of lesson.selfCheck) {
    progress = updateSelfCheckProgress(progress, lesson.id, item, true, "2026-06-28T08:30:00.000Z");
  }
  advice = getLessonNextStepAdvice(lesson, progress);
  assert.equal(advice.type, "advance");
  assert.match(advice.action, /下一课|下一节|章节/);
});

test("lesson progress summary combines diagnosis, practice, quick check and self-check", () => {
  const lesson = curriculum.physics.chapters[0].lessons[0];
  let progress = createDefaultProgress("2026-06-28");
  let summary = getLessonProgressSummary(lesson, progress);

  assert.equal(summary.totalSteps, lesson.entryDiagnostic.questions.length + lesson.practiceSet.length + lesson.selfCheck.length + 1);
  assert.equal(summary.completedSteps, 0);
  assert.equal(summary.percent, 0);
  assert.equal(summary.nextStep.type, "diagnostic");
  assert.ok(summary.chips.some((chip) => chip.includes("诊断 0/")));

  for (const question of lesson.entryDiagnostic.questions) {
    progress = answerEntryDiagnostic(progress, lesson, question.id, question.answer, "2026-06-28T08:00:00.000Z");
  }
  for (const question of lesson.practiceSet) {
    progress = answerPracticeQuestion(progress, question, question.answer, "2026-06-28T08:05:00.000Z");
  }
  progress = answerQuickCheck(progress, lesson.quickCheck, lesson.quickCheck.answer, "2026-06-28T08:10:00.000Z");
  for (const item of lesson.selfCheck) {
    progress = updateSelfCheckProgress(progress, lesson.id, item, true, "2026-06-28T08:15:00.000Z");
  }

  summary = getLessonProgressSummary(lesson, progress);
  assert.equal(summary.completedSteps, summary.totalSteps);
  assert.equal(summary.percent, 100);
  assert.equal(summary.nextStep.type, "advance");
  assert.ok(summary.chips.includes("快测 已过"));
});

test("lesson learning loop summary combines all interactive preview checkpoints", () => {
  const lesson = curriculum.english.chapters[0].lessons[0];
  const progress = createDefaultProgress("2026-06-28");
  const summary = getLessonLearningLoopSummary(lesson, progress);
  const ids = summary.stages.map((stage) => stage.id);

  assert.equal(summary.lessonId, lesson.id);
  assert.deepEqual(ids, [
    "diagnostic",
    "preview-workflow",
    "glossary",
    "study-output",
    "retrieval",
    "micro-drill",
    "exam-target",
    "reflection",
    "self-check",
  ]);
  assert.ok(summary.totalCount > 0);
  assert.equal(summary.doneCount, 0);
  assert.equal(summary.percent, 0);
  assert.equal(summary.stages.find((stage) => stage.id === "glossary").totalCount, lesson.lessonGlossary.length);
  assert.equal(summary.stages.find((stage) => stage.id === "retrieval").totalCount, lesson.retrievalDeck.length);
});

test("chapter learning loop summary aggregates lesson loops and highlights review lessons", () => {
  const chapter = curriculum.math.chapters[0];
  const lesson = chapter.lessons[0];
  const firstGlossaryItem = lesson.lessonGlossary[0];
  let progress = createDefaultProgress("2026-06-28");
  progress = updateGlossaryProgress(progress, firstGlossaryItem.id, "weak", "2026-06-28T12:00:00.000Z");
  const summary = getChapterLearningLoopSummary(chapter, progress);

  assert.equal(summary.chapterId, chapter.id);
  assert.equal(summary.lessonCount, chapter.lessons.length);
  assert.equal(summary.lessons.length, chapter.lessons.length);
  assert.ok(summary.totalCount > 0);
  assert.equal(summary.reviewLessonCount, 1);
  assert.equal(summary.lessons[0].reviewCount, 1);
  assert.ok(summary.lessons[0].weakStages.some((stage) => stage.title === "本课必会"));
});

test("subject learning loop summary aggregates chapter loops and points to review chapters", () => {
  const subject = curriculum.math;
  const chapter = subject.chapters[0];
  const lesson = chapter.lessons[0];
  let progress = createDefaultProgress("2026-06-28");
  progress = updateGlossaryProgress(progress, lesson.lessonGlossary[0].id, "weak", "2026-06-28T12:10:00.000Z");
  const summary = getSubjectLearningLoopSummary(subject, progress);

  assert.equal(summary.subjectName, subject.name);
  assert.equal(summary.chapterCount, subject.chapters.length);
  assert.equal(summary.chapters.length, subject.chapters.length);
  assert.ok(summary.totalCount > 0);
  assert.equal(summary.reviewChapterCount, 1);
  assert.equal(summary.chapters[0].reviewLessonCount, 1);
  assert.equal(summary.nextChapter.chapterId, chapter.id);
});

test("all-subject learning loop summary prioritizes subjects with review chapters", () => {
  const subject = curriculum.math;
  const chapter = subject.chapters[0];
  const lesson = chapter.lessons[0];
  let progress = createDefaultProgress("2026-06-28");
  progress = updateGlossaryProgress(progress, lesson.lessonGlossary[0].id, "weak", "2026-06-28T12:20:00.000Z");
  const summary = getAllSubjectLearningLoopSummary(curriculum, progress);

  assert.equal(summary.subjectCount, 5);
  assert.deepEqual(
    summary.subjects.map((item) => item.subjectId),
    ["english", "math", "chinese", "physics", "chemistry"],
  );
  assert.ok(summary.totalCount > 0);
  assert.equal(summary.reviewSubjectCount, 1);
  assert.equal(summary.nextSubject.subjectId, "math");
  assert.equal(summary.nextSubject.nextChapter.chapterId, chapter.id);
  assert.equal(summary.subjects.find((item) => item.subjectId === "math").reviewChapterCount, 1);
});

test("correct quick-check answers store attempts without creating mistakes", () => {
  const progress = createDefaultProgress("2026-06-28");
  const check = curriculum.chinese.chapters[0].lessons[0].quickCheck;
  const next = answerQuickCheck(progress, check, check.answer, "2026-06-28T08:35:00.000Z");

  assert.equal(next.quickCheckMistakes.length, 0);
  assert.equal(next.quickCheckAttempts[check.id].correct, true);
});

test("wrong lesson practice answers create reviewable mistakes", () => {
  const progress = createDefaultProgress("2026-06-28");
  const question = curriculum.physics.chapters[0].lessons[0].practiceSet[0];
  const wrongAnswer = question.choices.find((choice) => choice !== question.answer);
  const next = answerPracticeQuestion(progress, question, wrongAnswer, "2026-06-28T08:40:00.000Z");

  assert.equal(next.practiceMistakes.length, 1);
  assert.equal(next.practiceMistakes[0].questionId, question.id);
  assert.equal(next.practiceAttempts[question.id].correct, false);

  const queue = getCrossSubjectReviewQueue(curriculum, next);
  assert.equal(queue[0].type, "practice");
  assert.match(queue[0].title, /杠杆|平衡|力臂|物理/);
});

test("mistakes include diagnosis and repair actions for efficient review", () => {
  let progress = createDefaultProgress("2026-06-28");
  const practice = curriculum.chemistry.chapters[1].lessons[2].practiceSet[0];
  const wrongPracticeAnswer = practice.choices.find((choice) => choice !== practice.answer);
  progress = answerPracticeQuestion(progress, practice, wrongPracticeAnswer, "2026-06-28T08:40:00.000Z");

  const check = curriculum.physics.chapters[0].lessons[0].quickCheck;
  const wrongCheckAnswer = check.choices.find((choice) => choice !== check.answer);
  progress = answerQuickCheck(progress, check, wrongCheckAnswer, "2026-06-28T08:45:00.000Z");

  const math = curriculum.math.exercises[0];
  progress = answerMathExercise(progress, math, "wrong", "2026-06-28T08:50:00.000Z");

  const mistakes = [progress.practiceMistakes[0], progress.quickCheckMistakes[0], progress.mathMistakes[0]];
  assert.ok(
    mistakes.every(
      (mistake) =>
        mistake.diagnosis?.label &&
        mistake.diagnosis.reason &&
        mistake.repairAction?.title &&
        mistake.repairAction.steps?.length >= 2,
    ),
  );

  const queue = getCrossSubjectReviewQueue(curriculum, progress);
  assert.ok(queue.some((item) => item.type === "practice" && item.diagnosis && item.repairAction));
  assert.ok(queue.some((item) => item.type === "quick-check" && item.diagnosis && item.repairAction));
  assert.ok(queue.some((item) => item.type === "math" && item.diagnosis && item.repairAction));
});

test("knowledge cards can be reviewed across subjects with weak cards first", () => {
  let progress = createDefaultProgress("2026-06-28");
  const mathCard = curriculum.math.chapters[0].lessons[0].knowledgeCards[0];
  const englishCard = curriculum.english.chapters[0].lessons[0].knowledgeCards[0];

  progress = updateKnowledgeCardProgress(progress, mathCard.id, "known", "2026-06-28T08:00:00.000Z");
  progress = updateKnowledgeCardProgress(progress, englishCard.id, "weak", "2026-06-28T08:01:00.000Z");

  const queue = getKnowledgeReviewQueue(curriculum, progress, 5);

  assert.equal(progress.knowledgeCards[mathCard.id].status, "known");
  assert.equal(progress.knowledgeCards[englishCard.id].status, "weak");
  assert.equal(queue[0].id, englishCard.id);
  assert.equal(queue[0].status, "weak");
  assert.ok(queue.every((card) => card.concept && card.retrievalPrompt));
});

test("chapter knowledge checklist summarizes mastery within a chapter", () => {
  let progress = createDefaultProgress("2026-06-28");
  const chapter = curriculum.math.chapters[0];
  const firstCard = chapter.lessons[0].knowledgeCards[0];

  const initialChecklist = getChapterKnowledgeChecklist(curriculum, "math", chapter.id, progress);

  assert.equal(initialChecklist.subject, "math");
  assert.equal(initialChecklist.chapterTitle, chapter.title);
  assert.equal(initialChecklist.totalCount, chapter.lessons.length * 3);
  assert.equal(initialChecklist.knownCount, 0);
  assert.equal(initialChecklist.items[0].status, "new");
  assert.ok(initialChecklist.items.every((item) => item.lessonTitle && item.concept && item.retrievalPrompt));
  assert.equal(initialChecklist.lessonGroups.length, chapter.lessons.length);
  assert.equal(
    initialChecklist.lessonGroups.reduce((sum, group) => sum + group.items.length, 0),
    initialChecklist.totalCount,
  );
  assert.ok(initialChecklist.lessonGroups.every((group) => group.lessonTitle && group.items.length >= 3));

  progress = updateKnowledgeCardProgress(progress, firstCard.id, "known", "2026-06-28T10:00:00.000Z");
  const updatedChecklist = getChapterKnowledgeChecklist(curriculum, "math", chapter.id, progress);

  assert.equal(updatedChecklist.knownCount, 1);
  assert.equal(updatedChecklist.percent, Math.round((1 / updatedChecklist.totalCount) * 100));
  assert.equal(updatedChecklist.items.at(-1).id, firstCard.id);
  assert.equal(updatedChecklist.items.at(-1).status, "known");
});

test("chapter mastery summary tracks chapter-end evidence across checklist columns", () => {
  const chapter = curriculum.english.chapters[0];
  let progress = createDefaultProgress("2026-06-28");
  let summary = getChapterMasterySummary(chapter, progress);

  assert.equal(summary.chapterId, chapter.id);
  assert.ok(summary.totalCount >= 12);
  assert.equal(summary.doneCount, 0);
  assert.equal(summary.percent, 0);
  assert.equal(summary.groups.length, 4);
  assert.ok(summary.groups.every((group) => group.items.length >= 3));

  const firstItem = summary.groups[0].items[0];
  progress = updateChapterMasteryProgress(progress, firstItem.id, true, "2026-06-28T10:00:00.000Z");
  summary = getChapterMasterySummary(chapter, progress);

  assert.equal(summary.doneCount, 1);
  assert.equal(summary.groups[0].items[0].done, true);
  assert.equal(summary.percent, Math.round((1 / summary.totalCount) * 100));
});

test("subject knowledge bank covers every chapter knowledge card and prioritizes unmastered items", () => {
  let progress = createDefaultProgress("2026-06-28");
  const subjectId = "physics";
  const firstCard = curriculum.physics.chapters[0].lessons[0].knowledgeCards[0];
  const expectedTotal = curriculum.physics.chapters.reduce(
    (sum, chapter) => sum + chapter.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.knowledgeCards.length, 0),
    0,
  );

  const initialBank = getSubjectKnowledgeBank(curriculum, subjectId, progress);

  assert.equal(initialBank.subject, subjectId);
  assert.equal(initialBank.totalCount, expectedTotal);
  assert.equal(initialBank.knownCount, 0);
  assert.ok(initialBank.items.every((item) => item.chapterTitle && item.lessonTitle && item.examCue && item.trap));

  progress = updateKnowledgeCardProgress(progress, firstCard.id, "known", "2026-06-28T10:10:00.000Z");
  const updatedBank = getSubjectKnowledgeBank(curriculum, subjectId, progress);

  assert.equal(updatedBank.knownCount, 1);
  assert.equal(updatedBank.items.at(-1).id, firstCard.id);
  assert.equal(updatedBank.items.at(-1).status, "known");
});

test("subject knowledge bank can be filtered by keyword and mastery status", () => {
  let progress = createDefaultProgress("2026-06-28");
  const subjectId = "physics";
  const firstCard = curriculum.physics.chapters[0].lessons[0].knowledgeCards[0];
  const bank = getSubjectKnowledgeBank(curriculum, subjectId, progress);

  const keywordResult = filterSubjectKnowledgeBank(bank, { query: "杠杆", status: "all" });
  assert.ok(keywordResult.items.length > 0);
  assert.ok(keywordResult.items.every((item) => [item.concept, item.chapterTitle, item.lessonTitle, item.examCue, item.trap].join(" ").includes("杠杆")));

  progress = updateKnowledgeCardProgress(progress, firstCard.id, "known", "2026-06-28T10:10:00.000Z");
  const updatedBank = getSubjectKnowledgeBank(curriculum, subjectId, progress);
  const knownResult = filterSubjectKnowledgeBank(updatedBank, { query: "", status: "known" });
  const unmasteredResult = filterSubjectKnowledgeBank(updatedBank, { query: "", status: "unmastered" });

  assert.equal(knownResult.items.length, 1);
  assert.equal(knownResult.items[0].id, firstCard.id);
  assert.equal(unmasteredResult.items.some((item) => item.id === firstCard.id), false);
  assert.equal(filterSubjectKnowledgeBank(updatedBank, { query: "", status: "all" }).items.length, updatedBank.totalCount);
});

test("wrong grammar mini quiz answers create English grammar review items", () => {
  const progress = createDefaultProgress("2026-06-28");
  const quiz = curriculum.english.chapters[0].grammarNotes[0].miniQuiz;
  const wrongAnswer = quiz.choices.find((choice) => choice !== quiz.answer);
  const next = answerGrammarQuiz(progress, quiz, wrongAnswer, "2026-06-28T08:45:00.000Z");

  assert.equal(next.grammarMistakes.length, 1);
  assert.equal(next.grammarMistakes[0].quizId, quiz.id);
  assert.equal(next.grammarAttempts[quiz.id].correct, false);

  const queue = getCrossSubjectReviewQueue(curriculum, next);
  assert.equal(queue[0].type, "grammar");
  assert.match(queue[0].title, /either|neither|语法|并列/);
});

test("grammar review queue covers grammar points and prioritizes missed quizzes", () => {
  let progress = createDefaultProgress("2026-06-28");
  const firstQuiz = curriculum.english.chapters[0].grammarNotes[0].miniQuiz;
  const wrongAnswer = firstQuiz.choices.find((choice) => choice !== firstQuiz.answer);

  const initialQueue = getGrammarReviewQueue(curriculum, progress);
  assert.equal(initialQueue.length, 24);
  assert.equal(initialQueue[0].status, "new");
  assert.ok(initialQueue.every((item) => item.quiz.question && item.explanation && item.checkpoint));

  progress = answerGrammarQuiz(progress, firstQuiz, wrongAnswer, "2026-06-28T08:45:00.000Z");
  const reviewQueue = getGrammarReviewQueue(curriculum, progress);

  assert.equal(reviewQueue[0].status, "missed");
  assert.equal(reviewQueue[0].quiz.id, firstQuiz.id);
  assert.match(reviewQueue[0].title, /either|neither|并列/);
});

test("grammar mastery summary tracks unit grammar completion", () => {
  let progress = createDefaultProgress("2026-06-28");
  const unit = curriculum.english.chapters[0];

  const initialSummary = getGrammarMasterySummary(unit, progress);
  const firstNoteId = initialSummary.items[0].id;
  assert.equal(initialSummary.doneCount, 0);
  assert.equal(initialSummary.totalCount, unit.grammarNotes.length);
  assert.equal(initialSummary.items[0].done, false);

  progress = updateGrammarMasteryProgress(progress, firstNoteId, true, "2026-06-28T09:40:00.000Z");
  const updatedSummary = getGrammarMasterySummary(unit, progress);

  assert.equal(updatedSummary.doneCount, 1);
  assert.equal(updatedSummary.items[0].done, true);
  assert.equal(updatedSummary.percent, Math.round((1 / unit.grammarNotes.length) * 100));

  progress = updateGrammarMasteryProgress(progress, firstNoteId, false, "2026-06-28T09:45:00.000Z");
  const uncheckedSummary = getGrammarMasterySummary(unit, progress);

  assert.equal(uncheckedSummary.doneCount, 0);
  assert.equal(uncheckedSummary.items[0].done, false);
});

test("Chinese dictation words can be reviewed with weak words first", () => {
  let progress = createDefaultProgress("2026-06-28");
  const queue = getDictationReviewQueue(curriculum, progress, 4);
  const firstWord = queue[0];
  const secondWord = queue[1];

  progress = updateDictationProgress(progress, firstWord.id, "known", "2026-06-28T09:00:00.000Z");
  progress = updateDictationProgress(progress, secondWord.id, "weak", "2026-06-28T09:01:00.000Z");

  const nextQueue = getDictationReviewQueue(curriculum, progress, 4);

  assert.equal(progress.dictationWords[firstWord.id].status, "known");
  assert.equal(progress.dictationWords[secondWord.id].status, "weak");
  assert.equal(nextQueue[0].id, secondWord.id);
  assert.equal(nextQueue[0].subject, "chinese");
  assert.ok(nextQueue[0].word && nextQueue[0].lessonTitle && nextQueue[0].retrievalPrompt);
});

test("weak Chinese dictation words enter the cross-subject review queue", () => {
  let progress = createDefaultProgress("2026-06-28");
  const [word] = getDictationReviewQueue(curriculum, progress, 1);
  progress = updateDictationProgress(progress, word.id, "weak", "2026-06-28T09:05:00.000Z");

  const queue = getCrossSubjectReviewQueue(curriculum, progress);
  const item = queue.find((entry) => entry.type === "dictation" && entry.title === word.word);

  assert.ok(item);
  assert.equal(item.subject, "chinese");
  assert.match(item.action, /重写|默写|订正/);
});

test("Chinese writing missions advance after completion", () => {
  let progress = createDefaultProgress("2026-06-28");
  const queue = getWritingMissionQueue(curriculum, progress, 3);
  const first = queue[0];

  assert.equal(first.subject, "chinese");
  assert.ok(first.lessonTitle && first.chapterTitle && first.task);
  assert.equal(first.status, "new");

  progress = updateWritingMissionProgress(progress, first.id, "done", "2026-06-28T10:00:00.000Z");
  const nextQueue = getWritingMissionQueue(curriculum, progress, 50);

  assert.equal(progress.writingMissions[first.id].status, "done");
  assert.notEqual(nextQueue[0].id, first.id);
  assert.equal(nextQueue.at(-1).id, first.id);
  assert.equal(nextQueue.at(-1).status, "done");
});

test("Chinese writing self-assessment creates review actions for weak criteria", () => {
  let progress = createDefaultProgress("2026-06-28");
  const [first] = getWritingMissionQueue(curriculum, progress, 1);
  progress = updateWritingMissionProgress(
    progress,
    first.id,
    "done",
    "2026-06-28T10:00:00.000Z",
    { evidence: false, structure: true, language: false },
  );

  const completed = getWritingMissionQueue(curriculum, progress, 50).find((item) => item.id === first.id);
  assert.deepEqual(completed.selfAssessment.weakCriteria, ["evidence", "language"]);

  const reviewItem = getCrossSubjectReviewQueue(curriculum, progress).find((item) => item.type === "writing" && item.title.includes(first.lessonTitle));
  assert.ok(reviewItem);
  assert.equal(reviewItem.subject, "chinese");
  assert.match(reviewItem.action, /文本依据|语言|复盘|修改/);
});

test("Chinese daily lesson mission combines dictation, reading evidence and writing output", () => {
  let progress = createDefaultProgress("2026-06-28");
  const firstMission = getChineseDailyLessonMission(curriculum, progress);

  assert.equal(firstMission.subject, "chinese");
  assert.match(firstMission.chapterTitle, /第一单元/);
  assert.ok(firstMission.lessonTitle);
  assert.ok(firstMission.dictation.words.length >= 4);
  assert.ok(firstMission.dictation.prompt);
  assert.ok(firstMission.reading.prompt);
  assert.match(firstMission.reading.checkRule, /文本依据|词句|关键词/);
  assert.ok(firstMission.writing.task);
  assert.match(firstMission.writing.checkRule, /60|80|表达|仿写|批注/);

  progress = updateWritingMissionProgress(progress, firstMission.writing.id, "done", "2026-06-28T10:00:00.000Z");
  const nextMission = getChineseDailyLessonMission(curriculum, progress);

  assert.notEqual(nextMission.lessonId, firstMission.lessonId);
  assert.equal(nextMission.status, "new");
});

test("cross-subject review queue combines weak words, math mistakes, and quick-check mistakes", () => {
  let progress = createDefaultProgress("2026-06-28");
  progress = updateFlashcardProgress(progress, "eng-u1-1-race", "unknown", "2026-06-28T08:00:00.000Z");
  progress = updateFlashcardProgress(progress, "eng-u1-8-creative", "fuzzy", "2026-06-28T08:01:00.000Z");
  progress = answerMathExercise(progress, curriculum.math.exercises[0], "wrong", "2026-06-28T08:10:00.000Z");
  const check = curriculum.chemistry.chapters[0].lessons[0].quickCheck;
  const wrongQuickAnswer = check.choices.find((choice) => choice !== check.answer);
  progress = answerQuickCheck(progress, check, wrongQuickAnswer, "2026-06-28T08:20:00.000Z");

  const queue = getCrossSubjectReviewQueue(curriculum, progress);

  assert.deepEqual(
    queue.map((item) => item.type),
    ["word", "quick-check", "math", "word"],
  );
  assert.equal(queue[0].title, "race");
  assert.equal(queue[0].priority, 1);
  assert.match(queue[1].title, /化学|变化|空气|氧气|物质/);
  assert.equal(queue[2].subject, "math");
  assert.equal(queue[3].priority, 2);
});

test("progress can be saved and loaded from browser-like local storage", () => {
  const store = new Map();
  const storage = {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, value),
  };
  const progress = updateFlashcardProgress(
    createDefaultProgress("2026-06-28"),
    "eng-u1-1-race",
    "known",
    "2026-06-28T08:20:00.000Z",
  );

  saveProgress(storage, progress);
  const loaded = loadProgress(storage, "2026-06-28");

  assert.equal(loaded.flashcards["eng-u1-1-race"].status, "known");
  assert.equal(loaded.startedOn, "2026-06-28");
});
