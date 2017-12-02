var ballshoot = null;
var reduction = null;
var ball = null;
var player = null;
var goalkeeper = null;
var goalCoordinates = [];
var goalkeeperCoord = [];

window.onload = function() {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.95;

    var ctx = canvas.getContext('2d');
    
    
    

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

    init(ctx,bg,goal);

    document.addEventListener('keydown', (event) => {
        var key = event.key;
        if( key === "ArrowRight" || key === "ArrowLeft" ){
            player.move(key,ctx);
            ball.x = player.x;
            clearCanvas(ctx);
            drawField(ctx, bg, goal);
            player.draw(ctx);
            goalkeeper.draw(ctx);
            ball.draw(ctx);
            ball.speedmeter(ctx);
        } else if( key === "ArrowUp" || key === "ArrowDown" ){
            ball.strength(key,ctx);
            clearCanvas(ctx);
            drawField(ctx, bg, goal);
            player.draw(ctx);
            goalkeeper.draw(ctx);
            ball.draw(ctx);
            ball.speedmeter(ctx);
        } else if( key === " "){
            ballshoot = window.setInterval(clearBall, ball.speed,ctx,ball,player,goalkeeper,bg,goal);
        } else if( key === "z" || key === "c" || key === "Z" || key === "C" ){
            goalkeeper.move(key,ctx);
            goalkeeperCoord = [];
            goalkeeperCoord.push(goalkeeper.x);
            goalkeeperCoord.push(goalkeeper.y);
            goalkeeperCoord.push(goalkeeper.x + goalkeeper.width);
            goalkeeperCoord.push(goalkeeper.y + goalkeeper.height);
            clearCanvas(ctx);
            drawField(ctx, bg, goal);
            player.draw(ctx);
            goalkeeper.draw(ctx);
            ball.draw(ctx);
            ball.speedmeter(ctx);
        }

        
    });
}

function drawField(ctx, img, imgGoal){
    ctx.drawImage(img, 10, 10, img.width, img.height,0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    var imwi = imgGoal.width*ctx.canvas.clientWidth/2000;
    var imhe = imgGoal.height*ctx.canvas.clientHeight/1000;
    var imGoPosY = ((ctx.canvas.clientHeight/2)*190)/500;
    goalCoordinates = [];
    goalCoordinates.push(ctx.canvas.clientWidth/2 - (imwi+imwi/6.5)/2);
    goalCoordinates.push(imGoPosY);
    goalCoordinates.push((ctx.canvas.clientWidth + imwi)/2);
    goalCoordinates.push(ctx.canvas.clientHeight/2 + 0.25*goalkeeper.height);
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
    ball.reduce(ctx);
    ball.speedmeter(ctx);
    var imGoPosY = ((ctx.canvas.clientHeight/2)*190)/500;
    var x = ball.x + ball.finalImW-1;
    var y = ball.y + ball.finalImH-1;
    if((((y > goalCoordinates[1] && y < goalCoordinates[3]) && (x > goalCoordinates[0] && x < goalCoordinates[2])) || ((ball.x > goalCoordinates[0] && ball.x < goalCoordinates[2]) && (ball.y > goalCoordinates[1] && ball.y < goalCoordinates[3])))){
        
        //GOALKEEPER
        if((((y > goalkeeperCoord[1]) && (x > goalkeeperCoord[0] && x < goalkeeperCoord[2])) || ((ball.x > goalkeeperCoord[0] && ball.x < goalkeeperCoord[2]) && ball.y > goalkeeperCoord[1]))){
            clearInterval(ballshoot);
            alert("UYYYYYYYYYYY");
            setTimeout(init, 2500, ctx,bg,goal);
        }
        else{
            clearInterval(ballshoot);
            var audio = new Audio('./mp3/gol.mp3');
            audio.play();
          //  alert("GOL");
            setTimeout(init, 2500, ctx,bg,goal);
        }

    }
    
    if(ball.y < (imGoPosY)){
        clearInterval(ballshoot);
        setTimeout(init, 1500, ctx,bg,goal);
    }
}

/*
function reduceBall(ctx,ball,player,goalkeeper,bg,goal){
    clearCanvas(ctx);
    drawField(ctx, bg, goal);
    player.draw(ctx);
    goalkeeper.draw(ctx);
    ball.reduce(ctx);
    ball.speedmeter(ctx);
    if( ball.finalImH === 0 || ball.finalImW === 0 ){
        clearInterval(reduction);
    }
}
*/

function init(ctx,bg,goal){
    player = new Player(ctx);
    goalkeeper = new Goalkeeper(ctx);
    goalkeeperCoord = [];
    goalkeeperCoord.push(goalkeeper.x);
    goalkeeperCoord.push(goalkeeper.y);
    goalkeeperCoord.push(goalkeeper.x + goalkeeper.width);
    goalkeeperCoord.push(goalkeeper.y + goalkeeper.height);
    ball = new Ball(ctx);
    ball.x = player.x;
    clearCanvas(ctx);
    drawField(ctx, bg, goal);
    player.draw(ctx);
    goalkeeper.draw(ctx);
    ball.draw(ctx);
    ball.speedmeter(ctx);
}

function coordXY(x,y){
    var coord = [];
    coord.push(x);
    coord.push(y);

    return coord;
}



