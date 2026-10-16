## 13015 计算机系统原理

第四章 课后习题 计算题讲解(部分)

讲师/公众号：小飞学长Pro

## 13015 计算机系统原理【第四章课后题】

3. 假设一个C语言程序有两个源文件：main.c 和test.c，它们的内容如图4.27所示。

![](images/bae56371a94810e6993162db036347c10a08b2d1783aa4e43469f670998dbc0b.jpg)  
图 4.27 题3 图

对于编译生成的可重定位目标文件test.o，填写表4.1中各符号的情况，说明每个符号是否出现在 test.o的符号表(. symtab节)中，如果是的话，则定义该符号的模块是main.o还是test.o、该符号的类型相对于test模块是全局、外部还是本地符号、该符号出现在test.o中的哪个节（. text、.data或.bss）或哪个特殊伪节（ABS、UNDEF或COMMON)中。

## 13015 计算机系统原理【第四章课后题】

3.假设一个C语言程序有两个源文件：main.c和test.c，它们的内容如图4.27所示。

/\* main.c \*!   
int sum(void);   
3 int a[4]={1, 2, 3, 4};   
4 extern int val;   
int main(){   
val=sum(),   
return val;   
8

/\* test.c \*/   
2 extern int a[];   
int \*ptr,val=0;   
4 int sum(){   
5 int i,   
6 for (i=0; i<4; i++)   
8 val += a[i];   
return val;   
10

<table><tr><td rowspan=1 colspan=1>符号</td><td rowspan=1 colspan=1>在test.o的符号表中?</td><td rowspan=1 colspan=1>定义模块</td><td rowspan=1 colspan=1>符号类型</td><td rowspan=1 colspan=1>节</td></tr><tr><td rowspan=1 colspan=1>a</td><td rowspan=1 colspan=1>在</td><td rowspan=1 colspan=1>main.o</td><td rowspan=1 colspan=1>外部</td><td rowspan=1 colspan=1>UNDEF</td></tr><tr><td rowspan=1 colspan=1>ptr</td><td rowspan=1 colspan=1>在</td><td rowspan=1 colspan=1>test. o</td><td rowspan=1 colspan=1>全局</td><td rowspan=1 colspan=1>COMMON</td></tr><tr><td rowspan=1 colspan=1>val</td><td rowspan=1 colspan=1>在</td><td rowspan=1 colspan=1>test.o</td><td rowspan=1 colspan=1>全局</td><td rowspan=1 colspan=1>. bss</td></tr><tr><td rowspan=1 colspan=1>sum</td><td rowspan=1 colspan=1>在</td><td rowspan=1 colspan=1>test.o</td><td rowspan=1 colspan=1>全局</td><td rowspan=1 colspan=1>.text</td></tr><tr><td rowspan=1 colspan=1>i</td><td rowspan=1 colspan=1>不在</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

1 extern int buf[ ];   
2 int \* bufp0 = &buf[ 0];   
3 int \* bufp1;   
4   
5static void incr()   
6 static int count=0;   
7 count++;   
8   
9 void swap()   
10 int temp;   
11 iner();   
12 bufp1 = &bufp[1];   
13 temp = \* bufp0;   
14 \* bufp0 = \* bufp1;   
15 \* bufp1=temp;   
16

## 13015 计算机系统原理【第四章课后题】

4.假设一个 C 语言程序有两个源文件：main.c 和 swap.c，其中，main.c的内容如图4.9a所示，而 swap. c 的内容如下：

1 extern void swap(void);  
2  
3 int buf[2] = {1, 2}:  
4  
5 int main(){  
6 swap():  
7 return 0;  
8 1

a) main.c 文件

## 13015 计算机系统原理【第四章课后题】

对于编译生成的可重定位目标文件swap.o，填写表4.2中各符号的情况，说明每个符号是否出现在 swap.o的符号表（. symtab节）中，如果是，定义该符号的模块是 main.o还是swap.0、该符号的类型相对于swap.o是全局、外部还是本地符号、该符号出现在 swap.o中的哪个节（.text、.data 或.bss）或哪个特殊伪节（ABS、UNDEF或COMMON）中。

<table><tr><td rowspan=1 colspan=1>符号</td><td rowspan=1 colspan=1>在swap.o的符号表中?</td><td rowspan=1 colspan=1>定义模块</td><td rowspan=1 colspan=1>符号类型</td><td rowspan=1 colspan=1>节</td></tr><tr><td rowspan=1 colspan=1>buf</td><td rowspan=1 colspan=1>在</td><td rowspan=1 colspan=1>main. o</td><td rowspan=1 colspan=1>外部</td><td rowspan=1 colspan=1>UNDEF</td></tr><tr><td rowspan=1 colspan=1>bufp0</td><td rowspan=1 colspan=1>在</td><td rowspan=1 colspan=1>swap. o</td><td rowspan=1 colspan=1>全局</td><td rowspan=1 colspan=1>. data</td></tr><tr><td rowspan=1 colspan=1>bufp1</td><td rowspan=1 colspan=1>在</td><td rowspan=1 colspan=1>swap. o</td><td rowspan=1 colspan=1>全局</td><td rowspan=1 colspan=1>COMMON</td></tr><tr><td rowspan=1 colspan=1>incr</td><td rowspan=1 colspan=1>在</td><td rowspan=1 colspan=1>swap.o</td><td rowspan=1 colspan=1>本地</td><td rowspan=1 colspan=1>.text</td></tr><tr><td rowspan=1 colspan=1>count</td><td rowspan=1 colspan=1>在</td><td rowspan=1 colspan=1>swap.o</td><td rowspan=1 colspan=1>本地</td><td rowspan=1 colspan=1>. bss</td></tr><tr><td rowspan=1 colspan=1>swap</td><td rowspan=1 colspan=1>在</td><td rowspan=1 colspan=1>swap.o</td><td rowspan=1 colspan=1>全局</td><td rowspan=1 colspan=1>. text</td></tr><tr><td rowspan=1 colspan=1>temp</td><td rowspan=1 colspan=1>不在</td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td><td rowspan=1 colspan=1></td></tr></table>

## 13015 计算机系统原理【第四章课后题】

6.以下每一小题给出了两个源程序文件，它们被分别编译生成可重定位目标模块m1.o和 m2. o。在模块 mj 中对符号 x 的任意引用与模块 mi 中定义的符号 x 关联记为 REF(mj. x)→DEF(mi.x)。请在下列空格处填写模块名和符号名，以说明给出的引用符号所关联的定义符号，若发生链接错误则说明其原因；若从多个定义符号中任选则给出全部可能的定义符号，若是局部变量则说明不存在关联。

![](images/8ae1d9576878c5ce580300c4e7ceae25f5dc90654edb1e5d7ce3502bbe311925.jpg)

REF(m1.main)→在m1中不存在对main的引用

① REF(m1. main)→DEF(

② REF(m2. main)→DEF()

③ REF(m1. p1)→DEF(

④ REF(m2. p1)→DEF(

② REF(m2.main)→DEF(m2.main)

③ REF(m1.p1)→DEF(m2.p1)

④ REF(m2.p1)→在m2中不存在对p1的引用

## 13015 计算机系统原理【第四章课后题】

(2)

![](images/34c99f61221dd6786a87837ae102833a6f93ac5c5760be08970d7ac14a04d74c.jpg)

①REF(m1. main)→DEF(

②REF(m2. main)→DEF(

③ REF(m1. x)→DEF(

## 答：

发生链接错误，因为全局变量 x 在两个目标模块中都有强定义

## 13015 计算机系统原理【第四章课后题】

(3)

![](images/2507c1d410a3b8398615dcb5ebe664b6876f91a71c83c9f71e5ae519e370d838.jpg)

① REF(m1. main)→DEF(

② REF(m2. main)→DEF(

③ REF(m1. p1)→DEF(.

④ REF(m1. x)→DEF(

⑤REF(m2. x)→DEF(

① REF(m1.main)→在m1中不存在对main的引用

② REF(m2.main)→DEF(m2.main)

③ REF(m1.p1)→

④ REF(m1.x)→ 局部变量，不存在关联

⑤ REF(m2.x)→DEF(m2.x)

## 13015 计算机系统原理【第四章课后题】

<table><tr><td></td><td>/* m1.c */</td><td></td><td></td><td>/* m2.c */</td><td></td><td></td></tr><tr><td></td><td>int p1(void) ;</td><td></td><td></td><td></td><td>double x=10;</td><td></td></tr><tr><td>int x, y;</td><td></td><td></td><td></td><td>int y;</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td>int main()</td><td></td><td></td><td>int p1()</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td>x=p1();</td><td></td><td></td><td>y=1;</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td>return x;</td><td></td><td></td><td></td><td>return y;</td><td></td></tr></table>

① REF(m1. x)→DEF(

② REF(m2. x)→DEF(

③ REF(m1. y)→DEF(

④ REF(m2. y)→DEF(

答：

① REF(m1.x)→DEF(m2.x)

② REF(m2.x)→在m2中不存在对x的引用

③ REF(m1.y)→在m1中不存在对y的引用

④ REF(m2.y)→DEF(m1.y) 或者DEF(m2.y)

## 谢谢大家