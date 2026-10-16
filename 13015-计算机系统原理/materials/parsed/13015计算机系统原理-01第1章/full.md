## 13015 计算机系统原理

第1章 计算机系统概述

## 13015 计算机系统原理【第一章考点解析】

考点1 存储程序

存储程序方式的基本思想是：

必须将事先编好的程序和原始数据送入主存后才能执行程序，一旦程序被启动执行，计算机不需要操作人员干预就能自动完成逐条指令取出和执行的任务。

比如：北京地铁19号线牛街站 B 出口机器人摊煎饼

## 13015 计算机系统原理【第一章考点解析】

## 考点2 冯・诺依曼结构基本思想

冯・诺依曼结构计算机的基本思想主要包括以下四个方面

1）采用“存储程序”工作方式。

2）计算机由运算器、控制器、存储器、输入设备和输出设备五个基本部件组成。

3）存储器能存放数据，也能存放指令。

4）计算机内部以二进制形式表示指令和数据。

## 13015 计算机系统原理【第一章考点解析】

## 考点2 冯・诺依曼结构基本思想

2. 冯·诺依曼计算机工作方式的基本特点是A. 多指令流单数据流 B. 存储程序工作方式C. 堆栈操作 D. 存储器按内部选择地址

## 【答案】：B【2024年10月】

14. 冯·诺依曼结构计算机由运算器、 、输入设备和输出设备五大基本部件组成。

【答案】：控制器、存储器【2025年04月】

## 13015 计算机系统原理【第一章考点解析】

## 考点3 模型计算机的基本硬件结构

模型计算机的基本硬件结构如下：

1）主存储器 (主存或内存)

2）算术逻辑部件 (ALU)

3）控制元件 (控制器)

4）输入/输出设备

![](images/2d7b05a7defae22743ea9b4d4c8a84518ed267293950bac6a8e1a7401346b4f8.jpg)  
图1.1 模型计算机基本硬件结构

总线：

1）地址线：用于传输地址信息

2）数据线：用于传输数据信息

3）控制线：用于传输控制信息

## 13015 计算机系统原理【第一章考点解析】

## 考点3 模型计算机的基本硬件结构

4. 通用寄存器用于临时存放从主存取来的数据或运算的结果，下列不属于通用寄存器的部件是A. 指令寄存器 B. 标志寄存器 C. 程序计数器 D.状态计数器

## 【答案】：D【2025年04月】

12. CPU访问主存时，需先将主存地址、读/写命令分别送到总线的 、控制线，然后通过总线的 发送或接收数据。

【答案】：地址线、数据线【2025年04月】

## 13015 计算机系统原理【第一章考点解析】

## 考点4 指令

指令是用 0 和 1 表示的一串 0/1 序列，用来指示 CPU 完成—个特定的原子操作。【不可分割】

1）取数指令（load） 主存 → 通用寄存器 【M型指令】

2）存数指令（store） 通用寄存器 → 主存 【M型指令】存取与内存相关

3）加法指令（add） 通用寄存器 → 通用寄存器 【R型指令】

4）传送指令（mov） 通用寄存器 → 通用寄存器 【R型指令】

每条指令由操作码和地址码两部分组成。

下面模型机采用 8 位定长指令字

![](images/d1085474e8b2fb26bba8c52d8b8c62d5d3ad991b9510e471ed22da1449220366.jpg)  
图1.2 定长指令字格式

## 13015 计算机系统原理【第一章考点解析】

## 考点4 指令

<table><tr><td>格式</td><td>4位</td><td>2位 2位</td><td></td><td>功能说明</td></tr><tr><td>R型</td><td>op</td><td>πt</td><td>Ts</td><td>R[rt] ← R[rt] op R[rs] 或 R[rt] ← R[rs]</td></tr><tr><td>M型</td><td>op</td><td>addr</td><td></td><td>R[0]← M[addr]或M[addr] ←R[0]</td></tr></table>

图1.2 定长指令字格式

## op为操作码字段：

1）R型指令 的 op 为0000定义为传送(mov)操作，op 为0001定义为加(add)操作

比如：指令 0001 0001的功能为 R[0]←R[0]+R[1]，表示将 0 号 和 1 号寄存器内容相加的结果送 0 号寄存器。

2）M型指令的 op 为1110定义为取数(load)操作， op 为1111定义为存数(store)操作。

比如：指令 1110 0110 的功能为 R[0]←M[0110]，表示将 6 号主存单元（地址为0110）中的内容取到 0 号寄存器

## 13015 计算机系统原理【第一章考点解析】

## 考点5 程序和指令的执行过程

