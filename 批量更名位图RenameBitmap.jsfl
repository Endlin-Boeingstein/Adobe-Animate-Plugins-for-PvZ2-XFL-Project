//
// RenameBitmap
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/5/4

//位图序号
var indb=0;

//输入位图名
var bitmapnamepre=prompt("Please enter the bitmap's name to change it.","");
try{
    if(bitmapnamepre==null) throw "Stop Running.";

    //二次处理
//遍历library的文件，记录library的文件
    var itemArray = an.getDocumentDOM().library.items;
//循环获取库内容
    for(i in itemArray){
        //位图
        if(itemArray[i].itemType=="bitmap"){
            //批量命名
            itemArray[i].name="$"+bitmapnamepre+"_"+indb;
            //序号自增
            indb++;
        }
    }

//三次处理
//遍历library的文件，记录library的文件
    var itemArray2 = an.getDocumentDOM().library.items;
//循环获取库内容
    for(i in itemArray2){
        //位图
        if(itemArray2[i].itemType=="bitmap"){
            //批量命名
            itemArray2[i].name=itemArray2[i].name.replace("$","");
        }
    }

    alert("RenameBitmap Done");



}catch (e) {
    alert(e);
}


