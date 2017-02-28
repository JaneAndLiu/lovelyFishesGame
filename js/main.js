document.body.onload = game;

var can1,can2;
var ctx1,ctx2;
var lastTime;    //上一帧执行的时间
var deltaTime;   // 两帧间隔时间差
var bgPic = new Image(); //背景图
var canW,canH; //画布宽高
var ane; //海葵
var fruit;
var mom,baby;
var mX,mY; //鼠标位置
var babyTail = []; //小鱼尾巴
var babyEye = []; //小鱼眼睛
var babyBody = []; //小鱼身体
var momTail = []; //大鱼尾巴
var momEye = []; //大鱼眼睛
var momBodyOrange = [];
var momBodyBlue = [];
var data;
var wave;
var halo;
var dust;
var dustPic = [];
function game(){
	init();
	lastTime = Date.now(); //获取当前时间
	deltaTime = 0;
	gameloop();
};

// 初始化
function init(){
	// 获得canvas
	// can1 绘制 小鱼 圆圈特效
	// can2 绘制 背景 海葵
	can1 = document.getElementById('can1');
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('can2');
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src = "./src/background.jpg";	
	canW = can1.width;
	canH = can1.height;

	//海葵
	ane = new oAne();
	ane.init();

	// 果实
	fruit = new oFruit();
	fruit.init();

	// 大鱼
	mom = new oMom();
	mom.init();

	// 小鱼
	baby = new oBaby();
	baby.init();

	mX = canW * 0.5;
	mY = canH * 0.5;

	for (var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = './src/babyTail' + i + '.png';
	}
	for (var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src = './src/babyEye' + i + '.png';
	}
	for (var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = './src/babyFade' + i + '.png'; 
	}

	for (var i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src = './src/bigTail' + i + '.png';
	}
	for (var i = 0; i < 2; i++) {
		momEye[i] = new Image();
		momEye[i].src = './src/bigEye' + i + '.png';
	}
	for (var i = 0; i < 8; i++) {
		momBodyOrange[i] = new Image();
		momBodyOrange[i].src = './src/bigSwim' + i + '.png'; 
	}
	for (var i = 0; i < 8; i++) {
		momBodyBlue[i] = new Image();
		momBodyBlue[i].src = './src/bigSwimBlue' + i + '.png'; 
	}
	data = new oData();
	ctx1.font = "20px Verdana";
	ctx1.textAlign = "center";

	wave = new oWave();
	wave.init();

	halo = new oHalo();
	halo.init();

	for (var i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = './src/dust' + i + '.png'; 
	}
	dust = new oDust();
	dust.init();
}
function gameloop(){
	window.requestAnimFrame(gameloop);

	var now = Date.now();
	deltaTime = now - lastTime; //获取每一帧时间差
	lastTime = now;
	if (deltaTime > 40) {
		deltaTime = 40;
	}
	drawBg(); //背景
	ane.draw(); //绘制海葵
	fruit.draw(); //绘制果实
	fruitMonitor();
	ctx1.clearRect(0,0,canW,canH);
	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBabyCollision();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}
function onMouseMove(e){
	if (!data.gameOver) {
		if (e.offSetX || e.layerX) {
			mX = e.offSetX == undefined ? e.layerX : e.offSetX;
			mY = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
}