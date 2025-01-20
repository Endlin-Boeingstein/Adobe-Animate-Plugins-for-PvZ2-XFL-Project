//
// RenameBitmap
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/5/4

//20250120废弃//位图序号
//20250120废弃//var indb=0;

//输入位图名
var bitmapnamepre=prompt("Please enter the bitmap's name to change it.","");
try{
    if(bitmapnamepre==null) throw "Stop Running.";

    // 创建新元件
    an.getDocumentDOM().library.addNewItem('graphic',"$TempClip");
    // 打开库中的元件
    an.getDocumentDOM().library.editItem("$TempClip");
    // 用于存储已存在的名称（用于检测重复）
    var nameMap = {};
    //二次处理
//遍历library的文件，记录library的文件
    var itemArray = an.getDocumentDOM().library.items;
//循环获取库内容
    for(var i=0;i<itemArray.length;i++){
        //位图
        if(itemArray[i].itemType=="bitmap"){
            an.getDocumentDOM().selectNone();
            // 选择位图载入
            an.getDocumentDOM().library.selectItem(itemArray[i].name);
            // 将库项目添加到文档: {x:0, y:0}
            an.getDocumentDOM().library.addItemToDocument({x:0, y:0},itemArray[i].name);
            //确定临时元件
            var tempclip=itemArray[an.getDocumentDOM().library.findItemIndex("$TempClip")];
            //定位到位图实例
            var temppic=tempclip.timeline.layers[0].frames[0].elements[0];
            an.getDocumentDOM().selectNone();
            //定位到当前层
            an.getDocumentDOM().getTimeline().currentLayer=tempclip.timeline.layers[0];
            //定位到当前帧
            an.getDocumentDOM().getTimeline().currentFrame=tempclip.timeline.layers[0].frames[0];
            //定位到当前的位图
            an.getDocumentDOM().selection=[temppic];
            //得到宽高
            var width=parseInt(0.78125*temppic.hPixels);
            var height=parseInt(0.78125*temppic.vPixels);
            an.trace("originname:"+itemArray[i].name+"width:"+width+"height:"+height);
            // 构造基本后缀
            var baseSuffix = "_" + width + "x" + height;
            // 检查是否已有同样的名称
            var oldName = bitmapnamepre+baseSuffix;
            //储存新名称
            var newName=oldName;
            if (nameMap[oldName]) {
                // 如果名称重复，添加一个数字后缀
                var count = nameMap[oldName];
                newName = bitmapnamepre+baseSuffix + "_" + count;
                nameMap[oldName] = count + 1; // 更新计数
            } else {
                // 如果名称不重复，初始化计数
                nameMap[oldName] = 2;
            }
            //批量命名
            //20250120废弃//itemArray[i].name="$"+bitmapnamepre+"_"+indb;
            itemArray[i].name="$TMP"+newName;
            //20250120废弃//序号自增
            //20250120废弃//indb++;
            //删除载入的位图
            an.getDocumentDOM().deleteSelection();
            an.getDocumentDOM().selectNone();
        }
    }

    // 返回到主场景
    an.getDocumentDOM().exitEditMode();
    // 删除库项目
    an.getDocumentDOM().library.deleteItem("$TempClip");

//三次处理
//遍历library的文件，记录library的文件
    var itemArray2 = an.getDocumentDOM().library.items;
//循环获取库内容
    for(var j=0; j<itemArray2.length;j++){
        //位图
        if(itemArray2[j].itemType=="bitmap"){
            //如果抽风，就删掉抽风的，重来
            //if(an.getDocumentDOM().library.itemExists(itemArray2[j].name.replace("$TMP",""))){
            //如果它是$TMP型（防止误伤自己）且库中存在已经被干掉临时前缀的位图（AN抽风），则干掉抽风位图防止报错
            if((itemArray2[j].name=="$TMP"+itemArray2[j].name.replace("$TMP",""))&&(an.getDocumentDOM().library.itemExists(itemArray2[j].name.replace("$TMP","")))){
                an.getDocumentDOM().library.deleteItem(itemArray2[j].name.replace("$TMP",""));
                itemArray2 = an.getDocumentDOM().library.items;
                j=-1;
                an.trace("Crash Bitmaps Deleted. ");
                continue;
            }
            else{
                //批量命名
                itemArray2[j].name=itemArray2[j].name.replace("$TMP","");
            }
        }
    }

    alert("RenameBitmap Done");



}catch (e) {
    alert(e);
}