在上述模型机上实现 $\mathbf { \mu } ^ { \prime \prime } \mathbf { z } { = } \mathbf { x } { + } \mathbf { y } ^ { \prime \prime }$ ，x和y分别存放在主存 5 号和 6 号单元中，结果 z 存放在 7 号单元中，则相应程序在主存单元中的初始内容如图：

<table><tr><td rowspan=1 colspan=1>1110 0110</td><td rowspan=1 colspan=1>I1：R[0]←M[6]；op=1110:取数操作</td><td rowspan=1 colspan=1>load r0, 6#</td></tr><tr><td rowspan=1 colspan=1>0000 0100</td><td rowspan=1 colspan=1>I2:R[1]←R[0]；op=0000：传送操作</td><td rowspan=1 colspan=1>mov rl, r0</td></tr><tr><td rowspan=1 colspan=1>1110 0101</td><td rowspan=1 colspan=1>I3：R[0]← M[5]；op=1110:取数操作</td><td rowspan=1 colspan=1>load r0, 5#</td></tr><tr><td rowspan=1 colspan=1>00010001</td><td rowspan=1 colspan=1>14：R[0]←R[0]+R[1];op=0001：加操作</td><td rowspan=1 colspan=1>add r0, r1</td></tr><tr><td rowspan=1 colspan=1>1111 0111</td><td rowspan=1 colspan=1>I5：M[7]←R[0]：op=1111:存数操作</td><td rowspan=1 colspan=1>store 7#, r0</td></tr><tr><td rowspan=1 colspan=1>0001 0000</td><td rowspan=1 colspan=1>操作数x，值为16</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>0010 0001</td><td rowspan=1 colspan=1>操作数y，值为33</td><td rowspan=1 colspan=1></td></tr><tr><td rowspan=1 colspan=1>0000 0000</td><td rowspan=1 colspan=1>结果z，初始值为0</td><td rowspan=1 colspan=1></td></tr></table>

图1.3 实现z=x+y 的程序在主存部分单元中的初始内容

## 13015 计算机系统原理【第一章考点解析】

考点5 程序和指令的执行过程程序执行过程如右图：

![](images/57b47b8580d1407aa3f48639876fe497bcee956286b322d26a2b3872113002a0.jpg)

每条指令的执行过程及结果如下图：

<table><tr><td rowspan=1 colspan=1>IR←-M[0000]</td><td rowspan=1 colspan=1>IR-M[0001]</td><td rowspan=1 colspan=1>IR←M[0010]</td><td rowspan=1 colspan=1>IR←M[0011]</td><td rowspan=1 colspan=1>IR←M[0100]</td></tr><tr><td rowspan=1 colspan=1>op=1110,取数</td><td rowspan=1 colspan=1>op=0000，传送</td><td rowspan=1 colspan=1>op=1110,取数</td><td rowspan=1 colspan=1>op=0001，加</td><td rowspan=1 colspan=1>op=1111，存数</td></tr><tr><td rowspan=1 colspan=1>PC←0000+1</td><td rowspan=1 colspan=1>PC←0001+1</td><td rowspan=1 colspan=1>PC←0010+1</td><td rowspan=1 colspan=1>PC←0011+1</td><td rowspan=1 colspan=1>PC←0100+1</td></tr><tr><td rowspan=1 colspan=1>MDR←M[0110]</td><td rowspan=1 colspan=1>A←-R[0]、mov</td><td rowspan=1 colspan=1>MDR←M[0101]</td><td rowspan=1 colspan=1>A←R[0]、B←R[1], add</td><td rowspan=1 colspan=1>MDR←R[0]</td></tr><tr><td rowspan=1 colspan=1>R[0]←MDR</td><td rowspan=1 colspan=1>R[1]←F</td><td rowspan=1 colspan=1>R[0]←MDR</td><td rowspan=1 colspan=1>R[0]←F</td><td rowspan=1 colspan=1>M[0111]←MDR</td></tr></table>

## 13015 计算机系统原理【第一章考点解析】

## 考点6 程序设计语言和翻译程序

程序设计语言从抽象层次上来分，可以分成两类：

1）低级语言

① 机器语言 比如：1110 0110

② 汇编语言 比如：load r0, 6#

2）高级语言 比如：C、C++、Java等

## 13015 计算机系统原理【第一章考点解析】

考点6 程序设计语言和翻译程序

计算机无法直接理解和执行高级编程语言程序，因而需要将高级语言程序转换成机器语言程序。  
这个转换过程通常由计算机自动完成，进行这种转换的软件统称为翻译程序。

## 翻译程序有以下 3 类：

1）汇编程序：用于将汇编语言源程序翻译成机器语言目标程序比如：工具有微软 x86 汇编器

2）解释程序：用于将源程序中的语句按其执行顺序逐条翻译成机器指令并立即执行比如：JavaScript、Python

