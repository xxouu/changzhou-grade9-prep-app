export const curriculum = {
  meta: {
    region: "江苏常州",
    grade: "九年级",
    defaultVersions: {
      chinese: "统编/人教版",
      math: "苏科版",
      english: "译林版",
      physics: "苏科版",
      chemistry: "沪教版",
    },
    versionAudit: {
      chinese: {
        status: "confirmed",
        source: "用户确认",
        note: "用户确认语文为统编/人教版；孩子端只展示原创导读、字词、阅读和写作迁移，不复制课文原文。",
      },
      math: {
        status: "confirmed",
        source: "用户确认",
        note: "用户确认数学为苏科版；章节结构用于九年级预习路径、考点和分层练习。",
      },
      english: {
        status: "confirmed",
        source: "用户确认 + 课本 Wordlist 截图校正 Unit 1",
        note: "用户确认英语为译林版；Unit 1 已按课本后 Wordlist 扩展为完整单词/短语并带中文。",
      },
      physics: {
        status: "confirmed",
        source: "用户确认",
        note: "用户确认物理为苏科版；内容覆盖知识点、实验观察、易错辨析和基础题。",
      },
      chemistry: {
        status: "confirmed",
        source: "用户更正",
        note: "用户更正化学为沪教版；内容按沪教版预习方向组织知识点、实验现象和安全提醒。",
      },
    },
    contentPolicy: "AI 生成内容进入待校对；孩子默认学习路径只展示已校对内容。",
  },
  english: {
    id: "english",
    name: "英语",
    accent: "#2563eb",
    term: "九年级上",
    unit: "Unit 1 Preview",
    flashcards: [
      {
        id: "eng-u1-forecast",
        word: "forecast",
        phonetic: "/'fɔːkɑːst/",
        meaning: "n./v. 预测，预报",
        partOfSpeech: "noun / verb",
        example: "The weather forecast says it will rain tomorrow.",
        unit: "Unit 1",
      },
      {
        id: "eng-u1-confidence",
        word: "confidence",
        phonetic: "/'kɒnfɪdəns/",
        meaning: "n. 信心",
        partOfSpeech: "noun",
        example: "Good preparation gives us confidence before a test.",
        unit: "Unit 1",
      },
      {
        id: "eng-u1-chemistry",
        word: "chemistry",
        phonetic: "/'kemɪstri/",
        meaning: "n. 化学；相互吸引",
        partOfSpeech: "noun",
        example: "Chemistry helps us understand changes in materials.",
        unit: "Unit 1",
      },
      {
        id: "eng-u1-progress",
        word: "progress",
        phonetic: "/'prəʊgres/",
        meaning: "n. 进步；进展",
        partOfSpeech: "noun",
        example: "Small daily progress becomes a big change.",
        unit: "Unit 1",
      },
      {
        id: "eng-u1-explain",
        word: "explain",
        phonetic: "/ɪk'spleɪn/",
        meaning: "v. 解释，说明",
        partOfSpeech: "verb",
        example: "Can you explain the grammar rule in your own words?",
        unit: "Unit 1",
      },
    ],
    activities: [
      {
        id: "eng-flashcards",
        subject: "english",
        title: "译林英语词卡预习",
        minutes: 8,
        type: "flashcard",
        difficulty: "基础",
        knowledgeTags: ["Unit 1", "核心词汇", "例句理解"],
        prompt: "先看英文和例句，再判断自己是否认识。不会的词会提前复习。",
        answer: "认识、模糊、不会三档都会写入本地复习计划。",
        reviewStatus: "approved",
      },
      {
        id: "eng-grammar",
        subject: "english",
        title: "语法小课：宾语从句预热",
        minutes: 6,
        type: "lesson",
        difficulty: "中等",
        knowledgeTags: ["语法", "宾语从句", "语序"],
        prompt:
          "宾语从句放在动词后，常用陈述句语序。预习时先抓三件事：连接词、主语、谓语。",
        answer: "I think that he is right. 这里 that he is right 是宾语从句。",
        reviewStatus: "approved",
      },
      {
        id: "eng-quiz",
        subject: "english",
        title: "5 题小测",
        minutes: 5,
        type: "quiz",
        difficulty: "基础",
        knowledgeTags: ["词义", "语法", "短句"],
        prompt: "用 5 道快题检查今天的词汇和语法预习。",
        answer: "系统按正确率决定明天是否安排错词复习。",
        reviewStatus: "approved",
      },
    ],
    quiz: [
      {
        id: "eng-q1",
        question: "confidence 的中文意思最接近哪一项？",
        choices: ["信心", "天气", "化学", "解释"],
        answer: "信心",
        explanation: "confidence 是名词，表示信心、自信。",
      },
      {
        id: "eng-q2",
        question: "选择正确语序：I know ____.",
        choices: ["where does he live", "where he lives", "where he does live", "where lives he"],
        answer: "where he lives",
        explanation: "宾语从句通常使用陈述句语序：连接词 + 主语 + 谓语。",
      },
      {
        id: "eng-q3",
        question: "forecast 在例句中可表示什么？",
        choices: ["预报", "作文", "分数", "实验"],
        answer: "预报",
        explanation: "weather forecast 表示天气预报。",
      },
      {
        id: "eng-q4",
        question: "progress 最适合填入哪句？",
        choices: ["Make steady ____ every day.", "Boil the ____.", "Open the ____.", "Draw the ____."],
        answer: "Make steady ____ every day.",
        explanation: "make progress 表示取得进步。",
      },
      {
        id: "eng-q5",
        question: "explain 的词性是？",
        choices: ["动词", "介词", "冠词", "数词"],
        answer: "动词",
        explanation: "explain 表示解释、说明，是动词。",
      },
    ],
  },
  math: {
    id: "math",
    name: "数学",
    accent: "#0f766e",
    term: "九年级上",
    unit: "二次函数预习",
    activities: [
      {
        id: "math-concept",
        subject: "math",
        title: "考点预习：二次函数图像",
        minutes: 8,
        type: "lesson",
        difficulty: "中等",
        knowledgeTags: ["二次函数", "开口方向", "顶点"],
        prompt:
          "二次函数 y = ax² + bx + c 的图像是抛物线。先判断 a 的正负，再看顶点和对称轴。",
        answer: "a > 0 开口向上，a < 0 开口向下；顶点决定最值。",
        reviewStatus: "approved",
      },
      {
        id: "math-example",
        subject: "math",
        title: "例题拆解：顶点式",
        minutes: 5,
        type: "example",
        difficulty: "中等",
        knowledgeTags: ["顶点式", "最值", "图像"],
        prompt: "y = 2(x - 1)² + 3 的顶点是什么？最小值是多少？",
        answer: "顶点是 (1, 3)，因为 a = 2 > 0，最小值是 3。",
        reviewStatus: "approved",
      },
      {
        id: "math-practice",
        subject: "math",
        title: "分层练习：3 道基础题",
        minutes: 6,
        type: "practice",
        difficulty: "基础到中等",
        knowledgeTags: ["函数图像", "配方法", "最值"],
        prompt: "完成练习后查看步骤解析，错题会进入薄弱点。",
        answer: "错题按考点标签归档，用于生成下一步建议。",
        reviewStatus: "approved",
      },
    ],
    exercises: [
      {
        id: "math-ex-vertex",
        concept: "二次函数顶点",
        question: "函数 y = (x + 2)² - 5 的顶点坐标是？",
        choices: ["(2, -5)", "(-2, -5)", "(-2, 5)", "(2, 5)"],
        answer: "(-2, -5)",
        solution: "顶点式 y = a(x - h)² + k 的顶点是 (h, k)。这里 x + 2 = x - (-2)，所以顶点是 (-2, -5)。",
        trap: "把 x + 2 误看成 x - 2，是这类题最常见的错误。",
        difficulty: "基础",
        knowledgeTags: ["二次函数顶点", "顶点式"],
      },
      {
        id: "math-ex-open",
        concept: "开口方向",
        question: "函数 y = -3x² + 2 的图像开口方向是？",
        choices: ["向上", "向下", "向左", "向右"],
        answer: "向下",
        solution: "二次项系数 a = -3 < 0，所以抛物线开口向下。",
        trap: "只看常数项 2 不能判断开口方向。",
        difficulty: "基础",
        knowledgeTags: ["开口方向", "二次函数图像"],
      },
      {
        id: "math-ex-min",
        concept: "最值判断",
        question: "函数 y = 2(x - 3)² + 1 的最小值是？",
        choices: ["2", "3", "1", "-1"],
        answer: "1",
        solution: "a = 2 > 0，图像开口向上，顶点的 y 值 1 就是最小值。",
        trap: "题目问最小值，不是问取得最小值时的 x。",
        difficulty: "中等",
        knowledgeTags: ["最值", "顶点式"],
      },
    ],
  },
  chinese: {
    id: "chinese",
    name: "语文",
    accent: "#b45309",
    term: "九年级上",
    unit: "现代文预习",
    activities: [
      {
        id: "chi-reading",
        subject: "chinese",
        title: "课文导读：抓标题、线索、情感",
        minutes: 5,
        type: "reading",
        difficulty: "基础",
        knowledgeTags: ["课文导读", "阅读理解", "情感线索"],
        prompt: "读课文前先猜文章对象、叙述顺序和情感变化，读后用一句话验证。",
        answer: "预习目标是形成问题，不要求背诵原文。",
        reviewStatus: "approved",
      },
      {
        id: "chi-composition-growth",
        subject: "chinese",
        title: "作文素材：成长类片段迁移",
        minutes: 8,
        type: "writing",
        difficulty: "中等",
        knowledgeTags: ["作文", "素材迁移", "成长主题"],
        prompt: "从一次主动承担责任、克服畏难或修正错误的经历中，提炼“成长”主题，写 80-120 字片段。",
        answer: "片段要包含：具体情境、一个动作细节、心理变化、成长认识。避免空喊“我长大了”，用事例证明变化。",
        reviewStatus: "approved",
      },
    ],
  },
  physics: {
    id: "physics",
    name: "物理",
    accent: "#7c3aed",
    term: "九年级上",
    unit: "内能与热量",
    activities: [
      {
        id: "phy-heat",
        subject: "physics",
        title: "知识点：内能和温度",
        minutes: 5,
        type: "lesson",
        difficulty: "基础",
        knowledgeTags: ["内能", "温度", "热传递"],
        prompt: "温度反映分子热运动剧烈程度，内能和物体内所有分子的运动与相互作用有关。",
        answer: "温度升高通常内能增加，但内能还和质量、状态等有关。",
        reviewStatus: "approved",
      },
    ],
  },
  chemistry: {
    id: "chemistry",
    name: "化学",
    accent: "#dc2626",
    term: "九年级上",
    unit: "走进化学世界",
    activities: [
      {
        id: "chem-change",
        subject: "chemistry",
        title: "概念辨析：物理变化与化学变化",
        minutes: 5,
        type: "lesson",
        difficulty: "基础",
        knowledgeTags: ["物理变化", "化学变化", "现象判断"],
        prompt: "判断变化类型时看是否生成新物质，不只看有没有发光、发热或形状改变。",
        answer: "铁生锈生成新物质，是化学变化；水结冰没有生成新物质，是物理变化。",
        reviewStatus: "approved",
      },
    ],
  },
};

export const subjectOrder = ["english", "math", "chinese", "physics", "chemistry"];

export function getSubjectChapterIndex(curriculumData, subjectId) {
  const subject = curriculumData[subjectId];
  if (!subject?.chapters) return [];

  return subject.chapters.map((chapter) => {
    const lessons = chapter.lessons ?? [];
    const knowledgeCardCount = lessons.reduce((sum, lessonItem) => sum + (lessonItem.knowledgeCards?.length ?? 0), 0);
    const practiceQuestionCount = lessons.reduce((sum, lessonItem) => sum + (lessonItem.practiceSet?.length ?? 0), 0);
    const quickCheckCount = lessons.filter((lessonItem) => lessonItem.quickCheck).length;
    const dictationWordCount = lessons.reduce((sum, lessonItem) => sum + (lessonItem.dictationWords?.length ?? 0), 0);
    const wordCount = chapter.dailyWords?.reduce((sum, day) => sum + day.words.length, 0) ?? 0;

    return {
      id: chapter.id,
      title: chapter.title,
      overview: chapter.overview,
      lessonCount: lessons.length,
      knowledgeCardCount,
      practiceQuestionCount,
      quickCheckCount,
      dictationWordCount,
      wordCount,
      coreIdeas: chapter.knowledgeMap?.coreIdeas ?? [],
      traps: chapter.knowledgeMap?.traps ?? [],
      practicePath: chapter.knowledgeMap?.practicePath ?? [],
      retrievalPrompt: chapter.knowledgeMap?.retrievalPrompt ?? "",
    };
  });
}

export function getCurriculumCoverageSummary(curriculumData) {
  const subjects = subjectOrder.map((subjectId) => {
    const subject = curriculumData[subjectId];
    const chapters = subject.chapters ?? [];
    const lessons = chapters.flatMap((chapter) => chapter.lessons ?? []);
    const knowledgeCardCount = lessons.reduce((sum, item) => sum + (item.knowledgeCards?.length ?? 0), 0);
    const practiceQuestionCount = lessons.reduce((sum, item) => sum + (item.practiceSet?.length ?? 0), 0);
    const quickCheckCount = lessons.filter((item) => item.quickCheck).length;
    const selfCheckCount = lessons.reduce((sum, item) => sum + (item.selfCheck?.length ?? 0), 0);
    const recallPromptCount = lessons.reduce((sum, item) => sum + (item.recallPrompts?.length ?? 0), 0);
    const microDrillCount = lessons.reduce((sum, item) => sum + (item.microDrills?.length ?? 0), 0);
    const dictationWordCount = lessons.reduce((sum, item) => sum + (item.dictationWords?.length ?? 0), 0);
    const wordCount = subjectId === "english" ? (subject.flashcards?.length ?? 0) : 0;
    const grammarCount = subjectId === "english"
      ? chapters.reduce((sum, chapter) => sum + (chapter.grammarNotes?.length ?? 0), 0)
      : 0;
    const approvedActivities = (subject.activities ?? []).filter((activity) => activity.reviewStatus === "approved").length;
    const pendingActivities = (subject.activities ?? []).filter((activity) => activity.reviewStatus !== "approved").length;
    const gaps = buildCoverageGaps(subjectId, {
      chapters: chapters.length,
      lessons: lessons.length,
      knowledgeCardCount,
      practiceQuestionCount,
      quickCheckCount,
      selfCheckCount,
      recallPromptCount,
      microDrillCount,
      wordCount,
      grammarCount,
      dictationWordCount,
      pendingActivities,
    });

    return {
      id: subjectId,
      name: subject.name,
      version: curriculumData.meta.defaultVersions[subjectId],
      chapters: chapters.length,
      lessons: lessons.length,
      knowledgeCards: knowledgeCardCount,
      practiceQuestions: practiceQuestionCount,
      quickChecks: quickCheckCount,
      selfChecks: selfCheckCount,
      recallPrompts: recallPromptCount,
      microDrills: microDrillCount,
      wordCount,
      grammarCount,
      dictationWordCount,
      approvedActivities,
      pendingActivities,
      gaps,
    };
  });

  return {
    subjects,
    totals: {
      chapters: subjects.reduce((sum, item) => sum + item.chapters, 0),
      lessons: subjects.reduce((sum, item) => sum + item.lessons, 0),
      knowledgeCards: subjects.reduce((sum, item) => sum + item.knowledgeCards, 0),
      practiceQuestions: subjects.reduce((sum, item) => sum + item.practiceQuestions, 0),
      quickChecks: subjects.reduce((sum, item) => sum + item.quickChecks, 0),
      selfChecks: subjects.reduce((sum, item) => sum + item.selfChecks, 0),
    },
    review: {
      pendingCount: subjects.reduce((sum, item) => sum + item.pendingActivities, 0),
      pendingSubjects: subjects.filter((item) => item.pendingActivities > 0).map((item) => item.id),
    },
  };
}

export function getReviewCoverageSummary(curriculumData) {
  const subjects = subjectOrder.map((subjectId) => {
    const subject = curriculumData[subjectId];
    const activities = subject.activities ?? [];
    const approvedActivities = activities.filter((activity) => activity.reviewStatus === "approved");
    const pendingActivities = activities.filter((activity) => activity.reviewStatus !== "approved");

    return {
      id: subjectId,
      name: subject.name,
      totalCount: activities.length,
      approvedCount: approvedActivities.length,
      pendingCount: pendingActivities.length,
      approvedPercent: activities.length ? Math.round((approvedActivities.length / activities.length) * 100) : 0,
      pendingItems: pendingActivities.map((activity) => normalizeReviewActivity(activity, subject.name)),
    };
  });
  const pendingQueue = subjects.flatMap((subject) => subject.pendingItems);

  return {
    subjects,
    totalCount: subjects.reduce((sum, subject) => sum + subject.totalCount, 0),
    approvedCount: subjects.reduce((sum, subject) => sum + subject.approvedCount, 0),
    pendingCount: subjects.reduce((sum, subject) => sum + subject.pendingCount, 0),
    pendingQueue,
  };
}

function normalizeReviewActivity(activity, subjectName) {
  return {
    id: activity.id,
    subject: activity.subject,
    subjectName,
    title: activity.title,
    minutes: activity.minutes,
    type: activity.type,
    difficulty: activity.difficulty,
    knowledgeTags: activity.knowledgeTags ?? [],
    prompt: activity.prompt,
    answer: activity.answer,
    reviewStatus: activity.reviewStatus === "approved" ? "approved" : "pending",
  };
}

function buildCoverageGaps(subjectId, stats) {
  const gaps = [];
  if (stats.chapters < 4) gaps.push("章节数量偏少");
  if (stats.lessons < 8) gaps.push("课时数量偏少");
  if (stats.knowledgeCardCount < stats.lessons * 3) gaps.push("知识卡不足");
  if (stats.practiceQuestionCount < stats.lessons * 2) gaps.push("练习题不足");
  if (stats.quickCheckCount < stats.lessons) gaps.push("快测未覆盖每课");
  if (stats.selfCheckCount < stats.lessons * 2) gaps.push("自测清单不足");
  if (stats.recallPromptCount < stats.lessons * 2) gaps.push("主动回忆不足");
  if (stats.microDrillCount < stats.lessons * 3) gaps.push("微练习不足");
  if (subjectId === "english" && stats.wordCount < 360) gaps.push("英语词汇量不足");
  if (subjectId === "english" && stats.grammarCount < 24) gaps.push("英语语法点不足");
  if (subjectId === "chinese" && stats.dictationWordCount < stats.lessons * 4) gaps.push("语文默写词不足");
  return gaps;
}

const englishUnits = [
  {
    title: "Unit 1 Know yourself",
    focus: "性格与自我认识",
    words: [
      { word: "race", cn: "赛跑", phonetic: "/reɪs/" },
      { word: "Miss", cn: "小姐", phonetic: "/mɪs/" },
      { word: "attention", cn: "注意", phonetic: "/ə'tenʃn/" },
      { word: "pay attention to", cn: "注意（词组）" },
      { word: "fixed", cn: "（fix 的过去式）修理", phonetic: "/fɪkst/" },
      { word: "either...or...", cn: "要么……要么……；或者……或者……" },
      { word: "order", cn: "n.&v. 点菜；命令", phonetic: "/'ɔ:(r)də(r)/" },
      { word: "creative", cn: "adj. 有创造力的；创造性的", phonetic: "/kri'eɪtɪv/" },
      { word: "appear", cn: "v. 出现", phonetic: "/ə'pɪə/, /ə'pɪr/" },
      { word: "shape", cn: "n. 形状；外形", phonetic: "/ʃeɪp/" },
      { word: "calendar", cn: "n. 日历；日程表", phonetic: "/'kælɪndə(r)/" },
      { word: "upset", cn: "adj. 难过；失望；沮丧", phonetic: "/,ʌp'set/" },
      { word: "come up with", cn: "想出；提出（主意、计划、回答等）" },
      { word: "neither", cn: "adv. 也不", phonetic: "/'naɪðə/, /'ni:ðə(r)/" },
      { word: "argue", cn: "v. 争吵；争论", phonetic: "/'ɑ:(r)gju:/" },
      { word: "lead", cn: "v. 带路；领路", phonetic: "/li:d/" },
      { word: "challenge", cn: "v.&n. 挑战；考验", phonetic: "/'tʃælɪndʒ/" },
      { word: "born", cn: "v. 出生 adj. 天生的", phonetic: "/bɔ:(r)n/" },
      { word: "connect", cn: "v. （使）连接；与……有联系", phonetic: "/kə'nekt/" },
      { word: "general", cn: "adj. 总的；普遍的；常规的 n. 将军", phonetic: "/'dʒenrəl/" },
      { word: "speech", cn: "n. 讲话；发言", phonetic: "/spi:tʃ/" },
      { word: "lively", cn: "adj. 生气勃勃的；（色彩）鲜艳的", phonetic: "/'laɪvli/" },
      { word: "divide", cn: "v. 分开；分散", phonetic: "/dɪ'vaɪd/" },
      { word: "pioneer", cn: "n. 先锋；先驱", phonetic: "/,paɪə'nɪə/" },
      { word: "position", cn: "n. 位置；地方", phonetic: "/pə'zɪʃn/" },
      { word: "praise", cn: "v.&n. 表扬；赞扬", phonetic: "/preɪz/" },
      { word: "nor", cn: "conj.&adv. 也不", phonetic: "/nɔ:(r)/" },
      { word: "neither...nor...", cn: "既不……也不……" },
      { word: "standard", cn: "n. 标准；水平", phonetic: "/'stændə(r)d/" },
      { word: "respect", cn: "v. 慎重对待；尊重", phonetic: "/rɪ'spekt/" },
      { word: "mood", cn: "n. 心情，情绪", phonetic: "/mu:d/" },
      { word: "extra", cn: "adj. 额外的；附加的", phonetic: "/'ekstrə/" },
      { word: "carelessness", cn: "n. 粗心", phonetic: "/'keələsnəs/" },
      { word: "modest", cn: "adj. 谦虚的", phonetic: "/'mɒdɪst/" },
      { word: "personality", cn: "n. 个性", phonetic: "/,pɜ:sə'næləti/" },
      { word: "impatient", cn: "adj. 不耐烦的，急躁的", phonetic: "/ɪm'peɪʃәnt/" },
      { word: "agree with sb", cn: "同意（某人）看法" },
      { word: "as good as", cn: "和……几乎一样，简直是" },
      { word: "connect to", cn: "与……相连，连接（和……有联系）" },
      { word: "connect with", cn: "与……相连，连接" },
      { word: "divide...into...", cn: "把……分成……" },
      { word: "eat up", cn: "吃光，吃完" },
      { word: "fall behind", cn: "落后" },
      { word: "high-speed", cn: "adj. 高速的" },
      { word: "keep...in order", cn: "使……保持井然有序" },
      { word: "show off", cn: "炫耀" },
      { word: "take the lead", cn: "处于领先地位" },
      { word: "accountant", cn: "n. 会计", phonetic: "/ә'kaʊntәnt/" },
      { word: "animal sign", cn: "n. 生肖" },
      { word: "chief", cn: "adj. 主要的，首要的", phonetic: "/tʃi:f/" },
      { word: "curious", cn: "adj. 好奇的", phonetic: "/'kjʊərɪəs/" },
      { word: "cycle", cn: "n. 循环", phonetic: "/'saɪkl/" },
      { word: "devote", cn: "vt. 把……贡献，把……专用于", phonetic: "/dɪ'vəʊt/" },
      { word: "energetic", cn: "adj. 精力充沛的", phonetic: "/,enə'dʒetɪk/" },
      { word: "impress", cn: "vt. 给……留下印象", phonetic: "/ɪm'pres/" },
      { word: "loyal", cn: "adj. 忠诚的", phonetic: "/'lɔɪəl/" },
      { word: "lunar", cn: "农历的", phonetic: "/'lu:nə(r)/" },
      { word: "monitor", cn: "n. （计算机）显示器", phonetic: "/'mɒnɪtə/" },
      { word: "organized", cn: "adj. 有条理的；有效率的", phonetic: "/'ɔ:gənaɪzd/" },
      { word: "powerful", cn: "强有力的；力量大的", phonetic: "/'paʊəfl/" },
      { word: "practical", cn: "adj. 有用的；适用的", phonetic: "/'præktɪkl/" },
      { word: "represent", cn: "vt. 代表；象征", phonetic: "/,reprɪ'zent/" },
      { word: "sales department", cn: "n. 销售部" },
      { word: "sculpture", cn: "n. 雕塑，雕像", phonetic: "/'skʌlptʃә/" },
      { word: "star sign", cn: "n. 星座" },
      { word: "suitable", cn: "adj. 合适的；适宜的", phonetic: "/'su:təbl/; /'sju:təbl/" },
      { word: "surgeon", cn: "n. 外科大夫", phonetic: "/'sɜ:dʒәn/" },
    ],
    phrases: ["eat up", "keep...in order", "show off", "come up with", "neither...nor...", "praise sb. for sth."],
    sentencePatterns: ["It is + adj. + of sb. + to do sth.", "Neither ... nor ...", "Either ... or ..."],
    sourceNote: "课本后 Wordlist 校正：Unit 1 Know yourself",
  },
  {
    title: "Unit 2 Colours",
    focus: "颜色与情绪",
    words: [
      "colour", "mood", "influence", "whether", "calm",
      "relaxed", "peace", "sadness", "purity", "wisdom",
      "strength", "heat", "difficulty", "decision", "relationship",
      "everyday", "personal", "suit", "celebration", "ancient",
      "therapy", "discover", "promise", "otherwise", "work",
      "require", "feeling", "prefer", "create", "balance",
    ],
    phrases: ["influence our moods", "make a decision", "have difficulty doing", "be dressed in", "remind sb. of", "prefer ... to ..."],
    sentencePatterns: ["Would rather do sth. than do sth.", "Prefer doing sth. to doing sth.", "If ... , ..."],
  },
  {
    title: "Unit 3 Teenage problems",
    focus: "青少年问题",
    words: [
      "teenage", "mark", "mad", "exam", "perhaps",
      "choice", "awake", "hardly", "imagine", "doubt",
      "worth", "suggestion", "cause", "strict", "schoolwork",
      "valuable", "friendship", "list", "silence", "worry",
      "method", "solve", "dictionary", "reply", "chemistry",
      "progress", "pronounce", "correctly", "mention", "stress",
    ],
    phrases: ["drive sb. mad", "stay up", "be worth doing", "be strict with", "deal with", "hear from"],
    sentencePatterns: ["I do not know how to deal with it.", "Why not do sth.?", "What/How about doing sth.?"],
  },
  {
    title: "Unit 4 Growing up",
    focus: "成长经历",
    words: [
      "time", "whenever", "through", "deal", "career",
      "against", "record", "victory", "spirit", "courage",
      "university", "national", "championship", "scholarship", "graduate",
      "force", "league", "remain", "achievement", "prove",
      "matter", "symbol", "survive", "admire", "research",
      "death", "German", "thought", "unusual", "leader",
    ],
    phrases: ["try out for", "lose heart", "change one's mind", "succeed in doing", "take notice of", "break out"],
    sentencePatterns: ["Before/after/when/while + clause", "Since + clause", "Until/till + clause"],
  },
  {
    title: "Unit 5 Art world",
    focus: "艺术世界",
    words: [
      "art", "pleasant", "drama", "photography", "musician",
      "central", "instrument", "common", "object", "praise",
      "winner", "present", "traditional", "bell", "though",
      "boundary", "medal", "composer", "control", "flow",
      "successfully", "lasting", "value", "African", "tonight",
      "literature", "concert", "folk", "classical", "jazz",
    ],
    phrases: ["be known for", "make music with common objects", "have a lasting value", "out of breath", "present a medal to", "in a western style"],
    sentencePatterns: ["Because/Since/As + reason", "Though/although + concession", "So that + purpose"],
  },
  {
    title: "Unit 6 TV programmes",
    focus: "电视节目",
    words: [
      "programme", "weekly", "round-up", "up-to-date", "fan",
      "coming", "cover", "live", "Asian", "unless",
      "wealthy", "mystery", "might", "scared", "scene",
      "direct", "director", "latest", "record", "vote",
      "announce", "text", "message", "murder", "documentary",
      "dialogue", "comedy", "series", "viewer", "studio",
    ],
    phrases: ["a weekly round-up", "be covered live", "send text messages to", "vote online for", "be full of horror", "take a close look at"],
    sentencePatterns: ["If + present simple, ...", "Unless + clause, ...", "While watching TV, ..."],
  },
  {
    title: "Unit 7 Films",
    focus: "电影",
    words: [
      "film", "industry", "storyteller", "superstar", "romantic",
      "western", "actor", "actress", "loss", "final",
      "dancer", "lead", "role", "mark", "lifetime",
      "nomination", "appearance", "beyond", "effort", "peacefully",
      "insist", "attractive", "major", "cancel", "stupid",
      "consider", "all-time", "achievement", "script", "talent",
    ],
    phrases: ["play the lead role", "catch one's attention", "beyond one's imagination", "make one's final appearance", "insist on doing", "be considered as"],
    sentencePatterns: ["Although/though + clause", "So ... that ...", "Such ... that ..."],
  },
  {
    title: "Unit 8 Detective stories",
    focus: "侦探故事",
    words: [
      "detective", "murder", "suspect", "medium", "untidy",
      "guilty", "truth", "guess", "lie", "enemy",
      "single", "somewhere", "wound", "bleed", "suppose",
      "breathe", "heavily", "reward", "arrest", "couple",
      "probably", "criminal", "fingerprint", "boss", "commit",
      "crime", "kidnap", "wealth", "safety", "guard",
    ],
    phrases: ["be charged with", "break into", "lead to", "offer a reward", "be guilty of", "guard against"],
    sentencePatterns: ["Relative clauses with who/which/that", "There was probably more than one person.", "The victim was wounded with ..."],
  },
];

