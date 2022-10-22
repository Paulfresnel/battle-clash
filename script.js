


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
    if (rightCharSoldiers.length>0){ 
      rightCharSoldiers[0].draw();
    }
    if (leftCharSoldiers.length>0){ 
      leftCharSoldiers[0].draw();
    }
    gameOnGoing();
  };

function gameOnGoing(){
  gameInterval = setInterval(renderGame,20);
}

function renderGame(){
    myGameArea.frames +=1;
    ctx.clearRect(0,0,600,600);
    updateSoldiersLeft();
    updateSoldiersRight();
    updateBullets();
    CharacterBulletsCollision();
    Score();
    spawnPoints();
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
  if (myGameArea.frames % 1 === 0 && rightCharSoldiers.length < 1) { // every 3s
    rightCharSoldiers.push(new blackUnitRight());//
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
  if (myGameArea.frames % 1 === 0 && leftCharSoldiers.length < 1) { // every 3s
    leftCharSoldiers.push(new blackUnitLeft());//
  }
}


function updateBullets(){
  let randomizer = Math.ceil(Math.random()*500);
    for (i = 0; i <  rightCharBullets.length; i++) {
      if (myGameArea.frames % 1 === 0 ){
        rightCharBullets[i].x += 5;
        rightCharBullets[i].draw();
       // ctx.clearRect(rightCharBullets[i].x,rightCharBullets[i].y,rightCharBullets[i].width,rightCharBullets[i].height);
      }
      
    }if (myGameArea.frames % 100 === 0 && randomizer>=250) {
        console.log('working?') // every 3s
        rightCharBullets.push(new ProjectilesRight());//
      }

    for (i = 0; i <  leftCharBullets.length; i++) {
        if (myGameArea.frames % 1 === 0 ){
          leftCharBullets[i].x -= 5;
          leftCharBullets[i].draw();
         // ctx.clearRect(leftCharBullets[i].x,leftCharBullets[i].y,leftCharBullets[i].width,leftCharBullets[i].height);
        }
        
      }if (myGameArea.frames % 100 === 0 && randomizer<500) {
          console.log('working?') // every 3s
          leftCharBullets.push(new ProjectilesLeft());//
        }
    
}

function CharacterBulletsCollision() {
  // check if one obstacle has had a collision with player
  if (rightCharBullets.length > 0){
  for(i=0;i<rightCharBullets.length;i++){
      if (rightCharBullets[i].right() >= leftCharSoldiers[0].left()) {
        console.log('B is damaged');
        leftCharSoldiers[0].health -= rightCharBullets[i].damage;
        if (leftCharSoldiers[0].health<=0){
          leftCharSoldiers.splice(0,1);
          rightCharBullets.splice(i,1);
          playerA.points += 1;
          playerB.lifes -= 1;
        }
        rightCharBullets.splice(i,1);
        
         
        console.log('left health: ' +leftCharSoldiers[0].health)
        //let points = rightCharBullets[i].points;
        //  leftCharSoldiers[0].balance += points; // remove the Points from player’s Balance
        //  rightCharBullets.splice(i,1); //remove obstacle from obstacle array
          
  }
      }
  } if (leftCharBullets.length > 0){
    for(i=0;i<leftCharBullets.length;i++){
        if (rightCharSoldiers[0].right() >= leftCharBullets[i].left() ) {
          console.log('A is damaged');
          rightCharSoldiers[0].health -= leftCharBullets[i].damage;
          if (rightCharSoldiers[0].health<=0){
            rightCharSoldiers.splice(0,1);
            leftCharBullets.splice(0,1);
            playerB.points += 1;
            playerA.lifes -= 1;
          }
          leftCharBullets.splice(0,1);
        
          //let points = rightCharBullets[i].points;
          //  unitTestLeft.balance += points; // remove the Points from player’s Balance
          //  rightCharBullets.splice(i,1); //remove obstacle from obstacle array
            
    }
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
  ctx.fillText(`Player A points: ${playerA.points}`,200,350);
  ctx.fillText(`Player B points: ${playerB.points}`,200,400);
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
