window.onload = function() {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.95;

    var ctx = canvas.getContext('2d');

    var player = new Player(ctx);
    var goalkeeper = new Goalkeeper(ctx);

    var bg = new Image();
    bg.src = "./img/background.png";

    var goal = new Image();
    goal.src = "./img/Goal.png";

    bg.onload = function() {
        drawField(ctx, bg, goal);
        player.draw(ctx);
        goalkeeper.draw(ctx);
    }

    document.addEventListener('keydown', (event) => {
        var key = event.key;
        
        if( key === "ArrowRight" || key === "ArrowLeft" ){
            player.move(key,ctx);
        } else if( key === "ArrowUp" || key === "ArrowDown" ){
            player.strength(key,ctx); 
        } else if( key === "z" || key === "c" || key === "Z" || key === "C" ){
            goalkeeper.move(key,ctx);
        }

        clearCanvas(ctx);
        drawField(ctx, bg, goal);
        player.draw(ctx);
        goalkeeper.draw(ctx);
    });
}

function drawField(ctx, img, imgGoal){
    ctx.drawImage(img, 10, 10, img.width, img.height,0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    ctx.drawImage(imgGoal, 300, 90, imgGoal.width*0.7, imgGoal.height*0.7);
}

function clearCanvas(ctx){
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}