enrichEnglishUnits(englishUnits);

curriculum.english.chapters = englishUnits.map(({ title, focus, words, phrases, sentencePatterns, sourceNote }, index) => ({
  id: `eng-unit-${index + 1}`,
  title,
  overview: focus,
  dailyWords: chunkWords(words, 5).map((group, dayIndex) => ({
    day: dayIndex + 1,
    words: group.map(normalizeEnglishWord),
  })),
  lessons: [
    {
      id: `eng-unit-${index + 1}-words`,
      title: "每日单词预习",
      keyPoints: ["先听读，再看释义", "用例句记含义", "不会的词进入复习队列"],
      tasks: ["每天完成 5 个词", "遮住中文回忆意思", "用 2 个词造句"],
    },
    {
      id: `eng-unit-${index + 1}-grammar`,
      title: "语法与句型预习",
      keyPoints: ["整理本单元重点句型", "观察连接词和时态", "用短句做替换练习"],
      tasks: ["写 3 个例句", "完成 5 题小测"],
    },
  ],
  phrases,
  sentencePatterns,
  grammarNotes: enrichEnglishGrammarNotes(index + 1, buildEnglishGrammarNotes(index + 1)),
  translationDrills: buildEnglishTranslationDrills(index + 1, title, focus, words, phrases, sentencePatterns),
  sourceNote: sourceNote ?? "参考课本词汇目录扩展，中文释义为预习版，待逐项人工校对",
}));

curriculum.english.flashcards = curriculum.english.chapters.flatMap((unit, index) =>
  buildWordlistFlashcards(unit, `eng-u${index + 1}`),
);

curriculum.math.chapters = [
  detailedChapter("math", 1, "第1章 一元二次方程", "从方程模型、解法选择、判别式和实际应用四条线预习。", [
    lesson("math-1-1", "一元二次方程", [
      "标准形式 ax² + bx + c = 0，必须满足 a ≠ 0",
      "会判断二次项、一次项、常数项和未知数取值范围",
      "理解“方程的解”是使等式成立的未知数值",
      "能把面积、连续整数、增长率问题先转成方程",
    ], ["改写 5 个方程到标准形式", "标出 a、b、c", "说出为什么 a 不能为 0"], {
      formulas: ["ax² + bx + c = 0 (a ≠ 0)"],
      commonMistakes: ["把含分式或括号的式子未化简就直接判断次数"],
      practice: "判断 2x(x-1)=3 是否为一元二次方程，并化成标准形式。",
    }),
    lesson("math-1-2", "方程的解法", [
      "直接开平方法适合 (x-h)² = k 的形式",
      "因式分解法先移项成右边为 0，再用乘积为 0",
      "配方法要把二次项系数化为 1，再补一次项系数一半的平方",
      "公式法适合通用题，但要先准确写出 a、b、c",
    ], ["给 4 道方程选择最省力解法", "完成 1 道配方法过程", "用公式法验算一题"], {
      formulas: ["x = (-b ± √(b² - 4ac)) / 2a"],
      commonMistakes: ["公式法漏写 ±，或把 b² - 4ac 算成 b² + 4ac"],
      practice: "解 x² - 5x + 6 = 0，并说明为什么可用因式分解法。",
    }),
    lesson("math-1-3", "根的判别式", [
      "Δ = b² - 4ac 决定实数根个数",
      "Δ > 0 有两个不相等实数根，Δ = 0 有两个相等实数根",
      "Δ < 0 在实数范围内无解",
      "含参数题先按根的情况列不等式或方程",
    ], ["背出三种判别式结论", "做 2 道根个数判断", "整理参数题的列式步骤"], {
      formulas: ["Δ = b² - 4ac"],
      commonMistakes: ["题目问“有实数根”时漏掉 Δ = 0 的情况"],
      practice: "判断 x² + 2x + 5 = 0 的实数根情况。",
    }),
    lesson("math-1-4", "实际问题", [
      "增长率模型常见为 a(1+x)² = b",
      "面积问题要先画草图，再用长宽关系列式",
      "利润问题抓住单价、数量、总利润之间的关系",
      "解出结果后必须检验是否符合题意",
    ], ["画一张数量关系表", "写出未知数含义和单位", "解后代回题干检验"], {
      formulas: ["增长后数量 = 原数量 × (1 + 增长率)ⁿ"],
      commonMistakes: ["只保留数学上成立的根，没有删去不合题意的负数或过大值"],
      practice: "某数连续两次增长 10% 后为 121，求原数。",
    }),
  ]),
  detailedChapter("math", 2, "第2章 对称图形 圆", "围绕圆的性质、角、直线位置关系和正多边形建立几何证明框架。", [
    lesson("math-2-1", "圆的基本性质", [
      "圆是到定点距离等于定长的点的集合",
      "同圆或等圆中，等弦对等弧，对等圆心角",
      "垂径定理连接半径、弦、弧和中点",
      "证明题常补半径或作垂线制造直角三角形",
    ], ["画出圆心、半径、弦、弧", "背垂径定理条件和结论", "完成 1 道补辅助线题"], {
      formulas: ["圆周长 C = 2πr", "圆面积 S = πr²"],
      commonMistakes: ["把“垂直于弦”误用到非过圆心的线段上"],
      practice: "半径为 5，圆心到弦距离为 3，求弦长。",
    }),
    lesson("math-2-2", "圆周角", [
      "同弧所对圆周角相等",
      "圆周角等于它所对弧的圆心角的一半",
      "直径所对圆周角是直角",
      "角度证明常从找同弧、找直径、找四点共圆开始",
    ], ["标出题中每个角所对的弧", "用直径构造直角", "整理 2 个同弧等角结论"], {
      formulas: ["圆周角 = 同弧圆心角 ÷ 2"],
      commonMistakes: ["只看到角相等，却没有说明它们所对的是同一条弧"],
      practice: "AB 是直径，点 C 在圆上，判断 ∠ACB 的度数。",
    }),
    lesson("math-2-3", "直线与圆的位置关系", [
      "比较圆心到直线距离 d 与半径 r 判断相交、相切、相离",
      "切线垂直于过切点的半径",
      "证明切线常证半径与直线垂直",
      "切线长定理可用于线段相等和周长计算",
    ], ["画出 d 与 r 的三种关系", "背切线判定和性质", "完成一题切线证明"], {
      formulas: ["d < r 相交", "d = r 相切", "d > r 相离"],
      commonMistakes: ["把点到直线距离画成斜线，导致位置判断错误"],
      practice: "圆半径 4，圆心到直线距离 4，判断位置关系。",
    }),
    lesson("math-2-4", "正多边形与圆", [
      "正多边形可以看作圆内接多边形",
      "中心角 = 360° / 边数",
      "半径、边心距、半边构成直角三角形",
      "周长和面积计算常转化为一个等腰三角形",
    ], ["画正六边形与外接圆", "计算中心角", "用边心距拆面积"], {
      formulas: ["正 n 边形中心角 = 360° / n", "面积 = 周长 × 边心距 ÷ 2"],
      commonMistakes: ["把中心角和内角混为一谈"],
      practice: "求正六边形每个中心角的度数。",
    }),
  ]),
  detailedChapter("math", 3, "第3章 数据的集中趋势和离散程度", "掌握平均数、中位数、众数、方差四类统计量的意义和适用场景。", [
    lesson("math-3-1", "平均数", [
      "平均数反映一组数据的总体水平",
      "加权平均数要同时看数值和权重",
      "数据中极端值会明显影响平均数",
      "应用题要先统一单位，再代入计算",
    ], ["计算一组普通平均数", "解释权重含义", "判断平均数是否受极端值影响"], {
      formulas: ["平均数 = 数据总和 ÷ 数据个数", "加权平均数 = Σ(数值×权重) ÷ Σ权重"],
      commonMistakes: ["把权重当成简单个数，导致分母写错"],
      practice: "求 80、90、100 的平均数。",
    }),
    lesson("math-3-2", "中位数", [
      "中位数要先按从小到大排序",
      "数据个数为奇数时取中间一个",
      "数据个数为偶数时取中间两个的平均数",
      "中位数适合描述有极端值的数据",
    ], ["给 7 个数据排序并取中位数", "给 8 个数据取中间平均", "比较平均数和中位数差异"], {
      commonMistakes: ["没有排序就直接取原数据中间位置"],
      practice: "求 3、9、5、11、6 的中位数。",
    }),
    lesson("math-3-3", "众数", [
      "众数是一组数据中出现次数最多的数",
      "一组数据可以没有众数，也可以有多个众数",
      "众数适合描述最常见选择或销售型号",
      "统计图题要从频数最高处找众数",
    ], ["圈出出现次数最多的数据", "判断是否有多个众数", "用众数解释生活情境"], {
      commonMistakes: ["误以为众数只能有一个"],
      practice: "数据 1、2、2、3、3、4 的众数是什么？",
    }),
    lesson("math-3-4", "方差", [
      "方差反映数据波动大小",
      "方差越小，数据越稳定",
      "比较稳定性时不要只看平均数",
      "计算方差要先算平均数，再算偏差平方的平均",
    ], ["背方差含义", "比较两组数据稳定性", "完成一题简单方差计算"], {
      formulas: ["s² = [(x₁-x̄)² + ... + (xₙ-x̄)²] / n"],
      commonMistakes: ["把偏差直接相加，忘记平方后求平均"],
      practice: "两组平均数相同，方差较小的一组说明什么？",
    }),
  ]),
  detailedChapter("math", 4, "第4章 等可能条件下的概率", "从事件、列表、树状图到频率估计概率，形成规范表达。", [
    lesson("math-4-1", "等可能事件", [
      "等可能要求每个基本结果出现机会相同",
      "概率 = 目标结果数 / 所有等可能结果数",
      "必然事件概率为 1，不可能事件概率为 0",
      "判断模型是否公平是概率题的第一步",
    ], ["列出所有基本结果", "判断是否等可能", "计算 2 个简单概率"], {
      formulas: ["P(A) = m / n"],
      commonMistakes: ["没有确认等可能就直接用结果数相除"],
      practice: "掷一枚均匀骰子，掷出偶数的概率是多少？",
    }),
    lesson("math-4-2", "列表法", [
      "列表法适合两个步骤的等可能试验",
      "行列分别表示两个试验结果",
      "表格中每个格子代表一个基本结果",
      "求概率前先数清总格数和目标格数",
    ], ["画一次两枚硬币列表", "标出目标事件", "写出概率分数并约分"], {
      commonMistakes: ["漏掉顺序不同但结果不同的格子"],
      practice: "两次掷硬币，出现一次正面一次反面的概率。",
    }),
    lesson("math-4-3", "树状图", [
      "树状图适合两步以上或分类较多的试验",
      "每一条完整路径代表一种结果",
      "不放回抽取时第二步总数会变化",
      "树状图要写清每一步的分支名称",
    ], ["画 2 步抽球树状图", "数完整路径", "区分放回和不放回"], {
      commonMistakes: ["不放回问题仍按放回数量画第二层分支"],
      practice: "袋中 2 红 1 白，不放回取两次，画树状图。",
    }),
    lesson("math-4-4", "频率与概率", [
      "大量重复试验中频率会稳定在概率附近",
      "频率不是概率，但可用来估计概率",
      "试验次数越多，估计通常越可靠",
      "用频率估计时要说明样本数量",
    ], ["读懂频率表", "根据频率估计概率", "判断试验次数是否足够"], {
      formulas: ["频率 = 事件发生次数 ÷ 试验总次数"],
      commonMistakes: ["把少量试验得到的频率当成精确概率"],
      practice: "投篮 50 次进 30 次，用频率估计命中概率。",
    }),
  ]),
  detailedChapter("math", 5, "第5章 二次函数", "用图像、解析式、最值和实际应用串联中考高频函数问题。", [
    lesson("math-5-1", "二次函数图像", [
      "y = ax² + bx + c 的图像是抛物线",
      "a 决定开口方向和开口大小",
      "c 是图像与 y 轴交点的纵坐标",
      "图像问题先看开口、对称轴、顶点、交点",
    ], ["画 y=x² 与 y=-x² 草图", "判断开口方向", "标出 y 轴交点"], {
      formulas: ["y = ax² + bx + c (a ≠ 0)"],
      commonMistakes: ["把一次函数图像思维套到抛物线上"],
      practice: "函数 y=-2x²+3 的开口方向和 y 轴交点。",
    }),
    lesson("math-5-2", "顶点式", [
      "y = a(x-h)² + k 的顶点是 (h,k)",
      "对称轴是 x = h",
      "a > 0 有最小值 k，a < 0 有最大值 k",
      "从一般式到顶点式常用配方法",
    ], ["背顶点式结构", "读出顶点和对称轴", "完成 1 道配方转化"], {
      formulas: ["顶点式 y = a(x-h)² + k", "对称轴 x = -b / 2a"],
      commonMistakes: ["把 x+2 对应的 h 误写成 2"],
      practice: "读出 y=3(x+1)²-4 的顶点。",
    }),
    lesson("math-5-3", "函数最值", [
      "最值由开口方向和顶点纵坐标共同决定",
      "限定自变量范围时要比较端点值和顶点值",
      "实际问题中的最值要结合题意取合理范围",
      "最大利润、最小面积等题常转化为二次函数最值",
    ], ["判断是否有最大值或最小值", "比较区间端点和顶点", "写出实际问题取值范围"], {
      formulas: ["x顶点 = -b / 2a"],
      commonMistakes: ["有取值范围时只看顶点，漏算端点"],
      practice: "求 y=(x-2)²+1 在 0≤x≤1 上的最小值。",
    }),
    lesson("math-5-4", "实际应用", [
      "建立二次函数模型前先确定自变量",
      "面积、利润、抛物线运动是常见应用情境",
      "顶点坐标常对应最佳方案",
      "结果要写单位并回到题干解释意义",
    ], ["列一个利润函数", "找自变量范围", "解释顶点对应的实际含义"], {
      commonMistakes: ["只求出 x 值，没有回答题目问的面积、利润或高度"],
      practice: "用 20 米篱笆围长方形，一边靠墙，怎样设未知数？",
    }),
  ]),
];

curriculum.chinese.chapters = [
  ["第一单元 诗歌活动探究", [
    ["1 沁园春·雪", ["妖娆", "风骚", "折腰", "天骄", "风流"], ["意象与豪情", "上下片结构", "写景与议论"]],
    ["2 周总理，你在哪里", ["谷穗", "篝火", "海防", "沉甸甸"], ["呼告式抒情", "反复手法", "人民情感"]],
    ["3 我爱这土地", ["嘶哑", "汹涌", "腐烂", "黎明"], ["象征", "意象", "爱国情感"]],
    ["4 乡愁", ["邮票", "船票", "坟墓", "海峡"], ["时间顺序", "意象递进", "家国情怀"]],
    ["5 你是人间的四月天", ["轻灵", "娉婷", "鲜妍", "冠冕"], ["比喻", "色彩描写", "情感表达"]],
    ["6 我看", ["丰润", "忧戚", "勃发", "漫游"], ["自然意象", "节奏", "青春感受"]],
  ]],
  ["第二单元 议论性文章", [
    ["7 敬业与乐业", ["旁骛", "亵渎", "强聒不舍", "佝偻"], ["中心论点", "举例论证", "道理论证"]],
    ["8 就英法联军远征中国致巴特勒上尉的信", ["赞誉", "恍若", "绸缎", "瞥见"], ["讽刺语气", "对比", "文明批判"]],
    ["9 论教养", ["贸然", "涵养", "恪守", "自持"], ["论证层次", "生活事例", "概念辨析"]],
    ["10 精神的三间小屋", ["广袤", "宽宥", "游弋", "轻觑"], ["比喻论证", "结构层次", "精神空间"]],
  ]],
  ["第三单元 古诗文", [
    ["11 岳阳楼记", ["谪守", "浩浩汤汤", "淫雨", "樯倾楫摧"], ["记叙与议论", "先忧后乐", "文言实词"]],
    ["12 醉翁亭记", ["环滁", "林壑", "觥筹", "阴翳"], ["乐的层次", "骈散结合", "文言虚词"]],
    ["13 湖心亭看雪", ["更定", "拏", "雾凇", "喃喃"], ["白描", "孤高情怀", "文言句式"]],
    ["14 诗词三首", ["樽", "歧路", "婵娟", "宫阙"], ["典故", "情景交融", "背诵默写"]],
  ]],
  ["第四单元 小说阅读", [
    ["15 故乡", ["阴晦", "萧索", "愕然", "鄙夷"], ["人物变化", "环境描写", "主题理解"]],
    ["16 我的叔叔于勒", ["拮据", "栈桥", "糟蹋", "褴褛"], ["情节转折", "人物语言", "讽刺"]],
    ["17 孤独之旅", ["嬉闹", "撩逗", "胆怯", "掺杂"], ["成长主题", "环境烘托", "心理描写"]],
  ]],
  ["第五单元 观点与思辨", [
    ["18 中国人失掉自信力了吗", ["玄虚", "诓骗", "怀古伤今", "脊梁"], ["驳论文", "论证思路", "语言锋芒"]],
    ["19 怀疑与学问", ["虚妄", "墨守", "辨伪去妄", "停滞"], ["中心论点", "分论点", "引用论证"]],
    ["20 谈创造性思维", ["探求", "汲取", "根深蒂固", "锲而不舍"], ["设问", "事例论证", "思维方法"]],
    ["21 创造宣言", ["中伤", "遁词", "鲁钝", "懦夫"], ["排比", "反驳", "鼓动性语言"]],
  ]],
  ["第六单元 古典小说", [
    ["22 智取生辰纲", ["嗔怪", "干系", "怨怅", "逞辩"], ["明暗线索", "人物群像", "情节铺垫"]],
    ["23 范进中举", ["作揖", "带挈", "盘缠", "商酌"], ["讽刺", "细节描写", "人物对比"]],
    ["24 三顾茅庐", ["拜谒", "侥幸", "纶巾", "鹤氅"], ["情节概括", "人物形象", "古白话词语"]],
    ["25 刘姥姥进大观园", ["调停", "促狭", "筵席", "发怔"], ["场面描写", "语言描写", "人物身份"]],
  ]],
].map(([title, lessons], index) => ({
  id: `chi-unit-${index + 1}`,
  title,
  overview: "按课文导读、字词默写、阅读要点、写作迁移组织，不提供课文全文。",
  lessons: lessons.map(([lessonTitle, dictationWords, keyPoints], lessonIndex) => ({
    id: `chi-${index + 1}-${lessonIndex + 1}`,
    title: lessonTitle,
    dictationWords,
    keyPoints: [...keyPoints, buildChineseExpressionPoint(title)],
    readingQuestions: buildChineseReadingQuestions(lessonTitle, keyPoints),
    writingTask: buildChineseWritingTask(title, lessonTitle),
    tasks: ["默写字词", "概括主要内容", "完成 2 个阅读理解问题", "写 80 字仿写或批注"],
  })),
}));

curriculum.physics.chapters = [
  detailedChapter("phy", 11, "第十一章 简单机械和功", "用受力图、距离关系和能量观点预习杠杆、滑轮、功、功率、机械效率。", [
    lesson("phy-11-1", "杠杆及平衡条件", [
      "杠杆由支点、动力、阻力、动力臂、阻力臂构成",
      "力臂是支点到力的作用线的垂直距离，不是支点到作用点的距离",
      "平衡条件为动力 × 动力臂 = 阻力 × 阻力臂",
      "省力杠杆省力但费距离，费力杠杆费力但省距离",
    ], ["画出两种剪刀的力臂", "判断杠杆类型", "用平衡条件算一个未知力"], {
      formulas: ["F₁L₁ = F₂L₂"],
      experiment: "用杠杆尺和钩码探究杠杆平衡，记录左右力与力臂的乘积。",
      commonMistakes: ["把力臂画成斜边，导致平衡条件计算错误"],
    }),
    lesson("phy-11-2", "滑轮", [
      "定滑轮改变力的方向，但不省力",
      "动滑轮能省力，但不能改变力的方向",
      "滑轮组承担重物的绳子段数决定理想拉力大小",
      "实际滑轮组要考虑动滑轮重和摩擦",
    ], ["判断定滑轮和动滑轮", "数承担重物的绳子段数", "比较理想和实际拉力"], {
      formulas: ["理想滑轮组 F = G / n"],
      experiment: "用弹簧测力计比较定滑轮、动滑轮和滑轮组的拉力。",
      commonMistakes: ["数绳子段数时把自由端或固定端算错"],
    }),
    lesson("phy-11-3", "功", [
      "力对物体做功需要同时有力和沿力方向移动的距离",
      "功的单位是焦耳，1J = 1N·m",
      "没有位移、力与位移垂直、没有力都不做功",
      "重力做功常用重力乘高度变化计算",
    ], ["判断 4 个情境是否做功", "标出力和距离方向", "完成一个 W=Fs 计算"], {
      formulas: ["W = Fs"],
      commonMistakes: ["物体很累或用力很大，但没有沿力方向移动也算做功"],
      practice: "用 20N 的水平力推动物体前进 3m，做功多少？",
    }),
    lesson("phy-11-4", "功率", [
      "功率表示做功快慢",
      "相同时间做功越多，功率越大",
      "做相同功所用时间越短，功率越大",
      "单位换算中 1kW = 1000W",
    ], ["区分功和功率", "用 P=W/t 计算", "解释机器铭牌上的功率"], {
      formulas: ["P = W / t"],
      commonMistakes: ["把功率理解成功的大小，忽略时间因素"],
      practice: "10s 做功 500J，功率是多少？",
    }),
    lesson("phy-11-5", "机械效率", [
      "有用功是达到目的所需要的功",
      "总功是动力实际做的功",
      "额外功主要来自机械自重和摩擦",
      "机械效率永远小于 100%",
    ], ["区分有用功、额外功、总功", "计算一个滑轮组效率", "说出提高效率的方法"], {
      formulas: ["η = W有用 / W总 × 100%"],
      experiment: "测滑轮组机械效率：测物重、拉力、物体上升高度和绳端移动距离。",
      commonMistakes: ["把机械效率写成大于 100%，或漏乘 100%"],
    }),
  ]),
  detailedChapter("phy", 12, "第十二章 机械能和内能", "从宏观运动能量过渡到微观热运动，建立能量转化意识。", [
    lesson("phy-12-1", "动能 势能 机械能", [
      "动能大小与质量和速度有关",
      "重力势能大小与质量和高度有关",
      "弹性势能与弹性形变程度有关",
      "机械能是动能和势能的总和",
    ], ["列出影响动能的两个因素", "判断能量形式", "分析过山车能量转化"], {
      formulas: ["机械能 = 动能 + 势能"],
      experiment: "用小车撞木块观察速度和质量对动能大小的影响。",
      commonMistakes: ["只看速度不看质量，或只看高度不看质量"],
    }),
    lesson("phy-12-2", "内能 热传递", [
      "内能与物体内所有分子的热运动和相互作用有关",
      "温度升高通常表示分子热运动更剧烈",
      "热传递发生条件是存在温度差",
      "热传递方向总是从高温物体到低温物体",
    ], ["区分温度、热量、内能", "判断热传递方向", "举例说明改变内能方式"], {
      formulas: ["热量符号 Q，单位 J"],
      commonMistakes: ["说“物体含有热量”，应说物体吸收或放出热量"],
      practice: "热水和冷水接触时，热量从哪一方传向哪一方？",
    }),
    lesson("phy-12-3", "物质的比热容", [
      "比热容表示物质吸放热本领的特性",
      "水的比热容大，温度变化相对慢",
      "吸热公式中质量、比热容、温度变化都要参与",
      "比热容是物质属性，与质量大小无关",
    ], ["背 Q=cmΔt", "解释沿海昼夜温差较小", "完成 1 道吸热计算"], {
      formulas: ["Q = cmΔt"],
      experiment: "比较等质量水和煤油升温快慢，注意控制加热时间相同。",
      commonMistakes: ["把 Δt 写成末温或初温，而不是温度变化量"],
    }),
    lesson("phy-12-4", "机械能与内能的相互转化", [
      "做功可以改变物体内能",
      "摩擦生热是机械能转化为内能",
      "热机把内能部分转化为机械能",
      "能量转化过程中总能量守恒，但可利用能量会损失",
    ], ["举 3 个做功改变内能例子", "分析汽油机能量转化", "区分热传递和做功"], {
      commonMistakes: ["看到温度升高就只想到热传递，忽略做功也能改变内能"],
      practice: "搓手变热属于哪种改变内能方式？",
    }),
  ]),
  detailedChapter("phy", 13, "第十三章 电路初探", "用电路图、连接方式和仪表使用建立电学基础。", [
    lesson("phy-13-1", "初识电路", [
      "完整电路包括电源、用电器、开关和导线",
      "通路、断路、短路是三种基本状态",
      "短路可能损坏电源，实验中必须避免",
      "电路图要用统一元件符号表示实物连接",
    ], ["画一个最简单电路图", "判断通路/断路/短路", "背常见元件符号"], {
      safety: "连接电路前开关应断开，检查无短路后再闭合。",
      commonMistakes: ["把导线直接接在电源两端造成短路"],
    }),
    lesson("phy-13-2", "电路连接方式", [
      "串联电路只有一条电流路径",
      "并联电路有多条支路",
      "串联用电器相互影响，并联支路相对独立",
      "识别电路要先找分叉点和汇合点",
    ], ["圈出电路中的节点", "判断串联或并联", "说出开关控制范围"], {
      commonMistakes: ["只看元件摆放位置，不沿电流路径分析"],
      practice: "家庭电路中各用电器通常是什么连接方式？",
    }),
    lesson("phy-13-3", "电流和电流表", [
      "电流表示电荷定向移动形成的强弱",
      "电流表必须串联在被测电路中",
      "电流从电流表正接线柱流入，负接线柱流出",
      "串联电路各处电流相等，并联干路电流等于各支路电流之和",
    ], ["读电流表量程和分度值", "画电流表接入位置", "计算并联干路电流"], {
      formulas: ["并联：I = I₁ + I₂ + ..."],
      experiment: "测串并联电路电流，换位置比较读数。",
      commonMistakes: ["把电流表并联到电源两端，造成短路风险"],
    }),
    lesson("phy-13-4", "电压和电压表", [
      "电压是形成电流的原因",
      "电压表必须并联在被测用电器两端",
      "电压表正负接线柱要与电源方向对应",
      "串联总电压等于各部分电压之和，并联各支路电压相等",
    ], ["读电压表量程", "画电压表并联位置", "比较串并联电压规律"], {
      formulas: ["串联：U = U₁ + U₂ + ...", "并联：U = U₁ = U₂ = ..."],
      experiment: "测串并联电路电压，归纳电压规律。",
      commonMistakes: ["把电压表串联接入，导致电路几乎不工作"],
    }),
  ]),
  detailedChapter("phy", 14, "第十四章 欧姆定律", "用电流、电压、电阻关系解决电路计算和实验探究。", [
    lesson("phy-14-1", "电阻", [
      "电阻表示导体对电流阻碍作用的大小",
      "电阻与材料、长度、横截面积、温度有关",
      "导体越长电阻越大，横截面积越大电阻越小",
      "电阻是导体本身属性，不由电压电流直接决定",
    ], ["列出影响电阻因素", "解释粗细长短影响", "区分电阻和电流"], {
      formulas: ["电阻单位 Ω"],
      experiment: "控制变量法比较不同长度、粗细导体的电阻大小。",
      commonMistakes: ["说电压越大电阻越大，混淆属性和状态量"],
    }),
    lesson("phy-14-2", "变阻器", [
      "滑动变阻器通过改变接入电路电阻丝长度改变电阻",
      "接线要“一上一下”",
      "闭合开关前滑片应置于阻值最大处",
      "变阻器可保护电路，也可调节电流和电压",
    ], ["画滑动变阻器接法", "判断滑片移动时电阻变化", "说出保护电路原因"], {
      safety: "实验前滑片放最大阻值端，避免电流过大。",
      commonMistakes: ["两个接线柱都接上端或都接下端，导致不能变阻"],
    }),
    lesson("phy-14-3", "欧姆定律", [
      "导体中的电流与两端电压成正比",
      "导体中的电流与电阻成反比",
      "欧姆定律适用于同一导体、同一段电路",
      "计算前要统一单位：V、A、Ω",
    ], ["背 I=U/R", "完成三角关系换算", "做一题单位换算"], {
      formulas: ["I = U / R", "U = IR", "R = U / I"],
      experiment: "探究电流与电压、电阻关系，分别控制电阻或电压不变。",
      commonMistakes: ["直接套 R=U/I 后认为电阻随电压变化"],
    }),
    lesson("phy-14-4", "欧姆定律的应用", [
      "串联电路电流相等，电压按电阻分配",
      "并联电路电压相等，电流按电阻分配",
      "动态电路先判断总电阻变化，再判断电流和电压",
      "故障分析常用电流表、电压表读数反推断路或短路",
    ], ["写出串并联电路关系", "分析滑片移动影响", "做一题电路故障判断"], {
      formulas: ["串联：R总 = R₁ + R₂", "并联：1/R总 = 1/R₁ + 1/R₂"],
      commonMistakes: ["动态电路中只看局部电阻，没先判断总电阻变化"],
      practice: "两个 10Ω 电阻串联，总电阻是多少？并联呢？",
    }),
  ]),
];

