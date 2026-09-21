const phases = [
  { name: "记忆重启", range: [1, 7], color: "#15803d", focus: "哈希 / 双指针 / 滑窗" },
  { name: "结构硬化", range: [8, 14], color: "#0369a1", focus: "链表 / 栈 / 二叉树" },
  { name: "中档突破", range: [15, 21], color: "#6d28d9", focus: "树 / 图 / 回溯" },
  { name: "综合变式", range: [22, 26], color: "#b45309", focus: "动态规划 / 贪心 / 堆" },
  { name: "手撕模拟", range: [27, 30], color: "#be123c", focus: "高频综合 / 面试表达" }
];

const lc = (slug) => `https://leetcode.cn/problems/${slug}/`;
const problem = (id, title, slug, difficulty, pattern, minutes, observed = false) => ({
  type: "problem", id, title, url: lc(slug), difficulty, pattern, minutes, observed
});
const drill = (title, pattern, minutes = 15) => ({ type: "drill", id: "DRILL", title, difficulty: "口述", pattern, minutes, url: "" });

const days = [
  { title: "先测提取，不看题解", summary: "用近期做过的题做基线测试：如果 5 分钟内说不出不变量，就按“模糊”处理。", tasks: [problem(1,"两数之和","two-sum","简单","哈希",15,true), problem(49,"字母异位词分组","group-anagrams","中等","哈希",25,true), drill("口述 HashMap 冲突与复杂度边界","工程表达",12)] },
  { title: "把滑动窗口写成肌肉记忆", summary: "先说清窗口内维护什么，再写扩张与收缩条件；禁止凭感觉移动 left。", tasks: [problem(3,"无重复字符的最长子串","longest-substring-without-repeating-characters","中等","滑动窗口",25,true), problem(438,"找到字符串中所有字母异位词","find-all-anagrams-in-a-string","中等","滑动窗口",25), drill("脱稿写滑窗模板并解释循环不变量","模板复写",12)] },
  { title: "双指针只记不变量", summary: "移动零与盛水容器都是双指针，但收缩依据完全不同。训练时必须解释“为什么移动这一侧”。", tasks: [problem(283,"移动零","move-zeroes","简单","双指针",15,true), problem(11,"盛最多水的容器","container-with-most-water","中等","双指针",25,true), drill("列出相向、快慢、同向三类双指针","模式辨析",12)] },
  { title: "前缀和：把区间问题改写", summary: "重点不是背公式，而是从 sum[j] - sum[i] 推出需要查询的历史值。", tasks: [problem(560,"和为 K 的子数组","subarray-sum-equals-k","中等","前缀和 + 哈希",25,true), problem(238,"除自身以外数组的乘积","product-of-array-except-self","中等","前后缀",25), drill("口述为何 560 不能用普通滑窗","反例",10)] },
  { title: "数组题先找状态，不急着排序", summary: "今天判断什么时候用集合、什么时候用局部最优；写完后补空数组与全负数。", tasks: [problem(128,"最长连续序列","longest-consecutive-sequence","中等","哈希集合",25,true), problem(53,"最大子数组和","maximum-subarray","中等","贪心 / DP",20), drill("对比 Kadane 与前缀和思路","复杂度",12)] },
  { title: "从两数之和走到三数之和", summary: "固定一维、双指针扫剩余空间；去重逻辑要在纸上说明每一层跳过谁。", tasks: [problem(15,"三数之和","3sum","中等","排序 + 双指针",30), problem(42,"接雨水","trapping-rain-water","困难","双指针",30), drill("手画 42 的左右最大值变化","dry-run",15)] },
  { title: "第 1 次盲测：禁止补新题", summary: "从前 6 天随机抽题，完整经历澄清、口述、编码、测试。柱状图题用于暴露单调栈短板。", tasks: [problem(84,"柱状图中最大的矩形","largest-rectangle-in-histogram","困难","单调栈",35,true), drill("随机复写 Day 1–6 中 1 道中等题","间隔复习",25), drill("记录最先卡住的 1 个决策点","复盘",10)] },
  { title: "链表：先画指针再敲代码", summary: "每次修改 next 前先保存后继；所有链表题都用 3 节点手动走一遍。", tasks: [problem(206,"反转链表","reverse-linked-list","简单","链表",15), problem(141,"环形链表","linked-list-cycle","简单","快慢指针",15), drill("脱稿写 ListNode 与反转模板","Java 手写",12)] },
  { title: "虚拟头节点消灭分支", summary: "合并与删除都刻意使用 dummy，把头节点特判收进统一路径。", tasks: [problem(21,"合并两个有序链表","merge-two-sorted-lists","简单","链表",18), problem(19,"删除链表倒数第 N 个结点","remove-nth-node-from-end-of-list","中等","快慢指针",25), drill("解释 dummy 解决了哪些边界分支","工程表达",10)] },
  { title: "链表状态多一步，就画图", summary: "加法维护 carry，回文维护中点和逆序；不要把多个指针变化塞进一行。", tasks: [problem(2,"两数相加","add-two-numbers","中等","链表模拟",25), problem(234,"回文链表","palindrome-linked-list","简单","快慢指针",20), drill("画奇偶长度链表的中点位置","dry-run",10)] },
  { title: "栈：保存还没解决的问题", summary: "今天区分配对栈、辅助栈与单调栈；先定义栈内元素的语义。", tasks: [problem(20,"有效的括号","valid-parentheses","简单","栈",15), problem(155,"最小栈","min-stack","中等","辅助栈",25), drill("口述三类栈的入栈/出栈条件","模式辨析",12)] },
  { title: "单调栈：寻找下一个更大值", summary: "栈里放下标，不放答案；弹栈时才真正解决一个元素。", tasks: [problem(739,"每日温度","daily-temperatures","中等","单调栈",25,true), problem(394,"字符串解码","decode-string","中等","栈",25), drill("不用代码复述 739 的弹栈过程","dry-run",10)] },
  { title: "树的递归先定义函数含义", summary: "不要背前中后序模板；先用一句话定义函数返回什么，再决定前后位置。", tasks: [problem(94,"二叉树的中序遍历","binary-tree-inorder-traversal","简单","树 / DFS",15), problem(104,"二叉树的最大深度","maximum-depth-of-binary-tree","简单","树 / 递归",15), drill("同题写递归版与迭代版","模板复写",20)] },
  { title: "第 2 次盲测：层序与递归", summary: "一题 BFS、一题 DFS，验证你能否在 5 分钟内选对遍历方式并说清空间复杂度。", tasks: [problem(102,"二叉树的层序遍历","binary-tree-level-order-traversal","中等","树 / BFS",25), problem(226,"翻转二叉树","invert-binary-tree","简单","树 / 递归",15), drill("随机复写 Day 8–13 中 1 题","间隔复习",25)] },
  { title: "树题开始进入面试主战区", summary: "LCA 练习后序位置的信息汇总；直径练习把答案与返回值分开。", tasks: [problem(236,"二叉树的最近公共祖先","lowest-common-ancestor-of-a-binary-tree","中等","树 / 后序",30), problem(543,"二叉树的直径","diameter-of-binary-tree","简单","树 / 后序",20), drill("解释全局答案为何不等于递归返回值","追问",10)] },
  { title: "BST：利用有序性，不做普通树", summary: "中序单调、左右界约束、排名统计是三种常见切入点。", tasks: [problem(98,"验证二叉搜索树","validate-binary-search-tree","中等","BST",25), problem(230,"二叉搜索树中第 K 小的元素","kth-smallest-element-in-a-bst","中等","BST / 中序",25), drill("比较上下界法与中序法","方案权衡",12)] },
  { title: "从遍历序列恢复结构", summary: "先定位根，再切左右区间；明确索引是闭区间还是左闭右开。", tasks: [problem(105,"从前序与中序遍历序列构造二叉树","construct-binary-tree-from-preorder-and-inorder-traversal","中等","树 / 分治",30), problem(114,"二叉树展开为链表","flatten-binary-tree-to-linked-list","中等","树 / 后序",30), drill("纸上推导递归区间的长度关系","索引边界",12)] },
  { title: "图搜索：标记时机决定复杂度", summary: "岛屿与腐烂橘子分别练 DFS 与多源 BFS；入队即标记，避免重复。", tasks: [problem(200,"岛屿数量","number-of-islands","中等","图 / DFS",25), problem(994,"腐烂的橘子","rotting-oranges","中等","多源 BFS",25), drill("解释入队标记与出队标记的差异","追问",10)] },
  { title: "回溯：路径、选择、结束条件", summary: "先写决策树，再写代码；每次递归只负责一层选择。", tasks: [problem(46,"全排列","permutations","中等","回溯",25), problem(78,"子集","subsets","中等","回溯",25), drill("默写回溯骨架并指出撤销位置","模板复写",12)] },
  { title: "回溯剪枝要有证据", summary: "组合总和练 startIndex，单词搜索练原地标记；剪枝前先说明不会漏解。", tasks: [problem(39,"组合总和","combination-sum","中等","回溯",30), problem(79,"单词搜索","word-search","中等","回溯 / 网格",30), drill("列出重复选择与去重选择的区别","模式辨析",12)] },
  { title: "第 3 次盲测：拓扑与 Trie", summary: "这两题与 Agent/全栈场景更接近：依赖编排、词典匹配、前缀检索。", tasks: [problem(207,"课程表","course-schedule","中等","图 / 拓扑",30), problem(208,"实现 Trie","implement-trie-prefix-tree","中等","字典树",30), drill("把课程表映射为任务依赖调度","工程迁移",12)] },
  { title: "DP 从定义状态开始", summary: "先写 dp[i] 的中文含义，再写转移；今天只处理一维、无复杂维度。", tasks: [problem(70,"爬楼梯","climbing-stairs","简单","动态规划",15), problem(198,"打家劫舍","house-robber","中等","动态规划",25), drill("对比记忆化搜索与递推","方案权衡",12)] },
  { title: "完全背包与序列 DP", summary: "零钱兑换先决定遍历对象，LIS 先保证状态定义不偷看未来。", tasks: [problem(322,"零钱兑换","coin-change","中等","完全背包",30), problem(300,"最长递增子序列","longest-increasing-subsequence","中等","序列 DP",30), drill("写出两题状态与转移，不写代码","状态设计",15)] },
  { title: "二维 DP：画表比背代码可靠", summary: "明确 dp[i][j] 代表前缀还是下标；初始化第一行第一列后再转移。", tasks: [problem(1143,"最长公共子序列","longest-common-subsequence","中等","二维 DP",30), problem(139,"单词拆分","word-break","中等","DP",30), drill("手填一个 4×5 的 LCS 表","dry-run",15)] },
  { title: "贪心：证明局部选择不会后悔", summary: "股票只保留历史最低，跳跃游戏只保留最远边界；都要讲清状态压缩。", tasks: [problem(121,"买卖股票的最佳时机","best-time-to-buy-and-sell-stock","简单","贪心",18), problem(55,"跳跃游戏","jump-game","中等","贪心",25), drill("为两题各写一句贪心正确性说明","证明",12)] },
  { title: "堆：只维护面试真正需要的 K 个", summary: "第 K 大与高频元素都不必全排序；对比小顶堆、桶与快选。", tasks: [problem(215,"数组中的第 K 个最大元素","kth-largest-element-in-an-array","中等","堆 / 快选",25), problem(347,"前 K 个高频元素","top-k-frequent-elements","中等","堆 / 桶",25), drill("Java 手写 PriorityQueue 比较器","Java 手写",12)] },
  { title: "综合手撕：缓存与窗口", summary: "LRU 检验结构组合，窗口最大值检验单调队列；两题都常被追问工程应用。", tasks: [problem(146,"LRU 缓存","lru-cache","中等","哈希 + 双链表",35), problem(239,"滑动窗口最大值","sliding-window-maximum","困难","单调队列",35), drill("解释 O(1) LRU 的两个结构职责","系统设计",12)] },
  { title: "模拟一：链表与树", summary: "全程录屏或口述。主问题 30 分钟，追问 10 分钟，最后 5 分钟自评。", tasks: [problem(23,"合并 K 个升序链表","merge-k-sorted-lists","困难","堆 / 链表",35), problem(124,"二叉树中的最大路径和","binary-tree-maximum-path-sum","困难","树 / 后序",35), drill("按 10 分量表完成一次评分","模拟复盘",10)] },
  { title: "模拟二：困难题不是背答案", summary: "先讲暴力解，再一步步优化；卡住也要把已知条件、候选结构和边界说出来。", tasks: [problem(76,"最小覆盖子串","minimum-window-substring","困难","滑动窗口",35), problem(72,"编辑距离","edit-distance","中等","二维 DP",35), drill("复述优化路径与失败尝试","面试表达",12)] },
  { title: "模拟三：边界与索引", summary: "旋转数组与排列题专门检查 off-by-one。测试用例必须覆盖长度 1、重复值与不存在。", tasks: [problem(33,"搜索旋转排序数组","search-in-rotated-sorted-array","中等","二分",30), problem(31,"下一个排列","next-permutation","中等","数组",30), drill("主动设计 5 个极端用例","测试设计",12)] },
  { title: "终局验收：稳定比题量重要", summary: "从错题池抽 1 道、从核心题抽 1 道。两道都达 8 分，才算完成本轮训练。", tasks: [drill("从错题回炉中随机手撕 1 题","终局盲测",35), drill("从 60 题中随机口述 1 题","终局盲测",20), drill("制定下一轮只含 12 题的保持计划","长期维护",15)] }
];

