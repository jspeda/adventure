const moveSpeed = 6;

let camPanX = 0;
let camPanY = 0;

const distFromCenterBeforeCamPanX = 150;
const distFromCenterBeforeCamPanY = 100;

const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;

let holdLeft = false;
let holdRight = false;
let holdUp = false;
let holdDown = false;

const initInput = () => {
  document.addEventListener('keyDown', keyPressed);
  document.addEventListener('keyUp', keyReleased);
}