3）编译程序：用于将高级语言源程序翻译成汇编语言或机器语言目标程序比如：C、C++

## 13015 计算机系统原理【第一章考点解析】

## 考点6 程序设计语言和翻译程序

3. 下列不属于翻译程序种类的是A. 汇编程序 B. 解释程序 C. 编译程序 D. 链接程序

【答案】：D【2024年04月】

11. 用若干个 表示的与机器指令一一对应的指令称为 指令。【答案】：助记符、汇编【2024年04月】

12. 与机器语言相对应的符号化表示语言称为 语言。通常用容易记忆的英文单词或缩写表示指令操作码的含义,用标号、变量名、寄存器名等表示操作数或其地址码，这些英文单词或其缩写、标号、变量名等称为 0

【答案】：汇编、助记符【2024年10月】

## 13015 计算机系统原理【第一章考点解析】

考点6 程序设计语言和翻译程序

11. 从抽象层次上来分，程序设计语言可分为 语言和 语言。【答案】：低级语言、高级语言【2025年04月】

12. 属于低级语言的是 和

【答案】：机器语言、汇编语言【2025年10月】

![](images/20589b7b3b4a49c6875a3c3d53147aae29df44c34dfda896633e9cadf590abf6.jpg)

## 13015 计算机系统原理【第一章考点解析】

## 考点7 从源程序到可执行文件

## 从 hello.c 到可执行目标文件 hello 的转换过程如下图所示

![](images/41270e99c89657c3a0c347f08cce0925bd0eb92c8c5477f0151e0d5a2cd8da55.jpg)

## 13015 计算机系统原理【第一章考点解析】

考点7 从源程序到可执行文件

![](images/e8960c455b2c0351f3c325609e76b6ed144acc5ec9c53a6e44c243a61ab05dc1.jpg)

1）预处理阶段：预处理程序(cpp)对源程序中以字符“#”开头的命令进行处理以 .i 为扩展名。→ 文本文件

2）编译阶段：编译程序(ccl)对预处理后的源程序进行编译，生成一个汇编语言源程序文件以 .s 为扩展名。→ 文本文件

3）汇编阶段：汇编程序(as)对汇编语言源程序进行汇编，生成一个可重定位目标文件以 .o 为扩展名。→ 二进制文件，打开是乱码

4）链接阶段：链接程序(ld)将多个可重定位目标文件和标准库函数库中的可重定位目标文件合并成为一个可执行目标文件。→ 二进制文件，打开是乱码

## 13015 计算机系统原理【第一章考点解析】

## 考点7 从源程序到可执行文件

6. 用来将若干可重定位目标文件组合起来，生成一个可执行目标文件的过程称为A. 预处理 B. 编译 C. 汇编 D. 链接

## 【答案】：D【2024年04月】

6. 从源程序变为可执行文件的第一个步骤是A. 链接 B. 编译C. 汇编 D. 预处理

## 【答案】：D【2024年10月】

16. 将高级语言源程序转换为可执行文件通常分为 、编译、汇编和4步。

【答案】：预处理、链接【2025年10月】

## 13015 计算机系统原理【第一章考点解析】

考点7 从源程序到可执行文件

17. 预处理是从 变成 文件的第一步。

【答案】：源程序、可执行【2025年10月】

## 13015 计算机系统原理【第一章考点解析】

## 考点8 计算机系统抽象层的转换

机器语言程序所运行的计算机硬件和软件之间需要有一个“桥梁”，这个在软件和硬件之间的界面就是指令集体系结构

(Instruction Set Architecture，ISA)

简称指令集架构或指令系统

它是软件和硬件之间接口的一个完整定义。

![](images/81ba37741ee10ec61d309261dc0f9eea77f8ad65c1e5416d7f54276e42555eb8.jpg)  
图1.10 计算机系统抽象层及其转换

## 13015 计算机系统原理【第一章考点解析】

## 考点8 计算机系统抽象层的转换

1. 完整的计算机系统应包括A. 运算器、存储器、控制器 B. 硬件和软件C. 主机和实用程序 D. 外部设备和主机

## 【答案】：B【2024年04月】

12. 指令集体系结构(ISA)是整个计算机系统的核心部分,ISA层上面是 部分，下面是 部分。

【答案】：软件、硬件【2024年04月】

5. 下列不属于指令集体系结构设计所追求的目标的是A. 提高机器级程序的执行速度 B. 增大控制存储器的容量C. 缩短机器级指令的长度 D. 提高机器级程序设计的灵活性

【答案】：B【2025年04月】

## 13015 计算机系统原理【第一章考点解析】

## 考点8 计算机系统抽象层的转换

