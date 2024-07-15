//
// ConvertToKeyframes
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/5/12

// 创建传统补间
//an.getDocumentDOM().getTimeline().createMotionTween();

// 选择帧


// 转换为关键帧
//an.getDocumentDOM().getTimeline().convertToKeyframes();

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
        for(var ly=0;ly<symbollayers.length;ly++){
            an.trace("layer name:"+symbollayers[ly].name);

            //选中图层
            //symboltl.setSelectedLayers(ly);
            //获取帧数组
            var frameArray = symbollayers[ly].frames;
            //遍历获取帧
            for(var frm=0;frm<frameArray.length;frm++){

                //检测是否为补间
                if(frameArray[frm].tweenType!="none")
                /*if(symboltl.getFrameProperty("tweenType",frm)!="none")*/{
                    //独立帧没法被转换，直接跳
                    if(frameArray[frm].duration==1)
                    /*if(symboltl.getFrameProperty("duration",frm)==1)*/{
                        an.getDocumentDOM().selectNone();
                        continue;
                    }
                    an.getDocumentDOM().selectNone();
                    //定位到当前层
                    an.getDocumentDOM().getTimeline().currentLayer=ly;
                    //定位到当前帧
                    an.getDocumentDOM().getTimeline().currentFrame=frm;
                    symboltl=itemArray[i].timeline;
                    //转换为逐帧
                    symboltl.convertToKeyframes(frm);


                    frm--;
                    frameArray = symbollayers[ly].frames;
                    an.getDocumentDOM().selectNone();
                    an.trace("ConvertToKeyframes......");
                }
            }
            //遍历获取帧
            for(var frm=0;frm<frameArray.length;frm++){
                //检测是否为补间
                if(frameArray[frm].tweenType!="none"){
                    //定位到当前层
                    //an.getDocumentDOM().getTimeline().currentLayer=ly;
                    //定位到当前帧
                    //an.getDocumentDOM().getTimeline().currentFrame=frm;
                    //取消补间
                    frameArray[frm].tweenType="none";
                    symboltl=itemArray[i].timeline;
                    //symboltl.setFrameProperty("tweenType", "none",frm);
                    frm--;
                    an.getDocumentDOM().selectNone();
                    an.trace("DeleteTweenType......");
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


alert("ConvertToKeyframes Done");