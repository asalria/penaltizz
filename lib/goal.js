var inwi = 0;
var inhe = 0;

function Goal(ctx,src){
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = src;
    var img = this.img;
    this.x  = this.ctx.canvas.clientWidth/2.1;
    this.y = this.ctx.canvas.clientHeight/3;
    this.imwi = 400*0.7*this.ctx.canvas.clientWidth/2000;
    this.imhe = 259*0.7*this.ctx.canvas.clientHeight/1000;
    var x = this.x;
    var y = this.y;
    var imwi = this.imwi;
    var imhe = this.imhe;
    this.img.onload = function() { 
      ctx.drawImage(img, x, y, 0, 0);
    };
}

Goal.prototype.draw = function(){

    var x = this.x;
    var y = this.y;
    var img = this.img;
    var imwi = this.imwi;
    var imhe = this.imhe;
    if ( inwi < imwi ){
        inwi += 15;
        inhe += 15;
        this.ctx.drawImage(img, x-inwi/2, y-inhe/1.5, inwi, inhe);
    }
    else{
        inwi = 0;
        inhe = 0;
        clearTimeout(drawGoal);
    }
}