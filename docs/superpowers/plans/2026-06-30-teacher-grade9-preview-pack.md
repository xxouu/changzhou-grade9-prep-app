# Teacher Grade9 Preview Pack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the prototype into a teacher-grade ninth-grade preview pack with fuller Chinese lesson prep, realistic STEM questions, a foldable text panel, and fewer repeated template modules.

**Architecture:** Keep the current static ESM app and `subject -> chapters -> lessons` data model. Add explicit content-source fields to lesson data, render Chinese lessons with a focused prep package, and keep STEM subject pages centered on knowledge explanations plus real question types. Use tests first to lock the content contract and prevent template prompts from returning.

**Tech Stack:** Static HTML/CSS/ESM JavaScript, Node.js built-in test runner, GitHub Pages deployment.

---

## File Map

- Modify `src/content.mjs`: content source metadata, fuller Chinese lesson data, public-domain classical text fields, STEM practice metadata, upgraded math/physics/chemistry practice sets, and anti-template builders.
- Modify `src/app.mjs`: focused Chinese lesson renderer, foldable original-text panel, streamlined lesson body, STEM practice rendering for source type and fewer repeated hints.
- Modify `src/styles.css`: compact styles for Chinese prep package, original-text disclosure, and simplified lesson cards.
- Modify `tests/curriculum.test.mjs`: content completeness, source-policy, anti-template, and STEM question contract tests.
- Modify `tests/app.test.mjs`: rendering tests for Chinese original-text disclosure and reduced template modules.
- Modify `index.html` and `src/app.mjs` import query strings after implementation: bump from `depth122` to `depth123`.

## Task 1: Add Content Quality Contract Tests

**Files:**
- Modify: `tests/curriculum.test.mjs`
- Test: `tests/curriculum.test.mjs`

- [ ] **Step 1: Write content-contract tests for Chinese lesson completeness and source policy**

Add these tests after `chinese lessons include dictation words and learning focus without full textbook passages`:

```js
test("Chinese lessons provide teacher-grade prep packages and controlled text sources", () => {
  const modernFullTextLimit = 240;

  for (const chapter of curriculum.chinese.chapters) {
    for (const lesson of chapter.lessons) {
      assert.ok(lesson.author || lesson.source, `${lesson.title} needs author or source`);
      assert.ok(lesson.genre, `${lesson.title} needs a genre`);
      assert.ok(lesson.intro && lesson.intro.length >= 60, `${lesson.title} needs a concrete intro`);
      assert.ok(lesson.dictationWords?.length >= 8, `${lesson.title} needs at least 8 dictation words or phrases`);
      assert.ok(lesson.readingFocus?.length >= 3, `${lesson.title} needs reading focus points`);
      assert.ok(lesson.readingQuestions?.length >= 3, `${lesson.title} needs reading questions`);
      assert.ok(lesson.writingTask, `${lesson.title} needs a writing transfer task`);
      assert.ok(lesson.textSource?.type, `${lesson.title} needs text source metadata`);

      if (lesson.textSource.type === "public-domain") {
        assert.ok(lesson.originalText?.length >= 20, `${lesson.title} public-domain text should be available`);
      }

      if (lesson.textSource.type === "licensed-required") {
        assert.ok(!lesson.originalText || lesson.originalText.length <= modernFullTextLimit, `${lesson.title} should not embed unlicensed modern full text`);
      }
    }
  }
});
```

- [ ] **Step 2: Write content-contract tests for STEM source types and anti-template quality**

Add these tests near the existing math/chemistry practice quality tests:

