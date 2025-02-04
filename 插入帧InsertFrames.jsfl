//
// 插入帧
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2025/1/26


//输入插入帧长度
var frameduration=prompt("Please enter the inserted frames' duration.","");
try{
    if(frameduration==null) throw "Stop Running.";
    // 插入帧
    for(var i=0;i<frameduration;i++){
        an.getDocumentDOM().getTimeline().insertFrames();
    }
    alert("InsertFrames Done");

}catch (e) {
    alert(e);
}



