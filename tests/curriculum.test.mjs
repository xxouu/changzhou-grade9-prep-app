import test from "node:test";
import assert from "node:assert/strict";

import {
  curriculum,
  getReviewCoverageSummary,
  getSubjectChapterIndex,
  getCurriculumCoverageSummary,
  subjectOrder,
} from "../src/content.mjs";

test("chemistry version is Shanghai Education Press while other confirmed versions remain", () => {
  assert.match(curriculum.meta.defaultVersions.chemistry, /沪教版/);
  assert.match(curriculum.meta.defaultVersions.chinese, /统编\/人教版/);
  assert.match(curriculum.meta.defaultVersions.math, /苏科版/);
  assert.match(curriculum.meta.defaultVersions.english, /译林版/);
  assert.match(curriculum.meta.defaultVersions.physics, /苏科版/);
});

test("textbook version audit records confirmed source notes for all subjects", () => {
  for (const subjectId of subjectOrder) {
    const version = curriculum.meta.defaultVersions[subjectId];
    const audit = curriculum.meta.versionAudit?.[subjectId];

    assert.ok(version, `${subjectId} should have a configured textbook version`);
    assert.doesNotMatch(version, /待人工确认/, `${subjectId} version should not show stale pending confirmation`);
    assert.equal(audit?.status, "confirmed", `${subjectId} version should be confirmed`);
    assert.ok(audit.source, `${subjectId} version audit needs a source`);
    assert.ok(audit.note, `${subjectId} version audit needs a note`);
  }

  assert.match(curriculum.meta.versionAudit.chemistry.note, /沪教版/);
  assert.match(curriculum.meta.versionAudit.english.note, /译林版/);
});

test("every subject exposes chapter or unit lists with lesson-level study points", () => {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    assert.ok(Array.isArray(subject.chapters), `${subjectId} chapters should be an array`);
    assert.ok(subject.chapters.length >= 4, `${subjectId} should include multiple chapters`);

    for (const chapter of subject.chapters) {
      assert.ok(chapter.title, `${subjectId} chapter needs a title`);
      assert.ok(Array.isArray(chapter.lessons), `${subjectId} chapter needs lessons`);
      assert.ok(chapter.lessons.length >= 1, `${subjectId} chapter should contain lessons`);
      assert.ok(chapter.lessons.every((lesson) => lesson.title && lesson.keyPoints?.length), `${subjectId} lessons need key points`);
    }
  }
});

test("english contains daily word groups for each unit", () => {
  assert.equal(curriculum.english.chapters.length, 8);
  for (const unit of curriculum.english.chapters) {
    const totalWords = unit.dailyWords.flatMap((day) => day.words);
    assert.ok(unit.dailyWords?.length >= 2, `${unit.title} should include daily word groups`);
    assert.ok(unit.dailyWords.every((day) => day.words.length >= 1 && day.words.length <= 5), `${unit.title} should use small daily groups`);
    assert.ok(totalWords.length >= 45, `${unit.title} should include a near-complete wordlist, not a tiny sample`);
    assert.ok(totalWords.every((word) => word.cn && word.cn !== "释义待校对"), `${unit.title} should include Chinese meanings`);
    assert.ok(unit.phrases?.length >= 6, `${unit.title} should include key phrases`);
    assert.ok(unit.sentencePatterns?.length >= 3, `${unit.title} should include sentence patterns`);
    assert.ok(unit.grammarNotes?.length >= 2, `${unit.title} should include grammar explanations`);
    assert.ok(unit.grammarNotes.every((note) => note.explanation && note.example && note.drill), `${unit.title} grammar notes should be actionable`);
  }
});

test("english grammar notes include enough actionable checkpoints", () => {
  for (const unit of curriculum.english.chapters) {
    assert.ok(unit.grammarNotes?.length >= 3, `${unit.title} should include at least three grammar points`);
    assert.ok(
      unit.grammarNotes.every((note) => note.explanation && note.example && note.drill && note.checkpoint),
      `${unit.title} grammar notes should include explanation, example, drill and checkpoint`,
    );
    assert.ok(
      unit.grammarNotes.every(
        (note) =>
          note.miniQuiz?.id &&
          note.miniQuiz.question &&
          note.miniQuiz.choices?.length >= 3 &&
          note.miniQuiz.answer &&
          note.miniQuiz.explanation,
      ),
      `${unit.title} grammar notes should include a clickable mini quiz`,
    );
  }
});

