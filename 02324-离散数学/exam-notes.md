course: 02324 离散数学
subtitle: 全国自考 · 考前突击
github: https://github.com/hanxiaodao/02324-mindmap
mistakes: mistakes.html

## 第一章 命题逻辑

本章是全课程的地基，核心动作只有三个：**符号化、列真值表、等值与推理演算**。从错题记录看，2025.04–2026.04 三套卷本章都有题：符号化与公式类型判断出小题，推理证明（CP 规则）与真值应用证明出大题。

本章速记图（先看图建立全章框架，再逐个展开考点）：

```tree
第一章 命题逻辑（考点 1—12）
  核心：符号化 → 真值表 → 等值式 → 推理
  1. 命题符号化【S】
    命题：有唯一真值的陈述句（记 1/0）
    原子命题：不可再拆；复合命题：联结词组合
    符号化三步：找原子命题 → 选联结词 → 组合
    疑问句、祈使句、真值不定的陈述句都不是命题
  2. 否定和合取【B】
    ¬P：真值取反
    P∧Q：全真才真
    例：既是数学老师又是计算机老师 → P∧Q
  3. 析取【A】
    相容或 P∨Q：有真就真，可同真
    异或 (P∧¬Q)∨(¬P∧Q)：恰好一个成立
    同或 P↔Q：同真同假才真
    易错：「要么…要么…」不可兼，不是 P∨Q
  4. 单条件【S】
    P→Q：只防「真→假」，仅 P=1、Q=0 时为假
    只要 P 就 Q ⇔ P→Q（前推后，充分）
    只有 P 才 Q ⇔ Q→P（后推前，必要）
    除非…否则不：先改成「只有…才」，再后推前
    易错：P=0 时 P→Q 恒真——前件为假不算错
  5. 双条件【A】
    P↔Q：同真同假才真
    关键词：当且仅当、充要
    易错：「当且仅当」写成单向 P→Q
  6. 真值表【A】
    n 个变元 → 真值表 2ⁿ 行
    交错赋值：最右列 0、1 交替，向左周期翻倍
    应用证明题：设原子命题 → 逐句符号化 → 按真值分类讨论
  7. 等值【A】
    等值（⇔）：两公式真值表每行完全相同
    等值演算：用已知等值式逐处替换推导
    最常用：A→B ⇔ ¬A∨B（消去 → 的第一步）
  8. 常用命题定律【S】
    德摩根：¬(A∨B)⇔¬A∧¬B，¬(A∧B)⇔¬A∨¬B
    分配：A∨(B∧C)⇔(A∨B)∧(A∨C)
    吸收：A∧(A∨B)⇔A；排中 A∨¬A⇔1；矛盾 A∧¬A⇔0
    零律 A∨1⇔1；同一律 A∧1⇔A
    易错：吸收律形式不匹配时先用分配律展开
  9. 成真指派和成假指派【B】
    指派：给每个变元各取一个 1/0 的组合
    成真指派：使公式取 1；成假指派：使公式取 0
    判类型先找成假指派：找到一行 0 就排除永真
  10. 永真式和永假式【A】
    永真式（重言式）：真值表全 1
    永假式（矛盾式）：真值表全 0
    永假 ⇔ 不可满足
  11. 可满足式【S】
    可满足式：至少有一组成真指派
    永真 ⇒ 可满足；可满足 ≠ 永真
    易错：看到 P∧(P→Q) 就套假言推理——先看清后件
  12. 命题逻辑推理【S】
    假言推理：A→B，A ⇒ B
    拒取式：A→B，¬B ⇒ ¬A
    析取三段论：A∨B，¬A ⇒ B
    CP 规则：证 A→B ＝ 附加 A → 推出 B → 收回 A→B
    归谬法：假设 ¬C → 推出矛盾 ⇒ C
    易错：CP 最后一步「收回 A→B」不能省
```

```tip
【做题】符号化先定联结词方向（只要→前推后、只有→后推前、当且仅当→双向）；判公式类型先想 2ⁿ 行里找成假指派；推理题结论是 A→B，第一行就写附加前提 A（CP）。
```

### 考点1：命题符号化

meta: level=S

#### 1.1 是什么

命题：具有**唯一真值**的陈述句（真记 1，假记 0）。
原子命题：不能再拆分的命题，用 P、Q、R… 表示。
复合命题：原子命题用联结词组合成的命题。
命题符号化：把自然语言翻译成符号表达式。

```err
疑问句、祈使句、感叹句不是命题；"x+y>5" 这类真值随变元变化的陈述句也不是命题——判断标准是"有无唯一真值"，不是"是不是句子"。
```

#### 1.2 符号化三步

- 先找出全部原子命题，各自用 P、Q、R… 表示
- 再确定原子命题之间的联结词（方向见考点3、考点4、考点5）
- 最后按语义组合成符号表达式

#### 1.3 真题

**【2026.04·错题本·单选】** 「0.4 是有理数当且仅当 0.4 可写成分数」的符号化——符号化综合题，完整解析见考点5。

**来源**：旧版思维导图·第一章考点1；错题本 2026.04·考点5

### 考点2：否定和合取

meta: level=B

#### 2.1 五个联结词总览

| 序号 | 名称 | 符号 | 含义 |
|---|---|---|---|
| 1 | 否定 | ¬ | 非（取反） |
| 2 | 合取 | ∧ | 且（同时成立） |
| 3 | 析取 | ∨ | 或（至少一个成立） |
| 4 | 单条件 | → | 推出（前件推后件） |
| 5 | 双条件 | ↔ | 当且仅当（双向推出） |

#### 2.2 否定（¬）

¬P 表示"非 P"，真值取反：P=1 则 ¬P=0，P=0 则 ¬P=1。
例：P="今天下雨"，则 ¬P="今天没下雨"。

#### 2.3 合取（∧）

P∧Q 表示"P 且 Q"，**两边都为真才为真**。
例题：P:小张是数学老师，Q:小张是计算机老师，"小张既是数学老师又是计算机老师" → P∧Q。

**来源**：旧版思维导图·第一章考点2

### 考点3：析取

meta: level=A

#### 3.1 相容或、同或、异或

| 类型 | 符号 | 成真情况 |
|---|---|---|
| 相容或（普通析取） | P∨Q | 至少一个成立（三种情况为真，可同真） |
| 同或 | P↔Q | 两边同真或同假 |
| 异或 | (P∧¬Q)∨(¬P∧Q) | 恰好一个成立（两种情况为真） |

#### 3.2 析取符号（∨）是相容或

- "今天刮风或今天下雨" → P∨Q（相容或，可同时成立）
- "我 15 岁或我 16 岁" → 不可兼，用异或（不能同时成立）

#### 3.3 异或的表示

```f
P 异或 Q ⇔ (P∧¬Q)∨(¬P∧Q)
```

```err
「今天我要么上班要么休息」不是 P∨Q——上班和休息不能同时成立，要写 (P∧¬Q)∨(¬P∧Q)。
```

**来源**：旧版思维导图·第一章考点3

### 考点4：单条件

meta: level=S

#### 4.1 真值规则（必背）

```f
P→Q 的四种取值：1→1 真，1→0 假，0→1 真，0→0 真
```

只防「真→假」一种情况：**仅 P=1、Q=0 时为假**，其余全真。
人话：前件已经为假，后面怎么说都不算错——0→任何 都是真。

#### 4.2 前推后 vs 后推前

| 关键词 | 方向 | 示例 |
|---|---|---|
| 只要…就… | 前推后 P→Q | 只要天不下雨，小王就会早到 → ¬P→Q |
| 因为…所以… | 前推后 | 因为今天不下雨，所以我进城 → ¬P→Q |
| 只有…才… | 后推前 Q→P | 只有努力才会成功 → 成功→努力 |
| 除非…否则不 | 先改成"只有…才"，再后推前 | 除非努力否则不成功 → 成功→努力 |

#### 4.3 为什么"只要"前推后、"只有"后推前

"只要努力就能成功"：努力是**充分**条件——努力⇒成功，符号化 努力→成功（前推后）。
"只有努力才能成功"：努力是**必要**条件——成功⇒努力（不努力必不成功），但光努力未必成功（还需机遇），符号化 成功→努力（后推前）。

```tip
【记忆】"只要"管充分，箭头顺着念；"只有"管必要，箭头反过来。判 P→Q 先看前件是不是 0。
```

**来源**：旧版思维导图·第一章考点4；考场清单第1条

### 考点5：双条件

meta: level=A; freq=2026.04

#### 5.1 真值规则

P↔Q 表示 P、Q **双向推出**：同真同假才真，不同则假。
关键词："当且仅当"、"充分必要"。
P↔Q 展开即 (A→B)∧(B→A)（见考点8），也等于"同或"。

#### 5.2 真题

**【2026.04·错题本·单选】** P：0.4 是有理数，Q：0.4 可写成分数。「0.4 是有理数当且仅当 0.4 可写成分数」的符号化（A. P→Q　B. P↔Q　C. Q→P　D. P∧Q）
**答案：B**
解析：「当且仅当」是双条件联结词；P、Q 都真（0.4=2/5），这个 P↔Q 本身是真命题。

```err
「当且仅当」绝不能写成单向蕴含 P→Q，也不能因为 P、Q 都真而写成 P∧Q。
```

**来源**：旧版思维导图·第一章考点5；错题本 2026.04·考点5

### 考点6：真值表

meta: level=A; freq=2025.10

#### 6.1 怎么列

真值表：把命题公式在所有取值情况下的结果展示出来。
n 个命题变元 → **2ⁿ 行**（2 个变元 4 行，3 个变元 8 行）。
交错赋值法：最右列按 0、1 交替；向左一层，交替周期翻倍（0,1 → 0,0,1,1 → 0,0,0,0,1,1,1,1）。
列表前先用等值式化简，能少算很多行。

#### 6.2 真题

**【2025.10·错题本·解答】** 勘探队 3 人判断矿样：甲「不是铁也不是铜」、乙「不是铁，是锡」、丙「不是锡，是铁」；结果一人全对、一人全错、一人对一半。用命题真值的方法证明该说法存在，并判断矿样。
**答案：矿样是铁**
解析：设 P:是铁、Q:是铜、R:是锡（矿样恰一种，三命题恰一真）。甲=¬P∧¬Q，乙=¬P∧R，丙=¬R∧P。乙丙逐句互为否定，全对/全错只能出现在乙丙之间：若乙全对⇒是锡⇒甲两句全对，矛盾；若乙全错⇒是铁⇒丙全对、甲恰对一半，成立。
方法：每句自然语言拆成原子命题逐句符号化；"对一半"＝一真一假；再按真值分类讨论。

```err
不要把两句话合成一个命题看真值，也不要一上来就武断指定谁全对——"全对/全错/对一半"要拆成逐句真值再分类。
```

**来源**：错题本 2025.10·考点6；旧版思维导图·第一章考点6

### 考点7：等值

meta: level=A

#### 7.1 是什么

等值（⇔）：两个命题公式在**所有**赋值下真值完全相同（真值表逐行相同）。
等值演算：不列真值表，用命题定律做替换推导；经真值表验证等值的公式可直接互相替换。

#### 7.2 最常用的三组

```f
A→B ⇔ ¬A∨B            消去 → 的第一步
A→B ⇔ ¬B→¬A           逆否
A↔B ⇔ (A→B)∧(B→A)     双条件展开
```

**来源**：旧版思维导图·第一章考点7

### 考点8：常用命题定律

meta: level=S

#### 8.1 必背

```f
¬¬A ⇔ A               双重否定
A∨A ⇔ A，A∧A ⇔ A      幂等律
A∨(B∧C) ⇔ (A∨B)∧(A∨C)  分配律
A∧(B∨C) ⇔ (A∧B)∨(A∧C)
¬(A∨B) ⇔ ¬A∧¬B         德摩根
¬(A∧B) ⇔ ¬A∨¬B
A∨(A∧B) ⇔ A            吸收律
A∧(A∨B) ⇔ A
A∨¬A ⇔ 1              排中律
A∧¬A ⇔ 0              矛盾律
A∨1 ⇔ 1，A∧0 ⇔ 0      零律（零元）
A∨0 ⇔ A，A∧1 ⇔ A      同一律（幺元）
```

#### 8.2 易错

```err
吸收律形式不匹配时别硬套：b∨(a∧¬b) 要先用分配律展开成 (b∨a)∧(b∨¬b)=b∨a，再吸收。
```

**来源**：旧版思维导图·第一章考点8

### 考点9：成真指派和成假指派

meta: level=B

#### 9.1 是什么

指派：给每个命题变元各取一个值（1/0）的一组取值。
成真指派：取值使命题公式为真（结果为 1）的指派。
成假指派：取值使命题公式为假（结果为 0）的指派。

#### 9.2 怎么用

- 先用命题定律化简（减少计算量），再找指派
- 判断公式类型时**优先找成假指派**：找到一行为 0 就排除永真式；一行 0 都找不到才是永真式

**来源**：旧版思维导图·第一章考点9

### 考点10：永真式和永假式

meta: level=A

#### 10.1 定义

永真式（重言式）：命题公式永远为真，真值表全为 1。
永假式（矛盾式）：命题公式永远为假，真值表全为 0。

#### 10.2 判定

- 判永真：找成假指派——找到一行 0 即不是永真；全表无 0 才是永真
- 判永假：找成真指派——找到一行 1 即不是永假；全表无 1 才是永假
- 永假式即不可满足式（见考点11）

**来源**：旧版思维导图·第一章考点10

### 考点11：可满足式

meta: level=S; freq=2026.04

#### 11.1 定义与关系

可满足式：**至少存在一组**成真指派的命题公式。
关系：永真式必可满足；可满足 ≠ 永真；永假式 ⇔ 不可满足。

#### 11.2 易错

```err
(P∧(P→Q))→¬Q 不是永真式——后件是 ¬Q 不是 Q！P=1、Q=1 时前件真、后件假，整式为 0；其余 3 组指派为 1，所以是可满足式。后件若是 Q 才是假言推理的永真式。
```

#### 11.3 真题

**【2026.04·错题本·填空】** 命题公式 (P∧(P→Q))→¬Q 是＿＿式。
**答案：** 可满足
解析：一眼盯住后件 ¬Q；P=1、Q=1 找到成假指派即排除永真，再确认其余行有 1。

**来源**：错题本 2026.04·考点11；旧版思维导图·第一章考点9–11

### 考点12：命题逻辑推理（补充内容）

meta: level=S; freq=2025.04

#### 12.1 推理形式与常用规则

推理有效：从前提出发，每步按规则推进，最后得到结论；按编号列出步骤，每步标注所用规则。

```f
假言推理（分离）：A→B，A ⇒ B
拒取式：A→B，¬B ⇒ ¬A
析取三段论：A∨B，¬A ⇒ B
合取化简：A∧B ⇒ A
合取引入：A，B ⇒ A∧B
```

#### 12.2 CP 规则（结论是蕴含式时必用）

要证 A→B：① 附加引入 A（当临时前提）→ ② 由 A 推出 B → ③ 收回，结论写 A→B。
三步是闭环，缺第 ③ 步整题白做——推到 B 就停笔，B 只是后件，不是本题结论。

#### 12.3 归谬法

结论不好直接证 C 时：假设 ¬C，推出矛盾（得 A∧¬A 形），则 C 成立。

#### 12.4 真题

**【2025.04·错题本·证明】** 前提 P∨Q，¬P∨¬R，Q→S；结论 R→S。

```f
(1) P∨Q      前提
(2) ¬P∨¬R    前提
(3) Q→S      前提
(4) R        CP 附加前提
(5) ¬P       (2)(4) 析取三段论
(6) Q        (1)(5) 析取三段论
(7) S        (3)(6) 假言推理
(8) R→S      (4)(7) CP 收回
```

要点：两个析取三段论方向正好串成链 R→¬P→Q→S；最后一步必须写 R→S。

```err
推理推到 S 就收笔、结论一栏直接写 S——漏了 CP 规则的最后一步。S 只是后件，本题要证的结论是 R→S。
```

相关：2025.10 的矿样证明题用真值分类讨论而非推理规则，见考点6。

**来源**：错题本 2025.04·考点12；旧版思维导图·第一章考点12；考场清单第10条

### 考点13：全章速记图（图形版）

#### 考点13.1 一图总览

旧版思维导图的图形版速记图，与章首树状速记图同源——考前过一遍图即可唤起全章框架。

```d
<svg role="img" aria-label="第一章知识速记图：五个联结词真值规则、中文连接词转换、真值表、常用等值式与命题逻辑推理" viewBox="0 0 780 556" style="display:block;max-width:780px;width:100%;margin:8px 0"><rect x="240.0" y="9.0" width="300" height="30" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="2"/><text x="390" y="28.5" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--heading)">五个联结词（真值规则）</text><rect x="12.0" y="62.0" width="145" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="84.5" y="80.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">¬P（非）</text><text x="84.5" y="97.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">真值取反</text><rect x="165.0" y="62.0" width="145" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="237.5" y="80.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">P∧Q（且）</text><text x="237.5" y="97.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">全真才真</text><rect x="318.0" y="62.0" width="145" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390.5" y="80.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">P∨Q（或）</text><text x="390.5" y="97.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">有真就真</text><rect x="471.0" y="62.0" width="145" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="543.5" y="80.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">P→Q（单条件）</text><text x="543.5" y="97.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">只防「真→假」</text><rect x="624.0" y="62.0" width="145" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="696.5" y="80.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">P↔Q（双条件）</text><text x="696.5" y="97.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">同真同假才真</text><rect x="30.0" y="128.0" width="720" height="40" rx="7" fill="var(--formula-bg)" stroke="var(--accent)" stroke-width="1.8"/><text x="390" y="152.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">只要 P 就 Q ⇔ P→Q　　只有 P 才 Q ⇔ Q→P　　当且仅当 ⇔ P↔Q</text><rect x="10.0" y="188.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="212.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">真值表</text><text x="130" y="229.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">n 个变元 → 2ⁿ 行</text><rect x="270.0" y="188.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="212.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">等值</text><text x="390" y="229.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">两公式每行真值完全相同</text><rect x="525.0" y="188.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="212.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">永真＝全1，永假＝全0</text><text x="650" y="229.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">可满足＝至少一个 1</text><line x1="30" y1="264" x2="215" y2="264" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="264" x2="750" y2="264" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="268" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 常用等值式 ——</text><rect x="30.0" y="294.0" width="720" height="56" rx="7" fill="var(--formula-bg)" stroke="var(--accent)" stroke-width="1.8"/><text x="390" y="318.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">¬(A∨B)⇔¬A∧¬B　¬(A∧B)⇔¬A∨¬B　A∨(B∧C)⇔(A∨B)∧(A∨C)</text><text x="390" y="335.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--formula-text)">A→B⇔¬A∨B　A→B⇔¬B→¬A（逆否）　A↔B⇔(A→B)∧(B→A)</text><line x1="30" y1="370" x2="215" y2="370" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="370" x2="750" y2="370" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="374" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 命题逻辑推理 ——</text><rect x="10.0" y="400.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="424.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">假言推理 MP</text><text x="130" y="441.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">P→Q，P ⇒ Q</text><rect x="270.0" y="400.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="424.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">析取三段论</text><text x="390" y="441.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">P∨Q，¬P ⇒ Q</text><rect x="530.0" y="400.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="424.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">合取消去</text><text x="650" y="441.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">P∧Q ⇒ P、Q</text><rect x="85.0" y="480.0" width="330" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="250" y="504.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">CP 规则：要证 A→B</text><text x="250" y="521.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">引入 A → 推出 B → 收回 A→B</text><rect x="420.0" y="480.0" width="330" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="504.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">归谬法：要证 C</text><text x="585" y="521.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">假设 ¬C → 推出矛盾 ⇒ C</text></svg>
```

**来源**：旧版思维导图·第一章知识速记图

## 第二章 范式

范式是命题逻辑的标准化收尾：把任意公式化成「小项的析取」或「大项的合取」。本章的题眼是**求范式**与**数小项/大项个数**——错题记录里 2025.10 就考了小项个数选择题；项数题的本质是真值表数行，先数行再谈范式。

本章速记图（先看图建立全章框架，再逐个展开考点）：

