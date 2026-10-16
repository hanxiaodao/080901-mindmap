明顺序。从短→长调整后的声明如下：

![](images/8b36580abca5362ddabe6d32dc627373ec405bd52ca8036ea2c9d26d3bb67789.jpg)

调整后每个数组元素占8字节，数组共占800字节空间，比原来节省400字节。

## 3.6 兼容 IA-32的 64 位系统

随着计算机技术及应用领域的不断发展，32位处理器逐步被64位处理器代替，最早的64位微处理器架构是Intel提出的采用全新指令集的LA-64，而最早兼容IA-32的64位架构是 AMD 提出的 x86-64。

目前，AMD 的 64 位处理器架构 AMD 64 和 Intel 的 64 位处理器架构 Intel 64 都支持 x86-64指令集，因而，通常人们直接使用x86-64代表64位Intel指令集架构。x86-64有时也简称为 x64。

## 3.6.1 x86-64 的基本特点

对于Intel架构机器中的编译器来说，可以有两种选择，一种是按IA-32指令集将目标编译成IA-32代码，一种是按x86-64指令集将目标编译成x86-64代码。通常，在IA-32架构上运行的是32位操作系统，GCC默认生成IA-32代码：在x86-64架构上运行的是64位操作系统，GCC默认生成x86-64代码。Linux和GCC将前者称为“i386”平台，将后者称为“x86-64”平台。

与IA-32代码相比，x86-64代码主要有以下几个方面的特点。

1）比IA-32具有更多的通用寄存器个数。新增的8个64位通用寄存器名称分别为R8\~R15。它们可以作为8位寄存器（R8B\~R15B）、16位寄存器（R8W\~R15W）或32位寄存器（R8D\~R15D）使用，以访问其中的低8、低16或低32位。

2）比IA-32具有更长的通用寄存器位数，从32位扩展到64位。在x86-64中，所有通用寄存器都从32位扩充到了64位，名称也发生了变化。8个32位通用寄存器EAX、EBX、ECX、EDX、EBP、ESP、ESI和 EDI 对应的 64 位寄存器分别被命名为RAX、RBX、RCX、RDX、RBP、RSP、RSI和 RDI。

在IA-32中，寄存器EBP、ESP、ESI和EDI的低8位不能使用，而在x86-64架构中，可以使用这些寄存器的低8位，对应寄存器名称为BPL、SPL、SIL和DIL。

整数操作不仅支持8、16、32位数据类型，还支持64位数据类型。所有算术逻辑运算、寄存器与内存之间的数据传输，都能以最多64位为单位进行操作。栈的压人和弹出操作都以8字节为单位进行。

3）字长从32位变为64位，因而逻辑地址从32位变为64位。指针（如char型）和长整数（long型）数据从32位扩展到64位，与IA-32平台相比，理论上其数据访问的空间大小从 $2 ^ { 3 2 } ~ \mathrm { B } = 4 ~ \mathrm { G B }$ 扩展到了 $2 ^ { 6 4 } \ \mathrm { B } = 1 6 \mathrm { E B }$ 。不过，目前仅支持48位逻辑地址空间，即逻辑地址从4GB增加到了256TB。

4)对于long double型数据，虽然还是采用与IA-32 相同的 80 位扩展精度格式，但是，所分配的存储空间从IA-32的12字节大小扩展为16字节大小。也即，此类数据的边界从4字节对齐改为16字节对齐，不管是分配12字节还是16字节，都只会用到低10字节。

5）过程调用时，对于整型入口参数只有6个以内的情况，用通用寄存器而不是用栈来传递，因而，很多过程可以不访问栈，使得大多数情况下执行时间比IA-32代码更短。

6)128位的XMM寄存器从原来的8个增加到16个，浮点操作采用基于SSE的面向XMM寄存器的指令集，浮点数存放在128位的 XMM寄存器中。

## 3.6.2 x86-64 的过程调用

在x86-64中，过程调用通过寄存器传送参数，寄存器的使用约定主要包括以下方面：①可以不用帧指针寄存器RBP作为栈帧底部，此时，使用RSP作为基址寄存器来访问栈帧中的信息，而RBP可作为普通寄存器使用；②传送入口参数的寄存器依次为RDI、RSI、RDX、RCX、R8和R9，返回参数存放在 RAX 中；③调用者保存的寄存器为 R10和 R11，被调用者保存的寄存器为RBX、RBP、R12、R13、R14和R15；④RSP用于指向栈顶元素；⑤RIP用于指向正在执行或即将执行的指令。

如果人口参数是整数类型或指针类型且少于等于6个，则无须用栈来传递参数。如果同时该过程无须在栈中存放局部变量和被调用者保存寄存器的值，那么，该过程就不需要栈帧。传递参数时，如果参数是32位、16位或8位，则参数被置于对应宽度的寄存器部分。例如，若第一个入口参数是char型，则放在RDI中对应字节宽度的寄存器DIL中：若返回参数是short型，则放在RAX中对应16位宽度的寄存器AX中。表3.9给出了每个入口参数和返回参数所在的对应寄存器。

表3.9 过程调用时参数对应的寄存器
<table><tr><td rowspan=2 colspan=1>操作数宽度字节</td><td rowspan=1 colspan=6>人口参数</td><td rowspan=2 colspan=1>返回参数</td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>6</td></tr><tr><td rowspan=1 colspan=1>∞</td><td rowspan=1 colspan=1>RDI</td><td rowspan=1 colspan=1>RSI</td><td rowspan=1 colspan=1>RDX</td><td rowspan=1 colspan=1>RCX</td><td rowspan=1 colspan=1>R8</td><td rowspan=1 colspan=1>R9</td><td rowspan=1 colspan=1>RAX</td></tr><tr><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>EDI</td><td rowspan=1 colspan=1>ESI</td><td rowspan=1 colspan=1>EDX</td><td rowspan=1 colspan=1>ECX</td><td rowspan=1 colspan=1>R8D</td><td rowspan=1 colspan=1>R9D</td><td rowspan=1 colspan=1>EAX</td></tr><tr><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>DI</td><td rowspan=1 colspan=1>SI</td><td rowspan=1 colspan=1>DX</td><td rowspan=1 colspan=1>CX</td><td rowspan=1 colspan=1>R8W</td><td rowspan=1 colspan=1>R9W</td><td rowspan=1 colspan=1>AX</td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>DIL</td><td rowspan=1 colspan=1>SIL</td><td rowspan=1 colspan=1>DL</td><td rowspan=1 colspan=1>CL</td><td rowspan=1 colspan=1>R8B</td><td rowspan=1 colspan=1>R9B</td><td rowspan=1 colspan=1>AL</td></tr></table>

在x86-64中，最多可以有6个整型或指针型人口参数通过寄存器传递，超过6个入口参数时，后面的通过栈来传递，在栈中传递的参数若是基本类型数据，则不管是什么基本类型都分配8B空间。当人口参数少于6个或者当入口参数已经被用过而不再需要时，存放对应参数的寄存器可以被函数作为临时寄存器使用。对于存放返回结果的RAX寄存器，在产生最终结果之前，也可以作为临时寄存器被函数重复使用。关于x86-64的调用约定的详细内容，可以参考 AMD64 System V ABI 手册。

在x86-64 中，调用指令 callq 将一个 64 位返回地址保存在栈中并执行R[rsp]←

R[rsp]-8。返回指令 ret 也是从栈中取出 64 位返回地址并执行 R[rsp]←R[rsp] +8。

## 3.6.3 x86-64 的基本指令和对齐

x86-64指令集在兼容IA-32的基础上支持64位数据操作指令，大部分操作数指示符与IA-32一样，所不同的是，当指令中的操作数为存储器操作数时，其基址寄存器或变址寄存器都必须是64位寄存器：此外，在运算类指令中，除了支持原来IA-32中的寻址方式以外，x86-64还支持PC相对寻址方式。

## 1. 数据传送指令

在x86-64中，提供了一些在IA-32中没有的数据传送指令，例如，movabsq指令用于将一个64位立即数送到一个64位通用寄存器中；movq指令用于传送一个64位的四字；movsbq、movswq、movslq用于将源操作数进行符号扩展并传送到一个64位寄存器中；movzbq、movzwq用于将源操作数进行零扩展后传送到一个64位寄存器中；leaq用于将有效地址加载到64位寄存器；pushq和popq分别是四字压栈和四字出栈指令。汇编指令中指令助记符结尾处的“q”表示操作数长度为四字（64位)。

在x86-64中，movl指令的功能与在IA-32中不同，它在传送32位寄存器内容的同时，还会将目的寄存器的高32位自动清0，因此，在x86-64中，movl指令的功能相当于movzlq指令，因而在x86-64中不需要 movzlq指令。

例3.12 以下是一个 C 语言函数，其功能是将类型为 source\_type的参数转换为 dest\_type类型的数据并返回。

![](images/a08a5d9114779e1fe69c0d9e647e3118111724da253c7b7f875d1efb5f1ecdeb.jpg)

根据过程调用时的参数传递约定可知，x存放在寄存器RDI对应的适合宽度的寄存器（如RDI、EDI、DI和DIL）中，y存放在 RAX对应的寄存器（RAX、EAX、AX或 AL）中，填写表3.10中的汇编指令，以实现 convert函数中的赋值语句。

表 3.10 例 3.12 中 source\_type 和 dest\_type 的类型
<table><tr><td rowspan=1 colspan=1>source_type</td><td rowspan=1 colspan=1>dest_type</td><td rowspan=1 colspan=1>汇编指令</td></tr><tr><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>unsigned int</td><td rowspan=1 colspan=1>unsigned long</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>unsigned long</td><td rowspan=1 colspan=1>unsigned int</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>unsigned long</td><td rowspan=1 colspan=1></td></tr></table>

解：根据x86-64数据传输指令的功能，得到本例中的汇编指令（见表3.11，表中汇编指令为 AT&T格式)。将long 型数据转换为int 型数据时，可以用两种不同的指令 movslq和movl。虽然执行这两种指令得到的RAX中高32位内容可能不同，但是，EAX中的结果是一样的。因为函数返回的是int型数据，所以RAX中高32位的值没有意义，只要EAX中的32位值正确即可。

表3.11 例3.12的答案
<table><tr><td rowspan=1 colspan=1>source_type</td><td rowspan=1 colspan=1>dest_type</td><td rowspan=1 colspan=1>汇编指令</td></tr><tr><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>movsbq %dil, %rax</td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>movslq %edi, %rax</td></tr><tr><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>movq %rdi, %rax</td></tr><tr><td rowspan=1 colspan=1>long</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>movslq %edi, %rax  #符号扩展64位，RAX中高32位为符号movl %edi, %eax    #零扩展到64位，RAX中高32位为0</td></tr><tr><td rowspan=1 colspan=1>unsigned int</td><td rowspan=1 colspan=1>unsigned long</td><td rowspan=1 colspan=1>movl %edi, %eax    #零扩展到64位，RAX中高32位为0</td></tr><tr><td rowspan=1 colspan=1>unsigned long</td><td rowspan=1 colspan=1>unsigned int</td><td rowspan=1 colspan=1>movl %edi, %eax   #零扩展到64位，RAX中高32位为0</td></tr><tr><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>unsigned long</td><td rowspan=1 colspan=1>movzbq %dil, %rax#零扩展到64位，RAX中高56位为0</td></tr></table>

## 2. 算术逻辑运算指令

在x86-64中，增加了操作数长度为四字的运算类指令（长度后缀为q），例如，addq(四字相加）、subq（四字相减）、imulq（带符号整数四字相乘）、mulq（无符号整数四字相乘)、orq（64位相或）、incq（增1）、decq（减1）、negq（取负）、notq（各位取反）、salq（算术左移）等。

例3.13 以下是C语言赋值语句“x=a\*b+c\*d;”对应的x86-64汇编代码，已知x、a、b、c和d分别在寄存器RAX、RDI、RSI、RDX和RCX 对应宽度的寄存器中。根据以下汇编代码，推测变量x、a、b、c和d的数据类型。

![](images/e28ccf87b740a74142c8957532ac51d04d9f43cd33a0b5ee6ac71376793bc446.jpg)

解：根据第1行可知，在ECX中的变量d从32位符号扩展为64位，因此，变量d的数据类型为 int型；根据第2行可知，在RDX 中的变量c为64位整型，即c的数据类型为long型；根据第3行可知，在SIL中的变量b为char型数据；根据第4行可知，在EDI中的a 是 int 型数据；根据第 5行和第6 行可知，存放在 RAX 中的 x 是 long 型数据。

## 3. 数据对齐

与IA-32一样，x86-64中各种类型数据应该遵循一定的对齐规则，而且要求更加严格。因为x86-64中存储器的访问接口被设计成按8字节或16字节为单位进行存取，其对齐规则是，任何K字节宽的基本数据类型和指针类型数据的起始地址一定是K的倍数。因此，long型、double型数据和指针型变量都必须按8字节边界对齐；long double型数据必须按16字节边界对齐。具体的对齐规则可以参考 AMD64 System V ABI 手册。

<table><tr><td colspan="2"></td><td rowspan="2">汇编语言程序</td><td rowspan="2">汇编助记符</td></tr><tr><td>机器语言程序</td><td>汇编指令</td></tr><tr><td>汇编程序</td><td>反汇编程序</td><td>机器级代码</td><td>CISC</td></tr><tr><td>RISC</td><td>通用寄存器</td><td>变址寄存器</td><td>基址寄存器</td></tr><tr><td>栈指针寄存器</td><td>指令指针寄存器</td><td>标志寄存器</td><td>条件标志（条件码）</td></tr><tr><td>寻址方式</td><td>立即寻址</td><td>寄存器寻址</td><td>相对寻址</td></tr><tr><td>存储器操作数</td><td>实地址模式</td><td>保护模式</td><td>有效地址</td></tr><tr><td>比例变址</td><td>非比例变址</td><td>比例系数（比例因子）</td><td>MMX 指令</td></tr><tr><td>SSE指令集</td><td>SIMD</td><td>多媒体扩展通用寄存器</td><td>栈（Stack）</td></tr><tr><td>调用者保存寄存器</td><td>被调用者保存寄存器</td><td>帧指针寄存器</td><td>当前栈帧</td></tr><tr><td>按值传递参数</td><td>按地址传递参数</td><td>嵌套调用</td><td>递归调用</td></tr></table>

## 本章小结

编译器在将高级语言源程序转换为机器级代码时，必须对目标代码对应的指令集体系结构有充分的了解。编译器需要决定高级语言程序中的变量和常量应该使用哪种数据表示格式，需要为高级语言程序中的常数和变量合理地分配寄存器或存储空间，需要确定哪些变量应该分配在静态数据区，哪些变量应该分配在动态的堆区或栈区，需要选择合适的指令序列来实现选择结构和循环结构。对于过程调用，编译器需要按调用约定实现参数传递、保存和恢复寄存器的状态等。

如果一个应用程序员能够熟练掌握应用程序所运行的平台与环境，包括指令集体系结构、操作系统和编译工具，并且能够深刻理解高级语言程序与机器级程序之间的对应关系，那么，就能更容易理解程序的行为和执行结果，更容易编写出高效、安全、正确的程序，并在程序出现问题时能够较快地定位错误发生的根源。

## 习 题

1. 给出以下概念的解释说明。

2. 简单回答下列问题。

(1)一条机器指令通常由哪些字段组成？各字段的含义分别是什么？

(2)将一个高级语言源程序转换成计算机能直接执行的机器代码通常需要哪几个步骤？

(3)IA-32中的逻辑运算指令如何生成条件标志？移位指令可能会改变哪些条件标志？

（4）执行条件跳转指令时所用到的条件标志信息从何而来？请举例说明。

(5)无条件跳转指令和调用指令的相同点和不同点是什么？

(6）按值传递参数和按地址传递参数两种方式有哪些不同点？

(7)为什么在递归深度较深时递归调用的时间开销和空间开销都会较大？

(8)为什么数据在存储器中最好按地址对齐方式存放？

3. 对于以下AT&T格式汇编指令，根据操作数的长度确定对应指令助记符中的长度后缀，并说明每个操作数的寻址方式。

(1) mov 8(%ebp, %ebx, 4), %ax

(2) mov %al, 12(%ebp)

(3) add (, %ebx,4), %ebx

(4) or (%ebx), %dh

(5) push \$0xF8

(6) mov \$0xFFFO, %eax

(7) test %cx, %cx

(8) lea 8(%ebx, %esi), %eax

4. 使用汇编器处理以下各行AT&T格式代码时都会产生错误，请说明每一行存在什么错误。

(1) movl OxFF, (%eax)

(2) movb %ax, 12(%ebp)

(3) addl %ecx, \$0xF0

(4) orw \$OxFFFFO, (%ebx)

(5) addb \$0xF8, (%dl)

(6) movl %bx, %eax

(7) andl %esi, %esx

(8) movw 8(%ebp, , 4), %ax

5. 假设变量 x 和 ptr 的类型声明如下：

这里，src\_type 和 dst\_type 是用 typedef 声明的数据类型。有以下一个 C 语言赋值语句：

若x 存储在寄存器 EAX 或 AX 或AL 中，ptr 存储在寄存器 EDX 中，则对于表 3.12 中给出的 src\_type 和dst\_type的类型组合，写出实现上述赋值语句的机器级代码。要求用 AT&T格式表示机器级代码。

表 3.12 题 5 用表
<table><tr><td rowspan=1 colspan=1>src_type</td><td rowspan=1 colspan=1>dst_type</td><td rowspan=1 colspan=1>机器级表示</td></tr><tr><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>short</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>unsigned char</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>char</td><td rowspan=1 colspan=1>unsigned</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1>int</td><td rowspan=1 colspan=1></td></tr></table>

6. 假设某个 C 语言函数 func 的原型声明如下：

# 函数func的过程体对应的机器级代码用AT&T汇编形式表示如下：

![](images/113495dd5557e0e316277f354e26d1fe9adb2d9f1de68079ce4595180f27f1df.jpg)

回答下列问题或完成下列任务。

（1）在过程体开始时三个入口参数对应实参所存放的存储单元地址是什么（提示：当前栈帧底部由帧指针寄存器EBP指示)？

(2) 根据上述机器级代码写出函数 func的C 语言代码。

7. 假设变量x和y分别存放在寄存器EAX和ECX 中，给出以下每条指令执行后寄存器EDX 中的结果。

(1) leal (%eax), %edx

(2) leal 4(%eax, %ecx), %edx

(3) leal (%eax, %ecx, 8), %edx

(4) leal Oxc(%ecx, %eax, 2), %edx

(5) leal (, %eax, 4), %edx

(6) leal (%eax, %ecx), %edx

8. 假设以下地址以及寄存器中存放的机器数如表3.13所示。

表 3.13 题8 用表
<table><tr><td rowspan=1 colspan=1>地址</td><td rowspan=1 colspan=1>机器数</td><td rowspan=1 colspan=1>寄存器</td><td rowspan=1 colspan=1>机器数</td></tr><tr><td rowspan=1 colspan=1>0x0804 9300</td><td rowspan=1 colspan=1>Oxfff fffO</td><td rowspan=1 colspan=1>EAX</td><td rowspan=1 colspan=1>0x0804 9300</td></tr><tr><td rowspan=1 colspan=1>0x0804 9400</td><td rowspan=1 colspan=1>0x8000 0008</td><td rowspan=1 colspan=1>EBX</td><td rowspan=1 colspan=1>0x0000 0100</td></tr><tr><td rowspan=1 colspan=1>0x0804 9384</td><td rowspan=1 colspan=1>0x80f7 ff00</td><td rowspan=1 colspan=1>ECX</td><td rowspan=1 colspan=1>0x0000 0010</td></tr><tr><td rowspan=1 colspan=1>0x0804 9380</td><td rowspan=1 colspan=1>0x908f 12a8</td><td rowspan=1 colspan=1>EDX</td><td rowspan=1 colspan=1>0x0000 0080</td></tr></table>

分别说明执行以下指令后，哪些地址或寄存器中的内容会发生改变？改变后的内容是什么？条件标志OF、SF、ZF和CF会发生什么改变？

(1) addl (%eax), %edx

(2) subl (%eax, %ebx), %ecx

(3) orw 4(%eax, %ecx, 8), %bx

(4) testb \$0x80, %dl

(5) imull \$32, (%eax, %edx), %ecx

(6) mulw %bx

(7) decw %cx

9. 假设函数 operate 的部分 C 代码如下：

以下汇编代码用来实现第2行语句的功能，请写出每条汇编指令的注释，并根据以下汇编代码，填写operate函数缺失的部分。

![](images/0efa74db8e64c7b7f36bfcb103e0bb283e1745975fd07aefe1fe34943e6982c3.jpg)

10. 假设函数 product 的 C 语言代码如下，其中 num\_type 是用 typedef 声明的数据类型。

![](images/b34d39143f68751ef4bbff2d1e357e14dc51df6f688a751114cd0bb4e39cd5e6.jpg)

函数 product的过程体对应的主要汇编代码如下：

![](images/ed458117e1f503b65fffcc4e5a2573270de2c2c3b7356a9553a42a8b66230dea.jpg)

请给出上述每条汇编指令的注释，并说明num\_type是什么类型。

11. 已知IA-32是小端方式处理器，根据给出的IA-32机器代码的反汇编结果（部分信息用x表示）回答问题。

(1) 已知 je指令的操作码为0111 0100，je指令的跳转目标地址是什么？call指令中的跳转目标地址0x80483b1是如何反汇编出来的？

(2) 已知jb指令的操作码为01110010，jb指令的跳转目标地址是什么？movl指令中的目的地址是如何反汇编出来的？

![](images/77f110eb2cfa263c2a0b6c1ae87fe2f15beafb82d1ea7ffd75e1f1cbcc1d5d61.jpg)

(3) 已知jle指令的操作码为01111110，mov指令的地址是什么？

![](images/46e92ef3898af10fe71d8479da6a2ca93c0ffc4d547848daa145772b34b99dde.jpg)

(4) 已知jmp 指令的跳转目标地址采用相对寻址方式，jmp 指令操作码为1110 1001，其跳转目标地址是什么？

![](images/cbcfdebeaa46cffa56b56f7d1f7cc3d124f06a98644a295b99a0158674d0b063.jpg)

12. 已知函数 comp的C 语言代码及其过程体对应的汇编代码如图3.24所示。

![](images/4c278ae4d27ef3fbaf19bbc9d8b0b8ef5391ee4ac9bf69a7803e6975b5f57a49.jpg)  
图3.24 题12图

回答下列问题或完成下列任务。

(1)给出每条汇编指令的注释并说明为何C代码只有一个if语句而汇编代码有两条条件跳转指令。

(2) 按照图 3.18 给出的“if（） goto …”语句形式写出汇编代码对应的 C 语言代码。

13. 已知函数 func的C 语言代码框架及其过程体对应的汇编代码如图 3.25 所示，根据对应的汇编代码填写C代码中缺失的表达式。

14. 已知函数 do\_loop 的 C 语言代码如下。

![](images/7e003f56e88648650d60a618a5d001027aa70328dc9cc6d7303a937c1c57f69a.jpg)

函数 do\_loop的过程体对应的汇编代码如下。

1 int func(int x, int y)   
2 {   
3 int z =   
4 if( ){   
5 if(   
6 z=   
7 else   
8 Z=   
9 } else if (   
10 z=   
11 return z,   
12

图 3.25 题13图  
![](images/57919f3e7759bf47fa107d0b10421cc2e4b2620f7831d70026831e759252335f.jpg)

回答下列问题或完成下列任务。

(1)给每条汇编指令添加注释，并说明每条指令执行后，目的寄存器中存放的是什么内容？

（2）上述函数过程体中用到了哪些被调用者保存寄存器和哪些调用者保存寄存器？在该函数过程体前面的准备阶段哪些寄存器必须保存到栈中？

(3) 为什么第7行中的DX寄存器需要算术右移15位？

15. 已知函数f1()的C语言代码框架及其过程体对应的汇编代码如图3.26所示，根据对应的汇编代码填写C代码中缺失部分，并说明函数f1()的功能。

![](images/4aea078098396c9f6898a2a755729609b83bf3d0c481734661e69437cb4c5d3f.jpg)

![](images/21fad82ba0f27db926f35a9bf275f39fd2fcc24e41d2ec0bdb75f783ca4f883a.jpg)  
图 3.26 题15图

16. 已知函数 sw()的 C 语言代码框架如下:

![](images/a0d59469c73b13ebe635f7c1d02924c88f212785837cfe3177e66908511cc2c5.jpg)

对函数sw()进行编译，得到函数过程体中开始部分的汇编代码以及跳转表如图3.27所示。

![](images/78d3c76a826bd45e6180d3f701b083464574185386a78bab4f545c3aac1d935c.jpg)  
图3.27 题16图

请问：函数sw()中的switch语句处理部分标号的取值情况如何？标号的取值在什么情况下执行default分支？哪些标号的取值会执行同一个 case分支？

17. 已知函数 test()的入口参数有a、b、c 和p，C 语言程序中过程体代码如下。

函数test()过程体对应的汇编代码如下。

![](images/68af6bb86e8ac3b1b819765de999b51d5f3aa95010abc14f8b611d0038e415c6.jpg)

写出函数test()的原型，给出返回参数的类型以及入口参数 a、b、c和p的类型和顺序。

18. 函数lproc的过程体对应的汇编代码如下。

![](images/cb9fff7546416d04881d26b3be988a6c5746367164c5263e4da628e859fadbbe.jpg)

上述代码根据以下lproc 函数的 C 代码编译生成：

![](images/d128f8956d074cd5a94d894bd20a30b5d914ad9a90c869051860247170cc8f50.jpg)

回答下列问题或完成下列任务。

(1)给每条汇编指令添加注释。

(2） 参数x和k分别存放在哪个寄存器中？局部变量val和i分别存放在哪个寄存器中？

(3) 局部变量val 和i的初始值分别是什么？

(4)循环终止条件是什么？循环控制变量i是如何被修改的？

(5) 填写C 代码中缺失的部分。

19. 已知递归函数 refunc 的 C 语言代码框架如下。

![](images/b5d389b0de2b82664ea656bfedee27085e74af7e999c09c1789d2f525ef8e6af.jpg)

上述递归函数过程体对应的汇编代码如下。

![](images/26d386631ac73271402a4a276f5d30df099ef0a131915b186b53de213d2595b5.jpg)

根据对应的汇编代码填写C代码中缺失部分，并说明函数的功能。

20. 填写表3.14，说明每个数组的元素大小、整个数组的大小以及第i个元素的地址。

表 3.14 题 20 用表
<table><tr><td rowspan=1 colspan=1>数组</td><td rowspan=1 colspan=1>元素大小（B）</td><td rowspan=1 colspan=1>数组大小（B）</td><td rowspan=1 colspan=1>起始地址</td><td rowspan=1 colspan=1>元素的地址</td></tr><tr><td rowspan=1 colspan=1>char A[10]</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>&amp;A[0]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>int B[100]</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>&amp;B[0]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>short * C[5]</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>&amp;C[0]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>short * * D[6]</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>&amp;D[0]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>long double E[ 10]</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>&amp;E[0]</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>long double * F[ 10]</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>&amp;F[0]</td><td rowspan=1 colspan=1></td></tr></table>

21. 假设 short 型数组 S 首地址 $\mathrm { A } _ { \mathrm { S } } .$ 和数组下标变量i（int型）分别存放在寄存器EDX和ECX中，表达式的结果存放在EAX或AX中，仿照例子填写表3.15，说明表达式的类型、值和相应的汇编代码。

表 3.15 题21 用表
<table><tr><td colspan="1" rowspan="1">表达式</td><td colspan="1" rowspan="1">类   型</td><td colspan="1" rowspan="1">值</td><td colspan="1" rowspan="1">汇编代码</td></tr><tr><td colspan="1" rowspan="1">S</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">S+i</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">S[i]</td><td colspan="1" rowspan="1">short</td><td colspan="1" rowspan="1"> $\mathbb { M } [ { \mathrm { \ A } } _ { \mathrm { S } } { \mathrm { + } } 2 * { \mathrm { i } } ]$ </td><td colspan="1" rowspan="1">movw (%edx, %ecx, 2), %ax</td></tr><tr><td colspan="1" rowspan="1">&amp;S[10]</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">&amp;S[i+2]</td><td colspan="1" rowspan="1">short *</td><td colspan="1" rowspan="1"> $\mathrm { \AA } _ { \mathrm { S } } { \div } 2 * \mathrm { \ i } { + } 4$ </td><td colspan="1" rowspan="1">leal 4(%edx, %ecx, 2), %eax</td></tr><tr><td colspan="1" rowspan="1">&amp;S[i]-S</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">S[4 * i+4]</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr><tr><td colspan="1" rowspan="1">*(S+i-2)</td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td><td colspan="1" rowspan="1"></td></tr></table>

22. 假设结构类型 node的定义、函数 np\_init()的部分 C 代码及其对应的部分汇编代码如图3.28所示。

![](images/5fc8dddf8804e1136f84cab4162ea1f4b52bd5bc87840aea41e6148c92f25f53.jpg)  
图3.28 题22图

回答下列问题或完成下列任务。

(1) 结构 node 所需存储空间有多少字节？成员 p、s. x、s. y 和 next 的偏移地址分别为多少?

(2) 根据汇编代码填写 np\_init 中缺失的表达式。

23. 给出下列各个结构类型中每个成员的偏移量、结构总大小以及在IA-32+Linux下结构起始位置的对齐要求。

(1) struct S1 { short s; char c; int i; char d; } ;

(2) struct S2 {int i; short s; char c; char d; } ;

(3) struct S3 { char c; short s; int i; char d; } ;

(4) struct S4 { short s[3]; char c; };

(5) struct S5 { char c[3]; short \* s; int i; char d; double e;} ;

(6) struct S6 { struct S1 c[3]; struct S2 \* s; char d; } ;

24. 以下是结构 test 的声明：

![](images/13d5057a3f52aa94556a81b8c25bd19a161316a6264b873859534113f24fb665.jpg)

假设在IA-32+Windows平台上编译，则这个结构中每个成员的偏移量是多少？结构总大小为多少字节？如何调整成员的先后顺序使得结构所占空间最小？

25. 假定函数abc()的入口参数有a、b和c，每个参数都可能是带符号整数或无符号整数类型且长度也可能不同。该函数具有如下过程体。

在x86-64机器上编译后的汇编代码如下。

分析上述汇编代码，以确定三个人口参数的顺序和可能的数据类型，写出函数abc()可能的4种合理的函数原型。

## 第4章 可执行文件的生成与加载执行

一个大的程序往往会分成多个源程序文件来编写，因而需要对各个不同源程序文件分别进行编译和汇编，以生成多个不同的目标代码文件。为了生成一个可执行文件，需要将所有关联的目标代码文件，包括用到的标准库函数目标文件，按照某种形式组合在一起。形成一个具有统一地址空间的可被加载到存储器直接执行的程序。这种将一个程序的所有关联模块对应的目标代码文件结合在一起。以形成一个可执行文件的过程称为链接，由专门的链接程序（Linker，也称为链接器）来实现。链接生成的可执行文件可以被加载并在计算机中执行，计算机能自动逐条取出程序中的指令并执行。

本章主要内容包括链接的基本概念、目标文件格式、符号解析和重定位的基本概念、可执行文件的生成过程、指令执行过程、CPU的基本功能和基本组成、数据通路的工作原理和设计方法，以及流水线方式下指令的执行过程。

## 4.1 可执行文件生成概述

链接概念早在高级编程语言出现前就已存在。在汇编语言代码中，可以用一个标号表示某个跳转目标指令的地址（即给定了一个标号的定义）。而在另一条跳转指令中引用该标号：也可以用一个标号表示某个操作数的地址，而在某条使用该操作数的指令中引用该标号。因而，在对汇编语言源程序进行汇编的过程中，需要对每个标号的引用，找到该标号对应的定义，建立每个标号的引用和其定义之间的关联关系，从而在引用标号的指令中正确地填入对应的地址码字段，以保证能访问到所引用的符号定义处的信息。

在高级编程语言出现之后，程序功能越来越复杂，程序规模越来越大，需要多人开发不同的程序模块。在每个程序模块中，包含一些变量和子程序（函数）的定义。这些被定义的变量和子程序的起始地址就是符号定义，子程序（函数或过程）的调用或者在表达式中使用变量进行计算就是符号引用。某一个模块中定义的符号可以被另一个模块引用，因而最终必须通过链接将程序包含的所有模块合并起来，合并时须在符号引用处填入定义处的地址。

## 4.1.1预处理、编译和汇编

在第1章和第3章中都提到过，将高级语言源程序转换为可执行文件通常分为预处理、编译、汇编和链接4步。前三步用来对每个模块（即源程序文件）生成可重定位目标文件(Relocatable Object File)。GCC 生成的可重定位目标文件后缀为.0，VS 输出的可重定位目标文件扩展名为.obi。最后一步为链接，用来将若干可重定位目标文件（可能包括若干标准库函数目标模块）组合起来，生成一个可执行目标文件（Executable Object File)。本书将可重定位目标文件和可执行目标文件分别简称为可重定位文件和可执行文件。

下面以GCC 处理C语言程序为例说明处理过程。可以通过-v选项查看GCC 每一步的处理结果。如果想得到每个处理过程的结果，则可以分别使用-E、-S和-c选项来进行预处理、编译和汇编，对应的处理工具分别为cpp、cc1和as，处理后得到文件的文件名后缀分别是.i、.s 和.o。

## 1. 预处理

预处理是从源程序变成可执行文件的第一步，C 预处理程序为cpp（即C Preprocessor)，主要用于C语言编译器对各种预处理命令进行处理，包括对头文件的包含、宏定义的扩展、条件编译的选择等，例如，对于#include指示的处理结果，就是将相应.h文件的内容插入源程序文件中。

GCC中的预处理命令是“gcc-E”或“cpp”，例如，可用命令“gcc -E main.c -omain. i”或“cpp main. c-o main. i”将 main. c 转换为预处理后的文件 main. i。

## 2. 编译

C编译器在进行具体的程序翻译前。会先对源程序进行词法分析、语法分析和语义分析，然后根据分析的结果进行代码优化和存储分配，最终把C语言源程序翻译成汇编语言程序。编译器通常采用对源程序进行多次扫描的方式进行处理，每次扫描集中完成一项或几项任务，也可以将一项任务分散到几次扫描去完成。例如，可以按照以下四趟扫描进行处理：第一趟扫描进行词法分析；第二趟扫描进行语法分析；第三趟扫描进行代码优化和存储分配；第四趟扫描生成代码。

GCC可以直接产生机器语言代码，也可以先产生汇编语言代码，然后再通过汇编程序将汇编语言代码转换为机器语言代码。GCC中的编译命令是“gcc-S”或“cc1”，例如，可使用命令“gcc -S main. i -o main. s”或“ccl main. i -o main. s”对 main. i 进行编译并生成汇编代码文件 main. s，也可以使用命令“gcc -S main. c -o main. s”或“gcc -S main. c”直接对 main.c预处理并编译生成汇编代码文件 main.s。

## 3. 汇编

汇编的功能是将编译生成的汇编语言代码转换为机器语言代码。因为通常最终的可执行文件由多个不同模块对应的机器语言目标代码组合而成，所以，在生成单个模块的机器语言目标代码时，不可能确定每条指令或每个数据最终的地址，即单个模块的机器语言目标代码需要重新定位，因此，通常把汇编生成的机器语言目标文件称为可重定位目标文件。

GCC中的汇编命令是“gcc -c”或“as”命令。例如，可用命令“gcc -c main.s -omain. o”或“as main. s -o main. o”对汇编语言代码文件 main. s 进行汇编，以生成可重定位文件 main.o。也可以使用命令“gcc -c main.c -o main.o”或“gcc -c main.c”直接对main.c进行预处理并编译生成可重定位文件main.o。

## 4.1.2 程序的链接过程

链接的功能是将所有关联的可重定位目标文件组合起来，以生成一个可执行目标文件。例如，对于图4.1所示的两个模块main.c和test.c，假定通过预处理、编译和汇编，分别生成了可重定位目标文件 main. o 和 test. o，则可以用命令“gcc -o test main. o test. o”或“1d-o test main. o test. o”来生成可执行文件 test。这里，Id 是静态链接器命令。

也可以用一个命令“gcc -o test main. c test. c”来实现对源程序文件 main. c 和 test. c 的预处理、编译和汇编，并将两个可重定位文件main.o和test.o进行链接，最终生成可执行文件 test。命令“gcc -o test main. c test. c”的处理过程如图 4.2 所示。

![](images/de4c02fcbd348cd48bab9cbed9528c5fbdd38d9db7ebcb5a17b13097ffc98d4e.jpg)  
图4.1 两个源程序文件组合成一个可执行目标文件示例

![](images/9ebf874d3016346627c32ff7f8bdf7af112a4996da6cc1069118800fff93667a.jpg)  
图 4.2 生成可执行文件 test的过程

可重定位文件和可执行文件都是机器语言目标文件，所不同的是前者是单个模块生成的，而后者是多个模块组合而成的。因而，对于前者，代码总是从0开始，而对于后者，代码在ABI规范规定的虚拟地址空间中产生。有关虚拟地址空间的概念在第5章介绍。

例如，通过“objdump -d test. o”命令显示的可重定位文件 test. o的结果如下。

![](images/90a9468880857c0312a51b1b6431780e412632b8c0c6c6798f1bad7aa7e14d47.jpg)

通过“objdump -d test”命令显示的可执行文件 test的结果如下。

![](images/fdecfde254424d623364c253d0113ca21aa99419f52b97bc7c9ef741fa8a47cc.jpg)

![](images/ce057e1430e5df589d9861471d50689dfe3cbc0d1015a309e092dcb4b6864892.jpg)

上述给出的通过objdump命令输出的结果包括指令的地址、机器代码和反汇编出来的汇编代码。可以看出，在可重定位文件test.o中add函数的起始地址为0；而在可执行文件test中 add 函数的起始地址为 0x80483d4。

实际上，可重定位文件和可执行文件都不是可以直接显示的文本文件，而是不可显示的二进制文件，它们都按照一定的格式以二进制字节序列构成一种目标文件，其中包含二进制代码区、只读数据区、初始化数据区和未初始化数据区等，每个信息区称为一个节（Section)，如代码节（. text）、只读数据节（. rodata）、已初始化全局数据节（. data）和未初始化全局数据节（.bss）等。

链接器在将多个可重定位文件组合成一个可执行文件时，主要完成符号解析和重定位两个任务。

## 1. 符号解析

符号解析的目的是将每个符号的引用与一个确定的符号定义建立关联。符号包括全局静态变量名和函数名，而非静态局部变量名则不是符号。例如，对于图4.1所示的两个源程序文件 main. c和 test. c，在 main. c 中定义了符号 main，并引用了符号 add；在 test. c 中则定义了符号add，而入口参数i、i和非静态局部变量x都不是符号。链接时需要将main.o中引用的符号 add 和 test. o 中定义的符号 add 建立关联。再例如，全局变量声明“int \* xp = &x;”中，通过引用符号x来对符号xp进行了定义。编译器将所有符号存放在可重定位文件的符号表（Symbol Table）中。

## 2. 重定位

可重定位文件中的代码区和数据区都是从地址0开始的，链接器需要将不同模块中相同的节合并起来生成一个新的单独的节，并将合并后的代码区和数据区按照ABI规范确定的虚拟地址空间划分（也称存储器映像）来重新确定位置。例如，对于LA-32+Linux系统存储器映像。其只读代码段总是从地址0x8048000开始，而可读可写数据段总是在只读代码段后面的第一个4KB对齐的地址处开始。因而链接器需要重新确定每条指令和每个数据的地址，并且在指令中需要明确给定所引用符号的地址，这种重新确定代码和数据的地址并更新指令中被引用符号地址的操作称为重定位（Relocation）。

使用链接的第一个好处就是“模块化”，它能使一个程序被划分成多个模块，由不同的程序员进行编写，并且可以构建公共的函数库（如数学函数库、标准V0函数库等）以提供给不同的程序进行重用。采用链接的第二个好处是“效率高”，每个模块可以分开编译，在程序修改时只须重新编译那些修改过的源程序文件，然后再重新链接，因而从时间上来说，能够提高程序开发的效率：同时，因为源程序文件中无须包含共享库的所有代码，只要直接调用即可，而且在可执行文件运行时的内存中，也只需要包含所调用函数的代码而不需要包含整个共享库，因而链接也有效地提高了空间利用率。

## 4.2 目标文件格式

目标代码（Object Code）指编译器或汇编器处理源代码后所生成的机器语言目标代码。目标文件（Object File）指存放目标代码的文件。

## 4.2.1 ELF 目标文件格式

目标文件中包含可直接被CPU执行的机器代码以及代码在运行时使用的数据，还有其他的如重定位信息和调试信息等，不过，目标文件中唯一与运行时相关的要素是机器代码及其使用的数据，例如，用于嵌入式系统的目标文件可能仅仅含有机器代码及所用数据。

最初，不同的计算机都拥有自身独特的目标文件格式，但随着UNIX和其他可移植操作系统的问世，人们定义了一些标准目标文件格式，并在不同的系统上使用它们。最简单的是DOS的COM文件格式，它仅由代码和数据组成，而且始终被加载到某个固定位置。其他的目标文件格式（如COFF和ELF）都比较复杂，由一组严格定义的数据结构序列组成，这些复杂格式的规范说明书一般会有许多页。SystemV UNIX的早期版本使用的是通用目标文件格式(Common Object File Format，COFF)。Windows 使用的是 COFF 的一个变种，称为可移植可执行格式（Portable Executable，PE)。现代 UNIX 操作系统，如 Linux、BSD Unix等，主要使用可执行可链接格式(Executable and Linkable Format，ELF)，本章采用 ELF 标准二进制文件格式进行说明。

ELF目标文件既可用于程序的链接，也可用于程序的执行。图4.3说明了ELF目标文件格式的基本框架。

图4.3a是链接视图，主要由不同的节组成，节是ELF文件中具有相同特征的最小可处理信息单位，不同的节描述了目标文件中不同类型的信息及其特征，例如，代码节（. text）、只读数据节（.rodata）、已初始化的全局数据节（.data）、未初始化的全局数据节(. bss)等。图4.3b是执行视图，主要由不同的段(Segment)组成，描述了目标文件中的节如何映射到存储空间的段中，可以将多个节合并后映射到同一个段，例如，可以合并节.data和节.bss的内容，并映射到一个可读可写的数据段中。

前面提到通过预处理、编译和汇编三个步骤后.可生成可重定位目标文件，多个关联的可重定位目标

![](images/6e15d912e297670af08835e317751d71eb028969d7d201f6b72464d0757e11eb.jpg)  
a) 链接视图  
b) 执行视图  
图4.3 ELF 目标文件的两种视图

文件经过链接后生成可执行目标文件。这两类目标文件对应的ELF视图不同，显然，可重定位目标文件对应链接视图，而可执行目标文件对应执行视图。

ELF文件中的节头表包含其中各节的说明信息，每个节在该表中都有一个与之对应的项，每一项都指定了节名和节大小之类的信息。用于链接的目标文件必须具有节头表，例如，可重定位文件就一定要有节头表。程序头表用来指示系统如何创建进程的存储器映像，用于创建进程存储映像的可执行文件和共享库文件必须具有程序头表，而可重定位目标文件

无需程序头表。

## 4.2.2 可重定位目标文件格式

可重定位文件主要包含代码部分和数据部分，它可以与其他可重定位文件链接，从而创建可执行文件或共享库文件。如图4.4所示，ELF可重定位文件由ELF头、节头表以及各个不同的节组成。

![](images/b3b870a0a22fc9955ca8a1bc45767235744861e3038fd9b0c90ee907e30c61de.jpg)  
图4.4 ELF 可重定位目标文件

## 1. ELF 头

ELF头位于目标文件的起始位置，包含文件结构说明信息。ELF头的数据结构分32位系统对应结构和64位系统对应结构。以下是32位系统对应的数据结构，共占52B。

![](images/d20e739b37fd670db6491081d571c48a7d2271d2248a2c72f5b02fb5f05d548e.jpg)

64位系统对应的数据结构为Elf64\_Ehdr，占64 B，其中描述的成员与 Elf32\_Ehdr类似。文件开头几个字节称为魔数，通常用来确定文件的类型或格式。在加载或读取文件时，可用魔数确认文件类型是否正确。在32位ELF头的数据结构中，字段eident是一个长度为16的字节序列，其中，最开始的4B为魔数，用来标识是否为ELF文件，第一字节为0x7F，后面三字节分别为“E”“L”“F”。再后面的12B中，主要包含一些标识信息，如标识是32位还是64位格式、标识数据按小端还是大端方式存放、标识ELF头的版本号等；e\_type用于说明目标文件的类型是可重定位文件、可执行文件、共享库文件，还是其他类型文件；e\_machine 用于指定机器结构类型，如 IA-32、SPARC V9、AMD64等；e\_version 用于标识目标文件版本；e\_entry用于指定程序的起始虚拟地址（入口点），如果文件没有关联的入口点，则为零，对于可重定位文件此字段为0；e\_ehsize用于说明ELF头的大小(以字节为单位)；e\_shoff指出节头表在文件中的偏移量(以字节为单位)；e\_shentsize表示节头表中一个表项的大小（以字节为单位），所有的表项大小相同；e\_shnum表示节头表中的项数，e\_shentsize和 e\_shnum共同确定节头表大小（以字节为单位)。

仅ELF头在文件中具有固定位置，即总是在最开始的位置，其他部分的位置由ELF头和节头表指出，不需要具有固定的顺序。

可以使用 readelf-h命令对ELF头进行解析。例如，以下是通过“readelf-h main.o”对某 main.o 文件进行解析的结果。

![](images/abea45cdd63760eff0656a87c14bc69e1c15a3d6cdff39f422180670bf2c5b62.jpg)

从上述解析结果可以看出，该main.o文件中，ELF头长度（e\_ehsize）为52B，因为是可重定位文件，所以字段 e\_entry（Entry point address）为0，无程序头表（Size of programheaders=0)。节头表离文件起始处的偏移（e\_shoff）为516B，每个表项大小（e\_shentsize)占40B，表项数（e\_shnum）为15个。字符串表（.strtab节）在节头表中的索引（e\_shstrndx）为12。

## 2. 节

节是ELF文件中的主体信息，包含了链接过程所用的目标代码信息，包括指令、数据、符号表和重定位信息等。一个典型的ELF可重定位目标文件中包含下面几个节。

. text：目标代码部分。

.rodata：只读数据，如 printf 语句中的格式串、开关语句（如 switch-case）的跳转表等。

data：已初始化且初值不为0的全局变量和静态变量。

.bss：所有未初始化或初始化为0的全局变量和静态变量。因为未初始化变量没有具体的值。所以无须在目标文件中分配用于保存值的空间。即它在目标文件中不占据实际的盘空间，仅是一个占位符。运行时在存储器中再为这些变量分配空间，并设定初始值为0。目标文件中区分初始化和未初始化变量是为了提高盘空间利用率。

对于auto型局部变量，它们在运行时被分配在栈中，因此既不出现在.data节，也不出现在.bss节。

.symtab：符号表（Symbol Table)。在程序中被定义的函数名和全局静态变量名都属于符号，与这些符号相关的信息被保存在符号表中。每个可重定位目标文件都有一个. symtab节。

.rel. text：.text 节相关的可重定位信息。当链接器将某个目标文件和其他目标文件组合时，，text节中的代码被合并后，一些指令中引用的操作数地址信息或跳转目标指令位置信息等都可能要被修改，因此需要说明指令如何进行重定位。

.rel.data：.data节相关的可重定位信息。当链接器将某个目标文件和其他目标文件组合时，.data节被合并后，一些全局变量的地址可能被修改，因此需要说明数据如何进行重定位。

.debug：调试用符号表，有些表项对定义的局部变量和类型定义进行说明，有些表项对定义和引用的全局静态变量进行说明。只有使用带一g选项的gcc命令才会得到这张表。

. line：C 源程序中的行号和. text 节中机器指令之间的映射。只有使用带-g 选项的 gcc命令才会得到这张表。

.strtab：字符串表，包括.symtab节和.debug节中的符号以及节头表中的节名。字符串表就是以null结尾的字符串序列。

## 3. 节头表

节头表由若干个表项组成，每个表项描述相应节的节名、在文件中的偏移、大小、访问属性、对齐方式等，目标文件中的每个节都有一个表项与之对应。除ELF头之外，节头表是ELF可重定位目标文件中最重要的一部分内容。

以下是32位系统对应的数据结构，节头表中每个表项占40B。

![](images/4f344bad0d1126897d117e44efeef543f25b7613fc6537982f20642cc06b1169.jpg)

64 位系统对应的数据结构为Elf64\_Shdr，占64 B，其中描述的成员与Elf32\_Shdr类似。可以使用readelf-S命令对某个可重定位目标文件的节头表进行解析。例如，以下是通过“readelf- Stest. o”对某test.o文件进行解析的结果。根据每个节在文件中的偏移地址和长度，可以画出可重定位目标文件test.o的结构，如图4.5所示。

![](images/6c8c5a98d00d0446c3243753d257a51325765f0f8ffacb31afd0032ff57b1da4.jpg)

<table><tr><td>000000</td><td>ELF头 e_shoff=0x120</td><td rowspan="2">5b</td></tr><tr><td rowspan="4">000034 00008f 000090 00009c 0000a0</td><td>text</td></tr><tr><td></td><td></td></tr><tr><td>.data</td><td>0c 04</td></tr><tr><td>rodata bss .comment</td><td>0c 2e</td></tr><tr><td>0000ce 00011f</td><td>shstrtab</td><td>51</td></tr><tr><td rowspan="2">000120 0002d8</td><td>节头表</td><td>1b8</td></tr><tr><td>.symtab</td><td>120</td></tr><tr><td>0003f8</td><td>.strtab</td><td></td></tr><tr><td rowspan="2">000496 000498</td><td></td><td rowspan="2">9e 28</td></tr><tr><td>.rel.text</td></tr></table>

图 4.5 test. o 文件结构

从上述解析结果可以看出，该test.o文件中共有11个节，节头表从120B处开始。其中，.text、.data、.bss 和. rodata 节需要在存储器中分配空间（Flg 中有 A)，.text 节是可执行的 $\mathrm { \langle F l g }$ 中有X)，.data 和.bss 两个节是可读/写的(Flg 中有 W)，而.rodata 节则是只读不可写的 $\mathbb { F } \mathbb { g }$ 中无W)。图4.5中左边是对应节的偏移地址，右边是对应节的长度。例如，.text 节从文件的第 $0 \mathrm { x } 3 4 = 5 2 \ \mathrm { B }$ 开始，共占 $0 \mathrm { x } 5 \mathrm { b } = 9 1 \ \mathrm { B } _ { \circ }$ 从节头表的解析结果看，.bss节和.rodata节的偏移地址都是0x00009c，占用区域重叠，因此可推断出.bss节在文件中不占用空间，但节头表中记录了.bss节的长度为 $0 \times 0 \mathrm { c } = 1 2$ ，因而，操作系统在程序加载时需在主存中为.bss节分配12 B 空间。

## 4.2.3 可执行目标文件格式

链接器将相互关联的可重定位目标文件中相同的代码数据节（如.text节、.rodata节、.data节和，bss节）合并，以形成可执行目标文件中对应的节。因为相同的代码数据节合并后，在可执行目标文件中各条指令之间、各个数据之间的相对位置就可以确定，因而所定义的函数（过程）和变量的起始位置就可以确定，也即每个符号的定义（即符号所在的首地址）即可确定，从而在符号的引用处可以根据确定的符号定义进行重定位。

ELF可执行目标文件由ELF头、程序头表、节头表以及各个不同的节组成，如图4.6所示。

可执行文件格式与可重定位文件格式类似，例如，这两种格式中，ELF头的数据结构一样，.text节、.rodata节和.data节中除了有些重定位地址不同以外，大部分都相同。与ELF可重定位文件格式相比，ELF可执行文件的不同点主要有以下几个方面。

1) ELF 头中字段 e\_entry 给出程序执行入口地址，可重定位文件中此字段为0。

2）通常会有.init节和.fini节，其中.init节定义一个init函数，用于可执行文件开始执行时的初始化工作，当程序开始运行时，系统会在进程进入主函数main之前，先执行这个节中的指令代码。.fini节中包含进程终止时要执行的指令代码，当程序退出时，系统会执行这个节中的指令代码。

![](images/e413e676ecbd445ae7894cc8bf792f284cfe525a793ea87e135a4ee1daf27fe1.jpg)  
图4.6 ELF 可执行目标文件

3） 少了.rel. text和.rel. data等重定位信息节。因为可执行文件中的指令和数据已被重定位，故可去掉用于重定位的节。

4）多了一个程序头表，也称段头表（Segment Header Table)，它是一个结构数组。

可执行文件中所有代码位置连续，所有只读数据位置连续，所有可读可写数据位置连续。如图4.6所示，因而在可执行文件中，ELF头、程序头表、.init节、.fini节、.text节和. rodata 节合起来可构成一个只读代码段(Read-only Code Segment);.data 节和. bss 节合起来可构成一个可读/写数据段(Read/Write Data Segment)。显然，在可执行文件启动运行时，这两个段必须分配存储空间并装入内存，因而称为可装入段。

为了在可执行文件执行时能够在内存中访问到代码和数据，必须将可执行文件中这些连续的具有相同访问属性的代码和数据段映射到存储空间中。程序头表就用于描述这种映射关系，一个表项对应一个连续的存储段或特殊节。程序头表的表项大小和表项数分别由ELF头中 e\_phentsize 和 e\_phnum 字段指定。

32位系统的程序头表中每个表项具有以下数据结构：

![](images/be5d1625b6344d57541d3a8c1961fe5c05045d2319a0566128f676e1ce407bcc.jpg)

64位系统对应的数据结构为Elf64\_Phdr，其中描述的成员与Elf32\_Phdr类似，出于对齐考虑，Elf64\_Phdr 将 p\_flags 移到了 $\mathfrak { P } _ { \infty }$ offset之前。

p-type描述存储段的类型或特殊节的类型。例如，是否为可装入段（PT\_LOAD)，是否是特殊的动态节（PT\_DYNAMIC），是否是特殊的解释程序节（PT\_INTERP）。P\_offset指出本段的首字节在文件中的偏移地址。 $\mathbb { p } _ { - } \mathbb { v } \mathrm { a d d r }$ 指出本段首字节的虚拟地址。P-paddr指出本段首字节的物理地址，因为物理地址由操作系统根据情况动态确定，因而该信息通常是无效的。p\_filesz指出本段在文件中所占的字节数，可以为0。p\_memsz指出本段在存储器中所占字节数，也可以为 $0 _ { \circ }$ p\_flags指出存取权限。p\_align指出对齐方式，用一个模数表示，为2的正整数幂，通常模数与页面大小相关，若页面大小为4KB，则模数为 22。 $2 ^ { ! 2 }$

图4.7给出了使用“readelf-1 main”命令显示的可执行文件main的程序头表中的部分信息

<table><tr><td colspan="8">Program Headers:</td></tr><tr><td>Type</td><td>Offset</td><td>VirtAddr</td><td>PhysAddr</td><td>FileSiz</td><td>MemSiz</td><td>Flg</td><td>Align</td></tr><tr><td>PHDR</td><td>0x000034</td><td>0x08048034</td><td>0x08048034</td><td>0x00100</td><td>0x00100</td><td>RE</td><td>0x4</td></tr><tr><td>INTERP</td><td>0x000134</td><td>0x08048134</td><td>0x08048134</td><td>0x00013</td><td>0x00013</td><td>R</td><td>0x1</td></tr><tr><td colspan="8">[Requesting program interpreter: /lib/d-linux.so.2]</td></tr><tr><td>LOAD</td><td>0x000000</td><td>0x08048000</td><td>0x08048000</td><td>0x004d4</td><td>0x004d4</td><td>RE</td><td>0x1000</td></tr><tr><td>LOAD</td><td>0x000f0c</td><td>0x0804910c</td><td>0x08049f0c</td><td>0x00108</td><td>0x00110</td><td>RW</td><td>0x1000</td></tr><tr><td>DYNAMIC</td><td>0x000f20</td><td>0x08049f20</td><td>0x08049f20</td><td>0x000d0</td><td>0x000d0</td><td>RW</td><td>0x4</td></tr><tr><td>NOTE</td><td>0x000148</td><td>0x08048148</td><td>0x08048148</td><td>0x00044</td><td>0x00044</td><td>R</td><td>0x4</td></tr><tr><td>GNU_STACK</td><td>0x000000</td><td>0x00000000</td><td>0x00000000</td><td>0x00000</td><td>0x00000</td><td>RW</td><td>0x4</td></tr><tr><td>GNU_RELRO</td><td>0x000f0c</td><td>0x08049f0c</td><td>0x08049f0c</td><td>0x000f4</td><td>0x000f4</td><td>R</td><td>0x1</td></tr></table>

图 4.7 可执行文件 main的程序头表中部分信息

图4.7给出的程序头表中有8个表项，其中有两个是可装人段 $( \mathrm { \Delta T y p e = L O A D } )$ 对应的表项信息。

第一个可装入段对应可执行目标文件中第 $0 \mathrm { x } 0 0 0 0 0 \sim 0 \mathrm { x } 0 0 4 \mathrm { d } 3$ 字节的内容（包括ELF头、程序头表以及.init、.text和. rodata节等)，被映射到虚拟地址 0x8048000开始的长度为$0 \mathrm { x } 0 0 4 \mathrm { d } 4$ 字节的区域，按 $0 \times 1 0 0 0 = 2 ^ { 1 2 } = 4$ KB对齐，具有只读/执行权限 $\mathrm { \nabla { \cdot } } \operatorname { F i g } = \operatorname { R E } )$ ，它是一个只读代码段。

第二个可装入段对应可执行目标文件中第 $0 \mathrm { x 0 0 0 f 0 c }$ 开始的长度为 $0 \mathrm { x 0 0 1 0 8 }$ 字节的内容(即.data节)，被映射到虚拟地址0x8049f0c开始的长度为0x00110字节的存储区域，在$0 \times 0 0 1 1 0 = 2 7 2$ 字节的存储区中，前 $0 \mathrm { x 0 0 1 0 8 } = 2 6 4 \mathrm { \ B }$ 用.data节的内容来初始化，而后面的$2 7 2 - 2 6 4 = 8 \mathbf { B }$ 对应.bss节，被初始化为0，该段按 $0 \times 1 0 0 0 = 4$ KB对齐，具有可读可写权限

(Flg=RW)，因此，它是一个可读/写数据段。

从这个例子可以看出，.data节在可执行目标文件中占用了相应的盘空间，在存储器中也需要给它分配相同大小的空间；而，bss节在文件中不占用盘空间，但在存储器中需要给它分配相应大小的空间。

## 4.2.4 可执行文件的存储器映像

对于特定系统，可执行文件与虚拟地址空间之间的存储器映像（MemoryMapping）由ABI规范定义。例如，对于IA-32+linux 系统，i386 System V ABI 规范规定，只读代码段总是映射到虚拟地址为0x8048000开始的一段区域：可读/写数据段映射到只读代码段后面按4KB对齐的高地址上，其中.bss节所在存储区在运行时被初始化为 $0 _ { \circ }$ 运行时堆（Run-TimeHeap)则在可读/写数据段后面4KB对齐的高地址处，通过调用malloc()库函数动态向高地址分配空间，而运行时用户栈（UserStack）则从用户空间的最大地址往低地址方向增长。堆区和栈区中间有一块空间保留给共享库目标代码，用户栈区以上的高地址区是操作系统内核的虚拟存储区。对于图4.7所示的可执行文件main，对应的存储器映像如图4.8所示。

![](images/be3fc6046de23c96ec2347bb774eb4b7223146cc69b78ceee0698c785c6166ca.jpg)  
图4.8 Linux下可执行目标文件运行时的存储器映像

图4.8中左边为可执行文件main中的存储信息，右边为虚拟地址空间中的存储信息。可以看出，可执行文件最开始长度为0x004d4的可装入段映射到虚拟地址0x8048000开始的只读代码段；可执行文件中从0x00f0c到0x01013之间为.data节和.bss节（实际上都是.data节信息，而.bss节不占盘空间)，映射到虚拟地址0x8049000开始的可读/写数据段，其中.data节从0x8049f0c开始，共占0x00108=264字节，随后的8B空间分配给.bss节中定义的变量，初值为 $0 _ { \circ }$

## 4.3 符号解析与重定位

## 4.3.1 符号和符号表

目标文件中有一个符号表，表中包含了在程序模块中定义的所有符号的相关信息。对于

某个C程序模块m来说，包含在符号表中的符号有以下三种不同类型。

1）在m中定义并被其他模块引用的全局符号（Global Symbol)。这类符号包括非静态的函数名和全局变量名。

2） 由其他模块定义并被 m引用的全局符号，称为 m的外部符号（External Symbol)，包括在m中引用的在其他模块定义的外部函数名和外部变量名。

3） 在 m 中定义并在 m 中引用的本地符号（Local Symbol)。这类符号包括带 static 属性的函数名和全局变量名。这类在模块内部定义的带static属性的本地变量不在栈中管理，而是分配在静态数据区，即编译器为它们在节.data或.bss中分配空间。如果在m内有两个函数使用了同名static本地变量，则需要为这两个变量都分配空间，并作为两个不同的符号记录到符号表中。

注意，上述三类符号不包括分配在栈中的非静态局部变量（auto变量），链接器不需要这类变量的信息，因而它们不包含在由节.symtab定义的符号表中。

例如，对于图4.9给出的两个源程序文件 main.c 和 swap.c 来说，在 main.c 中的全局符号有 buf 和 main，外部符号有 swap；在 swap. c 中的全局符号有 bufp0、bufp1 和 swap，外部符号有buf。swap.c中的temp是局部变量，是在运行时动态分配的，因此，它不是符号，不会被记录在符号表中。

![](images/e1d6ae28193f9584ad3f0d55f7b184d967bc878da395fa3458ad59c8621fa3ea.jpg)  
图4.9 两个源程序文件模块

ELF文件中包含的符号表中每个表项具有以下数据结构。

![](images/7afa3a65c0722f640cb06594e79db27f8d4d41096ff6598e52a489d9e56e17c5.jpg)

64 位系统对应的数据结构为Elf64\_Sym，其中成员的描述与Elf32\_Sym类似。字段 st\_name给出符号在字符串表中的索引（字节偏移量），指向在字符串表（. strtab节）中的一个以null结尾的字符串，即符号。st\_value给出符号的值，在可重定位文件中，是指符号所在位置相对于所在节起始位置的字节偏移量。例如，图4.9中main.c的符号buf在.data节中，其偏移量为 $0 _ { \circ }$ 在可执行目标文件和共享目标文件中，st\_value则是符号所在的虚拟地址。st\_size给出符号所表示对象的字节个数。若符号是函数名，则是指函数所占字节个数；若符号是变量名，则是指变量所占字节个数。如果符号表示的内容没有大小或大小未知，则值为0。

字段st\_info指出符号的类型和绑定属性，从以下定义的宏可以看出，符号类型占低4位，符号绑定属性占高4位。

![](images/5aa46b84ede7e9f24f6d9259411d0be40c0add536e406c29a982a1bd8230ffa3.jpg)

符号类型可以是未指定（NOTYPE）、变量（OBJECT）、函数（FUNC）、节（SECTION）等。当类型为“节”时，其表项主要用于重定位。绑定属性可以是本地（LOCAL）、全局(GLOBAL）、弱（WEAK）等。其中，本地符号指在包含其定义的目标文件的外部是不可见的，名称相同的本地符号可存在于多个文件中而不会相互干扰。全局符号对于合并的所有目标文件都可见。弱符号是通过GCC扩展的属性指示符\_attribute\_((weak))指定的符号，它与全局符号一样，对于所有被合并目标文件都可见。

字段st\_other指出符号的可见性。通常在可重定位文件中指定可见性，它定义了当符号成为可执行文件或共享目标库的一部分后访问该符号的方式。

字段st\_shndx指出符号所在节在节头表中的索引，有些符号属于三种特殊伪节（PseudoSection）之一，伪节在节头表中没有相应的表项，无法表示其索引值，因而用以下特殊的索引值表示：ABS表示该符号不会被重定位；UNDEF表示未定义符号，即在本模块引用而在其他模块定义的外部符号；COMMON表示未被分配位置的未初始化的变量，称为COMMON符号，对应st\_value字段给出其对齐要求，st\_size字段给出其最小长度。

可通过 GNU READELF 工具显示符号表。例如，对于图4.9中 main.c 和 swap. c，可使用命令“readelf -s main.o”查看 main.o中的符号表，其最后三个表项显示结果如图 4.10所示。

<table><tr><td>Num</td><td>Value</td><td>Size</td><td>Type</td><td>Bind</td><td>Ot</td><td>Ndx B</td><td>Name</td></tr><tr><td>8:</td><td>0</td><td>8</td><td>OBJECT</td><td>GLOBAL</td><td>0</td><td>3</td><td>buf</td></tr><tr><td>9:</td><td>0</td><td>17</td><td>FUNC</td><td>GLOBAL</td><td>0</td><td>1</td><td>main</td></tr><tr><td>10:</td><td>0</td><td>0</td><td>NOTYPE</td><td>GLOBAL</td><td>0</td><td>UND</td><td>swap</td></tr></table>

图 4.10 main.o 中部分符号表信息

可看出，main模块的三个全局符号中，buf是变量（Type=OBJECT)，位于节头表中第三个表项（Ndx=3）对应的.data节中偏移量为0（Value=0）处，占8B（Size=8）；main是函数（Type=FUNC)，位于节头表中第一个表项对应的.text节中偏移量为0处，占17B；swap 是未指定（NOTYPE）且无定义（UND）的符号，说明 swap 是在main中被引用的由外部模块定义的符号。

swap.0符号表中最后4个表项结果如图4.11所示。

<table><tr><td>Num:</td><td>Value</td><td>Size</td><td>Type</td><td>Bind</td><td>0t</td><td>Ndx</td><td>Name</td></tr><tr><td>8:</td><td>0</td><td>4</td><td>OBJECT</td><td>GLOBAL</td><td>0</td><td>3</td><td>bufp0</td></tr><tr><td>9:</td><td>0</td><td>0</td><td>NOTYPE</td><td>GLOBAL</td><td>0</td><td>UND</td><td>buf</td></tr><tr><td>10:</td><td>0</td><td>39</td><td>FUNC</td><td>GLOBAL</td><td>0</td><td>ror</td><td>swap</td></tr><tr><td>11:</td><td>4</td><td>4</td><td>OBJECT</td><td>GLOBAL</td><td>0</td><td>COM</td><td>bufpl</td></tr></table>

图 4.11 swap.o 中部分符号表信息

可看出，swap模块的4个符号都是全局符号，其中，bufp0位于节头表中第三个表项对应的.data节中偏移量为0处，占4B；buf是未指定的且无定义的全局符号，说明buf是在swap中被引用的由外部模块定义的符号；swap是函数，位于节头表中第一个表项对应的.text节中偏移量为0处，占39B；bufp1是未分配位置且未初始化（Ndx=COM）的全局变量，按4B边界对齐，至少占4B。注意，swap模块中的变量temp是自动变量，因而不在符号表中说明。

## 4.3.2 符号解析和静态链接

符号解析的目的是将每个模块中引用的符号与某个目标模块中的定义符号建立关联。每个定义符号在代码段或数据段中都被分配了存储空间，因此，将引用符号与对应的定义符号建立关联后，就可以在重定位时将引用符号的地址重定位为相关联的定义符号的地址。

对于在同一个模块中定义且引用的本地符号的符号解析比较容易，因为编译器会检查每个模块中的本地符号是否具有唯一的定义，所以只要找到第一个本地定义符号与之关联即可。本地符号在可重定位文件的符号表中特指绑定属性为LOCAL的符号，包括所有在.text节中定义的带static属性的函数，以及在.data节和.bss节中定义的所有被初始化或未被初始化的带static属性的静态变量。

对于跨模块的全局符号，因为在多个模块中可能会出现对同名全局符号进行多重定义，所以链接器需要确认以哪个定义为准来进行符号解析。

## 1. 全局符号的解析规则

编译器在对源程序编译时，会把每个全局符号的定义输出到汇编代码文件中，汇编器通过对汇编代码文件的处理，在可重定位文件的符号表中记录全局符号的特性，以供链接时全局符号的符号解析所用。

一个全局符号可能是函数，或者是.data节中具有特定初始值的全局变量（如图4.1中main.c的全局变量a)，或者是.bss节中被初始化为0的全局变量（如图4.1中 main.c的全局变量b），或者是说明为COMMON伪节的未初始化全局变量（即COMMON符号），还可能是绑定属性为WEAK的弱符号。为便于说明全局符号的多重定义问题，本书将前三类全局符号（即函数、.data节和.bss节中的全局变量）统称为强符号。

在Linux系统中，GCC链接器根据以下规则处理多重定义的同名全局符号。

规则1：强符号不能多次定义，否则链接错误。

规则2：若出现一次强符号定义和多次COMMON符号或弱符号定义，则按强符号定义 为准。

规则3：若同时出现COMMON符号定义和弱符号定义，则按COMMON符号定义为准。

规则4：若一个COMMON符号出现多次定义，则以其中占空间最大的一个为准。因为符号表中仅记录COMMON符号的最小长度，而不会记录变量的类型，因此在链接器确定多重COMMON符号的唯一定义时，以最小长度中的最大值为准进行符号解析，能够保证满足所有同名COMMON符号的空间要求。

规则5：若使用编译选项-fno-common，则不考虑COMMON符号，相当于将COMMON符号作为强符号处理。

例如，对于图4.12所示例子，x在两个模块中都被定义为强符号，y在main模块定义为COMMON符号，而在p1模块是定义在.bss节的强符号，因此，链接器会由于x的两次强符号定义而输出一条出错信息。

![](images/0fadb874c1e3677b62e5b4e1ed7457c90b74713a93258b8c8883c67e71402fd0.jpg)  
图4.12 两个强定义符号的例子

考察图4.13 所示例子中的符号y和符号z的情况。

![](images/4a67686e825dd10fdc76fe18d4bc2b21a5fe047aec74e4a74894fc69c0ec6ec9.jpg)  
图 4.13 COMMON 符号定义的例

图4.13 中，符号 y 在 main.c 中是强符号，在 p1.c 中是 COMMON 符号，根据规则2 可知，链接器将main.。符号表中的符号y作为其唯一定义符号，而在p1模块中的y作为引用符号，其地址等于main模块中定义符号y的地址，也即这两个y是同一个变量。在main函数调用 p1 函数后，y的值从初始化的100被修改为200，因而，在 main 函数中用 printf打印出来后y的值为200，而不是100。

符号z在main和p1 模块中都没有初始化，在两个模块中都是COMMON符号，根据规则4可知，链接器将其中占空间较大的符号作为唯一定义符号，因此，链接器将main模块中定义符号z作为唯一定义符号，而在p1模块中的z作为引用符号，符号z的地址为main模块中定义的地址。在main函数调用p1函数后，z的值从1000被修改为2000，因而，在main函数中用 printf 打印出来后 z 的值为 2000，而不是1000。

上述例子说明，如果在两个不同模块定义相同变量名，那么很可能会发生程序员意想不到的结果。特别当两个重复定义的变量具有不同类型时，更容易出现难以理解的结果。例如，对于图4.14所示的例子，全局变量d在 main模块中为 int 型强符号，在 p1 中是 double型COMMON符号。根据规则2可知，链接器将main.o符号表中的符号d作为其唯一定义符号，其地址和所占字节数等于main模块中定义符号d的地址和字节数，因此长度为4B，而不是 double 型变量的 8 B。

由于 p1. c 中的 d 为引用，因而其地址与 main 中变量d 的地址相同，在 main 函数调用p1 函数后，地址 &d 中存放的是 double 型浮点数 1.0 对应的低 32 位机器数 00000000H，地址 &x 中存放的是 double型浮点数1.0 对应的高 32位机器数 3FF0 0000H（对应真值为1072693248)，如图4.14c所示。因而，在main()函数中用 printf打印出来后d的值为0，x的值是 1072693248。可见 x的值被 p1.c中的变量 d 给冲掉了。这里，double型浮点数 1.0的机器数为3FF0 0000 0000 0000H，以小端方式存放。

![](images/9e2607ff204586907f54b4cc4deaba40c0269da8a10f74e10c191ae98a242d70.jpg)  
图4.14 不同类型定义符号例子

上述由于多重定义变量引起的值的改变往往是在没有任何警告的情况下发生的，而且通常是在程序执行了一段时间后才表现出来，并且远离错误发生源，甚至错误发生源在另一个模块。对于由成千上万个模块组成的大型程序的开发，这种问题将更加麻烦，如果变量定义不规范，那将很难避免这类错误的发生。最好使用相应的选项命令-fno-common，告诉链接器在遇到多重定义的全局符号时，触发一个错误，或者使用-Werror选项命令，将所有警告变为错误。

解决上述问题的办法是，尽量避免使用全局变量，一定需要用的话，可以定义为static属性的静态变量。此外，尽量要给全局变量赋初值使其变成强符号，而外部全局变量则尽量使用extern。对于程序员来说最好能了解链接器是如何工作的，并养成良好的编程习惯。

## 2. 与静态库的链接

编译系统通常会提供一种将多个目标模块打包成一个单独的库文件的机制，这个库文件就是静态库(StaticLibrary)。在构建可执行文件时只需指定静态库文件名，链接器会自动到库中寻找那些在应用程序中用到的目标模块，并且只把用到的模块从库中提取出来，和应用程序模块进行链接。

在类UNIX系统中，静态库文件采用一种称为存档档案（Archive）的特殊文件格式，使用.a后缀。例如，标准C函数库文件名为libc.a，其中包含一组广泛使用的标准I/O函数、字符串处理函数和整数处理函数，如 atoi、printf、scanf、strcpy等，libc. a是默认的用于静态链接的库文件，无须在链接命令中显式指出。还有其他的函数库，例如浮点数运算函数库，文件名为libm.a，其中包含 sin、cos 和 sqrt 函数等。

用户可以自定义一个静态库文件。以下通过一个简单例子来说明如何生成自己的静态库文件。假定有两个源文件 myproc 1.c 和 myproc2.c，如图 4.15 所示。

![](images/e315bd39cab306db6b660830a24dbe852c26a8307b98d8fb4e0ca41ea3bd052b.jpg)  
图4.15 静态库 mylib 中包含的函数的源文件

可以使用AR工具生成静态库，在此之前需要用“gcc-c”命令将静态库中包含的目标模块先生成可重定位目标文件。以下两个命令可以生成静态库文件mylib.a，其中包含两个目标模块 myproc1.o 和 myproc2.o。

![](images/ecb032b97bb6a43a1f294fc406cd157c16b8996fee3fca8a3e85fc3103c833b0.jpg)

假定有一个 main. c 程序，其中调用了静态库 mylib. a中的函数 myfunc1。

![](images/d98e92f94072a2a370dcb9fdbf4a7e0b8eba7f2b41fd4b9e406fbec94ed3f05f.jpg)

为了生成可执行文件myproc，可以先将main.c编译并汇编为可重定位目标文件main.o，然后再将 main.o和mylib.a以及标准C 函数库libc. a进行链接。以下两条命令可以完成上述功能。

![](images/5e4255f6bafcea26d1813ef6af885fa00c1ed720039782740304d3c04ff343f6.jpg)

命令中使用-static选项指示链接器生成一个完全链接的可执行文件，即生成的可执行文件应能直接加载到存储器执行，而不需要在加载或运行时再动态链接其他目标模块。

图4.16给出了可重定位目标文件与静态库进行静态链接生成完全链接的可执行目标文件的过程。

链接器进行符号解析时会根据命令中指定的输入文件顺序进行处理。例如，对于命令gcc -static -o myproc main.o./mylib. a”，链接器首先处理输入文件 main.o，确定其引用了符号 myfunc1，然后按顺序处理 mylib. a 文件，在其中的 myproc1.o模块中找到符号 myfunc1的定义，从而建立符号myfunc1的引用和定义之间的关联。在对myproc1.。模块处理时，又发现了myfunc1的定义需要引用符号 printf，因此，链接器又进一步处理默认的C标准库文件libc. a，在其中的printf.o模块中找到printf的定义，从而又可以建立符号 printf的引用和定义之间的关联。关于链接器中符号解析的详细过程请参见相关资料。

![](images/3dc987bf0f3b549e6b22be9b016e62745d588d06c8ff0a0b07827e7ea45bcc7e.jpg)  
图4.16 可重定位目标文件与静态库的链接

## 4.3.3 重定位过程

重定位的目的是在符号解析的基础上将所有关联的目标模块合并，并确定每个定义符号在ABI规范规定的虚拟地址空间中的地址，在定义符号的引用处重定位引用的地址。例如，对于图4.16中的例子，因为编译main.c时，编译器还不知道函数myproc1的地址，所以编译器只是将一个“临时地址”放到可重定位文件main.o的call指令中，在链接阶段，这个“临时地址”将被修改为正确的引用地址，这个过程叫重定位。具体来说，重定位有以下两方面工作。

## (1)节和定义符号的重定位

链接器将相互关联的所有可重定位文件中相同类型的节合并。生成一个同一类型的新节，并根据合并后的新节在虚拟地址空间中的起始位置以及新节中定义的每个符号的位置。确定每个符号的存储地址。例如，将所有模块中的.data节合并后作为可执行文件中的.data节，并重新确定其中每个定义符号在虚拟地址空间中的位置。

## (2) 引用处符号的重定位

链接器对合并后的新代码节（.text） 和新数据节（.data）中所有符号引用处进行重定位，使其指向对应的定义符号的起始位置。为了实现这一步工作，链接器需要知道可重定位目标文件中存在哪些需要重定位的符号引用、所引用的是哪个定义符号等，这些称为重定位信息，放在重定位节（.rel.text和.rel.data）的重定位表项中。重定位过程中，根据重定位节.rel. text和.rel. data中的重定位表项，分别对新的.text 节和.data节中的符号引用进行重定位处理。

例如，图4.9所示两个程序模块中，main.o的.rel.text节中有一个重定位表项：r\_offset=0x7，r\_sym=10,r\_type=R\_386\_PC32，该表项说明，需要在其.text节中偏移量为0x7的地方按照R\_386\_PC32方式进行重定位，所引用的符号为main.o的符号表中第10个表项代表的符号，根据图4.10可知，该符号为swap。同时，swap.o的.rel.data节中有一个表项：roffset=0x0，r\_sym=9，r\_type=R\_386\_32，该表项说明，需要在其.data节中偏移量为0的地方按R\_386\_32方式进行重定位，所引用的符号为swap.0的符号表中第9个表项代表的符号，根据图4.11可知，该符号为buf。

## 1. R\_386\_PC32 方式的重定位

对于图4.9所示例子，模块main.o的.text节中主要是main()函数的机器代码，其中有一处需要重定位，就是与 main.c中第7行swap()函数对应的调用指令中的目标地址。

图4.17 给出了 main. o 中. text 节和. rel. text 节的内容通过 OBJDUMP 工具反汇编出来的结果。

```asm
1 Disassembly of section .text:
2 00000000 <main>:
3 0: 55 push %ebp
4 1: 89 e5 mov %esp, %ebp
5 3: 83 e4 f0 and $oxffff, %eesp
6 6: e8 fc ff ff ff call 7 <main+0x7>
7 7: R_386_PC32 swap
8 b: b8 00 00 00 00 mov $0x0, %eax
9 10: c9 leave
10 11: c3 ret
```  
图4.17 main.o 中.text 节和. rel.text 节内容

从图4.17可以看出，符号main的定义从.text节中偏移量为0处开始，共占18(0x12)字节：.rel.text节中有一个重定位表项： $\mathtt { r \_ o f f s e t } = 0 \mathtt { x } 7 , \mathtt { r \_ s y m } = 1 0 , \mathtt { r \_ t y p e } = \mathtt { R } \_ 3 8 6 \_ { \mathrm { P C 3 2 } }$ ，被OBJDUMP 工具以“7: $\mathrm { R } \_ { 3 8 6 \_ } \mathrm { P C } 3 2 \mathrm { \ s w a p } ^ { \cdots }$ 的可重定位信息显示在需重定位的call指令的下一行（第7行），说明需重定位的是离.text节起始处偏移量为0x7的地方，采用PC相对地址方式（R\_386\_PC32），重定位后指向符号swap的定义处（swap过程首地址）。也就是说，上述text节中第6行call指令的最后4字节（fc fffff）需要重定位，使得call指令的目标跳转地址为 swap 过程的首地址。

假定链接后在可执行文件中main过程的机器代码从虚拟地址空间中的0x8048380开始，紧跟在 main后面的是 swap 过程的机器代码，因为 $0 \mathbf { x } 8 0 4 8 3 8 0 + 0 \mathbf { x } 1 2 = 0 \mathbf { x } 8 0 4 8 3 9 2$ ，而 swap 过程首地址应按4字节对齐，因此 swap过程将从0x8048394开始。

IA-32中跳转目标地址（即有效地址）计算公式为跳转目标地址=PC+偏移地址。这里PC是call指令的下一条指令的地址，偏移地址则是call指令的最后4字节，即重定位值，因此重定位值=跳转目标地址 $\sim \mathbb { P } \mathbb { C } _ { \circ }$ 这里的跳转目标地址为swap过程首地址0x8048394，而 PC 内容为 $0 { \bf x } 8 0 4 8 3 8 0 + 0 { \bf x } 7 + 4 = 0 { \bf x } 8 0 4 8 3 8 { \bf b }$ ，故重定位值为0x8048394-$0 \times 8 0 4 8 3 8 \mathrm { b } = 0 \times 0 0 0 0 0 0 0 9$ 。因为IA-32中偏移地址按小端方式排列，所以main过程中call指令的代码为 $^ { 4 6 } \mathrm { e } 8 \ 0 9 \ 0 0 \ 0 0 \ 0 0 ^ { \mathrm { , 3 } }$ o

根据图4.17中call指令的机器代码“e8 fc ff ff ff”可知，需重定位的4字节初值（init)为 $0 \mathrm { { x f } \& f }$ fffc，即 $- 4 0$ 汇编器用-4作为偏移量，其原因是，在call指令的跳转目标地址计算中所用的PC指向的是call指令的下一条指令，此处相对于需重定位的位置偏移为4个字节。

从上面分析过程可以看出，PC相对地址方式下的重定位值计算公式如下：

$$
\underbrace { \overleftrightarrow { \mathrm { E } } } _ { \mathrm { ~ \normalfont ~  ~ } } \overleftrightarrow { \mathrm { 1 } } \lambda \overleftrightarrow { \mathrm { 1 } } \mathrm { ~ \normalfont ~ [ \frac ~ { \partial ~ } { \partial ~ } A p m ( \frac ~ { \partial ~ } { \partial ~ } s y m ) ~ - ( ~ \langle ~ A D D R ( \cdot ~ t e x t ) ~ + ~ \partial ~ r \_ o f f s e t ) ~ - i n i t ) ~ \partial ~ } t ]  _ { \mathrm { ~ \normalfont ~ ( ~ \int ~ \mathrm { ~ A } ~ \mathrm { ~ I } ~ \hat { ~ } { ~ i } ~ \ x i m e ~ \hat { ~ } { ~ } t ~ ) ~ } } ,
$$

其中 ADDR(r\_sym)表示符号 r\_sym 的首地址，ADDR(. text)表示.text 节的起始地址，它加上偏移量r\_offset后得到需重定位处的地址，再减初值init（相当于加4）后，便得到

PC值。ADDR(r\_sym)减 PC值就是重定位值。例如，在上述例子中，ADDR(swap)=0x8048394, ADDR(. text)= 0x8048380, r\_offset=0x7,init=-4。

## 2. R\_386\_32方式的重定位

对于图4.9所示例子，因为main.c中只有一个已初始化的全局定义符号buf，并且buf的定义没有引用其他符号，因此 main.o中的.data节对应的重定位节.rel.data中没有任何重定位表项。main.。中的.data节和.rel. data节的内容通过 OBJDUMP 工具反汇编出来的结果如图4.18a所示。

对于图4.9所示例子中的swap.c，其中第3行有一个对全局变量 bufp0赋初值的语句，bufp0被初始化为外部数组变量 buf的首地址。因而，在 swap.o的.data节中有相应的对bufp0的定义，在.rel. data 节中有对应的重定位表项。图4.18b 给出了swap.o中.data 节和. rel. data 节的内容通过 OBJDUMP 工具反汇编出来的结果。

![](images/b6a1b00016f63a2cfd5cc40c8dc67ae7924107f5c11581bad28d4ec349ed55aa.jpg)  
图4.18 main.o 和 swap. o 中.data 节和.rel.data 节内容

从图4.18b 中可以看出，目标模块 swap中全局符号 bufp0的定义在.data 节中偏移量0处，占4个字节，初始值（init)为0x0(000000 00)。对应重定位节，rel.data中有一个重定位表项：r\_offset=0x0，r\_sym=9，r\_type=R\_386\_32，OBJDUMP工具解释后显示为“0:R\_386\_32buf”。重定位类型是R\_386\_32，即绝对地址方式，因而重定位值应是初始值加所引用符号地址。假定所引用符号buf的地址为ADDR(buf)=0x8049620，则在可执行目标文件中重定位后的 bufp0的内容变为0x8049620，即“20960408”。

可执行目标文件中的.data 节是将 main.o 中的.data 节和 swap.o中的.data 节合并后生成的，经过重定位后得到合并后可执行文件中的.data节的内容，如图4.19所示。

![](images/3dedde1d354ec94f70f865237e4b7d32dbcff98f4ab80627657d209cb7311dde.jpg)  
图4.19 可执行目标文件中的.data节内容

从图4.19可以看出，链接器进行重定位后，确定了可执行文件中.data节在虚拟存储空间中的首地址为0x8049620，该地址处定义了从main.o中合并过来的buf符号，也即buf数组的第一个元素的地址为0x8049620，buf数组有两个int型元素，因而占用8B空间。从地址 $0 \times 8 0 4 9 6 2 0 + 8 = 0 \times 8 0 4 9 6 2 8$ 开始，定义的是从swap.o的.data节合并过来的符号bufp0，其内容为 buf的首地址0x8049620。

图4.20给出了图4.9所示例子中两个可重定位模块main.0和swap.0合并成可执行文件的过程。从图中可以看出，在可执行目标文件的.text节和.data节中还分别包含了系统代码和系统数据。

![](images/df8f482d31cdd6b6d4b276b022e7e663f27b78559cdd500ec08940cd18ad94ea.jpg)  
图 4.20 main.o 和 swap. o 合并成可执行文件

## 4.3.4 动态链接

4.2节介绍了可重定位和可执行两种目标文件，还有一类目标文件是共享目标文件(Shared Object File)，也称为共享库文件。它是一种特殊的可重定位目标文件，其中记录了相应的代码、数据、重定位和符号表信息，能在可执行文件装入或运行时被动态地装入内存并自动被链接，这个过程称为动态链接（Dynamic Link），由一个称为动态链接器（DynamicLinker）的程序来完成。类UNIX系统中共享库文件扩展名为.so，Windows系统中为动态链接库（Dynamic Link Libraries，DLLs)，文件扩展名为. dll。

对于4.3.2节介绍的静态链接方式.因为库函数代码被合并在可执行文件中，因而会造成盘空间和主存空间的浪费。例如，静态库libc.a中的printf模块会在静态链接时合并到每个引用printf的可执行文件中，其中的printf代码会各自占用不同的盘空间。通常硬盘上存放有数千个可执行文件，因而静态链接方式会造成盘空间的极大浪费；在引用printf的应用程序同时在系统中运行时，这些程序中的printf代码也会占用内存空间，对于并发运行几十个进程的系统来说，会造成极大的主存资源浪费。

此外，静态链接方式下，程序员还需要定期维护和更新静态库，关注它是否有新版本出现，在出现新版本时需要重新对程序进行链接操作，以将静态库中最新的目标代码合并到可执行文件中。因此，静态链接方式更新困难、使用不便。

针对上述静态链接方式下的这些缺点，提出了一种共享库的动态链接方式。共享库以动态链接的方式被正在加载或执行中的多个应用程序共享，因而，共享库的动态链接有两个方面的特点：一是“共享性”；二是“动态性”。

“共享性”是指共享库中的代码段在内存只有一个副本，当应用程序在其代码中需要引用共享库中的符号时，在引用处通过某种方式确定指向共享库中对应定义符号的地址即可。例如，对于动态共享库libc.so中的printf模块，内存中只有一个printf副本，所有应用程序都可以通过动态链接printf模块来使用它。因为内存中只有一个副本，硬盘中也只有共享库中一份代码，因此能节省主存资源和硬盘空间。

“动态性”是指共享库只在使用它的程序被加载或执行时才加载到内存，因而在共享库更新后并不需要重新对程序进行链接。每次加载或执行程序时所链接的共享库总是最新的。可以利用共享库的这个特性来实现软件分发或生成动态Web网页等。

动态链接有两种方式，一种是在程序加载过程中加载和链接共享库，另一种是在程序执行过程中加载并链接共享库。

## 4.4 可执行文件的加载

启动一个可执行目标文件执行时，首先会通过某种方式调出常驻内存的一个称为加载器(Loader)的操作系统程序来进行处理。例如，UNIX/Linux系统中程序的加载执行通过调用execve系统调用函数，在当前进程的上下文中启动加载器进行。

## 4.4.1 程序和进程的概念

任何一个高级语言源程序被编译、汇编、链接转换为可执行文件后，就可以被计算机直接执行。对计算机来说，程序（Program）就是代码和数据的集合，程序的代码是一个机器指令序列，因而程序是一种静态的概念，它可以作为文件存放在硬盘中。

进程（Process）可以看成是程序的一次运行过程，因此进程是一个具有一定独立功能的程序关于某个数据集合的一次运行活动，因而进程具有动态的含义。计算机处理的所有任务实际上是由进程完成的。

每个应用程序在系统中运行时均有属于它自己的存储空间，用来存储它自己的程序代码和数据，包括只读区（代码和只读数据）、可读/写数据区（初始化数据和未初始化数据）、动态的堆区和栈区等。

进程是操作系统对处理器中程序运行过程的一种抽象。进程有自己的生命周期，它由于任务的启动而创建，随着任务的完成（或终止）而消亡，它所占用的资源也随着进程的终止而释放。

一个可执行文件可以被多次加载执行，也就是说，一个程序可能对应多个不同的进程。例如，在 Windows 系统中用 word 程序编辑一个文档时，相应的进程就是 winword. exe，如果多次启动同一个 word 程序，就得到多个 winword. exe 进程。

## 小提示

计算机系统中的任务通常指进程。例如，Linux内核中把进程称为任务，每个进程主要通过一个称为进程描述符（Process Descriptor）的结构来描述，其结构类型定义为taskstructure，包含了一个进程的所有信息。所有进程通过一个双向循环链表实现的任务列表（TaskList)来描述，任务列表中每个元素是一个进程描述符。IA-32中的任务状态段（TSS)、任务门（TaskGate）等概念中所称的任务，实际上也是指进程。

对于现代多任务操作系统，通常一段时间内会有多个不同的进程在系统中运行，这些进程轮流使用处理器并共享同一个主存。程序员在开发应用程序时，并不用考虑如何和其他程序一起共享处理器和存储器资源，而只要考虑自己的程序代码和所用数据如何组织在一个独立的虚拟存储空间中。也就是说，程序员可以把一台计算机的所有资源看成由自己的程序所独占，可以认为自己的程序是在处理器上执行的和在存储空间中存放的唯一的用户程序。显然，这是一种“错觉”。这种“错觉”带来了极大的好处，它简化了编程、编译、链接和加载等整个过程。

## 4.4.2 进程的虚拟地址空间

在4.2.3节和4.2.4节中提到，可执行文件中的程序头表描述了其中的只读代码段和可读/写数据段与虚拟地址空间之间的映射关系。当可执行文件被启动加载成为进程后，可执行文件中的只读代码段和可读/写数据段等信息变成进程中的存储区域，操作系统把进程中所有存储区域信息记录在进程描述符中。

例如，Linux内核为每个进程维护了一个数据类型为task\_struct 结构的进程描述符，taskstruct中记录了进程的描述信息，如进程的PID、指向用户栈的指针、可执行目标文件名等。图4.21给出了Linux系统中进程的虚拟地址空间中区域的描述，进程虚拟地址空间中的只读代码区对应可执行文件中的只读代码段，进程虚拟地址空间中的可读/写数据区对应可执行文件中的可读/写数据段。

![](images/253b72450cb8970314622febd401c72f23a837a008c9b73f8e9cb51d5af38306.jpg)  
图4.21 Linux进程虚拟地址空间中区域的描述

task\_struct 结构中有个指针 mm 指向一个 mm\_struct 结构。mm\_struct 描述了对应进程虚拟存储空间的当前状态，其中，有一个字段是pgd，它指向对应进程的第一级页表的首地址。mm\_struct 中还有一个字段mmap，它指向一个由vm\_area\_struct结构构成的链表表头。

每个vm\_area\_struct结构描述了对应进程虚拟地址空间中的一个区域，可执行文件被启动加载时，操作系统通过读取可执行文件中的程序头表，来生成vm\_area\_struct结构内容。vm\_area\_struct 中部分字段的含义如下。

vm\_start：指向区域的开始处。

vm\_end：指向区域的结束处。

vm\_prot：描述区域包含的所有页面的访问权限。

vm\_flags：描述区域包含页面是否与其他进程共享等。

vm\_next：指向链表下一个 vm\_area\_struct。

## 4.4.3 execve 函数和 main 函数

execve函数的功能是在当前进程的上下文中加载并运行一个新程序。execve函数的用法如下。

该函数用来加载并运行可执行目标文件filename，可带参数列表 argv和环境变量列表envp。若出现错误，如找不到指定的文件filename，则返回-1并将控制权返回给调用程序；若函数功能执行成功，则不返回，而是跳转到可执行文件ELF头中由字段e\_cntry定义的入口点（即符号\_start处）执行。符号\_start在启动例程模块crtl.o中定义，每个C语言程序的\_start 定义都一样。

符号\_start处定义的启动代码主要是一系列过程调用。例如，可以先依次调用libcinit\_first和\_init 两个初始化过程；随后通过调用atexit 过程对程序正常结束时需要调用的函数进行登记注册，这些函数被称为终止处理函数，将由exit函数自动调用执行；然后，再调用可执行目标文件中的主函数main；最后调用\_exit过程，以结束进程的执行，返回到操作系统内核。因此，启动代码中的过程调用顺序可以是\_libc\_init\_first →\_init → atexit→main(其中可能会调用 exit 函数) →\_exit。

通常，主函数main的原型有如下两种形式：

![](images/9048c24edfb80de3c27b6915f08270ee820608fe4318724e3191ae5f8c13de9b.jpg)

其中，参数列表argv可用一个以null结尾的指针数组表示，每个数组元素都指向一个用字符串表示的参数。通常，argv[0]指向可执行目标文件名，argv[1]是命令（以可执行文件名作为命令名）第一个参数的指针，argv[2]是命令第二个参数的指针，以此类推。参数个数由 argc 指定。参数列表结构如图 4.22 所示。图中显示了命令行“1d -0 test main.o test. o'对应的参数列表结构。

![](images/712050bb059f64dfb4cd6974c87aae0cb652872150da93d9e78638802b056009.jpg)  
图 4.22 参数列表 argv 的组织结构

环境变量列表envp的结构与参数列表结构类似。也用一个以null结尾的指针数组表示，每个数组元素都指向一个用字符串表示的环境变量串。其中每个字符串都是一个形如“NAME=VALUE”的名—值对。

当IA-32+Linux系统开始执行main函数时，在虚拟地址空间的用户栈中具有如图4.23所示的组织结构。

![](images/de319d3180452a0232ba7b7da8f838291fc034d17b8631ca8629b0e921572524.jpg)  
图4.23 main()函数执行时用户栈中的典型结构

如图4.23所示，用户栈的栈底是一系列环境变量串，然后是命令行参数串，每个串以null结尾，连续存放在栈中，串i在栈中的位置由相应的 envp[i]和 argv[i]中的指针指示。在命令行参数串后面是指针数组 envp的数组元素，全局变量environ指向这些指针中的第一个指针 envp[0]。然后是指针数组 argv的数组元素。在栈的顶部是 main()函数的三个参数：envp、argv和 argc。在这三个参数所在单元的后面将生成 main()函数的栈帧。

## 4.4.4 fork 函数和程序的启动加载

在父进程中可通过fork函数创建一个子进程，fork函数的原型如下：

![](images/236d02c32c15f596cc20e2ade1a4ac49ebbc210535cbb201b33b03f214aa8ffe.jpg)

在 Linux 系统中，返回值类型 pid\_t 在头文件 sys/types. h 中定义为 int 型，fork 函数原型在头文件unistd.h中定义。通常用一个唯一的正整数标识一个进程，称为进程ID，简写为PID。这里的返回值实际上就是一个PID。

通过fork函数新创建的子进程和父进程几乎一样，通过复制父进程的相关数据结构，使得子进程具有与父进程完全相同但独立的虚拟地址空间，也即只读代码段、可读/写数据段、堆、用户栈、共享库区域都完全相同。此外，子进程还继承了父进程的打开文件描述符表，也即子进程可以读/写父进程中打开的任何文件。新创建的子进程和父进程之间最大的差别是它们的PID不同。有关打开文件描述符表的概念参见6.3.1节中的文件系统概述。

以下说明通过shell命令行输入可执行文件名a.out进行程序加载的过程，大致如下。

1）shell命令行解释器输出一个命令行提示符（如：unix>），并开始接受用户输入的命令行。

2) 当用户在命令行提示符后输人命令行“./a.out[enter]”后，shell命令行程序开始对命令行进行解析，获得各个命令行参数并构造传递给函数 execve的参数列表 argv 和参数个数argc。

3）调用fork函数，创建一个子进程。

4) 以第2）步命令行解析得到的参数个数 argc、参数列表 argv 以及全局变量 environ作为参数，调用函数execve，从而实现在当前进程（用fork新创建的子进程）的上下文中加载并运行a.out程序。在函数 execve中，通过启动加载器执行加载任务并启动程序运行。

这里的“加载”实际上并没有将a.out文件中的代码和数据（除ELF头、程序头表等信息）从硬盘读人主存，而是根据可执行文件中的程序头表等，对当前进程描述符中的一些数据结构进行初始化，也即生成上述task\_struct 结构中 vm\_area\_struct等信息。

当加载器执行完加载任务后，便将PC设定指向程序入口点（即符号\_start处），从而开始转到a.out程序执行，从此，a.out程序开始在新进程的上下文中运行。在运行过程中，一旦CPU检测到所访问的指令或数据不在主存（即缺页），则调用操作系统内核中的缺页处理程序执行。在处理过程中才将代码或数据真正从a.out文件装入主存。

## 4.5 程序的执行和中央处理器

可执行文件被启动加载后，CPU就会按照可执行文件只读代码段中指令给定的顺序执行。从前面介绍的有关机器级代码的表示和生成可以看出，指令按顺序存放在存储空间的连续单元中，正常情况下，指令按其存放顺序执行，遇到跳转、过程调用或按条件分支执行时，CPU则会根据相应的跳转类指令（包括无条件跳转指令、条件跳转指令、调用指令和返回指令等）来改变程序执行流程。

## 4.5.1程序及指令的执行过程

CPU取出并执行一条指令的时间称为指令周期。不同指令所要完成的功能不同，因而不同指令所用的指令周期可能不同。例如，对于4.3.1节图4.9中的例子，其链接生成的可执行目标文件的.text节中的 main()函数包含的指令序列如下。

![](images/b2469ecc732267a7fdceab85a5c6df6b1c117889df8a19954bec057fef353aea.jpg)

可以看出，指令按顺序存放在地址0x08048380开始的存储空间中，每条指令的长度不同，如 push、leave和 ret 指令各占1 B，第3行的 mov 指令占2B，第4行 and指令占3B，第5行和第6行指令各占5B。每条指令对应的0/1序列含义不同，如“push %ebp”指令为55H= 01010101 B，其中高 5 位 01010 为 push 指令操作码，后三位 101 为 EBP 的编号，“leave”指令为C9H=11001001B，没有显式操作数，8位都是指令操作码。指令执行的顺序如下：第2\~5行指令按顺序执行，第5行指令执行后跳转到 swap 过程执行，执行完 swap过程后回到第6行指令执行，然后顺序执行到第8行指令，执行完第8行指令后，再转到另一处开始执行。

CPU为了能完成指令序列的执行。必须解决以下一系列问题：如何判定每条指令有多长？如何判定指令操作类型、寄存器编号、立即数等？如何区分第3行和第6行的两条mov指令有何不同？如何确定操作数是在寄存器中还是在存储器中？一条指令执行结束后如何正确地读取到下一条指令？

通常，CPU执行一条指令的大致过程如图4.24所示，分成取指令、指令译码、计算源操作数地址并取操作数、执行数据操作、计算目的操作数地址并存结果、计算下条指令地址这儿个步骤。

![](images/230215235d7532f8b5315276ff2991c4ca782f46a8d271d4b79f272b2a3129d9.jpg)  
图4.24 指令执行过程

1）取指令。马上将要执行的指令的地址总是在程序计数器（PC）中，因此，取指令的操作就是从PC所指出的存储单元中取出指令送到指令寄存器（IR）。例如，对于上述main函数的执行，刚开始时，PC（即IA-32中的EIP）中存放的是首地址0x08048380，因此，CPU根据PC的值取到一串0/1序列送IR，可以每次总是取最长指令字节数，假定最长指令占4B，即IR为32位，此时，从0x08048380开始取4个字节到IR中，也即，将55H、89H、E5H 和83H送到IR 中。

2）对IR中的指令操作码进行译码。不同指令其功能不同，即指令涉及的操作过程不同，因而需要不同的操作控制信号。例如，上述第6行指令“mov\$0x0,%eax”要求将立即数 0x0送寄存器 EAX中；而上述第3行指令“mov %esp，%ebp”则要求从寄存器 ESP 中取数，然后送寄存器EBP中。因而，CPU应该根据不同的指令操作码译出不同的控制信号。例如，对取到IR中的5589E583H进行译码时，可根据对最高5位（01010）的译码结果得到 push 指令的控制信号。

3）源操作数地址计算并取操作数。根据寻址方式确定源操作数地址计算方式，若是存储器数据，则需要一次或多次访存，例如，当指令为间接寻址或两个操作数都在存储器的双目运算时，就需要多次访存；若是寄存器数据，则直接从寄存器取数后，转到下一步进行数据操作。

4）执行数据操作。在ALU或加法器等运算部件中对取出的操作数进行运算。

5）目的操作数地址计算并存结果。根据寻址方式确定目的操作数地址计算方式，若是存储器数据，则需要一次或多次访存（间接寻址时）；若是寄存器数据，则在进行数据操作时直接将结果存到寄存器。

如果是串操作或向量运算指令，则可能会并行执行或循环执行第3)\~5)步多次。

6）指令地址计算并将其送PC。顺序执行时，下条指令地址的计算比较简单，只要将PC加上当前指令长度即可，例如，当对IR中的5589E583H进行操作码译码时，得知是push指令，指令长度为1B，因此，指令译码生成的控制信号会控制使PC加1（即0x08048380+1)，得到即将执行的下条指令的地址为0x08048381。如果译码结果是跳转类指令时，则需要根据条件标志、操作码和寻址方式等确定下条指令地址。

对于上述过程的第1)步和第2)步，所有指令的操作都一样：而对于第3)\~5)步，不同指令的操作可能不同，它们完全由第2)步译码得到的控制信号控制。也即指令的功能由第2)步译码得到的控制信号决定。对于第6)步，若是定长指令字，处理器会在第1)步取指令的同时计算出下条指令地址并送PC，然后根据指令译码结果和条件标志决定是否在第6)步修改PC的值，因此，在顺序执行时，实际上是在取指令时计算下条指令地址，第6)步什么也不做。

根据对上述指令执行过程的分析可知，每条指令的功能总是通过对以下4种基本操作进行组合来实现的，也即，每条指令的执行可以分解成若干个以下基本操作。

1）读取某存储单元内容（可能是指令或操作数或操作数地址），并将其装入某个寄存器。

2）把某个寄存器中的数据存储到给定的存储单元中。

3）把一个数据从某个寄存器传送到另一个寄存器或者ALU的输入端。

4）在ALU中进行某种算术运算或逻辑运算，并将结果传送到某个寄存器。

## 4.5.2 CPU 的基本功能和组成

CPU的基本职能是周而复始地执行指令，4.5.1节介绍的机器指令执行过程中的全部操作都是由CPU中的控制器控制执行的。随着超大规模集成电路技术的发展，更多的功能逻辑被集成到CPU芯片中，包括cache、MMU、浮点运算逻辑、异常和中断处理逻辑等，因而CPU的内部组成越来越复杂，甚至可以在一个CPU芯片中集成多个处理器核。但是，不管CPU多复杂，它最基本的部件是数据通路（Datapath）和控制部件（Control Unit)。控制部件根据每条指令功能的不同生成对数据通路的控制信号，并正确控制指令的执行流程。

为了在教学上遵循由易到难的原则，我们首先从CPU最基本的组成开始了解。CPU的基本功能决定了CPU的基本组成，图4.25所示是CPU的基本组成原理图。

图4.25中的地址线、数据线和控制线并不属于CPU，构成系统总线的这三组线主要用来使CPU与CPU外部的部件（如主存储器）交换信息，交换的信息包括地址、数据和控制信号三类，分别通过地址线、数据线和控制线进行传送，这里的数据信息包含指令，即数据和指令都看成是数据信息，因为对总线和存储器来说，指令和数据在形式上没有区别，而且数据和指令的访存过程也完全一样。除了地址和数据（包括指令）以外的所有信息都属于控制信息。地址线是单向的，由CPU送出地址，用于指定需要访问的指令或数据信息所在的存储单元地址。

![](images/34bc9e6c86900a046bb5c0c59803fe4a36e62206eef2654ea33a5076cdeb6c98.jpg)  
图 4.25 CPU 基本组成原理图

图4.25所示的CPU中只包括最基本的执行部件，如ALU、通用寄存器和状态寄存器等，其余都是控制逻辑或与其密切相关的逻辑，主要包括以下几个部分。

1）程序计数器（PC）。PC又称指令计数器或指令指针寄存器（IP），用来存放即将执行指令的地址。顺序执行时，PC+“1”形成下一条指令地址（这里的“1”是指一条指令的字节数)；需要改变程序执行顺序时，CPU根据跳转类指令提供的信息生成跳转目标指令的地址，并将其作为下一条指令地址送PC。

2）指令寄存器（IR)。IR用以存放现行指令。上文提到，每条指令总是先从存储器取出后才能在CPU中执行，指令取出后存放在指令寄存器中，以便送指令译码器进行译码。

3）指令译码器（ID)。ID对IR中的操作码部分进行译码，产生的译码信号提供给操作控制信号形成部件，以产生控制信号。

4）启停控制逻辑。脉冲源产生一定频率的脉冲信号作为CPU的时钟信号。启停控制逻辑在需要时能保证可靠地开放或封锁时钟信号，实现对机器的启动与停机。

5）时序信号产生部件。该部件以时钟信号为基础，产生不同指令对应的时序信号，以实现机器指令执行过程的时序控制。

6）操作控制信号形成部件。该部件综合时序信号、指令译码信号和执行部件反馈的条件标志（如CF、SF、ZF和OF）等，形成不同指令操作所需要的控制信号。

7）总线控制逻辑。实现对总线传输的控制，包括对数据和地址信息的缓冲与控制。CPU对于存储器的访问通过总线进行，CPU将存储访问命令（即读/写控制信号）送到控制线，将要访问的存储单元地址送到地址线，并通过数据线取指令或者与存储器交换数据信息。

8）中断机构。实现对异常情况和外部中断请求的处理。

## 4.5.3 打断程序正常执行的事件

从开机后CPU被加电开始，到断电为止，CPU自始至终就一直重复做一件事情：读出PC所指存储单元的指令并执行它。每条指令的执行都会改变PC的内容，因而CPU能够不断地执行新的指令。

正常情况下，CPU按部就班地按照程序规定的顺序一条指令接着一条指令执行，或者按顺序执行，或者跳转到跳转类指令设定的跳转目标指令处执行，这两种情况都属于正常执行顺序。

当然，程序并不总是能按正常顺序执行，有时CPU会遇到一些特殊情况而无法继续执行当前程序。例如，以下事件可能会打断程序正常执行。

对指令操作码进行译码时，发现是不存在的“非法操作码”，因此，CPU不知道如何实现当前指令而无法继续执行。

●在访问指令或数据时，发现页故障，如段错误（Segmentation Fault）、缺页（PageFault)等，因此，CPU没有访问到正确的指令或数据而无法继续执行当前指令。

在ALU中运算的结果发生溢出，或者整数除法指令的除数为0等，因此，CPU发现运算结果不正确而无法继续执行程序。

在程序执行过程中，CPU接收到外部发送来的中断请求信号。

因此，CPU除了能够正常地不断执行指令以外，还必须具有程序正常执行被打断时的处理机制，这种机制称为异常控制，也称为中断机制，CPU中相应的异常和中断处理逻辑称为中断机构，如图4.24中所示。

计算机中很多事件的发生都会中断当前程序的正常执行，使CPU转到操作系统中预先设定的与所发生事件相关的处理程序执行，有些事件处理完后可回到被中断的程序继续执行，此时相当于执行了一次过程调用，有些事件处理完后则不能回到原被中断的程序继续执行。所有这些打断程序正常执行的事件被分成两大类：内部异常和外部中断。

## (1) 内部异常

内部异常（Exception）是指由CPU在执行某条指令时引起的与该指令相关的意外事件。如除数为0、结果溢出、断点、单步跟踪、寻址错、访问超时、非法操作码、栈溢出、缺页、地址越界（段错误）等。

## (2) 外部中断

程序执行过程中，若CPU外部发生了采样计时时间到、网络数据包到达、用户按下(Ctrl+C〉等外部事件，要求CPU中止当前程序的执行，则会向CPU发中断请求信号，要求CPU对这些情况进行处理。通常，每条指令执行完后，CPU都会主动去查询有没有中断请求，有的话，则将下一条指令地址作为断点保存，然后转到用来处理相应中断事件的中断服务程序去执行，结束后回到断点继续执行。这类事件与执行的指令无关，由CPU外部的I/O子系统发出，所以，称为IO中断或外部中断（Interrupt)，需要通过外部中断请求线向 CPU 发请求信号。

## 4.5.4 异常和中断的响应过程

每种指令集架构都会各自定义它所处理的异常和中断类型，而且对于异常和中断的处理方式也有所不同，不过其基本原理相同。

在CPU执行指令过程中，如果发生了内部异常事件或外部中断请求，则CPU必须进行相应处理。CPU从检测到异常或中断事件，到调出相应的异常/中断处理程序准备执行，其过程称为异常和中断的响应。CPU对异常和中断的响应过程可分为三个步骤：保护断点和程序状态、关中断、识别异常和中断事件并转相应处理程序。

## 1. 保护断点和程序状态

为了CPU在异常和中断处理后能正确返回原被中断的程序继续执行，在异常/中断响应时CPU必须能正确保存回到被中断程序执行的返回地址（即断点），可以将断点保存在栈中或特定寄存器中。不同异常事件对应的断点不同，如页故障的断点是发生页故障的指令的地址。对于中断，因为CPU总是在每条指令执行结束时查询中断请求，因此所有中断的断点都是中断响应时的PC值。

异常/中断处理后可能要回到原被中断的程序继续执行，因此必须保存并恢复被中断时原程序的状态（如产生的各种标志信息、允许中断标志等）。每个正在运行程序的状态信息称为程序状态字(Program Status Word，PSW)，通常存放在程序状态字寄存器（PSWR）中。如在IA-32中程序状态字寄存器就是标志寄存器EFLAGS。与断点一样，PSW也要被保存到栈或特定寄存器中，在异常/中断返回时，将保存的PSW恢复到PSWR中。

## 2. 关中断

如果中断处理程序在保存原被打断程序现场的过程中又发生了新的中断，那么，就会因为要处理新的中断，而破坏原被打断程序的现场以及已保存的断点和程序状态等，因此，需要有一种机制来禁止在处理中断时再响应新的中断。通常通过设置中断使能位来实现。当中断使能位被置1，则为开中断，表示允许响应中断：若中断使能位被清0，则为关中断，表示不允许响应中断。例如，IA-32中的中断使能位就是EFLAG寄存器中的中断标志位IF。

为了避免已保存断点和程序状态等被破坏，通常在异常和中断响应过程中由CPU将中断使能位清0，以进行关中断操作。除了在异常和中断响应阶段由CPU对中断使能位清0以关中断外，也可以在异常/中断处理程序中，执行相应指令设置或清除中断使能位。在IA一32/x86-64架构中，可通过执行指令 sti 或 cli，将标志寄存器EFLAGS 中的IF 位置1或清0，以使CPU处在开中断或关中断状态。

## 3. 识别异常和中断事件并转相应的处理程序

在调出异常/中断处理程序之前，必须知道发生了什么异常或哪个V0设备发出了中断请求。一般来说，内部异常事件和外部中断源的识别方式不同，大多数处理器会将两者分开来处理。

内部异常事件的识别很简单。CPU在执行指令时把检测到的事件对应的异常类型号或标识异常类型的信息记录到特定的内部寄存器中即可。外部中断源的识别比较复杂，通常是由中断控制器根据V0设备的中断请求和中断屏蔽情况，结合中断响应优先级来识别当前请求的中断类型号，并通过数据总线将中断类型号送到CPU。有关中断响应处理的详细内容参见6.4.5节。

异常和中断源的识别可以采用软件识别或硬件识别两种方式。

软件识别通常是在CPU中设置一个原因寄存器，该寄存器中有一些标识异常原因或中断类型的标志信息。操作系统使用一个统一的异常/中断查询程序，该程序按一定的优先级顺序查询原因寄存器。如MIPS架构就采用软件识别方式，有一个cause寄存器，位于0x80000180处有专门的异常/中断查询程序，它通过查询cause寄存器来跳转到操作系统内核中具体的处理程序去执行。

硬件识别称为向量中断方式。这种方式下，通常将不同异常/中断处理程序的首地址称为中断向量，所有中断向量存放在一个表中，称为中断向量表。每种异常和中断类型都被设定一个中断类型号，中断向量存放的位置与对应的中断类型号相关，例如，类型0对应的中断向量存放在第0表项，类型1对应的中断向量存放在第1表项，…，以此类推，因而可以根据中断类型号快速跳转到对应的异常/中断处理程序去执行。

## 4.5.5 指令流水线的基本概念

机器指令的执行是在CPU中完成的，通常将指令执行过程中数据所经过的路径，包括路径上的部件称为数据通路。如图4.24中的ALU、通用寄存器、状态寄存器等都是指令执行过程中数据流经的部件，都属于数据通路的一部分。整数运算数据通路的宽度就是指其中通用寄存器和ALU的位数，它们总是一致的，因此机器字长就等于整数运算数据通路的宽度。

通常把数据通路中专门进行数据运算的部件称为执行元件（Execution Unit）或功能元件（Function Unit），数据通路由控制元件（也称控制器）进行控制。CPU中最基本的电路主要有数据通路和控制器两部分组成。

自从1946年冯·诺依曼及同事在普林斯顿高级研究院开始设计存储程序计算机（被称为IAS计算机，它是后来通用计算机的原型）以来，从IAS计算机中 CPU内部的分散连接结构，到基于单总线、双总线或三总线的总线式CPU结构，再到基于简单流水线和超标量动态调度的流水线CPU结构、多核CPU结构等，CPU结构发生了较大变化。在CPU设计中最关键的思路之一是让指令在CPU中按流水线方式执行。

以下以1.1.3节中给出的8位模型机为例，对流水线CPU的基本工作原理和流水线CPU结构进行简要介绍。由图1.2可知，该模型机中每条指令的长度都是8位，即下一条指令地址等于PC+1，指令中操作码 op固定在指令码的高4位，寄存器编号 rt 和 rs各占2位，主存地址addr占4位，它们都固定在指令码的低4位。

该模型机支持的基本指令包括运算类指令、寄存器传送指令、装人和存储类指令。例如，指令 ${ \bf \Phi } ^ { * } \mathrm { a d d } \ \mathrm { r 0 } , \ \mathrm { r 1 } ^ { * }$ 的功能为 $\mathbb { R } \left[ \mathbb { r } 0 \right] { \longleftarrow } \mathbb { R } \left[ \mathbb { r } 0 \right] + \mathbb { R } \left[ \mathbb { r } 1 \right]$ ，指令“mov rl， $x 0 ^ { * }$ 的功能为$\mathbb { R } [ { \bf r } \mathbb { 1 } ] {  } \mathbb { R } [ { \bf r } 0 ]$ ，装入指令 $^ { * 4 } \mathrm { l o a d } \ \mathrm { r 0 } , \ 6 \# ^ { 5 9 }$ 的功能为 $\mathbb { R } [ { \mathbf { \Delta } } \mathbf { r } 0 ] {  } \mathbb { M } [ { \mathbf { \Delta } } 6 ]$ ，存储指令“store 8#， $\pi 0 ^ { \dag \dag }$ 的功能为 $\mathbb { M } [ 8 ] {  } \mathbb { R } [ { \mathbb { r } } 0 ]$ 0

所有这些指令的处理过程可以归纳为以下4个阶段。

1) 取指令并PC 加1（IF)：根据PC的值从存储器取出指令，并 $\mathrm { P C } {  } \mathrm { P C } { + } 1 _ { \varsigma }$

2）译码并读寄存器（ID）：对指令操作码进行译码并生成控制信号，同时读取寄存器rs 和 rt 的内容。

3）运算或读存储器（EX)：在 ALU 中对寄存器操作数进行运算，或者根据addr读存

储器。

4）结果写回（WB)：将结果写入目的寄存器rt，或写入主存单元addr中。

显然，对于add这种运算类指令和取数指令load，其处理过程将包含上述4个阶段，而对于寄存器传送指令mov 和存数指令 store，其处理过程仅包含IF、ID 和WB 三个阶段。

如果将各阶段看成相应的流水段，则指令的执行过程就构成了一条指令流水线。为了规整指令流水线，指令的流水段个数通常取最复杂指令所需的阶段数，其他指令通过加入“空”段向最复杂指令靠齐。例如，上述模型机的指令流水线可以有4个流水段，mov和store 指令的 EX 阶段为空操作阶段。

进入流水线的指令流，由于后一条指令的第i步与前一条指令的第i+1步同时进行，从而使一串指令的总处理时间大为缩短。如图4.26所示，在理想状态下，完成4条指令的执行只用了7个时钟周期，若采用非流水线方式的串行执行处理，则最多需要16个时钟周期。

![](images/fb071e19b7a1027e189d8b00ed96c2897c7e3932936645599e5f20d23589b9ff.jpg)  
图4.26 4 段指令流水线示例

从图4.26可看出，理想情况下，每个时钟都有一条指令进入流水线：从第5时钟周期开始，每个时钟周期都有一条指令完成。由此可以看出，理想情况下，每条指令执行的时钟周期数（即CPI）都为 $1 _ { \mathrm { ~ o ~ } }$ 下面用一个简单的例子对指令串行执行方式和流水线方式进行比较。

假设上述8位模型机指令执行时主要操作所用时间分别如下：指令译码—60ps；存储器读或存储器写—200ps；PC 加 $1 { \mathrm { - } } 4 0 \mathfrak { p s }$ ；寄存器读或寄存器写一 $- 5 0 \mathrm { p s } ; \mathrm { A L U - 1 0 0 \mathrm { p s } }$ ，则串行执行方式下，mov指令执行时间约为 $2 0 0 \mathrm { p s } + 6 0 \mathrm { p s } + 5 0 \mathrm { p s } = 3 1 0 \mathrm { p s }$ ，add 指令执行时间约为200ps+$6 0 \mathrm { p s } + 1 0 0 \mathrm { p s } + 5 0 \mathrm { p s } = 4 1 0 \mathrm { p s }$ ，load指令执行时间约为 $2 0 0 \mathrm { p s } + 6 0 \mathrm { p s } + 2 0 0 \mathrm { p s } + 5 0 \mathrm { p s } = 5 1 0 \mathrm { p s }$ , store指令执行时间约为 $2 0 0 \mathrm { p s } + 6 0 \mathrm { p s } + 2 0 0 \mathrm { p s } = 4 6 0 \mathrm { p s }$ 0

在指令的流水线执行方式下，流水线CPU设计的原则是：指令流水段个数以最复杂指令所用的阶段数为准：流水段执行时间以最复杂操作所用时间为准。对于上述例子，最复杂指令为load指令，最复杂操作为存储器读/写，因而指令流水段个数为4，每个流水段长度为200ps。在流水线CPU中，每条指令的执行时间为 $4 { \times } 2 0 0 ~ \mathrm { p s } = 8 0 0 ~ \mathrm { p s }$ ，反而比串行执行时所有指令的执行时间都长，因此流水线方式并不能缩短一条指令的执行时间。但是，对于整个程序来说，流水线方式可以大大增加指令执行的吞吐率。

若流水段数为M，每个流水段的执行时间为T，则理想情况下，N条指令的执行总时间为 $\left( M { - } 1 { + } N \right) \times T _ { \mathrm { c } }$ 例如，对于上述模型机对应的4段流水线，假定某程序有N条指令，在不考虑任何其他额外开销和冲突的情况下，流水线处理器所用时间为 $\left( 3 + N \right) \times 2 0 0 ~ \mathrm { p s }$ 。当N很大

时，流水线方式比串行执行方式要快很多。

## 本章小结

可执行文件的生成涉及预处理、编译、汇编和链接等过程，第3章主要介绍了编译和汇编过程中涉及的高级语言程序的机器级表示，因而本章主要介绍链接过程涉及的知识点，除此以外，本章还介绍了可执行文件的加载与执行，以及执行指令的中央处理器（CPU）相关的基本概念。

链接处理涉及目标文件格式，ELF目标文件格式有链接视图和执行视图两种，前者是可重定位目标格式，后者是可执行目标格式。链接视图中包含ELF头、各个节以及节头表；执行视图中包含ELF头、程序头表（段头表）以及各种节组成的段。

链接过程需要完成符号解析和重定位两方面的工作，符号解析的目的就是将符号的引用与符号的定义关联起来，重定位的目的是分别合并代码和数据，并根据代码和数据在虚拟地址空间中的位置，确定每个符号的最终存储地址，然后根据符号的确切地址来修改符号的引用处的地址。

在不同的目标模块中可能会定义相同的符号，因为相同的多个符号只能分配一个地址，因而链接器需要确定以哪个符号为准。链接器根据一套规则来确定多重定义符号中哪个是唯一的定义符号，如果不了解这些规则，则可能无法理解程序执行的有些结果。

加载器在加载可执行文件时，实际上只是把其中的只读代码段和可读/写数据段映射到了虚拟地址空间中某个确定的位置，并没有真正把代码和数据装入主存。

CPU的基本功能是周而复始地执行指令，并处理内部异常和外部中断。指令执行过程主要包括取指、译码、取数、运算、存结果。现代计算机的数据通路都采用流水线方式实现，将每条指令的执行过程分解成阶段相同的几个流水段，每个流水段的执行时间也被设置成完全相同。流水线方式下，同时有多条指令重叠执行，因此程序的执行时间比串行执行方式下缩短很多。

## 习 题

1. 给出以下概念的解释说明。

进程 进程描述符

内部异常外部中断

控制器 时钟信号

2. 简单回答下列问题。

（1）如何将多个C程序模块组合生成可执行文件？简述从源程序到可执行文件的转换过程。

(2)可重定位目标文件和可执行目标文件的主要差别是什么？

(3) 链接器主要完成哪两方面的工作？

(4) 可重定位文件的.text 节、.rodata节、.data 节和.bss 节中分别主要包含什么信息？

(5)可执行目标中有哪两种可装入段？哪些节组合成只读代码段？哪些节组合成可读/写数据段？

（6）加载可执行文件时，加载器根据其中哪个表的信息对可装入段进行映射？

(7)静态链接和动态链接的差别是什么？

(8）在可执行文件中将可装入段映射到虚拟地址空间，以形成每个进程独立的虚拟地址空间，这种做法有什么好处？

(9) 简述通过shell命令行解释程序进行程序加载的过程。

(10) CPU的基本组成和基本功能各是什么？

（11）如何控制一条指令执行结束后能够接着另一条指令执行？

（12）通常一条指令的执行要经过哪些步骤？每条指令的执行步骤都一样吗？

(13)流水线方式下，一条指令的执行时间缩短了还是加长了？程序的执行时间缩短了还是加长了？

（14）具有什么特征的指令系统易于实现指令流水线？

3. 假设一个C 语言程序有两个源文件：main.c和test.c，它们的内容如图4.27所示。

![](images/5510210c48fd9da49a1fa7bab073c303148e288b64f948a033ed860777ab0645.jpg)  
图4.27 题3图

对于编译生成的可重定位目标文件test.o，填写表4.1中各符号的情况，说明每个符号是否出现在test.o的符号表（.symtab节）中，如果是的话，则定义该符号的模块是main.o还是test.o、该符号的类型相对于test模块是全局、外部还是本地符号、该符号出现在test.o中的哪个节（. text、.data或.bss）或哪个特殊伪节（ABS、UNDEF或COMMON）中。

表4.1 题3用表
<table><tr><td rowspan=1 colspan=1>符号</td><td rowspan=1 colspan=1>在 test. o 的符号表中？</td><td rowspan=1 colspan=1>定义模块</td><td rowspan=1 colspan=1>符号类型</td><td rowspan=1 colspan=1>节</td></tr><tr><td rowspan=1 colspan=1>a</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>ptr</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>val</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>sum</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

4. 假设一个C 语言程序有两个源文件：main.c 和 swap.c，其中，main.c 的内容如图 4.9a所示，而 swap.c的内容如下：

![](images/208cbdf541bbe7f96a503179c6e3f106a162d3e4604a566f9baf222eb8a8589f.jpg)

对于编译生成的可重定位目标文件swap.0，填写表4.2中各符号的情况，说明每个符号是否出现在 swap. o的符号表（. symtab节）中，如果是，定义该符号的模块是main.o还是swap.o、该符号的类型相对于swap.o是全局、外部还是本地符号、该符号出现在 swap.o中的哪个节（. text、.data或.bss）或哪个特殊伪节（ABS、UNDEF或COMMON）中。

表4.2 题4用表
<table><tr><td rowspan=1 colspan=1>符号</td><td rowspan=1 colspan=1>在 swap.o的符号表中？</td><td rowspan=1 colspan=1>定义模块</td><td rowspan=1 colspan=1>符号类型</td><td rowspan=1 colspan=1>节</td></tr><tr><td rowspan=1 colspan=1>buf</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>bufp0</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>bufp1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>incr</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>count</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>swap</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>temp</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

5. 假设一个 C 语言程序有两个源文件：main.c 和 proc1.c，它们的内容如图4.28 所示。若编译器将已初始化全局变量x和z按序从小地址到大地址连续分配，而未初始化变量y紧随其后分配。回答下列问题。

(1)在上述两个文件中出现的符号哪些是强符号？哪些是COMMON符号？

(2) 程序执行后打印的结果是什么？分别画出执行 main.c 第 6 行的 proc1()函数调用前、后，在地址&x和&z中存放的内容。若main.c第3行改为 ${ } ^ { * * } \operatorname { s h o r t } { \mathrm {  ~ y = 1 ~ } } , \ { \mathrm {  ~ z = 2 ~ } } ; { \mathrm {  ~ \Omega ~ } }$ ，则打印结果又是什么？

(3) 修改文件 proc1，使得main.c能输出正确的结果（即 x =257，z=2)。要求修改时不能改变任何变量的数据类型和变量名。

(2)  
![](images/936d34a9daf081cbc61df75840f6ca0281a0dbc001c45c1bbd44259fc2feecb2.jpg)  
图 4.28 题5图

6. 以下每一小题给出了两个源程序文件，它们被分别编译生成可重定位目标模块m1.0和 m2.0。在模块 mj 中对符号 x 的任意引用与模块 mi 中定义的符号 x 关联记为 REF(mj. x)→DEF(mi.x)。请在下列空格处填写模块名和符号名，以说明给出的引用符号所关联的定义符号，若发生链接错误则说明其原因：若从多个定义符号中任选则给出全部可能的定义符号，若是局部变量则说明不存在关联。

(1)

![](images/7aa70a05e9749c0280a3ec6d74fa7de9db9603361574b157b13bf8795ddd037f.jpg)

① REF(m1. main)→DEF(\_

② REF(m2. main)→DEF(\_

③ REF(m1. p1)→DEF(

④ REF(m2. p1)→DEF(

![](images/1e57aee173d21356f37e5465497380395592645498fbd04103fa77c90f962997.jpg)

① REF(m1. main)→DEF(

② REF(m2. main)→DEF(

③ REF(m1. x)→DEF(

① REF(m1. main)→DEF(

② REF(m2. main)→DEF(

③ REF(m1. p1)→DEF(

④ REF(m1. x)→DEF(

⑤ REF(m2. x)→DEF(

![](images/ff5c209a4212724c6a193ea2f952ebc23a06b4cc9d0fe6dad9c2fefbf91cada5.jpg)

① REF(m1.x)→DEF(

② REF(m2. x)→DEF(

③ REF(m1. y)→DEF(

④ REF(m2. y)→DEF(.

7. 以下由两个目标模块m1和m2组成的程序，经编译、链接后在计算机上执行，结果发现即使p1中没有对数组变量main进行初始化，最终也能打印出字符串“0x5589\n”。为什么？要求解释原因。

![](images/2a498f4448edf2d21641bb91413de86e9a1040e63264e721199cf08f208bc047.jpg)

![](images/2d843b09d711972cfe710ded38d7bc5294c39c2aa23225dc7ada1896712542e4.jpg)

8. 图4.29中给出了用OBJDUMP显示的某个可执行目标文件的程序头表（段头表）的部分信息，其中，可读/写数据段（Read/Write Data Segment）的信息表明，该数据段对应虚拟存储空间中起始地址为0x8049448、长度为0x104个字节的存储区，其数据来自可执行文件中偏移地址0x448开始的0xe8个字节。这里，可执行文件中的数据长度和虚拟地址空间中的存储区大小之间相差了28B。请解释可能的原因。

Read -only code segment   
LOAD off 0x00000000 vaddr 0x08048000 paddr 0x08048000 align 2\*\*12   
filesz 0x00000448 memsz 0x00000448 flags r-x   
Read/write data segment   
LOAD off0x00000448 vaddr 0x08049448 paddr 0x08049448 align 2\*\*12   
filesz 0x000000e8 memsz 0x00000104 flags rw-  
图4.29 某可执行目标文件程序头表的部分内容

9. 图 4.17 给出了图 4.9a 所示的 main. c 源代码模块对应的 main.o 中. text 节和. rel. text节的内容，图中显示其.text节中有一处需重定位。假定链接后main()函数代码起始地址是0x8048386，紧跟在main后的是swap()函数的代码，且首地址按4B边界对齐。要求根据对图4.17的分析，指出 main.o的.text节中需重定位的符号名、位置（相对于.text节起始位置的偏移地址）、所在指令行号、重定位类型、重定位前的内容、重定位后的内容，并给出重定位值的计算过程。

10. 假定在一个如图4.26所示的4级流水线中，每个流水段功能部件的操作时间如下：指令译码—50ps；PC 加1—40ps；存储器读或写—200ps；ALU—150ps；寄存器读口或写口 $- 5 0 \mathrm { p s } _ { \circ }$ 回答下列问题。

(1)若执行阶段EX所用的 ALU操作时间缩短20%，则能否加快流水线执行速度？如果能，能加快多少？如果不能，为什么？

(2) 若ALU操作时间增加20%，对流水线的性能有何影响？

(3)若ALU操作时间增加40%，对流水线的性能又有何影响？

## 第5章 程序的存储访问

计算机采用“存储程序”工作方式，意味着在程序执行时所有指令和数据都是从存储器中取出来执行的。存储器是计算机系统中的重要组成部分，相当于计算机的“仓库”，用来存放各类程序及其处理的数据。计算机中所用的存储元件有多种类型，如触发器构成的寄存器、半导体静态RAM和动态RAM、闪存、磁盘、磁带和光盘等，它们各自有不同的速度、容量和价格，各类存储器按照层次化结构构成计算机存储系统。

本章主要介绍几类存储器的基本工作原理和基本结构。主要包括：半导体随机存取存储器、只读存储器、硬盘存储器等不同类型存储器的特点，内存芯片和CPU的连接，高速缓存的基本原理，以及虚拟存储器系统等。

## 5.1 存储器概述

## 5.1.1 存储器的分类

存储元件必须具有两个截然不同的物理状态，才能被用来表示二进制代码0和1。目前使用的存储元件主要有半导体器件、磁性材料和光介质。用半导体器件构成的存储器称为半导体存储器；磁性材料存储器主要是磁表面存储器，如磁盘存储器和磁带存储器；光介质存储器称为光盘存储器。

随机存取存储器（Random Access Memory，RAM） 的特点是通过对地址译码来访问存储单元，因为每个地址译码时间相同，所以，在不考虑芯片内部缓冲的前提下，每个单元的访问时间是一个常数，与地址无关。不过，现在的动态RAM（DynamicRAM，DRAM）芯片内都具有行缓冲，因而有些数据可能因为已经在行缓冲中而缩短了访问时间。半导体存储器属于随机存取存储器。

存储器按信息的可更改性分为读/写存储器（Read/Write Memory）和只读存储器（Read-OnlyMemory，ROM)。读/写存储器中的信息可以读出和写人，RAM芯片是一种读/写存储器；ROM芯片中的信息一旦确定，通常情况下只读不写，但在某些情况下也可重新写入。RAM芯片和ROM芯片都采用随机存取方式进行信息的访问。

指令直接面向的存储器是主存储器，简称主存，由DRAM芯片组成。高速缓存(Cache） 由静态 RAM（Static RAM，SRAM） 芯片组成，位于主存和 CPU之间，存取速度接近CPU的工作速度，用来存放当前CPU经常使用到的指令和数据。

存储器按断电后信息的可保存性分成非易失（不挥发）性存储器（NonvolatileMemory）和易失（挥发）性存储器（Volatile Memory）。非易失性存储器的信息可一直保留，不需电源维持。ROM、磁表面存储器、光存储器等都属于非易失性存储器。易失性存储器在电源关闭时信息自动丢失，如主存和高速缓存都属于易失性存储器。

CPU执行指令时给出的存储器地址是主存地址（在采用虚拟存储器的系统中，需要将指令给出的逻辑地址转换成主存地址，关于虚拟存储器请参见5.5节)。因此，主存是存储器层次结构中的核心存储器，用来存放系统中被启动运行的程序代码及其数据。

系统运行时直接和主存交换信息的存储器称为外部辅助存储器，简称辅存或外存。磁盘存储器相对于磁带和光盘存储器速度快，因此，目前大多用磁盘存储器或固态硬盘作为辅存，辅存的内容需要调入主存后才能被CPU访问。磁带存储器和光盘存储器的容量大、速度慢，主要用于信息的备份和脱机存档，因此被用作海量后备存储器。

## 5.1.2 主存储器的组成和基本操作

如图5.1所示是主存储器的基本框图。由存储0或1的记忆单元（Cell）构成的存储阵列是存储器的核心部分。这种记忆单元也称为存储元或位元，它是具有两种稳态的能表示二进制0和1的物理器件。存储阵列（Bank）也称为存储体、存储矩阵。为了存取存储体中的信息，必须对存储单元编号，所编号码就是地址。对各存储单元进行编号的方式称为编址方式（Addressing Mode)，可以按字节编址，也可以按字编址。编址单位（Addressing Unit)指具有相同地址的那些位元构成的一个单位，可以是一个字节（按字节编址）或一个字（按字编址)。现在大多数通用计算机都采用按字节编址方式，即存储体内一个地址中有一个字节。也有一些专用于科学计算的大型计算机采用64位编址，这是因为科学计算中数据大多是64位浮点数。

![](images/40602342f2945396ffeacf16066f46a35c06d684a6b7b666f6b67df2855e205c.jpg)  
图 5.1 主存储器基本框图

图5.1仅是主存基本结构及其与CPU连接的示意图，图中的存储器数据寄存器(Memory Data Register，MDR) 和存储器地址寄存器(Memory Address Register，MAR) 属于CPU中的总线接口部件。实际上，CPU并非与主存芯片直接交互，而是先与主存控制器(Memory Controller) 交互，再由主存控制器来控制主存芯片进行读/写。现代处理器一般采用DRAM作为主存，因此主存控制器也称为DRAM控制器。

图5.1中连到主存的数据线有64位，在字节编址方式下，每次最多可存取8个单元。地址线的位数决定了主存地址空间的最大可寻址范围，如36位地址的最大寻址范围为0\~$2 ^ { 3 6 } - 1$ ，地址从0开始编号。

## 5.1.3 存储器的层次化结构

存储器容量指它能存放的二进制位数或字节数。存储器的访问时间也称存取时间(AccessTime).是指访问一次数据所用的时间。存储器容量和访问时间应能随着处理器速度的提高而同步提高，以保持系统性能的平衡。然而，随着时间的推移，处理器和存储器在性能上的差异越来越大。为了缩小存储器和处理器两者之间的差距，通常在计算机系统中采用层次化存储结构。

一种元件制造的存储器很难同时满足大容量、高速度和低成本的要求。例如，半导体存储器的存取速度快，但是难以构成大容量存储器。而大容量、低成本的磁表面存储器的存取速度又远低于半导体存储器。并且难以实现随机存取。因此，在计算机中把各种不同容量和不同存取速度的存储器按一定的结构有机结合，以形成层次化存储结构，使得整个存储系统在速度、容量和价格等方面具有较好的综合指标。图5.2是存储系统层次结构示意图。

![](images/8a7c2eb03a973b698c44608f4c28cb192549a3c773e337b8483fdc2e211057ae.jpg)  
图5.2 存储器层次化体系结构示意图

图5.2中给出的典型存取时间和存储容量虽然会随时间变化，但这些数据仍能反映速度和容量之间的关系，以及层次化结构存储器的构成思想。速度越快则容量越小、越靠近CPU。CPU可以直接访问内部存储器，而外部存储器的信息则要先取到主存，然后才能被CPU访问。

在层次结构存储系统中，数据只能在相邻两层之间传送，读数据时总是从慢速存储器按固定单位传送到快速存储器，且靠近CPU的相邻层之间的传送单位小，远离CPU的相邻层之间的传送单位更大。例如，在cache和主存之间传送的主存块（Block）大小通常为几十字节；而在主存与硬盘之间传送的页（Page）大小通常为几千字节以上。

在层次结构存储系统中，CPU需要访问存储器时，先访问cache，若不在cache，再访问主存，若不在主存，则访问硬盘，此时，从硬盘中读出信息送主存，然后再从主存送cache。

因为程序访问的局部性特点，使得当前访问单元所在的一块信息（如主存块）从慢速存储器装入快速存储器后的一段时间内，CPU总能在快速存储器中访问到需要的信息，而无须访问慢速存储器，从而提升CPU执行程序的性能。因此，层次结构存储系统可以在速度、容量和价格方面达到较好的综合指标。

## 5.1.4 程序访问的局部性

对大量典型程序运行情况分析的结果表明，在较短时间间隔内，程序产生的访存地址往往集中一个很小的范围，这种现象称为程序访问的局部性，包括时间局部性和空间局部性。

时间局部性指被访问的存储单元在较短时间内很可能被重复访问，空间局部性指被访问的存储单元的邻近单元在较短时间内很可能被访问。

程序访问局部性的原因不难理解。因为程序由指令和数据组成，指令在主存连续存放，  
循环程序段或子程序段常被重复执行，因此，指令的访问具有明显的局部化特性；而数据在  
主存也是连续存放，如数组元素常被按序重复访问，因此，数据也具有明显的局部化特征。例如，对于以下C程序段：

![](images/c18641705cbf9f3a1a62a1a8c5dbba56c5faddbc960e9b199771e3ded0254065.jpg)

上述程序段对应的目标代码可由以下10条指令组成。

![](images/2dabb814c4d1788bcfb196a8ad2f6effb3eb0d1ae6c7c8ea4e92eedef20af686.jpg)

上述目标代码描述中的 sum、ap、i、n和t均为通用寄存器，每条指令占4B，每个数组元素占4B，主存按字节编址，指令和数组首地址分别为0x0FC和0x400，则指令和数组元素的存放情况如图5.3所示。

从图5.3可看出，在程序执行过程中，首先指令按I0\~I3的顺序执行，然后，指令I4\~18按顺序被循环执行n次。只要n足够大，程序将在一段时间内一直在该局部区域内执行。对于指令访问来说，程序对主存的访问过程为：0x0FC(I0)→0x108(I3)$\begin{array} { r } { \longrightarrow 0 \mathrm { x } 1 0 \mathrm { C } \left( \mathrm { \small ~ I } 4 \right) { \longrightarrow } 0 \mathrm { x } 1 1 \mathrm { C } \left( \mathrm { \small ~ I } 8 \right) \longrightarrow 0 \mathrm { x } 1 2 0 \left( \mathrm { \small ~ I } 9 \right) } \\ { \uparrow \qquad \quad \hfill \qquad \mathrm { \small ~ I } ^ { \prime } } \end{array}$ ，体现了时间局部性和空间局部性。

上述程序在指令14中访问数组，数组下标每次加4，按每次4B连续访问主存。因为数组在主存中连续存放，因此，该程序对数据的访问过程如下： $0 \times 4 0 0 { \longrightarrow } 0 \times 4 0 4 { \longrightarrow } 0 \times 4 0 8 { \longrightarrow } 0 \times 4 0 \mathrm { C } { \longrightarrow } { } { } \cdots$ 由此可见，程序将在一段时间内连续访问该局部区域中的数据，体现了空间局部性。

为了更好地利用程序访问的局部性，通常把当前访问单元以及邻近单元作为一个主存块一起调入cache。主存块的大小以及程序对数组元素的访问顺序等都对程序的性能有一定影响。

![](images/675cc359413b87b7c683c752c5794a2ca4d6ad521920a0c871aa3129813e97a8.jpg)  
图5.3 指令和数组在主存的存放

例5.1 假定数组元素按行优先存放，以下两段伪代码程序段A 和B 中：(1) 对于数组a的访间，哪一个空间局部性更好？哪一个时间局部性更好？（2）变量sum的空间局部性和时间局部性各如何？（3)对于指令访问来说，for循环体的空间局部性和时间局部性如何？

程序段A

![](images/cb5f2821d6d55682e73529aed6fd4b45fb6b0a5f9bbb63925b3bd310353dacc6.jpg)

解：假定M、N为2048，主存按字节编址，指令和数据在主存的存放情况如图5.4所示。 Ox0FC10

(1) 对于数组a，程序段A和B的空间局部性相差较大。A对数组a的访问顺序为a[0][0]，a[0][1]，…,a[0][2047];a[1][0]，a[1][1],…，a[1][2047];…，访间顺序与存放顺序一致，故空间局部性好。B对数组a的访问顺序为a[0][0]，a[1][0],…, a[2047][0];a[0][1], a[1][1],…,a[2047][1]；…，访问顺序与存放顺序不一致，每次访问都要跳过2048个元素，即8192个主存单元，因而没有空间局部性。

时间局部性在程序A和B中都差，因为每个数组元素都只被访问一次。

(2) 对于变量sum，在程序段 A 和B 中的访问局部性一样。空间局部性对单个变量来说没有意义；而时间局部性在A和B中都较好，因为 sum变量在A 和B 的每次循环中都要被访问。不过，通常编译器都将其分配在寄存器中，循环执行时只要取寄存器内容进行运算，最后再把寄存器的值写回到存储单元中。

![](images/cfb7b483a2c3a86f8bec91b482a017b2b1ca056356073630ad43ce01dec3708b.jpg)  
图5.4 指令和二维数组在主存的存放

(3) 对于for循环体，程序段A和B 中的访问局部性一样。因为循环体内指令按序连续存放，所以空间局部性好；内循环体被连续重复执行2048×2048次，因此时间局部性也好。

从上述分析可看出，虽然程序A和B的功能相同，但因为内、外两重循环的顺序不同而导致两者访问数组a的空间局部性相差较大，从而导致执行时间也相差较大。在2GHzPentium 4 上执行这两个程序 $\mathrm { ' } \ \mathbf { M } = \mathbf { N } = 2 0 4 8 )$ ，程序 A只需要59393288个时钟周期，而B则需要1277877876个时钟周期，程序A的执行速率约是程序B的21.5倍！

## 5.2 主存与CPU的连接及读/写操作

## 5.2.1 主存芯片技术

动态 RAM 主要用作主存，目前主存常用的是基于 SDRAM（Synchronous DRAM） 芯片技术的内存条，包括 DDR SDRAM、DDR2 SDRAM 和 DDR3 SDRAM 等。SDRAM 是一种与当年Intel推出的芯片组中北桥芯片的前端总线同步的DRAM芯片，因此，称为同步DRAM。

SDRAM的工作方式与传统的 DRAM有很大不同。传统DRAM与CPU之间采用异步方式交换数据，CPU发出地址和控制信号后，经过一段延迟时间，数据才读出或写入。在这段时间里，CPU不断采样DRAM的完成信号，在没有完成之前，CPU插入等待状态而不能做其他工作。而SDRAM芯片则不同，其读/写受外部系统时钟（即前端总线时钟CLK）控制，因此与CPU之间采用同步方式交换数据。它将CPU或其他主设备发出的地址和控制信息锁存起来，经过确定的几个时钟周期后给出响应。因此，主设备在这段时间内，可以安全地进行其他操作。

SDRAM的每一步操作都在外部存储器总线时钟的控制下进行，支持突发传输（Burst)方式。只要在第一次存取时给出首地址，以后按地址顺序读/写即可，而不再需要地址建立时间和行、列预充电时间，就能连续快速地从行缓冲器中输出一连串数据。内部的工作方式寄存器（也称模式寄存器）可用来设置传送数据的长度以及从收到读命令（与列地址选通信号CAS同时发出）到开始传送数据的延迟时间等，前者称为突发长度（Burst Lengths，BL)，后者称为 CAS 延迟(CAS Latency，CL)。根据所设定的 BL 和 CL，CPU 可以确定何时开始从总线上取数以及连续取多少个数据。在开始的第一个数据读出后，同一行的所有数据都被送到行缓冲（RowBuffer）中，如果存储器总线所需访问的数据已经在行缓冲中，则可以直接访问行缓冲。无须访问存储体，体现了程序访存的时间局部性。此外，由于行缓冲存放了同一行的数据，这些数据的主存地址连续，因此后续可从行缓冲快速读出主存地址相邻的数据，体现了程序访存的空间局部性。

DDR（Double Data Rate） SDRAM 是对标准 SDRAM 的改进设计，通过芯片内部的预取缓冲区提供的双字预取功能，并利用存储器总线上时钟信号的上升沿与下降沿，实现一个时钟内传送两个存储字的功能。例如，采用DDR SDRAM技术的PC3200（DDR400）存储芯片内部时钟频率为200MHz，意味着存储器总线上的时钟频率也为200MHz，而存储器总线的数据线位宽为64，即每次传送64位，因而PC3200（DDR400）芯片所连接的存储器总线最大数据传输率（即带宽）为 $2 0 0 \mathrm { M H z } \times 2 \times 6 4 \mathrm { b i t } 8 = 3 . 2 \mathrm { G B } / \mathrm { s }$ 。PC2100（DDR133）芯片对应的带宽为 $1 3 3 \mathrm { M H z } \times 2 \times 6 4 \mathrm { b i t } / 8 = 2 . 1 \mathrm { G B } / 8 ,$ 0

与DDR SDRAM类似，DDR2 SDRAM内存条芯片内部预取缓冲区采用4 位预取、存储器总线时钟频率为芯片内部的2倍；而DDR3 SDRAM芯片内部缓冲则采用8位预取、存储器总线时钟频率为芯片内部的4倍：同样地，存储器总线每个时钟内传送两次数据。例如，若DDR3存储芯片内部时钟频率为200MHz，每次存储器总线传送64位，则其最大数据传输率为 $2 0 0 \mathrm { M H z } \times 8 \times 6 4 \mathrm { b i t } / 8 = 8 0 0 \mathrm { M H z } \times 2 \times 6 4 \mathrm { b i t } / 8 = 1 2 . 8 \mathrm { G B } / 8 \sqrt { 1 0 ^ { 3 } - 6 4 \mathrm { b i t } / 1 6 }$

## 5.2.2 主存与 CPU 的连接

主存与CPU之间的连接如图5.5所示。CPU通过总线接口部件与处理器总线相连，然后再通过总线之间的I/0桥接器、存储器总线连接到主存。

![](images/e06a5b2623dffe4051a9c027f12b49374060d85a9e092cee322d114e44f39a90.jpg)  
图 5.5 主存与 CPU 的连接

总线是连接其上的各部件共享的传输介质，通常总线由控制线、数据线和地址线构成。如图5.5所示，计算机中各部件之间通过总线相连，例如，CPU通过处理器总线和存储器总线与主存相连。在CPU和主存之间交换信息时，CPU通过总线接口部件把地址信息和总线控制信息分别送到地址线和控制线，CPU和主存之间交换的数据则通过数据线传输。

受集成度和功耗等因素的限制，单个芯片的容量不可能很大，所以往往通过存储器芯片的扩展技术，将多个芯片集成在内存条（也称主存模块，一种特殊的电路板）上，然后由多个内存条以及主板或扩充板上的RAM芯片和ROM芯片组成一台计算机所需的主存空间，再通过总线、桥接器等和CPU相连，如图5.6所示。图5.6a是内存条和内存条插槽（Slot)示意图，图 5.6b 是主存控制器（Memory Controller)、存储器总线、内存条和 DRAM 芯片之间的连接示意图。主存控制器可以包含在图5.5所示的V0桥接器中。

内存条插槽就是存储器总线，内存条中的信息通过内存条的引脚以及插槽内的引线连接到主板上，再通过主板上的导线连接到位于北桥芯片内或CPU芯片内的主存控制器。现代计算机支持多条存储器总线同时传输数据，支持两条总线同时传输的内存条插槽为双通道内存插槽，还有三通道、四通道内存插槽，其总线传输带宽可以分别提高到单通道的两倍、三倍和四倍。例如，图5.6a所示为双通道内存插槽，相同颜色的插槽可并行传输，若只有两个内存条，则应插在相同颜色的两个插槽上，其传输带宽可增大一倍。

![](images/1a35012586cb7e562c02fe960414fed07cdd1855f76c1f13a117c26293cb72a2.jpg)  
a) 内存条和内存条插槽

![](images/c5cd97d3dd311ffa14cba1cab63f2d1a9acfb4a3f207551898e5c8619bf0045a.jpg)  
b)主存控制器、存储器总线、内存条和DRAM芯片之间的连接  
图5.6 DRAM芯片在系统中的位置及其连接关系

由若干存储器芯片构成一个存储器时，需要在字方向和位方向上进行扩展。位扩展指用若干片位数较少的存储器芯片构成给定字长的存储器。例如，用8片4K×1位的芯片构成4K×8位的存储器，需在位方向上扩展8倍，字方向上无须扩展。字扩展是容量的扩充，位数不变。例如，用16K×8位的存储芯片在字方向上扩展4倍，可构成一个64K×8位的存储器。当芯片在容量和位数都不满足存储器要求时，需要对字和位同时扩展。例如，用16K×4位的存储芯片在字方向上扩展4倍、位方向上扩展2倍，可构成一个64K×8位的存储器。

图5.7是用8个16M×8位的DRAM芯片扩展构成一个128MB内存条的示意图。每片DRAM芯片中有一个4096×4096×8位的存储阵列，行地址和列地址各12位 $( 2 ^ { 1 2 } = 4 0 9 6 )$ 有8个位平面。

内存条通过存储器总线连接到主存控制器，CPU通过主存控制器对内存条中的DRAM芯片进行读/写，CPU要读/写的存储单元地址通过系统总线送到主存控制器，然后由主存控制器将存储单元地址转换为DRAM芯片的行地址i和列地址j，分别在行地址选通信号和列地址选通信号的控制下，通过DRAM芯片的地址引脚，分时送到DRAM芯片内部的行地址译码器和列地址译码器，以选择行、列地址交叉点（i，j）的8位数据同时进行读/写，8个芯片可同时读取64位，通过存储器总线将64位数据返回给主存控制器，再由主存控制器通过系统总线将该数据返回给CPU。

现代通用计算机大多按字节编址，因此，在图5.7所示的存储器结构中，同时读出的

![](images/0a2bb44b60d66b708359fb1cb0204c67a36b526f42885278274b936bf026202c.jpg)  
图 5.7 DRAM 芯片的扩展

64位可能是第0\~7单元、第8\~15单元、…第8k\~8k+7单元，以此类推。因此，若访问的一个int型数据不对齐，假定在第6、7、8、9这4个单元中，则需要访问两次存储器。若数据对齐，即起始地址是4的倍数，则CPU只要访问一次主存控制器，主存控制器也只要访问一次存储器芯片。

## 5.2.3 装入/存储指令的操作过程

访存指令主要有两类：取数指令（Load）用于将存储单元内容装人CPU的寄存器中，如1.1.3节给出的8位模型机中的“load r0,6#”指令，IA-32中的“movl8(%ebp),%eax”指令等：存数指令（Store）用于将CPU寄存器的内容存储到存储单元中，如1.1.3节给出的8位模型机中的“store 10#，r0”指令，IA-32中的“movl %eax，8(%ebp)”指令等。

对于上述指令“loadr0，6#”，取数操作的大致过程如图5.8所示。

![](images/cabd295c2bf7757beccf2364c17a66fbdeae0dd0a7ef4fde4dd2126a9706d450.jpg)  
图5.8 从主存单元取数到寄存器的操作过程

![](images/0f54bab2d25927961e4ba134f41e4d79f3f1872646a777bc74eb11ccd8fdcb48.jpg)  
b)主存将6号单元中的数据x读出送数据线

![](images/63ac0b2620cbd72408beb077394201e3e0433d03a4463e4509d1f7fa734d6936.jpg)  
图5.8 从主存单元取数到寄存器的操作过程（续）

图5.8a为第一步，CPU将主存地址6通过总线接口送到地址线，然后由主存控制器将地址6分解成行、列地址按分时方式送至DRAM芯片：图5.8b为第二步，主存将地址6中的数据x通过数据线送到主存控制器，再由主存控制器将数据送到CPU的总线接口部件中；图5.8c为第三步，CPU从总线接口中取出x存到寄存器 $_ { \mathrm { r 0 } }$ 中。实际上，上述过程的第一步同时还会把“存储器读”等控制命令通过控制线送到主存控制器，再由主存控制器将控制命令转换为发往DRAM芯片的控制命令，这在图中没有表示出来。

对于上述指令“store10#，r0”，存数操作的大致过程如图5.9所示。

![](images/969949be9f5be8059c27b70bdfa292f94c79e119cfa892a6ead0935882fa3d86.jpg)  
a) CPU通过地址线送出地址10到主存

![](images/88dc2366caaf6158e52a965990592744b8949c17f5688f35de94360562ccd727.jpg)  
b) CPU将数据y送数据线  
图5.9 将寄存器内容存储到主存单元的操作过程

![](images/28cf3ae13280e1582cd79a6c3ba1c2ffff4fc850b5f09fd173268c54da704831.jpg)  
图5.9 将寄存器内容存储到主存单元的操作过程（续）

图5.9a为第一步，其过程与图5.8a相同；图5.9b为第二步，CPU将寄存器r0中的数据y通过总线接口部件送到数据线，并通过主存控制器将数据送到DRAM芯片；图5.9c为第三步，主存将主存控制器从数据线上送来的y存入10号单元。实际上，上述过程的第一步同时还会把“存储器写”控制命令通过主存控制器送到主存，这在图中没有表示出来，而且，第二步将数据y送数据线也可以和第一步并行进行。

## 5.3 硬盘存储器

## 5.3.1 磁盘存储器的结构

磁盘存储器主要由磁记录介质、磁盘驱动器、磁盘控制器三大部分组成。磁盘控制器(Disk Controller)包括控制逻辑、时序电路、“并→串”转换和“串→并”转换电路。磁盘驱动器包括读/写电路、读/写转换开关、读/写磁头与磁头定位伺服系统。图5.10是磁盘驱动器的物理组成示意图。

![](images/bb34bbd93ebac90cdfda59094b324a4f6ce36b684c0a9aad82506f6c201a7402.jpg)  
图5.10 磁盘驱动器的物理组成

如图5.10所示，磁盘驱动器主要由多个硬盘片、主轴、主轴电机、移动臂、磁头和控制电路等部分组成，通过接口与磁盘控制器连接，每个盘片的两个面上各有一个磁头，因此，磁头号就是盘面号。磁头和盘片相对运动形成的圆构成一个磁道（Track），磁头位于不同的半径上，则得到不同的磁道。多个盘片上相同磁道形成一个柱面（Cylinder)，所以，磁道号就是柱面号。信息存储在盘面的磁道上，而每个磁道被分成若干扇区（Sector)，以扇区为单位进行磁盘读/写。在读/写磁盘时，总是写完一个柱面上所有的磁道后，再移到下一个柱面。磁道从外向里编址，最外面的为磁道0。

图5.11所示是磁盘驱动器的内部逻辑。

![](images/227ac9b13673e7c0593b45c0747f25578ad3d9640a31eb89ff314ba0daad2434.jpg)  
图5.11 磁盘驱动器的内部逻辑结构

磁盘读/写是指根据主机访问控制字中的盘地址（柱面号、磁头号、扇区号）读/写目标磁道中的指定扇区。因此，其操作包含寻道、旋转等待和读/写三个步骤。

1）寻道操作：磁盘控制器把盘地址送到盘驱动器的磁盘地址寄存器后，便产生寻道命令，启动磁头定位伺服系统，根据磁头号和柱面号，选择指定的磁头移动到指定的柱面。此操作完成后，发出寻道结束信号给磁盘控制器，并转入旋转等待操作。

2）旋转等待操作：盘片旋转时，首先将扇区计数器清零，以后每来一个扇区标志脉冲，扇区计数器加1，把计数内容与磁盘地址寄存器中的扇区地址进行比较，如果一致，则输出扇区符合信号，说明要读/写的信息已经转到磁头下方。

3）读/写操作：扇区符合信号送给磁盘控制器后，磁盘控制器的读/写控制电路开始动作。如果是写操作，就将数据送到写入电路，写入电路根据记录方式生成相应的写电流脉冲；如果是读操作，则由读出放大电路读出内容送磁盘控制器。

数据在磁盘上的记录格式分定长记录格式和不定长记录格式两种。目前大多采用定长记录格式。最早的硬盘由IBM公司开发，称为温切斯特盘，简称温盘，它是几乎所有现代硬盘产品的原型。图5.12是温切斯特磁盘的磁道格式示意图，它采用定长记录格式。

![](images/cd94712fdb7a2c2bf18d22a154329e6a766af4d8b9b5f84eb6e279025bb4e335.jpg)  
图5.12 温切斯特磁盘的磁道记录格式

如图5.12所示，每个磁道由若干个扇区（也称扇段）组成，每个扇区记录一个数据块，每个扇区有头空（间隙1）、ID域、间隙2、数据域和尾空（间隙3）组成。头空占17B，不记录数据，用全1表示，磁盘转过该区域的时间是留给磁盘控制器做准备用的；ID域由同步字节、磁道号、磁头号、扇段号和相应的CRC码组成，同步字节标志ID域的开始；数据域占515B，由同步字节、数据和相应的CRC码组成，其中真正的数据区占512B；尾空是在数据块的CRC码后的区域，占20B，也用全1表示。

## 5.3.2 磁盘存储器的性能指标

磁盘存储器的性能指标包括记录密度、存储容量、数据传输率和平均存取时间等。

## 1. 记录密度

记录密度可用道密度和位密度来表示。道密度指在沿磁道分布方向上单位长度内的磁道数。位密度指在沿磁道方向上单位长度内存放的二进制信息量。采用低密度存储方式时，所有磁道的扇区数相同、位数相同，因而内道的位密度比外道高：采用高密度存储方式时，每个磁道的位密度相同，因而外道的扇区数比内道多。高密度磁盘的容量比低密度磁盘高得多。

## 2. 存储容量

存储容量指整个存储器存放的二进制信息量，它与磁表面大小和记录密度密切相关。磁盘的未格式化容量指按道密度和位密度计算出来的容量。它包括头空、ID域、CRC码等信息，是可使用的所有磁化单元总数。格式化后的实际容量只包含数据区，故小于未格式化容量。通常，记录面数为盘片数的两倍。若按每扇区512B大小算，则磁盘实际数据容量（格式化容量）的计算公式如下。

$$
\begin{array} { r l } & { \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 3 } } { 2 } + \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 3 } } { 3 2 } - \frac { 3 \mathcal { J } _ { \mathrm { H F } } ^ { 4 } } { 2 } \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 3 } } { 3 2 } \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 3 } } { 2 } \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 3 } } { 2 } = 2 \times \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 4 } } { 2 } \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 3 } } { 3 2 } \langle x _ { \mathrm { H G } } ^ { + 2 } , y _ { \mathrm { H F } } ^ { 3 \rangle } { 2 } \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 4 } } { 3 2 } \langle y _ { \mathrm { H F } } ^ { - 3 } , y _ { \mathrm { H F } } ^ { 3 \rangle } \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 3 } } { 2 } \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 3 } } { 3 2 } \frac { \mathcal { J } _ { \mathrm { H F } } ^ { 4 } } { 2 } , y _ { \mathrm { H F } } ^ { 3 \rangle } = 5 1 2 \mathrm { ~ B / { \frac { 3 4 } { 2 } } } \mathrm { ~ B / { \frac { 3 4 } { 2 } } ~ B / { \frac { 3 4 } { 2 } } ~ } . } \end{array}
$$

早期扇区大小一直是512B，目前扇区大小通常为更大、更高效的4096B。注意，在表示磁盘容量和文件大小时，可用Ki、Mi、Gi等表示2的幂，如4KiB表示4096B。

## 3. 数据传输速率

数据传输速率（Data Transfer Rate）指磁盘存储器完成磁头定位和旋转等待以后，单位时间内读/写存储介质的二进制信息量。为区别于外部数据传输率，通常称之为内部传输速率(Internal Transfer Rate)，也称为持续传输率(Sustained Transfer Rate)。而外部传输速率(Extermal Transfer Rate）指主机中的外设控制接口读/写外存储器缓存的速度，由外设采用的接口类型决定，也称为突发数据传输率(Burst Data Transfer Rate) 或接口传输率。

## 4. 平均存取时间

磁盘响应读/写请求的过程如下：首先将读/写请求在队列中排队。出队列后由磁盘控制器解析请求命令，然后进行寻道、旋转等待和读/写数据三个过程。因此，总响应时间的计算公式如下：

$$
\begin{array} { r } { \rVert \underline { { \hat { \Pi } } } \rVert \underline { { \hat { \Pi } } } \hat { \mathcal { W } } \rVert \hat { \mathcal { H } } \rVert \hat { \mathcal { H } } \rVert = \rVert \hat { \mathcal { H } } [ \mathcal { S } , \mathcal { \bar { U } } \underline { { \hat { \Pi } } } \hat { \mathcal { Z } } ] + \frac { \mathtt { i } \beta \delta \delta \delta \underline { { s } } } { 2 \pi } \rVert \underline { { \hat { \Pi } } } \hat { \mathcal { W } } \rVert \hat { \mathcal { H } } \rVert \hat { \mathcal { H } } \rVert + \frac { \rVert \underline { { \hat { \Pi } } } \hat { \mathcal { S } } \rVert \hat { \mathcal { H } } } { 2 \pi } \rVert \hat { \mathcal { H } } \rVert \hat { \mathcal { H } } \rVert + \frac { \mathtt { i } \beta \delta \underline { { s } } } { 2 \pi } \rVert \hat { \mathcal { H } } \hat { \mathcal { H } } \rVert \hat { \mathcal { H } } \rVert \hat { \mathcal { H } } \rVert + \frac { \mathtt { i } \beta \delta \underline { { s } } } { 2 \pi } \langle \underline { { \hat { \Pi } } } \hat { \mathcal { H } } \rangle + \frac { \delta \delta \delta \underline { { s } } } { \pi } \langle \underline { { \hat { \Pi } } } \rangle \rVert \hat { \mathcal { H } } \rVert \hat { \mathcal { H } } \rVert + \frac { \mathtt { i } \beta \delta \delta } { 2 \pi } \langle \underline { { \hat { \Pi } } } \hat { \mathcal { H } } \rangle \rVert \hat { \mathcal { H } } \rVert } \end{array}
$$

磁盘上的信息以扇区为单位进行读写，上式中后面三个时间之和称为存取时间 $\smash { \mathcal { T } _ { \odot } }$ 即：

$$
\sharp \sharp \sharp \sharp [ \sharp ] = \sharp \wedge \sharp | \sharp ] + | \sharp | \sharp | + | \sharp | \sharp | \lesssim \sharp \sharp \wedge \sharp | \sharp | \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert \lVert
$$

寻道时间为磁头移动到指定磁道所需时间；旋转等待时间指指定扇区旋转到磁头下方所需时间；数据传输时间（Transfer Time）指传输一个扇区的时间（大约0.01 ms /扇区）。由于磁头原有位置与要寻找的目的位置之间远近不一，故寻道时间和旋转等待时间只能取平均值。磁盘的平均寻道时间一般为5\~10ms，平均等待时间取磁盘旋转一周所需时间的一半，大约4\~6ms。假如磁盘转速为6000r/min，则平均等待时间约为5ms。因为数据传输时间相对于寻道时间和旋转等待时间来说非常短，所以，磁盘的平均存取时间通常近似等于平均寻道时间和平均等待时间之和。而且，磁盘第一位数据的读/写延时非常长，相当于平均存取时间，而以后各位数据的读/写则几乎没有延迟。

## 5.3.3 磁盘存储器的连接

现代计算机中，通常将复杂的磁盘物理扇区抽象成固定大小的逻辑块，物理扇区和逻辑块之间的映射由磁盘控制器来维护。磁盘控制器是主机与磁盘驱动器之间的接口，其中的内置固件能将CPU送来的请求逻辑块号转换为盘地址，并控制磁盘驱动器工作。

图5.13是磁盘驱动器（简称磁盘）通过磁盘控制器与CPU、主存连接的示意图。磁盘控制器连接在V0总线上，VO总线与其他系统总线（如处理器总线、存储器总线）之间用桥接器连接。

![](images/71bf4b51e4621f6c63aca060c0e955e88577a6d8213ded9cfc7cf025793351f2.jpg)  
图5.13 磁盘与CPU、主存的连接

磁盘与主机交换数据的最小单位是一个扇区，因此，磁盘总是按成批数据交换方式进行读/写，这种高速批数据交换设备通常采用直接存储器存取(Direct Memory Access，DMA)方式进行数据的输入输出。通过专门的DMA接口硬件控制外设与主存间的直接数据交换，数据不通过CPU。通常把专门用来控制总线进行DMA传送的接口硬件称为DMA控制器。有关DMA方式的实现参见6.3.2节。

## 5.3.4 闪速存储器和U盘

计算机中有一些相对固定的信息，需要存放在只读存储器（ROM）中，如系统启动时用到的 BIOS(Basic Input/Output System，基本输入输出系统)。早期的 BIOS 芯片通过烧录器写人，一旦安装在计算机主板中，便不能更改，除非更换芯片；而现在主板都用Flash存储器芯片来存储BIOS，可在计算机中运行主板厂商提供的擦写程序进行擦除，再重新写入。

早期使用烧录器写入方式的只读存储器有掩膜 ROM（Mask ROM，MROM)、可编程ROM(Programmable ROM，PROM)、可擦除可编程 ROM（Erasable Programmable ROM，

EPROM) 和电可擦除可编程 ROM（Electrically Erasable Programmable ROM，EEPROM）等类型。MROM在芯片生产过程中制造，生产后不可编程，故可靠性高，但生产周期长、不灵活；PROM只可编程一次，不灵活；EPROM可擦除可编程多次，但采用MOS工艺，且擦除时只能抹除所有信息，不灵活且速度慢；EEPROM可以字为单位擦除，擦除次数可达数千次，且数据可保持一二十年。

闪速存储器也称闪存或Flash存储器，是一种非易失性读/写存储器，兼有RAM和ROM的优点，且功耗低、集成度高，无需后备电源。这种器件沿用了EPROM的简单结构和浮栅/热电子注人的编程写入方式，又兼备EEPROM的可擦除特点，且可在计算机内进行擦除和编程写入，因此又称为快擦型EEPROM。目前广泛使用的U盘和存储卡等都属于闪存。

## 1. 闪存存储元

如图5.14所示是一个闪存存储元，每个存储元由单个MOS管组成，包括漏极D、源极

S、控制栅和浮空栅。当控制栅加上足够的正电压时，浮空栅将存储大量电子，即带有许多负电荷，可将存储元的这种状态定义为0；当控制栅不加正电压，则浮空栅少带或不带负电荷，将这种状态定义为1。

## 2. 闪存的基本操作

闪存有3种基本操作：编程（充电）、擦除（放电）、读取。

编程操作：最初所有存储元都是1状态，编程指在需要改写为0的存储元的控制栅加正电压 $U _ { p }$ ，如图5.15a所示。一旦某存储元被编程，则数据可保持上百年且无需外电源。

![](images/31024d0f7cd086a1a2e525faf10e894ed74e59e6dca18dead834570422c5e0f2.jpg)  
图 5.14 Flash 存储元

擦除操作：采用电擦除。在所有存储元的源极S加正

电压 $U _ { \mathrm { E } }$ ，吸收浮空栅中的电子，从而使所有存储元都变成1状态，如图5.15b所示。

因此，写入过程实际上是先通过放电擦除一个存储块，使其存储元都变成1状态，后再 对需要写0的存储元充电进行编程。

读取操作：在控制栅加上正电压 $U _ { \textrm { R } }$ ，若存储元为0，则读出电路检测不到电流，如图5.16a所示；若存储元为1，则浮空栅不带负电荷，控制栅上的正电压足以导通晶体管，电源 $U _ { \mathrm { d } }$ 提供从漏极D到源极S的电流，读出电路检测到电流，如图5.16b所示。

![](images/bd8ff25fa0d2b0777f0fc4a7dbe7e95731fa3a4f6709d3201028d0ed42f4b525.jpg)  
图 5.15 Flash 存储元的写人

![](images/fb56bd4ceb2ddad353f1840be5df34c1dc997a70efc35eeca88db7d3e98f5ed6.jpg)  
图 5.16 Flash 存储元的读出

从上述基本原理可看出，闪存读和写操作速度相差很大，其读取速度与半导体RAM芯片相当，而写数据（快擦-编程）的速度则比RAM芯片慢。

## 5.3.5 固态硬盘

近年来固态硬盘（Solid StateDisk，SSD）越来越流行，也称为电子硬盘。它并不是一种磁表面存储器，而是使用NAND闪存组成的外存，与U盘没有本质差别，只是容量更大存取性能更好。它用闪存颗粒代替了磁盘作为存储介质，以区块写人和擦除的方式进行数据的读取和写人。

固态硬盘的接口规范和定义、功能及使用方法与传统磁盘完全相同，在产品外形和尺寸上也与普通磁盘一致。接口标准有USB、SATA等，因此SSD可通过标准磁盘接口与IO总线互连，也有SDD使用PCI-e接口标准来提供更高的性能。在 SSD中有一个闪存翻译层，它将来自CPU的逻辑块读/写请求翻译成对底层SSD物理设备的读/写控制信号。因此，闪存翻译层的功能相当于磁盘控制器。

SSD中一个闪存芯片由若干区块（Block）组成，每个区块由若干页（Page）组成，通常，页大小为512B\~4KB，每个区块由32\~128页组成，因而区块大小为16\~512KB，数据按页为单位进行读/写。SSD有三个限制：①写某一页信息之前，必须先擦除该页所在的整个区块：②擦除后区块内的页必须按顺序写入信息：③擦除/编程次数有限、某一区块进行了几千到几万次重复写之后将发生磨损，擦除操作所残留的电子积累过多，将会使存储元永久处于1状态而无法编程，此时该存储元将失效，不能继续使用。因此，闪存翻译层中的软件实现了磨损均衡（WearLeveling）算法，试图将擦除操作平均分布在所有区块上，从而尽可能延长SSD的使用寿命。

SSD随机读取时间约为几十微秒，而随机写入时间约为几百微秒。磁盘的寻道和旋转等待属于机械操作。其访问时间约为几毫秒到几十毫秒，因此SSD随机读写延时比磁盘小两个数量级。除性能高外，固态硬盘还具有抗振动好、安全性高、无噪声、能耗低和发热量低的特点。此外，固态硬盘的工作温度范围很大（-40\~85℃），因此，其适应性也远高于常规磁盘。

## 5.4 高速缓冲存储器

由于CPU和主存所使用的半导体器件工艺不同，两者速度上的差距导致快速的CPU等待慢速的主存储器，为此需要想办法提高CPU访问主存的速度。除了提高DRAM芯片本身的速度和采用并行结构技术以外，加快CPU访存速度的主要方式之一是在CPU和主存之间增加高速缓冲存储器（简称高速缓存或cache）。

## 5.4.1 cache的基本工作原理

cache是一种小容量高速缓冲存储器，由快速的SRAM存储元组成，直接集成在CPU芯片内，速度几乎与CPU一样快。在CPU和主存之间加入cache，可以把程序频繁访问的活跃主存块复制到cache中。由于程序访问的局部性特点，大多数情况下，CPU能直接从

cache中取得指令和数据，而不必访问慢速的主存。

为便于cache和主存交换信息，一般将 cache和主存空间划分为大小相等的区域。主存中的区域称为块（Block），也称为主存块，它是cache和主存之间的信息交换单位；cache中存放一个主存块的区域称为行（Line）或槽（Slot)。

## 1. cache 的有效位

在系统启动或复位时，每个cache行都为空，其中的信息无效，只有装入了主存块后信息才有效。为了说明 cache行中的信息是否有效，每个cache行需要一个有效位（ValidBit)。有了有效位，就可通过将有效位清0来淘汰某cache行中的主存块，称为冲刷(Flush)，装人一个新主存块时，再将有效位置1。

## 2. CPU 在 cache 中的访问过程

CPU执行程序时需要从主存取指令或读/写数据，此时先检查cache中是否有要访问的信息。图5.17给出了带 cache的 CPU执行一次访存操作的过程。

![](images/24cd4fdeba4b11b956fc0475d0feedc303d9f2c6cae2feb6880c3773ac7a19d9.jpg)  
图 5.17 带 cache 的 CPU 的访存操作过程

如图5.17所示，整个访存过程如下：判断信息是否在 cache，若是，则直接从cache取信息；若否，则从主存取一个主存块到cache，如果对应cache行已满，则需要替换cache中的信息，因此，cache中的内容是主存中部分内容的副本。这些工作要求在一条指令执行过程中完成，因而只能由硬件实现，因此程序员无须了解cache结构及其处理过程即可编写出正确的程序。但为了编写出高效的程序，程序员也需要了解cache的工作原理和处理过程。

## 3. cache-主存层次的平均访问时间

根据图5.16 可知，在访存过程中需要判断所访问信息是否在 cache中。若CPU 访问单元所在的块在 cache 中，则称 cache 命中（Hit)，命中概率称为命中率 p(Hit Rate)，它等于命中次数与访问总次数之比；若不在cache中，则为不命中或缺失 $( \mathbb { M } { \mathrm { i s s } } ) ^ { \ominus }$ ，其概率称为缺失率（Miss Rate)，它等于不命中次数与访问总次数之比。命中时，CPU在 cache中直接存取信息，所用时间即为cache访问时间 $\boldsymbol { { \mathcal { T } } } _ { c }$ ，称为命中时间(Hit Time)；缺失时，需要从主存读取一个主存块送cache，并同时将所需信息送CPU，因此，所用时间为主存访问时间 $T _ { m }$ 和 cache 访问时间 $ { \boldsymbol { T } } _ {  { \varepsilon } }$ 之和。通常把 $T _ { m }$ 称为缺失损失（Miss Penalty）。

CPU 在 cache-主存层次的平均访问时间为 $T _ { \it { a } } = p \times T _ { \it { c } } + \left( \frac { 1 - p } { \it { \Omega } } \right) \times \left( T _ { \it { m } } + T _ { \it { c } } \right) = T _ { \it { c } } + \left( 1 - p \right) \times T _ { \it { m } } \circ$

由于程序访问的局部性特点，cache的命中率可以很高，接近于 $1 _ { \circ }$ 因此，虽然 $T _ { m } > >$ $\boldsymbol { { \mathcal { T } } } _ { c }$ ，但最终的平均访问时间仍可接近 $T _ { c } ,$

例5.2假定处理器时钟周期为2ns，某程序有3000条指令组成，每条指令执行一次，其中4条指令在取指令时发生 cache缺失，其余指令都在 cache中命中。在执行指令过程中，该程序需要1000次主存数据访问，其中6次发生cache缺失。问：

①执行该程序的 cache 命中率是多少？

②若 cache命中时间为1个时钟周期，缺失损失为10 个时钟周期，则 CPU在 cache-主存层次的平均访问时间为多少？

解：①执行该程序时的总访问次数为 $3 0 0 0 + 1 0 0 0 = 4 0 0 0$ ，未命中次数为 $4 + 6 = 1 0$ ，故cache命中率为(4000-10)/4000=99.75%。

② cache-主存层次的平均访问时间为 $1 + ( 1 - 9 9 . 7 5 \% ) \times 1 0 = 1 . 0 2 5$ 个时钟周期，即1.025$\times 2 ~ \mathrm { n s } = 2 . ~ 0 5 ~ \mathrm { n s }$ ，与 cache 访问时间相近。

## 5.4.2 cache 行和主存块之间的映射方式

cache行中的信息取自主存中的某块。在将主存块复制到cache行时，主存块和cache行之间必须遵循一定的映射规则，这样，CPU要访问某个主存单元时，可以依据映射规则，直接到 cache对应行中查找要访问的信息，而不用在整个 cache中查找。

根据不同的映射规则，主存块和cache行之间有以下三种映射方式。

●直接映射(Direct-Mapped)：每个主存块映射到 cache的固定行中。

全相联(Full Associate)：每个主存块映射到 cache 的任意行中。

组相联（Set Associate)：每个主存块映射到 cache 的固定组的任意行中。

以下分别介绍三种映射方式。

## 1. 直接映射

直接映射的基本思想是将一个主存块映射到固定的cache行中，也称模映射，其映射关系如下。

$$
\mathrm { c a c h e } \ \overbrace { 1 } \overleftrightarrow { \frac { 1 } { 2 } } = \pm \overleftrightarrow { 1 } \ \overleftrightarrow { 1 } \ \overleftrightarrow { 1 } \ \overleftrightarrow { 2 } \ \mathrm { m o d } \ \mathrm { c a c h e } \ \overbrace { 1 } \overleftrightarrow { \frac { 1 } { 2 } } \ \overleftrightarrow { 1 }
$$

例如，若 cache有16行，根据100 mod16=4可知，主存第100块映射到cache第4行。通常cache行数是2的幂，如图5.18所示，cache有2°行，主存有2块，以2°为模映射  
到 cache固定行中。由映射函数可看出，m位主存块号中低c位正好是它要装人的 cache行  
号，且主存块号低c位相同的主存块都会映射到同一个cache行。为了让 cache记录每行装

入了哪个主存块，需要给每行分配一个t位长的标记（tag），此处 $t = m - c$ ，主存某块调入cache后，则将其块号的高t 位填入对应 cache行的标记中。

![](images/f7675f1bd976038db3eed6c950f65da20a1c9ddc3b3b6e743536baee32a24ce8.jpg)  
图 5.18 cache 和主存间的直接映射关系

根据以上分析可知，主存地址被分成三个字段，其中，高位为标记，中间c位为cache行号（也称行索引），剩下的低位地址为块内地址。若一个主存块占 $2 ^ { b } \textup { B }$ ，则块内地址占b位。

图5.19给出了直接映射方式下CPU的访存过程。

![](images/761be506c421b29c346607775e47e39eb0db5f03073154e8ca2aa9534a13352e.jpg)  
图5.19 直接映射方式下 CPU 访存过程

如图5.19所示，CPU首先根据访存地址中间c位，直接找到对应的cache行，将该cache行中的标记与主存地址高t位比较，若相等并有效位为1，则访问cache命中，此时，根据主存地址中最低b位的块内地址，在该cache行中存取信息；若不相等或有效位为0，则缺失，此时，CPU从主存中读出该地址所在主存块，根据块内地址存取信息后，写人该cache行，将有效位置1，并将地址高t 位填入该cache行的标记中。因此，若该cache行中已经存放了其他主存块的数据，将会造成cache行的替换，新的主存块数据将覆盖原有数据。

访问cache行时，读操作比写操作简单。针对写操作，由于cache行中的信息是主存某块的副本，故需要考虑如何使cache行中的数据和主存中数据保持一致，具体在第5.4.4节中介绍。

例5.3 假定cache采用直接映射方式，主存块大小为64B，按字节编址。cache数据区大小为1KB，主存空间大小为 $2 5 6 \mathrm { K B _ { o } }$ 问：主存地址如何划分？要求用图表示主存块和cache行之间的映射关系，假定cache当前为空，说明 CPU 对主存单元 0240CH的访问过程。

解：cache数据区容量为 $1 ~ \mathrm { K B } = 2 ^ { 1 0 } ~ \mathrm { B } = 2 ^ { 4 }$ 行 $\times 6 4 8 /$ 行 $= 1 6$ 行 $\times 6 4 ~ \mathbb { B } /$ 行。因为主存每16块和cache的16行一一对应，所以可将主存每16块看成一个块群，因而，得到主存空间划分为 $2 5 6 \mathrm { K B } = 2 ^ { 1 8 } \mathrm { B } = 2 ^ { 1 2 }$ 块 $\times 6 4 8 / \sharp \sharp = 2 ^ { 8 }$ 块群 $\times 2 ^ { 4 }$ 块/块群 $\times 2 ^ { 6 }$ B/块。所以，主存地址位数为18，其中，标记位数为8，行号位数为4，块内地址位数为 $6 _ { \circ }$ 主存地址划分以及主存块和cache行的对应关系如图5.20所示。

![](images/5d30d0986e38799e80169b558ce263a1af0af22636f4dc7d6ffb131da3c03c9a.jpg)  
图5.20 直接映射方式下主存块和cache行对应关系

主存地址0240CH展开为二进制数为000010010000001100，主存地址划分如下。
<table><tr><td>00 0010 01</td><td>00 00</td><td>00 1100</td></tr></table>

根据主存地址划分可知：该地址所在主存块号为000010010000（第144块），是第9块群中的第0块，映射到的 cache行号为0000（第0行)。

假定cache为空，访问0240CH单元的过程如下：首先根据地址中间4位 cache行号

0000，找到cache第0行，因为cache当前为空，所以，每个cache行的有效位都为0，因此，不管第0行的标志是否等于00001001，都不命中。此时，将0240CH单元所在的主存第144块复制到cache第0行，并置有效位为1，置标记为00001001（表示信息取自主存第9块群)。

直接映射的优点是容易实现，命中时间短，但由于多个主存块会映射到同一个cache行，当访问集中在这些主存块时，就会引起频繁的调进调出，即使其他cache行都空闲，也无法充分利用。例如，对于例5.3，若主存第0块已经在cache第0行中，现在要将主存第16块调人cache，由于它们都只能映射到cache第0行，即使其他行空闲，也总有一个主存块不能调入cache。显然，直接映射方式不够灵活，无法充分利用cache空间，在某些访存模式下命中率较低。

## 2. 全相联映射

全相联的基本思想是主存块可装入任意cache行中。因此，全相联cache需比较所有cache行标记才能判断是否命中，同时，主存地址中无需cache行索引，只有标记和块内地址两个字段。全相联方式下，只要有空闲cache行，就不会发生冲突，因而块冲突概率低。

例5.4 假定cache采用全相联方式，主存块大小为64B，按字节编址。cache数据区大小为1KB，主存空间大小为256KB。问：主存地址如何划分？要求用图表示主存块和cache行之间的映射关系，并说明CPU对主存单元0240CH的访问过程。

解：cache数据区大小为 $1 ~ \mathrm { K B } = 2 ^ { 1 0 } ~ \mathrm { B } = 2 ^ { 4 }$ 行 $\times 6 4$ B/行=16行×64B/行。

主存地址空间为256KB=218B=212块 $\times 2 ^ { 6 }$ B/块。

18位的主存地址划分为两个字段：标记位数为12，块内地址位数为 $6 \phantom { . 0 }$

主存地址划分以及主存块和cache行之间的对应关系如图5.21所示。

![](images/5a5ecda3acfaf29550f2f96072a1e6807da2f9c44c38fcb1d1841216f5da60e3.jpg)  
图5.21 全相联映射方式下主存块和 cache行对应关系

主存地址0240CH展开成二进制数为000010010000001100，主存地址划分如下：
<table><tr><td>00 0010 0100 00</td><td>00 1100</td></tr></table>

访问0240CH单元的过程如下：首先将高12位标记00 0010 0100 00与每个cache行标记进行比较，若有一个相等且有效位为1，则命中，此时，CPU根据块内地址001100从该行中取出信息；若都不相等，则不命中，此时，需要将0240CH单元所在主存第000010010000块（即第144块）读出，并装入任意一个空闲cache行中，置有效位为1，置标记为000010010000（表示信息取自主存第144块）。

为判断是否命中，通常为每个cache行分别设置一个比较器，其位数等于标记字段的位数。全相联cache访存时根据标记字段的内容来查找cache行，因而是一种按内容访问方式，相应电路是一种相联存储器，其时间开销和所用元件开销都较大，因此全相联方式不适合容量较大的 cache。

## 3. 组相联映射

直接映射和全相联的优缺点正好相反，二者结合可以取长补短，从而形成组相联方式。

组相联的主要思想是，将cache所有行分成29个大小相等的组，每组有2°行。每个主存块映射到cache固定组中的任意一行，即采用组间模映射、组内全映射的方式，映射关系如下。

$$
\mathrm { c a c h e \ 4 H \frac { 5 } { 5 } = \pm 7 \frac { 2 } { 5 } \frac { 1 } { 5 } \frac { 1 } { 5 } \ \mathrm { m o d \ c a c h e \ } \frac { 4 } { 5 } \mathrm { k g } }
$$

例如，若1 KB的 cache 划分为 23组 $\times 2 ^ { 1 }$ 行/组×64B/行，则主存第100 块应映射到 cache第4组的任意一行中，因为 $1 0 0 \ \mathrm { m o d } \ 2 ^ { 3 } = 4 _ { \cdot }$

上述这种 $2 ^ { q }$ 组×2°行/组的 cache映射方式称为 2°路组相联，即s=1为2路组相联； $s = 2$ 为4路组相联：以此类推。通过对主存块号按cache组数取模，使得每 $2 ^ { q } \cdot$ 个主存块与 $2 ^ { q }$ 个cache组一一对应，主存地址空间实际上分成了若干组群，每个组群中有29个主存块对应于cache的2°个组。假设主存地址有n位，块内地址占b位，有2个组群，则 $n = t + q + b$ ，主存地址被划分为以下三个字段。

<table><tr><td>标记</td><td>cache 组号</td><td>块内地址</td></tr></table>

其中，高t位为标记，中间q位为组号（也称组索引)，剩下的b位为块内地址。

例5.5 假定cache采用2路组相联方式，主存块大小为64B，按字节编址。cache数据区大小为1KB，主存地址空间大小为256KB。问：主存地址如何划分？要求用图表示主存块和cache行之间的映射关系，并说明CPU对主存单元0240CH的访问过程。

解：cache数据区大小为 $1 ~ \mathrm { K B } = 2 ^ { \mathrm { { \scriptsize ~ 1 0 } } } ~ \mathrm { B } = 2 ^ { \mathrm { { \scriptsize ~ 3 } } }$ 组 $\times 2 ^ { \mathrm { i } }$ 行/组×64B/行。

主存地址空间大小为 $2 5 6 \mathrm { K B } = 2 ^ { 1 8 }$ 字 $= 2 ^ { 1 2 }$ 块 $\times 6 4 ~ \mathbb { B } /$ 块 $= 2 ^ { 9 }$ 组群 $\times 2 ^ { 3 }$ 块/组群 $\times 2 ^ { 6 }$ B/块。

因此，主存地址位数为18，其中，标记位数为9，组号位数为3，块内地址位数为 $6 ,$

主存地址划分以及主存块和cache行的对应关系如图5.22所示。

主存地址0240CH展开为二进制数000010010000001100，主存地址划分如下：

<table><tr><td>00 0010 010</td><td>0 00</td><td>00 1100</td></tr></table>

访问 0240CH 单元的过程如下：首先根据地址中间3位 cache组号 000，找到 cache第0组，将标记000010010与第0组中两个cache行的标记进行比较，若有一个相等且有效位为1，则命中。此时，根据低6位块内地址从对应行中取出单元内容送CPU；若都不相等或有一个相等但有效位为0，则不命中。此时，将0240CH单元所在的主存第000010010000块（即第144块）复制到cache第0组的任意一个空行中，并置有效位为1，置标记为000010010（表示信息取自主存第18组群）。

![](images/6bdd664bd3f3753335c64eeae9ce5bd3db6b492649b96c204ec92124296e2f88.jpg)  
图 5.22 组相联映射方式下主存块和 cache行对应关系

组相联方式结合了直接映射和全相联的优点。当cache组数为1时，变为全相联方式：当每组只有一个cache行时，则变为直接映射。组相联的冲突概率比直接映射低，由于只有组内各行采用全相联映射，所以比较器的位数和个数都比全相联少，易于实现，查找速度也快得多。

## 5.4.3 cache 中主存块的替换算法

cache行数比主存块数少得多，因此，往往多个主存块会映射到同一个cache行中。当新的一个主存块复制到cache时，cache中的对应行可能已经全部被占满，此时，必须选择淘汰掉一个cache行中的主存块。例如，对于例5.5中的2路组相联cache，假定第0组的两个行分别被第0和第8主存块占满，此时若需调入主存块16，根据映射关系，它只能装入cache第0组，因此，已经在第0组的第0和第8主存块中，必须选择淘汰一块。具体如何选择称为淘汰策略问题，也称替换算法或替换策略。

常用的替换算法有先进先出（First In First Out，FIFO)、最近最少用（Least RecentlyUsed，LRU)、最不经常用（Least Frequently Used，LFU）和随机替换算法等。可以根据实现的难易程度以及是否能获得较高的命中率两方面来决定采用哪种算法。

先进先出算法的基本思想是：总是选择最早装入cache的主存块被替换掉。这种算法实现起来较方便，但不能正确反映程序的访问局部性，因为最先进入的主存块也可能是目前经常要用的，因此，这种算法有可能产生较大的缺失率。

最近最少用算法的基本思想是：总是选择近期最少使用的主存块被替换掉。这种算法能比较正确地反映程序的访问局部性，因为当前最少使用的块一般来说也是将来最少被访问的。但是，它的实现比FIFO算法要复杂一些。LRU算法用计数值来记录主存块的使用情况，通过硬件修改计数值，并根据计数值选择淘汰某个cache行中的主存块。这个计数值称为LRU位，其位数与cache组的大小有关，2路时占1位，4路时占2位，8路时占3位。为降低LRU位计数器的硬件实现成本，通常采用伪LRU（Pseudo-LRU，PLRU）算法。伪LRU算法的思想是，仅记录cache组内每个主存块的近似使用情况，以区分哪些是新装入的主存块，哪些是较长时间未用的主存块，替换时在那些较长时间未用的主存块中选择一个换出。

最不经常用算法的基本思想是：替换掉cache中引用次数最少的块。LFU也用与每个行相关的计数器来实现。这种算法与LRU有点类似，但不完全相同。

随机替换算法从候选行的主存块中随机选取一个淘汰掉，与使用情况无关。模拟试验表明，随机替换算法在性能上只稍逊于基于使用情况的算法，而且代价低。

## 5.4.4 cache 的写策略

因为cache中的内容是主存块副本，当更新cache中的内容时，就要考虑何时更新主存中的相应内容，使两者保持一致，这称为写策略（WritePolicy）问题。写策略有以下两种。

## 1. 通写法

通写法（WriteThrough）也称全写法、直写法或写直达法，其基本做法是，若写命中，则同时写cache和主存，以保持两者一致；若写缺失，则先写主存，并有以下两种处理方式。

1）写分配法（Write Allocate)。分配一个cache行并装入更新后的主存块。这种方式可以充分利用空间局部性，但每次写缺失时都要装入主存块，因此增加了写缺失的处理开销。

2) 非写分配法(Not Write Allocate)。不将主存块装入 cache。这种方式可以减少写缺失的处理时间，但没有充分利用空间局部性。

显然，采用通写法能充分保证cache和主存内容一致。但是，这种方法会大大增加写操作的开销。例如，假定一次写主存需要100个CPU时钟周期，那么10%的存数指令就使得CPI增加100×10%=10个时钟周期。

为了减少写主存的开销，通常在 cache和主存之间加一个写缓冲(Write Buffer)。在CPU写cache的同时，也将内容写入写缓冲，此时CPU可继续工作，不必等待内容真正写入主存，而是由写缓冲将其内容写入主存。写缓冲是一个FIFO队列，一般有4项，在写操作频率不高的情况下效果较好；若写操作频繁，则会使写缓冲饱和而阻塞，此时CPU需要等待。

## 2. 回写法

回写法（WriteBack）也称一次性写、写回法，其基本做法是，若写命中，则只将内容写入cache而不写人主存；若写缺失，则分配一个cache行并装人主存块，然后更新该行的内容。因此，回写法通常与写分配法组合使用。

CPU执行写操作时，回写法不会更新主存单元，只有在替换cache行中的主存块时，才将该块内容一次性写回主存。回写法的好处是减少了写主存的次数，因而可大大降低主存带宽需求。此外，若cache行的主存块未被写过，替换时则无须将其写回主存。为记录该信息，每个 cache行会关联一个修改位(Dirty Bit，也称脏位)。向 cache行装人新主存块时，将该位清0；CPU写入cache行时，还需要将该位置1。替换cache行时检查其修改位，若为1，则需要将该主存块写回主存；若为0，则无须写回主存。

由于回写法未及时将内容写回主存，此时，若系统中的其他模块（如外设、其他CPU等）访问该主存块，则将读出过时的内容，进而影响程序的正确性，通常需要其他同步机制来解决该问题。

## 5.4.5 cache 和程序性能

早期采用的是CPU芯片外的单级cache，而目前多级片内cache 已成为主流，cache都在CPU 芯片内，且使用 L1(Level 1） 和 L2（Level 2） 等多级 cache，甚至有 L3 cache，CPU访问 cache 的顺序为 L1、L2 和 L3 cache。L1 cache 采用分离 cache，即数据 cache 和指令cache 分开设置，分别存放数据和指令。L2 cache 和 L3 cache 为联合 cache，即数据和指令放在一个 cache 中。

显然，程序的性能与程序执行时访问指令和数据所用的时间有很大关系，而指令和数据的访问时间与相应的cache命中率、命中时间和缺失损失有关。对于给定的计算机系统而言，命中时间和缺失损失是确定的，因此，指令和数据的访存时间主要由cache命中率决定，而cache命中率则主要由程序的空间局部性和时间局部性决定。因此，为了提高程序的性能，程序员须编写出具有良好访问局部性的程序。

考虑程序的访问局部性通常是在数据的访问局部性上下工夫。而数据的访问局部性又主要是指数组、结构等类型数据访问时的局部性。这些数据结构的数据元素访问通常是通过循环语句进行的，所以，如何合理地处理循环，特别是内循环，对于数据访问局部性来说非常重要。下面通过几个例子来说明不同的循环处理将带来不同的程序性能。

例5.6 某计算机的主存空间大小为256 MB，按字节编址。指令cache 和数据 cache分离，两种 cache 均有8个 cache行，主存与 cache交换的块大小为64 B，数据 cache采用2路组相联、通写法和LRU替换算法。现有两个功能相同的程序A和B，其伪代码如图5.23所示。

![](images/d10b2ff6f6cdb9f1f49f1bfb517d6c2b3735ed5b2a8f4be8fbfa9e47b8d1dde5.jpg)  
图 5.23 例 5.6 中的伪代码程序

假定i、j、sum均分配在寄存器中，数组a按行优先方式存放，其首地址为320（十进

制数)。请回答下列问题，要求说明理由或给出计算过程。

①数据cache的总容量（包括标记和有效位等）为多少？

②数组元素 a[0][30]和 a[1][16]各自所在主存块对应的 cache 组号分别是多少（组号从0开始)？

③程序A和B的数据访问命中率各是多少？哪个程序的执行时间更短？

解：①每个cache行除用于存放主存块外，还有有效位、标记以及修改位和使用位（如LRU位）等控制位。主存空间大小为256MB，按字节编址，故主存地址占28位；主存块大小为64B，故块内地址占6位；数据cache共8行，每组两行，故有8/2=4组，cache组号（组索引）为2位。因此，标志占 $2 8 - 6 - 2 = 2 0$ 位。通写法无须修改位，2路组相联LRU 位占1位，故数据 cache的总容量为 ${ 8 \times ( 2 0 + 1 + 6 4 \times 8 + 1 ) = 4 2 7 2 \ / | \vec { \mathcal { x } } | = 5 3 4 8 } ,$ 2

②对于某个数组元素所在主存块对应的cache行号的计算方法有以下两种。

方法一：先计算该数组元素的地址，然后根据地址求出主存块号，用主存块号除以组数4再取余数。每个数组元素占4B，a[0][30]的地址为 $3 2 0 + 4 \times 3 0 = 4 4 0$ ，对应主存块号为$\lfloor 4 4 0 / 6 4 \rfloor = 6$ (取整)，故 cache组号为 $6 { \mathrm { ~ m o d ~ } } 4 = 2$ 0

方法二：将地址转换为28位二进制数，然后取出组号（即组索引）字段的值，得到对应 cache组号。地址440转换为二进制表示为0000 0000 0000 0000 0001 1011 1000，按①中给出的主存地址划分结果0000 0000 0000 0000 000110111000可知，cache组号（组索引）为10，即对应 cache组号为2。

同理，数组元素 a[1][16]对应的 cache 组号为 $[ { \ : ( 3 2 0 + 4 \times ( 1 \times 2 5 6 + 1 6 ) ) } / { \ : 6 4 } ] \ : \bmod { \ : 4 } = 2 _ { \circ }$

数组元素 a[1][16]的地址为 $3 2 0 + 4 \times { \left( 1 \times 2 5 6 + 1 6 \right) } = 2 ^ { 8 } + 2 ^ { 6 } + 2 ^ { 1 0 } + 2 ^ { 6 } = 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0$ 0101 1000 0000B，按①中给出的主存地址划分结果0000 0000 0000 0000 0101 10 000000 可知，cache组号（组索引）为10，即对应 cache组号为2。

③编译时i,i， sum均分配在寄存器中，故数据访问命中率仅需要考虑数组a的访问情况。

程序A中数组访问顺序与存放顺序相同，故依次访问的数组元素位于相邻单元；程序共访间256×256次=64K次，占64K×4B/64B=4K个主存块；因为首地址 $3 2 0 / 6 4 = 5 $ ，正好位于一个主存块的起始位置，故每次将一个主存块装入cache时，总是第一个数组元素缺失，其他都命中，共缺失4K次，因此，数据访问的命中率为 $( 6 4 \mathrm { K } - 4 \mathrm { K } ) / 6 4 \mathrm { K } = 9 3 . 7 5 \%$ 。也可以按以下思路考虑：因为每个主存块的命中情况都一样，因此，可按每个主存块的命中率计算。主存块大小为64B，包含有16个数组元素，共访存16次，其中第一次不命中，以后15次全命中，因而命中率为 $1 5 / 1 6 = 9 3 . 7 5 \%$

程序B中的数组访问顺序与存放顺序不同，每次内循环总是访问第列的256个数组元素，依次访问的两个数组元素分布在相隔 $2 5 6 \times 4 = 1 0 2 4$ 的单元处，即a[i][j]和a[i+1][j]之间的存储地址相差1024B，即16块，因为 $1 6 { \mathrm { ~ m o d ~ } } 4 = 0$ ，因此，它们映射到同一个cache组，即第i列的256次内循环所访问的所有数组元素所在主存块（共256个主存块）都映射到同一个cache组，而每个cache组仅有两个cache行，因此共替换了 $2 5 6 / 2 = 1 2 8$ 次，每次总是后面访问的两个主存块依次替换掉前面的两个主存块，使得每次都不能命中，命中率为0。

因为程序A比程序B的命中率高，因此，程序A的执行时间比程序B的执行时间短。

例5.7 通过对方格中每个点设置相应的CMYK值就可以将方格涂上相应的颜色。图5.24中的三个程序段都可实现对一个8×8的方格中涂上黄颜色的功能。

![](images/bb46e5ddbdf0a18068986797d34c07937df0cf3ea89508391d4bc863b280d6e9.jpg)  
图 5.24 例 5.7 中的伪代码程序

假设cache数据区大小为512B，采用直接映射方式，块大小为32B，按字节编址，sizeof(int)= 4。编译时变量i 和j分配在寄存器中，数组 sq按行优先方式存放在0000 0C80H开始的连续区域中，主存地址为32位。要求：

①对三个程序段A、B、C中数组访问的时间局部性和空间局部性进行分析比较。

②画出主存中的数组元素和cache行的对应关系图。

③计算三个程序段A、B、C中数组访问的写操作次数、写不命中次数和写缺失率。

解：①程序段A、B和C中，都是每个数组元素只被访问一次，所以都没有时间局部性；程序段A中数组元素的访问顺序和存放顺序一致，所以空间局部性好；程序段B中数组元素的访问顺序和存放顺序不一致，所以空间局部性不好；程序段C中数组元素的访问顺序和存放顺序部分一致，所以空间局部性的优劣介于程序A和B之间。

②cache 行数为 512 B/32 B=16；数组首地址为 0000 0C80H，因为 0000 0C80H 正好是主存第1100100B（100）块的起始地址，所以数组从主存第100块开始存放，一个数组元素占4×4B=16B，所以每2个数组元素占一个主存块。8×8的数组共占32个主存块，正好是 cache 数据区大小的 2倍。因为100 mod 16=4，所以主存第100 块映射的 cache 行号为4。主存中的数组元素与 cache行的映射关系如图5.25所示。

③对于程序段A：每两个数组元素（共涉及8次写操作）装入一个cache行，总是第一次未命中，后面7次都命中，因而写缺失率为1/8=12.5%。

对于程序段B：每两个数组元素（共涉及8次写操作）装入一个cache行，总是只有一个数组元素（涉及4次写操作）在淘汰之前被访问，并且总是第一次不命中，后面3次命

![](images/2c7d00081fa532979b692c8fb553af08fcc1bec86776ce938cf62a8cca5f4f0c.jpg)  
图 5.25 主存中数组元素与 cache行的映射关系

中，因而写缺失率为 $1 / 4 = 2 5 \%$ o

对于程序段C：第一个循环共访问64次，每次装入两个数组元素，第一次不命中，第二次命中：第二个循环共访问64×3次，每两个数组元素（共涉及6次写操作）装入一个cache行，并且总是第一次不命中，后面5次命中。所以总的写缺失次数为 $3 2 + ( 3 { \times } 6 4 ) { \times } 1 / 6 =$ 64. 因而总写缺失率为 $6 4 / ( 6 4 \times 4 ) = 2 5 \%$ o

## 5.5 虚拟存储器

由于技术和成本等原因，早期计算机的主存容量受限，而设计程序时人们不希望受特定计算机物理内存大小的制约，因此提出了虚拟存储器技术。此外，现代操作系统都支持多任务，如何让多个程序有效而安全地共享主存是虚拟存储器技术需要解决的另一个问题。

## 5.5.1 虚拟存储器的基本概念

在不采用虚拟存储机制的计算机系统中，CPU执行指令时，取指令和存取操作数所用的地址都是主存的物理地址，无须进行地址转换，因而计算机硬件结构比较简单，指令执行速度较快。实时性要求较高的嵌人式微控制器大多不采用虚拟存储机制。

目前，在服务器、台式机和笔记本等各类通用计算机系统中都采用虚拟存储器技术。在采用虚拟存储技术的计算机中执行指令时，CPU通过存储管理部件（Memory ManagementUnit，MMU）将指令中的逻辑地址（也称虚拟地址或虚地址，简写为VA）转换为主存的物理地址（也称主存地址或实地址，简写为PA）。

在地址转换过程中，MMU还会检查访问信息是否在主存、地址是否越界或访问越权等情况。若发现信息不在主存，则通知操作系统将数据从外存读到主存。若地址越界或访问越权，则通知操作系统进行相应的异常处理。由此可见，虚拟存储技术既解决了编程空间受限的问题，又解决了多个程序共享主存带来的安全等问题。

图5.26是具有虚拟存储器机制的CPU与主存的连接示意图，如图所示，CPU执行指令时给出的是指令或操作数的虚拟地址，需要通过MMU转换为主存的物理地址才能访问主存，MMU包含在CPU芯片中。图中显示MMU将一个虚拟地址5600转换为物理地址4，从而将第4、5、6、7这4个主存单元组成4B数据送到CPU。该图仅是简单示意图，并未考虑 cache 访问等情况。

![](images/daa8be5f759c331c5c48d587edf30c141c16a3b792344bb09967fe35b4ee0959.jpg)  
图5.26 具有虚拟存储器机制的 CPU和主存的连接

虚拟存储器机制由硬件与操作系统共同协作实现，涉及计算机系统许多层面，包括操作系统中的进程、存储器管理、虚拟地址空间、缺页处理等。

## 5.5.2 虚拟地址空间

4.2.4节中提到，进程的虚拟地址空间划分由ABI规范规定，因此，在对若干个可重定位目标文件进行链接生成可执行目标文件时，链接器会根据ABI规范，把合并生成的可执行文件中的只读代码段和可读/写数据段映射到一个统一的虚拟地址空间（参见图4.8)。所谓“统一”是指不同的可执行文件所映射的虚拟地址空间大小一样，地址空间中的区域划分结构也相同。

4.4.2节介绍了Linux系统如何在加载可执行文件时，通过ELF文件程序头表生成进程描述符（task\_struct结构）中关于进程虚拟地址空间的描述。

图5.27给出了在IA-32+Linux系统中一个进程（如hello程序对应的进程）的虚拟地址空间映像。虚拟地址空间分为两大部分：操作系统内核区和用户虚拟存储空间，分别简称为内核空间（Kernel Space） 和用户空间（User Space）。

内核空间在0xc0000000以上的高端地址上，映射到操作系统内核代码和数据、物理存储区，包括与每个进程相关的系统级上下文数据结构（如进程标识信息、进程现场信息、页表等进程控制信息以及内核栈等）。内核空间大小在每个进程的地址空间中都相同，用户程序无权限访问。

用户空间映射到用户进程的代码、数据、堆和栈等用户级上下文信息，分为以下几个

![](images/7b82686ae2b12771c6874d85e25193dea7d4f8ddb2a8c9e07027b2171f89721b.jpg)  
图 5.27 IA-32+Linux 虚拟地址空间映像

区域。

1）用户栈（UserStack）。对应程序运行时过程调用的参数、返回地址、过程局部变量等所在空间，随着程序的执行，该区会不断动态地从高地址向低地址增长或向反方向减退(参见第3章相关内容)。

2） 共享库（Shared Libraries)。用来存放共享函数库代码，如 hello 程序中的 printf()函数等标准库函数代码。

3）堆（Heap)。用于动态申请存储区，如C语言中用malloc(）函数分配的存储区，或C++中用new操作符分配的存储区。申请一块内存时，动态地从低地址向高地址增长，可用free()函数或delete操作符释放相应的一块内存区。

4）可读/写数据区。对应进程中的静态全局变量，堆区从该区域的结尾处开始向高地址增长。

5）只读数据和代码区。对应进程中的代码和只读数据，如hello进程中的程序代码和字符串“hello，world\n”。

每个区域都有相应的起始位置，堆区和栈区相向生长，栈区从内核起始位置0xc0000000开始向低地址增长，栈区和堆区合起来称为堆栈，其中的共享库代码区从0x40000000开始向高地址增长。只读代码区（代码和只读数据）从0x08048000开始向高地址增长。

为了方便对存储空间的管理和存储保护，在确定存储映像时，通常将内核空间和用户空间分在两端。在用户空间中又把动态区域和静态区域分在两端。动态区域中把过程调用时的动态局部信息（栈区）和动态分配的存储区（堆区）分在两端，静态区中把可读/写数据区和只读代码区分开。这样的存储映像，便于对每个区域设置相应的访问权限，有利于存储保护和存储管理。

虚拟存储管理机制为程序提供了一个极大的虚拟地址空间（也称逻辑地址空间），它是主存和硬盘存储器的抽象。虚存机制带来了一个假象，使得每个进程好像都独占使用主存，并且主存空间极大。这带来三个好处：①每个进程具有一致的虚拟地址空间，从而可以简化存储管理，简化链接器的设计和实现，也简化了程序的加载过程；②把主存看成是硬盘存储器的一个缓存，在主存中仅保存当前活动的程序段和数据区，并根据需要在硬盘和主存之间进行信息交换，通过这种方式，使有限的主存空间得到了有效利用：③每个进程的虚拟地址空间是私有的、独立的，因此，可以保护各自进程不被其他进程破坏。

## 5.5.3 虚拟存储器的实现

虚拟存储器分成三种不同类型：段式、页式和段页式。

## 1. 段式虚拟存储器

根据程序的模块化特性，可按程序的逻辑结构将其划分成多个相对独立的部分，这些相对独立的部分称为段（Segment)。分段方式下，将主存空间按实际程序中的段来划分，并通过段表中的段表项记录每个段在主存中的基址、段长、访问权限、使用和装入情况等。每个进程有一个段表，指令给出的虚拟地址即为段内偏移，可将其加上对应段的基址得到实际访问的主存物理地址。

段式虚拟存储器实现机制较简单，硬件实现成本低，适合简单的嵌人式系统和实时系统。由于段的粒度较大，不易管理，且易产生主存碎片，因此现代操作系统通常不使用段式虚拟存储管理方式。

## 2. 页式虚拟存储器

现代操作系统主要采用页式虚拟存储管理方式。在页式虚拟存储系统中，虚拟地址空间被划分成大小相等的页，外存和主存之间按页（Page）为单位交换信息。虚拟地址空间中的页称为虚拟页、逻辑页或虚页，简称VP(Virtual Page)；主存空间也被划分成同样大小的页框（页帧），也称为物理页或实页，简称 PF（Page Frame）或 PP（Physical Page)。在虚拟存储系统中，生成可执行文件时会通过可执行文件中的程序头表，将可执行文件中具有相同访问属性的代码和数据段映射到虚拟地址空间中。分页方式下，虚拟地址空间中每个区域的长度应为页大小的整数倍，而可执行文件中的只读代码区和可读写数据区长度并非正好是页大小的整数倍，因而，剩余部分将补足0，以使其正好占用一个主存页框。

如图5.28所示，每个进程都有各自独立的虚拟地址空间，以可执行文件的方式存在硬盘中。假定某一时刻用户程序1和用户程序k都已加载到系统中运行，那么，在这一时刻主存中就会同时有这些用户程序对应的进程代码和相应的数据。CPU在执行某进程中的指令时，只知道所访问的指令和数据在虚拟地址空间中的地址，CPU如何知道到主存哪个单元去取指令或访问数据呢？可执行文件中的指令代码和数据都在硬盘中，如何建立硬盘物理空间中的代码和数据与主存物理空间之间的关联呢？

页式虚拟存储管理采用请求分页思想，仅将当前需要的页从外存调人主存，而其他不活跃的页保留在外存。当访问信息所在页不在主存时，CPU抛出缺页异常，此时操作系统从外存将缺失页装入主存。

虚拟地址空间中有一些没有内容的“空洞”。如图5.27所示，堆和栈动态生长，因而在栈和共享库区域之间、堆和共享库区域之间均无内容，这些没有和任何内容关联的页称为未分配页；对于代码和数据等有内容的区域所关联的页，称为已分配页。已分配页中又有两类：已调入主存而被缓存在DRAM中的页称为缓存页：未调人主存而存在外存的页称为未缓存页。因此，任何时刻一个进程中所有页都被划分成三个不相交的页集合：未分配页、缓存页和未缓存页。

![](images/18445f14186e5b37f4a38e7633ba525a71936f4d5203f08f32706b10dc77aa8c.jpg)  
图5.28 页式虚拟存储管理

虚拟存储机制采用全相联映射，每个虚拟页可以存放到主存任何一个空闲页框中。因此，与cache一样，必须要有一种方法来建立各虚拟页与所存放的主存页框或硬盘上存储位置之间的关系，通常用页表（PageTable）来描述这种对应关系。

## (1) 页表

进程中每个虚拟页在页表中都有一个对应表项，称为页表项。如图5.29所示，页表项内容包括该虚拟页的存放位置、装入位（Valid）、修改位（Dirty）、使用位、访问权限位和禁止缓存位等。

页表项中的存放位置用来建立虚拟页和物理页框之间的映射，用于进行虚拟地址到物理地址的转换；装入位也称为有效位或存在位，用来表示对应页面是否在主存，若为1，表示已调人主存，是一个缓存页，此时，存放位置字段中记录主存物理页号（即页框号或实页号)；若为0，则表示未调人主存，此时，若存放位置字段为null，则说明是一个未分配页，否则是一个未缓存页，其存放位置字段给出该页在外存的起始地址；修改位（脏位）用来说明对应页是否被修改过，虚存机制中采用回写策略，利用修改位可判断替换时是否需写回外存；使用位用来说明页的使用情况，配合替换策略设置，也称替换控制位，如是否最先调人（FIFO位），是否最近最少用（LRU位）等：访问权限位用来说明对应页是可读可写、只读还是只可执行等，用于存储保护；禁止缓存位用来说明对应页是否可装人cache，通常与存储器映射I/0编址方式配合使用。存储器映射I/0编址方式参见6.4.4节。

图5.29给出了一个页表的示例，其中，有4个缓存页：VP1、VP2、VP5和VP7。两个未分配页：VPO和VP4。两个未缓存页：VP3和VP6。

对于图5.29所示页表，假如CPU执行一条指令要求访问某个数据，若该数据正好在虚拟页VP1中，则根据页表得知，VP1对应的装入位为1，该页的信息存放在物理页PP0中，因此，可通过地址转换部件将虚拟地址转换为物理地址，然后到PPO中访问该数据；若该数据在VP6中，则根据页表得知，VP6对应的装入位为0，表示页缺失，发生缺页异常，需要调出操作系统的缺页异常处理程序进行处理。缺页异常处理程序根据页表中VP6对应表项的存放位置字段，从外存中将所缺失的页读出，然后找一个空闲的物理页框存放该页信息。若主存中没有空闲的页框，则还要选择一个页从某页框淘汰到外存中，再将缺失页从外存读入该页框中。因为采用回写策略，所以在进行页替换时，需根据修改位确定是否要将所淘汰的页写回外存。缺页处理过程中需要对页表进行相应的更新，缺页异常处理结束后，程序回到原来发生缺页的指令继续执行。

![](images/abc3181115af6b9e914256ac73f23531457cc7805bbd19b5e282f2f57df0dd22.jpg)  
图5.29 主存中的页表示例

对于图5.29所示页表，虚拟页VP0和VP4是未分配页，随着进程的动态执行，可能会使这些未分配页中有了具体的数据。例如，调用malloc函数会使堆区增长，若新增的堆区正好与VP4对应，则操作系统内核就在外存分配一个存储空间给VP4，用于存放新增堆区中的内容，同时，对应VP4的页表项中的存放位置字段被填上该外存起始地址，VP4从未分配页转变为未缓存页。

系统中每个进程都有个页表，如图5.28所示，页表1为进程1对应的页表，页表k为进程对应的页表。操作系统在加载程序时，根据可执行文件中的程序头表，确定每个可分配段（如只读代码段、可读/写数据段）所在的虚页号及其在外存中的存放位置，在主存生成一个初始页表，初始页表中对应的装人位都是 $0 _ { \circ }$ 在程序执行过程中，通过缺页异常处理程序，将存储在外存的代码或数据所在页装入分配的主存页框中，并修改相应页表项，如将存放位置改为主存页框号，将装入位设置为1。

在主存和cache之间的交换单位为主存块，在外存和主存之间的交换单位为一个页。与主存块大小相比，页大小要大得多。考虑到缺页代价的巨大和磁盘访问第一个数据的开销，通常将主存和磁盘之间交换的页的大小设定得比较大，典型的有4KB和8KB等，而且有越来越大的趋势。

页表属于进程控制信息，位于虚拟地址空间的内核空间，页表在主存的首地址记录在页表基址寄存器中。页表的项数由虚拟地址空间大小决定，前面提到，虚拟地址空间是一个用户编程不受其限制的足够大的地址空间。因此，页表项数会很多，因而会带来页表过大的问题。例如，在IA-32系统中，虚拟地址为32位，页大小为4KB，因此，一个进程有232/212$= 2 ^ { 2 0 }$ 页，也即每个进程的页表可达220个页表项。若每个页表项占32位，则一个页表的大小为4MB。显然，这么大的页表全部放在主存中是不适合的。

解决页表过大的方法有很多，可以采用限制大小的一级页表，或者两级页表或多级页表方式，也可以采用哈希方式的倒置页表等方案。如何实现页表是指令集体系结构设计时需要考虑的问题。

## (2) 地址转换

对于采用虚存机制的系统，指令中给出的地址是虚拟地址，因此，CPU执行指令时，首先要将虚拟地址转换为主存物理地址，才能到主存取指令和数据。地址转换（AddressTranslation）工作由CPU中的存储器管理部件（MMU）完成。

虚拟地址分两个字段：高位字段为虚拟页号（即虚页号或逻辑页号），低位字段为页内偏移地址（简称页内地址）。主存物理地址也分两个字段：高位字段为物理页号，低位字段为页内偏移地址。由于虚拟页和物理页大小一样，所以两者的页内偏移地址相等。

分页式虚存方式下，地址转换过程如图5.30所示。首先根据页表基址寄存器的内容，

找到主存中对应的页表起始位置，然后将虚拟页号作为索引，找到对应页表项，若装入位为1.则取出物理页号和虚拟地址中的页内地址拼接，形成访间主存时实际的物理地址；若装入位为0，则说明缺页，需要操作系统进行缺页处理。

## (3) 快表

从地址转换过程可看出，访存时首先要到主存查页表，然后才能根据转换得到的物理地址再访问主存。如果缺页，则还要进行页面替换、页表修改等，访问主存的次数就更多。显然，采用虚拟存储器机

![](images/b857d9683355d9da96eceb574f4d6cc2766e07980c314a04d4a4ea58969efed4.jpg)  
图5.30 分页式虚存的地址转换

制后，CPU执行一条指令的访存次数反而增加了。为了减少访存次数，通常利用程序访问的局部性特性，将页表中最活跃的几个页表项复制到高速缓存中，这种在高速缓存中的页表项组成的页表称为转换后备缓冲器（Translation Lookaside Buffer，TLB）或快表，相应地称主存中的页表为慢表。

这样，MMU进行地址转换时，首先查询快表，若命中，则直接取出快表中的页表项进行地址转换；若缺失，则访问主存中的慢表。因此，快表是加速地址转换的有效方法。

快表比页表小得多，为提高命中率。快表通常具有较高的关联度，大多采用全相联或组相联方式。每个表项的内容由页表项内容加上一个TLB标记字段组成，TLB标记字段用来表示该表项取自页表中哪个虚拟页对应的页表项，因此。TLB标记字段的内容在全相联方式下就是该页表项对应的虚拟页号；组相联方式下则是对应虚拟页号的高位部分，而虚拟页号的低位部分作为TLB组索引用于选择TLB组。

图 5.31 是一个具有 TLB 和 cache 的多级层次化存储系统示意图，图中TLB 和 cache 都采用组相联映射方式。

![](images/8664eb07e9f0dd5c98169944665637857046ab6f995f2cfbe4f96a607b1aabc7.jpg)  
图 5.31 TLB 和 cache 的访问过程

在图5.31中，指令给出一个32位虚拟地址，首先，由CPU中的MMU进行虚拟地址到物理地址的转换；然后，根据物理地址访问cache。

MMU对TLB查表时，20位的虚拟页号被分成标记（Tag）和组索引两部分，首先由组索引确定在TLB的哪一组查找。查找时将虚拟页号的标记部分与TLB中该组每个标记字段同时进行比较，若有某个相等且对应有效位V为1，则TLB命中，此时，可直接通过TLB进行地址转换；否则TLB缺失，此时，需要访问主存中的慢表。图5.30所示是两级页表方式，虚拟页号被分成页目录索引和页表索引两部分，根据这两部分可得到对应的页表项，从而进行地址转换，并将对应页表项的内容装入TLB形成一个新TLB表项，同时，将虚拟页号的高位部分作为TLB标记填入新TLB表项中。若TLB已满，还要进行TLB替换，为降低替换算法开销，TLB常采用随机替换策略。

在MMU完成地址转换后，cache根据映射方式将转换得到的物理地址划分成多个字段，根据 cache索引，找到对应的 cache行或 cache组，将对应各 cache行中的标记与物理地址中高位地址进行比较，若相等且对应有效位为1，则cache命中，此时，根据块内地址取出对应的字，如果需要，再根据字节偏移量从字中取出相应字节送 $\mathbb { C P U } _ { \mathtt { c } }$

与cache不同，存数指令不会将数据写人TLB，因此TLB的设计无须考虑写策略。目前TLB的一些典型指标为：TLB大小为16\~512项，块大小为1\~2项（每个表项4\~8B），命中时间为0.5\~1个时钟周期，缺失损失为10\~100个时钟周期，命中率为90%\~99%。

## (4) CPU 访存过程

在一个具有cache和虚拟存储器的系统中，CPU的一次访存操作涉及TLB、页表、cache、主存和磁盘的访问，其访问过程如图5.32所示。

![](images/d5e54b6bf84dc6eba0080f553259135299c89ec27370642f6fbcc505c945dbf8.jpg)  
图 5.32 CPU 访存过程

从图5.32可看出，CPU访存过程中存在以下三种缺失情况。

1） TLB 缺失（TLB Miss)：要访问的虚拟页对应的页表项不在TLB 中。

2) cache 缺失(Cache Miss)：要访问的主存块不在 cache 中。

3) 缺页(Page Miss)：要访问的虚拟页不在主存中。

表5.1给出了三种缺失的几种组合情况。

表 5.1 TLB、page、cache 三种缺失组合
<table><tr><td rowspan=1 colspan=1>序号</td><td rowspan=1 colspan=1>TLB</td><td rowspan=1 colspan=1>page</td><td rowspan=1 colspan=1>cache</td><td rowspan=1 colspan=1>说明</td></tr><tr><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>可能，TLB命中则页一定命中，信息在主存，就可能在cache中</td></tr><tr><td rowspan=1 colspan=1>2</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>可能，TLB命中则页一定命中，信息在主存，但可能不在cache中</td></tr><tr><td rowspan=1 colspan=1>3</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>可能，TLB缺失但页可能命中，信息在主存，就可能在cache中</td></tr><tr><td rowspan=1 colspan=1>4</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>可能，TLB缺失但页可能命中，信息在主存，但可能不在cache中</td></tr><tr><td rowspan=1 colspan=1>5</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>可能，TLB缺失，则页也可能缺失，信息不在主存，一定也不在cache</td></tr><tr><td rowspan=1 colspan=1>6</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>不可能，页缺失，说明信息不在主存，TLB中一定没有该页表项</td></tr><tr><td rowspan=1 colspan=1>7</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>不可能，页缺失，说明信息不在主存，TLB中一定没有该页表项</td></tr><tr><td rowspan=1 colspan=1>8</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>miss</td><td rowspan=1 colspan=1>hit</td><td rowspan=1 colspan=1>不可能，页缺失，说明信息不在主存，cache中一定也没有该信息</td></tr></table>

很显然，最好的情况是第1种组合，此时，无须访问主存；第2和第3两种组合都需要访问一次主存；第4种组合要访问两次主存；第5种组合会发生缺页异常，需访问外存，并至少访问主存两次。

cache缺失由硬件处理；缺页由软件处理，操作系统通过缺页异常处理程序来实现；而对于TLB缺失，根据指令集架构设计的不同，可由硬件处理，也可由软件处理。

## 3. 段页式虚拟存储器

在段页式虚拟存储器中，程序按模块分段，段内再分页。用段表和页表（每段一个页表）进行两级定位管理。段表中每个表项对应一个段，每个段表项中包含一个指向该段页表起始位置的指针，以及该段其他的控制和存储保护信息，由页表指明该段各页在主存中的位置以及是否装入、修改等状态信息。

程序的调人调出按页进行，但它又可以按段实现共享和保护。因此，它兼有页式和段式的优点。它的缺点是在地址映像过程中需要多次查表，而且实现机制比较复杂，因而绝大多数架构都不支持段页式虚拟存储器，Intelx86架构因为历史的原因。沿用了段页式虚拟存储机制，但是操作系统在对架构进行封装时也简化了分段过程，将整个虚拟地址空间作为一个完整的段来处理。有关Intel架构的段页式虚拟存储管理机制请参考相关资料。

## 5.5.4 存储保护

为了支持操作系统实现存储保护，指令集架构和硬件必须具有以下三种基本功能。

1）使部分CPU状态只能由操作系统内核程序访问而用户进程只能读不能写，或者根本不能访问。

例如，对于页表基址寄存器、TLB内容等，只有操作系统内核程序才能用特权指令（也称管态指令）访问。常用的特权指令有退出异常/中断处理、刷新TLB、停止处理器执行等，若用户进程执行这些特权指令，CPU将抛出非法指令异常或保护错异常。

2）支持至少两种特权模式。操作系统内核程序比用户程序具有更多的特权，例如，内核程序可以执行用户程序不能执行的特权指令，内核程序可以访问用户程序不能访问的存储空间等，为此，需要让内核程序和用户程序运行在不同的特权级别或特权模式。

运行内核程序时处理器所处的模式称为监管模式（Supervisor Mode)、内核模式（KernelMode)、超级用户模式或管理程序状态，简称管态、管理态、内核态或核心态；执行用户程序时处理器所处的模式称为用户模式（UserMode)、用户状态或目标程序状态，简称为目态或用户态。

需要说明的是，这里的特权模式与IA-32处理器的工作模式不是一回事，但是两者之间具有非常密切的关系。IA-32工作在实地址模式下不区分特权级，只有在保护模式下才区分特权级。IA-32支持4个特权级，但操作系统通常只使用第0级（内核态）和第3级（用户态)。

3）提供在不同特权模式之间相互切换的机制。通常，用户模式下可以通过系统调用（执行陷阱/自陷指令）转人更高特权模式执行。异常/中断处理程序中最后的返回指令(Return From Exception) 可使处理器从更高特权模式转到用户模式。

ISA和硬件通过提供相应的控制状态寄存器、专门的自陷指令以及各种特权指令等。和操作系统一起实现上述三个功能。操作系统把页表保存在内核地址空间，禁止用户进程访问和修改页表，从而确保用户进程只能访问由操作系统分配的存储空间。

存储保护包括以下两种情况：访问权限保护和存储区域保护。

## 1. 访问权限保护

访问权限保护检查是否发生了访问越权。若实际访问操作与访问权限不符，则发生存储保护错。通常，通过在页表或段表中设置访问权限位实现这种保护。一般来说，各程序对本程序所在的存储区可读可写：对共享区或已获授权的其他用户信息可读不可写：而对未获授权的信息（如OS内核、页表等）不可访问。通常数据段可指定为可读可写或只读；程序段可指定只可执行或只读。

## 2. 存储区域保护

存储区域保护检查是否发生了地址越界，也即是否访问了不该访问的区域。例如，程序是否访问了“空洞”区域，访问区间是否超越了最大段长规定的地址。

## 5.6 实例：Intel Core i7+Linux 存储系统

本节以一个具体的实例系统Intel Core i7+Linux结尾，以对本章介绍的层次结构存储系统进行总结，主要介绍 64 位 Intel 处理器架构 Core i7 的层次化存储器结构、Core i7 的地址转换机制以及Linux系统的虚拟存储管理机制。

## 5.6.1 Core i7 的层次化存储器结构

图 5.33 给出了 Intel Core i7 中的存储器层次结构。该型号处理器芯片中包含 4 个核(Core)，每个核内各自有一套寄存器、L1 数据 cache 和 L1 指令 cache、L1 数据 TLB 和 L1 指令 TLB，以及 L2 联合 cache 和 L2 联合 TLB。所有核共享同一个 L3 联合 cache 和同一个

DDR3存储器控制器。所有L1和L2高速缓存都是8路组相联，L3高速缓存为16路组相联，L1、L2和L3三类高速缓存大小分别为32KB、256KB和8MB，主存块大小为64B；所有L1和L2快表（TLB）都是4路组相连，L1 数据TLB、L1 指令TLB 和 L2联合 TLB 的大小分别为64项、64项和512项。系统启动时页大小可被配置为4KB、2MB或1GB，Linux系统采用4KB的页大小，故页内偏移量占12位。

![](images/eb1b6afeafb06f3090a6c8fa2611791d0e8fb4aa28623682742dfcff37b88362.jpg)  
图 5.33 Core i7 的层次化存储器结构

## 5.6.2 Core i7 的地址转换机制

Corei7的每个核内都有各自的存储器管理部件（MMU），用于实现虚拟地址（VA）向物理地址（PA）的转换。CPU通过分段方式得到相应的线性地址，这里线性地址就是虚拟地址。图 5.34 给出了Core i7 中根据虚拟地址进行存储访问的过程。

前面提到，根据虚拟地址进行存储访问的过程分两个步骤：①先通过MMU将虚拟地址转换为物理地址；②根据物理地址访问cache和主存。为了并行执行这两个步骤，Corei7中采用了一种巧妙的设计。Core i7的 L1 cache数据区共有32 KB，主存块大小为 64 B，8路组相联，因此，共有32KB/64B=512行，分成512行/8路=64组，因而cache组索引（CI)占6位，块内偏移量（CO）占6位，CI和CO合起来为12位，它们实际上就是物理页内偏移量（PPO），即虚拟页内偏移量（VPO）。因而，在CPU需要将虚拟地址转换为物理地址时，只要将高36位虚拟页号（VPN）送到MMU，而将低12位VPO直接作为CI和CO送到L1 cache。在 MMU 对 TLB 查找页表项的同时，L1 cache 根据 CI 查找对应的 cache 组，并读出该组中的8个标志（Tag)。当MMU 从TLB 得到物理页号（PPN）时，L1 cache正准备比较标志信息，此时，L1 cache只要把PPN作为 CT，与已经读出的8个标志同时进行比较，并将标志相等的那一行中由CO指出的信息作为结果即可，若8个标志都不相等，则再根据物理地址访问 L2 cache、L3 cache 或主存。由此可见，访存过程中，TLB 和 L1 cache 的部分操作是并行的。上述这种 cache 称为 VIPT（Virtually Indexed Physically Tagged) cache。相应地，用物理地址作为索引和标记进行访问的cache称为PIPT cache，用虚拟地址作为索引和标记进行访问的 cache称为 VIVT cache。不过，由于VIVT方式下虚拟页与物理页之间的映射关系灵活且可变，需额外解决一些问题。

![](images/7e8c4b278b48a2b5dac787fe3e31940972dbf638fe958c261d2fad7f0d90f74f.jpg)  
图 5.34 Core i7 中根据虚拟地址进行存储访问的过程

Corei7采用4级页表结构。如图5.34所示，MMU将36位VPN分解成4个字段：VPN1、VPN2、VPN3和VPN4，每个占9位，分别由全局页目录表（一级页表L1）、上层页目录表（二级页表L2）、中层页目录表（三级页表L3）和最后一级页表（四级页表L4）组成。控制寄存器CR3中存放的是全局页目录表的主存物理地址，每个进程有各自的4级页表，因而CR3的内容是进程上下文的一部分。每次上下文切换时，CR3中的内容被保存到进程的上下文中，并将CR3重置为新进程中相应的内容。

4级页表中前三级为页目录表，页目录表项（PDE）结构如图5.35所示。当P=1时，由位51\~12指出下级页表的主存物理基址高40位（即页框号)。当P=0时，硬件将忽略PDE中其他位的信息，由OS在其他位中保存下级页表在硬盘上的位置信息，该信息由OS使用。

![](images/ee5314314fbbc270885de4edfd64744a9105c211e5a255e8a49cf73e4b480c8b.jpg)  
图 5.35 Core i7 中前三级页目录项（PDE） 的结构

图5.35中页目录项信息的含义说明如下。

●P：存在位，P=1表示对应的下级页表在主存中。

R/W：所涵盖范围内所有信息的读/写访问权限。当页大小为4KB时，一级页表各表项涵盖范围为 $5 1 2 \times 5 1 2 \times 5 1 2 \times 4 \mathrm { ~ K B } = 5 1 2 \mathrm { ~ G B }$ ；二级页表各表项涵盖范围为 $5 1 2 \times 5 1 2 \times$ 4KB=1GB；三级页表各表项涵盖范围为 $5 1 2 \times 4 \mathrm { K B } = 2 \mathrm { M B } ,$ 0

U/S：涵盖范围内所有信息是否可被用户进程访问，为0表示不能访问；为1允许访问。该位可以保护操作系统所使用的页表不受用户进程的破坏。

WT：用来控制下级页表对应的 cache写策略是通写（Write Through）还是回写(Write Back)。

CD：用来控制下级页表能否被缓存到 cache中。

A：A=1表示下级页表被访问过，初始化时操作系统将其清 $0 _ { \circ }$ 利用该标志，操作系统可清楚地了解哪些页表正被使用，一般选择长期未用或近来最少使用的页表调出主存。由MMU在进行地址转换时将该位置1，由软件清 $0 _ { \circ }$

PS：设置页大小为4KB、2MB或1GB，仅在二级页表或三级页表的表项中有定义。

G：设置是否为全局页表。全局页表在进程切换时不会从TLB中替换出去。

页目录项的位51\~12：用来表示下级页表在主存中的页框号，即主存地址的高40位，因此，这里默认每一级页表在主存中的起始地址低12位为全0.即各级页表在主存都按4 KB 对齐。

四级页表为真正的页表，页表项（PTE）结构如图5.36所示。当P=1时，指出对应虚拟页在主存的物理基址高40位（即页框号）。当P=0时，硬件将忽略PTE中其他位的信息，由OS在其他位中保存对应虚拟页在硬盘上的位置信息，该信息由OS使用。

![](images/f872cbfde43b8225b164f8a73f740c72037809fdb1eab39705d0ae317c37a359.jpg)  
图 5.36 Core i7 中最后一级页表项（PTE） 的结构

图5.36中页表项信息的含义说明如下。

P：存在位，P=1表示对应的虚拟页在主存中。

R/W：对应页内所有信息的读/写访问权限。对于页大小为4KB的情况，所涵盖范围为4KB。

U/S：对应页内所有信息是否可被用户进程访问，为0表示用户进程不能访问；为1允许用户进程访问。该位可以保护操作系统所使用的页不受用户进程的破坏。若用户进程欲访问操作系统代码页或数据页，则会发生访问越级。

WT：用来控制对应页的 cache 写策略是全写（Write Through）还是回写（WriteBack)。

CD：用来控制对应页能否被缓存到 cache中。

A：A=1表示对应页被访问过，初始化时操作系统将其清 $0 _ { \circ }$ 利用该标志，操作系统可清楚地了解哪些页正被使用，一般选择长期未用的页或近来最少使用的页调出主存。由MMU在进行地址转换时将该位置1.由软件清 $0 _ { \circ }$

D：脏位（或称修改位），进行写操作时由MMU将该位置1，由软件清0。

$\mathbf { G }$ ：设置是否为全局页。全局页在进程切换时不会从TLB中替换出去。

页表项的位51\~12：用来表示对应页在主存中的页框号，即主存地址的高40位，因此，所有页在主存中的起始地址的低12位为全0，即所有页面在主存都按4KB对齐。

每次存储器访问，MMU都要进行地址转换，在地址转换过程中，首先应在对应页表项中设置A位，也称为使用位或引用位(Reference Bit)。每次在页面中进行写操作时，都要设置D位。内核可以根据A位实现替换算法，在选择某个页面被替换出主存时，如果对应页表项中的D位为1，则必须把该页写回外存，否则，可以不写回。内核可以使用一个特殊的特权指令来使A位和D位清 $0 _ { \circ }$ 同样，在MMU进行地址转换的过程中，MMU还会根据R/W位和U/S位，判断当前指令是否发生了访问违例，包括访问越权和访问越级。

## 5.6.3 Linux系统的虚拟存储管理

在4.4节中提到，进程的引人为应用程序提供了一个私有的地址空间，使得程序员以为自己的程序在执行过程中独占存储器。这个独占的存储器就是虚拟地址空间。

## 1. Linux中进程的虚拟地址空间

图5.37给出了在Intel架构下Linux操作系统中的一个进程对应的虚拟地址空间。

![](images/b9126df5bf8b42a87ca5ee70444a25dd54bb27f8ca56431a1c129a321fe97c02.jpg)  
图5.37 进程虚拟地址空间

整个虚拟地址空间分为两大部分：内核空间和用户空间。在采用虚拟存储器机制的系统中，每个程序的可执行目标文件都被映射到同样的虚拟地址空间上，即所有进程的虚拟地址空间是一致的，只是在相应的只读区域和可读写数据区域中映射的信息不同而已，它们分别映射到对应可执行目标文件中的只读段（节.init、.text和.rodata组成的段）和可读/写数据段（节.data和. bss 组成的段)。

对于IA-32，内核虚拟存储空间在0xc0000000以上的高端地址上，用户栈区从起始位置0xbffff开始向低地址增长，堆栈区中的共享库映射区从0x40000000开始向高地址增长，只读代码区从0x08048000开始向高地址增长，只读代码区后面跟着可读/写数据区，起始地址通常要求按4KB对齐。

对于x86-64，最开始的只读代码区从0x400000开始，用户空间的最大地址为0x7ffffffffff，通常，共享库映射区在0x7fff f0000000H\~0x7ffffffff的区域内，从0x7fff f000 0000向下是用户运行时栈（Runtime Stack)，一般限定栈大小为8MB，整个用户空间大小为247字节(128TB)。内核空间在0x8000 00000000以上的高端地址上，最大地址为0xfffffffff，整个内核空间大小也是247字节（128TB）。

## 小提示

目前比较新的Linux发行版，如ubuntu17.04等，其gcc默认会生成位置无关可执行文件(Position Independent Executables，PIE)，用 objdump去查看这些可执行文件的反汇编代码，会发现其代码起始地址并不是0x8048000（IA-32）或者0x400000（x86-64)，而是在地址 0 附近。这主要是为了提高代码的安全性而采用了ASLR(Address Space Layout Ran-domization）技术，即地址空间随机化技术。

## 2. Linux虚拟地址空间中的区域

Linux将进程对应的虚拟地址空间组织成若干区域（Area）的集合，这些区域是指在虚拟地址空间中的一个有内容的连续区块（即已分配的页），例如，图5.37中的只读代码段、可读/写数据段、运行时堆、用户栈、共享库等区域。每个区域可被划分成若干个大小相等的虚拟页，每个存在的虚拟页一定属于某个区域。

正如在4.4.2节中提到的那样，Linux内核为每个进程维护了一个进程描述符（用taskstruct数据结构表示)。如图4.21所示，task\_struct结构中的mm\_struct 描述了对应进程虚拟存储空间的当前状态，其中，有一个字段是pgd，它指向对应进程的第一级页表的首地址，因此，当处理器运行对应的进程时，内核会将它传送到CR3控制寄存器中。mm\_struct中还有一个字段 mmap，它指向一个由 vm\_area\_struct 构成的链表表头。Linux采用链表方式管理用户空间中的区域，使得内核不用记录那些不存在的“空洞”（见图5.37中的灰色区），因而这种区域不占用主存、硬盘或内核本身任何额外资源。

在 vm\_area\_struct 结构中每个区域的描述信息包括区域的开始地址 vm\_start、结束地址vm\_end、访问权限 vm\_prot等。

## 3. Linux 中页故障处理

当CPU中的MMU在对某地址VA进行地址转换时，若检测到页故障，则转入操作系统内核进行页故障处理。Linux内核可根据上述对虚拟地址空间中各区域的描述，将VA与vmarea\_struct 链表中每个 vm\_start 和 vm\_end 进行比较，以判断 VA 是否属于“空洞”。若是，则发生段故障(Segmentation Fault)；若不是，则再判断所进行的操作是否和所在区域的访问权限（由vm\_prot描述）相符。若不相符，例如，假定VA属于代码区，访问权限为PROT\_EXE（可执行)，但对地址VA进行的是写操作，那么就发生了访问越权；假定在用户态下访问属于内核的区域，访问权限为PROT\_NONE（不可访问)，那么就发生了访问越级。段故障、访问越权和访问越级都会导致终止当前进程。

若不是上述几种情况。则内核判断发生了正常的缺页异常，此时，只要在主存中找到一个空闲的页框，从外存将缺失页装入主存页框中。若主存中没有空闲页框，则根据页替换算法，选择某个页框中的页交换出去，然后从外存装入缺失页到该页框中。

## 本章小结

因为每一类存储器都不可能又快、又大、又便宜，为了构建有效的存储器系统，计算机内部采用层次化结构。按照速度从快到慢、容量从小到大、价格从贵到便宜、与CPU连接的距离由近到远的顺序，将不同类型的存储器设置在计算机中，其设置的顺序为寄存器一cache→主存→硬盘→光盘和磁带。

利用程序访问的局部性特点，通常把主存中的一块数据复制到靠近CPU的cache中。cache和主存间的映射有直接映射、全相联和组相联三种方式：替换算法主要有FIFO和LRU；写策略有回写法和通写法。

虚拟存储机制的引入，使得每个进程具有一个一致的、极大的、私有的虚拟地址空间。虚拟地址空间按等长的页划分，主存也按等长的页框划分。进程执行时将当前用到的页装人主存，暂时不用的部分放在外存，通过页表建立虚拟页和主存页框之间的对应关系。每个页表项由有效（装入）位、使用位、修改位、访问权限位、禁止缓存位、存放位置字段（主存页框号或外存地址）等组成。在指令执行过程中，由特殊硬件（MMU）和操作系统一起实现存储访问。虚拟存储器有段式、页式和段页式三类，现代操作系统多采用页式虚拟存储管理。虚拟地址需转换成物理地址，为减少访问主存中页表的次数，通常将活跃页的页表项放到一个特殊的高速缓存TLB（快表）中。虚拟存储器机制能实现存储保护，通常有地址越界、访问越权和访问越级等内存保护错。

## 习 题

1. 给出以下概念的解释说明。

<table><tr><td>随机存取存储器(RAM) 只读存储器(ROM)</td><td></td><td>易失性存储器</td><td>记忆单元(Cell)</td></tr><tr><td>存储阵列（Bank）</td><td>编址单位</td><td>编址方式</td><td>存储周期</td></tr><tr><td>静态 RAM（SRAM）</td><td>动态 RAM(DRAM)</td><td>闪存（Flash存储器）</td><td> SDRAM</td></tr><tr><td>行地址选通信号（RAS）列地址选通信号（CAS）磁盘驱动器</td><td></td><td></td><td>磁盘控制器</td></tr><tr><td>寻道时间</td><td>旋转（等待）时间</td><td>数据传输率</td><td>平均存取时间</td></tr><tr><td>固态硬盘（SSD）</td><td>时间局部性</td><td>空间局部性</td><td>主存块</td></tr><tr><td>cache行（槽）</td><td>命中率</td><td>命中时间</td><td>缺失损失</td></tr></table>

页表基址寄存器 有效位（装入位） 修改位（脏位） 访问权限

未缓存页 请求分页 页故障（Page Fault) 页表

直接映射 全相联映射 组相联映射 替换策略

FIFO 算法 LRU 算法 LRU位 cache 写策略

回写法（Write Back）通写法（Write Through)虚拟地址（逻辑地址）虚拟页号

物理地址 页框（页帧） 物理页号 未分配页

用户态 存储保护 地址越界 访问越权

2. 简单回答下列问题。

（1）计算机内部为何要采用层次结构存储体系？层次结构存储体系如何构成？

(2)为什么采用地址对齐方式能减少访问DRAM中数据的时间？

(3) 为什么在 CPU 和主存之间引人 cache 能提高 CPU 的访存效率？

(4）为什么直接映射方式不需要考虑替换策略？

(5) 为什么要考虑 cache的写策略问题？

(6)什么是物理地址？什么是逻辑地址？地址转换由硬件还是软件实现？为什么？

(7)在存储器层次化结构中，“cache-主存”“主存-外存”这两个层次有哪些不同？

3.某计算机主存最大寻址空间为4GB，按字节编址，假定用64M×8位的具有8个位平面的DRAM芯片组成容量为512MB、传输宽度为64位的内存条（主存模块)。回答下列问题。

(1） 每个内存条需要多少个DRAM芯片？

(2) 构建容量为2GB的主存时，需要几个内存条？

(3) 主存地址共有多少位？其中哪几位用作 DRAM芯片内地址？哪几位为 DRAM芯片内的行地址？哪几位为DRAM芯片内的列地址？哪几位用于选择芯片？

4. 某计算机按字节编址，其中已配有0000H\~7FFFH的ROM区，现再用16K×4位的RAM芯片形成32K×8位的存储区，CPU地址线为 $\mathrm { A } _ { 1 5 } \sim \mathrm { A } _ { 0 } \mathrm { _ { \odot } }$ 回答下列问题。

(1) RAM 区地址范围是什么？共需多少RAM芯片？地址线中哪一位用来区分ROM 区和 RAM 区?

（2)假定CPU地址线改为24根，地址范围00 0000H\~00 7FFFH为ROM区，剩下的所有地址空间都用16K×4位的RAM芯片配置，则需要多少个这样的RAM芯片？

5. 假设一个程序重复完成将磁盘上一个4KB的数据块读出.进行相应处理后，写回到磁盘的另外一个数据区。各数据块内信息在磁盘上连续存放，数据块随机位于磁盘的一个磁道上。磁盘转速为每分钟7200转，平均寻道时间为10ms，磁盘最大内部数据传输率为40MB/s，磁盘控制器的开销为2ms，没有其他程序使用磁盘和处理器，并且磁盘读/写操作和磁盘数据的处理时间不重叠。若程序对磁盘数据的处理需要20000个时钟周期，处理器时钟频率为500MHz，则该程序完成一次数据块“读出—处理—写回”操作所需的时间为多少？每秒钟可以完成多少次这样的数据块操作？

6. 现代计算机中，SRAM一般用于实现快速小容量的cache，而DRAM用于实现慢速大容量的主存。以前超级计算机通常不提供 cache，而是用 SRAM来实现主存（如Cray 巨型机)，请问：如果不考虑成本，你还这样设计高性能计算机吗？为什么？

7. 对于数据的访问，分别给出具有下列要求的程序或程序段的示例。

（1）几乎没有时间局部性和空间局部性。

(2)有很好的时间局部性，但几乎没有空间局部性。

（3）有很好的空间局部性，但几乎没有时间局部性。

（4）空间局部性和时间局部性都好。

8. 假设某计算机主存地址空间大小为1GB，按字节编址，cache的数据区（即不包括标记、有效位等存储区）有64KB，块大小为32B，采用直接映射和通写（Write-Through）方式。回答下列问题。

(1）主存地址多少位？如何划分？要求说明每个字段的含义、位数和在主存地址中的位置。

(2) cache 的总容量为多少位?

9. 假设某计算机的cache共16行，开始为空，主存块大小为1个字，采用直接映射方式，按字编址。CPU执行某程序时，依次访问以下地址序列：2，3，11，16，21，13，64，48，19，11，3，22，4，27，6和11。回答下列问题。

(1）访问上述地址序列得到的命中率是多少？

(2)若cache数据区容量不变，而块大小改为4个字，则上述地址序列的命中情况又如何？

10. 假设数组元素在主存按从左到右的下标顺序存放，N是用#define定义的常量。试改变下列函数中循环的顺序，使得其数组元素的访问与排列顺序一致，并说明为什么在N较大的情况下修改后的程序比原来的程序执行时间更短。

![](images/61bf17992394035503a74f133f2751b0e9fdd343292b3955173744359c906d72.jpg)

## 11. 分析比较图5.38给出的三个函数的数组访问的空间局部性，并指出哪个最好，哪个最差？

12. 以下是计算两个向量点积的程序段：

![](images/378b71741363518484532e9d86db0dae7710862f517ce112d301a36f978d6530.jpg)

![](images/0f46d71a3ae1fd3b3a84473bb90cb2b1dc5356957264cb04f42bbf090de5da52.jpg)  
图5.38 题11图

回答下列问题或完成下列任务。

(1）试分析该段代码中访问数组x和y的时间局部性和空间局部性，并推断命中率的高低。

(2)假设该段程序运行的计算机中的数据cache采用直接映射方式，其数据区容量为32B，主存块大小为16 B；编译程序将变量sum和i分配给寄存器，数组x存放在0x40开始的主存区域，数组y紧跟在x后。试计算该程序数据访问的命中率，要求说明每次访问时cache的命中情况。

(3）将（2）中的数据cache改用2路组相联映射方式，主存块大小改为8B，其他条件不变，则该程序数据访问的命中率是多少？

(4) 在（2) 中条件不变的情况下，将数组x定义为float x[12]，则数据访问的命中率又是多少？

13. 以下是对矩阵进行转置的程序段：

![](images/430f34e3cb31f74258c2fe62da8fb4495755c3f6dbd8cd976c3975e6214ab033.jpg)

假设该段程序运行的计算机中 sizeof(int) = 4，且只有一级 cache，其中 L1 data cache 的数据区大小为32B，采用直接映射、回写方式，块大小为16B，初始为空。数组dst从主存地址0xc000开始存放，数组src从主存地址0xc040开始存放。仿照例子填写表5.2，以说明数组元素 src[ row][col]和 dst[ row][col]各自映射到 cache 哪一行，访问是命中（Hit) 还是缺失（Miss)。若 L1 data cache的数据区容量改为128 B 时，重新填写表中内容。

表 5.2 题 13 用表
<table><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=4>sre 数组</td><td rowspan=1 colspan=4>dst 数组</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>col=0</td><td rowspan=1 colspan=1>col=1</td><td rowspan=1 colspan=1>col=2</td><td rowspan=1 colspan=1>col=3</td><td rowspan=1 colspan=1>col=0</td><td rowspan=1 colspan=1>col=1</td><td rowspan=1 colspan=1>col =2</td><td rowspan=1 colspan=1>col = 3</td></tr><tr><td rowspan=1 colspan=1>row = 0</td><td rowspan=1 colspan=1>0/miss</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>row= 1</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>row=2</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>row = 3</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

14. 假设某计算机的主存地址空间大小为64 MB，按字节编址。其cache数据区容量为4KB，采用4路组相联映射、LRU替换算法和回写（Write Back）策略，块大小为64 B。请问：

(1）主存地址字段如何划分？要求说明每个字段的含义、位数和在主存地址中的位置。

(2) 该 cache的总容量有多少位？

（3）假设cache初始为空，CPU依次从0号地址单元顺序访问到4344号单元，重复按此序列共访问16次。若cache命中时间为1个时钟周期，缺失损失为10个时钟周期，则CPU访存的平均时间为多少时钟周期？

15. 假定某处理器可通过软件对高速缓存设置不同的写策略，那么，在下列两种情况下，应分别设置成什么写策略？为什么？

（1）处理器主要运行包含大量存储器写操作的数据访问密集型应用。

（2）处理器运行程序的性质与（1）相同，但安全性要求很高，不允许有任何数据不一致的情况发生。

16. 已知cache1采用直接映射方式，共16行，块大小为1个字，缺失损失为8个时钟周期；cache2也采用直接映射方式，共4行，块大小为4个字，缺失损失为11个时钟周期。假定开始时cache为空，采用字编址方式。要求找出一个访问地址序列，使得 cache2具有更低的缺失率，但总的缺失损失反而比cache1大。

17. 假定某处理器带有一个数据区容量为256B的cache，其主存块大小为32B。以下C语言程序段运行在该处理器上，设 sizeof(int)= 4，编译器将变量 i,j, c,s 都分配在通用寄存器中，因此，只要考虑数组元素的访存情况。为简化问题，假定数组a从一个主存块开始处存放。若 cache采用直接映射方式，则当s=64和s=63时，缺失率分别为多少？若cache采用2路组相联映射方式，则当s=64和s=63时，缺失率又分别为多少？

![](images/55de394d5afe0c1b31fb6e61707dfa3b5df0aba37ea5f858611fedd16b3a7ad3.jpg)

18.假定一个虚拟存储系统的虚拟地址为40位，物理地址为36位，页大小为16KB。若页表中有有效位、访问权限位、修改位、使用位，共占4位，磁盘地址不记录在页表中，则该存储系统中每个进程的页表大小为多少？如果按计算出来的实际大小构建页表，则会出现什么问题？

19. 假定一个计算机系统中有一个 TLB 和一个L1 data cache。该系统按字节编址，虚拟地址16位，物理地址12位，页大小为128B；TLB采用4路组相联方式，共有16个页表项；L1 data cache采用直接映射方式，块大小为4B，共16行。在系统运行到某一时刻时，TLB、页表和 L1 data cache 中的部分内容如图 5.39 所示。

<table><tr><td rowspan=1 colspan=1>03</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>09</td><td rowspan=1 colspan=1>OD</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>00</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>07</td><td rowspan=1 colspan=1>02</td><td rowspan=1 colspan=1>1</td></tr><tr><td rowspan=1 colspan=1>13</td><td rowspan=1 colspan=1>2D</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>02</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>04</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>OA</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td></tr><tr><td rowspan=1 colspan=1>02</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>08</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>06</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>03</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>0</td></tr><tr><td rowspan=1 colspan=1>07</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>63</td><td rowspan=1 colspan=1>OD</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>0A</td><td rowspan=1 colspan=1>34</td><td rowspan=1 colspan=1>yue</td><td rowspan=1 colspan=1>72</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>0</td></tr></table>

a) TLB(4路组相联)：4 组、16 个页表项

<table><tr><td colspan="2">虚页号 页框号</td><td>有效位</td></tr><tr><td>00</td><td>08</td><td>1</td></tr><tr><td>01</td><td>03</td><td>1</td></tr><tr><td>02</td><td>14</td><td>1</td></tr><tr><td>03</td><td>02</td><td>1</td></tr><tr><td>04</td><td>一</td><td>0</td></tr><tr><td>05</td><td>16</td><td></td></tr><tr><td>06</td><td>一</td><td>0</td></tr><tr><td>07</td><td>07</td><td>1</td></tr><tr><td>08</td><td>13</td><td>1</td></tr><tr><td>09</td><td>17</td><td>pmmef</td></tr><tr><td>OA</td><td>09</td><td>pon</td></tr><tr><td>0B</td><td>一</td><td>0</td></tr><tr><td>0C</td><td>19</td><td>1</td></tr><tr><td>OD</td><td>一</td><td>0</td></tr><tr><td>OE</td><td>11</td><td></td></tr><tr><td>OF</td><td>OD</td><td>1</td></tr></table>

b) 部分页表：(开始16项)

<table><tr><td rowspan=1 colspan=1>19</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>12</td><td rowspan=1 colspan=1>56</td><td rowspan=1 colspan=1>C9</td><td rowspan=1 colspan=1>AC</td></tr><tr><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>1B</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>03</td><td rowspan=1 colspan=1>45</td><td rowspan=1 colspan=1>12</td><td rowspan=1 colspan=1>CD</td></tr><tr><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>32</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>23</td><td rowspan=1 colspan=1>34</td><td rowspan=1 colspan=1>C2</td><td rowspan=1 colspan=1>2A</td></tr><tr><td rowspan=1 colspan=1>OD</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>46</td><td rowspan=1 colspan=1>67</td><td rowspan=1 colspan=1>23</td><td rowspan=1 colspan=1>3D</td></tr><tr><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>16</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>12</td><td rowspan=1 colspan=1>54</td><td rowspan=1 colspan=1>65</td><td rowspan=1 colspan=1>DC</td></tr><tr><td rowspan=1 colspan=1>24</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1>23</td><td rowspan=1 colspan=1>62</td><td rowspan=1 colspan=1>12</td><td rowspan=1 colspan=1>3A</td></tr><tr><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>2D</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>43</td><td rowspan=1 colspan=1>62</td><td rowspan=1 colspan=1>23</td><td rowspan=1 colspan=1>C3</td></tr><tr><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>一</td></tr><tr><td rowspan=1 colspan=1>12</td><td rowspan=1 colspan=1>美</td><td rowspan=1 colspan=1>76</td><td rowspan=1 colspan=1>83</td><td rowspan=1 colspan=1>21</td><td rowspan=1 colspan=1>35</td></tr><tr><td rowspan=1 colspan=1>16</td><td rowspan=1 colspan=1>1</td><td rowspan=1 colspan=1>A3</td><td rowspan=1 colspan=1>F4</td><td rowspan=1 colspan=1>23</td><td rowspan=1 colspan=1>111</td></tr><tr><td rowspan=1 colspan=1>33</td><td rowspan=1 colspan=1>美</td><td rowspan=1 colspan=1>2D</td><td rowspan=1 colspan=1>4A</td><td rowspan=1 colspan=1>45</td><td rowspan=1 colspan=1>55</td></tr><tr><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1>0</td><td rowspan=1 colspan=1>m</td><td rowspan=1 colspan=1>一</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

c) L1 data cache：直接映射，共16行，块大小为4B  
请问（假定图中数据都为十六进制形式）：

图 5.39 题19 图

(1）虚拟地址中哪几位表示虚拟页号？哪几位表示页内偏移量？虚拟页号中哪几位表示 TLB标记？哪几位表示TLB组索引？

(2)物理地址中哪几位表示物理页号？哪几位表示页内偏移量？

（3）物理地址如何划分成标记字段、行索引字段和块内地址字段？

(4) 若从虚拟地址067AH中读取一个short型变量，则这个变量的值为多少？说明CPU读取虚拟地址067AH中内容的过程。

# 第6章 程序中I/O操作的实现

使用高级语言编写应用程序时，通常利用专门的VO库函数来实现外设的I/O功能，而IO库函数通常将具体的VO操作功能通过相应的陷阱指令（自陷指令，有时也称软中断指令）以系统调用的方式转换为由操作系统内核来实现。也就是说，任何I/0操作过程最终都是由操作系统内核控制完成的。

本章主要介绍与V0操作相关的软件和硬件方面的相关内容。主要包括：文件的概念，与VO系统调用相关的函数，基本的C标准VO库函数，常用外设控制器（VO接口）的基本功能和结构，VO端口的编址方式，外设与主机之间的VO控制方式以及如何利用陷阱指令将用户I/O请求转换为操作系统的I/O处理过程。

## 6.1 V0 子系统概述

VO子系统主要解决信息的输入和输出问题，即解决如何将所需信息（文字、图表、声音、视频等）通过不同外设输入到计算机中，或者计算机内部处理的结果如何通过相应外设输出给用户。

所有高级语言的运行时系统都提供了执行VO功能的高级机制，例如，C语言中提供了像 printf()和scanf()等这样的标准I/O库函数，C++语言中提供了如<<(输入) 和>>(输出)这样的重载I/0操作符。从用户在高级语言程序中通过V/O函数或VO操作符提出I/O请求，到I/O设备响应并完成V/O请求，整个过程涉及多个层次的I/O软件和VO硬件的协调工作。

## 小提示

运行时系统(Run-time System，Runtime System)也称为运行时环境(Runtime Envi-ronment)或简称运行时(Runtime)，它实现了一种计算机语言的核心行为。不管是被编译转换的语言，还是被解释执行的语言，或者是嵌入式领域特定的语言等，每一种计算机语言都实现了某种形式的运行时系统。一个运行时系统除了要支持语言基本的低级行为之外，还要实现更高层次的行为，如库函数等，甚至提供类型检查、调试以及代码生成与优化等功能。

与计算机系统一样，I/0子系统也采用层次结构。图6.1是I/0子系统层次结构示意图。

IO子系统包含V/O软件和I/O硬件两大部分。VO软件包括最上层提出VO请求的用户空间VO软件（称为用户VO软件）和在底层操作系统中对VO进行具体管理和控制的内核空间I/O软件（称为系统IO软件）。系统VO软件又分三个层次，分别是与设备无关的VO软件层、设备驱动程序层和中断服务程序层。IO硬件在操作系统内核空间VO软件

的控制下完成具体的IO操作。

![](images/eaf2c8dca1f95fc5651e34c57ead9eeab472ebac1f4e89c0045ecd8ebf3cf0f8.jpg)  
图6.1 I/0子系统层次结构

操作系统在V0子系统中承担极其重要的作用，这主要是由V0子系统以下三个特性决定的。

共享性。I0子系统被多个进程共享，因此必须由操作系统对共享的I/0资源统一调度管理，以保证用户程序只能访问自己有权访问的那部分V0设备或文件，并使系统的吞吐率达到最佳。

复杂性。V0设备控制的细节比较复杂，如果由最上层的用户程序直接控制，会给广大的应用程序开发人员带来麻烦，因而需操作系统提供专门的驱动程序进行控制，这样可以对应用程序开发人员屏蔽设备控制的细节，简化应用程序的开发。

异步性。VO子系统的速度较慢，而且不同设备之间的速度也相差较大，因而，V0设备与主机之间的信息交换方式通常使用异步的中断I/O方式，中断导致从用户态向内核态转移，因此，VO处理须在内核态完成，通常由操作系统提供中断服务程序来处理V/O。

用户程序总是通过某种VO函数或V/0操作符请求/0操作。例如，用户程序需要读一个磁盘文件中的记录时，可以通过调用C语言标准I/0库函数fread()，也可以直接调用read系统调用的封装函数read()来提出V0请求。不管用户程序中调用的是C库函数还是系统调用封装函数，最终都通过操作系统内核提供的系统调用来实现V0。

图 6.2 给出了用户程序调用 printf来调出内核提供的 write系统调用的过程。

![](images/653e4e84d965629cfc3a9ca097ced30c978936b0c79d0214bb257046d4f91c9a.jpg)  
图6.2 用户程序、C语言函数库和内核之间的关系

如图6.2所示，若在C程序中调用了printf，则执行到调用printf的语句时，便会转到对应的 I/0 标准库函数 printf 去执行，而 printf 最终又会转到 write 函数调用；write()函数对应一个指令序列，其中有一条陷阱指令，通过这条陷阱指令，CPU从用户态转到内核态执行，在内核空间中转到write对应的系统调用服务例程来执行具体的打印显示任务。

每个系统调用的封装函数都会被转换为一组与具体机器架构相关的指令序列，这个指令序列中，至少有一条陷阱指令，在陷阱指令之前可能还有若干条传送指令用于将V0操作的参数送人相应的寄存器。

例如，在IA-32中，陷阱指令就是INTn指令，也称为软中断指令。在早期IA-32架构中，Linux系统将int\$0x80指令用作系统调用，在系统调用指令之前会有一串传送指令，用来将系统调用号等参数传送到相应的寄存器。系统调用号通常在EAX寄存器中，内核程序可根据系统调用号选择执行一个系统调用服务例程。这样，用户进程的VO请求通过调出操作系统中相应的系统调用服务例程来实现。

IO子系统工作的大致过程如下：首先，CPU在用户态下运行用户进程，当CPU执行到系统调用封装函数对应的指令序列中的陷阱指令时，会从用户态陷入内核态：转到内核态执行后，CPU会根据陷阱指令执行时EAX寄存器中的系统调用号，选择执行相应的系统调用服务例程；在系统调用服务例程的执行过程中，可能需要调用具体设备的驱动程序；在设备驱动程序执行过程中启动外设工作，外设准备好数据或准备好接收数据后，就发出中断请求；CPU响应中断后，就调出中断服务程序执行，在中断服务程序中控制主机与设备进行具体的数据交换。

图 6.3 是 Linux 系统中 write 操作的执行过程示意图。

![](images/c8c0371d3466c7acc90a8e8b006d73429a95fd1ce912a34ae5a0263a6f3250a2.jpg)  
图6.3 在 Linux系统中 write操作的执行过程

如图6.3所示，假定用户程序中调用了库函数printf，在printf函数中又通过一系列的函数调用，最终转到调用 write函数。在write函数对应的指令序列中，一定有一条用于系统调用的陷阱指令，在IA-32+Linux 系统中就是指令 int \$0x80 或 sysenter。该陷阱指令执行后，进程就从用户态陷入内核态执行。Linux中有一个系统调用的统一人口，即系统调用处理程序 system\_call。CPU 执行陷阱指令后，便转到 system\_call 的第一条指令执行。在 system\_call中，将根据EAX寄存器中的系统调用号跳转到当前系统调用对应的系统调用服务例程syswrite去执行。system\_call执行结束时，从内核态返回到用户态下的陷阱指令后面一条指令继续执行。

Linux 系统下 write 函数的用法如下：

![](images/7437030d1fabe2f8777bc58394cdcf956fe3026c933def1f22d00f4eead992ea.jpg)

这里的类型 size\_t 和 ssize\_t 分别是 unsigned int 和 int。write 函数中的参数 n 表示要写的字节数，返回值是实际写的字节数，其类型通常都是unsigned型，但因为返回值还可能是-1（表示执行错误），因此返回类型只能是带符号整数类型int。

在IA-32系统中，write封装函数的源代码编译后生成如图6.4所示的汇编代码。按照过程调用参数压栈顺序可知，在某函数中调用write函数时，最先压入栈中的参数是n，其次是buf，最后是fd，参数压栈后执行调用指令call，此时，再将返回地址压栈。在执行完call指令后，便跳转到图6.4所示的 write 过程执行。执行第2行的 push指令后，当前栈指针寄存器内容R[esp]指向刚保存的 R[ebx]，R[esp]+4 指向返回地址，R[esp]+8 指向参数fd，R[ esp] +12 指向参数 buf,R[ esp] +16 指向参数 n。

![](images/8c6a393a1b962c7ec650ed53cb58f823266e5f9b12cb5f3f0baa59912137a811.jpg)  
图6.4 write()封装函数对应的汇编代码

图6.4给出的汇编代码中，第3行到第6行用来将系统调用的参数送到不同的寄存器，其中，系统调用号4保存在寄存器EAX中。第7行是陷阱指令int \$0x80，CPU执行到该指令时，将从用户态切换到内核态，调出系统调用处理程序system\_call执行。在 system\_call中，根据系统调用号为4，再跳转到相应的系统调用服务例程sys\_write执行，以完成将一个字符串写入文件的功能，其中，字符串的首地址由ECX指定，字符串的长度由EDX指出，写入文件的文件描述符由EBX指出。system\_call执行结束时，从内核返回的参数存放在EAX中。若返回参数表明系统调用发生错误，则将EAX取负后得到错误码，存放在 error中，并将 write函数的返回值置-1；若没有发生错误，则write函数的返回值就是从内核系统调用返回的值，它通常是真正写入文件的字节数。

## 6.2 用户空间 I/O 软件

I0软件包括图6.1所示的最上层提出V0请求的用户空间V0软件和在底层操作系统中具体进行V0操作控制的内核空间VO软件。

## 6.2.1 用户程序中的VO 函数

在用户空间VO软件中，用户程序可以通过调用特定的VO函数的方式提出I/O请求。

在UNIX/Linux系统中，用户程序使用的I/O 函数可以是C 标准I/O 库函数或系统调用封装函数，前者如文件 I/O 函数 fopen、fread、fwrite 和 fclose 或控制台 I/O 函数 printf、scanf 等；后者如 open、read、write 和 close 等。

标准I/0库函数比系统调用封装函数抽象层次更高，后者属于系统级I/0函数，前者是基于后者实现的。图6.5给出了两者之间的关系。

![](images/96276d18c0b27a30b601d2a9de171c41b6c1fe09fa7eaf41c129b3ce8bb4488a.jpg)  
图 6.5 C 标准VO 库函数与 UNIX 系统级 VO 函数之间的关系

通常情况下.C程序员大多使用较高层次的标准IO库函数，而很少使用底层的系统级IO函数。使用标准IO库函数得到的程序移植性较好，可以在不同体系结构和操作系统平台下运行，而且，因为标准V0库函数中的文件操作使用了在内存中的文件缓存区，使得系统调用以及V0次数显著减少，所以使用标准I/O库函数能提高程序执行效率。不过也存在以下不足：①I/0为同步操作，即程序必须等待IO操作真正完成后才能继续执行；②在一些情况下不适合甚至无法使用标准V/O库函数实现IO功能，如C标准VO库中不提供读取文件元数据的函数：③标准V0库函数还存在一些问题，用它进行网络编程容易造成缓冲区溢出等风险，同时它也不提供对文件进行加锁和解锁等功能。

很多情况下使用标准V0库函数就能解决问题，特别是对于磁盘和终端设备（键盘、显示器等）的V/0操作。但必要时也可以基于底层的系统级IO函数自行构造高层次I0函数，以提供适合网络VO的读操作和写操作函数。

在Windows系统中，用户程序同样可以调用C标准VO库函数，此外，还可以调用Windows 提供的 API 函数，如文件 I/O 函数 CreateFile、ReadFile、WriteFile、CloseHandle 和控制台I/O 函数 ReadConsole、WriteConsole等。

表6.1给出了关于文件V/0和控制台V/0的部分函数对照列表，其中包含了C标准V/0库函数、UNIX/Linux 系统级 I/O 函数和用于I/O 的 Windows API 函数。

表6.1 关于V/0操作的部分函数或宏定义对照表
<table><tr><td colspan="1" rowspan="1">序号</td><td colspan="1" rowspan="1">C 标准库</td><td colspan="1" rowspan="1">UNIX/Linux</td><td colspan="1" rowspan="1">Windows</td><td colspan="1" rowspan="1">功能描述</td></tr><tr><td colspan="1" rowspan="1">1</td><td colspan="1" rowspan="1">getc, scanf, gets</td><td colspan="1" rowspan="1">read</td><td colspan="1" rowspan="1">ReadConsole</td><td colspan="1" rowspan="1">从标准输入读取信息</td></tr><tr><td colspan="1" rowspan="1">2</td><td colspan="1" rowspan="1">fread</td><td colspan="1" rowspan="1">read</td><td colspan="1" rowspan="1">ReadFile</td><td colspan="1" rowspan="1">从文件读人信息</td></tr><tr><td colspan="1" rowspan="1">3</td><td colspan="1" rowspan="1">putc, printf, puts</td><td colspan="1" rowspan="1">write</td><td colspan="1" rowspan="1">WriteConsole</td><td colspan="1" rowspan="1">在标准输出上写信息</td></tr><tr><td colspan="1" rowspan="1">4</td><td colspan="1" rowspan="1">fwrite</td><td colspan="1" rowspan="1">write</td><td colspan="1" rowspan="1">WriteFile</td><td colspan="1" rowspan="1">在文件上写人信息</td></tr><tr><td colspan="1" rowspan="1">5</td><td colspan="1" rowspan="1">fopen</td><td colspan="1" rowspan="1">open, creat</td><td colspan="1" rowspan="1">CreateFile</td><td colspan="1" rowspan="1">打开/创建一个文件</td></tr><tr><td colspan="1" rowspan="1">6</td><td colspan="1" rowspan="1">fclose</td><td colspan="1" rowspan="1">close</td><td colspan="1" rowspan="1">CloseHandle</td><td colspan="1" rowspan="1">关闭一个文件（CloseHandle 不限于文件)</td></tr><tr><td colspan="1" rowspan="1">7</td><td colspan="1" rowspan="1">fseek</td><td colspan="1" rowspan="1">Iseek</td><td colspan="1" rowspan="1">SetFilePointer</td><td colspan="1" rowspan="1">设置文件读/写位置</td></tr><tr><td colspan="1" rowspan="1">8</td><td colspan="1" rowspan="1">rewind</td><td colspan="1" rowspan="1">Iseek(0)</td><td colspan="1" rowspan="1">SetFilePointer(0)</td><td colspan="1" rowspan="1">将文件指针设置成指向文件开头</td></tr><tr><td colspan="1" rowspan="1">9</td><td colspan="1" rowspan="1">remove</td><td colspan="1" rowspan="1">unlink</td><td colspan="1" rowspan="1">DeleteFile</td><td colspan="1" rowspan="1">删除文件</td></tr><tr><td colspan="1" rowspan="1">10</td><td colspan="1" rowspan="1">feof</td><td colspan="1" rowspan="1">无对应</td><td colspan="1" rowspan="1">无对应</td><td colspan="1" rowspan="1">停留到文件末尾</td></tr><tr><td colspan="1" rowspan="1">11</td><td colspan="1" rowspan="1">perror</td><td colspan="1" rowspan="1">strerror</td><td colspan="1" rowspan="1">FormatMessage</td><td colspan="1" rowspan="1">输出错误信息</td></tr><tr><td colspan="1" rowspan="1">12</td><td colspan="1" rowspan="1">无对应</td><td colspan="1" rowspan="1">stat, fstat, lstat</td><td colspan="1" rowspan="1">GetFileTime</td><td colspan="1" rowspan="1">获取文件的时间属性</td></tr><tr><td colspan="1" rowspan="1">13</td><td colspan="1" rowspan="1">无对应</td><td colspan="1" rowspan="1">stat, fstat, lstat</td><td colspan="1" rowspan="1">GetFileSize</td><td colspan="1" rowspan="1">获取文件的长度属性</td></tr><tr><td colspan="1" rowspan="1">14</td><td colspan="1" rowspan="1">无对应</td><td colspan="1" rowspan="1">fent</td><td colspan="1" rowspan="1">LockFile/UnlockFile</td><td colspan="1" rowspan="1">文件的加锁、解锁</td></tr><tr><td colspan="1" rowspan="1">15</td><td colspan="1" rowspan="1">使用stdin、stdout 和stderr</td><td colspan="1" rowspan="1">使用文件描述符0、1和2</td><td colspan="1" rowspan="1">GetStdHandle</td><td colspan="1" rowspan="1">标准输入、标准输出和标准错误设备</td></tr></table>

从表6.1可以看出，C标准库中提供的函数并没有涵盖所有底层操作系统提供的功能，如表中第12、第13和第14项；不同的C标准库函数可能调用相同的系统调用，例如，表中第1和第2项中的C库函数都由系统调用read实现，同样，表中第3和第4项中的C库函数都由 write系统调用实现：此外，C标准I/O库函数、UNIX/Linux和Windows的API函数所提供的IO操作功能并非一一对应。虽然对于基本的I/O操作，它们有大致一样的功能，不过，在使用时还是要注意其不同之处。例如，它们对文件的标识方式不同：函数read和write指定的文件参数用一个整数类型的文件描述符标识；而C标准库函数fread和fwrite指定的文件参数用一个指向特定结构的指针类型标识。这个特定结构就是FILE结构。

图6.6给出了文件复制功能的一种简单实现方式，它使用C 标准库函数 fread和 fwrite实现。

![](images/26fa580867be766368e37608163f63ccc5428ae7c0b491d6c97a8384c85ce665.jpg)  
图6.6 使用C标准库函数示例程序

还可用函数 fgetc 和 fputc 实现上述功能：

在Windows系统中，除了使用C 标准库函数实现以外，还可使用 API函数 ReadFile和WriteFile来实现文件复制功能。此外，操作系统还可能会提供一些抽象度更高的API函数，它由若干基本 API 函数组合实现，用于完成特定功能。如 Windows系统提供 CopyFile函数，它通过调用基本 API 函数 CreateFile、ReadFile、WriteFile 和 CloseHandle 实现，用户程序可以直接使用 CopyFile函数实现文件复制功能。

## 6.2.2 文件的基本概念

Linux操作系统是一个类UNIX系统，其文件格式和文件操作相关的系统调用等与UNIX类似。在UNIX系统中，所有I/O操作都通过读写文件实现，所有外设，包括网络（套接字socket）、终端设备（键盘和显示器）等，都被看成文件。把不同物理设备抽象成逻辑上统一的“文件”后，对于用户程序来说，访问一个物理设备与访问一个真正的磁盘文件完全一致，从而为用户程序和外设之间的信息交换提供了统一的处理接口。

在UNIX操作系统中，文件就是一个字节序列，因此，可将键盘看成是可读取字节序列的输人设备文件，显示器看成是可写入字节序列的输出设备文件，而网络套接字则是可读取字节序列和写入字节序列的输入输出设备文件。通常将键盘和显示器构成的设备称为终端(Terminal)，对应标准输入文件和标准输出文件。像磁盘、光盘等外存储器上的文件则是普通文件（或称常规文件）。

根据文件中的每个字节是否为可读的ASCII码，可将文件分成ASCⅡI文件和二进制文件两类。ASCII文件也称为文本文件，由多个正文行组成，每行以换行符（\n'）结束，其中每个字节是一个字符。通常，终端设备上的标准输入文件和标准输出文件是ASCⅡ文件：硬盘上的普通文件则可能是文本文件或二进制文件，如可重定位文件和可执行文件都是二进制文件，而源程序文件则是ASCⅡI文件。

对于系统中的文件，用户程序可以对其进行创建、打开、读/写和关闭等操作。

## 1. 创建文件

通常，用户程序在读写一个文件前，必须告知系统将要对该文件进行何种操作，是读、写、添加还是可读可写，该告知操作通过打开或创建一个文件来实现。

可以直接打开一个已存在的文件，若文件不存在，则应先创建。创建一个新文件时，用户应指定其文件名和访问权限，系统将返回一个非负整数，称为文件描述符(File Descriptor)。文件描述符是进程中被打开文件的唯一标识，可用于后续读/写等操作。

## 2. 打开文件

打开文件时，系统会检测文件是否存在、用户是否有访问权限等。若成功，则系统会返回一个非负整数作为文件描述符。

创建每个进程时，都会预先打开三个标准文件：标准输入（描述符为0）、标准输出（描述符为1）和标准错误（描述符为2）。键盘和显示器可以分别抽象成标准输入文件和标准输出文件。

## 3. 设置文件读/写位置

每个文件都有一个当前读/写位置，表示相对于文件最开始处的字节偏移量，初始时为0。用户程序中可通过系统调用封装函数lseek()设置文件读/写位置。

## 4. 读文件和写文件

用户程序可以向被创建的新文件中写人信息，也可以从一个已存在且打开后的文件中读或写信息。写文件操作将从当前读/写位置k（k≥0）处写入n（n>0）个字节，因而写入后文件当前读/写位置为k+n。

读文件操作将从文件当前读/写位置k（k≥0）处读出n（n>0）个字节，因而读出后文

件当前读/写位置为k+n。假设文件大小为m字节，若执行读文件操作时k=m，则当前位置为结尾处，这种情况称为文件结束(End Of File，EOF)。

## 5. 关闭文件

完成文件读/写等操作后，用户程序需要通知系统关闭文件，表示用户程序不再对该文件进行任何操作。关闭文件时，系统将释放文件创建或打开相关的数据结构所在存储区，并回收文件描述符。无论一个进程因为何种原因终止，系统都会关闭其打开的所有文件，以释放相应的存储资源。

## 6.2.3 系统级 I/0 函数

前面提到，与I/O操作相关的系统调用封装函数属于系统级I/O函数。在UNIX/Linux系统中，常用的这类函数有creat、open、read、write、lseek、stat/fstat、close等，它们的调用形式及其功能说明如下。使用以下函数时必须包含相应的头文件（如unistd.h等）。

## 1. creat 函数

用法： int creat( char \* name, mode\_t perms);

第一个参数 name为需创建的文件路径；第二个参数 perms 用于指定所创建文件的访问权限，共有9位，分别指定文件拥有者、拥有者所在组成员以及其他用户所拥有的读、写和执行权限。通常用一位八进制数字同时表示读、写和执行权限，例如，perms=0755表示拥有者具有读、写和执行权限（八进制的7，即111B），而拥有者所在组成员和其他用户都只有读和执行权限，没有写权限（八进制的5，即101B）。若创建成功，该函数返回一个文件描述符，若出错，则返回-1。若文件已存在，则把文件长度截断为0，即将原文件的内容全部丢弃，因此，创建一个已存在的文件不会发生错误。

## 2. open 函数

用法: int open(char \* name, int flags, mode\_t perms) ;

除了默认的标准输入、标准输出和标准错误三个文件是自动打开以外，其他文件必须用相应的函数显式创建或打开后才能读/写，例如，可以用open函数显式打开文件。

open函数成功时返回一个文件描述符，若出错，则返回-1。第一个参数 name为需打开文件的路径名；第二个参数flags指出用户程序将会如何访问这个打开文件，例如，

O\_RDONLY：只读。

O\_WRONLY：只写。

O\_RDWR：可读可写。

●O\_WRONLY|O\_APPEND：可在文件末尾添加并且只写。

O\_RDWR|O\_CREAT：若文件不存在则创建一个空文件并且可读可写。

O\_WRONLY|O\_CREAT|O\_TRUNC：若文件不存在则创建一个空文件，若文件存在则截断为空文件，并且只写。

上述带 O\_的常数在某个头文件中定义，例如，在 System V UNIX 系统的头文件 fcntl. h或 BSD版本的头文件 sys/file. h中都定义了这些常数。

假定用户程序将以只读方式访问文件test.xt，则可以用以下语句打开文件：

第三个参数 perms用于指定所创建文件的访问权限，通常在 open函数中该参数总是0，除非以创建方式打开，此时，参数flags中应带有O\_CREAT标志。不以创建方式打开一个文件时，若文件不存在，则发生错误。对于不存在的文件，可用creat函数打开。

## 3. read 函数

```c
用法： ssize_t read(int fd, void * buf, size_t n);
```

该函数功能是从文件fd的当前读/写位置h开始读取n个字节到buf中，读取成功后文件当前读/写位置为k+n。假定文件长度为m，当k+n>m时，则真正读取的字节数为m-k<n，并且读取后文件当前读/写位置为文件尾。函数返回值为实际读取字节数，因此，当m=k(EOF)时，返回值为0；出错时返回值为-1。

## 4. write 函数

用法： ssize\_t write(int fd, const void \* buf, size\_t n);

该函数功能是将buf中的n字节写到文件fd的当前读/写位置k处。返回值为实际写人字节数m，写人成功后文件当前读/写位置为k+m。对于普通的硬盘文件，实际写入字节数m等于指定写人字节数n。出错时返回值为-1。

对于read和write函数，可以一次读或写任意个字节，如1字节、一个物理块大小、一个磁盘扇区（512字节）或一个记录等。显然，按照一个物理块大小来读/写可以减少系统调用的次数。

有时真正读/写的字节数比用户程序指定的字节数要少，此时并非出错。通常，在读/写磁盘文件时，除非遇到EOF，否则不会出现上述情况。但是，在读/写终端设备文件、网络套接字文件、UNIX管道、Web服务器等特殊文件时，都可能出现上述情况。

## 5. lseek 函数

用法： long lseek(int fd, off\_t offset, int whence);

若当前读/写位置并非用户预期的位置，则需要用1seek函数来调整文件的当前读/写位置。第一个参数fd指出需调整位置的文件；第二个参数offset指出目标位置的相对偏移量；第三个参数 whence指出 offset 相对的基准，分别是文件开头(SEEK\_SET)、当前位置(SEEK\_CUR）和文件末尾（SEEK\_END)。例如：

若成功，函数返回新位置相对文件开头的偏移量；若发生错误，则返回-1。

## 6. stat/fstat 函数

```c
用法： int stat(const * name, struct stat * buf);
int fstat(int fd, struct stat * buf) ;
```

文件名、文件大小、创建时间等文件属性信息均由操作系统内核维护，这些信息也称为文件元数据(File Metadata)。用户程序可以通过 stat 或fstat 函数查看文件元数据。stat()第一个参数是文件路径，而fstat()是文件描述符，这两个函数除了第一个参数类型不同外，其他方面全部一样。文件的元数据信息通过如下stat数据结构描述。

![](images/1c3e85034f090281be1dd1583b35d12113b8c252ed977528eeca59fb25fdec9e.jpg)

7. close 函数

用法：close(int fd)；

该函数用于关闭文件fd。

## 6.2.4 C 标准V/O 库函数

在6.2.1小节中提到，标准V/0库函数是基于系统级I/0函数实现的。本小节通过若干例子，介绍如何通过系统级I/O函数来实现C标准I/O库函数。

## 1. 输入/输出流缓冲区

C标准O库函数将一个打开的文件抽象为一个类型为FILE的“流”模型。上面曾提到，C标准VO库函数中，文件是用一个指向特定结构的指针来标识的，这个特定结构就是FILE结构，它描述了包含文件描述符fd在内的一组信息。FILE结构在头文件 stdio. h 中描述，此外，stdio.h文件中还对其他与标准IO有关的常量、数据结构、函数和宏等进行了定义。

以下是从一个典型的 stdio. h文件中摘录的部分内容。

![](images/2a13694799adfca1d9a92237f04a37977947306f11ac29fb90216530173b2eb3.jpg)

![](images/3168d761268ecec8ae9c0504dd8ff64c63b850cfcada5d69718ee7c8d595f079.jpg)

文件fd的流缓冲区 FILE由缓冲区起始位置base、下一个可读/写位置 ptr 以及剩下未读/写的字节数 cnt来描述。标准I/O库函数中表示文件的参数通常是一个指向FILE结构的指针fp。

对于像fread这种读文件的函数，其FILE是一个在内存的输入流缓冲区。图6.7给出了输入流缓冲区的工作原理。虽然fread函数的功能是从文件中读信息，但实际上是从FILE缓冲区的ptr处开始读信息，而缓冲区中的信息则是从文件fd中预先读人的。每次执行读操作时，会先判断当前缓冲区中是否还有可读信息。若没有（即cnt=0)，则从文件fd中读人1024字节（缓冲区大小BUFSIZ=1024）到缓冲区，并置pt等于base，cnt等于1024。若从缓冲区读出 n 字节，则新的 ptr 等于 ptr 加 n，cnt 等于 cnt 减 n。

对于像fwrite这种写文件的函数，其FILE是一个在内存的输出流缓冲区。图6.8给出了输出流缓冲区的工作原理。虽然fwrite函数的功能是向文件中写信息，但实际上是先写到FILE输出流缓冲的ptr处，在满足某种条件时才把缓冲区的信息写到文件fd中。

![](images/416fe5641c839080a8d25df87d26f06be341599cff0f8872269e7f351f7d25ba.jpg)  
图6.7 输入流缓冲区的工作原理

![](images/460b15eb608f213adcaf3e541f93825199f1574f6366fecadfd98c20ad101f0c.jpg)  
图6.8 输出流缓冲区的工作原理

输出缓冲区的属性有三种：全缓冲\_IOFBF（fully buffered)、行缓冲\_IOLBF（line buff-ered)，非缓冲\_IO\_NBF(no buffering)。这里，全缓冲的含义是，即使遇到换行符也不会写文件，只有当缓冲区满时才会将缓冲区内容真正写人文件fd中；行缓冲的含义是，遇到换行符或者缓冲区满就将缓冲区内容写文件fd；非缓冲的含义是直接写到文件fd中。普通文件的缓冲区属性为全缓冲。

对于全缓冲属性，每次执行写操作时，先判断当前缓冲区是否已写满（即cnt=0)，对于行缓冲属性，则判断本次写的字节流中是否有换行符\n或者是否缓冲区已满。若是，则将缓冲区信息一次性写到文件fd中，并置 ptr等于base，cnt等于1024。若写入缓冲区n字节，则新的 ptr 等于 ptr 加 n，cnt 等于 cnt 减 n。

## 2. 标准文件

在上述stdio.h文件中，定义了三个特殊的标准文件，分别是标准输入（stdin)、标准输出（stdout）和标准错误（stderr），它们分别定义为打开的文件列表中的前三个文件，对应的文件描述符fd分别是0、1和2，它们在结构数组\_iob中前三项的初始化定义如下：

![](images/a8d9b6804278390369efb5d0b81812e8d8de1c747189e766563b72d3edd6b15b.jpg)

这三个标准文件的流缓冲区的初始化信息相同，其起始位置base、下一个可读/写位置ptr 以及剩下未读写字节数 cnt 都被初始化为0。标准输入 stdin 的访问模式是只读(\_READ)，标准输出 stdout 和标准错误 stder 的访问模式都为可写（\_WRITE），但 stdout 的缓冲区属性为行缓冲，当缓冲区满或遇到换行符\n时，将缓冲区数据写文件；而stder为非缓冲(UNBUF)，因此，每个字符直接写文件。

## 3. 系统级I/O 函数与标准VO 库函数的比较

从6.2.2小节和6.2.3小节可知，系统级V/0函数中对文件的标识是文件描述符fd，而C 标准V/O库函数中对文件的标识是指向 FILE结构的指针fp，FILE结构将文件fd封装成一个文件的流缓冲区，因而可以将文件中一批信息先读入缓存，然后再从缓存中分次读出，或者先写入缓存，写满缓存或遇到换行符后再一次性把缓存信息写到文件中。

系统级V0函数的功能通过执行内核中的系统调用服务例程来实现。在用户程序中每调用一次系统级I0函数，就是进行一次系统调用。每次系统调用都有两次上下文切换，先从用户态切换到内核态，处理结束后再从内核态返回到用户态，因此，系统调用的开销非常高。

例如，在IA-32中，系统调用属于陷阱类异常，因此，在从用户态切换到内核态的过程中，CPU需要在异常响应阶段进行一系列操作，包括访问系统中的中断描述符表（IDT)；将当前特权级与段描述符表中的特权级比较，以检测是否发生存储保护错；从用户栈切换到内核栈；将用户栈顶指针、标志寄存器和断点信息等保存到内核栈中：最后将对应异常处理程序（如Linux系统中的system\_call(）函数对应程序模块）的首地址（系统启动过程中，OS已对IDT进行了初始化，对应地址信息已填写在IDT表中）送到CS:EIP寄存器，从而在下个时钟到来后，进入内核态进行处理。

由此可见，每次系统调用会增加许多额外开销，因而，如果能够不用系统调用则应尽量不使用系统调用或尽量减少系统调用次数。

## 小提示

在IA-32的保护模式下，并不是像实地址模式那样将异常处理程序或中断服务程序的入口地址直接填入00000H\~003FFH存储区，而是借助于中断描述符表来获得异常处理程序或中断服务程序的入口地址。每个表项中都包含一个16位的段选择符和32位的偏移地址。段选择符用来指示异常处理程序或中断服务程序所在段的段描述符在全局描述符表（GDT）中的位置，偏移地址则给出异常处理程序或中断服务程序第一条指令所在偏移量。关于Intel架构的段页式虚拟存储机制和异常/中断机制请参看Intel架构的指令系统手册。

在C标准V0库函数中引入流缓冲区，可以尽量减少系统调用的次数。使用流缓冲区后，可以使用户程序仅和缓冲区进行信息交换，将文件内容缓存在用户缓冲区中，而不是每次都直接读/写文件，从而减少执行系统调用的次数。

## 4. 使用流缓冲区来减少系统调用次数

stdio. h头文件给出了feof、ferror、fileno、getc、putc、getchar、putchar等宏定义。以下通过getc宏定义来说明如何使用流缓冲区来减少系统调用次数。

从 stdio.h中的 getc 定义可以看出，通常情况下，getc 只要对文件对应流缓冲区的指针进行修改（如cnt减1，ptr加1）并返回缓冲区中当前所指字符即可，只有在流缓冲区的cnt减1后为负数（说明缓冲区中已经没有字符可读）时，才调用函数\_fillbuf()来填充缓冲区。

通常在第一次调用getc时，需要调用\_fillbuf函数进行缓冲区填充。如图6.9所示，在\_fillbuf函数中，若发现文件的打开模式不是\_READ（对应mode为r’的情况）时，就立即返回EOF；否则，它会通过malloc函数试图分配一个缓冲区（如果是带缓冲读写的情况)。一旦缓冲区建立后，fillbuf就会执行read系统调用，以读入最多1024（BUFSIZ =1024)个字节到缓冲区中，并设定读/写指针 ptr 和剩余字节数 cnt 等。图 6.9中给出的fillbuf 函数源代码摘自 Brian W. Kernighan 和 Dennis M. Ritchie 编著的 The C ProgrammingLanguage (Second Edition)。

![](images/facbff8ea4dbdeafab5355d82a81dd765a6d0d1c4cdddbf91326e16372d74c89.jpg)  
图6.9 分配并填充缓冲区函数fillbuf()的实现

假定有一个重复调用getc共n次的应用程序，第一次调用getc时，实际上一下子通过read读入了1024个字节到流缓冲区中，以后每次调用就只要从该流缓冲区读取并返回字符即可。这样，若n<1024，则执行read系统调用的次数为1。如果应用程序直接调用函数read且每次只读一个字符，那么，应用程序就要执行n次read系统调用，从而增加许多额外开销。

例6.1 假设函数filecopy的功能是从一个输入文件复制信息到另一个输出文件，比较以下两种实现方式下系统调用的次数。

![](images/d306c6477117931305a753e79b020465f36d1c6ca0c236da9ac4d84d58b001d1.jpg)

解：显然，方式二的系统调用次数更多，因为每次调用read和write都只读/写一个字符，因此，当文件长度为n字节时，共需执行2n次系统调用。方式一用getc读取输入文件中的字符，第一次读取文件时会通过read系统调用将最多1024个字符一次读入流缓冲区，这样，以后每次读取字符时可直接从流缓冲区读入，而无须调用read函数，因而，若输入文件长度小于1024字节，则 read和 write系统调用都仅需1次。

前面已经提过，C标准I/0库函数和宏是基于底层的系统调用函数实现的，从上述函数fillbuf()的实现也可以看出这一点。

## 5. C 标准VO 库函数的实现

以下用标准库函数fopen的实现作为例子来说明如何基于底层的系统级I/O函数实现C标准I/O库函数。fopen的用法如下：

fopen函数的功能是打开指定文件name，具体来说，函数将分配一个FILE结构，并初始化其中的流缓冲区，返回指向该FILE结构的指针，若打开文件失败，则返回NULL（-1)。

参数mode指出用户程序将如何使用文件，可以是“rwab+”中的一个或多个字符构成的字符串，例如，“r”“w”“a”“a+b”等。各字符的含义如下：

a（append)表示追加写，当前写人位置初始化为文件尾部。

r（read）表示只读，文件必须存在，且当前读出位置初始化为文件头部。

w（write）表示只写，若文件不存在，则自动创建该文件，否则将该文件截断到0字节。当前写入位置初始化为文件头部。

+(updata)表示允许读/写该文件。如果和r或w一起使用，则当前读/写位置初始化为文件头部。如果和a一起使用，则当前写入位置初始化为文件尾部；但C语言标准和POSIX标准均未定义当前读出位置的初始值，对此，不同系统的具体实现可能不同，如glibc将该初始值设为文件头部，BSD则设为文件尾部。

b（binary）表示文件按二进制形式打开，否则按文本形式打开。但由于包含Linux在内的POSIX兼容系统不区分文本文件和二进制文件，因此该字符只用于与C89语言标准保持兼容，没有实际作用。

假定系统级 I/O 函数定义包含在头文件 syscalls. h 中，C 标准库函数 fopen()的一种实现版本如图6.10所示。

```c
#include <fcntl.h>
#include “syscalls.h”
#define PERMS 0666 /* RW for owner, group, others */
/* fopen: open files, return file ptr */
FILE *fopen(char *name, char *mode)
int fd;
FILE *fp;
if (*mode != ‘r'&& *mode!= ‘w'&& *mode!= ‘a')
retum NULL;
for (fp = _iob; fp < _iob + OPEN_MAX; fp++)
if ((fp->flag &(_READ| _WRITE)) == 0)
break; /* found free slot */
if (fp >= _iob + OPEN_MAX) /* no free slots */
return NULL;
if (*mode == w') fd = creat(name, PERMS);
else if (*mode == ·a') {
if ((fd = open(name, O_WRONLY, 0)) == −1)
fd = creat(name, PERMS);
Iseek(fd, 0L, 2);
} else fd = open(name, O_RDONL Y, 0);
if(fd == -1) return NULL; /* 文件名 name 不存在 */
fp->fd = fd;
fp->cnt = 0;
fp->base = NULL;
fp->flag = (*mode = r') ? _READ : _WRITE;
return fp;
```  
图 6.10 C 标准库函数 fopen()的一种实现版本

图6.10给出的实现版本没有对所有访问模式进行处理，缺少了针对“b”和“+”情况的处理。函数首先检查参数mode是否合法，若不合法，则返回NULL表示打开文件失败。然后从\_iob数组中寻找一个空闲的FILE项，若\_iob数组已满，则表示该用户程序打开的文件数量已达到最大值，此时返回NULL表示打开文件失败。接下来根据参数mode尝试通过不同的方式打开文件，若为w，则用creat函数打开或创建文件，此时若文件已存在，则将其截断到0字节；若为a，则先尝试通过open函数打开文件，打开失败时再尝试通过 creat函数创建文件，在该情况下，若文件已存在，open函数将打开成功，从而避免被creat函数截断文件，再通过lseek()函数将当前写入位置设为文件末尾，以实现追加写的功能；若为r.则只尝试通过open函数打开文件。若上述函数出错，则返回NULL，表示打开文件失败。最后在空闲FILE结构中填写文件信息，并将该FILE 结构的指针作为fopen的返回值返回。

从图 6.10 可看出，fopen 通过系统调用 open 和 creat 实现。在用 fopen 打开文件后，就可对其进行读/写。通常，第一次读取一个打开的文件时，会像函数\_filbuf实现的那样，先将文件中的一块数据读出填充到文件对应的流缓冲区，以后若需要读取这一块数据中的信息，就可以从对应的流缓冲区读取。

## 6.3 内核空间 I/O 软件

所有用户程序中提出的V0请求，最终都通过系统调用封装函数中的陷阱指令转人内核空间的VO软件执行。内核空间的I/O软件由三部分组成，分别是与设备无关的VO软件、设备驱动程序和中断服务程序，后两部分与I0硬件密切相关。

## 6.3.1 设备无关V/0 软件层

一旦通过陷阱指令调出系统调用处理程序（如Linux中的system\_call）执行，就开始执行内核空间的I/O软件。首先执行的是与具体设备无关的I/0软件，主要包括文件系统、缓存层以及通用块设备I0层等，它们用于完成所有设备公共的I/0功能，并向用户层软件提供统一接口。

## 1. 文件系统概述

用户空间应用程序中任何文件操作或设备V0请求都通过调用I/O库函数及其系统级I/0函数，并进入操作系统内核中的系统调用服务例程（如sys\_write）进行处理。系统级I/0函数中的 creat 和 open函数将文件名和文件描述符 fd 建立关联，随后 read、write 和 lseek等函数可通过fd找到对应的文件进行具体操作，同时，也可通过文件名或fd查看文件元数据信息。那么，操作系统内核如何实现这些系统调用的功能？这就是文件系统所要实现的任务。

一方面，文件系统要为上层的用户和应用程序提供文件抽象以及文件的创建、打开、读/写和关闭等所有操作接口；另一方面，文件系统需要将抽象的文件标识（文件名和文件描述符）与具体的硬件设备建立关联，并通过相应的设备驱动程序实现系统调用接口规定的操作。要实现这些功能。文件系统必须提供一套用于存储和管理文件数据及其元数据的机制。

对于普通文件，其数据及元数据信息通常存储在存储设备中，文件系统以特定的存储结构管理存储设备中的所有信息。对于FAT、NTFS、Ext4等文件系统，其存储结构各不相同。为了在一个计算机系统中同时支持不同文件系统，Linux在具体文件系统所在的逻辑文件系统层上面增加了虚拟文件系统（Virtual File System，VFS）层，提供基于索引节点（IndexNode，简称inode)的一系列内存数据结构，实现对下面的逻辑文件系统层的抽象和封装，并为上层应用程序提供统一的文件操作接口。Linux的VFS提供了超级块、目录项、inode等内存数据结构。

VFS超级块中保存了文件系统的通用元数据信息，如文件系统的类型、版本等。每个文件系统都有对应的一个VFS超级块，VFS借助超级块中记录的信息管理多个文件系统。

VFS的目录项中保存了文件名和对应inode号等信息。目录本身是一种文件，称为目录文件，因而有其对应的inode和数据信息，后者由若干目录项组成，每个目录项对应目录中的一个文件。当应用程序打开一个文件时，VFS通过目录文件对文件名进行路径解析，找到相应的目录项，从而获得对应的inode号。当应用程序创建一个文件时，VFS将会在相应目录中创建一个目录项，该目录项对应创建的新文件。

由open或creat函数指定的文件名可能是以“/”开头的绝对路径名，也可能是不以“”开头的相对路径名。绝对路径名从根目录开始查找，相对路径名从当前工作目录开始查找。

VFS为每个进程维护一个当前工作目录，例如，若当前工作目录为“/myfiles”，则语句“fd=open(“test. txt”，O\_RDONLY,0);”所打开的文件名实际上是“/myfiles/test. txt”，VFS从当前工作目录对应的目录文件myfiles开始进行路径解析，找到该目录文件中文件名“test. txt”对应的目录项，从而得到“test. txt”的 inode号，这种情况下，VFS将返回一个非负整数作为文件描述符fd。若在myfiles目录文件中找不到文件名“test. txt”对应的目录项，则返回“路径不存在”的错误信息。

VFS中的inode用于保存每个文件（包括普通文件、目录文件、套接字文件、字符设备文件、块设备文件等）的元数据信息，如文件大小、文件所有者、文件访问权限，以及文件类型等，也包括文件数据的寻址信息，利用该寻址信息可以找到文件数据本身。每个文件对应一个inode，系统中所有打开的文件对应的inode组成一张所有进程共享的inode表。

VFS为系统中所有打开的文件维护了一张系统文件表，因此。该表也称为系统打开文件表。该表由所有进程共享，每个表项对应一个打开的文件。inode表中维护的是对应文件在存储设备上的元数据信息，而系统文件表维护的是对应文件的动态信息，即该文件打开的情况，包括inode指针（用于指向inode表中对应表项）、当前读/写位置、打开模式、引用计数等。同时，VFS为每个进程维护了一个打开文件描述符表，进程所打开的每个文件对应一个表项，其索引就是打开文件的文件描述符fd，每个表项中有一个指针，指向系统文件表中对应文件的表项。因此。根据文件描述符fd就可获得对应文件的当前读/写位置等动态信息，同时，也可以通过其inode指针找到对应inode表项，以获得文件的所有元数据信息，包括文件数据的寻址信息，从而从文件的指定位置进行读/写。

图6.11所示给出了某一时刻系统中调用fork函数后子进程继承父进程的打开文件的情况，子进程的打开文件描述符表是父进程的副本，两个进程中除了自动打开的三个标准文件外，还打开了其他两个文件A和B，并且两者在系统文件表中的inode指针都指向了inode表中的同一个inode表项，说明在父进程对同一个文件调用了两次open函数，返回的文件描述符fd分别为3和 $4 \phantom { . 0 }$ 因为不同文件描述符对应的当前读/写位置不同，因而可以通过不同的文件描述符（fd=3和fd=4）从同一个文件的不同位置读取数据信息。系统文件表中的引用计数表示当前指向该表项的文件描述符表项数，该例中文件A和B对应的表项都有两个文件描述符表项（父进程和子进程中各一个）所指向，因而引用计数都为 $2 _ { \circ }$ 通过调用close函数关闭文件时，将根据指定文件描述符释放当前进程的文件描述符表项，同时该表项指向的系统文件表的表项中引用计数减1，若减1后为0，说明当前没有进程打开该文件。此时系统将释放该表项及相关资源。

![](images/81d26417048d458858a508471a35ad939fa6667a3b12710afff7f5e9a56e8968.jpg)  
图6.11 子进程继承父进程的打开文件且两个文件描述符共享同一个文件

例 6.2 在 Linux 系统中，假设当前文件目录中硬盘文件 test. txt 由 4 个 ASCI 码字符“test”组成，下列程序的输出结果是什么？

```c
1#include <stdio. h>
2#include <fcntl. h>
3#include <unistd. h>
4
5 int main() {
6 int fd1, fd2;
7 char c;
8
9 fd1 = open(" test. txt", O_RDONLY, 0);
10 fd2=open(" test. txt", O_RDONLY, 0) ;
11 read(fd1,&c,1);
12 read(fd2, &c, 1);
13 printf(" fd1 = %d,fd2= %d,c=%c\n",fd1,fd2,c);
14 return 0;
15
```

解：Linux中前3个文件描述符0、1、2分别分配给自动打开的三种标准设备文件stdin、stdout 和 stderr，而 open 函数的返回值从3开始分配，因此 fd1和fd2分别为3和4。每次打开一个文件时，Linux的VFS通过路径解析找到该文件的inode后，除了会分配一个文件描述符以外，还会分配一个对应的系统文件表表项，并对其进行初始化，将inode指针、打开模式等信息填人相应的字段，将当前读/写位置设为 $0 _ { \circ }$ 因此，fd1和fd2对应的系统文件表项中当前读/写位置都为0，都指向字符串“test”中的字符“t”。综上，该例程序输出的结果为 $^ { \iota \epsilon } { \mathrm { f d } } 1 = 3 , { \mathrm { f d } } 2 = 4 , { \mathrm { c } } = { \mathrm { t } } ^ { \prime \prime }$

为了简化对外设的处理，文件系统将所有外设都抽象成文件，设备名和文件名在形式上没有任何差别，因而统称为设备文件名。文件系统负责将不同的设备名和文件名映射到对应的设备驱动程序。

在UNIX/Linux系统中，除了普通文件和目录文件外，还有一类特殊文件，包括设备文件、链接文件等，设备文件又分为块设备文件和字符设备文件，前者主要用于磁盘类设备，后者主要用于各类输入输出设备，如终端、打印机和网络等。一个设备名能唯一确定相应设备文件的inode，其中包含主设备号和次设备号，主设备号确定设备类型（如USB设备，硬盘设备），用于指定设备驱动程序，次设备号作为参数传递给设备驱动程序，用于指定系统中具体的设备。更多细节请参看操作系统方面的资料。

## 2. 缓存层

I0设备的工作速度较慢，为了提升I/O请求的处理效率，操作系统充分利用数据访问的局部性特点，在内核空间对应主存区中开辟一块空间作为高速缓存，用于存储最近访问的文件数据。作为高速缓存的主存RAM区可称为高速缓存RAM。传统的外部存储器是磁盘，因此上述高速缓存也称为磁盘高速缓存(DiskCache)。虚拟文件系统首先检查用户请求访问的数据是否在该缓存中，若是，则直接访问缓存，无须通过V0请求访问外存中的数据；否则调用逻辑文件系统提供的功能，将该请求翻译成访问外存中若干存储块的V0请求，并提交到通用块设备V0层进行后续处理。缓存中存放的信息包括写人文件的数据、从磁盘读出的磁盘块等信息，缓存通常采用回写策略，操作系统每隔一段时间将缓存内容真正写入设备中，以保证数据的永久存储。

有了磁盘高速缓存，磁盘读/写次数可大幅减少，用户的V0请求能得到快速响应。例如，假定一个磁盘逻辑块的大小为4KB，若用户程序首先请求读取某磁盘文件中80B数据，但数据不在缓存中，此时操作系统会读取该数据所在的一个磁盘逻辑块，并将读出的4KB数据存入缓存。根据数据访问的局部性原理，该用户程序随后请求读出的信息很有可能在刚被读出的磁盘逻辑块中，因而随后请求的数据可快速从缓存中读取，而无须读磁盘。同样。用户程序需要写入磁盘文件的数据可先写入缓存，多次写入缓存的数据可一次性写磁盘，而不必每次都写磁盘。

对于像函数 read、write等常规文件的读/写操作，其指定的数据缓冲区（即参数buf所指区域）位于用户空间，而磁盘高速缓存位于内核空间，因此一次文件读写操作需要在用户空间和内核空间之间、内核空间和外存之间进行两次复制传送。

## 3. 通用块设备I/O 层

通用块设备I0层提供了所有像磁盘、SSD和光盘之类块设备的统一抽象，负责调用具体的设备驱动程序向设备发起V0请求。同时，通用块设备I/0层为这类设备设置统一的逻辑块大小。例如，无论磁盘扇区和光盘扇区有多大，所有逻辑数据块的大小均相同。高层的文件系统只需与这一抽象设备交互，从而简化了数据定位等处理。

通用块设备I/0层还提供了V/O请求调度功能，从逻辑文件系统发出的设备I0请求会进人请求队列，I/O请求调度器可进一步调度请求队列中的IO请求，包括合并多个连续的相邻请求，对请求重排序以优化IO访问时间等。例如，针对磁盘设备，可对若干磁盘访问请求进行重排序，以降低磁盘的寻道时间和旋转等待时间，从而优化磁盘的存取时间。

## 6.3.2 设备驱动程序

设备驱动程序是与设备相关的V0软件部分。每个设备驱动程序只处理一种外设或一类紧密相关的外设。每个外设或每类外设都有一个设备控制器，其中包含各种VO端口。通过执行设备驱动程序，CPU可以向控制端口发送控制命令来启动外设，可以从状态端口读取外设或其设备控制器的状态，也可以与数据端口交换数据等。CPU通过VO指令访问设备中的 I/O 端口，I/O 指令与指令集体系结构相关。Linux 中提供了 readb 和 writeb 等抽象，用于从I/0端口中读出或向I/O端口写入一个字节。

设备驱动程序的实现方式与设备的IO控制方式相关。IO控制方式主要有三种：程序直接控制、中断控制和DMA控制。

## 1. 程序直接控制 V0 方式

程序直接控制VO方式的基本思想是直接通过查询程序来控制主机和外设的数据交换，因此，也称为查询或轮询（Polling）方式。该方式在查询程序中通过IO指令读出外设或其设备控制器的状态后，根据状态来控制外设和主机的数据交换。

下面以打印字符串为例说明其基本原理。假定用户程序P中调用了某VO函数，请求打印机打印字符长度为n的字符串。显然，P通过一系列过程调用后，会通过一个系统级VO函数（如open）来打开设备文件。若打印机空闲，则用户进程可正常使用打印机，可通过另一个系统级I/0函数（如write）对打印机设备文件进行写操作，从而陷入操作系统内核打印字符串。

如图6.12所示，假设设备无关的L/0软件已将用户进程缓冲区中的字符串复制到内核空间（kernelbuf)，驱动程序首先读取打印机状态端口（printer\_status\_port）查看打印机是否就绪。若未就绪，则等待并重新检测状态端口。打印机就绪后，驱动程序将内核空间缓冲区中的-一个字符输出到打印机控制器的数据端口（printer\_dala\_port）中，并向打印机控制器的控制端口（printer\_control\_port）发出“启动打印”命令，以控制打印机打印数据端口中的字符。上述过程循环执行，直到字符串中所有字符打印结束。

![](images/3b05c084eca86897a601616b79fd7bf649d3f6bc66b477aa7fff3ce35a61d36c.jpg)  
图6.12 程序直接控制V0的一个例子

打印机的“就绪”和“缺纸”等状态记录在打印机控制器的状态端口中。接收到“启动打印”命令后，打印机控制器自动将“就绪”状态清0，表示当前正在工作，无法接收新的打印任务；打印完当前数据端口中的字符时，打印机控制器自动将“就绪”状态置1，表示数据端口已准备就绪，CPU可以向数据端口送入下一个的欲打印字符。

若采用程序直接控制I0方式。则驱动程序的执行与外设的VO操作完全串行，驱动程序需等待用户进程的全部V0请求完成后，才返回到上层V0软件，最后再返回到用户进程。此方式下，用户进程在I/0过程中不会被阻塞，内核空间的V0软件一直代表用户进程在内核态进行VO处理。

程序直接控制V0方式的特点是简单、易控制，设备控制器中的控制电路也简单。但是，CPU需要从设备控制器中读取状态信息，并在外设未就绪时一直处于忙等待。如果外设的速度比CPU慢很多，CPU等待外设完成任务将浪费大量处理器时间。

## 2. 中断控制I/0 方式

中断控制VO方式的基本思想是，当需要进行V0操作时，首先启动外设进行第一个数据的IO操作，然后阻塞请求VO的用户进程，并调度其他进程到CPU上执行，期间，外设在设备控制器的控制下工作。外设完成VO操作后，向CPU发送一个中断请求信号，CPU检测到该信号后，则进行上下文切换，调出相应的中断服务程序执行。中断服务程序将启动后续数据的VO操作，然后返回到被打断的进程继续执行。例如，对于上述请求打印字符串的用户进程P的例子，如果采用中断控制VO方式，则驱动程序处理VO的过程如图6.13所示。

![](images/826210e6449a25c81f263c227480ccc242e1b08f644641f02b7b309bc19e3fc0.jpg)  
b)“字符打印”中断服务程序  
图6.13 中断控制V/0 的一个例子

从图6.13a可看出，驱动程序启动打印机后，就调用处理器调度程序scheduler切换到其他进程执行，而阻塞用户进程P。在CPU执行其他进程的同时，打印机和CPU并行工作。若打印机打印一个字符需要5ms，则期间其他进程可在CPU上执行5ms的时间。对于程序直接控制I/O方式，CPU在这5ms内只是不断地查询打印机状态，因而整个系统效率很低。

## 小提示

在多道程序（多任务）系统中，单个处理器可以被多个进程共享，即多个进程可以轮流使用处理器。为此，操作系统必须使用某种调度方法决定何时停止一个进程在处理器上的运行，转而使处理器运行另一个进程。操作系统中使用某种调度方法进行处理器调度的程序称为处理器调度程序。

简单来说，一个进程有三种基本状态：运行、就绪和阻塞。正在处理器上运行着的进程处于运行态；可以被调度到处理器运行但因为时间片到等原因被换下的进程处于就绪态；因为某种事件的发生而不能继续在处理器上运行的进程处于阻塞态。处于阻塞态的进程也称为被挂起，典型的处于阻塞态进程的例子就是等待IO完成的进程，因为I0操作没有完成的话，进程便无法继续运行下去。处于就绪态的进程可能有多个，为方便选择就绪态进程运行，通常将所有就绪态进程组成一个就绪队列，解除阻塞的进程可进入就绪队列。

中断控制I/0方式下，外设一旦完成任务，就会向CPU发中断请求。对于图6.13的例子，当一个字符打印结束后，打印机就会发中断请求，CPU将暂停正在执行的其他进程，调出“字符打印”中断服务程序执行。如图6.13b所示，中断服务程序首先通知打印机控制器中断已收到，清除中断请求，然后判断是否已完成字符串中所有字符的打印，若是，则将用户进程P解除阻塞，将其放入就绪队列；否则，就向数据端口送出下一个欲打印字符，并启动打印，将未打印字符数减1、下一打印字符索引加1。最后CPU从中断服务程序返回，回到被打断的进程继续执行。

图6.14 和图6.15描述了中断控制I/0的整个过程。

![](images/532d41e9c555b698568f83f67effebc6ad014ea23539887322d1d7112e90a107.jpg)  
图 6.14 中断控制 V/0 过程

![](images/8fd1cd043d08d2a675b1bbe1c4f39f796a40d9dd5d2fc6a68728f683763116b4.jpg)  
图 6.15 CPU 与外设并行工作

计算机系统中可能会存在多个可发送中断请求信号的设备，甚至一些复杂设备支持发送多种中断，它们称为中断源。硬件对不同的中断源编号加以区分，该编号称为中断号。驱动程序初始化时向操作系统注册相应的中断服务程序，同时将中断号作为参数，指示将该中断服务程序绑定到该中断号。CPU响应中断后，可查询触发本次中断的中断号，然后根据中断号查询相应的中断服务程序并调用。

中断控制VO方式下，每次执行中断服务程序仅传送一个数据。例如，对于上述字符串打印的例子，每次中断都只打印一个字符。但是，为了响应中断请求和执行中断服务程序，CPU额外执行了许多操作，包括保存断点和程序状态字、保存现场、查询中断号、调用中断服务程序等。对于硬盘、网卡等高速设备，若采用中断控制方式，则CPU将会由于外设传输数据速度快而频繁响应和处理中断，从而影响整个系统的效率。

以下例子说明中断控制VO方式下，CPU用于硬盘I/O的开销。

例6.3 假定某字长为 32位的单核CPU 主频为 3GHz，某硬盘传输带宽为 128 MB/s，硬盘控制器中有一个512B的数据缓存。系统中有A和B两个用户进程，其中A为VO密集型程序，不断从硬盘读出数据；B为计算密集型程序，一直在用户态进行科学计算。假设系统使用中断I/O方式进行硬盘数据传输，每次中断传输512B数据，CPU从硬盘VO端口中读出一个字需要24个CPU时钟周期。系统的工作过程如下：①A通过系统调用函数read读取4KB数据，从A发起系统调用到驱动程序向硬盘发出读命令，需要3μs；②驱动程序向硬盘发出读命令，然后阻塞A并调度B，并通过上下文切换返回到B，需要1.5μs；③B执行一段时间；④硬盘读数据完成后发送中断请求，CPU响应中断后查询中断源，并调出硬盘中断服务程序，需要0.5μs；⑤硬盘中断服务程序从V0端口中依次读出硬盘控制器数据缓存中的512B数据；⑥反复执行第②\~⑤步，直到读出总计4KB数据；⑦唤醒A后切换到A的上下文，并从系统调用返回用户态，需要3μs；⑧跳转到第①步，重复上述过程。问：硬盘实际的数据传输率为多少？CPU运行进程B的时间占比为多少？

解：硬盘采用中断V0方式，每次中断传输512B数据，故传输4KB数据需要处理8次中断，每次传输512B数据需要 $\ S 1 2 \mathrm { B } / ( 1 2 8 \mathrm { M B / s } ) = 4 \mu \mathrm { s } .$ 。由于该CPU字长为32位，一次最多只能从I/0端口中读出4B数据，故从I/0端口中读出512B数据需要512B/4B×24=3072个时钟周期，即 $3 0 7 2 / 3 \mathrm { G H z } = 1 \ \mu \mathrm { s } .$ 。综上，从驱动程序发出读命令，到CPU从VO端口中读出全部数据，需要 $4 ~ \mu \mathrm { s } + 0 . 5 ~ \mu \mathrm { s } + 1 ~ \mu \mathrm { s } = 5 . 5 ~ \mu \mathrm { s }$ ，上述一轮工作（即A从发起系统调用到系统调用完成）需要3 ${ \mu \mathrm { s } } + 5 . 5 { \mu \mathrm { s } } \times 8 + 3 { \mu \mathrm { s } } = 5 0 { \mu \mathrm { s } } .$ 。在一轮工作中，硬盘实际工作的时间占比为$( 4 \mu \mathrm { s } \times 8 ) / 5 0 \mu \mathrm { s } = 6 4 \%$ ，故硬盘实际的数据传输率为 $1 2 8 ~ \mathrm { M B / s } \times 6 4 \% = 8 1 . 9 2 ~ \mathrm { M B / s }$ ；在一次硬盘传输的过程中，进程B执行的时间为 $4 ~ \mu \mathrm { s } - 1 . 5 ~ \mu \mathrm { s } = 2 . 5 ~ \mu \mathrm { s }$ ，故 CPU运行进程 B 的时间占比为 $( 2 . 5 \mu \mathrm { s } \times 8 ) / 5 0 \mu \mathrm { s } = 4 0 \%$

对于程序查询方式，在外设准备数据时，CPU一直在等待外设完成（忙等待），因此CPU用于VO的时间为100%。对于中断VO方式，在外设准备数据时，CPU可执行其他进程，外设和CPU并行工作，因而CPU在外设准备数据时没有VO开销，只有在中断响应和处理以及进行数据传送时CPU才需要花费时间为IO服务。当外设工作效率较低时，采用中断IO方式可大幅降低CPU用于VO的开销。

但对于像硬盘这类高速外设的数据传送，若用中断I/O方式，则CPU用于VO的开销是无法忽视的。高速外设速度快，中断请求频率高，导致CPU被频繁打断，使得中断响应和处理的额外开销很大，因此，高速外设不适合采用中断I/O方式，通常采用DMA控制IO方式。

## 3. DMA 控制 I/O 方式

直接存储器访问(Direct Memory Access，DMA） 控制 I/O 方式使用专门的 DMA 接口硬件直接控制在外设和主存之间交换数据，此时数据不经过CPU。通常把该接口硬件称为DMA控制器。

DMA控制器与设备控制器一样，其中也有若干寄存器，包括主存地址寄存器、设备地址寄存器、字计数器、控制寄存器等，还有其他控制逻辑，用于控制设备通过总线与主存直接交换数据。在DMA传送前，应先进行DMA初始化.将需要传送的数据个数、数据所在设备地址以及主存首地址、数据传送方向（从主存到外设还是从外设到主存）等参数写人上述寄存器中。

如图6.16所示，DMA控制I0过程如下：首先进行DMA初始化，然后发送“启动DMA传送”命令启动外设工作。之后，CPU阻塞请求VO的用户进程，转去执行其他进程。在CPU执行其他进程的过程中，DMA控制器控制外设和主存交换数据，此时CPU和外设并行工作。DMA控制器每完成一个数据的传送，就将字计数器减1，并更新主存地址，其功能可看作使用专用硬件来执行memcpy函数。当字计数器为0时，完成所有I/0操作，此时，DMA控制器发送“DMA结束”中断请求信号，CPU检测到中断请求后，暂停正在执行的进程并调出“DMA结束”中断服务程序执行。在该中断服务程序中，CPU解除请求I/O的用户进程的阻塞状态，将其放入就绪队列，然后从中断返回，回到被打断的进程继续执行。

![](images/38ec8f33e0152938a768c9bfd16566e09b1daab543f7f4e94afaba1ff35d7f72.jpg)  
b)“DMA 结束”中断服务程序  
图 6.16 DMA 控制 I/O 过程

DMA控制I/O方式下，CPU只需在最初的DMA初始化和最后处理“DMA结束”中断时介入，而无须参与整个数据传送过程，因而CPU用于I/O的开销非常小。

例6.4 考虑例6.3中的场景，但硬盘采用DMA方式传输数据，每次传输的数据量为4KB。问：硬盘实际的数据传输率为多少？CPU运行进程B的时间占比为多少？若DMA方式每次传输的数据量为32KB，且用户进程A通过系统调用函数read一次读取32KB数据，此时硬盘实际的数据传输率和CPU运行进程B的时间占比各为多少？

解：由于DMA方式每次传输4KB数据，故每次系统调用只需传递一次数据并处理一次中断。每次传输4KB数据需要 $4 \mathrm { K B } / ( 1 2 8 \mathrm { M B } / { \mathrm { s } } ) = 3 2 \mu \mathrm { s }$ ，但由于DMA直接将数据传输到主存，CPU无须从I/O端口中读出数据，故一轮工作（即A从发起系统调用到系统调用完成）需要 $3 ~ \mu \mathrm { s } + 3 2 ~ \mu \mathrm { s } + 0 . 5 ~ \mu \mathrm { s } + 3 ~ \mu \mathrm { s } = 3 8 . ~ 5 ~ \mu \mathrm { s }$ 。在一轮工作中，硬盘实际工作的时间占比为 $3 2 \mu \mathrm { s } /$ $3 8 , 5 \mu \mathrm { s } = 8 3 , 1 2 \%$ ，故硬盘实际的数据传输率为 $1 2 8 ~ \mathrm { M B } / { \mathrm { s } } \times 8 3 . ~ 1 2 \% = 1 0 6 . 3 9 ~ \mathrm { M B } / { \mathrm { s } }$ ；在一次硬盘传输过程中，进程B可执行的时间为 $3 2 ~ \mu \mathrm { s } - 1 . 5 ~ \mu \mathrm { s } = 3 0 . 5 ~ \mu \mathrm { s }$ ，故 CPU 运行进程 B 的时间占比为 $3 0 . 5 \mu \mathrm { s } / 3 8 . 5 \mu \mathrm { s } = 7 9 . 2 2 \%$ 0

相比于例6.3中的中断VO方式，采用DMA方式可使硬盘实际的数据传输率提升29.88%，而CPU运行进程B的时间占比达到了之前的1.98倍。

若DMA方式每次传输的数据量为32KB，则需要花费 $3 2 ~ \mathrm { K B } / ( 1 2 8 ~ \mathrm { M B } / \mathrm { s } ) = 2 5 6 ~ \mu \mathrm { s }$ ，故一轮工作（即A从发起系统调用到系统调用完成）需要 $3 ~ { \mu \mathrm { s } } + 2 5 6 ~ { \mu \mathrm { s } } + 0 . 5 ~ { \mu \mathrm { s } } + 3 ~ { \mu \mathrm { s } } =$ $2 6 2 . 5 { \mu \mathrm { s } } _ { \mathrm { ~ c ~ } }$ 在一轮工作中，硬盘实际工作的时间占比为 $2 5 6 ~ { \mu \mathrm { s } } / 2 6 2 . 5 ~ { \mu \mathrm { s } } = 9 7 . 5 2 \%$ ，故硬盘实际的数据传输率为 $1 2 8 ~ \mathrm { M B / s } \times 9 7 . 5 2 \% = 1 2 4 . 8 3 ~ \mathrm { M B / s }$ ；在一次硬盘传输过程中，进程B可执行的时间为 $2 5 6 ~ { \mu \mathrm { s } } - 1 . 5 ~ { \mu \mathrm { s } } = 2 5 4 . 5 ~ { \mu \mathrm { s } }$ ，故 CPU运行进程B的时间占比为 $2 5 4 . 5 \mu \mathrm { s } /$ $2 6 2 . 5 \mu \mathrm { s } = 9 6 . 9 5 \%$

DMA方式下，数据传送不消耗任何处理器周期，因此，即使硬盘一直在进行VO操作，CPU也仅需要初始化DMA、发送“启动DMA传送”命令，以及处理“DMA结束”中断。在实际场景中，硬盘大多数时间并不工作，因此CPU为IO所花费的时间会更少。当然。若CPU在DMA传送过程中需要访问存储器，则需要与DMA竞争存储器带宽，此时CPU让出总线，由DMA控制器控制总线进行存储访问，DMA挪用一个存储周期完成存储访问后释放总线，CPU再使用总线进行存储访问，这称为周期挪用DAM方式。不过，通过使用cache，CPU可避免大多数访存冲突，因为CPU的大部分访存请求都在cache中命中，因而存储器的大部分带宽都可让给DMA使用。

近年来，超高速外设开始流行，包括SSD、万兆网卡、十万兆网卡等，甚至出现了传输速率接近1Tb/s的太网卡。这类外设的工作速度非常快，即使采用DMA方式，次中断处理也会带来不可忽略的开销。有研究工作指出，通过轮询方式访问超高速外设反而可以使CPU能在更短的时间内完成I/O操作，从而提高I/O响应速度。

当系统中引入DMA方式时，存储层次结构和CPU之间的关系会变得更复杂。没有DMA控制器时，所有访存请求都来自CPU，它们通过MMU进行地址转换，并在 cache缺失时才访问主存。有了DMA控制器后，系统中就多出另一条访问主存的路径，它没有通过MMU和cache。这样，在虚拟存储器和 cache系统中就会产生一些新问题。解决这些问题通常要结合硬件和软件两方面的技术支持。

## 6.3.3 中断服务程序

中断控制IO和DMA控制IO两种方式下，在执行设备驱动程序过程中，都会阻塞当前用户进程并调度其他进程执行；也都会向CPU发送中断请求信号，前者由设备在每完成一个数据的I/0后发送信号，后者由DMA控制器在完成整个数据块的V/O后发送信号。CPU收到中断请求信号后，将调出中断服务程序进行中断处理。

图6.17给出了整个中断过程，包括中断响应和中断处理两个阶段。中断响应完全由硬件完成，包括关中断，保存断点，并跳转到预先设定的中断服务程序，进人中断处理阶段。

中断服务程序包含三个阶段：准备阶段、处理阶段和恢复阶段。准备阶段需要将寄存器

现场保存到栈上，并根据实际情况决定是否需要在中断处理过程中响应并处理其他中断，若是，则进行以下操作：①保存当前的中断屏蔽字，中断屏蔽字用于指示是否允许响应新的中断源：②设置新的中断屏蔽字，从而指定允许在后续的处理阶段中响应哪些中断源；③开中断，允许CPU响应中断。若否，则可省略上述三步操作。中断屏蔽字寄存器是中断控制器中的一个VO端口，由CPU通过I/0指令进行设置。有关中断控制器的介绍参见6.4.5节。

处理阶段需要从中断控制器中读出触发本次中断的中断号，并根据中断号查询相应的中断服务程序，然后调用具体的中断服务。具体的中断服务首先通知设备本次中断已收到，清除中断请求，然后根据设备的具体功能进行处理。由于具体的中断服务与设备紧密相关，因此通常作为设备驱动程序的一部分功能，设备驱动程序在初始化时会向操作系统注册相应的中断服务，同时将中断号作为参数，指示将该中断服务绑定到该中断号。

恢复阶段的工作与准备阶段相反，包括关中断、恢复现场和旧屏蔽字等，最后通过指令集提供的中断返回指令从中断处理过程返回。通常中断返回指令除了返回到程序的断点外，同时还会自动恢复处理器的中断使能位。

![](images/b2581dce5fa7b6ce916ec571f14dd9b6f170a2082e124cd65322f28c10ec58cb.jpg)  
图6.17 中断服务程序的典型结构

在中断处理过程中，若又到来了优先级更高的新中断请求，CPU应立即暂停当前执行的中断服务程序，转去处理新中断，这种情况称为多重中断或中断嵌套，如图6.18所示。

![](images/812389df41af3669589f10b9162213f75b4ed6e5db7175fe2287ac41d4e41801.jpg)  
图6.18 中断嵌套过程

为了正确实现中断嵌套，需要利用栈的特性。如图6.18所示，假定在执行用户进程时，发生了1#中断请求，因为用户进程不屏蔽任何中断，故CPU需响应1#中断，中断响应过程将用户进程的断点K1+1及其程序状态字PSW1保存在栈中，然后调出1#中断服务程序执行。而在处理1#中断的过程中，又发生了2#中断，且2#中断的处理优先级比1#高，也即1#中断服务程序所设置的屏蔽字对2#中断是开放的（对应屏蔽位为1），此时CPU将暂停1#中断的处理，而响应2#中断，中断响应过程将1#中断的断点K2+1及其程序状态字PSW2保存在栈中，然后调出2#中断服务程序执行。同样，若2#中断未屏蔽3#中断，则3#中断也可以打断2#中断的处理。当3#中断处理完返回时，需从栈顶取出断点和程序状态字。因此从3#中断返回后，首先回到2#中断的断点K3+1处，而不是回到1#中断或用户进程执行。

## 6.4 IO 硬件与软件的接口

用户V/O请求通过陷阱指令转入内核，由内核VO软件控制V/O硬件完成。内核空间中底层VO软件的编写与VO硬件的结构密切相关。编写这部分软件的程序员关心的是VO硬件中与软件的接口部分，因此，本节主要介绍与软件相关的VO硬件部分。VO硬件通常由机械部分和电子部分组成，并且两部分通常可以分开。机械部分是VO设备本身，而电子部分则称为设备控制器或VO适配器。

## 6.4.1 输入/输出设备

VO设备又称外围设备、外部设备，简称外设，是计算机系统与人类或其他计算机系统之间交换信息的装置。操作系统为了统一管理VO设备，通常将V0设备分成两类：字符设备和块设备。

字符设备是以字符为单位向主机发送或从主机接收字符流的设备。字符设备传送的字符流不能形成数据块，无法定位和寻址。

通常，大多数输入设备和输出设备都可以看作字符设备。输入设备的功能是把数据、命令、字符、图形、图像、声音或电流、电压等信息，以计算机可以接收或识别的二进制编码形式输入计算机中，例如，键盘、鼠标、触摸屏、跟踪球、控制杆、数字化仪、扫描仪、手写笔、光学字符阅读机等都是输入设备；输出设备的功能是把计算机处理的结果，变成最终可以被人理解的数据、文字、图形、图像和声音等信息。例如，显示器、打印机和绘图仪等都是输出设备。

还有一类主要用于计算机和计算机之间通信的设备，称为机-机通信设备，例如，网络接口、调制解调器、数/模和模/数转换器等。通常，大多数机-机通信设备也可看作字符设备。

块设备以一个固定大小的数据块为单位与主机交换信息。块设备中的数据块大小通常在512字节以上，通常按照某种组织方式对其进行读/写，每个数据块都有唯一的位置信息，因而是可寻址的。典型的块设备是外部存储器，例如，磁盘驱动器、固态硬盘等。

操作系统将所有设备划分成字符设备和块设备两类，主要是为了便于抽象出不同设备的共同特点，从而尽可能多地划分出与设备无关的VO软件部分。例如，对于块设备，文件系统只处理与设备无关的抽象块设备，而把与设备相关的部分放到更低层次的设备驱动程序中实现。

## 6.4.2 基于总线的互连结构

图6.19给出了基于总线互连的传统计算机系统结构示意图，在其互连结构中，除CPU、主存储器以及各种接插在主板扩展槽上的VO控制卡（如声卡、视频卡）外，还有北桥芯片和南桥芯片，这两个超大规模集成电路芯片组成一个芯片组，是计算机中各个部件相互连接和通信的枢纽。芯片组几乎集成了主板上所有的存储器控制功能和IO控制功能，既实现了总线功能，又提供了各种V0接口及相关控制功能。其中，北桥是一个主存控制器集线器(Memory Controller Hub，MCH)芯片，本质上是一个 DMA 控制器，因此，可通过 MCH 芯片，直接访问主存和显卡中的显存。南桥是一个I/O控制器集线器(I/O ControllerHub，ICH）芯片，可集成USB控制器、磁盘控制器、以太网控制器等各种外设控制器，也可通过南桥芯片引出若干主板扩展槽，用以接插一些IO控制卡。

![](images/83f81fb9cc558b1548609ab491314d81be7a45cc7bd3dfca4716b23a9c92aaba.jpg)  
图6.19 外设、设备控制器和CPU及主存的连接

如图6.19所示，CPU与主存之间由处理器总线（也称为前端总线）和存储器总线相连，各类I/O设备通过相应的设备控制器（如USB控制器、以太网卡、磁盘控制器）连接到IO总线上，而VO总线通过芯片组与主存和CPU连接。

传统上，总线分为处理器一存储器总线和I/O总线。处理器一存储器总线比较短，通常是高速总线，有的系统将处理器总线和存储器总线分开，中间通过北桥芯片（桥接器）连接，CPU芯片通过CPU插座插在处理器总线上，内存条通过内存条插槽插在存储器总线上。

下面对处理器总线、存储器总线和V0总线进行简单说明。

## 1. 处理器总线

早期Intel 微处理器的处理器总线称为前端总线(Front Side Bus，FSB)，它是主板上最快的总线，主要用于处理器与北桥芯片之间交换信息。

FSB的传输速率单位实际上是MT/s，表示每秒钟传输多少兆次。通常所说的总线传输速率单位MHz是习惯上的称呼，实质是时钟频率单位。早期的FSB每个时钟传送一次数据，因此时钟频率与数据传输速率一致。但是，从Pentium Pro开始，FSB采用4倍并发（QuadPumped)技术，在每个总线时钟周期内传4次数据，即总线的数据传输速率等于总线时钟频率的4倍，若时钟频率为333MHz，则数据传输速率为1333MT/s，即1.333GT/s，但习惯上称1333MHz。若前端总线的工作频率为1333MHz（实际时钟频率为333MHz)，总线的数据宽度为64位，则总线带宽为10.664GB/s。

Intel 公司推出 Core i7 时，北桥芯片的功能被集成到了 CPU 芯片内，CPU 通过存储器总线（即内存条插槽）直接和内存条相连，而在CPU芯片与其他CPU芯片之间，以及CPU芯片与 IOH（Input/Output Hub）芯片之间，则通过 QPI（Quick Path Interconnect) 总线相连。

QPI总线是一种基于包传输的高速点对点连接协议，采用差分信号与专门的时钟信号进行传输。QPI总线有20条数据线，发送方（TX）和接收方（RX）有各自的时钟信号，每个时钟周期传输两次。一个QPI数据包包含80位，需要两个时钟周期或4次传输才能完成整个数据包的传送。在每次传输的20位数据中，有效数据占16位。其余4位用于循环冗余校验，以提高系统的可靠性。由于QPI是双向的，在发送的同时也可以接收另一端传输的数据，因此，每个QPI总线的带宽计算公式如下。

## 每秒传输次数×每次传输的有效数据×2

QPI 总线的速度单位通常为 GT/s，若 QPI的时钟频率为2.4 GHz，则速度为 4.8 GT/s，表示每秒钟传输4.8G次数据，并称该QPI工作频率为4.8GT/s。因此，QPI工作频率为4.8 GT/s 的总带宽为 4.8 GT/s×2 B×2= 19.2 GB/s。QPI 工作频率为 6.4 GT/s 的总带宽为6.4GT/s×2B×2=25.6GB/s。

## 2. 存储器总线

早期的存储器总线由北桥芯片控制，处理器通过北桥芯片和主存、图形卡（显卡）以及南桥芯片进行互连。但后来的处理器芯片（如Corei7）集成了主存控制器，因而存储器总线直接连接到处理器。

芯片组设计时需确定其能够处理的主存类型，故存储器总线有不同的运行速度。如图5.33所示计算机中，存储器总线宽度为64位，每秒传输1066M次，总线带宽为1066M×64bit/8=8.533 GB/s，因而3个通道的总带宽为25.6 GB/s，与此配套的内存条型号为DDR3-1066。

## 3. I/O 总线

I/O总线用于为系统中各种I/0设备提供输入/输出通路，其物理表现通常是主板上的I/O 扩展槽。早期的第一代I/O 总线有XT总线、ISA 总线、EISA 总线、VESA 总线，这些I/O 总线早已被淘汰；第二代I/O总线包括PCI、AGP、PCI-X；第三代I/O总线是PCI-Ex-press（可简写为 PCI-e）。

前两代I/O总线采用并行传输的同步总线，而PCI-e总线采用串行传输方式。两个PCI-e设备之间以一个链路（Link）相连，每个链路可包含多条通路（Lane），可能的通路数为1、2、4、8、16或32，PCI-e×n表示具有n个通路的PCI-e链路。

PCI-e每条通路由发送和接收数据线构成，发送和接收两个方向各有两条差分信号线，可同时发送和接收数据。在发送和接收过程中会对每个数据字节进行编码，以保证所有位都含有信号电平的跳变。这是因为在链路上没有专门的时钟信号，接收器使用锁相环（PLL）

从进入的位流0-1和1-0跳变中恢复时钟。例如，PCI-e1.0和PCI-e2.0采用8b/10b编码方案，即将每8位数据编码成10位；而 PCI-e 3.0、PCI-e 4.0和PCI-e5.0采用128 b/130b编码方案，即将每128位数据编码成130位，大大提升了数据传输效率。

PCI-e 1.0规范支持通路中每个方向的发送或接收速率为2.5 Gb/s。因此，PCI-e 1.0总线的总带宽计算公式（单位为GB/s）如下。

$$
2 . 5 \mathrm { G b } / \mathrm { s } { \times } 2 { \times } 1 0 \% { \times } 1 0
$$

根据上述公式可知，在PCI-e1.0规范下，PCI-e×1的总带宽为0.5GB/s；PCI-e×2的总带宽为1GB/s；PCI-e×16的总带宽为8GB/s。

将北桥芯片功能集成到CPU芯片后，主板上的芯片组不再是传统的三芯片结构（CPU+北桥+南桥)。根据需求有多种主板芯片组结构，有的是双芯片结构(CPU+PCH)，有的是三芯片结构（CPU+IOH+ICH)。其中，双芯片结构中的 PCH（Platform Controller Hub）芯片除包含原南桥芯片ICH的VO控制器集线器功能外，原北桥芯片中的图形显示控制单元和管理引擎（Management Engine，ME）单元也集成到 PCH中，另外还包括非易失RAM（Non-Volatile Random Access Memory，NVRAM) 控制单元等，因此 PCH 比以前南桥芯片的功能复杂得多。

图6.20 给出了一个基于Intel Core i7-975 三芯片结构的单处理器计算机系统互连示意图。图中 Corei7-975处理器芯片直接与三通道DDR3 SDRAM主存储器连接，并提供一组带宽为25.6GB/s的QPI总线，与基于X58芯片组的IOH芯片相连。图中所配内存条速度为$5 3 3 \mathrm { M H z } \times 2 = 1 0 6 6 \mathrm { M T / s }$ ，因此每个通道的存储器总线带宽为 $6 4 \mathrm { b } / 8 \times 5 3 3 \mathrm { M H z } \times 2 = 8 . 5 \mathrm { G B } / \mathrm { s }$ 0

![](images/9f6f8991c28f05160eff74d1726d6b511f5539b34ea418099be477297fe107ca.jpg)  
图 6.20 基于 Intel Core i7-975 处理器的计算机互连结构

图6.20中，I0H的重要功能是提供对PCI-e2.0的支持，最多可支持36条PCI-e2.0通路，可以配置为一个或两个PCI-e2.0×16的链路，或者4个PCI-e2.0×8的链路，或者其他的组合，如8个PCI-e2.0×4的链路等。这些PCI-e链路可以支持多个图形显示卡。

IOH 与 ICH 芯片（ICH10 或 ICH10R） 通过 DMI（Direct Media Interface） 总线连接。DMI采用点对点方式，时钟频率为100MHz，因为上行与下行各有1GB/s的数据传输率，因此总带宽为2GB/s。ICH芯片中集成了相对慢速的外设V/O接口，包括6个PCI-e1.0×1接口、10/100/1000 Mbit/s 网卡接口、集成声卡（HD Audio)、6个 SATA 硬盘控制接口和12个支持 USB 2.0标准的 USB 接口。若采用 ICH10R 芯片，则还支持 RAID 功能，也即ICH10R 芯片中还包含 RAID 控制器，所支持的 RAID 等级有 SATA RAID 0、RAID 1、RAID 5、RAID 10 等。

## 6.4.3 VO 接口的功能和结构

外设的IO接口又称设备控制器或VO控制器或VO控制接口，也称VO模块，是介于外设和VO总线之间的部分，不同的外设往往对应不同的设备控制器。设备控制器通常独立于I/O设备，可以集成在主板上（即ICH芯片内）或以插卡的形式插在VO总线扩展槽上。例如，图6.19中的磁盘控制器、以太网卡（网络控制器）、USB控制器、声卡、视频卡等都是IO接口。

I/O接口根据从CPU接收到的命令控制相应外设。它在主机一侧与VO总线相连，在外设一侧提供相应的连接器插座，在插座上连上电缆即可通过设备控制器将外设连接到主机。

图6.21给出了常用连接插座。目前很多外设都可连接到USB接口上，键盘和鼠标既可连接到PS/2插座（图中键盘接口和鼠标器接口处的插座）上，也可连到USB接口上。

![](images/4387f2401c05271bdb12aa011a26c1cde12735f47c653bdabead895d09666121.jpg)  
图 6.21 常用 V/0 设备插座

IO接口的主要职能包括以下几个方面。

1）数据缓冲。主存和CPU寄存器的存取速度都非常快，而外设一般涉及机械操作，其速度较低，在设备控制器中引人数据缓冲寄存器后，输出数据时，CPU只需把数据送到数据缓冲寄存器即可：在输入数据时，CPU只需从数据缓冲寄存器取数即可。在设备控制器控制外设与数据缓冲寄存器进行数据交换时，CPU可执行其他任务。

2）错误和就绪检测。提供错误和就绪检测逻辑，并将结果保存在状态寄存器，供CPU查用。状态信息包括各类就绪和错误信息，如外设是否完成打印或显示、是否准备好输入数据供CPU读取、打印机是否缺纸、磁盘数据校验是否正确等。

3）控制和定时。接收主机侧送来的控制信息和定时信号，根据相应的定时和控制逻辑，向外设发送控制信号，控制外设工作。主机送来的控制信息存放在控制（命令）寄存器中。

4）数据格式的转换。提供数据格式转换部件（如进行串-并转换的移位寄存器），将从外部接口接收的数据转换为内部接口所需格式，或进行反向的数据格式转换。例如，以二进制位的形式读/写磁盘驱动器后，磁盘控制器将对从磁盘读出的数据进行串-并转换，或对主机写入的数据进行并-串转换。

不同V0接口（设备控制器）在复杂性和控制外设数量上相差很大，故不一一列举。图6.22给出了1/0接口的通用结构。

![](images/1d6f61f7b986fd64448c827fc8884b1c314967eeb2337d408515bc9f5b93778d.jpg)  
图6.22 V0接口（设备控制器）的通用结构

如图6.22所示，V0接口中包含数据缓冲寄存器、状态/控制寄存器等多个不同寄存器，用于存放外设与主机交换的数据信息、控制信息和状态信息。因为状态信息和控制信息传送方向相反，而且CPU通常在时间上交错访问它们，故有些设备控制器将它们合并为一个寄存器。

设备控制器是连接外设和主机的“桥梁”，它在外设侧和主机侧各有一个接口。一方面，设备控制器在主机侧通过I/O总线和主机相连，CPU可通过指令将控制信息写入控制寄存器、从状态寄存器读出状态信息或与数据缓冲寄存器进行数据交换，通常把这类指令称为IO指令；另一方面，设备控制器在外设侧通过各种接口电缆（如USB线、网线、并行电缆等）和外设相连。因此，连接电缆、设备控制器、各类总线及其桥接器共同在外设、主存和CPU之间建立一条信息传输“通路”。

有了设备控制器，底层VO软件就可以通过设备控制器来控制外设，因此编写底层V/0软件的程序员只需了解设备控制器的工作原理。包括设备控制器中有哪些软件可访问的寄存器、控制/状态寄存器中每一位的含义、设备控制器与外设之间的通信协议等，而无须了解外设的机械特性。

## 6.4.4 V/0 端口及其编址

通常把设备控制器中的数据缓冲寄存器、状态/控制寄存器等统称为VO端口（I/0Port)。数据缓冲寄存器简称数据端口，状态/控制寄存器简称状态/控制端口。为了让CPU指定访问的外设和VO端口.必须给VO端口编址，所有VO端口编号组成的空间称为V0地址空间。VO端口的编址方式有两种：统一编址方式和独立编址方式。

![](images/588ae5babaa942c719edfa0283613e68675c8cd4fcacf32c1cd107dc4bca9d8e.jpg)

## 1. 独立编址方式

独立编址方式对所有V0端口单独编号，使它们成为一个与主存地址空间独立的V0地址空间。采用该编址方式时，无法从地址码区分CPU访问的是IO端口还是主存单元，因此指令系统中需要有专门的VO指令表明访问的是VO地址空间，VO指令中地址码部分给出VO端口号。CPU执行VO指令时，会产生IO读/写的总线事务，CPU通过该总线事务访问I/O端口。

通常，I/0端口数比主存单元少得多，选择I/0端口时，只需少量地址线，因此，在设备控制器中的地址译码逻辑较简单。独立编址的另一好处是，专用V0指令使程序的结构较清晰，易判断出哪部分代码用于I/O操作，因而可读性和可维护性更好。不过，I/0指令往往只提供简单的传输操作，故程序设计的灵活性差一些。

例如，Intelx86架构支持独立编址方式，其I/0地址空间共有65536个8位的I/0端口，两个连续的8位端口可看成一个16位端口；同时提供了4条专门的I/0指令：in、ins、out 和 outs，其中的 in 和 ins 指令用于将设备控制器中某寄存器的内容取到 CPU的通用寄存器中；out和outs用于将通用寄存器的内容输出到设备控制器中某寄存器。例如，以下两条指令将AL寄存器中的字符数据送到打印机数据缓冲寄存器（端口号为378H）中。

## 2. 统一编址方式

统一编址方式下，V0地址空间与主存地址空间统一编址。主存地址空间分出一部分地址给VO端口编号。因为VO端口和主存单元在同一个地址空间的不同区域中，故可根据地址范围区分访问的是V0端口还是主存单元。因此无须添加专门的V0指令，只要用一般的访存指令即可访问I/0端口。因为这种方式是将I/0端口映射到主存空间的某段地址，所以也称为存储器映射方式。

因为统一编址方式下V0访问和主存访问共用同一组指令，所以其保护机制可由虚拟存储管理机制实现。统一编址方式大大增加了编程的灵活性，任何访问内存的指令均可用于访问设备控制器中的I/O端口。例如，可用访存指令在CPU通用寄存器和IO端口之间传送数据；可用and、or或test等指令操作设备控制器中的控制/状态寄存器。

大多数RISC架构都采用统一编址方式。如在RISC-V和MIPS两种架构中，I/O端口采用存储器统一编址方式，通过Load/Store指令读/写I/O端口中的信息，总线可根据访存指令的物理地址范围区分读/写的是主存单元还是I0端口。

例如，对于MIPS32架构，图6.23给出了其虚拟地址空间映射，其中内核空间中位于0xA000 0000\~0xBFFF FFFF的kseg1 区域是非映射非缓存区域。它被固定映射到物理地址空间最开始的512MB（0x00000000\~0x1FFFFFFF）区间，只需将虚拟地址最高三位清零即可转换为物理地址，无须经过MMU转换，因此它是非映射（Unmapped）区域。同时也是非缓存（Uncached）区域，该区域中的信息不能送 cache 进行缓存。

通常将V0端口地址空间分配在kseg1区域，其原因是，该区域的非缓存特性（即在cache中没有副本）能保证对I/0O空间访问的数据一致性。此外，kseg1是唯一能在系统启动时(此时MMU和cache还未能正常工作)可以访问的地址空间，因此，MIPS 32规定，上电重启后所运行程序的第一条指令的地址为0xBFC00000，所映射的物理地址是0x1FC00000。

![](images/7045f7efbe84fb27e1e15891e8706861d19705f8bd62330304a562d97df76c95.jpg)  
图 6.23 MIPS 32 虚拟地址空间

可将MIPS 32 虚拟地址空间的kseg1 区域中的一块地址分配给V/O地址空间，其中的地址对应到不同外设控制器中的IO端口号，例如，可将 $0 \mathbf { x B 0 C 0 } \ 0 0 0 0 \sim 0 \mathbf { x B 0 C 0 } \ 0 \mathbf { F F F }$ 范围的地址分配给网卡（网络控制器）中的I0端口。执行加载指令lw时，只要通过简单的虚实地址变换（最高三位清0），将分配给I/O端口号的虚拟地址变换为对应的物理地址，CPU将该物理地址送到系统总线上，最终通过V0总线的地址线传送到V0接口中，从而选中要访问的IO端口，就可完成从指定VO端口加载信息的过程。例如，执行以下两条指令可将I/O端口 B0CO 0010H 中的信息（数据或状态） 取到寄存器\$t8 中。

![](images/5b18bd56bc13fbe9dae08fd1722668060a5fa31b502d421fe4de793723a8a401.jpg)

采用统一编址方式时，访存指令既可能访问主存，也可能访问I0端口。与主存单元不同，即使CPU未主动写入IO端口，其值也可能会随设备的工作状态发生变化，这会给软件编程和CPU设计带来若干新问题。

## 6.4.5 中断系统

现代计算机系统的中断处理功能相当丰富。每个计算机系统的中断系统功能可能不完全相同，但其基本功能主要包括以下几个方面：①及时记录各种中断请求，通常用一个中断请求寄存器来记录。②自动响应中断请求。CPU在“开中断”状态下，执行一条指令后会自动检测中断请求引脚，发现有中断请求后会自动响应中断。③同时有多个中断请求时，能自动选择并响应优先级最高的中断请求。④保护被打断程序的断点和现场。断点指被打断程序中将要执行的下一条指令的地址，由CPU保存。现场指被打断程序在断点处各通用寄存器的内容，由中断服务程序保存。⑤通过中断屏蔽实现多重中断的嵌套执行。

中断系统允许CPU在执行某中断服务程序时，被新的中断请求打断。但并非所有中断处理都可被新中断打断，对于一些重要的紧急事件，要设置成不可被打断，这就是中断屏蔽的概念。中断系统中要有中断屏蔽机制，针对每个中断，软件可以设置其允许被哪些中断打断，不允许被哪些中断打断。该功能主要通过在中断系统中设置中断屏蔽字实现。屏蔽字中每一位对应某个外设中断源。称为该中断源的中断屏蔽位，通常1表示允许中断，0表示不允许中断（即屏蔽中断）。软件可以通过执行指令修改屏蔽字，从而动态改变中断处理的先后次序。

中断系统的基本结构如图6.24所示。

![](images/62b7c0a5b9fcd65dade1e13933ed0c7f3ac9aaaef669c616263a05d31cb549dd.jpg)  
图6.24 中断系统的基本结构

从图6.24可看出，来自各个外设的中断请求记录在中断请求寄存器的对应位，每个中断源有各自对应的中断屏蔽字，软件可根据需求设置中断屏蔽字寄存器。若有未屏蔽的中断请求到来，中断系统将会生成中断请求信号。同时将所有未被屏蔽的中断请求送到中断判优电路中。判优电路根据中断响应优先级选择一个优先级最高的中断源，通过编码器对该中断源进行编码，得到中断源的标识信息，称为中断号。CPU在“开中断”状态下，每当执行完当前指令，都会检测中断请求信号（如Intel x86架构中的INTR信号）查看有无中断请求。若有，CPU将会响应中断，在下个指令周期开始，CPU将跳转到中断入口执行。中断响应过程与异常响应过程类似，具体可参见4.5.4节。

中断系统的功能一般通过可编程中断控制器（Programmable Interrupt Controller，PIC）实现。每个能够发出中断请求的外部设备控制器都有一条IRQ线，所有外设的IRQ线连到PIC 对应的输入IRQ0、IRQ1、…、IRQi、…若某IRQi输入信号有效，则PIC 将其中断请求寄存器中对应那一位置1，从而记录该中断请求。PIC对所有外设发来的IRQ请求按优先级排队，如果至少有一个未屏蔽的IRQ请求，则PIC 通过INTR 信号向CPU发中断请求。

中断系统中存在两种中断优先级。一种是中断响应优先级，另一种是中断处理优先级。中断响应优先级由中断查询程序或如图6.24中的中断判优电路决定优先权，它决定多个中断同时请求时先响应哪个；而中断处理优先级则由各自的中断屏蔽字（如图6.24中的中断屏蔽字寄存器内容）来动态设定，决定本中断与其他所有中断之间的处理优先关系。如

6.3.3节所述，在多重中断系统中通常用中断屏蔽字动态分配中断处理优先权。

例6.5 在IA-32+Linux系统中，假设某用户程序P中有以下一段C代码：

![](images/7412a374fc03dbe581dc33fe907c1320f1b5d565ce22cc80037840c3c45f557c.jpg)

假设文件bin\_file.txt已经存在磁盘上且存有足够多的数据，以前未被读取过。回答下列问题或完成下列任务。

1）执行第4行语句时，从用户程序的执行到调出内核中的V/0软件执行的过程是怎样的？要求画出函数之间的调用关系，并用自然语言描述执行过程。

2）执行第5行语句时，从用户程序的执行到调出内核中的V0软件执行的过程是怎样的？要求画出函数之间的调用关系。

3）执行第5行语句时，通过陷阱指令陷入内核后，底层的内核V0软件的大致处理过程是怎样的？

解：1）执行第4行语句时，从用户程序的执行到调出内核中的V0软件执行的过程如图6.25所示。

![](images/89f6e5ec77ebc890b1f849e67b2882a011b8630b0e5dc467678f66eff103867e.jpg)  
图 6.25 用户程序调用 fopen 函数到内核 I/0 软件执行的过程

如图6.25所示，当执行到用户程序P中第4行语句时，将转入C标准库函数fopen执行，根据图6.10所示的 fopen 函数源代码可知，fopen将调用系统调用函数 open，而 open系统调用对应的指令序列中有一条陷阱指令 int \$0x80（或sysenter).当执行到该陷阱指令时，将从用户态陷入内核态执行，在内核态首先执行的是system\_call程序，该程序中再根据系统调用号转到对应的 open 系统调用服务例程 sys\_open 执行，文件打开的具体工作由 sys\_open完成。因为将要打开的文件bin\_file.txt已经存在，所以，fopen函数将能成功执行。

2）执行第5行语句时，从用户程序P的执行到调出内核中的I/0软件执行的过程如图6.26所示。

3）因为用户进程使用fread函数读取的是一个普通的磁盘文件，所以应采用DMA控制I/0方式进行磁盘读操作。通过系统调用陷入内核后，底层的内核VO软件的大致处理过程如下。

![](images/7b96872757e821aed1e4d4ec2b17eeecddbd06c9324ac2a1d93fd1df3f9aa95a.jpg)  
图6.26 用户程序调用 fread 函数到内核V0软件执行的过程

首先，由内核空间中与设备无关的I/O软件完成以下相关操作：根据文件bin\_file的文件描述符fd(执行 fopen函数后得到一个指向结构FILE的指针fp，在 fp所指结构中包含了打开文件的文件描述符fd)，找到对应的文件描述信息，根据相应的文件描述信息可确定相应的磁盘设备驱动程序；根据文件当前指针确定所读数据在抽象的块设备中的逻辑块号；检查用户所需数据是否在高速缓存RAM中，以判断是否需要读磁盘。因为文件bin\_file未曾被读取过，所以肯定不会在高速缓存RAM中，同时也不会在用户缓冲区，因而需要调用相应的磁盘驱动程序执行读磁盘操作。

然后，在磁盘驱动程序中，将会完成以下操作：检查磁盘驱动器的电动机是否运转正常、将逻辑块号转换为磁盘物理地址、对将要接收磁盘数据的主存空间进行初始化、对DMA控制器中的各个VO端口进行初始化；然后，发送“启动DMA传送”命令以启动具体的I/O操作：最后调用处理器调度程序以挂起当前用户进程P，并使CPU转而执行其他用户进程。

最终，当DMA控制器完成I/O操作后，向CPU发送个“DMA结束”中断请求信号，CPU调出相应的中断服务程序执行。CPU在中断服务程序中，解除用户进程P的阻塞状态而使其进入就绪队列，然后中断返回，再回到被打断的进程继续执行。下次处理器调度时用户进程P有可能会被调度到处理器上继续执行。

## 本章小结

用户程序通常通过调用编程语言提供的VO库函数或操作系统提供的API函数来实现I0操作，这些函数最终都会调用与I0操作相关的系统调用封装函数，这些函数属于系统级V/O函数，通过其中的陷阱指令使用户进程从用户态转到内核态执行。

在内核态中执行的内核空间V0软件主要包含三个部分，分别是与设备无关的操作系统软件、设备驱动程序和中断服务程序。具体V0操作是通过设备驱动程序或中断服务程序控制I/O硬件来实现的。设备驱动程序的实现主要取决于具体的IO控制方式。

程序直接控制V0方式下，驱动程序实际上就是一个查询程序，而且不再调中断服务程序。

中断控制V0方式下，驱动程序在启动完外设后，将调用处理器调度程序以调出其他进程执行，而使当前进程阻塞：当外设完成任务后，则外设的设备控制器向CPU发出中断请求，CPU调出中断服务程序执行；在中断服务程序中，进行新数据的读/写或进行IO操作的结束处理。

DMA控制IO方式下，驱动程序进行DMA传送初始化并发出“启动DMA传送”命令后，将调用处理器调度程序以调出其他进程执行，而使当前进程阻塞；当DMA传送完成后，则DMA控制器向CPU发出“DMA结束”中断请求，CPU调出相应中断服务程序执行；在中断服务程序中，进行DMA结束处理。

在设备驱动程序和中断服务程序中。通过执行VO指令对设备控制器中的VO端口进行访问。CPU通过读取状态端口的状态，来了解外设和设备控制器的状态，根据状态向控制端口发送相应的控制信息，以控制外设的读/写和定位等操作，而外设的数据则通过数据端口来访问。IO端口的编址方式有两种：独立编址方式和统一编址（存储器映射）方式。

## 习 题

## 1. 给出以下概念的解释说明。

V/O 硬件 I/O 软件

内核空间V/0软件

用户空间I/O 软件

系统调用处理程序 系统调用服务例程

中断服务程序

设备驱动程序

系统级VO 函数 虚拟文件系统

文件描述符

文件元数据

流缓冲区 索引节点

目录项

目录文件

系统打开文件表 磁盘高速缓存

高速缓存 RAM

I/O 控制方式

程序直接控制V/O 就绪状态

中断屏蔽字

中断控制I/0

多重中断 中断嵌套

DMA 控制器

DMA 方式

设备控制器 I/0端口

数据端口

状态端口 V/O地址空间

控制端口

独立编址方式

统一编址方式

存储器映射I/0 I/O 指令

可编程中断控制器

中断请求寄存器

中断响应优先级 中断处理优先级

2. 简单回答下列问题。

(1) I/0子系统的层次结构是怎样的？

(2) 系统调用封装函数对应的机器级代码结构是怎样的？

(3)为什么系统调用的开销很大？

(4) C标准I/O库函数是在用户态执行还是在内核态执行？

(5)与V0操作相关的系统调用封装函数是在用户态执行还是内核态执行？

(6)什么是程序直接控制I/0方式？说明其工作原理。

(7)为什么在保护现场和恢复现场的过程中，CPU必须关中断？

(8)什么是中断控制V0方式？说明其工作原理。

(9)DMA方式能够提高成批数据交换效率的主要原因何在？

(10)DMA控制器在什么情况下发出中断请求信号？

(11) V0端口的编址方式有哪两种？各有何特点？

(12)为什么中断控制器把中断类型号放I/0总线的数据线上而不是放在地址线上？

3. 在Linux 系统中，假设硬盘文件“\home \test. txt”的数据由 ASCII 码字符串“\home\test”组成，下列程序的输出结果是什么？程序执行后，该文件中的内容是什么？

![](images/0ee3012205a624b204b540f19efeefd0664b1ddf27193050240bdd4a7c69d007.jpg)

4. 以下是在IA-32+Linux系统中执行的用户程序P的汇编代码：

movl \$4, %eax movl \$1, %ebx movl \$msg, %ecx movl \$14, %edx int \$0x80

#系统调用号（sys\_write)  
#file descriptor（参数一)：文件描述符（stdout  
#string address(参数二）：要显示的字符串  
#string length（参数三)：字符串长度  
#调用内核功能

针对上述汇编代码，回答下列问题。

(1) 程序的功能是什么？

(2)执行到哪些指令时会发生从用户态转到内核态执行的情况？

(3)该用户程序调用了哪些系统调用？

5. 第4题中用户程序的功能可以用以下C语言代码来实现：

针对上述C代码，回答下列问题或完成下列任务。

(1) 执行 write 函数时，传递给 write 的实参在 main 栈帧中的存放情况怎样？要求画图说明。

(2) 从执行 write 函数开始到调出 write 系统调用服务例程 sys\_write 执行的过程中，其函数调用关系是怎样的？要求画图说明。

(3)就程序设计的便捷性和灵活性以及程序执行性能等方面，与第4题中的实现方式进行比较。

6. 第4题和第5题中用户程序的功能可以用以下C语言代码来实现：

假定源程序文件名为hello.c，可重定位目标文件名为hello.o，可执行目标文件名为hello，程序用GCC编译驱动程序处理，在IA-32+Linux系统中执行。回答下列问题或完成下列任务。

(1) 为什么在 hello.c 的开头需加“#include <stdio. h>”？为什么 hello. c 中没有定义printf函数，也没它的原型声明，但main函数引用它时没有发生错误？

(2) 需要经过哪些步骤才能在机器上执行hello程序？要求详细说明各个环节的处理过程。

(3)为什么 printf函数中没有指定字符串的输出目的地，但执行hello程序后会在屏幕上显示字符串？

(4)字符串“Hello，world.\n”在机器中对应的0/1序列（机器码）是什么？这个0/1序列存放在hello.0文件的哪个节中？这个0/1序列在可执行目标文件hello的哪个段中？

(5) 若采用静态链接，则需要用到 printf.o模块来解析 hello.o 中的外部引用符号 printf，printf.o模块在哪个静态库中？静态链接后，printf.o中的代码部分（.text 节）被映射到虚拟地址空间的哪个段中？若采用动态链接，则函数printf的代码在虚拟地址空间中的何处？

(6) 假定 printf 函数最终调用的 write 系统调用封装函数 write 对应的汇编代码如下：

![](images/e5a8d3a524b577e596159f06b91895e69b0a6f34eee919f98e32ea1c06473653.jpg)

请给出以上每条汇编指令的注释，并说明该Linux系统中系统调用返回的最大错误号是多少？

（7）就程序设计的便捷性和灵活性以及程序执行性能等方面，与第4题和第5题中的实现方式分别进行比较。并分析说明哪个执行时间更短？

7. 若前端总线（FSB）的工作频率为1333MHz（实际时钟频率为333 MHz)，总线宽度为64位，则总线带宽为多少？若存储器总线为三通道总线，总线宽度为64位，内存条的型号为DDR3-1333，则整个存储器总线的总带宽为多少？若内存条型号改为DDR3-1066，则存储器总线的总带宽又是多少？

8. 总线的速度通常指每秒钟传输多少次，例如，QPI总线的速度单位为GT/s，表示每秒钟传输多少个10亿 $\left(  { \mathrm { ~ 1 ~ G ~ } } =  { \mathrm { 1 0 } } ^ { 9 } \right)$ 次。若QPI总线的时钟频率为2.4GHz，则其速度为多少？总带宽是多少 GB/s？ QPI 总线的速度也称为 QPI频率，QPI频率为6.4 GT/s 时的总带宽是多少？

9. PCI-e 总线采用串行传输方式， $\operatorname { P C I - e } \times \mathtt { n }$ 表示具有 n 个通路的 PCI-e 链路。PCI-e1.0规范支持通路中每个方向的发送或接收速率为 $2 , 5 \mathrm { G b } / \mathrm { s }$ ，则 $\mathrm { P G I { \stackrel {  } { - } } e } \ 1 . \ 0 \times 8$ 和 PCI-e 1.0×32的总带宽分别为多少？

10. 假定采用独立编址方式对0端口进行编号，那么，必须为处理器设计哪些指令来专门用于进行V0端口的访问？处理器如何区分访问的是V0空间还是主存空间？

11.假设有一个磁盘，每面有200个磁道，盘面总存储容量为 $1 . 6 \mathrm { M B } \mathrm { ~ \ : } ( 1 \mathrm { M } = 1 0 ^ { 6 } )$ ，磁盘旋转一周时间为25ms，每道有4个区，每两个区之间有一个间隙，磁头通过每个间隙需1.25ms。请回答下列问题：

(1）从该磁盘上读取数据时的最大数据传输率是多少？

(2)假如有人为该磁盘设计了一个与主机之间的接口，如图6.27所示，磁盘每读出一位，串行送入一个移位寄存器，每当移满16位后向处理器发出一个请求交换数据的信号。在处理器响应该请求信号并读取移位寄存器内容的同时，磁盘继续读出一位一位数据并串行送入移位寄存器，如此继续工作。已知处理器在接到请求交换的信号以后，最长响应时间是3μs，那么这样设计的接口能否正确工作？若不能则应如何改进？

![](images/6850a6188e84ffe61cbd0e1e1e545e1bb816c8927b07a43c532f3eb428861878.jpg)  
图 6.27 题11 图

12. 假设某计算机带有20个终端同时工作，在运行用户程序的同时，能接收来自任意一个终端输人的字符信息，并将字符回送显示（或打印）。每一个终端的键盘输入部分有一个数据缓冲寄存器RDBRi(i=1\~20)，当在键盘上按下某一个键时，相应的字符代码即进人RDBRi，并使它的“完成”状态标志Donei(i=1\~20)置1，要等CPU把该字符代码取走后，Donei 标志才被自动清 $0 _ { \circ }$ 每个终端显示（或打印）输出部分有一个数据缓冲寄存器TDBRi(i=1\~20)，并有一个Readyi(i=1\~20)状态标志，该状态标志为1时，表示相应的TDBRi是空着的，准备接收新的输出字符代码，当TDBRi接收了一个字符代码后，Readyi标志被自动清0，并将字符代码送到终端显示（或打印），为了接收终端的输入信息，CPU为每个终端设计了一个指针PTRi（i=1\~20），用于指向为该终端保留的主存输入缓冲区。CPU采用下列两种方案输入键盘代码，同时回送显示（或打印）。

①每隔一固定时间T转入一个状态检查程序DEVCHC，顺序地检查全部终端是否有任何键盘信息要输入，如果有，则顺序完成之。

②允许任何有键盘信息输入的终端向处理器发出中断请求。全部终端采用共同的向量地址，利用它使处理器在响应中断后，转入一个中断服务程序DEVINT，由后者询间各终端状态标志，并为最先遇到的请求中断的终端服务，结束后返回用户程序。

要求画出 DEVCHC 和 DEVINT 两个程序的流程图。

13.某台打印机每分钟最快打印6个页面，页面规格为50行×80字符。已知某计算机主频为500MHz，若采用中断方式进行字符打印，则每个字符申请一次中断且中断响应和中断处理时间合起来为1000个时钟周期。请问该计算机系统能否采用中断控制V0方式来进行字符打印输出？为什么？

14. 某计算机的 CPU主频为500MHz，所连接的某个外设的最大数据传输率为20KB/s，该外设接口中有一个16位的数据缓存器，相应的中断服务程序的执行时间为500个时钟周期，则是否可以用中断方式进行该外设的输入输出？假定该外设的最大数据传输率改为2MB/s，则是否可以用中断方式进行该外设的输入输出？

15. 假设计算机所有指令都在两个总线周期内完成，一个总线周期用来取指令，另一个总线周期用来存取数据。总线周期为250ns，因而每条指令的执行时间为500ns。若该计算机中配置的磁盘上每个磁道有16个512B的扇区，磁盘旋转一圈的时间是8.192ms，总线宽度16位。采用DMA方式传送磁盘数据，则在进行DMA传送时该计算机指令执行速度降低了百分之几？

## 参考文献

[1]袁春风，余子濠.计算机系统基础[M].2版.北京：机械工业出版社，2018

[2] RANDAL E B，DAVID R 0. 深入理解计算机系统（原书第3 版） [M]. 龚奕利，贺莲，译.北京：机械工业出版社，2016

[3]袁春风，唐杰，杨若瑜，等.计算机组成与系统结构[M].3版.北京：清华大学出版社，2022.

[4] DANIEL P B，MARCO C. 深入理解 LINUX内核（原书第3版） 「M]. 陈莉君，张琼声，张宏伟，译.北京：中国电力出版社，2007.

[5] 新设计团队.Linux内核设计的艺术[M]. 北京：机械工业出版社，2013.

[6] ROBERTL. Linux内核设计与实现（原书第3版）[M].陈莉君，康华，译．北京：机械工业出版社，2011.

[7]MARCJR. 高级UNIX编程（原书第2版）[M]. 王嘉祯，杨素敏，张斌，等译．北京：机械工业出版社，2006.

[8]JOHNSONMH. Windows系统编程（原书第4版）[M]. 戴峰，陈征，等译．北京：机械工业出版社，2010.

[9] BRIAN W K,DENNIS M R. The C Programming Language [M]. 2nd ed. 北京：机械工业出版社,2006.

[11] ANDREWST. 现代操作系统（原书第4版）[M]. 陈向群，马洪兵，等译．北京：机械工业出版社，2017.

[10] 尹宝林.C程序设计导引[M]. 北京：机械工业出版社，2013.

## 后 记

经全国高等教育自学考试指导委员会同意，由电子、电工与信息类专业委员会负责高等教育自学考试《计算机系统原理》教材的审稿工作。

本教材由南京大学袁春风教授负责编写。全国考委电子、电工与信息类专业委员会组织了本教材的审稿工作。参与本教材审稿的有天津大学喻梅教授、深圳职业技术学院乌云高娃教授，谨向她们表示诚挚的谢意。

全国考委电子、电工与信息类专业委员会最后审定通过了本教材。

全国高等教育自学考试指导委员会

电子、电工与信息类专业委员会

2023年5月

![](images/0d2aacc471efd7a78eeabc0e19232aeb4a12783cacc5be7bd42260618fa71def.jpg)

## 本书数字资源

本书配有电子课件、习题解答等教辅资源，需要的读者可登录www.cmpedu.com免费注册，审核通过后下载，或扫描关注机械工业出版社计算机分社官方微信订阅号——身边的信息学，回复73852即可获取本书配套资源链接。

机工教育微信服务号

身边的信息学