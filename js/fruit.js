var oFruit = function(){
	this.alive = [];
	this.orange = new Image();
	this.blue = new Image();
	this.x = []; //果实位置x
	this.y = []; //果实位置y
	this.l = []; //果实大小
	this.speed = []; //成长和飘走速度
	this.fruitType = []; //果实类型
	this.aneNum = [];
}
oFruit.prototype.num = 30;
oFruit.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.speed[i] = Math.random() * 0.017 +0.003;
		this.fruitType[i] = "";
		this.aneNum[i] = 0;
	}
	this.orange.src = "./src/fruit.png"
	this.blue.src = "./src/blue.png"
}
oFruit.prototype.draw = function(){

	for (var i = 0; i < this.num; i++) {
		if (this.alive[i] == true) {
			if (this.fruitType[i] == "blue") {
				var pic = this.blue;
			}else{
				var pic = this.orange;
			}	
			if (this.l[i] <= 16) {
				var num = this.aneNum[i];
				this.x[i] = ane.headx[num];
				this.y[i] = ane.heady[num];
				this.l[i] += this.speed[i] * deltaTime;
			}else{
				this.y[i] -= this.speed[i] * 7 * deltaTime;
			}

			ctx2.drawImage(pic,this.x[i] - this.l[i]*0.5,this.y[i] - this.l[i]*0.5,this.l[i],this.l[i]);
		

			if (this.y[i] < 10) {
				this.alive[i] = false;
			}
		}
	}
}
oFruit.prototype.born = function(i){
	this.aneNum[i] = Math.floor(Math.random() * ane.num);
	this.x[i] = ane.headx[this.aneNum[i]];
	this.y[i] = ane.heady[this.aneNum[i]];
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if (ran < 0.2) {
		this.fruitType[i] = "blue";
	}else{
		this.fruitType[i] = "orange";
	}
}
oFruit.prototype.dead = function(i){
	this.alive[i] = false;
}
function fruitMonitor(){
	var num = 0;
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) num++;
	}
	if (num<15) {
		sendFruit();
		return;
	}
}
function sendFruit(){
	for (var i = 0; i < fruit.num; i++) {
		if (!fruit.alive[i]) {
			fruit.born(i);
			return;
		}
	}
}