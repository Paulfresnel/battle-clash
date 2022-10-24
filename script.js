function targetting(e){
  let id = e.target.id;
  const target = e.target;
  if (id === 'card1'){
    spawnSoldiersRight();
  }
  if (id === 'card2'){
    spawnTankRight();
  }
  if( id === 'card3'){
    spawnSoldiersLeft();
  }
  if (id === 'card4'){
    spawnTankLeft();
  }
  console.log(id);
  
}

function timerEnergy(){
    if (myGameArea.frames % 80 === 0){
      counter +=1;
      if (playerA.energy>=10){
        playerA.energy +=0;
      }
      if (playerA.energy < 10){
      playerA.energy +=1;
      }
      if (playerB.energy>=10){
        playerB.energy +=0;
      }
      if (playerB.energy < 10){
        playerB.energy +=1;
        }
    }
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
    let height = 500;
    canvas.width = width;
    canvas.height = height;
   // if (rightCharSoldiers.length>0){ 
   //   rightCharSoldiers[0].draw();
   // }
   // if (leftCharSoldiers.length>0){ 
   //   leftCharSoldiers[0].draw();
   // }
    gameOnGoing();
  };

function gameOnGoing(){
  gameInterval = setInterval(renderGame,20);
}

function renderGame(){
    ctx.clearRect(0,0,600,600);
    myGameArea.frames +=1;
    if (rightTankUnits.length !== 0){
    updateTanksRight();
  } if (leftTankUnits.length !== 0){
    updateTanksLeft();
  }
  if (leftCharSoldiers.length !== 0){
    updateSoldiersLeft();
  }
  if (rightTankUnits.length !== 0){
    updateTankProjectilesRight();
  }  if (leftTankUnits.length !== 0){
    updateTankProjectilesLeft();
  }
    updateBulletsLeft();
    updateBulletsRight();
    spawnCollision();
    CharacterBulletsCollisionRight();
    CharacterBulletsCollisionLeft();
  if (rightCharSoldiers.length !== 0){
    updateSoldiersRight();
  }
    Score();
    spawnPoints();
    timerEnergy();
    ctx.fillText(`Timer: ${counter}s`,250,120);
    
}



function updateSoldiersRight(){
  for (i = 0; i <  rightCharSoldiers.length; i++) {
    if (myGameArea.frames % 1 === 0){
      rightCharSoldiers[i].x += 1;
      rightCharSoldiers[i].draw();
     // ctx.clearRect(rightCharBullets[i].x,rightCharBullets[i].y,rightCharBullets[i].width,rightCharBullets[i].height);
      }// if (myGameArea.frames % 100 === 0){
      //  rightCharBullets[i].x += -3;
      //  rightCharBullets[i].draw();
      //}
  }
}

function updateSoldiersLeft(){
  for (i = 0; i <  leftCharSoldiers.length; i++) {
    if (myGameArea.frames % 1 === 0){
      leftCharSoldiers[i].x -= 1;
      leftCharSoldiers[i].draw();
     // ctx.clearRect(rightCharBullets[i].x,rightCharBullets[i].y,rightCharBullets[i].width,rightCharBullets[i].height);
      }// if (myGameArea.frames % 100 === 0){
      //  rightCharBullets[i].x += -3;
      //  rightCharBullets[i].draw();
      //}
  }
}


function updateBulletsRight(){
  if(leftCharSoldiers.length !==0 || leftTankUnits.length !==0){
  let randomizer = Math.ceil(Math.random()*500);
    for (i = 0; i <  rightCharBullets.length; i++) {
      if (myGameArea.frames % 1 === 0 ){
        rightCharBullets[i].x += 5;
        rightCharBullets[i].draw();
      }
      
    } for (i=0;i<rightCharSoldiers.length;i++){
    if (myGameArea.frames % 10 === 0 && randomizer>=300){
        let x = rightCharSoldiers[i].x +48;
        let y = rightCharSoldiers[i].y +22;
        console.log('working?') // every 3s
        rightCharBullets.push(new ProjectilesRight(x,y));//
      }
    }
  }    
}

function updateBulletsLeft(){
  if(rightTankUnits.length !==0 || rightCharSoldiers.length !==0){
    let randomizer = Math.ceil(Math.random()*500);
  for (i = 0; i <  leftCharBullets.length; i++) {
    
      if (myGameArea.frames % 1 === 0 ){
        leftCharBullets[i].x -= 5;
        leftCharBullets[i].draw();
      }
      
    } for (i=0;i<leftCharSoldiers.length;i++){
    if (myGameArea.frames % 50 === 0 && randomizer <350) {
      let x = leftCharSoldiers[i].x;
      let y = leftCharSoldiers[i].y +22;
        leftCharBullets.push(new ProjectilesLeft(x,y));//
      }
    }
  }
}

