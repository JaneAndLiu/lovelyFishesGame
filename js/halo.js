var oHalo = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
};
oHalo.prototype.num = 5;
oHalo.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.r[i] = 0;
	}
}
oHalo.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 3;
	ctx1.shadowBlur = 8;
	ctx1.shadowColor = "#fff";
	for (var i = 0; i < this.num; i++) {
		if(this.alive[i]) {
			this.r[i] += deltaTime * 0.04;
			if (this.r[i] > 40) {
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i]/40;

			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255,99,71,"+ alpha +")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}
oHalo.prototype.born = function(x,y){
	for (var i = 0; i < this.num; i++) {
		if (!this.alive[i]) {
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}
	}	
}