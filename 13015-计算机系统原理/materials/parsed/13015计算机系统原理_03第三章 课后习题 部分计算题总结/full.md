## 13015 计算机系统原理

第三章 课后习题 计算题讲解(部分)

讲师/公众号：小飞学长Pro

## 13015 计算机系统原理【第三章课后题】

3. 对于以下AT&T格式汇编指令，根据操作数的长度确定对应指令助记符中的长度后缀，并说明每个操作数的寻址方式。 答：根据【寄存器】来判断，无关是源还是目的

(1) mov 8(%ebp, %ebx, 4), %ax

(2) mov %al, 12(%ebp)

(3) add (, %ebx,4), %ebx

(4) or (%ebx), %dh

(5) push \$0xF8

(6) mov \$0xFFFO, %eax

(7) test %cx, %cx

(8) lea 8(%ebx, %esi), %eax

1）后缀：w，源：基址+比例变址+偏移，目：寄存器

2）后缀：b， 源：寄存器， 目：基址+偏移

3）后缀：l， 源：比例变址， 目：寄存器

4）后缀：b， 源：基址， 目：寄存器

5）后缀：l， 源：立即数， 目：栈

6）后缀：l， 源：立即数， 目：寄存器

7）后缀：w，源：寄存器， 目：寄存器

8）后缀：l， 源：基址+变址+偏移，目：寄存器

举例：8（%ebp，%ebx，4）

偏移量（基址寄存器，变址寄存器，比例因子）

## 13015 计算机系统原理【第三章课后题】

4. 使用汇编器处理以下各行AT&T格式代码时都会产生错误，请说明每一行存在什么错误。 答：

(1) movl 0xFF, (%eax)

(2) movb %ax, 12(%ebp)

(3) addl %ecx, \$0xF0

(4) orw \$OxFFFFO, (%ebx)

(5) addb \$0xF8, (%dl)

(6) movl %bx, %eax

(7) andl %esi, %esx

(8) movw 8(%ebp, ,4), %ax

1）源操作数是立即数 0xFF，需在前面加 '\$'

2）源操作数为16位，而长度后缀是字节 'b'，不一致

3）目的操作数不能是立即数寻址

4）操作数位数超过16位，而长度后缀为16位的 'w

5）不能用8位寄存器作为目的操作数地址所在寄存器

6）源操作数寄存器与目操作数寄存器长度不一致

7）不存在ESX寄存器

8）源操作数地址中缺少变址寄存器

举例：8（%ebp，%ebx，4）

偏移量（基址寄存器，变址寄存器，比例因子）

## 13015 计算机系统原理【第三章课后题】

5. 假设变量 x 和 ptr的类型声明如下：

srce\_\_type x;

dst\_type \* ptr;

这里，src\_type 和dst\_type 是用typedef 声明的数据类型。有以下一个 C 语言赋值语句：

\* ptr=(dst\_\_type) x;

若 x存储在寄存器EAX或AX 或 AL中，ptr存储在寄存器EDX 中，则对于表 3.12 中给出的 src\_type 和dst\_type的类型组合，写出实现上述赋值语句的机器级代码。要求用 AT&T格式表示机器级代码。

表 3.12 题 5 用表
<table><tr><td rowspan=1 colspan=1>src_type</td><td rowspan=1 colspan=1>dst_type</td><td rowspan=1 colspan=1>机器级表示</td></tr><tr><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>short</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1></td></tr></table>

## 13015 计算机系统原理【第三章课后题】

x 存储在寄存器 EAX 或 AX 或 AL 中ptr 存储在寄存器 EDX 中

<table><tr><td rowspan=1 colspan=1>序号</td><td rowspan=1 colspan=1>src_type</td><td rowspan=1 colspan=1>dst_type</td><td rowspan=1 colspan=1>机器级表示</td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>movsbl %al, %eaxmovl %eax, (%edx)</td></tr><tr><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>movb %al, (%edx)</td></tr><tr><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1>movl %eax, (%edx)</td></tr><tr><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>short</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>movswl %ax, %eaxmovl %eax, (%edx)</td></tr><tr><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1>movzbl %al, %eaxmovl %eax, (%edx)</td></tr><tr><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1>movsbl %al, %eaxmovl %eax, (%edx)</td></tr><tr><td rowspan=1 colspan=1>7</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>movl %eax, (%edx)</td></tr></table>

扩展操作时，若被转换数据是无符号整型，则采用零扩展；若被转换数据是带符号整型，则采用符号扩展。例如，将一个unsigned short 型或 unsignedchar 型数据转换为 int 型时，采用的是零扩展。

## 总结一句话：源 → 目的

若小 → 大（扩展）

源是无符号 → 零扩展

源是有符号 → 符号扩展

若大 → 小（截断）

## 13015 计算机系统原理【第三章课后题】

7. 假设变量x和y分别存放在寄存器EAX 和ECX 中，给出以下每条指令执行后寄存器EDX中的结果。 答：

$\begin{array} { r l } { \mathrm { i e a l } } & { { } ( \mathcal { G } _ { \ell } \mathrm { e a x } ) , \mathcal { G } _ { \ell } \mathrm { e d x } } \end{array}$ 1） $R [ { \mathsf { e d } } \times ] = \mathsf { X }$

(2) leal $4 ( \% \mathrm { e a x } , \% \mathrm { e c x } ) , \% \mathrm { e d x }$

2） $\mathsf { R } [ \mathsf { e d } \mathsf { x } ] = \mathsf { x } + \mathsf { y } + 4$

(3) leal $( \% \mathrm { { e a x } , \ \% \mathrm { { e c x } , \ 8 ) , \ \% \mathrm { { e d x } } } }$

3） $R [ { \sf e d } x ] = x + 8 ^ { \star } y$

(4) leal $0 \mathrm { x c } \left( \% \mathrm { e c x } , \mathcal { I } \mathrm { o e a x } , 2 \right)$ , %edx

4） $R [ { \mathsf { e d x } } ] = y + 2 ^ { \star } x + 1 2$

(5) leal (, %eax, 4), %edx

0xc是十六进制的12

5） $R [ { \mathsf { e d x } } ] = 4 ^ { \star } \times$

(6) leal (%eax, %ecx), %edx

6） $R [ { \sf e d } x ] = x + y$

举例：

8（%ebp，%ebx，4）// R[ebp]+R[ebx]×4+8偏移量（基址寄存器，变址寄存器，比例因子）

## 谢谢大家