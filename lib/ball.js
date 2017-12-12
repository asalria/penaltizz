var gravity = 0.1;

function Ball(ctx){
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./img/ball.png";
    var img = this.img;
    this.imwi = 250*0.2*ctx.canvas.clientWidth/2000;
    this.imhe = 240*0.2*ctx.canvas.clientHeight/1000;
    this.x = ctx.canvas.clientWidth/2-this.imwi;
    this.y = ctx.canvas.clientHeight-this.imhe;
    var x = this.x;
    var y = this.y;
    var imwi = this.imwi;
    var imhe = this.imhe;
    this.img.onload = function() { 
      ctx.drawImage(img, x, y, imwi, imhe);
    };
    this.speed=60;
    this.stren=60;
    this.finalImW = this.imwi;
    this.finalImH = imhe;
    this.vx = 3;
    this.vy = 2;
}

Ball.prototype.draw = function(){
    
    var x = this.x;
    var y = this.y;
    var img = this.img;
    var imwi = 250*0.2*this.ctx.canvas.clientWidth/2000;
    var imhe = 240*0.2*this.ctx.canvas.clientHeight/1000;
    this.ctx.drawImage(img, x, y, imwi, imhe);

}

Ball.prototype.move = function(distance){
    //pintar infinito hasta que llegue a la posición Y deseada y el X está dentro de la portería
    this.y -= distance;
    this.draw(this.ctx);

}

Ball.prototype.strength = function(key){

    if( key === 'ArrowUp' && this.speed < 500){
        this.speed -= 2;
        this.stren +=5;
    }
    //Left
    if( key === 'ArrowDown' && this.speed > 0){
        this.speed += 2;
        this.stren -=5;
    }
    
} 

Ball.prototype.speedmeter = function(){
    
    if( this.stren<500 ){
        this.ctx.fillStyle = 'yellow';
        //this.ctx.fillRect(3, this.ctx.canvas.clientHeight - 120 , 50, 108);
        this.ctx.strokeStyle = "rgb(242, 250, 13)";
        this.ctx.fillStyle = "rgba(242, 250, 13, .5)";
        roundRect(ctx, 10, this.ctx.canvas.clientHeight - 120 , 30, 108, 9,true);
        //this.ctx.fillStyle = 'white';
        //this.ctx.fillRect(3, this.ctx.canvas.clientHeight - 120 , 50, 108-this.stren/5);
        this.ctx.strokeStyle = "rgb(242, 250, 13)";
        this.ctx.fillStyle = "rgba(255, 255, 255, .85)";
        roundRect(ctx, 10, this.ctx.canvas.clientHeight - 120, 30, 108-this.stren/5, {
            tl: 9,
            tr: 9
          }, true);
    }else{
        this.ctx.fillStyle = 'red';
        //this.ctx.fillRect(3, this.ctx.canvas.clientHeight - 120 , 50, 108);
        this.ctx.strokeStyle = "rgb(243, 12, 43)";
        this.ctx.fillStyle = "rgba(243, 12, 43, .5)";
        roundRect(ctx, 10, this.ctx.canvas.clientHeight - 120 , 30, 108, 9,true);
    }
}

Ball.prototype.reduce = function(){
    var x = this.x;
    var y = this.y;
    var img = this.img;
    this.finalImH = (this.finalImH - this.stren/680) > 0 ? (this.finalImH - this.stren/680) : 0;
    this.finalImW = (this.finalImW - this.stren/680) > 0 ? (this.finalImW - this.stren/680) : 0;
    this.ctx.drawImage(img, x+this.stren/680, y+this.stren/680, this.finalImW, this.finalImH);
}

Ball.prototype.update = function() {
  //  this.ctx.clearRect(0,0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
    roundRect(ctx, 3, this.ctx.canvas.clientHeight - 120 , 50, 108, 3);
    this.draw();
  
    // update speed!
    
    this.x += this.vx;
    
    // Apply gravity
    this.vy += gravity;
    this.y += this.vy;
    
    
    if ((this.y + this.radius) > canvas.height || (this.y - this.radius) < 0) {
      this.vy *= -1
    }
    
    if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
      this.vx *= -1
    }


}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
}