test("english units include translation drills that connect words, phrases and grammar", () => {
  for (const unit of curriculum.english.chapters) {
    assert.ok(unit.translationDrills?.length >= 6, `${unit.title} should include enough translation drills`);
    assert.ok(
      unit.translationDrills.some((drill) => drill.direction === "cn-en") &&
        unit.translationDrills.some((drill) => drill.direction === "en-cn"),
      `${unit.title} should train both Chinese-to-English and English-to-Chinese translation`,
    );
    assert.ok(
      unit.translationDrills.every(
        (drill) =>
          drill.prompt &&
          drill.answer &&
          drill.explanation &&
          drill.focus &&
          drill.hint &&
          ["cn-en", "en-cn", "phrase"].includes(drill.direction),
      ),
      `${unit.title} translation drills need prompt, answer, explanation, focus and hint`,
    );
    assert.ok(
      unit.translationDrills.some((drill) =>
        unit.phrases.some((phrase) => drill.answer.includes(phrase) || drill.prompt.includes(phrase) || drill.focus.includes(phrase)),
      ),
      `${unit.title} translation drills should reuse unit phrases`,
    );
  }
});

test("lesson practice questions use subject-specific checks instead of generic templates", () => {
  const genericTemplate = /最先要抓住哪一项|不是假会|只把标题抄一遍|跳过例题和文本依据|第一步应先确认什么|第一步最应该做什么/;

  for (const subjectId of subjectOrder) {
    const questions = curriculum[subjectId].chapters.flatMap((chapter) =>
      chapter.lessons.flatMap((lesson) => lesson.practiceSet ?? []),
    );

    assert.ok(questions.length >= 8, `${subjectId} should have lesson practice questions`);
    assert.equal(
      questions.every((question) => !genericTemplate.test([question.question, ...question.choices].join(" "))),
      true,
      `${subjectId} practice questions should be written as subject-specific learning checks`,
    );
  }
});

test("math practice questions look like real grade-nine math tasks instead of study prompts", () => {
  const bannedPrompt = /第一步|确认什么|预习|基础题前|最应该做什么/;
  const mathTaskPattern = /x²|Δ|∠|°|半径|弦|切线|平均数|中位数|方差|概率|列表|树状图|y\s*=|顶点|对称轴|\d/;
  const questions = curriculum.math.chapters.flatMap((chapter) =>
    chapter.lessons.flatMap((lesson) => [
      ...(lesson.practiceSet ?? []),
      ...(lesson.quickCheck ? [lesson.quickCheck] : []),
    ]),
  );

  assert.ok(questions.length >= 40);
  assert.equal(
    questions.every((question) => !bannedPrompt.test(question.question)),
    true,
    "math questions should not be meta study prompts",
  );
  assert.equal(
    questions.every((question) => mathTaskPattern.test([question.question, question.answer, question.explanation].join(" "))),
    true,
    "math questions should contain concrete mathematical quantities, relations or expressions",
  );
});

test("chemistry practice questions use concrete experiment contexts instead of meta prompts", () => {
  const bannedPrompt = /最可靠|相关问题|哪一种判断|判断“[^”]+”相关|只凭生活经验/;
  const chemistryTaskPattern =
    /蜡烛|氧气|氮气|红磷|水面|木条|铁丝|高锰酸钾|过氧化氢|二氧化锰|电解水|过滤|肥皂水|分子|原子|离子|元素|化学式|H₂O|质量守恒|方程式|CO|Fe₂O₃|铁钉|生锈|新物质|物理性质|化学性质|反应前|反应中|反应后|二氧化碳|石灰水|氨气|氢气|镁|锌|稀盐酸|不锈钢|合金/;
  const questions = curriculum.chemistry.chapters.flatMap((chapter) =>
    chapter.lessons.flatMap((lesson) => [
      ...(lesson.practiceSet ?? []),
      ...(lesson.quickCheck ? [lesson.quickCheck] : []),
    ]),
  );

  assert.ok(questions.length >= 25);
  assert.equal(
    questions.every((question) => !bannedPrompt.test([question.question, ...(question.choices ?? [])].join(" "))),
    true,
    "chemistry questions should not be meta study prompts",
  );
  assert.equal(
    questions.every((question) => chemistryTaskPattern.test([question.question, question.answer, question.explanation].join(" "))),
    true,
    "chemistry questions should contain concrete substances, observations, operations or symbols",
  );
});

