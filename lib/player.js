function Player(ctx){
    this.shots = 0;
    this.goals = 0;
    this.x = ctx.canvas.clientWidth/2-50*0.85;
    this.team;
    this.ctx = ctx;
}

Player.prototype.draw = function(){

/*
    var img = new Image();
    img.onload = function() { 
    ctx.drawImage(img, 260, -40, img.width, img.height);
};
imgGoal.src = "./img/.png";
*/
var x  = this.x;
ctx.fillStyle = 'red';
ctx.fillRect(x, this.ctx.canvas.clientHeight-120, 50, 113);
}

Player.prototype.move = function(key){
        //Right
        if( key === 'ArrowRight' && this.x < this.ctx.canvas.clientWidth-5){
            this.x += 5;
        }
        //Left
        if( key === 'ArrowLeft' && this.x > 5){
            this.x -= 5;
        }
}

Player.prototype.shoot = function(ctx){
    
}

Player.prototype.changeTeam = function(ctx){
    
}