//
// Tint2Advanced
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/6/16




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
                    //an.trace("element type:"+symbolelements[ele].elementType);
                    //如果类型为shape(edge)
                    if(symbolelements[ele].elementType=="instance"){

                        //如果使用高级
                        if(symbolelements[ele].colorMode=="advanced"){
                            //获得RGB颜色并转换为色调
                            var red=(symbolelements[ele].colorRedAmount).toString(16);
                            var green=(symbolelements[ele].colorGreenAmount).toString(16);
                            var blue=(symbolelements[ele].colorBlueAmount).toString(16);
                            red=(red.length===1?'0'+red:red);
                            green=(green.length===1?'0'+green:green);
                            blue=(blue.length===1?'0'+blue:blue);
                            //获取RGB十六进制值
                            var tintcolor="#"+red+green+blue;
                            //改变模式为色调
                            symbolelements[ele].colorMode="tint";
                            //指向元件
                        symbolelements[ele].selected = true;

                        
                        //选择编辑对象
                        an.getDocumentDOM().library.selectItem(itemArray[i].name);
                        //编辑元件
                        an.getDocumentDOM().library.editItem();
                        //选择元件
                        an.getDocumentDOM().selection[0]=symbolelements[ele];
                        //转换为位图
                        an.getDocumentDOM().setInstanceTint(tintcolor, 100);
                        an.trace("Tint2Advanced......");
                        //an.trace("Tint2Advanced:"+symbolelements[ele].elementType);
                        }
                        
                        
                    }
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


alert("Tint2Advanced Done");














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