test("every chapter provides an efficient knowledge map for preview learning", () => {
  for (const subjectId of subjectOrder) {
    for (const chapter of curriculum[subjectId].chapters) {
      assert.ok(chapter.knowledgeMap, `${subjectId} ${chapter.title} needs a knowledge map`);
      assert.ok(chapter.knowledgeMap.goal, `${subjectId} ${chapter.title} needs a preview goal`);
      assert.ok(chapter.knowledgeMap.coreIdeas?.length >= 3, `${subjectId} ${chapter.title} needs core ideas`);
      assert.ok(chapter.knowledgeMap.traps?.length >= 2, `${subjectId} ${chapter.title} needs common traps`);
      assert.ok(chapter.knowledgeMap.practicePath?.length >= 3, `${subjectId} ${chapter.title} needs a practice path`);
      assert.ok(chapter.knowledgeMap.retrievalPrompt, `${subjectId} ${chapter.title} needs a retrieval prompt`);
    }
  }
});

test("every chapter has a chapter-end mastery checklist for closing the unit", () => {
  for (const subjectId of subjectOrder) {
    for (const chapter of curriculum[subjectId].chapters) {
      const checklist = chapter.chapterMasteryChecklist;

      assert.ok(checklist, `${subjectId} ${chapter.title} needs a chapter-end mastery checklist`);
      assert.ok(checklist.title && checklist.summary, `${subjectId} ${chapter.title} needs title and summary`);
      assert.ok(checklist.mustKnow?.length >= 4, `${subjectId} ${chapter.title} needs must-know items`);
      assert.ok(checklist.outputTasks?.length >= 3, `${subjectId} ${chapter.title} needs output checks`);
      assert.ok(checklist.repairPrompts?.length >= 2, `${subjectId} ${chapter.title} needs repair prompts`);
      assert.ok(checklist.masteryEvidence?.length >= 3, `${subjectId} ${chapter.title} needs mastery evidence`);
      assert.ok(
        checklist.outputTasks.some((item) => /说出|写出|完成|默写|解释|判断|画出/.test(item)),
        `${subjectId} ${chapter.title} output tasks should be observable`,
      );
    }
  }
});

test("math physics and chemistry chapters include tiered practice sets", () => {
  for (const subjectId of ["math", "physics", "chemistry"]) {
    for (const chapter of curriculum[subjectId].chapters) {
      assert.ok(chapter.chapterTieredPractice, `${subjectId} ${chapter.title} needs tiered chapter practice`);
      assert.deepEqual(
        chapter.chapterTieredPractice.map((tier) => tier.level),
        ["基础", "巩固", "挑战"],
        `${subjectId} ${chapter.title} should use three practice levels`,
      );
      assert.ok(
        chapter.chapterTieredPractice.every(
          (tier) =>
            tier.goal &&
            tier.questions?.length >= 2 &&
            tier.questions.every(
              (question) =>
                question.id &&
                question.concept &&
                question.question &&
                question.answer &&
                question.explanation &&
                question.trap,
            ),
        ),
        `${subjectId} ${chapter.title} tiered practice needs complete questions and explanations`,
      );
    }
  }
});

test("subject chapter index summarizes learning load and review material", () => {
  for (const subjectId of subjectOrder) {
    const index = getSubjectChapterIndex(curriculum, subjectId);
    const subject = curriculum[subjectId];

    assert.equal(index.length, subject.chapters.length, `${subjectId} index should cover every chapter`);
    assert.ok(index.every((chapter) => chapter.id && chapter.title && chapter.lessonCount >= 1));
    assert.ok(index.every((chapter) => chapter.knowledgeCardCount >= chapter.lessonCount * 3));
    assert.ok(index.every((chapter) => chapter.practiceQuestionCount >= chapter.lessonCount * 2));
    assert.ok(index.every((chapter) => chapter.quickCheckCount === chapter.lessonCount));
    assert.ok(index.every((chapter) => chapter.coreIdeas.length >= 3));
    assert.ok(index.every((chapter) => chapter.traps.length >= 2));
  }

  const englishIndex = getSubjectChapterIndex(curriculum, "english");
  assert.ok(englishIndex.every((chapter) => chapter.wordCount >= 45));

  const chineseIndex = getSubjectChapterIndex(curriculum, "chinese");
  assert.ok(chineseIndex.every((chapter) => chapter.dictationWordCount >= chapter.lessonCount * 4));
});

