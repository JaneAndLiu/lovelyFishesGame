var oAne = function(){
	this.rootx = []; //起始点
	this.headx = []; //结束点x
	this.heady = []; //结束点y
	this.amp = [];
	this.alpha = 0;
}
oAne.prototype.num = 50;
oAne.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.rootx[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canH - 230 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 10;
	}
}
oAne.prototype.draw = function(){
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20 ;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#68228B";
	for (var i = 0; i < this.num; i++) {
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canH);
		this.headx[i] = this.rootx[i] + l * this.amp[i]; 
		ctx2.quadraticCurveTo(this.rootx[i],canH - 80,this.headx[i],this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}