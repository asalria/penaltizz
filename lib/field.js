var ballshoot = null;
var reduction = null;
var gravityball = null;
var ball = null;
var player = null;
var scoreboard = null;
var goalkeeper = null;
var scoreboardupd = null;
var scoreboardupdstops = null;
var drawGoal = null;
var goalCoordinates = [];
var goalkeeperCoord = [];
var ctx = null;
var goalim = null;
var instru = null;

window.onload = function() {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.95;

    ctx = canvas.getContext('2d');
    var sprite = "./img/digits.png";
    scoreboard = new ScoreBoard(ctx,sprite);
    var bg = new Image();
    bg.src = "./img/background.png";

    var goal = new Image();
    goal.src = "./img/Goal.png";

    goalim = new Goal(ctx);

    instru = new Instruc(ctx);

    bg.onload = function() {
        init(ctx,bg,goal);
        ctx.font = "30px Arial";

        setTimeout(instru.draw,1000);
        setTimeout(init,5000,ctx,bg,goal);
        setTimeout(arrows,5200,ctx);
    }

    
    
  //  getCanvas(canvas);
   // start(canvas);

    document.addEventListener('keydown', (event) => {
        debugger;
        var key = event.key;
        if( key === "ArrowRight" || key === "ArrowLeft" ){
            player.move(key,ctx);
            ball.x = player.x+ball.imwi/2.5;
            clearCanvas(ctx);
            drawField(ctx, bg, goal);
        //    player.draw(ctx);
            goalkeeper.draw();
            ball.draw();
            ball.speedmeter();
            scoreboard.draw();
            scoreboard.drawStops();
        } else if( key === "ArrowUp" || key === "ArrowDown" ){
            ball.strength(key);
            clearCanvas(ctx);
            drawField(ctx, bg, goal);
        //    player.draw(ctx);
            goalkeeper.draw();
            ball.draw();
            ball.speedmeter();
            scoreboard.draw();
            scoreboard.drawStops();
        } else if( key === "Enter"){
            ballshoot = window.setInterval(clearBall, ball.speed,ctx,ball,player,goalkeeper,bg,goal,5);
            setTimeout(win,2000);
        } else if( key === "p"){
            ballshoot = window.setInterval(clearBall, ball.speed,ctx,ball,player,goalkeeper,bg,goal,8);
        } else if( key === "z" || key === "c" || key === "Z" || key === "C" ){
            goalkeeper.move(key);
            goalkeeperCoord = [];
            goalkeeperCoord.push(goalkeeper.x);
            goalkeeperCoord.push(goalkeeper.y);
            goalkeeperCoord.push(goalkeeper.x + goalkeeper.imwi/2);
            goalkeeperCoord.push(goalkeeper.y + goalkeeper.imhe);
            clearCanvas(ctx);
            drawField(ctx, bg, goal);
         //   player.draw(ctx);
            goalkeeper.draw();
            ball.draw();
            ball.speedmeter();
            scoreboard.draw();
            scoreboard.drawStops();
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
    goalCoordinates.push(ctx.canvas.clientHeight/2 + 0.25*goalkeeper.imhe);
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
    //player.draw(ctx);
    goalkeeper.draw(ctx);
    ball.reduce();
    ball.speedmeter();
    scoreboard.draw();
    scoreboard.drawStops();
    var imGoPosY = ((ctx.canvas.clientHeight/2)*190)/500;
    var x = ball.x + ball.finalImW/4-1;
    var y = ball.y + ball.finalImH-1;
    if((((y > goalCoordinates[1] && y < goalCoordinates[3]) && (x > goalCoordinates[0] && x < goalCoordinates[2])) || ((ball.x > goalCoordinates[0] && ball.x < goalCoordinates[2]) && (ball.y > goalCoordinates[1] && ball.y < goalCoordinates[3])))){
        
        //GOALKEEPER
        if((y > goalkeeperCoord[1] && (x > goalkeeperCoord[0] && x < goalkeeperCoord[2]) || ((ball.x > goalkeeperCoord[0] && ball.x < goalkeeperCoord[2]) && ball.y > goalkeeperCoord[1]))){
            clearInterval(ballshoot);
            goalim = new Goal(ctx,'./img/uyy.png');
            drawGoal = setInterval(goalim.draw.bind(goalim),200);
            scoreboardupdstops = setInterval(updateStops,200,ctx,bg,goal);
            scoreboard.stops ++;
        }
        else{
            clearInterval(ballshoot);
            scoreboard.goals ++;
            var audio = new Audio('./mp3/gol.mp3');
            audio.play();
            goalim = new Goal(ctx,'./img/gol.png');
            drawGoal = setInterval(goalim.draw.bind(goalim),200);
        //    loop(ctx);
            scoreboardupd = setInterval(updateScore,200,ctx,bg,goal);
            // gravityball = setInterval(gravity,1000,ctx,bg,goal);
            //  alert("GOL");
            
        }
        
    }
    
    if(ball.y < (imGoPosY)){
        setTimeout(clearInterval, 1500, ballshoot);
        setTimeout(init, 2500, ctx,bg,goal);
        
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
    goalkeeperCoord.push(goalkeeper.x + goalkeeper.imwi/2);
    goalkeeperCoord.push(goalkeeper.y + goalkeeper.imhe);
    ball = new Ball(ctx);
    ball.x = player.x;
    clearCanvas(ctx);
    drawField(ctx, bg, goal);
 //   player.draw(ctx);
    goalkeeper.draw(ctx);
    //ball.draw(ctx);
    ball.speedmeter();
    scoreboard.draw();
    scoreboard.drawStops();
}

function gravity(ctx,bg,goal){
    clearCanvas(ctx);
    drawField(ctx, bg, goal);
    player.draw(ctx);
    goalkeeper.draw(ctx);
    ball.update();
    ball.speedmeter();
    scoreboard.draw();
    scoreboard.drawStops();
}

function updateScore(ctx,bg,goal){
    scoreboard.scoreUpdate(ctx);
    clearCanvas(ctx);
    drawField(ctx, bg, goal);
 //   player.draw(ctx);
    goalkeeper.draw(ctx);
    //ball.draw(ctx);
    ball.speedmeter();
    scoreboard.draw();
    scoreboard.drawStops();
    if(scoreboard.frameCount === 5){
        scoreboard.frameCount = 0;
        clearInterval(scoreboardupd);
        setTimeout(init, 1500, ctx,bg,goal);
    }
    else{
        scoreboard.frameCount++;
        clearCanvas(ctx);
        drawField(ctx, bg, goal);
     //   player.draw(ctx);
        goalkeeper.draw(ctx);
        //ball.draw(ctx);
        ball.speedmeter();
        scoreboard.draw();
        scoreboard.drawStops();
    }
}

function updateStops(ctx,bg,goal){
    scoreboard.stopsUpdate(ctx);
    clearCanvas(ctx);
    drawField(ctx, bg, goal);
 //   player.draw(ctx);
    goalkeeper.draw(ctx);
    //ball.draw(ctx);
    ball.speedmeter();
    scoreboard.draw();
    scoreboard.drawStops();
    if(scoreboard.frameCountStops === 5){
        scoreboard.frameCountStops = 0;
        clearInterval(scoreboardupdstops);
        setTimeout(init, 1500, ctx,bg,goal);
    }
    else{
        scoreboard.frameCountStops++;
    }
}

function win(){
    scoreboard.shots --;
    if(scoreboard.shots === 0){
        alert("YOU LOOSE");
        scoreboard.sprite.frameIndex = 0;
        scoreboard.draw();
        scoreboard.sprite.frameIndexStops = 0;
        scoreboard.drawStops();
        
    }
    else if (scoreboard.goals - scoreboard.stops === 3){
        alert("YOU WIN");
        scoreboard.sprite.frameIndex = 0;
        scoreboard.draw();
        scoreboard.sprite.frameIndexStops = 0;
        scoreboard.drawStops();
    }
}

function arrows(ctx){
    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
    ctx.fillText(">",ctx.canvas.clientWidth/2 + 20,ctx.canvas.clientHeight-10);
    ctx.fillText("<",ctx.canvas.clientWidth/2 - 65,ctx.canvas.clientHeight-10);

    ctx.fillText(">",ctx.canvas.clientWidth/2 + 20,ctx.canvas.clientHeight/2-10);
    ctx.fillText("<",ctx.canvas.clientWidth/2 - 65,ctx.canvas.clientHeight/2-10);
}


