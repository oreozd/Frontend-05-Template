function match(selector, element){
    if(!selector || !element.attributes){
        return false;
    }

    let selectLists = selector.split(" ").reverse();
    // 将得到的第一个选择器进行检索
    let selectList =selectLists[0].match(/(#|.)?[\w]+/g);
    if (selectList.length > 1) {
        for (let i = 0; i < selectList.length; i++) {
            if(!match(selectList[i],element)){
                return false;
            }
        }
        return true;
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

match("div #id.class", document.getElementById("id"));