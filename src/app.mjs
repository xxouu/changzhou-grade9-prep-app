import {
  curriculum,
  getCurriculumCoverageSummary,
  getReviewCoverageSummary,
  getSubjectChapterIndex,
  subjectOrder,
} from "./content.mjs?v=20260628-depth129";
import {
  STORAGE_KEY,
  answerGrammarQuiz,
  answerEntryDiagnostic,
  answerPracticeQuestion,
  answerQuickCheck,
  answerTranslationDrill,
  completeActivity,
  createDefaultProgress,
  getAdaptivePreviewSession,
  getChineseDailyLessonMission,
  getCrossSubjectReviewQueue,
  getChapterLearningPath,
  getChapterLearningLoopSummary,
  getChapterKnowledgeChecklist,
  getDictationReviewQueue,
  getEnglishDailyWordMission,
  getChapterMasterySummary,
  getExamTargetSummary,
  getGlossarySummary,
  getGrammarMasterySummary,
  getGrammarReviewQueue,
  getLessonDiagnosticSummary,
  getLessonLearningLoopSummary,
  getLessonNextStepAdvice,
  getLessonProgressSummary,
  getPreviewWorkflowSummary,
  getReflectionStepSummary,
  getRetrievalDeckSummary,
  getMicroDrillSummary,
  getStudyOutputSummary,
  getLessonSelfCheckSummary,
  getKnowledgeReviewQueue,
  getMasterySummary,
  getMathDailyLessonMission,
  getMathLearningAdvice,
  getMathTieredPracticePlan,
  getQuickCheckPracticeQueue,
  getReviewQueue,
  getScienceDailyLessonMission,
  getSubjectKnowledgeBank,
  getSubjectLearningLoopSummary,
  getAllSubjectLearningLoopSummary,
  getTranslationMasterySummary,
  filterSubjectKnowledgeBank,
  getTodayPlan,
  loadProgress,
  saveProgress,
  updateDictationProgress,
  updateExamTargetProgress,
  updateFlashcardProgress,
  updateGlossaryProgress,
  updateChapterMasteryProgress,
  updateGrammarMasteryProgress,
  updateKnowledgeCardProgress,
  updateMathTierProgress,
  updateMicroDrillProgress,
  updatePreviewWorkflowProgress,
  updateReflectionStepProgress,
  updateRetrievalCardProgress,
  updateScienceObservationProgress,
  updateSelfCheckProgress,
  updateStudyOutputProgress,
  updateWritingMissionProgress,
} from "./progress.mjs?v=20260628-depth129";

const state = {
  view: "home",
  mode: "child",
  subject: "english",
  englishWordMode: "en-cn",
  englishVoiceMode: "us",
  englishWordBankOpen: false,
  cardIndex: 0,
  cardDirection: "en-cn",
  cardRevealed: false,
  exerciseIndex: 0,
  grammarIndex: 0,
  quickPracticeIndex: 0,
  knowledgeIndex: 0,
  dictationIndex: 0,
  writingIndex: 0,
  knowledgeBankQuery: "",
  knowledgeBankStatus: "all",
  activeChapterBySubject: {},
  progress: loadProgress(),
};

const ENGLISH_PHRASE_TRANSLATIONS = {
  "eat up": "吃光，吃完",
  "keep...in order": "使……保持井然有序",
  "show off": "炫耀",
  "come up with": "想出；提出",
  "neither...nor...": "既不……也不……",
  "praise sb. for sth.": "因某事表扬某人",
  "influence our moods": "影响我们的情绪",
  "make a decision": "作决定",
  "have difficulty doing": "做某事有困难",
  "be dressed in": "穿着……",
  "remind sb. of": "使某人想起",
  "prefer ... to ...": "比起……更喜欢……",
  "drive sb. mad": "使某人发疯",
  "stay up": "熬夜",
  "be worth doing": "值得做",
  "be strict with": "对……严格",
  "deal with": "处理；应对",
  "hear from": "收到……来信",
  "try out for": "参加……选拔",
  "lose heart": "泄气；灰心",
  "change one's mind": "改变主意",
  "succeed in doing": "成功做某事",
  "take notice of": "注意到",
  "break out": "爆发",
  "be known for": "因……而著名",
  "make music with common objects": "用普通物品创作音乐",
  "have a lasting value": "有持久价值",
  "out of breath": "上气不接下气",
  "present a medal to": "给……颁发奖牌",
  "in a western style": "以西方风格",
  "a weekly round-up": "一周概要",
  "be covered live": "被现场直播",
  "send text messages to": "给……发短信",
  "vote online for": "为……在线投票",
  "be full of horror": "充满恐怖",
  "take a close look at": "仔细看看",
  "play the lead role": "扮演主角",
  "catch one's attention": "吸引某人的注意",
  "beyond one's imagination": "超出某人的想象",
  "make one's final appearance": "最后一次露面",
  "insist on doing": "坚持做某事",
  "be considered as": "被认为是",
  "be charged with": "被指控……",
  "break into": "闯入",
  "lead to": "导致",
  "offer a reward": "提供悬赏",
  "be guilty of": "犯有……罪",
  "guard against": "防范",
};

const els = {
  subjectNav: document.querySelector("#subjectNav"),
  homeView: document.querySelector('[data-view-panel="home"]'),
  subjectView: document.querySelector('[data-view-panel="subject"]'),
  versionList: document.querySelector("#versionList"),
  adaptiveSession: document.querySelector("#adaptiveSession"),
  todayPlan: document.querySelector("#todayPlan"),
  reviewQueue: document.querySelector("#reviewQueue"),
  reviewCount: document.querySelector("#reviewCount"),
  modeBadge: document.querySelector("#modeBadge"),
  streakValue: document.querySelector("#streakValue"),
  flashcardValue: document.querySelector("#flashcardValue"),
  weakValue: document.querySelector("#weakValue"),
  cardWord: document.querySelector("#cardWord"),
  cardCounter: document.querySelector("#cardCounter"),
  cardMeaning: document.querySelector("#cardMeaning"),
  cardExample: document.querySelector("#cardExample"),
  cardDirectionButton: document.querySelector("#cardDirectionButton"),
  cardRevealButton: document.querySelector("#cardRevealButton"),
  dailyWordUnit: document.querySelector("#dailyWordUnit"),
  dailyWordDay: document.querySelector("#dailyWordDay"),
  dailyWordSummary: document.querySelector("#dailyWordSummary"),
  dailyWordList: document.querySelector("#dailyWordList"),
  dailyWordKnownButton: document.querySelector("#dailyWordKnownButton"),
  grammarTitle: document.querySelector("#grammarTitle"),
  grammarCounter: document.querySelector("#grammarCounter"),
  grammarUnit: document.querySelector("#grammarUnit"),
  grammarExplanation: document.querySelector("#grammarExplanation"),
  grammarExample: document.querySelector("#grammarExample"),
  grammarCheckpoint: document.querySelector("#grammarCheckpoint"),
  grammarQuestion: document.querySelector("#grammarQuestion"),
  grammarPracticeEvidence: document.querySelector("#grammarPracticeEvidence"),
  grammarChoices: document.querySelector("#grammarChoices"),
  grammarFeedback: document.querySelector("#grammarFeedback"),
  mathConcept: document.querySelector("#mathConcept"),
  mathDifficulty: document.querySelector("#mathDifficulty"),
  mathQuestion: document.querySelector("#mathQuestion"),
  mathChoices: document.querySelector("#mathChoices"),
  mathFeedback: document.querySelector("#mathFeedback"),
  mathAdviceFocus: document.querySelector("#mathAdviceFocus"),
  mathAdviceReason: document.querySelector("#mathAdviceReason"),
  mathAdviceSteps: document.querySelector("#mathAdviceSteps"),
  knowledgeConcept: document.querySelector("#knowledgeConcept"),
  knowledgeCounter: document.querySelector("#knowledgeCounter"),
  knowledgeSubject: document.querySelector("#knowledgeSubject"),
  knowledgeExplanation: document.querySelector("#knowledgeExplanation"),
  knowledgeExamCue: document.querySelector("#knowledgeExamCue"),
  knowledgeTrap: document.querySelector("#knowledgeTrap"),
  knowledgeRetrieval: document.querySelector("#knowledgeRetrieval"),
  knowledgeRecallDraft: document.querySelector("#knowledgeRecallDraft"),
  quickPracticeTitle: document.querySelector("#quickPracticeTitle"),
  quickPracticeCounter: document.querySelector("#quickPracticeCounter"),
  quickPracticeContext: document.querySelector("#quickPracticeContext"),
  quickPracticeQuestion: document.querySelector("#quickPracticeQuestion"),
  quickPracticeChoices: document.querySelector("#quickPracticeChoices"),
  quickPracticeFeedback: document.querySelector("#quickPracticeFeedback"),
  dictationWord: document.querySelector("#dictationWord"),
  dictationCounter: document.querySelector("#dictationCounter"),
  dictationContext: document.querySelector("#dictationContext"),
  dictationPrompt: document.querySelector("#dictationPrompt"),
  dictationDraft: document.querySelector("#dictationDraft"),
  writingLesson: document.querySelector("#writingLesson"),
  writingCounter: document.querySelector("#writingCounter"),
  writingContext: document.querySelector("#writingContext"),
  writingTask: document.querySelector("#writingTask"),
  writingSelfCheck: document.querySelector("#writingSelfCheck"),
  writingEvidenceCheck: document.querySelector("#writingEvidenceCheck"),
  writingStructureCheck: document.querySelector("#writingStructureCheck"),
  writingLanguageCheck: document.querySelector("#writingLanguageCheck"),
  writingDoneButton: document.querySelector("#writingDoneButton"),
  subjectTitle: document.querySelector("#subjectTitle"),
  subjectVersion: document.querySelector("#subjectVersion"),
  coverageSummary: document.querySelector("#coverageSummary"),
  reviewCoverage: document.querySelector("#reviewCoverage"),
  subjectKnowledgeBank: document.querySelector("#subjectKnowledgeBank"),
  chapterIndex: document.querySelector("#chapterIndex"),
  activityLibrary: document.querySelector("#activityLibrary"),
  reviewerToggle: document.querySelector("#reviewerToggle"),
  resetButton: document.querySelector("#resetButton"),
  continueButton: document.querySelector("#continueButton"),
};

function init() {
  renderVersions();
  renderSubjectNav();
  renderAll();
  bindEvents();
}

function bindEvents() {
  els.reviewerToggle.addEventListener("click", () => {
    state.mode = state.mode === "child" ? "reviewer" : "child";
    renderAll();
  });

  els.resetButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state.progress = createDefaultProgress();
    state.cardIndex = 0;
    state.exerciseIndex = 0;
    state.grammarIndex = 0;
    state.quickPracticeIndex = 0;
    state.knowledgeIndex = 0;
    state.dictationIndex = 0;
    state.writingIndex = 0;
    renderAll();
  });

  els.continueButton.addEventListener("click", () => {
    state.view = "home";
    renderViewVisibility();
    renderSubjectNav();
    document.querySelector(".today-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  els.cardDirectionButton.addEventListener("click", () => {
    state.cardDirection = state.cardDirection === "en-cn" ? "cn-en" : "en-cn";
    state.cardRevealed = false;
    renderFlashcard();
  });

  els.cardRevealButton.addEventListener("click", () => {
    state.cardRevealed = !state.cardRevealed;
    renderFlashcard();
  });

  els.dailyWordKnownButton.addEventListener("click", () => {
    const mission = getEnglishDailyWordMission(curriculum, state.progress);
    for (const word of mission.words) {
      if (word.cardId) {
        state.progress = updateFlashcardProgress(state.progress, word.cardId, "known");
      }
    }
  saveProgress(localStorage, state.progress);
  state.cardIndex = 0;
  renderDailyWordMission();
  renderFlashcard();
  renderMetrics();
  renderAdaptiveSession();
  renderReviewQueue();
  });

  els.activityLibrary.addEventListener("click", (event) => {
    const chapterSwitchButton = event.target.closest("[data-chapter-switch]");
    if (chapterSwitchButton) {
      state.activeChapterBySubject[state.subject] = chapterSwitchButton.dataset.chapterSwitch;
      renderActivityLibrary();
      return;
    }

    const wordModeButton = event.target.closest("[data-english-word-mode]");
    if (wordModeButton) {
      handleEnglishWordMode(wordModeButton);
      return;
    }

    const voiceModeButton = event.target.closest("[data-english-voice-mode]");
    if (voiceModeButton) {
      handleEnglishVoiceMode(voiceModeButton);
      return;
    }

    const speakEnglishButton = event.target.closest("[data-speak-english]");
    if (speakEnglishButton) {
      speakEnglish(speakEnglishButton.dataset.speakEnglish);
      return;
    }

    const chip = event.target.closest(".word-chip");
    if (chip) {
      chip.classList.toggle("revealed");
      return;
    }

    const quickCheckButton = event.target.closest("[data-quick-check]");
    if (quickCheckButton) {
      handleQuickCheckAnswer(quickCheckButton);
      return;
    }

    const entryDiagnosticButton = event.target.closest("[data-entry-diagnostic]");
    if (entryDiagnosticButton) {
      handleEntryDiagnosticAnswer(entryDiagnosticButton);
      return;
    }

    const practiceButton = event.target.closest("[data-practice-question]");
    if (practiceButton) {
      handlePracticeAnswer(practiceButton);
      return;
    }

    const grammarButton = event.target.closest("[data-grammar-quiz]");
    if (grammarButton) {
      handleGrammarQuizAnswer(grammarButton);
      return;
    }

    const translationButton = event.target.closest("[data-translation-answer]");
    if (translationButton) {
      handleTranslationDrillAnswer(translationButton);
      return;
    }

    const retrievalButton = event.target.closest("[data-retrieval-status]");
    if (retrievalButton) {
      handleRetrievalCardStatus(retrievalButton);
      return;
    }

    const microDrillButton = event.target.closest("[data-micro-drill-status]");
    if (microDrillButton) {
      handleMicroDrillStatus(microDrillButton);
      return;
    }

    const examTargetButton = event.target.closest("[data-exam-target-status]");
    if (examTargetButton) {
      handleExamTargetStatus(examTargetButton);
      return;
    }

    const studyOutputButton = event.target.closest("[data-study-output-status]");
    if (studyOutputButton) {
      handleStudyOutputStatus(studyOutputButton);
      return;
    }

    const glossaryButton = event.target.closest("[data-glossary-status]");
    if (glossaryButton) {
      handleGlossaryStatus(glossaryButton);
      return;
    }

    const lessonKnowledgeButton = event.target.closest("[data-lesson-knowledge-status]");
    if (lessonKnowledgeButton) {
      handleLessonKnowledgeStatus(lessonKnowledgeButton);
      return;
    }

    const previewWorkflowButton = event.target.closest("[data-preview-step-status]");
    if (previewWorkflowButton) {
      handlePreviewWorkflowStatus(previewWorkflowButton);
      return;
    }

    const reflectionStepButton = event.target.closest("[data-reflection-step-status]");
    if (reflectionStepButton) {
      handleReflectionStepStatus(reflectionStepButton);
      return;
    }

    const selfCheckButton = event.target.closest("[data-self-check]");
    if (selfCheckButton) {
      handleSelfCheckToggle(selfCheckButton);
      return;
    }

    const chapterKnowledgeButton = event.target.closest("[data-chapter-knowledge-status]");
    if (chapterKnowledgeButton) {
      handleChapterKnowledgeStatus(chapterKnowledgeButton);
      return;
    }

    const mathTierButton = event.target.closest("[data-math-tier-status]");
    if (mathTierButton) {
      handleMathTierStatus(mathTierButton);
      return;
    }

    const chapterMasteryButton = event.target.closest("[data-chapter-mastery-toggle]");
    if (chapterMasteryButton) {
      handleChapterMasteryToggle(chapterMasteryButton);
      return;
    }

    const grammarMasteryButton = event.target.closest("[data-grammar-mastery]");
    if (grammarMasteryButton) {
      handleGrammarMasteryToggle(grammarMasteryButton);
    }
  });

  els.activityLibrary.addEventListener("toggle", (event) => {
    if (event.target.matches("[data-english-word-bank]")) {
      state.englishWordBankOpen = event.target.open;
    }
  }, true);

  els.quickPracticeQuestion.addEventListener("click", (event) => {
    const observationButton = event.target.closest("[data-science-observation-status]");
    if (observationButton) {
      handleScienceObservationStatus(observationButton);
    }
  });

  els.subjectKnowledgeBank.addEventListener("input", (event) => {
    if (event.target.matches("[data-knowledge-search]")) {
      state.knowledgeBankQuery = event.target.value;
      renderSubjectKnowledgeBank();
    }
  });

  els.subjectKnowledgeBank.addEventListener("click", (event) => {
    const knowledgeButton = event.target.closest("[data-subject-knowledge-status]");
    if (knowledgeButton) {
      handleSubjectKnowledgeStatus(knowledgeButton);
      return;
    }

    const filterButton = event.target.closest("[data-knowledge-filter]");
    if (filterButton) {
      state.knowledgeBankStatus = filterButton.dataset.knowledgeFilter;
      renderSubjectKnowledgeBank();
    }
  });

  document.querySelectorAll("[data-card-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const queue = getReviewQueue(curriculum.english.flashcards, state.progress);
      const card = queue[state.cardIndex % queue.length];
      state.progress = updateFlashcardProgress(state.progress, card.id, button.dataset.cardStatus);
      saveAndRender();
      state.cardIndex = (state.cardIndex + 1) % queue.length;
      state.cardRevealed = false;
      renderFlashcard();
      renderMetrics();
      renderReviewQueue();
    });
  });

  document.querySelectorAll("[data-knowledge-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const queue = getKnowledgeReviewQueue(curriculum, state.progress, 12);
      const card = queue[state.knowledgeIndex % queue.length];
      state.progress = updateKnowledgeCardProgress(state.progress, card.id, button.dataset.knowledgeStatus);
      saveProgress(localStorage, state.progress);
      state.knowledgeIndex = (state.knowledgeIndex + 1) % queue.length;
      renderKnowledgeReview();
      renderAdaptiveSession();
      renderMetrics();
    });
  });

  document.querySelectorAll("[data-dictation-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const queue = getDictationReviewQueue(curriculum, state.progress, 12);
      const item = queue[state.dictationIndex % queue.length];
      state.progress = updateDictationProgress(state.progress, item.id, button.dataset.dictationStatus);
      saveProgress(localStorage, state.progress);
      state.dictationIndex = (state.dictationIndex + 1) % queue.length;
      renderDictationReview();
      renderAdaptiveSession();
    });
  });

  els.writingDoneButton.addEventListener("click", () => {
    const item = getChineseDailyLessonMission(curriculum, state.progress);
    const selfAssessment = {
      evidence: els.writingEvidenceCheck.checked,
      structure: els.writingStructureCheck.checked,
      language: els.writingLanguageCheck.checked,
    };
    state.progress = updateWritingMissionProgress(state.progress, item.writing.id, "done", new Date().toISOString(), selfAssessment);
    saveProgress(localStorage, state.progress);
    state.writingIndex = 0;
    renderWritingMission();
    renderAdaptiveSession();
    renderReviewQueue();
  });
}

