## 13015 计算机系统原理

第3章程序的转换及机器级表示

## 13015计算机系统原理【第3章考点解析】

## 考点1 指令

<table><tr><td>格式</td><td>4位</td><td>2位 2位</td><td></td><td>功能说明</td></tr><tr><td>R型</td><td>op</td><td>πt</td><td>TS</td><td>R[rt] ← R[rt] op R[rs] 或 R[rt] ← R[rs]</td></tr><tr><td>M型</td><td>op</td><td>addr</td><td></td><td>R[0]←M[addr]或M[addr] ←R[0]</td></tr></table>

图1.2 定长指令字格式

## op为操作码字段：

1） R型指令的 op 为0000定义为传送(mov)操作，op 为0001定义为加(add)操作

比如：指令0001 0001的功能为R[0]←R[0]+R[1]，表示将0号和1号寄存器内容相加的结果送0号寄存器。

2)M型指令的op 为1110定义为取数(load)操作，op 为1111定义为存数(store)操作。

比如：指令1110 0110的功能为 R[0]←M[0110]，表示将6 号主存单元（地址为0110)中的内容取到0号寄存器

## 13015计算机系统原理【第3章考点解析】

## 考点2 寄存器传送语言(Register Transfer Language， RTL)

R[r]：表示寄存器r的内容

M[addr]：表示存储单元 addr的内容

M[PC]：表示 PC 所指存储单元的内容

M[R[r]]：表示寄存器r的内容所指的存储单元的内容

AT&T格式指令：源，目的 顺序(本教材使用)

Intel格式指令：目的，源 逆序

传送方向用←表示，右：传送源，左：传送目的

例如：对于AT&T格式指令“movw 4(%ebp)，%ax”，其功能为 R[ax]←M[R[ebp]+4]

## 13015计算机系统原理【第3章考点解析】

## 考点3 指令系统设计风格

按指令格式的复杂度分以下两种：

1） CISC 风格指令系统（复杂指令集计算机，Complex Instruction Set Computer）例如：本书介绍的 Intel x86 指令系统就是典型的 CISC 架构

2） RISC 风格指令系统（精简指令集计算机，Reduced Instruction Set Computer)

① 指令数目少

②指令格式规整，采用定长指令字方式

③ 只有Load/Store指令中的数据需要访存 ④采用大量通用寄存器

指令的操作数有以下三种：

1）立即数（1）

例如：movl \$80，-8(%ebp)

\# M[R[ebp]-8] ← 80

2)通用寄存器（R）

例如：movl \$80，-8(%ebp

\# M[R[ebp]-8] ← 80

3)存储单元（S)

例如：movl \$80，-8(%ebp)

\# M[R[ebp]-8] ← 80

指令类型可以是：RR、RS、SI、SS等

## 13015计算机系统原理【第3章考点解析】

考点3 指令系统设计风格

25. 简述RISC指令集的主要特点，并写出它的全称。

【答案】：

RISC：精简指令集计算机。

RISC 指令系统的主要特点如下：

①指令数目少；

②指令格式规整，采用定长指令字方式，操作码和操作数地址等字段的长度固定；

③ 只有 Load/Store 指令中的数据需要访存，这种称为 Load/Store 型指令风格；

④采用大量通用寄存器。

【2025年10月】

## 13015计算机系统原理【第3章考点解析】

## 考点4 生成机器代码的过程

一个C语言程序转换为可执行目标代码的过程分为以下4 个步骤

1）预处理 使用命令 "gcc -E prog1.c -o prog1.i"

2）编译 使用命令 "gcc -S prog1.i -o prog1.s"或 "gcc -E prog1.c -o prog1.s"

3）汇编 使用命令 "gcc -c prog1.s -o prog1.o"

4）链接 使用命令 "gcc prog1.o prog1.o -o prog'

也可以用命令一步到位生成最终的可执行文件：gcc -O1 prog1.c prog2.c -o prog

## 13015计算机系统原理【第3章考点解析】

## 考点4 生成机器代码的过程

例3.1在IA-32+Linux平台上，对下列源程序 test. c 使用 GCC命令进行相应的处理，以分别得到预处理后的文件 test. i、汇编代码文件 test. s和可重定位目标文件 test. o。这些输出文件中，哪些是可显示的文本文件？哪些是不能显示的二进制文件？请给出所有可显示文本文件的输出结果。

![](images/e285c5eb10024fc1413a97e596af5596a9720aef4514a1480da11242ba34417f.jpg)

## 13015计算机系统原理【第3章考点解析】

考点4 生成机器代码的过程

汇编代码文件 test.s 是可显示文本文件

pushl %ebp

movl%esp, %ebp

subl \$16, %esp

movl 12(%ebp), %eax

movl 8(%ebp), %edx

leal(%edx, %eax), %eax

movl %eax, -4(%ebp)

movl -4(%ebp), %eax

leave

## 13015计算机系统原理【第3章考点解析】

## 考点4 生成机器代码的过程

使用命令"objdump -d test.o"可以得到以下显示结果

test.o 是可重定位目标文件，因而目标代码从相对地址0开始

<table><tr><td>00000000 &lt;add&gt;</td><td></td></tr><tr><td>0:55</td><td>push</td></tr><tr><td>1: 89e5</td><td>mov</td></tr><tr><td>3: 83 ec 10</td><td>sub</td></tr><tr><td>6: 8b 45 0c</td><td>mov</td></tr><tr><td>9: 8b 55 08</td><td>mov</td></tr><tr><td>8d 04 02 c:</td><td>lea</td></tr><tr><td>f: 89 45 fc</td><td>mov</td></tr><tr><td>12: 8b 45 fc</td><td>mov</td></tr><tr><td>15:c9</td><td>leave</td></tr></table>

<table><tr><td>80483d4</td><td>55</td><td>push</td><td>%ebp</td></tr><tr><td>80483d5</td><td>89 e5</td><td>mov</td><td>%esp, %ebp</td></tr><tr><td>80483d7</td><td>83 ec 10</td><td>sub</td><td>$0x10,%esp</td></tr><tr><td>80483da</td><td>8b 45 0c</td><td>mov</td><td>0xc(%ebp),%eax</td></tr><tr><td>80483dd</td><td>8b 55 08</td><td>mov</td><td>0x8(%ebp),%edx</td></tr><tr><td>80483e0</td><td>8d 04 02</td><td>lea</td><td>(%edx,%eax,1),%eax</td></tr><tr><td>80483e3</td><td>89 45 fc</td><td>mov</td><td>%eax,-0x4(%ebp)</td></tr><tr><td>80483e6</td><td>8b 45 fc</td><td>mov</td><td>-0x4(%ebp),%eax</td></tr><tr><td>80483e9</td><td>c9 c3</td><td>leave ret</td><td></td></tr></table>

# 13015计算机系统原理【第3章考点解析】

## 考点4 生成机器代码的过程

可以用命令 "gcc -o test main.o test.o"来生成可执行文件 test使用命令"objdump -d test"可以得到以下显示结果

## 080483d4 <add>:

## 13015计算机系统原理【第3章考点解析】

考点5 Intel和AT&T格式指令区别