curriculum.chemistry.chapters = [
  detailedChapter("chem", 1, "第1章 开启化学之门", "建立化学研究对象、变化观念、实验规范和学习方法。", [
    lesson("chem-1-1", "认识化学科学", [
      "化学研究物质的组成、结构、性质及变化规律",
      "化学变化常伴随发光、放热、颜色变化、气体或沉淀生成",
      "判断化学变化的根本依据是是否生成新物质",
      "化学与材料、能源、环境、生命健康密切相关",
    ], ["举 3 个生活中的化学变化", "区分现象和本质", "整理化学研究对象"], {
      commonMistakes: ["只根据发光发热判断化学变化，忽略是否有新物质"],
      practice: "蜡烛燃烧和蜡烛熔化分别属于什么变化？",
    }),
    lesson("chem-1-2", "化学研究什么", [
      "物质性质包括物理性质和化学性质",
      "颜色、状态、气味、密度、熔点属于物理性质",
      "可燃性、氧化性、还原性、酸碱性属于化学性质",
      "性质决定用途，用途反映性质",
    ], ["给 5 个性质分类", "用性质解释用途", "写一条性质-用途对应关系"], {
      commonMistakes: ["把需要通过化学变化表现出来的性质当成物理性质"],
      practice: "氧气能支持燃烧属于哪类性质？",
    }),
    lesson("chem-1-3", "怎样学习化学", [
      "观察实验要记录反应前、反应中、反应后的现象",
      "化学符号是表达物质和变化的工具",
      "学习化学要从宏观现象、微观粒子、符号表达三层联动",
      "实验结论必须来自现象和证据，不能只凭猜测",
    ], ["按三阶段记录一个实验现象", "建立符号错题本", "用宏观-微观-符号解释一个变化"], {
      safety: "闻气体要用手轻轻扇闻，不能直接凑近瓶口猛闻。",
      commonMistakes: ["把实验现象写成结论，例如直接写“生成二氧化碳”"],
    }),
  ]),
  detailedChapter("chem", 2, "第2章 空气与水资源", "围绕空气成分、氧气性质与制取、水的组成和净化建立实验线索。", [
    lesson("chem-2-1", "空气的组成", [
      "空气是混合物，主要成分是氮气和氧气",
      "氧气约占空气体积的五分之一",
      "稀有气体、二氧化碳、水蒸气等含量较少但有重要作用",
      "空气污染物包括有害气体和烟尘",
    ], ["背空气主要成分体积分数", "区分纯净物和混合物", "列出两种空气污染物"], {
      experiment: "红磷燃烧测空气中氧气含量，观察水面上升体积。",
      safety: "红磷燃烧实验要在通风条件下进行，避免吸入白烟。",
      commonMistakes: ["误认为空气中最多的是氧气，实际最多的是氮气"],
    }),
    lesson("chem-2-2", "性质活泼的氧气", [
      "氧气能支持燃烧，但本身不可燃",
      "木炭、硫、铁丝在氧气中燃烧现象不同",
      "检验氧气常用带火星木条复燃",
      "描述现象要区分火焰、火星、颜色、生成物状态",
    ], ["背氧气检验方法", "比较三种燃烧现象", "写一条文字表达式"], {
      experiment: "铁丝在氧气中剧烈燃烧，火星四射，生成黑色固体。",
      safety: "铁丝燃烧集气瓶底要预先放少量水或细沙，防止高温熔融物炸裂瓶底。",
      commonMistakes: ["把氧气说成可燃物，应说氧气支持燃烧"],
    }),
    lesson("chem-2-3", "氧气的制备", [
      "实验室可用加热高锰酸钾或分解过氧化氢制氧气",
      "发生装置取决于反应物状态和反应条件",
      "收集方法取决于气体密度和溶解性",
      "排水法收集氧气较纯，向上排空气法较干燥",
    ], ["比较两套制氧装置", "判断收集方法", "整理验满和检验区别"], {
      experiment: "用过氧化氢溶液和二氧化锰制取氧气，二氧化锰作催化剂。",
      safety: "加热固体制气体时试管口略向下倾斜，防止冷凝水倒流炸裂试管。",
      commonMistakes: ["把验满和检验混同：验满看瓶口木条，检验看瓶内木条复燃"],
    }),
    lesson("chem-2-4", "水的组成和净化", [
      "电解水说明水由氢元素和氧元素组成",
      "正极产生氧气，负极产生氢气，体积比约 1:2",
      "沉降、过滤、吸附、蒸馏是常见净水方法",
      "硬水和软水可用肥皂水区分",
    ], ["背电解水正负极产物", "画过滤装置", "区分硬水软水"], {
      experiment: "过滤操作要做到一贴、二低、三靠。",
      safety: "电解水生成氢气，点燃前必须验纯。",
      commonMistakes: ["把氢氧体积比写反，或认为过滤能除去所有可溶性杂质"],
    }),
    lesson("chem-2-5", "基础实验：氧气制取与性质", [
      "实验前检查装置气密性",
      "制取、收集、验满、检验要按顺序进行",
      "性质实验要描述现象并联系氧气支持燃烧",
      "实验结束先移导管再熄灭酒精灯，防止倒吸",
    ], ["写完整实验步骤", "整理异常现象原因", "完成实验安全清单"], {
      experiment: "制取一瓶氧气后完成木炭、铁丝或带火星木条实验。",
      safety: "排水法收集结束时先把导管移出水面，再停止加热。",
      commonMistakes: ["实验顺序颠倒导致水倒吸或收集气体不纯"],
    }),
  ]),
  detailedChapter("chem", 3, "第3章 物质构成的奥秘", "从微粒、元素、化学式三条线理解物质组成。", [
    lesson("chem-3-1", "构成物质的基本微粒", [
      "分子、原子、离子都可以构成物质",
      "分子保持物质化学性质，化学变化中分子可分",
      "原子是化学变化中的最小粒子",
      "离子是带电的原子或原子团",
    ], ["比较分子和原子", "用微粒解释扩散", "判断物质由哪类微粒构成"], {
      commonMistakes: ["认为原子在任何变化中都不能再分，忽略核变化不属于初中化学范围"],
      practice: "水蒸发和水电解中水分子是否改变？",
    }),
    lesson("chem-3-2", "组成物质的化学元素", [
      "元素是质子数相同的一类原子的总称",
      "元素只讲种类，不讲个数",
      "元素符号可表示一种元素，也可表示该元素的一个原子",
      "地壳中含量较多元素常见有氧、硅、铝、铁",
    ], ["背常见元素符号", "区分元素和原子表达", "解释元素符号含义"], {
      commonMistakes: ["说水由两个氢元素和一个氧元素组成，应说由氢元素和氧元素组成"],
      practice: "H 可以表示哪些含义？",
    }),
    lesson("chem-3-3", "物质组成的表示", [
      "化学式表示物质组成和微粒个数比",
      "化合价可用于书写化合物化学式",
      "离子符号右上角标电荷，化学式右下角标原子个数",
      "相对分子质量等于化学式中各原子相对原子质量总和",
    ], ["练 5 个常见化学式", "标出数字含义", "计算一个相对分子质量"], {
      formulas: ["化合物中正负化合价代数和为 0"],
      commonMistakes: ["把离子电荷写在右下角，或把原子个数写在右上角"],
      practice: "计算 H₂O 的相对分子质量。",
    }),
  ]),
  detailedChapter("chem", 4, "第4章 认识化学变化", "用反应类型、质量守恒和化学方程式表达变化。", [
    lesson("chem-4-1", "常见化学反应", [
      "化合反应是多种物质生成一种物质",
      "分解反应是一种物质生成多种物质",
      "氧化反应不一定都有明显燃烧现象",
      "反应类型判断要看反应物和生成物种类变化",
    ], ["判断 4 个反应类型", "写文字表达式", "比较化合和分解"], {
      commonMistakes: ["看到氧气参与就只写燃烧，忽略缓慢氧化"],
      practice: "高锰酸钾受热制氧气属于哪类反应？",
    }),
    lesson("chem-4-2", "化学变化中的质量关系", [
      "质量守恒定律适用于化学变化",
      "反应前后原子种类、原子数目、原子质量不变",
      "密闭体系中反应前后总质量不变",
      "有气体参加或生成的实验要注意开放体系质量变化",
    ], ["用微粒观点解释质量守恒", "判断天平实验是否密闭", "完成质量差计算"], {
      formulas: ["反应物总质量 = 生成物总质量"],
      experiment: "白磷燃烧或铁钉与硫酸铜溶液反应验证质量守恒。",
      commonMistakes: ["开放容器中气体逸出导致质量变化，却误判质量守恒不成立"],
    }),
    lesson("chem-4-3", "化学方程式", [
      "化学方程式用化学式表示反应物、生成物和条件",
      "配平依据是反应前后原子种类和个数相等",
      "气体符号和沉淀符号要根据反应情境标注",
      "方程式可表示物质质量关系和粒子个数关系",
    ], ["配平 3 个基础方程式", "标出反应条件", "解释方程式中的计量数"], {
      formulas: ["书写步骤：写式、配平、标条件、标状态符号"],
      commonMistakes: ["为配平而改变化学式右下角数字"],
      practice: "配平：H₂ + O₂ -> H₂O。",
    }),
  ]),
  detailedChapter("chem", 5, "第5章 金属的冶炼与利用", "从金属性质、矿物冶炼、防护和资源利用建立材料观。", [
    lesson("chem-5-1", "金属的性质", [
      "多数金属有金属光泽、导电性、导热性和延展性",
      "活泼金属可与氧气、酸或盐溶液发生反应",
      "金属活动性顺序可预测置换反应能否发生",
      "合金通常比纯金属有更适合用途的性能",
    ], ["背常见金属活动性顺序片段", "判断置换反应", "比较纯金属和合金用途"], {
      formulas: ["金属 + 酸 -> 盐 + 氢气（活泼金属）"],
      experiment: "镁、锌、铁与稀酸反应比较活泼性。",
      safety: "金属与酸反应产生氢气，点燃前必须验纯并远离明火。",
      commonMistakes: ["认为所有金属都能与稀盐酸反应放出氢气"],
    }),
    lesson("chem-5-2", "金属矿物与冶炼", [
      "金属常以化合物形式存在于矿石中",
      "工业炼铁常用一氧化碳还原氧化铁",
      "还原反应中含氧化合物失去氧",
      "冶炼要考虑原料、能源、设备和环境影响",
    ], ["认识常见铁矿石", "写出炼铁主要反应", "解释还原剂作用"], {
      formulas: ["Fe₂O₃ + 3CO -> 2Fe + 3CO₂"],
      experiment: "一氧化碳还原氧化铁实验要先通 CO 后加热，结束后继续通 CO 至冷却。",
      safety: "CO 有毒，尾气必须点燃或收集处理。",
      commonMistakes: ["实验顺序错误导致爆炸风险或生成的铁再次被氧化"],
    }),
    lesson("chem-5-3", "金属防护与资源利用", [
      "铁生锈需要同时接触氧气和水",
      "防锈可隔绝氧气或水，如刷漆、涂油、镀层",
      "回收金属能节约资源并减少污染",
      "合理开发矿产要兼顾经济、环境和可持续利用",
    ], ["设计铁钉生锈对比实验", "列出三种防锈方法", "解释废旧金属回收意义"], {
      experiment: "用干燥空气、水、空气和水三组条件比较铁钉生锈。",
      safety: "处理锈蚀金属和酸洗液时要戴手套，避免划伤和腐蚀。",
      commonMistakes: ["认为只有水就能使铁快速生锈，忽略氧气条件"],
    }),
  ]),
];

enhanceLessonInteractions(curriculum);

function detailedChapter(prefix, number, title, overview, lessons) {
  return {
    id: `${prefix}-chapter-${number}`,
    title,
    overview,
    lessons,
  };
}

function lesson(id, title, keyPoints, tasks, extras = {}) {
  return {
    id,
    title,
    keyPoints,
    tasks,
    ...extras,
  };
}

function buildChineseExpressionPoint(unitTitle) {
  if (unitTitle.includes("诗歌")) {
    return "朗读节奏、意象组合和情感落点";
  }
  if (unitTitle.includes("议论") || unitTitle.includes("思辨")) {
    return "论点、论据、论证方法和语言态度";
  }
  if (unitTitle.includes("古诗文")) {
    return "文言实词、句式、翻译和主旨表达";
  }
  if (unitTitle.includes("小说")) {
    return "情节推进、人物形象、环境作用和主题";
  }
  return "语言积累、结构梳理和表达迁移";
}

function buildChineseReadingQuestions(lessonTitle, keyPoints) {
  return [
    `《${stripLessonNumber(lessonTitle)}》最核心的情感、观点或人物变化是什么？请用一句话概括。`,
    `文中哪些词句能体现“${keyPoints[0]}”？请找两处并说明作用。`,
    `作者为什么要采用“${keyPoints[1]}”这样的写法？它对表达主题有什么帮助？`,
  ];
}

function buildChineseWritingTask(unitTitle, lessonTitle) {
  const cleanTitle = stripLessonNumber(lessonTitle);
  if (unitTitle.includes("诗歌")) {
    return `仿照《${cleanTitle}》的意象组织方式，写一段 80 字以内的抒情片段。`;
  }
  if (unitTitle.includes("议论") || unitTitle.includes("思辨")) {
    return `围绕《${cleanTitle}》中的一个观点，写一段“观点 + 例子 + 小结”的议论片段。`;
  }
  if (unitTitle.includes("古诗文")) {
    return `选取《${cleanTitle}》中的一个主旨句或画面，写 80 字赏析或现代转述。`;
  }
  if (unitTitle.includes("小说")) {
    return `借鉴《${cleanTitle}》的人物或环境描写方法，写一个体现人物性格的小片段。`;
  }
  return `从《${cleanTitle}》提取一个表达方法，写一段可放进作文的素材片段。`;
}

function stripLessonNumber(title) {
  return title.replace(/^\d+\s*/, "");
}

function makeChapter(prefix, number, title, lessonTitles, overview) {
  return {
    id: `${prefix}-chapter-${number}`,
    title,
    overview,
    lessons: lessonTitles.map((lessonTitle, index) => ({
      id: `${prefix}-${number}-${index + 1}`,
      title: lessonTitle,
      keyPoints: buildKeyPoints(lessonTitle),
      tasks: ["读懂概念", "整理易错点", "完成 2 道基础题"],
    })),
  };
}

function buildKeyPoints(title) {
  return [
    `${title}的核心概念`,
    `${title}的典型题型`,
    `${title}的易错判断`,
  ];
}

function enrichEnglishUnits(units) {
  const extraWordsByUnit = {
    2: [
      w("or", "conj. 或者"),
      w("worried", "adj. 担心的；发愁的"),
      w("if", "conj. 如果；是否"),
      w("as", "prep.&adv. 作为；当作；像"),
      w("rainbow", "n. 彩虹"),
      w("indigo", "n. 靛蓝，靛青"),
      w("violet", "n. 紫罗兰色"),
      w("characteristic", "n. 特征，特点"),
      w("remind", "vt. 提醒；使想起"),
      w("cheer up", "使振作起来"),
      w("green with envy", "妒忌的，眼红的"),
      w("envy", "n.&vt. 妒忌，羡慕"),
      w("wedding", "n. 婚礼，结婚庆典"),
      w("suggest", "vt. 建议；暗示"),
      w("trust", "n.&vt. 信任"),
      w("warmth", "n. 温暖；热情"),
      w("handbag", "n. 女用皮包，手提包"),
      w("match", "vt. 相配；般配"),
      w("stressed", "adj. 焦虑不安的；心力交瘁"),
      w("practise", "vt.&vi. 练习；训练"),
      w("would rather", "宁愿，宁可"),
      w("teens", "n. 十几岁"),
      w("certainly", "adv. 当然；必定"),
      w("have difficulty doing something", "做某事费劲"),
    ],
    3: [
      w("but", "conj. 但是"),
      w("deal", "vi. 处理；应付"),
      w("deal with", "处理，对付"),
      w("stay up", "熬夜"),
      w("stay out", "待在户外；不回家"),
      w("work out", "算出；解决"),
      w("according to", "根据"),
      w("whom", "pron. 谁（宾格）"),
      w("laugh at", "嘲笑"),
      w("bookworm", "n. 书虫，书呆子"),
      w("go over", "复习；回顾"),
      w("aloud", "adv. 大声地；出声地"),
      w("pronunciation", "n. 发音"),
      w("don't mention it", "不客气"),
      w("score", "n. 得分；分数"),
      w("get on with", "与……和睦相处"),
      w("get along with", "与……和睦相处"),
      w("make a list", "列清单"),
      w("share your worries", "分担你的烦恼"),
      w("ask for advice", "征求建议"),
    ],
    4: [
      w("hope", "n.&v. 希望"),
      w("stand", "n. 看台；摊位；v. 站立"),
      w("junior high", "n. 初级中学"),
      w("senior high", "n. 高级中学"),
      w("on one's mind", "挂在心上；惦念"),
      w("a great deal of", "大量，许多"),
      w("try out for", "参加……选拔"),
      w("lose heart", "泄气，灰心"),
      w("succeed", "vi. 成功"),
      w("succeed in", "成功地做某事"),
      w("junior college", "n. 两年制专科学校"),
      w("simply", "adv. 仅仅；简直"),
      w("although", "conj. 尽管，虽然"),
      w("take notice of", "注意，察觉"),
      w("break out", "爆发"),
      w("go into hiding", "躲藏起来"),
      w("Jew", "n. 犹太人"),
      w("Nazi", "n. 纳粹分子"),
      w("die of", "死于（疾病等内因）"),
      w("die from", "死于（事故等外因）"),
      w("surprise", "n.&vt. 惊奇；使惊讶"),
      w("cancer", "n. 癌症"),
      w("cell", "n. 细胞"),
      w("change one's mind", "改变主意"),
      w("as soon as", "一……就……"),
    ],
    5: [
      w("art form", "n. 艺术形式"),
      w("pop", "n. 流行音乐"),
      w("musical", "adj. 音乐的"),
      w("talent", "n. 天赋，才能"),
      w("stone", "n. 石头"),
      w("highly", "adv. 高度地；非常"),
      w("breath", "n. 呼吸"),
      w("out of breath", "气喘吁吁"),
      w("dividing line", "n. 分界线"),
      w("be known for", "因……而著名"),
      w("be famous for", "因……而著名"),
      w("last", "vi. 持续"),
      w("drum", "n. 鼓"),
      w("guitar", "n. 吉他"),
      w("country", "n. 乡村音乐；国家"),
      w("country music", "n. 乡村音乐"),
      w("cowboy", "n. 牛仔"),
      w("rock", "n. 摇滚乐"),
      w("African American", "n. 非裔美国人"),
      w("American", "adj. 美国的"),
      w("make up", "编造；创作；组成"),
      w("have a gift for", "对……有天赋"),
      w("gift", "n. 天赋；礼物"),
      w("encourage", "vt. 鼓励"),
      w("done", "adj. 完成的"),
    ],
    6: [
      w("chat show", "n. 访谈节目"),
      w("game show", "n. 游戏表演，竞赛节目"),
      w("real-life", "adj. 真实生活的"),
      w("a number of", "一些，许多"),
      w("horror", "n. 恐怖"),
      w("murderer", "n. 杀人犯"),
      w("text message", "n. 短信"),
      w("roundup", "n. 摘要，概要"),
      w("music video", "n. 音乐视频"),
      w("gun", "n. 枪"),
      w("burglar", "n. 入室窃贼"),
      w("twin", "n. 双胞胎之一"),
      w("waste", "n. 浪费；废物"),
      w("silly", "adj. 傻的，愚蠢的"),
      w("view", "n. 看法；景色"),
      w("minibus", "n. 小型公共汽车"),
      w("male", "adj. 男性的；雄性的"),
      w("polar bear", "n. 北极熊"),
      w("attack", "vt.&n. 攻击，袭击"),
      w("be full of horror", "充满恐怖"),
      w("take a close look at", "近距离观察"),
    ],
    7: [
      w("kung fu", "n. 功夫，武术"),
      w("DVD", "n. 数字影碟"),
      w("humanitarian", "n. 人道主义者"),
      w("ballet", "n. 芭蕾舞"),
      w("charm", "n. 魅力"),
      w("base", "vt. 以……为基础"),
      w("play the role of", "扮演……角色"),
      w("princess", "n. 公主"),
      w("angel", "n. 天使"),
      w("pass away", "去世"),
      w("car park", "n. 停车场"),
      w("row", "n. 排，行"),
      w("amazed", "adj. 大为惊奇的"),
      w("mistake", "vt. 误以为；n. 错误"),
      w("mistake for", "把……误认为……"),
      w("rush hour", "n. 交通高峰期"),
      w("tale", "n. 故事，传说"),
      w("dinosaur", "n. 恐龙"),
      w("fall in love with", "爱上……"),
      w("special offer", "n. 特价优惠"),
      w("stuntman", "n. 特技替身演员"),
      w("action film", "n. 动作片"),
      w("science fiction", "n. 科幻小说；科幻片"),
      w("so that", "以便；结果"),
      w("such that", "如此……以至于"),
      w("in your dreams", "你做梦；不可能"),
      w("catch someone's attention", "引起某人的注意"),
    ],
    8: [
      w("police officer", "n. 警官"),
      w("clue", "n. 线索"),
      w("missing", "adj. 缺少的；失踪的"),
      w("victim", "n. 受害者，罹难者"),
      w("confirm", "vt. 证实，确认"),
      w("contact", "vt. 联系"),
      w("system", "n. 系统"),
      w("charge", "vt. 指控；收费"),
      w("break into", "强行闯入"),
      w("witness", "n. 目击者；证人"),
      w("report", "vt.&n. 报道，报告"),
      w("only", "adj. 仅有的；唯一的"),
      w("in a hurry", "急忙，赶快"),
      w("hurry", "n.&vi. 匆忙，急忙"),
      w("have nothing to do with", "与……无关"),
      w("turn out", "原来是；结果是"),
      w("female", "adj. 女的；雌性的"),
      w("in prison", "坐牢"),
      w("prison", "n. 监狱"),
      w("guard against", "防范，提防"),
      w("lock", "vt. 锁上"),
      w("shut", "vt. 关上，封闭"),
      w("necklace", "n. 项链"),
      w("theft", "n. 偷窃"),
      w("jewellery", "n. 珠宝"),
      w("steal", "vt. 偷，窃取"),
      w("well-paid", "adj. 收入高的"),
    ],
  };

  units.forEach((unit, index) => {
    const seen = new Set(unit.words.map((item) => (typeof item === "string" ? item : item.word)));
    for (const item of extraWordsByUnit[index + 1] ?? []) {
      if (!seen.has(item.word)) {
        unit.words.push(item);
        seen.add(item.word);
      }
    }
  });
}

function w(word, cn) {
  return { word, cn };
}

function normalizeEnglishWord(entry) {
  if (typeof entry === "string") {
    const cn = getEnglishMeaning(entry) ?? "释义待校对";
    return {
      word: entry,
      cn,
      meaning: cn,
      sourceStatus: cn === "释义待校对" ? "pending" : "curated",
    };
  }

  return {
    ...entry,
    meaning: entry.cn,
    sourceStatus: "wordlist",
  };
}

function getEnglishMeaning(word) {
  return {
    colour: "n. 颜色",
    mood: "n. 心情，情绪",
    influence: "vt. 影响",
    whether: "conj. 是否",
    calm: "adj. 平静的；沉着的",
    relaxed: "adj. 放松的；自在的",
    peace: "n. 安宁；和平",
    sadness: "n. 悲哀，忧伤",
    purity: "n. 纯洁",
    wisdom: "n. 智慧",
    strength: "n. 力量；长处",
    heat: "n. 热；高温",
    difficulty: "n. 困难",
    decision: "n. 决定",
    relationship: "n. 关系",
    everyday: "adj. 每天的；日常的",
    personal: "adj. 个人的；私人的",
    suit: "vt. 适合",
    celebration: "n. 庆祝；庆祝活动",
    ancient: "adj. 古代的",
    therapy: "n. 疗法；治疗",
    discover: "vt. 发现",
    promise: "vt.&vi. 承诺；允诺",
    otherwise: "adv. 否则",
    work: "vi. 奏效；产生预期效果",
    require: "vt. 需要，要求",
    feeling: "n. 感觉，感受",
    prefer: "vt. 宁愿选择；更喜欢",
    create: "vt. 造成，引起；创造",
    balance: "n. 平衡",
    teenage: "adj. 青少年的",
    mark: "n. 分数；标记",
    mad: "adj. 发疯的；生气的",
    exam: "n. 考试，测试",
    perhaps: "adv. 或许，可能",
    choice: "n. 选择",
    awake: "adj. 醒着的",
    hardly: "adv. 几乎不",
    imagine: "vt.&vi. 想象，设想",
    doubt: "vt. 怀疑",
    worth: "adj. 值得；有价值",
    suggestion: "n. 建议",
    cause: "n. 原因；vt. 造成",
    strict: "adj. 严格的，严厉的",
    schoolwork: "n. 课业",
    valuable: "adj. 宝贵的；贵重的",
    friendship: "n. 友谊",
    list: "n. 清单",
    silence: "n. 安静，沉默",
    worry: "n.&v. 担心，令人担忧",
    method: "n. 方法",
    solve: "vt. 解决，解答",
    dictionary: "n. 字典",
    reply: "n.&vi. 答复，回答",
    chemistry: "n. 化学",
    progress: "n. 进步，进展",
    pronounce: "vt. 发音",
    correctly: "adv. 正确地",
    mention: "vt. 提及，说起",
    stress: "n. 精神压力；紧张",
    time: "n. 时期，时代；时间",
    whenever: "conj. 无论何时",
    through: "prep. 凭借；穿过",
    deal: "n. 很多；协议；vi. 处理",
    career: "n. 生涯，职业",
    against: "prep. 对抗；与……相反",
    record: "n. 记录；纪录",
    victory: "n. 胜利",
    spirit: "n. 精神；幽灵",
    courage: "n. 勇气",
    university: "n. 大学",
    national: "adj. 国家的",
    championship: "n. 锦标赛，大赛",
    scholarship: "n. 奖学金",
    graduate: "vi. 毕业",
    force: "vt. 强迫，迫使",
    league: "n. 联盟，联赛",
    remain: "vi. 逗留；保持不变",
    achievement: "n. 成就，成绩",
    prove: "vt. 证明",
    matter: "vi. 要紧，有重大影响",
    symbol: "n. 象征",
    survive: "vi.&vt. 幸存；生存",
    admire: "vt. 钦佩；羡慕",
    research: "n. 研究；调查",
    death: "n. 死，死亡",
    German: "adj. 德国的；n. 德国人",
    thought: "n. 想法，看法",
    unusual: "adj. 不寻常的",
    leader: "n. 领导者",
    art: "n. 艺术",
    pleasant: "adj. 令人愉快的",
    drama: "n. 戏剧；戏剧性事件",
    photography: "n. 摄影",
    musician: "n. 音乐家",
    central: "adj. 中心的，中央的",
    instrument: "n. 乐器；工具",
    common: "adj. 普通的，常见的",
    object: "n. 物品；目标",
    praise: "n.&vt. 表扬，赞扬",
    winner: "n. 获胜者",
    present: "vt. 颁发；提交；adj. 出席的",
    traditional: "adj. 传统的",
    bell: "n. 钟，铃",
    though: "conj. 虽然，尽管",
    boundary: "n. 边界，疆界",
    medal: "n. 奖牌，奖章",
    composer: "n. 作曲家",
    control: "vt. 控制，支配",
    flow: "n. 流动；vi. 流动",
    successfully: "adv. 成功地",
    lasting: "adj. 持久的",
    value: "n. 价值",
    African: "adj. 非洲的",
    tonight: "adv. 今晚",
    literature: "n. 文学",
    concert: "n. 音乐会",
    folk: "adj. 民间的；民俗的",
    classical: "adj. 古典的",
    jazz: "n. 爵士乐",
    programme: "n. 节目",
    weekly: "adj. 每周的",
    "round-up": "n. 摘要，概要",
    "up-to-date": "adj. 最新的；现代的",
    fan: "n. 迷，狂热爱好者",
    coming: "adj. 即将来临的",
    cover: "vt. 报道；覆盖",
    live: "adv. 在现场直播；adj. 现场直播的",
    Asian: "adj. 亚洲的；n. 亚洲人",
    unless: "conj. 除非",
    wealthy: "adj. 富有的",
    mystery: "n. 神秘；疑案故事",
    might: "modal v. 或许，可能",
    scared: "adj. 害怕的，恐惧的",
    scene: "n. 景象；现场",
    direct: "vt. 导演；指导",
    director: "n. 导演",
    latest: "adj. 最新的；最近的",
    vote: "vi. 投票，选举",
    announce: "vt. 宣布，宣告",
    text: "n. 文本；短信",
    message: "n. 消息，音信",
    murder: "n. 谋杀",
    documentary: "n. 纪录片",
    dialogue: "n. 对话",
    comedy: "n. 喜剧",
    series: "n. 系列节目",
    viewer: "n. 观众",
    studio: "n. 录音室；演播室",
    film: "n. 电影",
    industry: "n. 工业；行业",
    storyteller: "n. 讲故事的人",
    superstar: "n. 超级明星",
    romantic: "adj. 浪漫的",
    western: "n. 西部电影；adj. 西方的",
    actor: "n. 男演员",
    actress: "n. 女演员",
    loss: "n. 丧失，损失；失败",
    final: "adj. 最终的",
    dancer: "n. 舞蹈者",
    lead: "n. 主角；领先地位；v. 带领",
    role: "n. 角色",
    lifetime: "n. 终身，一生",
    nomination: "n. 提名",
    appearance: "n. 出现；外貌",
    beyond: "prep. 超出，除……之外",
    effort: "n. 努力",
    peacefully: "adv. 宁静地；和平地",
    insist: "vi.&vt. 坚持认为；坚持",
    attractive: "adj. 漂亮的，有吸引力的",
    major: "adj. 主要的；较大的",
    cancel: "vt. 取消，终止",
    stupid: "adj. 愚蠢的",
    consider: "vt. 认为；考虑",
    "all-time": "adj. 空前的；历来的",
    script: "n. 剧本",
    talent: "n. 天赋，才能",
    detective: "n. 侦探",
    suspect: "n. 嫌疑犯",
    medium: "adj. 中等的",
    untidy: "adj. 不整洁的",
    guilty: "adj. 有罪的",
    truth: "n. 事实，真相",
    guess: "vt. 猜，猜测",
    lie: "vi. 说谎",
    enemy: "n. 敌人",
    single: "adj. 单身的；单个的",
    somewhere: "adv. 在某处",
    wound: "n. 伤口",
    bleed: "vi. 流血，出血",
    suppose: "vt. 猜想，假定，料想",
    breathe: "vi.&vt. 呼吸",
    heavily: "adv. 沉重地；猛烈地",
    reward: "n. 报酬，奖金",
    arrest: "vt. 逮捕",
    couple: "n. 夫妇；一对",
    probably: "adv. 大概，或许",
    criminal: "n. 罪犯",
    fingerprint: "n. 指纹",
    boss: "n. 老板，上司",
    commit: "vt. 犯罪；承诺",
    crime: "n. 犯罪活动；罪行",
    kidnap: "vt. 绑架，劫持",
    wealth: "n. 财富",
    safety: "n. 安全，保险",
    guard: "vt. 守卫，保卫",
  }[word];
}

