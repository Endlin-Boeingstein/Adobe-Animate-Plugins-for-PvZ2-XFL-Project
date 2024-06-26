﻿//
// ResetTransformationPoint
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/5/12




//遍历library的文件，记录library的文件
var itemArray = an.getDocumentDOM().library.items;
//循环获取库内容
for(i in itemArray){
    //输出文件名称
    an.trace("library item's name:"+itemArray[i].name); 
    //输出文件类型
    //an.trace(itemArray[i].itemType);
    //判定是否为元件（影片剪辑/图形）
    if(itemArray[i].itemType=="movie clip"||itemArray[i].itemType=="graphic"){
        //获取时间轴
        var symboltl=itemArray[i].timeline;
        //获取时间轴内的图层
        var symbollayers=symboltl.layers;
        //循环得到图层内容
        for(ly in symbollayers){
            an.trace("layer name:"+symbollayers[ly].name);
            //获取帧数组
            var frameArray = symbollayers[ly].frames;
            //遍历获取帧
            for(frm in frameArray){
                //获取引用对象数组
                var symbolelements=frameArray[frm].elements;
                //遍历获取引用对象
                for(ele in symbolelements){
					//重置中心点
					symbolelements[ele].setTransformationPoint({x:0,y:0});
                }
            }
        }

        //获取libaryitem名，否则返回场景名
        //var it = symboltl.libraryItem; 
        //if (it) 
        //fl.trace("libraryItem name: " + it.name); 
        //else 
        //fl.trace("scene name: " + an.getDocumentDOM().getTimeline().name);
    }
}


alert("ResetTransformationPoint Done");














// 选择库项目: Symbol 35
//var lib=an.getDocumentDOM().library;
//for (item in lib) { 
 //an.trace(lib[item].name); 
//}
//an.getDocumentDOM().library.selectItem('Symbol 35');

// 编辑库项目
//an.getDocumentDOM().library.editItem();

// 更改选择: {x:17, y:29.1}, false, true
//an.getDocumentDOM().mouseClick({x:17, y:29.1}, false, true);

// 更改选择: {x:17, y:29.1}, false, true
//an.getDocumentDOM().mouseClick({x:17, y:29.1}, false, true);

// 转换为位图
//an.getDocumentDOM().convertSelectionToBitmap()


