window.onload = function() {
    
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img = new Image();

img.onload = function() { 
    ctx.drawImage(img, 10, 10, img.width, img.height);
};
img.src = "./img/background.png";


}