<table><tr><td rowspan=1 colspan=1>特性</td><td rowspan=1 colspan=1>Intel 格式</td><td rowspan=1 colspan=1>AT&amp;T 格式</td></tr><tr><td rowspan=1 colspan=1>指令例子</td><td rowspan=1 colspan=1>mov ax [ebp+edx*4+8]</td><td rowspan=1 colspan=1>movw 8(%ebp, %edx, 4), %ax</td></tr><tr><td rowspan=1 colspan=1>操作数顺序</td><td rowspan=1 colspan=1>目标,源</td><td rowspan=1 colspan=1>源，目标</td></tr><tr><td rowspan=1 colspan=1>立即数表示</td><td rowspan=1 colspan=1>8</td><td rowspan=1 colspan=1>8</td></tr><tr><td rowspan=1 colspan=1>寄存器表示</td><td rowspan=1 colspan=1>ax</td><td rowspan=1 colspan=1>%ax</td></tr><tr><td rowspan=1 colspan=1>存储单元表示</td><td rowspan=1 colspan=1>0]</td><td rowspan=1 colspan=1>0</td></tr><tr><td rowspan=2 colspan=1>形式</td><td rowspan=1 colspan=1>[基址寄存器+变址寄存器*比例因子+偏移量]</td><td rowspan=1 colspan=1>偏移量(基址寄存器,变址寄存器,比例因子)</td></tr><tr><td rowspan=1 colspan=1>[ebp+edx*4+8]</td><td rowspan=1 colspan=1>8(%ebp, %edx, 4)</td></tr><tr><td rowspan=1 colspan=1>RTL</td><td rowspan=1 colspan=2>R[ax] ← M[R[ebp] + R[edx] × 4 + 8]</td></tr><tr><td rowspan=1 colspan=1>含义</td><td rowspan=1 colspan=2>将寄存器 ebp 的内容 + 4 倍的寄存器 edx 的内容 + 8 得到的地址对应的内容送到寄存器 ax 中</td></tr></table>

汇编格式指令为："op src，dst"，含义为 "dst ← dst op src"。  
例如："addI (,%ebx,2),%eax"的含义为“R[eax]←R[eax]+M[R[ebx]×2]"

## 13015计算机系统原理【第3章考点解析】

考点6数据类型及格式

表 3.1 C 语言基本数据类型和IA-32 操作数类型的对应关系
<table><tr><td rowspan=1 colspan=1>C 语言声明</td><td rowspan=1 colspan=1>Intel 操作数类型</td><td rowspan=1 colspan=1>汇编指令长度后缀</td><td rowspan=1 colspan=1>存储长度/位</td></tr><tr><td rowspan=1 colspan=1>(unsigned) char</td><td rowspan=1 colspan=1>整数/字节</td><td rowspan=1 colspan=1>b</td><td rowspan=1 colspan=1>8</td></tr><tr><td rowspan=1 colspan=1>(unsigned) short</td><td rowspan=1 colspan=1>整数/字</td><td rowspan=1 colspan=1>W</td><td rowspan=1 colspan=1>16</td></tr><tr><td rowspan=1 colspan=1>(unsigned) int</td><td rowspan=1 colspan=1>整数/双字</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>32</td></tr><tr><td rowspan=1 colspan=1>(unsigned) long int</td><td rowspan=1 colspan=1>整数/双字</td><td rowspan=1 colspan=1>I</td><td rowspan=1 colspan=1>32</td></tr><tr><td rowspan=1 colspan=1>(unsigned) long long int</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>2×32</td></tr><tr><td rowspan=1 colspan=1>char*</td><td rowspan=1 colspan=1>整数/双字</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>32</td></tr><tr><td rowspan=1 colspan=1>float</td><td rowspan=1 colspan=1>单精度浮点数</td><td rowspan=1 colspan=1>历</td><td rowspan=1 colspan=1>32</td></tr><tr><td rowspan=1 colspan=1>double</td><td rowspan=1 colspan=1>双精度浮点数</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>64</td></tr><tr><td rowspan=1 colspan=1>long double</td><td rowspan=1 colspan=1>扩展精度浮点数</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>80/96</td></tr></table>

![](images/dac25228a6383b69303243258ea77024df28e1740da2bd3ee413d6cf6982f980.jpg)

## 13015计算机系统原理【第3章考点解析】

考点7 定点寄存器组  
![](images/8a1bf624ddbdf1ca62bc505adf2c55cb90802cdda95315b10ac0960142b8d6fc.jpg)  
用“EAX”举例说明长度  
助记：2字母16位，3字母32位，看见末尾L、H是8位  
图3.2 IA-32的定点寄存器组

## 13015计算机系统原理【第3章考点解析】

## 考点7 定点寄存器组

定点寄存器组：

1）8个通用寄存器

EAX、EBX、ECX和EDX主要用来存放操作数

ESP、EBP、ESI和EDI主要用来存放变址值或指针

ESP是栈指针寄存器，EBP是基址指针寄存器

2）2个专用寄存器

EIP是指令指针寄存器，EFLAGS是标志寄存器

3)6个段寄存器

## 13015计算机系统原理【第3章考点解析】

## 考点8条件标示

1) OF(Overflow Flag)：溢出标示，反映带符号数的运算结果是否超过相应数值范围。

例如：对于8位带符号整数，其表示范围是-128～127，如果计算结果超出了这个范围，就发生了溢出，此时OF=1；否则OF=0

2)SF(Sign Flag)：符号标示，反映带符号数运算结果的符号。

负数时，SF=1；否则SF=0 助记：0正1负

3)ZF(ZeroFlag)：零标示，反映运算结果是否为0。若结果为0，ZF=1；否则ZF=0

4)CF(CarryFlag)：进/借位标示，反映无符号整数加（减）运算后的进（借）位情况。

有进（借）位则CF=1；否则CF=0

例如：在二进制加法中，两个1相加，结果为0并向更高位进位1（1+1=10)

## 13015计算机系统原理【第3章考点解析】

## 考点8 定点算术运算指令

1）加/减运算指令

例如：ADD(+)SUB(-)

2）增/减运算指令

例如：INC(++)DEC(--)

3）取负指令

例如：NEG(-)

4)比较运算指令

例如：CMP(<,<=,>,>=)

5）乘/除运算指令

例如：

MUL(\*) 无符号整数

IMUL(\*) 带符号整数

DIV(/,%) 无符号整数

IDIV(/,%) 带符号整数

## 13015计算机系统原理【第3章考点解析】

