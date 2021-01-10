#### 学习笔记

组件化：
扩展html标签，主要目标是复用
架构模式：
mvc, mvvm前端的，页面和资源的关系

对象，模块和组件
- 对象：属性，方法，继承关系
    - Properties
    - Methods
    - inherit

- 组件：跟UI强相关，是一种特殊的对象或者模块，可以以树型结构组合。在对象基础上增加了更多属性，使得组件更容易去描述UI。
    - Properties：强调从属关系
    - Methods
    - inherit
    - Attribute：强调描述性，对象的客观属性
    - config & state：对组件的配置(config)，组件的状态(state)
    - event:组件向外部传递信息
    - lifecycle：生命周期（created,mount,unmount,destroyed,render,update）mount,render,update可以重复多次执行
    - children：树形结构的必要属性
        - content:反应实际展示的数据
        - template:一个数据模板
- 建立组件系统
    - 建立markUp
        - JSX: 
            - createElement(type, attributes, ...children)
        - parser

    