function renderAll() {
  renderSubjectNav();
  renderViewVisibility();
  renderMetrics();
  renderAdaptiveSession();
  renderTodayPlan();
  renderReviewQueue();
  renderFlashcard();
  renderDailyWordMission();
  renderGrammarPractice();
  renderMathExercise();
  renderMathAdvice();
  renderKnowledgeReview();
  renderQuickPractice();
  renderDictationReview();
  renderWritingMission();
  clearSubjectUtilityPanels();
  renderActivityLibrary();
  els.modeBadge.textContent = state.mode === "child" ? "20-30 分钟" : "校对视图";
}

function clearSubjectUtilityPanels() {
  els.coverageSummary.innerHTML = "";
  els.reviewCoverage.innerHTML = "";
  els.subjectKnowledgeBank.innerHTML = "";
  els.chapterIndex.innerHTML = "";
}

function renderVersions() {
  els.versionList.innerHTML = Object.entries(curriculum.meta.defaultVersions)
    .map(([subject, version]) => {
      const subjectName = curriculum[subject].name;
      const audit = curriculum.meta.versionAudit?.[subject];
      const statusLabel = audit?.status === "confirmed" ? "已确认" : "待确认";
      return `
        <div class="version-row">
          <div>
            <span>${subjectName}</span>
            <b class="version-status ${audit?.status ?? "pending"}">${statusLabel}</b>
          </div>
          <strong>${version}</strong>
          <p>${audit?.source ?? "来源待补充"} · ${audit?.note ?? "教材版本需要人工确认后再上线。"}</p>
        </div>
      `;
    })
    .join("");
}

function renderSubjectNav() {
  const homeButton = `<button class="${state.view === "home" ? "active" : ""}" data-view="home" type="button">首页</button>`;
  const subjectButtons = subjectOrder
    .map((subjectId) => {
      const subject = curriculum[subjectId];
      const active = state.view === "subject" && subjectId === state.subject ? "active" : "";
      return `<button class="${active}" data-subject="${subjectId}" type="button">${subject.name}</button>`;
    })
    .join("");
  els.subjectNav.innerHTML = homeButton + subjectButtons;

  els.subjectNav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.view === "home") {
        state.view = "home";
        renderSubjectNav();
        renderViewVisibility();
        return;
      }

      state.view = "subject";
      state.subject = button.dataset.subject;
      state.knowledgeBankQuery = "";
      state.knowledgeBankStatus = "all";
      renderSubjectNav();
      renderViewVisibility();
      clearSubjectUtilityPanels();
      renderActivityLibrary();
    });
  });
}

function renderViewVisibility() {
  els.homeView.hidden = state.view !== "home";
  els.subjectView.hidden = state.view !== "subject";
  document.body.dataset.view = state.view;
}

function renderMetrics() {
  const summary = getMasterySummary(curriculum.english.flashcards, state.progress);
  els.streakValue.textContent = `${state.progress.streak || 0} 天`;
  els.flashcardValue.textContent = `${summary.known}/${curriculum.english.flashcards.length}`;
  els.weakValue.textContent = state.progress.weakTags.slice(0, 2).join("、") || "暂无";
}

function renderAdaptiveSession() {
  const session = getAdaptivePreviewSession(curriculum, state.progress);
  const allSubjectLoop = getAllSubjectLearningLoopSummary(curriculum, state.progress);
  const focus = session.focusTags.length ? session.focusTags.join("、") : "均衡预习";
  const steps = session.steps
    .map(
      (step, index) => `
        <article class="adaptive-step ${step.kind}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <div>
            <strong>${step.title}</strong>
            <p>${step.action}</p>
            <em>${step.reason}</em>
          </div>
          <small>${step.subjectName} · ${step.minutes} 分钟</small>
        </article>
      `,
    )
    .join("");

  els.adaptiveSession.innerHTML = `
    <details class="adaptive-details">
      <summary>查看完整预习路线</summary>
      ${renderAllSubjectLearningLoop(allSubjectLoop)}
      <section class="adaptive-session-card">
        <div class="adaptive-session-head">
          <div>
            <strong>${session.title}</strong>
            <p>${session.totalMinutes} 分钟 · 重点：${focus}</p>
          </div>
          <span>${session.steps.length} 步</span>
        </div>
        <div class="adaptive-step-list">${steps}</div>
      </section>
    </details>
  `;
}

function renderAllSubjectLearningLoop(summary) {
  if (!summary?.totalCount) {
    return "";
  }

  const subjectItems = summary.subjects
    .map((subject) => `
      <article class="${subject.reviewChapterCount ? "needs-review" : subject.percent === 100 ? "done" : ""}">
        <strong>${subject.subjectName}</strong>
        <span>${subject.percent}%</span>
        <p>${subject.reviewChapterCount ? `${subject.reviewChapterCount} 章需回炉` : `${subject.doneCount}/${subject.totalCount} 检查点`}</p>
      </article>
    `)
    .join("");
  const nextSubject = summary.nextSubject;
  const nextText = nextSubject
    ? `优先：${nextSubject.subjectName}${nextSubject.nextChapter ? ` · ${nextSubject.nextChapter.chapterTitle}` : ""}`
    : "五科保持均衡复习";
  const reviewText = summary.reviewSubjectCount ? `${summary.reviewSubjectCount} 科需回炉` : "暂无回炉科目";

  return `
    <section class="all-subject-learning-loop">
      <div class="all-subject-learning-loop-head">
        <div>
          <strong>全科闭环总览</strong>
          <p>${summary.doneCount}/${summary.totalCount} 个预习检查点完成 · ${nextText}</p>
        </div>
        <span>${summary.percent}% · ${reviewText}</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="all-subject-learning-loop-list">${subjectItems}</div>
    </section>
  `;
}

function renderTodayPlan() {
  const plan = getTodayPlan(curriculum, state.progress, state.mode);
  const visiblePlan = plan.slice(0, 3);
  const extraPlan = plan.slice(3);
  const renderTask = (activity) => {
    const done = state.progress.completedActivities.includes(activity.id);
    return `
      <article class="task-item ${done ? "done" : ""}">
        <div>
          <span class="badge">${curriculum[activity.subject].name} · ${activity.minutes} 分钟</span>
          <h4>${activity.title}</h4>
          <p>${activity.prompt}</p>
        </div>
        <button data-complete="${activity.id}" type="button">${done ? "已完成" : "完成"}</button>
      </article>
    `;
  };

  const visibleTasks = visiblePlan.map(renderTask).join("");
  const extraTasks = extraPlan.map(renderTask).join("");
  els.todayPlan.innerHTML =
    visibleTasks +
    (extraPlan.length
      ? `
        <details class="more-tasks">
          <summary>更多可选任务（${extraPlan.length} 项）</summary>
          <div>${extraTasks}</div>
        </details>
      `
      : "");

  els.todayPlan.querySelectorAll("[data-complete]").forEach((button) => {
    button.addEventListener("click", () => {
      state.progress = completeActivity(state.progress, button.dataset.complete);
      saveAndRender();
    });
  });
}

function renderReviewQueue() {
  const queue = getCrossSubjectReviewQueue(curriculum, state.progress);
  els.reviewCount.textContent = `${queue.length} 项`;
  els.reviewQueue.innerHTML = queue.length
    ? queue
        .map((item) => {
          const subjectName = curriculum[item.subject]?.name ?? item.subject;
          return `
            <article class="review-item priority-${item.priority}">
              <div>
                <span>${subjectName} · ${reviewTypeLabel(item.type)}</span>
                <strong>${item.title}</strong>
                <p>${item.detail}</p>
                ${renderRepairSummary(item)}
              </div>
              <em>${item.action}</em>
            </article>
          `;
        })
        .join("")
    : `
      <div class="empty-review">
        <strong>暂时没有复习项</strong>
        <p>做题或词卡标记“模糊/不会”后，会自动进入这里。</p>
      </div>
    `;
}

function renderRepairSummary(item) {
  if (!item.diagnosis && !item.repairAction) {
    return "";
  }

  return `
    <p class="repair-summary">
      ${item.diagnosis?.label ? `错因：${item.diagnosis.label}` : ""}
      ${item.repairAction?.title ? ` · ${item.repairAction.title}` : ""}
    </p>
  `;
}

function renderDictationReview() {
  const queue = getDictationReviewQueue(curriculum, state.progress, 12);
  const item = queue[state.dictationIndex % queue.length];
  const statusText = {
    weak: "不会写",
    learning: "再练",
    known: "会写",
    new: "新词",
  }[item.status];

  els.dictationWord.textContent = item.word;
  els.dictationCounter.textContent = `${state.dictationIndex + 1}/${queue.length} · ${statusText}`;
  els.dictationContext.textContent = `${item.chapterTitle} · ${item.lessonTitle}`;
  els.dictationPrompt.textContent = item.retrievalPrompt;
  els.dictationDraft.className = "dictation-draft";
  els.dictationDraft.innerHTML = `
    <label>
      <span>先默写这个词</span>
      <textarea class="dictation-draft-input" rows="3" placeholder="先在这里默写字词、拼音或易错字形，写完再判断会不会。"></textarea>
    </label>
    <small>写完再判断会不会</small>
  `;
}

function renderWritingMission() {
  const item = getChineseDailyLessonMission(curriculum, state.progress);

  els.writingLesson.textContent = item.lessonTitle;
  els.writingCounter.textContent = item.status === "done" ? "已完成" : "今日一课";
  els.writingContext.textContent = item.chapterTitle;
  els.writingTask.innerHTML = `
    <span>默写</span>${item.dictation.words.slice(0, 6).join("、")}
    <br><em>${item.dictation.checkRule}</em>
    <span>阅读</span>${item.reading.prompt}
    <br><em>${item.reading.checkRule}</em>
    <span>写作</span>${item.writing.task}
    <br><em>${item.writing.checkRule}</em>
    <label class="writing-output-draft">
      <span>先写本课输出</span>
      <textarea class="writing-output-input" rows="4" placeholder="先完成默写、阅读依据和写作迁移片段，再勾选自评。"></textarea>
      <small>完成后再勾选自评</small>
    </label>
  `;
  const selfAssessment = item.selfAssessment ?? { evidence: true, structure: true, language: true };
  els.writingSelfCheck.querySelectorAll("input").forEach((input) => {
    input.disabled = item.status === "done";
  });
  els.writingEvidenceCheck.checked = selfAssessment.evidence !== false;
  els.writingStructureCheck.checked = selfAssessment.structure !== false;
  els.writingLanguageCheck.checked = selfAssessment.language !== false;
  els.writingDoneButton.textContent = item.status === "done" ? "已完成" : "完成本课迁移";
  els.writingDoneButton.disabled = item.status === "done";
}

function renderKnowledgeReview() {
  const queue = getKnowledgeReviewQueue(curriculum, state.progress, 12);
  const card = queue[state.knowledgeIndex % queue.length];
  const statusText = {
    weak: "不熟",
    learning: "再练",
    known: "掌握",
    new: "新卡",
  }[card.status];

  els.knowledgeConcept.textContent = card.concept;
  els.knowledgeCounter.textContent = `${state.knowledgeIndex + 1}/${queue.length} · ${statusText}`;
  els.knowledgeSubject.textContent = `${card.subjectName} · ${card.chapterTitle} · ${card.lessonTitle}`;
  els.knowledgeExplanation.textContent = card.explanation;
  els.knowledgeExamCue.textContent = card.examCue;
  els.knowledgeTrap.textContent = card.trap;
  els.knowledgeRetrieval.textContent = card.retrievalPrompt;
  els.knowledgeRecallDraft.className = "knowledge-recall-draft";
  els.knowledgeRecallDraft.innerHTML = `
    <label>
      <span>先写回忆答案</span>
      <textarea class="knowledge-recall-input" rows="3" placeholder="先写核心概念、考法提示和易错点，再标记掌握度。"></textarea>
    </label>
    <small>再标记掌握度</small>
  `;
}

function renderQuickPractice() {
  const queue = getQuickCheckPracticeQueue(curriculum, state.progress, 20);
  const item = queue[state.quickPracticeIndex % queue.length];
  const scienceMission = ["physics", "chemistry"].includes(item.subject)
    ? getScienceDailyLessonMission(curriculum, state.progress, item.subject)
    : null;
  const statusText = {
    missed: "错题",
    new: "新题",
    known: "已会",
  }[item.status];

  els.quickPracticeTitle.textContent = `${item.subjectName}快测`;
  els.quickPracticeCounter.textContent = `${state.quickPracticeIndex + 1}/${queue.length} · ${statusText}`;
  els.quickPracticeContext.textContent = `${item.chapterTitle} · ${item.lessonTitle}`;
  els.quickPracticeQuestion.innerHTML = `${scienceMission ? renderScienceMissionBrief(scienceMission) : ""}<span>${item.check.question}</span>`;
  els.quickPracticeFeedback.innerHTML = "";
  els.quickPracticeChoices.innerHTML = item.check.choices
    .map((choice) => `<button data-quick-practice-choice="${choice}" type="button">${choice}</button>`)
    .join("");

  els.quickPracticeChoices.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.progress = answerQuickCheck(state.progress, item.check, button.dataset.quickPracticeChoice);
      const correct = button.dataset.quickPracticeChoice === item.check.answer;
      const mistake = findQuickCheckMistake(item.check.id);
      els.quickPracticeFeedback.innerHTML = `
        <strong>${correct ? "答对了" : "先记入快测错题"}</strong>
        <p>${item.check.explanation}</p>
        ${renderRepairPanel(mistake)}
      `;
      state.quickPracticeIndex = (state.quickPracticeIndex + 1) % queue.length;
      saveProgress(localStorage, state.progress);
      renderReviewQueue();
    });
  });
}

function renderScienceMissionBrief(mission) {
  const statusText = {
    weak: "还模糊",
    learning: "再练",
    known: "说清楚",
    new: "未自评",
  }[mission.observation.status ?? "new"];

  return `
    <section class="science-mission-brief">
      <strong>${mission.subjectName}每日一课：${mission.lessonTitle}</strong>
      <p><span>概念</span>${mission.conceptPrompt}</p>
      <p><span>实验/现象</span>${mission.observation.prompt}</p>
      <p><span>易错</span>${mission.trap.prompt}</p>
      <em>${mission.trap.repairAction}</em>
      <label class="science-observation-draft">
        <span>先写观察结论</span>
        <textarea class="science-observation-input" rows="2" placeholder="写清现象、条件、本质和安全，再判断自己是否能说清楚。"></textarea>
      </label>
      <div class="science-observation-actions" data-science-observation="${mission.observation.id}">
        <span>${statusText}</span>
        <button data-science-observation-status="known" data-observation-id="${mission.observation.id}" type="button">说清楚</button>
        <button data-science-observation-status="weak" data-observation-id="${mission.observation.id}" type="button">还模糊</button>
      </div>
    </section>
  `;
}

function renderFlashcard() {
  const queue = getReviewQueue(curriculum.english.flashcards, state.progress);
  const card = queue[state.cardIndex % queue.length];
  const status = state.progress.flashcards[card.id]?.status ?? "new";
  const front = state.cardDirection === "en-cn" ? card.word : card.meaning;
  const back = state.cardDirection === "en-cn" ? card.meaning : card.word;
  const unitLabel = card.unit.replace(/^Unit\s+/, "U").split(" ").slice(0, 2).join(" ");

  els.cardWord.textContent = front;
  els.cardCounter.textContent = `${state.cardIndex + 1}/${queue.length} · ${unitLabel} · ${statusLabel(status)}`;
  els.cardMeaning.textContent = state.cardRevealed ? back : "";
  els.cardMeaning.hidden = !state.cardRevealed;
  els.cardExample.hidden = !state.cardRevealed;
  els.cardExample.innerHTML = state.cardRevealed
    ? `
      <p><span>例句</span>${card.exampleEn}</p>
      <p><span>句意</span>${card.exampleCn}</p>
      <p><span>搭配</span>${card.collocation}</p>
      <p><span>听写</span>${card.dictationPrompt}</p>
    `
    : "";
  els.cardDirectionButton.textContent = state.cardDirection === "en-cn" ? "英 → 中" : "中 → 英";
  els.cardRevealButton.textContent = state.cardRevealed ? "隐藏答案" : "显示答案";
}

function renderDailyWordMission() {
  const mission = getEnglishDailyWordMission(curriculum, state.progress);
  const grammar = mission.grammarFocus
    ? `
      <article class="daily-word-output">
        <span>今日语法</span>
        <strong>${mission.grammarFocus.title}</strong>
        <p>${mission.grammarFocus.explanation}</p>
        <em>${mission.grammarFocus.checkpoint}</em>
      </article>
    `
    : "";
  const translation = mission.translationTask
    ? `
      <article class="daily-word-output">
        <span>今日翻译</span>
        <strong>${mission.translationTask.focus}</strong>
        <p>${mission.translationTask.prompt}</p>
        <details>
          <summary>看答案和检查点</summary>
          <p>${mission.translationTask.answer}</p>
          <em>${mission.translationTask.checkRule}</em>
        </details>
      </article>
    `
    : "";

  els.dailyWordUnit.textContent = mission.unitTitle;
  els.dailyWordDay.textContent = `Day ${mission.day}`;
  els.dailyWordSummary.textContent = `${mission.overview} · ${mission.knownCount}/${mission.totalCount} 已认识`;
  const dictation = `
    <label class="daily-word-dictation">
      <span>先听写回忆</span>
      <textarea class="daily-word-dictation-input" rows="3" placeholder="先根据今天这一组词的中文、词性或脑中印象写英文和短语。"></textarea>
      <small>完成后再点单词看中英文</small>
    </label>
  `;
  els.dailyWordList.innerHTML = dictation + mission.words
    .map(
      (word) => `
        <button class="daily-word-item ${word.status}" type="button" title="点一下看中英文">
          <span>${word.word}</span>
          <strong>${word.cn}</strong>
        </button>
      `,
    )
    .join("") + grammar + translation;
}

