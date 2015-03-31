var author = "平安保险";

//其它属性根据课程需要添加
var manifest=[
        {n:0,id:"home0",src:"images/00.jpg",c:0},
        {n:1,id:"home1",src:"images/01.jpg",c:0},
        {n:2,id:"home2",src:"images/02.jpg",c:0},
        {n:3,id:"p1_bg",src:"images/03.jpg",c:0},
        {n:4,id:"p2_bg",src:"images/04.jpg",c:0},
        {n:5,id:"p3_bg",src:"images/05.jpg",c:0},
        {n:6,id:"p4_bg",src:"images/06.jpg",c:0},
        {n:7,id:"p5_bg",src:"images/07.jpg",c:0},
        // {n:8,id:"p6_bg",src:"images/pic7.jpg",c:0},
        // {n:9,id:"p7_bg",src:"images/pic8.jpg",c:0},
        
        // {n:10,id:"tishiBar",src:"images/tishiBar.png",c:0},
        
        // {n:11,id:"p5_1_bg",src:"images/pic5-1.jpg",c:1},
        // {n:12,id:"p5_2_bg",src:"images/pic5-2.jpg",c:1},       
        // {n:13,id:"p5_3_bg",src:"images/pic5-3.jpg",c:1},
        // {n:14,id:"p5_4_bg",src:"images/pic5-4.jpg",c:1},   
        // {n:15,id:"p5_5_bg",src:"images/pic5-5.jpg",c:1},
        // {n:16,id:"p5_6_bg",src:"images/pic5-6.jpg",c:1}, 
        
        // {n:17,id:"p6_1_bg",src:"images/pic6-1.jpg",c:1},
        // {n:18,id:"p6_2_bg",src:"images/pic6-2.jpg",c:1},   

        // {n:19,id:"p7_1_bg",src:"images/pic7-1.jpg",c:1},
        // {n:20,id:"p7_2_bg",src:"images/pic7-2.jpg",c:1},
        
        // {n:21,id:"p8_1_bg",src:"images/pic8-1.jpg",c:1},
        // {n:22,id:"p8_2_bg",src:"images/pic8-2.jpg",c:1}, 
        
        // {n:23,id:"pic5_c1",src:"images/pic5-c1.jpg",c:1},
        // {n:24,id:"pic5_c2",src:"images/pic5-c2.jpg",c:1},
        // {n:25,id:"pic5_c3",src:"images/pic5-c3.jpg",c:1},
        // {n:26,id:"pic5_c4",src:"images/pic5-c4.jpg",c:1},
        // {n:27,id:"pic5_c5",src:"images/pic5-c5.jpg",c:1},
        // {n:28,id:"pic5_c6",src:"images/pic5-c6.jpg",c:1},
        
        // {n:29,id:"pic6_c1",src:"images/pic6-c1.jpg",c:1},
        // {n:30,id:"pic6_c2",src:"images/pic6-c2.jpg",c:1},
        
        // {n:31,id:"pic7_c1",src:"images/pic7-c1.jpg",c:1},
        // {n:32,id:"pic7_c2",src:"images/pic7-c2.jpg",c:1},
        
        // {n:33,id:"pic8_c1",src:"images/pic8-c1.jpg",c:1},
        // {n:34,id:"pic8_c2",src:"images/pic8-c2.jpg",c:1},
        
        // {n:35,id:"title1",src:"images/title1.jpg",c:0},
        // {n:36,id:"title2",src:"images/title2.jpg",c:0},
        // {n:37,id:"title3",src:"images/title3.jpg",c:0},
        // {n:38,id:"title4",src:"images/title4.jpg",c:0},
        // {n:39,id:"title5",src:"images/title5.jpg",c:0}
];

//这两个值确定只加载哪些图片
var start1 = 0;
var start2 = 10;


//初始化（在html的body标签中调用）是本代码的第一入口
function init(){
	//获取用户的学习数据，该步骤可在首界面创建完毕后调用，但要注意如果要创建的界面用到了学习数据，则需要提前调用该方法
	//scoInit();
	//第一步：设置舞台及尺寸
	setStage();
	//第二步：加载图片，加载完毕后看loadComlete
	loadImaData(manifest);
};