表3.5 定点算术运算指令汇总
<table><tr><td rowspan=1 colspan=1>指令</td><td rowspan=1 colspan=1>显式操作数</td><td rowspan=1 colspan=1>影响的标志</td><td rowspan=1 colspan=1>操作数类型</td><td rowspan=1 colspan=1>AT&amp;T 指令助记符</td><td rowspan=1 colspan=1>对应 C 运算符</td></tr><tr><td rowspan=1 colspan=1>ADD</td><td rowspan=1 colspan=1>2个</td><td rowspan=1 colspan=1>OF、ZF、SF、CF</td><td rowspan=1 colspan=1>无/带符号整数</td><td rowspan=1 colspan=1>addb、addw、addl</td><td rowspan=1 colspan=1>+</td></tr><tr><td rowspan=1 colspan=1>SUB</td><td rowspan=1 colspan=1>2个</td><td rowspan=1 colspan=1>OF、ZF、SF、CF</td><td rowspan=1 colspan=1>无/带符号整数</td><td rowspan=1 colspan=1>subb、subw、subl</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>INC</td><td rowspan=1 colspan=1>1个</td><td rowspan=1 colspan=1>OF、ZF、SF</td><td rowspan=1 colspan=1>无/带符号整数</td><td rowspan=1 colspan=1>incb、incw、incl</td><td rowspan=1 colspan=1>++</td></tr><tr><td rowspan=1 colspan=1>DEC</td><td rowspan=1 colspan=1>1个</td><td rowspan=1 colspan=1>OF、ZF、SF</td><td rowspan=1 colspan=1>无/带符号整数</td><td rowspan=1 colspan=1>decb、decw、decl</td><td rowspan=1 colspan=1>--</td></tr><tr><td rowspan=1 colspan=1>NEG</td><td rowspan=1 colspan=1>1个</td><td rowspan=1 colspan=1>OF、ZF、SF、CF</td><td rowspan=1 colspan=1>无/带符号整数</td><td rowspan=1 colspan=1>negb、negw、negl</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>CMP</td><td rowspan=1 colspan=1>2个</td><td rowspan=1 colspan=1>OF、ZF、SF、CF</td><td rowspan=1 colspan=1>无/带符号整数</td><td rowspan=1 colspan=1>cmpb、cmpw、cmpl</td><td rowspan=1 colspan=1>&lt;, &lt;=, &gt;, &gt;=</td></tr><tr><td rowspan=1 colspan=1>MUL</td><td rowspan=1 colspan=1>1个</td><td rowspan=1 colspan=1>OF、CF</td><td rowspan=1 colspan=1>无符号整数</td><td rowspan=1 colspan=1>mulb、mulw、mull</td><td rowspan=1 colspan=1>市</td></tr><tr><td rowspan=1 colspan=1>IMUL</td><td rowspan=1 colspan=1>1个</td><td rowspan=1 colspan=1>OF、CF</td><td rowspan=1 colspan=1>带符号整数</td><td rowspan=1 colspan=1>imulb、imulw、imull</td><td rowspan=1 colspan=1>幸</td></tr><tr><td rowspan=1 colspan=1>IMUL</td><td rowspan=1 colspan=1>2个</td><td rowspan=1 colspan=1>OF、CF</td><td rowspan=1 colspan=1>带符号整数</td><td rowspan=1 colspan=1>imulb、imulw、imull</td><td rowspan=1 colspan=1>常</td></tr><tr><td rowspan=1 colspan=1>IMUL</td><td rowspan=1 colspan=1>3个</td><td rowspan=1 colspan=1>OF、CF</td><td rowspan=1 colspan=1>带符号整数</td><td rowspan=1 colspan=1>imulb、imulw、imull</td><td rowspan=1 colspan=1>审</td></tr><tr><td rowspan=1 colspan=1>DIV</td><td rowspan=1 colspan=1>1个</td><td rowspan=1 colspan=1>无</td><td rowspan=1 colspan=1>无符号整数</td><td rowspan=1 colspan=1>divb、divw、divl</td><td rowspan=1 colspan=1>1,%</td></tr><tr><td rowspan=1 colspan=1>IDIV</td><td rowspan=1 colspan=1>1个</td><td rowspan=1 colspan=1>无</td><td rowspan=1 colspan=1>带符号整数</td><td rowspan=1 colspan=1>idivb、idivw、idivl</td><td rowspan=1 colspan=1>1,%</td></tr></table>

## 13015计算机系统原理【第3章考点解析】考点8 定点算术运算指令

5. 下列不属于IA-32 定点算术运算指令的是A.ADD/SUB B.IN/OUT C.MUL/IMUL D.INC/DEC

【答案】：B【2025年10月】

## 13015计算机系统原理【第3章考点解析】

## 考点8条件标示

例3.4 假设 $\mathbf { R } \left[ \mathbf { \Pi } \mathbf { a x } \right] = \mathbf { F F F A H }$ $\operatorname { R } { \big [ } \ b \mathbf { x } { \big ] } = \operatorname { F F F O H }$ ，则执行 Intel 格式指令“add ax，bx”后，AX、BX中的内容各是什么？标志CF、OF、ZF、SF各是什么？要求分别将操作数作为无符号整数和带符号整数来解释并验证指令执行结果。

Intel 指令"add ax, bx"的功能是 $\mathbb { R } [ { \mathbf { a } } { \mathbf { \boldsymbol { \times } } } ] { \boldsymbol {  } } \mathbb { R } [ { \mathbf { a } } { \mathbf { \boldsymbol { \times } } } ] + \mathbb { R } [ { \mathbf { b } } { \mathbf { \boldsymbol { \times } } } ]$

R[ax] = FFFAH + FFFOH = 1FFEAH, R[bx] = FFFOH

<table><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>A</td></tr><tr><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>0</td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>E</td><td rowspan=1 colspan=1>A</td></tr></table>

1）无符号整数解释

R[ax] = FFFAH = 65530， R[bx] = FFFOH = 65520， 相加: $6 5 5 3 0 + 6 5 5 2 0 = 1 3 1 0 5 0$

16 位无符号数最大值为 $2 ^ { 1 6 } – 1 = 6 5 5 3 5$ ，结果溢出，所以：CF=1：无符号数相加产生进位（溢出）结果不为0，所以： ${ \bf Z } { \bar { \bf F } } { \bf \equiv } { \bf 0 }$

## 13015计算机系统原理【第3章考点解析】

## 考点8条件标示

例 3.4 假设 R[ ax] = FFFAH，R [ bx] = FFFOH，则执行 Intel 格式指令“add ax，bx”后，AX、BX中的内容各是什么？标志CF、OF、ZF、SF各是什么？要求分别将操作数作为无符号整数和带符号整数来解释并验证指令执行结果。

2) 带符号整数解释（补码表示）

R[ax] = FFFAH = -6, R[bx] = FFFOH= -16， 相加: $- 6 + ( - 1 6 ) = - 2 2$

<table><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>A</td></tr><tr><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>0</td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>E</td><td rowspan=1 colspan=1>A</td></tr></table>

FFFAH对应的数是-6，其原码：符号位-数值位，1111 11111111 1010，最高位是1（0正1负），当负数时，数值位各位取反，末位加1，即：1000 0000 0000 0101+1=1000 0000$0 0 0 0 0 1 1 0 = - 6 $

16 位带符号数最大值为-215\~215-1，即：-32767\~32768，结果正确， $\bf { O F } { = } \bf { 0 }$

结果不为0，所以： ${ \bf Z } { \bar { \bf F } } { \bf \equiv } { \bf 0 }$

结果是负数，所以：SF=1（结果最高位为1，表示负数)

## 13015计算机系统原理【第3章考点解析】

## 考点8条件标示

例3.5 假设 R[eax]= 0000 00B4H，R[ebx]= 0000 0011H，M[0000 00F8H] =0000 00A0H，请问：

①执行指令“mulb %bl”后，哪些寄存器的内容会发生变化？与执行“imulb%bl”指令所发生的变化是否一样？为什么？两条指令得到的CF和OF标志各是什么？请用该例给出的数据验证你的结论。

②执行指令“imull \$-16,(%eax,%ebx,4),%eax”后哪些寄存器和存储单元发生了变化？乘积的机器数和真值各是多少？

## 13015计算机系统原理【第3章考点解析】

考点8条件标示

因为 R[eax]=0000 00B4H，R[ebx]=0000 0011H，所以，R[al]=B4H，R[bl]=11H。【低8位】

①无符号整数乘法，指令“mulb $\% \mathbf { b } \mathbf { \cdot } \mathbf { \Pi } ^ { \prime \prime }$ 中指出的操作数为8位，故指令的功能为

${ } ^ { \prime \prime } \mathbb { R } [ { \mathsf { a x } } ] { \gets } \mathbb { R } [ { \mathsf { a } } ] ] \times \mathbb { R } [ { \mathsf { b } } ] ] ^ { \prime \prime }$ ，因此，改变内容的寄存器是AX。

B4H = 11×16¹+4×16⁰=180 11H = 1×16¹+1×16⁰=17

指令执行后R[ax]=0BF4H，即十进制数3060=180×17

<table><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>B</td><td rowspan=1 colspan=1>4</td></tr><tr><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>B</td><td rowspan=1 colspan=1>4</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>B</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>B</td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1>4</td></tr></table>

因为高8位乘积不为全0（即乘积高8位中含有效数位：0BH），故CF=1，OF=1。

带符号整数乘法，执行指令“imulb $\% \mathbf { b } \mathbf { \cdot } \mathbf { \Pi } ^ { \prime \prime }$ 后，同上

B4H = 1011 0100 = 1100 1011 + 1 = 1100 1100 = -100 1100 = -76

11H = 0001 0001 = 17 指令执行后R $[ \partial \times ] = F A F 4 H$ ，即十进制数 $- 1 2 9 2 = - 7 6 \times 1 7$