2.机器语言程序所运行的计算机硬件和软件之间需要一个“桥梁”，这个在软件和硬件之间的界面是A. 指令集体系结构 B. 微体系结构C. 操作系统/虚拟机 D. 程序

【答案】：A【2025年10月】

## 13015 计算机系统原理【第一章考点解析】

## 考点9 计算机系统的不同用户

根据软件的用途，一般将软件分为两大类：

## 1）系统软件

包括：操作系统 (如 Windows、UNIX、Linux)、语言处理系统 (如 Visual Studio、GCC)、数据库管理系统 (如 Oracle)和各类实用程序(如磁盘碎片整理程序、备份程序)等软件。

## 2）应用软件

例如，人们平时经常使用的电子邮件收发软件、多媒体播放软件、游戏软件、炒股软件、文字处理软件、电子表格软件、演示文稿制作软件等软件。

## 13015 计算机系统原理【第一章考点解析】

## 考点9 计算机系统的不同用户

按照在计算机上完成任务的不同，可以把使用计算机的用户分成以下 4 类：

## 1）最终用户

例如：使用炒股软件的股民、玩计算机游戏的人、进行会计电算化处理的财会人员等。

## 2）系统管理员

其职责主要包括：安装、配置和维护系统的硬件和软件

## 3）应用程序员

例如：C++开发工程师，Java高级程序员

## 4）系统程序员

例如：开发操作系统、编译器、数据库管理系统等系统软件的程序员。

## 13015 计算机系统原理【第一章考点解析】考点9 计算机系统的不同用户

5. 介于计算机硬件与应用程序之间，包括为有效、安全地使用和管理计算机以及为开发和运行应用软件而提供的各种软件，称为A. 应用软件 B. 系统软件 C. 操作软件 D.用户软件

## 【答案】：B【2024年04月】

13.按照在计算机上完成任务的不同，可以把使用计算机的用户分成以下4类：、应用程序员和系统程序员。

## 【答案】：最终用户、系统管理员【2024年04月】

13. 用来管理整个计算机系统的资源，包括对它们进行 、管理、监视和服务等的软件称为 0

【答案】：调度、操作系统【2024年10月】P36

## 13015 计算机系统原理【第一章考点解析】

## 考点9 计算机系统的不同用户

1. 属于系统软件的是

A. WPS Office

B. Windows10

C. RealPlayer

D. 腾讯 QQ

【答案】：B【2025年10月】

（Application Programming Interface，API）

## 13015 计算机系统原理【第一章考点解析】

## 考点10 计算机系统核心层之间的关联

程序的编译转换如右图所示

## 应用程序接口，有两种

1）应用程序二进制接口 → ABI（Application Binary Interface，ABI)面向：开发人员和上层应用

2）应用程序编程接口 → API

面向：编译器、操作系统和硬件

![](images/55108e9520eb549d4858d43618474b8cd0738fadffffbe6ae42feb73e20c31fc.jpg)  
图1.12 程序的编译转换

## 13015 计算机系统原理【第一章考点解析】

考点11 计算机性能的测试

考量一个计算机系统性能的两个基本指标

1）吞吐率

2）响应时间

通常把用户感觉到的执行时间分成以下两部分：

1）CPU时间

① 用户CPU时间

② 系统CPU时间

2）其他时间

## 13015 计算机系统原理【第一章考点解析】

## 考点11 计算机性能的测试

CPU性能是指用户CPU时间，它只包含 CPU 运行用户程序代码的时间。在对 CPU 时间进行计算时需要用到以下几个重要的概念和指标：

## 1）时钟周期：CPU里最小的时间单位

比如：常见的 3.5GHz，就是 CPU 每秒有 35 亿次"心跳"(时钟脉冲)

## 2）时钟频率：CPU的主频，时钟周期的倒数

比如：3.5GHz 对应的时钟周期 ≈ 0.286 纳秒（1秒÷35 亿），也就是每 0.286 纳秒完成一次"心跳"(时钟脉冲)

3）CPI(Cycles Per Instruction)：表示执行一条指令所需的时钟周期数。

① 对于一条特定指令而言，此时 CPI 是一个确定的值；

② 对于一个程序或一台机器来说，其 CPI 指该程序或该机器指令集中的所有指令执行所需的平均时钟周期数，此CPI是一个平均值。

## 13015 计算机系统原理【第一章考点解析】

## 考点11 计算机性能的测试

## 【基础计算公式】

如果已知程序总指令条数和综合CPI，则可用如下公式

