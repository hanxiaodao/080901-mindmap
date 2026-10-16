## 13015 计算机系统原理

第二章 课后习题 计算题讲解(部分)

讲师/公众号：小飞学长Pro

## 13015 计算机系统原理

将十进制数67.375转换成IEEE754的32位标准浮点数的二进制格式，并写出其16进制数格式。

## 答：【2023年10月 - 02318计算机组成原理】

1）十进制数 67.375 转二进制128 64 32 16 8 421A. 整数 67 转二进制：1000011（67=64+2+1） 1 0 0 0 0 1 1B. 小数 0.375 转二进制：0.0110.375×2=0.75 → 整数部分为 0，小数部分为 0.750.75×2=1.5 → 整数部分为 1，小数部分为 0.50.5×2=1.0 → 整数部分为 1，小数部分为 0.0，小数部分为 0 ，转换结束。所以：1000011.011

## 13015 计算机系统原理

答：【2023年10月 - 02318计算机组成原理】

2）转为二进制的科学计数法，格式为：1.F × 2<sup>n</sup> ，1000011.011 → 1.000011011×2<sup>6</sup>

3）确定符号(1位)： 67.375 是正数，所以符号：0（0正，1负）

4）确定阶码(8位)： n+127[偏置常数]=6+127=133，转二进制为：10000101

5）确定尾数(23位)： 000011011000...000，（F，后面补0，补够23位）

6）所以结合3）4）5）IEEE754单精度浮点数的机器数为：010000101000011011000...000

7）四合一，转为十六进制：0100 0010 1000 0110 1100 0...0004286 C000H

## 13015 计算机系统原理

EEE754单精度浮点数的机器数为41A50000H，将其转换为十进制表示的实数。

答：【2022年4月 - 02318计算机组成原理】

1）41A50000H 转二进制： 0100 0001 1010 0101 0000 0000 0000 0000（1拆4）

3）确定符号(1位)： 0（正数）

4）确定阶码(8位)： 10000011，转十进制是(10000011)₂= (131)<sub>10</sub>，131-127[偏置常数]=4

5）确定尾数(23位)： 010 0101 0000 0000 0000 0000，0.010 0101

6）格式为： $1 . 5 \times 2 ^ { \mathsf { n } } , \quad 1 . 0 1 0 0 1 0 1 \times 2 ^ { 4 } = 1 0 1 0 0 . 1 0 1$

7）二进制转十进制： $( 1 0 1 0 0 . 1 0 1 ) _ { 2 } = ( 2 0 . 6 2 5 ) _ { 1 0 }$

【方法一】

<table><tr><td rowspan=1 colspan=1>二进制</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>■</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1>幂</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>-1</td><td rowspan=1 colspan=1>-2</td><td rowspan=1 colspan=1>-3</td></tr></table>

$1 \times 2 ^ { 4 } + 0 \times 2 ^ { 3 } + 1 \times 2 ^ { 2 } + 0 \times 2 ^ { 1 } + 0 \times 2 ^ { 0 } + 1 \times 2 ^ { - 1 } + 0 \times 2 ^ { - 2 } + 1 \times 2 ^ { - 3 }$ 【按权展开】

$$
= 1 6 + 0 + 4 + 0 + 0 + 0 . 5 + 0 + 0 . 1 2 5 = 2 0 . 6 2 5
$$

## 13015 计算机系统原理

EEE754单精度浮点数的机器数为41A50000H，将其转换为十进制表示的实数。

答：【2022年4月 - 02318计算机组成原理】

7）二进制转十进制：(10100.101)<sub>2</sub> = (20.625)<sub>10</sub>

【方法二】

<table><tr><td rowspan=1 colspan=1>128</td><td rowspan=1 colspan=1>64</td><td rowspan=1 colspan=1>32</td><td rowspan=1 colspan=1>16</td><td rowspan=1 colspan=1>83</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>. 0</td><td rowspan=1 colspan=1>.5 0</td><td rowspan=1 colspan=1>.25 0</td><td rowspan=1 colspan=1>.125</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td></tr></table>

= 16+4+0.5+0.125=20.625

## 13015 计算机系统原理【第二章课后题】

12. 设一个变量的值为4098，要求分别用32位补码整数和IEEE754单精度浮点格式表示该变量（结果用十六进制表示），并说明哪段二进制序列在两种表示中完全相同，为什么会相同？

## 答：

<table><tr><td rowspan=1 colspan=1>4096</td><td rowspan=1 colspan=1>2048</td><td rowspan=1 colspan=1>1024</td><td rowspan=1 colspan=1>512</td><td rowspan=1 colspan=1>256</td><td rowspan=1 colspan=1>128</td><td rowspan=1 colspan=1>64</td><td rowspan=1 colspan=1>32</td><td rowspan=1 colspan=1>16</td><td rowspan=1 colspan=1>8</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td></tr></table>

1）十进制数 4098 转二进制：1 0000 0000 0010（4098=4096+2）

2）转为二进制的科学计数法，格式为：1.F × 2<sup>n</sup> ，1000000000010 → 1.00000000001×2<sup>12</sup>

3）确定符号(1位)： 4098 是正数，所以符号：0（0正，1负）

4）确定阶码(8位)： n+127[偏置常数]=12+127=139，转二进制为：10001011

5）确定尾数(23位)： 00000000001000...000，（F，后面补0，补够23位）

6）所以结合3）4）5）IEEE754单精度浮点数的机器数为：01000101100000000001000...000

7）四合一，转为十六进制：0100 0101 1000 0000 0001 00 0...000

4580 1000H

## 13015 计算机系统原理【第二章课后题】

答：

<table><tr><td rowspan=1 colspan=1>4096</td><td rowspan=1 colspan=1>2048</td><td rowspan=1 colspan=1>1024</td><td rowspan=1 colspan=1>512</td><td rowspan=1 colspan=1>256</td><td rowspan=1 colspan=1>128</td><td rowspan=1 colspan=1>64</td><td rowspan=1 colspan=1>32</td><td rowspan=1 colspan=1>16</td><td rowspan=1 colspan=1>8</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td></tr></table>

1）十进制数 4098 转二进制：1 0000 0000 0010

对于正数，原码 = 反码 = 补码

用32位补码整数表示为：0000 0000 0000 0000 0001 0000 0000 0010

在上述两种表示中，存在相同的二进制序列 0000 0000 0010。

因为4098被转换为规格化浮点数后，有效数值部分中最前面的1被隐藏，其余数值部分为 00000000 0010，而4098的32位补码整数表示中保留了完整的有效数值部分，即最前面的1没有被隐藏，所以除了这个1之外后面的二进制序列 0000 0000 0010 是相同的。

## 谢谢大家