const statusOrder = ["todo", "fuzzy", "ac", "interview"];
const statusLabels = { todo: "未开始", fuzzy: "模糊 · 回炉", ac: "独立 AC", interview: "手撕通过" };
const stateKey = "algorithm-sprint-30-v1";
const defaultState = { selectedDay: 1, statuses: {}, notes: {}, startDate: new Date().toISOString().slice(0, 10) };
let state = loadState();
let timerSeconds = 45 * 60;
let timerHandle = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(stateKey) || "{}") };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(stateKey, JSON.stringify(state));
}

function taskKey(day, index) { return `${day}-${index}`; }
function getStatus(day, index) { return state.statuses[taskKey(day, index)] || "todo"; }
function getPhase(day) { return phases.find((phase) => day >= phase.range[0] && day <= phase.range[1]); }
function isDayComplete(day) { return days[day - 1].tasks.every((_, index) => getStatus(day, index) === "interview"); }
function solvedCount(day) { return days[day - 1].tasks.filter((_, index) => getStatus(day, index) === "interview").length; }

function renderAll() {
  renderToday();
  renderRoadmap();
  renderReview();
  renderReadiness();
}

function renderToday() {
  const day = state.selectedDay;
  const data = days[day - 1];
  const phase = getPhase(day);
  $("#phaseLabel").textContent = `PHASE ${String(phases.indexOf(phase) + 1).padStart(2, "0")} · ${phase.name}`;
  $("#dayHeadline").textContent = data.title;
  $("#daySummary").textContent = data.summary;
  $("#dayNumber").textContent = `DAY ${String(day).padStart(2, "0")}`;
  $("#dayProgressText").textContent = `第 ${day} / 30 天`;
  $("#dayProgressBar").style.width = `${(day / 30) * 100}%`;
  $("#weekFocus").textContent = phase.focus;
  $("#doneRatio").textContent = `${solvedCount(day)} / ${data.tasks.length} 手撕通过`;
  $("#dayNotes").value = state.notes[day] || "";
  renderDayStrip();
  renderTasks();
  renderWeekBars();
}