因为高9位乘积不为全0或全1（即乘积高8位中含有效数位：FAH），故CF=1，OF=1。

## 13015计算机系统原理【第3章考点解析】

## 考点8条件标示

②带符号整数乘法，指令“imull \$-16， (%eax,%ebx,4)，%eax”的  
功能是“R[eax]←(-16)×M[R[eax]+4×R[ebx]]′  
其中，第二个乘数所在的存储单元地址为 000000000000 00000000 101000000000  
1111 1111 1111 1111 1111 0101 1111 1111  
R[eax]+4×R[ebx]=0xB4+(0x11<<2)=0xF8=0000 00F8H  
1111 1111 1111 1111 1111 0110 0000 0000  
【备注】：(0x11<<2)：左移2位实际是二进制左移 F F F F F 6 0 0  
或R[eax]+4×R[ebx]=B4H+4×11H=B4H+44H=F8H=0000 00F8H,  
因为M[0000 00F8H]=0000 00A0H=160，与-16相乘后得到一个负的乘积，因此乘积的符号为  
负。仅考虑低32位乘积，其数值部分绝对值的机器数为 $0 0 0 0 \ 0 0 0 \mathbf { A } 0 \mapsto < 4 ( 1 6 - 2 ^ { 4 } ) = 0 0 0 0 \ 0 \mathbf { A } 0 \mathbf { 0 } | -$   
是负数，对其各位取反末位加1，得到机器数为FFFF F600H，  
即指令执行后EAX中存放的内容为FFFF F600H，其真值为-2560。  
【备注】：二进制左移4位=十六进制左移1位

## 13015计算机系统原理【第3章考点解析】考点9寻址方式

1）立即寻址

2）寄存器寻址

3）存储器寻址

\- 实地址模式

\- 保护模式

IA-32采用段页式虚拟存储管理方式

## 13015计算机系统原理【第3章考点解析】

## 考点10 浮点寄存器栈和多媒体扩展寄存器组

IA-32的浮点处理架构有两种：

1）浮点协处理器 x87 架构它是一种栈结构

2)由 MMX 发展而来的 SSE 架构

采用单指令多数据(Single Instruction Multi Data， SIMD) 技术

## 13015计算机系统原理【第3章考点解析】

考点11 通用数据传送指令

MOV：一般的传送指令，包括movb，movw和movl等。

MOVS：符号扩展传送指令，将短的源数据高位符号扩展后传送到目的地址 【帯符号】

例如：movsbw %al，%ax：表示把一个字节进行符号扩展后送到一个16 位寄存器中

MOVZ：零扩展传送指令，将短的源数据高位零扩展后传送到目的地址 【无符号】

例如：movzw %ax，%eax：表示把一个字的高位进行零扩展后送到一个32 位寄存器中

【注意】：MOVS和MOVZ指令的目的地址只能是寄存器编号。

XCHG：数据交换指令，将两个寄存器内容互换。

例如：xchgb：表示字节交换。

## 13015计算机系统原理【第3章考点解析】

## 考点11 通用数据传送指令

## PUSH:

① 先执行 R[sp]←R[sp]-2 或 R[esp]←R[esp]-4

② 然后将一个字或双字从指定寄存器送到 SP 或 ESP 指示的栈单元中。

例如：pushl表示双字压栈，pushw表示字压栈

POP：【就是 PUSH的反操作

① 将一个字或双字从 SP 或 ESP 指示的栈单元送入指定寄存器

② 再执行 R[sp] ← R[sp]+2 或 R[esp] ← R[esp]+4

例如：popl表示双字出栈，popw表示字出栈

栈(Stack)是一种采用“先进后出”方式进行访问的一块存储区，在处理过程调用时非常有用。  
大多数情况下，栈是从高地址向低地址增长的。

## 13015计算机系统原理【第3章考点解析】

考点11 通用数据传送指令  
![](images/c2ca1e5d2ce939da028842737573ef9ea8090e664247eb3cbed2573ec65d07f5.jpg)  
图 3.6 pushw 和 popw 指令的执行

## 13015计算机系统原理【第3章考点解析】

## 考点11 通用数据传送指令

3. 下列说法不正确的是A.变址寻址时，有效数据存放在内存中B. 数据交换指令，将两个寄存器内容互换C. 堆栈指针SP的内容表示当前堆栈内所存储的数据的个数D. 内存中指令的寻址和数据的寻址是交替进行的

## 【答案】：C【2025年04月】

15. 栈是一种采用 方式进行访问的一块存储区，在执行 pushw% ax指令之后，SP指向存放有AX内容的单元，即当前刚入栈的 0

【答案】：前进后出、数据【2025年04月】

## 13015计算机系统原理【第3章考点解析】

考点11 通用数据传送指令

24. 简述栈在处理过程调用时的作用，并列举16位架构下可用的栈相关指令。

【答案】：栈是一种采用“先进后出”方式进行访问的一块存储区，在处理过程调用时非常有用。大多数情况下，栈从高地址向低地址增长。16位架构下有pushw和popw指令分别表示进栈和出栈。

【2025年04月】

![](images/42a20db6b8d915a55602ad47e5b5e2298f37656d376223ae70429a685dfd639a.jpg)

## 13015计算机系统原理【第3章考点解析】

## 考点11 通用数据传送指令

val 存储在 AL/AX/EAX → 8/16/32位

例 3.3 假设变量 val 和 ptr 的类型声明如下：

从寄存器取值，AT&T 用 %AL/%AX/%EAX

val\_type val;   
contofptr\_type \* ptr;

ptr 存储在 EDX → 32位

\* (指针) 可以看作是取值操作，从主存取值，

AT&T 用(%EDX)

已知上述类型 val\_type 和 contofptr\_type 是用 typedef 声明的数据类型，且 val 存储在累加器AL/AX/EAX中，ptr存储在 EDX中。现有以下两条C语言语句：

表 3.3 例 3.3 中 val\_type 和 contofptr\_type 的类型
<table><tr><td rowspan=1 colspan=1>val_type</td><td rowspan=1 colspan=1>contofptr_type</td><td rowspan=1 colspan=1>val_type</td><td rowspan=1 colspan=1>contofptr_type</td></tr><tr><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>unsigned char</td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1>unsigned char</td></tr><tr><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>unsigned short</td><td rowspan=1 colspan=1>int</td></tr></table>

## 13015计算机系统原理【第3章考点解析】

考点11 通用数据传送指令  
1 val=(val\_type) \* ptr;
<table><tr><td rowspan=1 colspan=1>序号</td><td rowspan=1 colspan=1>val_type</td><td rowspan=1 colspan=1>contofptr_type</td><td rowspan=1 colspan=1>语句1对应的指令及操作</td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>movb (%edx), %al      #传送</td></tr><tr><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>movsbl（%edx)，%eax #符号扩展，传送</td></tr><tr><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>movl(%edx)，%eax #传送</td></tr><tr><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>movzbl（%edx），%eax#零扩展，传送</td></tr><tr><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>movzbl（%edx)，%eax #零扩展，传送</td></tr><tr><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>unsigned short</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>movw (%edx),%ax      #截断，传送</td></tr></table>

val 存储在 AL/AX/EAX → 8/16/32位

从寄存器取值，AT&T 用 %AL/%AX/%EAX

ptr 存储在 EDX → 32位

非常重要：绝大多数AT&T指令后缀，就是由「寄存器」决定宽度。

【注意】：MOVS和MOVZ指令的目的地址只能是寄存器编号。

\*（指针）可以看作是取值操作，从主存取值，AT&T 用(%EDX)

## 13015计算机系统原理【第3章考点解析】

