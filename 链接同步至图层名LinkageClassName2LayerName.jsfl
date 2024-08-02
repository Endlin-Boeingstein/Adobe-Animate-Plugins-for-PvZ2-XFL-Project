//
// LinkageClassName2LayerName
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/8/2





// // 简化版 JSON 库
// var JSON = JSON || {};
//
// // JSON.stringify 方法
// JSON.stringify = function (obj) {
//     var type = typeof obj;
//     if (type !== "object" || obj === null) {
//         // 简单数据类型
//         if (type === "string") obj = '"' + obj + '"';
//         return String(obj);
//     } else {
//         // 复杂数据类型
//         var json = [], isArray = (obj && obj.constructor === Array);
//         for (var key in obj) {
//             var value = obj[key];
//             var valueType = typeof value;
//             if (valueType === "string") value = '"' + value + '"';
//             else if (valueType === "object" && value !== null) value = JSON.stringify(value);
//             json.push((isArray ? "" : '"' + key + '":') + String(value));
//         }
//         return (isArray ? "[" : "{") + String(json) + (isArray ? "]" : "}");
//     }
// };
//
// // JSON.parse 方法
// JSON.parse = function (text) {
//     // 用于过滤掉非法的字符
//     var cx = /[\u0000-\u001F\u007F-\u009F\u2000-\u20FF]/g;
//
//     function walk(holder, key) {
//         var k, v, value = holder[key];
//         if (value && typeof value === 'object') {
//             for (k in value) {
//                 if (Object.prototype.hasOwnProperty.call(value, k)) {
//                     v = walk(value, k);
//                     if (v !== undefined) {
//                         value[k] = v;
//                     } else {
//                         delete value[k];
//                     }
//                 }
//             }
//         }
//         return value;
//     }
//
//     // 替换非法字符
//     text = String(text);
//     cx.lastIndex = 0;
//     if (cx.test(text)) {
//         text = text.replace(cx, function (a) {
//             return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
//         });
//     }
//
//     // 检查JSON字符串是否合法
//     if (/^[\],:{}\s]*$/.test(
//         text.replace(/\\["\\\/bfnrtu]/g, '@')
//             .replace(/"[^"\\\n\r]*"|true|false|null|[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?/g, ']')
//             .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
//     )) {
//         try {
//             return (function () {
//                 return eval('(' + text + ')');
//             }());
//         } catch (e) {
//             throw new SyntaxError('JSON.parse: invalid JSON string - ' + e.message);
//         }
//     }
//
//     throw new SyntaxError('JSON.parse: invalid JSON string');
// };
//
// // 示例：读取并解析JSON文件
// var filePath = "path/to/your/extra.json";
//
// // 读取文件内容
// var jsonString = FLfile.read(filePath);
//
// if (jsonString) {
//     // 输出读取到的原始JSON字符串，便于调试
//     fl.trace("读取到的JSON字符串：" + jsonString);
//
//     try {
//         // 解析JSON字符串
//         var jsonObject = JSON.parse(jsonString);
//
//         // 使用解析后的JavaScript对象
//         fl.trace("JSON解析成功！");
//         fl.trace("对象内容：" + JSON.stringify(jsonObject, null, 2));
//     } catch (e) {
//         fl.trace("JSON解析失败：" + e.message);
//     }
// } else {
//     fl.trace("读取文件失败或文件不存在。");
// }


































/*!
    json2.js
    2017-06-12

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html
*/

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ?
                this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z' : null;
        };

        String.prototype.toJSON = Number.prototype.toJSON =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx = /[\u0000-\u001F\u007F-\u009F\u00AD\u0600-\u0604\u070F\u17B4\u17B5\u200C-\u200F\u2028\u2029\u2060\u206F\uFEFF\uFFF0-\uFFFF]/g,
        escapable = /[\\\"\u0000-\u001F\u007F-\u009F\u00AD\u0600-\u0604\u070F\u17B4\u17B5\u200C-\u200F\u2028\u2029\u2060\u206F\uFEFF\uFFF0-\uFFFF]/g,
        gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null';
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                            '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                        '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', { '': value });
        };
    }

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return value;
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(
                text.replace(/\\["\\\/bfnrtu]/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
            )) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({ '': j }, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
}());
















