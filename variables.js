const myGameArea = {
  frames:0,

}
const playerA = {
    energy: 0,
    lifes: 30,
    points: 0,
  }
  
  const playerB = {
    energy: 0,
    lifes: 30,
    points: 0,
    
  }
let state1 = false;
let state3 = false;
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let gameInterval, shooterRightInterval;
let rightCharBullets = [];
let rightCharSoldiers = [];
let leftCharSoldiers = [];
let leftCharBullets = [];
let counter = 0;
const unitTestRight = rightCharSoldiers[0];
const unitTestLeft = leftCharSoldiers[0];
const card1 = document.getElementById('card1');





