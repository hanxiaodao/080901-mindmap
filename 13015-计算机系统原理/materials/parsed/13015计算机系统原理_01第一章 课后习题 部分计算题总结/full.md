## 13015 计算机系统原理

第一章 课后习题 计算题讲解(部分)

讲师/公众号：小飞学长Pro

## 13015 计算机系统原理【第一章课后题】

7. 若机器M1和M2具有相同的指令集，其时钟频率分别为1GHz和1.6GHz。在指令集中有5种不同类型的指令A\~E。下表给出了在M1和M2上每类指令的平均时钟周期数CPI。

<table><tr><td rowspan=1 colspan=1>机器</td><td rowspan=1 colspan=1>A</td><td rowspan=1 colspan=1>B</td><td rowspan=1 colspan=1>C</td><td rowspan=1 colspan=1>D</td><td rowspan=1 colspan=1>E</td></tr><tr><td rowspan=1 colspan=1>M1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>4</td></tr><tr><td rowspan=1 colspan=1>M2</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>6</td></tr></table>

请回答下列问题：

(1) M1 和 M2 的峰值 MIPS 各是多少?

(2)假定某程序P的指令序列中，5种指令具有完全相同的指令条数，则程序P在M1和M2上运行时，哪台机器更快？快多少？在M1和M2上执行程序P时的平均时钟周期数CPI各是多少？

## 13015 计算机系统原理【第一章课后题】

<table><tr><td rowspan=1 colspan=1>机器</td><td rowspan=1 colspan=1>A</td><td rowspan=1 colspan=1>B</td><td rowspan=1 colspan=1>C</td><td rowspan=1 colspan=1>D</td><td rowspan=1 colspan=1>E</td></tr><tr><td rowspan=1 colspan=1>M1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>4</td></tr><tr><td rowspan=1 colspan=1>M2</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>6</td></tr></table>

答：

1）计算峰值MIPS时应选择CPI最少的指令时的性能，MIPS 的计算公式为：

所以：

$$
\mathrm { M I P S } = { \frac { \mathbb { H } \mathbb { f } \mathbb { f } \mathbb { H } { \frac { \mathrm { d e } } { \hbar } } \left( \mathrm { H z } \right) } { \mathrm { C P I } \times 1 0 ^ { 6 } } }
$$

在M1上可选择一段全部由A类指令组成的程序，M1的CPI最小为1（A类指令）

其峰值MIPS： $1 \mathsf { G H z } / ( 1 \times 1 0 ^ { 6 } ) = 1 0 0 0 \mathsf { M P S }$

在M2上可选择一段全部由A类和B类指令组成的程序，M2的CPI最小为2（A类和B类指令）

其峰值MIPS： $1 . 6 \mathsf { G } \mathsf { H } z / \left( 2 \times 1 0 ^ { 6 } \right) = 8 0 0 \mathsf { M } \mathsf { P } \mathsf { S }$

## 13015 计算机系统原理【第一章课后题】

2）由题可知：5种指令具有完全相同的指令条数，对于程序P，每类指令的条数均占1/5，故：

<table><tr><td rowspan=1 colspan=1>A</td><td rowspan=1 colspan=1>B</td><td rowspan=1 colspan=1>C</td><td rowspan=1 colspan=1>D</td><td rowspan=1 colspan=1>E</td></tr><tr><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>4</td></tr><tr><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>6</td></tr></table>

当然，不能根据以上结果说明程序P在M1上运行更快，因为M1和M2的时钟频率不同。

假设程序P的指令条数为N，P 在 M1 上的执行时间： $2 . 4 \times \mathsf { N } \div 1 \mathsf { G } = 2 . 4 \mathsf { N } \left( \mathsf { n s } \right)$

P 在 M2 上的执行时间： $3 . 8 \times \mathsf { N } \div 1 . 6 \mathsf { G } = 2 . 3 7 5 \mathsf { N } ( \mathsf { n s } )$

由此可知，对于程序P来说，M2的执行速度更快，每条指令平均快 $2 . 4 - 2 . 3 7 5 = 0 . 0 2 5 \cap 5 .$

## 【公式】

程序总时钟周期数 = 程序总指令条数 × CPI

综合/平均CPI = 程序总时钟周期数 ÷ 程序总指令条数

用户CPU 时间 = 程序总时钟周期数 ÷ 时钟频率 = 程序总时钟周期数 × 时钟周期

## 13015 计算机系统原理【第一章课后题】

8. 假设同一套指令集用不同的方法设计了两种机器M1 和M2。机器M1 的时钟周期为0.8ns，机器 M2的时钟周期为1.2 ns。某程序 P 在机器 M1上运行时的 CPI为 4，在 M2上的CPI为2。对于程序P来说，哪台机器的执行速度更快？快多少？

答：

假设指令条数 N 相同（因为同一程序P、同一套指令集）

P 在 M1 上的执行时间： $4 \times \mathsf { N } \times 0 . 8 = 3 . 2 \mathsf { N } \left( \mathsf { n s } \right)$

P 在 M2 上的执行时间： $2 \times \mathsf { N } \times 1 . 2 = 2 . 4 \mathsf { N } \left( \mathsf { n s } \right)$