```tree
第二章 范式（考点 1—7）
  核心：主析取/主合取范式的求法、小项大项计数
  1. 范式基本概念【B】
    小项：每个变元恰出现一次的合取式
    大项：每个变元恰出现一次的析取式
    主析取范式 = 小项的析取；主合取范式 = 大项的合取
  2. 主析取范式【S】
    真值表法：找结果为 1 的行 → 写小项 → ∨ 连接
    小项写法：变元取 1 写本身、取 0 写否定
    等值演算法：消 → → A∧(B∨¬B) 补齐变元 → 幂等去重
    易错：数小项先看清公式——(P∧Q)→Q 是 4 个小项，不是 3 个
  3. 主合取范式【S】
    真值表法：找结果为 0 的行 → 写大项 → ∧ 连接
    大项写法：变元取 0 写本身、取 1 写否定
    补项：A∨(B∧¬B) ⇔ A；¬mᵢ ⇔ Mᵢ
  4. 大小项个数【S】
    小项个数 = 真值表中 1 的行数
    大项个数 = 真值表中 0 的行数
    小项数 + 大项数 = 2ⁿ
    永真式：小项 2ⁿ 个；矛盾式：大项 2ⁿ 个
    可满足式：大项最多 2ⁿ−1 个
  5. 小项与大项的性质【A】
    不同小项的合取为假；不同大项的析取为真
    ¬mᵢ ⇔ Mᵢ
    全部小项的析取 = 永真式；全部大项的合取 = 永假式
  6. 命题公式的项数问题【D】
    旧笔记已并入考点4，内容见上
  7. 自然推理规则（CP 规则）【A】
    P 规则：前提引入；T 规则：置换
    CP：结论 A→B ⇒ 附加 A → 推出 B → 收回 A→B
    归谬：假设 ¬C 推出矛盾 ⇒ C
```

```tip
【做题】求范式先列真值表：问小项数 1 的行、问大项数 0 的行；等值演算路线先消 →，再添 (B∨¬B)/(B∧¬B) 补齐变元，最后幂等去重按编码排序。
```

### 考点1：范式基本概念

meta: level=B

#### 1.1 是什么

范式（Normal Form）：命题公式的**标准化**形式。
小项（Minterm）：命题变项及其否定的**合取**式，每个变项出现且仅出现一次。
大项（Maxterm）：命题变项及其否定的**析取**式，每个变项出现且仅出现一次。

#### 1.2 四个概念一张表

| 概念 | 构成 | 示例 |
|---|---|---|
| 小项 | 原子命题用 ∧ 连接 | P∧Q，P∧¬Q |
| 大项 | 原子命题用 ∨ 连接 | P∨Q，P∨¬Q |
| 主析取范式 | 小项用 ∨ 连接 | (P∧Q)∨(¬P∧Q) |
| 主合取范式 | 大项用 ∧ 连接 | (P∨Q)∧(¬P∨Q) |

**来源**：旧版思维导图·第二章考点1

### 考点2：主析取范式

meta: level=S; freq=2025.10

#### 2.1 是什么

主析取范式（PDNF）：若干**小项用 ∨ 连接**构成的公式。
原理：公式的主析取范式 = **所有使其为真的赋值**对应小项的析取。

#### 2.2 小项的编码

以 P、Q 两个变元为例（变元按顺序读，取 1 写本身、取 0 写否定，编码转十进制当下标）：

| 小项 | 编码 | 简写 |
|---|---|---|
| P∧Q | 11 | m₃ |
| P∧¬Q | 10 | m₂ |
| ¬P∧Q | 01 | m₁ |
| ¬P∧¬Q | 00 | m₀ |

```err
单独的 P 不是小项（缺 Q）；P∧¬P 也不是（P 出现了两次，不满足"恰出现一次"）。
```

#### 2.3 怎么求——真值表法（优先）

- 第一步：列真值表（n 个变元 2ⁿ 行，从全 1 到全 0）
- 第二步：找出**结果为 1** 的行
- 第三步：每行写小项（变元取 1 写本身、取 0 写否定），用 ∨ 连接

#### 2.4 怎么求——等值演算法（次选）

- 先消 → 化简成析取式
- 缺变元就添项：**A∧(B∨¬B) ⇔ A**，再用分配律拆开
- 重复项用幂等律 A∨A⇔A 去掉，按编码从小到大排序

```f
例：求 (p→q)∧r 的主析取范式
(p→q)∧r ⇔ (¬p∨q)∧r            消 →
⇔ (¬p∧r)∨(q∧r)                分配律
⇔ [¬p∧(q∨¬q)∧r] ∨ [(p∨¬p)∧q∧r]   缺变元补 (q∨¬q)、(p∨¬p)
⇔ (¬p∧q∧r)∨(¬p∧¬q∧r)∨(p∧q∧r)  幂等去重
⇔ m₃∨m₁∨m₇ = ∑(1,3,7)
```

#### 2.5 真题

**【2025.10·错题本·单选】** 命题公式 (P∧Q)→Q 的主析取范式中含小项的个数是（A. 1　B. 2　C. 3　D. 4）
**答案：D**
解析：先化简——(P∧Q)→Q ⇔ ¬(P∧Q)∨Q ⇔ ¬P∨¬Q∨Q ⇔ ¬P∨1 ⇔ 1，是永真式，全部 2²=4 组赋值都成真，故 4 个小项。

```err
把它当成 P→Q 来数：P→Q 只在 P=1、Q=0 一行成假，恰 3 个小项——会误选 C。看清 ∧Q 再动手。
```

**来源**：错题本 2025.10·考点2；旧版思维导图·第二章考点2

### 考点3：主合取范式

meta: level=S

#### 3.1 是什么

主合取范式（PCNF）：若干**大项用 ∧ 连接**构成的公式。
原理：公式的主合取范式 = **所有使其为假的赋值**对应大项的合取。
大项与小项的关系：**Mᵢ = ¬mᵢ**（大项的否定是小项，反之亦然）。

#### 3.2 大项的编码（正记 0、反记 1）

| 大项 | 式 | 成假赋值 |
|---|---|---|
| M₀ | p∨q∨r | 000 |
| M₁ | p∨q∨¬r | 001 |
| M₂ | p∨¬q∨r | 010 |
| M₃ | p∨¬q∨¬r | 011 |
| M₄—M₇ | 同规律（¬ 记 1） | 100—111 |

#### 3.3 怎么求

- 真值表法：找**结果为 0** 的行；每行写大项（变元取 **0 写本身、取 1 写否定**），用 ∧ 连接
- 等值演算法：消 → 化成合取式；缺变元添 **A∨(B∧¬B) ⇔ A** 拆开；幂等律 A∧A⇔A 去重

```f
例：求 p∧q 的主合取范式
真值表仅 11 行为 1，零行为 10、01、00
p∧q ⇔ (¬p∨q)∧(p∨¬q)∧(p∨q) ⇔ M₂∧M₁∧M₀ = ∏(0,1,2)
```

```tip
【记忆】小项"1 正 0 反用 ∧ 连"；大项"0 正 1 反用 ∨ 连"——正反刚好相反，别背串。
```

**来源**：旧版思维导图·第二章考点3

### 考点4：大小项个数

meta: level=S

#### 4.1 计数规则

小项个数 = 真值表中**结果为 1 的行数**。
大项个数 = 真值表中**结果为 0 的行数**。
关键关系：**小项个数 + 大项个数 = 2ⁿ**。

#### 4.2 常用结论

- 重言式：小项 2ⁿ 个（大项 0 个）
- 矛盾式：大项 2ⁿ 个（小项 0 个，主析取范式不存在）
- 可满足式：至少 1 个小项，大项最多 2ⁿ−1 个

#### 4.3 典型例题

**P→Q 的小项个数？** P→Q 仅 10 行为假，3 行为真 → 3 个小项。
**含 2 个变元的矛盾式 A 的大项个数？** 全部赋值为假，2²=4 → 4 个大项。
**¬(P∧Q)→R（3 变元）的大项个数？** 真值表 8 行中值为 0 的行有 3 行（000、010、100）→ 3 个，即 ∏(0,2,4)。
**含 n 个变项的重言式的主析取范式小项个数？** 全部成真 → 2ⁿ 个。
**含 n(n≥2) 个变项的可满足式，主合取范式最多几个大项？** 小项最少 1 个时大项最多 → 2ⁿ−1 个。

**来源**：旧版思维导图·第二章考点4、6（考点6"项数问题"旧笔记已并入本考点）

### 考点5：小项与大项的性质

meta: level=A

#### 5.1 必背

```f
mᵢ∧mⱼ ⇔ F（i≠j）    不同小项的合取为假
Mᵢ∨Mⱼ ⇔ T（i≠j）    不同大项的析取为真
¬Mᵢ ⇔ mᵢ，¬mᵢ ⇔ Mᵢ   大项小项互为否定
```

#### 5.2 为什么（一行证明）

```f
m₃∧m₂ = (p∧q)∧(p∧¬q) = p∧(q∧¬q) = p∧0 ⇔ F
M₃∨M₂ = (¬p∨¬q)∨(¬p∨q) = ¬p∨(¬q∨q) = ¬p∨1 ⇔ T
¬M₂ = ¬(¬p∨q) = p∧¬q = m₂
```

#### 5.3 对照记忆

- 任一赋值**恰使一个小项为真**（这是计数规则的根）
- 全部小项的析取 = 永真式；全部大项的合取 = 永假式
- "任意两个不同小项的析取必为重言式"是**错的**——m₁∨m₂ 在 00、11 两行均为假

**来源**：旧版思维导图·第二章考点5

### 考点6：命题公式的项数问题

meta: level=D

旧笔记已把本考点内容并入考点4（大小项个数），复习直接看考点4。

**来源**：旧版思维导图·第二章考点6

### 考点7：自然推理规则（CP 规则）

meta: level=A

#### 7.1 两条基本规则

- P 规则（前提引入）：任何前提都可直接引入，H⇒H
- T 规则（置换）：已得出的结论可经等值式/蕴含式转换为新结论

#### 7.2 CP 规则与归谬法

CP 规则：结论是蕴含式 A→B 时，把前件 A 作为**附加前提**引入，推出后件 B，即可证 A→B 成立。
归谬法：要证结论 C，把 ¬C 作为附加前提加入；若推出矛盾（P∧¬P），则 C 成立。

#### 7.3 四大基本推理规则

| 名称 | 形式 | 说明 |
|---|---|---|
| 假言推理（分离） | p→q，p ⊢ q | 肯定前件 |
| 析取三段论 | p∨q，¬p ⊢ q | 否定一个取另一个 |
| 合取消去 | p∧q ⊢ p（及 q） | 合取式可拆 |
| 双条件推理 | p↔q，p ⊢ q；p↔q，¬p ⊢ ¬q | 同真同假 |

#### 7.4 三个推章程式

**串联基本规则**：前提 p∧q，q→¬r，r∨s，证 s——合取消去得 q → 假言推理得 ¬r → 析取三段论得 s。
**归谬法**：前提 S→¬Q，S∨R，¬R↔Q，证 R——反设 ¬R → S∨R 得 S → S→¬Q 得 ¬Q → ¬R↔Q 得 Q → Q 与 ¬Q 矛盾。
**CP 规则**：前提 P→(Q→R)，S→P，Q，证 S→R——附加前提 S → S→P 得 P → P→(Q→R) 得 Q→R → 配 Q 得 R → CP 收回 S→R。

```tip
【记忆】结论是单条件就用 CP，哪怕题目没提示；命题逻辑推理同款套路见第一章考点12。
```

**来源**：旧版思维导图·第二章考点7

### 考点8：全章速记图（图形版）

#### 考点8.1 一图总览

旧版思维导图的图形版速记图，与章首树状速记图同源——考前过一遍图即可唤起全章框架。

```d
<svg role="img" aria-label="第二章知识速记图：小项大项、主析取主合取范式、个数关系、补变元与自然推理规则" viewBox="0 0 780 556" style="display:block;max-width:780px;width:100%;margin:8px 0"><rect x="240.0" y="9.0" width="300" height="30" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="2"/><text x="390" y="28.5" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--heading)">真值表：n 个变元 2ⁿ 行</text><line x1="390" y1="39" x2="390" y2="52" style="stroke:var(--muted);stroke-width:1.5"/><line x1="195" y1="52" x2="585" y2="52" style="stroke:var(--muted);stroke-width:1.5"/><line x1="195" y1="52" x2="195" y2="65" style="stroke:var(--muted);stroke-width:1.5"/><line x1="585" y1="52" x2="585" y2="65" style="stroke:var(--muted);stroke-width:1.5"/><rect x="20.0" y="65.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="81.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">小项 mᵢ（主析取用）</text><text x="195" y="98.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">每个变元恰出现一次，∧ 连接</text><text x="195" y="115.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">真值 1 写正、0 写反</text><text x="195" y="132.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">例：P=1,Q=0 → m₂＝P∧¬Q</text><rect x="410.0" y="65.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="81.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">大项 Mᵢ（主合取用）</text><text x="585" y="98.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">每个变元恰出现一次，∨ 连接</text><text x="585" y="115.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">真值 0 写正、1 写反</text><text x="585" y="132.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">例：P=1,Q=0 → M₂＝¬P∨Q</text><line x1="30" y1="160" x2="215" y2="160" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="160" x2="750" y2="160" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="164" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 两个范式：真行 vs 假行 ——</text><rect x="20.0" y="181.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="205.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">主析取范式 PDNF</text><text x="195" y="222.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">成真行的小项用 ∨ 连接</text><text x="195" y="239.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">小项数＝真行数</text><rect x="410.0" y="181.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="205.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">主合取范式 PCNF</text><text x="585" y="222.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">成假行的大项用 ∧ 连接</text><text x="585" y="239.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">大项数＝假行数</text><text x="390" y="272" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--muted)">小项数＋大项数＝2ⁿ；重言式：PDNF 2ⁿ 项、PCNF 0 项；矛盾式相反；可满足式＝有真行</text><line x1="30" y1="292" x2="215" y2="292" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="292" x2="750" y2="292" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="296" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 小项大项关系 ＋ 补变元 ——</text><rect x="30.0" y="322.0" width="720" height="56" rx="7" fill="var(--formula-bg)" stroke="var(--accent)" stroke-width="1.8"/><text x="390" y="346.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">¬mᵢ＝Mᵢ　不同小项 mᵢ∧mⱼ＝F（i≠j）　不同大项 Mᵢ∨Mⱼ＝T</text><text x="390" y="363.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--formula-text)">缺变元：A∧(B∨¬B)⇔A（补小项）　A∨(B∧¬B)⇔A（补大项）　先消 →：P→Q⇔¬P∨Q</text><line x1="30" y1="400" x2="215" y2="400" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="400" x2="750" y2="400" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="404" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 自然推理：P / T / CP / 归谬 ——</text><rect x="10.0" y="430.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="454.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">P 规则：前提引入</text><text x="130" y="471.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">T 规则：等值替换</text><rect x="270.0" y="430.0" width="240" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="463.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">CP 规则：结论是 A→B</text><text x="390" y="480.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">引入 A → 推出 B → 收回</text><rect x="530.0" y="430.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="454.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">归谬法：要证 C</text><text x="650" y="471.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">假设 ¬C，推出矛盾 ⇒ C</text><rect x="30.0" y="510.0" width="720" height="40" rx="7" fill="var(--formula-bg)" stroke="var(--accent)" stroke-width="1.8"/><text x="390" y="534.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">高频：P→Q，P⇒Q（MP）　P∨Q，¬P⇒Q　P∧Q⇒P、Q　P↔Q，P⇒Q；P↔Q，¬P⇒¬Q</text></svg>
```

**来源**：旧版思维导图·第二章知识速记图

## 第三章 谓词逻辑

谓词逻辑在命题逻辑上加了两样东西：**刻画性质的谓词**和**管辖范围的量词**。本章的动作是：符号化（∀ 配 →、∃ 配 ∧）→ 判真假（代特值找反例）→ 化前束范式（改名、消 →、前移）→ 谓词推理（先消量词再套命题规则）。错题本未收录本章错题；旧笔记标注 2023.10 考过谓词永真式证明。

本章速记图（先看图建立全章框架，再逐个展开考点）：

```tree
第三章 谓词逻辑（考点 1—9）
  核心：符号化、量词真假、恒等式、前束范式、推理
  1. 谓词和量词【A】
    谓词 P(x)：刻画对象性质；论域：个体取值范围
    ∀ 全称：所有、每一个
    ∃ 存在：至少一个（≠恰好一个）
  2. 谓词符号化【S】
    所有 P 都是 Q：∀x(P(x)→Q(x))
    有的 P 是 Q：∃x(P(x)∧Q(x))
    有的 P 不是 Q：∃x(P(x)∧¬Q(x))
    口诀：∀ 配 →，∃ 配 ∧
  3. 谓词公式的真假【A】
    ∀：全真才真，一个反例即假
    ∃：有一个真即真，全假即假
    多重量词：∀x∃y ≠ ∃y∀x，顺序换含义变
  4. 量词的辖域【B】
    有括号辖到括号尾；无括号只辖紧邻谓词
    易错：∀xP(x)∧Q(x) 的 Q(x) 不在辖域内
  5. 约束变元和自由变元【A】
    指导变元：量词后那个变元
    约束出现：辖域内与指导变元同名
    判定从里往外找最近的量词；同一变元可一处约束一处自由
  6. 量词的消去【B】
    有限论域 D={a,b,c}
    ∀xP(x) ⇔ P(a)∧P(b)∧P(c)
    ∃xP(x) ⇔ P(a)∨P(b)∨P(c)
  7. 谓词恒等式【S】
    否定翻转：¬∀⇔∃¬，¬∃⇔∀¬
    ∀ 配 ∧、∃ 配 ∨ 可双向
    单向：∀xP∨∀xQ ⇒ ∀x(P∨Q)；∃x(P∧Q) ⇒ ∃xP∧∃xQ
  8. 前束范式【A】
    三步：改名 → 消 → → 量词前移
    所有量词都在最前面，辖域为整个公式
  9. 谓词推理【S】
    UI：∀xP(x) ⇒ P(c)
    消量词后套命题逻辑规则
    证永真：反证设假 → 量词否定翻转 → UI/EI 落到同一个 c
```

```tip
【做题】符号化两句型背死（∀ 配 →、∃ 配 ∧）；判真假代特值找反例最快；化前束范式严格走"改名→消→→前移"；推理题第一步永远是消量词（UI/EI）。
```

### 考点1：谓词和量词

meta: level=A

#### 1.1 是什么

谓词：表示**对象具有某种性质**，记 P(x)、A(x)。
个体词：议论的对象——具体对象叫个体常项（小张、小王），不特定的叫个体变项（x、y）。
论域（个体域）：个体词的取值范围（全体实数、自然数等）。

#### 1.2 量词

| 量词 | 符号 | 含义 |
|---|---|---|
| 全称量词 | ∀ | 所有、每一个 |
| 存在量词 | ∃ | 至少有一个、存在 |

```f
∀xP(x)：论域中所有 x 都满足 P
∃xP(x)：论域中至少存在一个 x 满足 P
```

```err
∃ 的"至少一个"≠"恰好一个"——满足的有 1 个、2 个、50 个都算真。
```

**来源**：旧版思维导图·第三章考点1

### 考点2：谓词符号化

meta: level=S

#### 2.1 必背句型

| 语句 | 符号化 |
|---|---|
| 所有 P 都是 Q | ∀x(P(x)→Q(x)) |
| 所有 P 都不是 Q | ∀x(P(x)→¬Q(x)) |
| 有的 P 是 Q | ∃x(P(x)∧Q(x)) |
| 有的 P 不是 Q | ∃x(P(x)∧¬Q(x)) |

```tip
【记忆】∀ 配 →，∃ 配 ∧。全称管"所有情况都得成立"（蕴含），存在只管"找到一个"（合取）。
```

#### 2.2 为什么 ∃ 配 ∧（合取非的由来）

```f
¬(A→B) ⇔ ¬(¬A∨B) ⇔ A∧¬B
```

"A→B 为假"恰是"A 真而 B 假"——所以"存在不是懒的胖人"就是 ∃x(P(x)∧¬L(x))。

#### 2.3 特殊句式

"并不是所有人都喜欢游泳"（M(x)：x 是人，S(x)：x 喜欢游泳）：

```f
¬∀x(M(x)→S(x)) ⇔ ∃x(M(x)∧¬S(x))
```

应试优先写直译形式（¬∀ 开头），两式等值。

```tip
【做题】选择题比对首符号即可排错："不存在…"开头 → 正确答案必以 ¬∃ 开头；"有的…"开头 → 必以 ∃ 开头。
```

**来源**：旧版思维导图·第三章考点2

### 考点3：谓词公式的真假

meta: level=A

#### 3.1 判定规则

| 量词 | 为真的条件 | 为假的条件 |
|---|---|---|
| ∀ | 论域中**每一个**都满足 | 只要有一个不满足 |
| ∃ | 只要有一个满足 | **全部**都不满足 |

#### 3.2 怎么判

判 ∀ 假：找一个反例即可。判 ∃ 真：找一个正例即可。找不出例子的，按定义推。
多重量词：**∀x∃y 与 ∃y∀x 顺序不同含义不同**，先读清楚谁依赖谁。

#### 3.3 典型例（论域：整数）

```f
∀x(x²≥1)          假   x=0 时 0<1，一个反例即假
∀x∃y(x²<y)        真   每个 x 取 y=x²+1
∀x(x²≥x)          真   x²−x=x(x−1)≥0 对一切整数成立
∀x∃y(x²+y²=6)     假   反例 x=10：100+y²=6 无整数解
∀x∃y(x<y)         真   每个 x 取 y=x+1
∃y∀x(x<y)         假   没有比所有整数都大的 y
```

