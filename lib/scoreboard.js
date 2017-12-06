function ScoreBoard(ctx,sprite){
    this.goals = 0;
    this.shots = 10;
    this.stops = 0;
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.sprite.isReady = false;
    this.sprite.scale = 1.5;
    this.sprite.onload = (function() {
        this.sprite.isReady = true;
        this.width = this.sprite.width * this.sprite.scale;
        this.height = this.sprite.height * this.sprite.scale;
        this.heightFrame = Math.floor(this.height / this.sprite.frames);
    }).bind(this);
    this.sprite.frames = 55;
    this.sprite.frameIndex = 0;
    this.sprite.frameIndexStops = 0;
    this.x = ctx.canvas.clientWidth - this.sprite.width - 20;
    this.y = 3;
    this.frameCount = 0;
    this.frameCountStops = 0;
    this.ctx = ctx;
}

ScoreBoard.prototype.scoreUpdate = function () {
    if (this.isReady()) {
        this.ctx.drawImage(
            this.sprite, 
            0, 
            this.sprite.frameIndex * Math.floor(this.sprite.height / this.sprite.frames),
            this.sprite.width,
            Math.floor(this.sprite.height / this.sprite.frames),
            this.ctx.canvas.clientWidth - this.sprite.width*1.13,
            10,
            this.width*0.65,
            this.heightFrame*0.65
          );
  };
  this.ctx.font = "30px Arial";
  this.ctx.fillText("G",this.ctx.canvas.clientWidth - this.sprite.width*0.8,this.heightFrame*0.9+2);
  this.sprite.frameIndex += 1;
};

ScoreBoard.prototype.draw = function () {
    if (this.isReady()) {
        this.ctx.drawImage(
            this.sprite, 
            0, 
            this.sprite.frameIndex * Math.floor(this.sprite.height / this.sprite.frames),
            this.sprite.width,
            Math.floor(this.sprite.height / this.sprite.frames),
            this.ctx.canvas.clientWidth - this.sprite.width*1.13,
            10,
            this.width*0.65,
            this.heightFrame*0.65
          );
  };
  this.ctx.font = "30px Arial";
  this.ctx.fillText("G",this.ctx.canvas.clientWidth - this.sprite.width*0.8,this.heightFrame*0.9+2);
}

ScoreBoard.prototype.stopsUpdate = function () {
    if (this.isReady()) {
        this.ctx.drawImage(
            this.sprite, 
            0, 
            this.sprite.frameIndexStops * Math.floor(this.sprite.height / this.sprite.frames),
            this.sprite.width,
            Math.floor(this.sprite.height / this.sprite.frames),
            2,
            10,
            this.width*0.65,
            this.heightFrame*0.65
          );
  };
  this.ctx.fillText("P",this.sprite.width*0.65/2,this.heightFrame*0.9+2);
  this.sprite.frameIndexStops += 1;
};

ScoreBoard.prototype.drawStops = function () {
    if (this.isReady()) {
        this.ctx.drawImage(
            this.sprite, 
            0, 
            this.sprite.frameIndexStops * Math.floor(this.sprite.height / this.sprite.frames),
            this.sprite.width,
            Math.floor(this.sprite.height / this.sprite.frames),
            2,
            10,
            this.width*0.65,
            this.heightFrame*0.65
          );
  };
  this.ctx.fillText("P",this.sprite.width*0.65/2,this.heightFrame*0.9+2);
}

ScoreBoard.prototype.isReady = function() {
    return this.sprite.isReady;
  };

