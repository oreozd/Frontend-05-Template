var assert = require('assert');

import { parserHTML } from "../src/parser.js";

describe('parser html:', function() {
    it('<a></a>', function() {
        let tree = parserHTML('<a></a>')
        //console.log(tree)
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href="//baidu.com"></a>', function() {
        let tree = parserHTML('<a href="//baidu.com"></a>')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href ></a>', function() {
        let tree = parserHTML('<a href ></a>')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href id></a>', function() {
        let tree = parserHTML('<a href id></a>')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href="aaa" id></a>', function() {
        let tree = parserHTML('<a href="aaa" id></a>')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a id=abc></a>', function() {
        let tree = parserHTML('<a id=abc></a>')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a id=abc/>', function() {
        let tree = parserHTML('<a id=abc/>')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a id=\'abc\'/>', function() {
        let tree = parserHTML('<a id=\'abc\'/>')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a id=\'abc\' name=\'abc\'/>', function() {
        let tree = parserHTML('<a id=\'abc\' name=\'abc\'/')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a id=abc name=\'abc\'/>', function() {
        let tree = parserHTML('<a id=abc name=\'abc\'/>')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a />', function() {
        let tree = parserHTML('<a />')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<A /> upper case', function() {
        let tree = parserHTML('<A /> upper case')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    })
    it('<>', function() {
        let tree = parserHTML('<>')
        //console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, text);
    })
});