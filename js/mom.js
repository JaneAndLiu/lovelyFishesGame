var oMom = function(){
	this.x;
	this.y;
	this.angle;

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	this.momBodyCount = 0;
}
oMom.prototype.init = function(){
	this.x = canW * 0.5;
	this.y = canH * 0.5;
	this.angle = 0;
}
oMom.prototype.draw = function(){
	
	this.x = lerpDistance(mX,this.x,0.97);
	this.y = lerpDistance(mY,this.y,0.97);

	var deltaY = mY - this.y;
	var deltaX = mX - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;
	this.angle = lerpAngle(beta,this.angle,0.6);

	// 尾巴动画
	this.momTailTimer += deltaTime;
	if ( this.momTailTimer > 50 ) {
		this.momTailCount = (this.momTailCount + 1)%8;
		this.momTailTimer %= 50;
	}

	// 眼睛动画
	this.momEyeTimer += deltaTime;
	if ( this.momEyeTimer > this.momEyeInterval ) {
		this.momEyeCount = (this.momEyeCount + 1)%2;
		this.momEyeTimer %= this.momEyeInterval;

		if (this.momEyeCount == 0) {
			this.momEyeInterval = Math.random() * 1500 + 2000;
		}else{
			this.momEyeInterval = 200;
		}
	}

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+28,-momTail[momTailCount].height*0.5);
	var momBodyCount = this.momBodyCount;
	if (data.double == 1) {
		ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width*0.5,-momBodyOrange[momBodyCount].height*0.5);		
	}else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);		
	}
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	ctx1.restore();
}