function renderDayStrip() {
  const selected = state.selectedDay;
  let start = Math.max(1, Math.min(24, selected - 3));
  if (selected <= 4) start = 1;
  if (selected >= 27) start = 24;
  $("#dayStrip").innerHTML = Array.from({ length: 7 }, (_, offset) => {
    const day = start + offset;
    const phase = getPhase(day);
    return `<button class="day-chip ${day === selected ? "is-selected" : ""} ${isDayComplete(day) ? "is-complete" : ""}" data-day="${day}" type="button" aria-label="第 ${day} 天 ${phase.name}">
      <span>D${String(day).padStart(2, "0")}</span><small>${phase.name}</small>
    </button>`;
  }).join("");
  $$(".day-chip").forEach((button) => button.addEventListener("click", () => selectDay(Number(button.dataset.day))));
}

function difficultyClass(value) {
  if (value === "简单") return "easy";
  if (value === "中等") return "medium";
  if (value === "困难") return "hard";
  return "";
}

function renderTasks() {
  const day = state.selectedDay;
  $("#taskList").innerHTML = days[day - 1].tasks.map((task, index) => {
    const status = getStatus(day, index);
    const title = task.url
      ? `<a class="task-title" href="${task.url}" target="_blank" rel="noreferrer">${task.id}. ${task.title} ↗</a>`
      : `<span class="task-title">${task.title}</span>`;
    return `<article class="task-card" data-status="${status}" ${task.url ? `data-url="${task.url}" role="link" tabindex="0" aria-label="打开力扣题目 ${task.title}"` : ""}>
      <div class="task-index">${String(index + 1).padStart(2, "0")}</div>
      <div class="task-main">
        <div class="task-title-row">
          ${title}
          <span class="difficulty ${difficultyClass(task.difficulty)}">${task.difficulty}</span>
          ${task.type === "problem" ? '<span class="source-chip">LC × 牛客高频</span>' : ""}
          ${task.observed ? '<span class="memory-chip">近期做过</span>' : ""}
        </div>
        <div class="task-meta"><span>${task.pattern}</span><span>目标 ${task.minutes} min</span><span>${task.type === "problem" ? "口述 → 编码 → 自测" : "脱稿完成"}</span></div>
      </div>
      ${task.url ? `<a class="leetcode-link" href="${task.url}" target="_blank" rel="noreferrer">去力扣 ↗</a>` : ""}
      <button class="task-action" data-day="${day}" data-index="${index}" data-status="${status}" type="button" aria-label="切换 ${task.title} 状态，当前 ${statusLabels[status]}">${statusLabels[status]}</button>
    </article>`;
  }).join("");
  $$(".task-action").forEach((button) => button.addEventListener("click", () => cycleStatus(Number(button.dataset.day), Number(button.dataset.index))));
  $$(".task-card[data-url]").forEach((card) => {
    const openProblem = (event) => {
      if (event.target.closest("button, a")) return;
      window.open(card.dataset.url, "_blank", "noopener,noreferrer");
    };
    card.addEventListener("click", openProblem);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProblem(event);
      }
    });
  });
}