test("curriculum coverage summary exposes subject coverage and review gaps", () => {
  const summary = getCurriculumCoverageSummary(curriculum);

  assert.deepEqual(summary.subjects.map((subject) => subject.id), subjectOrder);
  assert.ok(summary.totals.chapters >= 25);
  assert.ok(summary.totals.lessons >= 60);
  assert.ok(summary.totals.knowledgeCards >= summary.totals.lessons * 3);
  assert.ok(summary.totals.practiceQuestions >= summary.totals.lessons * 2);

  const english = summary.subjects.find((subject) => subject.id === "english");
  assert.equal(english.wordCount, curriculum.english.flashcards.length);
  assert.equal(english.grammarCount, 24);
  assert.equal(english.gaps.length, 0);

  assert.equal(summary.review.pendingCount, 0);
  assert.deepEqual(summary.review.pendingSubjects, []);
});

test("review coverage summary confirms all shipped activities are approved", () => {
  const summary = getReviewCoverageSummary(curriculum);

  assert.deepEqual(summary.subjects.map((subject) => subject.id), subjectOrder);
  assert.ok(summary.totalCount >= summary.approvedCount + summary.pendingCount);
  assert.ok(summary.approvedCount >= 1);
  assert.equal(summary.pendingCount, 0);
  assert.equal(summary.pendingQueue.length, 0);
  assert.equal(summary.approvedCount, summary.totalCount);

  const chinese = summary.subjects.find((subject) => subject.id === "chinese");
  assert.equal(chinese.pendingCount, 0);
  assert.ok(chinese.approvedCount >= 2);
  assert.equal(chinese.approvedPercent, 100);
});

test("english Unit 1 follows the user-provided textbook vocabulary list", () => {
  const unit = curriculum.english.chapters.find((chapter) => chapter.title === "Unit 1 Know yourself");
  const entries = unit.dailyWords.flatMap((day) => day.words.map((item) => item.word));

  assert.equal(entries.length, 67);
  assert.deepEqual(entries.slice(0, 8), [
    "race",
    "Miss",
    "attention",
    "pay attention to",
    "fixed",
    "either...or...",
    "order",
    "creative",
  ]);
  assert.deepEqual(entries.slice(-5), ["sales department", "sculpture", "star sign", "suitable", "surgeon"]);
  assert.ok(unit.dailyWords.flatMap((day) => day.words).every((item) => item.cn));
  assert.equal(unit.sourceNote, "课本后 Wordlist 校正：Unit 1 Know yourself");
});

test("english flashcard review pool is generated from the full Unit 1 Wordlist", () => {
  assert.ok(curriculum.english.flashcards.length > 360);
  assert.deepEqual(
    curriculum.english.flashcards.slice(0, 3).map((card) => [card.id, card.word, card.meaning]),
    [
      ["eng-u1-1-race", "race", "赛跑"],
      ["eng-u1-2-miss", "Miss", "小姐"],
      ["eng-u1-3-attention", "attention", "注意"],
    ],
  );
  assert.ok(curriculum.english.flashcards.some((card) => card.id === "eng-u1-67-surgeon"));
  assert.ok(curriculum.english.flashcards.some((card) => card.id.startsWith("eng-u8-")));
  assert.ok(curriculum.english.flashcards.every((card) => card.meaning && card.unit));
});

test("english flashcards include usable examples, Chinese translations, and dictation prompts", () => {
  assert.ok(
    curriculum.english.flashcards.every(
      (card) =>
        card.exampleEn &&
        card.exampleCn &&
        card.dictationPrompt &&
        card.collocation &&
        card.exampleEn !== `${card.word}：${card.meaning}`,
    ),
  );

  const creative = curriculum.english.flashcards.find((card) => card.id === "eng-u1-8-creative");
  assert.match(creative.exampleEn, /creative/i);
  assert.match(creative.exampleCn, /有创造力|创意|想法/);
  assert.match(creative.dictationPrompt, /中文|英文|听写|拼写/);
});

test("chinese lessons include dictation words and learning focus without full textbook passages", () => {
  const lessons = curriculum.chinese.chapters.flatMap((chapter) => chapter.lessons);

  assert.ok(lessons.length >= 20);
  assert.ok(lessons.every((lesson) => lesson.dictationWords?.length >= 4));
  assert.ok(lessons.every((lesson) => lesson.readingQuestions?.length >= 2));
  assert.ok(lessons.every((lesson) => lesson.writingTask));
  assert.ok(lessons.every((lesson) => !lesson.fullText));
});