考点11 通用数据传送指令  
2 \* ptr= (contofptr\_type) val;
<table><tr><td rowspan=1 colspan=1>序号</td><td rowspan=1 colspan=1>val_type</td><td rowspan=1 colspan=1>contofptr_type</td><td rowspan=1 colspan=1>语句2对应的指令及操作</td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>movb %al, (%edx)     #传送</td></tr><tr><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>movb %al,(%edx)      #截断，传送</td></tr><tr><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>movl %eax, (%edx)   #传送</td></tr><tr><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>movb %al, (%edx)      #截断，传送</td></tr><tr><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>movb%al, (%edx)      #截断，传送</td></tr><tr><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>unsigned short</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>movzwl%ax,%eax       #零扩展movl %eax, (%edx)   #传送</td></tr></table>

val 存储在 AL/AX/EAX → 8/16/32位

从寄存器取值，AT&T 用 %AL/%AX/%EAX

非常重要：绝大多数 AT&T指令后缀，就是由「寄存器」决定宽度。

【注意】：MOVS和MOVZ指令的目的地址只能是寄存器编号。

ptr 存储在 EDX → 32位

\*（指针）可以看作是取值操作，从主存取值，AT&T 用(%EDX)

## 13015计算机系统原理【第3章考点解析】

考点12 地址传送指令

LEA（Load Effect Address）：加载有效地址

例如：leal 8(%ecx，%edx，4),%eax

movl 8(%ecx, %edx, 4), %eax

#R[eax]←R[ecx]+R[edx]×4+8 传地址

#R[eax]←M[R[ecx]+R[edx]×4+8] 传值

## 13015计算机系统原理【第3章考点解析】

## 考点12 地址传送指令

例3.2 将以下 Intel 格式的汇编指令转换为 GCC 默认的 AT&T 格式汇编指令。说明每条指令的含义。

<table><tr><td>1</td><td>push ebp ebp, esp</td><td></td><td>#R[ esp]←R[esp]-4,M[R[esp]]←R[ebp],双字 movl</td></tr><tr><td>2</td><td>mov</td><td>edx,DWORD PTR [ebp+8]</td><td>のにののとしは #R[edx]←M[R[ebp]+8],双字</td></tr><tr><td>3</td><td>mov</td><td>bl,255</td><td>8(%ebp), %edx $255,%bl #R[b1]←255，字节</td></tr><tr><td>4</td><td>mov</td><td>ax,WORD PTR [ebp+edx * 4+8]</td><td>movb</td></tr><tr><td>5</td><td>mov</td><td>WORD PTR [ebp+20],dx</td><td>movw 8(%ebp,%edx,4), %ax #R[ax]←M[R[ebp]+R[edx]×4+8],字</td></tr><tr><td>6mov 7lea</td><td></td><td>eax, [ecx+edx * 4+8]</td><td>movw %dx, 20(%ebp) #M[R[ebp]+20]←R[dx],字 leal 8(%ecx,%edx,4), %eax #R[eax]←R[ecx]+R[edx]×4+8,双字</td></tr></table>

## 说明：1 push ebp

①预留空间 高地址 → 地地址 ESP寄存器指向当前栈顶

②把基址寄存器压到栈里面，此时栈顶就是基址寄存器 内存操作M[]（栈内存)

非常重要：绝大多数 AT&T 指令后缀，就是由「寄存器」决定宽度。

## 13015计算机系统原理【第3章考点解析】

考点13 移位指令

## 左移：

1）SHL：逻辑左移，每左移一次，最高位送入CF，并在低位补0。

【无符号数】

例如：原数：00001010(十进制10)→左移1位(×21)，低位补0，最高位（0)送入CF结果：00010100(十进制 20)标志位变化：CF = 0

2）SAL：算术左移，每左移一次，最高位送入CF，并在低位补0。 【带符号数】如果移位前后符号位发生变化，则 OF=1，表示左移后结果溢出。这是 SAL与 SHL的不同之处

例如：原数：00001010(十进制+10)→左移1位(×21)，低位补0，最高位（0）送入CF结果：00010100(十进制+20)

标志位变化：CF = 0，OF = 0（移位前符号位是0，移位后还是0，无变化→不溢出）

## 13015计算机系统原理【第3章考点解析】

考点13 移位指令

## 右移：

1）SHR：逻辑右移，每右移一次，最低位送入CF，并在高位补0。

【无符号数】

例如：原数：11010011（十进制211）→右移1位（/21)，高位补0，最低位（1）送入CF结果：01101001（十进制 105)标志位变化：CF = 1

2）SAR：算术右移，每右移一次，操作数的最低位送入CF，并在高位补符号位。【带符号数】例如：原数：11010011（十进制-45)→右移1位（/21)，高位补0，最低位（1）送入CF结果：11101001（十进制-23)标志位变化：CF = 1

【注意】：211/2=105、-45/2向下取整（符合有符号数除法逻辑）

## 13015计算机系统原理【第3章考点解析】

## 考点13 移位指令

例3.6 假设 short 型变量 x 被编译器分配在寄存器 AX 中，R[ax]= FF80H，则以下汇编代码段执行后变量x的机器数和真值分别是多少？

显然这里的汇编指令是 GCC 默认的 AT&T 格式，\$2 和 \$1 分别表示立即数 2 和 1。

salw \$2, %ax

addw %dx, %ax

sarw \$1, %ax # R[ax] ← R[ax] >> 1 (算术右移，高位补符号位)

## 13015计算机系统原理【第3章考点解析】

## 考点13 移位指令

显然这里的汇编指令是 GCC 默认的 AT&T 格式，\$2 和 \$1 分别表示立即数 2 和 1。

$$
{ \sf R } [ { \sf d } \sf { x } ] = \sf X
$$

$$
{ \sf R } [ { \sf a x } ] = 4 \sf x
$$

$$
{ \sf R } [ { \sf a x } ] = 5 \mathsf { x }
$$

$$
\mathsf { s a r w \quad } \$ 1,92
$$

$$
\mathsf { R } [ \mathsf { a x } ] = 5 \mathsf { x } / 2
$$

假设上述代码段执行前 $\mathbb { R } [ { \sf a x } ] = \mathbb { x } _ { i }$ 则执行 $( ( x < < 2 ) + x ) > > 1$ 后， ${ \sf R } \left[ { \sf a } { \sf x } \right] = 5 { \sf x } / 2 .$

因为 short 型变量为带符号整数，因而采用算术移位指令 salw，后缀 w 表示操作数的长度为一个字，即16位。

## 13015计算机系统原理【第3章考点解析】

考点13 移位指令
<table><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>FF80H</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>FF80H 算术左移2位，低位补0</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>十</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>FF80H</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>X</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>算术右移1位，高位补符号</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>F</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>E</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>C</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>+</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>负数</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>二</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>-320</td></tr></table>

算术左移时，AX中的内容FF80H 在移位前、后符号未发生变化，故OF=0，没有溢出。最终 AX 的内容为 FEC0H，解释为 short 型整数时，其值为-320。验证：x= -128（FF80H - 补码求真值），5x/2= -320。经验证，结果正确。

## 13015计算机系统原理【第3章考点解析】

## 考点14 程序执行流控制指令

1）无条件跳转指令：JMP的执行结果就是直接跳转到目标地址处执行例如：jmp \*. L8(，%eax, 4) # R[eip]←M[. L8+R[eax]×4]

2）条件跳转指令：以标志位或标志组合作为跳转依据例如： $C F = 1 \mathsf { A N D } Z \mathsf { F } = 0$

3）条件设置指令：用来将条件标志组合得到的条件值设置到一个8位通用寄存器中例如：setc%dI，含义：若CF=1，则R[dI]=1；否则 $\mathsf { R } [ \mathsf { d } \mathsf { l } ] = 0$

<table><tr><td rowspan=1 colspan=1>指令</td><td rowspan=1 colspan=1>跳转条件</td><td rowspan=1 colspan=1>说明</td></tr><tr><td rowspan=1 colspan=1>jc label</td><td rowspan=1 colspan=1>CF=1</td><td rowspan=1 colspan=1>有进位/借位</td></tr></table>