// JSFL version

// 自定义JSON解析函数
function customParseJSON(jsonString) {
    var tokens = tokenize(jsonString);
    var stack = [{ type: 'object', value: {} }];

    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (token === '{') {
            stack.push({ type: 'object', value: {} });
        } else if (token === '}') {
            var currentObject = stack.pop().value;
            var parent = stack[stack.length - 1];
            if (parent.type === 'object') {
                Object.assign(parent.value, currentObject);
            } else if (parent.type === 'array') {
                parent.value.push(currentObject);
            }
        } else if (token === '[') {
            stack.push({ type: 'array', value: [] });
        } else if (token === ']') {
            var currentArray = stack.pop().value;
            var parent = stack[stack.length - 1];
            if (parent.type === 'object') {
                parent.value[parent.key] = currentArray;
            } else if (parent.type === 'array') {
                parent.value.push(currentArray);
            }
        } else {
            // 处理键值对
            if (stack[stack.length - 1].type === 'object') {
                var match = token.match(/^(.+):(.+)/);
                if (match) {
                    var key = trim(match[1]);
                    var value = trim(match[2]);
                    var parent = stack[stack.length - 1];
                    parent.value[key] = parseValue(value);
                    parent.key = key; // 用于数组中的键值对赋值
                } else {
                    throw new Error('Invalid token: ' + token + ' at position ' + i);
                }
            } else if (stack[stack.length - 1].type === 'array') {
                var parent = stack[stack.length - 1];
                parent.value.push(parseValue(token));
            }
        }
    }

    if (stack.length > 1) {
        throw new Error('Invalid JSON structure: too many open brackets');
    }

    return stack[0].value;
}

function tokenize(jsonString) {
    return jsonString.split(/[\{\}\[\]]|[^{}\[\]]+/).filter(function (token) {
        return token !== "";
    });
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

function parseValue(value) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    if (!isNaN(value)) return Number(value);
    if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1);
    return value;
}

// 自定义JSON字符串化函数
function customStringify(obj) {
    if (typeof obj !== 'object' || obj === null) {
        if (typeof obj === 'string') {
            return '"' + escapeString(obj) + '"';
        }
        return obj.toString();
    }

    var parts = [];

    if (isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            parts.push(customStringify(obj[i]));
        }
        return '[' + parts.join(',') + ']';
    }

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            parts.push('"' + key + '":' + customStringify(obj[key]));
        }
    }

    return '{' + parts.join(',') + '}';
}

