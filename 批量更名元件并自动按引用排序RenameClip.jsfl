//
// RenameClip
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/5/4

//i元件序号
var indi=0;
//a元件序号
var inda=0;
//记录a前缀
var prea="a";
//记录i前缀
var prei="i";

//输入图像元件前缀
var iclipnamepre=prompt("Please enter the image clip's name to change it.");
//输入动画元件前缀
var aclipnamepre=prompt("Please enter the animation clip's name to change it.");
if(iclipnamepre!=''||iclipnamepre!=null){
    prei=iclipnamepre;
}
if(aclipnamepre!=''||aclipnamepre!=null){
    prea=aclipnamepre;
}


//遍历library的文件，记录library的文件
var itemArray = an.getDocumentDOM().library.items;
itemArray=itemArray.sort(sot);
itemArray=bubbleSort(itemArray);

//for(var i in itemArray){
    //an.trace("二次更名前library item's name:"+itemArray[i].name); 
//}

function sot(a,b){
    return a.name-b.name;
}

//引用冒泡排序算法
function bubbleSort(arr) {
    var n = arr.length;
    var swapped; // 用于标记本轮循环是否有元素交换，优化冒泡排序
    
    // 外层循环控制遍历的轮数，一共需要遍历n-1轮
    for (var i = 0; i < n; i++) {
        //swapped = false; // 每轮开始时重置swapped为false
        
        // 内层循环负责进行元素的比较和交换
        for (var j = i; j < n; j++) { // 注意：每次遍历后最后一个元素已排好序，无需再次比较
            if (compareAItems(arr[i],arr[j])) { // 如果引用，则交换它们
                an.trace("交换："+arr[i].name+" "+arr[j].name); 
                // 交换arr[i]和arr[j]
                //[arr[i], arr[j]] = [arr[j], arr[i]];
                var t=arr[i];arr[i]=arr[j];arr[j]=t;
                an.trace("交换完成："+arr[i].name+" "+arr[j].name); 
                i--;break;
                //swapped = true; // 发生了交换，设置swapped为true
            }
        }
        
        // 如果在某一轮遍历中没有发生任何交换，说明数组已经是有序的了，可以提前结束排序
        //if (!swapped) break;
    }

    //for(var i=0;i<n;i++){
        //an.trace("排序完成："+arr[i].name); 
    //}
    return arr;
}







//通过引用进行排序
function compareAItems(a,b){
    if((a.itemType=="movie clip"||a.itemType=="graphic")&&(b.itemType=="movie clip"||b.itemType=="graphic")&&(a.name!="main")&&(b.name!="main")){
        an.trace("Compare:"+a.name+"和"+b.name+":");
        //获取时间轴
        var symboltl=a.timeline;
        //获取时间轴内的图层
        var symbollayers=symboltl.layers;
        //循环得到图层内容
        for(ly in symbollayers){
            //an.trace("layer name:"+symbollayers[ly].name);
            //获取帧数组
            var frameArray = symbollayers[ly].frames;
            //遍历获取帧
            for(frm in frameArray){
                //获取引用对象数组
                var symbolelements=frameArray[frm].elements;
                //遍历获取引用对象
                for(ele in symbolelements){
                    //an.trace("element type:"+symbolelements[ele].elementType);
                    //如果类型为instance
                    if(symbolelements[ele].elementType=="instance"){
                        //an.trace("Instance: " + symbolelements[ele].instanceType); 
                        if(symbolelements[ele].instanceType=="symbol"){
                            //an.trace("引用:"+a.name+"引用"+symbolelements[ele].libraryItem.name);
                            //如果a引用b则交换
                            if(symbolelements[ele].libraryItem.name==b.name){//&&(an.getDocumentDOM().library.findItemIndex(a.name)<an.getDocumentDOM().library.findItemIndex(b.name))
                                an.trace("引用:"+a.name+"引用"+symbolelements[ele].libraryItem.name);
                                an.trace("序号:"+an.getDocumentDOM().library.findItemIndex(a.name)+"引用"+an.getDocumentDOM().library.findItemIndex(b.name));
                                an.trace("高位引用，进行交换。");
                                return 1;
                            }
                        }
                    }
                }
            }
        }
    }
    return 0;
}

// 自定义排序函数
function compItems(a, b){
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        // 分割字符串为非数字、数字和后续字符串部分
        var matchA = nameA.match(/(\D+)(\d+)(.*)/);
        var matchB = nameB.match(/(\D+)(\d+)(.*)/);

        // 确保正则匹配成功
        if (!matchA || !matchB) return 0;

        // 比较非数字部分（包括可能的下划线及其前的部分）
        var nonNumPartA = matchA[1];
        var nonNumPartB = matchB[1];
        var compareResult = nonNumPartA.localeCompare(nonNumPartB);
        if (compareResult !== 0) return compareResult;

        // 如果非数字部分相同，则比较数字部分
        var numA = parseInt(matchA[2], 10);
        var numB = parseInt(matchB[2], 10);
        if (numA !== numB) return numA - numB;

        // 如果数字也相同，则比较后续字符串部分
        return matchA[3].localeCompare(matchB[3]);
}





//二次处理
//循环获取库内容
for(var i in itemArray){
    //判定是否为元件（影片剪辑/图形）
    if(itemArray[i].itemType=="movie clip"||itemArray[i].itemType=="graphic"){
        if(itemArray[i].name!="main"&&!(itemArray[i].timeline.layers.length==1&&itemArray[i].timeline.layers[0].frames.length==1&&itemArray[i].timeline.layers[0].frames[0].elements.length==1&&itemArray[i].timeline.layers[0].frames[0].elements[0].elementType=="instance"&&itemArray[i].timeline.layers[0].frames[0].elements[0].instanceType=="bitmap")){
            //an.trace("二次更名前library item's name:"+itemArray[i].name); 
            //自动改名
            itemArray[i].name="$"+prea+inda;
            //序号自增
            inda++;
            //an.trace("二次更名后library item's name:"+itemArray[i].name); 
        }
        else if(itemArray[i].name!="main"&&(itemArray[i].timeline.layers.length==1&&itemArray[i].timeline.layers[0].frames.length==1&&itemArray[i].timeline.layers[0].frames[0].elements.length==1&&itemArray[i].timeline.layers[0].frames[0].elements[0].elementType=="instance"&&itemArray[i].timeline.layers[0].frames[0].elements[0].instanceType=="bitmap")){
            //an.trace("二次更名前library item's name:"+itemArray[i].name); 
            //自动改名
            itemArray[i].name="$"+prei+indi;
            //序号自增
            indi++;
            //an.trace("二次更名后library item's name:"+itemArray[i].name); 
        }
    }
}



//三次处理
itemArray=itemArray.sort(sot);
//for(var i in itemArray){
    //an.trace("三次更名前library item's name:"+itemArray[i].name); 
//}
//循环获取库内容
for(var i in itemArray){
    //判定是否为元件（影片剪辑/图形）
    if(itemArray[i].itemType=="movie clip"||itemArray[i].itemType=="graphic"){
        //an.trace("三次更名前library item's name:"+itemArray[i].name); 
        itemArray[i].name=itemArray[i].name.replace("$","");
        //an.trace("三次更名后library item's name:"+itemArray[i].name); 
    }
}



//for(var i in itemArray){
    //an.trace("三次更名前library item's name:"+itemArray[i].name); 
//}

alert("RenameClip Done");

