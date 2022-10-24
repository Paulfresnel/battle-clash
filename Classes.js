class ProjectilesRight {
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      this.damage = 1;
    }
    draw(){
      ctx.fillStyle = 'red';
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
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      this.damage = 3;
    }
    draw(){
      ctx.fillStyle = 'black';
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
  }
  
  class blackUnitRight {
      constructor (y){
          this.sX = 0;
          this.sY = 0;
          this.sW = 48;
          this.sH = 48;
          this.x = 0;
          this.y = y;
          this.width = 48;
          this.height = 48;
          this.health = 10,
          this.rangedAttack = 5;
          this.meleeAttack = 2;
          this.runningState = false;
          let image = new Image();
          image.src = "./images/TeamGunner_By_SecretHideout_060519/CHARACTER_SPRITES/Red/Gunner_Red_Crouch.png";
          image.onload = () => {
              this.image = image;
              this.draw();
              }
      }  
      draw() {
        ctx.drawImage(this.image, this.sX, this.sY, this.sW, this.sH, this.x ,this.y, this.width,this.height);
      }
      drawDead(){
        
          //deadImage.onload = () =>{
          //  this.image = deadImage;
          //  this.draw();
          //}
        ctx.drawImage(this.image,288, 0, this.sW, this.sH, this.x ,this.y,this.width,this.height);
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
    constructor (y){
        this.sX = 96;
        this.sY = 0;
        this.sW = 48;
        this.sH = 48;
        this.x = 600-48;
        this.y = y;
        this.width = 48;
        this.height = 48;
        this.health = 10,
        this.speed = 0;
        this.runningState = false;
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
    //drawCrouch(){
    //  ctx.drawImage(this.image,0, 0, this.sW, this.sH, this.x ,this.y,this.width,this.height)
    //}
    moveLeft(){
      this.x  -= 1;
      //if(this.speed >3){
      //  imageLeft.src = './images/TeamGunner_By_SecretHideout_060519/CHARACTER_SPRITES/Black/Gunner_Black_Run.png';
      //  ctx.drawImage(this.image,48, 0, this.sW, this.sH, this.x ,this.y,this.width,this.height)
      //  unitTestLeft.draw()
      //}
      this.draw()
     
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

class tankUnitRight {
    constructor (y){
        this.sX = 128;
        this.sY = 128;
        this.sW = 64;
        this.sH = 64;
        this.x = 0;
        this.y = y;
        this.moves = 1;
        this.width = 64;
        this.height = 64;
        this.health = 20,
        this.rangedAttack = 5;
        this.meleeAttack = 2;
        this.runningState = false;
        let image = new Image();
        image.src = "./images/tank/tank sprite/blue-tank.png";
        image.onload = () => {
            this.image = image;
            this.draw();
            }
    }  
    draw() {
      ctx.drawImage(this.image, this.sX, this.sY, this.sW, this.sH, this.x ,this.y, this.width,this.height);
    }
    drawDead(){
      
        //deadImage.onload = () =>{
        //  this.image = deadImage;
        //  this.draw();
        //}
      ctx.drawImage(this.image,288, 0, this.sW, this.sH, this.x ,this.y,this.width,this.height);
    }
    moveUp(){
      this.y -= 105;
      this.moves -= 1;
      this.draw()
    }
    moveDown(){
      this.y  += 105;
      this.moves -= 1;
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

class tankProjectile {
  constructor(x,y, color){
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 5;
    this.damage = 5;
    this.color = color;
  }
  draw(){
    ctx.fillStyle = this.color;
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

class tankUnitLeft {
  constructor (y){
      this.sX = 0;
      this.sY = 64;
      this.sW = 64;
      this.sH = 64;
      this.x = 600-64;
      this.y = y;
      this.moves = 1;
      this.width = 64;
      this.height = 64;
      this.health = 20,
      this.rangedAttack = 5;
      this.meleeAttack = 2;
      this.runningState = false;
      let image = new Image();
      image.src = "./images/tank/tank sprite/blue-tank.png";
      image.onload = () => {
          this.image = image;
          this.draw();
          }
  }  
  draw() {
    ctx.drawImage(this.image, this.sX, this.sY, this.sW, this.sH, this.x ,this.y, this.width,this.height);
  }
  drawDead(){
    
      //deadImage.onload = () =>{
      //  this.image = deadImage;
      //  this.draw();
      //}
    ctx.drawImage(this.image,288, 0, this.sW, this.sH, this.x ,this.y,this.width,this.height);
  }
  moveUp(){
    this.y -= 105;
    this.moves -= 1;
    this.draw()
  }
  moveDown(){
    this.y  += 105;
    this.moves -= 1;
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