自然数论域的 ∀x∃y(x+y=10)：假——x=100 时 y=−90 不在论域内。判真假**先确认论域**。

```tip
【做题】选项题逐个代特值找反例：如 ∃x∃y(x²+y²=10)，代 1²+3²=10 即真。
```

**来源**：旧版思维导图·第三章考点3

### 考点4：量词的辖域

meta: level=B

#### 4.1 判定规则

- 量词后**有括号**：辖域是整个括号内
- 量词后**无括号**：辖域只是紧邻的那个谓词

#### 4.2 示例

```f
∀xP(x)：辖域是 P(x)
∀x(P(x)→Q(x))：辖域是整个括号
∀xP(x)∧Q(x)：∀x 只辖 P(x)，Q(x) 不在辖域内
```

```err
∀xP(x)∧Q(x) 是判断题常客——没有括号时量词管不到后面的合取项。
```

**来源**：旧版思维导图·第三章考点4

### 考点5：约束变元和自由变元

meta: level=A

#### 5.1 是什么

指导变元：紧跟在量词后面的那个个体变元（∀x、∃x 中的 x）。
约束变元：辖域内**与指导变元同名**的出现（被该量词约束）。
自由变元：不受任何量词约束的出现。

#### 5.2 怎么判断

- 先找量词的辖域和指导变元
- 某次出现：**从里往外**找覆盖它的最近量词——该量词以它为指导变元 → 约束出现；一直到公式末尾都没有 → 自由出现
- 约束/自由**按"出现"算**：同一变元可一处约束、另一处自由

#### 5.3 三个判定例

```f
∀x(P(x)→Q(y))    x 约束出现（P(x)），y 自由出现
∀x(P(x)∧∀yQ(y))  y 在 ∀x 辖域内但被内层 ∀y 约束——y 是约束变元
P(x)∧∀xQ(x)      前一个 x 自由出现，∀x 辖域内的 x 约束出现
```

```err
"出现与指导变元不同名"≠自由——它可能被更内层的量词约束（见 ∀yQ(y) 的 y）。
```

**来源**：旧版思维导图·第三章考点5

### 考点6：量词的消去

meta: level=B

#### 6.1 等价形式（有限论域）

论域 D={a,b,c} 时：

```f
∀xP(x) ⇔ P(a)∧P(b)∧P(c)
∃xP(x) ⇔ P(a)∨P(b)∨P(c)
```

全称是合取、存在是析取——这也解释了考点2 的"∀ 配 →、∃ 配 ∧"和考点7 的恒等式方向。

**来源**：旧版思维导图·第三章考点6

### 考点7：谓词恒等式

meta: level=S

#### 7.1 必背（前 4 个双向，后 2 个单向）

```f
∀xP(x) ⇔ P(a)∧P(b)∧P(c)        有限论域：全称→合取
∃xP(x) ⇔ P(a)∨P(b)∨P(c)        有限论域：存在→析取
¬∀xP(x) ⇔ ∃x¬P(x)              否定翻转量词
¬∃xP(x) ⇔ ∀x¬P(x)
∀xP(x)∨∀xQ(x) ⇒ ∀x(P(x)∨Q(x))  单向蕴含，不可反向
∃x(P(x)∧Q(x)) ⇒ ∃xP(x)∧∃xQ(x)  单向蕴含，不可反向
```

#### 7.2 两条双向式（与单向对照，最易混）

```f
∀xP(x)∧∀xQ(x) ⇔ ∀x(P(x)∧Q(x))
∃xP(x)∨∃xQ(x) ⇔ ∃x(P(x)∨Q(x))
```

```err
方向口诀：∀ 配 ∧、∃ 配 ∨ 才能双向。∀x(P(x)∨Q(x)) 推不出 ∀xP(x)∨∀xQ(x)——"选不正确"题的常客。全称对析取不分配，存在对合取不分配。
```

#### 7.3 量词辖域扩张（推导常用）

```f
∀xA(x)→B ⇔ ∃x(A(x)→B)     B 不含 x
A→∀xB(x) ⇔ ∀x(A→B(x))     A 不含 x
```

```err
第二条写成 ∃x(A→B(x)) 就错了。反例：A 真、B(0) 假、B(1) 真时，∀x(A→B(x)) 为假而 ∃x(A→B(x)) 为真。
```

**来源**：旧版思维导图·第三章考点7；旧版"规则补充"·谓词分配律

### 考点8：前束范式

meta: level=A

#### 8.1 是什么

前束范式：**所有量词都在最前面**、辖域为整个公式的形式。

#### 8.2 三步转化

- ① 改名：不同辖域内相同的变元改名（避免重名冲突）
- ② 消 →：A→B 改写为 ¬A∨B
- ③ 前移：用等值式把量词逐个移到公式最前面

#### 8.3 示例

```f
例1：¬∀xP(x)→Q(y)
⇔ ¬(¬∀xP(x))∨Q(y)     消 →
⇔ ∀xP(x)∨Q(y)         双重否定
⇔ ∀x(P(x)∨Q(y))       量词前移（x 不在 Q(y) 中自由出现）

例2：∀xA(x)→∃yB(y)
⇔ ¬∀xA(x)∨∃yB(y) ⇔ ∃x¬A(x)∨∃yB(y)
⇔ ∃x∃y(¬A(x)∨B(y))

例3（先改名）：∀x(P(x,y)→∀yQ(x,y))
内层 y 与自由 y 重名 → 先把内层改名为 ∀z：
⇔ ∀x(P(x,y)→∀zQ(x,z)) ⇔ ∀x∀z(¬P(x,y)∨Q(x,z))
```

**来源**：旧版思维导图·第三章考点8

### 考点9：谓词推理

meta: level=S

#### 9.1 核心规则

全称量词消去 UI：**∀xP(x) ⇒ P(c)**（c 为论域中任意一个具体元素）。
套路：先消量词，再套命题逻辑的规则（假言推理、拒取式等，见第一章考点12）。

#### 9.2 标准推章程式

"所有上这门课的人都掌握图论，小华上了这门课，所以小华掌握图论"。设 P(x)：x 上这门课，Q(x)：x 掌握图论：

```f
① ∀x(P(x)→Q(x))       前提
② P(小华)→Q(小华)      ① UI，取 x=小华
③ P(小华)              前提
④ Q(小华)              ②③ 假言推理
```

拒取式同款："凡大学生都勤奋，小明不勤奋 ⇒ 小明不是大学生"——UI 得 D(m)→Q(m)，配 ¬Q(m) 用拒取式得 ¬D(m)。

#### 9.3 永真式证明模板（反证法）

**【2023.10·旧笔记标注·证明】** 证明 ∀x(P(x)∨Q(x))→(∀xP(x)∨∃xQ(x)) 为永真式。
思路：蕴含式永真 ⇔ 前件真时后件必真；反证——假设存在"前件真、后件假"的解释。

```f
① 设后件假：∀xP(x) 为假 且 ∃xQ(x) 为假
② ∃xQ(x) 假 ⇔ ∀x¬Q(x)              量词否定等值式
③ ∀xP(x) 假 ⇔ ∃x¬P(x)，取 c 使 ¬P(c)
④ 前件真 + UI：P(c)∨Q(c)
⑤ 对 c 用 ②：¬Q(c)
⑥ P(c)∨Q(c) 与 ¬P(c)、¬Q(c) 矛盾 → 假设不成立，原式永真
```

模板：**反证设假 → 量词否定翻转 → UI/EI 落到同一个 c → 制造命题矛盾**。

**来源**：旧版思维导图·第三章考点9（2023.10 为旧笔记自标年份，题号未记录）

### 考点10：全章速记图（图形版）

#### 考点10.1 一图总览

旧版思维导图的图形版速记图，与章首树状速记图同源——考前过一遍图即可唤起全章框架。

```d
<svg role="img" aria-label="第三章知识速记图：谓词符号化四句、真假判断与量词顺序、辖域与自由变元、量词消去、恒等式、前束范式与推理" viewBox="0 0 780 516" style="display:block;max-width:780px;width:100%;margin:8px 0"><rect x="200.0" y="9.0" width="380" height="30" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="2"/><text x="390" y="28.5" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--heading)">符号化：全称配 →，存在配 ∧</text><rect x="6.0" y="60.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="99" y="84.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">所有 P 是 Q</text><text x="99" y="101.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">∀x(P(x)→Q(x))</text><rect x="200.0" y="60.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="293" y="84.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">有的 P 是 Q</text><text x="293" y="101.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">∃x(P(x)∧Q(x))</text><rect x="394.0" y="60.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="487" y="84.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">所有 P 不是 Q</text><text x="487" y="101.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">∀x(P(x)→¬Q(x))</text><rect x="588.0" y="60.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="681" y="84.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">有的 P 不是 Q</text><text x="681" y="101.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">∃x(P(x)∧¬Q(x))</text><text x="390" y="132" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--muted)">全称句用蕴涵 →，存在句用合取 ∧——∀x(P(x)∧Q(x)) 是典型错误</text><line x1="30" y1="150" x2="215" y2="150" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="150" x2="750" y2="150" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="154" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 真假判断 ＋ 量词顺序 ——</text><rect x="5.0" y="180.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="204.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">∀：全真才真</text><text x="130" y="221.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">一个反例就为假</text><rect x="265.0" y="180.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="204.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">∃：有一个真就真</text><text x="390" y="221.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">全部为假才为假</text><rect x="530.0" y="180.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="204.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">∀x∃y ≠ ∃y∀x</text><text x="650" y="221.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">量词顺序换，含义变</text><line x1="30" y1="258" x2="215" y2="258" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="258" x2="750" y2="258" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="262" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 辖域 · 自由变元 · 消去 ——</text><rect x="5.0" y="288.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="312.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">量词辖域：有括号管整段</text><text x="130" y="329.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">量词后的 x＝指导变元</text><rect x="265.0" y="288.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="312.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">辖域内出现＝约束变元</text><text x="390" y="329.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">不被任何量词管＝自由变元</text><rect x="525.0" y="288.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="312.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">有限论域消去</text><text x="650" y="329.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">∀xP ⇒ ∧；∃xP ⇒ ∨</text><line x1="30" y1="366" x2="215" y2="366" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="366" x2="750" y2="366" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="370" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 恒等式 · 前束范式 · 推理 ——</text><rect x="30.0" y="404.0" width="720" height="40" rx="7" fill="var(--formula-bg)" stroke="var(--accent)" stroke-width="1.8"/><text x="390" y="428.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">¬∀xP ⇔ ∃x¬P　　¬∃xP ⇔ ∀x¬P</text><rect x="20.0" y="460.0" width="350" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="484.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">前束范式三步</text><text x="195" y="501.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">①改名 ②消 → ③量词前移</text><rect x="405.0" y="460.0" width="360" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="484.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">UI：∀xP(x) ⇒ P(c)</text><text x="585" y="501.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">证明 A→B 用 CP；直接推理 / 归谬</text></svg>
```

**来源**：旧版思维导图·第三章知识速记图

## 第四章 集合

集合章是后面关系、函数的语言基础。核心动作四个：**数元素（基数）、算幂集、做运算（∩ ∪ − ⊕）、套容斥**。错题记录显示 2025.04、2026.04 两套卷都出了本章题：数元素端点、对称差计算、容斥证明各一题——端点和"1 不是质数"这类细节是主要失分点。

本章速记图（先看图建立全章框架，再逐个展开考点）：

```tree
第四章 集合（考点 1—8）
  核心：基数与幂集、五种运算、笛卡尔积、容斥
  1. 集合的基本概念【A】
    基数 |A|：元素个数；空集 ∅
    无序性、互异性
    易错：0 是 5 的倍数——数元素端点别漏
  2. 子集和真子集【A】
    A⊆B：A 的元素全在 B 里（可取全部）
    真子集：子集去掉 A 自己
    空集是任何集合的子集
    易错：a∈A 与 {a}⊆A 是两码事
  3. 幂集【S】
    P(A)：全部子集构成的集合
    |P(A)| = 2^|A|
    按逗号数元素：{1,{2,3},4} 是 3 元集
  4. 集合的运算【S】
    ∩ 取重合；∪ 合并去重；A−B 有 A 无 B
    A∩B=A ⇔ A⊆B ⇔ A−B=∅ ⇔ A∪B=B
  5. 对称差【A】
    A⊕B = (A∪B)−(A∩B) = (A−B)∪(B−A)
    只保留恰属一方的元素
  6. 笛卡尔积【A】
    有序对，顺序就是身份
    |A×B| = |A|·|B|；A² = A×A
  7. 笛卡尔积的性质【B】
    对 ∪、∩、− 都可分配
    易错：A×B ≠ B×A
  8. 容斥原理与幂集恒等式【S】
    两集合：|A∪B| = |A|+|B|−|A∩B|
    三集合：单个加、两两减、三个加回
    P(A)∩P(B) = P(A∩B)
    P(A)∪P(B) ⊆ P(A∪B)，别写等号
```

```tip
【做题】数元素先写通项再定范围（n=5k+1≤100，k 从 0 起）；见到"质数"先默念 1 和 9 都不是；容斥证明按"两集合公式用两次＋分配律"拆。
```

### 考点1：集合的基本概念

meta: level=A; freq=2026.04

#### 1.1 是什么

集合：若干个确定元素组成的整体。
元素与属于：1∈{1,2,3}——元素与集合的关系用 ∈。
基数（势）：集合中元素的个数，记 |A|。
空集：没有元素的集合，记 ∅ 或 {}。

#### 1.2 表示方法

- 列举法：A={1,2,3}；小于 10 的正奇数 = {1,3,5,7,9}
- 描述法：A={x∣x 是偶数}；B={n²+1∣n 为自然数且 n²+1<20}={1,2,5,10,17}（n=0,1,2,3,4）

#### 1.3 两条性质

- 无序性：{1,2,3}={1,3,2}
- 互异性：{1,1,2,3}={1,2,3}

#### 1.4 真题

**【2026.04·错题本·填空】** S={n∣1≤n≤100，n∈Z}，A={n∣n−1 为 5 的倍数，n∈S}，则 |A|=＿＿
**答案：** 20
解析：n−1=5k 中 k=0 合法（**0 是 5 的倍数**），所以 n=5k+1≤100，k=0,1,…,19 共 20 个，即 {1,6,11,…,96}。

```err
数元素先定通项和范围再数个数——本题丢分都在漏 n=1（以为 0 不是 5 的倍数）或首尾差一。
```

**来源**：错题本 2026.04·考点1；旧版思维导图·第四章考点1

### 考点2：子集和真子集

meta: level=A

#### 2.1 定义

子集（A⊆B）：A 的元素全在 B 里，**可以取全部**（A⊆A）。
真子集（A⊊B)：取部分组成新集合，**不能取全部**。

#### 2.2 必背结论

- 空集是**任何**集合的子集
- 集合是它自己的子集，但不是它自己的真子集
- A={1,2,3} 的子集 8 个：∅、三个单元素、三个双元素、A 自己；真子集去掉 A 剩 7 个

#### 2.3 易错

```err
元素与集合的双重身份：A={a,{a}} 有两个元素 a 和 {a}。此时 a∈A，同时 {a}⊆A——{a} 既是 A 的元素，又能充当子集。∈ 是"元素属于集合"，⊆ 是"集合包含集合"，两码事。
```

**来源**：旧版思维导图·第四章考点2

### 考点3：幂集

meta: level=S

#### 3.1 是什么

幂集 P(A)（或 2^A）：集合 A 的**所有子集**构成的集合。
核心公式：**|P(A)| = 2^|A|**（∅ 和 A 自己都在内）。

#### 3.2 怎么数元素个数

按**逗号**数——每个逗号隔开的整体算一个元素：

```f
A={1,2}          2 个元素 → |P(A)|=2²=4：{∅,{1},{2},{1,2}}
A={∅,{∅}}        2 个元素（∅ 和 {∅} 各一个）→ |P(A)|=4
A={1,{2,3},4}    3 个元素（{2,3} 整体算一个）→ |P(A)|=2³=8
```

**来源**：旧版思维导图·第四章考点3

### 考点4：集合的运算

meta: level=S

#### 4.1 三种基本运算

| 运算 | 符号 | 含义 |
|---|---|---|
| 交集 | A∩B | 重合的部分 |
| 并集 | A∪B | 合并，重复只算一次 |
| 差集 | A−B | 有 A 无 B |

例：A={1,2,3,4}，B={2,4,5,6}：A∩B={2,4}，A∪B={1,2,3,4,5,6}，A−B={1,3}，B−A={5,6}。

#### 4.2 等价链（判断题常用）

```f
A∩B=A ⇔ A⊆B ⇔ A−B=∅ ⇔ A∪B=B
```

A∩B=A 说明 A 的元素全在 B 里；A−B=∅ 说的是"没有 A 独有的元素"；**B−A=∅ 成立当且仅当 B⊆A**——方向别看反。

**来源**：旧版思维导图·第四章考点4

### 考点5：对称差

meta: level=A; freq=2026.04

#### 5.1 定义

对称差：两个集合合并后**去掉重合的部分**，只保留恰属一方的元素。

```f
A⊕B = (A∪B)−(A∩B) = (A−B)∪(B−A)
```

例：A={1,2,3}，B={2,3,4}：A⊕B={1,4}。

#### 5.2 真题

**【2026.04·错题本·解答】** S={n∣0<n<11，n 为整数}，A={x∣x+2 是质数，x∈S}，B={x∣2x−1 是质数，x∈S}，求 A、B 和 A⊕B。
**答案：** A={1,3,5,9}，B={2,3,4,6,7,9,10}，A⊕B={1,2,4,5,6,7,10}
解析：①**1 不是质数**，所以 2×1−1=1 不算，1∉B；②**9=3² 不是质数**——x=7 时 x+2=9、x=5 时 2x−1=9 都要排除；③先算 A∩B={3,9}，A⊕B=A∪B−A∩B。

**来源**：错题本 2026.04·考点5；旧版思维导图·第四章考点5

### 考点6：笛卡尔积

meta: level=A

#### 6.1 是什么

有序对（序偶）(a,b)：两个元素组成的一对，**前后顺序有区别**。
笛卡尔积 A×B：从 A 取第一个元素、从 B 取第二个元素，组成所有可能的有序对。

#### 6.2 必背公式

```f
|A×B| = |A|·|B|
A² = A×A
```

例：A={1,2}，B={3,4}：A×B={(1,3),(1,4),(2,3),(2,4)}，共 4 个。
综合：|A|=2，|B|=3 → |P(B)|=2³=8，|A×P(B)|=2×8=16。

**来源**：旧版思维导图·第四章考点6

### 考点7：笛卡尔积的性质

meta: level=B

#### 7.1 分配律

笛卡尔积对并、交、差都满足分配律：

```f
A×(B∪C)=(A×B)∪(A×C)
A×(B∩C)=(A×B)∩(A×C)
A×(B−C)=(A×B)−(A×C)
```

#### 7.2 易错

```err
A×B ≠ B×A——顺序不可交换（A={1}，B={2} 时 (1,2)≠(2,1)）；仅当 A=B 或其中之一为空集时才相等。
```

**来源**：旧版思维导图·第四章考点7

### 考点8：容斥原理与幂集恒等式

meta: level=S; freq=2025.04

#### 8.1 容斥原理

用途：两堆东西有重叠时，"至少属于一堆"的个数要把重复数的减回去。会英语 18 人 + 会日语 10 人 − 都会 6 人 = 22 人。

```f
两集合：|A∪B| = |A|+|B|−|A∩B|
三集合：|A∪B∪C| = |A|+|B|+|C|−|A∩B|−|A∩C|−|B∩C|+|A∩B∩C|
```

口诀：**单个加、两两减、三个加回去**（奇加偶减）。

#### 8.2 幂集恒等式

```f
P(A)∩P(B) = P(A∩B)
P(A)∪P(B) ⊆ P(A∪B)（一般取不到等号）
```

反例：A={1}，B={2} 时 {1,2}∈P(A∪B)，但 {1,2}∉P(A)∪P(B)——**别把 ⊆ 写成 =**。

#### 8.3 真题

**【2025.04·错题本·证明】** 设 A,B,C 是集合，证明：|A∪B∪C|=|A|+|B|+|C|−|A∩B|−|A∩C|−|B∩C|+|A∩B∩C|
**证明骨架：** 记 D=A∪B。
① 对 D 和 C 用两集合容斥：|A∪B∪C|=|D|+|C|−|D∩C|=(|A|+|B|−|A∩B|)+|C|−|D∩C|
② 分配律 (A∪B)∩C=(A∩C)∪(B∩C)，对这两个集合再用一次两集合容斥：|D∩C|=|A∩C|+|B∩C|−|A∩B∩C|
③ 代入整理即得原式。最后 **+|A∩B∩C|** 的来源正是"两个交集再相交被减了两次、要加回一次"。