function buildWordlistFlashcards(unit, prefix) {
  return unit.dailyWords.flatMap((day) => day.words).map((entry, index) => {
    const partOfSpeech = extractPartOfSpeech(entry.cn);
    const example = buildEnglishExample(entry, partOfSpeech, unit.overview);
    return {
      id: `${prefix}-${index + 1}-${slugEnglish(entry.word)}`,
      word: entry.word,
      phonetic: entry.phonetic ?? "",
      meaning: entry.cn,
      partOfSpeech,
      example: example.en,
      exampleEn: example.en,
      exampleCn: example.cn,
      collocation: example.collocation,
      dictationPrompt: buildDictationPrompt(entry.word, entry.cn),
      unit: unit.title,
      sourceStatus: entry.sourceStatus,
    };
  });
}

function buildEnglishExample(entry, partOfSpeech, unitFocus) {
  const word = entry.word;
  const meaning = stripMeaningLabel(entry.cn);
  const lower = word.toLowerCase();

  const curated = {
    creative: {
      en: "A creative student can come up with new ideas.",
      cn: "有创造力的学生能想出新点子。",
      collocation: "creative idea / creative student",
    },
    curious: {
      en: "Curious students often ask good questions.",
      cn: "好奇的学生常常会提出好问题。",
      collocation: "be curious about",
    },
    energetic: {
      en: "She is energetic enough to finish the work.",
      cn: "她精力充沛，足以完成这项工作。",
      collocation: "energetic enough to do",
    },
    modest: {
      en: "A modest person does not show off.",
      cn: "谦虚的人不会炫耀。",
      collocation: "a modest person",
    },
    organized: {
      en: "An organized student keeps everything in order.",
      cn: "有条理的学生会把一切安排得井然有序。",
      collocation: "keep ... in order",
    },
    "pay attention to": {
      en: "Please pay attention to the spelling of this word.",
      cn: "请注意这个单词的拼写。",
      collocation: "pay attention to spelling",
    },
    "come up with": {
      en: "He came up with a useful plan.",
      cn: "他想出了一个有用的计划。",
      collocation: "come up with an idea",
    },
    "neither...nor...": {
      en: "Neither he nor I am careless.",
      cn: "他和我都不粗心。",
      collocation: "neither ... nor ...",
    },
    "either...or...": {
      en: "Either you or I will clean the room.",
      cn: "要么你要么我来打扫房间。",
      collocation: "either ... or ...",
    },
  }[lower];
  if (curated) return curated;

  if (word.includes("...")) {
    return {
      en: `We can use the pattern "${word}" to join two ideas.`,
      cn: `我们可以用“${word}”这个句型连接两个意思。`,
      collocation: word,
    };
  }

  if (word.includes(" ") || word.includes("'")) {
    return {
      en: `Try to use "${word}" in your own sentence.`,
      cn: `试着把“${word}”用进自己的句子里。`,
      collocation: word,
    };
  }

  if (/adj\./.test(partOfSpeech)) {
    return {
      en: `The ${unitFocus} topic helps us understand the word "${word}".`,
      cn: `“${unitFocus}”这个话题能帮助我们理解“${word}”这个词。`,
      collocation: `${word} + noun`,
    };
  }

  if (/adv\./.test(partOfSpeech)) {
    return {
      en: `Use "${word}" to make the action clearer.`,
      cn: `用“${word}”可以把动作说得更清楚。`,
      collocation: `${word} + verb / verb + ${word}`,
    };
  }

  if (/v\.|vt\.|vi\./.test(partOfSpeech)) {
    return {
      en: `Can you ${word} the answer in English?`,
      cn: `你能用英语${meaning}这个答案吗？`,
      collocation: `${word} + object`,
    };
  }

  return {
    en: `This unit teaches us the word "${word}".`,
    cn: `本单元会学习“${word}”这个词，意思是“${meaning}”。`,
    collocation: `${word} in context`,
  };
}

function buildDictationPrompt(word, meaning) {
  return `看中文“${stripMeaningLabel(meaning)}”，听写或拼写英文“${word}”，再口头造一个短句。`;
}

function stripMeaningLabel(meaning) {
  return meaning
    .replace(/^(v\.&n\.|n\.&v\.|adj\.|adv\.|conj\.|vt\.|vi\.&vt\.|vi\.|n\.|v\.)\s*/, "")
    .replace(/^（[^）]+）/, "")
    .trim();
}

function slugEnglish(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractPartOfSpeech(meaning) {
  const match = meaning.match(/^(v\.&n\.|n\.&v\.|adj\.|adv\.|conj\.|vt\.|n\.|v\.)/);
  return match?.[0] ?? "word / phrase";
}

function chunkWords(words, size) {
  const chunks = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size));
  }
  return chunks;
}

function buildEnglishTranslationDrills(unitNumber, title, focus, words, phrases, sentencePatterns) {
  const normalizedWords = words.map(normalizeEnglishWord);
  const [firstWord, secondWord, thirdWord, fourthWord] = normalizedWords;
  const [firstPhrase, secondPhrase, thirdPhrase] = phrases;
  const [firstPattern, secondPattern] = sentencePatterns;
  const cleanTitle = title.replace(/^Unit\s+\d+\s*/, "");
  const wordCn = (entry) => stripMeaningLabel(entry?.cn ?? entry?.meaning ?? "核心词");
  const wordEn = (entry) => entry?.word ?? "word";

  return [
    {
      id: `eng-unit-${unitNumber}-translation-1`,
      direction: "cn-en",
      focus: wordEn(firstWord),
      prompt: `中译英：在“${focus}”话题中，我能正确使用“${wordCn(firstWord)}”这个词。`,
      answer: `I can use the word "${wordEn(firstWord)}" correctly in the topic of ${cleanTitle}.`,
      hint: `先确定关键词“${wordCn(firstWord)}”对应 ${wordEn(firstWord)}，再补完整主谓宾。`,
      explanation: "中译英先抓关键词，再检查句子是否有主语、谓语和语境。",
    },
    {
      id: `eng-unit-${unitNumber}-translation-2`,
      direction: "en-cn",
      focus: wordEn(secondWord),
      prompt: `英译中：This unit helps me understand "${wordEn(secondWord)}" and use it in a sentence.`,
      answer: `本单元帮助我理解“${wordEn(secondWord)}（${wordCn(secondWord)}）”，并把它用在句子里。`,
      hint: `不要逐词硬翻，先找核心词 ${wordEn(secondWord)}。`,
      explanation: "英译中要保留句子意思，再把核心词的中文释义说准确。",
    },
    {
      id: `eng-unit-${unitNumber}-translation-3`,
      direction: "phrase",
      focus: firstPhrase,
      prompt: `短语造句：用 ${firstPhrase} 翻译“我会在预习时使用这个短语”。`,
      answer: `I can use "${firstPhrase}" when I preview this unit.`,
      hint: `短语 ${firstPhrase} 要作为整体记忆，不要拆开翻译。`,
      explanation: "短语题先保证固定搭配完整，再检查时态和主语。",
    },
    {
      id: `eng-unit-${unitNumber}-translation-4`,
      direction: "cn-en",
      focus: firstPattern,
      prompt: `中译英：用句型“${firstPattern}”表达一个和“${focus}”有关的观点。`,
      answer: buildPatternSentence(firstPattern, focus, wordEn(thirdWord), secondPhrase),
      hint: `先套句型 ${firstPattern}，再替换关键词。`,
      explanation: "句型翻译不追求复杂，先保证结构正确，再换词扩展。",
    },
    {
      id: `eng-unit-${unitNumber}-translation-5`,
      direction: "en-cn",
      focus: secondPhrase,
      prompt: `英译中：When I meet a problem, I try to ${secondPhrase} and explain it clearly.`,
      answer: `当我遇到问题时，我会努力${translatePhraseMeaning(secondPhrase)}，并把它解释清楚。`,
      hint: `先把 ${secondPhrase} 当作整体短语，再处理前后句意。`,
      explanation: "遇到短语时先整块翻译，避免只翻单个单词导致意思偏掉。",
    },
    {
      id: `eng-unit-${unitNumber}-translation-6`,
      direction: "phrase",
      focus: thirdPhrase ?? secondPattern ?? wordEn(fourthWord),
      prompt: `综合翻译：用 1 个本单元短语和 1 个核心词，写一句 8-14 个词的英文。`,
      answer: `I can ${thirdPhrase ?? firstPhrase} and use "${wordEn(fourthWord)}" correctly.`,
      hint: `先选短语，再放入核心词 ${wordEn(fourthWord)}。`,
      explanation: "综合翻译要求短语完整、核心词准确、句子有明确主语和谓语。",
    },
  ];
}

function buildPatternSentence(pattern, focus, word, phrase) {
  if (/Neither/.test(pattern)) {
    return `Neither the word "${word}" nor the phrase "${phrase}" should be ignored in ${focus}.`;
  }
  if (/Either/.test(pattern)) {
    return `Either the word "${word}" or the phrase "${phrase}" can help me talk about ${focus}.`;
  }
  if (/It is/.test(pattern)) {
    return `It is useful of me to learn "${word}" carefully.`;
  }
  if (/would rather/i.test(pattern)) {
    return `I would rather practise translation than copy the answers.`;
  }
  if (/prefer/i.test(pattern)) {
    return `I prefer using "${word}" in a sentence to only reading it.`;
  }
  if (/If|Unless/.test(pattern)) {
    return `If I use "${word}" correctly, my translation will be clearer.`;
  }
  if (/Although|Though/i.test(pattern)) {
    return `Although "${word}" is new to me, I can use it in a sentence.`;
  }
  if (/so|such/i.test(pattern)) {
    return `The sentence is so clear that I can translate it correctly.`;
  }
  if (/who|which|that|Relative|定语/.test(pattern)) {
    return `The word that I learned today is "${word}".`;
  }
  return `I can use "${word}" to talk about ${focus}.`;
}

function translatePhraseMeaning(phrase) {
  const phraseMeanings = {
    "keep...in order": "使内容保持井然有序",
    "make a decision": "做决定",
    "stay up": "熬夜",
    "lose heart": "灰心",
    "make music with common objects": "用普通物品创作音乐",
    "be covered live": "被现场直播",
    "catch one's attention": "吸引某人的注意",
    "break into": "闯入",
  };

  return phraseMeanings[phrase] ?? `使用“${phrase}”这个短语`;
}

function buildEnglishGrammarNotes(unitNumber) {
  const notes = {
    1: [
      {
        title: "并列连词 either...or... / neither...nor...",
        explanation: "连接两个并列成分，作主语时谓语通常遵循就近原则。",
        example: "Neither you nor he is careless.",
        drill: "用 neither...nor... 改写：You are not wrong. He is not wrong.",
      },
      {
        title: "It is + adj. + of sb. + to do sth.",
        explanation: "形容词评价人的品质时常用 of，如 kind、careful、modest。",
        example: "It is creative of him to come up with a new idea.",
        drill: "用 modest 造一句评价人物品质的句子。",
      },
    ],
    2: [
      {
        title: "would rather ... than ...",
        explanation: "表示宁愿做前者而不愿做后者，than 后接动词原形。",
        example: "I would rather wear blue than pink.",
        drill: "用 would rather 描述一个颜色选择。",
      },
      {
        title: "prefer ... to ... / prefer to do",
        explanation: "prefer A to B 表示比起 B 更喜欢 A；to 后可接名词或动名词。",
        example: "She prefers reading to watching TV.",
        drill: "用 prefer ... to ... 写一句学习偏好。",
      },
    ],
    3: [
      {
        title: "疑问词 + to do",
        explanation: "how/what/when/where + to do 可作宾语，表达“怎样/什么/何时做”。",
        example: "I do not know how to deal with the problem.",
        drill: "用 what to do 或 how to do 写一个困惑。",
      },
      {
        title: "提建议句型",
        explanation: "Why not do...? / What about doing...? 常用于给建议。",
        example: "Why not ask your teacher for help?",
        drill: "给一个熬夜学习的同学写两条建议。",
      },
    ],
    4: [
      {
        title: "时间状语从句",
        explanation: "before、after、when、while、since、until 引导时间关系，注意主从句动作顺序。",
        example: "Spud practised hard before he became a great player.",
        drill: "用 before 和 until 各写一句成长经历。",
      },
      {
        title: "让步与转折表达",
        explanation: "although/though 表示虽然，不能和 but 在同一句中重复使用。",
        example: "Although he was small, he never lost heart.",
        drill: "用 although 写一句逆境坚持。",
      },
    ],
    5: [
      {
        title: "原因状语从句",
        explanation: "because、since、as 都可表示原因，because 语气最直接。",
        example: "Tan Dun is famous because he makes music with common objects.",
        drill: "用 because 解释你喜欢的一种艺术形式。",
      },
      {
        title: "让步状语从句",
        explanation: "though/although 引导让步，表达“虽然……但是含义”。",
        example: "Though the music is simple, it has a lasting value.",
        drill: "用 though 描述一件看似普通但有价值的事。",
      },
    ],
    6: [
      {
        title: "if / unless 条件句",
        explanation: "if 表示如果，unless 表示除非；主句用将来意义时，从句常用一般现在时。",
        example: "You will miss the programme unless you hurry up.",
        drill: "把 if not 改写成 unless。",
      },
      {
        title: "while doing 省略结构",
        explanation: "当主从句主语一致时，可用 while doing 表示“当……时”。",
        example: "While watching TV, I took some notes.",
        drill: "用 while doing 写一句看节目时的动作。",
      },
    ],
    7: [
      {
        title: "although / though",
        explanation: "用于电影人物或情节评价，表达让步关系。",
        example: "Although she was very tired, she kept working.",
        drill: "用 although 描述演员坚持拍摄。",
      },
      {
        title: "so...that... / such...that...",
        explanation: "so 修饰形容词或副词，such 修饰名词短语，都表示“如此……以至于”。",
        example: "The film was so moving that many people cried.",
        drill: "分别用 so...that 和 such...that 写一句。",
      },
    ],
    8: [
      {
        title: "定语从句 who / which / that",
        explanation: "who 指人，which 指物，that 常可指人或物，用来修饰前面的名词。",
        example: "The man who wears a coat is the suspect.",
        drill: "用 who 和 which 各写一个侦探故事线索。",
      },
      {
        title: "被动语态线索表达",
        explanation: "was/were + 过去分词可描述案件中发生的动作。",
        example: "The victim was wounded with a knife.",
        drill: "用 was/were done 写一句案情描述。",
      },
    ],
  };

  return notes[unitNumber] ?? [];
}

function enrichEnglishGrammarNotes(unitNumber, notes) {
  const thirdNotes = {
    1: {
      title: "评价人物品质的形容词",
      explanation: "careful、creative、modest 等可评价人的品质，常和 of sb. 搭配。",
      example: "It is patient of her to explain the answer again.",
      drill: "用 careful / energetic / organized 各造一个评价人物的短句。",
      checkpoint: "检查形容词是否评价人，而不是只描述事情本身。",
    },
    2: {
      title: "宾语从句中的颜色选择表达",
      explanation: "think、believe、wonder 后可接从句表达观点或疑问，保持陈述句语序。",
      example: "I wonder whether blue can make me feel calm.",
      drill: "用 whether 写一句关于颜色和心情的疑问。",
      checkpoint: "检查从句语序是否为主语在前、谓语在后。",
    },
    3: {
      title: "宾语从句语序",
      explanation: "疑问句进入宾语从句后要改为陈述句语序。",
      example: "Can you tell me when the exam starts?",
      drill: "把 When does the exam start? 改成宾语从句。",
      checkpoint: "检查连接词后面是否直接跟主语，而不是疑问倒装。",
    },
    4: {
      title: "since / till / until 的时间线",
      explanation: "since 强调从过去到现在，till/until 强调动作持续到某时。",
      example: "He has practised basketball since he was young.",
      drill: "用 since 和 until 各写一句学习经历。",
      checkpoint: "检查句子表达的是起点还是终点。",
    },
    5: {
      title: "so that 目的状语从句",
      explanation: "so that 可表示目的，后面常接 can / could / will 等情态或助动词。",
      example: "He practises every day so that he can play better.",
      drill: "用 so that 写一句练习某项技能的目的。",
      checkpoint: "检查 so that 后面是否说明目的，而不是单纯结果。",
    },
    6: {
      title: "直接引语与间接引语初步",
      explanation: "转述节目内容或他人话语时，要注意人称、时态和语序变化。",
      example: "The host says that the programme starts at eight.",
      drill: "把 He says, 'I like documentaries.' 改成间接引语。",
      checkpoint: "检查人称是否跟说话者变化。",
    },
    7: {
      title: "although 与 so...that 的表达选择",
      explanation: "although 表示让步，so...that 表示程度导致结果，不能混用逻辑。",
      example: "Although the film is old, it is still popular.",
      drill: "分别用 although 和 so...that 写电影评价。",
      checkpoint: "检查句子是在表达转折，还是表达结果。",
    },
    8: {
      title: "限制性定语从句",
      explanation: "who、which、that 引导定语从句，紧跟被修饰的先行词。",
      example: "The clue that the detective found was important.",
      drill: "用 that 写一句描述线索的句子。",
      checkpoint: "检查从句是否真正修饰前面的名词。",
    },
  };
  const checkpointByTitle = (title) => {
    if (/either|neither|prefer|would rather/.test(title)) {
      return "检查连接的两个成分形式是否一致。";
    }
    if (/It is|疑问词|宾语从句|定语从句|who|which|that/.test(title)) {
      return "检查语序、连接词和被修饰对象是否清楚。";
    }
    if (/时间|since|until|while|if|unless|so that/.test(title)) {
      return "检查主从句的时间、条件或目的关系是否正确。";
    }
    if (/although|though|让步|原因|because/.test(title)) {
      return "检查逻辑关系是否清楚，避免连词重复。";
    }
    return "检查能否换主语、换场景后仍然说对。";
  };

  return [...notes.map((note) => ({ ...note, checkpoint: note.checkpoint ?? checkpointByTitle(note.title) })), thirdNotes[unitNumber]].map(
    (note, index) => ({
      ...note,
      miniQuiz: buildGrammarMiniQuiz(unitNumber, note, index + 1),
    }),
  );
}

function buildGrammarMiniQuiz(unitNumber, note, noteIndex) {
  const baseId = `eng-unit-${unitNumber}-grammar-${noteIndex}`;
  const lowerTitle = note.title.toLowerCase();
  let choices = ["连接词、语序和搭配都正确", "只要出现关键词就一定正确", "句子越长语法越完整"];
  let answer = "连接词、语序和搭配都正确";
  let question = `学习“${note.title}”后，哪一项检查更有用？`;

  if (/neither|either/.test(lowerTitle)) {
    question = "使用 either...or... / neither...nor... 时，哪项最需要检查？";
    choices = ["连接成分是否并列，作主语时谓语看靠近的一项", "两个词可以随便拆开使用", "neither 后面一定接复数谓语"];
    answer = "连接成分是否并列，作主语时谓语看靠近的一项";
  } else if (/it is/.test(lowerTitle)) {
    question = "It is + adj. + of sb. + to do sth. 最适合表达什么？";
    choices = ["评价人的品质或行为特点", "说明地点在哪里", "表示将来要发生的动作"];
    answer = "评价人的品质或行为特点";
  } else if (/prefer|would rather/.test(lowerTitle)) {
    question = "表达偏好时，哪项搭配更需要注意？";
    choices = ["prefer A to B / would rather do than do 的前后形式", "prefer 后面不能接任何动词", "than 后面必须接完整从句"];
    answer = "prefer A to B / would rather do than do 的前后形式";
  } else if (/宾语从句|疑问词/.test(note.title)) {
    question = "宾语从句或“疑问词 + to do”预习时，哪项最关键？";
    choices = ["连接词后保持陈述语序或正确非谓语结构", "疑问词后必须倒装", "从句里不需要主语"];
    answer = "连接词后保持陈述语序或正确非谓语结构";
  } else if (/if|unless|时间|since|until|while|so that/.test(lowerTitle)) {
    question = "状语从句类句型最容易错在哪里？";
    choices = ["没有分清时间、条件、目的和主从句关系", "所有从句都只能放句首", "连词越多逻辑越清楚"];
    answer = "没有分清时间、条件、目的和主从句关系";
  } else if (/although|though|because|原因|让步/.test(lowerTitle)) {
    question = "原因/让步关系的句子最应该避免什么？";
    choices = ["逻辑重复或连词搭配冲突", "句子里出现 because", "句子有两个分句"];
    answer = "逻辑重复或连词搭配冲突";
  } else if (/定语从句|who|which|that/.test(note.title)) {
    question = "定语从句中 who / which / that 的作用是什么？";
    choices = ["引导从句修饰前面的名词", "引导一个完全无关的新句子", "只能放在句子最后"];
    answer = "引导从句修饰前面的名词";
  }

  return {
    id: baseId,
    subject: "english",
    unitNumber,
    grammarTitle: note.title,
    question,
    choices,
    answer,
    explanation: `${note.explanation} 预习后要能用例句检查：${note.checkpoint}`,
    knowledgeTags: ["英语语法", note.title],
  };
}

function enhanceLessonInteractions(curriculumData) {
  for (const subjectId of subjectOrder) {
    const subject = curriculumData[subjectId];
    for (const chapter of subject.chapters ?? []) {
      chapter.knowledgeMap ??= buildKnowledgeMap(subjectId, chapter);
      chapter.chapterMasteryChecklist ??= buildChapterMasteryChecklist(subjectId, chapter);
      if (["math", "physics", "chemistry"].includes(subjectId)) {
        chapter.chapterTieredPractice ??= buildChapterTieredPractice(subjectId, chapter);
      }
      for (const lessonItem of chapter.lessons ?? []) {
        lessonItem.lessonGlossary ??= buildLessonGlossary(subjectId, chapter, lessonItem);
        lessonItem.studyPacket ??= buildStudyPacket(subjectId, chapter, lessonItem);
        if (subjectId === "chinese") {
          lessonItem.literacyPractice ??= buildChineseLiteracyPractice(chapter, lessonItem);
        }
        lessonItem.lessonExamTargets ??= buildLessonExamTargets(subjectId, chapter, lessonItem);
        lessonItem.retrievalDeck ??= buildRetrievalDeck(subjectId, chapter, lessonItem);
        lessonItem.knowledgeCards ??= buildLessonKnowledgeCards(subjectId, lessonItem);
        lessonItem.recallPrompts ??= buildRecallPrompts(subjectId, lessonItem);
        lessonItem.selfCheck ??= buildSelfCheck(subjectId, lessonItem);
        lessonItem.microDrills ??= buildMicroDrills(subjectId, lessonItem);
        lessonItem.practiceSet ??= buildPracticeSet(subjectId, chapter, lessonItem);
        lessonItem.quickCheck ??= buildQuickCheck(subjectId, chapter, lessonItem);
        lessonItem.entryDiagnostic ??= buildEntryDiagnostic(subjectId, chapter, lessonItem);
        lessonItem.previewNavigator ??= buildPreviewNavigator(subjectId, chapter, lessonItem);
        lessonItem.previewWorkflow ??= buildPreviewWorkflow(subjectId, chapter, lessonItem);
        lessonItem.reflectionCoach ??= buildReflectionCoach(subjectId, chapter, lessonItem);
      }
    }
  }
}

function buildPreviewNavigator(subjectId, chapter, lessonItem) {
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const firstPoint = lessonItem.keyPoints?.[0] ?? lessonTitle;
  const secondPoint = lessonItem.keyPoints?.[1] ?? firstPoint;
  const mistake = lessonItem.commonMistakes?.[0] ?? subjectDefaultTrap(subjectId);
  const firstTask = lessonItem.tasks?.[0] ?? `预习“${lessonTitle}”的核心概念`;
  const firstCheck = lessonItem.selfCheck?.[0] ?? `能说出“${firstPoint}”`;
  const secondCheck = lessonItem.selfCheck?.[1] ?? `能完成“${secondPoint}”相关练习`;
  const subjectConfig = {
    english: {
      focus: "词义、短语、句型三步走",
      firstStep: `先用 5 个词做英译中，再用 1 个短语造句：${firstPoint}`,
      skipIf: ["看到英文能说中文", "看到中文能拼出英文", "能用本课句型写 1 句"],
      exitTicket: ["说出 5 个词/短语的中文", "写出 1 个 8-12 词英文句子", "完成 1 道语法小测"],
      timeBox: { min: 10, max: 16 },
    },
    math: {
      focus: "条件、方法、步骤、易错点",
      firstStep: `先判断题目条件属于哪类考点：${firstPoint}`,
      skipIf: ["能独立说出公式或方法条件", "能写出完整解题步骤", `能避开：${mistake}`],
      exitTicket: ["完成 1 道基础题并写步骤", "解释每一步用了什么条件", "标出 1 个易错提醒"],
      timeBox: { min: 12, max: 18 },
    },
    chinese: {
      focus: "默写词语、文本依据、表达迁移",
      firstStep: `先默写本课 4 个词，再口头概括《${lessonTitle}》的核心内容。`,
      skipIf: ["能默写本课重点词语", "能用文本词句回答阅读问题", "能说出一个写作迁移点"],
      exitTicket: ["默写 4 个词语并自查", "写出 1 条文本依据", "完成 60-80 字批注或仿写"],
      timeBox: { min: 12, max: 18 },
    },
    physics: {
      focus: "现象、图示、变量、公式条件",
      firstStep: `先画小图或列变量，再解释：${firstPoint}`,
      skipIf: ["能说出物理量和单位", "能画出图示或过程", `能避开：${mistake}`],
      exitTicket: ["画出 1 张示意图", "解释 1 个公式或实验条件", "完成 1 道基础判断题"],
      timeBox: { min: 12, max: 18 },
    },
    chemistry: {
      focus: "宏观现象、微观本质、符号表达、实验规范",
      firstStep: `先把“${firstPoint}”拆成现象、依据和安全/符号表达三层。`,
      skipIf: ["能说出现象和判断依据", "能联系粒子或物质变化本质", `能避开：${mistake}`],
      exitTicket: ["写出 1 条现象到本质的判断", "说出 1 个实验安全或规范点", "完成 1 道基础辨析题"],
      timeBox: { min: 12, max: 18 },
    },
  };
  const config = subjectConfig[subjectId];

  return {
    focus: `${chapter.title} · ${config.focus}`,
    firstStep: config.firstStep,
    skipIf: ensureMinimum(config.skipIf, [firstCheck, secondCheck], firstTask).slice(0, 3),
    exitTicket: ensureMinimum(config.exitTicket, [firstCheck, secondCheck], firstTask).slice(0, 3),
    timeBox: config.timeBox,
    weakPoint: mistake,
  };
}

function buildPreviewWorkflow(subjectId, chapter, lessonItem) {
  const firstPoint = lessonItem.keyPoints?.[0] ?? lessonItem.title;
  const secondPoint = lessonItem.keyPoints?.[1] ?? firstPoint;
  const firstRecall = lessonItem.recallPrompts?.[0] ?? `复述：${firstPoint}`;
  const firstPractice = lessonItem.practiceSet?.[0];
  const firstTask = lessonItem.tasks?.[0] ?? "完成本课基础预习";
  const outputTask = buildWorkflowOutputTask(subjectId, lessonItem);
  const subjectLead = {
    english: "词汇、短语和句型要从“认得”推进到“会说会写”。",
    math: "数学预习先看条件和方法，再用一道题检验步骤。",
    chinese: "语文预习把字词、文本依据和表达迁移连起来。",
    physics: "物理预习要把现象、图示、变量和条件对应起来。",
    chemistry: "化学预习按宏观现象、微观本质、符号表达和实验规范推进。",
  }[subjectId] ?? "先建立目标，再用回忆和练习检查。";

  return [
    {
      id: `${lessonItem.id}-workflow-goal`,
      kind: "goal",
      title: "定目标",
      minutes: 3,
      action: `${chapter.title} · ${lessonItem.title}：先抓“${firstPoint}”。${subjectLead}`,
      evidence: `能说出本课要解决的一个核心问题，并圈出关键词“${stripEvidenceText(firstPoint)}”。`,
    },
    {
      id: `${lessonItem.id}-workflow-recall`,
      kind: "recall",
      title: "遮挡回忆",
      minutes: 3,
      action: firstRecall,
      evidence: "不看资料能口头说出关键词、条件或例子；卡住的内容立刻标记为不熟。",
    },
    {
      id: `${lessonItem.id}-workflow-practice`,
      kind: "practice",
      title: "即时练习",
      minutes: 4,
      action: firstPractice ? firstPractice.question : firstTask,
      evidence: firstPractice
        ? `答完能解释为什么选“${firstPractice.answer}”，并说出一个易错点。`
        : `完成“${firstTask}”后能说清步骤和依据。`,
    },
    {
      id: `${lessonItem.id}-workflow-output`,
      kind: "output",
      title: "输出复盘",
      minutes: 4,
      action: outputTask,
      evidence: `留下 1 条可复习成果：例句、错因、默写词、图示、方程式或 80 字片段；关联“${stripEvidenceText(secondPoint)}”。`,
    },
  ];
}

