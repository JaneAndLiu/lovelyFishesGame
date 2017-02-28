var oData = function(){
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}
oData.prototype.reset = function(){
	this.fruitNum = 0;
	this.double = 1;	
}
oData.prototype.draw = function(){
	var w = can1.width;
	var h = can1.height;
	
	ctx1.save();
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "#fff";
	ctx1.fillStyle = "#fff";
	ctx1.fillText("SCORE " + this.score,w*0.5,25);

	if (this.gameOver) {
		this.alpha += deltaTime * 0.0005;
		if (this.alpha > 1) {
			this.alpha = 1;
		}
		ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
		ctx1.fillText("GAME OVER",w*0.5,h*0.5);
	}
	ctx1.restore();
}
oData.prototype.addScore = function(){
	this.score += this.fruitNum * 100 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}