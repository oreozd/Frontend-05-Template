### 学习笔记

### week07

1. 运算符和表达式
- 运算符优先级
    - Member:
        - a.b/a['b']:成员访问
        - string
        - super.b/super['b']
        - new.target
        - new Foo()

    - New
        new Foo和new Foo()拥有不同的优先级，所以 new Foo()()应该理解为  `new Foo() -> ()`, new new Foo()应该理解为`new  -> new Foo()`

    - Reference:
    (标准中的类型，js用引用类型在运行时处理删除和赋值操作)
        包含两个部分: object, key。delete,assign运算时需要这个引用类型

    - Call:函数调用表达式
        括号之后如果有member表达式或者其他优先级更高的表达式，那么后面表达式优先级就会发生变化。表达式的优先级并不是固定的，取决于前面的表达式。使用产生式描述优先级式一种更为严谨的方式。
        故new a()['b']应该理解为`new a() -> 读取前面结果的属性b`

    - left hand 能否放在等号左边的表达式
    right handside
    - update: a++, ++a, a--, --a
    - unary(单目运算符)：delete, void, typeof, +/-, ~, await(影响更大的语法结构), !
    - exponetal(**):唯一的右结合的运算符
    - Multicative: *, /, %
    - Additive: +, - 
    - Shift: <<, >>, >>>
    - RelationShip: >, <, >=, <=, instanceof, in
    - Equality: ==, ===, !=, !== 
    - Bitwise: &, |, ^
     有短路逻辑，不保证所有的子结构都能执行到。
    - Logical: &&, ||
    - Conditional: ? :

- 类型转换
    - 拆箱转换
        - toPremitive
        - toString/valueof
        - Symbol.toPremitive
    - 装箱转换
    调用包装类型进行转换
        - Number
        - String
        - Boolean
        - Symbol: new Object(Symbol('a'))
    对于基本类型使用member等表达式的时候会自动调用装箱转换

- js语句
    - 运行时
        - completion record:储存语句返回结果信息的数据结构
            - [[type]]: normal, break, throw, continue, return
            - [[value]]:基本类型
            - [[label]]:label
        - Lexical Environment

    - 简单语句
        - ExpressionStatement
        - EmptyStatement
        - DebuggerStatement
        流程控制语句
        - ThrowStatement
        - ContinueStatement
            - [[type]]: continue,
            - [[value]]: --
            - [[label]]: label
        - BreakStatement
            - [[type]]: break,
            - [[value]]: --
            - [[label]]: label
        - ReturnStatement
    - 复合语句
        - BlockStatement
            - [[type]]: normal, break, throw, continue, return
            - [[value]]: --
            - [[label]]: --
        - IfStatement
        - SwitchStatement
        - IterationStatement: 
            - while(条件表达式) statement
            - do statement while(条件表达式)
            - for(变量声明(var/let/const); statement)，声明的变量和下面BlockStatement不是一个作用域，可以跨循环保存。
            - for(变量声明(var/let/const) in )
            - for(变量声明(var/let/const) of)
        - WithStatement
        - LabelledStatement: 给语句起一个名字，方便进行更精准的流程控制
        - TryStatement：和BlockStatement不同,不能省略{},return不能结束语句
            - [[type]]: return
            - [[value]]: --
            - [[label]]: label
    
    - 声明
        - FuntionDeclaration
            - Function *: GenerateDeclaration
            - Async Function:AsyncFuntionDeclaration
            - Async Function *:AsyncGenerateDeclaration
        - VariableDeclaration: var
        新一代声明方式
        - ClassDeclaration
        - LexicalDeclaration: const, let
    
        function会永远被提到作用域最前面
        var声明只会把变量提升作用域最前面，但是赋值不会被提前
        const,let 保证在声明之前使用会抛错


        预处理机制：在执行之前对代码先进行一些整理工作，所有的声明都会有预处理机制
    

    - 作用域
        var: 存在的函数体
        let/const: 外层的BlockStatement
    

- 宏任务和微任务：
    https://juejin.cn/post/6844903657264136200
    js执行粒度（runtime）
    - 宏任务:js引擎的任务，SetTimeout,
    - 微任务(Promise)：js引擎的内部的任务
    - 函数调用(Execution Context)
    - 语句/声明(Completion Record)
    - 表达式(Reference)
    - 直接量/变量/this

- 事件循环: 调用js引擎的一种方式
    ```
    while (queue.waitForMessage()) {
        queue.processNextMessage();
    }
    ```
    一般会有三个阶段
    - get Code
    - wait
    - execute code

- 函数调用
函数调用会形成一个stack，每个函数都会有一个 Execution Context, 运行时 Running Execution Context

    - Execution Context
        - code evalution state
        - Function
        - script/module
        - Realm:保存所有都内置对象
        - Lexical Environment：执行时候需要的东西，this, new.target,声明的变量，super
        - Variable Environment：var声明
        - [Generator]
    - Environment Record
    链式结构
        - Declarative
        可以初始化
            - Function
            - Module
        特殊场景使用
        - Global
        - Object
    - 闭包
    每个函数都会生成
        - 代码
        - 环境：object + 变量序列（函数执行，会将环境中的变量保存在environment record中）  
    - realm
    Realms就像是一个对象，包含了js运行时的对象、环境、代码等，不同环境中会new出不同的Realms实例.
    https://juejin.cn/post/6850418121010839560
        - a set of intrinsic objects(一组内置对象)
        - global environment （一个全局环境）
        - code （在上面这个全局环境中加载的所有代码）
        - state and resources （状态和资源）
    