function escapeString(str) {
    return str.replace(/(["\\])/g, '\\$1')
        .replace(/(\f)/g, '\\f')
        .replace(/(\b)/g, '\\b')
        .replace(/(\n)/g, '\\n')
        .replace(/(\r)/g, '\\r')
        .replace(/(\t)/g, '\\t')
        .replace(/(\u2028)/g, '\\u2028')
        .replace(/(\u2029)/g, '\\u2029');
}














// // 检查 JSON.parse 是否存在
// if (typeof JSON.parse === 'function') {
//     an.trace('JSON.parse is supported.');
// } else {
//     an.trace('JSON.parse is not supported.');
// }
//
// // 检查 JSON.stringify 是否存在
// if (typeof JSON.stringify === 'function') {
//     an.trace('JSON.stringify is supported.');
// } else {
//     an.trace('JSON.stringify is not supported.');
// }













//主xfl路径
var mainxflpath=(an.getDocumentDOM().pathURI).substring(0,(an.getDocumentDOM().pathURI).lastIndexOf("/"));

an.trace("extra路径extra's FilePath:"+mainxflpath+"/extra.json");

//extra路径
var extrapath=mainxflpath+"/extra.json";

var jsonString = FLfile.read(extrapath);

if (jsonString) {
    // 输出读取到的原始JSON字符串，便于调试
    //fl.trace("读取到的JSON字符串：" + jsonString);

    try {
        // 解析JSON字符串

        var jsonObject = eval('('+jsonString+')');

        // 使用解析后的JavaScript对象
        an.trace("JSON解析成功！");
        //unk
        var unk=jsonObject.unk;
        //origin
        var origin=jsonObject.origin;
        //imgSz
        var imgSz=jsonObject.imgSz;
        //imgMapper
        var imgMapper=jsonObject.imgMapper;
        //animMapper
        var animMapper=jsonObject.animMapper;



        //遍历library的文件，记录library的文件
        var lib=an.getDocumentDOM().library;
var itemArray = lib.items;
//循环获取库内容
for(i in itemArray){
    //判定是否为元件（影片剪辑/图形）
    if(itemArray[i].itemType=="movie clip"||itemArray[i].itemType=="graphic"){
        if(itemArray[i].name!="main"&&!(itemArray[i].timeline.layers.length==1&&itemArray[i].timeline.layers[0].frames.length==1&&itemArray[i].timeline.layers[0].frames[0].elements.length==1&&itemArray[i].timeline.layers[0].frames[0].elements[0].elementType=="instance"&&itemArray[i].timeline.layers[0].frames[0].elements[0].instanceType=="bitmap")){
            //链接输出
            if(animMapper.hasOwnProperty((itemArray[i].name))){
                //an.getDocumentDOM().selectNone();
                //an.getDocumentDOM().selection=[itemArray[i]];
                lib.selectNone();
                lib.selectItem(itemArray[i].name);
                if (lib.getItemProperty('linkageImportForRS') == true) {
                    lib.setItemProperty('linkageImportForRS', false);
                }
                lib.setItemProperty('linkageExportForAS', true);
                lib.setItemProperty('linkageExportForRS', false);
                lib.setItemProperty('linkageExportInFirstFrame', true);
                //得到链接名称
                var linkageName=lib.getItemProperty('linkageClassName');
                //重置extra图层标签名
                if(linkageName!=null){
                    if(animMapper.hasOwnProperty((itemArray[i].name))){
                        animMapper[itemArray[i].name]=linkageName;
                    }
                    else{
                        an.trace("Library doesn't have "+itemArray[i].name+"'s layername which is in the extra. ")
                    }
                }
                //itemArray[i].linkageImportForRS=false;
                //itemArray[i].linkageImportForAS=true;
                //itemArray[i].linkageExportInFirstFrame=true;
                //itemArray[i].linkageClassName=animMapper[itemArray[i].name];
                an.trace(itemArray[i].name+"="+animMapper[itemArray[i].name]);
                lib.selectNone();
            }
            else{
                an.trace("Library doesn't have "+itemArray[i].name+"'s layername which is in the extra. ")
            }
        }
        else{}
    }
    else{}
}



















        jsonObject.animMapper=animMapper;
        //var exportextra=customStringify(jsonObject, null, 2);
        var exportextra=JSON.stringify(jsonObject);
        FLfile.write(extrapath,exportextra);
        //var file=new File(extrapath);
        //.writeFile(exportextra);
        // exportextra.exportToFile(extrapath);
        an.trace("输出对象内容：" + customStringify(jsonObject, null, 2));



        an.trace("unk:"+unk);
        an.trace("origin:"+origin);
        an.trace("imgSz:");
        for(var key in imgSz){
            an.trace(key+":"+imgSz[key]);
        }
        an.trace("imgMapper:");
        for(var key in imgMapper){
            an.trace(key+":"+imgMapper[key]);
        }
        an.trace("animMapper:");
        for(var key in animMapper){
            an.trace(key+":"+animMapper[key]);
        }
    } catch (e) {
        an.trace("JSON解析失败：" + e.message);
    }
} else {
    an.trace("读取文件失败或文件不存在。");
}

alert("LinkageClassName2LayerName Done");