```tip
【记忆】容斥证明 = 两集合公式用两次 + 分配律；答题时每步标明用了哪条。
```

**来源**：错题本 2025.04·考点8；旧版思维导图·第四章考点8

### 考点9：全章速记图（图形版）

#### 考点9.1 一图总览

旧版思维导图的图形版速记图，与章首树状速记图同源——考前过一遍图即可唤起全章框架。

```d
<svg role="img" aria-label="第四章知识速记图：集合基本概念、四种运算与对称差、笛卡尔积及其分配性质、容斥原理与幂集恒等式" viewBox="0 0 780 430" style="display:block;max-width:780px;width:100%;margin:8px 0"><rect x="5.0" y="32.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="56.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">集合：元素 a∈A</text><text x="130" y="73.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">基数 |A|；空集 ∅</text><rect x="265.0" y="32.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="56.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">子集 A⊆B；真子集 A⊊B</text><text x="390" y="73.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">真子集＝去掉 A 自己</text><rect x="525.0" y="32.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="56.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">幂集 P(A)＝所有子集</text><text x="650" y="73.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">|P(A)|＝2^|A|；∅、A 都在</text><line x1="30" y1="110" x2="215" y2="110" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="110" x2="750" y2="110" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="114" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 四种运算 ——</text><rect x="6.0" y="140.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="99" y="164.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">交 A∩B</text><text x="99" y="181.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">共同元素</text><rect x="200.0" y="140.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="293" y="164.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">并 A∪B</text><text x="293" y="181.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">合并、重复只算一次</text><rect x="394.0" y="140.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="487" y="164.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">差 A−B</text><text x="487" y="181.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">有 A 无 B</text><rect x="588.0" y="140.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="681" y="164.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">对称差 A⊕B</text><text x="681" y="181.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">＝(A∪B)−(A∩B)</text><line x1="30" y1="218" x2="215" y2="218" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="218" x2="750" y2="218" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="222" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 笛卡尔积 ——</text><rect x="20.0" y="239.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="263.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">A×B：所有可能的有序对</text><text x="195" y="280.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">(a,b) 顺序不可换，(a,b)≠(b,a)</text><text x="195" y="297.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">|A×B|＝|A|·|B|；A²＝A×A</text><rect x="405.0" y="239.0" width="360" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="255.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">积对 ∪/∩/− 的分配</text><text x="585" y="272.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">A×(B∪C)＝(A×B)∪(A×C)</text><text x="585" y="289.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">A×(B∩C)＝(A×B)∩(A×C)</text><text x="585" y="306.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">A×(B−C)＝(A×B)−(A×C)</text><line x1="30" y1="334" x2="215" y2="334" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="334" x2="750" y2="334" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="338" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 容斥 · 幂集恒等式 ——</text><rect x="30.0" y="364.0" width="720" height="56" rx="7" fill="var(--formula-bg)" stroke="var(--accent)" stroke-width="1.8"/><text x="390" y="388.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">|A∪B|＝|A|+|B|−|A∩B|　三集合：单个加、两两减、三个交集加回</text><text x="390" y="405.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--formula-text)">P(A)∩P(B)＝P(A∩B)　　P(A)∪P(B) ⊆ P(A∪B)（一般取不到等号）</text></svg>
```

**来源**：旧版思维导图·第四章知识速记图

## 第五章 关系

关系章是全课程篇幅最大的一章（25 个考点），三块内容：**关系性质**（自反/对称/传递等五性的判定与运算保持性）、**等价关系与划分**（等价类、由划分求关系、计数）、**偏序与函数**（哈斯图、极大最大元、单射满射双射与计数）。错题记录覆盖 2025.04–2026.04 三套卷共 5 题，集中在 dom/ran、逆关系、偏序性质、划分构造等价关系、等价关系计数。

本章速记图（先看图建立全章框架，再逐个展开考点）：

```tree
第五章 关系（考点 1—25）
  核心：性质判定、等价关系与划分、偏序与哈斯图、函数
  1. 关系的基本概念【A】
    关系 R 是 A×B 的子集
    dom(R) 取第一分量，ran(R) 取第二分量（去重）
    易错：ran 和 dom 写反
  2. 关系的表示【B】
    有序对集合 / 关系矩阵 / 关系图
    矩阵 (i,j)=1 表示 aiRbj
  3. 自反和反自反【A】
    自反：对角线全 1（(a,a) 全在）
    反自反：对角线全 0
    二者可以都不满足
  4. 对称和反对称【A】
    对称：1 关于对角线对称出现
    反对称：(a,b)、(b,a) 同在则必有 a=b
    二者可同时满足也可同时不满足
  5. 传递【A】
    aRb 且 bRc ⇒ aRc
    找能连接的有序对，看结果是否仍在关系中
  6. 逆关系【A】
    R⁻¹：全部调头
    ran(R⁻¹)=dom(R)，dom(R⁻¹)=ran(R)
  7. 复合关系【B】
    R∘S：尾接头（前关系的尾找后关系的头）
    R∘S ≠ S∘R
  8. 关系运算后的性质【B】
    逆、交：五条性质全保持
    复合：只有自反必保持
    差：丢自反、可破坏传递
  9. 闭包【A】
    r(R) 补自环；s(R) 补反向；t(R) 补可达
    r(R)=R∪I_A；s(R)=R∪R⁻¹
  10. 等价关系【S】
    自反＋对称＋传递
    偏序＝自反＋反对称＋传递；拟序＝反自反＋传递
    易错：偏序不满足的是对称，不是反对称
  11. 等价类【B】
    [a]_R：与 a 等价的全体元素
    同一类元素的等价类相同
  12. 划分【S】
    由划分求 R：自环全带上、块内配成对、块间不往来
  13. 等价关系的个数【A】
    = 划分个数
    2 元集恒 2 个；3 元集 5 个；4 元集 15 个
  14. 等价关系的运算【B】
    ∩、逆仍是等价；∪、复合不一定；差不是
  15. 等价关系的证明【S】
    三步框架：自反 → 对称 → 传递，分步写
  16. 哈斯图【A】
    排座次：分上下不分左右
    传递隐含不画线；小元在下
  17. 极大元极小元【A】
    极大：每条链的顶（可多个）；极小：链底
  18. 最大元最小元【A】
    最大：与全体可比且最大，唯一
    存在不可比元素 ≠ 无最大元
  19. 函数【A】
    定义域每个 x 有像，且像唯一
  20. 反函数【B】
    先验证双射，再调换有序对
  21. 单射【A】
    不许多对一
  22. 满射【A】
    值域取满陪域
  23. 双射【A】
    单射＋满射
    有限集 |A|=|B| 时单射 ⇔ 满射 ⇔ 双射
  24. 复合函数【B】
    g∘f：先 f 后 g
  25. 函数个数的计数【S】
    函数 n^m；单射 n!/(n−m)!
    满射用容斥；双射 m!
```

```tip
【做题】判定性质先画关系矩阵（对角线看自反、对称位置看对称、连串看传递）；等价大题按"自反→对称→传递"三步写；计数题先分清问的是函数/单射/满射/双射。
```

### 考点1：关系的基本概念

meta: level=A; freq=2025.10

#### 1.1 是什么

二元关系：两个元素之间的联系，用有序对表示。
关系与笛卡尔积：A×B 是"所有元素之间都有关系"，**关系 R 是 A×B 的子集**——从 A×B 里取一部分。
空关系：R=∅ 也是 A×B 的子集（"没关系"也是一种关系）。

#### 1.2 基本术语

| 术语 | 定义 |
|---|---|
| 全域关系 E_A | A 中所有元素互相都有关系，E_A=A×A |
| 定义域 dom(R) | 所有有序对**第一分量**构成的集合 |
| 值域 ran(R) | 所有有序对**第二分量**构成的集合 |

#### 1.3 真题

**【2025.10·错题本·填空】** R={<1,a>, <2,b>, <3,c>, <4,a>, <4,b>}，则 ranR=＿＿
**答案：** {a,b,c}
解析：逐个取第二分量 a,b,c,a,b，**集合自动去重**后得 {a,b,c}；对照 domR={1,2,3,4}。同一个 y 可对应多个 x，值域只记一次。

```err
口诀：第一分量是 dom，第二分量是 ran；列完记得去重。
```

**来源**：错题本 2025.10·考点1；旧版思维导图·第五章考点1

### 考点2：关系的表示

meta: level=B

#### 2.1 三种表示

- 有序对集合：直接列出
- 关系矩阵（布尔矩阵）：(i,j) 位置为 1 表示 aᵢRbⱼ
- 关系图：有关系就画箭头，(a,a) 画自环

例：A={1,2,3}，R={(1,1),(2,3),(3,1)}——矩阵第 1 行 100、第 2 行 001、第 3 行 100；图上 1 有自环，2→3，3→1。

**来源**：旧版思维导图·第五章考点2

### 考点3：自反和反自反

meta: level=A

#### 3.1 定义

自反：A 中**每个**元素都和自己有关系——(a,a) 全在，矩阵对角线全 1。
反自反：A 中**每个**元素都和自己没关系——(a,a) 全不在，对角线全 0。

#### 3.2 核心结论

```err
自反和反自反不是非此即彼！R={(1,1),(1,2)}（A={1,2,3}）既不是自反（缺 (2,2),(3,3)）也不是反自反（含 (1,1)）。
```

**来源**：旧版思维导图·第五章考点3

### 考点4：对称和反对称

meta: level=A

#### 4.1 定义

对称：a 与 b 有关系则 b 与 a 也有关系——矩阵中 1 关于对角线**对称出现**。
反对称：两个**不同**元素间，(a,b) 与 (b,a) 不能同时出现（除非 a=b）——1 不对称出现。

#### 4.2 核心结论

```err
对称和反对称可以同时满足（如恒等关系：只有自环），也可以同时不满足（如 R={(1,2),(2,1),(1,3)}）——二者不互斥。
```

**来源**：旧版思维导图·第五章考点4

### 考点5：传递

meta: level=A

#### 5.1 定义与判定

传递性：aRb 且 bRc ⇒ aRc。
判定：在关系中找能"首尾相连"的有序对，看连接结果是否仍在关系中；全部都在才传递。

#### 5.2 示例

R={(A,B),(A,D),(B,C),(C,D)}：(A,B) 配 (B,C) 应得 (A,C)，但 (A,C)∉R → **不是传递的**。

**来源**：旧版思维导图·第五章考点5

### 考点6：逆关系

meta: level=A; freq=2025.04

#### 6.1 是什么

逆关系 R⁻¹：把 R 中每个有序对**前后调换**。
R={(1,2),(3,4)} → R⁻¹={(2,1),(4,3)}。

#### 6.2 必背四联式

```f
dom(R⁻¹) = ran(R)     ran(R⁻¹) = dom(R)
```

#### 6.3 真题

**【2025.04·错题本·填空】** X={a,b,c,d}，Y={1,2,3}，R={<a,2>,<b,3>,<c,1>}，则 ranR⁻¹=＿＿
**答案：** {a,b,c}
解析：R⁻¹={<2,a>,<3,b>,<1,c>}，取第二分量得 {a,b,c}。四联换位：ran(R⁻¹)=dom(R)={a,b,c}，dom(R⁻¹)=ran(R)={1,2,3}。

```err
ran(R)={1,2,3} 与 dom(R⁻¹)={1,2,3} 恰好相同——一慌就写反。先默写四联式再动笔。
```

**来源**：错题本 2025.04·考点6；旧版思维导图·第五章考点6

### 考点7：复合关系

meta: level=B

#### 7.1 定义

复合 R∘S：把 R 的有序对与 S 的有序对**尾接头**连接——前一个的第二分量 = 后一个的第一分量。
R={(1,1),(1,2)}，S={(2,3)} → R∘S={(1,3)}。

#### 7.2 注意

- **R∘S ≠ S∘R**——顺序不同结果不同
- R² = R∘R（与自身复合）

**来源**：旧版思维导图·第五章考点7

### 考点8：关系运算后的性质

meta: level=B

#### 8.1 保持性总表

设 R、S 都具有某性质，运算后仍保持的情况：

| 性质 | 逆 R⁻¹ | 交 R∩S | 并 R∪S | 复合 R∘S | 差 R−S |
|---|---|---|---|---|---|
| 自反 | ✓ | ✓ | ✓ | ✓ | ✗ |
| 反自反 | ✓ | ✓ | ✓ | 不一定 | ✓ |
| 对称 | ✓ | ✓ | ✓ | 不一定 | ✓ |
| 反对称 | ✓ | ✓ | 不一定 | 不一定 | ✓ |
| 传递 | ✓ | ✓ | 不一定 | 不一定 | ✗ |

#### 8.2 记忆要点

- **逆关系**：所有性质都保持
- **交运算**：五条全保持（子集遗传）
- **复合**：只有自反必保持
- **差**：R−S 是 R 的子集，但丢自反（对角线全落在 S 里）、可破坏传递——反例：R={(1,2),(2,3),(1,3)}、S={(1,3)} 都传递，R−S={(1,2),(2,3)} 不传递

**来源**：旧版思维导图·第五章考点8

### 考点9：闭包

meta: level=A

#### 9.1 是什么

闭包：给不满足某性质的关系**补充最少的有序对**，使其满足该性质。

| 闭包 | 符号 | 补什么 | 公式 |
|---|---|---|---|
| 自反闭包 | r(R) | 补所有 (a,a) | r(R)=R∪I_A |
| 对称闭包 | s(R) | 每个 (a,b) 配上 (b,a) | s(R)=R∪R⁻¹ |
| 传递闭包 | t(R) | 补所有能连接出的新有序对 | 逐步连接直到不能再加 |

#### 9.2 传递闭包怎么求

找出所有可连接的有序对 → 新对加入 → 检查新对又能产生什么 → 直到不能再产生为止（Warshall 思想的手工版）。

**来源**：旧版思维导图·第五章考点9

### 考点10：等价关系

meta: level=S; freq=2026.04

#### 10.1 定义与分类表

等价关系：同时满足**自反、对称、传递**的关系。
四种重要关系一张表：

| 关系 | 自反 | 对称 | 传递 | 反对称 |
|---|---|---|---|---|
| 等价关系 | ✓ | ✓ | ✓ | 不要求 |
| 相容关系 | ✓ | ✓ | ✗ | 不要求 |
| 偏序关系 | ✓ | ✗ | ✓ | ✓ |
| 拟序关系 | ✗ | ✗ | ✓ | ✓ |

记忆：等价=**分组**（对称），偏序=**排序**（反对称）；反自反+传递 ⇒ 必反对称（若 (a,b)、(b,a) 同在，传递得 (a,a)，与反自反矛盾）。

#### 10.2 真题

**【2026.04·错题本·单选】** 若 R 是定义在集合 A 上的一个偏序关系，则 R 不满足（A. 对称性　B. 传递性　C. 自反性　D. 反对称性）
**答案：A**
解析：偏序 = 自反 + 反对称 + 传递，唯独不满足对称性。按分类表逐项对号，10 秒出答案。

**来源**：错题本 2026.04·考点10；旧版思维导图·第五章考点10

### 考点11：等价类

meta: level=B

#### 11.1 是什么

等价类 [a]_R：与 a 有等价关系的**所有元素**构成的集合。
例：A={1,2,3}，R={(1,1),(1,2),(2,1),(2,2),(3,3)}：[1]_R={1,2}，[2]_R={1,2}，[3]_R={3}。

```tip
【记忆】同一等价类中的元素，等价类相同——[1]=[2] 不是巧合，是等价类的本质。
```

**来源**：旧版思维导图·第五章考点11

### 考点12：划分

meta: level=S; freq=2025.04

#### 12.1 是什么

划分：把集合 A 拆成若干**互不相交**的子集（分块），并集恰为 A。
核心结论：**划分与等价关系一一对应**——每个划分确定一个等价关系，每个等价关系的等价类集就是一个划分。

#### 12.2 由划分还原等价关系

方法：每个分块内的元素**两两配对**（块内是全域关系）。
例：划分 {{1,2},{3}} → R={(1,1),(1,2),(2,1),(2,2),(3,3)}。

#### 12.3 真题

**【2025.04·错题本·解答】** A={a,b,c,d} 的划分 S={{a,b},{c,d}}，求由 S 确定的等价关系 R。
**答案：** R={(a,a),(b,b),(c,c),(d,d),(a,b),(b,a),(c,d),(d,c)}，共 8 个序偶。

```tip
【记忆】自环全带上、块内配成对、块间不往来——漏自环、漏对称的另一半是主要丢分点。
```

**来源**：错题本 2025.04·考点12；旧版思维导图·第五章考点12

### 考点13：等价关系的个数

meta: level=A; freq=2025.10

#### 13.1 求解方法

等价关系个数 = **划分个数**——把 n 个元素分组，数有多少种分组方式。

#### 13.2 常用结果

| 集合 | 划分 | 等价关系个数 |
|---|---|---|
| 2 元集 | {{1},{2}}、{{1,2}} | 恒为 **2** |
| 3 元集 | 1+3+1 | **5** |
| 4 元集 | 按分块数 1+6+3+4+1 | **15** |

#### 13.3 真题

**【2025.10·错题本·单选】** 设 A={1,2}，则 A 上的等价关系个数是（A. 1　B. 2　C. 3　D. 4）
**答案：B**
解析：等价关系与划分一一对应。{{1},{2}} ↔ 恒等关系 I_A；{{1,2}} ↔ 全域关系 E_A。两个元素的集合等价关系恒为 2 个，可当结论记住。

```err
别枚举普通关系再凭感觉筛——直接数划分；也别只想到恒等关系答 1。
```

**来源**：错题本 2025.10·考点13；旧版思维导图·第五章考点13

### 考点14：等价关系的运算

meta: level=B

#### 14.1 结论表

设 R、S 都是等价关系：

| 运算 | 结果是否等价 |
|---|---|
| R∩S | 是 |
| R⁻¹ | 是 |
| R∪S | 不一定 |
| R∘S | 不一定 |
| R−S | 不是 |

```err
差一定不是等价关系：R、S 都自反 ⇒ 对角线全在 R∩S 里，R−S 一个 (a,a) 都没有，必失自反。
```

**来源**：旧版思维导图·第五章考点14

### 考点15：等价关系的证明

meta: level=S

#### 15.1 三步框架

- 自反性：验证每个元素与自身有关系
- 对称性：验证 aRb ⇒ bRa
- 传递性：验证 aRb 且 bRc ⇒ aRc

#### 15.2 示例

"两个 8 位二进制数中 0 的个数相同则相关"：自反——自己与自己 0 的个数相同；对称——个数相同显然互相成立；传递——与 s₂ 的 0 个数都等于 s₂ 的个数即相同。故是等价关系。

```tip
【做题】证明按"自反→对称→传递"分步写全框架——即使某步卡住，写全框架也有过程分。
```

**来源**：旧版思维导图·第五章考点15

### 考点16：哈斯图

meta: level=A

#### 16.1 是什么

哈斯图：偏序关系的**简化关系图**——本质是"排座次"：分上下、不分左右，"能力强"（大）的在上。

#### 16.2 绘制规则

- 小元素在下、大元素在上（整除关系中 1 最"弱"垫底）
- **传递隐含不画线**：只画覆盖关系（相邻层），跨层可达的不连
- 同层元素左右位置随意

例：A={1,2,3,6} 整除关系——1 在最底，2、3 在中层（左右可换），6 在顶。

**来源**：旧版思维导图·第五章考点16

### 考点17：极大元极小元

meta: level=A

#### 17.1 定义

可比：哈斯图中在同一条链上（上下可达）。
极大元：**上方再没有**与它可比的元素——每条极大链的顶端，**可以有多个**。
极小元：下方再没有可比元素——每条链的底端，也可多个。

**来源**：旧版思维导图·第五章考点17

### 考点18：最大元最小元

meta: level=A

#### 18.1 定义与区别

| 概念 | 定义 | 个数 |
|---|---|---|
| 极大元 | 上方没有更"大"的可比元素 | 可多个 |
| 最大元 | 与**所有**元素可比且最大 | 至多 1 个 |
| 极小元 | 下方没有更"小"的可比元素 | 可多个 |
| 最小元 | 与所有元素可比且最小 | 至多 1 个 |

```err
存在不可比元素 ≠ 没有最大元——菱形哈斯图中 2、3 不可比，但顶元与所有元素可比，仍是最大元；最大元一定也是极大元，反之不然。
```

**来源**：旧版思维导图·第五章考点18

### 考点19：函数

meta: level=A

#### 19.1 定义

函数（从 A 到 B）：满足两个条件的有序对集合——
① 定义域内**每个 x 都有像**；② **每个 x 只能对应一个 y**（不能一对多）。

#### 19.2 快速判定（论域：全体实数）

