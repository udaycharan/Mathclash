let columnSize = 6;
let rowSize = 6;
let currentSum = 0;
let target;
let score = 0;
let gridId = [];

const addCells = () => {
  let arr = [];
  for (let i = 0; i < rowSize; i++) {
    let obj = {};
    obj.value = Math.ceil(Math.random() * 9);
    obj.selected = false;
    arr.push(obj);
  }
  gridId.unshift(arr);
};

const getId = (i, j) => {
  return i.toString() + j.toString();
};

const updateBoard = () => {
  for (let i = 0; i < gridId.length; i++) {
    for (let j = 0; j < gridId[i].length; j++) {
      const el = document.getElementById(getId(i, j));
      el.innerHTML = gridId[i][j].value;

      if (gridId[i][j].selected === true) {
        el.classList.add("selected");
      } else {
        el.classList.remove("selected");
      }
    }
  }
};

let gameOver = () => {
  if (gridId.length < rowSize) {
    return false;
  }
  for (let i = 0; i < columnSize; i++) {
    if (gridId[rowSize - 1][i] !== "") {
      return true;
    }
  }
  return false;
};

const setTimer = () => {
  let id = setInterval(() => {
    addCells();
    updateBoard();

    if (gameOver()) {
      let result = document.getElementById("result");
      result.innerHTML = "Game is over!!";
      clearInterval(id);
      return;
    }
  }, 3000);
};
setTimer();

const deselectAllselected = () => {
  for (let i = 0; i < gridId.length; i++) {
    for (let j = 0; j < gridId[i].length; j++) {
      gridId[i][j].selected = false;
    }
  }
};

const removeAllselected = () => {
  let count = 0;
  for (let i = 0; i < gridId.length; i++) {
    for (let j = 0; j < gridId[i].length; j++) {
      if (gridId[i][j].selected) {
        count++;
        gridId[i][j].value = "";
        gridId[i][j].selected = false;
      }
    }
  }
  return count;
};

const initTarget = () => {
  target = 10 + Math.ceil(Math.random() * 60);
  document.getElementById("target").innerHTML = target;
};

const updateScore = (score) => {
  document.getElementById("score").innerHTML = "SCORE :" + score;
};

const handleClick = (columnEl, i, j) => {
  if (gameOver()) {
    return;
  }
  if (gridId[i][j] === "") {
    return;
  }

  gridId[i][j].selected = !gridId[i][j].selected;

  if (gridId[i][j].selected) {
    currentSum += gridId[i][j].value;
  } else {
    currentSum -= gridId[i][j].value;
  }

  if (currentSum > target) {
    currentSum = 0;
    deselectAllselected();
  } else if (currentSum === target) {
    let noOfCellsremoved = removeAllselected();
    score += noOfCellsremoved;
    initTarget();
    updateScore(score);
  }
  document.getElementById("currentsum").innerHTML = currentSum;
  updateBoard();
};

const grid = () => {
  let boardId = document.getElementById("board");
  for (let i = 0; i < rowSize; i++) {
    let rowEl = document.createElement("div");
    rowEl.className = "row center";
    for (let j = 0; j < columnSize; j++) {
      let columnEl = document.createElement("div");
      columnEl.id = getId(i, j);
      columnEl.className = "cell center";
      columnEl.addEventListener("click", () => handleClick(columnEl, i, j));
      rowEl.appendChild(columnEl);
    }
    boardId.appendChild(rowEl);
  }
  initTarget();
  updateScore(0);
};
grid();