## 13015计算机系统原理【第3章考点解析】

考点14 程序执行流控制指令

## 4）条件传送指令：如果符合条件就进行传送操作

格式：CMOVcc DST，SRC

【Intel】

格式：CMOVcc SRC，DST

【AT&T】

例如：cmovc%eax，%edx，含义：若CF=1，则R[edx]←R[eax]；否则什么都不做

<table><tr><td rowspan=1 colspan=1>指令</td><td rowspan=1 colspan=1>跳转条件</td><td rowspan=1 colspan=1>说明</td></tr><tr><td rowspan=1 colspan=1>jc label</td><td rowspan=1 colspan=1>CF=1</td><td rowspan=1 colspan=1>有进位/借位</td></tr></table>

## 5）调用和返回指令

① 调用指令 CALL；② 返回指令 RET

6)陷阱指令

重要作用之一：系统调用

表 3.6 条件跳转指令
<table><tr><td rowspan=1 colspan=1>序号</td><td rowspan=1 colspan=1>指     令</td><td rowspan=1 colspan=1>跳转条件</td><td rowspan=1 colspan=1>说   明</td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>jc label</td><td rowspan=1 colspan=1>CF=1</td><td rowspan=1 colspan=1>有进位/借位</td></tr><tr><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>jnc label</td><td rowspan=1 colspan=1>CF=0</td><td rowspan=1 colspan=1>无进位/借位</td></tr><tr><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>je/jz label</td><td rowspan=1 colspan=1>ZF=1</td><td rowspan=1 colspan=1>相等/等于零</td></tr><tr><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>jnc/jnz label</td><td rowspan=1 colspan=1>ZF=0</td><td rowspan=1 colspan=1>不相等/不等于零</td></tr><tr><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>js label</td><td rowspan=1 colspan=1>SF=1</td><td rowspan=1 colspan=1>是负数</td></tr><tr><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>jns label</td><td rowspan=1 colspan=1>SF=0</td><td rowspan=1 colspan=1>是非负数</td></tr><tr><td rowspan=1 colspan=1>7</td><td rowspan=1 colspan=1>jo label</td><td rowspan=1 colspan=1>OF=1</td><td rowspan=1 colspan=1>有溢出</td></tr><tr><td rowspan=1 colspan=1>8</td><td rowspan=1 colspan=1>jno label</td><td rowspan=1 colspan=1>0F=0</td><td rowspan=1 colspan=1>无溢出</td></tr><tr><td rowspan=1 colspan=1>9</td><td rowspan=1 colspan=1>ja/jnbe label</td><td rowspan=1 colspan=1>CF=0 AND ZF=0</td><td rowspan=1 colspan=1>无符号整数 A&gt;B</td></tr><tr><td rowspan=1 colspan=1>10</td><td rowspan=1 colspan=1>jae/jnb label</td><td rowspan=1 colspan=1>CF=0ORZF=1</td><td rowspan=1 colspan=1>无符号整数 A≥B</td></tr><tr><td rowspan=1 colspan=1>11</td><td rowspan=1 colspan=1>jb/jnae label</td><td rowspan=1 colspan=1>CF=1 AND ZF=0</td><td rowspan=1 colspan=1>无符号整数A&lt;B</td></tr><tr><td rowspan=1 colspan=1>12</td><td rowspan=1 colspan=1>jbe/jna label</td><td rowspan=1 colspan=1>CF=1 OR ZF=1</td><td rowspan=1 colspan=1>无符号整数A≤B</td></tr><tr><td rowspan=1 colspan=1>13</td><td rowspan=1 colspan=1>jg/jnle label</td><td rowspan=1 colspan=1>SF=OF AND ZF=0</td><td rowspan=1 colspan=1>带符号整数 A&gt;B</td></tr><tr><td rowspan=1 colspan=1>14</td><td rowspan=1 colspan=1>jge/jnl label</td><td rowspan=1 colspan=1>SF=OF OR ZF = 1</td><td rowspan=1 colspan=1>带符号整数 A≥B</td></tr><tr><td rowspan=1 colspan=1>15</td><td rowspan=1 colspan=1>jl/jnge label</td><td rowspan=1 colspan=1>SF≠OF AND ZF=0</td><td rowspan=1 colspan=1>带符号整数 A&lt;B</td></tr><tr><td rowspan=1 colspan=1>16</td><td rowspan=1 colspan=1>jle/jng label</td><td rowspan=1 colspan=1>SF≠OF OR ZF = 1</td><td rowspan=1 colspan=1>带符号整数A≤B</td></tr></table>

## 13015计算机系统原理【第3章考点解析】

## 考点14 程序执行流控制指令

例3.7 以下各组指令序列用于将变量x和y的某种比较结果记录到CL寄存器。根据以下各组指令序列，分别判断变量x和y在C语言程序中的数据类型，并说明指令序列的功能。

第一组：cmpl %eax,%edx#R[eax]=x,R[edx]=ysetb %cl

第二组：cmpl %eax, %edx#R[eax]=x,R[edx]=ysetne %cl

第三组：cmpw %ax，%dx #R[ax]=x,R[dx]=ysetl %cl

第四组：cmpb %al, %dl #R[al]=x,R[dl]=ysetae %cl

## 13015计算机系统原理【第3章考点解析】

## 考点14 程序执行流控制指令

CMP指令通过执行减法来设置条件标志位，每组中第二条 SETcc 指令中使用的条件标志都是由x 和 y 相减后设置的。

第一组：cmpl %eax,%edx#R[eax]=x,R[edx]=y  
setb%cl

<table><tr><td>11</td><td>jb/jnae label</td><td>CF=1 AND ZF=0</td><td>无符号整数A&lt;B</td></tr></table>

无符号整数小于比较，因此，x 和 y可能是 unsigned、unsigned long 或 指针型 数据。

```csv
第二组：cmpl%eax,%edx#R[eax]=x,R[edx]=y
setne %cl
```

<table><tr><td>4</td><td>jne/jnz label</td><td>ZF=0</td><td>不相等/不等于零</td></tr></table>

两个位串的不相等比较，因此，x和 y可能是 unsigned、int、unsigned long、long 或指针型数据。

## 13015计算机系统原理【第3章考点解析】

## 考点14 程序执行流控制指令

CMP指令通过执行减法来设置条件标志位，每组中第二条SETcc 指令中使用的条件标志都是由x 和 y 相减后设置的。

<table><tr><td>15</td><td>jl/jnge label</td><td>SF≠OF AND ZF=0</td><td>带符号整数A&lt;B</td></tr></table>

带符号整数小于比较，因此，x 和 y只能是 short 型数据。

<table><tr><td>10</td><td>jae/jnb label</td><td>CF= 0 OR ZF = 1</td><td>无符号整数A≥B</td></tr></table>

无符号整数大于小于比较，因此，x 和 y 可能是 unsigned char 或 char 数据。

## 13015计算机系统原理【第3章考点解析】

## 考点14 程序执行流控制指令

例3.8 以下各组指令序列用于测试变量x的某种特性，并将测试结果记录到CL寄存器。根据以下各组指令序列，分别判断数据x在C语言程序中的数据类型，并说明指令序列的功能。

第一组：testl %eax, %eax#R[eax]=xsete %cl

第二组: testl %eax, %eax #R[eax] =xsetge %cl

第三组：testw %ax，%ax #R[ax]=xsetns %cl

第四组：testb %al, \$15 #R[al]=xsetz %cl

## 13015计算机系统原理【第3章考点解析】

考点14 程序执行流控制指令

TEST 指令执行后，OF=CF=O，而 ZF 和 SF 则根据两个操作数相果为全0，则 ZF=1；若最高位为1，则 SF=1。

