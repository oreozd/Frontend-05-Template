学习笔记

#### 11周学习笔记

##### css总体结构
- @charset
- @import
- rules
    - at-rules
    - rule


##### css at-rules:构建特殊的代码块，该代码块只有在条件符合时，才会被应用
- @charset:声明字符集
- @import：级联规则
- @media：媒体查询
- @page:分页
- @counter-style：列表项目符号
- @keyframes：动画
- @fontface：定义字体
- @supports：检查css功能是否存在，本身就存在兼容性问题
- @namespace：命名空间



##### css普通规则
- 选择器(selector):
    - 用，分隔的selector groups
    - selector
        - ">"：父子选择器
        - "<sp>"：子孙选择器
        邻接关系的选择
        - "+"
        - "~"
    - simple-selector:对于单纯使用简单选择器不能很好覆盖很多场景
        - type：tagname，
            - html: :
            - svg: |
            - mathml
        - "*"：通用选择器
        - "."：类选择器
        - "#"：id选择器
        - "[attr=value]"：属性选择器
        - ":"：伪类,元素的特殊状态，来自于交互
            ###### 链接型
            - :any-link:匹配所有超链接
            - :link:visited:一旦被访问之后，不再支持设置除颜色以外的任何属性
            - :hover：支持除了链接元素之外的元素
            - :active
            - :focus
            - :target：作为锚点的标签使用，在hash值相等的时候会被激活
            ###### 树形结构
            - :empty
            - :nth-child()
            - :nth-last-child():破坏了回溯原则
            - :first-child
            - :last-child
            - :only-child
            ###### 逻辑型
            - :not()
            - :where
            - :has
        - "::": 伪元素，原本不存在的元素
            ###### 会增加content属性，生成一个真实的dom结构
            - ::before
            - ::after
            ###### 已经存在的content,不存在的结构用来对特定的元素进行特殊的样式的修改
            - ::first-line:针对排版后的第一行，所有在不同的机器上会有不同的解析结果
                - font
                - color
                - background
                - word-spacing
                - letter-spacing
                - text-decoration
                - text-transform
                - line-height
            - ::first-letter
                - font
                - color
                - background
                - word-spacing
                - letter-spacing
                - text-decoration
                - text-transform
                - line-height
                - float
                - vertical-align
                - 盒模型:margin,padding,border 
- 声明
    - key: 
        - 属性：
        - variable：
            - 声明以“--”开头，可以作用在任何局部，与任何结构进行嵌套
            - 不会默认失效，如果重复定义会直接覆盖
    - value
        - calc:函数类
        - number
        - length
        - ...



##### 选择器优先级：
首先构建一个四元组 : var arr = [inline, id, class, tagName]
使用计算公式进行计算
s = arr[0]*Math.pow(N,3) + arr[1]*Math.pow(N, 2) + arr[2]*N + arr[3]

N一般会选择一个足够大的值，来避免计算结果和实际结果出现冲突

```
1.类型选择器（例如，h1）和伪元素（例如，::before）
2.类选择器 (例如，.example)，属性选择器（例如，[type="radio"]）和伪类例如，:hover）
3.ID 选择器（例如，#example）。
4.通配选择符（universal selector）（*）关系选择符（combinators）（+, >, ~, ' ', ||）和 否定伪类（negation pseudo-class）（:not()）对优先级没有影响。（但是，在 :not() 内部声明的选择器会影响优先级）。
```
小练习：
- div#a.b .c[id = x] -> [0, 1, 1, 1] [0, 0, 2, 0] 
- #a:not(#b) -> [0, 2, 0, 0]
- *.a -> [0, 0, 1, 0]
- div.a -> [0, 0, 1, 1]

##### 思考题
Q: 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？ 
A: first-line表示第一行，类似float，position:absolute这些属性会使元素脱离文档流，这个时候，就没有所谓的第一行概念，因为这个第一行是一个相对的概念。

        