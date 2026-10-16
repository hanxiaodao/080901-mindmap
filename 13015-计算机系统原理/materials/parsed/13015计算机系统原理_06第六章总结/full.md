## 13015 计算机系统原理

第六章 程序中I/O操作的实现

## 13015 计算机系统原理【第六章考点解析】

## 复习一下 时钟周期和时钟频率关系

时钟周期和时钟频率是互为倒数的关系：

时钟周期 = 1 / 时钟频率，单位：通常为秒（s）、纳秒（ns）等；【时间单位】

时钟频率 = 1 / 时钟周期，单位：通常为赫兹（Hz）、兆赫兹（MHz）、吉赫兹（GHz）等。

## 举例：

若时钟频率为 1 GHz（即 10⁹ Hz），则：时钟周期 $= 1 / 1 0 ^ { 9 } \mathsf { H z } = 1$ 纳秒（ns）。

若时钟周期为 1 纳秒（即 10<sup>-9</sup> 秒），则：时钟频率 = 1 / 10<sup>-9</sup> 秒 = 1 GHz。

## 13015 计算机系统原理【第六章考点解析】

## 考点1 处理器总线 — 前端总线FSB

前端总线（Front Side Bus，FSB）的传输速率单位实际上是 MT/s，表示每秒钟传输多少兆次。

1）传输速率：单位：MT/s

2）时钟频率：单位：MHz 习惯称呼 （MHz = MT/s）

3）工作频率：时钟频率 × 倍数 （默认：1） 从 Pentium Pro 开始，FSB 采用 4 倍并发技术当倍数=1时，工作频率 = 时钟频率 = 传输速率

4）总线带宽：工作频率 × 数据宽度[B]

【2504-28题(1)】：若前端总线 (FSB) 的时钟频率为 333MHz，采用 4 倍并发技术传输数据，总线数据宽度为 64 位，则工作频率和总线带宽各为多少？

答：

工作频率：时钟频率 $\times 1 _ { \square \cdots } ^ { \square \cdots } \square = 3 3 3 \mathsf { M H z } \times 4 = 1 3 3 2 \mathsf { M H z }$

总线带宽：工作频率 × 数据宽度[B] = 1332MHz × 64/8B = 10.656GB/s

## 13015 计算机系统原理【第六章考点解析】

## 考点2 处理器总线 — QPI总线

在每次传输的 20 位数据中（有效数据占 16 位，其余 4 位用于循环冗余校验），以提高系统的可靠性。

由于 QPI总线 是双向的，在发送的同时也可以接收另一端传输的数据

所以每个时钟周期传输两次。

$$
\mathbb { Q } \mathbb { P } | \operatorname* { l i m } _ { t \leq n } \frac { 1 } { 2 } \sum _ { k = 1 } ^ { n + 1 } ( 1 ) ^ { \frac { 1 } { n + 1 } - \frac { 1 } { 2 k } } = \frac { 1 } { ( 2 k ) ! } \mathbb { P } | \Xi _ { k } \mathbb { P } | \mathbb { X } ^ { \frac { 1 } { n + 1 } - \frac { 1 } { 2 k } } \mathbb { X } \times \mathbb { P } | \Xi _ { k } \mathbb { P } | \Xi _ { k } \mathbb { P } | \Xi _ { k } \mathbb { P } | \mathbb { B } | \times 2
$$

【2504-28题(2)】：若 QPI 总线时钟频率为 2.4GHz，每个时钟周期传输 2 次数据，其有效数据为 16 位，则其速度为多少 GT/s？工作频率是多少？总带宽是多少？

答：

1）速度 $= 2 . 4 \mathsf { G H z } \times 2 = 4 . 8 \mathsf { G H z } = 4 . 8 \mathsf { G T } / \mathsf { s }$ (因为QPI总线每个时钟周期传送两次数据)

2）工作频率 = 速度 = 4.8GT/s

3） $\stackrel { \scriptscriptstyle \pm + } { \scriptscriptstyle \Xi \wedge \bar { \Gamma } } \stackrel { \scriptscriptstyle \pm + } { \scriptscriptstyle \perp \bar { \Delta } } = 4 . 8 \mathsf { G T } / 5 \times 1 6 / 8 \mathsf { B } \times 2 = 1 9 . 2 \mathsf { G B } / 5$

## 13015 计算机系统原理【第六章考点解析】

## 考点3 存储器总线

1）传输速率：单位：MT/s

2）时钟频率：单位：MHz 习惯称呼 （MHz = MT/s）

3）工作频率：时钟频率 × 倍数 （默认：1） 从 Pentium Pro 开始，FSB 采用 4 倍并发技术当倍数=1时，工作频率 = 时钟频率 = 传输速率

4）总线带宽：工作频率 × 数据宽度[B] = 传输速率 × 数据宽度[B]

5）总带宽：总线带宽 × 通道数