![](images/966bc55fa1f887084787bca48312be87211935c223b6193325904e20c6a3d5f0.jpg)

的结果来设置：若结

第一组：testl

<table><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1>&amp;</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td></tr></table>

<table><tr><td>3</td><td>je/jz label</td><td>ZF=1</td><td>相等/等于零</td></tr></table>

x 可能是 unsigned、int、unsigned long、long 或 指针型数据。

第二组：testl%eax，%eax $\# \mathrm { R } \left[ \mathrm { e a x } \right] = \mathbf { \vec { x } }$

<table><tr><td></td><td>jge/jnl label</td><td>SF=OF OR ZF=1</td><td>带符号整数A≥B</td></tr></table>

$S F { = } 0 F { = } 0 ~ { \mathsf { O R } } ~ Z \mathsf { F } { = } 1$ ，带符号整数大于等于0比较，因此，x可能是int或long 型数据。

## 13015计算机系统原理【第3章考点解析】

## 考点14 程序执行流控制指令

TEST 指令执行后，OF=CF=0，而 ZF 和 SF则根据两个操作数相“与”的结果来设置：若结果为全0，则ZF=1；若最高位为1，则SF=1。

第三组：testw %ax，%ax #R[ax]=x

<table><tr><td>6</td><td>jns label</td><td>SF=0</td><td>是非负数</td></tr></table>

判断x是否大于等于0，因此，x只能是short 型数据。

第四组：testb %al，\$15 #R[al]=x

$$
\% \mathrm { c l }
$$

<table><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1>&</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td></tr></table>

<table><tr><td></td><td>je/jz label</td><td>ZF=1</td><td>相等/等于零</td></tr></table>

判断× 的低4 位是否为 0，因此，x 可能是 char、signed char 或 unsigned char 型数据。

## 13015计算机系统原理【第3章考点解析】

## 考点15 过程调用

过程调用的执行步骤如下：

1）P将入口参数（实参）放到

Q 能访问到的地方

2）P将返回地址存到特定的地方，然后将控制转移到Q

3）Q保存P的现场，并为自己的非静态局部变量分配空间

4）执行Q的过程体（函数体）

5）Q恢复P的现场，并释放局部变量所占空间

6)Q取出返回地址，将控制转移到P

![](images/b9b3302d7ddd39839e773c6f292e4d561a889097b274faaad575e494ffb603eb.jpg)  
图3.8过程调用过程中栈和栈帧的变化

## 13015计算机系统原理【第3章考点解析】

## 考点15 过程调用

下面以一个最简单的例子来说明过程调用的机器级实现。假定有一个函数add 实现两个数相加，另一个过程 caller 调用 add，以计算125+80的值，对应的 C 语言程序如下

I int add( int x, int y)   
2 return x+y;   
3   
4   
5 int caller()   
6 int temp1 = 125;   
7 int temp2 = 80;   
8 int sum = add(temp1, temp2) ;   
9 return sum;   
10

## 13015计算机系统原理【第3章考点解析】

考点15 过程调用

经 GCC 编译后 caller 过程对应的代码如下(#后面的文字是注释）。

![](images/0c0109c703278d3283eaacfde65e6d0589e35b428b9e1e780e66ee8f22e63fdb.jpg)

![](images/127e9806274d4d0243cbfd9f1a4493df7dedce53e05a06b95691e82dc50abfb2.jpg)  
图 3.9 caller 和 add 的栈帧

## 13015计算机系统原理【第3章考点解析】

## 考点16 值传递和地址传递

总体来说分为两种：

1）按值传递

2）按地址传递

![](images/186c702dfd3bcdcec08fcad5e2a7ebfabb59cda948c27cfb51f21879dc32ff33.jpg)  
图 3.10 C 语言中的数据类型

## 13015计算机系统原理【第3章考点解析】

考点16 值传递和地址传递  
![](images/427058046eb9f7b8584b60c4e585465588263c94dd96cd469d934fefc9d0d5ba.jpg)  
图3.11 按值传递参数和按地址传送参数的程序示例

## 13015计算机系统原理【第3章考点解析】

考点16 值传递和地址传递  
![](images/e423babc64774095d79e4061b3a2ac6896841118a75a602995b5182b6491a6b3.jpg)  
图 3.13 两个程序中传递 swap 过程参数的汇编代码片段

## 13015计算机系统原理【第3章考点解析】

![](images/7b62a16e5d7dd2d0560125c2a554f93e772132b2b9398d617721e573f13a657a.jpg)

已知形式参数 p1 和 p2 对应的实参已压入调用过程的栈帧，

p1 和 p2 对应实参的存储地址分别为R[ebp]+8、R[ebp]+12，

这里，EBP指向当前栈帧底部，返回结果存放在EAX中，

请写出上述函数体对应的汇编代码，

要求用GCC默认的AT&T格式书写

## 13015计算机系统原理【第3章考点解析】

## 考点18 循环语句

C 语言中循环结构有三种：

1）do\~while 语句

![](images/266e3492c8999c6073b8fe5dc6c12f213e4b513cb37e2fc73ce73cd803db5cc5.jpg)

## 2)while 语句

![](images/730c61f0380eff94729a3f34150b7568e61bd471e1374675db39d61ca81ba77f.jpg)

## 3) for 语句

for (begin\_expr; cond\_expr; update\_expr) loop\_body\_statement

## 13015计算机系统原理【第3章考点解析】

## 考点18 循环语句

例3.10 一个C语言函数被 GCC 编译后得到的过程体对应的汇编代码如下。

![](images/293c4fe96ecc2cda67e5afe176f444da374ecf3211d9fbc690f519e173a9c7a0.jpg)

1 movl 8(%ebp), %ebx # ebp+8放到ebx,R[ebx]= x result = (result<<1) | (x & 0x01)   
2 movl \$0, %eax #R[eax] = 0 → result = 0 教材有误   
#汇编格式指令   
3 movl \$0, %ecx #R[ecx] = i → i = 0 ①   
4..L12: 为："op src,   
5leal (%eax,%eax), %edx #R[edx] = result× 2 = result < < 1 dst"，含义为   
6 movl %ebx, %eax #R[eax] = x "dst ← dst op   
7 andl \$1, %eax #R[eax]=x&1 src"。   
8 ord %edx, %eax # R[eax] = (x & 1) | (result << 0x01) ④   
9 shrl %ebx #R[ebx] 右移一位 x >> 1 ④   
10 addl \$1, %ecx R[ecx] = i+ 1 = i++ ③   
11 cmpl \$32, %ecx i!=32②   
12 jne L12

## 13015计算机系统原理【第3章考点解析】

考点18 循环语句

例3.10 一个C语言函数被 GCC 编译后得到的过程体对应的汇编代码如下。

## 13015计算机系统原理【第3章考点解析】

## 考点19数组

数组可以定义为以下四种：

1）静态存储型(static)

分配在静态数据区

2）外部存储型（extern）

分配在静态数据区中

3)自动存储型（auto)

分配在栈中

4)全局静态区数组

分配在静态数据区

15.数组可以定义为、、自动存储型或者定义为全局静态区数组。

【答案】：静态存储型、外部存储型【2025年10月】

## 13015计算机系统原理【第3章考点解析】

## 考点20 数据的对齐方式

## 对齐的两条核心规则

## 1）成员对齐：

结构体中每个成员的偏移量（相对于首地址的距离），必须是该成员自身大小的整数倍

例如：short (2 字节) 首地址必须是2 的倍数

int (4 字节) 首地址必须是4 的倍数

## 2）整体对齐：

结构体的总大小，必须是其内部最大成员大小的整数倍（保证数组存储时每个元素都对齐）

例如：short (2 字节)

int (4 字节)

首地址必须是 (4 + 4) 的倍数

## 13015计算机系统原理【第3章考点解析】

