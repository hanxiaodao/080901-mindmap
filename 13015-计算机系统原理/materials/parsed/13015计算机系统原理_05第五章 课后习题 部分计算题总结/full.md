## 13015 计算机系统原理

第五章 课后习题 计算题讲解(部分)

讲师/公众号：小飞学长Pro

5. 假设一个程序重复完成将磁盘上一个4KB的数据块读出，进行相应处理后，写回到磁盘的另外一个数据区。各数据块内信息在磁盘上连续存放，数据块随机位于磁盘的一个磁道上。磁盘转速为每分钟7200转，平均寻道时间为10ms，磁盘最大内部数据传输率为40MB/s，磁盘控制器的开销为2ms，没有其他程序使用磁盘和处理器，并且磁盘读/写操作和磁盘数据的处理时间不重叠。若程序对磁盘数据的处理需要20000个时钟周期，处理器时钟频率为500MHz，则该程序完成一次数据块“读出—处理—写回”操作所需的时间为多少？每秒钟可以完成多少次这样的数据块操作？

解析：

前置知识：

① 磁盘存储器的平均存取时间主要包括\_\_寻道时间\_\_、\_\_旋转等待时间\_\_和\_\_数据传输时间\_\_三个部分

② 平均旋转延迟(旋转等待时间) = 旋转半圈的时间

由题目可知：平均寻道时间时间为10ms，没有旋转等待时间和数据传输时间，求这两个时间

(1) 计算旋转等待时间

磁盘转速为每分钟7200转，那么每秒转数为7200÷60=120转，转一圈的时间：1÷120=8.33ms，转半圈的时间：$8 . 3 3 \div 2 = 4 . 1 7 \mathrm { m s }$

(2) 计算数据传输时间

数据块大小为4KB，磁盘最大内部数据传输率为40MB/s，可得数据传输时 $\mathtt { J } = 4 \mathsf { K B } / 4 0 \mathsf { M B } / \mathsf { s } = 0 . 1 \mathsf { m s }$

公众号：小飞学长Pro

总时间=读时间+处理时间+写时间=16.27+0.04+16.27=32.58ms

## 解析：

前置知识：

① 磁盘存储器的平均存取时间主要包括\_\_寻道时间\_\_、\_\_旋转等待时间\_\_和\_\_数据传输时间\_\_三个部分

② 平均旋转延迟(旋转等待时间) = 旋转半圈的时间

(3) 计算一次磁盘读/写操作时间（磁盘控制器的开销是2ms）

寻道时间+旋转等待时间+数据传输时间 + 磁盘控制器的开销=10+4.17+0.1+2=16.27ms

(4) 计算数据处理时间（处理器时钟频率为500MHz，即每秒500×10<sup>6</sup>个时钟周期）

```html
时间=时钟周期数/时钟频率=20000/500MHz=20000/(500×10<sup>6</sup>)=0.04ms
```

(5) 计算该程序完成一次数据块“读出 - 处理 - 写回”操作所需的时间

(6) 计算每秒钟可以完成这样的数据块操作次数

公众号：小飞学长Pro

6. 现代计算机中，SRAM一般用于实现快速小容量的 cache，而 DRAM 用于实现慢速大容量的主存。以前超级计算机通常不提供cache，而是用SRAM来实现主存（如Cray 巨型机)，请问：如果不考虑成本，你还这样设计高性能计算机吗？为什么？

解析：不会。

其理由主要有以下两个方面：

① 主存越大越好，主存大，缺页率降低，因而减少了访问磁盘所需的时间。DRAM芯片的集成度比SRAM芯片高得多，因而用DRAM芯片比用SRAM芯片构成的主存容量大得多。

② 程序访问的局部性特点使得cache的命中率很高，因而CPU访问的主要是cache，对主存的访问不多，而且现代DRAM芯片中也有SRAM构成的高速缓存区。因此即使主存没有用快速的SRAM芯片而用DRAM芯片，也不会对存储访问速度有多大影响。

公众号：小飞学长Pro

8. 假设某计算机主存地址空间大小为1GB，按字节编址，cache的数据区（即不包括标记、有效位等存储区）有64KB，块大小为32B，采用直接映射和通写（Write-Through）方式。回答下列问题。

(1)主存地址多少位？如何划分？要求说明每个字段的含义、位数和在主存地址中的位置。

