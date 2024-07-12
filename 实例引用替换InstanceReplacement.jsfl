﻿//
// InstanceReplacement
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/7/12


//输入A元件前缀
var A_name=prompt("A->B,Please enter A's name.");
//输入B元件前缀
var B_name=prompt("A->B,Please enter B's name.");


// //主xfl路径
// var mainxflpath=(an.getDocumentDOM().pathURI).substring(0,(an.getDocumentDOM().pathURI).lastIndexOf("/"));
//
// //设置被选中的数组
// var selection=new Array();
// var x=0;

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

            //获取帧数组
            var frameArray = symbollayers[ly].frames;
            //遍历获取帧
            for(var frm=0;frm< frameArray.length;frm++){

                //获取引用对象数组
                var symbolelements=frameArray[frm].elements;
                /*var ele=0;
                while(ele<symbolelements.length)*/
                //遍历获取引用对象
                for(var ele=0;ele<symbolelements.length;ele++){
                    //an.trace("element type:"+symbolelements[ele].elementType);
                    //如果类型为元件
                    if(symbolelements[ele].elementType=="instance"){
                        //an.trace("Instance: " + symbolelements[ele].instanceType);
                        /*if(symbolelements[ele].instanceType=="symbol"){*/
                            //an.trace("引用:"+a.name+"引用"+symbolelements[ele].libraryItem.name);
                            if(symbolelements[ele].libraryItem.name==A_name){
                                //检测是否被锁或者是否隐藏
                                if((!an.getDocumentDOM().getTimeline().getLayerProperty("locked")&&(an.getDocumentDOM().getTimeline().getLayerProperty("visible")))){
                                    //定位到当前层
                                    an.getDocumentDOM().getTimeline().currentLayer=ly;
                                    //定位到当前帧
                                    an.getDocumentDOM().getTimeline().currentFrame=frm;
                                    an.getDocumentDOM().selection=[symbolelements[ele]];
                                    an.getDocumentDOM().swapElement(B_name);
                                    symbolelements=frameArray[frm].elements;
                                    ele--;
                                    an.getDocumentDOM().selectNone();
                                    an.trace(A_name+"->"+B_name+"......");
                                }
                                else{
                                    an.trace("This layer is invisible or locked. ");
                                }
                            }
                            else{}
                        /*}
                        else{}*/


                    }
                }
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

//an.getDocumentDOM().selectNone();
//an.getDocumentDOM().selection=selection;
//an.getDocumentDOM().convertSelectionToBitmap();


alert("InstanceReplacement Done");














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