function CharacterBulletsCollisionRight() {
  if (rightCharBullets.length !== 0){
  for(i=0;i<rightCharBullets.length;i++){
    for (j=0;j<leftCharSoldiers.length;j++){
        if (!(leftCharSoldiers[j].right() <= rightCharBullets[i].left()) && !(leftCharSoldiers[j].left() >= rightCharBullets[i].right()) && !(leftCharSoldiers[j].top() >= rightCharBullets[i].bottom()) && !(leftCharSoldiers[j].bottom() <= rightCharBullets[i].top())) { // if there’s a collision
        leftCharSoldiers[j].health -= rightCharBullets[i].damage;
        if (leftCharSoldiers[j].health<=0){
          leftCharSoldiers.splice(j,1);
          rightCharBullets.splice(i,1);
          playerA.points += 1;
          playerB.lifes -= 1;
        }
        rightCharBullets.splice(i,1);          
  }
      }
      for (j=0;j<leftTankUnits.length;j++){
        if (!(leftTankUnits[j].right() <= rightCharBullets[i].left()) && !(leftTankUnits[j].left() >= rightCharBullets[i].right()) && !(leftTankUnits[j].top() >= rightCharBullets[i].bottom()) && !(leftTankUnits[j].bottom() <= rightCharBullets[i].top())) { // if there’s a collision
        leftTankUnits[j].health -= rightCharBullets[i].damage;
        if (leftTankUnits[j].health<=0){
          leftTankUnits.splice(j,1);
          rightCharBullets.splice(i,1);
          playerA.points += 1;
          playerB.lifes -= 1;
        }
        rightCharBullets.splice(i,1);          
  }
      
    }
  }
  }
  if (rightTankProjectiles.length !== 0){
    for(i=0;i<rightTankProjectiles.length;i++){
      for (j=0;j<leftCharSoldiers.length;j++){
          if (!(leftCharSoldiers[j].right() <= rightTankProjectiles[i].left()) && !(leftCharSoldiers[j].left() >= rightTankProjectiles[i].right()) && !(leftCharSoldiers[j].top() >= rightTankProjectiles[i].bottom()) && !(leftCharSoldiers[j].bottom() <= rightTankProjectiles[i].top())) { // if there’s a collision
          leftCharSoldiers[j].health -= rightTankProjectiles[i].damage;
          if (leftCharSoldiers[j].health<=0){
            leftCharSoldiers.splice(j,1);
            rightTankProjectiles.splice(i,1);
            playerA.points += 1;
            playerB.lifes -= 1;
          }
          rightTankProjectiles.splice(i,1);          
    }
        }
        for (j=0;j<leftTankUnits.length;j++){
          if (!(leftTankUnits[j].right() <= rightTankProjectiles[i].left()) && !(leftTankUnits[j].left() >= rightTankProjectiles[i].right()) && !(leftTankUnits[j].top() >= rightTankProjectiles[i].bottom()) && !(leftTankUnits[j].bottom() <= rightTankProjectiles[i].top())) { // if there’s a collision
          leftTankUnits[j].health -= rightTankProjectiles[i].damage;
          if (leftTankUnits[j].health<=0){
            leftTankUnits.splice(j,1);
            rightTankProjectiles.splice(i,1);
            playerA.points += 1;
            playerB.lifes -= 1;
          }
          rightTankProjectiles.splice(i,1);          
    }
        } 
      }
    }
}

