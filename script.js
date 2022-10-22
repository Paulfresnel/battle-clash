
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function targetting(e){
  const target = e.target;
  console.log(target);
}

window.addEventListener('keydown', (e)=>{
  if(e.keyCode === 38){
    ctx.clearRect(0,0,600,600);
      unitTestLeft.moveUp();
      unitTestRight.moveUp();
  } else if (e.keyCode === 40){
    ctx.clearRect(0,0,600,600);
      unitTestLeft.moveDown();
      unitTestRight.moveDown();
  } else if (e.keyCode === 37){
    unitTestLeft.moveLeft();
}
})

window.onload = function () {
  window.addEventListener('click', targetting);
    let width = 600;
    let height = 600;
    canvas.width = width;
    canvas.height = height;
    projectileTestRight.draw();
    unitTestLeft.draw();
    unitTestRight.draw();
    gameOnGoing();
  };


const myGameArea = {
  frames:0,

}

let gameInterval;

function gameOnGoing(){
  gameInterval = setInterval(renderGame,20);
}

function renderGame(){
  ctx.clearRect(0,0,600,600);
  unitTestRight.shoot();
  myGameArea.frames +=1;
  if (myGameArea.frames % 15 ===0){
    ctx.clearRect(0,0,600,600);
    unitTestLeft.moveLeft();
    unitTestRight.moveRight();
    projectileTestRight.moveRight();
    
  }
}

const projectilesArrayRight = [];

class Projectiles {
  constructor(){
    this.x = unitTestRight.x + 50;
    this.y = 24;
    this.width = 10;
    this.height = 3;
  }
  draw(){
    console.log(this.x);
    ctx.fillRect(this.x ,this.y, this.width,this.height);
  }
  moveRight(){
    this.x += 5;
    this.draw();
}
}

class blackUnitRight {
    constructor (){
        this.sX = 0;
        this.sY = 0;
        this.sW = 48;
        this.sH = 48;
        this.x = 0;
        this.y = 0;
        this.width = 48;
        this.height = 48;
        const image = new Image();
        image.src = "./images/TeamGunner_By_SecretHideout_060519/CHARACTER_SPRITES/Black/Gunner_Black_Crouch.png";
        image.onload = () => {
            this.image = image;
            this.draw();
            }
    }  
    draw() {
      ctx.drawImage(this.image, this.sX, this.sY, this.sW, this.sH, this.x ,this.y, this.width,this.height);
    }
    drawCrouch(){
      ctx.drawImage(this.image,96, 0, this.sW, this.sH, this.x ,this.y,this.width,this.height)
    }
    moveUp(){
      this.y -= 5;
      this.draw()
    }
    moveDown(){
      this.y  += 5;
      this.drawCrouch();
    }
    moveRight(){
      this.x += 5;
      this.draw();
    }
    }

class blackUnitLeft {
  constructor (sX,sY){
      this.sX = sX;
      this.sY = sY;
      this.sW = 48;
      this.sH = 48;
      this.x = 600-48;
      this.y = 0;
      this.width = 48;
      this.height = 48;
      const imageLeft = new Image();
      imageLeft.src = "./images/TeamGunner_By_SecretHideout_060519/CHARACTER_SPRITES/Black/Gunner_Black_Crouch_-_reversed-removebg.png";
      imageLeft.onload = () => {
          this.image = imageLeft;
          this.draw();
          //ctx.drawImage(imageLeft,96,0,48,48,x,y,width,height);
          }
  }  
  draw() {
    ctx.drawImage(this.image, this.sX, this.sY, this.sW, this.sH, this.x ,this.y, this.width,this.height);

  }
  drawCrouch(){
    ctx.drawImage(this.image,0, 0, this.sW, this.sH, this.x ,this.y,this.width,this.height)
  }
  moveUp(){
    console.log('is it')
    this.y -= 5;
    unitTestLeft.draw()
  }
  moveDown(){
    this.y  += 5;
    this.drawCrouch();
  }
  moveLeft(){
    this.x  -= 5;
    unitTestLeft.draw()
   
  }
}

const unitTestRight = new blackUnitRight();

const unitTestLeft = new blackUnitLeft(96,0);

const projectileTestRight = new Projectiles();
