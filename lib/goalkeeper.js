function Goalkeeper(ctx){
    this.ctx = ctx;
    this.goals = 0;
    this.stops = 0;
    this.team;
    this.img = new Image();
    this.img.src = "./img/goalkeeper.png";
    var img = this.img;
    this.imwi = 160*0.7*this.ctx.canvas.clientWidth/2000;
    this.imhe = 425*0.5*this.ctx.canvas.clientHeight/1000;
    this.x = this.ctx.canvas.clientWidth/2-this.imwi*0.75;
    this.y = this.ctx.canvas.clientHeight/2-this.imhe/2.4;
    var x = this.x;
    var y = this.y;
    var imwi = this.imwi;
    var imhe = this.imhe;
    this.img.onload = function() { 
      ctx.drawImage(img, x, y, imwi, imhe);
    };
}

Goalkeeper.prototype.draw = function(){

    var x = this.x;
    var y = this.y;
    var img = this.img;
    var imwi = this.imwi;
    var imhe = this.imhe;
    this.ctx.drawImage(img, x, y, imwi, imhe);
}

Goalkeeper.prototype.move = function(key){
 //Right
    if( ( key === 'c' || key === 'C') && this.x < this.ctx.canvas.clientWidth-5){
        this.x += 5;
    }
    //Left
    if( ( key === 'z' || key === 'Z') && this.x > 5){
        this.x -= 5;
    }
}

Goalkeeper.prototype.jump = function(ctx){
    
}

