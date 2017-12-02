function Ball(ctx){
    this.goals = 0;
    this.stops = 0;
    this.img = new Image();
    this.img.src = "./img/ball.png";
    var img = this.img;
    this.imwi = 500*0.2*ctx.canvas.clientWidth/2000;
    var imhe = 480*0.2*ctx.canvas.clientHeight/1000;
    this.x = ctx.canvas.clientWidth/2-this.imwi/2;
    this.y = ctx.canvas.clientHeight-imhe;
    var x = this.x;
    var y = this.y;
    var imwi = this.imwi;
    this.img.onload = function() { 
        ctx.drawImage(img, x, y, imwi, imhe);
    };
    this.speed=50;
    this.stren=50;
    this.finalImW = this.imwi;
    this.finalImH = imhe;
}

Ball.prototype.draw = function(ctx){
    
    var x = this.x;
    var y = this.y;
    var img = this.img;
    var imwi = 500*0.2*ctx.canvas.clientWidth/2000;
    var imhe = 480*0.2*ctx.canvas.clientHeight/1000;
    ctx.drawImage(img, x, y, imwi, imhe);

}

Ball.prototype.move = function(ctx){
    //pintar infinito hasta que llegue a la posición Y deseada y el X está dentro de la portería
    this.y -= 2;
    this.draw(ctx);

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

Ball.prototype.speedmeter = function(ctx){
    
    if( this.stren<500 ){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(3, ctx.canvas.clientHeight - 120 , 50, 108);
        ctx.fillStyle = 'white';
        ctx.fillRect(3, ctx.canvas.clientHeight - 120 , 50, 108-this.stren/5);
    }else{
        ctx.fillStyle = 'red';
        ctx.fillRect(3, ctx.canvas.clientHeight - 120 , 50, 108);

    }
}

Ball.prototype.reduce = function(ctx){
    var x = this.x;
    var y = this.y;
    var img = this.img;
    debugger;
    this.finalImH -= this.stren;
    this.finalImW -= this.stren;

    ctx.drawImage(img, x, y, this.finalImW, this.finalImH);

}