## 考点20 数据的对齐方式

例3.11 假定C语言程序中定义了以下结构体数组。

![](images/59e26f8a46a5068fccc031e6a46203e82f4675ad452d27611887ba969d17234d.jpg)

在对齐方式下该结构体数组record占用的存储空间为多少字节？每个成员的偏移量为多少？如何调整成员变量的顺序使得record占用空间最少？

## 13015计算机系统原理【第3章考点解析】

## 考点20数据的对齐方式

<table><tr><td>1</td><td>struct</td><td></td><td></td></tr><tr><td>2</td><td></td><td>char</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td>a;</td><td></td></tr><tr><td>3</td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td>int</td><td>b;</td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>4</td><td></td><td>char</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td>c;</td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>5</td><td></td><td>short</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td>d;</td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td>record[ 100];</td><td></td><td></td><td></td></tr><tr><td>6</td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr></table>

<table><tr><td rowspan=1 colspan=2>0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=3>89  1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>2</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>a</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>b</td><td rowspan=1 colspan=1>C</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=2>d</td><td rowspan=1 colspan=1></td></tr></table>

![](images/a917a3752f73e9f31078d9e812468a22b4d4e78d6141eb55fc9c77e42529f957.jpg)

该结构占用的存储空间都为12字节，因此，数组 record 共占100×12=1200 字节。

为了使得 record 占用空间最少，可以按照从短→长（或从长→短）调整成员变量的声明顺序。

从短→长调整后的声明如下：

![](images/addd3226f2c44cab5d5a82e4c3f56cf44dc15136227c9b7c341dd55a7c9f2a8a.jpg)

调整后每个数组元素占8字节，数组共占100×8=800字节空间，比原来节省400字节。

## 13015计算机系统原理【第3章考点解析】

## 考点21 x86-64的基本特点

1）比IA-32具有更多的通用寄存器个数。

2）比IA-32具有更长的通用寄存器位数，从32 位扩展到64 位。

3）字长从32 位变为64 位，因而逻辑地址从32 位变为 64 位。

4)对于long double 型数据，虽然还是采用与IA-32 相同的 80 位扩展精度格式，但是，所分配的存储空间从IA-32的12字节大小扩展为16字节大小。

5）过程调用时，对于整型入口参数只有6个以内的情况，用通用寄存器而不是用栈来传递，因而，很多过程可以不访问栈，使得大多数情况下执行时间比IA-32代码更短。

6) 128 位的 XMM寄存器从原来的 8 个增加到 16 个，浮点操作采用基于 SSE 的面向 XMM寄存器的指令集，浮点数存放在 128 位的 XMM 寄存器中。

## 13015计算机系统原理【第3章考点解析】

## 考点22 x86-64的数据传送指令

汇编指令中指令助记符结尾处的 $" { \bf q } ^ { \prime \prime }$ 表示操作数长度为四字（64位）。

在x86-64 中，提供了一些在IA-32 中没有的数据传送指令，如下：

1） movabsq 指令用于将一个 64 位立即数送到一个 64 位通用寄存器中

2) movq 指令用于传送一个 64 位的四字

3） movsbq、movswq、movslq用于将源操作数进行符号扩展并传送到一个 64 位寄存器中

4） movzbq、movzwq用于将源操作数进行零扩展后传送到一个 64 位寄存器中

5) leaq 用于将有效地址加载到 64 位寄存器

6) pushq和 popq 分别是四字压栈和四字出栈指令。

【重要】：在x86-64 中，movl 指令的功能与在IA-32中不同，它在传送32 位寄存器内容的同时，还会将目的寄存器的高32位自动清0，因此，在x86-64中，movl指令的功能相当于movzlq 指令，因而在 x86-64 中不需要 movzlq 指令。 $\mathbf { \langle m o v | } = \mathbf { \langle m o v z | q \rangle }$

dest\_type convert(source\_type x){   
dest\_type y = (dest\_type) x;   
retumn y;

## 13015计算机系统原理【第3章考点解析】

例3.12以下是一个 C 语言函数，其功能是将类型为 source\_type 的参数转换为 desttype类型的数据并返回。

根据过程调用时的参数传递约定可知，x存放在寄存器RDI对应的适合宽度的寄存器(如 RDI、EDI、DI和DIL)中，y存放在RAX 对应的寄存器（RAX、EAX、AX或 AL）中，填写表3.10中的汇编指令，以实现convert函数中的赋值语句。

表 3.10 例 3. 12 中 source\_type 和 dest\_type 的类型
<table><tr><td rowspan=1 colspan=1>source_type</td><td rowspan=1 colspan=1>dest_type</td><td rowspan=1 colspan=1>汇编指令</td></tr><tr><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>unsigned int</td><td rowspan=1 colspan=1>unsigned long</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>unsigned long</td><td rowspan=1 colspan=1>unsigned int</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>unsigned long</td><td rowspan=1 colspan=1></td></tr></table>

## 13015计算机系统原理【第3章考点解析】

考点22 x86-64的数据传送指令

根据过程调用时的参数传递约定可知，x存放在寄存器RDI对应的适合宽度的寄存器(如RDI、EDI、DI和 DIL)中，y存放在RAX对应的寄存器(RAX、EAX、AX或 AL)中，

<table><tr><td rowspan=1 colspan=1>source_type</td><td rowspan=1 colspan=1>dest_type</td><td rowspan=1 colspan=1>汇编指令</td></tr><tr><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>movsbq %dil, %rax</td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>movslq %edi, %rax</td></tr><tr><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>movq %rdi, %rax</td></tr><tr><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>int</td><td rowspan=4 colspan=1>movl %edi, %eaxmovl %edi, %eax              movzlq %edi %raxmovl %edi, %eaxmovzbq %dil, %rax</td></tr><tr><td rowspan=1 colspan=1>unsigned int</td><td rowspan=1 colspan=1>unsigned long</td></tr><tr><td rowspan=1 colspan=1>unsigned long</td><td rowspan=1 colspan=1>unsigned int</td></tr><tr><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>unsigned long</td></tr></table>

【重要】：在x86-64 中，movl 指令的功能与在IA-32 中不同，它在传送32 位寄存器内容的同时，还会将目的寄存器的高 32 位自动清 0，因此，在 x86-64 中，movl 指令的功能相当于 movzlq 指令，因而在 x86-64 中不需要 movzlq指令。【movl = movzlq】

![](images/29ecafabaec03535ce347a8908b2f98256a9c942919bc4a1a3f485e980f46a50.jpg)

## 13015计算机系统原理【第3章考点解析】

## 考点23 x86-64的算术逻辑运算指令

例3.13 以下是C语言赋值语句“x=a\*b+c\*d;”对应的x86-64汇编代码，已知x、a、b、c和d分别在寄存器 RAX、RDI、RSI、RDX和RCX 对应宽度的寄存器中。根据以下汇编代码，推测变量x、a、b、c和d的数据类型。

## 13015计算机系统原理【第3章考点解析】

1） movabsq 指令用于将一个 64 位立即数送到一个 64 位通用寄存器中

2） movq 指令用于传送一个 64 位的四字

3） movsbq、movswq、movslq用于将源操作数进行符号扩展并传送到一个 64 位寄存器中

4） movzbq、movzwq用于将源操作数进行零扩展后传送到一个 64 位寄存器中

5) leaq用于将有效地址加载到 64 位寄存器

6) pushq 和 popq分别是四字压栈和四字出栈指令。

【重要】：在x86-64 中，movl 指令的功能与在IA-32 中不同，它在传送32 位寄存器内容的同时，还会将目的寄存器的高32位自动清0，因此，在x86-64中，movl指令的功能相当于movzlq 指令，因而在 x86-64 中不需要 movzlq 指令。 $\mathbf { \langle m o v | } = \mathbf { \langle m o v z | q \rangle }$

## 谢谢大家