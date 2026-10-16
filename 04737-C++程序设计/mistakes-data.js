/* ── 错题数据（由 AI 维护）────────────────────────────
 * 录入流程：把错题发给 AI（拍照、口述、粘贴题干均可）→ AI 总结为条目追加到下方数组
 *          → git add/commit/push → GitHub Pages 上线，mistakes.html 自动显示
 *
 * 字段说明（只有 exam / q / fix 三个必须有值，其余都可缺省）：
 *   exam  试卷编号，分组依据，如 "2025年10月"（写成"YYYY年M月"才能按时间倒序排）
 *   no    题号，如 "5" 或 "单选5"（可缺省）
 *   type  题型："单选" | "填空" | "程序填空" | "程序分析" | "程序设计"（可缺省，页面会自动生成筛选项）
 *   ch    章节号 1~9（0 或缺省 = 未分类）：
 *         1 C++语言基础  2 类与对象  3 构造析构与特殊成员  4 运算符重载  5 继承与派生
 *         6 多态与虚函数  7 输入/输出流  8 文件操作  9 模板
 *   kp    考点，如 "考点18"（可缺省）
 *   q     题目概述（题干文字，可含代码说明）
 *   opts  选项数组（选择题用，每项一行显示，如 "A. 基类的析构函数不能被继承"）
 *   code  代码/程序片段（程序填空、程序分析、程序设计题用；保留缩进原样显示）
 *   wrong 我的错因（当时为什么做错）
 *   fix   正确思路 / 答案 / 考点讲解
 *   done  是否已掌握：true = 已掌握，false = 未掌握（默认 false）
 * ──────────────────────────────────────────────────── */