test("chinese lessons include literacy practice for dictation, reading evidence and writing transfer", () => {
  const lessons = curriculum.chinese.chapters.flatMap((chapter) => chapter.lessons);

  assert.ok(lessons.every((lesson) => lesson.literacyPractice), "Chinese lessons need literacy practice packets");
  assert.ok(
    lessons.every((lesson) =>
      ["dictation", "reading", "writing"].every((key) => {
        const section = lesson.literacyPractice[key];
        return section?.title && section.prompt && section.check && section.output;
      }),
    ),
    "Chinese literacy practice needs dictation, reading and writing sections with outputs",
  );
  assert.ok(
    lessons.every((lesson) => lesson.literacyPractice.dictation.words?.length >= 4),
    "Chinese dictation practice should carry lesson words",
  );
  assert.ok(
    lessons.every((lesson) => /文本依据|关键词|原文|词句/.test(lesson.literacyPractice.reading.check)),
    "Chinese reading practice should force text evidence",
  );
});

test("non-English subject lessons contain concrete study points instead of generic templates", () => {
  for (const subjectId of ["math", "chinese", "physics", "chemistry"]) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(lessons.length >= 10, `${subjectId} should have a substantial lesson list`);
    assert.ok(lessons.every((lesson) => lesson.keyPoints.length >= 4), `${subjectId} lessons need detailed key points`);
    assert.ok(lessons.every((lesson) => lesson.tasks?.length >= 3), `${subjectId} lessons need preview tasks`);
    assert.equal(
      lessons.every((lesson) => lesson.keyPoints.every((point) => !/的核心概念|的典型题型|的易错判断/.test(point))),
      true,
      `${subjectId} should not use generated placeholder points`,
    );
  }
});

test("all lesson-level content includes active recall and self-check interactions", () => {
  for (const subjectId of subjectOrder) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(lessons.every((lesson) => lesson.recallPrompts?.length >= 2), `${subjectId} lessons need active recall prompts`);
    assert.ok(lessons.every((lesson) => lesson.selfCheck?.length >= 2), `${subjectId} lessons need self-check prompts`);
    assert.ok(lessons.every((lesson) => lesson.microDrills?.length >= 3), `${subjectId} lessons need efficient micro drills`);
    assert.ok(
      lessons.every((lesson) => lesson.microDrills.every((drill) => drill.method && drill.task && drill.success)),
      `${subjectId} micro drills need method, task and success criteria`,
    );
    assert.ok(
      lessons.every((lesson) => lesson.microDrills.every((drill) => drill.id)),
      `${subjectId} micro drills need stable ids for progress tracking`,
    );
    assert.ok(lessons.every((lesson) => lesson.practiceSet?.length >= 2), `${subjectId} lessons need practice questions`);
    assert.ok(
      lessons.every((lesson) =>
        lesson.practiceSet.every((question) => question.id && question.question && question.choices?.length >= 3 && question.answer && question.explanation),
      ),
      `${subjectId} practice questions need choices, answer and explanation`,
    );
    assert.ok(lessons.every((lesson) => lesson.quickCheck?.choices?.length >= 3), `${subjectId} lessons need clickable quick checks`);
    assert.ok(
      lessons.every((lesson) => lesson.quickCheck.choices.includes(lesson.quickCheck.answer) && lesson.quickCheck.explanation),
      `${subjectId} quick checks need answers and explanations`,
    );
  }
});

test("every lesson starts with an entry diagnostic that chooses an efficient preview route", () => {
  for (const subjectId of subjectOrder) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(
      lessons.every((lesson) => lesson.entryDiagnostic?.questions?.length >= 3),
      `${subjectId} lessons need a 3-question entry diagnostic`,
    );
    assert.ok(
      lessons.every((lesson) =>
        lesson.entryDiagnostic.questions.every(
          (question) =>
            question.id &&
            question.skill &&
            question.question &&
            question.choices?.length >= 3 &&
            question.answer &&
            question.explanation &&
            question.ifWrong?.route &&
            question.ifWrong.action,
        ),
      ),
      `${subjectId} entry diagnostic questions need route-aware feedback`,
    );
    assert.ok(
      lessons.every((lesson) => lesson.entryDiagnostic.routeAdvice?.length >= 3),
      `${subjectId} entry diagnostic should include route advice`,
    );
  }
});