```js
test("STEM practice questions use explicit source types and real question forms", () => {
  const banned = /第一步应先确认什么|最可靠的依据|相关问题时|基础题前|预习“|学习“|先写依据|再选答案/;
  const allowedTypes = new Set(["authorized-original", "original-variant"]);

  for (const subjectId of ["math", "physics", "chemistry"]) {
    const questions = curriculum[subjectId].chapters.flatMap((chapter) =>
      chapter.lessons.flatMap((lesson) => lesson.practiceSet ?? []),
    );

    assert.ok(questions.length >= 40, `${subjectId} needs enough lesson-level practice`);
    assert.ok(
      questions.every((question) => allowedTypes.has(question.sourceType)),
      `${subjectId} questions need sourceType`,
    );
    assert.ok(
      questions.every((question) => !banned.test([question.question, question.answer, question.explanation, ...(question.choices ?? [])].join(" "))),
      `${subjectId} questions should not use meta learning prompts`,
    );
    assert.ok(
      questions.every((question) => question.steps?.length >= 2 || question.explanation?.length >= 20),
      `${subjectId} questions need concrete steps or explanations`,
    );
  }
});

test("priority STEM chapters include choice blank calculation or experiment practice", () => {
  const priorityIds = new Set([
    "math-chapter-1",
    "math-chapter-5",
    "phy-chapter-11",
    "phy-chapter-14",
    "chem-chapter-1",
    "chem-chapter-2",
  ]);

  for (const subjectId of ["math", "physics", "chemistry"]) {
    for (const chapter of curriculum[subjectId].chapters.filter((item) => priorityIds.has(item.id))) {
      const types = new Set(chapter.lessons.flatMap((lesson) => (lesson.practiceSet ?? []).map((question) => question.type)));
      assert.ok(types.has("choice"), `${chapter.title} needs choice questions`);
      assert.ok(types.has("blank") || types.has("calculation"), `${chapter.title} needs blank or calculation questions`);
      assert.ok(types.has("comprehensive") || types.has("experiment"), `${chapter.title} needs comprehensive or experiment questions`);
    }
  }
});
```

- [ ] **Step 3: Run focused tests before implementation**

Run:

```bash
export PATH="/Users/lucky/.nvm/versions/node/v18.20.4/bin:$PATH"
node --test tests/curriculum.test.mjs --test-name-pattern "teacher-grade|source types|priority STEM"
```

Expected before implementation: FAIL because Chinese lessons do not yet have `author`, `genre`, `intro`, `textSource`, and STEM questions do not yet all have `sourceType`, `type`, or `steps`. Do not commit a red test state to `main`; keep the tests and implementation in the same working batch.

- [ ] **Step 4: Commit tests with the corresponding implementation**

Commit these tests together with the content implementation that makes them pass.

## Task 2: Upgrade Chinese Lesson Data and Text Source Metadata

**Files:**
- Modify: `src/content.mjs`
- Test: `tests/curriculum.test.mjs`

- [ ] **Step 1: Replace the compact Chinese lesson tuples with structured records**

In `src/content.mjs`, replace `curriculum.chinese.chapters = [...]` tuple mapping with structured calls. Use this helper shape near the Chinese section:

```js
function chineseLesson(number, title, meta) {
  return {
    id: `chi-${number}`,
    title: `${number} ${title}`,
    author: meta.author,
    source: meta.source,
    genre: meta.genre,
    intro: meta.intro,
    originalText: meta.originalText ?? "",
    textSource: meta.textSource ?? { type: "licensed-required", note: "现代课文默认不内置全文，请使用课本阅读原文。" },
    dictationWords: meta.dictationWords,
    keyPoints: meta.keyPoints,
    readingFocus: meta.readingFocus,
    readingQuestions: meta.readingQuestions,
    writingTask: meta.writingTask,
    tasks: ["读导读", "默写字词", "回答阅读题", "完成写作迁移"],
  };
}
```

Keep chapter ids as `chi-unit-1` etc. Build chapter lessons with `chineseLesson("1", "沁园春·雪", {...})` so existing rendering and progress ids remain readable.

- [ ] **Step 2: Provide complete Chinese lesson metadata**

For each of the current 25 Chinese lessons, add at least:

```js
{
  author: "毛泽东",
  genre: "词",
  intro: "预习时先抓上下片：上片写北国雪景，由远及近、由静到动；下片转入历史人物评价，最后落到当代豪情。读的时候重点看意象怎样铺开，议论怎样把写景推向主旨。",
  textSource: { type: "licensed-required", note: "现代教材文本暂不内置全文，请使用课本阅读原文。" },
  dictationWords: ["妖娆", "风骚", "折腰", "天骄", "风流", "莽莽", "滔滔", "俱往矣", "红装素裹", "一代天骄"],
  keyPoints: ["上下片结构", "雪景意象", "历史人物评价", "豪迈情感"],
  readingFocus: ["上片写景的空间顺序", "下片议论的转折", "末句情感落点"],
  readingQuestions: [
    "上片写雪景时，哪些词语体现了宏阔气势？",
    "下片评价历史人物的作用是什么？",
    "全词最后一句怎样把写景、议论和抒情合在一起？",
  ],
  writingTask: "仿照“景物铺陈 -> 观点转折 -> 情感落点”的结构，写 100 字校园雪景或雨景片段。",
}
```

