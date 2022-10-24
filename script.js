function targetting(e){
  let id = e.target.id;
  const target = e.target;
  if (id === 'card1'){
    spawnSoldiersRight();
  }
  if( id === 'card3'){
    spawnSoldiersLeft();
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
    let height = 600;
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
    updateSoldiersLeft();
    updateBullets();
    if(rightCharSoldiers.length !== 0 && leftCharSoldiers.length !== 0){
    CharacterBulletsCollision();
  };
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


function updateBullets(){
  if(leftCharSoldiers.length !==0 && rightCharSoldiers.length !==0){
  let randomizer = Math.ceil(Math.random()*500);
    for (i = 0; i <  rightCharBullets.length; i++) {
      if (myGameArea.frames % 1 === 0 ){
        rightCharBullets[i].x += 5;
        rightCharBullets[i].draw();
      }
      
    }if (myGameArea.frames % 10 === 0 && randomizer>=300){
        let x = rightCharSoldiers[0].x +48;
        let y = rightCharSoldiers[0].y +22;
        console.log('working?') // every 3s
        rightCharBullets.push(new ProjectilesRight(x,y));//
      }
    }

    if(leftCharSoldiers.length !==0 && rightCharSoldiers.length !==0){
      let randomizer = Math.ceil(Math.random()*500);
    for (i = 0; i <  leftCharBullets.length; i++) {
      
        if (myGameArea.frames % 1 === 0 ){
          leftCharBullets[i].x -= 5;
          leftCharBullets[i].draw();
        }
        
      }if (myGameArea.frames % 50 === 0 && randomizer <350) {
        let x = leftCharSoldiers[0].x;
        let y = leftCharSoldiers[0].y +22;
          leftCharBullets.push(new ProjectilesLeft(x,y));//
        }
      }
      
    
}

function CharacterBulletsCollision() {
  if (rightCharBullets.length > 0){
  for(i=0;i<rightCharBullets.length;i++){
        if (!(leftCharSoldiers[0].right() <= rightCharBullets[i].left()) && !(leftCharSoldiers[0].left() >= rightCharBullets[i].right()) && !(leftCharSoldiers[0].top() >= rightCharBullets[i].bottom()) && !(leftCharSoldiers[0].bottom() <= rightCharBullets[i].top())) { // if there’s a collision
        leftCharSoldiers[0].health -= rightCharBullets[i].damage;
        if (leftCharSoldiers[0].health<=0){
          leftCharSoldiers.splice(0,1);
          rightCharBullets.splice(i,1);
          playerA.points += 1;
          playerB.lifes -= 1;
        }
        rightCharBullets.splice(i,1);          
  }
      }
  } 
  
    for(i=0;i<leftCharBullets.length;i++){
      
      if (!(rightCharSoldiers[0].right() <= leftCharBullets[i].left()) && !(rightCharSoldiers[0].left() >= leftCharBullets[i].right()) && !(rightCharSoldiers[0].top() >= leftCharBullets[i].bottom()) && !(rightCharSoldiers[0].bottom() <= leftCharBullets[i].top())) { // if there’s a collision
          rightCharSoldiers[0].health -= leftCharBullets[i].damage;
          if (rightCharSoldiers[0].health<=0){
            rightCharSoldiers.splice(0,1);
            leftCharBullets.splice(i,1);
            playerB.points += 1;
            playerA.lifes -= 1;
          }
          leftCharBullets.splice(i,1);            
    
}
      }
    
    for (i=0; i<rightCharSoldiers.length;i++){
      if (rightCharSoldiers[0].right() >= 500 ) {
        console.log('spawn point B reached');
          rightCharSoldiers.splice(0,1);
          playerB.lifes -= 5;
          playerA.points += 5;
        }
    }
    for (i=0; i<leftCharSoldiers.length;i++){
      if (leftCharSoldiers[0].left() <= 50 ) {
        console.log('spawn point A reached');
          leftCharSoldiers.splice(0,1);
          playerB.points += 5;
          playerA.lifes -= 5;
        }
    }
  }

function Score(){
  ctx.fillRect(0,250,canvas.width,2);
  ctx.fillStyle = 'black';
  ctx.font = "15px Georgia";
  ctx.fillText(`Player A lifes: ${playerA.lifes}`,20,280);
  ctx.fillText(`Player A Energy: ${playerA.energy}`,20,450);
  ctx.fillText(`Player B Energy: ${playerB.energy}`,450,450);
  ctx.fillText(`Player A points: ${playerA.points}`,235,350);
  ctx.fillText(`Player B points: ${playerB.points}`,235,400);
  ctx.fillText(`Player B lifes: ${playerB.lifes}`,470,280);
}

function spawnPoints(){
  ctx.fillStyle = 'red';
  ctx.fillRect(5,5,25,100);

  ctx.fillStyle = 'red';
  ctx.fillRect(5,120,25,100);

  ctx.strokeStyle = 'green';
  ctx.lineWidth = 4;
  ctx.strokeRect(560,5,25,100);
 

  ctx.strokeStyle = 'green';
  ctx.lineWidth = 4;
  ctx.strokeRect(560,120,25,100);
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