function buildWorkflowOutputTask(subjectId, lessonItem) {
  const secondPoint = lessonItem.keyPoints?.[1] ?? lessonItem.title;
  const task = lessonItem.tasks?.at(-1) ?? "完成一条输出";
  const outputs = {
    english: `用本课词汇或句型写 1 个 8-12 词英文句子，再口头中译英复述。`,
    math: `把一道题的解法写成“已知 -> 方法 -> 计算 -> 结论”四行。`,
    chinese: lessonItem.writingTask ?? `围绕“${secondPoint}”写 60-80 字批注或仿写。`,
    physics: `画 1 张示意图，标出物理量、单位和结论适用条件。`,
    chemistry: `写出“现象 -> 判断依据 -> 安全提醒/符号表达”的三行复盘。`,
  };

  return outputs[subjectId] ?? task;
}

function buildStudyPacket(subjectId, chapter, lessonItem) {
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const firstPoint = lessonItem.keyPoints?.[0] ?? lessonTitle;
  const secondPoint = lessonItem.keyPoints?.[1] ?? firstPoint;
  const thirdPoint = lessonItem.keyPoints?.[2] ?? secondPoint;
  const mistake = lessonItem.commonMistakes?.[0] ?? subjectDefaultTrap(subjectId);
  const practice = lessonItem.practiceSet?.[0];
  const grammar = chapter.grammarNotes?.[0];
  const words = chapter.dailyWords?.flatMap((day) => day.words).slice(0, 4) ?? [];
  const dictation = lessonItem.dictationWords?.slice(0, 4).join("、") ?? "";
  const formula = lessonItem.formulas?.[0] ?? "";
  const subjectPackets = {
    english: {
      explain: {
        title: "词句先连起来",
        body: `本课先把 ${words.map((item) => item.word).join("、") || firstPoint} 和“${grammar?.title ?? secondPoint}”连起来，不只背中文。`,
        prompt: "遮住中文，先说词义，再用其中 1 个词补成完整句子。",
      },
      model: {
        title: "示范",
        body: grammar?.example ?? `I can use "${words[0]?.word ?? firstPoint}" in a short sentence.`,
        prompt: `说出例句里哪个词或结构对应“${firstPoint}”。`,
      },
      tryIt: {
        title: "自己试",
        body: `从本课词汇中选 2 个，完成“英文 -> 中文 -> 造句”的三步。`,
        prompt: "先不要看答案，写完再翻词卡检查拼写和中文。",
      },
      review: {
        title: "错因复盘",
        body: `如果卡住，通常是词义、拼写、搭配或语序问题。重点避开：${mistake}。`,
        prompt: "把错词标成“不会 / 模糊 / 会认不会用”，明天优先复习。",
      },
      output: {
        task: "写出 5 个词的中文，并用 1 个重点短语写 1 句英文。",
        evidence: "留下 1 句英文、1 个错词标签和 1 个中文解释。",
      },
    },
    math: {
      explain: {
        title: "先看条件",
        body: `本课入口是“${firstPoint}”。预习时先判断题目给了什么条件，再决定能否使用“${secondPoint}”。`,
        prompt: "圈出关键词，口头说出条件、方法和目标量。",
      },
      model: {
        title: "例题拆法",
        body: practice
          ? `${practice.question} 解题时先定位考点“${practice.concept}”，再按解析推进。`
          : `把“${firstPoint}”写成“已知 -> 方法 -> 计算 -> 结论”四行。`,
        prompt: "复述第一步为什么这样做，而不是直接写答案。",
      },
      tryIt: {
        title: "自己试",
        body: `完成 1 道“${secondPoint}”基础题，只要求步骤完整，速度先放后面。`,
        prompt: "每一步旁边写一个依据：定义、公式、性质或题目条件。",
      },
      review: {
        title: "错因复盘",
        body: `本课常见问题是：${mistake}。订正时不要只改答案，要改步骤依据。`,
        prompt: "把错题归入条件识别、方法选择、计算或表达四类。",
      },
      output: {
        task: "完成 2 道基础题并写出完整步骤。",
        evidence: "留下一份四行解题记录和一个错因标签。",
      },
    },
    chinese: {
      explain: {
        title: "字词回到文本",
        body: `本课先掌握默写词语：${dictation || firstPoint}，再围绕“${secondPoint}”找文本依据。`,
        prompt: "先默写，再说出每个词在课文语境中的作用。",
      },
      model: {
        title: "阅读示范",
        body: `答题不要只写感受。可以按“观点 -> 文本词句 -> 表达作用”说明“${firstPoint}”。`,
        prompt: "从本课要点中挑 1 个，补一条能支撑它的文本依据。",
      },
      tryIt: {
        title: "自己试",
        body: lessonItem.readingQuestions?.[0] ?? `围绕“${thirdPoint}”写一个阅读问题答案。`,
        prompt: "答案里必须有关键词、文本依据和自己的概括。",
      },
      review: {
        title: "错因复盘",
        body: `如果答案空泛，往往是没有回到词句。重点避开：${mistake}。`,
        prompt: "把答案改成“依据 + 分析 + 结论”三句话。",
      },
      output: {
        task: "默写 4 个词语，并完成 1 段 60-80 字批注或仿写。",
        evidence: "留下默写订正、文本依据和表达迁移片段。",
      },
    },
    physics: {
      explain: {
        title: "现象变图示",
        body: `本课先把“${firstPoint}”画成图或过程，再标出变量、单位和适用条件。`,
        prompt: "不用公式先说清情境：谁作用、怎样变化、观察什么。",
      },
      model: {
        title: "示范",
        body: formula ? `使用 ${formula} 前，先确认每个物理量、单位和条件。` : `用“现象 -> 条件 -> 结论”解释“${secondPoint}”。`,
        prompt: "说出公式或结论里最容易漏掉的条件。",
      },
      tryIt: {
        title: "自己试",
        body: practice ? practice.question : `围绕“${secondPoint}”完成 1 道基础判断题。`,
        prompt: "答题前先画小图，答题后说出依据。",
      },
      review: {
        title: "错因复盘",
        body: `本课易错点：${mistake}。物理订正要回到图示、物理量、单位和条件。`,
        prompt: "把错因写成“图错 / 量错 / 条件错 / 计算错”。",
      },
      output: {
        task: "画出 1 张示意图，并解释 1 个公式或实验条件。",
        evidence: "留下图示、物理量单位和一条适用条件。",
      },
    },
    chemistry: {
      explain: {
        title: "四层看化学",
        body: `本课围绕“${firstPoint}”，按宏观现象、微观本质、符号表达和实验规范四层理解。`,
        prompt: "先说看到什么现象，再说为什么能得出结论。",
      },
      model: {
        title: "示范",
        body: formula ? `写 ${formula} 时，要同时检查物质、条件和守恒。` : `判断“${secondPoint}”时，先找是否生成新物质或证据。`,
        prompt: "用“现象 -> 本质 -> 证据”复述一遍。",
      },
      tryIt: {
        title: "自己试",
        body: practice ? practice.question : `围绕“${secondPoint}”完成 1 道基础辨析题。`,
        prompt: "答案里至少写出现象或判断依据，不能只写结论。",
      },
      review: {
        title: "错因复盘",
        body: `本课易错点：${mistake}。订正时补上实验安全、符号表达或守恒依据。`,
        prompt: "把错因标成现象判断、符号表达、守恒或实验规范。",
      },
      output: {
        task: "写出 1 条“现象 -> 判断依据 -> 结论”的三行记录。",
        evidence: "留下现象、本质解释、符号或安全提醒各 1 条。",
      },
    },
  };

  const packet = {
    title: "本课学习包",
    ...subjectPackets[subjectId],
  };
  packet.output = {
    id: `${lessonItem.id}-study-output`,
    ...packet.output,
  };
  return packet;
}

function buildChineseLiteracyPractice(chapter, lessonItem) {
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const words = lessonItem.dictationWords ?? [];
  const firstPoint = lessonItem.keyPoints?.[0] ?? "内容理解";
  const secondPoint = lessonItem.keyPoints?.[1] ?? firstPoint;
  const readingQuestion = lessonItem.readingQuestions?.[0] ?? `围绕《${lessonTitle}》写一个阅读理解问题。`;
  const writingTask = lessonItem.writingTask ?? `围绕《${lessonTitle}》写 60-80 字批注或仿写。`;

  return {
    title: "语文三段训练",
    dictation: {
      title: "字词默写",
      words: words.slice(0, 6),
      prompt: `遮住答案默写：${words.slice(0, 4).join("、")}。`,
      check: "检查字形、偏旁、易混音，再把错字单独重写 2 遍。",
      output: `默写至少 4 个词，并给 1 个词写出课文语境。`,
    },
    reading: {
      title: "阅读依据",
      prompt: readingQuestion,
      check: `答案必须包含文本依据、关键词或原文词句，再解释它如何支持“${firstPoint}”。`,
      output: `写出“观点 + 文本依据 + 分析”的三句话答案。`,
    },
    writing: {
      title: "表达迁移",
      prompt: writingTask,
      check: `仿写或批注要借用《${lessonTitle}》的表达方法，关联“${secondPoint}”。`,
      output: "完成 60-80 字片段，并圈出 1 个可迁移的表达方法。",
    },
    evidence: [
      "错字订正痕迹",
      "阅读题文本依据",
      "一段可复习的仿写或批注",
    ],
  };
}

function buildLessonExamTargets(subjectId, chapter, lessonItem) {
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const points = ensureMinimum(lessonItem.keyPoints ?? [], lessonItem.tasks ?? [], lessonTitle).slice(0, 3);
  const mistake = lessonItem.commonMistakes?.[0] ?? subjectDefaultTrap(subjectId);
  const templates = {
    english: (point, index) => ({
      questionType: ["词义翻译", "句型替换", "语法判断"][index] ?? "语言输出",
      answerMove: `先定位“${point}”对应的词义、短语或句型，再放进完整句子。`,
      evidence: index === 0 ? `写出“${point}”的中英互译。` : `完成 1 句包含“${point}”的英文表达。`,
      trap: "只会认读，不会拼写或造句。",
    }),
    math: (point, index) => ({
      questionType: ["概念判断", "步骤计算", "变式应用"][index] ?? "方法应用",
      answerMove: `先写条件，再判断“${point}”是否适用，最后按步骤表达。`,
      evidence: `写出“${point}”的适用条件和 1 个解题步骤。`,
      trap: mistake,
    }),
    chinese: (point, index) => ({
      questionType: ["字词默写", "阅读理解", "表达迁移"][index] ?? "文本分析",
      answerMove: `围绕“${point}”先找课文词句，再写概括或表达效果。`,
      evidence: index === 0 ? `默写并解释“${point}”相关词语。` : `找出文本依据并写出“${point}”的分析。`,
      trap: "只写感受，缺少文本依据。",
    }),
    physics: (point, index) => ({
      questionType: ["图示判断", "公式/单位", "实验变量"][index] ?? "情境分析",
      answerMove: `把“${point}”转成图示、物理量、单位或实验条件。`,
      evidence: index === 0 ? `画出“${point}”对应的小图。` : `解释“${point}”中的条件、单位或变量。`,
      trap: mistake,
    }),
    chemistry: (point, index) => ({
      questionType: ["现象判断", "符号表达", "实验规范"][index] ?? "证据推理",
      answerMove: `按宏观现象、微观本质、符号表达和安全规范说明“${point}”。`,
      evidence: index === 0 ? `写出“${point}”的现象和判断依据。` : `解释“${point}”的证据链或安全要求。`,
      trap: mistake,
    }),
  };
  const builder = templates[subjectId] ?? templates.math;

  return points.map((point, index) => ({
    id: `${lessonItem.id}-exam-target-${index + 1}`,
    point,
    ...builder(point, index),
  }));
}

function buildRetrievalDeck(subjectId, chapter, lessonItem) {
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const points = ensureMinimum(lessonItem.keyPoints ?? [], lessonItem.tasks ?? [], lessonTitle);
  const firstPoint = points[0];
  const secondPoint = points[1] ?? firstPoint;
  const thirdPoint = points[2] ?? secondPoint;
  const mistake = lessonItem.commonMistakes?.[0] ?? subjectDefaultTrap(subjectId);
  const grammar = chapter.grammarNotes?.[0];
  const words = chapter.dailyWords?.flatMap((day) => day.words).slice(0, 5) ?? [];
  const dictation = lessonItem.dictationWords?.slice(0, 5) ?? [];
  const formula = lessonItem.formulas?.[0];
  const subjectCards = {
    english: [
      {
        prompt: `遮住中文，回忆 ${words.map((item) => item.word).join("、") || firstPoint} 的意思。`,
        answer: words.length
          ? words.map((item) => `${item.word}: ${item.cn}`).join("；")
          : `围绕“${firstPoint}”说出英文、中文和一个搭配。`,
        checkRule: "写出至少 4 个中英对应，并完成 1 个词的拼写。",
        nextAction: "不会或模糊的词立刻标成错词，回看词卡例句后再拼 1 遍。",
      },
      {
        prompt: `用“${grammar?.title ?? secondPoint}”解释 1 个例句为什么这样写。`,
        answer: grammar?.example ?? `用本课句型把“${secondPoint}”放进完整英文句子。`,
        checkRule: "解释语序、搭配或语法点，并写出 1 句英文。",
        nextAction: "如果只会翻译不会造句，回看语法小课并重做 1 题。",
      },
      {
        prompt: `把“${thirdPoint}”变成 1 个 8-12 词英文句子。`,
        answer: `句子要包含本课词汇、短语或语法，并能说出中文意思。`,
        checkRule: "完成 1 句英文输出，检查拼写、词性和中文意思。",
        nextAction: "错在拼写就听写，错在语序就回看句型，错在词义就重翻词卡。",
      },
    ],
    math: [
      {
        prompt: `不看笔记，说出“${firstPoint}”的条件或定义。`,
        answer: `答案要包含适用条件、关键词和一个反例提醒：${mistake}。`,
        checkRule: "说出定义或条件，并写出 1 个不能使用它的情形。",
        nextAction: "条件说不全就回看例题第一步，重做条件圈画。",
      },
      {
        prompt: `看到“${secondPoint}”题型，第一步应该写什么？`,
        answer: `先写已知条件，再选方法，最后按步骤计算或推理。`,
        checkRule: "写出“已知 -> 方法 -> 步骤 -> 结论”四行。",
        nextAction: "步骤断掉就回看示范题，把错因标成条件、方法、计算或表达。",
      },
      {
        prompt: `把“${thirdPoint}”改成一个小题，并说明怎么验算。`,
        answer: `小题应能检验本课核心方法，验算要回到条件和结论。`,
        checkRule: "完成 1 道自编小题或变式题，并解释验算依据。",
        nextAction: "如果变式不会做，重做基础题，再只改一个条件尝试。",
      },
    ],
    chinese: [
      {
        prompt: `合上资料，默写《${lessonTitle}》本课重点词。`,
        answer: dictation.length ? dictation.join("、") : `围绕“${firstPoint}”默写并解释重点词语。`,
        checkRule: "默写至少 4 个词语，并给 1 个词写出语境解释。",
        nextAction: "错字单独重写 2 遍，回看偏旁、字音和课文语境。",
      },
      {
        prompt: `围绕“${secondPoint}”，说出 1 条文本依据。`,
        answer: `答案要按“观点 -> 文本词句 -> 分析作用”组织。`,
        checkRule: "写出观点、文本依据和分析三句话。",
        nextAction: "如果只写感受，回看课文导读，补上原文词句或关键词。",
      },
      {
        prompt: `把“${thirdPoint}”迁移成 60 字批注或仿写开头。`,
        answer: `片段要借用本课表达方法，并圈出可迁移的词句或结构。`,
        checkRule: "完成 60 字左右输出，并标出 1 个表达方法。",
        nextAction: "写不出就回看作者/背景和阅读问题，先列 3 个关键词。",
      },
    ],
    physics: [
      {
        prompt: `不看资料，画出“${firstPoint}”对应的小图或过程。`,
        answer: `图中要标出对象、方向、物理量和已知条件。`,
        checkRule: "画出示意图，并写出至少 2 个物理量或单位。",
        nextAction: "图画不出就回看实验/现象，把文字条件转成箭头或标注。",
      },
      {
        prompt: `解释“${secondPoint}”成立需要什么条件。`,
        answer: formula ? `结合 ${formula} 说明每个量和适用条件。` : `从现象、变量和条件说明结论。`,
        checkRule: "解释条件、单位或变量，并判断 1 个易错说法。",
        nextAction: "条件漏掉就重读易错点，回到图示重新标注。",
      },
      {
        prompt: `用“${thirdPoint}”解决一个生活或实验小情境。`,
        answer: `先判断现象，再列变量或图示，最后给出结论。`,
        checkRule: "完成 1 个情境解释，写出现象、依据和结论。",
        nextAction: "判断错就回看概念辨析，重做 1 道快测。",
      },
    ],
    chemistry: [
      {
        prompt: `说出“${firstPoint}”对应的宏观现象或判断依据。`,
        answer: `答案要包含现象、是否生成新物质或实验判断依据。`,
        checkRule: "写出现象和判断依据，不能只写结论。",
        nextAction: "依据说不清就回看实验现象，把“看到什么”和“说明什么”分开写。",
      },
      {
        prompt: `解释“${secondPoint}”背后的微观本质或符号表达。`,
        answer: formula ? `结合 ${formula} 检查物质、条件和守恒。` : `按粒子、物质变化或证据链解释。`,
        checkRule: "解释微观本质、符号或守恒中的 1 项。",
        nextAction: "符号或守恒出错就回看方程式/表达式，再补条件。",
      },
      {
        prompt: `把“${thirdPoint}”写成“现象 -> 本质 -> 安全/规范”的三行。`,
        answer: `三行记录要能支持一个化学判断，并包含实验规范。`,
        checkRule: "完成三行记录，并判断 1 个实验安全或规范点。",
        nextAction: "如果只记现象不懂本质，回看概念辨析并重做基础题。",
      },
    ],
  };

  return subjectCards[subjectId].map((card, index) => ({
    id: `${lessonItem.id}-retrieval-${index + 1}`,
    level: ["基础回忆", "理解应用", "输出迁移"][index],
    ...card,
  }));
}

function buildLessonGlossary(subjectId, chapter, lessonItem) {
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const points = ensureMinimum(lessonItem.keyPoints ?? [], lessonItem.tasks ?? [], lessonTitle);
  const builders = {
    english: () => {
      const words = chapter.dailyWords?.flatMap((day) => day.words) ?? [];
      const wordItems = words.slice(0, 4).map((entry, index) => ({
        id: `${lessonItem.id}-glossary-word-${index + 1}`,
        kind: "word",
        term: entry.word,
        meaning: entry.cn,
        checkPrompt: `遮住中文，说出 ${entry.word} 的意思；再看中文拼出英文。`,
      }));
      const grammarItems = (chapter.grammarNotes ?? []).slice(0, 2).map((note, index) => ({
        id: `${lessonItem.id}-glossary-grammar-${index + 1}`,
        kind: "method",
        term: note.title,
        meaning: note.explanation,
        checkPrompt: note.checkpoint,
      }));

      return ensureGlossaryMinimum([...wordItems, ...grammarItems], points, subjectId, lessonItem.id, lessonTitle);
    },
    chinese: () => {
      const wordItems = (lessonItem.dictationWords ?? []).slice(0, 5).map((word, index) => ({
        id: `${lessonItem.id}-glossary-dictation-${index + 1}`,
        kind: "word",
        term: word,
        meaning: `《${lessonTitle}》预习默写词语，要会写、会读、会放回语境解释。`,
        checkPrompt: `遮住答案默写“${word}”，再说出它在课文中的语境或表达作用。`,
      }));

      return ensureGlossaryMinimum(wordItems, points, subjectId, lessonItem.id, lessonTitle);
    },
    math: () => {
      const formulas = (lessonItem.formulas ?? []).map((formula, index) => ({
        id: `${lessonItem.id}-glossary-formula-${index + 1}`,
        kind: "formula",
        term: formula,
        meaning: `用于“${lessonTitle}”相关题型，先判断条件，再代入或变形。`,
        checkPrompt: `说出 ${formula} 中每个量的含义和使用条件。`,
      }));

      return ensureGlossaryMinimum(formulas, points, subjectId, lessonItem.id, lessonTitle);
    },
    physics: () => {
      const formulas = (lessonItem.formulas ?? []).map((formula, index) => ({
        id: `${lessonItem.id}-glossary-formula-${index + 1}`,
        kind: "formula",
        term: formula,
        meaning: "物理量关系式，要配合单位、图示和适用条件理解。",
        checkPrompt: `标出 ${formula} 中的物理量、单位和适用条件。`,
      }));
      const experiment = lessonItem.experiment
        ? [{
            id: `${lessonItem.id}-glossary-experiment`,
            kind: "method",
            term: "实验方法",
            meaning: lessonItem.experiment,
            checkPrompt: "说出实验变量、观察现象和结论之间的关系。",
          }]
        : [];

      return ensureGlossaryMinimum([...formulas, ...experiment], points, subjectId, lessonItem.id, lessonTitle);
    },
    chemistry: () => {
      const formulas = (lessonItem.formulas ?? []).map((formula, index) => ({
        id: `${lessonItem.id}-glossary-symbol-${index + 1}`,
        kind: "symbol",
        term: formula,
        meaning: "化学符号或表达式，要检查物质、条件和守恒。",
        checkPrompt: `说明 ${formula} 中反应物、生成物、条件或守恒关系。`,
      }));
      const experiment = lessonItem.experiment
        ? [{
            id: `${lessonItem.id}-glossary-experiment`,
            kind: "method",
            term: "实验现象",
            meaning: lessonItem.experiment,
            checkPrompt: "说出现象、判断依据、微观本质和安全注意点。",
          }]
        : [];
      const safety = lessonItem.safety
        ? [{
            id: `${lessonItem.id}-glossary-safety`,
            kind: "method",
            term: "实验安全",
            meaning: lessonItem.safety,
            checkPrompt: "说明这条安全要求防止哪类风险。",
          }]
        : [];

      return ensureGlossaryMinimum([...formulas, ...experiment, ...safety], points, subjectId, lessonItem.id, lessonTitle);
    },
  };

  return builders[subjectId]();
}

function ensureGlossaryMinimum(items, points, subjectId, lessonId, lessonTitle) {
  const result = [...items];
  for (const point of points) {
    if (result.length >= 5) break;
    if (result.some((item) => item.term === point)) continue;
    result.push({
      id: `${lessonId}-glossary-term-${result.length + 1}`,
      kind: subjectId === "math" ? "method" : "term",
      term: point,
      meaning: glossaryMeaning(subjectId, point, lessonTitle),
      checkPrompt: glossaryCheckPrompt(subjectId, point),
    });
  }

  return result.slice(0, 5);
}

function glossaryMeaning(subjectId, point, lessonTitle) {
  const templates = {
    english: `本单元“${lessonTitle}”需要会认、会译、会放进短句使用。`,
    math: `“${point}”是本课解题入口，先看条件，再决定方法或公式。`,
    chinese: `“${point}”要回到《${lessonTitle}》的词句、结构和表达方法中理解。`,
    physics: `“${point}”要和物理情境、图示、变量、单位或实验条件对应。`,
    chemistry: `“${point}”要从宏观现象、微观本质、符号表达和实验规范四层理解。`,
  };

  return templates[subjectId] ?? `本课必须掌握“${point}”的含义、条件和应用。`;
}

function glossaryCheckPrompt(subjectId, point) {
  const prompts = {
    english: `用“${point}”完成 1 次英译中、1 次中译英和 1 个短句。`,
    math: `不看笔记说出“${point}”的适用条件、第一步和一个易错点。`,
    chinese: `用一句话解释“${point}”，并补 1 条文本依据。`,
    physics: `画小图说明“${point}”涉及的物理量、单位和条件。`,
    chemistry: `用“现象 -> 本质 -> 证据”说明“${point}”。`,
  };

  return prompts[subjectId] ?? `说出“${point}”的含义并完成 1 个例子。`;
}

function buildReflectionCoach(subjectId, chapter, lessonItem) {
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const firstPoint = lessonItem.keyPoints?.[0] ?? lessonTitle;
  const secondPoint = lessonItem.keyPoints?.[1] ?? firstPoint;
  const mistake = lessonItem.commonMistakes?.[0] ?? subjectDefaultTrap(subjectId);
  const templates = {
    english: {
      trigger: "单词或句型答错后，先判定是词义、拼写、搭配还是语序问题。",
      errorTags: ["词义不稳", "拼写遗漏", "搭配/语序错误", "会认不会用"],
      correctionSteps: [
        `把错词写成“英文 -> 中文 -> 1 个短句”，回到“${firstPoint}”。`,
        `遮住英文做中译英，标出错因：词义、拼写、搭配或语序。`,
        `重做 1 道同类小测，并复述为什么答案正确。`,
      ],
      nextAction: `明天优先复习本课不会和模糊词，再用“${secondPoint}”造句。`,
      evidence: "订正后能连续完成英译中和中译英各 1 次，并写出 1 个短句。",
    },
    math: {
      trigger: "题目做错后，先判定是条件没看清、方法选错、计算出错还是步骤缺失。",
      errorTags: ["条件识别", "方法选择", "计算步骤", "结论表达"],
      correctionSteps: [
        `回到题干圈条件，写出本题对应“${firstPoint}”的依据。`,
        "把原题重做成四行：已知、方法、计算、结论。",
        `写一句错因，并重做 1 道“${secondPoint}”同标签题。`,
      ],
      nextAction: `下一次先练“${firstPoint}”基础题，再进入变式题。`,
      evidence: "订正后能不看解析说出每一步依据，并避开同一个错因。",
    },
    chinese: {
      trigger: "默写或阅读题出错后，先判定是字词不会写、文本依据不足还是表达方法没迁移。",
      errorTags: ["字词默写", "文本依据", "结构概括", "作文迁移"],
      correctionSteps: [
        `默写错词重写 2 遍，并回到《${lessonTitle}》语境解释。`,
        `阅读题订正时补 1 条文本依据，说明它支持“${firstPoint}”。`,
        `把错因写成一句话，再用“${secondPoint}”完成 60 字迁移。`,
      ],
      nextAction: `下一次先默写本课词语，再做文本依据题。`,
      evidence: "订正后能写出词语、文本依据和一条表达迁移，不只写感受。",
    },
    physics: {
      trigger: "物理题错后，先判定是图示缺失、物理量单位、条件判断还是公式使用问题。",
      errorTags: ["图示过程", "物理量/单位", "条件判断", "公式使用"],
      correctionSteps: [
        `重画图示，标出“${firstPoint}”涉及的物理量和单位。`,
        `回到条件，解释为什么能用或不能用“${secondPoint}”。`,
        "重做原题，并用现象、条件、结论三句话复述错因。",
      ],
      nextAction: `下一次先画图标变量，再做 1 道同条件判断题。`,
      evidence: "订正后能画图、写单位、说条件，并完成 1 道同类题。",
    },
    chemistry: {
      trigger: "化学判断错后，先判定是现象看错、本质没说清、符号表达或实验规范问题。",
      errorTags: ["宏观现象", "微观本质", "符号表达", "实验安全"],
      correctionSteps: [
        `把错题改写成“现象 -> 判断依据 -> 本质”，回到“${firstPoint}”。`,
        `检查是否忽略“${mistake}”，并补充实验条件或安全提醒。`,
        `重做 1 道“${secondPoint}”辨析题，复述证据链。`,
      ],
      nextAction: `下一次先做现象到本质判断，再练符号表达或实验规范。`,
      evidence: "订正后能说出现象、依据、本质和安全/符号表达四层。",
    },
  };

  const selected = templates[subjectId];

  return {
    title: "错因复盘教练",
    chapter: chapter.title,
    lesson: lessonItem.title,
    weakPoint: mistake,
    ...selected,
    correctionSteps: selected.correctionSteps.map((text, index) => ({
      id: `${lessonItem.id}-reflection-${index + 1}`,
      text,
    })),
  };
}

function stripEvidenceText(text) {
  return String(text).replace(/\s+/g, " ").slice(0, 24);
}

