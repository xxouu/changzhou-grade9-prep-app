import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../src/app.mjs", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");
const htmlSource = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("home quick practice wrong feedback renders the repair panel", () => {
  const quickPracticeBlock = appSource.match(/function renderQuickPractice\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(quickPracticeBlock, /renderRepairPanel/);
  assert.match(quickPracticeBlock, /findQuickCheckMistake/);
});

test("version list renders confirmed textbook source notes", () => {
  const renderBlock = appSource.match(/function renderVersions\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(renderBlock, /versionAudit/);
  assert.match(renderBlock, /version-status/);
  assert.match(renderBlock, /已确认/);
  assert.match(renderBlock, /source/);
});

test("chapter knowledge checklist renders all lesson groups instead of truncating to a preview", () => {
  const checklistBlock = appSource.match(/function renderChapterKnowledgeChecklist\(checklist\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(checklistBlock, /lessonGroups/);
  assert.doesNotMatch(checklistBlock, /slice\(0,\s*12\)/);
  assert.doesNotMatch(checklistBlock, /还有 \$\{restCount\}/);
});

test("chapter knowledge checklist lets students mark each knowledge point inline", () => {
  const checklistBlock = appSource.match(/function renderChapterKnowledgeChecklist\(checklist\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";
  const statusHandlerBlock = appSource.match(/function handleChapterKnowledgeStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(checklistBlock, /data-chapter-knowledge-status/);
  assert.match(checklistBlock, /data-card-id="\$\{item\.id\}"/);
  assert.match(checklistBlock, /掌握/);
  assert.match(checklistBlock, /再练/);
  assert.match(checklistBlock, /不熟/);
  assert.match(clickHandlerBlock, /data-chapter-knowledge-status/);
  assert.match(clickHandlerBlock, /handleChapterKnowledgeStatus/);
  assert.match(statusHandlerBlock, /updateKnowledgeCardProgress/);
  assert.match(statusHandlerBlock, /renderActivityLibrary/);
});

test("math exercise panel renders the daily lesson mission", () => {
  const mathBlock = appSource.match(/function renderMathExercise\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const briefBlock = appSource.match(/function renderMathMissionBrief\(mission\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(mathBlock, /getMathDailyLessonMission/);
  assert.match(mathBlock, /renderMathMissionBrief/);
  assert.match(mathBlock, /answerPracticeQuestion/);
  assert.doesNotMatch(mathBlock, /curriculum\.math\.exercises\[state\.exerciseIndex/);
  assert.match(briefBlock, /math-answer-draft/);
  assert.match(briefBlock, /math-answer-draft-input/);
  assert.match(briefBlock, /先独立完成/);
  assert.doesNotMatch(briefBlock, /再选答案/);
});

test("daily word chapter list uses compact scannable rows", () => {
  const dailyWordsBlock = appSource.match(/function renderDailyWords\(dailyWords = \[\]\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(dailyWordsBlock, /daily-words-title/);
  assert.match(dailyWordsBlock, /课本 Wordlist/);
  assert.match(dailyWordsBlock, /word-day-meta/);
  assert.match(dailyWordsBlock, /word-day-index/);
  assert.match(dailyWordsBlock, /word-day-count/);
  assert.match(dailyWordsBlock, /word-list/);
});

test("daily word chapter list avoids oversized pill cards", () => {
  const dailyWordsCss = stylesSource.match(/\.daily-words \{[\s\S]*?\.english-extra \{/)?.[0] ?? "";

  assert.match(dailyWordsCss, /grid-template-columns:\s*108px minmax\(0, 1fr\)/);
  assert.match(dailyWordsCss, /border-radius:\s*6px/);
  assert.match(dailyWordsCss, /min-height:\s*24px/);
  assert.doesNotMatch(dailyWordsCss, /border-radius:\s*999px/);
});

test("daily word mission asks for dictation recall before checking cards", () => {
  const renderBlock = appSource.match(/function renderDailyWordMission\(\) \{[\s\S]*?\nfunction renderGrammarPractice/)?.[0] ?? "";

  assert.match(renderBlock, /daily-word-dictation/);
  assert.match(renderBlock, /daily-word-dictation-input/);
  assert.match(renderBlock, /先听写回忆/);
  assert.match(renderBlock, /完成后再点单词看中英文/);
});

test("chapter index renders a compact directory card with preview labels", () => {
  const chapterIndexBlock = appSource.match(/function renderChapterIndex\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(chapterIndexBlock, /chapter-index-head/);
  assert.match(chapterIndexBlock, /chapter-index-title/);
  assert.match(chapterIndexBlock, /chapter-index-load/);
  assert.match(chapterIndexBlock, /chapter-index-ideas/);
  assert.match(chapterIndexBlock, /核心要点/);
});

test("activity library uses chapter switcher instead of rendering every chapter at once", () => {
  const renderBlock = appSource.match(/function renderActivityLibrary\(\) \{[\s\S]*?\nfunction getActiveChapter/)?.[0] ?? "";
  const switcherBlock = appSource.match(/function renderChapterSwitcher\([\s\S]*?\nfunction renderSubjectLearningLoop/)?.[0] ?? "";
  const listenerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /getActiveChapter/);
  assert.match(renderBlock, /renderChapterSwitcher/);
  assert.match(renderBlock, /renderChapterCard\(state\.subject, activeChapter\)/);
  assert.doesNotMatch(renderBlock, /subject\.chapters\.map\(\(chapter\) => renderChapterCard/);
  assert.doesNotMatch(renderBlock, /getVisibleActivities/);
  assert.doesNotMatch(renderBlock, /activityCards/);
  assert.doesNotMatch(renderBlock, /review-status/);
  assert.match(switcherBlock, /chapter-switcher/);
  assert.match(switcherBlock, /data-chapter-switch/);
  assert.match(listenerBlock, /data-chapter-switch/);
  assert.match(listenerBlock, /state\.activeChapterBySubject/);
});

test("subject default page omits utility dashboards and backend review blocks", () => {
  const renderAllBlock = appSource.match(/function renderAll\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clearBlock = appSource.match(/function clearSubjectUtilityPanels\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const subjectNavBlock = appSource.match(/function renderSubjectNav\(\) \{[\s\S]*?\nfunction renderMetrics/)?.[0] ?? "";

  assert.match(renderAllBlock, /clearSubjectUtilityPanels/);
  assert.doesNotMatch(renderAllBlock, /renderCoverageSummary\(\)/);
  assert.doesNotMatch(renderAllBlock, /renderReviewCoverage\(\)/);
  assert.doesNotMatch(renderAllBlock, /renderSubjectKnowledgeBank\(\)/);
  assert.doesNotMatch(renderAllBlock, /renderChapterIndex\(\)/);
  assert.match(clearBlock, /coverageSummary\.innerHTML = ""/);
  assert.match(clearBlock, /reviewCoverage\.innerHTML = ""/);
  assert.match(clearBlock, /subjectKnowledgeBank\.innerHTML = ""/);
  assert.match(clearBlock, /chapterIndex\.innerHTML = ""/);
  assert.match(subjectNavBlock, /clearSubjectUtilityPanels/);
});

test("subject chapter area appears before practice panels and puts the active chapter first", () => {
  const subjectPanelIndex = htmlSource.indexOf('class="panel subject-panel"');
  const homeViewIndex = htmlSource.indexOf('class="home-view"');
  const renderBlock = appSource.match(/function renderActivityLibrary\(\) \{[\s\S]*?\nfunction getActiveChapter/)?.[0] ?? "";

  assert.ok(subjectPanelIndex > 0);
  assert.ok(homeViewIndex > 0);
  assert.ok(renderBlock.indexOf("const chapterCards = renderChapterCard(state.subject, activeChapter)") < renderBlock.indexOf("els.activityLibrary.innerHTML"));
  assert.ok(renderBlock.indexOf("renderChapterSwitcher(subject, activeChapter)") < renderBlock.indexOf("+\n    chapterCards"));
  assert.doesNotMatch(renderBlock, /renderSubjectLearningLoop/);
});

test("home dashboard is separated from subject pages", () => {
  const navBlock = appSource.match(/function renderSubjectNav\(\) \{[\s\S]*?\nfunction renderMetrics/)?.[0] ?? "";
  const renderAllBlock = appSource.match(/function renderAll\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(htmlSource, /class="subject-view"/);
  assert.match(htmlSource, /class="home-view"/);
  assert.match(navBlock, /data-view="home"/);
  assert.match(navBlock, /首页/);
  assert.match(navBlock, /state\.view = "subject"/);
  assert.match(renderAllBlock, /renderViewVisibility/);
});

test("home dashboard keeps only the primary daily work panels visible", () => {
  assert.match(stylesSource, /body\[data-view="home"\] \.version-card/);
  assert.match(stylesSource, /\.home-view \.study-visual\s*\{[\s\S]*?display:\s*none/);
  assert.match(stylesSource, /\.home-view \.grammar-panel/);
  assert.match(stylesSource, /\.home-view \.math-panel/);
  assert.match(stylesSource, /\.home-view \.knowledge-review-panel/);
  assert.match(stylesSource, /\.home-view \.quick-practice-panel/);
  assert.match(stylesSource, /\.home-view \.dictation-panel/);
  assert.match(stylesSource, /\.home-view \.writing-panel/);
}
);

test("mobile stylesheet uses compact top navigation and single-column content", () => {
  const mobileBlock = stylesSource.match(/\/\* Mobile compact layout \*\/[\s\S]*?\/\* End mobile compact layout \*\//)?.[0] ?? "";

  assert.match(mobileBlock, /@media \(max-width: 720px\)/);
  assert.match(mobileBlock, /\.app-shell\s*\{[\s\S]*?display:\s*block/);
  assert.match(mobileBlock, /\.subject-nav\s*\{[\s\S]*?display:\s*flex/);
  assert.match(mobileBlock, /\.subject-nav button\s*\{[\s\S]*?flex:\s*0 0 auto/);
  assert.match(mobileBlock, /\.library-grid,[\s\S]*?\.chapter-index\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(mobileBlock, /\.chapter-switcher > div:last-child\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(mobileBlock, /\.english-word-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(mobileBlock, /\.word-tools\s*\{[\s\S]*?display:\s*grid/);
  assert.match(mobileBlock, /\.stem-study-layout\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
});

test("mobile English word rows center the word and speaker control", () => {
  const mobileBlock = stylesSource.match(/\/\* Mobile compact layout \*\/[\s\S]*?\/\* End mobile compact layout \*\//)?.[0] ?? "";

  assert.match(mobileBlock, /\.english-word-grid\s*\{[\s\S]*?gap:\s*8px/);
  assert.match(mobileBlock, /\.english-word-row\s*\{[\s\S]*?align-items:\s*center/);
  assert.match(mobileBlock, /\.english-word-row\s*\{[\s\S]*?min-height:\s*56px/);
  assert.match(mobileBlock, /\.english-word-row\s*\{[\s\S]*?padding:\s*10px 12px/);
  assert.match(mobileBlock, /\.english-word-row > span\s*\{[\s\S]*?align-content:\s*center/);
  assert.match(mobileBlock, /\.english-word-row \.speak-button\s*\{[\s\S]*?align-self:\s*center/);
});

test("today panel is compact and folds diagnostics behind details", () => {
  const adaptiveBlock = appSource.match(/function renderAdaptiveSession\(\) \{[\s\S]*?\nfunction renderAllSubjectLearningLoop/)?.[0] ?? "";
  const todayBlock = appSource.match(/function renderTodayPlan\(\) \{[\s\S]*?\nfunction renderReviewQueue/)?.[0] ?? "";

  assert.match(htmlSource, /<h3>今天先做这几项<\/h3>/);
  assert.match(adaptiveBlock, /home-focus-strip/);
  assert.match(adaptiveBlock, /details class="adaptive-details"/);
  assert.match(todayBlock, /visiblePlan/);
  assert.match(todayBlock, /extraPlan/);
  assert.match(todayBlock, /details class="more-tasks"/);
}
);

test("chapter support material is collapsed behind a compact disclosure by default", () => {
  const chapterBlock = appSource.match(/function renderChapterCard\(subjectId, chapter\) \{[\s\S]*?\nfunction renderChapterSupportDetails/)?.[0] ?? "";
  const supportBlock = appSource.match(/function renderChapterSupportDetails\(content\) \{[\s\S]*?\nfunction renderLessonRowSummary/)?.[0] ?? "";

  assert.match(chapterBlock, /supportBlocks/);
  assert.match(chapterBlock, /renderChapterSupportDetails\(supportBlocks\)/);
  assert.doesNotMatch(chapterBlock, /\$\{knowledgeMap\}/);
  assert.match(supportBlock, /<details class="chapter-support-details">/);
  assert.match(supportBlock, /需要时展开/);
});

test("math physics and chemistry chapters render knowledge first and practice by question type", () => {
  const chapterBlock = appSource.match(/function renderChapterCard\(subjectId, chapter\) \{[\s\S]*?\nfunction renderChapterSupportDetails/)?.[0] ?? "";
  const stemBlock = appSource.match(/function renderStemChapterCard\(subjectId, chapter\) \{[\s\S]*?\nfunction renderStemKnowledgeSection/)?.[0] ?? "";
  const knowledgeBlock = appSource.match(/function renderStemKnowledgeSection\(subjectId, chapter\) \{[\s\S]*?\nfunction renderStemKnowledgePoint/)?.[0] ?? "";
  const practiceBlock = appSource.match(/function renderStemPracticeSection\(subjectId, chapter\) \{[\s\S]*?\nfunction buildStemPracticeGroups/)?.[0] ?? "";
  const groupBlock = appSource.match(/function buildStemPracticeGroups\(subjectId, chapter\) \{[\s\S]*?\nfunction renderStemPracticeQuestion/)?.[0] ?? "";

  assert.match(chapterBlock, /renderStemChapterCard/);
  assert.match(chapterBlock, /\["math", "physics", "chemistry"\]\.includes\(subjectId\)/);
  assert.match(stemBlock, /renderStemKnowledgeSection/);
  assert.match(stemBlock, /renderStemPracticeSection/);
  assert.match(groupBlock, /buildMathStemPracticeGroups/);
  assert.match(knowledgeBlock, /本章知识点/);
  assert.match(practiceBlock, /选择题/);
  assert.match(practiceBlock, /填空题/);
  assert.match(practiceBlock, /计算题|计算\/推断题/);
  assert.match(practiceBlock, /综合题/);
  assert.match(practiceBlock, /按考点练题/);
  assert.match(practiceBlock, /原创变式/);
  assert.doesNotMatch(stemBlock, /renderChapterSupportDetails/);
});

test("math stem practice bank avoids fake study-prompt questions", () => {
  const mathBankBlock = appSource.match(/function buildMathStemPracticeGroups\(chapter\) \{[\s\S]*?\nfunction buildDefaultStemPracticeGroups/)?.[0] ?? "";

  assert.match(mathBankBlock, /math-chapter-2/);
  assert.match(mathBankBlock, /AB = 16|半径为 10|∠AOB|切线/);
  assert.match(mathBankBlock, /x²|Δ|y =|概率|方差/);
  assert.doesNotMatch(mathBankBlock, /第一步|确认什么|基础题前|最应该做什么/);
});

test("chemistry stem practice bank uses concrete experiment contexts instead of generic prompts", () => {
  const stemRouterBlock = appSource.match(/function buildStemPracticeGroups\(subjectId, chapter\) \{[\s\S]*?\nfunction buildMathStemPracticeGroups/)?.[0] ?? "";
  const chemistryBankBlock = appSource.match(/function buildChemistryStemPracticeGroups\(chapter\) \{[\s\S]*?\nfunction buildDefaultStemPracticeGroups/)?.[0] ?? "";

  assert.match(stemRouterBlock, /buildChemistryStemPracticeGroups/);
  assert.match(chemistryBankBlock, /红磷|带火星木条|电解水|H₂O|质量守恒|铁钉|Fe₂O₃/);
  assert.doesNotMatch(chemistryBankBlock, /最可靠|相关问题|哪一种判断|第一步|确认什么/);
});

test("math subject rendering does not reference undefined title helpers", () => {
  const usesStripLessonNumber = appSource.includes("stripLessonNumber(");

  assert.equal(
    !usesStripLessonNumber || /function stripLessonNumber\(/.test(appSource),
    true,
    "app.mjs must define stripLessonNumber when math rendering uses it",
  );
});

test("lesson extras keep only core learning blocks in the default lesson body", () => {
  const extrasBlock = appSource.match(/function renderLessonExtras\(lesson\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const pathBlock = appSource.match(/function renderLessonPathOverview\(lesson\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const loopBlock = appSource.match(/function renderLessonLearningLoop\(lesson\) \{[\s\S]*?\nfunction renderLessonPathOverview/)?.[0] ?? "";

  assert.doesNotMatch(extrasBlock, /renderLessonLearningLoop\(lesson\)/);
  assert.doesNotMatch(extrasBlock, /renderLessonPathOverview\(lesson\)/);
  assert.doesNotMatch(extrasBlock, /renderPreviewNavigator/);
  assert.doesNotMatch(extrasBlock, /renderEntryDiagnostic/);
  assert.doesNotMatch(extrasBlock, /renderPreviewWorkflow/);
  assert.doesNotMatch(extrasBlock, /renderStudyPacket/);
  assert.doesNotMatch(extrasBlock, /renderLessonExamTargets/);
  assert.doesNotMatch(extrasBlock, /renderRetrievalDeck/);
  assert.doesNotMatch(extrasBlock, /renderLessonGlossary/);
  assert.doesNotMatch(extrasBlock, /renderLessonKnowledgeCards/);
  assert.doesNotMatch(extrasBlock, /renderMicroDrills/);
  assert.doesNotMatch(extrasBlock, /renderReflectionCoach/);
  assert.doesNotMatch(extrasBlock, /renderSelfCheckBlock/);
  assert.match(extrasBlock, /renderPracticeSet/);
  assert.match(extrasBlock, /renderQuickCheck/);
  assert.match(loopBlock, /getLessonLearningLoopSummary/);
  assert.match(loopBlock, /lesson-learning-loop/);
  assert.match(loopBlock, /学习闭环总览/);
  assert.match(pathBlock, /lesson-path-overview/);
  assert.match(pathBlock, /入口诊断/);
  assert.match(pathBlock, /按流程预习/);
  assert.match(pathBlock, /输出检测/);
  assert.match(pathBlock, /错因复盘/);
});

test("Chinese lesson body renders intro, text disclosure, word table and focused practice", () => {
  const renderBlock = appSource.match(/function renderChineseLessonBody\([\s\S]*?\nfunction renderLessonExtras/)?.[0] ?? "";
  const chapterBlock = appSource.match(/function renderChapterCard\(subjectId, chapter\) \{[\s\S]*?\nfunction renderStemChapterCard/)?.[0] ?? "";

  assert.match(renderBlock, /chinese-lesson-intro/);
  assert.match(renderBlock, /chinese-original-text/);
  assert.match(renderBlock, /展开原文/);
  assert.match(renderBlock, /dictation-word-table/);
  assert.match(renderBlock, /reading-focus-list/);
  assert.match(renderBlock, /writing-transfer-card/);
  assert.match(chapterBlock, /renderChineseLessonBody/);
});

test("default lesson body no longer renders repeated learning-loop dashboards", () => {
  const chapterBlock = appSource.match(/function renderChapterCard\(subjectId, chapter\) \{[\s\S]*?\nfunction renderStemChapterCard/)?.[0] ?? "";

  assert.doesNotMatch(chapterBlock, /renderLessonLearningLoop/);
  assert.doesNotMatch(chapterBlock, /renderLessonPathOverview/);
  assert.doesNotMatch(chapterBlock, /renderEntryDiagnostic/);
  assert.doesNotMatch(chapterBlock, /学习闭环总览/);
});

test("lesson next-step advice updates after diagnostic, practice and self-check actions", () => {
  const renderBlock = appSource.match(/function renderLessonNextStepAdvice\(lesson\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const diagnosticHandler = appSource.match(/function handleEntryDiagnosticAnswer\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const practiceHandler = appSource.match(/function handlePracticeAnswer\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const selfCheckHandler = appSource.match(/function handleSelfCheckToggle\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(renderBlock, /getLessonNextStepAdvice/);
  assert.match(renderBlock, /lesson-next-advice/);
  assert.match(diagnosticHandler, /refreshLessonNextStepAdvice/);
  assert.match(practiceHandler, /refreshLessonNextStepAdvice/);
  assert.match(selfCheckHandler, /refreshLessonNextStepAdvice/);
});

test("lesson practice questions ask for a draft before choosing an answer", () => {
  const renderBlock = appSource.match(/function renderPracticeQuestion\(question\) \{[\s\S]*?\nfunction renderMicroDrills/)?.[0] ?? "";

  assert.match(renderBlock, /practice-draft/);
  assert.match(renderBlock, /practice-draft-input/);
  assert.match(renderBlock, /先写解题思路/);
  assert.doesNotMatch(renderBlock, /再选答案/);
});

test("quick checks ask for a reason before choosing an answer", () => {
  const renderBlock = appSource.match(/function renderQuickCheck\(check\) \{[\s\S]*?\nfunction handleQuickCheckAnswer/)?.[0] ?? "";

  assert.match(renderBlock, /quick-check-reason/);
  assert.match(renderBlock, /quick-check-reason-input/);
  assert.match(renderBlock, /先写判断理由/);
  assert.doesNotMatch(renderBlock, /再选择/);
});

test("lesson row summary stays compact before expanding", () => {
  const renderBlock = appSource.match(/function renderLessonRowSummary\(lesson\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const chapterBlock = appSource.match(/function renderChapterCard\(subjectId, chapter\) \{[\s\S]*?\nfunction renderChapterMasteryChecklist/)?.[0] ?? "";

  assert.match(chapterBlock, /renderLessonRowSummary\(lesson\)/);
  assert.match(renderBlock, /data-lesson-row-summary/);
  assert.match(renderBlock, /知识点 \+ 小练习/);
  assert.match(renderBlock, /lesson-summary-next/);
  assert.doesNotMatch(renderBlock, /lesson-summary-progress/);
  assert.doesNotMatch(renderBlock, /getLessonProgressSummary/);
});

test("chapter card omits route dashboards and opens on lesson content", () => {
  const chapterBlock = appSource.match(/function renderChapterCard\(subjectId, chapter\) \{[\s\S]*?\nfunction renderChapterMasteryChecklist/)?.[0] ?? "";
  const loopBlock = appSource.match(/function renderChapterLearningLoop\(summary\) \{[\s\S]*?\nfunction renderChapterProgress/)?.[0] ?? "";

  assert.doesNotMatch(chapterBlock, /getChapterLearningLoopSummary/);
  assert.doesNotMatch(chapterBlock, /renderChapterLearningLoop/);
  assert.doesNotMatch(chapterBlock, /renderChapterProgress/);
  assert.doesNotMatch(chapterBlock, /路线完成/);
  assert.doesNotMatch(chapterBlock, /renderDailyWords/);
  assert.doesNotMatch(chapterBlock, /天单词计划/);
  assert.match(chapterBlock, /renderEnglishExtras/);
  assert.match(chapterBlock, /lesson-list/);
  assert.match(loopBlock, /chapter-learning-loop/);
  assert.match(loopBlock, /章节闭环总览/);
  assert.match(loopBlock, /reviewLessonCount/);
});

test("English subject page keeps a simple unit word list without daily-plan clutter", () => {
  const extrasBlock = appSource.match(/function renderEnglishExtras\(chapter\) \{[\s\S]*?\nfunction renderTranslationSummary/)?.[0] ?? "";
  const wordListBlock = appSource.match(/function renderEnglishWordList\(dailyWords = \[\]\) \{[\s\S]*?\nfunction renderEnglishExtras/)?.[0] ?? "";
  const wordListCss = stylesSource.match(/\.english-word-row \{[\s\S]*?\.phrase-row \{/)?.[0] ?? "";

  assert.match(extrasBlock, /renderEnglishWordList\(chapter\.dailyWords\)/);
  assert.match(extrasBlock, /phraseSection/);
  assert.match(extrasBlock, /patternSection/);
  assert.match(extrasBlock, /grammarSection/);
  assert.match(wordListBlock, /english-word-bank/);
  assert.match(wordListBlock, /renderEnglishSection/);
  assert.match(wordListBlock, /english-study-section/);
  assert.match(wordListBlock, /section-toggle/);
  assert.match(wordListBlock, /toggle-open/);
  assert.match(wordListBlock, /toggle-close/);
  assert.match(wordListBlock, /data-english-word-mode/);
  assert.match(wordListBlock, /data-english-voice-mode/);
  assert.match(wordListBlock, /美音/);
  assert.match(wordListBlock, /英音/);
  assert.match(wordListBlock, /系统/);
  assert.match(wordListBlock, /word-tools/);
  assert.match(wordListBlock, /英 → 中/);
  assert.match(wordListBlock, /中 → 英/);
  assert.match(wordListBlock, /全显示/);
  assert.match(wordListBlock, /mode-\$\{mode\}/);
  assert.match(wordListBlock, /english-word-row/);
  assert.match(wordListBlock, /单词/);
  assert.match(wordListBlock, /<article class="english-word-row mode-\$\{mode\}"/);
  assert.match(extrasBlock, /getEnglishMeaningMap/);
  assert.match(extrasBlock, /ENGLISH_PHRASE_TRANSLATIONS/);
  assert.match(wordListBlock, /data-speak-english/);
  assert.match(wordListBlock, /speak-button/);
  assert.match(wordListBlock, /🔊/);
  assert.match(wordListBlock, /aria-hidden="true"/);
  assert.match(wordListBlock, /aria-label="朗读/);
  assert.doesNotMatch(wordListBlock, />读音<\/button>/);
  assert.match(extrasBlock, /data-speak-english/);
  assert.doesNotMatch(extrasBlock, />读音<\/button>/);
  assert.match(wordListCss, /color:\s*transparent/);
  assert.match(wordListCss, /\.english-word-row:hover em/);
  assert.match(wordListCss, /\.english-word-row:focus-within em/);
  assert.match(wordListCss, /\.english-word-row\.mode-both em/);
  assert.match(stylesSource, /\.word-mode-switch/);
  assert.match(stylesSource, /\.voice-mode-switch/);
  assert.match(stylesSource, /\.phrase-row em/);
  assert.match(stylesSource, /\.speak-button/);
  assert.doesNotMatch(extrasBlock, /renderDailyWords/);
  assert.doesNotMatch(extrasBlock, /每日背诵目录/);
  assert.doesNotMatch(extrasBlock, /Day \$\{day\.day\}/);
});

test("English word and phrase pronunciation uses browser speech synthesis", () => {
  const listenerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";
  const speakBlock = appSource.match(/function speakEnglish\(text\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const chooseVoiceBlock = appSource.match(/function chooseEnglishVoice\(mode\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const normalizeBlock = appSource.match(/function normalizeEnglishSpeechText\(text\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(listenerBlock, /data-speak-english/);
  assert.match(listenerBlock, /data-english-voice-mode/);
  assert.match(listenerBlock, /speakEnglish/);
  assert.match(speakBlock, /speechSynthesis/);
  assert.match(speakBlock, /SpeechSynthesisUtterance/);
  assert.match(speakBlock, /chooseEnglishVoice/);
  assert.match(speakBlock, /utterance\.voice = voice/);
  assert.match(speakBlock, /en-GB/);
  assert.match(speakBlock, /en-US/);
  assert.match(speakBlock, /rate = 0\.88/);
  assert.match(chooseVoiceBlock, /getVoices/);
  assert.match(chooseVoiceBlock, /Google US English/);
  assert.match(chooseVoiceBlock, /Google UK English/);
  assert.match(chooseVoiceBlock, /system/);
  assert.match(normalizeBlock, /\.replaceAll\("\.\.\.", " "\)/);
  assert.match(normalizeBlock, /\.replaceAll\("sb\.", "somebody"\)/);
  assert.match(normalizeBlock, /\.replaceAll\("sth\.", "something"\)/);
});

test("activity library omits subject learning-loop dashboards from the default subject page", () => {
  const libraryBlock = appSource.match(/function renderActivityLibrary\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const dashboardBlock = appSource.match(/function renderSubjectLearningLoop\(summary\) \{[\s\S]*?\nfunction renderCoverageSummary/)?.[0] ?? "";

  assert.doesNotMatch(libraryBlock, /getSubjectLearningLoopSummary/);
  assert.doesNotMatch(libraryBlock, /renderSubjectLearningLoop/);
  assert.match(dashboardBlock, /subject-learning-loop/);
  assert.match(dashboardBlock, /学科闭环总览/);
  assert.match(dashboardBlock, /reviewChapterCount/);
});

test("subject knowledge bank uses compact recall cards with inline mastery marking", () => {
  const renderBlock = appSource.match(/function renderSubjectKnowledgeBank\(\) \{[\s\S]*?\nfunction renderChapterIndex/)?.[0] ?? "";
  const listenerBlock = appSource.match(/els\.subjectKnowledgeBank\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleSubjectKnowledgeStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(renderBlock, /subject-knowledge-recall/);
  assert.match(renderBlock, /retrievalPrompt/);
  assert.match(renderBlock, /回忆任务/);
  assert.doesNotMatch(renderBlock, /显示要点/);
  assert.doesNotMatch(renderBlock, /item\.examCue/);
  assert.doesNotMatch(renderBlock, /item\.explanation/);
  assert.doesNotMatch(renderBlock, /item\.trap/);
  assert.match(renderBlock, /data-subject-knowledge-status/);
  assert.match(renderBlock, /data-card-id="\$\{item\.id\}"/);
  assert.match(listenerBlock, /data-subject-knowledge-status/);
  assert.match(listenerBlock, /handleSubjectKnowledgeStatus/);
  assert.match(handlerBlock, /updateKnowledgeCardProgress/);
  assert.match(handlerBlock, /renderSubjectKnowledgeBank/);
  assert.match(handlerBlock, /renderAdaptiveSession/);
});

test("lesson knowledge cards support active recall and inline mastery marking", () => {
  const renderBlock = appSource.match(/function renderLessonKnowledgeCards\(cards = \[\]\) \{[\s\S]*?\nfunction renderPracticeSet/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleLessonKnowledgeStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(renderBlock, /lesson-knowledge-recall/);
  assert.match(renderBlock, /retrievalPrompt/);
  assert.match(renderBlock, /显示要点/);
  assert.match(renderBlock, /data-lesson-knowledge-status/);
  assert.match(renderBlock, /data-card-id="\$\{card\.id\}"/);
  assert.match(clickHandlerBlock, /data-lesson-knowledge-status/);
  assert.match(clickHandlerBlock, /handleLessonKnowledgeStatus/);
  assert.match(handlerBlock, /findLessonByKnowledgeCard/);
  assert.match(handlerBlock, /updateKnowledgeCardProgress/);
  assert.match(handlerBlock, /renderLessonKnowledgeCards/);
  assert.match(handlerBlock, /refreshLessonLearningLoop/);
});

test("knowledge review panel asks for written recall before mastery marking", () => {
  const renderBlock = appSource.match(/function renderKnowledgeReview\(\) \{[\s\S]*?\nfunction renderQuickPractice/)?.[0] ?? "";

  assert.match(renderBlock, /knowledgeRecallDraft/);
  assert.match(renderBlock, /knowledge-recall-draft/);
  assert.match(renderBlock, /knowledge-recall-input/);
  assert.match(renderBlock, /先写回忆答案/);
  assert.match(renderBlock, /再标记掌握度/);
});

test("home dashboard starts adaptive route with an all-subject learning loop", () => {
  const adaptiveBlock = appSource.match(/function renderAdaptiveSession\(\) \{[\s\S]*?\nfunction renderTodayPlan/)?.[0] ?? "";
  const dashboardBlock = appSource.match(/function renderAllSubjectLearningLoop\(summary\) \{[\s\S]*?\nfunction renderTodayPlan/)?.[0] ?? "";

  assert.match(adaptiveBlock, /getAllSubjectLearningLoopSummary/);
  assert.match(adaptiveBlock, /renderAllSubjectLearningLoop/);
  assert.match(dashboardBlock, /all-subject-learning-loop/);
  assert.match(dashboardBlock, /全科闭环总览/);
  assert.match(dashboardBlock, /nextSubject/);
  assert.match(dashboardBlock, /reviewSubjectCount/);
});

test("lesson row summary refreshes after lesson progress changes", () => {
  const refreshBlock = appSource.match(/function refreshLessonRowSummary\(lesson\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const quickHandler = appSource.match(/function handleQuickCheckAnswer\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const diagnosticHandler = appSource.match(/function handleEntryDiagnosticAnswer\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const practiceHandler = appSource.match(/function handlePracticeAnswer\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const selfCheckHandler = appSource.match(/function handleSelfCheckToggle\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(refreshBlock, /data-lesson-row-summary/);
  assert.match(refreshBlock, /renderLessonRowSummary/);
  assert.match(quickHandler, /refreshLessonRowSummary/);
  assert.match(diagnosticHandler, /refreshLessonRowSummary/);
  assert.match(practiceHandler, /refreshLessonRowSummary/);
  assert.match(selfCheckHandler, /refreshLessonRowSummary/);
});

test("translation drill cards can be marked and recorded", () => {
  const renderBlock = appSource.match(/function renderTranslationDrills\(drills = \[\]\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleTranslationDrillAnswer\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /translation-recall/);
  assert.match(renderBlock, /translation-recall-input/);
  assert.match(renderBlock, /先写下自己的翻译/);
  assert.match(renderBlock, /显示答案/);
  assert.match(renderBlock, /data-translation-answer/);
  assert.match(handlerBlock, /answerTranslationDrill/);
  assert.match(handlerBlock, /renderReviewQueue/);
  assert.match(clickHandlerBlock, /handleTranslationDrillAnswer/);
});

test("grammar mini quizzes use a simple answer disclosure without fake input state", () => {
  const renderBlock = appSource.match(/function renderGrammarMiniQuiz\(quiz\) \{[\s\S]*?\nfunction saveAndRender/)?.[0] ?? "";

  assert.match(renderBlock, /grammar-answer/);
  assert.match(renderBlock, /显示参考答案/);
  assert.match(renderBlock, /quiz\.answer/);
  assert.match(renderBlock, /quiz\.explanation/);
  assert.doesNotMatch(renderBlock, /data-grammar-quiz/);
  assert.doesNotMatch(renderBlock, /grammar-evidence/);
  assert.doesNotMatch(renderBlock, /grammar-evidence-input/);
  assert.doesNotMatch(renderBlock, /先自己写一句或判断依据/);
  assert.doesNotMatch(renderBlock, /还不会/);
  assert.doesNotMatch(renderBlock, /quiz\.choices/);
  assert.doesNotMatch(renderBlock, /再选答案/);
});

test("grammar practice panel skips the evidence textbox before choices", () => {
  const renderBlock = appSource.match(/function renderGrammarPractice\(\) \{[\s\S]*?\nfunction renderMathExercise/)?.[0] ?? "";

  assert.match(renderBlock, /grammarPracticeEvidence/);
  assert.match(renderBlock, /grammar-practice-evidence/);
  assert.match(renderBlock, /data-grammar-practice-choice/);
  assert.doesNotMatch(renderBlock, /先写语法依据/);
  assert.doesNotMatch(renderBlock, /再选答案/);
});

test("English unit translation summary shows and refreshes mastery progress", () => {
  const extrasBlock = appSource.match(/function renderEnglishExtras\(chapter\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const summaryBlock = appSource.match(/function renderTranslationSummary\(unit\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleTranslationDrillAnswer\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.doesNotMatch(extrasBlock, /renderTranslationSummary\(chapter\)/);
  assert.doesNotMatch(extrasBlock, /renderTranslationDrills\(chapter\.translationDrills\)/);
  assert.match(summaryBlock, /getTranslationMasterySummary/);
  assert.match(summaryBlock, /translation-summary/);
  assert.match(summaryBlock, /中译英/);
  assert.match(handlerBlock, /refreshTranslationSummary/);
});

test("review queue labels dictation, grammar, translation, writing, math tier and science observation in Chinese", () => {
  const labelBlock = appSource.match(/function reviewTypeLabel\(type\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(labelBlock, /dictation: "默写词"/);
  assert.match(labelBlock, /grammar: "语法"/);
  assert.match(labelBlock, /translation: "翻译"/);
  assert.match(labelBlock, /writing: "写作"/);
  assert.match(labelBlock, /"math-tier": "分层练习"/);
  assert.match(labelBlock, /"science-observation": "实验观察"/);
});

test("Chinese dictation review asks students to write before self-rating", () => {
  const renderBlock = appSource.match(/function renderDictationReview\(\) \{[\s\S]*?\nfunction renderWritingMission/)?.[0] ?? "";

  assert.match(renderBlock, /dictationDraft/);
  assert.match(renderBlock, /dictation-draft/);
  assert.match(renderBlock, /dictation-draft-input/);
  assert.match(renderBlock, /先默写这个词/);
  assert.match(renderBlock, /写完再判断会不会/);
});

test("writing completion saves three self-assessment criteria", () => {
  const initBlock = appSource.match(/function init\(\) \{[\s\S]*?renderAll\(\);\n\}/)?.[0] ?? "";
  const renderBlock = appSource.match(/function renderWritingMission\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(initBlock, /writingEvidenceCheck/);
  assert.match(initBlock, /writingStructureCheck/);
  assert.match(initBlock, /writingLanguageCheck/);
  assert.match(initBlock, /updateWritingMissionProgress\([\s\S]*selfAssessment/);
  assert.match(renderBlock, /writingSelfCheck/);
  assert.match(renderBlock, /writing-output-draft/);
  assert.match(renderBlock, /writing-output-input/);
  assert.match(renderBlock, /先写本课输出/);
  assert.match(renderBlock, /完成后再勾选自评/);
});

test("Chinese literacy practice asks students to write outputs before checking", () => {
  const renderBlock = appSource.match(/function renderLiteracyPractice\(practice\) \{[\s\S]*?\nfunction renderLessonExamTargets/)?.[0] ?? "";

  assert.match(renderBlock, /literacy-output-input/);
  assert.match(renderBlock, /先默写/);
  assert.match(renderBlock, /先找依据/);
  assert.match(renderBlock, /先仿写/);
  assert.match(renderBlock, /完成后再对照检查/);
});

test("science mission brief records observation confidence", () => {
  const renderBlock = appSource.match(/function renderScienceMissionBrief\(mission\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleScienceObservationStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.quickPracticeQuestion\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /science-observation-draft/);
  assert.match(renderBlock, /science-observation-input/);
  assert.match(renderBlock, /先写观察结论/);
  assert.match(renderBlock, /现象、条件、本质和安全/);
  assert.match(renderBlock, /data-science-observation-status/);
  assert.match(handlerBlock, /updateScienceObservationProgress/);
  assert.match(handlerBlock, /renderReviewQueue/);
  assert.match(clickHandlerBlock, /handleScienceObservationStatus/);
});

test("chapter tiered practice can be marked by level", () => {
  const renderBlock = appSource.match(/function renderChapterTieredPractice\([\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleMathTierStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /getMathTieredPracticePlan/);
  assert.match(renderBlock, /tier-answer-draft/);
  assert.match(renderBlock, /tier-answer-draft-input/);
  assert.match(renderBlock, /先独立完成/);
  assert.match(renderBlock, /data-math-tier-status/);
  assert.match(handlerBlock, /updateMathTierProgress/);
  assert.match(handlerBlock, /renderReviewQueue/);
  assert.match(clickHandlerBlock, /handleMathTierStatus/);
});

test("chapter mastery checklist is interactive and refreshes chapter evidence progress", () => {
  const renderBlock = appSource.match(/function renderChapterMasteryChecklist\([\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleChapterMasteryToggle\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /getChapterMasterySummary/);
  assert.match(renderBlock, /data-chapter-mastery-card/);
  assert.match(renderBlock, /data-chapter-mastery-toggle/);
  assert.match(renderBlock, /summary\.percent/);
  assert.match(handlerBlock, /updateChapterMasteryProgress/);
  assert.match(handlerBlock, /renderChapterMasteryChecklist/);
  assert.match(clickHandlerBlock, /handleChapterMasteryToggle/);
});

test("retrieval deck cards can be marked as known or weak from the lesson page", () => {
  const renderBlock = appSource.match(/function renderRetrievalDeck\([\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleRetrievalCardStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /getRetrievalDeckSummary/);
  assert.match(renderBlock, /data-retrieval-deck/);
  assert.match(renderBlock, /data-retrieval-status/);
  assert.match(renderBlock, /不稳/);
  assert.match(handlerBlock, /updateRetrievalCardProgress/);
  assert.match(handlerBlock, /renderRetrievalDeck/);
  assert.match(handlerBlock, /renderReviewQueue/);
  assert.match(clickHandlerBlock, /handleRetrievalCardStatus/);
});

test("micro drills can be marked and weak drills refresh review guidance", () => {
  const renderBlock = appSource.match(/function renderMicroDrills\([\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleMicroDrillStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /getMicroDrillSummary/);
  assert.match(renderBlock, /data-micro-drill-card/);
  assert.match(renderBlock, /data-micro-drill-status/);
  assert.match(renderBlock, /不稳/);
  assert.match(handlerBlock, /updateMicroDrillProgress/);
  assert.match(handlerBlock, /renderMicroDrills/);
  assert.match(handlerBlock, /renderReviewQueue/);
  assert.match(clickHandlerBlock, /handleMicroDrillStatus/);
});

test("exam target checklist can be marked by mastery status", () => {
  const renderBlock = appSource.match(/function renderLessonExamTargets\([\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleExamTargetStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /getExamTargetSummary/);
  assert.match(renderBlock, /data-exam-target-card/);
  assert.match(renderBlock, /data-exam-target-status/);
  assert.match(renderBlock, /不稳/);
  assert.match(handlerBlock, /updateExamTargetProgress/);
  assert.match(handlerBlock, /renderLessonExamTargets/);
  assert.match(handlerBlock, /renderReviewQueue/);
  assert.match(clickHandlerBlock, /handleExamTargetStatus/);
});

test("study packet output can be marked and weak output refreshes review guidance", () => {
  const renderBlock = appSource.match(/function renderStudyPacket\([\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleStudyOutputStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /getStudyOutputSummary/);
  assert.match(renderBlock, /data-study-output-card/);
  assert.match(renderBlock, /data-study-output-status/);
  assert.match(renderBlock, /不稳/);
  assert.match(handlerBlock, /updateStudyOutputProgress/);
  assert.match(handlerBlock, /renderStudyPacket/);
  assert.match(handlerBlock, /renderReviewQueue/);
  assert.match(clickHandlerBlock, /handleStudyOutputStatus/);
});

test("lesson glossary items can be marked by mastery status", () => {
  const renderBlock = appSource.match(/function renderLessonGlossary\([\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleGlossaryStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /getGlossarySummary/);
  assert.match(renderBlock, /data-glossary-card/);
  assert.match(renderBlock, /data-glossary-status/);
  assert.match(renderBlock, /不熟/);
  assert.match(handlerBlock, /updateGlossaryProgress/);
  assert.match(handlerBlock, /renderLessonGlossary/);
  assert.match(handlerBlock, /renderReviewQueue/);
  assert.match(clickHandlerBlock, /handleGlossaryStatus/);
});

test("preview workflow steps can be marked by execution status", () => {
  const renderBlock = appSource.match(/function renderPreviewWorkflow\([\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handlePreviewWorkflowStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /getPreviewWorkflowSummary/);
  assert.match(renderBlock, /data-preview-workflow-card/);
  assert.match(renderBlock, /data-preview-step-status/);
  assert.match(renderBlock, /卡住/);
  assert.match(handlerBlock, /updatePreviewWorkflowProgress/);
  assert.match(handlerBlock, /renderPreviewWorkflow/);
  assert.match(handlerBlock, /renderReviewQueue/);
  assert.match(clickHandlerBlock, /handlePreviewWorkflowStatus/);
});

test("reflection correction steps can be marked by repair status", () => {
  const renderBlock = appSource.match(/function renderReflectionCoach\([\s\S]*?\n\}/)?.[0] ?? "";
  const handlerBlock = appSource.match(/function handleReflectionStepStatus\(button\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  const clickHandlerBlock = appSource.match(/els\.activityLibrary\.addEventListener\("click",[\s\S]*?\n  \}\);/)?.[0] ?? "";

  assert.match(renderBlock, /getReflectionStepSummary/);
  assert.match(renderBlock, /data-reflection-card/);
  assert.match(renderBlock, /data-reflection-step-status/);
  assert.match(renderBlock, /卡住/);
  assert.match(handlerBlock, /updateReflectionStepProgress/);
  assert.match(handlerBlock, /renderReflectionCoach/);
  assert.match(handlerBlock, /renderReviewQueue/);
  assert.match(clickHandlerBlock, /handleReflectionStepStatus/);
});