- y²=x：x=1 时 y=±1，一对多 → 不是函数
- y=−x²：每个 x 唯一像 → 是函数
- y/x=1：x=0 无定义 → 不是函数
- xy=0：x=0 时 y 任意，一对多 → 不是函数

**来源**：旧版思维导图·第五章考点19

### 考点20：反函数

meta: level=B

#### 20.1 是什么

反函数 f⁻¹：把 f 的有序对**前后调换**。
前提：**仅当 f 是双射**时 f⁻¹ 才是函数——每个 y 恰被一个 x 取到；否则调换结果只是逆关系，不是反函数。

```tip
【做题】见到"求反函数"第一步先验证双射，再动笔调换。
```

**来源**：旧版思维导图·第五章考点20

### 考点21：单射

meta: level=A

#### 21.1 是什么

单射：每个 x 取到**不重复**的 y——不允许多对一。
f={(1,1),(2,2),(3,3)} 是单射；f={(1,1),(2,1)} 不是（1、2 都对应 1）。

**来源**：旧版思维导图·第五章考点21

### 考点22：满射

meta: level=A

#### 22.1 是什么

满射：**值域取满陪域**——陪域中每个 y 都有 x 对应。
f={(1,1),(2,2)}，陪域={1,2,3}：值域 {1,2}≠陪域，3 没取到 → 不是满射。

```err
满射看的是"值域=陪域"，别和单射的"像不重复"混在一起。
```

**来源**：旧版思维导图·第五章考点22

### 考点23：双射

meta: level=A

#### 23.1 是什么

双射：**同时满足单射和满射**——x 与 y 一一对应。
反例：f={(1,6),(2,7),(3,5),(4,6)}，1 和 4 都对应 6 → 不是单射，故非双射；实数上 f(x)=x²，±1 都得 1 → 非双射。

#### 23.2 有限集的重要结论

有限集合、|定义域|=|陪域|=m 时：**单射 ⇔ 满射 ⇔ 双射**（一一对应）。

**来源**：旧版思维导图·第五章考点23；旧版"规则补充"·单射数量

### 考点24：复合函数

meta: level=B

#### 24.1 是什么

复合函数 g∘f：**先算 f，再把 f(x) 整体代入 g**——先 f 后 g，方向与关系复合一致。
例：f(x)=x²−1，g(x)=x+1：(g∘f)(x)=g(f(x))=(x²−1)+1=x²。

**来源**：旧版思维导图·第五章考点24

### 考点25：函数个数的计数

meta: level=S

#### 25.1 公式表（必记）

记 |A|=m（定义域）、|B|=n（陪域）：

| 类型 | 存在条件 | 个数 |
|---|---|---|
| 所有函数 | 任意 | n^m |
| 单射 | m≤n | n!/(n−m)! |
| 满射 | m≥n | 容斥：Σ(−1)^k·C(n,k)·(n−k)^m |
| 双射 | m=n | m! |

#### 25.2 常用结论

- m>n 时单射不存在（鸽笼原理）；m<n 时满射不存在
- **m=n 时：单射=满射=双射=m!**
- 满射速算例：|A|=3、|B|=2 时 2³−2=6（全部 8 个函数去掉 2 个常函数）；|A|=4、|B|=2 时 2⁴−2=14

**来源**：旧版思维导图·第五章考点25

### 考点26：全章速记图（图形版）

#### 考点26.1 一图总览

旧版思维导图的图形版速记图，与章首树状速记图同源——考前过一遍图即可唤起全章框架。

```d
<svg role="img" aria-label="第五章知识速记图：二元关系表示、四大性质、关系运算与闭包、等价关系与偏序关系、函数单射满射双射与计数" viewBox="0 0 780 590" style="display:block;max-width:780px;width:100%;margin:8px 0"><rect x="210.0" y="9.0" width="360" height="30" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="2"/><text x="390" y="28.5" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--heading)">二元关系 R ⊆ A×B（有序对集合）</text><rect x="10.0" y="63.0" width="240" height="30" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="82.5" text-anchor="middle" font-size="12" font-weight="normal" fill="var(--text)">序偶集合</text><rect x="270.0" y="63.0" width="240" height="30" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="82.5" text-anchor="middle" font-size="12" font-weight="normal" fill="var(--text)">关系矩阵（点 × 点）</text><rect x="530.0" y="63.0" width="240" height="30" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="82.5" text-anchor="middle" font-size="12" font-weight="normal" fill="var(--text)">关系图</text><line x1="30" y1="114" x2="215" y2="114" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="114" x2="750" y2="114" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="118" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 四大性质（矩阵最直白） ——</text><rect x="6.0" y="144.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="99" y="168.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">自反</text><text x="99" y="185.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">对角线全 1，(a,a) 全有</text><rect x="200.0" y="144.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="293" y="168.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">反自反</text><text x="293" y="185.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">对角线全 0</text><rect x="394.0" y="144.0" width="186" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="487" y="168.5" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">对称 / 反对称</text><text x="487" y="185.5" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">对称：矩阵关于对角线对称</text><text x="487" y="202.5" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">反对称：a≠b 不能双向</text><rect x="588.0" y="144.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="681" y="168.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">传递</text><text x="681" y="185.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">aRb、bRc ⇒ aRc</text><line x1="30" y1="240" x2="215" y2="240" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="240" x2="750" y2="240" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="244" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 关系运算 ——</text><rect x="6.0" y="270.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="99" y="294.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">逆 R⁻¹</text><text x="99" y="311.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">全部序对调头</text><rect x="200.0" y="270.0" width="186" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="293" y="294.5" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">复合 R∘S：尾接头</text><text x="293" y="311.5" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">前二元素＝后一元素</text><text x="293" y="328.5" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">R∘S ≠ S∘R</text><rect x="394.0" y="270.0" width="186" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="487" y="294.0" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">∪、∩、−</text><text x="487" y="311.0" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">逐对做运算</text><rect x="588.0" y="270.0" width="186" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="681" y="294.5" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--heading)">闭包 r / s / t</text><text x="681" y="311.5" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">r 补自环；s 补反向</text><text x="681" y="328.5" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--text)">t 补可达</text><line x1="30" y1="366" x2="215" y2="366" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="366" x2="750" y2="366" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="370" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 两大特殊关系 ——</text><rect x="20.0" y="387.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="411.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">等价关系：自反＋对称＋传递</text><text x="195" y="428.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">核心＝分组：等价类 [a]R → 划分</text><text x="195" y="445.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">个数＝划分个数：n=2→2，n=3→5，n=4→15</text><rect x="405.0" y="387.0" width="360" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="411.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">偏序关系：自反＋反对称＋传递</text><text x="585" y="428.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">核心＝排序：哈斯图（去自环、去传递边）</text><text x="585" y="445.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">极大＝上头再没有；最大＝比所有元素都大（唯一）</text><line x1="30" y1="482" x2="215" y2="482" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="482" x2="750" y2="482" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="486" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 函数 f：A→B ——</text><rect x="20.0" y="503.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="519.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">每个 x 恰好一个 y</text><text x="195" y="536.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">单射：不同 x 不同 y（不多对一）</text><text x="195" y="553.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">满射：陪域全被取到（不漏）</text><text x="195" y="570.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">双射＝单射＋满射 ⇒ 才有 f⁻¹</text><rect x="405.0" y="503.0" width="360" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="519.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">复合 g∘f：先 f 后 g</text><text x="585" y="536.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">计数（|A|=m、|B|=n）：所有 n^m</text><text x="585" y="553.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">单射 n!/(n−m)!（m≤n）；满射用容斥</text><text x="585" y="570.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">双射 m!（m＝n）；|A|=|B| 时单⇔满⇔双</text></svg>
```

**来源**：旧版思维导图·第五章知识速记图

## 第六章 代数系统与群

代数系统章的主线是一条**条件升级链**：封闭+结合=半群，再加含幺=独异点，再加可逆=群，再加交换=阿贝尔群。考题两大类：**判定**（给运算判封闭、找幺元零元、判是不是群）和**计算**（求逆元、求元素的阶、解群方程）。错题记录 2025.04–2026.04 三套卷共 4 题：零元左右辨析、逆元、阶数公式、幂等元各一。

本章速记图（先看图建立全章框架，再逐个展开考点）：

```tree
第六章 代数系统与群（考点 1—13）
  核心：封闭与运算性质、幺元零元逆元、半群→独异点→群、阶数
  1. 二元运算的基本概念【A】
    封闭：运算结果仍在集合内
    代数系统 <A,∘>
    判封闭逐个代特值
  2. 二元运算的性质【A】
    结合、交换、幂等、分配
    减法不满足结合律也不满足交换律
  3. 幺元（单位元）【S】
    a∘e = e∘a = a
    求法：设幺元 e，用 a∘e=a 解方程
    ∪ 的幺元 ∅；加法的幺元 0
  4. 零元【A】
    a∘θ = θ∘a = θ
    ∩ 的零元 ∅
    易错：左右零元要把元素放对应位置验证
  5. 逆元【S】
    a∘a⁻¹ = e
    固定步骤：先求幺元，再解 a∘x=e
  6. 半群【A】
    封闭＋可结合
  7. 独异点【A】
    半群＋含幺
  8. 群【S】
    封闭＋可结合＋含幺＋可逆
    判群：找出没有逆元的元素即可否决
  9. 群的阶数【S】
    |G|：群中元素个数
    n 阶循环群中 aᵏ 的阶 = n/gcd(n,k)
    非平凡群没有零元
  10. 交换群（阿贝尔群）【A】
    群＋交换律
    证明按封闭→结合→幺→逆→交换五步写全
  11. 环、域【B】
    环：<A,+> 交换群 + <A,*> 半群 + 分配律
    域 ⊂ 整环 ⊂ 环
  12. Klein 四元群【B】
    4 阶群中唯一非循环群
    非幺元自运算得 e；两个非幺元运算得第三个
  13. 幂等元与群方程【A】
    群中幂等元只有幺元 e
    a∘x=b ⇒ x=a⁻¹∘b；y∘a=b ⇒ y=b∘a⁻¹
```

```tip
【做题】求幺元零元逆元都是"设字母＋解方程"；判群四步走，卡在逆元就看有没有元素解不出逆；aᵏ 的阶直接套 n/gcd(n,k)，别把指数当阶。
```

### 考点1：二元运算的基本概念

meta: level=A

#### 1.1 是什么

二元运算：两个元素进行某种运算（泛指，具体是什么看定义），符号 ∘ 或 ∗。
代数系统：⟨A,∘⟩——集合 A 连同其上定义的运算；⟨A,+,∗⟩ 是定义了两个运算。
**封闭性**：两个元素运算完，结果仍在集合里。

#### 1.2 怎么判断封闭

逐个代特值找反例：找出一个"结果跑到集合外"的组合即不封闭。
例（正整数集上）：x∗y=|x−y| 不封闭（1∗1=0）；x∗y=x−y 不封闭；x∗y=x/y 不封闭（1∗2=1/2）；x∗y=x+2y **封闭**。

**来源**：旧版思维导图·第六章考点1

### 考点2：二元运算的性质

meta: level=A

#### 2.1 四大性质

| 性质 | 定义 | 反例 |
|---|---|---|
| 结合律 | a∗(b∗c)=(a∗b)∗c | 减法：(1−2)−3=−4 ≠ 1−(2−3)=2 |
| 交换律 | a∗b=b∗a | 减法：2−1≠1−2 |
| 幂等律 | a∗a=a | 加法（0 除外） |
| 分配律 | a∘(b∗c)=(a∘b)∗(a∘c) | —— |

消去律教材注明不要求。

#### 2.2 熟记一张表（实数集 ℝ 上）

| 性质 | ＋ | − | × |
|---|---|---|---|
| 可结合 | ✓ | ✗ | ✓ |
| 可交换 | ✓ | ✗ | ✓ |

min/max 运算既可结合又可交换；x∗y=x、x∗y=y 型"取一边"运算不可交换。

**来源**：旧版思维导图·第六章考点2

### 考点3：幺元（单位元）

meta: level=S

#### 3.1 定义

幺元（单位元）e：与**所有**元素运算后仍等于该元素本身。

```f
左幺元 el：el∘a = a
右幺元 er：a∘er = a
幺元 e：a∘e = e∘a = a（左右都行）
```

#### 3.2 怎么求

设幺元为 e，用 a∘e=a 解方程。
常用结果：∪ 的幺元是 ∅；∩ 的幺元是全集；加法的幺元是 0；乘法的幺元是 1。
例：ℝ 上 a∗b=a+b+ab——设 a∗e=a+e+ae=a，得 e(a+1)=0 对一切 a 成立，e=0。

**来源**：旧版思维导图·第六章考点3

### 考点4：零元

meta: level=A; freq=2025.10

#### 4.1 定义

零元 θ：与**所有**元素运算后仍等于零元本身。

```f
左零元 0l：0l∘a = 0l
右零元 0r：a∘0r = 0r
零元 θ：a∘θ = θ∘a = θ
```

常用结果：∩ 的零元是 ∅。

#### 4.2 真题

**【2025.10·错题本·单选】** A={a,b,c}，定义运算 x∗y=x，则 A 的右零元个数是（A. 0　B. 1　C. 2　D. 3）
**答案：A（0 个）**
解析：右零元 θ 要求 x∗θ=θ 对一切 x 成立；本题 x∗θ=x，要 x=θ 对所有 x 成立，3 个不同元素做不到。辨析：本题每个元素都是**左**零元（θ∗x=θ 恒成立）、也都是**右**单位元（x∗e=x 恒成立），但没有右零元。

```err
判断"右零元/右单位元"，就把候选元素放进运算的**右边**，看等式是否对一切 x 成立——本题"人人像零元"的错觉就是这么来的。
```

**来源**：错题本 2025.10·考点4；旧版思维导图·第六章考点4

### 考点5：逆元

meta: level=S; freq=2025.04

#### 5.1 定义与固定步骤

逆元：a∘a⁻¹ = e——元素与逆元运算后等于**幺元**。
固定步骤：**先求幺元 e，再解 a∘x=e**，最后确认解在集合内。

#### 5.2 真题

**【2025.04·错题本·填空】** A={1,2,3,4}，x⊗y 为 x 与 y 的积除以 5 的余数，则 4 的逆元是＿＿
**答案：** 4（自身）
解析：先求幺元——1⊗x=(1·x) mod 5=x，e=1；再解 4⊗y=1：4×4=16=3×5+1，余 1，故 4⁻¹=4。附：这是模 5 乘法，⟨A,⊗⟩ 构成群，2 与 3 互为逆元。

```err
不要跳过"先求幺元"直接找逆元——没有 e，"等于谁"都无从谈起。
```

#### 5.3 方程法通式

有理数集上 a∗b=a+b+ab：幺元 e=0（见考点3），逆元解 a⁻¹+a+a⁻¹a=0 得 **a⁻¹=−a/(a+1)**（a=−1 时无逆元）。
ℤ₇ 上 x∗y=(x+y) mod 7：e=0，逆元 x⁻¹=7−x。

**来源**：错题本 2025.04·考点5；旧版思维导图·第六章考点5

### 考点6：半群

meta: level=A

#### 6.1 定义

半群：**封闭 + 可结合**，两条。
判定示例：A={a,b,c}，x∗y=y——封闭（结果 y∈A）；结合律：(x∗y)∗z=z，x∗(y∗z)=z，成立 → 是半群。

**来源**：旧版思维导图·第六章考点6

### 考点7：独异点

meta: level=A

#### 7.1 定义

独异点（含幺半群）：**封闭 + 可结合 + 含幺**，三条。

**来源**：旧版思维导图·第六章考点7

### 考点8：群

meta: level=S

#### 8.1 定义与升级链

```f
半群   = 封闭 + 可结合
独异点 = 封闭 + 可结合 + 含幺
群     = 封闭 + 可结合 + 含幺 + 可逆
阿贝尔群 = 群 + 交换律
```

条件一条比一条严。

#### 8.2 怎么判群

四步走：封闭 → 结合律 → 找幺元 → 查每个元素是否有逆元。**只要找到一个元素没有逆元，就不是群**。

典型例：普通加法下——自然数集不是群（2 的逆元 −2 不在集内）；偶数集、有理数集、整数集都是群（e=0，逆元 −a）。

#### 8.3 经典例：a∗b=a+b+2ab（ℝ 上）

封闭 ✓；结合律成立（两边都展开为 a+b+c+2ab+2ac+2bc+4abc）；幺元 e=0；逆元 a⁻¹=−a/(2a+1)——**a=−1/2 时分母为 0，没有逆元 → 不是群**。
修正：取 S=ℝ∖{−1/2}，则 ∗ 在 S 上封闭且每个元素都有逆元 → ⟨S,∗⟩ 是群。

```tip
【记忆】"a∗b=a+b+kab"型：幺元恒为 0，逆元 −a/(ka+1)，分母为零的点就是"不是群"的把柄。
```

**来源**：旧版思维导图·第六章考点8

### 考点9：群的阶数

meta: level=S; freq=2026.04

#### 9.1 基本概念

群的阶 |G|：群中**元素的个数**。
平凡群：只有一个元素的群。
定理：非平凡群（≥2 个元素）**没有零元**；不含零元的群至少 2 阶。

#### 9.2 生成元幂的阶（必背公式）

n 阶循环群中，a 是生成元，则：

```f
元素 aᵏ 的阶 = n / gcd(n,k)
```

k 与 n 互素时 aᵏ 也是生成元；k=n 时阶为 1。

#### 9.3 真题

**【2026.04·错题本·单选】** ⟨G,∘⟩ 是 10 阶循环群，a 是生成元，则元素 a⁴ 的阶是（A. 2　B. 4　C. 5　D. 10）
**答案：C**
解析：套公式 10/gcd(10,4)=10/2=5。逐次验证：(a⁴)⁵=a²⁰=(a¹⁰)²=e，更低的幂都不到 e。

```err
两个高频错法：把指数 4 直接当阶选 B；或漏掉 gcd 用 10÷4 取整算成 2。
```

**来源**：错题本 2026.04·考点9；旧版思维导图·第六章考点9

### 考点10：交换群（阿贝尔群）

meta: level=A

#### 10.1 定义

交换群（Abel 群）＝群＋交换律，五条：封闭、可结合、含幺、可逆、可交换。

#### 10.2 证明章程式（ℤ 上 a∘b=a+b−3）

```f
① 封闭：a+b−3∈ℤ
② 结合：(a∘b)∘c=a+b+c−6 = a∘(b∘c)
③ 幺元：a+e−3=a → e=3
④ 逆元：a+a⁻¹−3=3 → a⁻¹=6−a
⑤ 交换：a+b−3=b+a−3
```

五步写全即为交换群证明满分结构——每步都是"设字母＋解方程＋代回验证"。

**来源**：旧版思维导图·第六章考点10

### 考点11：环、域

meta: level=B

#### 11.1 定义

环 ⟨A,+,∗⟩：有两个运算的代数系统，满足三条——
① ⟨A,+⟩ 是**交换群**；② ⟨A,∗⟩ 是**半群**；③ ∗ 对 + **可分配**。
包含关系：**域 ⊂ 整环 ⊂ 环**（逐级加限制）。

#### 11.2 判定例

A={3z∣z∈ℤ}（3 的倍数），运算为普通加法和乘法：⟨A,+⟩ 是交换群（e=0，逆元 −3z）；⟨A,∗⟩ 是半群；乘法对加法分配 → 构成**环**。

**来源**：旧版思维导图·第六章考点11

### 考点12：Klein 四元群

meta: level=B

#### 12.1 是什么

Klein 四元群：4 阶群中**唯一非循环**的群，记 G={e,a,b,c}。

```f
自运算得 e：a∗a=e，b∗b=e，c∗c=e（每个非幺元的阶都是 2）
两两运算得第三个：a∗b=c，b∗c=a，a∗c=b
可交换：a∗b=b∗a
```

```tip
【记忆】"4 阶非循环"六个字直接指向 Klein 四元群——判断题原话考。
```

**来源**：旧版思维导图·第六章考点12

### 考点13：幂等元与群方程

meta: level=A; freq=2025.10

#### 13.1 群中幂等元只有幺元

幂等元：满足 a∗a=a 的元素。
证明：a∗a=a=a∗e，由**消去律**得 a=e。

```err
半群、独异点里幂等元可以有很多（幂集上 ∪ 运算每个元素都幂等），唯独群里只有 e——别把别的结构的结论搬进群。
```

#### 13.2 群方程求解

```f
a∗x = b ⇒ x = a⁻¹∗b     两边左乘 a⁻¹
y∗a = b ⇒ y = b∗a⁻¹     两边右乘 a⁻¹
```

方程有唯一解（消去律保证）；a∗x∗b=c 型：左右各乘逆元，x=a⁻¹∗c∗b⁻¹。

#### 13.3 真题

**【2025.10·错题本·填空】** 群中的幂等元只能是＿＿
**答案：** 幺元 e（单位元）
解析：见 13.1 的消去律证明。

**来源**：错题本 2025.10·考点13；旧版思维导图·第六章考点13

