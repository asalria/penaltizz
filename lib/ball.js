var gravity = 0.1;

function Ball(ctx){
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./img/ball.png";
    var img = this.img;
    this.imwi = 500*0.2*ctx.canvas.clientWidth/2000;
    this.imhe = 480*0.2*ctx.canvas.clientHeight/1000;
    this.x = ctx.canvas.clientWidth/2-this.imwi/2;
    this.y = ctx.canvas.clientHeight-this.imhe;
    var x = this.x;
    var y = this.y;
    var imwi = this.imwi;
    var imhe = this.imhe;
    this.img.onload = function() { 
      ctx.drawImage(img, x, y, imwi, imhe);
    };
    this.speed=50;
    this.stren=50;
    this.finalImW = this.imwi;
    this.finalImH = imhe;
    this.vx = 3;
    this.vy = 2;
}

Ball.prototype.draw = function(){
    
    var x = this.x;
    var y = this.y;
    var img = this.img;
    var imwi = 500*0.2*this.ctx.canvas.clientWidth/2000;
    var imhe = 480*0.2*this.ctx.canvas.clientHeight/1000;
    this.ctx.drawImage(img, x, y, imwi, imhe);

}

Ball.prototype.move = function(distance){
    //pintar infinito hasta que llegue a la posición Y deseada y el X está dentro de la portería
    this.y -= distance;
    this.draw(this.ctx);

}

Ball.prototype.strength = function(key,ctx){

    if( key === 'ArrowUp' && this.speed < 500){
        this.speed -= 5;
        this.stren +=5;
    }
    //Left
    if( key === 'ArrowDown' && this.speed > 0){
        this.speed += 5;
        this.stren -=5;
    }
    
} 

Ball.prototype.speedmeter = function(){
    
    if( this.stren<500 ){
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(3, this.ctx.canvas.clientHeight - 120 , 50, 108);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(3, this.ctx.canvas.clientHeight - 120 , 50, 108-this.stren/5);
    }else{
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(3, this.ctx.canvas.clientHeight - 120 , 50, 108);

    }
}

Ball.prototype.reduce = function(){
    var x = this.x;
    var y = this.y;
    var img = this.img;
    this.finalImH = (this.finalImH - this.stren/1000) > 0 ? (this.finalImH - this.stren/1000) : 0;
    this.finalImW = (this.finalImW - this.stren/1000) > 0 ? (this.finalImW - this.stren/1000) : 0;
    this.ctx.drawImage(img, x+this.stren/1000, y+this.stren/1000, this.finalImW, this.finalImH);
}

Ball.prototype.update = function() {
    this.ctx.clearRect(0,0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
  
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
