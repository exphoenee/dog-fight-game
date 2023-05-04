import './style.css';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);

const playerImage = new Image();
playerImage.src = './src/assets/shadow_dog.png';
const spriteWidth = 6876/12+2; // 6876/12 = 573 + 2px margin on right
const spriteHeight = 5230/10; // 5230 /10 = 523

const playerWidth = 128;
const playerHeight = 128;

const stateAnim = {
  idle: {FrameY: 0, FrameNrX: 6},
  jump: {FrameY: 1, FrameNrX: 6},
  fall: {FrameY: 2, FrameNrX: 6},
  run: {FrameY: 3, FrameNrX: 8},
  dizzy: {FrameY: 4, FrameNrX: 11},
  sit: {FrameY: 5, FrameNrX: 5},
  roll: {FrameY: 6, FrameNrX: 7},
  bite: {FrameY: 7, FrameNrX: 7},
  ko: {FrameY: 8, FrameNrX: 12},
  getHit: {FrameY: 9, FrameNrX: 4},
};

const states = Object.keys(stateAnim);

let FrameX = 0;
let FrameY = 0;
let playerState = "sit";
let gameFrame = 0;
const staggerFrames = 3;
let playerX = 100;
let playerY = 100;

const label = document.createElement("label", "state-label");
label.innerText = "State: ";
document.body.appendChild(label);

const selectState = document.createElement("select", "state-select");
states.forEach((state) => {
  const option = document.createElement("option", "state-option");
  option.value = state;
  option.innerText = state;
  selectState.appendChild(option);
});

selectState.addEventListener("change", (e) => {
  playerState = e.target.value;
});

label.appendChild(selectState);

function animate() {
  const {FrameNrX, FrameY} = stateAnim[playerState];
  FrameX = Math.floor(gameFrame / staggerFrames) % FrameNrX;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    playerImage,
    FrameX * spriteWidth,
    FrameY * spriteHeight,
    spriteWidth,
    spriteHeight,
    playerX,
    playerY,
    playerWidth,
    playerHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();