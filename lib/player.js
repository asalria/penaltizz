function Player(ctx){
    this.shots = 0;
    this.goals = 0;
    this.x = ctx.canvas.clientWidth/2-25;
    this.team;
}

Player.prototype.draw = function(ctx){

/*
    var img = new Image();
    img.onload = function() { 
    ctx.drawImage(img, 260, -40, img.width, img.height);
};
imgGoal.src = "./img/.png";
*/
var x  = this.x;
ctx.fillStyle = 'red';
ctx.fillRect(x, ctx.canvas.clientHeight-120, 50, 113);
}

Player.prototype.move = function(key,ctx){
        //Right
        if( key === 'ArrowRight' && this.x < ctx.canvas.clientWidth-5){
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