由此可知，对于程序P来说，M2的执行速度更快，平均每条指令快 $3 . 2 \cdot 2 . 4 = 0 . 8 \mathsf { n s } .$

【公式】

程序总时钟周期数 = 程序总指令条数 × CPI

综合CPI = 程序总时钟周期数 ÷ 程序总指令条数

$$
H P  C P U ( H _ { 2 } ^ { + } ) \vert \overrightarrow { 1 } \vert = \frac { 4 \pi } { 1 + 2 } \sqrt { 3 } \cdot \sin \vert \sqrt { 4 } \cdot \frac { 1 } { 4 } \sqrt { 1 + \frac { 1 } { 2 } \sqrt { 3 } \times 4 } \times : \mathrm { H } + \frac { 1 } { 4 } \frac { 1 } { 1 + \frac { 1 } { 2 } \sqrt { 3 } \times 4 } \cos \frac { 4 \pi } { 1 + 2 } = \frac { 4 \pi } { 1 + 2 } \frac { 1 } { 3 \pi } \frac { 1 } { 1 + \frac { 1 } { 2 } \sqrt { 3 } \times 4 } \mathrm { H } + \frac { 1 } { 1 + \frac { 1 } { 2 } \sqrt { 3 } \times 4 } \times : \mathrm { H } + \frac { 1 } { 1 + \frac { 1 } { 2 } \sqrt { 3 } \times 4 } \times \frac { 1 } { 1 + \frac { 1 } { 2 } \sqrt { 3 } \times 4 }
$$

## 13015 计算机系统原理【第一章课后题】

9. 假设某机器M的时钟频率为4GHz，用户程序P在M上的指令条数为 $\mathrm { 8 \times 1 0 ^ { 8 } }$ ，其CPI为1.25，则P在M上的执行时间是多少？若在机器M上从程序P开始启动到执行结束所需的时间是4s，则P的用户CPU时间所占的百分比是多少？

答：【2504考期原题】

## 13015 计算机系统原理【第一章课后题】

10. 假定某编译器对某段高级语言程序编译生成两种不同的指令序列S1 和 S2，在时钟频率为500MHz的机器M上运行，目标指令序列中用到的指令类型有A、B、C和D四类。四类指令在M上的CPI和两个指令序列所用的各类指令条数如下表所示。

<table><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>A</td><td rowspan=1 colspan=1>B</td><td rowspan=1 colspan=1>C</td><td rowspan=1 colspan=1>D</td></tr><tr><td rowspan=1 colspan=1>各指令的 CPI</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>4</td></tr><tr><td rowspan=1 colspan=1>S1的指令条数</td><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1>S2 的指令条数</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>5</td></tr></table>

请问S1和S2各有多少条指令？CPI各为多少？所含的时钟周期数各为多少？执行时间各为多少？

## 13015 计算机系统原理【第一章课后题】

答：

1）S1有 5+2+2+1=10 条指令，所含的时钟周期数为 $5 \times 1 + 2 \times 2 + 2 \times 3 + 1 \times 4 = 1 9$ CPI为 19 ÷ 10 = 1.9，执行时间为 $1 9 \div ( 5 0 0 \times 1 0 ^ { 6 } ) \ : 5 = 3 8 \mathsf { n s } _ { \circ }$

2）S2有 1+1+1+5=8 条指令，所含的时钟周期数为 $1 \times 1 + 1 \times 2 + 1 \times 3 + 5 \times 4 = 2 6$ CPI为 $2 6 \div 8 = 3 . 2 5$ ，执行时间为 $2 6 \div ( 5 0 0 \times 1 0 ^ { 6 } ) \mathsf { s } = 5 2 \mathsf { n s } .$

<table><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>A</td><td rowspan=1 colspan=1>B</td><td rowspan=1 colspan=1>C</td><td rowspan=1 colspan=1>D</td></tr><tr><td rowspan=1 colspan=1>各指令的CPI</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>4</td></tr><tr><td rowspan=1 colspan=1>S1的指令条数</td><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1>S2 的指令条数</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>5</td></tr></table>

【公式】

程序总时钟周期数 = 程序总指令条数 × CPI

综合/平均CPI = 程序总时钟周期数 ÷ 程序总指令条数

用户CPU 时间 = 程序总时钟周期数 ÷ 时钟频率 = 程序总时钟周期数 × 时钟周期

## 13015 计算机系统原理【第一章课后题】

11. 假定机器M的时钟频率为400 MHz，某程序P 在机器 M上的执行时间为 12.000 s。对P优化时，将其所有的乘4指令都换成了一条左移两位的指令，得到优化后的程序P′。已知在M上乘法指令的 CPI为102，左移指令的CPI为2，P′的执行时间为11.008s，则P中有多少条乘法指令被替换成了左移指令被执行？

## 答：

1）程序P比P'多用了12.000-11.008=0.992s，即多400M×0.992=396.8M个时钟周期

2）102-2=100，即每条乘法指令比左移指令多100个时钟周期

3）因为396.8M/100=3.968M=3.968×10<sup>6</sup>=3968000，即有3968000条乘法指令被替换为左移指令执行。

## 谢谢大家