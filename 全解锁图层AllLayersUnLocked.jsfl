//
// AllLayersUnLocked
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/6/28




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
        // 打开库中的元件
        an.getDocumentDOM().library.editItem(itemArray[i].name);
        //获取时间轴
        var symboltl=itemArray[i].timeline;
        //获取时间轴内的图层
        var symbollayers=symboltl.layers;
        //循环得到图层内容
        for(var ly=0;ly< symbollayers.length;ly++){
            an.trace("layer name:"+symbollayers[ly].name);

            //定位到当前层
            an.getDocumentDOM().getTimeline().currentLayer=ly;
            //检测是否被锁
            if(an.getDocumentDOM().getTimeline().getLayerProperty("locked")){
                // 锁定图层: false
                an.getDocumentDOM().getTimeline().setLayerProperty('locked', false);
                an.trace("Layer UnLocked");
            }
        }
        // 返回到主场景
        an.getDocumentDOM().exitEditMode();

        //获取libaryitem名，否则返回场景名
        //var it = symboltl.libraryItem;
        //if (it)
        //fl.trace("libraryItem name: " + it.name);
        //else
        //fl.trace("scene name: " + an.getDocumentDOM().getTimeline().name);
    }
}


alert("AllLayersUnLocked Done");














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


