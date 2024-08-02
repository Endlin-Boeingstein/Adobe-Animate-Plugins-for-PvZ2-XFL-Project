//
// LayerName2LinkageClassName
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/8/2








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


        //遍历library的文件，记录library的文件
        var lib=an.getDocumentDOM().library;
var itemArray = lib.items;
//循环获取库内容
for(i in itemArray){
    //判定是否为元件（影片剪辑/图形）
    if(itemArray[i].itemType=="movie clip"||itemArray[i].itemType=="graphic"){
        if(itemArray[i].name!="main"&&!(itemArray[i].timeline.layers.length==1&&itemArray[i].timeline.layers[0].frames.length==1&&itemArray[i].timeline.layers[0].frames[0].elements.length==1&&itemArray[i].timeline.layers[0].frames[0].elements[0].elementType=="instance"&&itemArray[i].timeline.layers[0].frames[0].elements[0].instanceType=="bitmap")){
            //链接生成
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
                lib.setItemProperty('linkageClassName', animMapper[itemArray[i].name]);
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





















        an.trace("对象内容：" + customStringify(jsonObject, null, 2));
    } catch (e) {
        an.trace("JSON解析失败：" + e.message);
    }
} else {
    an.trace("读取文件失败或文件不存在。");
}






//
// //三次处理
// //遍历library的文件，记录library的文件
// var itemArray2 = an.getDocumentDOM().library.items;
// //循环获取库内容
// for(i in itemArray2){
//     //位图
//     if(itemArray2[i].itemType=="bitmap"){
//         //批量命名
//         itemArray2[i].name=itemArray2[i].name.replace("$","");
//     }
// }

alert("LayerName2LinkageClassName Done");