$$
1 2 , 1 3 , 1 5 , 2 5 , 3 6 , 7 5 , 7 6 , 1 5 , 7 6 , 1 5 , 7 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 5 8 , 9 6 , 1 5 , 9 6 6 , 1 5 , 9 6 , 5 8 , 9 6 6 , 1 5 , 9 6 , 5 8 , 9 6 6 , 1 5 , 9 6 , 5 8 8 , 9 6 , 5 8 8 , 9 6 , 6 6 0 , 5 6 0 , 5 6 0 , 5 8 0 , 6 6 0 , 5 6 0 , 5 6 0 , 5 0 6 , 5 0 6 , 5 0 6 , 5 0 6 , 6 0 0 , 5 6 0 , 5 6 0 0 , 5 6 0 , 5 0 6 0 , 6 0 0 , 5 6 0 0 , 5 6 0 0 , 5 6 0 0 , 6 0 0 , 5 6 0 0 , 5 6 0 0 , 6 0 0 0 , 5 6 0 0 0 , 6 0 0 0 , 6 0 0 0 0 , 5 6 0 0 0 , 6 0 0 0 0 , 6 0 0 0 0 0 0 , 0 0 0 0 0 0 0
$$

如果已知程序中共有 n 种不同类型的指令，第 i 种指令的条数和 CPI 分别为 $\mathsf { \pmb { C _ { i } } }$ 和 $\mathbb { C P l } _ { \mathfrak { i } } ,$ ，则程序总时钟周期数 $\mathbf { \Sigma } = \sum _ { i = 1 } ^ { n } \left( { \mathrm { C P I } } _ { i } \times \mathbf { C } _ { i } \right)$

$$
H P - C P U ( H _ { 2 } ^ { + } | \overrightarrow { t } | ) = \frac { 4 C } { 1 2 } \sum _ { i = 1 } ^ { N } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } = \frac { 4 } { 1 2 } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \times \ \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } = \frac { 4 } { 1 2 } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac  \partial ^  
$$

程序的综合CPI(平均CPI)也可由以下公式求得，其中， $\mathsf { F } _ { \mathrm { i } }$ 表示第 i 种指令在程序中所占的比例。

$$
\frac { 4 } { 2 \pi } \frac { 2 } { 1 5 } ( \mathbf { D } \mid \mathbf { \Lambda } = \frac { 7 } { 1 5 } \mathbf { E } \mathbf { D } \mathbf { \Lambda } \mathbf { H } + \frac { 1 } { 2 } \mathbf { f } \mathbf { H } \mathbf { H } ) \frac { 1 } { 2 } \mathbf { f } \mathbf { H } \mathbf { E } \mathbf { \Lambda } \mathbf { H } \mathbf { \Lambda } \div \mathbf { \Lambda } \mathbf { \tilde { f } } \mathbf { H } \frac { 1 } { 2 } \mathbf { f } \mathbf { H } \mathbf { H } \mathbf { H } \Leftrightarrow \frac { 4 } { 2 } \mathbf { \tilde { f } } \mathbf { H } \mathbf { H } \mathbf { H }
$$

$$
\underline { { \underline { { \xi } } } } \underline { { \vec { = } } } \underline { { \mathbf { A } } } \mathbf { C P } | = \ \sum _ { i = 1 } ^ { n } \left( \mathbf { C P I } _ { i } \times F _ { i } \right)
$$

## 13015 计算机系统原理【第一章考点解析】

## 考点11 计算机性能的测试

例1.1 假设某个频繁使用的程序P 在机器M1 上运行需要10s，M1 的时钟频率为$2 \mathrm { G H z } _ { \circ }$ 设计人员想开发一台与M1具有相同ISA的新机器M2。采用新技术可使M2的时钟频率增加，但同时也会使CPI增加。假定程序P在M2上的时钟周期数是在M1上的1.5倍，则M2的时钟频率至少达到多少才能使程序P在M2上的运行时间缩短为6s？

## 分析：

1）程序 P 在机器 M1 上运行需要 10s，说明：M1的用户CPU时间是10s

2）M1的时钟频率为 2GHz，结合【公式】 用户CPU 时间 = 程序总时钟周期数 ÷ 时钟频率，

可以求出程序 P 在 M1上 总时钟周期数，程序总时钟周期数 = 用户CPU 时间 × 时钟频率

3）程序 P 在 M2 上的时钟周期数是 M1 的1.5倍，可以求出：程序 P 在 M2上 总时钟周期数

4）程序 P 在 M2 上的运行时间缩短为 6s，说明：M2的用户CPU时间是6s

5）时钟频率= 程序总时钟周期数 ÷ 用户CPU 时间，可以求出：程序 P 在 M2上的时钟频率

## 13015 计算机系统原理【第一章考点解析】

## 考点11 计算机性能的测试

例1.1 假设某个频繁使用的程序P 在机器M1 上运行需要10s，M1 的时钟频率为$2 \mathrm { G H z } _ { \circ }$ 设计人员想开发一台与M1具有相同ISA的新机器M2。采用新技术可使M2的时钟频率增加，但同时也会使CPI增加。假定程序P在M2上的时钟周期数是在M1上的1.5倍，则M2的时钟频率至少达到多少才能使程序P在M2上的运行时间缩短为 $6 { \mathrm { s } } ?$

