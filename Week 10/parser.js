const css = require('css');
const layout = require('./layout.js');

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack = [{type: 'document', children: []}];
//进行完第四步的结构
// currentToken = {
//     type: '',
//     tagName: '',
//     isSelfClosing: false
// }

let rules = [];
function addCSSRules(text){
    var ast = css.parse(text);
    console.log(JSON.stringify(ast, null, "  ")); //JSON.stringify(value[, replacer [, space]])
    rules.push(...ast.stylesheet.rules);
}

//优先级
function specificity(selector){
    var p = [0, 0, 0, 0]; //inline, id, class, tagName
    var selectorParts = selector.split(" ");
    for(let select of selectorParts){
        if(select.charAt(0) == '#'){
            p[1] += 1;
        }else if(select.charAt(0) == '.'){
            p[2] += 1;
        }else {
            p[3] += 1;
        }
    }
    return p; //计算得到当前选择器的数值
}

//比较两个优先级
function compare(sp1, sp2){
    //优先比较高位
    if(sp1[0] - sp2[0]){
        return sp1[0] - sp2[0];
    }
    if(sp1[1] - sp2[1]){
        return sp1[1] - sp2[1];
    }
    if(sp1[2] - sp2[2]){
        return sp1[2] - sp2[2];
    }
    return sp1[3] - sp2[3];
}

function match(element, selector){
    //!element.attributes 判断是否为文本节点
    if(!selector || !element.attributes){
        return false;
    }

    if(selector.charAt(0) == '#'){ //idx选择器
        var attribute = element.attributes.filter(item => item.name === 'id');
        if(attribute && attribute.value === selector.replace('#', '')){
            return true;
        }
    }else if(selector.charAt(0) == '.'){ //类选择器
        var attribute = element.attributes.filter(item => item.name === 'class');
        if(attribute && attribute.value === selector.replace('.', '')){
            return true;
        }
    }else { //元素选择器
        if(element.tagName === selector){
            return true;
        }
    }
    return false;
}

//尽量保证选择器在starTag的步骤
function computeCSS(element) {
    console.log(rules);
    console.log("compute css for html", element);
    //获取父元素
    var elements = stack.slice().reverse(); //逐级向外匹配
    //代码写到11节
    if(!element.computedStyle){
        element.computedStyle = {};
    }

    //重点看一下
    for(let rule of rules){
        var selectorParts = rule.selectors[0].split(" ").reverse(); //以空格拆分复杂选择器
        if(!match(element, selectorParts[0])){
            continue;
        }
        let matched = false;

        var j = 1;
        for(let i = 0; i < element.length; i++){
            if(match(element[i], selectorParts[j])){
                j++;
            }
        }
        if(j >= selectorParts.length){
            matched = true;
        }
        if(matched){
            console.log("element", element, "matched rule", rule);
            var sp = specificity(rule.selectors[0]);
            var computedStyle = element.computedStyle;
            for(let declaration of rule.declarations){
                if(!computedStyle[declaration.property]){
                    computedStyle[declaration.property] = {};
                }
                if(!computedStyle[declaration.property].specificity){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }else if(compare(computedStyle[declaration.property].specificity, sp) < 0){
                    //新的优先级更高，覆盖
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
                //computedStyle[declaration.property].value = declaration.value;
            }
            console.log("element.computedStyle", element.computedStyle)
        }
    }
}

function emit(token) {
    //标签：开始标签，结束标签，自封闭标签
    //文本
    console.log(token)
    let top = stack[stack.length - 1];

    if(token.type == 'startTag'){
        let element = {
            type: 'element',
            children: [],
            attributes: []
        };

        element.tagName = token.tagName;

        for(let p of token){
            if(p != 'type' && p != 'tagName'){
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        computeCSS(element);
        top.children.push(element);

        //element.parent = top;

        if(!token.isSelfClosing){
            stack.push(element);
        }

        currentTextNode = null;
    }else if(token.type == 'endTag'){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match");
        }else {
            //只考虑style和内联样式
            if(top.tagName == 'style'){
                addCSSRules(top.children[0].content); //子元素文本节点的内容作为样式文本
            }
            layout(top);
            stack.pop();
        }
        currentTextNode = null;
    }else if(token.type === 'text'){
        if(currentTextNode == null){
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content; 
    }

}
const EOF = Symbol("EOF");//结束字符

//初识状态
function data(c){
    if(c == '<'){
        return tagOpen; //标签的开始，并不确定是哪种状态
    }else if(c == EOF){
        emit({
            type: 'EOF'
        })
        return;
    }else {
        emit({
            type: 'text', //这个和currentToken
            content: c
        })
        return data;
    }
}

function tagOpen(c) {
    if(c == '/'){
        return endTagOpen; //结束标签的开始
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: 'startTag',
            tagOpen: ''
        }
        return tagName(c); //标签名字
    }else {
        return;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: 'endTag',
            tagOpen: ''
        }
        return tagName(c); //结束标签的标签名
    }else if(c == '>'){
        //错误的语法
    }else if(c == EOF){
        //错误的语法
    }else {

    }
}

function tagName(c){
    //空白
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName; //属性值的开始
    }else if(c == '/'){
        return selfCloseTag; //自封闭标签
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c;
        return tagName(c); //标签名字
    }else if(c == '>'){
        emit(currentToken);
        return data; //重新开始
    }else {
        return tagName;
    }
}

//<div class=""></div>
function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName; //属性名
    }else if(c == '/' || c == '>' || c == EOF){
        return beforeAttributeName(c); //重新开始
    }else if(c == '='){
        //return beforeAttributeName;
    }else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}

function attributeName(c){
    if(c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF){
        return attributeName(c);
    }else if(c == '='){
        return beforeAttributeValue;
    }else if(c == '\u0000'){

    }else if(c == "\"" || c == "'" || c == '<'){

    }else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c) {
    if(c.match(/^[\n\t\f ]&/) || c == '/' || c == '>' || c == EOF){
        return beforeAttributeValue;
    }else if(c == "\""){
        return doubleQuotedAttributeValue;
    }else if(c == "\'"){
        return singleQuotedAttributeValue;
    }else if(c == '>'){
        //标签结束
    }else {
        return UnquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == '\u0000'){

    }else if(c == EOF){

    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c){
    if(c == "\'"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == '\u0000'){

    }else if(c == EOF){

    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == '/'){
        return selfClosingStartTag
    }else if(c == '>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == EOF){

    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function UnquotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.value] = currentAttribute.value;
        return beforeAttributeName;
    }else if(c == '/'){
        currentToken[currentAttribute.value] = currentAttribute.value;
        return selfClosingStartTag;
    }else if(c == '>'){
        currentToken[currentAttribute.value] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == '\u0000'){

    }else if(c == "\"" || c == "\'" || c == '<' || c == '=' || c == '`'){

    }else if(c == EOF){

    }else {
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}

function selfClosingStartTag(c){
    if(c == '>'){
        emit(currentToken);
        return data;
    }
}

function selfCloseTag(c){
    if(c == '>'){
        currentToken.isSelfClosing = true; //这个属性是从哪里来的
        return data; //自封闭标签结束，重新开始状态机
    }else if(c == EOF){
        
    }else {

    }
}

module.exports.parserHTML = function parserHTML(html){
    console.log(html);
    let state = data;
    for(let c of html){
        state = state(c);
    }
    state = state(EOF);
    console.log(stack[0])
}