function buildLessonKnowledgeCards(subjectId, lessonItem) {
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const points = ensureMinimum(lessonItem.keyPoints ?? [], lessonItem.tasks ?? [], lessonTitle).slice(0, 4);
  const mistake = lessonItem.commonMistakes?.[0] ?? subjectDefaultTrap(subjectId);
  const subjectName = curriculum[subjectId]?.name ?? subjectId;
  const templates = {
    english: {
      explanation: (point) => `把“${point}”放进词义、例句和句型替换中一起记，避免只认识单词不会表达。`,
      examCue: (point) => `常见检查：英译中、中译英、用 ${point} 造句或判断语序。`,
      retrievalPrompt: (point) => `遮住中文，说出“${point}”的意思，并用它造一个 8-12 词短句。`,
    },
    math: {
      explanation: (point) => `“${point}”需要先明确条件，再选择公式、图像或方程方法。`,
      examCue: (point) => `常见考法：给条件变式，让你判断是否能使用 ${point}。`,
      retrievalPrompt: (point) => `不看笔记，说出“${point}”的适用条件、第一步和一个易错点。`,
    },
    chinese: {
      explanation: (point) => `“${point}”要回到文本词句、结构和表达方法中理解，不能只背结论。`,
      examCue: (point) => `常见考法：结合词句分析 ${point}，并写出文本依据。`,
      retrievalPrompt: (point) => `合上资料，用一句话说出“${point}”，再补一个文本证据。`,
    },
    physics: {
      explanation: (point) => `“${point}”要和物理情境、图示、变量、单位或实验条件对应。`,
      examCue: (point) => `常见考法：换情境后判断 ${point} 是否仍成立。`,
      retrievalPrompt: (point) => `画一个小图，标出“${point}”涉及的物理量和条件。`,
    },
    chemistry: {
      explanation: (point) => `“${point}”要从宏观现象、微观本质、符号表达和实验规范四层理解。`,
      examCue: (point) => `常见考法：给实验现象，让你用 ${point} 判断依据或写表达。`,
      retrievalPrompt: (point) => `用“现象 + 本质 + 证据”复述“${point}”。`,
    },
  };
  const template = templates[subjectId] ?? templates.math;

  return points.slice(0, 3).map((point, index) => ({
    id: `${lessonItem.id}-knowledge-${index + 1}`,
    concept: point,
    explanation: template.explanation(point, lessonTitle),
    examCue: template.examCue(point, lessonTitle),
    trap: lessonItem.commonMistakes?.[index] ?? mistake,
    retrievalPrompt: template.retrievalPrompt(point, lessonTitle),
    sourceStatus: lessonItem.sourceStatus ?? "approved",
    subject: subjectName,
  }));
}

function buildMathChapterTieredPractice(chapter) {
  const bank = {
    "math-chapter-1": {
      goals: {
        基础: "会判断方程类型、根的情况和常用解法",
        巩固: "会完整写出解方程步骤",
        挑战: "会把实际问题转化为一元二次方程",
      },
      questions: {
        基础: [
          mathTierQuestion("一元二次方程", "下列方程中，属于一元二次方程的是：A. 2x+1=0；B. x²-3x+2=0；C. 1/x+x=2。", "B", "一元二次方程整理后应为整式方程，且最高次数为 2。", "含分母的方程未整理前不能直接判断。"),
          mathTierQuestion("根的判别式", "方程 x²-4x+k=0 有两个相等实数根，求 k。", "k=4", "两个相等实数根要求 Δ=0，即 16-4k=0。", "把“相等实数根”误判成 Δ>0。"),
        ],
        巩固: [
          mathTierQuestion("因式分解法", "解方程 x²-7x+12=0。", "x=3 或 x=4", "x²-7x+12=(x-3)(x-4)，乘积为 0。", "漏写一个根。"),
          mathTierQuestion("公式法", "用公式法解 2x²-5x-3=0。", "x=3 或 x=-1/2", "Δ=25+24=49，x=(5±7)/4。", "公式中 -b 和 ±√Δ 容易写错。"),
        ],
        挑战: [
          mathTierQuestion("增长率应用", "某商品原价 200 元，连续两次按相同百分率降价后为 162 元，求每次降价率。", "10%", "设降价率为 x，200(1-x)²=162，解得 x=10%。", "实际问题要舍去不合题意的根。"),
          mathTierQuestion("面积建模", "长方形长比宽多 3 cm，面积为 40 cm²，求长和宽。", "宽 5 cm，长 8 cm", "设宽为 x，则 x(x+3)=40，解得 x=5 或 -8，舍去负数。", "只解方程不检验实际意义。"),
        ],
      },
    },
    "math-chapter-2": {
      goals: {
        基础: "会用圆的半径、弦、圆心角和圆周角关系",
        巩固: "会连接圆心、切点或作垂线构造直角三角形",
        挑战: "会把圆的性质和勾股定理组合使用",
      },
      questions: {
        基础: [
          mathTierQuestion("垂径定理", "圆 O 半径为 10，弦 AB=16，求圆心 O 到弦 AB 的距离。", "6", "半弦长为 8，距离 d=√(10²-8²)=6。", "不要把弦长 16 当半弦。"),
          mathTierQuestion("圆周角", "∠AOB=96°，点 C 在圆上且∠ACB 对应同弧 AB，求∠ACB。", "48°", "同弧所对圆周角等于圆心角的一半。", "圆周角与圆心角不能直接相等。"),
        ],
        巩固: [
          mathTierQuestion("切线长", "点 P 在圆 O 外，OP=13，圆半径为 5，PT 为切线，求 PT。", "12", "OT⊥PT，PT=√(13²-5²)=12。", "切线题常漏连圆心和切点。"),
          mathTierQuestion("正多边形", "正八边形的每个内角是多少度？", "135°", "(8-2)×180°÷8=135°。", "把外角 45° 当内角。"),
        ],
        挑战: [
          mathTierQuestion("直径与勾股定理", "AB 是圆 O 的直径，点 C 在圆上，AC=6，BC=8，求圆 O 的半径。", "5", "直径所对圆周角为 90°，AB=√(6²+8²)=10，半径为 5。", "没有先判断△ABC 是直角三角形。"),
          mathTierQuestion("圆与直线位置", "圆 O 半径 r=5，直线 l 到圆心距离 d=3，直线 l 与圆的位置关系是什么？若 d=5 呢？", "d=3 时相交；d=5 时相切", "比较 d 与 r：d<r 相交，d=r 相切。", "把相交、相切、相离的临界条件混淆。"),
        ],
      },
    },
    "math-chapter-3": {
      goals: {
        基础: "会求平均数、中位数和众数",
        巩固: "会用加权平均数和方差解释数据",
        挑战: "会根据统计量选择更合理的结论",
      },
      questions: {
        基础: [
          mathTierQuestion("平均数", "数据 4，6，8，10，12 的平均数是多少？", "8", "(4+6+8+10+12)÷5=8。", "别只凭中间位置猜平均数。"),
          mathTierQuestion("中位数", "数据 12，15，10，18 的中位数是多少？", "13.5", "排序后为 10，12，15，18，中位数为 (12+15)÷2。", "偶数个数据要取中间两个数平均。"),
        ],
        巩固: [
          mathTierQuestion("加权平均数", "平时成绩 80 分占 40%，期末成绩 90 分占 60%，求总评成绩。", "86 分", "80×40%+90×60%=86。", "不能直接算普通平均。"),
          mathTierQuestion("方差", "甲组方差 0.8，乙组方差 2.4，哪组数据更稳定？", "甲组", "方差越小，波动越小。", "平均数相近时，稳定性看方差。"),
        ],
        挑战: [
          mathTierQuestion("统计决策", "甲、乙两班平均分都是 85，甲班方差 1.6，乙班方差 4.9。若要选成绩更稳定的班级，应选哪个？", "甲班", "平均数相同，方差小的一组更稳定。", "只看平均数会忽略离散程度。"),
          mathTierQuestion("众数与中位数", "数据 2，3，3，4，5，5，5 的众数和中位数分别是多少？", "众数 5，中位数 4", "众数是出现最多的数；排序后第 4 个数为中位数。", "众数不一定只有一个，也不一定等于中位数。"),
        ],
      },
    },
    "math-chapter-4": {
      goals: {
        基础: "会求简单等可能事件概率",
        巩固: "会用列表法或树状图列完整结果",
        挑战: "会处理两步随机试验和频率估计",
      },
      questions: {
        基础: [
          mathTierQuestion("等可能概率", "袋中有 3 个红球、2 个白球，任取 1 个球，取到红球的概率是多少？", "3/5", "共有 5 个等可能结果，红球有 3 个。", "分母是全部等可能结果数。"),
          mathTierQuestion("骰子概率", "掷一枚均匀骰子，点数大于 4 的概率是多少？", "1/3", "点数 5、6 共 2 种，概率 2/6=1/3。", "大于 4 不包括 4。"),
        ],
        巩固: [
          mathTierQuestion("列表法", "同时抛掷两枚硬币，出现一正一反的概率是多少？", "1/2", "正正、正反、反正、反反共 4 种，一正一反有 2 种。", "正反和反正是两个结果。"),
          mathTierQuestion("树状图", "从数字 1，2，3 中先后各取一次且放回，求两次数字之和为 4 的概率。", "1/3", "9 种等可能结果中，(1,3),(2,2),(3,1) 共 3 种。", "放回后第二次仍有 3 种可能。"),
        ],
        挑战: [
          mathTierQuestion("两步试验", "甲、乙各从数字 1，2，3 中任取一个数，求两个数相同的概率。", "1/3", "共有 3×3=9 种结果，相同有 3 种。", "有序结果不能漏列。"),
          mathTierQuestion("频率估计概率", "某篮球运动员罚球 200 次命中 150 次，可估计命中概率约为多少？", "0.75", "用频率估计概率：150÷200=0.75。", "频率估计是近似，不代表每次固定命中。"),
        ],
      },
    },
    "math-chapter-5": {
      goals: {
        基础: "会识别二次函数图像的开口、对称轴和顶点",
        巩固: "会配方并求最值",
        挑战: "会建立二次函数应用模型",
      },
      questions: {
        基础: [
          mathTierQuestion("开口方向", "二次函数 y=-2x²+3 的图像开口方向是什么？", "向下", "a=-2<0，抛物线开口向下。", "开口方向只看二次项系数 a。"),
          mathTierQuestion("对称轴", "函数 y=x²-4x+1 的对称轴是什么？", "x=2", "x=-b/(2a)=4/2=2。", "公式中的 -b 容易漏负号。"),
        ],
        巩固: [
          mathTierQuestion("顶点式", "函数 y=2(x-3)²-5 的顶点坐标是什么？", "(3，-5)", "顶点式 y=a(x-h)²+k 的顶点是 (h,k)。", "x-3 对应 h=3，不是 -3。"),
          mathTierQuestion("配方法", "将 y=x²-6x+5 配方，并写出顶点坐标。", "y=(x-3)²-4，顶点 (3，-4)", "x²-6x+5=(x-3)²-9+5。", "补平方后常漏减 9。"),
        ],
        挑战: [
          mathTierQuestion("最值应用", "用 20 m 篱笆围成一边靠墙的矩形，垂直墙的边长为 x m，求面积 S 关于 x 的关系式和最大面积。", "S=x(20-2x)，最大面积 50 m²", "S=-2x²+20x=-2(x-5)²+50。", "靠墙只围三边，别写成 2x+2y=20。"),
          mathTierQuestion("待定系数", "抛物线 y=a(x-1)(x-3) 经过点 (0，6)，求 a。", "a=2", "代入点得 6=a×(-1)×(-3)=3a。", "代点时 x、y 都要代入。"),
        ],
      },
    },
  };
  const selected = bank[chapter.id] ?? bank["math-chapter-1"];

  return ["基础", "巩固", "挑战"].map((level) => ({
    level,
    goal: selected.goals[level],
    questions: selected.questions[level].map((question, index) => ({
      id: `${chapter.id}-tier-${level}-${index + 1}`,
      ...question,
    })),
  }));
}

function mathTierQuestion(concept, question, answer, explanation, trap) {
  return {
    concept,
    question,
    answer,
    explanation,
    trap,
  };
}

function buildChapterTieredPractice(subjectId, chapter) {
  if (subjectId === "math") {
    return buildMathChapterTieredPractice(chapter);
  }

  const lessons = chapter.lessons ?? [];
  const points = uniqueText(lessons.flatMap((lessonItem) => lessonItem.keyPoints ?? []));
  const formulas = uniqueText(lessons.flatMap((lessonItem) => lessonItem.formulas ?? []));
  const mistakes = uniqueText(lessons.flatMap((lessonItem) => lessonItem.commonMistakes ?? []));
  const firstPoint = points[0] ?? chapter.title;
  const secondPoint = points[1] ?? firstPoint;
  const thirdPoint = points[2] ?? secondPoint;
  const firstFormula = formulas[0] ?? "本章核心关系";
  const firstMistake = mistakes[0] ?? subjectDefaultTrap(subjectId);
  const configs = {
    physics: {
      goals: {
        基础: "会画图、标变量、说单位",
        巩固: "会用公式或实验条件解释现象",
        挑战: "会判断条件变化后的结论",
      },
      questions: {
        基础: [
          {
            concept: firstPoint,
            question: `围绕“${firstPoint}”，画图时至少要标出哪两类信息？`,
            answer: "物理量/方向/作用点，以及单位或实验条件。",
            explanation: "物理题先图示化，后公式化，能减少条件漏看。",
            trap: firstMistake,
          },
          {
            concept: firstFormula,
            question: `使用“${firstFormula}”时，为什么要先统一单位？`,
            answer: "单位不统一会导致数值计算错误，也会掩盖物理量含义。",
            explanation: "公式不是孤立符号，单位是检查公式使用是否正确的线索。",
            trap: "只代数值，不看单位。",
          },
        ],
        巩固: [
          {
            concept: secondPoint,
            question: `给一个新情境时，怎样判断“${secondPoint}”是否成立？`,
            answer: "先找相关物理量，再检查条件和方向是否与原结论一致。",
            explanation: "物理结论通常有条件，换情境后必须重新检查。",
            trap: "只背结论，不看条件。",
          },
          {
            concept: "实验变量",
            question: "实验题中如何区分自变量、因变量和控制量？",
            answer: "主动改变的是自变量，观察测量的是因变量，保持不变的是控制量。",
            explanation: "变量关系清楚，实验结论才有依据。",
            trap: "把观察现象当作实验结论。",
          },
        ],
        挑战: [
          {
            concept: chapter.title,
            question: `把“${chapter.title}”中的一个公式或结论改成生活情境解释。`,
            answer: `用“现象 -> 物理量 -> 条件 -> 结论”说明 ${thirdPoint}。`,
            explanation: "能迁移到生活情境，说明不是只背了定义。",
            trap: firstMistake,
          },
          {
            concept: "故障/反例判断",
            question: "当实验数据和预期不一致时，优先检查哪三件事？",
            answer: "仪器连接或读数、变量是否控制、单位和计算是否正确。",
            explanation: "反例判断能训练孩子从证据而不是感觉出发。",
            trap: "直接改数据来迎合结论。",
          },
        ],
      },
    },
    chemistry: {
      goals: {
        基础: "能说出现象、物质和判断依据",
        巩固: "能连接微观本质、符号表达和实验规范",
        挑战: "能用证据链解释陌生变化",
      },
      questions: {
        基础: [
          {
            concept: firstPoint,
            question: `判断“${firstPoint}”相关变化时，最关键的依据是什么？`,
            answer: "是否有新物质生成，或是否有可靠实验现象支持判断。",
            explanation: "化学变化不能只看发光、发热或颜色变化，要回到新物质和证据。",
            trap: firstMistake,
          },
          {
            concept: "实验现象",
            question: "记录实验现象时，为什么要分反应前、反应中、反应后？",
            answer: "这样能区分原物质状态、变化过程和结果证据。",
            explanation: "分阶段记录有助于从现象推断本质。",
            trap: "只写结论，不写现象。",
          },
        ],
        巩固: [
          {
            concept: secondPoint,
            question: `用“宏观 -> 微观 -> 符号”三层说明“${secondPoint}”。`,
            answer: "先写看到的现象，再解释粒子或物质变化，最后写符号或表达。",
            explanation: "沪教版化学预习要尽早建立三重表征思维。",
            trap: "只背符号，不知道对应现象。",
          },
          {
            concept: "实验安全",
            question: "设计或观察实验时，安全提醒应该写在什么位置？",
            answer: "写在操作前或关键操作旁边，说明防止的具体风险。",
            explanation: "安全不是附加内容，它直接影响实验是否能做、能不能观察。",
            trap: "把安全提醒当作可有可无。",
          },
        ],
        挑战: [
          {
            concept: chapter.title,
            question: `遇到陌生物质变化，如何用本章“${chapter.title}”知识判断？`,
            answer: "列出现象，判断是否生成新物质，再补充微观或符号依据。",
            explanation: "挑战题训练证据链，避免凭生活经验乱猜。",
            trap: firstMistake,
          },
          {
            concept: "证据链",
            question: "把一道错题订正成三行证据链，应写哪三行？",
            answer: "现象是什么；判断依据是什么；结论或符号表达是什么。",
            explanation: "证据链能把化学错题从记忆问题变成推理问题。",
            trap: "只把正确答案抄一遍。",
          },
        ],
      },
    },
  };
  const config = configs[subjectId];

  return ["基础", "巩固", "挑战"].map((level) => ({
    level,
    goal: config.goals[level],
    questions: config.questions[level].map((question, index) => ({
      id: `${chapter.id}-tier-${level}-${index + 1}`,
      ...question,
    })),
  }));
}

function subjectDefaultTrap(subjectId) {
  return {
    english: "只看英文不回忆中文，或会翻译但不会造句",
    math: "只套公式不检查条件和步骤",
    chinese: "只写感受，缺少文本依据",
    physics: "只背结论，忽略条件、单位或图示",
    chemistry: "只看表面现象，忽略新物质、守恒或实验安全",
  }[subjectId] ?? "只记结论，不说依据";
}

function buildKnowledgeMap(subjectId, chapter) {
  const lessonTitles = chapter.lessons.map((item) => stripLessonNumber(item.title));
  const lessonPoints = uniqueText(chapter.lessons.flatMap((item) => item.keyPoints ?? [])).slice(0, 5);
  const mistakePoints = uniqueText(chapter.lessons.flatMap((item) => item.commonMistakes ?? [])).slice(0, 3);
  const firstLesson = lessonTitles[0] ?? chapter.title;
  const coreFromLessons = lessonPoints.slice(0, 3);

  const defaults = {
    english: {
      goal: `围绕“${chapter.overview}”，先过单词和短语，再用句型完成口头输出。`,
      coreIdeas: [
        `${chapter.dailyWords?.flatMap((day) => day.words).length ?? 0} 个词/短语分天背诵，先英译中再中译英`,
        `重点短语：${chapter.phrases?.slice(0, 3).join("、")}`,
        `句型入口：${chapter.sentencePatterns?.slice(0, 2).join("；")}`,
      ],
      traps: ["只看英文不回忆中文，容易形成假熟悉", "会背单词但不会放进句子，考试迁移会弱"],
      practicePath: ["每天 5 个词，先遮住中文回忆", "每个短语造 1 个短句", "用本单元句型做 3 句替换练习"],
      retrievalPrompt: `合上页面，说出 ${firstLesson} 中 5 个词的中文和 1 个句型例句。`,
    },
    math: {
      goal: `把“${chapter.title}”拆成概念、方法、题型和易错四层来预习。`,
      coreIdeas: coreFromLessons,
      traps: mistakePoints.length ? mistakePoints : ["只套公式不看适用条件", "题目问法变化后不会选择方法"],
      practicePath: ["先画知识关系图", "每课做 2 道基础题并写步骤", "把错题归到对应考点标签"],
      retrievalPrompt: `不看笔记，说出“${firstLesson}”的条件、方法和一个易错点。`,
    },
    chinese: {
      goal: `预习“${chapter.title}”时，把字词、内容、表达和写作迁移连起来。`,
      coreIdeas: coreFromLessons,
      traps: ["只背作者背景，不回到文本词句", "阅读题只写感受，缺少文本依据"],
      practicePath: ["先默写本课字词", "用一句话概括课文或观点", "摘一个表达方法迁移到作文素材"],
      retrievalPrompt: `合上页面，默写 4 个词语，并说出《${firstLesson}》的主题或表达方法。`,
    },
    physics: {
      goal: `用现象、变量、公式或实验条件来预习“${chapter.title}”。`,
      coreIdeas: coreFromLessons,
      traps: mistakePoints.length ? mistakePoints : ["只背结论，不看条件", "公式中的量和单位混淆"],
      practicePath: ["先画图或流程图", "标出变量、单位和条件", "用 1 道基础题检查是否会用"],
      retrievalPrompt: `用自己的话解释“${firstLesson}”，并说出一个实验或公式中的条件。`,
    },
    chemistry: {
      goal: `从宏观现象、微观本质、符号表达和实验安全四层预习“${chapter.title}”。`,
      coreIdeas: coreFromLessons,
      traps: mistakePoints.length ? mistakePoints : ["只看颜色或发热现象，不判断是否生成新物质", "化学式或方程式忽略守恒"],
      practicePath: ["先判断物质和变化类型", "再写出现象依据或符号表达", "最后补充实验安全和易错提醒"],
      retrievalPrompt: `用“现象 + 本质 + 依据”复述“${firstLesson}”。`,
    },
  };

  const map = defaults[subjectId];
  return {
    goal: map.goal,
    coreIdeas: ensureMinimum(map.coreIdeas, lessonPoints, chapter.overview),
    traps: ensureMinimum(map.traps, mistakePoints, "只记结论，不说依据").slice(0, 3),
    practicePath: map.practicePath,
    retrievalPrompt: map.retrievalPrompt,
  };
}

function buildChapterMasteryChecklist(subjectId, chapter) {
  const lessonPoints = uniqueText(chapter.lessons.flatMap((item) => item.keyPoints ?? []));
  const lessonTasks = uniqueText(chapter.lessons.flatMap((item) => item.tasks ?? []));
  const mistakes = uniqueText(chapter.lessons.flatMap((item) => item.commonMistakes ?? []));
  const formulas = uniqueText(chapter.lessons.flatMap((item) => item.formulas ?? []));
  const dictationWords = uniqueText(chapter.lessons.flatMap((item) => item.dictationWords ?? []));
  const lessonTitles = chapter.lessons.map((item) => stripLessonNumber(item.title));
  const firstLesson = lessonTitles[0] ?? chapter.title;
  const firstPoint = lessonPoints[0] ?? chapter.overview;
  const secondPoint = lessonPoints[1] ?? firstPoint;
  const wordCount = chapter.dailyWords?.flatMap((day) => day.words).length ?? 0;
  const phraseText = chapter.phrases?.slice(0, 4).join("、") ?? "本章重点短语";
  const grammarText = chapter.grammarNotes?.slice(0, 3).map((item) => item.title).join("、") ?? "本章语法点";

  const sharedRepair = [
    `把不会的内容回到“${firstLesson}”，重新写一条依据或例子。`,
    `把错题标成“不会概念 / 条件漏看 / 表达不完整”三类之一。`,
    `第二天只复习错因对应的 3 个知识点，不整章重看。`,
  ];
  const subjectChecklists = {
    english: {
      summary: `完成后应能把 ${wordCount} 个词/短语从“认得”推进到“会拼、会用、会造句”。`,
      mustKnow: [
        `${wordCount} 个词/短语的英文、中文和词性`,
        `重点短语：${phraseText}`,
        `句型和语法：${grammarText}`,
        `每个词至少能配 1 个语境或搭配`,
      ],
      outputTasks: [
        "完成本单元英译中和中译英各 1 轮",
        "写出 5 个词的英文拼写和中文意思",
        "用 2 个重点短语各写 1 个英文句子",
        "完成 1 组语法小测并解释错题原因",
      ],
      repairPrompts: [
        "如果只会看英文不会拼写，把错词放进明日听写队列。",
        "如果会翻译不会造句，先套用本单元句型再替换主语或宾语。",
        "如果语法题错，先圈连接词、主语和谓语位置。",
      ],
      masteryEvidence: [
        "能遮住中文说出本章核心词义",
        "能看中文拼出 10 个抽查词",
        "能用 1 个句型完成口头表达",
        "错词复习状态不再停留在“不会”",
      ],
    },
    math: {
      summary: `完成后应能说清本章考点、适用条件、解题步骤和高频错因。`,
      mustKnow: [
        ...lessonPoints.slice(0, 4),
        ...formulas.slice(0, 2).map((item) => `公式/方法：${item}`),
      ],
      outputTasks: [
        "说出本章 3 个核心考点分别考什么",
        "完成 2 道基础题并写出完整步骤",
        "写出一道错题的条件、方法、计算和结论",
        "判断 2 道相似题是否能用同一种方法",
      ],
      repairPrompts: [
        "如果不会下手，先重写已知条件和要求量。",
        "如果步骤跳跃，把每一步旁边标出用到的性质或公式。",
        "如果计算错，单独复查符号、单位、括号和等号变形。",
      ],
      masteryEvidence: [
        "能不看笔记复述本章知识结构",
        "能把错题归入具体考点",
        "能独立完成基础题并说明理由",
        "能识别一个常见陷阱",
      ],
    },
    chinese: {
      summary: `完成后应能默写本章字词，带文本依据回答阅读题，并迁移一个表达方法到写作。`,
      mustKnow: [
        `${dictationWords.length} 个课内默写词语按课分组掌握`,
        ...lessonPoints.slice(0, 3),
        `本章课文：${lessonTitles.slice(0, 4).join("、")}`,
      ],
      outputTasks: [
        "默写每课至少 4 个重点词语并自查订正",
        "写出 2 个阅读问题的文本依据",
        "完成 1 段 80 字批注或仿写",
        "说出本章一种表达方法及其作用",
      ],
      repairPrompts: [
        "如果阅读题空泛，回到原文找关键词、句式或人物动作。",
        "如果词语会读不会写，第二天只默写错字结构。",
        "如果作文迁移困难，先仿写句式再换材料。",
      ],
      masteryEvidence: [
        "能按课说出默写词语",
        "阅读答案中能写出文本依据",
        "能说明一个表达方法的作用",
        "能留下 1 条作文素材或仿写片段",
      ],
    },
    physics: {
      summary: `完成后应能用图示、变量、单位、公式和实验条件解释本章现象。`,
      mustKnow: [
        ...lessonPoints.slice(0, 4),
        ...formulas.slice(0, 2).map((item) => `公式/关系：${item}`),
      ],
      outputTasks: [
        "画出 1 张本章核心情境示意图",
        "解释 1 个公式中每个物理量和单位",
        "完成 2 道基础判断或计算题",
        "判断 1 个实验结论是否符合控制变量要求",
      ],
      repairPrompts: [
        "如果公式套错，先写物理量、单位和适用条件。",
        "如果实验题错，先找自变量、因变量和控制量。",
        "如果图示不清，重新标出方向、受力或电路连接。",
      ],
      masteryEvidence: [
        "能把现象转成图示或变量关系",
        "能说出公式使用条件",
        "能避开本章一个常见实验陷阱",
        "错题能定位到概念、图示或计算",
      ],
    },
    chemistry: {
      summary: `完成后应能从宏观现象、微观本质、符号表达和实验规范四层说明本章内容。`,
      mustKnow: [
        ...lessonPoints.slice(0, 4),
        ...formulas.slice(0, 2).map((item) => `符号/方程式：${item}`),
      ],
      outputTasks: [
        "写出 1 条“现象 -> 判断依据 -> 结论”的三行记录",
        "解释 1 个概念背后的微观或守恒依据",
        "完成 2 道基础辨析题",
        "说出 1 条实验安全或操作规范",
      ],
      repairPrompts: [
        "如果只写现象，补上是否生成新物质或粒子变化依据。",
        "如果符号表达错，逐项检查元素符号、下标和守恒。",
        "如果实验题错，先写操作目的、现象和安全限制。",
      ],
      masteryEvidence: [
        "能把宏观现象和微观解释对应起来",
        "能正确写出核心符号或方程式",
        "能指出一个实验操作风险",
        "能用证据判断物质变化",
      ],
    },
  };
  const checklist = subjectChecklists[subjectId];

  return {
    title: "章末掌握清单",
    summary: checklist.summary,
    mustKnow: ensureChecklistMinimum(checklist.mustKnow, lessonPoints, firstPoint, 5),
    outputTasks: ensureChecklistMinimum(checklist.outputTasks, lessonTasks, `完成“${firstPoint}”的输出检查`, 4),
    repairPrompts: ensureChecklistMinimum(checklist.repairPrompts, [...mistakes, ...sharedRepair], sharedRepair[0], 3),
    masteryEvidence: ensureChecklistMinimum(checklist.masteryEvidence, lessonTasks, `能复述“${secondPoint}”并留下证据`, 4),
  };
}

function uniqueText(items) {
  return [...new Set(items.filter(Boolean))];
}

function ensureMinimum(primary, fallback, fallbackText) {
  const result = uniqueText([...primary, ...fallback]);
  while (result.length < 3) {
    result.push(fallbackText);
  }
  return result.slice(0, 5);
}

function ensureChecklistMinimum(primary, fallback, fallbackText, count) {
  const result = uniqueText([...primary, ...fallback]);
  while (result.length < count) {
    result.push(fallbackText);
  }
  return result.slice(0, count);
}

