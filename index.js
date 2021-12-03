const MATRIX_WIDTH = 20;
const MATRIX_HEIGHT = 20;

const textures = {
  sky: "sky", //0
  cloud: "cloud", //7
  dirt: "dirt", //1
  grass: "grass", //2
  rock: "rock", //3
  wood: "wood", //4
  leaves: "leaves", //5
  diamonds: "diamonds", //6
};

const miningPossible = {
  axe: ["wood", "leaves"],
  pickaxe: ["rock"],
  shovel: ["dirt", "grass"],
};

function initMatrix() {
  let res = [];
  for (let i = 0; i < MATRIX_HEIGHT; i++) {
    res[i] = [];
    for (let j = 0; j < MATRIX_WIDTH; j++) {
      if (i < 13) {
        //dirt
        res[i][j] = 0;
      } else if (i == 13) {
        res[i][j] = 2;
      } else {
        res[i][j] = 1;
      }
    }
  }
  // hard code some more elements
  // rocks
  res[12][3] = 3;
  res[12][7] = 3;
  res[12][8] = 3;
  res[11][8] = 3;
  //wood
  res[12][13] = 4;
  res[11][13] = 4;
  res[10][13] = 4;
  //leaves
  res[9][13] = 5;

  //diamonds
  res[15][4] = 6;
  res[18][18] = 6;
  
  //cloud
  res[3][3] = 7;
  res[3][4] = 7;
  res[3][5] = 7;
  res[3][6] = 7;
  res[2][4] = 7;
  res[2][5] = 7;
  return res;
}

function initTools() {
  const toolsDiv = document.querySelectorAll(".tool");
  toolsDiv.forEach((tool) => tool.addEventListener("click", selectTool));
}

let boardMatrix = initMatrix();

let boardContainer;

function drawBoard(boardMatrix) {
  boardContainer = document.querySelector(".boardContainer");
  boardContainer.innerHTML = "";
  for (let i = 0; i < MATRIX_HEIGHT; i++) {
    for (let j = 0; j < MATRIX_WIDTH; j++) {
      const newTile = document.createElement("div");
      newTile.setAttribute("y", i);
      newTile.setAttribute("x", j);
      newTile.addEventListener("click", tryMining);
      switch (boardMatrix[i][j]) {
        case 0:
          newTile.classList.add(textures.sky);
          break;
        case 1:
          newTile.classList.add(textures.dirt);
          break;
        case 2:
          newTile.classList.add(textures.grass);
          break;
        case 3:
          newTile.classList.add(textures.rock);
          break;
        case 4:
          newTile.classList.add(textures.wood);
          break;
        case 5:
          newTile.classList.add(textures.leaves);
          break;
        case 6:
          newTile.classList.add(textures.diamonds);
          break;
        default:
          newTile.classList.add(textures.sky);
          break;
      }
      boardContainer.appendChild(newTile);
    }
  }
}

drawBoard(boardMatrix);

initTools();

function selectTool(e) {
  const allTools = document.querySelectorAll(".tool");
  allTools.forEach((t) => {
    t.classList.remove("selected");
  });
  e.currentTarget.classList.add("selected");
}

function tryMining(e) {
  const selectedTool = document.querySelector(".selected"); //TODO no error when no tool selected
  const selectedToolType = selectedTool.getAttribute("data-toolType");
  const tileToMine = e.currentTarget.classList[0];
  if (tileToMine === "sky" || tileToMine === "cloud") {
    return;
  } else if (
    miningPossible[selectedToolType].includes(tileToMine)
    // tileToMine is included in selectedTool.allowedToMine
    // (selectedToolType === "shovel" && tileToMine === "dirt") ||
    // (selectedToolType === "shovel" && tileToMine === "grass")
  ) {
    // else: maybe msg user?
    console.log(e.currentTarget);
    const x = e.currentTarget.getAttribute("x");
    const y = e.currentTarget.getAttribute("y");
    boardMatrix[y][x] = 0;
    drawBoard(boardMatrix);
    //create tile only // TODO
  } else {
    console.log("wrong otol");
    selectedTool.style.animation = "wrongTool 1s linear";
    selectedTool.addEventListener("animationend", () => {
      selectedTool.style.webkitAnimationPlayState = "paused";
    });
  }
}