解：

1）程序 P 在机器 M1上 总时钟周期数 = 10s×2GHz=20G

2）程序 P 在机器 M2上 总时钟周期数 = 20G×1.5=30G

3）要使程序 P 在 M2 上的运行时间缩短为 $\boldsymbol { 6 5 }$ ，

$$
\boxed { 1 } \boxed { 1 } \boxed { 1 } \boxed { 1 } 2 \boxed { \dot { 1 } } \boxed { \dot { 1 } } \boxed { \dot { 1 } } \boxed { \dot { 1 } } \boxed { \dot { 1 } } \boxed { \dot { 1 } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \boxed { \dot { 1 } } \boxed { \dot { 1 } } \boxed { \dot { 1 } } \boxed { \dot { 1 } } \boxed { \dot { 1 } } \overline { { \dot { 1 } } } \boxed { \dot { 1 } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline { { \dot { 1 } } } \overline  
$$

## 13015 计算机系统原理【第一章考点解析】

## 考点11 计算机性能的测试

## 【基础计算公式】

如果已知程序总指令条数和综合CPI，则可用如下公式

$$
1 2 , 1 3 , 1 5 , 2 5 , 3 6 , 7 5 , 7 6 , 1 5 , 7 6 , 1 5 , 7 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 1 5 , 9 6 , 5 8 , 9 6 , 1 5 , 9 6 6 , 1 5 , 9 6 , 5 8 , 9 6 6 , 1 5 , 9 6 , 5 8 , 9 6 6 , 1 5 , 9 6 , 5 8 8 , 9 6 , 5 8 8 , 9 6 , 6 6 0 , 5 6 0 , 5 6 0 , 5 8 0 , 6 6 0 , 5 6 0 , 5 6 0 , 5 0 6 , 5 0 6 , 5 0 6 , 5 0 6 , 6 0 0 , 5 6 0 , 5 6 0 0 , 5 6 0 , 5 0 6 0 , 6 0 0 , 5 6 0 0 , 5 6 0 0 , 5 6 0 0 , 6 0 0 , 5 6 0 0 , 5 6 0 0 , 6 0 0 0 , 5 6 0 0 0 , 6 0 0 0 , 6 0 0 0 0 , 5 6 0 0 0 , 6 0 0 0 0 , 6 0 0 0 0 0 0 , 0 0 0 0 0 0 0
$$

如果已知程序中共有 n 种不同类型的指令，第 i 种指令的条数和 CPI 分别为 $\mathsf { \pmb { C _ { i } } }$ 和 $\mathbb { C P l } _ { \mathrm { i } }$ ，则程序总时钟周期数 $\mathbf { \Sigma } = \sum _ { i = 1 } ^ { n } \left( { \mathrm { C P I } } _ { i } \times \mathbf { C } _ { i } \right)$

$$
H P - C P U ( H _ { 2 } ^ { + } | \overrightarrow { t } | ) = \frac { 4 C } { 1 2 } \sum _ { i = 1 } ^ { N } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } = \frac { 4 } { 1 2 } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \times \ \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } \frac { \partial \overrightarrow { t } } { \partial t } = \frac { 4 } { 1 2 } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac { \partial ^ { 2 } } { \partial t } \frac  \partial ^  
$$

程序的综合CPI(平均CPI)也可由以下公式求得，其中， $\mathsf { F } _ { \mathrm { i } }$ 表示第 i 种指令在程序中所占的比例。

$$
\frac { 4 } { 2 \pi } \frac { 2 } { 1 5 } ( \mathbf { D } \mid \mathbf { \Lambda } = \frac { 7 } { 1 5 } \mathbf { E } \mathbf { D } \mathbf { \Lambda } \mathbf { H } + \frac { 1 } { 2 } \mathbf { f } \mathbf { H } \mathbf { H } ) \frac { 1 } { 2 } \mathbf { f } \mathbf { H } \mathbf { E } \mathbf { \Lambda } \mathbf { H } \mathbf { \Lambda } \div \mathbf { \Lambda } \mathbf { \tilde { f } } \mathbf { H } \frac { 1 } { 2 } \mathbf { f } \mathbf { H } \mathbf { H } \mathbf { H } \Leftrightarrow \frac { 4 } { 2 } \mathbf { \tilde { f } } \mathbf { H } \mathbf { H } \mathbf { H }
$$

$$
\underline { { \underline { { \xi } } } } \underline { { \vec { = } } } \underline { { \mathbf { A } } } \mathbf { C P } | = \ \sum _ { i = 1 } ^ { n } \left( \mathbf { C P I } _ { i } \times F _ { i } \right)
$$