function CharacterBulletsCollisionLeft(){
  if (leftCharBullets.length !== 0){
  for(i=0;i<leftCharBullets.length;i++){
    if (leftCharBullets.length !== 0){
    for (j=0;j<rightCharSoldiers.length;j++){
      
    if (!(rightCharSoldiers[j].right() <= leftCharBullets[i].left()) && !(rightCharSoldiers[j].left() >= leftCharBullets[i].right()) && !(rightCharSoldiers[j].top() >= leftCharBullets[i].bottom()) && !(rightCharSoldiers[j].bottom() <= leftCharBullets[i].top())) { // if there’s a collision
        rightCharSoldiers[j].health -= leftCharBullets[i].damage;
        if (rightCharSoldiers[j].health<=0){
            rightCharSoldiers.splice(j,1);
          leftCharBullets.splice(i,1);
          playerB.points += 1;
          playerA.lifes -= 1;
        }
        leftCharBullets.splice(i,1);            
  
}
}
    for (j=0;j<rightTankUnits.length;j++){
      if (!(rightTankUnits[j].right() <= leftCharBullets[i].left()) && !(rightTankUnits[j].left() >= leftCharBullets[i].right()) && !(rightTankUnits[j].top() >= leftCharBullets[i].bottom()) && !(rightTankUnits[j].bottom() <= leftCharBullets[i].top())) { // if there’s a collision
      rightTankUnits[j].health -= leftCharBullets[i].damage;
      if (rightTankUnits[j].health<=0){
        rightTankUnits.splice(j,1);
        rightCharBullets.splice(i,1);
        playerA.points += 1;
        playerB.lifes -= 1;
      }
      leftCharBullets.splice(i,1);          
    }
} 
    }
  }
  }
  if (leftTankProjectiles.length !== 0){
    for(i=0;i<leftTankProjectiles.length;i++){
      for (j=0;j<rightCharSoldiers.length;j++){
          if (!(rightCharSoldiers[j].right() <= leftTankProjectiles[i].left()) && !(rightCharSoldiers[j].left() >= leftTankProjectiles[i].right()) && !(rightCharSoldiers[j].top() >= leftTankProjectiles[i].bottom()) && !(rightCharSoldiers[j].bottom() <= leftTankProjectiles[i].top())) { // if there’s a collision
          rightCharSoldiers[j].health -= leftTankProjectiles[i].damage;
          if (rightCharSoldiers[j].health<=0){
            rightCharSoldiers.splice(j,1);
            leftTankProjectiles.splice(i,1);
            playerA.points += 1;
            playerB.lifes -= 1;
          }
          leftTankProjectiles.splice(i,1);          
    }
        }
        for (j=0;j<rightTankUnits.length;j++){
          if (!(rightTankUnits[j].right() <= leftTankProjectiles[i].left()) && !(rightTankUnits[j].left() >= leftTankProjectiles[i].right()) && !(rightTankUnits[j].top() >= leftTankProjectiles[i].bottom()) && !(rightTankUnits[j].bottom() <= leftTankProjectiles[i].top())) { // if there’s a collision
          rightTankUnits[j].health -= leftTankProjectiles[i].damage;
          if (rightTankUnits[j].health<=0){
            rightTankUnits.splice(j,1);
            rightCharBullets.splice(i,1);
            playerA.points += 1;
            playerB.lifes -= 1;
          }
          leftTankProjectiles.splice(i,1);          
        }
    } 
      }
    }

}

function spawnCollision(){
  for (i=0; i<rightCharSoldiers.length;i++){
    if (rightCharSoldiers[i].x >= 520 ) {
      console.log('spawn point B reached');
        playerB.lifes -= rightCharSoldiers[i].health;
        playerA.points += rightCharSoldiers[i].health;
        rightCharSoldiers.splice(i,1);
      }
  }
  for (i=0; i<rightTankUnits.length;i++){
    if (rightTankUnits[i].x >= 520 ) {
      console.log('spawn point B reached'); 
        playerB.lifes -= rightTankUnits[i].health;
        playerA.points += rightTankUnits[i].health;
        rightTankUnits.splice(i,1);
      }
  }
  for (i=0; i<leftCharSoldiers.length;i++){
    if (leftCharSoldiers[i].x <= 45 ) {
      console.log('spawn point A reached');
        playerB.points += leftCharSoldiers[i].health;
        playerA.lifes -= leftCharSoldiers[i].health;
        leftCharSoldiers.splice(i,1);
      }
  }
  for (i=0; i<leftTankUnits.length;i++){
    if (leftTankUnits[i].x <= 45 ) {
      console.log('spawn point A reached');
        playerB.points += leftTankUnits[i].health;
        playerA.lifes -= leftTankUnits[i].health;
        leftTankUnits.splice(i,1);
      }
  }
}

function Score(){
  ctx.fillRect(0,230,canvas.width,2);
  ctx.fillStyle = 'black';
  ctx.font = "15px Georgia";
  ctx.fillText(`Player A lifes: ${playerA.lifes}`,20,270);
  ctx.fillText(`Player A Energy: ${playerA.energy}`,20,440);
  ctx.fillText(`Player B Energy: ${playerB.energy}`,450,440);
  ctx.fillText(`Player A points: ${playerA.points}`,235,340);
  ctx.fillText(`Player B points: ${playerB.points}`,235,390);
  ctx.fillText(`Player B lifes: ${playerB.lifes}`,470,270);
}

function spawnPoints(){
  ctx.fillStyle = 'red';
  ctx.fillRect(5,5,25,100);

  ctx.fillStyle = 'red';
  ctx.fillRect(5,120,25,100);

  ctx.strokeStyle = 'green';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(560,5,25,100);
 

  ctx.strokeStyle = 'green';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(560,120,25,100);

  ctx.fillStyle = 'black';
  ctx.fillRect(5, 113, 220, 2);

  ctx.fillStyle = 'black';
  ctx.fillRect(340, 113, 245, 2);

}

function spawnSoldiersRight(){
  state1 = true;
  if (state1 === true && playerA.energy > 2){
    let randomNumber = Math.ceil(Math.random()*2);
    playerA.energy -=3;
    if (randomNumber===1){
      let y = 20;
    rightCharSoldiers.push(new blackUnitRight(y));
    } else if (randomNumber===2){
      let y = 150;
      rightCharSoldiers.push(new blackUnitRight(y));
    }
  }
}

