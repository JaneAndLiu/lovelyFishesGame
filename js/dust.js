var oDust = function(){
	this.x = [];
	this.y = [];
	this.amp = [];
	this.no = [];
	this.alpha;
}
oDust.prototype.num = 30;
oDust.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * canW;
		this.y[i] = Math.random() * canH;
		this.amp[i] = 20 + Math.random() * 15;
		this.no[i] = Math.floor(Math.random() * 7);
	}
	this.alpha = 0;
};
oDust.prototype.draw = function(){
	this.alpha += deltaTime *0.0008;
	var l = Math.sin(this.alpha);
	for (var i = 0; i < this.num; i++) {
		var num = this.no[i];
		ctx1.drawImage(dustPic[num],this.x[i] + this.amp[i] * l,this.y[i]);
	}
}