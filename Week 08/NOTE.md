学习笔记

#### week8

- 有限状态机
    - 每个状态都是一个机器
        - 每个机器中都可以进行基础操作
        - 所有机器可接收的输入格式一致
        - 机器本身应该是无状态的，用函数表示应该是一个纯函数，没有副作用

    - 每个机器都知道下一个状态
        - 每个机器的都有确定的下一个状态
        - 根据输入的值决定具体状态值
    - 使用状态机实现在一个目标字符串是否存在某一个特定的字符串
        - 要查找的目标字符串如果有自重复，需要注意状态转移逻辑复用。
    
- 实现一个toy-browser
    - 浏览器的工作原理
        地址栏上输入一个url到看到一个网页需要经历一些基础的步骤
        url -> html -> DOM -> DOM with CSS -> DOM with position -> bitMap
        我们看到的页面都是图片(位图)形式，然后经过显卡转换为我们可以识别的光信号。
    - http协议的解析
        - http协议: 主要request和response,先由客户端发起 request,服务器返回一个response. request和response一定是一一对应的
        是一种文本协议，所有的内容都是字符串形式的。
        - server:nodejs模拟一个简单的服务器程序，用来接收客户端发出的请求并作出相应。
        - request：
            - 组成部分
            ```
            - reuqest line
                POST/ HTTP/1.1 -> method path HTTP/版本号
            - headers
                Host:127.0.0.1 
                Content-Type:apllication/x-www-form-urlencoded(必须有的一个头部字段)
                Content-Length: 不需要从外边直接传值，最好是在保存时实时计算产生。
            - body
                name=ass&value=sss 形式根据编码方式的不同而有区别
            ```
            - 代码模拟：
            ```
            - 构建request请求：
            根据上述分析request组成，进行初始化，注意headers字段中的 Content-Type, Content-Length,
            - 发送reuqest请求：
            首先需要调用net模块建立一个tcp连接，使用得到的 connection对象去发送请求，以request组成结构为模版进行字符串组装，注
            意发送字符串的组装必须全部写 ‘\r\n’,只写\r会出现 400发送失败的情况
            - 数据发送
            将组装好的字符串写入parser中，之后根据parser状态控制流程
            - 关闭连接
            ```
        - response：
            - 组成部分
            ```
            - status line:
            HTTP/1.1 200 OK  -> HTTP/版本号 状态码 状态值
            - headers:
            Content-Type: text/html
            ···
            - body(chunk body):
            十六进制数字
            内容
            十六进制数字
            直到数字为0，代表body的结束
            ```
            - 代码模拟：
            ```
             - 对响应解析：
            发送之后对响应进行解析,使用response parser来解析，因为响应是逐步接收，逐步解析，最终返回解析结果，在解析的过程使用状态机对字符进行逐一解析，body parser需要独立出来，解析逻辑是一个特殊的逻辑
            - 解析过程中的状态机：
                - 非body部分
                    //status line
                    this.WAITING_STATUS_LINE = 0;
                    this.WAITING_STATUS_LINE_END = 1;
                    //header
                    this.WAITING_HEADER_NAME = 2;
                    this.WAITING_HEADER_SPACE = 3;
                    this.WAITING_HEADER_VALUE = 4;
                    this.WAITING_HEADER_LINE_END = 5;
                    //body
                    this.WAITING_HEADER_BLOCK_END = 6;
                    this.WAITING_BODY = 7;
                    解析status line -> 解析头部 -> 解析body
                - body部分
                    this.WAITING_LENGTH = 0;
                    this.WAITING_LENGTH_LINE_END = 1;
                    this.READING_TRUNK = 2; //已经不是一个米利状态机，这个输入状态是一个可变的值。
                    this.WAITING_NEW_LINE = 3;
                    this.WAITING_NEW_LINE_END = 4;
            - 返回解析结果
                    get isFinished(){
                        return this.bodyParser && this.bodyParser.isFinished;
                    }
                    get response() {
                        this.statusLine.match(/HTTP\/1.1 ([0-9]+)([\s\S]+)/);
                        return {
                            statusCode: RegExp.$1,
                            statusText: RegExp.$2,
                            headers: this.headers,
                            body: this.bodyParser.content.join('')
                        }
                    }
                
            ```
- 至此，我们使用代码模拟实现了浏览器的 http模块，请求的发送和响应，也就是实现了从 url -> html这个阶段。