function buildMicroDrills(subjectId, lessonItem) {
  const firstPoint = lessonItem.keyPoints?.[0] ?? lessonItem.title;
  const secondPoint = lessonItem.keyPoints?.[1] ?? firstPoint;
  const mistake = lessonItem.commonMistakes?.[0] ?? "把条件、依据和结论混在一起";
  const task = lessonItem.tasks?.[0] ?? "完成本课基础任务";
  const subjectActions = {
    english: {
      recall: "遮住中文，先说英文含义，再反向中译英",
      judge: "把本课句型换一个主语或场景，判断语序是否正确",
      output: "用 2 个词和 1 个句型说出一句完整表达",
    },
    math: {
      recall: "合上例题，复述条件、公式和第一步",
      judge: "看一个相似题，先判断能不能直接套公式",
      output: "把解题过程讲成 3 句话：已知、方法、结论",
    },
    chinese: {
      recall: "遮住笔记，默写字词并说出文本关键词",
      judge: "找一句文本依据，判断它支持哪个情感或观点",
      output: "把表达方法迁移成 80 字作文素材",
    },
    physics: {
      recall: "合上页面，画图并标出物理量或实验变量",
      judge: "判断本题是否满足公式或实验结论的使用条件",
      output: "用现象、条件、结论三句话解释本课知识",
    },
    chemistry: {
      recall: "遮住答案，按宏观现象、微观本质、符号表达复述",
      judge: "判断现象能否证明生成新物质或支持结论",
      output: "补一句实验安全提醒或易错辨析",
    },
  };
  const actions = subjectActions[subjectId] ?? subjectActions.math;

  return [
    {
      id: `${lessonItem.id}-micro-1`,
      method: "遮挡回忆",
      task: `${actions.recall}：${firstPoint}`,
      success: "能不看答案说出关键词，并指出一个条件或例子",
    },
    {
      id: `${lessonItem.id}-micro-2`,
      method: "判断辨析",
      task: `${actions.judge}：特别注意“${mistake}”`,
      success: "能说出为什么对或错，而不只给结论",
    },
    {
      id: `${lessonItem.id}-micro-3`,
      method: "输出迁移",
      task: `${actions.output}；从“${secondPoint}”开始`,
      success: `能独立完成“${task}”，并留下可复习的错因或例句`,
    },
  ];
}

function buildPracticeSet(subjectId, chapter, lessonItem) {
  if (subjectId === "math") {
    return buildMathPracticeSet(chapter, lessonItem);
  }
  if (subjectId === "chemistry") {
    return buildChemistryPracticeSet(chapter, lessonItem);
  }

  const firstPoint = lessonItem.keyPoints?.[0] ?? lessonItem.title;
  const secondPoint = lessonItem.keyPoints?.[1] ?? firstPoint;
  const mistake = lessonItem.commonMistakes?.[0] ?? "只记结论，不说依据";
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const templates = {
    english: [
      {
        difficulty: "基础",
        question: `预习英语“${lessonTitle}”时，哪一种做法最能检验单词或句型真的会用？`,
        choices: [`先英译中，再用“${firstPoint}”造一个短句`, "只按顺序朗读一遍英文", "看见中文释义就立刻翻下一页"],
        answer: `先英译中，再用“${firstPoint}”造一个短句`,
        explanation: "英语预习要把识记和输出连起来：能说出中文，还要能放进句子。",
      },
      {
        difficulty: "迁移",
        question: `遇到“${secondPoint}”相关句型时，最应该检查哪一点？`,
        choices: ["连接词、语序和主谓是否完整", "句子越长越好", "只要有一个本课单词就算正确"],
        answer: "连接词、语序和主谓是否完整",
        explanation: "语法预习的关键不是背名称，而是能在新句子里检查结构。",
      },
    ],
    chinese: [
      {
        difficulty: "基础",
        question: `预习《${lessonTitle}》时，阅读理解答案应该先回到哪里？`,
        choices: [`围绕“${firstPoint}”回到文本词句`, "只写读完后的第一感觉", "只背作者和年代"],
        answer: `围绕“${firstPoint}”回到文本词句`,
        explanation: "语文阅读题要从词句、结构和表达方法中找证据，再组织答案。",
      },
      {
        difficulty: "迁移",
        question: `把“${secondPoint}”迁移到作文时，哪种做法更有效？`,
        choices: ["提炼表达方法，再换成自己的材料", "整段照搬课文句子", "只记标题不积累素材"],
        answer: "提炼表达方法，再换成自己的材料",
        explanation: "作文迁移要学方法和表达角度，不复制教材文本。",
      },
    ],
    physics: [
      {
        difficulty: "基础",
        question: `处理“${lessonTitle}”相关题时，最先应该完成哪一步？`,
        choices: [`画图或标变量，确认：${firstPoint}`, "直接代入看到的第一个公式", "只背结论不看单位"],
        answer: `画图或标变量，确认：${firstPoint}`,
        explanation: "物理预习要把情境、图示、物理量和条件对应起来，再计算或判断。",
      },
      {
        difficulty: "迁移",
        question: `判断“${secondPoint}”是否适用时，哪项最重要？`,
        choices: ["说明现象、条件和结论之间的关系", "题目里出现相同词就一定适用", "只看答案是否常见"],
        answer: "说明现象、条件和结论之间的关系",
        explanation: "物理迁移题常在条件上变化，必须先判断条件是否满足。",
      },
    ],
    chemistry: [
      {
        difficulty: "基础",
        question: `观察“${lessonTitle}”实验现象时，先检查哪条证据链？`,
        choices: [`物质、现象和本质要能对应：${firstPoint}`, "只要有颜色变化就一定是化学变化", "只看答案是否眼熟"],
        answer: `物质、现象和本质要能对应：${firstPoint}`,
        explanation: "化学预习要把宏观现象和微观本质、符号表达联系起来。",
      },
      {
        difficulty: "迁移",
        question: `完成“${secondPoint}”相关实验或判断后，还必须补充什么？`,
        choices: ["实验安全、证据依据和易错提醒", "只写一个现象词", "忽略物质名称和条件"],
        answer: "实验安全、证据依据和易错提醒",
        explanation: "化学学习要同时关注证据和规范，尤其是安全、条件和守恒。",
      },
    ],
  };

  return templates[subjectId].map((question, index) => ({
    id: `${lessonItem.id}-practice-${index + 1}`,
    subject: subjectId,
    lessonId: lessonItem.id,
    chapterId: chapter.id,
    concept: lessonTitle,
    knowledgeTags: [lessonTitle, index === 0 ? firstPoint : secondPoint],
    trap: mistake,
    ...question,
  }));
}

function buildChemistryPracticeSet(chapter, lessonItem) {
  const bank = {
    "chem-1-1": [
      chemistryPractice("基础", "化学变化", "下列变化中，能说明有新物质生成的是哪一项？", ["蜡烛燃烧后生成二氧化碳和水", "蜡烛受热熔化成液态蜡", "水结成冰"], "蜡烛燃烧后生成二氧化碳和水", "燃烧生成了不同于石蜡的新物质；熔化、结冰只改变状态。", "只看发光放热，不看是否生成新物质。"),
      chemistryPractice("巩固", "现象与本质", "镁条燃烧时发出耀眼白光、生成白色固体。判断它属于化学变化的证据是？", ["生成了白色固体氧化镁", "发出白光", "温度升高"], "生成了白色固体氧化镁", "发光放热是伴随现象，生成新物质才是判断化学变化的根本证据。", "把伴随现象当成根本依据。"),
    ],
    "chem-1-2": [
      chemistryPractice("基础", "物理性质和化学性质", "下列关于氧气的描述中，属于化学性质的是哪一项？", ["能支持木炭燃烧", "通常状况下是无色气体", "密度比空气略大"], "能支持木炭燃烧", "支持燃烧需要在化学变化中表现出来，属于化学性质。", "把颜色、状态、密度和化学性质混在一起。"),
      chemistryPractice("巩固", "性质决定用途", "铝常用于制作导线，主要利用的是铝的哪种性质？", ["导电性", "可燃性", "酸碱性"], "导电性", "导电性不需要通过生成新物质表现出来，属于物理性质。", "看到“用途”就误以为一定是化学性质。"),
    ],
    "chem-1-3": [
      chemistryPractice("基础", "实验现象记录", "观察蜡烛燃烧时，哪一种记录更像实验现象？", ["火焰分层，罩在火焰上方的烧杯内壁有水雾", "蜡烛生成了二氧化碳", "蜡烛一定完全燃烧"], "火焰分层，罩在火焰上方的烧杯内壁有水雾", "现象要写看得见、测得到的变化，生成物判断要靠后续检验。", "把结论直接写成现象。"),
      chemistryPractice("巩固", "实验安全", "闻氨气或其他未知气体气味时，正确做法是什么？", ["用手在瓶口轻轻扇闻", "把鼻子凑到瓶口深吸", "先加热再闻"], "用手在瓶口轻轻扇闻", "扇闻能减少氨气等刺激性或有害气体直接进入鼻腔。", "忽略闻气体的基本安全操作。"),
    ],
    "chem-2-1": [
      chemistryPractice("基础", "空气中氧气含量", "红磷燃烧测空气中氧气含量时，集气瓶内水面约上升到原空气体积的多少？", ["1/5", "4/5", "1/2"], "1/5", "氧气约占空气体积的 1/5，红磷消耗氧气后压强减小，水进入集气瓶。", "误认为空气中最多的是氧气。"),
      chemistryPractice("巩固", "空气成分", "空气中体积分数最大的气体是什么？", ["氮气", "氧气", "二氧化碳"], "氮气", "空气主要由氮气和氧气组成，其中氮气约占 78%。", "把支持呼吸的氧气误认为含量最多。"),
    ],
    "chem-2-2": [
      chemistryPractice("基础", "氧气检验", "检验一瓶无色气体是否为氧气，通常使用哪种方法？", ["将带火星木条伸入瓶内，观察是否复燃", "闻气味", "倒入澄清石灰水"], "将带火星木条伸入瓶内，观察是否复燃", "氧气能支持燃烧，带火星木条复燃是常用检验方法。", "把氧气检验和二氧化碳检验混淆。"),
      chemistryPractice("巩固", "铁丝燃烧", "铁丝在氧气中燃烧前，集气瓶底要放少量水或细沙，主要目的是什么？", ["防止高温熔融物炸裂瓶底", "让氧气更多", "吸收生成的黑色固体"], "防止高温熔融物炸裂瓶底", "铁丝燃烧生成高温熔融物，水或细沙能保护集气瓶。", "只背现象，漏掉安全原因。"),
    ],
    "chem-2-3": [
      chemistryPractice("基础", "氧气制备", "用过氧化氢溶液和二氧化锰制取氧气时，二氧化锰的作用是什么？", ["催化剂", "生成氧气的反应物", "吸收氧气"], "催化剂", "二氧化锰能改变反应速率，反应前后质量和化学性质基本不变。", "把催化剂当成被消耗的反应物。"),
      chemistryPractice("巩固", "收集方法", "用排水法收集氧气，开始收集的合适时机是什么？", ["导管口气泡连续、均匀冒出时", "刚加热就立即收集", "水槽中没有气泡时"], "导管口气泡连续、均匀冒出时", "开始冒出的气体常混有空气，连续均匀后收集更纯。", "过早收集导致氧气不纯。"),
    ],
    "chem-2-4": [
      chemistryPractice("基础", "电解水", "电解水实验中，负极产生的气体和正极产生的气体体积比约为多少？", ["氢气:氧气 = 2:1", "氢气:氧气 = 1:2", "氧气:氮气 = 1:2"], "氢气:氧气 = 2:1", "电解水负极产生氢气，正极产生氧气，体积比约为 2:1。", "把正负极或氢氧体积比写反。"),
      chemistryPractice("巩固", "水的净化", "过滤操作主要能除去水中的哪类杂质？", ["不溶性固体杂质", "所有可溶性盐", "水分子"], "不溶性固体杂质", "过滤依靠滤纸截留不溶性固体，不能除去溶解在水中的物质。", "认为过滤能把水变成纯净水。"),
    ],
    "chem-2-5": [
      chemistryPractice("基础", "装置气密性", "制取氧气前检查装置气密性，主要是为了避免什么问题？", ["装置漏气导致收集不到足量氧气", "反应物颜色改变", "氧气变成氮气"], "装置漏气导致收集不到足量氧气", "气密性不好会让生成的氧气从接口逸出，影响收集和实验结果。", "跳过实验前检查。"),
      chemistryPractice("巩固", "防倒吸", "加热高锰酸钾并用排水法收集氧气，实验结束时应先做什么？", ["先把导管移出水面", "先熄灭酒精灯", "先把试管竖直"], "先把导管移出水面", "先移导管可防止水倒吸进入热试管，避免试管炸裂。", "实验结束顺序颠倒。"),
    ],
    "chem-3-1": [
      chemistryPractice("基础", "分子变化", "水蒸发和水电解相比，水分子发生改变的是哪一个？", ["水电解", "水蒸发", "两者都没有"], "水电解", "蒸发只是分子间隔改变，电解水生成氢气和氧气，水分子发生改变。", "把物理变化和化学变化中的微粒变化混淆。"),
      chemistryPractice("巩固", "基本微粒", "氯化钠由哪类微粒构成更合适？", ["离子", "分子", "单个电子"], "离子", "氯化钠由钠离子和氯离子构成。", "认为所有物质都由分子构成。"),
    ],
    "chem-3-2": [
      chemistryPractice("基础", "元素符号", "元素符号 H 不能表示哪一项？", ["一个氢分子", "氢元素", "一个氢原子"], "一个氢分子", "H 可表示氢元素或一个氢原子，氢分子通常写作 H₂。", "把元素符号和分子符号混淆。"),
      chemistryPractice("巩固", "元素组成", "关于 H₂O 的组成，下列说法正确的是？", ["水由氢元素和氧元素组成", "水由两个氢元素和一个氧元素组成", "水只含氢分子"], "水由氢元素和氧元素组成", "元素只讲种类，不讲个数；H₂O 中的 2 表示每个水分子中有 2 个氢原子。", "把元素种类说成元素个数。"),
    ],
    "chem-3-3": [
      chemistryPractice("基础", "相对分子质量", "H₂O 的相对分子质量是多少？", ["18", "10", "3"], "18", "H 的相对原子质量约为 1，O 约为 16，H₂O 为 1×2+16=18。", "漏乘右下角数字。"),
      chemistryPractice("巩固", "符号数字含义", "Mg²⁺ 中右上角的 2+ 表示什么？", ["一个镁离子带 2 个单位正电荷", "有 2 个镁原子", "镁元素排第 2 位"], "一个镁离子带 2 个单位正电荷", "离子电荷写在右上角，化学式中原子个数写在右下角。", "把离子电荷和原子个数位置混淆。"),
    ],
    "chem-4-1": [
      chemistryPractice("基础", "反应类型", "高锰酸钾受热生成锰酸钾、二氧化锰和氧气，这属于哪类基本反应？", ["分解反应", "化合反应", "置换反应"], "分解反应", "一种反应物生成多种物质，符合分解反应特征。", "只看到有氧气生成就忽略反应物和生成物种类。"),
      chemistryPractice("巩固", "氧化反应", "铁丝在氧气中燃烧生成四氧化三铁，同时也属于哪类反应？", ["氧化反应", "蒸发", "过滤"], "氧化反应", "物质与氧发生的反应属于氧化反应，燃烧是剧烈氧化。", "把氧化反应只理解成有火焰的燃烧。"),
    ],
    "chem-4-2": [
      chemistryPractice("基础", "质量守恒", "在密闭容器中点燃白磷，冷却后容器内物质总质量会怎样？", ["不变", "变小", "一定变大"], "不变", "化学反应前后原子种类、数目和质量不变，密闭体系中总质量守恒。", "把气体参与反应误认为质量消失。"),
      chemistryPractice("巩固", "开放体系", "碳酸钙和稀盐酸在敞口烧杯中反应，反应后烧杯内物质质量可能变小，主要原因是什么？", ["生成的二氧化碳逸出", "质量守恒定律失效", "水变成了氧气"], "生成的二氧化碳逸出", "总质量仍守恒，但敞口体系中气体离开烧杯，称量到的质量会变小。", "用敞口实验否定质量守恒。"),
    ],
    "chem-4-3": [
      chemistryPractice("基础", "方程式配平", "配平 H₂ + O₂ -> H₂O 后，H₂ 前的化学计量数应为多少？", ["2", "1", "4"], "2", "配平后为 2H₂ + O₂ = 2H₂O，反应前后 H、O 原子数相等。", "为配平而改变化学式右下角。"),
      chemistryPractice("巩固", "化学方程式含义", "化学方程式 2H₂ + O₂ = 2H₂O 不能直接表示哪一项？", ["反应一定发出蓝色火焰", "氢气和氧气反应生成水", "分子个数比为 2:1:2"], "反应一定发出蓝色火焰", "方程式主要表示反应物、生成物、条件和数量关系，具体火焰现象要看实验条件。", "把方程式含义和实验现象混为一谈。"),
    ],
    "chem-5-1": [
      chemistryPractice("基础", "金属活动性", "把镁、锌、铁分别放入稀盐酸中，通常产生气泡最快的是哪种金属？", ["镁", "铁", "锌"], "镁", "镁比锌、铁更活泼，与酸反应放出氢气更快。", "认为所有金属与酸反应快慢相同。"),
      chemistryPractice("巩固", "合金性质", "不锈钢比纯铁更常用于厨具，主要因为它具有什么优势？", ["耐腐蚀性更好", "一定更软", "不能导热"], "耐腐蚀性更好", "合金常比纯金属具有更适合用途的性能，如强度、硬度或耐腐蚀性。", "把合金理解成性能一定更差。"),
    ],
    "chem-5-2": [
      chemistryPractice("基础", "炼铁反应", "工业炼铁中，一氧化碳还原氧化铁的主要作用是什么？", ["夺取氧化铁中的氧，生成铁", "提供氧气", "吸收铁"], "夺取氧化铁中的氧，生成铁", "CO 作还原剂，使 Fe₂O₃ 失去氧生成 Fe。", "把 CO 当成助燃气体。"),
      chemistryPractice("巩固", "实验安全", "一氧化碳还原氧化铁实验结束后，为什么还要继续通 CO 至装置冷却？", ["防止热的铁重新被氧化", "让玻璃管内充满氧气", "让 Fe₂O₃ 变成水"], "防止热的铁重新被氧化", "高温下生成的铁容易再次被氧化，继续通 CO 可隔绝空气。", "忽略 CO 有毒和实验顺序。"),
    ],
    "chem-5-3": [
      chemistryPractice("基础", "铁生锈条件", "探究铁钉生锈条件时，铁钉同时接触哪两种物质最容易生锈？", ["氧气和水", "氮气和沙子", "二氧化碳和酒精"], "氧气和水", "铁生锈通常需要同时接触氧气和水。", "认为只有水就一定快速生锈。"),
      chemistryPractice("巩固", "金属防护", "给自行车链条涂油能防锈，主要原理是什么？", ["隔绝水和氧气", "把铁变成铜", "增加空气接触"], "隔绝水和氧气", "涂油形成保护层，减少铁与水、氧气接触。", "只记方法，不会解释防锈条件。"),
    ],
  };
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const questions = bank[lessonItem.id] ?? [
    chemistryPractice("基础", lessonTitle, `观察与“${lessonTitle}”有关的实验时，下列记录哪一项最具体？`, ["写出反应前、反应中、反应后的现象", "只写很好看", "只写结论"], "写出反应前、反应中、反应后的现象", "化学题要用具体物质、现象和证据支持结论。", "只写结论，不写现象。"),
    chemistryPractice("巩固", lessonTitle, `围绕“${lessonTitle}”，下列哪项能作为化学判断证据？`, ["物质变化、实验现象或化学式 H₂O 等符号表达", "只看颜色是否鲜艳", "只看题目长短"], "物质变化、实验现象或化学式 H₂O 等符号表达", "化学判断需要把宏观现象、微观解释和符号表达连起来。", "只看表面现象。"),
  ];

  return questions.map((question, index) => ({
    id: `${lessonItem.id}-practice-${index + 1}`,
    subject: "chemistry",
    lessonId: lessonItem.id,
    chapterId: chapter.id,
    knowledgeTags: [lessonTitle, question.concept],
    ...question,
  }));
}

function buildMathPracticeSet(chapter, lessonItem) {
  const bank = {
    "math-1-1": [
      mathPractice("基础", "一元二次方程", "下列方程中，属于一元二次方程的是哪一个？", ["3x + 1 = 0", "x² - 4x + 3 = 0", "1/x + x = 2"], "x² - 4x + 3 = 0", "只含一个未知数，且整理后最高次数为 2，二次项系数不为 0。", "没有整理成整式方程就直接判断。"),
      mathPractice("基础", "标准形式", "把 2x(x - 3) = x + 5 化成 ax² + bx + c = 0 的形式。", ["2x² - 7x - 5 = 0", "2x² - 5x + 5 = 0", "2x² - 6x = x + 5"], "2x² - 7x - 5 = 0", "展开得 2x² - 6x = x + 5，移项得 2x² - 7x - 5 = 0。", "移项时符号容易写反。"),
    ],
    "math-1-2": [
      mathPractice("基础", "因式分解法", "解方程 x² - 5x + 6 = 0。", ["x = 2 或 x = 3", "x = -2 或 x = -3", "x = 1 或 x = 6"], "x = 2 或 x = 3", "x² - 5x + 6 = (x - 2)(x - 3)，所以 x = 2 或 x = 3。", "分解后漏掉一个根。"),
      mathPractice("巩固", "公式法", "用公式法解方程 2x² - 5x - 3 = 0。", ["x = 3 或 x = -1/2", "x = -3 或 x = 1/2", "x = 2 或 x = -3/2"], "x = 3 或 x = -1/2", "a=2，b=-5，c=-3，Δ=25+24=49，x=(5±7)/4，得 3 和 -1/2。", "公式中 -b 和 ±√Δ 容易写错。"),
    ],
    "math-1-3": [
      mathPractice("基础", "根的判别式", "方程 x² - 4x + k = 0 有两个相等实数根，则 k 的值为多少？", ["4", "-4", "16"], "4", "两个相等实数根要求 Δ=0，即 16 - 4k = 0，所以 k=4。", "把两个相等实根误认为 Δ>0。"),
      mathPractice("巩固", "参数范围", "若方程 x² + 2x + m = 0 有实数根，则 m 的取值范围是？", ["m ≤ 1", "m < 1", "m ≥ 1"], "m ≤ 1", "有实数根要求 Δ≥0，4 - 4m ≥ 0，所以 m≤1。", "题干说“有实数根”时要包含 Δ=0。"),
    ],
    "math-1-4": [
      mathPractice("基础", "增长率模型", "某商品原价 100 元，连续两次按相同百分率上涨后为 121 元，设每次上涨率为 x，方程应列为？", ["100(1+x)²=121", "100(1+2x)=121", "121(1-x)²=100"], "100(1+x)²=121", "连续两次相同增长率要乘两次 (1+x)。", "把两次增长误写成 1+2x。"),
      mathPractice("巩固", "实际问题检验", "长方形长比宽多 3 cm，面积为 40 cm²，设宽为 x cm，可列方程为？", ["x(x+3)=40", "x+x+3=40", "3x=40"], "x(x+3)=40", "宽为 x，长为 x+3，面积为长乘宽。", "只抓到“多 3”却忘了面积关系。"),
    ],
    "math-2-1": [
      mathPractice("基础", "垂径定理", "圆 O 的半径为 5，圆心 O 到弦 AB 的距离为 3，则弦 AB 的长为多少？", ["8", "6", "10"], "8", "垂径定理得半弦长为 √(5²-3²)=4，所以 AB=8。", "把圆心到弦的距离当成半弦长。"),
      mathPractice("巩固", "等弦性质", "同圆中，弦 AB = 弦 CD，则下列说法正确的是？", ["AB 和 CD 所对的圆心角相等", "AB 一定平行 CD", "AB 一定是直径"], "AB 和 CD 所对的圆心角相等", "同圆中等弦对等弧、等圆心角。", "把等弦性质误解成位置关系相同。"),
    ],
    "math-2-2": [
      mathPractice("基础", "圆周角", "在圆 O 中，∠AOB = 100°，点 C 在圆上且与 O 在弦 AB 同侧外，则 ∠ACB 的度数是？", ["50°", "100°", "25°"], "50°", "同弧所对圆周角等于圆心角的一半，所以 ∠ACB=50°。", "把圆周角和圆心角看成相等。"),
      mathPractice("巩固", "直径所对圆周角", "AB 是圆 O 的直径，点 C 在圆上，若 AC = 6，BC = 8，则 AB 的长为多少？", ["10", "14", "7"], "10", "直径所对圆周角为 90°，△ABC 为直角三角形，AB=√(6²+8²)=10。", "没有利用直径所对圆周角是直角。"),
    ],
    "math-2-3": [
      mathPractice("基础", "直线与圆的位置关系", "圆 O 的半径 r=5，圆心到直线 l 的距离 d=5，则直线 l 与圆 O 的位置关系是？", ["相切", "相交", "相离"], "相切", "d=r 时直线与圆相切。", "把 d=r 误判成相交。"),
      mathPractice("巩固", "切线长", "点 P 到圆心 O 的距离 OP=13，圆半径 OT=5，PT 为切线，则 PT 的长为多少？", ["12", "18", "8"], "12", "半径垂直切线，△OPT 为直角三角形，PT=√(13²-5²)=12。", "切线题忘记连接圆心与切点。"),
    ],
    "math-2-4": [
      mathPractice("基础", "正多边形中心角", "正六边形的每个中心角是多少度？", ["60°", "90°", "120°"], "60°", "中心角 = 360°÷6 = 60°。", "把中心角和内角混淆。"),
      mathPractice("巩固", "正多边形内角", "正八边形的每个内角是多少度？", ["135°", "120°", "144°"], "135°", "正 n 边形内角 = (n-2)×180°÷n，n=8 得 135°。", "把外角 45° 当成内角。"),
    ],
    "math-3-1": [
      mathPractice("基础", "平均数", "一组数据 4，6，8，10，12 的平均数是？", ["8", "10", "6"], "8", "平均数为 (4+6+8+10+12)÷5=8。", "只取中间数时要确认数据是否等距。"),
      mathPractice("巩固", "加权平均数", "一次测试中，平时成绩 80 分权重 40%，期末成绩 90 分权重 60%，总评成绩是多少？", ["86", "85", "88"], "86", "80×40%+90×60%=32+54=86。", "把权重当成人数或直接求普通平均。"),
    ],
    "math-3-2": [
      mathPractice("基础", "中位数", "数据 7，3，8，5，9 的中位数是？", ["7", "5", "8"], "7", "排序为 3，5，7，8，9，中间数是 7。", "没有先排序就取中间位置。"),
      mathPractice("巩固", "偶数个数据", "数据 12，15，10，18 的中位数是？", ["13.5", "15", "12"], "13.5", "排序为 10，12，15，18，中位数是 (12+15)÷2=13.5。", "偶数个数据要取中间两个数的平均数。"),
    ],
    "math-3-3": [
      mathPractice("基础", "众数", "数据 2，3，3，4，5，5，5 的众数是？", ["5", "3", "4"], "5", "出现次数最多的是 5，共 3 次。", "众数看频数，不看大小。"),
      mathPractice("巩固", "多个众数", "数据 1，2，2，3，3，4 的众数是？", ["2 和 3", "2", "没有众数"], "2 和 3", "2 和 3 都出现 2 次，且次数最多，所以都是众数。", "一组数据可以有多个众数。"),
    ],
    "math-3-4": [
      mathPractice("基础", "方差", "甲组数据 8，8，8，8；乙组数据 6，8，8，10。哪组更稳定？", ["甲组", "乙组", "一样稳定"], "甲组", "甲组方差为 0，波动最小，更稳定。", "平均数相同不代表稳定性相同。"),
      mathPractice("巩固", "离散程度", "若两组数据平均数相同，方差分别为 1.2 和 3.6，则哪组波动较小？", ["方差 1.2 的一组", "方差 3.6 的一组", "无法判断"], "方差 1.2 的一组", "方差越小，数据围绕平均数波动越小。", "把方差大误认为成绩更稳定。"),
    ],
    "math-4-1": [
      mathPractice("基础", "等可能概率", "袋中有 3 个红球、2 个白球，除颜色外完全相同，任取 1 个球，取到红球的概率是？", ["3/5", "2/5", "1/3"], "3/5", "共有 5 个等可能结果，其中红球 3 个。", "分母应是所有等可能结果数。"),
      mathPractice("巩固", "等可能判断", "掷一枚均匀骰子一次，点数大于 4 的概率是？", ["1/3", "1/2", "2/3"], "1/3", "大于 4 的点数是 5、6，共 2 种，概率 2/6=1/3。", "把“大于 4”误数成 4、5、6。"),
    ],
    "math-4-2": [
      mathPractice("基础", "列表法", "同时抛掷两枚硬币，出现一正一反的概率是？", ["1/2", "1/4", "3/4"], "1/2", "样本空间为 正正、正反、反正、反反，一正一反有 2 种，概率 1/2。", "正反和反正是两个不同结果。"),
      mathPractice("巩固", "两步试验", "甲、乙各从数字 1，2，3 中任取一个数，两个数相同的概率是？", ["1/3", "1/6", "2/3"], "1/3", "共有 3×3=9 种结果，相同有 (1,1),(2,2),(3,3) 共 3 种。", "列表时漏掉顺序组合。"),
    ],
    "math-4-3": [
      mathPractice("基础", "树状图", "从数字 1，2 中先后各取一次且放回，两次数字之和为 3 的概率是？", ["1/2", "1/4", "1"], "1/2", "结果有 (1,1),(1,2),(2,1),(2,2)，和为 3 的有 2 种。", "放回试验每一步结果数不变。"),
      mathPractice("巩固", "路径计数", "袋中有红、白两球各 1 个，先后摸两次不放回，摸到一红一白的概率是？", ["1", "1/2", "1/4"], "1", "不放回摸两次一定是一红一白，只是顺序不同。", "没有看清“不放回”。"),
    ],
    "math-4-4": [
      mathPractice("基础", "频率估计概率", "某种种子发芽试验 500 粒，发芽 460 粒，可估计发芽概率约为？", ["0.92", "0.46", "0.08"], "0.92", "频率 460÷500=0.92，可用来估计概率。", "频率是近似估计，不是每次必然结果。"),
      mathPractice("巩固", "频率稳定性", "抛硬币试验次数越多，正面朝上的频率通常会接近多少？", ["1/2", "1", "0"], "1/2", "均匀硬币正反两面等可能，频率会在大量试验中接近概率 1/2。", "少量试验的频率不能代表长期概率。"),
    ],
    "math-5-1": [
      mathPractice("基础", "二次函数图像", "函数 y = -2x² + 3 的图像开口方向是？", ["向下", "向上", "不能判断"], "向下", "二次项系数 a=-2<0，抛物线开口向下。", "开口方向只看 a 的符号。"),
      mathPractice("巩固", "对称轴", "函数 y = x² - 4x + 1 的对称轴是？", ["x = 2", "x = -2", "x = 4"], "x = 2", "对称轴 x=-b/2a=4/2=2。", "公式中 -b 容易漏负号。"),
    ],
    "math-5-2": [
      mathPractice("基础", "顶点式", "函数 y = 2(x - 3)² - 5 的顶点坐标是？", ["(3，-5)", "(-3，-5)", "(3，5)"], "(3，-5)", "顶点式 y=a(x-h)²+k 的顶点是 (h,k)。", "括号内 x-3 对应 h=3，不是 -3。"),
      mathPractice("巩固", "平移", "由 y=x² 向右平移 2 个单位、向上平移 1 个单位得到的函数是？", ["y=(x-2)²+1", "y=(x+2)²+1", "y=(x-2)²-1"], "y=(x-2)²+1", "右移 2 写成 x-2，上移 1 写成 +1。", "左右平移在括号内符号相反。"),
    ],
    "math-5-3": [
      mathPractice("基础", "最值", "函数 y = (x - 1)² + 4 的最小值是？", ["4", "1", "5"], "4", "a=1>0，开口向上，顶点纵坐标 4 是最小值。", "把顶点横坐标误当最值。"),
      mathPractice("巩固", "限定范围", "函数 y=x²-2x 在 0≤x≤3 上的最小值是多少？", ["-1", "0", "3"], "-1", "y=(x-1)²-1，顶点 x=1 在范围内，最小值 -1。", "限定范围题要比较顶点和端点。"),
    ],
    "math-5-4": [
      mathPractice("基础", "二次函数应用", "用 20 m 篱笆围成一边靠墙的矩形，垂直墙的边长为 x m，面积 S 与 x 的关系式是？", ["S=x(20-2x)", "S=x(20-x)", "S=2x(20-x)"], "S=x(20-2x)", "两条垂直墙的边共 2x，平行墙的一边为 20-2x，面积 S=x(20-2x)。", "靠墙问题只需要围三边。"),
      mathPractice("巩固", "抛物线模型", "抛物线 y=a(x-1)(x-3) 经过点 (0，3)，则 a 的值是？", ["1", "-1", "3"], "1", "代入 (0,3)：3=a×(-1)×(-3)=3a，所以 a=1。", "代点时要同时代入 x 和 y。"),
    ],
  };

  const questions = bank[lessonItem.id] ?? [
    mathPractice("基础", stripLessonNumber(lessonItem.title), `完成一道与“${stripLessonNumber(lessonItem.title)}”有关的含数字计算题。`, ["按题意列式并求解", "只写结论", "跳过计算"], "按题意列式并求解", "数学题要有列式、计算和检验。", "跳步导致无法检查错因。"),
    mathPractice("巩固", stripLessonNumber(lessonItem.title), `完成一道与“${stripLessonNumber(lessonItem.title)}”有关的变式题。`, ["写出依据和过程", "只抄答案", "只看题目关键词"], "写出依据和过程", "变式题要检查条件是否变化，并写清推理。", "看见相似关键词就直接套。"),
  ];

  return questions.map((question, index) => ({
    id: `${lessonItem.id}-practice-${index + 1}`,
    subject: "math",
    lessonId: lessonItem.id,
    chapterId: chapter.id,
    knowledgeTags: [stripLessonNumber(lessonItem.title), question.concept],
    ...question,
  }));
}