function renderGrammarPractice() {
  const queue = getGrammarReviewQueue(curriculum, state.progress);
  const item = queue[state.grammarIndex % queue.length];
  const statusText = {
    missed: "错题",
    new: "新题",
    known: "已会",
  }[item.status];

  els.grammarTitle.textContent = item.title;
  els.grammarCounter.textContent = `${state.grammarIndex + 1}/${queue.length} · ${statusText}`;
  els.grammarUnit.textContent = item.unitTitle;
  els.grammarExplanation.textContent = item.explanation;
  els.grammarExample.textContent = item.example;
  els.grammarCheckpoint.textContent = item.checkpoint;
  els.grammarQuestion.textContent = item.quiz.question;
  els.grammarPracticeEvidence.className = "grammar-practice-evidence";
  els.grammarPracticeEvidence.innerHTML = "";
  els.grammarFeedback.innerHTML = "";
  els.grammarChoices.innerHTML = item.quiz.choices
    .map((choice) => `<button data-grammar-practice-choice="${choice}" type="button">${choice}</button>`)
    .join("");

  els.grammarChoices.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.progress = answerGrammarQuiz(state.progress, item.quiz, button.dataset.grammarPracticeChoice);
      const correct = button.dataset.grammarPracticeChoice === item.quiz.answer;
      els.grammarFeedback.innerHTML = `
        <strong>${correct ? "答对了" : "先记入语法错题"}</strong>
        <p>${item.quiz.explanation}</p>
      `;
      state.grammarIndex = (state.grammarIndex + 1) % queue.length;
      saveProgress(localStorage, state.progress);
      renderReviewQueue();
    });
  });
}

function renderMathExercise() {
  const mission = getMathDailyLessonMission(curriculum, state.progress);
  const practice = mission.practice;
  els.mathConcept.textContent = mission.target.concept;
  els.mathDifficulty.textContent = `${mission.chapterTitle} · ${mission.lessonTitle}`;
  els.mathQuestion.innerHTML = renderMathMissionBrief(mission);
  els.mathFeedback.innerHTML = "";
  els.mathChoices.innerHTML = practice.choices
    .map((choice) => `<button data-choice="${choice}" type="button">${choice}</button>`)
    .join("");

  els.mathChoices.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.progress = answerPracticeQuestion(state.progress, practice, button.dataset.choice);
      const correct = button.dataset.choice === practice.answer;
      els.mathChoices.querySelectorAll("button").forEach((choiceButton) => {
        choiceButton.disabled = true;
      });
      els.mathFeedback.innerHTML = `
        <strong>${correct ? "答对了" : "先记入错题，再看解析"}</strong>
        <p>${practice.explanation}</p>
        <p class="trap">${mission.trap.prompt}</p>
        <p>${mission.trap.repairAction}</p>
      `;
      saveProgress(localStorage, state.progress);
      renderMetrics();
      renderReviewQueue();
      renderMathAdvice();
    });
  });
}

function renderMathMissionBrief(mission) {
  return `
    <span class="math-mission-brief">
      <strong>今日一课：${mission.target.questionType}</strong>
      <em>${mission.target.examCue}</em>
      <span>例题拆解</span>
      ${mission.model.steps.map((step) => `<b>${step}</b>`).join("")}
      <span>马上练</span>
      <b>${mission.practice.question}</b>
      <label class="math-answer-draft">
        <span>先独立完成</span>
        <textarea class="math-answer-draft-input" rows="3" placeholder="写关键步骤、公式、代入和结论。"></textarea>
      </label>
    </span>
  `;
}

function renderMathAdvice() {
  const advice = getMathLearningAdvice(curriculum, state.progress);
  els.mathAdviceFocus.textContent = advice.focus;
  els.mathAdviceReason.textContent = advice.reason;
  els.mathAdviceSteps.innerHTML = advice.nextSteps.map((step) => `<li>${step}</li>`).join("");
}

function renderActivityLibrary() {
  const subject = curriculum[state.subject];
  const activeChapter = getActiveChapter(subject);
  els.subjectTitle.textContent = subject.name;
  els.subjectVersion.textContent = curriculum.meta.defaultVersions[state.subject];
  const chapterCards = renderChapterCard(state.subject, activeChapter);
  els.activityLibrary.innerHTML =
    renderChapterSwitcher(subject, activeChapter) +
    chapterCards;
}

function getActiveChapter(subject) {
  const savedChapterId = state.activeChapterBySubject[state.subject];
  const activeChapter = subject.chapters.find((chapter) => chapter.id === savedChapterId) ?? subject.chapters[0];
  state.activeChapterBySubject[state.subject] = activeChapter.id;
  return activeChapter;
}

function renderChapterSwitcher(subject, activeChapter) {
  const buttons = subject.chapters
    .map(
      (chapter, index) => `
        <button
          class="${chapter.id === activeChapter.id ? "active" : ""}"
          data-chapter-switch="${chapter.id}"
          type="button"
        >
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${chapter.title}</strong>
          <em>${chapter.lessons.length} 课 · ${chapter.knowledgeMap?.coreIdeas?.length ?? 0} 要点</em>
        </button>
      `,
    )
    .join("");

  return `
    <section class="chapter-switcher" aria-label="章节切换">
      <div>
        <strong>章节切换</strong>
        <p>先选章节，再展开本章课程、词表、练习和知识点。</p>
      </div>
      <div>${buttons}</div>
    </section>
  `;
}

function renderSubjectLearningLoop(summary) {
  if (!summary?.totalCount) {
    return "";
  }

  const chapterItems = summary.chapters
    .map((chapter) => `
      <article class="${chapter.reviewLessonCount ? "needs-review" : chapter.percent === 100 ? "done" : ""}">
        <strong>${chapter.chapterTitle}</strong>
        <span>${chapter.percent}%</span>
        <p>${chapter.reviewLessonCount ? `${chapter.reviewLessonCount} 课需回炉` : `${chapter.doneCount}/${chapter.totalCount} 检查点`}</p>
      </article>
    `)
    .join("");
  const nextText = summary.nextChapter ? `下一章：${summary.nextChapter.chapterTitle}` : "本学科已完成";
  const reviewText = summary.reviewChapterCount ? `${summary.reviewChapterCount} 章需回炉` : "暂无回炉章节";

  return `
    <section class="subject-learning-loop">
      <div class="subject-learning-loop-head">
        <div>
          <strong>学科闭环总览</strong>
          <p>${summary.doneCount}/${summary.totalCount} 个课内检查点完成 · ${nextText}</p>
        </div>
        <span>${summary.percent}% · ${reviewText}</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="subject-learning-loop-list">${chapterItems}</div>
    </section>
  `;
}

function renderCoverageSummary() {
  const summary = getCurriculumCoverageSummary(curriculum);
  const subject = summary.subjects.find((item) => item.id === state.subject);
  const gapLabel = subject.gaps.length ? subject.gaps.join("、") : "基础覆盖达标";
  const extras = state.subject === "english"
    ? `<span>${subject.wordCount} 词/短语</span><span>${subject.grammarCount} 个语法点</span>`
    : state.subject === "chinese"
      ? `<span>${subject.dictationWordCount} 个默写词</span>`
      : "";

  els.coverageSummary.innerHTML = `
    <section class="coverage-card">
      <div>
        <strong>内容覆盖检查</strong>
        <p>${subject.name}：${gapLabel}</p>
      </div>
      <div class="coverage-stat-row">
        <span>${subject.chapters} 章</span>
        <span>${subject.lessons} 课</span>
        <span>${subject.knowledgeCards} 张知识卡</span>
        <span>${subject.practiceQuestions} 道练习</span>
        <span>${subject.quickChecks} 个快测</span>
        ${extras}
      </div>
      <p class="coverage-review-note">待校对活动：${summary.review.pendingCount} 项；孩子视图默认隐藏。</p>
    </section>
  `;
}

function renderReviewCoverage() {
  if (state.mode !== "reviewer") {
    els.reviewCoverage.innerHTML = "";
    return;
  }

  const summary = getReviewCoverageSummary(curriculum);
  const subject = summary.subjects.find((item) => item.id === state.subject);
  const subjectQueue = summary.pendingQueue.filter((item) => item.subject === state.subject);
  const queue = subjectQueue.length ? subjectQueue : summary.pendingQueue.slice(0, 4);
  const queueTitle = subjectQueue.length ? `${subject.name}待校对` : "全科待校对";
  const subjectStats = summary.subjects
    .map(
      (item) => `
        <span class="${item.pendingCount ? "needs-review" : "reviewed"}">
          ${item.name} ${item.approvedCount}/${item.totalCount}
        </span>
      `,
    )
    .join("");
  const pendingItems = queue.length
    ? queue
        .map((item) => {
          const tags = item.knowledgeTags.slice(0, 3).map((tag) => `<span>${tag}</span>`).join("");
          return `
            <article class="review-queue-card">
              <div>
                <strong>${item.title}</strong>
                <p>${item.subjectName} · ${typeLabel(item.type)} · ${item.difficulty}</p>
              </div>
              <div class="review-queue-tags">${tags}</div>
              <em>${item.prompt}</em>
            </article>
          `;
        })
        .join("")
    : `<p class="review-empty-note">当前没有待校对活动。</p>`;

  els.reviewCoverage.innerHTML = `
    <section class="review-workbench">
      <div class="review-workbench-head">
        <div>
          <strong>校对覆盖工作台</strong>
          <p>孩子视图只展示已校对内容；这里用于家长或校对者补齐资料质量。</p>
        </div>
        <span>${summary.pendingCount} 项待校对</span>
      </div>
      <div class="review-stat-strip">
        <span>总活动 ${summary.totalCount}</span>
        <span>已校对 ${summary.approvedCount}</span>
        ${subjectStats}
      </div>
      <div class="review-queue-head">
        <strong>${queueTitle}</strong>
        <span>${subject.pendingCount ? `${subject.pendingCount} 项` : "本学科已清空"}</span>
      </div>
      <div class="review-queue-list">${pendingItems}</div>
    </section>
  `;
}