For public-domain classical lessons, set `textSource.type` to `"public-domain"` and include `originalText`:

```js
{
  author: "范仲淹",
  genre: "古文",
  textSource: { type: "public-domain", note: "古代公版文本，可用于预习诵读。" },
  originalText: "庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴。...",
}
```

Use public-domain original text for `岳阳楼记`、`醉翁亭记`、`湖心亭看雪` and the poetry items in `诗词三首`. Keep modern texts with licensed-required placeholder unless the user provides text.

- [ ] **Step 3: Update Chinese coverage thresholds**

Change `buildCoverageGaps` Chinese threshold from:

```js
if (subjectId === "chinese" && stats.dictationWordCount < stats.lessons * 4) gaps.push("语文默写词不足");
```

to:

```js
if (subjectId === "chinese" && stats.dictationWordCount < stats.lessons * 8) gaps.push("语文默写词不足");
```

- [ ] **Step 4: Run Chinese content tests**

Run:

```bash
export PATH="/Users/lucky/.nvm/versions/node/v18.20.4/bin:$PATH"
node --test tests/curriculum.test.mjs --test-name-pattern "Chinese lessons provide teacher-grade"
```

Expected: PASS.

- [ ] **Step 5: Commit Chinese data upgrade**

```bash
git add src/content.mjs tests/curriculum.test.mjs
git commit -m "feat: expand Chinese teacher-grade lesson prep"
```

## Task 3: Render Chinese Prep Package and Foldable Original Text

**Files:**
- Modify: `src/app.mjs`
- Modify: `src/styles.css`
- Modify: `tests/app.test.mjs`

- [ ] **Step 1: Write app rendering tests**

Add these tests near the existing Chinese rendering tests:

```js
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
```

- [ ] **Step 2: Run app tests to verify they fail**

```bash
export PATH="/Users/lucky/.nvm/versions/node/v18.20.4/bin:$PATH"
node --test tests/app.test.mjs --test-name-pattern "Chinese lesson body|default lesson body"
```

Expected before implementation: FAIL because `renderChineseLessonBody` does not exist. Do not commit this failing state separately.

- [ ] **Step 3: Add `renderChineseLessonBody`**

In `src/app.mjs`, add before `renderLessonExtras`:

```js
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

  return `
    <div class="chinese-lesson-package">
      <section class="chinese-lesson-intro">
        <strong>${lesson.genre ?? "课文"} · ${lesson.author ?? lesson.source ?? "课文导读"}</strong>
        <p>${lesson.intro ?? "先读标题和导读，再回到课本完成原文阅读。"}</p>
      </section>
      <details class="chinese-original-text">
        <summary>展开原文</summary>
        ${originalText}
      </details>
      <section>
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
```

- [ ] **Step 4: Use Chinese renderer in `renderChapterCard`**

Inside `renderChapterCard`, replace the generic `lesson-body` content for Chinese lessons:

```js
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
```

Then render:

```js
<div class="lesson-body">
  ${lessonBody}
</div>
```

- [ ] **Step 5: Add compact Chinese styles**

Append near lesson styles in `src/styles.css`:

```css
.chinese-lesson-package {
  display: grid;
  gap: 12px;
}

.chinese-lesson-package section,
.chinese-original-text {
  padding: 12px;
  border: 1px solid #e5eadf;
  border-radius: 8px;
  background: #fffdf7;
}

.chinese-original-text pre {
  margin: 10px 0 0;
  white-space: pre-wrap;
  line-height: 1.8;
}