### 考点14：全章速记图（图形版）

#### 考点14.1 一图总览

旧版思维导图的图形版速记图，与章首树状速记图同源——考前过一遍图即可唤起全章框架。

```d
<svg role="img" aria-label="第六章知识速记图：二元运算、运算性质与特殊元素、代数系统升级链、群的专题、常见结论与环整环域" viewBox="0 0 780 700" style="display:block;max-width:780px;width:100%;margin:8px 0"><rect x="270.0" y="10.0" width="240" height="32" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="2"/><text x="390" y="30.5" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--heading)">二元运算（先看封闭）</text><line x1="390" y1="42" x2="390" y2="62" style="stroke:var(--muted);stroke-width:1.5"/><line x1="190" y1="62" x2="590" y2="62" style="stroke:var(--muted);stroke-width:1.5"/><line x1="190" y1="62" x2="190" y2="69" style="stroke:var(--muted);stroke-width:1.5"/><line x1="590" y1="62" x2="590" y2="69" style="stroke:var(--muted);stroke-width:1.5"/><rect x="115.0" y="69.0" width="150" height="30" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="1.8"/><text x="190" y="88.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">运算性质</text><rect x="515.0" y="69.0" width="150" height="30" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="1.8"/><text x="590" y="88.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">特殊元素</text><line x1="190" y1="99" x2="190" y2="111" style="stroke:var(--muted);stroke-width:1.5"/><line x1="590" y1="99" x2="590" y2="111" style="stroke:var(--muted);stroke-width:1.5"/><rect x="60.0" y="113.0" width="260" height="20" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="190" y="127.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">结合律：(a∘b)∘c＝a∘(b∘c)</text><rect x="460.0" y="113.0" width="260" height="20" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="590" y="127.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">幺元 e：e∘a＝a∘e＝a</text><rect x="60.0" y="137.0" width="260" height="20" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="190" y="151.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">交换律：a∘b＝b∘a</text><rect x="460.0" y="137.0" width="260" height="20" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="590" y="151.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">零元 θ：a∘θ＝θ∘a＝θ</text><rect x="60.0" y="161.0" width="260" height="20" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="190" y="175.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">幂等律：a∘a＝a</text><rect x="460.0" y="161.0" width="260" height="20" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="590" y="175.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">逆元 a⁻¹：a∘a⁻¹＝e</text><text x="590" y="196" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--muted)">（求逆元前先求幺元）</text><line x1="30" y1="224" x2="215" y2="224" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="224" x2="750" y2="224" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="228" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 代数系统升级：后一个 ＝ 前一个 ＋ 新条件 ——</text><rect x="12.0" y="252.0" width="112" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="68.0" y="278.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">封闭的集合</text><rect x="168.0" y="252.0" width="112" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="224.0" y="278.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">半群</text><rect x="324.0" y="252.0" width="112" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="380.0" y="278.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">独异点</text><rect x="480.0" y="252.0" width="112" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="536.0" y="278.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">群</text><rect x="636.0" y="252.0" width="112" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="692.0" y="270.0" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">交换群</text><text x="692.0" y="287.0" text-anchor="middle" font-size="13" font-weight="normal" fill="var(--heading)">（阿贝尔群）</text><line x1="124" y1="274" x2="161" y2="274" style="stroke:var(--accent);stroke-width:2.2"/><polygon points="161,269.5 168,274 161,278.5" fill="var(--accent)"/><text x="146.0" y="244" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--accent)">＋结合律</text><line x1="280" y1="274" x2="317" y2="274" style="stroke:var(--accent);stroke-width:2.2"/><polygon points="317,269.5 324,274 317,278.5" fill="var(--accent)"/><text x="302.0" y="244" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--accent)">＋幺元</text><line x1="436" y1="274" x2="473" y2="274" style="stroke:var(--accent);stroke-width:2.2"/><polygon points="473,269.5 480,274 473,278.5" fill="var(--accent)"/><text x="458.0" y="244" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--accent)">＋逆元</text><line x1="592" y1="274" x2="629" y2="274" style="stroke:var(--accent);stroke-width:2.2"/><polygon points="629,269.5 636,274 629,278.5" fill="var(--accent)"/><text x="614.0" y="244" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--accent)">＋交换律</text><line x1="30" y1="312" x2="215" y2="312" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="312" x2="750" y2="312" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="316" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 群 · 高频专题 ——</text><line x1="536" y1="296" x2="536" y2="330" style="stroke:var(--muted);stroke-width:1.5"/><line x1="130" y1="330" x2="650" y2="330" style="stroke:var(--muted);stroke-width:1.5"/><polyline points="130,330 130,347" fill="none" style="stroke:var(--muted);stroke-width:1.5"/><polyline points="390,330 390,347" fill="none" style="stroke:var(--muted);stroke-width:1.5"/><polyline points="650,330 650,347" fill="none" style="stroke:var(--muted);stroke-width:1.5"/><rect x="60.0" y="347.0" width="140" height="30" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="1.8"/><text x="130" y="366.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">群的阶</text><line x1="130" y1="377" x2="130" y2="391" style="stroke:var(--muted);stroke-width:1.5"/><rect x="45.0" y="391.0" width="170" height="38" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="406.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">元素的阶</text><text x="130" y="423.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">最小 k＞0：aᵏ＝e</text><rect x="320.0" y="347.0" width="140" height="30" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="1.8"/><text x="390" y="366.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">循环群</text><line x1="390" y1="377" x2="390" y2="391" style="stroke:var(--muted);stroke-width:1.5"/><rect x="305.0" y="391.0" width="170" height="38" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="406.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">G＝⟨a⟩</text><text x="390" y="423.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">a 是生成元</text><line x1="130" y1="429" x2="130" y2="458" style="stroke:var(--muted);stroke-width:1.5"/><line x1="390" y1="429" x2="390" y2="458" style="stroke:var(--muted);stroke-width:1.5"/><rect x="15.0" y="460.0" width="490" height="44" rx="7" fill="var(--formula-bg)" stroke="var(--accent)" stroke-width="1.8"/><text x="260" y="478.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">|aᵏ| ＝ n/gcd(n,k)</text><text x="260" y="495.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--formula-text)">gcd(n,k)＝1 ⇒ aᵏ 也是生成元</text><rect x="555.0" y="347.0" width="190" height="30" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="1.8"/><text x="650" y="366.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">Klein 四元群</text><line x1="650" y1="377" x2="650" y2="410" style="stroke:var(--muted);stroke-width:1.5"/><rect x="545.0" y="410.0" width="210" height="64" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="429.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">|G|＝4，非循环</text><text x="650" y="446.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">a²＝b²＝c²＝e</text><text x="650" y="463.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">非单位元的阶均为 2</text><line x1="30" y1="522" x2="215" y2="522" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="522" x2="750" y2="522" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="526" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 群里常见结论 ——</text><rect x="45.0" y="544.0" width="290" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="190" y="562.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">幂等元</text><text x="190" y="579.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">a∘a＝a ⇒ a＝e</text><rect x="380.0" y="544.0" width="380" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="570" y="562.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">群方程</text><text x="570" y="579.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">ax＝b ⇒ x＝a⁻¹b；ya＝b ⇒ y＝ba⁻¹</text><line x1="30" y1="602" x2="215" y2="602" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="602" x2="750" y2="602" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="606" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 两种运算：环 · 整环 · 域 ——</text><rect x="20.0" y="617.0" width="170" height="26" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="105" y="634.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">加法 → 交换群</text><rect x="20.0" y="649.0" width="170" height="26" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="105" y="666.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">乘法 → 半群</text><polyline points="190,630 213,630 213,662 190,662" fill="none" style="stroke:var(--muted);stroke-width:1.5"/><line x1="213" y1="646" x2="237" y2="646" style="stroke:var(--muted);stroke-width:1.5"/><polygon points="237,641.5 244,646 237,650.5" fill="var(--muted)"/><rect x="246.0" y="633.0" width="92" height="26" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="1.6"/><text x="292" y="650.5" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--heading)">＋分配律</text><line x1="338" y1="646" x2="360" y2="646" style="stroke:var(--accent);stroke-width:2.2"/><polygon points="360,641.5 367,646 360,650.5" fill="var(--accent)"/><rect x="368.0" y="631.0" width="64" height="30" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="400" y="650.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">环</text><line x1="432" y1="646" x2="476" y2="646" style="stroke:var(--accent);stroke-width:2.2"/><polygon points="476,641.5 483,646 476,650.5" fill="var(--accent)"/><text x="457.5" y="626" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--accent)">＋无零因子</text><rect x="485.0" y="631.0" width="90" height="30" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="530" y="650.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">整环</text><line x1="575" y1="646" x2="621" y2="646" style="stroke:var(--accent);stroke-width:2.2"/><polygon points="621,641.5 628,646 621,650.5" fill="var(--accent)"/><text x="601.5" y="626" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--accent)">＋非零元可逆</text><rect x="632.0" y="631.0" width="72" height="30" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="668" y="650.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">域</text><text x="390" y="686" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--muted)">环 → ＋无零因子（且交换、有幺元）→ 整环 → ＋非零元都可逆 → 域</text></svg>
```

**来源**：旧版思维导图·第六章知识速记图

## 第七章 格与布尔代数

格与布尔代数章题型非常固定：**判格**（哈斯图汇合点）、**判分配格**（找 M₃/N₅）、**求补元**（两条件）、**布尔代数化简**（分配律+补元律）和 **cov A**（覆盖关系）。错题记录 2025.04、2025.10 各有布尔代数化简题（一对对偶公式），2025.10 还有一道分配格证明题——共同错因都是"形式不匹配硬套吸收律"和"想直接消元"。

本章速记图（先看图建立全章框架，再逐个展开考点）：

```tree
第七章 格与布尔代数（考点 1—7）
  核心：格的判定、分配格、补元、布尔代数化简
  1. 格的基本概念【S】
    偏序集：任两点向上/向下有且只有一个汇合点
    吸收律（任意格成立）：a∨(a∧b)=a，a∧(a∨b)=a
  2. 对偶公式【A】
    ∨↔∧，≤↔≥，式中有 0、1 也要互换
  3. 分配格【S】
    两个分配等式都要成立
    含钻石格 M₃ 或五角格 N₅ 子图 ⇒ 不是分配格
    易错：格中没有消去律，不能"消去 c"
  4. 补元【A】
    a∧b=0 且 a∨b=1，缺一不可
    最上元与最下元互为补元
  5. 有界格【B】
    有最大元 1 与最小元 0
    至少有两个元素有补元（0 和 1）
  6. 布尔代数【S】
    有界＋分配＋有补（此时补元唯一）
    化简：形式不匹配先用分配律+补元律凑 0/1
    易错：硬套吸收律丢项
  7. 有补格与覆盖关系【A】
    有补格：每个元素都至少有一个补元
    M₃、N₅：有补但不分配
    cov A：哈斯图每条相邻边一个有序对，跳层不算
```

```tip
【做题】判格看"汇合点有且唯一"；判分配格找 M₃/N₅ 子图最快；布尔化简先看吸收律形式配不配，不配就分配展开凑 0/1；求补元两条件同时验证。
```

### 考点1：格的基本概念

meta: level=S

#### 1.1 是什么

格：满足一定条件的**偏序集**——哈斯图中任取两点，向上或向下**有且只有一个**汇合点。
两个要点：必须能汇到（不能没有）；只能汇到一个（不能多个）。

#### 1.2 吸收律（任意格都成立）

```f
a∨(a∧b) = a
a∧(a∨b) = a
```

**来源**：旧版思维导图·第七章考点1

### 考点2：对偶公式

meta: level=A

#### 2.1 规则

对偶公式就是符号反转：**∨ 与 ∧ 互换、≤ 与 ≥ 互换**（式中有 0、1 的也要 0↔1 互换）。
例：a∨b≥b 的对偶是 a∧b≤b；a∨(a∧b)≤a 的对偶是 a∧(a∨b)≥a。

**来源**：旧版思维导图·第七章考点2

### 考点3：分配格

meta: level=S; freq=2025.10

#### 3.1 定义

分配格：∨ 与 ∧ **互相**满足分配律——两个等式都要成立：

```f
a∨(b∧c) = (a∨b)∧(a∨c)
a∧(b∨c) = (a∧b)∨(a∧c)
```

#### 3.2 怎么判断

- 哈斯图**包含钻石格 M₃ 或五角格 N₅ 子图 ⇒ 不是分配格**（最快判据）
- 幂集格 ⟨P(A),∩,∪⟩ 一定是分配格（验证例：{1}∩({1,2}∪{2,3})={1}={1}∪∅）

#### 3.3 真题

**【2025.10·错题本·证明】** 设 ⟨L,∧,∨⟩ 是分配格，∀a,b,c∈L，若 a∧c=b∧c 且 a∨c=b∨c，证明 a=b。
**证明：**

```f
a = a∧(a∨c)          吸收律
  = a∧(b∨c)          代入 a∨c=b∨c
  = (a∧b)∨(a∧c)      分配律
  = (a∧b)∨(b∧c)      代入 a∧c=b∧c
  = b∧(a∨c)          分配律逆用
  = b∧(b∨c)          代入 a∨c=b∨c
  = b                 吸收律
```

```err
格中**没有消去律**——不能从两个等式里"消去 c"；正路是两次吸收+两次分配+两次代入，单向把 a 变形成 b。
```

**来源**：错题本 2025.10·考点3；旧版思维导图·第七章考点3

### 考点4：补元

meta: level=A

#### 4.1 规则

补元：有界格中 b 满足 **a∧b=0 且 a∨b=1**——两个条件**缺一不可**。
最上元与最下元**互为补元**。
例：{1,2,3,6} 整除格中，2 的补元是 3（2∧3=1，2∨3=6 同时满足）；6 与 1 互为补元。

```err
只满足 a∧b=0 或只满足 a∨b=1 的都不算补元——判断题专挖这个坑。
```

**来源**：旧版思维导图·第七章考点4

### 考点5：有界格

meta: level=B

#### 5.1 定义与结论

有界格：既有全上界（最大元 1）又有全下界（最小元 0）的格。
必背结论：**全上界与全下界互为补元**——所以有界格至少有两个元素存在补元。

判断题："每个元都有补元"错（不一定）；"至少有两个元素存在补元"对（0 和 1）。

**来源**：旧版思维导图·第七章考点5

### 考点6：布尔代数

meta: level=S; freq=2025.04、2025.10

#### 6.1 定义

布尔代数：**每个元素都有补元的有界分配格** ⟨B,∨,∧,′,0,1⟩——有界+分配+有补，三者齐备。

#### 6.2 核心运算律（必记）

| 公式 | 说明 |
|---|---|
| a∧a′=0，a∨a′=1 | 补元定义 |
| (a′)′=a | 补元的补 |
| 0′=1，1′=0 | 界互补 |
| (a∨b)′=a′∧b′，(a∧b)′=a′∨b′ | 德摩根律 |
| a∧(a′∨b)=a∧b | 分配律+补元：=(a∧a′)∨(a∧b)=0∨(a∧b) |
| a∨(a′∧b)=a∨b | 上式的对偶 |

#### 6.3 化简方法

优先级：先看能否直接吸收 → **形式不匹配就用分配律展开 + 补元律凑 0/1 消元** → 再吸收收尾。

#### 6.4 真题（一对对偶公式，成对背）

**【2025.10·错题本·填空】** b∨(a∧b′)=＿＿
**答案：** a∨b
解析：吸收律形式不匹配（∨ 左边是 b、括号里才有 a），改用分配律：b∨(a∧b′)=(b∨a)∧(b∨b′)=(a∨b)∧1=a∨b。

**【2025.04·错题本·填空】** a∧(a′∨b)=＿＿
**答案：** a∧b
解析：a∧(a′∨b)=(a∧a′)∨(a∧b)=0∨(a∧b)=a∧b；与上一题互为对偶形（∧↔∨ 互换）。

```err
这两条是轮考对：b∨(a∧b′)=a∨b 与 a∧(a′∨b)=a∧b——看到 ∨ 左边/∧ 左边的字母和括号里的对不上，立刻放弃吸收律，走"分配律+补元律"。
```

**来源**：错题本 2025.10·考点6、2025.04·考点6；旧版思维导图·第七章考点6

### 考点7：有补格与覆盖关系

meta: level=A

#### 7.1 补元与有补格

有补格：**每个元素都至少有一个补元**的有界格。
对照记牢：M₃（钻石格）、N₅（五角格）**有补但不分配**；有补+分配 ⇔ 布尔代数（此时**补元唯一**）。

```err
有界 ≠ 有补（有界只要求有 0、1）；有补 ≠ 分配（M₃、N₅ 是反例）——四张"格的身份卡"别串。
```

#### 7.2 覆盖关系 cov A

盖住：y 盖住 x ⇔ x≤y、x≠y，且**不存在** z 使 x≤z≤y。
cov A = {〈x,y〉∣y 盖住 x}——哈斯图的**每条相邻边**对应 cov A 里一个有序对。
例：{1,2,3,6} 整除关系：cov A={〈1,2〉,〈1,3〉,〈2,6〉,〈3,6〉}——1 到 6 隔着 2、3，**跳层不算盖住**。

**来源**：旧版思维导图·第七章考点7

### 考点8：全章速记图（图形版）

#### 考点8.1 一图总览

旧版思维导图的图形版速记图，与章首树状速记图同源——考前过一遍图即可唤起全章框架。

```d
<svg role="img" aria-label="第七章知识速记图：偏序集到格、升级链到布尔代数、分配格判定、布尔代数恒等式与哈斯图上读什么" viewBox="0 0 780 660" style="display:block;max-width:780px;width:100%;margin:8px 0"><rect x="295.0" y="10.0" width="190" height="32" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="2"/><text x="390" y="30.5" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--heading)">偏序集</text><line x1="390" y1="42" x2="390" y2="62" style="stroke:var(--muted);stroke-width:1.5"/><line x1="250" y1="62" x2="530" y2="62" style="stroke:var(--muted);stroke-width:1.5"/><line x1="250" y1="62" x2="250" y2="69" style="stroke:var(--muted);stroke-width:1.5"/><line x1="530" y1="62" x2="530" y2="69" style="stroke:var(--muted);stroke-width:1.5"/><rect x="130.0" y="70.0" width="240" height="30" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="250" y="89.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">最大下界 a∧b（下确界）</text><rect x="410.0" y="70.0" width="240" height="30" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="530" y="89.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">最小上界 a∨b（上确界）</text><polyline points="250,100 250,112 390,112" fill="none" style="stroke:var(--muted);stroke-width:1.5"/><polyline points="530,100 530,112 390,112" fill="none" style="stroke:var(--muted);stroke-width:1.5"/><line x1="390" y1="112" x2="390" y2="118" style="stroke:var(--muted);stroke-width:1.5"/><rect x="315.0" y="118.0" width="150" height="30" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="2"/><text x="390" y="137.5" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--heading)">格</text><text x="390" y="177" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--muted)">哈斯图判定：任意两点向上/向下，有且只有一个汇合点</text><text x="390" y="196" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--muted)">任意格都满足吸收律：a∨(a∧b)＝a　a∧(a∨b)＝a</text><line x1="30" y1="216" x2="215" y2="216" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="216" x2="750" y2="216" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="220" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 最值得背的一条链 ——</text><rect x="20.0" y="244.0" width="150" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="95.0" y="270.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">格</text><rect x="220.0" y="244.0" width="150" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="295.0" y="270.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">有界格</text><rect x="420.0" y="244.0" width="150" height="44" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.6"/><text x="495.0" y="270.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">有补格</text><rect x="620.0" y="244.0" width="150" height="44" rx="7" fill="var(--formula-bg)" stroke="var(--accent)" stroke-width="2.2"/><text x="695.0" y="270.5" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--heading)">布尔代数</text><line x1="170" y1="266" x2="213" y2="266" style="stroke:var(--accent);stroke-width:2.2"/><polygon points="213,261.5 220,266 213,270.5" fill="var(--accent)"/><text x="195.0" y="236" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--accent)">＋0、1</text><line x1="370" y1="266" x2="413" y2="266" style="stroke:var(--accent);stroke-width:2.2"/><polygon points="413,261.5 420,266 413,270.5" fill="var(--accent)"/><text x="395.0" y="236" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--accent)">＋补元</text><line x1="570" y1="266" x2="613" y2="266" style="stroke:var(--accent);stroke-width:2.2"/><polygon points="613,261.5 620,266 613,270.5" fill="var(--accent)"/><text x="595.0" y="236" text-anchor="middle" font-size="11.5" font-weight="bold" fill="var(--accent)">＋分配律</text><text x="390" y="304" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--muted)">布尔代数 ⇔ 格＋分配＋有界＋有补（有补分配格，此时补元唯一）</text><line x1="30" y1="324" x2="215" y2="324" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="324" x2="750" y2="324" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="328" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 分配格：两个分配律都要成立 ——</text><rect x="20.0" y="356.0" width="350" height="32" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="376.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">a∨(b∧c)＝(a∨b)∧(a∨c)（∨ 对 ∧ 分配）</text><rect x="410.0" y="356.0" width="350" height="32" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="376.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">a∧(b∨c)＝(a∧b)∨(a∧c)（∧ 对 ∨ 分配）</text><rect x="135.0" y="403.0" width="510" height="30" rx="7" fill="var(--card)" stroke="var(--err)" stroke-width="1.6"/><text x="390" y="422.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">哈斯图含 M₃（钻石格）或 N₅（五角格）⇒ 非分配格</text><line x1="30" y1="442" x2="215" y2="442" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="442" x2="750" y2="442" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="446" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 布尔代数常用恒等式 ——</text><rect x="10.0" y="468.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="483.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">补元律</text><text x="130" y="500.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">a∧a′＝0，a∨a′＝1</text><text x="130" y="517.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">(a′)′＝a，0′＝1，1′＝0</text><rect x="270.0" y="468.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="483.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">德摩根律</text><text x="390" y="500.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">(a∨b)′＝a′∧b′</text><text x="390" y="517.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">(a∧b)′＝a′∨b′</text><rect x="520.0" y="468.0" width="260" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="484.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">化简三板斧</text><text x="650" y="501.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">a∧(a′∨b)＝a∧b</text><text x="650" y="518.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">a∨(a′∧b)＝a∨b</text><text x="650" y="535.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">(a∧b)∨(a∧b′)＝a</text><line x1="30" y1="554" x2="215" y2="554" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="554" x2="750" y2="554" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="558" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 哈斯图上读什么 ——</text><rect x="10.0" y="580.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="595.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">对偶公式</text><text x="130" y="612.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">∨↔∧　≤↔≥</text><text x="130" y="629.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">式中有 0、1 也要互换</text><rect x="270.0" y="575.0" width="240" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="591.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">极大/极小 vs 最大/最小</text><text x="390" y="608.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">极大：上头再没有元素</text><text x="390" y="625.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">最大：比所有元素都大</text><text x="390" y="642.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">（极小、最小同理）</text><rect x="520.0" y="575.0" width="260" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="599.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">覆盖 cov A</text><text x="650" y="616.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">y 盖住 x：x≤y 且中间无 z</text><text x="650" y="633.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">只数相邻边，跳层不算</text></svg>
```

