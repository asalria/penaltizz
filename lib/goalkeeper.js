function Goalkeeper(ctx){
    this.goals = 0;
    this.stops = 0;
    var imGoPosY = ((ctx.canvas.clientHeight/2)*190)/500;
    this.x = ctx.canvas.clientWidth/2-25;
    this.y = imGoPosY + 300*ctx.canvas.clientHeight/1000;
    this.width = 150*ctx.canvas.clientWidth/2000;
    this.height = 110*ctx.canvas.clientHeight/1000;
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
var y  = this.y;
ctx.fillStyle = 'yellow';
ctx.fillRect(x, y, this.width, this.height);
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