window.MISTAKES = [
  /* ── 追加新错题：把下面模板复制出来改内容，粘在本行位置（数组内、逗号分隔）──
  { exam:"2025年10月", no:"5", type:"单选", ch:3, kp:"考点18",
    q:"下列关于构造函数的说法中，正确的是",
    opts:["A. 构造函数可以声明返回类型",
          "B. 构造函数不能被继承",
          "C. 构造函数可以声明为虚函数",
          "D. 构造函数可以显式调用"],
    wrong:"把「构造函数可以被继承」和「派生类能调用基类构造函数」搞混，错选了 A/C 里的干扰项",
    fix:"答案 B。构造函数不能被继承——派生类只是在自己的构造函数初始化列表里调用基类构造函数。构造函数不能声明返回类型（连 void 都不行）、不能是虚函数（对象还没构造完，虚表指针未建立）、不能像普通成员函数那样显式调用（a.A() 非法）。",
    done:false },
  ── 程序题模板（带代码）──
  { exam:"2025年4月", no:"三、1", type:"程序分析", ch:6, kp:"考点39",
    q:"写出下面程序的运行结果",
    code:"class Base {\npublic:\n  Base(){ cout << \"B\"; }\n  virtual ~Base(){ cout << \"~B\"; }\n};\nclass D : public Base {\npublic:\n  D(){ cout << \"D\"; }\n  ~D(){ cout << \"~D\"; }\n};\nint main(){ Base* p = new D; delete p; }",
    wrong:"只按构造顺序写了 BD，析构顺序漏写、或者把析构顺序也当成先基类后派生",
    fix:"输出 B D ~D ~B。构造顺序：先基类后派生（Base 构造、D 构造）；析构顺序相反：先派生后基类（~D、~B）。这里 p 是 Base* 但析构函数是 virtual，所以 delete p 能正确调到 ~D，否则只输出 ~B（未定义行为的内存泄漏）。",
    done:false },
  ── 追加新错题 ──
  */

  { exam:"2025年10月", no:"24", type:"程序填空", ch:6, kp:"考点40",
    q:"将下面的程序补充完整，使程序输出的结果为：C++程序设计 / E::~E() called. / B::~B() called.",
    code:"#include<iostream>\n#include<string>\nusing namespace std;\nclass B {\npublic:\n  void start() { cout<<\"B::start() called.\\n\"; }\n  ____(1)____ { cout<<\"B::~B() called.\\n\"; }\n};\nclass E : public B {\nprivate:\n  string buf;\npublic:\n  E(string p) { ____(2)____; cout<<buf<<endl; }\n  ~E() { cout<<\"E::~E() called.\\n\"; }\n};\nvoid fun(B *a) { delete a; }\nint main() {\n  B *a = ____(3)____;\n  fun(a);\n}",
    wrong:"第(1)空只写了 ~B() 漏了 virtual——没意识到 a 虽是 B* 但实际指向 E 对象，对「经基类指针 delete 派生类对象必须配虚析构」这条规则不熟",
    fix:"答案：(1) virtual ~B()；(2) buf=p；(3) new E(\"C++程序设计\")。关键在第(1)空：a 是 B* 指向 E 对象，delete a 时若 ~B 非虚，只会调基类析构、不会输出 E::~E()（派生部分未释放，还可能内存泄漏）；基类析构声明为 virtual 后，析构按先派生后基类的顺序执行，才得到 E::~E() called. 和 B::~B() called.。(2) 把形参存入 buf，构造时才能输出第一行 C++程序设计；(3) 用派生类构造函数在堆上建 E 对象交给基类指针。",
    done:false },

  { exam:"2025年10月", no:"25", type:"程序填空", ch:9, kp:"考点52",
    q:"将下面的程序补充完整，使程序输出的结果为：-1,4-->4 / 1.5,3.8-->3.8",
    code:"#include <iostream>\nusing namespace std;\n____(1)____\nclass A {\npublic:\n  T x,y;\n  void f(T a,T b) { x=a; y=b; }\n  ____(2)____{ return (x>y)?x:y; }\n  void print(T x,T y) { cout<<x<<\",\"<<y<<\"-->\"<<max(x,y)<<endl; }\n};\nint main() {\n  A <int>a;\n  A <double>b;\n  a.f(-1,4);\n  a.print(a.x,a.y);\n  ____(3)____;\n  b.print(b.x,b.y);\n}",
    wrong:"第(1)空写错了——类模板定义开头必须有一行 template<typename T>（或 template<class T>）的模板声明，这里没写对，T 就无从声明",
    fix:"答案：(1) template<typename T>（写 template<class T> 也可以）；(2) T max(T x,T y)；(3) b.f(1.5,3.8)。A<int>、A<double> 说明 A 是类模板：第(1)空必须在 class A 之前写模板声明行，T 才能作为成员的类型使用（类模板定义格式：template<typename T> + class，漏写或格式错都编译不过）；第(2)空 max 是返回较大者的成员函数，返回类型和两个参数都用 T；第(3)空 b 是 A<double> 对象，先调 b.f(1.5,3.8) 存入 x、y，print 才输出 1.5,3.8-->3.8（第一行 -1,4-->4 由 a.f(-1,4) 得来）。",
    done:false },

  { exam:"2025年10月", no:"30", type:"程序分析", ch:7, kp:"考点43",
    q:"阅读程序，写出运行结果（cout 格式控制：width / precision / setf(showpos) / setw / setf(scientific)）",
    code:"#include <iostream>\n#include <iomanip>\nusing namespace std;\nint main()\n{\n  double a = 123.45678;\n  cout.width(4);    cout<<\"*\"<<\"a=\"<<endl;\n  cout.precision(6);    cout<<a<<endl;\n  cout.setf(ios::showpos);    cout<<a<<endl;\n  cout<<setw(10)<<-a<<endl;\n  cout.setf(ios::scientific);    cout<<a<<endl;\n}",
    wrong:"三个坑都踩了：① 对齐方式错误——忘了默认右对齐，补位应补在左边；② 错误地用 * 填充——width 的填充符默认是空格（除非 setfill 指定），题里的 \"*\" 是要输出的内容不是填充符；③ 科学计数法写错——scientific 下 precision(6) 是小数点后 6 位，且 showpos 设置后一直有效，最后一行也要带 +",
    fix:"5 行输出（␣ 代表空格）：\n␣␣␣*a=\n123.457\n+123.457\n␣␣-123.457\n+1.234568e+002\n① width(4) 只作用于紧随其后的 \"*\"（一次有效）：1 个字符右对齐补 3 个空格到宽 4，再原样输出 a=。\n② precision(6)：默认格式下是 6 位有效数字 → 123.457。\n③ setf(showpos) 持久生效，正数前加 + → +123.457。\n④ setw(10) 一次有效：-123.457 共 8 字符，右对齐左补 2 个空格；负数自带 -，showpos 对负数不再加 +。\n⑤ setf(scientific) 后 precision 变成小数点后位数 → 1.234568e+002（教材/VC 口径指数 3 位；GCC 等编译器输出 e+02），showpos 仍未清除 → 前面带 +。",
    done:false },

  { exam:"2025年10月", no:"28", type:"程序分析", ch:5, kp:"考点34",
    q:"阅读程序，写出运行结果（Person 基类 + Student/Teacher 派生类，两个栈上对象的构造析构顺序）",
    code:"#include <iostream>\nusing namespace std;\n\nclass Person\n{\npublic:\n    Person() { cout << \"Constructor of Person:\" << endl; }\n    ~Person() {}\n};\n\nclass Student: public Person\n{\npublic:\n    Student() { cout << \"Constructor of Student\" << endl; }\n    ~Student() {}\n};\n\nclass Teacher: public Person\n{\npublic:\n    Teacher() {}\n    ~Teacher() { cout << \"Destructor of Teacher\" << endl; }\n};\n\nint main()\n{\n    Student s;\n    Teacher t;\n}",
    wrong:"输出顺序写错——漏了构造 Teacher 时也会先调基类构造、再输出一行 Constructor of Person:（每个派生类对象构造都要先走基类构造）；或把析构顺序当成先构造的先析构；~Student、~Person 函数体是空的，没有输出，别多写",
    fix:"4 行输出（已用编译器实测）：\nConstructor of Person:\nConstructor of Student\nConstructor of Person:\nDestructor of Teacher\n① 构造按对象定义顺序：先 s 后 t；且每个派生类对象构造都先调基类构造——s：Person 构造输出（注意行尾有冒号，Student 那行没有）→ Student 构造输出；t：Person 构造又输出一行 → Teacher 构造体为空不输出。\n② 析构与构造完全相反：t 先析构 → ~Teacher 输出 Destructor of Teacher → ~Person（空体无输出）；再 s 析构 → ~Student（空）→ ~Person（空），都无输出。\n③ ~Person 不是虚函数也没关系：s、t 是栈上具名对象，不是经基类指针 delete，派生类析构一定被调用；哪些行有输出只取决于哪个构造/析构函数体里写了 cout。",
    done:false },

  { exam:"2025年10月", no:"31", type:"程序设计", ch:1, kp:"考点7",
    q:"编写程序：先输入一个整数 n(n<100)，再输入 n 个数保存在一维数组 A 中，调用自定义函数 sortA() 将这 n 个数从小到大排序，主函数中输出排序后的结果",
    code:"#include <iostream>\nusing namespace std;\nvoid sortA(int a[], int n)\n{\n    int i, j, t;\n    for (i = 0; i < n - 1; i++)\n        for (j = 0; j < n - 1 - i; j++)\n            if (a[j] > a[j + 1])\n            { t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; }\n}\nint main()\n{\n    int a[100], n, i;\n    cin >> n;\n    for (i = 0; i < n; i++)\n        cin >> a[i];\n    sortA(a, n);\n    for (i = 0; i < n; i++)\n        cout << a[i] << \" \";\n    cout << endl;\n    return 0;\n}",
    wrong:"排序边界和数组传参不熟：内层循环条件 j<n-1-i 容易误写成 j<n（越界多比一次）；形参 int a[] 与 int *a 的等价关系、数组名作实参自动传地址这点犹豫不决；趟数 n-1 与每趟比较次数容易差一",
    fix:"参考答案见上方代码（冒泡排序，已编译运行验证：输入 5 个数 3 1 4 1 5 → 输出 1 1 3 4 5）。\n① n<100 → 数组开 a[100]；形参 int a[] 等价 int *a，数组名作实参传的就是地址，所以 sortA 里排好序，主函数里的 a 也就有序了。\n② 冒泡双循环：外层共 n-1 趟（i=0 到 n-2）；内层 j<n-1-i——每趟把当前最大值沉底后，尾部已就位的元素不用再比。\n③ 交换必须借临时变量：t=a[j]; a[j]=a[j+1]; a[j+1]=t;。\n④ 2025 年起程序设计第一小题考这种纯基础保底题（数组+函数），必须 10 分拿满。",
    done:false },

  { exam:"2025年10月", no:"32", type:"程序设计", ch:8, kp:"考点48",
    q:"编写程序：把 d 盘根目录下文件 file1.txt 的内容复制到同目录下新建的文件 file2.txt 中，并显示 file2.txt 文件的内容，若打开文件失败请给出提示",
    code:"#include <iostream>\n#include <fstream>\nusing namespace std;\nint main()\n{\n    char ch;\n    ifstream fin(\"d:\\\\file1.txt\");\n    if (!fin) { cout << \"打开 file1.txt 失败\" << endl; return 0; }\n    ofstream fout(\"d:\\\\file2.txt\");\n    if (!fout) { cout << \"创建 file2.txt 失败\" << endl; return 0; }\n    while (fin.get(ch))\n        fout << ch;\n    fin.close();\n    fout.close();\n    ifstream f2(\"d:\\\\file2.txt\");\n    if (!f2) { cout << \"打开 file2.txt 失败\" << endl; return 0; }\n    while (f2.get(ch))\n        cout << ch;\n    f2.close();\n    return 0;\n}",
    wrong:"文件复制的固定套路没记牢：打开失败判断 if(!fin) 漏写；逐字符复制误用 fin>>ch（>> 按空白分隔提取，空白和换行全丢，复制后格式乱）；显示 file2 内容时要先 close 再重新打开读取，顺序容易乱",
    fix:"参考答案见上方代码（考点48 固定套路：打开→判断→复制→关闭→重开显示，已编译验证打开失败的提示分支）。\n① 打开即判断：if(!fin){cout<<\"打开失败\"…;return 0;}——题目明说「打开失败请给出提示」，每个流都要判；ofstream fout(\"d:\\\\file2.txt\") 默认 ios::out，文件不存在则新建（题目要的「新建」就是这么来的）。\n② 复制用 while(fin.get(ch)) fout<<ch;——get(ch) 逐字符且不跳过空白换行；用 >> 复制会把所有空白换行丢掉。\n③ 显示：先 fin.close()/fout.close()，再 ifstream f2 重新打开 file2.txt 读出来 cout，读完 f2.close()。\n④ 路径写在字符串里，反斜杠必须双写：源码里是 \"d:\\\\file1.txt\"。",
    done:false },

  { exam:"2025年4月", no:"32", type:"程序填空", ch:3, kp:"考点21",
     q:"补全复制构造函数，使程序输出：第一行 100,\\t10,\\t1；第二行 0,\\t5,\\t1。考查带指针成员的深拷贝。",
     code:"#include <iostream>\nusing namespace std;\nclass pointer\n{\npublic:\n    int a;\n    int *p;\n    pointer()\n    {\n        a=100;\n        p=new int(10);\n    }\n    pointer(const pointer &temp)\n    {\n        if(this != (1))\n        {\n            a = temp.a;\n            p = (2);\n        }\n    }\n};\nint main()\n{\n    pointer p1;\n    pointer p2(p1);\n    cout<<p1.a<<\",\\t\"<<*p1.p<<\",\\t\"<<(p1.p!=p2.p)<<endl;\n    *p1.p=5;\n    p2.a=20;\n    cout<<(p1.a==p2.a)<<\",\\t\"<<*p1.p<<\",\\t\"<<(p1.p!=p2.p)<<endl;\n    return 0;\n}",
     wrong:"第(2)空写成了 temp.p，把指针成员的地址直接复制成浅拷贝；另外根据题面还原时把 a=temp.a 误看成了 a=*temp.p。",
     fix:"答案：(1) &temp；(2) new int(*temp.p)。复制构造函数中，a 是普通 int 成员，应复制 temp.a；p 是指针，不能写 p=temp.p，否则 p1.p 与 p2.p 指向同一块堆内存，析构时会重复释放，且修改一方会影响另一方。深拷贝要先 new 一块新 int，再复制指针所指的值：p=new int(*temp.p)。this != &temp 是防止自复制的判断。按 PDF 中的 != 比较，深拷贝使两指针地址不同，所以两行末尾都是 1；修改 *p1.p 后只改变 p1 的值，p2 仍独立。",
     done:false },

  { exam:"2025年4月", no:"35", type:"程序填空", ch:7, kp:"考点46",
     q:"从输入字符串中提取电话号码：输入 Tel,123456，输出 123456。",
     code:"#include <iostream>\nusing namespace std;\nint main()\n{\n    char str[30];\n    while(!cin.eof())\n    {\n        cin.ignore(10, ',');\n        if( (1) )\n        {\n            (2) ;\n            cout << str << endl;\n        }\n    }\n    return 0;\n}",
     wrong:"两个空都填错了：没有先判断输入流状态，且把读取逗号后剩余字符串的成员函数写错。ignore 只负责跳过 Tel,，不会把电话号码放进 str。",
     fix:"答案建议：(1) cin.good()；(2) cin.getline(str,30)。cin.ignore(10, ',') 从输入流中最多跳过 10 个字符，遇到逗号也停止，并丢弃逗号，因此 Tel, 被跳过；随后 cin.getline(str,30) 读取剩余的 123456，cout 输出电话号码。cin.good() 用来确认跳过操作后流状态正常。对本题这一行输入，(1) 写 !cin.eof() 也能工作，但 good() 更直接地检查输入是否成功；实际编程不建议单独用 while(!cin.eof()) 控制读取，应优先用读取成功条件。",
     done:false },

  { exam:"2025年4月", no:"41", type:"程序设计", ch:1, kp:"考点6",
     q:"设计程序：输入圆的半径，计算并输出圆的周长和面积。其中 pi 用常量定义，半径、周长和面积均为双精度（double）类型。",
     code:"#include <iostream>\nusing namespace std;\nint main()\n{\n    const double pi = 3.1415926;   // ← 常量定义（本题的错误点）\n    double r, c, s;\n    cout << \"请输入半径：\";\n    cin >> r;\n    c = 2 * pi * r;   // 周长 = 2πr\n    s = pi * r * r;   // 面积 = πr²\n    cout << \"周长=\" << c << endl;\n    cout << \"面积=\" << s << endl;\n    return 0;\n}",
     wrong:"圆周长面积的思路会写，但「pi 用常量定义」这一行写错——这是本题唯一的规定动作，写错直接丢分。四种典型错法（均已用编译器实测确认报错）：\n① 漏类型：const pi = 3.14; → error: a type specifier is required for all declarations（const 后面必须跟类型名）。\n② 先定义后赋值：const double pi; pi = 3.14; → error: default initialization of an object of const type 'const double' + cannot assign to variable 'pi' with const-qualified type（const 变量必须在定义处就初始化）。\n③ 宏定义写成赋值：#define pi = 3.14 → error: expected expression（宏定义不写等号）。\n④ 宏末尾多写分号：#define pi 3.14; → error: indirection requires pointer operand（分号一起被替换，2*pi*r 展开成 2*3.14;*r）。\n另有「写成普通变量 double pi = 3.14;」，语法没错但不满足题面「用常量定义」的要求。",
     fix:"标准写法：const double pi = 3.1415926;（已编译运行验证：r=2 → 周长=12.5664，面积=12.5664）\n① const 常量（常变量）格式：const + 类型名 + 名字 + = + 初值；——必须定义时初始化，此后只读，先定义后赋值 pi=3.14; 也是编译错误。\n② 命名习惯：常量名写全大写（PI），和普通变量区分开。\n③ 也可以用宏：#define PI 3.1415926——宏定义不能写 =、末尾不能加分号，这两个坑最容易踩。\n④ 类型要求别漏：double r, c, s; 三个量都是 double，cin >> r; 读半径，再算 c = 2*pi*r、s = pi*r*r，cout 输出。\n⑤ 对照记忆：const 常量 = 有类型的只读变量（编译期检查、遵守作用域）；#define 宏 = 预处理阶段的纯文本替换（无类型、无作用域、吃分号）。题目说「pi 用常量定义」两种都算，用 const 更符合 C++ 习惯。\n⑥ 这是 2025 年起新出现的「纯基础保底程序设计题」（10 分），和 2025.10 设计31 的 sortA 排序一样属于必须拿满的题。",
     done:false },

  { exam:"2025年4月", no:"42", type:"程序设计", ch:8, kp:"考点48",
     q:"文件 score.txt 中存储学生的学号、姓名和成绩（2024001001 zhangsan 99 / 2024001002 lisi 97 / 2024001003 wangwu 95），设计程序从文件中读入学生成绩并显示，输出「学号 姓名 成绩」表头加三条记录。",
     code:"#include <iostream>\n#include <fstream>\n#include <string>\nusing namespace std;\nint main()\n{\n    ifstream inf(\"score.txt\");\n    if (!inf) { cout << \"打开 score.txt 失败\" << endl; return 0; }\n    string id, name;\n    int score;\n    cout << \"学号 姓名 成绩\" << endl;\n    while (inf >> id >> name >> score)   // ← 读取循环（本题的错误点）\n        cout << id << \" \" << name << \" \" << score << endl;\n    inf.close();\n    return 0;\n}",
     wrong:"读文件的 while 循环写错了——本题拿分点就在「怎么判断读到文件尾」。四种典型错法（均已编译实测）：\n① 写成 while(!inf.eof()) { inf >> id >> name >> score; cout<<...; } → 最后一条记录输出两遍（实测多出 2024001003 wangwu 95）。eof 是「上一次读取失败之后」才置位的标志：读完最后一条时它还是 false，循环再进一次，这次 sentry 因撞到文件尾直接失败、不修改任何变量，id/name/score 里仍是上一条的值，于是又输出一遍（实测第 4 次循环 eof=1 fail=1）。\n② 三个字段之间写成逗号：while (inf >> id, name, score) → 逗号表达式只取最后一个操作数当条件，id 读了、name/score 没读，score 是未初始化的随机值，实测直接死循环。\n③ 字段顺序与文件中的列不一致：while (inf >> score >> id >> name) → 读出来的列全串位（实测输出 zhangsan 99 2024001001 / lisi 97 2024001002 …）。\n④ 循环末尾多写分号 while(...); 循环体成空语句一条都不显示；或循环体里又写一次 inf >> id >> name >> score;，变成隔行读、漏掉一半记录。\n另有忘了 if(!inf) 判打开失败、把 inf 误写成 cin 这两处粗心点。",
     fix:"标准写法：while (inf >> id >> name >> score) cout << id << \" \" << name << \" \" << score << endl;（已编译运行验证，输出与题目要求逐字一致）\n① 「读取表达式」直接作循环条件是 C++ 读文件的惯用法：inf >> x 返回流对象引用，读成功时流为真，读到文件尾或格式不符时流为假，循环自动结束——只读一次，不多输出也不漏读。\n② 对照 while(!inf.eof())：eof 是「上一次读取失败后」才置位的标志，拿它当条件一定多进一次循环、多输出一遍最后一条记录。\n③ 字段顺序必须和文件里的列一一对应（先 id、再 name、后 score），类型要对：学号、姓名用 string（或 char 数组），成绩用 int；文件是空白分隔，>> 正好按空白提取，本题不需要 getline。\n④ 答题骨架（考点48 固定套路）：定义 ifstream inf(\"score.txt\") → if(!inf) 打开失败提示 → 先输出表头「学号 姓名 成绩」→ while 边读边显示 → inf.close()。\n⑤ 只有内容含空格（如姓名带空格的整行）才改用 getline；本题三段都是无空格的「词」，用 >> 提取最快最稳。",
     done:false },

  { exam:"2025年4月", no:"31", type:"程序填空", ch:3, kp:"考点22",
    q:"补全程序，使程序输出结果为 85",
    code:"#include <iostream>\nusing namespace std;\nclass Test {\npublic:\n    ____(1)____\n    Test(int i = 5) {\n        x = i + x;\n    }\n    int Getnum() {\n        return Test::x + 7;\n    }\n};\n____(2)____\nint main() {\n    Test test;\n    cout << test.Getnum() << endl;\n}",
    wrong:"第(2)空直接写成了赋值语句 Test::x = 73;——把「类外定义」当成了「赋值」，少了类型和类域限定。两个错因：① 静态数据成员必须「类内声明 + 类外定义」，类外那一行是定义语句，要写 int Test::x = 73;，不能带 static；② 全局作用域只允许出现声明/定义，不允许写表达式语句，所以 Test::x = 73; 放在类外根本无法通过编译。",
    fix:"答案：(1) static int x;  (2) int Test::x = 73;\n为什么输出 85：(1) 类内 static int x; 只是声明，此时不分配内存、也不写初值；(2) 类外 int Test::x = 73; 才是定义并给初值 73（类外定义不再写 static，但要写类型 int 和类域 Test::）。main 里 Test test; 用默认实参 i=5 调构造 → x = i + x = 5 + 73 = 78（是「在已有静态值上累加」，不是覆盖初值）→ test.Getnum() 返回 Test::x + 7 = 78 + 7 = 85。\n配套要点：静态数据成员的「类内声明（写 static，不给初值）+ 类外定义（类型 类名::成员名 = 初值，不写 static）」是一对，漏掉类外定义会报链接错误（undefined reference）；文件作用域只能写定义/声明，不能写赋值、调用等语句；访问时 Test::x 与 test.x 是同一份存储。",
    done:false },

  { exam:"2024年10月", no:"32", type:"程序填空", ch:2, kp:"考点25",
     q:"以下程序输出数值 2024，请将程序补充完整。",
     code:"#include <iostream>\nusing namespace std;\nclass INTEGER\n{\npublic:\n    INTEGER(int a) { ____(1)____; }\nprivate:\n    int a;\n    ____(2)____(const INTEGER& obj);\n};\nvoid Print(const INTEGER & obj) { cout<<obj.a; }\nint main()\n{\n    INTEGER obj(2024);\n    Print(obj);\n}",
     wrong:"第(2)空填了 void Print——把它当成在类里声明一个普通成员函数，漏了 friend。类外的 void Print(const INTEGER & obj) 函数体里写了 cout<<obj.a，而 a 是私有成员：不把 Print 声明成友元，外面的函数无权访问（已编译实测报错 'a' is a private member of 'INTEGER'）。",
     fix:"答案：(1) this->a = a；(2) friend void Print，即类内写 friend void Print(const INTEGER& obj);（已编译运行验证，输出 2024）。\n① 第(2)空的判断方法：空在类内、形状是 ____(const INTEGER& obj);，而类外有同名函数定义 void Print(const INTEGER&) 且函数体访问了私有成员 a——必须把类外的 Print 声明为友元，空里带上 friend。friend 声明写在 private 段一样生效：友元不是成员函数，不受 public/private 限制。\n② 按错解填 void Print，那行只是声明了一个从未定义、也没人调用的私有成员函数，全局的 Print 依旧不是友元，obj.a 照样编译不过——这题考的就是 friend 三个字母不能丢。\n③ 第(1)空：构造函数参数 a 与成员 a 同名，参数把成员遮住了，a=a 只是参数自己赋给自己，要写 this->a = a 才能存进成员（考点17）。",
     done:false },

  { exam:"2024年10月", no:"36", type:"程序分析", ch:1, kp:"考点6",
     q:"阅读程序，填写程序的正确运行结果（共两行）。",
     code:"#include <iostream>\nusing namespace std;\nvoid setzero(int &a) { a = 0; }\nint main() {\n    int a = 1, b = 2;\n    const int *p = &a;\n    cout << a << ' ' << b << ' ' << *p << endl;\n    setzero(a);\n    setzero(b);\n    cout << a << ' ' << b << ' ' << *p << endl;\n    return 0;\n}",
     wrong:"第二行写成了 0 0 1——以为指针 p 在定义时把 a 的值 1 保存了下来，a 被 setzero 改成 0 之后 *p 还是 1；没意识到指针存的是地址，*p 跟着 a 变。",
     fix:"答案：第一行 1 2 1，第二行 0 0 0（已编译实测）。p 里存的是 a 的地址，*p 就是 a 本身，不是定义那一刻拍下的快照：setzero(int &a) 是引用传参（形参是实参的别名），a、b 被改成 0 后 *p 读到的自然是改后的 a。const int *p = &a 只限制「不能通过 p 写」（*p=5 编译错），既不妨碍 a 自己变化，也不会让 p 记住旧值——把指针当成「存值的盒子」是这类题的根子。",
     done:false },

  { exam:"2024年10月", no:"40", type:"程序分析", ch:7, kp:"考点43",
     q:"阅读程序，填写程序的正确运行结果（共三行）。",
     code:"#include <iostream>\n#include <iomanip>\n#include <string>\nusing namespace std;\nint main()\n{\n    double x=123.456;\n    cout<<\"x=\"<<setw(10)<<setprecision(5)<<x<<endl;\n    char str[20]=\"123_Hi\";\n    cout<<\"str=\"<<setfill('*')<<setw(8)<<str<<endl;\n    int i=0,cnt=0;\n    while(str[i])\n    {\n        if(str[i]>='0'&&str[i]<='9') cnt++;\n        i++;\n    }\n    cout.setf(ios::showpos);\n    cout<<\"cnt=\"<<cnt;\n}",
     wrong:"第一行 x 的对齐空格写少了——按 123.456 原样 7 个字符去补空格，漏了 setprecision(5) 在默认格式下是「5 位有效数字」：123.456 输出成 123.46 只有 6 个字符，setw(10) 应左补 4 个空格。",
     fix:"三行输出（已编译实测，␣ 代表空格）：\nx=␣␣␣␣123.46\nstr=**123_Hi\ncnt=+3\n① 第一行：默认（非 fixed）格式下 setprecision(n) 是 n 位有效数字，123.456 → 123.46（6 个字符）；setw(10) 只对紧跟的下一项 x 生效，默认右对齐，左补 10-6=4 个空格。先确定输出内容是什么，再数字符补空格。\n② 第二行：123_Hi 共 6 个字符，setw(8) 差 2 位用 setfill('*') 补在左边 → **123_Hi。\n③ while(str[i]) 逐字符扫到字符串结尾符为止，数字字符只有 '1''2''3'，cnt=3；setf(ios::showpos) 让正数带 + 号 → cnt=+3（showpos 只对数字生效，不影响字符串）。",
     done:false },

  { exam:"2024年10月", no:"41", type:"程序设计", ch:8, kp:"考点48",
     q:"读取 c 盘根目录 score.txt 文件中的数据（数据为学生的姓名和总成绩），在屏幕上显示这些排序前的数据，按学生成绩由高到低的顺序排序后，将结果存放在当前文件夹名为 out.txt 的文件中。",
     code:"#include <iostream>\n#include <fstream>\n#include <string>\n#include <algorithm>\nusing namespace std;\nstruct Stu { string name; double score; };\nbool cmp(const Stu &x, const Stu &y) { return x.score > y.score; }   // 成绩高在前：降序\nint main()\n{\n    Stu s[100];\n    int n = 0;\n    ifstream fin(\"c:\\\\score.txt\");   // ← 读取（本题的错误点）\n    if (!fin) { cout << \"打开 score.txt 失败\" << endl; return 0; }\n    while (fin >> s[n].name >> s[n].score)   // 全部读进数组再处理\n        n++;\n    fin.close();\n    for (int i = 0; i < n; i++)              // 显示排序前的数据\n        cout << s[i].name << \" \" << s[i].score << endl;\n    sort(s, s + n, cmp);\n    ofstream fout(\"out.txt\");\n    for (int i = 0; i < n; i++)\n        fout << s[i].name << \" \" << s[i].score << endl;\n    fout.close();\n    return 0;\n}",
     wrong:"读取部分写的不对——没有用 while(fin >> 姓名 >> 成绩) 把每条记录完整读进数组（边读边丢、或读完不存，后面就没法显示和排序）；排序也没有用 algorithm 头文件里的 sort，手写排序费时又容易错",
     fix:"参考答案见上方代码（已编译运行验证：score.txt 为 zhangsan 89 / wangwu 95 / lisi 72 / zhaoliu 63 时，屏幕按原顺序显示 4 条，out.txt 为 wangwu 95 / zhangsan 89 / lisi 72 / zhaoliu 63）。\n① 读取和 2025.04 设计42 同一个考点48 套路：姓名、成绩都是空白分隔的词，用 while(fin >> s[n].name >> s[n].score) n++; 逐条读进结构体数组，读取表达式作循环条件，读到文件尾自动停；打开后先 if(!fin) 判失败。\n② 题目要「显示排序前的数据」，所以必须先把 n 条全部读进数组再显示——四步分开：读 → 显示 → 排序 → 写，不能边读边往 out.txt 写。\n③ 排序用 algorithm 头文件的 sort 最省事：比较函数 bool cmp(const Stu &x, const Stu &y) { return x.score > y.score; }（大于号 = 从高到低），调用 sort(s, s+n, cmp)。不想用 sort 就手写冒泡，注意 name、score 两列要一起换（参考 2025.10 设计31 的 sortA）。\n④ c 盘路径在源码里写成 \"c:\\\\score.txt\"（反斜杠双写）；结果写当前文件夹的 out.txt，写完 close()。",
     done:false },

  { exam:"2026年4月", no:"12", type:"填空", ch:2, kp:"考点14",
    q:"定义类时，默认的成员访问权限是______。",
    wrong:"写了 protected——把「有哪三种访问权限」和「不写修饰符时默认归哪档」混在一起了：protected 只是三种权限之一，class 定义成员时不写访问修饰符，默认是 private。",
    fix:"答案：private。\n① 一对默认值对照记：class 默认 private，struct 默认 public——这是 class 和 struct 唯一的语法差别。\n② 别和「继承的默认方式」混淆（本题最容易踩的坑）：class 派生时不写继承方式，默认也是 private 继承（考点33）——「成员默认 private」+「继承默认 private」两个一起记，protected 永远不会是默认值。\n③ 三种权限的边界要分清：public 谁都能访问；private 只有类内和友元能访问；protected 是「类内 + 友元 + 派生类」能访问、外界不能——它常考在继承里（基类 protected 成员公有继承后在派生类仍是 protected，2026.04 单选8），不是默认权限。\n④ 配套考法：2026.04 单选3 同卷考了「私有成员类外不能直接访问」（公有成员函数接口或友元才碰得到）。",
     done:false },

  { exam:"2024年4月", no:"39", type:"程序填空", ch:5, kp:"考点34",
    q:"补全程序，使输出结果为两行：2024年4月 / C++程序设计自学考试",
    code:"#include <iostream>\nusing namespace std;\nclass A {\npublic:\n    A() { cout << \"2024年\"; }\n    ~A() { cout << \"自学考试\" << endl; }\n};\nclass B : A {\npublic:\n    B() { (1) ; }\n    ~B() { (2) ; }\n};\nint main() { B obj; }",
    wrong:"看错了题目要求的输出内容，而且不确定「基类的构造/析构会不会被隐式自动调用」——纠结 B() 里要不要显式写一行 A();、~B() 里要不要写 ~A();",
    fix:"答案：(1) cout << \"4月\" << endl;  (2) cout << \"C++程序设计\";\n基类会被隐式调用，B 里一个字都不用写：\n① 构造：main 里创建 B obj → 编译器自动先调基类 A() 输出「2024年」（这时还没进 B() 的函数体）→ 再执行 B() 函数体输出「4月」并换行 → 第一行 2024年4月。\n② 析构与构造严格相反：obj 离开 main → 先执行 ~B() 函数体输出「C++程序设计」（不带 endl，别换行）→ 再自动调 ~A() 输出「自学考试」并换行 → 第二行 C++程序设计自学考试。\n③ 两个空只负责「基类输出之外多出来的部分」，换行位置看要求的断行：4月后面要 endl（第一行到此结束），C++程序设计后面不写（换行由 ~A 里的 endl 完成）。\n④ 就算两个空都空着写成 B(){} ~B(){}，程序照样输出 2024年 / 自学考试——构造、析构函数不被继承，但创建/销毁派生类对象时基类版本总会被编译器自动调用；显式写 A(); 反而是画蛇添足（那是在调一个普通重名函数，编译不过）。",
    done:false },

  { exam:"2024年4月", no:"40", type:"程序填空", ch:4, kp:"考点28",
    q:"补全程序，使输出 输出1:1008 / 输出2:883",
    code:"#include <iostream>\nusing namespace std;\nclass A {\npublic:\n    A(int a = 135) { m_a = a; }\n    int get() { return m_a++; }   // 返回当前值，再自增\nprivate:\n    int m_a;\n};\nint (1) { return a1.get() + a2.get() - 15; }\nint main() {\n    A a1(888), a2, a3 = 9;\n    cout << \"输出1:\" << a1 + a2 << endl;\n    (2) ;\n}",
    wrong:"第二行数字算错了——没追踪 get() 的自增副作用：第一行 a1.get() 已经把 a1 的 m_a 从 888 加到 889，第二行再调 a1.get() 返回的是 889 不是 888；a3 = 9 是类型转换构造（m_a=9）也容易看漏。",
    fix:"答案：(1) operator+(A &a1, A &a2)——补在 int 后面作函数头，非成员/友元形式 2 个参数；(2) cout << \"输出2:\" << a1 + a3 << endl;\n逐行追踪（get() 先返回旧值再 m_a++，给每个对象单独记账）：\n① 对象初值：a1.m_a=888；a2 用默认参数 → m_a=135；a3 = 9 走类型转换构造 → m_a=9（考点20）。\n② 输出1：a1+a2 → a1.get() 返 888（a1→889）+ a2.get() 返 135（a2→136）- 15 = 1008 ✓。\n③ 输出2：a1+a3 → a1.get() 这次返回 889（不是 888！第一次调用已经把它加过 1，a1→890）+ a3.get() 返 9（a3→10）- 15 = 883 ✓（写成 a3 + a1 同样是 883）。\n④ 记账口诀：m_a++ 是「先给值后自增」，同一对象每 get() 一次，下次返回值就大 1；算追踪题时在草稿上列一行 m_a 值，每调一次 get 划掉旧的写上新的，第二行就不会算错。",
     done:false },

  { exam:"2024年4月", no:"46", type:"程序设计", ch:8, kp:"考点49",
    q:"编写程序将 C 盘文件 f1.txt 内容复制到 D 盘文件 f2.txt。要求：文件的读写使用函数 read、write，且每次读写一个字符。",
    code:"#include <iostream>\n#include <fstream>\nusing namespace std;\nint main()\n{\n    char ch;                                  // 1 字节缓冲区\n    ifstream fin(\"c:\\\\f1.txt\", ios::in | ios::binary);\n    ofstream fout(\"d:\\\\f2.txt\", ios::out | ios::binary);\n    if (!fin) { cout << \"打开 f1.txt 失败\" << endl; return 0; }\n    while (fin.read(&ch, 1))   // read 返回流引用：读到文件尾自动变假\n        fout.write(&ch, 1);\n    fin.close();\n    fout.close();\n    return 0;\n}",
    wrong:"不知道 read、write 两个函数的用法——原型没背住：不知道第一参数要传「缓冲区地址」、第二参数是「字节数」，单字符读写时想不到用 &ch 取地址，也不知道 read 的返回值可以直接当循环条件。",
    fix:"标准写法见上方代码（已编译运行验证：f1.txt 为 C++\\r\\n2026 时，f2.txt 与其逐字节一致）。\n① 两个函数原型（必须背）：istream& read(char *pch, int n); / ostream& write(const char *pch, int n);——第一参数是缓冲区的「地址」，第二参数是搬运的「字节数」。考点49 的核心记忆点：write 是「向输出流插入字节序列」（2025.10 单选17 原题）。\n② 每次读写一个字符 = 准备一个 char 变量 ch 作 1 字节缓冲区，read/write 都要地址，所以写 &ch：fin.read(&ch, 1) 从文件读 1 字节进 ch，fout.write(&ch, 1) 把 ch 的 1 字节写出。\n③ 循环条件直接用读取表达式 while(fin.read(&ch,1))：read 返回 istream& 流对象引用，读成功流为真、读到文件尾流为假，循环自动结束——和 while(fin>>x) 同一个套路（考点48），不多读也不漏读。\n④ 二进制方式打开 ios::binary：read/write 按字节原样搬运、不做换行转换（文本方式才对 \\n 做转换）；打开失败判 if(!fin)；C 盘 D 盘路径反斜杠双写 \"c:\\\\f1.txt\"、\"d:\\\\f2.txt\"。\n⑤ 进阶记法：整块/对象复制用 fout.write((char*)&obj, sizeof(obj))，实际读到的字节数用 fin.gcount() 查；逐字符文本复制则优先 get/put（fout.put(ch)），本题点名 read/write 才用 read(&ch,1)。",
     done:false },

  { exam:"2024年4月", no:"47", type:"程序设计", ch:2, kp:"考点14",
    q:"定义一个描述学生情况的类 stud，数据成员有姓名、英语成绩、C++成绩，成员函数有构造函数、写入函数、读出函数、求平均成绩函数、显示函数。最终构成一个完整的程序，测试数据成员与成员函数的正确性。",
    code:"#include <iostream>\n#include <string>\nusing namespace std;\n\nclass stud {\n    string name;   // 姓名\n    int eng;       // 英语成绩\n    int cpp;       // C++成绩\npublic:\n    stud(string n, int e, int c) { name = n; eng = e; cpp = c; }        // 构造函数\n    void set(string n, int e, int c) { name = n; eng = e; cpp = c; }    // 写入函数\n    void get(string &p, int &a, int &b) { p = name; a = eng; b = cpp; } // 读出函数\n    double aver() { return (eng + cpp) / 2.0; }                         // 求平均成绩\n    void show() {\n        cout << \"姓名:\" << name << \" 英语:\" << eng << \" C++:\" << cpp\n             << \" 平均:\" << aver() << endl;\n    }\n};\n\nint main()\n{\n    stud s(\"张三\", 85, 92);   // ① 构造函数\n    s.show();                 // ② 显示函数\n    string p; int a, b;\n    s.get(p, a, b);           // ③ 读出函数\n    cout << \"读出:\" << p << \" \" << a << \" \" << b << endl;\n    s.set(\"李四\", 78, 66);    // ④ 写入函数\n    s.show();\n    return 0;\n}",
    wrong:"get 读出函数写错了——参数写成了值传递 void get(string p, int a, int b)，在函数体内 p=a=b 赋的只是形参副本，函数返回后外面变量的值根本没变，「读出」无效。读出函数的参数必须是引用。",
    fix:"答案见上方代码（已编译运行验证：输出 姓名:张三 英语:85 C++:92 平均:88.5 / 读出:张三 85 92 / 姓名:李四 英语:78 C++:66 平均:72）。\n① get 要把对象内部的数据「带出去」到外部变量 p、a、b，形参必须是对外部变量的别名——写 string &p, int &a, int &b（引用），赋值 p=name 就是直接改外面的变量。值传递只改副本，函数一返回副本就销毁，这就是「读出必须引用」的原因，和 setzero(int &a) 改实参（2024.10 分析36）同一个规则（考点7）。\n② 类骨架五件套按题目点名的顺序写全：私有成员（姓名 string、成绩 int）→ 构造函数（带参初始化）→ 写入函数 set → 读出函数 get（引用参数）→ 求平均 aver → 显示 show。题目点名什么就写什么，别漏函数也别自创。\n③ 细节分：aver() 返回 double 且除以 2.0（写 /2 会整型截断，88.5 变 88）；main 里按「构造 → 显示 → get 读出验证 → set 写入后再显示」的顺序把每个成员函数都测一遍，正好呼应题目「测试数据成员与成员函数的正确性」。\n④ 这就是 2025 年起设计第一题的「基础类设计保底」题型（考点14/18，模板见高频公式 11)，2026.04 设计22 的 Student 类同款——15/10 分必须拿满。",
    done:false },

  { exam:"2023年4月", no:"46", type:"程序设计", ch:8, kp:"考点48",
    q:"读入当前文件夹下文件 dev1.cpp，为该文件的每行代码加上行号后存入 dev2.txt 文件中。",
    code:"#include <iostream>\n#include <fstream>\nusing namespace std;\nint main()\n{\n    char buf[80];\n    int line = 0;\n    ifstream fin(\"dev1.cpp\");\n    if (!fin) { cout << \"打开 dev1.cpp 失败\" << endl; return 0; }\n    ofstream fout(\"dev2.txt\");\n    if (!fout) { cout << \"创建 dev2.txt 失败\" << endl; return 0; }\n    while (fin.getline(buf, 80))\n    {\n        line++;\n        fout << line << \": \" << buf << endl;\n    }\n    fin.close();\n    fout.close();\n    return 0;\n}",
    wrong:"不知道怎么读取一整行的——只熟悉 fin >> 按空白分隔提取，而 >> 会把一行代码按空格/制表符切碎、丢掉所有空白缩进，根本没法按行处理；getline 的用法（参数含义、返回值怎么当循环条件）没掌握",
    fix:"参考答案见上方代码（已编译运行验证：dev1.cpp 为 7 行 C++ 源码时，dev2.txt 逐行为 1: #include <iostream> … 7: }，行号与原行内容一一对应）。\n① 读一整行用 fin.getline(buf, 80)：两个参数——buf 是存行的字符数组、80 表示最多读入 79 个字符（自动补 '\\0'）；遇到 '\\n' 停止，并把换行符从流中取走丢弃，所以 buf 里是纯行内容，下一轮自动接下一行。用 >> 读不了整行：>> 以空白为分隔符，一行代码会被拆成多个数据项且缩进全丢。\n② 循环条件直接写 while(fin.getline(buf, 80))：getline 返回 istream& 流引用，读成功为真、读到文件尾（一行都没读到）为假，循环自动结束——和 while(fin>>x)（考点48）、while(fin.read(&ch,1))（考点49）同一个套路，不要写 !fin.eof()。\n③ 行号在循环里自增再连同行内容写出：fout << line << \": \" << buf << endl;——题目没规定行号格式，\"1: 代码\"、\"1 代码\"、\"1,代码\" 都算加上了行号。\n④ 打开失败判 if(!fin)（考点48 固定套路）；文件在「当前文件夹」下，直接写文件名 \"dev1.cpp\"，不用带路径（带路径才要反斜杠双写）。", 
    done:false },

  { exam:"2023年4月", no:"45", type:"程序分析", ch:7, kp:"考点43",
    q:"阅读程序，写出运行结果（setf 设置进制 + setfill/setw/setprecision + put）",
    code:"#include <iostream>\n#include <iomanip>\nusing namespace std;\nint main()\n{\n    int a=234;\n    cout.setf(ios::dec,ios::basefield);\n    cout<<a<<endl;\n    cout<<setfill('*')<<setw(8)<<a<<\"ok\"<<endl;\n    double b=1.234567;\n    cout<<b<<endl;\n    cout<<setw(8)<<setprecision(3)<<b<<endl;\n    char c='a';\n    cout<<\"cout.put(c):\"<<endl;\n    cout.put(c+2);\n    return 0;\n}",
    wrong:"不知道 cout.setf(ios::dec, ios::basefield) 是什么意思——ios::dec、ios::basefield 各代表什么、为什么要带第二个参数，完全没概念；另外以为 setw 前没有重新 setfill，第 4 行的填充符就不是 * 了（或想当然换成别的字符）",
    fix:"6 行输出（已编译实测）：\n234\n*****234ok\n1.23457\n****1.23\ncout.put(c):\nc\n① setf(标志, 域掩码) 两参数形式：第一个参数是要设置的标志字，第二个是「互斥域掩码」——先把掩码圈住的域内旧标志全部清零，再设新标志。ios::dec=十进制标志；ios::basefield 不是开关，是进制域掩码（=dec|oct|hex 合并）。整句读作「进制域清零、设为十进制」。dec/oct/hex 同域互斥，切换必须带掩码（2023.10 单选17：setf(ios::hex, ios::basefield)，见考点44）；本题默认本就是十进制，这句只是保险动作，输出仍是 234。\n② 第2行 setfill('*')<<setw(8)<<a<<\"ok\"：setw 只管随后一项，a=234 右对齐补 5 个 * → *****234，\"ok\" 紧跟其后 → *****234ok。\n③ 第3行默认精度 6 位有效 → 1.23457；第4行 setprecision(3) → 1.23，setw(8) 补 4 个填充符——setfill 是持久设置，这里仍是上一行的 '*' → ****1.23（不是空格，也不是别的字符，别被「没重新 setfill」骗了）。\n④ 末两行：先输出 cout.put(c): 并换行；put 是 cout 成员函数逐字符输出，put(c+2) 中 c+2 按整数算出 99 再转成字符 → 输出 c。",
    done:false },
];
