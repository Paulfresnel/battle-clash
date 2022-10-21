let ctx = canvas.getContext('2d');
let canvas = document.getElementsByTagName('canvas')[0];

window.onload = function () {
    let width = 600;
    let height = 600;
    canvas.width = width;
    canvas.height = height;
    unitTest.draw();
  };


class blackUnit {
    constructor (sX, sY, sW, sH, x, y, width, height){
        this.sX = sX;
        this.sY = sY;
        this.sW = sW;
        this.sH = sH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        const image = new Image();
        image.src = "./images/bluechips/btc logo small size.svg";
        image.onload = () => {
            this.img = image;
            this.draw();
            }
    }  
    draw() {
      //context.translate(x + image.width / 2, y + image.height / 2);
      //context.rotate(degrees * Math.PI / 180);
      ctx.drawImage(this.image, this.sX, this.sY , this.sW,  this.sH,this.x ,this.y,this.width,this.height);
      //context.rotate(-degrees * Math.PI / 180);
      //context.translate(-x - image.width / 2, -y - image.height / 2);
    }
}

const unitTest = new blackUnit(0,0,48,48,0,0,48,48);
