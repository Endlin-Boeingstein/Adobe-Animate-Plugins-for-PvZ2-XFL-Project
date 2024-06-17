//
// BitmapOutput
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/6/17




//遍历library的文件，记录library的文件
var itemArray = an.getDocumentDOM().library.items;
//循环获取库内容
for(i in itemArray){
    //位图
    if(itemArray[i].itemType=="bitmap"){
        //主xfl路径
        var mainxflpath=(an.getDocumentDOM().pathURI).substring(0,(an.getDocumentDOM().pathURI).lastIndexOf("/"));
        //an.trace("输出主路径library item's sourceFilePath:"+mainxflpath); 
        //an.trace("源路径library item's sourceFilePath:"+itemArray[i].sourceFilePath); 
        an.trace("输出路径library item's FilePath:"+mainxflpath+"/LIBRARY/"+itemArray[i].name+".png"); 
        //修改源路径(改不了，注释掉)
        //itemArray[i].sourceFilePath=mainxflpath+"/LIBRARY/"+itemArray[i].name+".png";
        //输出
        itemArray[i].exportToFile(mainxflpath+"/LIBRARY/"+itemArray[i].name+".png");
    }
}



alert("BitmapOutput Done");