test("every lesson has a preview navigator that tells students what to do first and when to stop", () => {
  for (const subjectId of subjectOrder) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(
      lessons.every((lesson) => lesson.previewNavigator),
      `${subjectId} lessons need a compact preview navigator`,
    );
    assert.ok(
      lessons.every(
        (lesson) =>
          lesson.previewNavigator.focus &&
          lesson.previewNavigator.firstStep &&
          lesson.previewNavigator.skipIf?.length >= 2 &&
          lesson.previewNavigator.exitTicket?.length >= 2 &&
          lesson.previewNavigator.timeBox?.min >= 8 &&
          lesson.previewNavigator.timeBox?.max <= 18,
      ),
      `${subjectId} preview navigator should include focus, first step, skip rules, exit ticket and time box`,
    );
    assert.ok(
      lessons.every((lesson) =>
        lesson.previewNavigator.exitTicket.some((item) => /说出|写出|完成|默写|解释|判断/.test(item)),
      ),
      `${subjectId} exit ticket should be observable, not vague encouragement`,
    );
  }
});

test("every lesson has a compact preview workflow with evidence-based steps", () => {
  const requiredKinds = ["goal", "recall", "practice", "output"];

  for (const subjectId of subjectOrder) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(
      lessons.every((lesson) => lesson.previewWorkflow?.length >= 4),
      `${subjectId} lessons need a 4-step preview workflow`,
    );
    assert.ok(
      lessons.every((lesson) => requiredKinds.every((kind) => lesson.previewWorkflow.some((step) => step.kind === kind))),
      `${subjectId} preview workflow should cover goal, recall, practice and output`,
    );
    assert.ok(
      lessons.every((lesson) => lesson.previewWorkflow.reduce((sum, step) => sum + step.minutes, 0) <= 15),
      `${subjectId} preview workflow should stay compact`,
    );
    assert.ok(
      lessons.every((lesson) =>
        lesson.previewWorkflow.every(
          (step) => step.title && step.action && step.evidence && step.minutes >= 2 && step.minutes <= 5,
        ),
      ),
      `${subjectId} workflow steps need title, action, evidence and sensible minutes`,
    );
  }
});

test("every lesson has a reflection coach that turns mistakes into next actions", () => {
  for (const subjectId of subjectOrder) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(
      lessons.every((lesson) => lesson.reflectionCoach),
      `${subjectId} lessons need a reflection coach`,
    );
    assert.ok(
      lessons.every(
        (lesson) =>
          lesson.reflectionCoach.trigger &&
          lesson.reflectionCoach.errorTags?.length >= 3 &&
          lesson.reflectionCoach.correctionSteps?.length >= 3 &&
          lesson.reflectionCoach.nextAction &&
          lesson.reflectionCoach.evidence,
      ),
      `${subjectId} reflection coach should include trigger, error tags, correction steps, evidence and next action`,
    );
    assert.ok(
      lessons.every((lesson) =>
        lesson.reflectionCoach.correctionSteps.some((step) => /错因|依据|重做|订正|回到|复述/.test(step.text)),
      ),
      `${subjectId} reflection coach should teach correction, not just encouragement`,
    );
    assert.ok(
      lessons.every((lesson) =>
        lesson.reflectionCoach.correctionSteps.every((step) => step.id && step.text),
      ),
      `${subjectId} reflection correction steps should have stable ids and text`,
    );
  }
});

test("every lesson has a glossary of must-know terms, words, formulas or symbols", () => {
  for (const subjectId of subjectOrder) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(
      lessons.every((lesson) => lesson.lessonGlossary?.length >= 4),
      `${subjectId} lessons need a must-know glossary`,
    );
    assert.ok(
      lessons.every((lesson) =>
        lesson.lessonGlossary.every(
          (item) =>
            item.id &&
            item.term &&
            item.meaning &&
            item.checkPrompt &&
            ["word", "term", "formula", "symbol", "method"].includes(item.kind),
        ),
      ),
      `${subjectId} glossary items need kind, term, meaning and check prompt`,
    );
  }
});

