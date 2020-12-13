function getStyle(element){
    if(!element.style){
        element.style = {};
    }

    for(let prop in element.computedStyle){
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;

        if(element.style[prop].toString().match(/px$/)){
            //去掉属性值中的px字符
            element.style[prop] = parseInt(element.style[prop]);
        }
        if(element.style[prop].toString().match(/^[0-9\.]$/)){
            //将所有的数字字符串转化为可计算的数值
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style;
}

function layout(element){
    if(!element.computedStyle) return;

    var elementStyle = getStyle(element); //获取元素样式

    if(element.display !== 'flex') return; //排除非flex布局之外的元素

    var items = element.children.filter(e => e.type === 'element');
    items.sort(function(a, b){
        //排序
        return (a.order || 0) - (b.order || 0);
    })
    var style = elementStyle;

    //处理元素的宽高
    ['width', 'height'].forEach(size => {
        if(style[size] === 'auto' || style[size] === ''){
            style[size] = null;
        }
    })

    //设置默认值
    if(!style.flexDirection || style.flexDirection === 'auto'){
        style.flexDirection = 'row';
    }
    if(!style.alignItems || style.alignItems === 'auto'){
        style.alignItems = 'stretch';
    }
    if(!style.justifyContent || style.justifyContent === 'auto'){
        style.justifyContent = 'flex-start';
    }
    if(!style.flexWrap || style.flexWrap === 'auto'){
        style.flexWrap = 'nowrap';
    }
    if(!style.alignContent || style.alignContent === 'auto'){
        style.alignContent = 'stretch';
    }

    var mainSize, mainStart, mainEnd, mainSign, mainBase; //主轴的一些关键属性
    var crossSize, crossStart, crossEnd, crossSign, crossBase; //交叉轴的属性

    //主轴为水平方向
    //方向为从左向右,交叉轴从上向下
    if(style.flexDirection === 'row'){
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    //主轴为水平方向，但是主轴排列方向是相反的
    if(style.flexDirection === 'row-reverse'){
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width; //计算开始的位置？

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }
    //主轴方向为垂直方向
    if(style.flexDirection === 'column'){
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if(style.flexDirection === 'column-reverse'){
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if(style.flexDirection === 'wrap-reverse'){
        var temp = crossStart;
        crossStart = crossEnd;
        crossEnd = temp;
        crossSign = -1;
    }else {
        crossBase = 0;
        crossSign = 1;
    }

    //父元素没有设置width属性，所以主轴尺寸等于所有子元素主轴尺寸之和
    var isAutoMainSize = false;
    if(!style[mainSize]){
        elementStyle[mainSize] = 0;
        for(let i = 0; i < items.length; i++){
            var item = items[i];
            var itemStyle = getStyle(item);
            if(itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void(0))){
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
            }
        }
        isAutoMainSize = true;
    }

    //一般情况下的分行算法
    var flexLine = []; //这个数据类型后面咋读属性？？
    var flexLines = [flexLine]; //所有的行集合

    var mainSpace = elementStyle[mainSize]; //一开始的主轴剩余空间等于主轴尺寸
    var crossSpace = 0; //交叉轴剩余空间一开始为0

    for(var i = 0; i < items.length; i++){
        var item = items[i];
        var itemStyle = getStyle(item);
        //没有设置主轴尺寸
        if(itemStyle[mainSize] === null){
            itemStyle[mainSize] = 0;
        }

        if(itemStyle.flex){
            flexLine.push(item);
        }else if(style.flexWrap === 'nowrap' && isAutoMainSize){
            //设置nowrap
            mainSpace -= itemStyle[mainSize]; //主轴剩余空间就等于原始主轴剩余空间减去各个元素主轴尺寸
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (vodi(0))){
                //交叉轴占据空间的值为交叉轴剩余空间和子元素中交叉轴尺寸中较大的那个值
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            flexLine.push(item);
        }else {
            if(itemStyle[mainSize] > style[mainSize]){
                itemStyle[mainSize] = style[mainSize]; //元素的主轴尺寸大于父元素的主轴尺寸，就将父元素主轴尺寸赋予这个元素
            }
            //一行放不下了
            if(mainSpace < itemStyle[mainSize]){
                //设置上一行的主轴剩余空间和交叉轴的占据空间
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;
                flexLine = [];
                flexLines.push(flexLine);
                flexLine.push(item);

                mainSpace = style[mainSize]; //设置主轴剩余空间默认值
                crossSpace = 0; //设置交叉轴剩余空间默认值
            }else {
                flexLine.push(item);
            }
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void(0))){
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;

    if(style.flexWrap === 'nowrap' || isAutoMainSize){
        flexLine.crossSpace = (style[crossSpace] !== undefined) ? style[crossSize] : crossSpace;
    }else {
        flexLine.crossSpace = crossSpace;
    }

    //主轴剩余空间小于0,将
    if(mainSpace < 0){
        var scale = style[mainSize] / (style[mainSize] - mainSpace); //缩放比例
        var currentMain = mainSpace;
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            var itemStyle = getStyle(item);

            if(itemStyle.flex){
                itemStyle[mainSize] = 0; //将元素尺寸设置为0
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;

            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    }else {
        flexLines.forEach((items, index) => {
            var mainSpace = items.mainSpace;
            var flexTotal = 0; //统计所有flex属性的值

            for(let i = 0; i < items.length; i++){
                var item = items[i];
                var itemStyle = getStyle(item);

                if((itemStyle.flex !== null) && (itemStyle.flex !== (void(0)))){
                    flexTotal += itemStyle.flex;
                    continue;
                }
            }

            //有带有flex属性的元素
            if(flexTotal > 0){
                var currentMain = mainBase;
                for(let i = 0; i < items.length; i++){
                    var item = items[i];
                    var itemStyle = getStyle(item);
    
                    if(itemStyle.flex){
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                }
            }else {
                //没有带有flex属性的元素
                if(style.justifyContent === 'flex-start'){
                    var currentMain = mainBase;
                    var step = 0;
                }
                if(style.justifyContent === 'flex-end'){
                    var currentMain = mainSpace * mainSign + mainBase;
                    var step = 0;
                }
                if(style.justifyContent === 'center'){
                    var currentMain = mainSpace / 2 * mainSign + mainBase;
                    var step = 0;
                }
                if(style.justifyContent === 'space-between'){
                    var step = mainSpace / (items.length - 1) * mainSign;
                    var currentMain = mainBase;
                }
                if(style.justifyContent === 'space-around'){
                    var step = mainSpace / items.length * mainSign;
                    var currentMain = mainBase;
                }

                for(let i = 0; i < items.length; i++){
                    var item = items[i];
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSign];
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        })
    }

    var crossSpace;

    if(!style[crossSize]){
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        for(let i = 0; i < flexLines.length; i++){
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
        }
    }else {
        crossSpace = style[crossSize];
        for(let i = 0; i < flexLines.length; i++){
            crossSpace -= flexLines[i].crossSpace;
        }
    }

    if(style.flexWrap === 'wrap-reverse'){
        crossBase = style[crossSize];
    }else {
        crossBase = 0;
    }

    var lineSize = style[crossSize] / flexLines.length;

    var step;
    if(style.alignContent === 'flex-start'){
        crossBase += 0;
        step = 0;
    }
    if(style.alignContent === 'flex-end'){
        crossBase += crossSign * crossSpace;
        step = 0;
    }
    if(style.alignContent === 'center'){
        crossBase += crossSign * crossSpace / 2;
        step = 0;
    }
    if(style.alignContent === 'space-between'){
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1);
    }
    if(style.alignContent === 'space-around'){
        step = crossSpace / flexLines.length;
        crossBase += crossSign * step / 2;
    }
    if(style.alignContent === 'stretch'){
        crossBase += 0;
        step = 0;
    }

    flexLines.forEach((items, index) => {
        var lineCrossSize = style.alignContent === 'stretch' ?
        items.crossSpace + crossSpace / flexLines.length :
        items.crossSpace;

        for(let i = 0; i < items.length; i++){
            var item = items[i];
            var itemStyle = getStyle(item);

            var align = itemStyle.alignSelf || style.alignItems;

            if(itemStyle[crossSize] === null){
                itemStyle[crossSize] = (align === 'stretch') ? 
                lineCrossSize : 0;
            }

            if(align === 'flex-start'){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'flex-end'){
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if(align === 'center'){
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]);
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'stretch'){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== void(0)) ? 
                    itemStyle[crossSize] : lineCrossSize
                );
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
                
            }
        }

        crossBase += crossSign * (lineCrossSize + step);
    }) 
}

module.exports = layout;