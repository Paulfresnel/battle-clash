
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let gameInterval, shooterRightInterval;
const rightCharBullets = [];
const rightCharSoldiers = [];
const lefttCharSoldiers = [];
const leftCharBullets = [];

const myGameArea = {
  frames:0,

}

const playerA = {
  energy: 0,
  lifes: 30,

}

const playerB = {
  energy: 0,
  lifes: 30,
  
}



function targetting(e){
  const target = e.target;
  console.log(target);
}

//window.addEventListener('keydown', (e)=>{
//  if(e.keyCode === 38){
//    ctx.clearRect(0,0,600,600);
//      unitTestLeft.moveUp();
//      unitTestRight.moveUp();
//  } else if (e.keyCode === 40){
//    ctx.clearRect(0,0,600,600);
//      unitTestLeft.moveDown();
//      unitTestRight.moveDown();
//  } else if (e.keyCode === 37){
//    unitTestLeft.moveLeft();
//}
//})

window.onload = function () {
  window.addEventListener('click', targetting);
    let width = 600;
    let height = 600;
    canvas.width = width;
    canvas.height = height;
    unitTestLeft.draw();
    if (rightCharSoldiers.length>0){ 
      rightCharSoldiers[0].draw();
    }
    gameOnGoing();
  };

function gameOnGoing(){
  gameInterval = setInterval(renderGame,20);
}

function renderGame(){
    myGameArea.frames +=1;
    ctx.clearRect(0,0,600,600);
    unitTestLeft.moveLeft();
    updateSoldiersRight();
    updateBullets();
    rightCharacterBulletsCollision();
    checkIfDead();
    
}



class ProjectilesRight {
  constructor(){
    this.x = rightCharSoldiers[0].x + 48;
    this.y = 22;
    this.width = 10;
    this.height = 3;
    this.damage = 5;
  }
  draw(){
    ctx.fillRect(this.x ,this.y, this.width,this.height);
  }
  left(){
    return this.x;
  } right(){
    return this.x + this.width;
  } bottom(){
    return this.y + this.height;
  } top(){
    return this.y;
  }
//  moveRight(){
//    this.x += 20;
//    this.draw();
//}
}

class ProjectilesLeft {
  constructor(){
    this.x = rightCharSoldiers[0].x + 48;
    this.y = 22;
    this.width = 10;
    this.height = 3;
    this.damage = 5;
  }
  draw(){
    ctx.fillRect(this.x ,this.y, this.width,this.height);
  }
  left(){
    return this.x;
  } right(){
    return this.x + this.width;
  } bottom(){
    return this.y + this.height;
  } top(){
    return this.y;
  }
//  moveRight(){
//    this.x += 20;
//    this.draw();
//}
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
        this.health = 10,
        this.rangedAttack = 5;
        this.meleeAttack = 2;
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
      this.x += 1;
      this.draw();
    }
    left(){
      return this.x;
    } right(){
      return this.x + this.width;
    } bottom(){
      return this.y + this.height;
    } top(){
      return this.y;
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
      this.health = 10,
      this.speed = 0;
      this.state = false;
        this.rangedAttack = 5;
        this.meleeAttack = 2;
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
    //if (state === running);

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
    this.x  -= 1;
    //if(this.speed >3){
    //  imageLeft.src = './images/TeamGunner_By_SecretHideout_060519/CHARACTER_SPRITES/Black/Gunner_Black_Run.png';
    //  ctx.drawImage(this.image,48, 0, this.sW, this.sH, this.x ,this.y,this.width,this.height)
    //  unitTestLeft.draw()
    //}
    unitTestLeft.draw()
   
  }
  left(){
    return this.x +10;
  } right(){
    return this.x + this.width;
  } bottom(){
    return this.y + this.height;
  } top(){
    return this.y;
  }
}

const unitTestRight = rightCharSoldiers[0];
const unitTestLeft = new blackUnitLeft(96,0);


function updateSoldiersRight(){
  for (i = 0; i <  rightCharSoldiers.length; i++) {
    if (myGameArea.frames % 1 === 0){
      rightCharSoldiers[i].x += 0.5;
      rightCharSoldiers[i].draw();
     // ctx.clearRect(rightCharBullets[i].x,rightCharBullets[i].y,rightCharBullets[i].width,rightCharBullets[i].height);
      }// if (myGameArea.frames % 100 === 0){
      //  rightCharBullets[i].x += -3;
      //  rightCharBullets[i].draw();
      //}
  }
  if (myGameArea.frames % 1 === 0 && rightCharSoldiers.length < 1) { // every 3s
    rightCharSoldiers.push(new blackUnitRight());//
  }
}

function updateBullets(){
    for (i = 0; i <  rightCharBullets.length; i++) {
      if (myGameArea.frames % 1 === 0 ){
        rightCharBullets[i].x += 5;
        rightCharBullets[i].draw();
       // ctx.clearRect(rightCharBullets[i].x,rightCharBullets[i].y,rightCharBullets[i].width,rightCharBullets[i].height);
      }
      
    }if (myGameArea.frames % 100 === 0) {
        console.log('working?') // every 3s
        rightCharBullets.push(new ProjectilesRight());//
      }
    
}

function rightCharacterBulletsCollision() {
  // check if one obstacle has had a collision with player
  if (rightCharBullets.length > 0){
  for(i=0;i<rightCharBullets.length;i++){
      if (rightCharBullets[i].right() >= unitTestLeft.left()) {
        alert('lost');
        unitTestLeft.health -= rightCharBullets[i].damage;
        rightCharBullets.splice(i,1); 
        console.log(unitTestLeft.health)
        //let points = rightCharBullets[i].points;
        //  unitTestLeft.balance += points; // remove the Points from player’s Balance
        //  rightCharBullets.splice(i,1); //remove obstacle from obstacle array
          
  }
      }
  }
  }

function checkIfDead(){
  if(unitTestLeft.health <= 0 ){
    alert('player is dead');
  }
}