**来源**：旧版思维导图·第七章知识速记图

## 第八章 图

图论基础章是计算题密集区，工具只有一个：**握手定理 Σdeg(v)=2m**——度数序列、边数、阶数互相求，全靠它。其余高频点：完全图/二分图边数公式、连通与非连通的边数界、邻接矩阵乘幂数通路回路。错题记录 2025.04–2026.04 三套卷共 3 题：握手定理两题（含一道证明）、K₃,₃ 边数一题。

本章速记图（先看图建立全章框架，再逐个展开考点）：

```tree
第八章 图（考点 1—14）
  核心：握手定理、完全图与边数、连通性、矩阵表示
  1. 图的基本概念【A】
    简单图：无重边无自环
    n 阶简单图最大度数 n−1
    度数序列最大值超过 n−1 ⇒ 不能构成
  2. 握手定理【S】
    Σdeg(v) = 2m，总度数必为偶数
    度数和为奇 ⇒ 图不存在
    n 阶连通图度数和至少 2(n−1)
    最大度 ≥ 平均度，最后用整数码住
  3. 完全图【A】
    Kn 边数 = n(n−1)/2
  4. 正则图【A】
    k-正则：每点度数都是 k
    nk = 2m 自检
  5. 补图【B】
    补图边数 = C(n,2) − m
    可旋转拉伸，不能改连接关系
  6. 同构【A】
    同构 = 同种结构
    5 阶非同构的树共 3 棵
  7. 自补图【B】
    G ≅ 其补图
    边数 = n(n−1)/4，要求 n≡0 或 1 (mod 4)
  8. 连通图与非连通图【S】
    连通最少边 n−1（树最省）
    非连通最多边 (n−1)(n−2)/2
    非连通 ≠ 必有孤立点
  9. 割边【B】
    删去后分支数增加；树的每条边都是割边
  10. 图的表示【A】
    邻接矩阵：点×点；无向图对称
    Mᵏ 的 aᵢⱼ = vi 到 vj 长度 k 的通路数
  11. 通路与回路【S】
    长度 k 通路数 = Mᵏ 全元素之和
    长度 k 回路数 = Mᵏ 对角线之和
    长度 ≤k 的回路按 k=1..k 分层累加
  12. 完全二分图【A】
    Km,n：边数 m×n，阶数 m+n
    易错：K₃,₃ 的边数是 9，不是 C(6,2)=15
  13. 关联矩阵【B】
    点×边；每列恰 2 个 1
    行和 = 度数；全 0 行 = 孤立点
  14. 彼得森图【A】
    10 点、15 边、3-正则
    非平面、非欧拉、非哈密顿、非二分
```

```tip
【做题】度数题第一反应握手定理 Σdeg=2m；给边数证度数先算平均度再整数码住；通路回路题先写邻接矩阵再乘幂；彼得森图判断题四连"不是"直接背。
```

### 考点1：图的基本概念

meta: level=A

#### 1.1 是什么

图：顶点 V 和边 E 的组合；边分有向/无向。
简单图：**无重复边、无自环**。
度数 deg(v)：连在该结点上的边数。

#### 1.2 必背结论

- 一条无向边 = 一条 A→B 加一条 B→A 的有向边
- n 个结点的简单图，任一结点度数 ≤ **n−1**
- 度数序列判断：最大值超过 n−1 就不能构成简单图（如 {5,3,3,3}，4 个点最大度应为 3）

例：6 阶无向简单图结点最大度数 = 5。

**来源**：旧版思维导图·第八章考点1

### 考点2：握手定理

meta: level=S; freq=2025.04、2026.04

#### 2.1 定理

```f
Σdeg(v) = 2|E|
```

总度数 = 2 倍边数，因此**总度数一定是偶数**——度数和为奇的序列直接排除（{1,1,3,4} 和为 9，不能构成无向图）。

#### 2.2 常用推论

- n 阶连通图：m≥n−1（树最省），故 **Σdeg ≥ 2(n−1)**
- 每点度数均为 k 的 n 阶图：nk=2m，nk 为奇数则图不存在（9 阶图每点 3 度 → 27 为奇，不行；6 度 → 54，可以）
- "9 条边、每点 3 度"型：2×9=n×3 → n=6

#### 2.3 真题

**【2026.04·错题本·填空】** 设 G 是 n 阶连通图，则 G 的顶点度数之和至少是＿＿
**答案：** 2(n−1)
解析：连通图边数 m≥n−1（树是最"省"的连通图），由握手定理 Σdeg=2m≥2(n−1)。

**【2025.04·错题本·证明】** 设无向图 G=(V,E)，|V|=n，|E|=kn+1（k 为自然数）。证明：Δ(G)≥2k+1。
**证明：** 由握手定理 Σdeg(v)=2(kn+1)=2kn+2，平均度 = (2kn+2)/n = 2k+2/n。最大度不小于平均度：Δ(G)≥2k+2/n＞2k；Δ(G) 与 2k 都是**整数**，整数严格大于 2k 即 Δ(G)≥2k+1。∎

```err
两个失分点：①给边数证度数没想到先算平均度；②推到 Δ＞2k 就停笔——必须说明 Δ 是整数才能落到 2k+1。
```

**来源**：错题本 2026.04·考点2、2025.04·考点2；旧版思维导图·第八章考点2

### 考点3：完全图

meta: level=A

#### 3.1 定义与公式

完全图 Kn：每个结点与其余结点都有边相连。

```f
Kn 的边数 = C(n,2) = n(n−1)/2
```

K₃ 有 3 条边，K₄ 有 6 条；4 阶简单图 |E| 最大 6，8 阶最大 28。

**来源**：旧版思维导图·第八章考点3

### 考点4：正则图

meta: level=A

#### 4.1 定义与自检

k-正则图：每个结点度数都为 k。三角形、四边形都是 2-正则图。
自检公式：nk=2m（握手定理的即时校验）。

#### 4.2 证明章程式

"n 个人每人恰有 3 个朋友，证明 n 为偶数"：建 3-正则图，Σdeg=3n=2m，右边是偶数故 3n 为偶，3 是奇数所以 **n 必为偶数**。∎

**来源**：旧版思维导图·第八章考点4

### 考点5：补图

meta: level=B

#### 5.1 是什么

补图：与原图合并后恰为完全图的图。
边数公式：原图 n 个点 m 条边，补图 **C(n,2)−m** 条。

#### 5.2 怎么选

先数边数筛选项，再比结构——补图可以**旋转、拉伸**，但不能改变连接关系。
例：原图"三角形+孤立点"（3 条边，4 点）的补图有 6−3=3 条边，是"孤立点向其余三点各连一边"的星形（旋转即得）。

**来源**：旧版思维导图·第八章考点5

### 考点6：同构

meta: level=A

#### 6.1 是什么

同构（≅）：结构相同、只是摆放不同的两个图。

#### 6.2 常用结论

- **5 阶非同构的树共 3 棵**：路径形、一个 3 度结点形、星形（中心 4 度）
- 抽屉原理证同构：4 阶 4 条边的非同构简单图种类有限，3 个图中必有两个同构

**来源**：旧版思维导图·第八章考点6

### 考点7：自补图

meta: level=B

#### 7.1 是什么

自补图：G ≅ 其补图。
必背：自补图边数 = 完全图边数的一半 = **n(n−1)/4**，因此 n(n−1) 必须能被 4 整除（n≡0 或 1，mod 4）。

例（4 点）：自补图边数应为 3；P₄（4 顶点路径）的补图仍是 P₄，自补 ✓；星形的补图是"三角形+孤立点"，二者互为补图但不自补。

**来源**：旧版思维导图·第八章考点7

### 考点8：连通图与非连通图

meta: level=S

#### 8.1 边数两界

```f
n 阶连通图：最少边数 = n−1（恰为树）
n 阶非连通图：最多边数 = (n−1)(n−2)/2（1 个点落单 + 其余构成完全图）
```

例：5 阶连通图最少 4 条边；6 阶非连通图最多 C(5,2)=10 条边。

```err
非连通 ≠ 必有孤立点——两条互不相交的边（K₂∪K₂）没有孤立点，也是非连通图。判断题常设此坑。
```

**来源**：旧版思维导图·第八章考点8

### 考点9：割边

meta: level=B

#### 9.1 是什么

割边（桥）：删去 e 后连通分支数增加（ω(G−e)＞ω(G)）的边。
必背：**树的每一条边都是割边**。
例：2020 个结点的树有 2020−1=2019 条割边。

**来源**：旧版思维导图·第八章考点9

### 考点10：图的表示

meta: level=A

#### 10.1 邻接矩阵

点×点矩阵，aᵢⱼ = vᵢ→vⱼ 的边数。
无向图的邻接矩阵是**对称矩阵**；有向图不一定对称。

#### 10.2 易混辨析

"不能用来表达二元关系 R 的方法"——邻接矩阵是**图**的表示（带重边计数），二元关系的三种表示是集合表达式、关系矩阵、关系图。

#### 10.3 通路计数

```f
(Mᵏ)ᵢⱼ = vᵢ 到 vⱼ 长度为 k 的通路数
```

例：4 点有向图求 v₃→v₁ 长度 3 的通路数 = (M³)₃₁，先算 M² 第 3 行，与 M 第 1 列点积即得；答案可与直接枚举互验。

**来源**：旧版思维导图·第八章考点10

### 考点11：通路与回路

meta: level=S

#### 11.1 方法三步

- 先写邻接矩阵 M
- **长度为 k 的通路数 = Mᵏ 中所有元素之和**
- **长度为 k 的回路数 = Mᵏ 对角线元素之和**；长度 ≤k 的回路按 k=1,…,k 分层累加

#### 11.2 算例

3 点有向图：M³ 元素和 13 → 长度 3 的通路 13 条；M、M²、M³ 对角线和 1+3+4=8 → 长度 ≤3 的回路 8 个。
4 点有向图：M⁴ 元素和 16 → 16 条；对角线和 0+0+6+4=10 → 长度 ≤4 的回路 10 个（长度 1、2 层各为 0：无自环、无双向边）。

```tip
【记忆】"全元素和数通路、对角线和数回路、≤k 就分层加"——三句话覆盖全部矩阵算通路题。
```

**来源**：旧版思维导图·第八章考点11

### 考点12：完全二分图

meta: level=A; freq=2026.04

#### 12.1 是什么

完全二分图 Km,n：顶点分成两个互不相交的非空子集 V₁（m 个）、V₂（n 个），**部内无边、跨部全连**。

#### 12.2 必背公式

```f
阶数 = m+n     边数 = m×n
V₁ 中顶点度数 = n，V₂ 中顶点度数 = m
总度数 2mn（握手定理自检 ✓）
```

#### 12.3 真题

**【2026.04·错题本·填空】** K₃,₃ 的边数是＿＿
**答案：** 9
解析：完全二分图边数 = m×n = 3×3 = 9。

```err
别把 K₃,₃ 当成 6 个结点的完全图按 C(6,2)=15 算——部内部与部之间规则完全不同。
```

**来源**：错题本 2026.04·考点12；旧版思维导图·第八章考点12

### 考点13：关联矩阵

meta: level=B

#### 13.1 定义与性质

关联矩阵 M(G)：**行对应结点、列对应边**（区别于邻接矩阵的点×点）。
关键性质：

```f
每列恰有 2 个 1（一条边恰有两个端点）
每行 1 的个数 = 该结点度数；全 0 行 = 孤立点
```

#### 13.2 推论

- n 阶**无孤立点**简单图：每行至少 1 个 1，每列恰 2 个 → 2m≥n → **m≥⌈n/2⌉**（取等：若干独立边拼成）
- n 阶**连通**图：m≥n−1，非零元素至少 **2(n−1)** 个（旧笔记标注 2023.10 考过无孤立点版本）

**来源**：旧版思维导图·第八章考点13（2023.10 为旧笔记自标年份）

### 考点14：彼得森图

meta: level=A

#### 14.1 是什么

彼得森图：**10 个顶点、15 条边**的 3-正则图（外五边形+内五角星，对应点相连）。握手自检：3×10=2×15 ✓。

#### 14.2 判断题四连（全背"不是"）

| 说法 | 判定 | 原因 |
|---|---|---|
| 是平面图 | ✗ | 非平面图 |
| 是欧拉图 | ✗ | 度数 3 为奇，有奇点 |
| 是哈密顿图 | ✗ | 经典结论：不含哈密顿回路 |
| 是二分图 | ✗ | 内五角星含奇圈 |

**来源**：旧版思维导图·第八章考点14

### 考点15：全章速记图（图形版）

#### 考点15.1 一图总览

旧版思维导图的图形版速记图，与章首树状速记图同源——考前过一遍图即可唤起全章框架。

```d
<svg role="img" aria-label="第八章知识速记图：图的基本概念、握手定理、补图同构自补图、连通与割边、两个矩阵与矩阵幂、完全二分图与彼得森图" viewBox="0 0 780 722" style="display:block;max-width:780px;width:100%;margin:8px 0"><rect x="280.0" y="8.0" width="220" height="32" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="2"/><text x="390" y="28.5" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--heading)">图 G＝(V,E)</text><line x1="390" y1="40" x2="390" y2="58" style="stroke:var(--muted);stroke-width:1.5"/><line x1="130" y1="58" x2="650" y2="58" style="stroke:var(--muted);stroke-width:1.5"/><line x1="130" y1="58" x2="130" y2="66" style="stroke:var(--muted);stroke-width:1.5"/><line x1="390" y1="58" x2="390" y2="66" style="stroke:var(--muted);stroke-width:1.5"/><line x1="650" y1="58" x2="650" y2="66" style="stroke:var(--muted);stroke-width:1.5"/><rect x="55.0" y="66.0" width="150" height="28" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="1.8"/><text x="130" y="84.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">基本概念</text><rect x="315.0" y="66.0" width="150" height="28" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="1.8"/><text x="390" y="84.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">握手定理</text><rect x="575.0" y="66.0" width="150" height="28" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="1.8"/><text x="650" y="84.5" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--heading)">特殊图</text><line x1="130" y1="94" x2="130" y2="104" style="stroke:var(--muted);stroke-width:1.5"/><line x1="390" y1="94" x2="390" y2="104" style="stroke:var(--muted);stroke-width:1.5"/><line x1="650" y1="94" x2="650" y2="104" style="stroke:var(--muted);stroke-width:1.5"/><rect x="5.0" y="104.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="128.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">简单图：无重边、无自环</text><text x="130" y="145.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">n 阶简单图：Δmax ≤ n−1</text><rect x="260.0" y="104.0" width="260" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="128.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">Σdeg(v)＝2m（总度数为偶）</text><text x="390" y="145.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">度数总和为奇 ⇒ 不能构成图</text><text x="390" y="162.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">k-正则图（每点度数 k）：nk＝2m</text><rect x="525.0" y="104.0" width="250" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="128.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">完全图 Kₙ：|E|＝n(n−1)/2</text><text x="650" y="145.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">二部图：边只跨部，部内无边</text><line x1="30" y1="196" x2="215" y2="196" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="196" x2="750" y2="196" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="200" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 补图 · 同构 · 自补图 ——</text><rect x="5.0" y="216.0" width="250" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="240.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">补图：原图＋补图拼成 Kₙ</text><text x="130" y="257.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">|E(Ḡ)|＝C(n,2)−|E(G)|</text><text x="130" y="274.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">补图可旋转拉伸，结构不变</text><rect x="265.0" y="216.0" width="250" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="240.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">同构 G₁≅G₂：结构相同</text><text x="390" y="257.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">同构 ⇒ 点数/边数/度数列全同</text><text x="390" y="274.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">反之不然（只能用于否定）</text><rect x="525.0" y="216.0" width="250" height="92" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="241.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">自补图：G≅Ḡ</text><text x="650" y="258.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">|E|＝n(n−1)/4</text><text x="650" y="275.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">⇒ n(n−1) 能被 4 整除</text><text x="650" y="292.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">（即 n≡0 或 1，mod 4）</text><line x1="30" y1="326" x2="215" y2="326" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="326" x2="750" y2="326" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="330" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 连通与割边 ——</text><rect x="20.0" y="353.0" width="350" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="377.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">连通图：任意两点之间有通路</text><text x="195" y="394.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">边最少 n−1 条（树时取到）</text><rect x="405.0" y="353.0" width="360" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="377.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">非连通图：边最多 (n−1)(n−2)/2</text><text x="585" y="394.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">（1 个孤立点＋其余 n−1 个点配完全图）</text><rect x="130.0" y="425.0" width="520" height="32" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="445.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">割边（桥）：删掉后连通分支数增加；树的每条边都是割边</text><line x1="30" y1="477" x2="215" y2="477" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="477" x2="750" y2="477" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="481" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 图的表示：两个矩阵 ＋ 矩阵幂 ——</text><rect x="5.0" y="481.0" width="250" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="505.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">邻接矩阵：点 × 点</text><text x="130" y="522.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">aᵢⱼ＝vi→vj 的边条数</text><text x="130" y="539.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">无向图对称；有向不一定</text><rect x="260.0" y="481.0" width="260" height="92" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="497.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">关联矩阵：点 × 边</text><text x="390" y="514.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">每列恰有两个 1</text><text x="390" y="531.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">每行 1 的个数＝该点度数</text><text x="390" y="548.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">无孤立点 ⇒ m≥⌈n/2⌉</text><text x="390" y="565.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">连通 ⇒ 非零元 ≥ 2(n−1)</text><rect x="525.0" y="481.0" width="250" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="497.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">矩阵幂 Mᵏ（k＝长度）</text><text x="650" y="514.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">aᵢⱼ＝vi→vj 长度 k 的通路数</text><text x="650" y="531.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">元素总和＝长度 k 通路总数</text><text x="650" y="548.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">对角线和＝长度 k 回路总数</text><line x1="30" y1="596" x2="215" y2="596" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="596" x2="750" y2="596" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="600" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 两个常考特殊图 ——</text><rect x="20.0" y="618.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="642.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">完全二分图 Kₘ,ₙ</text><text x="195" y="659.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">顶点 m＋n，边数 mn</text><text x="195" y="676.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">左部每点度数＝n，右部每点度数＝m</text><rect x="405.0" y="618.0" width="360" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="642.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">彼得森图：10 点、15 边、3-正则</text><text x="585" y="659.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">非平面、非欧拉（有奇度点）、非哈密顿</text><text x="585" y="676.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">非二分（含奇圈）——判断题常客</text><text x="390" y="712" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--tip)">⚠ 分界：欧拉图、哈密顿图、狄拉克定理属于第九章「图的应用」，不在第八章</text></svg>
```

**来源**：旧版思维导图·第八章知识速记图

