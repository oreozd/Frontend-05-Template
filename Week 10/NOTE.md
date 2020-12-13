学习笔记

### flex布局：
布局的传统解决方案基于盒模型，依赖display属性+position属性+float属性。
flex是flexible box的缩写，意为弹性布局，任何一个容器都可以指定为flex布局。设置为flex布局之后，子元素的float,clear和vertical-align属性将失效。
采用flex布局的元素，称为 flex 容器，所有的子元素自动称为容器成员，称为 flex项目简称项目。
- 弹性盒子：弹性布局的基本结构，在其中可以根据主轴和交叉轴为基线，一些设置规则来统一安排盒子中所有元素的位置。
- 伸缩容器：在一个父级元素上使用 display 属性的值 flex 或 inline-flex, 父元素就变成伸缩容器，而其中所有的子元素变成伸缩项。flex渲染一个块级容器，inline-flex设置一个行内伸缩容器，这些值会将元素格式化，产生 （FFC）,和 BFC类似
- 一些关键属性
    - 容器属性：
        - flex-direction: 决定主轴的方向
            - row:默认值，主轴是水平方向，起点在左边
            - row-reverse:主轴是水平方向，起点在右边
            - column:主轴是垂直方向，起点在top
            - column-reverse:主轴是垂直方向，起点在bottom
        - flex-wrap:定义项目排列方式
            - nowrap:默认值，不换行
            -  wrap:换行，第一行在上方
            - wrap-reverse:换行第一行在下方
        - flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap;
        - justify-content 属性定义了项目在主轴上的对齐方式
            - flex-start（默认值）：左对齐
            - flex-end：右对齐
            - center： 居中
            - space-between：两端对齐，项目之间的间隔都相等
            - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
        - align-items 属性定义项目在交叉轴上如何对齐
            - flex-start：交叉轴的起点对齐。
            - flex-end：交叉轴的终点对齐。
            - center：交叉轴的中点对齐。
            - baseline: 项目的第一行文字的基线对齐。
            - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
        - align-content 属性定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用
            - flex-start：与交叉轴的起点对齐。
            - flex-end：与交叉轴的终点对齐。
            - center：与交叉轴的中点对齐。
            - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
            - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
            - stretch（默认值）：轴线占满整个交叉轴。
        - place-content 是 align-content 和 Justify-content 的简写，使用这两个属性的值可以应用于任何布局
        - column-gap: 设置列间距，这个在弹性布局，网格布局，多列布局都适用的属性
    - 项目属性：
        - align-self:属性允许单个项目与其他项目有不一样的对齐方式。可以覆盖align-items属性，默认值为auto，表示继承父元素的  align-items属性，如果没有父元素，等同于 stretch.
            - auto
            - flex-start：交叉轴的起点对齐。
            - flex-end：交叉轴的终点对齐。
            - center：交叉轴的中点对齐。
            - baseline: 项目的第一行文字的基线对齐。
            - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
        - flex-basis:定义在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间，默认值为auto,即项目本来的大小。
        - flex-shrink: 定义项目的缩小比例，默认为1.如果空间不足，项目将缩小。
        - flex-grow:定义项目的放大比例，默认为0，如果存在剩余空间也不放大
        - order:定义项目的排列顺序，数值越小越靠前，默认为0
        - flex:flex属性是 flex-grow,flex-shrink,和flex-basis属性的简写。默认为 0 1 auto,后两个为可选属性，

### 浏览器绘制元素

- 1. 根据浏览器属性进行排版
layout函数调用时机:在结束标签之前调用这个layout函数
layout预处理阶段：
 - 过滤掉没有样式属性的元素和布局方式不是flex的元素
 - 处理属性值中的字符串，将px结尾的属性值转化为数字，将数字字符串转化为数字
 - 设置flexDirection,alignItems,justifyContent,flexWrap,alignContent等属性的默认值
 - 根据布局flexDirection，属性的不同值设置对应的主轴和交叉轴相关属性，为后续计算做准备。

 - 2. 收集元素进行：分行
    - 根据主轴尺寸和元素尺寸的计算结果，进行排列，如果排列不开，则生成新的一行
    - 如果设置了no-wrap属性，就强行将所有元素进行缩放，放进第一行，不生成新的行。

- 3. 计算主轴方向
    - 统计出所有具有flex属性的元素
    - 将主轴剩余空间等比例赋予这些元素
    - 在主轴剩余空间为负数，并且没有具有flex属性的元素，等比例压缩剩余元素

- 4. 计算交叉轴
    - 根据每行最高元素交叉轴尺寸确定行的交叉轴尺寸
    - 根据flex-align和item-align确定每个元素的位置

- 5. 渲染单个元素
    - 使用images库来完成绘制
    - 绘制必须有一个viewport

- 6. 绘制多个元素： 递归调用绘制一个元素的逻辑