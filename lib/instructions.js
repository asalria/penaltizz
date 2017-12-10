function Instruc(ctx){
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./img/ballins.png";
    var imag = this.img;
    this.img.onload = function() { 
     //   ctx.drawImage(imag,ctx.canvas.clientWidth*0.3 , ctx.canvas.clientHeight*0.4, 60, 60);
      };
}

Instruc.prototype.draw = function(){
    var img = new Image();
    img.src = "./img/instrucciones.png";
    img.onload = function() { 
        ctx.drawImage(img,ctx.canvas.clientWidth*0.1, ctx.canvas.clientHeight*0.1, img.width, img.height);
      };
    /*
    var img2 = new Image();
    img2.src = "./img/grass.png";
    img2.onload = function() { 
        ctx.drawImage(img2,ctx.canvas.clientWidth*0.1,ctx.canvas.clientHeight*0.75, img2.width/4.07, img2.height/4);
    };
    */
    this.ctx.fillStyle = 'rgba(0,102,51,0.8)';
    this.ctx.fillRect(this.ctx.canvas.clientWidth*0.1, this.ctx.canvas.clientHeight*0.1, this.ctx.canvas.clientWidth*0.8, this.ctx.canvas.clientHeight*0.8);
    /*
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("INSTRUCCIONES",this.ctx.canvas.clientWidth*0.38,this.ctx.canvas.clientHeight*0.2);
    this.ctx.font = "20px Verdana";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("Mueve al portero con Z y C y al jugador con las flechas izq y derecha",this.ctx.canvas.clientWidth*0.2,this.ctx.canvas.clientHeight*0.35);
    this.ctx.fillText("Dale potencia con la flecha arriba y usa la barra espaciadora para disparar",this.ctx.canvas.clientWidth*0.2,this.ctx.canvas.clientHeight*0.40);    
    this.ctx.fillText("Ganará el que consiga una diferencia de 3 con el rival, o el que tenga",this.ctx.canvas.clientWidth*0.2,this.ctx.canvas.clientHeight*0.45);
    this.ctx.fillText("mayor puntuación después de 10 intentos",this.ctx.canvas.clientWidth*0.2,this.ctx.canvas.clientHeight*0.50);
    this.ctx.font = "25px Verdana";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("¡Qué gane el mejor!",this.ctx.canvas.clientWidth*0.4,this.ctx.canvas.clientHeight*0.7);
    */
}