function renderWeekBars() {
  const day = state.selectedDay;
  const phase = getPhase(day);
  const start = phase.range[0];
  const end = phase.range[1];
  const categories = {};
  for (let d = start; d <= end; d++) {
    days[d - 1].tasks.forEach((task, index) => {
      const category = task.pattern.split(/\s|\/|\+/)[0];
      if (!categories[category]) categories[category] = { total: 0, done: 0 };
      categories[category].total += 1;
      if (getStatus(d, index) === "interview") categories[category].done += 1;
    });
  }
  $("#weekBars").innerHTML = Object.entries(categories).slice(0, 4).map(([name, data]) => {
    const percent = Math.round((data.done / data.total) * 100);
    return `<div class="week-bar-row"><span>${name}</span><div class="week-bar"><i style="width:${percent}%"></i></div><b>${percent}</b></div>`;
  }).join("");
}

function renderRoadmap() {
  $("#phaseLegend").innerHTML = phases.map((phase) => `<span class="legend-chip" style="--phase-color:${phase.color}"><i></i>D${phase.range[0]}–${phase.range[1]} ${phase.name}</span>`).join("");
  $("#roadmapGrid").innerHTML = days.map((day, index) => {
    const number = index + 1;
    const phase = getPhase(number);
    const taskLinks = day.tasks.map((task) => task.url
      ? `<a href="${task.url}" target="_blank" rel="noreferrer">${task.id}. ${task.title}<b>↗</b></a>`
      : `<span>${task.title}<b>练习</b></span>`).join("");
    return `<article class="roadmap-day ${isDayComplete(number) ? "is-complete" : ""}" style="--phase-color:${phase.color}">
      <header><small>DAY ${String(number).padStart(2, "0")} · ${phase.name}</small></header>
      <h3>${day.title}</h3>
      <div class="roadmap-links">${taskLinks}</div>
      <div class="roadmap-footer"><span class="roadmap-progress">${solvedCount(number)} / ${day.tasks.length} 手撕通过</span><button class="open-day" data-day="${number}" type="button">查看训练</button></div>
    </article>`;
  }).join("");
  $$(".open-day").forEach((button) => button.addEventListener("click", () => {
    selectDay(Number(button.dataset.day));
    switchView("today");
  }));
}

