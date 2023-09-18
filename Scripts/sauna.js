/**
 * A simple 2D smoke renderer.
 * @version 0.1.1
 * @author Denis Khakimov <denisdude@gmail.com>
 */

// resolution of the effect matrix
const COLS = 40;
const ROWS = 40;

const matrix = new Array(ROWS);
for (let i = 0; i < matrix.length; i++)
   matrix[i] = new Array(COLS).fill(0);
// set the center element of matrix to 1 (for debug)
matrix[Math.floor((ROWS-1) / 2)][Math.floor((COLS-1) / 2)] = 1;

const updateMatrix = () => {
  // initially a set of almost random numbers
  const transform = {
    top: -65,
    left: 44,
    right: 44,
    bottom: 358,
    scale: 0.001,
  };
  transform.fading = 1 - (
    (transform.bottom + transform.left + transform.right) 
    * transform.scale
  ) / 5.15;
  
  // we need a copy of the current matrix to apply transform
  const matrixCopy = new Array(ROWS + 2);
  for (let i = 0; i < matrixCopy.length; i++)
    matrixCopy[i] = new Array(COLS + 2).fill(0);
  
  for (let x = 0; x < COLS + 2; x++) {
    for (let y = 0; y < ROWS + 2; y++) {
      if (x < 1 || x > COLS || y < 1 || y > ROWS) {
        matrixCopy[y][x] = 0;
      } else {
        matrixCopy[y][x] = matrix[y - 1][x - 1];
      }
    }
  }
  
  // applying the transform
  for (let x = 1; x <= COLS; x++) {
    for (let y = 1; y <= ROWS; y++) {
      matrix[y - 1][x - 1] += (
        matrixCopy[y - 1][x] * transform.scale * transform.top +
        matrixCopy[y + 1][x] * transform.scale * transform.bottom +
        matrixCopy[y][x - 1] * transform.scale * transform.left +
        matrixCopy[y][x + 1] * transform.scale * transform.right) /
        4;
      matrix[y - 1][x - 1] *= transform.fading;
    }
  }  
};

// UI -- begin
const btn = document.querySelector('button');
btn.addEventListener('click', (e) => {
  updateMatrix();
  console.log(matrix);
});

const checkboxBlur = document.querySelector('input[name=blur]');
checkboxBlur.addEventListener('change', (e) => {
  const canvas = document.querySelector('#canvas');
  if (e.target.checked) {
    canvas.classList.add('blur')
  } else {
    canvas.classList.remove('blur')
  }
});

let JUST_DRAW = false;
const checkboxJustDraw = document.querySelector('input[name=justdraw]');
checkboxJustDraw.addEventListener('change', (e) => {
  if (e.target.checked) 
    JUST_DRAW = true;
  else
    JUST_DRAW = false;
});

let INTENSITY = 1
const intensity = document.querySelector('input[name=intensity]')
intensity.addEventListener('change', (e) => {
  INTENSITY = parseFloat(e.target.value)
})
// UI -- end

const setLevel = (x, y, level) => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const cellWidth = canvas.clientWidth / COLS;
  const cellHeigth = canvas.clientHeight / ROWS;
  const cellX = Math.floor(x / cellWidth);
  const cellY = Math.floor(y / cellHeigth);
  matrix[cellY][cellX] = level;
};

const render = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const ctx = canvas.getContext('2d');
  const cellWidth = canvas.clientWidth / COLS;
  const cellHeigth = canvas.clientHeight / ROWS;
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const cellX = cellWidth * x;
      const cellY = cellHeigth * y;
      const color = matrix[y][x] * 255;
      ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
      ctx.fillRect(cellX, cellY, cellWidth, cellHeigth);
    }
  }
};

const tick = () => {
  updateMatrix();
  render();
  requestAnimationFrame(tick);
};

const init = (event) => {
  canvas = document.querySelector('#canvas');
  
  let isMouseDown = false;
  canvas.addEventListener('pointerdown', (e) => {
    isMouseDown = true;
  });
  canvas.addEventListener('pointerup', (e) => {
    isMouseDown = false;
  });
  canvas.addEventListener('pointermove', (e) => {
    if (JUST_DRAW || isMouseDown) {
      const cX = e.offsetX;
      const cY = e.offsetY;
      setLevel(cX, cY, INTENSITY);
    }
  });
  
  tick();
};

document.addEventListener('DOMContentLoaded', (e) => {
  init();
});
