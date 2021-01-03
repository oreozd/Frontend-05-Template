学习笔记

##### HTML,XML,SGML
    - XML
    - SGML
    - HTML:
#### html标签语义
- web语义化:
Web语义化是指使用恰当语义的html标签、class类名等内容，让页面具有良好的结构与含义，从而让人和机器都能快速理解网页内容。
- HTML常用的语义化标签：
    - hader:头部，不只是表示页面的头部，也可以被嵌套在article，或者section中代表特定部分的头部
    - footer：底部，不只是表示页面的底部，也可以被嵌套在article，或者section中代表特定部分的底部
    - aside:被包含在article元素中作为主要内容的附属信息部分，其中的内容可以是与当前文章有关的相关资料，标签，名词解释等。在article元素之外使用作为页面或站点全局的附属信息部分。最典型的是侧边栏，其中的内容可以是日志串连，其他组的导航，甚至广告，这些内容相关的页面。
    - hgroup:代表“网页”或“section”的标题，当元素有多个层级时，可以将h1到h6元素放在其内，譬如文章的主标题和副标题组合
    - article:表一个在文档，页面或者网站中自成一体的内容，其目的是为了让开发者独立开发或重用。
    - section:代表文档中的“节”或“段”，“段”可以是指一片文章里按照主题的分段；“节”可以是指一个页面里的分组
    - nav:页面的导航链接区域
    - strong/em:两个标签都具有强调的作用，strong代表页面上的强调，em代表的是语句中的强调。
    - figure:页面中的图文组合
    - dfn:表示定义文本段
    - pre:表示一个事先带有格式的文本
    - samp:表示一个示例
    - code:表示一段代码
- ul和ol:html是一种标记语言，首先需要考虑语义的正确性，所以在表示一个有序列表，但是项目符号不是数字或者有序的标识符，应该选择使用ol。

#### HTML语法
html中的合法元素
- Element:元素
- Text：文本节点
- Comment：注释
- DocumentType:文档类型标准通用标记语言的文档类型声明，它的目的是要告诉标准通用标记语言解析器，它应该使用什么样的文档类型定义（DTD）来解析文档。
- ProcessingInstruction:预处理
- CDATA:文本节点
字符引用
- &#+ASCII字符
- &amp
- &lt
- &quot

#### 浏览器API
- DOM API
    - trvasel:(访问dom树自动迭代)
    - 节点
        ###### 节点分类：所有的节点都派生自一个叫Node的类
        - Element:元素型节点，和标签对应
            - HTMLElement:
                - HTMLAnchorElement
                - HTMLAppletElement
                - HTMLAreaElement
                - HTMLAudioELement
                - HTMLBaseElement
                - HTMLBodyElement
                - ...
            - SVGElement:
                - SVGAElement
                - SVGAltGLYPHElement
                - ...
        - Document
        - CharacterData
            - Text
                - CDATA
            - Comment
            - ProcessingInstruction
        - DocumentFragment
        - DocumentType
        ###### 操作节点
        - 导航类操作:在dom树上移动
            - node
                - parentNode
                - childNodes
                - firstChild
                - lastChild
                - nextSibling
                - previousSibling
            - elemnt
                - parentElement
                - children
                - firstElementChild
                - lastElementChild
                - nextElementSibling
                - previousElementSibling
        - 修改类操作
            - appendChild
            - insertBefore
            - removeChild
            - replaceChild
        - 高级操作：
            - compareDocumentPosition:比较两个节点中关系的函数
            - contains:检查一个节点中是否包含另一个节点的函数
            - isEqualNode:检查两个节点是否完全相同
            - isSameNode
            - cloneNode:复制一个节点，传入参数为true,连同子节点一起深拷贝。
    - 事件
        - 事件的对象模型：
            - 捕获
            - 冒泡
        - addEventListener("事件名", "事件处理函数", "监听时机")
    - range:相对节点来说可以更精确操作dom树，性能也更优秀,可以同时选中多个节点操作多个节点
        - setStartBefore
        - setEndBefore
        - setStartAfter
        - setEndAfter
        - selectNode
        - selectNodeContents
    ```
    var fragment = range.extractContents() //得到一个fragment对象，作为一系列节点的集合去挂载在dom树，但是fragment节点自身在dom树上是隐身的
    range.insertNode(document.createTextNode("tar")) 
    ```
- CSSOM:css文档的抽象。通过dom api进行访问 document.stylesheets
    ##### 与css语言模型一致
    - stylesheet.cssRules
        - cssStyleRule
            - selectorText String
            - key-value
        - getComputedStyle：window.getComputedStyle(elt, pseudoElt)
            - elt:想要获取的元素
            - pseudoElt:可选，伪元素
    - stylesheet.insertRule("p {color: pink;}", pos)
    - stylesheet.removeRule(pos)
    ##### 与浏览器模型一致
    - view
        - window
            - 尺寸
                - innerHeight, innerWidth:viewport的区域尺寸
                - outerHeight, outerWidth
                - devicePixelRatio(DPR):物理像素和逻辑像素的比值
                - screen
                    - width
                    - height
                    - availWidth：可使用的区域尺寸
                    - availHeight
            - 交互
                - open()
                - moveTo()
                - moveBy()
                - resizeTo()
                - resizeBy()
            - scroll
                - scroll元素
                    - scrollTop:当前滚动的位置
                    - scrollLeft
                    - scrollWidth:可滚动区域的尺寸
                    - scrollHeight
                    - scroll(x, y)
                    - scrollBy(x, y):当前基础上滚动一个差值
                    - scrollIntoView():强制滚动到指定区域
                - window
                    - scrollX
                    - scrollY
                    - scroll(x, y)
                    - scrollBy(x, y)
            - layout
                - getClientRects():获取所有元素生成的盒
                - getBoundingClientRect():获取可以容纳所有元素生成盒的盒子
- 来源
    - knronos
        - openGL
        - webGL
    - ECMA
        - ECMAScript
    - WHATWG
        - HTML
    - W3C
        - webaudio
        - CG/WG