(2) cache 的总容量为多少位?

## 解析：

(1) ① 确定主存地址位数，主存空间大小为1GB，所以 $\log _ { 2 } ( 1 \times 1 0 2 4 \times 1 0 2 4 \times 1 0 2 4 ) = 3 0 ( 1 \div$

② 确定块内地址位数，主存块大小为32B，所以 $\log _ { 2 } 3 2 = 5 \sqrt { \frac { 1 } { 1 1 } }$

③ 确定cache行号位数，cache数据区大小为64KB，主存块大小为32B，所以64KB/32B=2048行，所以 $\log _ { 2 } 2 0 4 8 = 1 1 1$ 位

④ 确定标记位数； $\textcircled { 1 } - \textcircled { 2 } - \textcircled { 3 } = 1 4 1 \frac { 1 } { 1 }$

综上所述，主存地址共有以下三个字段：高14位为标记，中间11位为cache行号，低5位为块内地址

(2) 每个cache行除用于存放主存块外，还有有效位、标记以及修改位和使用位（如LRU位）等控制位。

由题可知采用直接映射和通写方式，所以无需使用位和修改位，那就剩下有效位和标记了

即：每个cache行中包含1位有效位、14位标记位和32B的数据

因此，cache总容量为 $2 0 4 8 \times ( 1 + 1 4 + 3 2 \times 8 ) \mathrm { b } = 5 5 5 0 0 8$ 位。

公众号：小飞学长Pro

9. 假设某计算机的cache共16行，开始为空，主存块大小为1个字，采用直接映射方式，按字编址。CPU执行某程序时，依次访问以下地址序列：2，3，11，16，21，13，64，48，19,11,3,22,4,27，6和11。回答下列问题。

(1) 访问上述地址序列得到的命中率是多少？

(2)若cache数据区容量不变，而块大小改为4个字，则上述地址序列的命中情况又如何？

## 解析：

因为主存块大小是1个字，所以每个块只包含一个字，也就是说每个地址对应一个唯一的块（直接映射）这里的地址是按字编址的，所以每个地址对应一个不同的块。

这里块大小是1字，主存块号 = 地址 / 1 ，所以：主存块号 = 地址

得到映射公式为：cache行号 = 主存块号 mod cache行(16)。只有一次命中！命中率为1/16=6.25%

<table><tr><td rowspan=1 colspan=1>地址序列</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>11</td><td rowspan=1 colspan=1>16</td><td rowspan=1 colspan=1>21</td><td rowspan=1 colspan=1>13</td><td rowspan=1 colspan=1>64</td><td rowspan=1 colspan=1>48</td><td rowspan=1 colspan=1>19</td><td rowspan=1 colspan=1>11</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>22</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>27</td><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>11</td></tr><tr><td rowspan=1 colspan=1>主存块号</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>11</td><td rowspan=1 colspan=1>16</td><td rowspan=1 colspan=1>21</td><td rowspan=1 colspan=1>13</td><td rowspan=1 colspan=1>64</td><td rowspan=1 colspan=1>48</td><td rowspan=1 colspan=1>19</td><td rowspan=1 colspan=1>11</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>22</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>27</td><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>11</td></tr><tr><td rowspan=1 colspan=1>cache行号</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>11</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>13</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>11</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>11</td><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>11</td></tr><tr><td rowspan=1 colspan=1>命中</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>J</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>×</td><td rowspan=1 colspan=1>×</td></tr></table>

公众号：小飞学长Pro

9. 假设某计算机的cache共16行，开始为空，主存块大小为1个字，采用直接映射方式，按字编址。CPU执行某程序时，依次访问以下地址序列：2，3，11，16，21，13，64，48,19,11,3,22,4,27,6和11。回答下列问题。

(1) 访问上述地址序列得到的命中率是多少？

(2)若cache数据区容量不变，而块大小改为4个字，则上述地址序列的命中情况又如何？

## 解析：

(2) 数据块大小改为4个字，cache最多能存放16个字（16×1）的数据，因此cache行 = 16/4 = 4行；  
每个主存块对应4个字，所以，主存块号 = 地址 / 4，cache行号 = 主存块号 mod cache行(4) 。

共命中4次，命中率为4/16=25%。

数据块变大后，命中率提高了，其原因在于块变大后空间局部性得到更大发挥。

<table><tr><td rowspan=1 colspan=1>地址序列</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>11</td><td rowspan=1 colspan=1>16</td><td rowspan=1 colspan=1>21</td><td rowspan=1 colspan=1>13</td><td rowspan=1 colspan=1>64</td><td rowspan=1 colspan=1>48</td><td rowspan=1 colspan=1>19</td><td rowspan=1 colspan=1>11</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>22</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>27</td><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>11</td></tr><tr><td rowspan=1 colspan=1>主存块号</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>16</td><td rowspan=1 colspan=1>12</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>2</td></tr><tr><td rowspan=1 colspan=1>cache行号</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>2</td></tr><tr><td rowspan=1 colspan=1>命中</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>J</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>J</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>J</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>J</td><td rowspan=1 colspan=1>X</td></tr></table>

公众号：小飞学长Pro

14. 假设某计算机的主存地址空间大小为64MB，按字节编址。其cache数据区容量为4KB，采用4路组相联映射、LRU替换算法和回写（Write Back）策略，块大小为64 B。请问：

(1)主存地址字段如何划分？要求说明每个字段的含义、位数和在主存地址中的位置。

(2)该 cache的总容量有多少位?

(3)假设cache初始为空，CPU依次从0号地址单元顺序访问到4344号单元，重复按此序列共访问16次。若cache命中时间为1个时钟周期，缺失损失为10个时钟周期，则CPU访存的平均时间为多少时钟周期？

## 解析：

(1) ① 确定主存地址位数，主存空间大小为64MB，所以 $\log _ { 2 } ( 6 4 \times 1 0 2 4 \times 1 0 2 4 ) = 2 6 / 1 1$

② 确定块内地址位数， 主存块大小为64B，所以 $\log _ { 2 } 6 4 = 6 \sqrt { \frac { 1 } { 1 } }$

③ 确定cache组号位数， cache数据区大小为4KB，主存块大小为64B，所以4KB/64B=64行，4路组相联，所以有  
64/4=16组， $\log _ { 2 } 1 6 = 4 / \frac { 1 } { 1 }$

## ④ 确定标记位数； $\textcircled { 1 } - \textcircled { 2 } - \textcircled { 3 } = 1 6 1 \frac { 1 } { 1 }$

综上所述，主存地址共有以下三个字段：高16位为标记，中间4位为cache组号，低6位为块内地址

(2) 每个cache行除用于存放主存块外，还有有效位、标记以及修改位和使用位（如LRU位）等控制位。由题可知采用回写策略，所以要有1位修改位；因为每组有4行，所以每行有两位LRU使用位 $( 2 ^ { \land } 2 = 4 )$ ，那就剩下有效位和标记了，即：每个cache行中包含16位标记位、1位有效位、1位修改位、2位使用位和64B的数据公众号：小飞学长Pro因此，cache总容量为 $1 6 4 \times ( 1 6 + 1 + 1 + 2 + 6 4 \times 8 ) = 3 4 0 4 8$ 位。

16. 已知cache1采用直接映射方式，共16行，块大小为1个字，缺失损失为8个时钟周期；cache2也采用直接映射方式，共4行，块大小为4个字，缺失损失为11个时钟周期。假定开始时 cache为空，采用字编址方式。要求找出一个访问地址序列，使得cache2具有更低的缺失率，但总的缺失损失反而比 cache1大。

## 解析：

假设cache1和cache2的缺失次数分别为x和y

根据题意，cache2总的缺失损失反而比cache1大，可得：11y > 8x

例如，x=4，y=3，带入上式：11×3 > 8×4，即：33 > 32，满足题目要求

对于以下访问地址序列：0，1，4，8，cache1缺失4次，而cache2缺失3次；

对于cache1：因为块大小为1个字，每次访问不同地址都缺失

对于cache2：因为块大小为4个字，第一次访问0时缺失，加载0-3 这4个字，再次访问1就命中

<table><tr><td rowspan=1 colspan=1>地址序</td><td rowspan=1 colspan=1>列0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>8</td></tr><tr><td rowspan=1 colspan=1>cache1</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>X</td></tr><tr><td rowspan=1 colspan=1>cache2</td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>X</td></tr></table>

公众号：小飞学长Pro

## 谢谢大家