## 13015 计算机系统原理【第一章考点解析】

## 考点11 计算机性能的测试

例1.2假设计算机M的指令集中包含A、B、C三类指令，其CPI分别为1、2、4。某个程序P在M上被编译成两个不同的目标代码序列P1和P2，P1所含A、B、C三类指令的条数分别为8、2、2，P2所含A、B、C三类指令的条数分别为2、5、3。哪个代码序列总指令条数少？哪个执行速度快？它们的CPI分别是多少？

## 分析：

1）有A、B、C三类指令，其 CPI 分别为1、2、4，结合【公式】程序总时钟周期数 $\mathbf { \Sigma } = \sum _ { i = 1 } ^ { n } \left( { \mathrm { C P I } } _ { i } \times { \mathrm { C } } _ { i } \right)$

2）比较哪个代码序列总指令条数？加和比大小即可

3）比较哪个执行速度快？用户CPU时间

4）它们的 CPI 分别是多少，就是求综合CPI

综合CPI = 程序总时钟周期数 ÷ 程序总指令条数

## 13015 计算机系统原理【第一章考点解析】

## 考点11 计算机性能的测试

例1.2假设计算机M的指令集中包含A、B、C三类指令，其CPI分别为1、2、4。某个程序P在M上被编译成两个不同的目标代码序列P1和P2，P1所含A、B、C三类指令的条数分别为8、2、2，P2所含A、B、C三类指令的条数分别为2、5、3。哪个代码序列总指令条数少？哪个执行速度快？它们的CPI分别是多少？

解：

1）P1的总指令条数为： $8 + 2 + 2 = 1 2$ ，P2的总指令条数为： $2 + 5 + 3 = 1 0$ ，所以，P2的总指令条数少。

2）P1 的总时钟周期数为： $8 \times 1 + 2 \times 2 + 2 \times 4 = 2 0$ ，P2 的总时钟周期数为： $2 \times 1 + 5 \times 2 + 3 \times 4 = 2 4$ 因为两个指令代码序列在同一台机器上运行，所以时钟周期一样，故总时钟周期数少的代码序列所用时间短、执行速度快。显然，P1 比 P2 快。【公式】用户CPU 时间 = 程序总时钟周期数 × 时钟周期3）P1 的综合CPI = 程序总时钟周期数 ÷ 程序总指令条数，因此，

P1的 CPI为 $2 0 / 1 2 = 1 . 6 7$ ；P2 的 CPI为 $2 4 / 1 0 { = } 2 . 4$ o

## 13015 计算机系统原理【第一章考点解析】

## 考点12 用指令执行速度进行性能评估

MIPS（Million Instructions Per Second），其含义是平均每秒钟执行多少百万条指令。  
反映了机器执行定点指令的速度。

公式1： $\mathrm { M I P S } = \frac { f _ { \boxplus } ^ { \boxplus } \xrightarrow [ ] { * } { \boxplus } \mathbb { X } / \left. 1 0 ^ { 6 } \right. }  \mathrm { C P U } \left. \right\} \lambda ( \overbrace { \mathcal { I } } ^ { \boxplus } \mathbb { H } ) \left. \right. \left. ( \overrightarrow { \mathbb { H } } ) \right. \left. ( \overrightarrow { \mathbb { H } } ) \right.$

举例：指令总数=50000000，CPU执行时间=2秒，则 ${ \sf M I P S } = 5 \times 1 0 ^ { 7 } / 1 0 ^ { 6 } \div 2 = 2 5 { \sf M I P S }$

公式2： $\mathrm { M I P S } = { \frac { \mathbb { H } \mathbb { f } \mathbb { f } \mathbb { H } { \frac { \mathrm { i } \mathrm { E } \mathbb { f } } { \mathrm { i } \mathrm { e } } } \left( \mathrm { H z } \right) } { \mathrm { C P I } \times 1 0 ^ { 6 } } }$

举例：

时钟频率是50KHz， CPI=2，则 ${ \sf M I P S } = 5 0 \times 1 0 ^ { 3 } / \left( 2 \times 1 0 ^ { 6 } \right) = 0 . 0 2 5 { \sf M I P S }$

时钟频率是50MHz，CPI=2，则 $\lvert \mathsf { M } \rvert \mathsf { P S } = 5 0 \times 1 0 ^ { 6 } / \left( 2 \times 1 0 ^ { 6 } \right) = 2 5 \mathsf { M } \rvert \mathsf { P S }$

时钟频率是50GHz， CPI=2，则 $\lvert \ M \rvert \mathrm { P S } = 5 0 \times 1 0 ^ { 9 } / \left( 2 \times 1 0 ^ { 6 } \right) = 2 5 0 0 0 \ M \lvert \mathrm { P S }$