function renderSubjectKnowledgeBank() {
  const fullBank = getSubjectKnowledgeBank(curriculum, state.subject, state.progress);
  const bank = filterSubjectKnowledgeBank(fullBank, {
    query: state.knowledgeBankQuery,
    status: state.knowledgeBankStatus,
  });
  const items = bank.items
    .slice(0, 10)
    .map(
      (item) => `
        <article class="subject-knowledge-item ${item.status}">
          <span>${knowledgeStatusLabel(item.status)}</span>
          <div>
            <strong>${item.concept}</strong>
            <p>${item.chapterTitle} · ${item.lessonTitle}</p>
            <em class="subject-knowledge-recall"><b>回忆任务</b>${item.retrievalPrompt}</em>
            <div class="subject-knowledge-actions">
              <button data-subject-knowledge-status="known" data-card-id="${item.id}" type="button">掌握</button>
              <button data-subject-knowledge-status="learning" data-card-id="${item.id}" type="button">再练</button>
              <button data-subject-knowledge-status="weak" data-card-id="${item.id}" type="button">不熟</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
  const rest = Math.max(0, bank.totalCount - 10);
  const filterOptions = [
    ["all", "全部"],
    ["unmastered", "未掌握"],
    ["weak", "不熟"],
    ["learning", "再练"],
    ["known", "掌握"],
  ]
    .map(
      ([value, label]) => `
        <button class="${state.knowledgeBankStatus === value ? "active" : ""}" data-knowledge-filter="${value}" type="button">
          ${label}
        </button>
      `,
    )
    .join("");

  els.subjectKnowledgeBank.innerHTML = `
    <section class="subject-knowledge-bank">
      <div class="subject-knowledge-head">
        <div>
          <strong>${bank.subjectName}知识点总库</strong>
          <p>${bank.knownCount}/${bank.totalCount} 已掌握，当前显示 ${bank.items.length}/${fullBank.totalCount}</p>
        </div>
        <div class="progress-track"><span style="width: ${bank.percent}%"></span></div>
      </div>
      <div class="knowledge-bank-tools">
        <input data-knowledge-search type="search" value="${escapeAttribute(state.knowledgeBankQuery)}" placeholder="搜索知识点、章节、易错点" />
        <div>${filterOptions}</div>
      </div>
      <div class="subject-knowledge-list">${items}</div>
      ${bank.totalCount ? "" : `<p class="subject-knowledge-more">没有匹配的知识点，换个关键词试试。</p>`}
      ${rest ? `<p class="subject-knowledge-more">还有 ${rest} 个匹配知识点可继续缩小筛选或在各章节中展开。</p>` : ""}
    </section>
  `;
}

function renderChapterIndex() {
  const chapters = getSubjectChapterIndex(curriculum, state.subject);
  const pathByChapter = new Map(getChapterLearningPath(curriculum, state.subject, state.progress).map((item) => [item.id, item]));
  els.chapterIndex.innerHTML = chapters
    .map((chapter) => {
      const path = pathByChapter.get(chapter.id);
      const extraStat = chapter.wordCount
        ? `<span><b>${chapter.wordCount}</b> 词/短语</span>`
        : chapter.dictationWordCount
          ? `<span><b>${chapter.dictationWordCount}</b> 个默写词</span>`
          : "";
      const coreIdeas = chapter.coreIdeas.slice(0, 3).map((item) => `<span>${item}</span>`).join("");
      return `
        <article class="chapter-index-card">
          <div class="chapter-index-head">
            <div class="chapter-index-title">
              <strong>${chapter.title}</strong>
              <em>${chapter.lessonCount} 课</em>
            </div>
            <p>${chapter.overview}</p>
          </div>
          <div class="chapter-index-load">
            <span><b>${chapter.knowledgeCardCount}</b> 知识卡</span>
            <span><b>${chapter.practiceQuestionCount}</b> 练习</span>
            ${path ? `<span><b>${path.completedSteps}/${path.totalSteps}</b> 路线</span>` : ""}
            ${extraStat}
          </div>
          ${path ? renderChapterProgress(path) : ""}
          <div class="chapter-index-ideas">
            <strong>核心要点</strong>
            <div>${coreIdeas}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderChapterCard(subjectId, chapter) {
  if (["math", "physics", "chemistry"].includes(subjectId)) {
    return renderStemChapterCard(subjectId, chapter);
  }

  const showLessonRows = subjectId !== "english";
  const lessonCount = showLessonRows ? chapter.lessons.length : chapter.grammarNotes?.length ?? chapter.lessons.length;
  const knowledgeChecklist = getChapterKnowledgeChecklist(curriculum, subjectId, chapter.id, state.progress);
  const lessons = showLessonRows
    ? chapter.lessons
    .map((lesson, index) => {
      const keyPoints = lesson.keyPoints.map((point) => `<li>${point}</li>`).join("");
      const dictation = lesson.dictationWords
        ? `<div class="dictation-line"><strong>默写词语</strong><span>${lesson.dictationWords.join("、")}</span></div>`
        : "";
      const extras = renderLessonExtras(lesson);
      const lessonBody = subjectId === "chinese"
        ? renderChineseLessonBody(lesson)
        : `
            ${dictation}
            <div class="lesson-main-points">
              <strong>学习要点</strong>
              <ul>${keyPoints}</ul>
            </div>
            ${extras}
          `;
      const summary = renderLessonRowSummary(lesson);
      return `
        <details class="lesson-row">
          <summary>
            <span class="lesson-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="lesson-title">${lesson.title}</span>
            ${summary}
          </summary>
          <div class="lesson-body">
            ${lessonBody}
          </div>
        </details>
      `;
    })
    .join("")
    : "";
  const englishExtras = subjectId === "english" ? renderEnglishExtras(chapter) : "";
  const knowledgeMap = renderKnowledgeMap(chapter.knowledgeMap);
  const supportBlocks = [
    knowledgeMap,
    renderChapterMasteryChecklist(chapter),
    renderChapterKnowledgeChecklist(knowledgeChecklist),
    renderChapterTieredPractice(subjectId, chapter),
  ]
    .filter(Boolean)
    .join("");

  return `
    <article class="library-card chapter-card">
      <div class="chapter-head">
        <div>
          <div class="card-topline">
            <span class="badge">章节列表</span>
            <span class="review-status approved">原创预习</span>
          </div>
          <h4>${chapter.title}</h4>
          <p>${chapter.overview}</p>
        </div>
        <div class="chapter-meta">
          <span>${lessonCount} 个知识点</span>
        </div>
      </div>
      ${englishExtras}
      ${lessons ? `<div class="lesson-list">${lessons}</div>` : ""}
      ${renderChapterSupportDetails(supportBlocks)}
    </article>
  `;
}

function renderChineseLessonBody(lesson) {
  const words = (lesson.dictationWords ?? [])
    .map((word) => `<span>${typeof word === "string" ? word : word.word}</span>`)
    .join("");
  const focus = (lesson.readingFocus ?? lesson.keyPoints ?? [])
    .map((item) => `<li>${item}</li>`)
    .join("");
  const questions = (lesson.readingQuestions ?? [])
    .map((question, index) => `<li><strong>${index + 1}.</strong> ${question}</li>`)
    .join("");
  const originalText = lesson.originalText
    ? `<pre>${lesson.originalText}</pre>`
    : `<p>${lesson.textSource?.note ?? "暂不展示全文，可使用课本阅读原文。"}</p>`;
  const sourceLabel = lesson.textSource?.type === "public-domain" ? "公版原文" : "课本原文";

  return `
    <div class="chinese-lesson-package">
      <section class="chinese-lesson-intro">
        <div>
          <strong>${lesson.genre ?? "课文"} · ${lesson.author ?? lesson.source ?? "课文导读"}</strong>
          <span>${sourceLabel}</span>
        </div>
        <p>${lesson.intro ?? "先读标题和导读，再回到课本完成原文阅读。"}</p>
      </section>
      <details class="chinese-original-text">
        <summary>展开原文</summary>
        ${originalText}
      </details>
      <section class="chinese-dictation-block">
        <strong>必会词语</strong>
        <div class="dictation-word-table">${words}</div>
      </section>
      <section>
        <strong>阅读要点</strong>
        <ul class="reading-focus-list">${focus}</ul>
      </section>
      <section>
        <strong>阅读理解</strong>
        <ol class="reading-question-list">${questions}</ol>
      </section>
      <section class="writing-transfer-card">
        <strong>写作迁移</strong>
        <p>${lesson.writingTask ?? "提炼本课表达方法，换成自己的材料写一段话。"}</p>
      </section>
    </div>
  `;
}

function renderStemChapterCard(subjectId, chapter) {
  const conceptCount = chapter.lessons.reduce((sum, lesson) => sum + (lesson.keyPoints?.length ?? 0), 0);
  const practiceGroups = buildStemPracticeGroups(subjectId, chapter);
  const practiceCount = practiceGroups.reduce((sum, group) => sum + group.questions.length, 0);

  return `
    <article class="library-card chapter-card stem-chapter-card">
      <div class="chapter-head">
        <div>
          <div class="card-topline">
            <span class="badge">章节学习</span>
            <span class="review-status approved">原创变式</span>
          </div>
          <h4>${chapter.title}</h4>
          <p>${chapter.overview}</p>
        </div>
        <div class="chapter-meta">
          <span>${conceptCount} 个知识点</span>
          <span>${practiceCount} 道题</span>
        </div>
      </div>
      <div class="stem-study-layout">
        ${renderStemKnowledgeSection(subjectId, chapter)}
        ${renderStemPracticeSection(subjectId, chapter)}
      </div>
    </article>
  `;
}

function renderStemKnowledgeSection(subjectId, chapter) {
  const lessonBlocks = chapter.lessons
    .map((lesson, lessonIndex) => {
      const points = (lesson.keyPoints ?? [])
        .map((point) => renderStemKnowledgePoint(point))
        .join("");
      const support = renderStemLessonSupport(subjectId, lesson);
      return `
        <section class="stem-lesson-block">
          <div class="stem-lesson-head">
            <span>${String(lessonIndex + 1).padStart(2, "0")}</span>
            <strong>${lesson.title}</strong>
          </div>
          <div class="stem-point-list">${points}</div>
          ${support}
        </section>
      `;
    })
    .join("");

  return `
    <section class="stem-knowledge-section">
      <div class="stem-section-head">
        <strong>本章知识点</strong>
        <p>知识点和常考内容先列清楚，下面直接做题。</p>
      </div>
      ${lessonBlocks}
    </section>
  `;
}

function renderStemKnowledgePoint(point) {
  return `
    <article class="stem-point-card">
      <span class="stem-point-label">考点</span>
      <strong>${point}</strong>
    </article>
  `;
}

function renderStemLessonSupport(subjectId, lesson) {
  const items = [
    ...(lesson.formulas ?? []).map((item) => ["公式/方法", item]),
    ...(lesson.experiment ? [["实验", lesson.experiment]] : []),
    ...(lesson.safety ? [["安全", lesson.safety]] : []),
  ];

  if (!items.length) {
    return "";
  }

  return `
    <div class="stem-support-row">
      ${items
        .map(
          ([label, text]) => `
            <span><b>${label}</b>${text}</span>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderStemPracticeSection(subjectId, chapter) {
  const labels = {
    choice: "选择题",
    fill: "填空题",
    calculation: subjectId === "chemistry" ? "计算/推断题" : "计算题",
    comprehensive: "综合题",
  };
  const groups = buildStemPracticeGroups(subjectId, chapter);
  const content = groups
    .map(
      (group) => `
        <section class="stem-practice-group">
          <div class="stem-practice-group-head">
            <strong>${labels[group.type]}</strong>
            <span>${group.questions.length} 题</span>
          </div>
          <div class="stem-practice-list">
            ${group.questions.map((question) => renderStemPracticeQuestion(question)).join("")}
          </div>
        </section>
      `,
    )
    .join("");

  return `
    <section class="stem-practice-section">
      <div class="stem-section-head">
        <strong>按考点练题</strong>
        <p>题目为原创变式，按中考真题常见考法组织；先独立做，再展开解析。</p>
      </div>
      ${content}
    </section>
  `;
}

function buildStemPracticeGroups(subjectId, chapter) {
  if (subjectId === "math") {
    return buildMathStemPracticeGroups(chapter);
  }
  if (subjectId === "chemistry") {
    return buildChemistryStemPracticeGroups(chapter);
  }

  return buildDefaultStemPracticeGroups(subjectId, chapter);
}

function buildMathStemPracticeGroups(chapter) {
  const bank = {
    "math-chapter-1": {
      choice: [
        mathStemQuestion("math-ch1-choice-1", "choice", "基础", "一元二次方程", "若 (m - 2)x² + 3x - 1 = 0 是一元二次方程，则 m 的取值应满足什么？", ["m ≠ 2", "m = 2", "m 为任意实数"], "m ≠ 2", "二次项系数 m-2 不能为 0。", "只看到 x²，却忘记二次项系数不能为 0。"),
      ],
      fill: [
        mathStemQuestion("math-ch1-fill-1", "fill", "基础", "判别式", "方程 x² - 6x + 9 = 0 的判别式 Δ = ___。", undefined, "0", "Δ=b²-4ac=36-36=0。", "Δ=0 表示有两个相等实数根。"),
      ],
      calculation: [
        mathStemQuestion("math-ch1-calc-1", "calculation", "巩固", "解方程", "解方程 2x² - 5x - 3 = 0。", undefined, "x = 3 或 x = -1/2", "Δ=25+24=49，x=(5±7)/4。", "公式法中 -b 和 ± 容易写错。"),
      ],
      comprehensive: [
        mathStemQuestion("math-ch1-comp-1", "comprehensive", "综合", "增长率应用", "某商品原价 200 元，连续两次按相同百分率降价后为 162 元，求每次降价率。", undefined, "10%", "设降价率为 x，200(1-x)²=162，(1-x)²=0.81，得 x=10%。", "实际问题要舍去不合题意的根。"),
      ],
    },
    "math-chapter-2": {
      choice: [
        mathStemQuestion("math-ch2-choice-1", "choice", "基础", "垂径定理", "圆 O 半径为 10，弦 AB = 16，圆心 O 到弦 AB 的距离是？", ["6", "8", "12"], "6", "垂径定理得半弦长为 8，d=√(10²-8²)=6。", "不要把半径、半弦和弦心距混用。"),
      ],
      fill: [
        mathStemQuestion("math-ch2-fill-1", "fill", "基础", "圆周角", "在圆 O 中，∠AOB = 96°，点 C 在圆上且∠ACB 对应同弧 AB，则∠ACB = ___°。", undefined, "48", "同弧所对圆周角等于圆心角的一半。", "圆周角不是圆心角本身。"),
      ],
      calculation: [
        mathStemQuestion("math-ch2-calc-1", "calculation", "巩固", "切线长", "点 P 在圆 O 外，OP = 13，半径 OT = 5，PT 是圆 O 的切线，求 PT。", undefined, "12", "OT⊥PT，△OPT 为直角三角形，PT=√(13²-5²)=12。", "切线题常要连接圆心和切点。"),
      ],
      comprehensive: [
        mathStemQuestion("math-ch2-comp-1", "comprehensive", "综合", "圆与直角三角形", "AB 是圆 O 的直径，点 C 在圆上，AC = 6，BC = 8。求圆 O 的半径，并说明理由。", undefined, "5", "直径所对圆周角为 90°，AB=√(6²+8²)=10，所以半径为 5。", "先判定直角三角形，再用勾股定理。"),
      ],
    },
    "math-chapter-3": {
      choice: [
        mathStemQuestion("math-ch3-choice-1", "choice", "基础", "平均数", "数据 4，6，8，10，12 的平均数是？", ["8", "10", "6"], "8", "(4+6+8+10+12)÷5=8。", "平均数不是最大值和最小值的平均就一定成立。"),
      ],
      fill: [
        mathStemQuestion("math-ch3-fill-1", "fill", "基础", "中位数", "数据 12，15，10，18 的中位数是 ___。", undefined, "13.5", "排序为 10，12，15，18，中位数为 (12+15)÷2=13.5。", "偶数个数据取中间两个数的平均数。"),
      ],
      calculation: [
        mathStemQuestion("math-ch3-calc-1", "calculation", "巩固", "加权平均数", "某学生平时成绩 80 分占 40%，期末成绩 90 分占 60%，求总评成绩。", undefined, "86 分", "80×40%+90×60%=86。", "不能直接把两个分数作普通平均。"),
      ],
      comprehensive: [
        mathStemQuestion("math-ch3-comp-1", "comprehensive", "综合", "方差与稳定性", "甲、乙两组成绩平均数都是 85，方差分别为 1.6 和 4.9。哪组成绩更稳定？说明理由。", undefined, "甲组更稳定", "平均数相同，方差越小波动越小，1.6<4.9。", "稳定性看方差，不看平均数大小。"),
      ],
    },
    "math-chapter-4": {
      choice: [
        mathStemQuestion("math-ch4-choice-1", "choice", "基础", "等可能概率", "袋中有 3 个红球、2 个白球，任取 1 个球，取到红球的概率是？", ["3/5", "2/5", "1/3"], "3/5", "共有 5 个等可能结果，红球有 3 个。", "分母是全部等可能结果数。"),
      ],
      fill: [
        mathStemQuestion("math-ch4-fill-1", "fill", "基础", "列表法", "同时抛掷两枚均匀硬币，出现一正一反的概率是 ___。", undefined, "1/2", "样本空间为正正、正反、反正、反反，一正一反有 2 种。", "正反和反正是两个不同结果。"),
      ],
      calculation: [
        mathStemQuestion("math-ch4-calc-1", "calculation", "巩固", "树状图", "从数字 1，2，3 中先后各取一次且放回，求两次数字之和为 4 的概率。", undefined, "1/3", "共有 3×3=9 种结果，和为 4 的有 (1,3),(2,2),(3,1) 共 3 种。", "放回试验每次都有 3 种可能。"),
      ],
      comprehensive: [
        mathStemQuestion("math-ch4-comp-1", "comprehensive", "综合", "概率模型", "甲、乙各从数字 1，2，3 中任取一个数，求两数相同的概率，并说明可用列表或树状图。", undefined, "1/3", "共有 9 种等可能结果，相同有 (1,1),(2,2),(3,3) 共 3 种。", "不要把有序结果误当成无序结果。"),
      ],
    },
    "math-chapter-5": {
      choice: [
        mathStemQuestion("math-ch5-choice-1", "choice", "基础", "开口方向", "二次函数 y = -2x² + 3 的图像开口方向是？", ["向下", "向上", "不能判断"], "向下", "二次项系数 a=-2<0，抛物线开口向下。", "开口方向只看 a 的符号。"),
      ],
      fill: [
        mathStemQuestion("math-ch5-fill-1", "fill", "基础", "对称轴", "函数 y = x² - 4x + 1 的对称轴是 ___。", undefined, "x = 2", "对称轴 x=-b/(2a)=4/2=2。", "公式中的 -b 容易漏负号。"),
      ],
      calculation: [
        mathStemQuestion("math-ch5-calc-1", "calculation", "巩固", "顶点式", "将 y = x² - 6x + 5 配方，并写出顶点坐标。", undefined, "y=(x-3)²-4，顶点 (3，-4)", "x²-6x+5=(x-3)²-9+5=(x-3)²-4。", "配方后常漏掉补平方产生的常数变化。"),
      ],
      comprehensive: [
        mathStemQuestion("math-ch5-comp-1", "comprehensive", "综合", "二次函数应用", "用 20 m 篱笆围成一边靠墙的矩形，垂直墙的边长为 x m，求面积 S 关于 x 的函数关系式及最大面积。", undefined, "S=x(20-2x)，最大面积 50 m²", "S=-2x²+20x=-2(x-5)²+50，所以 x=5 时最大面积为 50。", "靠墙矩形只围三边，别写成 2x+2y=20。"),
      ],
    },
  };

  const fallback = {
    choice: [
      mathStemQuestion("math-fallback-choice", "choice", "基础", stripLessonNumber(chapter.title), "若题中给出两个数量关系和一个未知数，下列作答最完整的是？", ["列出等量关系并计算", "只写答案", "只圈关键词"], "列出等量关系并计算", "数学题要把已知、关系、计算和结论连起来。", "跳过列式会让错因无法定位。"),
    ],
    fill: [],
    calculation: [],
    comprehensive: [],
  };
  const groups = bank[chapter.id] ?? fallback;

  return ["choice", "fill", "calculation", "comprehensive"]
    .map((type) => ({ type, questions: groups[type] ?? [] }))
    .filter((group) => group.questions.length);
}

function buildChemistryStemPracticeGroups(chapter) {
  const bank = {
    "chem-chapter-1": {
      choice: [
        chemistryStemQuestion("chem-ch1-choice-1", "choice", "基础", "化学变化", "蜡烛燃烧和蜡烛熔化相比，属于化学变化的是哪一个？", ["蜡烛燃烧", "蜡烛熔化", "两者都只是状态变化"], "蜡烛燃烧", "蜡烛燃烧生成二氧化碳和水，有新物质生成；熔化只是状态改变。", "把发光放热当成唯一证据。"),
      ],
      fill: [
        chemistryStemQuestion("chem-ch1-fill-1", "fill", "基础", "实验现象", "记录实验现象时，应尽量按反应前、反应中、反应后写出看得见的变化，例如蜡烛火焰、烧杯内壁水雾、石灰水变浑浊等。判断生成物前通常还要补充 ______。", undefined, "检验现象或证据", "现象记录不能直接跳成结论，生成二氧化碳需要澄清石灰水变浑浊等证据。", "把“生成二氧化碳”直接当现象。"),
      ],
      calculation: [
        chemistryStemQuestion("chem-ch1-calc-1", "calculation", "巩固", "性质分类", "把下列性质分类：酒精易挥发、酒精能燃烧、铜能导电、铁能生锈。写出属于化学性质的两项。", undefined, "酒精能燃烧、铁能生锈", "化学性质要通过化学变化表现出来；挥发和导电不生成新物质，属于物理性质。", "看到生活用途就不分类。"),
      ],
      comprehensive: [
        chemistryStemQuestion("chem-ch1-comp-1", "comprehensive", "综合", "现象到结论", "镁条燃烧发出耀眼白光，生成白色固体。请写出“现象 -> 结论 -> 判断依据”三行。", undefined, "现象：发白光、生成白色固体；结论：发生化学变化；依据：生成了氧化镁等新物质。", "生成新物质是判断化学变化的核心。", "只写发光放热，不写生成物。"),
      ],
    },
    "chem-chapter-2": {
      choice: [
        chemistryStemQuestion("chem-ch2-choice-1", "choice", "基础", "空气成分", "红磷燃烧测空气中氧气含量时，若装置不漏气且红磷足量，水面约上升到原空气体积的多少？", ["1/5", "4/5", "1/2"], "1/5", "空气中氧气约占体积的 1/5，红磷消耗氧气后水进入集气瓶。", "把空气中最多的氮气误认为氧气。"),
      ],
      fill: [
        chemistryStemQuestion("chem-ch2-fill-1", "fill", "基础", "电解水", "电解水时，负极产生 ______，正极产生氧气，二者体积比约为 2:1。", undefined, "氢气", "电解水负氢正氧，说明水由氢元素和氧元素组成。", "把正负极产物和体积比写反。"),
      ],
      calculation: [
        chemistryStemQuestion("chem-ch2-calc-1", "calculation", "巩固", "空气体积估算", "一瓶 250 mL 空气中，按体积分数估算氧气约有多少 mL？", undefined, "约 50 mL", "氧气约占空气体积 1/5，250×1/5=50。", "把氧气按 4/5 计算。"),
      ],
      comprehensive: [
        chemistryStemQuestion("chem-ch2-comp-1", "comprehensive", "综合", "氧气制取与检验", "用过氧化氢和二氧化锰制取一瓶氧气，写出发生装置依据、收集方法和检验方法。", undefined, "液体和固体常温反应可用固液不加热装置；可用排水法或向上排空气法收集；用带火星木条伸入瓶内，复燃说明是氧气。", "装置由反应物状态和条件决定，检验氧气用带火星木条。", "混淆验满和检验。"),
      ],
    },
    "chem-chapter-3": {
      choice: [
        chemistryStemQuestion("chem-ch3-choice-1", "choice", "基础", "微粒变化", "水蒸发和水电解中，水分子发生改变的是哪一个？", ["水电解", "水蒸发", "两者都没有"], "水电解", "水电解生成氢气和氧气，水分子分解；水蒸发只是分子间隔改变。", "把状态变化当成分子种类变化。"),
      ],
      fill: [
        chemistryStemQuestion("chem-ch3-fill-1", "fill", "基础", "化学式含义", "H₂O 中右下角的 2 表示每个水分子中有 ______ 个氢原子。", undefined, "2", "化学式右下角数字表示一个分子中该原子的个数。", "把右下角数字当成离子电荷。"),
      ],
      calculation: [
        chemistryStemQuestion("chem-ch3-calc-1", "calculation", "巩固", "相对分子质量", "计算 H₂O 的相对分子质量。", undefined, "18", "H 约为 1，O 约为 16，所以 H₂O 的相对分子质量为 1×2+16=18。", "漏乘氢原子个数 2。"),
      ],
      comprehensive: [
        chemistryStemQuestion("chem-ch3-comp-1", "comprehensive", "综合", "元素与微粒", "用 H、H₂、H₂O 三个符号分别说明“元素、分子、物质组成”的不同表达。", undefined, "H 可表示氢元素或一个氢原子；H₂ 表示氢分子；H₂O 表示水及每个水分子由 2 个氢原子和 1 个氧原子构成。", "元素讲种类，分子和化学式可以表达微粒构成。", "说成两个氢元素和一个氧元素。"),
      ],
    },
    "chem-chapter-4": {
      choice: [
        chemistryStemQuestion("chem-ch4-choice-1", "choice", "基础", "质量守恒", "密闭容器中白磷燃烧，冷却后容器内物质总质量怎样变化？", ["不变", "变小", "一定变大"], "不变", "密闭体系中反应前后原子种类、数目和质量不变，总质量守恒。", "看到氧气被消耗就误以为质量减少。"),
      ],
      fill: [
        chemistryStemQuestion("chem-ch4-fill-1", "fill", "基础", "配平", "配平：H₂ + O₂ -> H₂O，应写成 ______。", undefined, "2H₂ + O₂ = 2H₂O", "左右两边 H 原子和 O 原子数相等，不能改变化学式右下角。", "为配平而把 H₂O 改成 H₂O₂。"),
      ],
      calculation: [
        chemistryStemQuestion("chem-ch4-calc-1", "calculation", "巩固", "质量关系", "12 g 碳和 32 g 氧气恰好完全反应生成二氧化碳，生成 CO₂ 的质量是多少？", undefined, "44 g", "根据质量守恒，生成物总质量等于反应物总质量，12+32=44。", "漏算参加反应的氧气质量。"),
      ],
      comprehensive: [
        chemistryStemQuestion("chem-ch4-comp-1", "comprehensive", "综合", "方程式与反应类型", "高锰酸钾受热制氧气时，写出反应类型，并说明配平化学方程式时不能改变什么。", undefined, "属于分解反应；配平时不能改变化学式右下角数字，只能在化学式前加化学计量数。", "一种物质生成多种物质是分解反应，配平依据是原子守恒。", "只记生成氧气，忽略反应类型和配平规则。"),
      ],
    },
    "chem-chapter-5": {
      choice: [
        chemistryStemQuestion("chem-ch5-choice-1", "choice", "基础", "铁生锈", "探究铁生锈条件时，铁钉最容易生锈的是哪组条件？", ["同时接触水和氧气", "只在干燥空气中", "只浸在隔绝空气的蒸馏水中"], "同时接触水和氧气", "铁生锈通常需要氧气和水共同作用。", "认为只要有水就一定快速生锈。"),
      ],
      fill: [
        chemistryStemQuestion("chem-ch5-fill-1", "fill", "基础", "炼铁方程式", "一氧化碳还原氧化铁的主要反应可写为：Fe₂O₃ + 3CO -> 2Fe + 3______。", undefined, "CO₂", "CO 夺取氧化铁中的氧，生成铁和二氧化碳。", "把 CO 当成提供氧气的物质。"),
      ],
      calculation: [
        chemistryStemQuestion("chem-ch5-calc-1", "calculation", "巩固", "金属冶炼质量关系", "已知 160 g Fe₂O₃ 理论上可生成 112 g Fe，则 80 g Fe₂O₃ 理论上可生成多少 g Fe？", undefined, "56 g", "80 g 是 160 g 的一半，生成铁的质量也为 112 g 的一半，即 56 g。", "比例关系中只看数字大小不看物质对应。"),
      ],
      comprehensive: [
        chemistryStemQuestion("chem-ch5-comp-1", "comprehensive", "综合", "金属防护", "自行车链条涂油、铁栏杆刷漆、废旧金属回收分别对应哪类金属利用知识？", undefined, "涂油和刷漆是隔绝水和氧气以防锈；废旧金属回收可节约资源并减少污染。", "金属利用既考性质和防护，也考资源与环境。", "只背防锈方法，不解释隔绝条件。"),
      ],
    },
  };

  const fallback = {
    choice: [
      chemistryStemQuestion("chem-fallback-choice", "choice", "基础", stripLessonNumber(chapter.title), "下列记录中，最适合作为化学实验答案的是哪一项？", ["写清物质名称、实验现象和结论", "只写很明显", "只写答案正确"], "写清物质名称、实验现象和结论", "化学题要从具体物质和实验现象推出结论。", "只写结论，不写证据。"),
    ],
    fill: [],
    calculation: [],
    comprehensive: [],
  };
  const groups = bank[chapter.id] ?? fallback;

  return ["choice", "fill", "calculation", "comprehensive"]
    .map((type) => ({ type, questions: groups[type] ?? [] }))
    .filter((group) => group.questions.length);
}

function buildDefaultStemPracticeGroups(subjectId, chapter) {
  const lessons = chapter.lessons ?? [];
  const quickQuestions = lessons
    .filter((lesson) => lesson.quickCheck)
    .slice(0, 3)
    .map((lesson) => ({
      id: `${lesson.quickCheck.id}-stem-choice`,
      type: "choice",
      level: "基础",
      concept: lesson.quickCheck.knowledgeTags?.[0] ?? lesson.title,
      prompt: lesson.quickCheck.question,
      choices: lesson.quickCheck.choices,
      answer: lesson.quickCheck.answer,
      explanation: lesson.quickCheck.explanation,
      trap: lesson.commonMistakes?.[0] ?? stemDefaultTrap(subjectId),
      sourceNote: "原创变式 · 真题考法参考",
    }));
  const fillQuestions = lessons.slice(0, 3).map((lesson, index) => buildStemFillQuestion(subjectId, chapter, lesson, index));
  const calculationQuestions = lessons
    .filter((lesson) => lesson.practiceSet?.length || lesson.practice)
    .slice(0, 3)
    .map((lesson, index) => buildStemCalculationQuestion(subjectId, chapter, lesson, index));
  const tierQuestions = (chapter.chapterTieredPractice ?? [])
    .find((tier) => tier.level === "挑战")
    ?.questions?.slice(0, 2)
    .map((question, index) => ({
      id: `${question.id}-stem-comprehensive`,
      type: "comprehensive",
      level: "综合",
      concept: question.concept,
      prompt: question.question,
      answer: question.answer,
      explanation: question.explanation,
      trap: question.trap,
      sourceNote: "原创变式 · 真题考法参考",
    })) ?? [];
  const comprehensiveQuestions = tierQuestions.length ? tierQuestions : [buildStemComprehensiveQuestion(subjectId, chapter)];

  return [
    { type: "choice", questions: quickQuestions },
    { type: "fill", questions: fillQuestions },
    { type: "calculation", questions: calculationQuestions },
    { type: "comprehensive", questions: comprehensiveQuestions },
  ].filter((group) => group.questions.length);
}

function mathStemQuestion(id, type, level, concept, prompt, choices, answer, explanation, trap) {
  return {
    id,
    type,
    level,
    concept,
    prompt,
    choices,
    answer,
    explanation,
    trap,
    sourceNote: "原创变式 · 中考题型参考",
  };
}

function chemistryStemQuestion(id, type, level, concept, prompt, choices, answer, explanation, trap) {
  return {
    id,
    type,
    level,
    concept,
    prompt,
    choices,
    answer,
    explanation,
    trap,
    sourceNote: "原创变式 · 中考题型参考",
  };
}

function renderStemPracticeQuestion(question) {
  const choices = question.choices?.length
    ? `
      <ol class="stem-choice-list">
        ${question.choices.map((choice) => `<li>${choice}</li>`).join("")}
      </ol>
    `
    : "";

  return `
    <article class="stem-practice-card">
      <div class="stem-practice-card-head">
        <span>${question.concept}</span>
        <em>${question.level}</em>
      </div>
      <p>${question.prompt}</p>
      ${choices}
      <details>
        <summary>看答案和解析</summary>
        <p><b>答案</b>${question.answer}</p>
        <p><b>解析</b>${question.explanation}</p>
        <p><b>易错</b>${question.trap}</p>
      </details>
      <small>${question.sourceNote}</small>
    </article>
  `;
}

function buildStemFillQuestion(subjectId, chapter, lesson, index) {
  const point = lesson.keyPoints?.[index % lesson.keyPoints.length] ?? lesson.title;
  const templates = {
    math: {
      prompt: `填空：预习“${point}”时，必须先确认 ______，再决定公式或方法。`,
      answer: "题目条件是否满足定义、公式或图形关系的适用范围",
      explanation: "数学题的第一步是审条件。条件不满足时，公式看起来相似也不能直接套。",
    },
    physics: {
      prompt: `填空：分析“${point}”时，示意图至少要标出 ______ 和 ______。`,
      answer: "相关物理量；方向、单位或实验条件",
      explanation: "物理题先把情境转成图和量，再判断公式或结论是否适用。",
    },
    chemistry: {
      prompt: `填空：判断“${point}”时，要写清现象、______ 和结论。`,
      answer: "判断依据",
      explanation: "化学题不能只写结论，要把宏观现象和证据写出来。",
    },
  };
  const template = templates[subjectId] ?? templates.math;
  return {
    id: `${chapter.id}-${lesson.id}-fill-${index + 1}`,
    type: "fill",
    level: "基础",
    concept: point,
    prompt: template.prompt,
    answer: template.answer,
    explanation: template.explanation,
    trap: lesson.commonMistakes?.[0] ?? stemDefaultTrap(subjectId),
    sourceNote: "原创变式 · 真题考法参考",
  };
}

function buildStemCalculationQuestion(subjectId, chapter, lesson, index) {
  const base = lesson.practiceSet?.[0];
  if (base) {
    return {
      id: `${base.id}-stem-calculation`,
      type: "calculation",
      level: index === 0 ? "基础" : "巩固",
      concept: base.concept,
      prompt: base.question,
      answer: base.answer,
      explanation: base.explanation,
      trap: base.trap,
      sourceNote: "原创变式 · 真题考法参考",
    };
  }

  const point = lesson.keyPoints?.[0] ?? lesson.title;
  return {
    id: `${chapter.id}-${lesson.id}-calculation-${index + 1}`,
    type: "calculation",
    level: index === 0 ? "基础" : "巩固",
    concept: point,
    prompt: lesson.practice ?? `围绕“${point}”完成一道基础计算或推断题。`,
    answer: stemOpenAnswer(subjectId),
    explanation: stemOpenExplanation(subjectId, point),
    trap: lesson.commonMistakes?.[0] ?? stemDefaultTrap(subjectId),
    sourceNote: "原创变式 · 真题考法参考",
  };
}

function buildStemComprehensiveQuestion(subjectId, chapter) {
  const lessons = chapter.lessons ?? [];
  const firstLesson = lessons[0] ?? {};
  const firstPoint = firstLesson.keyPoints?.[0] ?? chapter.title;
  const lastPoint = lessons.at(-1)?.keyPoints?.[0] ?? firstPoint;
  const prompts = {
    math: `综合题：把“${firstPoint}”和“${lastPoint}”放在同一道题里，先写条件，再列式求解，并说明舍去不合题意答案的理由。`,
    physics: `综合题：围绕“${chapter.title}”设计一个生活情境，画图标出物理量，再用公式或实验条件解释结论。`,
    chemistry: `综合题：围绕“${chapter.title}”写一条“现象 -> 判断依据 -> 符号/安全”的证据链。`,
  };
  return {
    id: `${chapter.id}-stem-comprehensive`,
    type: "comprehensive",
    level: "综合",
    concept: chapter.title,
    prompt: prompts[subjectId] ?? prompts.math,
    answer: stemOpenAnswer(subjectId),
    explanation: stemOpenExplanation(subjectId, chapter.title),
    trap: stemDefaultTrap(subjectId),
    sourceNote: "原创变式 · 真题考法参考",
  };
}

function stemOpenAnswer(subjectId) {
  return {
    math: "按“已知 -> 方法 -> 计算 -> 检验”写完整过程。",
    physics: "按“图示/变量 -> 公式或条件 -> 代入/解释 -> 结论”作答。",
    chemistry: "按“现象 -> 判断依据 -> 结论/符号/安全”作答。",
  }[subjectId] ?? "写出依据、过程和结论。";
}

function stemOpenExplanation(subjectId, point) {
  return {
    math: `这类题考 ${point} 的条件识别和步骤完整性，不是只看最后答案。`,
    physics: `这类题考 ${point} 和情境、单位、变量之间的对应关系。`,
    chemistry: `这类题考 ${point} 的证据链，现象、依据和结论要分开写。`,
  }[subjectId] ?? `这类题要围绕 ${point} 写清依据。`;
}

function stemDefaultTrap(subjectId) {
  return {
    math: "只套公式，不检查条件或不写检验。",
    physics: "只背结论，忽略图示、单位、方向和条件。",
    chemistry: "只写结论，不写现象、依据或安全要求。",
  }[subjectId] ?? "只记结论，不写依据。";
}

function renderChapterSupportDetails(content) {
  if (!content) {
    return "";
  }

  return `
    <details class="chapter-support-details">
      <summary>
        <span>本章详细资料</span>
        <em>目标、易错、证据清单和知识卡，需要时展开</em>
      </summary>
      <div>${content}</div>
    </details>
  `;
}

function renderLessonRowSummary(lesson) {
  return `
    <span class="lesson-summary" data-lesson-row-summary="${lesson.id}">
      <span class="lesson-summary-next">知识点 + 小练习</span>
    </span>
  `;
}

function renderChapterMasteryChecklist(chapter) {
  const summary = getChapterMasterySummary(chapter, state.progress);
  if (!summary.totalCount) {
    return "";
  }
  const groups = summary.groups
    .map((group) => {
      const items = group.items
        .map(
          (item) => `
            <li class="${item.done ? "done" : ""}">
              <button
                data-chapter-mastery-toggle="${item.id}"
                data-next-state="${item.done ? "false" : "true"}"
                data-chapter-id="${chapter.id}"
                type="button"
              >
                ${item.done ? "已会" : "待证实"}
              </button>
              <span>${item.text}</span>
            </li>
          `,
        )
        .join("");
      return `
        <div class="chapter-mastery-column">
          <strong>${group.label}</strong>
          <em>${group.doneCount}/${group.totalCount}</em>
          <ul>${items}</ul>
        </div>
      `;
    })
    .join("");

  return `
    <section class="chapter-mastery-card" data-chapter-mastery-card="${chapter.id}">
      <div class="chapter-mastery-head">
        <div>
          <strong>${summary.title}</strong>
          <p>${summary.summary}</p>
        </div>
        <span>${summary.doneCount}/${summary.totalCount} · ${summary.percent}%</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="chapter-mastery-grid">${groups}</div>
    </section>
  `;
}

function renderChapterTieredPractice(subjectId, chapter) {
  const tiers = chapter.chapterTieredPractice ?? [];
  if (!tiers.length) {
    return "";
  }
  const plan = subjectId === "math" ? getMathTieredPracticePlan(curriculum, state.progress, chapter.id) : null;

  const content = tiers
    .map(
      (tier) => {
        const tierState = state.progress.mathTierProgress?.[chapter.id]?.[tier.level]?.status ?? "new";
        const isCurrent = plan?.currentLevel === tier.level;
        const actions = subjectId === "math"
          ? `
            <div class="math-tier-actions">
              <span>${isCurrent ? "当前建议" : tierState === "done" ? "已完成" : tierState === "weak" ? "还不稳" : "待练"}</span>
              <button data-math-tier-status="done" data-chapter-id="${chapter.id}" data-tier-level="${tier.level}" type="button">完成本层</button>
              <button data-math-tier-status="weak" data-chapter-id="${chapter.id}" data-tier-level="${tier.level}" type="button">还不稳</button>
            </div>
          `
          : "";
        return `
        <section class="tier-card ${isCurrent ? "current-tier" : ""}">
          <div class="tier-head">
            <strong>${tier.level}</strong>
            <span>${tier.goal}</span>
          </div>
          ${actions}
          <div class="tier-question-list">
            ${tier.questions
              .map(
                (question) => `
                  <article>
                    <em>${question.concept}</em>
                    <p>${question.question}</p>
                    <label class="tier-answer-draft">
                      <span>先独立完成</span>
                      <textarea class="tier-answer-draft-input" rows="3" placeholder="写步骤、关键式子、现象解释或答题要点后，再看解析。"></textarea>
                    </label>
                    <details>
                      <summary>看答案解析</summary>
                      <p><b>答案</b>${question.answer}</p>
                      <p><b>解析</b>${question.explanation}</p>
                      <p><b>易错</b>${question.trap}</p>
                    </details>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      `;
      },
    )
    .join("");

  return `
    <section class="chapter-tiered-practice">
      <div class="chapter-tiered-head">
        <strong>本章分层练习</strong>
        <span>${plan ? `${plan.currentLevel} · ${plan.nextAction}` : "基础 → 巩固 → 挑战"}</span>
      </div>
      <div class="tier-grid">${content}</div>
    </section>
  `;
}

function renderChapterKnowledgeChecklist(checklist) {
  if (!checklist.totalCount) {
    return "";
  }

  const groups = checklist.lessonGroups
    .map((group) => {
      const items = group.items
        .map(
          (item) => `
            <article class="chapter-knowledge-item ${item.status}">
              <span>${knowledgeStatusLabel(item.status)}</span>
              <div>
                <strong>${item.concept}</strong>
                <p>${item.retrievalPrompt}</p>
                <em>${item.examCue}</em>
                <div class="chapter-knowledge-actions">
                  <button data-chapter-knowledge-status="known" data-card-id="${item.id}" type="button">掌握</button>
                  <button data-chapter-knowledge-status="learning" data-card-id="${item.id}" type="button">再练</button>
                  <button data-chapter-knowledge-status="weak" data-card-id="${item.id}" type="button">不熟</button>
                </div>
              </div>
            </article>
          `,
        )
        .join("");

      return `
        <section class="chapter-knowledge-group">
          <div class="chapter-knowledge-group-head">
            <strong>${group.lessonTitle}</strong>
            <span>${group.knownCount}/${group.totalCount}</span>
          </div>
          <div class="chapter-knowledge-list">${items}</div>
        </section>
      `;
    })
    .join("");

  return `
    <section class="chapter-knowledge-checklist">
      <div class="chapter-knowledge-head">
        <div>
          <strong>本章知识点清单</strong>
          <p>${checklist.knownCount}/${checklist.totalCount} 已掌握</p>
        </div>
        <div class="progress-track"><span style="width: ${checklist.percent}%"></span></div>
      </div>
      <div class="chapter-knowledge-groups">${groups}</div>
    </section>
  `;
}

function renderChapterLearningLoop(summary) {
  if (!summary?.totalCount) {
    return "";
  }

  const lessonItems = summary.lessons
    .slice(0, 6)
    .map((lesson) => {
      const weakText = lesson.reviewCount ? `${lesson.reviewCount} 项回炉` : "闭环推进";
      return `
        <article class="${lesson.reviewCount ? "needs-review" : lesson.percent === 100 ? "done" : ""}">
          <strong>${lesson.lessonTitle}</strong>
          <span>${lesson.percent}%</span>
          <p>${weakText}</p>
        </article>
      `;
    })
    .join("");
  const nextText = summary.nextLesson ? `下一课：${summary.nextLesson.lessonTitle}` : "本章已完成";
  const reviewText = summary.reviewLessonCount ? `${summary.reviewLessonCount} 课需回炉` : "暂无回炉课";

  return `
    <section class="chapter-learning-loop">
      <div class="chapter-learning-loop-head">
        <div>
          <strong>章节闭环总览</strong>
          <p>${summary.doneCount}/${summary.totalCount} 个课内检查点完成 · ${nextText}</p>
        </div>
        <span>${summary.percent}% · ${reviewText}</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="chapter-learning-loop-list">${lessonItems}</div>
    </section>
  `;
}

function renderChapterProgress(path) {
  const action = path.nextAction;
  const actionText = action ? `${action.label}：${action.lessonTitle}` : "本章路线已完成";
  return `
    <section class="chapter-progress" aria-label="章节学习路线">
      <div>
        <strong>路线进度</strong>
        <span>${path.completedSteps}/${path.totalSteps}</span>
      </div>
      <div class="progress-track"><span style="width: ${path.percent}%"></span></div>
      <p>${actionText}</p>
    </section>
  `;
}

function renderKnowledgeMap(map) {
  if (!map) {
    return "";
  }

  return `
    <section class="knowledge-map">
      <div class="knowledge-goal">
        <strong>本章预习目标</strong>
        <p>${map.goal}</p>
      </div>
      <div class="knowledge-columns">
        ${renderKnowledgeColumn("核心知识", map.coreIdeas)}
        ${renderKnowledgeColumn("易错辨析", map.traps)}
        ${renderKnowledgeColumn("练习路径", map.practicePath)}
      </div>
      <div class="retrieval-strip">
        <strong>合页回忆</strong>
        <span>${map.retrievalPrompt}</span>
      </div>
    </section>
  `;
}

function renderKnowledgeColumn(title, items = []) {
  const content = items.map((item) => `<li>${item}</li>`).join("");
  return `
    <div class="knowledge-column">
      <strong>${title}</strong>
      <ul>${content}</ul>
    </div>
  `;
}

function renderLessonExtras(lesson) {
  const blocks = [
    renderLiteracyPractice(lesson.literacyPractice),
    renderPracticeSet(lesson.practiceSet),
    renderQuickCheck(lesson.quickCheck),
    renderInfoBlock("公式/方法", lesson.formulas),
    renderInfoBlock("阅读问题", lesson.readingQuestions),
    renderInfoBlock("实验观察", lesson.experiment ? [lesson.experiment] : []),
    renderInfoBlock("安全提醒", lesson.safety ? [lesson.safety] : []),
    renderInfoBlock("易错点", lesson.commonMistakes),
    renderInfoBlock("练习建议", lesson.practice ? [lesson.practice] : []),
    renderInfoBlock("写作迁移", lesson.writingTask ? [lesson.writingTask] : []),
  ]
    .filter(Boolean)
    .join("");

  return blocks ? `<div class="lesson-extra-grid">${blocks}</div>` : "";
}

function renderLessonLearningLoop(lesson) {
  const summary = getLessonLearningLoopSummary(lesson, state.progress);
  if (!summary.totalCount) {
    return "";
  }

  const stages = summary.stages
    .map(
      (stage) => `
        <article class="${stage.status}">
          <strong>${stage.title}</strong>
          <span>${stage.doneCount}/${stage.totalCount}</span>
          <p>${stage.hint}</p>
        </article>
      `,
    )
    .join("");
  const reviewText = summary.reviewCount ? `${summary.reviewCount} 项需回炉` : "闭环清晰";

  return `
    <section class="lesson-learning-loop" data-lesson-learning-loop="${lesson.id}">
      <div class="lesson-learning-loop-head">
        <div>
          <strong>学习闭环总览</strong>
          <p>按诊断、预习、输出、回忆、订正和自查推进</p>
        </div>
        <span>${summary.percent}% · ${reviewText}</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="lesson-learning-loop-grid">${stages}</div>
    </section>
  `;
}

function renderLessonPathOverview(lesson) {
  const navigator = lesson.previewNavigator;
  const workflow = lesson.previewWorkflow ?? [];
  const diagnosticCount = lesson.entryDiagnostic?.questions?.length ?? 0;
  const workflowMinutes = workflow.reduce((sum, step) => sum + step.minutes, 0);
  const timeBox = navigator?.timeBox ? `${navigator.timeBox.min}-${navigator.timeBox.max} 分` : `${workflowMinutes} 分`;
  const exitTicket = navigator?.exitTicket?.[0] ?? lesson.selfCheck?.[0] ?? "完成本课自查";
  const reviewAction = lesson.reflectionCoach?.nextAction ?? lesson.commonMistakes?.[0] ?? "把错题订正后再做一次";
  const firstStep = navigator?.firstStep ?? workflow[0]?.action ?? lesson.tasks?.[0] ?? "先完成入口诊断";
  const stages = [
    ["入口诊断", diagnosticCount ? `${diagnosticCount} 题判断从哪开始` : "先判断会不会"],
    ["按流程预习", firstStep],
    ["输出检测", exitTicket],
    ["错因复盘", reviewAction],
  ];
  const content = stages
    .map(
      ([label, text], index) => `
        <article>
          <span>${String(index + 1).padStart(2, "0")}</span>
          <div>
            <strong>${label}</strong>
            <p>${text}</p>
          </div>
        </article>
      `,
    )
    .join("");

  return `
    <section class="lesson-path-overview">
      <div class="lesson-path-head">
        <div>
          <strong>本课学习路径</strong>
          <p>${navigator?.focus ?? "先判断，再预习，最后输出检查"}</p>
        </div>
        <span>${timeBox}</span>
      </div>
      <div class="lesson-path-steps">${content}</div>
      ${renderLessonNextStepAdvice(lesson)}
    </section>
  `;
}

function renderLessonNextStepAdvice(lesson) {
  const advice = getLessonNextStepAdvice(lesson, state.progress);

  return `
    <section class="lesson-next-advice ${advice.type}" data-lesson-next-advice="${lesson.id}">
      <span>下一步</span>
      <div>
        <strong>${advice.title}</strong>
        <p>${advice.action}</p>
        <em>${advice.reason}</em>
      </div>
    </section>
  `;
}

function renderLiteracyPractice(practice) {
  if (!practice) {
    return "";
  }

  const sections = [
    ["默写", practice.dictation, "先默写", "遮住提示，先写出本课必须会写的字词。"],
    ["阅读", practice.reading, "先找依据", "先写关键词、句子依据或答题角度，再看检查点。"],
    ["写作", practice.writing, "先仿写", "先写一个片段或提纲，再对照迁移要求。"],
  ]
    .map(
      ([label, section, action, placeholder]) => `
        <article>
          <span>${label}</span>
          <strong>${section.title}</strong>
          ${section.words?.length ? `<p class="literacy-words">${section.words.join("、")}</p>` : ""}
          <p>${section.prompt}</p>
          <label class="literacy-output">
            <span>${action}</span>
            <textarea class="literacy-output-input" rows="3" placeholder="${placeholder}"></textarea>
          </label>
          <small>完成后再对照检查</small>
          <em>${section.check}</em>
          <b>${section.output}</b>
        </article>
      `,
    )
    .join("");
  const evidence = practice.evidence.map((item) => `<li>${item}</li>`).join("");

  return `
    <section class="literacy-practice-card">
      <div class="literacy-practice-head">
        <strong>${practice.title}</strong>
        <span>默写 · 依据 · 仿写</span>
      </div>
      <div class="literacy-practice-grid">${sections}</div>
      <div class="literacy-evidence">
        <strong>留下证据</strong>
        <ul>${evidence}</ul>
      </div>
    </section>
  `;
}

function renderLessonExamTargets(lesson) {
  const summary = getExamTargetSummary(lesson, state.progress);
  if (!summary.totalCount) {
    return "";
  }

  const statusText = {
    mastered: "会答",
    learning: "再练",
    weak: "不稳",
    new: "未测",
  };
  const content = summary.targets
    .map(
      (target) => `
        <article class="${target.status}">
          <span>${target.questionType}</span>
          <strong>${target.point}</strong>
          <p>${target.answerMove}</p>
          <em>${target.evidence}</em>
          <b>${target.trap}</b>
          <div class="exam-target-actions">
            <small>${statusText[target.status]}</small>
            <button data-exam-target-status="mastered" data-target-id="${target.id}" type="button">会答</button>
            <button data-exam-target-status="learning" data-target-id="${target.id}" type="button">再练</button>
            <button data-exam-target-status="weak" data-target-id="${target.id}" type="button">不稳</button>
          </div>
        </article>
      `,
    )
    .join("");

  return `
    <section class="lesson-exam-target-card" data-exam-target-card="${lesson.id}">
      <div class="lesson-exam-target-head">
        <strong>考点题型清单</strong>
        <span>${summary.masteredCount}/${summary.totalCount} · ${summary.percent}%</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="lesson-exam-target-list">${content}</div>
    </section>
  `;
}

function renderRetrievalDeck(lesson) {
  const summary = getRetrievalDeckSummary(lesson, state.progress);
  if (!summary.totalCount) {
    return "";
  }

  const statusText = {
    known: "会了",
    learning: "再练",
    weak: "不稳",
    new: "未测",
  };
  const cards = summary.cards
    .map(
      (card) => `
        <details class="retrieval-card ${card.status}">
          <summary>
            <span>${card.level}</span>
            <strong>${card.prompt}</strong>
          </summary>
          <div>
            <p>${card.answer}</p>
            <em>${card.checkRule}</em>
            <b>${card.nextAction}</b>
            <div class="retrieval-actions">
              <span>${statusText[card.status]}</span>
              <button data-retrieval-status="known" data-card-id="${card.id}" type="button">会了</button>
              <button data-retrieval-status="learning" data-card-id="${card.id}" type="button">再练</button>
              <button data-retrieval-status="weak" data-card-id="${card.id}" type="button">不稳</button>
            </div>
          </div>
        </details>
      `,
    )
    .join("");

  return `
    <section class="retrieval-deck-card" data-retrieval-deck="${lesson.id}">
      <div class="retrieval-deck-head">
        <strong>合上资料回忆</strong>
        <span>${summary.knownCount}/${summary.totalCount} · ${summary.percent}%</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="retrieval-deck-list">${cards}</div>
    </section>
  `;
}

function renderStudyPacket(lesson) {
  const packet = lesson.studyPacket;
  if (!packet) {
    return "";
  }
  const output = getStudyOutputSummary(lesson, state.progress);
  const statusText = {
    done: "完成",
    learning: "再补",
    weak: "不稳",
    new: "未完成",
  };

  const sections = [
    ["讲解", packet.explain],
    ["示范", packet.model],
    ["练一练", packet.tryIt],
    ["复盘", packet.review],
  ]
    .map(
      ([label, section]) => `
        <article>
          <span>${label}</span>
          <strong>${section.title}</strong>
          <p>${section.body}</p>
          <em>${section.prompt}</em>
        </article>
      `,
    )
    .join("");

  return `
    <section class="study-packet-card">
      <div class="study-packet-head">
        <strong>${packet.title}</strong>
        <span>讲解 · 示范 · 练习 · 复盘</span>
      </div>
      <div class="study-packet-grid">${sections}</div>
      <div class="study-packet-output ${output.status}" data-study-output-card="${lesson.id}">
        <strong>本课输出</strong>
        <p>${packet.output.task}</p>
        <em>${packet.output.evidence}</em>
        <div class="study-output-actions">
          <span>${statusText[output.status]}</span>
          <button data-study-output-status="done" data-output-id="${output.id}" type="button">完成</button>
          <button data-study-output-status="learning" data-output-id="${output.id}" type="button">再补</button>
          <button data-study-output-status="weak" data-output-id="${output.id}" type="button">不稳</button>
        </div>
      </div>
    </section>
  `;
}

function renderLessonGlossary(lesson) {
  const summary = getGlossarySummary(lesson, state.progress);
  if (!summary.totalCount) {
    return "";
  }

  const kindLabel = {
    word: "词",
    term: "概念",
    formula: "公式",
    symbol: "符号",
    method: "方法",
  };
  const statusText = {
    known: "掌握",
    learning: "再练",
    weak: "不熟",
    new: "未测",
  };
  const content = summary.items
    .map(
      (item) => `
        <article class="${item.status}">
          <span>${kindLabel[item.kind] ?? "必会"}</span>
          <strong>${item.term}</strong>
          <p>${item.meaning}</p>
          <em>${item.checkPrompt}</em>
          <div class="glossary-actions">
            <small>${statusText[item.status]}</small>
            <button data-glossary-status="known" data-item-id="${item.id}" type="button">掌握</button>
            <button data-glossary-status="learning" data-item-id="${item.id}" type="button">再练</button>
            <button data-glossary-status="weak" data-item-id="${item.id}" type="button">不熟</button>
          </div>
        </article>
      `,
    )
    .join("");

  return `
    <section class="lesson-glossary-card" data-glossary-card="${lesson.id}">
      <div class="lesson-glossary-head">
        <strong>本课必会清单</strong>
        <span>${summary.knownCount}/${summary.totalCount} · ${summary.percent}%</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="lesson-glossary-list">${content}</div>
    </section>
  `;
}

function renderReflectionCoach(lesson) {
  const coach = lesson.reflectionCoach;
  if (!coach) {
    return "";
  }

  const summary = getReflectionStepSummary(lesson, state.progress);
  const statusText = {
    done: "完成",
    learning: "再订",
    stuck: "卡住",
    new: "未订",
  };
  const tags = coach.errorTags.map((tag) => `<span>${tag}</span>`).join("");
  const steps = summary.steps
    .map(
      (step, index) => `
        <li class="${step.status}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <p>${step.text}</p>
          <div class="reflection-step-actions">
            <small>${statusText[step.status]}</small>
            <button data-reflection-step-status="done" data-step-id="${step.id}" type="button">完成</button>
            <button data-reflection-step-status="learning" data-step-id="${step.id}" type="button">再订</button>
            <button data-reflection-step-status="stuck" data-step-id="${step.id}" type="button">卡住</button>
          </div>
        </li>
      `,
    )
    .join("");

  return `
    <section class="reflection-coach-card" data-reflection-card="${lesson.id}">
      <div class="reflection-coach-head">
        <div>
          <strong>${coach.title}</strong>
          <p>${coach.trigger}</p>
        </div>
        <span>${summary.doneCount}/${summary.totalCount} · ${summary.percent}%</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="reflection-tags">${tags}</div>
      <div class="reflection-coach-body">
        <div>
          <strong>订正三步</strong>
          <ol>${steps}</ol>
        </div>
        <aside>
          <strong>下一步</strong>
          <p>${coach.nextAction}</p>
          <em>${coach.evidence}</em>
        </aside>
      </div>
    </section>
  `;
}

function renderPreviewNavigator(navigator) {
  if (!navigator) {
    return "";
  }

  const skipItems = navigator.skipIf.map((item) => `<li>${item}</li>`).join("");
  const exitItems = navigator.exitTicket.map((item) => `<li>${item}</li>`).join("");

  return `
    <section class="preview-navigator-card">
      <div class="preview-navigator-head">
        <div>
          <strong>本课预习导航</strong>
          <p>${navigator.focus}</p>
        </div>
        <span>${navigator.timeBox.min}-${navigator.timeBox.max} 分钟</span>
      </div>
      <div class="preview-navigator-first">
        <span>先做</span>
        <p>${navigator.firstStep}</p>
      </div>
      <div class="preview-navigator-grid">
        <div>
          <strong>会了可跳过</strong>
          <ul>${skipItems}</ul>
        </div>
        <div>
          <strong>退出检测</strong>
          <ul>${exitItems}</ul>
        </div>
      </div>
    </section>
  `;
}

function renderPreviewWorkflow(lesson) {
  const summary = getPreviewWorkflowSummary(lesson, state.progress);
  if (!summary.totalCount) {
    return "";
  }

  const statusText = {
    done: "完成",
    learning: "再做",
    stuck: "卡住",
    new: "未做",
  };
  const content = summary.steps
    .map(
      (step, index) => `
        <article class="${step.status}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <div>
            <strong>${step.title}</strong>
            <p>${step.action}</p>
            <em>${step.evidence}</em>
          </div>
          <small>${step.minutes} 分</small>
          <div class="preview-step-actions">
            <b>${statusText[step.status]}</b>
            <button data-preview-step-status="done" data-step-id="${step.id}" type="button">完成</button>
            <button data-preview-step-status="learning" data-step-id="${step.id}" type="button">再做</button>
            <button data-preview-step-status="stuck" data-step-id="${step.id}" type="button">卡住</button>
          </div>
        </article>
      `,
    )
    .join("");

  return `
    <section class="preview-workflow-card" data-preview-workflow-card="${lesson.id}">
      <div class="preview-workflow-head">
        <strong>本课预习流程</strong>
        <span>${summary.doneCount}/${summary.totalCount} · ${summary.percent}% · ${summary.totalMinutes} 分钟</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="preview-workflow-list">${content}</div>
    </section>
  `;
}

function renderEntryDiagnostic(lesson) {
  const diagnostic = lesson.entryDiagnostic;
  if (!diagnostic?.questions?.length) {
    return "";
  }

  const summary = getLessonDiagnosticSummary(lesson, state.progress);
  const questions = summary.items
    .map((question, index) => {
      const choices = question.choices
        .map(
          (choice) => `
            <button
              class="${question.done && choice === question.selectedAnswer ? (question.correct ? "correct" : "wrong") : ""}"
              data-entry-diagnostic="${question.id}"
              data-lesson-id="${lesson.id}"
              data-answer="${escapeAttribute(choice)}"
              type="button"
            >
              ${choice}
            </button>
          `,
        )
        .join("");
      const feedback = question.done
        ? `
          <div class="entry-diagnostic-feedback ${question.correct ? "correct" : "wrong"}">
            <strong>${question.correct ? "判断正确" : `建议：${question.ifWrong.action}`}</strong>
            <p>${question.explanation}</p>
          </div>
        `
        : "";

      return `
        <article>
          <div class="entry-question-head">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <strong>${question.question}</strong>
          </div>
          <div class="entry-diagnostic-options">${choices}</div>
          ${feedback}
        </article>
      `;
    })
    .join("");

  return `
    <section class="entry-diagnostic-card" data-entry-diagnostic-card="${lesson.id}">
      <div class="entry-diagnostic-head">
        <div>
          <strong>${diagnostic.title}</strong>
          <p>${summary.recommendation}</p>
        </div>
        <span>${summary.doneCount}/${summary.totalCount}</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="entry-route-pill">${summary.route}</div>
      <div class="entry-question-list">${questions}</div>
    </section>
  `;
}

function renderSelfCheckBlock(lesson) {
  const summary = getLessonSelfCheckSummary(lesson, state.progress);
  if (!summary.totalCount) {
    return "";
  }

  const items = summary.items
    .map(
      (item) => `
        <button
          class="${item.done ? "done" : ""}"
          data-self-check="${escapeAttribute(item.text)}"
          data-lesson-id="${lesson.id}"
          data-next-state="${item.done ? "false" : "true"}"
          type="button"
        >
          <span>${item.done ? "已会" : "自查"}</span>
          <strong>${item.text}</strong>
        </button>
      `,
    )
    .join("");

  return `
    <section class="self-check-card" data-self-check-card="${lesson.id}">
      <div>
        <strong>自测清单</strong>
        <span>${summary.doneCount}/${summary.totalCount}</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="self-check-list">${items}</div>
    </section>
  `;
}

function renderLessonKnowledgeCards(cards = []) {
  if (!cards.length) {
    return "";
  }

  const content = cards
    .map(
      (card) => {
        const status = state.progress.knowledgeCards?.[card.id]?.status ?? "new";
        return `
        <article class="${status}">
          <span>${knowledgeStatusLabel(status)}</span>
          <strong>${card.concept}</strong>
          <p class="lesson-knowledge-recall"><span>先回忆</span>${card.retrievalPrompt}</p>
          <details>
            <summary>显示要点</summary>
            <p>${card.explanation}</p>
            <p><span>考法</span>${card.examCue}</p>
            <p><span>易错</span>${card.trap}</p>
          </details>
          <div class="lesson-knowledge-actions">
            <button data-lesson-knowledge-status="known" data-card-id="${card.id}" type="button">掌握</button>
            <button data-lesson-knowledge-status="learning" data-card-id="${card.id}" type="button">再练</button>
            <button data-lesson-knowledge-status="weak" data-card-id="${card.id}" type="button">不熟</button>
          </div>
        </article>
      `;
      },
    )
    .join("");
  return `
    <section class="knowledge-card-panel" data-lesson-knowledge-card>
      <strong>知识卡片</strong>
      <div>${content}</div>
    </section>
  `;
}

function renderPracticeSet(questions = []) {
  if (!questions.length) {
    return "";
  }

  const cards = questions.map((question) => renderPracticeQuestion(question)).join("");
  return `
    <section class="practice-set-card">
      <strong>小练习</strong>
      <div class="practice-question-list">${cards}</div>
    </section>
  `;
}

function renderPracticeQuestion(question) {
  const status = state.progress.practiceAttempts?.[question.id];
  const mistake = findPracticeMistake(question.id);
  const statusText = status ? (status.correct ? "已掌握" : "需复习") : question.difficulty;
  const choices = question.choices
    .map(
      (choice) => `
        <button data-practice-question="${question.id}" data-answer="${choice}" type="button">
          ${choice}
        </button>
      `,
    )
    .join("");
  const feedback = status
    ? `
      <div class="practice-feedback ${status.correct ? "correct" : "wrong"}">
        <strong>${status.correct ? "答对了" : "已进入复习队列"}</strong>
        <p>正确答案：${question.answer}</p>
        <p>${question.explanation}</p>
        <p class="trap">${question.trap}</p>
        ${renderRepairPanel(mistake)}
      </div>
    `
    : "";

  return `
    <article class="practice-question-card" data-practice-card="${question.id}">
      <div class="practice-question-head">
        <span>${question.concept}</span>
        <em>${statusText}</em>
      </div>
      <p>${question.question}</p>
      <label class="practice-draft">
        <span>先写解题思路</span>
        <textarea class="practice-draft-input" rows="3" placeholder="写依据、公式、关键词或排除理由。"></textarea>
      </label>
      <div class="practice-options">${choices}</div>
      ${feedback}
    </article>
  `;
}

function renderMicroDrills(lesson) {
  const summary = getMicroDrillSummary(lesson, state.progress);
  if (!summary.totalCount) {
    return "";
  }

  const statusText = {
    done: "完成",
    learning: "再练",
    weak: "不稳",
    new: "未练",
  };
  const content = summary.drills
    .map(
      (drill) => `
        <article class="${drill.status}">
          <span>${drill.method}</span>
          <p>${drill.task}</p>
          <em>${drill.success}</em>
          <div class="micro-drill-actions">
            <strong>${statusText[drill.status]}</strong>
            <button data-micro-drill-status="done" data-drill-id="${drill.id}" type="button">完成</button>
            <button data-micro-drill-status="learning" data-drill-id="${drill.id}" type="button">再练</button>
            <button data-micro-drill-status="weak" data-drill-id="${drill.id}" type="button">不稳</button>
          </div>
        </article>
      `,
    )
    .join("");

  return `
    <section class="micro-drill-card" data-micro-drill-card="${lesson.id}">
      <div class="micro-drill-head">
        <strong>互动练习</strong>
        <span>${summary.doneCount}/${summary.totalCount} · ${summary.percent}%</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div>${content}</div>
    </section>
  `;
}

function renderQuickCheck(check) {
  if (!check) {
    return "";
  }

  const status = state.progress.quickCheckAttempts?.[check.id];
  const mistake = findQuickCheckMistake(check.id);
  const statusText = status ? (status.correct ? "已掌握" : "需复习") : "未作答";
  const choices = check.choices
    .map(
      (choice) => `
        <button data-quick-check="${check.id}" data-answer="${choice}" type="button">
          ${choice}
        </button>
      `,
    )
    .join("");
  const feedback = status
    ? `
      <div class="quick-check-feedback ${status.correct ? "correct" : "wrong"}">
        <strong>${status.correct ? "答对了" : "先记入复习，再看解析"}</strong>
        <p>正确答案：${check.answer}</p>
        <p>${check.explanation}</p>
        ${renderRepairPanel(mistake)}
      </div>
    `
    : "";

  return `
    <section class="quick-check-card" data-check-card="${check.id}">
      <div class="quick-check-head">
        <strong>随堂自测</strong>
        <span>${statusText}</span>
      </div>
      <p>${check.question}</p>
      <label class="quick-check-reason">
        <span>先写判断理由</span>
        <textarea class="quick-check-reason-input" rows="2" placeholder="写关键词、依据、公式或文本证据。"></textarea>
      </label>
      <div class="quick-check-options">${choices}</div>
      ${feedback}
    </section>
  `;
}

function handleQuickCheckAnswer(button) {
  const checkId = button.dataset.quickCheck;
  const check = findQuickCheck(checkId);
  if (!check) {
    return;
  }

  state.progress = answerQuickCheck(state.progress, check, button.dataset.answer);
  saveProgress(localStorage, state.progress);
  renderMetrics();
  renderReviewQueue();

  const card = button.closest("[data-check-card]");
  if (card) {
    const correct = button.dataset.answer === check.answer;
    card.outerHTML = renderQuickCheck(check).replace(
      `quick-check-feedback ${correct ? "correct" : "wrong"}`,
      `quick-check-feedback ${correct ? "correct" : "wrong"}`,
    );
    const lesson = findLesson(check.lessonId);
    if (lesson) {
      refreshLessonNextStepAdvice(lesson);
      refreshLessonRowSummary(lesson);
      refreshLessonLearningLoop(lesson);
    }
  } else {
    renderActivityLibrary();
  }
}

function handleScienceObservationStatus(button) {
  const observationId = button.dataset.observationId;
  if (!observationId) {
    return;
  }

  state.progress = updateScienceObservationProgress(state.progress, observationId, button.dataset.scienceObservationStatus);
  saveProgress(localStorage, state.progress);
  renderReviewQueue();
  renderAdaptiveSession();

  const actions = button.closest("[data-science-observation]");
  if (actions) {
    const status = button.dataset.scienceObservationStatus;
    actions.querySelector("span").textContent = status === "known" ? "说清楚" : "还模糊";
    actions.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("selected", item === button);
    });
  }
}

function handleEntryDiagnosticAnswer(button) {
  const lessonId = button.dataset.lessonId;
  const lesson = findLesson(lessonId);
  if (!lesson) {
    return;
  }

  state.progress = answerEntryDiagnostic(state.progress, lesson, button.dataset.entryDiagnostic, button.dataset.answer);
  saveProgress(localStorage, state.progress);
  renderAdaptiveSession();
  renderReviewQueue();

  const card = button.closest("[data-entry-diagnostic-card]");
  if (card) {
    card.outerHTML = renderEntryDiagnostic(lesson);
    refreshLessonNextStepAdvice(lesson);
    refreshLessonRowSummary(lesson);
    refreshLessonLearningLoop(lesson);
  } else {
    renderActivityLibrary();
  }
}

function handlePracticeAnswer(button) {
  const questionId = button.dataset.practiceQuestion;
  const question = findPracticeQuestion(questionId);
  if (!question) {
    return;
  }

  state.progress = answerPracticeQuestion(state.progress, question, button.dataset.answer);
  saveProgress(localStorage, state.progress);
  renderMetrics();
  renderReviewQueue();

  const card = button.closest("[data-practice-card]");
  if (card) {
    card.outerHTML = renderPracticeQuestion(question);
    const lesson = findLesson(question.lessonId);
    if (lesson) {
      refreshLessonNextStepAdvice(lesson);
      refreshLessonRowSummary(lesson);
      refreshLessonLearningLoop(lesson);
    }
  } else {
    renderActivityLibrary();
  }
}

function handleGrammarQuizAnswer(button) {
  const quizId = button.dataset.grammarQuiz;
  const quiz = findGrammarQuiz(quizId);
  if (!quiz) {
    return;
  }

  state.progress = answerGrammarQuiz(state.progress, quiz, button.dataset.answer);
  saveProgress(localStorage, state.progress);
  renderMetrics();
  renderReviewQueue();

  const card = button.closest("[data-grammar-card]");
  if (card) {
    card.outerHTML = renderGrammarMiniQuiz(quiz);
  } else {
    renderActivityLibrary();
  }
}

function handleTranslationDrillAnswer(button) {
  const drill = findTranslationDrill(button.dataset.drillId);
  if (!drill) {
    return;
  }

  const selectedAnswer = button.dataset.translationAnswer === "known" ? drill.answer : "还不能独立译出";
  state.progress = answerTranslationDrill(state.progress, drill, selectedAnswer);
  saveProgress(localStorage, state.progress);
  renderMetrics();
  renderReviewQueue();

  const card = button.closest(".translation-card");
  const feedback = card?.querySelector(`[data-translation-feedback="${drill.id}"]`);
  if (feedback) {
    const correct = button.dataset.translationAnswer === "known";
    feedback.className = `translation-feedback ${correct ? "correct" : "wrong"}`;
    feedback.innerHTML = `
      <strong>${correct ? "已记录：会翻" : "已加入复习队列"}</strong>
      <p><b>答案</b>${drill.answer}</p>
      <p><b>提示</b>${drill.hint}</p>
      <p>${correct ? "下次可以直接做中英互译回忆。" : "先看关键词和句型，再遮住答案重译一遍。"}</p>
    `;
  }

  card?.querySelectorAll("[data-translation-answer]").forEach((item) => {
    item.disabled = true;
  });

  const unit = findEnglishUnitByTranslationDrill(drill.id);
  if (unit) {
    refreshTranslationSummary(unit);
  }
}

function handleRetrievalCardStatus(button) {
  const lesson = findLessonByRetrievalCard(button.dataset.cardId);
  if (!lesson) {
    return;
  }

  state.progress = updateRetrievalCardProgress(state.progress, button.dataset.cardId, button.dataset.retrievalStatus);
  saveProgress(localStorage, state.progress);
  renderReviewQueue();
  renderAdaptiveSession();
  refreshLessonLearningLoop(lesson);

  const deck = button.closest("[data-retrieval-deck]");
  if (deck) {
    deck.outerHTML = renderRetrievalDeck(lesson);
  } else {
    renderActivityLibrary();
  }
}

function handleMicroDrillStatus(button) {
  const lesson = findLessonByMicroDrill(button.dataset.drillId);
  if (!lesson) {
    return;
  }

  state.progress = updateMicroDrillProgress(state.progress, button.dataset.drillId, button.dataset.microDrillStatus);
  saveProgress(localStorage, state.progress);
  renderReviewQueue();
  renderAdaptiveSession();
  refreshLessonLearningLoop(lesson);

  const card = button.closest("[data-micro-drill-card]");
  if (card) {
    card.outerHTML = renderMicroDrills(lesson);
  } else {
    renderActivityLibrary();
  }
}

function handleExamTargetStatus(button) {
  const lesson = findLessonByExamTarget(button.dataset.targetId);
  if (!lesson) {
    return;
  }

  state.progress = updateExamTargetProgress(state.progress, button.dataset.targetId, button.dataset.examTargetStatus);
  saveProgress(localStorage, state.progress);
  renderReviewQueue();
  renderAdaptiveSession();
  refreshLessonLearningLoop(lesson);

  const card = button.closest("[data-exam-target-card]");
  if (card) {
    card.outerHTML = renderLessonExamTargets(lesson);
  } else {
    renderActivityLibrary();
  }
}

function handleStudyOutputStatus(button) {
  const lesson = findLessonByStudyOutput(button.dataset.outputId);
  if (!lesson) {
    return;
  }

  state.progress = updateStudyOutputProgress(state.progress, button.dataset.outputId, button.dataset.studyOutputStatus);
  saveProgress(localStorage, state.progress);
  renderReviewQueue();
  renderAdaptiveSession();
  refreshLessonLearningLoop(lesson);

  const card = button.closest(".study-packet-card");
  if (card) {
    card.outerHTML = renderStudyPacket(lesson);
  } else {
    renderActivityLibrary();
  }
}

function handleGlossaryStatus(button) {
  const lesson = findLessonByGlossaryItem(button.dataset.itemId);
  if (!lesson) {
    return;
  }

  state.progress = updateGlossaryProgress(state.progress, button.dataset.itemId, button.dataset.glossaryStatus);
  saveProgress(localStorage, state.progress);
  renderReviewQueue();
  renderAdaptiveSession();
  refreshLessonLearningLoop(lesson);

  const card = button.closest("[data-glossary-card]");
  if (card) {
    card.outerHTML = renderLessonGlossary(lesson);
  } else {
    renderActivityLibrary();
  }
}

function handlePreviewWorkflowStatus(button) {
  const lesson = findLessonByPreviewWorkflowStep(button.dataset.stepId);
  if (!lesson) {
    return;
  }

  state.progress = updatePreviewWorkflowProgress(state.progress, button.dataset.stepId, button.dataset.previewStepStatus);
  saveProgress(localStorage, state.progress);
  renderReviewQueue();
  renderAdaptiveSession();
  refreshLessonLearningLoop(lesson);

  const card = button.closest("[data-preview-workflow-card]");
  if (card) {
    card.outerHTML = renderPreviewWorkflow(lesson);
  } else {
    renderActivityLibrary();
  }
}

function handleReflectionStepStatus(button) {
  const lesson = findLessonByReflectionStep(button.dataset.stepId);
  if (!lesson) {
    return;
  }

  state.progress = updateReflectionStepProgress(state.progress, button.dataset.stepId, button.dataset.reflectionStepStatus);
  saveProgress(localStorage, state.progress);
  renderReviewQueue();
  renderAdaptiveSession();
  refreshLessonLearningLoop(lesson);

  const card = button.closest("[data-reflection-card]");
  if (card) {
    card.outerHTML = renderReflectionCoach(lesson);
  } else {
    renderActivityLibrary();
  }
}

function handleSelfCheckToggle(button) {
  const lessonId = button.dataset.lessonId;
  const itemText = button.dataset.selfCheck;
  const done = button.dataset.nextState === "true";
  const lesson = findLesson(lessonId);
  if (!lesson) {
    return;
  }

  state.progress = updateSelfCheckProgress(state.progress, lessonId, itemText, done);
  saveProgress(localStorage, state.progress);

  const card = button.closest("[data-self-check-card]");
  if (card) {
    card.outerHTML = renderSelfCheckBlock(lesson);
    refreshLessonNextStepAdvice(lesson);
    refreshLessonRowSummary(lesson);
    refreshLessonLearningLoop(lesson);
  } else {
    renderActivityLibrary();
  }
}

function refreshLessonNextStepAdvice(lesson) {
  const card = document.querySelector(`[data-lesson-next-advice="${lesson.id}"]`);
  if (card) {
    card.outerHTML = renderLessonNextStepAdvice(lesson);
  }
}

function refreshLessonRowSummary(lesson) {
  const summary = document.querySelector(`[data-lesson-row-summary="${lesson.id}"]`);
  if (summary) {
    summary.outerHTML = renderLessonRowSummary(lesson);
  }
}

function refreshLessonLearningLoop(lesson) {
  const loop = document.querySelector(`[data-lesson-learning-loop="${lesson.id}"]`);
  if (loop) {
    loop.outerHTML = renderLessonLearningLoop(lesson);
  }
}

function handleSubjectKnowledgeStatus(button) {
  state.progress = updateKnowledgeCardProgress(state.progress, button.dataset.cardId, button.dataset.subjectKnowledgeStatus);
  saveProgress(localStorage, state.progress);
  renderSubjectKnowledgeBank();
  renderKnowledgeReview();
  renderReviewQueue();
  renderAdaptiveSession();
  renderMetrics();
}

function handleLessonKnowledgeStatus(button) {
  const lesson = findLessonByKnowledgeCard(button.dataset.cardId);
  if (!lesson) {
    return;
  }

  state.progress = updateKnowledgeCardProgress(state.progress, button.dataset.cardId, button.dataset.lessonKnowledgeStatus);
  saveProgress(localStorage, state.progress);
  renderSubjectKnowledgeBank();
  renderKnowledgeReview();
  renderReviewQueue();
  renderAdaptiveSession();
  refreshLessonLearningLoop(lesson);

  const card = button.closest("[data-lesson-knowledge-card]");
  if (card) {
    card.outerHTML = renderLessonKnowledgeCards(lesson.knowledgeCards);
  } else {
    renderActivityLibrary();
  }
}

function refreshTranslationSummary(unit) {
  const summary = document.querySelector(`[data-translation-summary="${unit.id}"]`);
  if (summary) {
    summary.outerHTML = renderTranslationSummary(unit);
  }
}

function handleChapterKnowledgeStatus(button) {
  state.progress = updateKnowledgeCardProgress(state.progress, button.dataset.cardId, button.dataset.chapterKnowledgeStatus);
  saveProgress(localStorage, state.progress);
  renderActivityLibrary();
  renderSubjectKnowledgeBank();
  renderKnowledgeReview();
  renderAdaptiveSession();
  renderMetrics();
}

function handleChapterMasteryToggle(button) {
  const chapter = findChapter(button.dataset.chapterId);
  if (!chapter) {
    return;
  }

  state.progress = updateChapterMasteryProgress(
    state.progress,
    button.dataset.chapterMasteryToggle,
    button.dataset.nextState === "true",
  );
  saveProgress(localStorage, state.progress);

  const card = button.closest("[data-chapter-mastery-card]");
  if (card) {
    card.outerHTML = renderChapterMasteryChecklist(chapter);
  } else {
    renderActivityLibrary();
  }
}

function handleMathTierStatus(button) {
  state.progress = updateMathTierProgress(
    state.progress,
    button.dataset.chapterId,
    button.dataset.tierLevel,
    button.dataset.mathTierStatus,
  );
  saveProgress(localStorage, state.progress);
  renderActivityLibrary();
  renderMathAdvice();
  renderReviewQueue();
  renderAdaptiveSession();
}

function handleGrammarMasteryToggle(button) {
  const grammarId = button.dataset.grammarMastery;
  const unitId = button.dataset.unitId;
  const done = button.dataset.nextState === "true";
  const unit = curriculum.english.chapters.find((chapter) => chapter.id === unitId);
  if (!unit) {
    return;
  }

  state.progress = updateGrammarMasteryProgress(state.progress, grammarId, done);
  saveProgress(localStorage, state.progress);

  const extra = button.closest(".english-extra");
  if (extra) {
    extra.outerHTML = renderEnglishExtras(unit);
  } else {
    renderActivityLibrary();
  }
}

function handleEnglishWordMode(button) {
  state.englishWordMode = button.dataset.englishWordMode;
  state.englishWordBankOpen = true;
  renderActivityLibrary();
}

function handleEnglishVoiceMode(button) {
  state.englishVoiceMode = button.dataset.englishVoiceMode;
  state.englishWordBankOpen = true;
  renderActivityLibrary();
}

function speakEnglish(text) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(normalizeEnglishSpeechText(text));
  const voice = chooseEnglishVoice(state.englishVoiceMode);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = state.englishVoiceMode === "uk" ? "en-GB" : "en-US";
  }
  utterance.rate = 0.88;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function chooseEnglishVoice(mode) {
  if (mode === "system") {
    return undefined;
  }

  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
  const targetLang = mode === "uk" ? "en-gb" : "en-us";
  const preferredNames = mode === "uk"
    ? ["Google UK English", "Microsoft Sonia", "Microsoft Ryan", "Daniel", "Serena", "Kate"]
    : ["Google US English", "Microsoft Jenny", "Microsoft Aria", "Samantha", "Alex", "Karen"];

  return preferredNames
    .map((name) => englishVoices.find((voice) => voice.name.includes(name)))
    .find(Boolean)
    ?? englishVoices.find((voice) => voice.lang?.toLowerCase() === targetLang)
    ?? englishVoices.find((voice) => voice.lang?.toLowerCase().startsWith(targetLang))
    ?? englishVoices[0];
}

function normalizeEnglishSpeechText(text) {
  return String(text)
    .replaceAll("...", " ")
    .replaceAll("sb.", "somebody")
    .replaceAll("sth.", "something")
    .replace(/\s+/g, " ")
    .trim();
}

function findChapter(chapterId) {
  for (const subjectId of subjectOrder) {
    const chapter = curriculum[subjectId].chapters?.find((item) => item.id === chapterId);
    if (chapter) {
      return chapter;
    }
  }
  return undefined;
}

function findLesson(lessonId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      const lesson = chapter.lessons?.find((item) => item.id === lessonId);
      if (lesson) {
        return lesson;
      }
    }
  }
  return undefined;
}

function findLessonByRetrievalCard(cardId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      const lesson = chapter.lessons?.find((item) => item.retrievalDeck?.some((card) => card.id === cardId));
      if (lesson) {
        return lesson;
      }
    }
  }
  return undefined;
}

function findLessonByKnowledgeCard(cardId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      const lesson = chapter.lessons?.find((item) => item.knowledgeCards?.some((card) => card.id === cardId));
      if (lesson) {
        return lesson;
      }
    }
  }
  return undefined;
}

function findLessonByMicroDrill(drillId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      const lesson = chapter.lessons?.find((item) => item.microDrills?.some((drill) => drill.id === drillId));
      if (lesson) {
        return lesson;
      }
    }
  }
  return undefined;
}

function findLessonByExamTarget(targetId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      const lesson = chapter.lessons?.find((item) => item.lessonExamTargets?.some((target) => target.id === targetId));
      if (lesson) {
        return lesson;
      }
    }
  }
  return undefined;
}

function findLessonByStudyOutput(outputId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      const lesson = chapter.lessons?.find((item) => item.studyPacket?.output?.id === outputId);
      if (lesson) {
        return lesson;
      }
    }
  }
  return undefined;
}

function findLessonByGlossaryItem(itemId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      const lesson = chapter.lessons?.find((item) => item.lessonGlossary?.some((glossaryItem) => glossaryItem.id === itemId));
      if (lesson) {
        return lesson;
      }
    }
  }
  return undefined;
}

function findLessonByPreviewWorkflowStep(stepId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      const lesson = chapter.lessons?.find((item) => item.previewWorkflow?.some((step) => step.id === stepId));
      if (lesson) {
        return lesson;
      }
    }
  }
  return undefined;
}

function findLessonByReflectionStep(stepId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      const lesson = chapter.lessons?.find((item) => item.reflectionCoach?.correctionSteps?.some((step) => step.id === stepId));
      if (lesson) {
        return lesson;
      }
    }
  }
  return undefined;
}

function findQuickCheck(checkId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      for (const lesson of chapter.lessons ?? []) {
        if (lesson.quickCheck?.id === checkId) {
          return lesson.quickCheck;
        }
      }
    }
  }
  return undefined;
}

function findGrammarQuiz(quizId) {
  for (const chapter of curriculum.english.chapters ?? []) {
    for (const note of chapter.grammarNotes ?? []) {
      if (note.miniQuiz?.id === quizId) {
        return note.miniQuiz;
      }
    }
  }
  return undefined;
}

function findTranslationDrill(drillId) {
  for (const chapter of curriculum.english.chapters ?? []) {
    const drill = chapter.translationDrills?.find((item) => item.id === drillId);
    if (drill) {
      return drill;
    }
  }
  return undefined;
}

function findEnglishUnitByTranslationDrill(drillId) {
  return curriculum.english.chapters.find((chapter) =>
    chapter.translationDrills?.some((item) => item.id === drillId),
  );
}

function findPracticeQuestion(questionId) {
  for (const subjectId of subjectOrder) {
    const subject = curriculum[subjectId];
    for (const chapter of subject.chapters ?? []) {
      for (const lesson of chapter.lessons ?? []) {
        const question = lesson.practiceSet?.find((item) => item.id === questionId);
        if (question) {
          return question;
        }
      }
    }
  }
  return undefined;
}

function findPracticeMistake(questionId) {
  return [...(state.progress.practiceMistakes ?? [])]
    .reverse()
    .find((mistake) => mistake.questionId === questionId);
}

function findQuickCheckMistake(checkId) {
  return [...(state.progress.quickCheckMistakes ?? [])]
    .reverse()
    .find((mistake) => mistake.checkId === checkId);
}

function renderRepairPanel(mistake) {
  if (!mistake?.diagnosis && !mistake?.repairAction) {
    return "";
  }

  const steps = (mistake.repairAction?.steps ?? []).map((step) => `<li>${step}</li>`).join("");
  return `
    <section class="repair-panel">
      <strong>错因定位：${mistake.diagnosis?.label ?? "待复盘"}</strong>
      ${mistake.diagnosis?.reason ? `<p>${mistake.diagnosis.reason}</p>` : ""}
      ${steps ? `<ol>${steps}</ol>` : ""}
      ${mistake.repairAction?.success ? `<em>${mistake.repairAction.success}</em>` : ""}
    </section>
  `;
}

function renderInfoBlock(title, items = []) {
  if (!items?.length) {
    return "";
  }

  const content = items.map((item) => `<li>${item}</li>`).join("");
  return `
    <section class="lesson-info-block">
      <strong>${title}</strong>
      <ul>${content}</ul>
    </section>
  `;
}

function renderDailyWords(dailyWords = []) {
  const groups = dailyWords
    .map((day) => {
      const words = day.words.map((item) => renderWordFlip(item)).join("");
      return `
        <section class="word-day">
          <div class="day-label">
            <span class="word-day-index">Day ${day.day}</span>
            <span class="word-day-meta">
              <strong>${day.words.length}</strong>
              <span class="word-day-count">词/短语</span>
            </span>
          </div>
          <div class="word-list">${words}</div>
        </section>
      `;
    })
    .join("");
  const totalWords = dailyWords.reduce((count, day) => count + day.words.length, 0);
  return `
    <section class="daily-words" aria-label="单元单词计划">
      <div class="daily-words-head">
        <div class="daily-words-title">
          <strong>课本 Wordlist 每日背诵目录</strong>
          <em>点单词显示中文，按天完成整单元</em>
        </div>
        <span>${dailyWords.length} 天 · ${totalWords} 个词/短语</span>
      </div>
      ${groups}
    </section>
  `;
}

function renderWordFlip(item) {
  return `
    <button class="word-chip" type="button" title="点一下翻译">
      <span class="word-front">${item.word}</span>
      <span class="word-back">${item.cn ?? item.meaning}</span>
    </button>
  `;
}

function renderEnglishWordList(dailyWords = []) {
  const words = dailyWords.flatMap((day) => day.words);
  if (!words.length) {
    return "";
  }
  const mode = state.englishWordMode;
  const modeLabel = {
    "en-cn": "英文 → 中文",
    "cn-en": "中文 → 英文",
    both: "全显示",
  }[mode];

  const rows = words
    .map(
      (item) => {
        const meaning = item.cn ?? item.meaning;
        const primary = mode === "cn-en" ? meaning : item.word;
        const secondary = mode === "cn-en" ? item.word : meaning;
        return `
        <article class="english-word-row mode-${mode}" aria-label="${item.word}，${meaning}">
          <span>
            <strong>${primary}</strong>
            <em>${secondary}</em>
          </span>
          <button class="speak-button" data-speak-english="${escapeAttribute(item.word)}" type="button" aria-label="朗读 ${escapeAttribute(item.word)}"><span aria-hidden="true">🔊</span></button>
        </article>
      `;
      },
    )
    .join("");
  const modeSwitch = `
    <div class="word-mode-switch" role="group" aria-label="单词显示方式">
      ${[
        ["en-cn", "英 → 中"],
        ["cn-en", "中 → 英"],
        ["both", "全显示"],
      ]
        .map(([value, label]) => `
          <button class="${mode === value ? "active" : ""}" data-english-word-mode="${value}" type="button">
            ${label}
          </button>
        `)
        .join("")}
    </div>
  `;
  const voiceSwitch = `
    <div class="voice-mode-switch" role="group" aria-label="英语朗读语音">
      ${[
        ["us", "美音"],
        ["uk", "英音"],
        ["system", "系统"],
      ]
        .map(([value, label]) => `
          <button class="${state.englishVoiceMode === value ? "active" : ""}" data-english-voice-mode="${value}" type="button">
            ${label}
          </button>
        `)
        .join("")}
    </div>
  `;

  return renderEnglishSection(
    "单词",
    `${words.length} 个 · ${modeLabel}`,
    `<div class="word-tools">${modeSwitch}${voiceSwitch}</div><div class="english-word-grid">${rows}</div>`,
    "english-word-bank",
    state.englishWordBankOpen,
    "data-english-word-bank",
  );
}

function renderEnglishSection(title, meta, content, className = "", open = true, dataAttribute = "") {
  return `
    <details class="english-study-section ${className}" ${open ? "open" : ""} ${dataAttribute}>
      <summary>
        <span>
          <strong>${title}</strong>
          ${meta ? `<em>${meta}</em>` : ""}
        </span>
        <b class="section-toggle"><span class="toggle-open">展开</span><span class="toggle-close">收起</span></b>
      </summary>
      <div class="english-section-body">${content}</div>
    </details>
  `;
}

function renderEnglishExtras(chapter) {
  const wordMeaningMap = getEnglishMeaningMap(chapter);
  const phrases = chapter.phrases
    .map((phrase) => `
      <span>
        <strong>${phrase}</strong>
        <em>${wordMeaningMap.get(phrase) ?? ENGLISH_PHRASE_TRANSLATIONS[phrase] ?? "释义待补充"}</em>
        <button class="speak-button" data-speak-english="${escapeAttribute(phrase)}" type="button" aria-label="朗读 ${escapeAttribute(phrase)}"><span aria-hidden="true">🔊</span></button>
      </span>
    `)
    .join("");
  const patterns = chapter.sentencePatterns.map((pattern) => `<li>${pattern}</li>`).join("");
  const mastery = getGrammarMasterySummary(chapter, state.progress);
  const grammarNotes = chapter.grammarNotes
    .map((note, index) => {
      const item = mastery.items[index];
      return `
        <section class="grammar-note" data-grammar-note-card="${item.id}">
          <div class="grammar-note-head">
            <strong>${note.title}</strong>
            <button
              class="${item.done ? "done" : ""}"
              data-grammar-mastery="${item.id}"
              data-unit-id="${chapter.id}"
              data-next-state="${item.done ? "false" : "true"}"
              type="button"
            >
              ${item.done ? "已掌握" : "标记掌握"}
            </button>
          </div>
          <p>${note.explanation}</p>
          <p><span>例句</span>${note.example}</p>
          <p><span>练习</span>${note.drill}</p>
          <p><span>检查</span>${note.checkpoint}</p>
          ${renderGrammarMiniQuiz(note.miniQuiz)}
        </section>
      `;
    })
    .join("");
  const phraseSection = renderEnglishSection("重点短语", `${chapter.phrases.length} 个`, `<div class="phrase-row">${phrases}</div>`, "english-phrase-bank");
  const patternSection = renderEnglishSection("句型", `${chapter.sentencePatterns.length} 个`, `<ul class="sentence-pattern-list">${patterns}</ul>`, "english-pattern-bank");
  const grammarSection = renderEnglishSection(
    "语法 / 知识点讲解",
    `${mastery.doneCount}/${mastery.totalCount}`,
    `
      <div class="grammar-summary-line">
        <span>把本单元最容易考的结构讲清楚，再做一个小自测。</span>
        <div class="progress-track"><span style="width: ${mastery.percent}%"></span></div>
      </div>
      <div class="grammar-grid">${grammarNotes}</div>
    `,
    "english-grammar-bank",
  );

  return `
    <div class="english-extra">
      ${renderEnglishWordList(chapter.dailyWords)}
      ${phraseSection}
      ${patternSection}
      ${grammarSection}
    </div>
  `;
}

function getEnglishMeaningMap(chapter) {
  const entries = chapter.dailyWords?.flatMap((day) => day.words) ?? [];
  return new Map(entries.map((entry) => [entry.word, entry.cn ?? entry.meaning]));
}

function renderTranslationSummary(unit) {
  const summary = getTranslationMasterySummary(unit, state.progress);
  const directionLabel = {
    "cn-en": "中译英",
    "en-cn": "英译中",
    phrase: "短语输出",
  };
  const directions = summary.directions
    .map(
      (item) => `
        <span>
          ${directionLabel[item.direction]} ${item.correctCount}/${item.totalCount}
          ${item.wrongCount ? ` · 错 ${item.wrongCount}` : ""}
        </span>
      `,
    )
    .join("");

  return `
    <section class="translation-summary" data-translation-summary="${unit.id}">
      <div>
        <strong>翻译输出进度</strong>
        <span>${summary.correctCount}/${summary.totalCount} · 错 ${summary.wrongCount}</span>
      </div>
      <div class="progress-track"><span style="width: ${summary.percent}%"></span></div>
      <div class="translation-summary-directions">${directions}</div>
    </section>
  `;
}

function renderTranslationDrills(drills = []) {
  if (!drills.length) {
    return "";
  }

  const directionLabel = {
    "cn-en": "中译英",
    "en-cn": "英译中",
    phrase: "短语输出",
  };
  const cards = drills
    .map(
      (drill) => `
        <article class="translation-card">
          <div>
            <span>${directionLabel[drill.direction] ?? "翻译"}</span>
            <strong>${drill.focus}</strong>
          </div>
          <p>${drill.prompt}</p>
          <label class="translation-recall">
            <span>先写下自己的翻译</span>
            <textarea class="translation-recall-input" rows="3" placeholder="先凭记忆写，再显示答案对照。"></textarea>
          </label>
          <details>
            <summary>显示答案</summary>
            <p><b>答案</b>${drill.answer}</p>
            <p><b>提示</b>${drill.hint}</p>
            <p><b>解析</b>${drill.explanation}</p>
          </details>
          <div class="translation-actions">
            <button data-translation-answer="known" data-drill-id="${drill.id}" type="button">基本正确</button>
            <button data-translation-answer="weak" data-drill-id="${drill.id}" type="button">需要再练</button>
          </div>
          <div class="translation-feedback" data-translation-feedback="${drill.id}"></div>
        </article>
      `,
    )
    .join("");

  return `
    <section class="translation-drills">
      <div class="translation-head">
        <strong>中英互译训练</strong>
        <span>${drills.length} 题</span>
      </div>
      <div class="translation-grid">${cards}</div>
    </section>
  `;
}

function renderGrammarMiniQuiz(quiz) {
  if (!quiz) {
    return "";
  }

  return `
    <div class="grammar-mini-quiz" data-grammar-card="${quiz.id}">
      <p><span>小测</span>${quiz.question}</p>
      <details class="grammar-answer">
        <summary>显示参考答案</summary>
        <p><strong>参考答案</strong>${quiz.answer}</p>
        <p>${quiz.explanation}</p>
      </details>
    </div>
  `;
}

function saveAndRender() {
  saveProgress(localStorage, state.progress);
  renderAll();
}

function statusLabel(status) {
  return {
    known: "认识",
    fuzzy: "模糊",
    unknown: "不会",
    new: "新词",
  }[status];
}

function reviewTypeLabel(type) {
  return {
    word: "错词",
    dictation: "默写词",
    retrieval: "回忆卡",
    "micro-drill": "微练习",
    "exam-target": "考点",
    "study-output": "输出",
    glossary: "必会",
    "preview-step": "预习步骤",
    "reflection-step": "订正步骤",
    grammar: "语法",
    translation: "翻译",
    writing: "写作",
    math: "错题",
    "math-tier": "分层练习",
    practice: "课内练习",
    "quick-check": "随堂自测",
    "science-observation": "实验观察",
  }[type] ?? "复习";
}

function typeLabel(type) {
  return {
    example: "例题",
    flashcard: "闪卡",
    lesson: "小课",
    practice: "练习",
    quiz: "小测",
    reading: "阅读",
    writing: "写作",
  }[type] ?? type;
}

function knowledgeStatusLabel(status) {
  return {
    known: "掌握",
    learning: "再练",
    weak: "不熟",
    new: "新卡",
  }[status] ?? "新卡";
}

function stripLessonNumber(title) {
  return title.replace(/^\d+\s*/, "");
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

init();
