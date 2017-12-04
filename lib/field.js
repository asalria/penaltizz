var ballshoot = null;
var reduction = null;
var gravityball = null;
var ball = null;
var player = null;
var scoreboard = null;
var goalkeeper = null;
var scoreboardupd = null;
var goalCoordinates = [];
var goalkeeperCoord = [];

window.onload = function() {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.95;

    var ctx = canvas.getContext('2d');
    var sprite = "./img/digits.png";
    scoreboard = new ScoreBoard(ctx,sprite);
    var bg = new Image();
    bg.src = "./img/background.png";

    var goal = new Image();
    goal.src = "./img/Goal.png";

    bg.onload = function() {
        init(ctx,bg,goal);
    }

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
            ballshoot = window.setInterval(clearBall, ball.speed,ctx,ball,player,goalkeeper,bg,goal,5);
        } else if( key === "p"){
            ballshoot = window.setInterval(clearBall, ball.speed,ctx,ball,player,goalkeeper,bg,goal,8);
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

function clearBall(ctx,ball,player,goalkeeper,bg,goal,distance){
    if(ball.y<100){
        ball.move(distance);
    }
    else ball.move(distance/2);
    
    clearCanvas(ctx);
    drawField(ctx, bg, goal);
    player.draw(ctx);
    goalkeeper.draw(ctx);
    ball.reduce();
    ball.speedmeter();
    var imGoPosY = ((ctx.canvas.clientHeight/2)*190)/500;
    var x = ball.x + ball.finalImW-1;
    var y = ball.y + ball.finalImH-1;
    if((((y > goalCoordinates[1] && y < goalCoordinates[3]) && (x > goalCoordinates[0] && x < goalCoordinates[2])) || ((ball.x > goalCoordinates[0] && ball.x < goalCoordinates[2]) && (ball.y > goalCoordinates[1] && ball.y < goalCoordinates[3])))){
        
        //GOALKEEPER
        if((y > goalkeeperCoord[1] && (x > goalkeeperCoord[0] && x < goalkeeperCoord[2]) || ((ball.x > goalkeeperCoord[0] && ball.x < goalkeeperCoord[2]) && ball.y > goalkeeperCoord[1]))){
            clearInterval(ballshoot);
            console.log(ball.y);
            alert("UYYYYYYYYYYY");
            console.log(ball.y);
            setTimeout(init, 1500, ctx,bg,goal);
        }
        else{
            clearInterval(ballshoot);
            var audio = new Audio('./mp3/gol.mp3');
            audio.play();
            scoreboardupd = setInterval(updateScore,200,ctx,bg,goal);
            // gravityball = setInterval(gravity,1000,ctx,bg,goal);
            //  alert("GOL");
            
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

//Initial state player, goalkeeper and ball
function init(ctx,bg,goal){
    clearTimeout(gravityball);
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
    //ball.draw(ctx);
    ball.speedmeter();
}

function gravity(ctx,bg,goal){
    clearCanvas(ctx);
    drawField(ctx, bg, goal);
    player.draw(ctx);
    goalkeeper.draw(ctx);
    ball.update();
    ball.speedmeter();
}

function updateScore(ctx,bg,goal){
    scoreboard.scoreUpdate(ctx);
    if(scoreboard.frameCount === 5){
        scoreboard.frameCount = 0;
        clearInterval(scoreboardupd);
        setTimeout(init, 1500, ctx,bg,goal);
    }
    else{
        scoreboard.frameCount++;
    }
}