【例题】：存储器总线宽度为 64 位，每秒传输 1066 M 次，总线带宽是多少？ 3 个通道的总带宽是多少？

答：

总线带宽：工作频率 × 数据宽度 $[ \mathsf { B } ] = 1 0 6 6 \mathsf { M T } / \mathsf { s } \times 6 4 / 8 \mathsf { B } = 8 . 5 2 8 \mathsf { G B } / \mathsf { s }$

总带宽：总线带宽 $\times 1 5 2 5 2 \div 2 8 5 2 8 8 8 \times 3 = 2 5 . 5 8 4 5 8 \times 5$

## 13015 计算机系统原理【第六章考点解析】

考点4 I/O总线 — PCI-e总线

PCI - e 总线采用串行传输方式。PCI-e×n 表示具有 n 个通路的 PCI-e 链路。

1）PCI-e 1.0 和 PCI-e 2.0 采用 8b/10b 编码方案（将每 8 位数据编码成 10 位）。

2）PCI-e 3.0、PCI-e 4.0 和 PCI-e 5.0 采用 128b/130b 编码方案。

$$
\begin{array} { r l } & { \mathsf { P C l } \mathrm { - } \mathsf { e } ^ { - \frac { \mathrm { i } \hbar + \hbar \omega } { \hbar \hbar \omega } } = \mathit { f } \frac { 4 \hbar } { 4 } \frac { \hbar \omega } { \hbar \omega } \frac { \hbar \omega } { 2 } \frac { \hbar \omega } { 2 } \times 2 \times \frac { \hbar \omega } { 2 \hbar \omega } \frac { \hbar \omega } { 2 \sqrt { \omega } } \times \frac { \hbar \omega } { 2 } \frac { \hbar \omega } { 1 2 } \frac { \hbar \omega } { 2 \sqrt { \omega } } \times \frac { \hbar \omega } { 2 } \frac { \hbar \omega } { 2 } \left( \mathcal { B } , \quad \left( \frac { \mathrm { i } \hbar + \hbar \omega } { 2 } ; \begin{array} { c } { \mathsf { G B } / \mathsf { s } } \end{array} \right) \right) } \end{array}
$$

例题1：PCI-e 1.0 规范支持通路中每个方向的发送或接收速率为 2.5 Gb/s

$$
\begin{array} { r l } & { \mathbb { H } [ \bot \lambda ] \ \mathsf { P C l } - 1 . 0 \ \frac { + + \lambda + \lambda } { \mathsf { H } [ \lambda ] \mathsf { H } [ \bar { \lambda } ] } = \ \mathsf { \xi } \frac { 1 } { 4 } \frac { k \mathsf { H } \mathsf { H } [ \bar { \lambda } ] } { \mathsf { H } [ \bar { \lambda } ] } \frac { + k \mathsf { H } [ \bar { \lambda } ] } { \mathsf { H } [ \bar { \lambda } ] } \mathsf { H } \left( \frac { 3 } { \mathsf { H } } \right) } \\ & { \qquad = 2 . 5 \ \mathsf { G b } / \mathsf { s } \ \mathsf { x } \ 2 \mathsf { \ x } \ 8 / 1 0 \times 1 \ / \ 8 } \\ & { \qquad = 2 . 5 \ \mathsf { G b } / \mathsf { s } \ \mathsf { x } \ 2 \mathsf { \ x } \ \frac { 1 } { \mathsf { H } [ \bar { \lambda } ] } \frac { + k \mathsf { H } [ \bar { \lambda } ] } { \mathsf { E q } [ \bar { \lambda } ] } \ \frac { - \mathsf { H } [ \bar { \lambda } ] \mathsf { H } [ \bar { \lambda } ] } { \mathsf { H } [ \bar { \lambda } ] } \frac { - \mathsf { H } [ \bar { \lambda } ] } { \mathsf { H } [ \bar { \lambda } ] } \frac { + k \mathsf { H } [ \bar { \lambda } ] } { \mathsf { H } [ \bar { \lambda } ] } \frac { - \mathsf { H } [ \bar { \lambda } ] } { \mathsf { H } [ \bar { \lambda } ] } \frac { - \mathsf { H } [ \bar { \lambda } ] } { \mathsf { H } [ \bar { \lambda } ] } } \\ & { \qquad = 0 . 5 \mathsf { G B } / \mathsf { s } } \end{array}
$$

例题2：PCI-e 3.0 规范支持通路中每个方向的发送或接收速率为 8 Gb/s

所以 $\mathsf { P C l - e 3 . 0 ~ \frac { \scriptscriptstyle + + \ z \dot { \infty } } { \scriptscriptstyle \iint \bar { \mathbf { x } } \qquad \mathrm { = ~ 8 ~ G b / s \times ~ 2 \times ~ 1 2 8 / 1 3 0 \times ~ 1 \mathrm { ~ / ~ } 8 = ~ 1 . 9 6 9 G B / s } } }$

## 谢谢大家