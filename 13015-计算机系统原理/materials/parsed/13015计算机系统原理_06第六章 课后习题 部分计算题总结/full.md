## 13015 计算机系统原理

第六章 课后习题 计算题讲解(部分)

讲师/公众号：小飞学长Pro

## 13015 计算机系统原理【第六章课后题】

7. 若前端总线（FSB） 的工作频率为1333 MHz（实际时钟频率为333MHz)，总线宽度为64位，则总线带宽为多少？若存储器总线为三通道总线，总线宽度为64位，内存条的型号为DDR3-1333，则整个存储器总线的总带宽为多少？若内存条型号改为DDR3-1066，则存储器总线的总带宽又是多少？

答：

1333MHz总线带宽：工作频率 × 数据宽度[B] = 1333MHz × 64/8B = 10664MB/s =

10.664GB/s

DDR3-1333的存储器总线的总带宽：

= 总线带宽 × 通道数

$$
= 1 0 . 6 6 4 \mathrm { G B } / { \mathsf { s } } \times 3 = \ 3 1 . 9 9 2 \mathrm { G B } / { \mathsf { s } }
$$

DDR3-1066的存储器总线的总带宽：

= 总线带宽 × 通道数

= 工作频率 × 数据宽度[B] × 通道数

## 13015 计算机系统原理【第六章课后题】

8. 总线的速度通常指每秒钟传输多少次，例如，QPI总线的速度单位为GT/s，表示每秒钟传输多少个10亿 $( \mathrm { ~ 1 ~ G = 1 0 ^ { 9 } ~ } )$ 次。若QPI总线的时钟频率为2.4GHz，则其速度为多少？总带宽是多少 GB/s?QPI 总线的速度也称为 QPI频率，QPI频率为6.4 GT/s 时的总带宽是多少？

答：

1）速度 $= 2 . 4 \mathsf { G H z } \times 2 = 4 . 8 \mathsf { G H z } = 4 . 8 \mathsf { G T / s }$ (因为QPI总线每个时钟周期传送两次数据)

2）总带宽 = 每秒传输次数 × 每次传输的有效数据[B] × 2= 4.8GT/s × 16/8B × 2 = 19.2GB/s

3）总带宽 = 每秒传输次数 × 每次传输的有效数据[B] × 2= 6.4GT/s × 16/8B × 2 = 25.6GB/s

备注：因为每次传送16位有效数据，且为双向同时传送

## 13015 计算机系统原理【第六章课后题】

9. PCI-e 总线采用串行传输方式，PCI-e×n 表示具有 n 个通路的 PCI-e链路。PCI-e1.0规范支持通路中每个方向的发送或接收速率为2.5 Gb/s，则 PCI-e1.0×8 和PCI-e 1.0×32的总带宽分别为多少？

答：

$$
\begin{array} { r l } & { \mathsf { P C l \mathrm { - } e } \ 1 . 0 \times \mathsf { 8 } \ \frac { \mathrm { \# } \mathsf { H } \div \mathsf { E } \mathsf { \tilde { s } } } { \mathrm { \# } \mathsf { B } / \mathsf { S } } = 2 . 5 \mathsf { G b } / \mathsf { s } \times 2 \times \mathsf { 1 } \boxed { \mathsf { H } \mathsf { 1 } \dot { \mathbf { E } } \equiv \mathsf { 3 } \mathrm { \# } } \ \langle \ 1 0 \quad } & { \left[ \frac { \mathsf { 4 } \mathbb { s } \mathbb { H } \div \dot { \mathbf { H } } \div \mathsf { H } \div \mathsf { H } \div \mathsf { H } \div \mathsf { H } \mathsf { S } } { \mathrm { \# } \mathsf { B } / \mathsf { S } } \right] } \\ & { = 2 . 5 \mathsf { G b } / \mathsf { s } \times 2 \times 8 \ / \mathsf { 1 0 } } \\ & { = 4 \mathbb { G B } / \mathsf { s } } \end{array}
$$

方法一：

$$
\begin{array} { r l } & { \mathsf { P C I \mathrm { - } e } \ 1 . 0 \times \ 3 2 \ \frac { \mathrm { i } + \mathrm { i } \cdot \mathrm { s } \mathrm { \# } 3 } { \mathsf { P H } \cdot \mathrm { B } } = 2 . 5 \ \mathsf { G b } / { \mathsf { s } } \times \mathsf { 2 } \times \frac { \mathsf { \mu } _ { 1 } \cdot \mathsf { S i a s } \ \mathsf { \# } 1 } { \mathsf { E q } \cdot \mathrm { B } } / \ 1 0 \quad \left[ \frac { \mathrm { i } \ \mathsf { s } \ \mathrm { \# } \mathrm { \# } \cdot \mathrm { i } \cdot \mathrm { \# } } { \mathsf { H } \cdot \mathrm { H } } \pm \frac { \mathsf { \mu } _ { 1 } \cdot \mathsf { S i a s } } { \mathsf { E q } \cdot \mathrm { B } } \right] } \\ & { \phantom { \mathsf { P C I } \cdot \mathrm { e } } = 2 . 5 \ \mathsf { G b } / { \mathsf { s } } \times \mathsf { 2 } \times 3 2 \ / \ 1 0 } \\ & { \phantom { \mathsf { P C I } \cdot \mathrm { e } } = 1 6 \mathsf { G B } / { \mathsf { s } } } \end{array}
$$

方法二：由于PCI-e 1.0 × 32 和 PCI-e 1.0 × 8 都是PCI-e 1.0，不同的就是通道数。前者是后者是4倍，4GB/s × 4 = 16GB/s

## 谢谢大家