## 13015 计算机系统原理【第一章考点解析】

## 考点12 用指令执行速度进行性能评估

例1.3假定某程序P编译后生成的目标代码由A、B、C、D四类指令组成，它们在程序中所占的比例分别为43%、21%、12%、24%，已知它们的CPI分别为1、2、2、2。现重新对程序P进行编译优化，生成的新目标代码中A类指令条数减少了50%，其他类指令的条数没有变。请回答下列问题。

①编译优化前后程序的CPI各是多少？

②假定程序在一台主频为50MHz的计算机上运行，则优化前后的MIPS各是多少？分析：

1）A类指令条数减少50%，可知：想到：A类指令条数减少，总指令条数减少（分母变了）；

比如：我有4个鸡蛋，张三有6个鸡蛋，我的鸡蛋占比 $4 \div ( 4 + 6 ) = 4 0 \%$ ，若我的鸡蛋个数减少了50%，那么我就剩下 $4 \div 2 = 2 \cdot$ 个鸡蛋，这时我的鸡蛋占比 $2 \div ( 2 + 6 ) = 2 5 \%$

2）求编译优化前后程序的 CPI 各是多少？实际求的是综合 $\mathbf { C P l } = \sum _ { i = 1 } ^ { n } \left( \mathbf { C P I } _ { i } \times F _ { i } \right) $

3）求MIPS，注意时钟频率单位：KHz、MHz、GHz

## 13015 计算机系统原理【第一章考点解析】

## 考点12 用指令执行速度进行性能评估

例1.3假定某程序P编译后生成的目标代码由A、B、C、D四类指令组成，它们在程序中所占的比例分别为43%、21%、12%、24%，已知它们的CPI分别为1、2、2、2。现重新对程序P进行编译优化，生成的新目标代码中A类指令条数减少了50%，其他类指令的条数没有变。请回答下列问题。

①编译优化前后程序的CPI各是多少？

②假定程序在一台主频为50MHz的计算机上运行，则优化前后的MIPS各是多少？解：

优化后A类指令的条数减少了50%，因而各类指令所占比例分别计算如下。

A类指令：21. 5/(21.5+21+12+24)=27%

B类指令：21/(21.5+21+12+24)=27%

C类指令：12/(21.5+21+12+24)=15%

D类指令：24/(21.5+21+12+24)=31%

## 13015 计算机系统原理【第一章考点解析】

## 考点12 用指令执行速度进行性能评估

例1.3假定某程序P编译后生成的目标代码由A、B、C、D四类指令组成，它们在程序中所占的比例分别为43%、21%、12%、24%，已知它们的CPI分别为1、2、2、2。现重新对程序P进行编译优化，生成的新目标代码中A类指令条数减少了50%，其他类指令的条数没有变。请回答下列问题。

①编译优化前后程序的CPI各是多少？

②假定程序在一台主频为50MHz的计算机上运行，则优化前后的MIPS各是多少？解：

① 优化前后程序的 CPI 分别计算如下。

优化前： $4 3 \% \times 1 + 2 1 \% \times 2 + 1 2 \% \times 2 + 2 4 \% \times 2 = 1 . 5 7$

优化后： $2 7 \% \times 1 + 2 7 \% \times 2 + 1 5 \% \times 2 + 3 1 \% \times 2 = 1 . 7 3$

② 优化前后程序的 MIPS 分别计算如下。

优化前：50M/(1.57×10<sup>6</sup>)=31.8 MIPS

优化后：50M/(1.73×10<sup>6</sup>)=28.9 MIPS

## 13015 计算机系统原理【第一章考点解析】

考点12 用指令执行速度进行性能评估

MIPS（Million Instructions Per Second），其含义是平均每秒钟执行多少百万条指令。  
反映了机器执行定点指令的速度。

MFLOPS（Million FLOating-point operations Per Second），其含义是每秒所执行的浮点运算有多少百万次，它是基于所完成的操作次数而不是指令数来衡量的。

反映了机器执行浮点操作的速度。

类似的浮点操作速度还有：

GFLOPS（10⁹次/s）

TFLOPS（10¹²次/s）

PFLOPS（10¹⁵次/s）

EFLOPS（10¹⁸次/s）

## 13015 计算机系统原理【第一章考点解析】

## 考点13 用基准程序进行性能评估

基准程序是进行计算机性能评测的一种重要工具。基准程序是专门用来进行性能评价的一组程序，能够很好地反映机器在运行实际负载时的性能，可以通过在不同机器上运行相同的基准程序来比较在不同机器上的运行时间，从而评测其性能。

## 谢谢大家