## 第九章 图的应用

应用章把图论工具落到四类大题：**欧拉/哈密顿**（游边/游点）、**平面图证明**（欧拉公式+面次不等式）、**树**（握手定理解计数）、**最小生成树与 TSP**。错题记录三套卷共 3 题，全部是证明/应用大题：欧拉充要条件、m≤3n−6 证明、狄拉克定理圆桌入座。

本章速记图（先看图建立全章框架，再逐个展开考点）：

```tree
第九章 图的应用（考点 1—12）
  核心：欧拉/哈密顿、平面图证明、树计数、最小生成树
  1. 欧拉回路与欧拉图【S】
    每条边恰一次，回起点
    充要条件：连通 + 所有顶点度数为偶
    有奇点直接排除
  2. 哈密顿回路【S】
    每个点恰一次，回起点
    无充要判定，只有充分条件
    狄拉克定理：δ(G) ≥ n/2 ⇒ 存在哈密顿回路
    信号词：「每人至少 n/2 个朋友」＋「围圆桌相邻认识」
  3. 简单平面图【S】
    欧拉公式 n−m+f=2
    3f ≤ 2m ⇒ m ≤ 3n−6
    m＜30 ⇒ 必有顶点度数＜5（反证）
  4. 树的基本概念【A】
    连通且无回路；边数 = n−1
  5. 树的节点分类【B】
    分支结点度数＞1；叶结点度数＝1
    n 阶树分支点最多 n−2 个（直链）、叶最多 n−1 个
  6. 树的握手定理【S】
    总度数 = 2(n−1)
    设未知点数个数，列方程解
  7. 克鲁斯卡尔算法【S】
    权值从小到大选边，成圈舍弃
    选满 n−1 条停止
    信号词：连通所有点的最小代价
  8. 二叉树的概念【B】
    完全 m 叉树：要么不分叉，要么分 m 叉
  9. 二叉树的遍历【A】
    先序根左右；中序左根右；后序左右根
    先序根在最前、后序根在最后、中序根隔开左右
  10. 算术表达式与二叉树【A】
    最后运算的符号作根，左右递归
    中序 = 去括号抄原式
  11. 树的结点数公式【S】
    二叉树：n₀ = n₂ + 1
    完全 m 叉树：叶数 l = (m−1)i + 1
    正则 m 叉树高 h：叶数 = m^(h−1)
  12. 旅行商问题【B】
    游遍城市恰一次回起点求最短 = 最短哈密顿回路
    最小生成树是树不是回路，Kruskal 不能套
```

```tip
【做题】欧拉数「边」、哈密顿数「点」；平面图证明三件套＝欧拉公式+3f≤2m+握手定理；树的计数全部落到"总度数=2(n−1)"；"游遍各点回起点求最短"是哈密顿不是最小生成树。
```

### 考点1：欧拉回路与欧拉图

meta: level=S; freq=2026.04

#### 1.1 是什么

欧拉回路：从某结点出发，**每条边有且仅经过一次**，最后回到该结点。
欧拉图：存在欧拉回路的图。

#### 1.2 充要条件（必背）

无向图 G 是欧拉图 ⇔ **G 连通，且所有顶点的度数均为偶数**（无奇点）。

#### 1.3 判定流程

① 先查连通性——不连通直接排除（两个不相连的三角形虽无奇点也不是欧拉图）；② 再数各点度数找奇点——**含奇点必不是欧拉图**，选择题先数度数即可排除。

#### 1.4 真题

**【2026.04·错题本·填空】** 无向图 G 是欧拉图的充分必要条件是 G 是＿＿
**答案：** 连通图，且所有顶点的度数均为偶数
解析：两个条件缺一不可——不连通就没有经过所有边的通路；有奇度顶点则每边恰一次的回路无法闭合。

```err
只答「度数全偶」漏掉连通、或只答连通漏掉偶度，都算错——充要条件要写全。
```

**来源**：错题本 2026.04·考点1；旧版思维导图·第九章考点1；考场清单第8条

### 考点2：哈密顿回路

meta: level=S; freq=2025.10

#### 2.1 是什么

哈密顿回路：从某结点出发，**每个结点有且仅经过一次**，最后回到起点。
与欧拉的区别：欧拉管**边**（每条边恰一次，有充要判定）；哈密顿管**点**（每个点恰一次，**没有充要判定**）。

#### 2.2 狄拉克定理（充分条件，证明题直接引用）

n≥3 的简单无向图中，若**每个顶点度数都 ≥ n/2**，则存在哈密顿回路。
注意只是充分条件：度数不足 n/2 也可能有哈密顿回路（五边形 C₅ 每点度数 2<n/2=2.5，但有回路）。

#### 2.3 真题

**【2025.10·错题本·证明】** 30 人参加会议，每人都至少有 15 个朋友。证明：这 30 人围一圆桌入座，一定存在相邻的人都是朋友的情形。
**证明：** ①建模——30 人为 30 个顶点，是朋友连边，得简单图 G，n=30。②验证条件——每人至少 15 个朋友 ⇒ δ(G)≥15=n/2，且 n=30≥3。③由**狄拉克定理**，G 存在哈密顿回路；按回路顺序入座，相邻（含最后一人与第一人）都是朋友。∎

```tip
【记忆】信号词：「每人至少 n/2 个朋友」＋「围成圆桌相邻都认识」→ 套狄拉克定理；它是现成定理，直接引用不用现场证。
```

#### 2.4 题型特征

题目不提"哈密顿"三个字，用车站、城市、人员描述——"围成一圈相邻能交流""每个城市恰好经过一次回到出发地"，本质都是找哈密顿回路。
建模三步：人/城市→结点；能交流/有道路→连边；把具体回路找出来就是答案。
例（七人圆桌）：7 人围坐相邻有共同语言——同一门语言的两人连边，找经过每人恰一次的回路，座位方案 A→B→D→F→G→E→C→A。

**来源**：错题本 2025.10·考点2；旧版思维导图·第九章考点2

### 考点3：简单平面图

meta: level=S; freq=2026.04

#### 3.1 面与次数

面：平面图把平面分成的每个区域，**外部无限区域也算一个面**。
面的次数：围成该面的边界所含边数。
面次总和：**所有面的次数之和 = 2m**（每条边恰被两侧各数一次；桥的两侧属同一面也计两次）。
验证：K₄ 有 4 个面、每面 3 条边：3×4=12=2×6 ✓。

#### 3.2 公式清单

```f
欧拉公式（连通平面图）：n − m + f = 2
面边不等式：3f ≤ 2m（每个面至少 3 条边）
简单平面图边数上限：m ≤ 3n − 6
小度数推论：m < 30 ⇒ 存在顶点 d(v) < 5
```

知二求一直接套欧拉公式：n=6，m=9 → f=5；n=8，f=6 → m=12。

#### 3.3 两个证明模板

**证 m≤3n−6**：① 各面次数之和 2m，每面至少 3 条边 → 3f≤2m；② 欧拉公式 f=2+m−n；③ 代入 3(2+m−n)≤2m，整理得 m≤3n−6。∎
（条件"简单"保证没有重边/环围成的 2 边面；用途——m>3n−6 则必非平面，如 K₅：n=5，m=10>9。）

**证存在度数<5 的顶点**：设 m<30，反证所有 d(v)≥5 → 握手定理 2m≥5n → n≤2m/5；代入上限 m≤3n−6≤3·(2m/5)−6=6m/5−6 → 移项得 m≥30，矛盾。∎

#### 3.4 真题

**【2026.04·错题本·证明】** 设 G 为连通简单平面图，顶点数 n，边数 m，每个面至少由 3 条边围成。证明：m≤3n−6。
**答案：** 见 3.3 第一个模板（设 r 个面：3r≤2m，欧拉公式 r=2+m−n，代入整理）。

**相关**：m<30 证存在 d(v)<5 为旧笔记标注的 2024.10 真题（第35题），模板见上。

**来源**：错题本 2026.04·考点3；旧版思维导图·第九章考点3

### 考点4：树的基本概念

meta: level=A

#### 4.1 定义与结论

树：**连通且无回路**的无向图。
边数：|E|=|V|−1。

#### 4.2 常用计算

- 4 阶树变完全图需加边：C(4,2)−3=6−3=3 条
- n 阶树的邻接矩阵非零元素最少 **2(n−1)** 个（每条边贡献对称的 2 个 1）

**来源**：旧版思维导图·第九章考点4

### 考点5：树的节点分类

meta: level=B

#### 5.1 两类结点

分支结点：度数＞1；叶结点（树叶）：度数=1。
n 阶树：分支结点最多 n−2 个（直链形态，两端是叶）；叶最多 n−1 个（星形形态，1 个分支结点）。

**来源**：旧版思维导图·第九章考点5

### 考点6：树的握手定理

meta: level=S

#### 6.1 公式

```f
Σdeg(v) = 2(|V|−1)
```

树的总度数 = 2×(结点数−1)。度数序列先验总和（5 结点树总和必为 8；{3,3,3,3,3} 和为 15 直接排除），再画图确认。

#### 6.2 解题套路

设未知类型结点个数 → 列总度数方程 → 用 2(n−1) 求解。
例 1：叶 8 片、4 度结点 1 个、其余分支结点 3 度——设 3 度结点 n−9 个：8+4+3(n−9)=2(n−1) → n=13。
例 2：1 度 40 个、2 度 20 个、3 度 31 个，求 4 度 x、5 度 y——总度数 173+4x+5y=2(91+x+y−1) → **2x+3y=7** → 非负整数解只有 x=2、y=1。

**来源**：旧版思维导图·第九章考点6

### 考点7：克鲁斯卡尔算法

meta: level=S

#### 7.1 求什么

最小生成树：连接全部 n 个结点的 n−1 条边中，总权值最小的一棵树。
识别特征：工厂/村庄/城市当点、道路当边、距离造价当权值，求"连通所有点的最小代价"——不明说算法也直接套 Kruskal。

#### 7.2 步骤

保留全部结点、去掉全部边 → 按权值从小到大逐条试连 → **成圈舍弃、不圈保留** → 选满 n−1 条停止。

#### 7.3 算例

5 个工厂架线：DE 4 ✓ → AD 5 ✓ → BC 6 ✓（AE 6 会与已选边成圈，弃）→ AC 7 ✓，已选 4=5−1 条停，总长 4+5+6+7=**22**。

**来源**：旧版思维导图·第九章考点7

### 考点8：二叉树的概念

meta: level=B

#### 8.1 定义

m 叉树：每个结点最多分 m 个叉。
完全 m 叉树：每个结点**要么不分叉，要么分满 m 个叉**。
正则 m 叉树（本笔记用法）：所有叶结点都在同一层。

#### 8.2 常用计算

完全二叉树叶结点 7 个 → 分支结点 6 个（l=i+1，见考点11）。
高 5 的正则三叉树：叶结点 = 3⁴=**81** 个（第 1 层 1 个，逐层乘 3，叶在第 5 层）。

```err
各教材对"完全/正则"叫法不一——做题认结构描述（"要么不分要么分满"vs"叶都在同一层"），别背名字。
```

**来源**：旧版思维导图·第九章考点8

### 考点9：二叉树的遍历

meta: level=A

#### 9.1 三种遍历

| 遍历 | 顺序 | 别名 |
|---|---|---|
| 先序 | 根→左→右 | 先根 |
| 中序 | 左→根→右 | 中根 |
| 后序 | 左→右→根 | 后根 |

#### 9.2 算例

树：A 为根，B、C 为 A 的左右孩子，D、E 为 B 的左右孩子，F、G 为 E 的左右孩子：

```f
先序：A B D E F G C
中序：D B F E G A C
后序：D F G E B C A
```

方法：根的位置固定——**先序第一个、后序最后一个、中序把左右子树序列隔开**；先定位根，再对左右子树递归。

**来源**：旧版思维导图·第九章考点9

### 考点10：算术表达式与二叉树

meta: level=A

#### 10.1 方法

- **最后运算**的符号 → 根结点
- 符号左边部分 → 左子树；右边部分 → 右子树
- 递归进行

#### 10.2 三个提速技巧

- 中序 = **去括号抄原式**——只有先序、后序需要重排
- 数字（运算对象）的相对顺序永远不变，挪的只是运算符：先序符号最前、中序居中、后序最后
- 动手前先按运算顺序补隐含括号：1+2−3 实为 (1+2)−3，最后运算的 − 才是根

#### 10.3 算例

表达式 (a+3×b)÷(c−d)：最后运算 ÷ 作根。

```f
先序：÷ + a × 3 b − c d
中序：a + 3 × b ÷ c − d
后序：a 3 b × + c d − ÷
```

**来源**：旧版思维导图·第九章考点10

### 考点11：树的结点数公式（速算）

meta: level=S

#### 11.1 任意二叉树：叶 = 二分支点 + 1

```f
n₀ = n₂ + 1
```

n₀ 叶结点数，n₂ 恰有 2 个孩子的结点数（n₁ 恰 1 个孩子）。
证明一行：边数 = 孩子总数 = n₁+2n₂，又边数 = 总结点数−1 = n₀+n₁+n₂−1，两式相等化简即得。

#### 11.2 完全 m 叉树（每个分支点恰 m 个孩子）

```f
叶结点数 l = (m−1)·i + 1
总结点数 n = m·i + 1        （i 为分支点数）
```

考点8 的"7 叶 → 6 分支"即 m=2 时 l=i+1。

#### 11.3 正则 m 叉树（叶都在同一层）

高 h（根在第 1 层）时：

```f
叶结点数 = m^(h−1)
```

高 5 正则三叉树 → 3⁴=81。

**来源**：旧版思维导图·第九章考点11

### 考点12：旅行商问题（最短哈密顿回路）

meta: level=B

#### 12.1 是什么

TSP：从出发地出发，**每个城市恰好经过一次**后回到出发地，求总权值最短的回路——本质是**最短哈密顿回路**。

#### 12.2 与最小生成树的区别（真题考过辨析）

| | 最小生成树 | 旅行商回路 |
|---|---|---|
| 结构 | 树（无回路） | 回路（哈密顿回路） |
| 经过 | 连通全部点 | 每点恰一次且回起点 |
| 解法 | Kruskal 精确解 | 枚举/近似，Kruskal 不能直接用 |

#### 12.3 解法与算例

点少枚举：n 点回路约 (n−1)!/2 条，逐一算权取最短。
旧笔记标注 2024.04 真题：4 点 A、B、C、D 从 A 出发，回路 (4−1)!/2=3 条，逐一算和取最小。

```err
"游遍各点回到起点的最短路线"→ 哈密顿应用题——别套最小生成树（MST 是树、无回路）。
```

**来源**：旧版思维导图·第九章考点12（2024.04 为旧笔记自标年份）

### 考点13：全章速记图（图形版）

#### 考点13.1 一图总览

旧版思维导图的图形版速记图，与章首树状速记图同源——考前过一遍图即可唤起全章框架。

```d
<svg role="img" aria-label="第九章知识速记图：欧拉与哈密顿、平面图公式卡、树与m叉树速算、二叉树遍历与表达式、最小生成树与旅行商" viewBox="0 0 780 772" style="display:block;max-width:780px;width:100%;margin:8px 0"><rect x="270.0" y="8.0" width="240" height="32" rx="7" fill="var(--card)" stroke="var(--accent)" stroke-width="2"/><text x="390" y="28.5" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--heading)">图的应用：两大回路问题</text><line x1="390" y1="40" x2="390" y2="56" style="stroke:var(--muted);stroke-width:1.5"/><line x1="250" y1="56" x2="530" y2="56" style="stroke:var(--muted);stroke-width:1.5"/><line x1="250" y1="56" x2="250" y2="66" style="stroke:var(--muted);stroke-width:1.5"/><line x1="530" y1="56" x2="530" y2="66" style="stroke:var(--muted);stroke-width:1.5"/><rect x="95.0" y="66.0" width="310" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="250" y="90.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">欧拉问题：每条边恰一次回起点</text><text x="250" y="107.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">连通＋无奇点 ⇔ 欧拉图</text><text x="250" y="124.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">有奇度点 ⇒ 直接排除</text><rect x="375.0" y="66.0" width="310" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="530" y="90.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">哈密顿问题：每点恰一次回起点</text><text x="530" y="107.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">无充要判定（只能试走）</text><text x="530" y="124.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">Dirac：n≥3 且每点度≥n/2 ⇒ 存在</text><line x1="30" y1="160" x2="215" y2="160" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="160" x2="750" y2="160" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="164" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 平面图：一张公式卡 ——</text><rect x="130.0" y="175.0" width="520" height="74" rx="7" fill="var(--formula-bg)" stroke="var(--accent)" stroke-width="1.8"/><text x="390" y="199.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">欧拉公式：n−m+f＝2（连通平面图，f 含外部无限面）</text><text x="390" y="216.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--formula-text)">面的次数之和＝2m；每面≥3边 ⇒ 3f≤2m</text><text x="390" y="233.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--formula-text)">⇒ 简单平面图：m≤3n−6</text><rect x="20.0" y="257.0" width="350" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="281.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">K₅ 与 K₃,₃ 是最小非平面图</text><text x="195" y="298.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">怎么画都消不掉交叉</text><rect x="405.0" y="257.0" width="360" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="281.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">真题证明型：m＜30 ⇒ 必有顶点 d(v)＜5</text><text x="585" y="298.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">（反证＋握手定理＋m≤3n−6）</text><line x1="30" y1="334" x2="215" y2="334" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="334" x2="750" y2="334" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="338" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 树：连通＋无回路 ——</text><rect x="20.0" y="354.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="378.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">边数 m＝n−1</text><text x="195" y="395.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">总度数 Σdeg＝2(n−1)</text><text x="195" y="412.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">邻接矩阵非零元＝2(n−1)</text><rect x="405.0" y="354.0" width="360" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="378.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">叶：度＝1；分支节点：度＞1</text><text x="585" y="395.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">任意二叉树：叶 n₀＝二分支点 n₂＋1</text><line x1="30" y1="430" x2="215" y2="430" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="430" x2="750" y2="430" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="434" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— m 叉树速算（认结构，别背名字） ——</text><rect x="10.0" y="453.0" width="240" height="56" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="130" y="477.0" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">m 叉树</text><text x="130" y="494.0" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">每个节点最多分 m 叉</text><rect x="265.0" y="450.0" width="250" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="390" y="474.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">完全 m 叉树：分支点恰 m 孩</text><text x="390" y="491.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">l＝(m−1)i＋1</text><text x="390" y="508.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">n＝mi＋1</text><rect x="525.0" y="450.0" width="250" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="650" y="474.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">正则 m 叉树：叶全在同一层</text><text x="650" y="491.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">高 h（根第 1 层）：叶＝m^(h−1)</text><text x="650" y="508.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">高 5 正则三叉树：3⁴＝81</text><line x1="30" y1="542" x2="215" y2="542" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="542" x2="750" y2="542" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="546" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 二叉树遍历 ＋ 表达式 ——</text><rect x="20.0" y="562.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="586.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">先序＝根左右（第一个是根）</text><text x="195" y="603.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">中序＝左根右（根隔开两子树）</text><text x="195" y="620.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">后序＝左右根（最后一个是根）</text><rect x="405.0" y="562.0" width="360" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="586.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">表达式→树：最后运算符＝根</text><text x="585" y="603.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">左边＝左子树，右边＝右子树</text><text x="585" y="620.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">中序＝去括号抄原式；后序＝逆波兰式</text><line x1="30" y1="651" x2="215" y2="651" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><line x1="565" y1="651" x2="750" y2="651" style="stroke:var(--accent);stroke-width:1;stroke-dasharray:3 3"/><text x="390" y="655" text-anchor="middle" font-size="13.5" font-weight="bold" fill="var(--accent)">—— 最小生成树 vs 旅行商 ——</text><rect x="20.0" y="671.0" width="350" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="195" y="695.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">最小生成树：连通全部点的 n−1 条边</text><text x="195" y="712.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">Kruskal：权值从小到大，成圈舍弃</text><text x="195" y="729.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">总权值最小——是树，无回路</text><rect x="405.0" y="671.0" width="360" height="74" rx="7" fill="var(--card)" stroke="var(--border-strong)" stroke-width="1.4"/><text x="585" y="695.5" text-anchor="middle" font-size="12.5" font-weight="bold" fill="var(--heading)">TSP：每城市恰一次＋回起点</text><text x="585" y="712.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">＝最短哈密顿回路（Kruskal 不能直接用）</text><text x="585" y="729.5" text-anchor="middle" font-size="12.5" font-weight="normal" fill="var(--text)">点少枚举 (n−1)!/2；点多用近似</text><text x="390" y="762" text-anchor="middle" font-size="11.5" font-weight="normal" fill="var(--tip)">⚠ 别混：最小生成树是「树」（无回路），TSP 是「回路」——审题先看清回不回起点</text></svg>
```

**来源**：旧版思维导图·第九章知识速记图