/**********************************************/
//定义舞台及尺寸
var designW = 640;
var designH = 1008;
var stage;
var ticker=createjs.Ticker;//渲染器
var enTouch;
var isIOS;//是否为苹果系统

function setStage()
{
	isIOS = createjs.Sound.BrowserDetect.isIOS;//是否为苹果系
	var box_width = $("#box").width();
	var deviceH = document.documentElement.clientHeight;
	var deviceW = (deviceH*designW/designH)|0;
	var cwidth = deviceW+"px";
	var cheight = deviceH+"px";
	$("#cas").css({"width":cwidth,"height":cheight});
	//setBoxHeight(0);
	if(!isIOS)
	{
		$("#cas").css({"margin-left":(box_width-deviceW)/2+"px"});
		$("#leftArea").css({"width":(box_width-deviceW)/2+"px","height":deviceH});
	}
	var gameCanvas = document.getElementById("cas");
    stage=new createjs.Stage(gameCanvas);
    if(document.hasOwnProperty("ontouchstart")) {
        //alert("浏览器支持触屏");
        enTouch=true;
        stage.enableDOMEvents(false);
    }
	createjs.Touch.enable(stage);//这一行表示，允许移动设备触屏交互

	ticker.setFPS(60);//舞台帧率控制
	ticker.addEventListener("tick",onTick);//渲染画布
}

//实时渲染画布
function onTick(){
    stage.update();
}


/*********************加载图片**********************/
var perTxt;//加载进度文字
var preload;//加载器
var ld_bg;//加载条的背景色
var ld_bar;//回教样的前景色
var loadingBar;//加载条
var loading;//加载环
var welTxt;//欢迎语
var perTxt;
var ldInterval;//加载进度
function loadImaData(arr)
{

	//创建加载进度文字
    //进度
    loadingBar = new createjs.Container();
    

	var loadingBg=new createjs.Shape();
	loadingBg.graphics.beginFill("#fff0e3").drawRect(0,0,designW,designH).endFill();//注意这里一定要用beginFill，而不能用bf

    welTxt = new createjs.Text("", "24px 黑体", "#ff6600");
    		
    welTxt.x = designW/2;
    	
    welTxt.y = 620;
    welTxt.textAlign="center";
  
    welTxt.textBaseline = "alphabetic";
    welTxt.text="欢迎学习"+author+"课程";

	perTxt = new createjs.Text("", "72px Aparajita", "#fff");
    perTxt.x = designW/2;
    perTxt.y = 410;
    perTxt.textAlign="center";

	var circle = new createjs.Shape();
	circle.graphics.beginFill("#ff6600").drawCircle(0, 0, 110);
	circle.x = designW/2;
    circle.y = 450;
	
	loading = new lib.LOADING();

	loading.x = designW/2;
    loading.y = 450;

	loadingBar.addChild(loadingBg,circle,loading,welTxt);
	stage.addChild(loadingBar);

    preload=new createjs.LoadQueue(false); 
    //preload.addEventListener("complete",loadComlete);//素材加载完成监听
    preload.addEventListener("progress",loadProgress);//素材加载进程监听
    preload.loadManifest(arr);
	ldInterval = setInterval(setLoading,50);
}
//素材加载过程，显示百分比
var to_mf;
var load_per;//加载进度
function loadProgress(e){
    load_per = preload.progress*100|0;
	
}
//设置Loading环的旋转速度
var inter = 0;
function setLoading()
{
	inter++;
	
	var MAIN_F = loading.MAIN.currentFrame;
	//alert(MAIN_F);
	perTxt.text = MAIN_F+"";
	if(MAIN_F<load_per)
	{
		loading.MAIN.play();
	}else{
		loading.MAIN.stop();
	}
	if(MAIN_F==100)
	{
		window.clearInterval(ldInterval);
		ticker.setFPS(25);//舞台帧率控制
		loadComlete()
	}
	
}
//素材加载结束后
function loadComlete(){
	//stage.removeChild(loadingBar);
	//创建全部课程结构
	//creatAll();
	createjs.Tween.get(loadingBar, {loop:true})//循环
	.wait(300)
	.to({alpha:0},800)
	.call(loadingOver)
}
function loadingOver()
{
	stage.removeChild(loadingBar);
    //alert("over")
     window.location = "default.html"
}