//
// RenameClip
//
// This command was recorded by Adobe Animate.
// This plugin was made by Endlin Boeingstein 2024/5/4
//
// Topology ordering optimization was made by Ghastasaucey Amadeus Vermeil in 2024/10/29

//i元件序号
var indi=0;
//a元件序号
var inda=0;
//记录a前缀
var prea="a";
//记录i前缀
var prei="i";
//记录main元件名称
var mainclip="main";

//输入图像元件前缀
var iclipnamepre=prompt("Please enter the image clip's name to change it.","");
//输入动画元件前缀
var aclipnamepre=prompt("Please enter the animation clip's name to change it.","");
//输入主元件前缀
var mainclipname=prompt("Please enter the main clip's name to change it.","main");
try{
    if(iclipnamepre==null||aclipnamepre==null||mainclipname==null||iclipnamepre==""||aclipnamepre==""||mainclipname=="") throw "Stop Running.";
    prei=iclipnamepre;
    prea=aclipnamepre;
    mainclip=mainclipname;


    // if(iclipnamepre!=''||iclipnamepre!=null){
//     prei=iclipnamepre;
// }
// if(aclipnamepre!=''||aclipnamepre!=null){
//     prea=aclipnamepre;
// }


//遍历library的文件，记录library的文件
    var itemArray = an.getDocumentDOM().library.items;
    itemArray=itemArray.sort(sot);
	var StartTime = new Date();
	an.trace("—————————————————————————— Start at " + StartTime + "——————————————————————————");
	itemArray = TopoSort(itemArray);
	var EndTime = new Date();
	EndTime -= StartTime;
	an.trace("排序用时" + EndTime);
	//itemArray=bubbleSort(itemArray);

	for(var i in itemArray){
		an.trace("二次更名前library item's name:"+itemArray[i].name);
	}




    //二次处理
//循环获取库内容
    for(var i in itemArray){
        //判定是否为元件（影片剪辑/图形）
        if(itemArray[i].itemType=="movie clip"||itemArray[i].itemType=="graphic"){
            if(itemArray[i].name!=mainclip&&!(itemArray[i].timeline.layers.length==1&&itemArray[i].timeline.layers[0].frames.length==1&&itemArray[i].timeline.layers[0].frames[0].elements.length==1&&itemArray[i].timeline.layers[0].frames[0].elements[0].elementType=="instance"&&itemArray[i].timeline.layers[0].frames[0].elements[0].instanceType=="bitmap")){
                //an.trace("二次更名前library item's name:"+itemArray[i].name);
                //自动改名
                itemArray[i].name="$"+prea+inda;
                //序号自增
                inda++;
                //an.trace("二次更名后library item's name:"+itemArray[i].name);
            }
            else if(itemArray[i].name!=mainclip&&(itemArray[i].timeline.layers.length==1&&itemArray[i].timeline.layers[0].frames.length==1&&itemArray[i].timeline.layers[0].frames[0].elements.length==1&&itemArray[i].timeline.layers[0].frames[0].elements[0].elementType=="instance"&&itemArray[i].timeline.layers[0].frames[0].elements[0].instanceType=="bitmap")){
                //an.trace("二次更名前library item's name:"+itemArray[i].name);
                //自动改名
                itemArray[i].name="$"+prei+indi;
                //序号自增
                indi++;
                //an.trace("二次更名后library item's name:"+itemArray[i].name);
            }
        }
    }



//三次处理
    itemArray=itemArray.sort(sot);
//for(var i in itemArray){
    //an.trace("三次更名前library item's name:"+itemArray[i].name);
//}
//循环获取库内容
    for(var i in itemArray){
        //判定是否为元件（影片剪辑/图形）
        if(itemArray[i].itemType=="movie clip"||itemArray[i].itemType=="graphic"){
            //an.trace("三次更名前library item's name:"+itemArray[i].name);
            itemArray[i].name=itemArray[i].name.replace("$","");
            //an.trace("三次更名后library item's name:"+itemArray[i].name);
        }
    }



//for(var i in itemArray){
    //an.trace("三次更名前library item's name:"+itemArray[i].name);
//}

    alert("RenameClip Done");


}catch (e) {
    alert(e);
}


