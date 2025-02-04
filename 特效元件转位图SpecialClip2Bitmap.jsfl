//
// SpecialClip2Bitmap
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/6/16


/**
 * Created with IntelliJ IDEA.
 * User: Endlin Boeingstein
 * Date: 2024/6/17
 * Time: 20:31
 * To change this template use File | Settings | File Templates.
 */


// //主xfl路径
// var mainxflpath=(an.getDocumentDOM().pathURI).substring(0,(an.getDocumentDOM().pathURI).lastIndexOf("/"));
//
// //设置被选中的数组
// var selection=new Array();
// var x=0;




// 创建新元件
an.getDocumentDOM().library.addNewItem('graphic',"$TempClip");
// 打开库中的元件
an.getDocumentDOM().library.editItem("$TempClip");
//获取默认色彩效果
var default_colors=an.getDocumentDOM().getTimeline().layers[0].getColorTransformAtFrame (0);
// 返回到主场景
an.getDocumentDOM().exitEditMode();
// 删除库项目
an.getDocumentDOM().library.deleteItem("$TempClip");

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
                // //预定义是否缓动
                // var haveease=false;
                // //判断是否缓动
                // if(frameArray[frm].hasCustomEase){
                //     haveease=true;
                // }
                //获取引用对象数组
                var symbolelements=frameArray[frm].elements;
                /*var ele=0;
                while(ele<symbolelements.length)*/
                //遍历获取引用对象
                for(var ele=0;ele<symbolelements.length;ele++){
                    //an.trace("element type:"+symbolelements[ele].elementType);
                    //如果类型为元件
                    if(symbolelements[ele].elementType=="instance"){




                        // an.getDocumentDOM().selectNone();
                        // //定位到当前层
                        // an.getDocumentDOM().getTimeline().currentLayer=ly;
                        // //定位到当前帧
                        // an.getDocumentDOM().getTimeline().currentFrame=frm;
                        // an.getDocumentDOM().selection=[symbolelements[ele]];
                        // //获取滤镜数量
                        // var filtercount=(an.getDocumentDOM().getFilters()).length;
                        // an.trace("filtercount:"+filtercount);
                        // an.getDocumentDOM().selectNone();


                        //转移帧滤镜至元件路径
                        if(symbolelements[ele].elementType=="instance"&&symbolelements[ele].instanceType=="symbol"){
                            // 获取当前帧上图层的滤镜
                            var filters = symbollayers[ly].getFiltersAtFrame(frm);
                            //如果存在帧滤镜
                            if (filters!=null && filters.length > 0 && filters!=[]){
                                an.trace(filters[0].name);
                                //防止对象无滤镜
                                if(symbolelements[ele].filters==undefined){
                                    symbolelements[ele].filters=filters;
                                }
                                else{
                                    //将帧滤镜塞入对象滤镜
                                    symbolelements[ele].filters.concat(filters);
                                }
                                //清空帧滤镜
                                symbollayers[ly].setFiltersAtFrame(frm,[]);
                            }
                        }

                        //转移帧高级色彩至元件路径
                        if(symbolelements[ele].elementType=="instance"&&symbolelements[ele].instanceType=="symbol"){
                            // 获取当前帧上图层的滤镜
                            var colors = symbollayers[ly].getColorTransformAtFrame(frm);
                            //获取帧
                            effectframe=frameArray[frm];
                            //如果存在帧高级色彩
                            if (effectframe.colorEffect!={
                                brightness:0,
                                contrast:0,
                                saturation:0,
                                tint:0
                            }&&!(colors.colorAlphaPercent==100&&
                            colors.colorRedPercent==100&&
                            colors.colorGreenPercent==100&&
                            colors.colorBluePercent==100&&
                            colors.colorAlphaAmount==0&&
                            colors.colorRedAmount==0&&
                            colors.colorGreenAmount==0&&
                            colors.colorBlueAmount==0)){
                                symbolelements[ele].colorMode="advanced";
                                symbolelements[ele].colorAlphaPercent=colors.colorAlphaPercent;
                                symbolelements[ele].colorRedPercent=colors.colorRedPercent;
                                symbolelements[ele].colorGreenPercent=colors.colorGreenPercent;
                                symbolelements[ele].colorBluePercent=colors.colorBluePercent;
                                symbolelements[ele].colorAlphaAmount=colors.colorAlphaAmount;
                                symbolelements[ele].colorRedAmount=colors.colorRedAmount;
                                symbolelements[ele].colorGreenAmount=colors.colorGreenAmount;
                                symbolelements[ele].colorBlueAmount=colors.colorBlueAmount;

                                // colors.mode="none";
                                // colors.tintPercent=0;
                                // colors.brightnessPercent=0;
                                // colors.alphaPercent=0;
                                // colors.colorAlphaPercent=100;
                                // colors.colorRedPercent=100;
                                // colors.colorGreenPercent=100;
                                // colors.colorBluePercent=100;
                                // colors.colorAlphaAmount=0;
                                // colors.colorRedAmount=0;
                                // colors.colorGreenAmount=0;
                                // colors.colorBlueAmount=0;
                                if(ele>=symbolelements.length-1){

                                    // if(frameArray[frm].colorTransform){
                                    //     frameArray[frm].colorTransform = {
                                    //         redMultiplier: 1,
                                    //         greenMultiplier: 1,
                                    //         blueMultiplier: 1,
                                    //         alphaMultiplier: 1,
                                    //         redOffset: 0,
                                    //         greenOffset: 0,
                                    //         blueOffset: 0,
                                    //         alphaOffset: 0
                                    //     };
                                    // }


                                    symbollayers[ly].setColorTransformAtFrame(frm,default_colors);


                                    // var colormd=frameArray[frm].colorMode;
                                    // colormd=="none";
                                    // var colore=frameArray[frm].colorEffect;
                                    // colore={
                                    //             brightness:0,
                                    //             contrast:0,
                                    //             saturation:0,
                                    //             tint:0
                                    //         };
                                    // if(frameArray[frm].colorMode!="none"){
                                    //     frameArray[frm].colorMode="none";
                                    // }
                                    // if(frameArray[frm].colorEffect){
                                    //     frameArray[frm].colorEffect={
                                    //         brightness:0,
                                    //         contrast:0,
                                    //         saturation:0,
                                    //         tint:0,
                                    //         style:"none"
                                    //     };
                                    // }



                                }
                                an.trace("FrameToElement......");
                            }
                        }

                        //转移混合至元件路径
                        if(symbolelements[ele].elementType=="instance"&&symbolelements[ele].instanceType=="symbol"){
                            //获取混合模式
                            var frameblendmode=symbollayers[ly].getBlendModeAtFrame(frm);
                            if(frameblendmode=="layer"||frameblendmode=="multiply"||frameblendmode=="screen"||frameblendmode== "overlay"||frameblendmode=="hardlight"||frameblendmode=="lighten"||frameblendmode=="darken"||frameblendmode=="difference"||frameblendmode=="add"||frameblendmode=="subtract"||frameblendmode=="invert"||frameblendmode=="alpha"||frameblendmode=="erase"){
                                symbolelements[ele].blendMode=frameblendmode;
                                symbollayers[ly].setBlendModeAtFrame(frm,"normal");
                            }
                        }



                        //预定义是否含滤镜
                        var havefilters=false;
                        //判断是否含滤镜
                        if(symbolelements[ele].elementType=="instance"&&symbolelements[ele].instanceType=="symbol"){
                            var filtersarray=null;
                            filtersarray=symbolelements[ele].filters;
                            if(filtersarray!=null&&filtersarray.length>0){
                                havefilters=true;
                            }
                        }




                        //如果使用高级或滤镜或者混合
                        if(symbolelements[ele].colorMode=="advanced"||/*symbolelements[ele].blendMode!= "normal"||*//*(symbolelements[ele].getFilters()).length>0*//*filtercount>0*/havefilters/*||haveease*/||symbolelements[ele].blendMode=="layer"||symbolelements[ele].blendMode=="multiply"||symbolelements[ele].blendMode=="screen"||symbolelements[ele].blendMode== "overlay"||symbolelements[ele].blendMode=="hardlight"||symbolelements[ele].blendMode=="lighten"||symbolelements[ele].blendMode=="darken"||symbolelements[ele].blendMode=="difference"||symbolelements[ele].blendMode=="add"||symbolelements[ele].blendMode=="subtract"||symbolelements[ele].blendMode=="invert"||symbolelements[ele].blendMode=="alpha"||symbolelements[ele].blendMode=="erase"){
                            // var position=[symbolelements[ele].x,symbolelements[ele].y];
                            // var width=symbolelements[ele].width;
                            // var height=symbolelements[ele].height;
                            //symbolelements[ele].selected = true;
                            //选择编辑对象
                            //an.getDocumentDOM().library.selectItem(itemArray[i].name);
                            //编辑元件
                            //an.getDocumentDOM().library.editItem();

                            //an.getDocumentDOM().selectNone();
                            //selection[x]=symbolelements[ele];
                            //an.getDocumentDOM().selection=selection;
                            //x++;

                            //symbolelements[ele].symbolType="graphic";
                            //an.getDocumentDOM().convertToSymbol("graphic","SpecialClip_"+x,"top left");
                            //var bitmapPath = fl.browseForFileURL("save", "保存位图", "PNG 文件:*.png");
                            //检测是否被锁或者是否隐藏
                            if((!an.getDocumentDOM().getTimeline().getLayerProperty("locked")&&(an.getDocumentDOM().getTimeline().getLayerProperty("visible")))){
                                an.getDocumentDOM().selectNone();
                                //定位到当前层
                                an.getDocumentDOM().getTimeline().currentLayer=ly;
                                //定位到当前帧
                                an.getDocumentDOM().getTimeline().currentFrame=frm;
                                an.getDocumentDOM().selection=[symbolelements[ele]];
                                an.getDocumentDOM().convertSelectionToBitmap();
                                symbolelements=frameArray[frm].elements;
                                ele--;
                                an.getDocumentDOM().selectNone();
                                an.trace("SpecialClip2Bitmap......");
                            }
                            else{
                                an.trace("This layer is invisible or locked. ");
                            }


                            //symbolelements[ele].selected = false;
                            //an.getDocumentDOM().exitEditMode();


                            // an.getDocumentDOM().selectNone();
                            //an.getDocumentDOM().swapElement("SpecialClip_"+x);


                            //var transformation=symbolelements[ele].getTransformationMatrix();
                            // an.getDocumentDOM().selectNone();
                            // an.getDocumentDOM().selection=[symbolelements[ele]];
                            // var bitmapPath=mainxflpath+"/LIBRARY/"+itemArray[i].name+".png";
                            // if(bitmapPath){
                            //     an.getDocumentDOM().exportPNG(bitmapPath,true);
                            //     //an.getDocumentDOM().deleteSelection();
                            //     an.getDocumentDOM().importFile(bitmapPath);
                            //     var importedBitmap=an.getDocumentDOM().library.items[an.getDocumentDOM().library.items.length-1];
                            //     an.getDocumentDOM().addItem(position,importedBitmap);
                            //     an.getDocumentDOM().swapElement(importedBitmap.name)
                            //     var newElement=an.getDocumentDOM().selection[0];
                            //     //newElement.setTransformationMatrix(transformation);
                            //     newElement.width=width;
                            //     newElement.height=height;
                            // }













                            //指向元件
                            // symbolelements[ele].selected = true;

                            //
                            //
                            // //选择编辑对象
                            // an.getDocumentDOM().library.selectItem(itemArray[i].name);
                            // //编辑元件
                            // an.getDocumentDOM().library.editItem();
                            // an.getDocumentDOM().selection=[];
                            // //选择元件
                            // an.getDocumentDOM().selection=[symbolelements[ele]];
                            // // //转换为位图
                            // //转换为位图
                            // an.getDocumentDOM().convertSelectionToBitmap();
                            //ele--;
                            // var bitmapPath=an.configDirectory+"/LIBRARY/"+"Bitmap_"+itemArray[i].name+".png";
                            // an.getDocumentDOM().exportPNG(bitmapPath,true);
                            // an.getDocumentDOM().importFile(bitmapPath,true,true,true);
                            //var importedBitmap=an.getDocumentDOM().library.items[an.getDocumentDOM().library.items.length-1];
                            // an.getDocumentDOM().selectNone();
                            // symbolelements[ele].selected = true;
                            // //选择元件
                            // an.getDocumentDOM().selection[0]=symbolelements[ele];
                            // an.getDocumentDOM().deleteSelection();
                            //symbolelements.splice(ele,1)
                            //an.getDocumentDOM().addItem({x:0,y:0},importedBitmap);



                            //an.trace(bitmap.name);
                            //symbolelements[ele]=importedBitmap;
                            //改变颜色模式为无
                            //symbolelements[ele].colorMode=="none";

                            //an.trace("SpecialClip2Bitmap:"+symbolelements[ele].elementType);
                        }
                        /*else{
                            ele++;
                        }*/

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


alert("SpecialClip2Bitmap Done");














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





