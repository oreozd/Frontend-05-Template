学习笔记

proxy:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
一个所有行为都可以重新指定的特殊对象，把底层实现外化出来，多用于底层库中

读取proxy封装对象的属性就会触发 handler对象中的 get(), 给对象属性赋值就会触发 handler对象中的 set()，几乎可以重新对象所有操作的底层实现

单向绑定：数据到dom元素的更新，
双向绑定：数据更新到dom元素更新，dom元素更新到数据更新

effect的作用：将所有的触发回调以及计算过程整合起来，避免页面操作基数大的时候计算过多的问题
effect和reactive互动：利用回调函数中读取proxy对象属性操作触发 handler对象中的get()方法去注册所用到的事件，在effect函数中得到所有的参数，再去
注册各自的回调函数在 set()方法中调用回调函数进行页面和数据的互动

正常流中的拖拽
1. drag事件无法实现跟随鼠标移动
2. 在document而不是dragable监听，dragable上监听会出现鼠标移出dom结构之后动画停顿
3. 关于拖拽实现的
4. 拖拽结合正常流：
    a. 先遍历所有文本节点找到所有可以插入的空隙并保存起来
    b. 在鼠标移动过程中实时计算距离当前移动点坐标最近的可插入点位置(使用 cssom getBoundingClientRect api来获取最近点的坐标)
    c. 插入dragable dom节点