function sot(a,b){
    return a.name-b.name;
}


function TopoSort(arr) {
	//an.trace("启动拓扑排序");
	// 构建名称 -> 序的map
	var n = arr.length;
	var NameRefMap = new Object();
	for(var i = 0; i < n; i++) {
		a = arr[i];
		if(a.itemType !="movie clip" && a.itemType !="graphic")
			continue;
		if(a.name == mainclip)
			continue;
		NameRefMap[a.name] = i;
	}
	
	// 用于储存每个点的入度
	var ElementRefCount = new Array(n);
	var ElementTo = new Array(n);
	for(var i = 0; i < n; i++) {
		ElementTo[i] = new Array();
		ElementRefCount[i] = 0;
	}
	
	// relElementCount 是为后续优化准备的变量
	// 在一个正常的流程中，函数结束时，relElementCount取值应当为0
	// 当引用关系成环时（这显然是不合法的），relElementCount不为0
	// 可以考虑在此类情况下发出报错
	var relElementCount = 0;
	
	for(var i = 0; i < n; i++){
		a = arr[i];
		if (a.itemType != "movie clip" && a.itemType !="graphic")
			continue;
		if (a.name == mainclip)
			continue;
		relElementCount++;
		var symboltl=a.timeline;
		var symbollayers=symboltl.layers;
		for(ly in symbollayers){
			var RepRemoveMap = new Object();
			
			var frameArray = symbollayers[ly].frames;
			for(frm in frameArray){
				var symbolelements=frameArray[frm].elements;
				for(ele in symbolelements){
					if(symbolelements[ele].elementType=="instance" && symbolelements[ele].instanceType=="symbol"){

						// 稍微解释一下RepRemoveMap这一点，在包括某个引用的图层不止一个的情况下，他会将一个元素多次推入Array
						// 虽然这并不会导致执行上的问题，但这可能是空间不足的隐患
						// 直接判断Array中是否含有元素在极端情况下可能会对时间开销产生压力（在单个图层引用的图层相当多的情况下），使程序退化
						// 所以这里采用类似map的方法，我希望他是log复杂度的
						
						//an.trace("元素" + a.name + "引用了 " + symbolelements[ele].libraryItem.name);
						if(RepRemoveMap.hasOwnProperty(symbolelements[ele].libraryItem.name))
							continue;
						if(!NameRefMap.hasOwnProperty(symbolelements[ele].libraryItem.name))
							continue;
						RepRemoveMap[symbolelements[ele].libraryItem.name] = true;
						var tiedIndex = NameRefMap[symbolelements[ele].libraryItem.name];
						//an.trace("将引用" + tiedIndex + "加入数组");
						ElementRefCount[i]++;
						ElementTo[tiedIndex].push(i);
					}
				}
			}
			
			
		}
    }
	
	// 队列，用于拓扑排序
	var TopDeque = new Array();
	var OutArray = new Array();
	for(var i = 0; i < n; i++){
		a = arr[i];
		if (a.itemType != "movie clip" && a.itemType !="graphic") {
			OutArray.push(a);
			continue;
		}
		if (a.name == mainclip) {
			OutArray.push(a);
			continue;
		}
		//an.trace(i + "入度为" + ElementRefCount[i]);
		if (ElementRefCount[i] != 0) 
			continue;
		
		TopDeque.push(i);
	}
	
	
	while(TopDeque.length != 0) {
		var cIndex = TopDeque[0];
		TopDeque.shift();
		relElementCount--;
		OutArray.push(arr[cIndex]);
		
		for(var i = 0; i < ElementTo[cIndex].length; i++) {
			var tIndex = ElementTo[cIndex][i];
			ElementRefCount[tIndex]--;
			if(ElementRefCount[tIndex] == 0) {
				//an.trace("引入编号" + arr[tIndex].name + " 由于 " + arr[cIndex].name);
				TopDeque.push(tIndex);
			}
		}
		
	}
	
	return OutArray;
}

