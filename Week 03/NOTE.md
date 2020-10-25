学习笔记
### week03
1. 定义四则运算：产出四则运算的词法定义和语法定义。
2. 词法分析：把输入的字符串流变成 token。
3. 语法分析：把 token 变成抽象语法树 AST（构建AST抽象语法树又叫语法分析：1. LL算法 2. LR算法）。
4. 解释执行：后序遍历 AST，执行得出结果。

使用LL算法构建抽象语法树具体步骤
1. 正则匹配（初步拆分）：
此处使用的 exec匹配的方法，exec()方法返回一个数组，并更新正则表达式对象的 lastIndex 属性。
完全匹配成功的文本将作为返回数组的第一项，从第二项起，后续每项都对应正则表达式内捕获括号里匹配成功的文本。
这样就将字符串按照```["Number", "Whitespace", "LineTerminator", "*", "/", "+", "-"]```进行了拆分，
2. 储存匹配结果（优化拆分结果）：将上一步拆分结果进行数据组装供下一步的语法分析进行使用，token(有效字符)：number, operator
3. 进行语法分析: 将四则运算上一步拆分的结果集，按照下面三种语法表达式进行翻译，排列组合。供下一步的解释执行


语法产生式：
```
<Expression> ::=     
<AdditiveExpression><EOF>
```
加法语法产生式：
```
<AdditiveExpression> ::= 
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>
```
乘法语法产生式：
```
<MultiplicativeExpression> ::= 
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
```