function renderReview() {
  const reviewItems = [];
  days.forEach((day, dayIndex) => day.tasks.forEach((task, index) => {
    const status = getStatus(dayIndex + 1, index);
    if (status === "fuzzy" || status === "ac") reviewItems.push({ task, day: dayIndex + 1, index, status });
  }));
  $("#reviewCount").textContent = reviewItems.length;
  $("#reviewList").innerHTML = reviewItems.length ? reviewItems.map(({ task, day, index, status }) => `<article class="review-item">
    <b>D${String(day).padStart(2,"0")}</b>
    <div><h3>${task.url ? `<a class="task-title" href="${task.url}" target="_blank" rel="noreferrer">${task.id}. ${task.title} ↗</a>` : task.title}</h3><p>${task.pattern} · 当前：${statusLabels[status]} · 建议重新计时 ${task.minutes} 分钟</p></div>
    <button class="task-action" data-day="${day}" data-index="${index}" data-status="${status}" type="button">${statusLabels[status]}</button>
  </article>`).join("") : `<div class="empty-state"><strong>回炉队列还是空的</strong>训练时诚实标记“模糊”，这里才会变成真正属于你的题单。</div>`;
  $$("#reviewList .task-action").forEach((button) => button.addEventListener("click", () => cycleStatus(Number(button.dataset.day), Number(button.dataset.index))));
}

