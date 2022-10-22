
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let gameInterval, shooterRightInterval;
const rightCharBullets = [];
const rightCharSoldiers = [];
const leftCharSoldiers = [];
const leftCharBullets = [];

const unitTestRight = rightCharSoldiers[0];
const unitTestLeft = leftCharSoldiers[0];



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
