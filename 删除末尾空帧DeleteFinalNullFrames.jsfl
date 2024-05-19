//
// DeleteFinalNullFrames
//
// This command was recorded by Adobe Animate.
// This plugin made by Endlin Boeingstein 2024/5/6




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
        for(var ly=0;ly<symbollayers.length;ly++){
            an.trace("layer name:"+symbollayers[ly].name);
            //选中图层
            symboltl.setSelectedLayers(ly);
            //获取帧数组
            var frames = symbollayers[ly].frames;
            for (var j = frames.length - 1; j >= 0; j--) {
                var frame = frames[j];
                if (frame.elements.length==0) {
                    //删除末尾空帧
                    symboltl.removeFrames(j);
                    an.trace("Pop.");
                    //an.getDocumentDOM().getTimeline().removeFrames(j) // 移除空白帧
                    }
                else {
                        break; // 如果不是空白帧，则退出循环
                }
            }
            //an.getDocumentDOM().library.items[i].timeline.layers[ly].frames=frames;
            //symbollayers[ly].frames=frames;
        }
    }
}

alert("DeleteFinalNullFrames Done");

















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