function renderReadiness() {
  const allStatuses = Object.values(state.statuses);
  const passed = allStatuses.filter((status) => status === "interview").length;
  const ac = allStatuses.filter((status) => status === "ac").length;
  const score = Math.min(100, Math.round(((passed + ac * .45) / (days.length * 3)) * 100));
  $("#readinessScore").textContent = `${score}%`;
  $("#scoreRing").style.width = `${score}%`;
}

function cycleStatus(day, index) {
  const current = getStatus(day, index);
  const next = statusOrder[(statusOrder.indexOf(current) + 1) % statusOrder.length];
  state.statuses[taskKey(day, index)] = next;
  saveState();
  renderAll();
  toast(`已标记：${statusLabels[next]}`);
}

function selectDay(day) {
  state.selectedDay = Math.max(1, Math.min(30, day));
  saveState();
  renderToday();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function switchView(view) {
  const titles = { today: "今日训练", roadmap: "30 天题库", review: "错题复习", mock: "模拟面试" };
  $$(".view").forEach((section) => section.classList.toggle("is-active", section.id === `${view}View`));
  $$(".nav-item").forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
  $("#viewTitle").textContent = titles[view];
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateTimer() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  $("#timerDisplay").textContent = `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
  if (timerSeconds === 0) {
    clearInterval(timerHandle);
    timerHandle = null;
    $("#timerToggle").textContent = "重新开始";
    $("#timerState").textContent = "TIME";
    toast("时间到：停止补代码，开始口述复盘。", 4500);
  }
}

function toggleTimer() {
  if (timerSeconds === 0) timerSeconds = 45 * 60;
  if (timerHandle) {
    clearInterval(timerHandle);
    timerHandle = null;
    $("#timerToggle").textContent = "继续计时";
    $("#timerState").textContent = "PAUSED";
  } else {
    timerHandle = setInterval(() => { timerSeconds -= 1; updateTimer(); }, 1000);
    $("#timerToggle").textContent = "暂停";
    $("#timerState").textContent = "RUNNING";
  }
}

function resetTimer() {
  clearInterval(timerHandle);
  timerHandle = null;
  timerSeconds = 45 * 60;
  $("#timerToggle").textContent = "开始计时";
  $("#timerState").textContent = "READY";
  updateTimer();
}

function drawMock() {
  const pool = [];
  days.forEach((day, dayIndex) => day.tasks.forEach((task, index) => {
    if (task.type !== "problem" || task.difficulty === "简单") return;
    const status = getStatus(dayIndex + 1, index);
    pool.push({ task, weight: status === "fuzzy" ? 5 : status === "ac" ? 3 : status === "todo" ? 2 : 1 });
  }));
  const weighted = pool.flatMap((item) => Array(item.weight).fill(item.task));
  const first = weighted[Math.floor(Math.random() * weighted.length)];
  let second = weighted[Math.floor(Math.random() * weighted.length)];
  while (second.id === first.id) second = weighted[Math.floor(Math.random() * weighted.length)];
  $("#mockResult").innerHTML = `
    <article class="mock-question"><small>主问题 · 30 MIN</small><h3><a class="task-title" href="${first.url}" target="_blank" rel="noreferrer">${first.id}. ${first.title} ↗</a></h3><p>${first.pattern} · 先给出暴力解，再完成最优实现；最后主动报复杂度。</p></article>
    <article class="mock-question"><small>追问题 · 10 MIN</small><h3><a class="task-title" href="${second.url}" target="_blank" rel="noreferrer">${second.id}. ${second.title} ↗</a></h3><p>${second.pattern} · 不要求完整编码，口述状态、不变量、边界与可替代方案。</p></article>`;
  toast("模拟题已生成。现在关掉题解，开始计时。", 3500);
}

function exportProgress() {
  const payload = { exportedAt: new Date().toISOString(), profile: { solved: 286, hot100: "50±", passRate: "73.2%" }, ...state };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `algorithm-sprint-progress-${new Date().toISOString().slice(0,10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  toast("进度文件已导出");
}

let toastHandle;
function toast(message, duration = 2400) {
  clearTimeout(toastHandle);
  $("#toast").textContent = message;
  $("#toast").classList.add("is-visible");
  toastHandle = setTimeout(() => $("#toast").classList.remove("is-visible"), duration);
}

function init() {
  $$(".nav-item").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  $("#prevDay").addEventListener("click", () => selectDay(state.selectedDay - 1));
  $("#nextDay").addEventListener("click", () => selectDay(state.selectedDay + 1));
  $("#timerToggle").addEventListener("click", toggleTimer);
  $("#timerReset").addEventListener("click", resetTimer);
  $("#drawMock").addEventListener("click", drawMock);
  $("#exportBtn").addEventListener("click", exportProgress);
  $("#dayNotes").addEventListener("input", (event) => {
    state.notes[state.selectedDay] = event.target.value;
    saveState();
    $("#notesSaved").textContent = "已保存";
  });
  renderAll();
}

init();