function mathPractice(difficulty, concept, question, choices, answer, explanation, trap) {
  return {
    difficulty,
    concept,
    question,
    choices,
    answer,
    explanation,
    trap,
  };
}

function chemistryPractice(difficulty, concept, question, choices, answer, explanation, trap) {
  return {
    difficulty,
    concept,
    question,
    choices,
    answer,
    explanation,
    trap,
  };
}

function buildMathQuickCheck(chapter, lessonItem) {
  const bank = {
    "math-1-1": mathQuiz(
      "若 (m - 2)x² + 3x - 1 = 0 是一元二次方程，则 m 应满足什么条件？",
      ["m ≠ 2", "m = 2", "m 可以为任意实数"],
      "m ≠ 2",
      "一元二次方程要求二次项系数不为 0，所以 m - 2 ≠ 0。",
    ),
    "math-1-2": mathQuiz(
      "方程 x² - 9 = 0 的两个根是？",
      ["x = 3 或 x = -3", "x = 9 或 x = -9", "x = 0 或 x = 9"],
      "x = 3 或 x = -3",
      "x²=9，直接开平方得 x=±3。",
    ),
    "math-1-3": mathQuiz(
      "方程 x² + 4x + 5 = 0 的判别式 Δ 等于多少？",
      ["-4", "4", "36"],
      "-4",
      "Δ=b²-4ac=4²-4×1×5=-4，所以没有实数根。",
    ),
    "math-1-4": mathQuiz(
      "某数连续两次增长 10% 后为 121，设原数为 x，可列方程为？",
      ["x(1+10%)² = 121", "x(1+20%) = 121", "121(1-10%)² = x"],
      "x(1+10%)² = 121",
      "连续两次增长要乘两个 (1+10%)。",
    ),
    "math-2-1": mathQuiz(
      "圆 O 半径为 10，弦 AB = 16，则圆心 O 到弦 AB 的距离是？",
      ["6", "8", "12"],
      "6",
      "垂径定理得半弦长为 8，距离 d=√(10²-8²)=6。",
    ),
    "math-2-2": mathQuiz(
      "在圆 O 中，∠AOB = 96°，点 C 在圆上且∠ACB 对应同一条弧 AB，则∠ACB 等于多少？",
      ["48°", "96°", "192°"],
      "48°",
      "同弧所对圆周角等于圆心角的一半。",
    ),
    "math-2-3": mathQuiz(
      "圆 O 半径 r = 4，圆心 O 到直线 l 的距离 d = 6，则直线 l 与圆 O 的位置关系是？",
      ["相离", "相切", "相交"],
      "相离",
      "d>r 时直线与圆相离。",
    ),
    "math-2-4": mathQuiz(
      "正五边形的每个外角是多少度？",
      ["72°", "108°", "144°"],
      "72°",
      "正 n 边形每个外角为 360°÷n，n=5 得 72°。",
    ),
    "math-3-1": mathQuiz(
      "数据 2，4，6，8 的平均数是多少？",
      ["5", "6", "4"],
      "5",
      "平均数为 (2+4+6+8)÷4=5。",
    ),
    "math-3-2": mathQuiz(
      "数据 9，3，7，5，11 的中位数是多少？",
      ["7", "5", "9"],
      "7",
      "先排序为 3，5，7，9，11，中间数为 7。",
    ),
    "math-3-3": mathQuiz(
      "数据 4，4，5，6，6，6，7 的众数是多少？",
      ["6", "4", "5"],
      "6",
      "出现次数最多的是 6。",
    ),
    "math-3-4": mathQuiz(
      "甲组数据方差为 0.8，乙组数据方差为 2.4，哪组数据更稳定？",
      ["甲组", "乙组", "无法判断"],
      "甲组",
      "方差越小，数据波动越小，稳定性越强。",
    ),
    "math-4-1": mathQuiz(
      "袋中有 2 个红球、3 个白球，任取 1 个球，取到白球的概率是多少？",
      ["3/5", "2/5", "1/3"],
      "3/5",
      "共有 5 个等可能结果，白球有 3 个。",
    ),
    "math-4-2": mathQuiz(
      "同时抛掷两枚均匀硬币，出现两个正面的概率是多少？",
      ["1/4", "1/2", "3/4"],
      "1/4",
      "结果有正正、正反、反正、反反，两个正面只有 1 种。",
    ),
    "math-4-3": mathQuiz(
      "从数字 1，2，3 中先后各取一次且放回，两次数字之和为 4 的概率是多少？",
      ["1/3", "2/9", "1/2"],
      "1/3",
      "共有 3×3=9 种结果，和为 4 的有 (1,3),(2,2),(3,1) 共 3 种。",
    ),
    "math-4-4": mathQuiz(
      "某篮球运动员罚球 200 次命中 150 次，可估计其罚球命中概率约为多少？",
      ["0.75", "0.25", "1.5"],
      "0.75",
      "用频率估计概率：150÷200=0.75。",
    ),
    "math-5-1": mathQuiz(
      "二次函数 y = 3x² - 6x + 2 的对称轴是？",
      ["x = 1", "x = -1", "x = 2"],
      "x = 1",
      "对称轴 x=-b/(2a)=6/6=1。",
    ),
    "math-5-2": mathQuiz(
      "二次函数 y = -2(x + 1)² + 3 的顶点坐标是？",
      ["(-1，3)", "(1，3)", "(-1，-3)"],
      "(-1，3)",
      "顶点式 y=a(x-h)²+k 中顶点为 (h,k)，这里 h=-1，k=3。",
    ),
    "math-5-3": mathQuiz(
      "函数 y = (x - 2)² - 1 的最小值是多少？",
      ["-1", "2", "1"],
      "-1",
      "a=1>0，抛物线开口向上，顶点纵坐标 -1 为最小值。",
    ),
    "math-5-4": mathQuiz(
      "抛物线 y = a(x - 1)(x - 3) 经过点 (0，6)，则 a 的值是？",
      ["2", "1", "-2"],
      "2",
      "代入 (0，6)：6=a×(-1)×(-3)=3a，所以 a=2。",
    ),
  };

  const fallback = mathQuiz(
    `与“${stripLessonNumber(lessonItem.title)}”相关：若题中给出 2 个已知量和 1 个未知量，应怎样作答？`,
    ["写出等量关系并求未知量", "只写最后答案", "只圈关键词不计算"],
    "写出等量关系并求未知量",
    "数学练习要把已知量、等量关系和计算过程写完整。",
  );
  const quiz = bank[lessonItem.id] ?? fallback;

  return {
    id: `${lessonItem.id}-quick-check`,
    subject: "math",
    lessonId: lessonItem.id,
    knowledgeTags: [chapter.title, lessonItem.title],
    ...quiz,
  };
}

function mathQuiz(question, choices, answer, explanation) {
  return {
    question,
    choices,
    answer,
    explanation,
  };
}

function buildChemistryQuickCheck(chapter, lessonItem) {
  const bank = {
    "chem-1-1": chemistryQuiz("下列变化中属于化学变化的是哪一项？", ["铁钉生锈", "酒精挥发", "冰融化"], "铁钉生锈", "铁生锈生成了铁锈，有新物质生成。"),
    "chem-1-2": chemistryQuiz("下列性质中属于物理性质的是哪一项？", ["铜能导电", "酒精能燃烧", "铁能生锈"], "铜能导电", "导电性不需要通过化学变化表现出来，属于物理性质。"),
    "chem-1-3": chemistryQuiz("实验记录写“生成二氧化碳”为什么不够规范？", ["这是结论，应写气泡、石灰水变浑浊等现象", "二氧化碳不存在", "所有气体都不能记录"], "这是结论，应写气泡、石灰水变浑浊等现象", "实验现象应记录看得见、测得到的变化，结论要由现象推得。"),
    "chem-2-1": chemistryQuiz("红磷燃烧测空气中氧气含量时，若红磷量不足，测得的氧气体积分数通常会怎样？", ["偏小", "偏大", "不受影响"], "偏小", "红磷不足会导致氧气没有被充分消耗，水面上升体积偏小。"),
    "chem-2-2": chemistryQuiz("氧气的检验方法是下列哪一项？", ["带火星木条伸入瓶内复燃", "澄清石灰水变浑浊", "湿润蓝色石蕊试纸变红"], "带火星木条伸入瓶内复燃", "氧气能支持燃烧，可使带火星木条复燃。"),
    "chem-2-3": chemistryQuiz("用向上排空气法收集氧气，验满时带火星木条应放在哪里？", ["集气瓶口", "集气瓶底", "水槽中"], "集气瓶口", "验满检查瓶口附近是否已有氧气，木条复燃说明已集满。"),
    "chem-2-4": chemistryQuiz("鉴别硬水和软水常用哪种试剂？", ["肥皂水", "酒精", "食盐水"], "肥皂水", "加入肥皂水后泡沫少、浮渣多的一般是硬水。"),
    "chem-2-5": chemistryQuiz("排水法收集氧气结束时，为什么要先移导管再熄灭酒精灯？", ["防止水倒吸炸裂试管", "让氧气变多", "让水变成氢气"], "防止水倒吸炸裂试管", "先熄灯会使试管内压强降低，水可能倒吸进热试管。"),
    "chem-3-1": chemistryQuiz("水蒸发时水分子发生了什么变化？", ["分子本身不变，分子间隔变大", "水分子变成氢分子和氧分子", "原子种类改变"], "分子本身不变，分子间隔变大", "水蒸发是物理变化，水分子没有分解。"),
    "chem-3-2": chemistryQuiz("“水由氢元素和氧元素组成”这句话强调的是什么？", ["元素种类", "原子排列顺序", "水分子个数"], "元素种类", "元素只讲种类，不讲个数。"),
    "chem-3-3": chemistryQuiz("H₂O 中数字 2 表示什么？", ["每个水分子中有 2 个氢原子", "水中有 2 个氧原子", "水带 2 个单位电荷"], "每个水分子中有 2 个氢原子", "化学式右下角数字表示一个分子中该原子的个数。"),
    "chem-4-1": chemistryQuiz("高锰酸钾受热生成锰酸钾、二氧化锰和氧气，这类反应属于什么基本反应类型？", ["分解反应", "化合反应", "置换反应"], "分解反应", "一种反应物生成多种物质，符合分解反应“一变多”的特征。"),
    "chem-4-2": chemistryQuiz("质量守恒定律从微观角度看，反应前后不变的是哪一项？", ["原子种类、数目和质量", "分子种类一定不变", "物质状态一定不变"], "原子种类、数目和质量", "化学变化中分子可变，原子种类、数目和质量不变。"),
    "chem-4-3": chemistryQuiz("配平化学方程式时，下面哪种做法是错误的？", ["改变化学式右下角数字", "在化学式前加计量数", "检查两边原子数"], "改变化学式右下角数字", "右下角数字表示物质组成，不能为了配平随意改变。"),
    "chem-5-1": chemistryQuiz("活泼金属与稀盐酸反应通常会生成哪种气体？", ["氢气", "氧气", "氮气"], "氢气", "活泼金属与酸反应生成盐和氢气。"),
    "chem-5-2": chemistryQuiz("CO 还原 Fe₂O₃ 的实验中，尾气处理的原因是什么？", ["CO 有毒，不能直接排放", "CO 是氧气", "Fe₂O₃ 会挥发"], "CO 有毒，不能直接排放", "一氧化碳有毒，尾气需要点燃或收集处理。"),
    "chem-5-3": chemistryQuiz("铁钉在干燥空气、蒸馏水、空气和水同时存在三组中，最容易生锈的是哪一组？", ["空气和水同时存在", "只在干燥空气中", "只浸在煮沸后密封的蒸馏水中"], "空气和水同时存在", "铁生锈通常需要氧气和水共同作用。"),
  };
  const quiz = bank[lessonItem.id] ?? chemistryQuiz(
    `观察“${stripLessonNumber(lessonItem.title)}”实验时，哪种记录最规范？`,
    ["写清物质、现象和结论", "只写很明显", "只写答案"],
    "写清物质、现象和结论",
    "化学题要把具体物质、实验现象和判断依据写清楚。",
  );

  return {
    id: `${lessonItem.id}-quick-check`,
    subject: "chemistry",
    lessonId: lessonItem.id,
    knowledgeTags: [chapter.title, lessonItem.title],
    ...quiz,
  };
}

function chemistryQuiz(question, choices, answer, explanation) {
  return {
    question,
    choices,
    answer,
    explanation,
  };
}

function buildRecallPrompts(subjectId, lessonItem) {
  const leadPoint = lessonItem.keyPoints?.[0] ?? lessonItem.title;
  const task = lessonItem.tasks?.[0] ?? "完成基础预习";
  const prompts = {
    english: [
      `遮住中文，回忆本课 5 个关键词或句型的意思。`,
      `用一句英文解释或替换表达：${leadPoint}`,
      `完成后标记：认识、模糊、不会。`,
    ],
    math: [
      `不看笔记，说出“${leadPoint}”的条件和结论。`,
      `把本课公式或方法写成一步一步的解题流程。`,
      `完成任务后检查：${task}`,
    ],
    chinese: [
      `合上资料，默写本课 4 个词语并自查。`,
      `用一句话概括本课主题，再说出一个表达方法。`,
      `选一个阅读问题，先口答再写 3 行批注。`,
    ],
    physics: [
      `用自己的话解释：${leadPoint}`,
      `画一个小图或流程图，把变量、现象、结论连起来。`,
      `说出本课一个实验注意点或易错点。`,
    ],
    chemistry: [
      `从宏观现象、微观解释、符号表达三层复述：${leadPoint}`,
      `说出本课一个实验安全点或判断依据。`,
      `把一个概念和一个生活例子配对说明。`,
    ],
  };

  return prompts[subjectId] ?? [`用自己的话复述：${leadPoint}`];
}

function buildSelfCheck(subjectId, lessonItem) {
  const mistake = lessonItem.commonMistakes?.[0] ?? "是否能说清理由，而不是只背结论";
  const practice = lessonItem.practice ?? lessonItem.tasks?.at(-1) ?? "完成 1 道基础题";
  const checks = {
    english: [
      "能否看到英文先说出中文，再反向说出英文？",
      "能否用本课句型替换 1 个自己的例句？",
    ],
    math: [
      `能否独立完成：${practice}`,
      `能否避开易错点：${mistake}`,
    ],
    chinese: [
      "能否默写词语并解释其中 2 个？",
      "能否回答阅读问题时引用文本线索，而不是只写感受？",
    ],
    physics: [
      `能否说清实验或公式里的每个量？`,
      `能否避开易错点：${mistake}`,
    ],
    chemistry: [
      `能否用“是否生成新物质/粒子是否改变/方程式是否守恒”等依据判断？`,
      `能否避开易错点：${mistake}`,
    ],
  };

  return checks[subjectId] ?? [`能否完成：${practice}`];
}

function buildQuickCheck(subjectId, chapter, lessonItem) {
  if (subjectId === "math") {
    return buildMathQuickCheck(chapter, lessonItem);
  }
  if (subjectId === "chemistry") {
    return buildChemistryQuickCheck(chapter, lessonItem);
  }

  const firstPoint = lessonItem.keyPoints?.[0] ?? lessonItem.title;
  const secondPoint = lessonItem.keyPoints?.[1] ?? "整理依据";
  const mistake = lessonItem.commonMistakes?.[0] ?? "只背结论，不说明依据";
  const checkBase = {
    id: `${lessonItem.id}-quick-check`,
    subject: subjectId,
    lessonId: lessonItem.id,
    knowledgeTags: [chapter.title, lessonItem.title],
  };

  const templates = {
    english: {
      question: `预习“${lessonItem.title}”时，最有效的检查方式是什么？`,
      choices: ["遮住答案反向回忆，并用句型造句", "只把单词从头读一遍", "直接跳过例句看下一课"],
      answer: "遮住答案反向回忆，并用句型造句",
      explanation: "英语预习要同时做英译中、中译英和句型替换，才能发现真正不会的地方。",
    },
    chinese: {
      question: `做《${stripLessonNumber(lessonItem.title)}》阅读题时，答案最应该从哪里来？`,
      choices: ["文本词句和表达方法", "自己的第一感觉", "只背作者背景"],
      answer: "文本词句和表达方法",
      explanation: "阅读理解要用文本证据支撑观点，预习时先找词句、结构和表达方法。",
    },
    physics: {
      question: `学习“${lessonItem.title}”时，怎样避免常见错误？`,
      choices: [`先画图或标变量，再判断：${firstPoint}`, `记住易错点：${mistake}`, "只背一个结论，不看条件"],
      answer: `先画图或标变量，再判断：${firstPoint}`,
      explanation: "物理预习要把现象、图示、变量和条件连起来，不能只记一句结论。",
    },
    chemistry: {
      question: `观察“${lessonItem.title}”里的实验或现象时，先检查什么？`,
      choices: [`物质、现象和本质是否对应：${firstPoint}`, "只看有没有颜色变化", "只看答案是否眼熟"],
      answer: `物质、现象和本质是否对应：${firstPoint}`,
      explanation: "化学判断要回到物质、变化、实验现象和符号表达，避免只看表面现象。",
    },
  };

  return { ...checkBase, ...templates[subjectId] };
}

function buildEntryDiagnostic(subjectId, chapter, lessonItem) {
  const lessonTitle = stripLessonNumber(lessonItem.title);
  const firstPoint = lessonItem.keyPoints?.[0] ?? lessonTitle;
  const secondPoint = lessonItem.keyPoints?.[1] ?? firstPoint;
  const thirdPoint = lessonItem.keyPoints?.[2] ?? secondPoint;
  const mistake = lessonItem.commonMistakes?.[0] ?? subjectDefaultTrap(subjectId);
  const routeAdvice = {
    recall: "先做遮挡回忆，补关键词和基础概念",
    concept: "先看知识卡，补条件、依据和易错辨析",
    output: "先做输出迁移，把知识放进句子、步骤、文本依据或实验表达",
  };
  const subjectTemplates = {
    english: {
      recall: {
        question: `看到“${firstPoint}”时，怎样确认不是只眼熟？`,
        choices: ["遮住中文先说意思，再反向中译英", "只跟读英文三遍", "看到词就跳到下一页"],
        answer: "遮住中文先说意思，再反向中译英",
        explanation: "英语预习先破除假熟悉：能英译中，还要能中译英。",
      },
      concept: {
        question: `学习“${secondPoint}”时，最该检查哪一项？`,
        choices: ["词义、搭配和语序是否能放进短句", "句子越长越好", "只背中文释义"],
        answer: "词义、搭配和语序是否能放进短句",
        explanation: "语法和词汇必须进入句子，才算能迁移。",
      },
      output: {
        question: `完成“${lessonTitle}”预习后，最有效的输出是什么？`,
        choices: ["用本课词句写 1 个 8-12 词短句", "把单词列表拍照保存", "只看一遍例句"],
        answer: "用本课词句写 1 个 8-12 词短句",
        explanation: "短句输出能暴露词义、搭配和语序问题。",
      },
    },
    math: {
      recall: {
        question: `进入“${lessonTitle}”前，最先要说清什么？`,
        choices: [`${firstPoint} 的条件和第一步`, "哪个选项看起来顺眼", "公式名字是否熟悉"],
        answer: `${firstPoint} 的条件和第一步`,
        explanation: "数学预习要先确认条件和方法入口。",
      },
      concept: {
        question: `判断“${secondPoint}”是否适用，关键看什么？`,
        choices: ["题目条件是否满足方法要求", "数字是否比较整齐", "题干有没有熟悉字母"],
        answer: "题目条件是否满足方法要求",
        explanation: "很多错题不是不会算，而是条件识别错。",
      },
      output: {
        question: `学完后怎样证明自己会做“${thirdPoint}”？`,
        choices: ["写出已知、方法、计算、结论四行", "只抄最终答案", "跳过步骤看下一节"],
        answer: "写出已知、方法、计算、结论四行",
        explanation: "四行步骤能检查思路是否完整。",
      },
    },
    chinese: {
      recall: {
        question: `预习《${lessonTitle}》前，最先检查哪件事？`,
        choices: ["默写字词并说出语境", "只背作者年代", "只读标题"],
        answer: "默写字词并说出语境",
        explanation: "语文字词要会写、会解释、能回到语境。",
      },
      concept: {
        question: `分析“${secondPoint}”时，答案要靠什么支撑？`,
        choices: ["文本词句和表达方法", "个人第一感觉", "资料里的固定套话"],
        answer: "文本词句和表达方法",
        explanation: "阅读理解要有文本依据，不能只写感受。",
      },
      output: {
        question: `把《${lessonTitle}》迁移到作文，最合适的做法是？`,
        choices: ["提炼表达方法，再换成自己的材料", "整段照抄原文", "只记课文标题"],
        answer: "提炼表达方法，再换成自己的材料",
        explanation: "作文迁移学的是表达方法，不复制课文。",
      },
    },
    physics: {
      recall: {
        question: `进入“${lessonTitle}”前，怎样快速检查基础？`,
        choices: [`画图并标出 ${firstPoint}`, "只背结论", "直接找公式代数字"],
        answer: `画图并标出 ${firstPoint}`,
        explanation: "物理要先把情境、图示和物理量对应起来。",
      },
      concept: {
        question: `判断“${secondPoint}”时，最该避免什么？`,
        choices: [mistake, "说明条件和单位", "画出受力或过程"],
        answer: "说明条件和单位",
        explanation: "条件、单位和图示是物理判断的支架。",
      },
      output: {
        question: `学完“${thirdPoint}”后，哪种输出更有效？`,
        choices: ["用现象、条件、结论三句话解释", "只写一个公式", "只看答案不复述"],
        answer: "用现象、条件、结论三句话解释",
        explanation: "三句话输出能检查是否理解适用条件。",
      },
    },
    chemistry: {
      recall: {
        question: `预习“${lessonTitle}”前，先用哪三层回忆？`,
        choices: ["宏观现象、微观本质、符号表达", "颜色、味道、感觉", "只背实验名称"],
        answer: "宏观现象、微观本质、符号表达",
        explanation: "化学要把现象、本质和表达连起来。",
      },
      concept: {
        question: `看到“${secondPoint}”对应的实验现象时，先检查哪两件事？`,
        choices: ["实验条件是否满足、是否有新物质或粒子变化证据", "颜色是否鲜艳、题目是否很长", "答案是否看起来熟悉"],
        answer: "实验条件是否满足、是否有新物质或粒子变化证据",
        explanation: "化学判断要回到具体物质、实验条件和变化证据。",
      },
      output: {
        question: `完成“${thirdPoint}”预习后，还要补哪一项？`,
        choices: ["安全提醒或易错依据", "只写一个现象词", "忽略物质名称"],
        answer: "安全提醒或易错依据",
        explanation: "实验规范和易错依据能避免会背不会用。",
      },
    },
  };
  const template = subjectTemplates[subjectId] ?? subjectTemplates.math;
  const routes = ["recall", "concept", "output"];

  return {
    id: `${lessonItem.id}-entry-diagnostic`,
    title: "课前诊断",
    routeAdvice: routes.map((route) => ({ route, action: routeAdvice[route] })),
    questions: routes.map((route, index) => ({
      id: `${lessonItem.id}-entry-${index + 1}`,
      skill: `${lessonTitle} · ${routeAdvice[route]}`,
      route,
      ifWrong: {
        route,
        action: routeAdvice[route],
      },
      ...template[route],
    })),
  };
}

const englishMeanings = {
  personality: "个性，性格",
  creative: "有创造力的",
  curious: "好奇的",
  energetic: "精力充沛的",
  modest: "谦虚的",
  organized: "有条理的",
  patient: "有耐心的",
  careless: "粗心的",
  grammar: "语法",
  praise: "表扬；赞扬",
  colour: "颜色",
  mood: "心情",
  influence: "影响",
  whether: "是否",
  calm: "平静的",
  relaxed: "放松的",
  peace: "安宁",
  sadness: "悲伤",
  purity: "纯洁",
  wisdom: "智慧",
  teenage: "青少年的",
  mark: "分数；标记",
  mad: "发疯的；生气的",
  exam: "考试",
  perhaps: "或许",
  choice: "选择",
  awake: "醒着的",
  hardly: "几乎不",
  imagine: "想象",
  doubt: "怀疑",
  time: "时期；时间",
  whenever: "无论何时",
  through: "凭借；穿过",
  deal: "处理",
  career: "职业",
  against: "对抗",
  record: "记录",
  victory: "胜利",
  spirit: "精神",
  courage: "勇气",
  art: "艺术",
  pleasant: "令人愉快的",
  drama: "戏剧",
  photography: "摄影",
  musician: "音乐家",
  central: "中心的",
  instrument: "乐器",
  common: "普通的",
  object: "物品；目标",
  programme: "节目",
  weekly: "每周的",
  "round-up": "综述",
  "up-to-date": "最新的",
  fan: "迷，狂热爱好者",
  coming: "即将到来的",
  cover: "报道；覆盖",
  live: "现场直播的",
  Asian: "亚洲的",
  unless: "除非",
  film: "电影",
  industry: "工业；行业",
  storyteller: "讲故事的人",
  superstar: "超级明星",
  romantic: "浪漫的",
  western: "西部电影；西方的",
  actor: "男演员",
  actress: "女演员",
  loss: "损失",
  final: "最终的",
  detective: "侦探",
  murder: "谋杀",
  suspect: "犯罪嫌疑人",
  medium: "中等的",
  untidy: "不整洁的",
  guilty: "有罪的",
  truth: "真相",
  guess: "猜测",
  lie: "撒谎",
  enemy: "敌人",
};
