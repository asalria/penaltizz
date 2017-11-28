function Goalkeeper(ctx){
    this.goals = 0;
    this.stops = 0;
    this.x = ctx.canvas.clientWidth/2-25;
    this.team;
}

Goalkeeper.prototype.draw = function(ctx){

/*
    var img = new Image();
    img.onload = function() { 
    ctx.drawImage(img, 260, -40, img.width, img.height);
};
imgGoal.src = "./img/.png";
*/
var x = this.x;
ctx.fillStyle = 'yellow';
ctx.fillRect(x, 280, 50, 110);
}

Goalkeeper.prototype.move = function(key,ctx){
 //Right
    if( ( key === 'c' || key === 'C') && this.x < ctx.canvas.clientWidth-5){
        this.x += 5;
    }
    //Left
    if( ( key === 'z' || key === 'Z') && this.x > 5){
        this.x -= 5;
    }
}

Goalkeeper.prototype.jump = function(ctx){
    
}