test("every lesson has a structured study packet with explanation, model and active output", () => {
  for (const subjectId of subjectOrder) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(
      lessons.every((lesson) => lesson.studyPacket),
      `${subjectId} lessons need a structured study packet`,
    );
    assert.ok(
      lessons.every(
        (lesson) =>
          lesson.studyPacket.explain &&
          lesson.studyPacket.model &&
          lesson.studyPacket.tryIt &&
          lesson.studyPacket.review &&
          lesson.studyPacket.output,
      ),
      `${subjectId} study packets need explain, model, try-it, review and output sections`,
    );
    assert.ok(
      lessons.every((lesson) =>
        [lesson.studyPacket.explain, lesson.studyPacket.model, lesson.studyPacket.tryIt, lesson.studyPacket.review].every(
          (section) => section.title && section.body && section.prompt,
        ),
      ),
      `${subjectId} study packet sections need title, body and prompt`,
    );
    assert.ok(
      lessons.every((lesson) => /说出|写出|默写|完成|画出|解释|判断/.test(lesson.studyPacket.output.task)),
      `${subjectId} study packet output should be observable`,
    );
    assert.ok(
      lessons.every((lesson) => lesson.studyPacket.output.id),
      `${subjectId} study packet output should have stable ids for progress tracking`,
    );
  }
});

test("every lesson maps knowledge points to exam-style targets and evidence", () => {
  for (const subjectId of subjectOrder) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(
      lessons.every((lesson) => lesson.lessonExamTargets?.length >= 3),
      `${subjectId} lessons need exam target checklists`,
    );
    assert.ok(
      lessons.every((lesson) =>
        lesson.lessonExamTargets.every(
          (target) =>
            target.point &&
            target.id &&
            target.questionType &&
            target.answerMove &&
            target.evidence &&
            target.trap &&
            /说出|写出|完成|默写|解释|判断|画出|找出/.test(target.evidence),
        ),
      ),
      `${subjectId} exam targets need point, question type, answer move, evidence and trap`,
    );
  }
});

test("every lesson has an active retrieval deck with checkable answers and next actions", () => {
  for (const subjectId of subjectOrder) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(
      lessons.every((lesson) => lesson.retrievalDeck?.length >= 3),
      `${subjectId} lessons need a 3-card retrieval deck`,
    );
    assert.ok(
      lessons.every((lesson) =>
        lesson.retrievalDeck.every(
          (card) =>
            card.id &&
            ["基础回忆", "理解应用", "输出迁移"].includes(card.level) &&
            card.prompt &&
            card.answer &&
            card.checkRule &&
            card.nextAction &&
            /说出|写出|默写|画出|解释|判断|完成/.test(card.checkRule),
        ),
      ),
      `${subjectId} retrieval cards need level, prompt, answer, check rule and next action`,
    );
    assert.ok(
      lessons.every((lesson) => lesson.retrievalDeck.some((card) => /错|不会|模糊|重做|回看/.test(card.nextAction))),
      `${subjectId} retrieval deck should tell students how to repair weak recall`,
    );
  }
});

test("every lesson exposes structured knowledge cards for efficient review", () => {
  for (const subjectId of subjectOrder) {
    const lessons = curriculum[subjectId].chapters.flatMap((chapter) => chapter.lessons);

    assert.ok(lessons.every((lesson) => lesson.knowledgeCards?.length >= 3), `${subjectId} lessons need knowledge cards`);
    assert.ok(
      lessons.every((lesson) =>
        lesson.knowledgeCards.every(
          (card) => card.concept && card.explanation && card.examCue && card.trap && card.retrievalPrompt,
        ),
      ),
      `${subjectId} knowledge cards need concept, explanation, exam cue, trap and retrieval prompt`,
    );
  }
});

test("math physics and chemistry include subject-specific exam supports", () => {
  const mathLessons = curriculum.math.chapters.flatMap((chapter) => chapter.lessons);
  const physicsLessons = curriculum.physics.chapters.flatMap((chapter) => chapter.lessons);
  const chemistryLessons = curriculum.chemistry.chapters.flatMap((chapter) => chapter.lessons);

  assert.ok(mathLessons.some((lesson) => lesson.formulas?.length >= 1));
  assert.ok(mathLessons.every((lesson) => lesson.commonMistakes?.length >= 1));
  assert.ok(physicsLessons.some((lesson) => lesson.experiment || lesson.formulas?.length));
  assert.ok(physicsLessons.every((lesson) => lesson.commonMistakes?.length >= 1));
  assert.ok(chemistryLessons.some((lesson) => lesson.safety || lesson.experiment));
  assert.ok(chemistryLessons.every((lesson) => lesson.commonMistakes?.length >= 1));
});