function spawnSoldiersLeft(){
  state3 = true;
  if (state3 === true && playerB.energy > 2){
    let randomNumber = Math.ceil(Math.random()*2);
    playerB.energy -=3;
    if (randomNumber===1){
      let y = 20;
    leftCharSoldiers.push(new blackUnitLeft(y));
    } else if (randomNumber===2){
      let y = 150;
      leftCharSoldiers.push(new blackUnitLeft(y));
    }
  }
}

//function drawDeadRight(){
//  for (j=0;j<rightCharSoldiers.length;j++){
//    if (rightCharSoldiers[j].health<=0){
//      console.log('new console log?');
//      let deadImage = new Image();
//          deadImage.src = './images/TeamGunner_By_SecretHideout_060519/CHARACTER_SPRITES/Red/Gunner_Red_Death.png'
//          rightCharSoldiers[j].image = deadImage;
//          ctx.drawImage(rightCharSoldiers[j].image,288, 0, this.sW, this.sH, this.x ,this.y,this.width,this.height);
//          setTimeout(() =>{
//        rightCharSoldiers.splice(j,1)
//      }, 1500);
//      playerB.points += 1;
//      playerA.lifes -= 1;
//    }
//  }
//}


function spawnTankRight(){
  if (playerA.energy > 5){
    let randomNumber = Math.ceil(Math.random()*2);
    playerA.energy -=5;
    if (randomNumber===1){
      let y = 20;
      rightTankUnits.push(new tankUnitRight(y));
    } else if (randomNumber===2){
      let y = 150;
      rightTankUnits.push(new tankUnitRight(y));
    }
  }
}

function updateTanksRight(){
for (i = 0; i <  rightTankUnits.length; i++) {
  if (myGameArea.frames % 1 === 0){
    rightTankUnits[i].x += 0.5;
    rightTankUnits[i].draw();
   // ctx.clearRect(rightCharBullets[i].x,rightCharBullets[i].y,rightCharBullets[i].width,rightCharBullets[i].height);
    }// if (myGameArea.frames % 100 === 0){
    //  rightCharBullets[i].x += -3;
    //  rightCharBullets[i].draw();
    //}
}
}

function updateTankProjectilesRight(){
  if(rightTankUnits.length !==0){
  let randomizer = Math.ceil(Math.random()*500);
    for (i = 0; i <  rightTankProjectiles.length; i++) {
      if (myGameArea.frames % 1 === 0 ){
        rightTankProjectiles[i].x += 5;
        rightTankProjectiles[i].draw();
      }
      
    } for (i=0;i<rightTankUnits.length;i++){
    if (myGameArea.frames % 100 === 0 && randomizer>=300){
        let x = rightTankUnits[i].x +48;
        let y = rightTankUnits[i].y +22;
        console.log('working?') // every 3s
        rightTankProjectiles.push(new tankProjectile(x,y, 'red'));//
      }
    }
  }    
}

function spawnTankLeft(){
  state4 = true;
  if (state4 === true && playerB.energy > 5){
    let randomNumber = Math.ceil(Math.random()*2);
    playerB.energy -=5;
    if (randomNumber===1){
      let y = 20;
      leftTankUnits.push(new tankUnitLeft(y));
    } else if (randomNumber===2){
      let y = 150;
      leftTankUnits.push(new tankUnitLeft(y));
    }
  }
}

function updateTanksLeft(){
  for (i = 0; i <  leftTankUnits.length; i++) {
    if (myGameArea.frames % 1 === 0){
      leftTankUnits[i].x -= 0.5;
      leftTankUnits[i].draw();
     // ctx.clearRect(rightCharBullets[i].x,rightCharBullets[i].y,rightCharBullets[i].width,rightCharBullets[i].height);
      }// if (myGameArea.frames % 100 === 0){
      //  rightCharBullets[i].x += -3;
      //  rightCharBullets[i].draw();
      //}
  }
  }

function updateTankProjectilesLeft(){
    if(leftTankUnits.length !==0){
    let randomizer = Math.ceil(Math.random()*500);
      for (i = 0; i <  leftTankProjectiles.length; i++) {
        if (myGameArea.frames % 1 === 0 ){
          leftTankProjectiles[i].x -= 5;
          leftTankProjectiles[i].draw();
        }
        
      } for (i=0;i<leftTankUnits.length;i++){
      if (myGameArea.frames % 100 === 0 && randomizer>=300){
          let x = leftTankUnits[i].x -48;
          let y = leftTankUnits[i].y +22;
          console.log('working?') // every 3s
          leftTankProjectiles.push(new tankProjectile(x,y, 'black'));//
        }
      }
    }    
  }