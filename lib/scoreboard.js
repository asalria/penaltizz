function ScoreBoard(ctx,sprite){
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
    this.x = ctx.canvas.clientWidth - this.sprite.width - 20;
    this.y = 3;
    this.frameCount = 0;
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
          this.ctx.canvas.clientWidth - this.sprite.width*1.5,
          5,
          this.width,
          this.heightFrame
        );
    //   this.ctx.drawImage(
    //   this.sprite, // Image
    //   0,// source x
    //   this.sprite.frameIndex * Math.floor(this.sprite.height / this.sprite.frames) + 1,  // source y: allways 0 for this image
    //   this.sprite.width, // frame width
    //   Math.floor(this.sprite.height / this.sprite.frames), // frame heigth
    //   this.x, // destination x
    //   this.y, // destination y
    //   this.width, // destination frame width
    //   this.heightFrame); // destination frame heigth
  }
  this.sprite.frameIndex += 1;
};

ScoreBoard.prototype.isReady = function() {
    return this.sprite.isReady;
  };

