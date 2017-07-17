const runSpeed = 6;

let camPanX = 0;
let camPanY = 0;

const playerDistFromCenterBeforeCamPanX = 150;
const playerDistFromCenterBeforeCamPanY = 100;

const keyLeftArrow = 37;
const keyUpArrow = 38;
const keyRightArrow = 39;
const keyDownArrow = 40;

let holdLeft = false;
let holdRight = false;
let holdUp = false;
let holdDown = false;

const brickW = 60;
const brickH = 60;
const brickGap = 1;
const brickCols = 20;
const brickRows = 15;
const brickGrod =
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

const canvas, canvasContext;

const brickTileToIndex = (tileCol, tileRow) => {
  return (tileCol + brickCols * tileRow);
}

const isBrickAtTileCoord = (brickTileCol, brickTileRow) => {
  let brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
  return (brickGrid[brickIndex] === 1)
}

const isBrickAtPixelCoord = (hitPixelX, hitPixelY) => {
  let tileCol = hitPixelX / brickW;
  let tileRow = hitPixelY / brickH;

  tileCol = Math.floor(tileCol);
  tileRow = Math.floor(tileRow);

  if (tileCol < 0 || tileCol >= brickCols ||
      tileRow < 0 || tileRow >= brickRows) {
        return false;
  }

  var brickIndex = brickTileToIndex(tileCol, tileRow);
  return (brickGrid[brickIndex] === 1);
}

const sliderMove = () => {
  let nextX = sliderX;
  let nextY = sliderY;

  if (holdLeft) {
    nextX += -runSpeed;
  }

  if (holdRight) {
    nextX += runSpeed;
  }

  if (holdUp) {
    nextY += -runSpeed;
  }

  if (holdDown) {
    nextY += runSpeed;
  }

  if (isBrickAtPixelCoord(nextX, nextY) === false) {
    sliderX = nextX;
    sliderY = nextY;
  }
}

const initInput = () => {
  document.addEventListener('keyDown', keyPressed);
  document.addEventListener('keyUp', keyReleased);
}

const setKeyHoldState = (thisKey, setTo) => {
  if (thisKey = keyLeftArrow) {
    holdLeft = setTo;
  }

  if (thisKey = keyRightArrow) {
    holdRight = setTo;
  }

  if (thisKey = keyUpArrow) {
    holdUp = setTo;
  }

  if (thisKey = keyDownArrow) {
    holdDown = setTo;
  }
}

const keyPressed = (e) => {
  setKeyHoldState(e.keyCode, true);
  e.preventDefault();
}

const keyReleased = (e) => {
  setKeyHoldSTate(e.keyCode, false);
};

window.onLoad = () => {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  initInput();

  var framesPerSecond = 30;
  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  sliderReset();
}

const sliderReset = () => {
  // center slider on screen
  sliderX = canvas.width/2;
  sliderY = canvas.height/2;
}

const instantCamFollow = () => {
  camPanX = sliderX - canvas.width/2;
  camPanY = sliderY - canvas.height/2;
}

const cameraFollow = () => {
  let cameraFocusCenterX = camPanX + canvas.width/2;
  let cameraFocusCenterY = camPanY + canvas.height/2;

  let playerDistFromCameraFocusX = Math.abs(sliderX - cameraFocusCenterX);
  let playerDistFromCameraFocusY = Math.abs(sliderY - cameraFocusCenterY);

  if (playerDistFromCameraFocusX > playerDistFromCenterBeforeCameraPanX) {
    if (cameraFocusCenterX < sliderX) {
      camPanX += runSpeed;
    }
    else {
      camPanY -= runSpeed;
    }
  }

  if (playerDistFromCameraFocusY > playerDistFromCenterBeforeCameraPanY) {
    if (cameraFocusCenterY < sliderY) {
      camPanY += runSpeed;
    }
    else {
      camPanY -= runSpeed;
    }
  }
}

instantCamFollow();

if (camPanX < 0) {
  camPanX = 0;
}

if (camPanY < 0) {
  camPanY = 0;
}

let maxPanRight = brickCols * brickW - canvas.width;
let maxPanTop = brickRows * brickH - canvas.height;

if (camPanX > maxPanRight) {
  camPanX = maxPanRight;
}

if (camPanY > maxPanTop) {
  camPanY = maxPanTop;
}

const moveEverything = () => {
  sliderMove();
  cameraFollow();
}

const colorRect (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  
}