//引用冒泡排序算法
function bubbleSort(arr) {
	an.trace("启动冒泡排序");
    var n = arr.length;
    var swapped; // 用于标记本轮循环是否有元素交换，优化冒泡排序

    // 外层循环控制遍历的轮数，一共需要遍历n-1轮
    for (var i = 0; i < n; i++) {
        //swapped = false; // 每轮开始时重置swapped为false

        // 内层循环负责进行元素的比较和交换
        for (var j = i; j < n; j++) { // 注意：每次遍历后最后一个元素已排好序，无需再次比较
            if (compareAItems(arr[i],arr[j])) { // 如果引用，则交换它们
                an.trace("交换："+arr[i].name+" "+arr[j].name);
                // 交换arr[i]和arr[j]
                //[arr[i], arr[j]] = [arr[j], arr[i]];
                var t=arr[i];arr[i]=arr[j];arr[j]=t;
                an.trace("交换完成："+arr[i].name+" "+arr[j].name);
                i--;break;
                //swapped = true; // 发生了交换，设置swapped为true
            }
        }

        // 如果在某一轮遍历中没有发生任何交换，说明数组已经是有序的了，可以提前结束排序
        //if (!swapped) break;
    }

    //for(var i=0;i<n;i++){
        //an.trace("排序完成："+arr[i].name);
    //}
    return arr;
}


//通过引用进行排序
function compareAItems(a,b){
    if((a.itemType=="movie clip"||a.itemType=="graphic")&&(b.itemType=="movie clip"||b.itemType=="graphic")&&(a.name!=mainclip)&&(b.name!=mainclip)){
        an.trace("Compare:"+a.name+"和"+b.name+":");
        //获取时间轴
        var symboltl=a.timeline;
        //获取时间轴内的图层
        var symbollayers=symboltl.layers;
        //循环得到图层内容
        for(ly in symbollayers){
            //an.trace("layer name:"+symbollayers[ly].name);
            //获取帧数组
            var frameArray = symbollayers[ly].frames;
            //遍历获取帧
            for(frm in frameArray){
                //获取引用对象数组
                var symbolelements=frameArray[frm].elements;
                //遍历获取引用对象
                for(ele in symbolelements){
                    //an.trace("element type:"+symbolelements[ele].elementType);
                    //如果类型为instance
                    if(symbolelements[ele].elementType=="instance"){
                        //an.trace("Instance: " + symbolelements[ele].instanceType);
                        if(symbolelements[ele].instanceType=="symbol"){
                            //an.trace("引用:"+a.name+"引用"+symbolelements[ele].libraryItem.name);
                            //如果a引用b则交换
                            if(symbolelements[ele].libraryItem.name==b.name){//&&(an.getDocumentDOM().library.findItemIndex(a.name)<an.getDocumentDOM().library.findItemIndex(b.name))
                                an.trace("引用:"+a.name+"引用"+symbolelements[ele].libraryItem.name);
                                an.trace("序号:"+an.getDocumentDOM().library.findItemIndex(a.name)+"引用"+an.getDocumentDOM().library.findItemIndex(b.name));
                                an.trace("高位引用，进行交换。");
                                return 1;
                            }
                        }
                    }
                }
            }
        }
    }
    return 0;
}

// 自定义排序函数
function compItems(a, b){
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        // 分割字符串为非数字、数字和后续字符串部分
        var matchA = nameA.match(/(\D+)(\d+)(.*)/);
        var matchB = nameB.match(/(\D+)(\d+)(.*)/);

        // 确保正则匹配成功
        if (!matchA || !matchB) return 0;

        // 比较非数字部分（包括可能的下划线及其前的部分）
        var nonNumPartA = matchA[1];
        var nonNumPartB = matchB[1];
        var compareResult = nonNumPartA.localeCompare(nonNumPartB);
        if (compareResult !== 0) return compareResult;

        // 如果非数字部分相同，则比较数字部分
        var numA = parseInt(matchA[2], 10);
        var numB = parseInt(matchB[2], 10);
        if (numA !== numB) return numA - numB;

        // 如果数字也相同，则比较后续字符串部分
        return matchA[3].localeCompare(matchB[3]);
}