.dictation-word-table {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.dictation-word-table span {
  padding: 5px 8px;
  border-radius: 8px;
  background: #eef6ee;
  color: #24372d;
  font-weight: 800;
}
```

- [ ] **Step 6: Run app tests**

```bash
export PATH="/Users/lucky/.nvm/versions/node/v18.20.4/bin:$PATH"
node --test tests/app.test.mjs --test-name-pattern "Chinese lesson body|default lesson body"
```

Expected: PASS.

- [ ] **Step 7: Commit Chinese rendering**

```bash
git add src/app.mjs src/styles.css tests/app.test.mjs
git commit -m "feat: render focused Chinese lesson prep"
```

## Task 4: Upgrade Priority STEM Practice Sets

**Files:**
- Modify: `src/content.mjs`
- Test: `tests/curriculum.test.mjs`

- [ ] **Step 1: Extend practice factory functions**

Change `mathPractice`, `chemistryPractice`, and add `physicsPractice` to include type, source type, and steps:

```js
function mathPractice(type, difficulty, concept, question, choices, answer, explanation, trap, steps = []) {
  return {
    type,
    difficulty,
    concept,
    question,
    choices,
    answer,
    explanation,
    trap,
    steps,
    sourceType: "original-variant",
    sourceNote: "原创变式 · 真题考法参考",
  };
}
```

Use the same shape for chemistry and physics.

- [ ] **Step 2: Update existing math and chemistry calls**

Replace calls such as:

```js
mathPractice("基础", "一元二次方程", "下列方程中...", choices, answer, explanation, trap)
```

with:

```js
mathPractice("choice", "基础", "一元二次方程", "下列方程中...", choices, answer, explanation, trap, [
  "整理成整式方程。",
  "检查未知数个数和最高次数。",
])
```

For open calculation questions, use `type: "calculation"` and `choices: []`.

- [ ] **Step 3: Add `buildPhysicsPracticeSet` and route physics through it**

In `buildPracticeSet`, add:

```js
if (subjectId === "physics") {
  return buildPhysicsPracticeSet(chapter, lessonItem);
}
```

Add a physics bank for priority chapters `phy-11-*` and `phy-14-*`. Example:

```js
"phy-11-1": [
  physicsPractice("choice", "基础", "杠杆五要素", "如图所示撬棒撬石块，支点为 O。下列说法正确的是哪一项？", ["动力臂是 O 到动力作用线的垂直距离", "动力臂是 O 到手的距离", "阻力臂一定比动力臂长"], "动力臂是 O 到动力作用线的垂直距离", "力臂是点到力的作用线的垂直距离，不是到作用点的线段。", "把力臂画成斜边。", ["找支点 O。", "画出力的作用线。", "从支点向作用线作垂线。"]),
  physicsPractice("calculation", "巩固", "杠杆平衡", "一根杠杆在水平位置平衡，动力为 20N、动力臂为 0.6m，阻力臂为 0.2m，阻力是多少？", [], "60N", "由 F₁L₁=F₂L₂，20×0.6=F₂×0.2，F₂=60N。", "单位不统一或把力臂代反。", ["写出平衡条件。", "代入两个力臂。", "求未知阻力。"]),
]
```

- [ ] **Step 4: Add richer math priority questions**

For `math-1-*` and `math-5-*`, ensure each lesson has at least four practice questions with types `choice`, `blank` or `calculation`, and `comprehensive`. Include concrete prompts such as:

```js
mathPractice("blank", "巩固", "判别式", "若关于 x 的方程 x² - 2x + m = 0 有两个不相等的实数根，则 m 的取值范围是 ______。", [], "m < 1", "Δ=(-2)²-4m=4-4m，两个不相等实根要求 Δ>0，所以 m<1。", "把“两个不相等”误写成 Δ≥0。", ["写出 Δ。", "列 Δ>0。", "解不等式。"])
```

- [ ] **Step 5: Add richer chemistry priority questions**

For `chem-1-*` and `chem-2-*`, ensure each lesson has at least four practice questions with concrete experiment contexts. Include questions like:

```js
chemistryPractice("experiment", "巩固", "红磷测氧气含量", "红磷燃烧测空气中氧气含量时，若水面上升明显小于 1/5，可能原因是什么？", ["红磷不足或装置漏气", "空气中没有氮气", "集气瓶太透明"], "红磷不足或装置漏气", "红磷不足会使氧气没有被充分消耗，装置漏气会让外界空气进入，都会使水面上升偏小。", "只背 1/5，不会分析实验误差。", ["确认氧气是否充分消耗。", "检查装置气密性。", "联系压强变化解释水面上升。"])
```

- [ ] **Step 6: Run priority STEM tests**

```bash
export PATH="/Users/lucky/.nvm/versions/node/v18.20.4/bin:$PATH"
node --test tests/curriculum.test.mjs --test-name-pattern "STEM practice questions|priority STEM|math practice|chemistry practice"
```

Expected: PASS.

- [ ] **Step 7: Commit STEM practice upgrade**

```bash
git add src/content.mjs tests/curriculum.test.mjs
git commit -m "feat: upgrade priority STEM practice sets"
```

## Task 5: Remove Repeated Template Modules from Default Lesson Pages

**Files:**
- Modify: `src/app.mjs`
- Modify: `src/styles.css`
- Modify: `tests/app.test.mjs`

- [ ] **Step 1: Write app tests for reduced default modules**

Add:

```js
test("lesson default view focuses on content instead of workflow widgets", () => {
  const extrasBlock = appSource.match(/function renderLessonExtras\(lesson\) \{[\s\S]*?\nfunction renderLessonLearningLoop/)?.[0] ?? "";

  assert.doesNotMatch(extrasBlock, /renderLessonLearningLoop/);
  assert.doesNotMatch(extrasBlock, /renderLessonPathOverview/);
  assert.doesNotMatch(extrasBlock, /renderEntryDiagnostic/);
  assert.doesNotMatch(extrasBlock, /renderPreviewWorkflow/);
  assert.doesNotMatch(extrasBlock, /renderReflectionCoach/);
});
```

- [ ] **Step 2: Remove generic modules from `renderLessonExtras`**

Keep only subject-specific blocks:

```js
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
    renderInfoBlock("写作迁移", lesson.writingTask ? [lesson.writingTask] : []),
  ].filter(Boolean).join("");

  return blocks ? `<div class="lesson-extra-grid">${blocks}</div>` : "";
}
```

Do not call entry diagnostics, preview workflows, learning-loop summaries, or reflection coaches from the default lesson body. Leave their functions in place for existing progress tests and future hidden parent/developer mode.

- [ ] **Step 3: Simplify repeated labels in renderers**

In `renderStemKnowledgeSection`, replace:

```html
<p>先看懂定义、条件和易错点，再做下面的题。</p>
```

with:

```html
<p>定义、公式、实验和易错点放在这里。</p>
```

In practice renderers, avoid repeated “先写依据”“再选答案”; answer details stay inside `<details>`.

- [ ] **Step 4: Run focused app tests**

```bash
export PATH="/Users/lucky/.nvm/versions/node/v18.20.4/bin:$PATH"
node --test tests/app.test.mjs --test-name-pattern "lesson default view|default lesson body|grammar mini quizzes|English subject"
```

Expected: PASS.

- [ ] **Step 5: Commit template cleanup**

```bash
git add src/app.mjs src/styles.css tests/app.test.mjs
git commit -m "feat: simplify lesson content views"
```

## Task 6: Full Verification, Cache Bump, Browser Check, and Publish

**Files:**
- Modify: `index.html`
- Modify: `src/app.mjs`
- Test: all tests

- [ ] **Step 1: Bump asset cache**

Change:

```html
./src/styles.css?v=20260628-depth122
./src/app.mjs?v=20260628-depth122
```

to:

```html
./src/styles.css?v=20260628-depth123
./src/app.mjs?v=20260628-depth123
```

Change imports in `src/app.mjs`:

```js
} from "./content.mjs?v=20260628-depth123";
} from "./progress.mjs?v=20260628-depth123";
```

- [ ] **Step 2: Run full verification**

```bash
export PATH="/Users/lucky/.nvm/versions/node/v18.20.4/bin:$PATH"
node --check src/app.mjs
node --check src/content.mjs
node --check src/progress.mjs
node --test tests/*.test.mjs
```

Expected: all checks exit 0 and all tests pass.

- [ ] **Step 3: Run local server and inspect mobile layout**

```bash
python3 -m http.server 4174
```

Open:

```text
http://127.0.0.1:4174/?depth=123
```

Verify:

- Chinese page shows lesson title, intro, foldable original-text panel, word table, reading questions and writing transfer.
- `岳阳楼记` or another classical lesson shows original text after expanding.
- Modern text lesson shows the original-text disclosure but no long unlicensed full text.
- Math, physics, chemistry priority chapters show concrete question prompts.
- Mobile width has no horizontal overflow.

- [ ] **Step 4: Commit final cache bump**

```bash
git add index.html src/app.mjs
git commit -m "chore: bump teacher preview pack assets"
```

- [ ] **Step 5: Push and verify GitHub Pages**

```bash
git push
gh api repos/xxouu/changzhou-grade9-prep-app/pages/builds/latest --jq '.status'
curl -s 'https://xxouu.github.io/changzhou-grade9-prep-app/' | rg 'depth123'
```

Expected: Pages status is `built`, live HTML references `depth123`.
