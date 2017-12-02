var ballshoot = null;

window.onload = function() {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.95;

    var ctx = canvas.getContext('2d');

    var player = new Player(ctx);
    var goalkeeper = new Goalkeeper(ctx);
    var ball = new Ball(ctx);

    var bg = new Image();
    bg.src = "./img/background.png";

    var goal = new Image();
    goal.src = "./img/Goal.png";

    bg.onload = function() {
        drawField(ctx, bg, goal);
        player.draw(ctx);
        goalkeeper.draw(ctx);
        ball.draw(ctx);
        ball.speedmeter(ctx);
    }

    document.addEventListener('keydown', (event) => {
        var key = event.key;
        if( key === "ArrowRight" || key === "ArrowLeft" ){
            player.move(key,ctx);
            ball.x = player.x;
        } else if( key === "ArrowUp" || key === "ArrowDown" ){
            ball.strength(key,ctx);
        } else if( key === " "){
            ballshoot = window.setInterval(clearBall, ball.speed,ctx,ball,player,goalkeeper,bg,goal);
        } else if( key === "z" || key === "c" || key === "Z" || key === "C" ){
            goalkeeper.move(key,ctx);
        } else if( key === "z" || key === "c" || key === "Z" || key === "C" ){
            goalkeeper.move(key,ctx);
        }

        clearCanvas(ctx);
        drawField(ctx, bg, goal);
        player.draw(ctx);
        goalkeeper.draw(ctx);
        ball.draw(ctx);
        ball.speedmeter(ctx);
    });
}

function drawField(ctx, img, imgGoal){
    ctx.drawImage(img, 10, 10, img.width, img.height,0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    var imwi = imgGoal.width*ctx.canvas.clientWidth/2000;
    var imhe = imgGoal.height*ctx.canvas.clientHeight/1000;
    var imGoPosY = ((ctx.canvas.clientHeight/2)*190)/500;
    ctx.drawImage(imgGoal, ctx.canvas.clientWidth/2 - (imwi+imwi/6.5)/2, imGoPosY, imwi, imhe);
}

function clearCanvas(ctx){
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

function clearBall(ctx,ball,player,goalkeeper,bg,goal){
    ball.move(ctx);
    clearCanvas(ctx);
    drawField(ctx, bg, goal);
    player.draw(ctx);
    goalkeeper.draw(ctx);
    ball.draw(ctx);
    ball.speedmeter(ctx);
    var imGoPosY = ((ctx.canvas.clientHeight/2)*190)/500;
    if(ball.y < (imGoPosY)){
        clearInterval(ballshoot);
        setInterval(ball.reduce,100,ctx);
    }
}



