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
  pickaxe: ["rock", "diamonds"],
  shovel: ["dirt", "grass"],
};

const inventory = {
  dirt: 0,
  grass: 0,
  rock: 0,
  wood: 0,
  leaves: 0,
  diamonds: 0,
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
        //grass
        res[i][j] = 2;
      } else if (i > 13 && i < 17) {
        res[i][j] = 1;
      } else {
        res[i][j] = 3;
      }
    }
  }
  //wood
  res[12][13] = 4;
  res[11][13] = 4;
  //leaves
  res[10][11] = 5;
  res[10][12] = 5;
  res[10][13] = 5;
  res[10][14] = 5;
  res[10][15] = 5;
  res[9][11] = 5;
  res[9][12] = 5;
  res[9][13] = 5;
  res[9][14] = 5;
  res[9][15] = 5;
  res[8][12] = 5;
  res[8][13] = 5;
  res[8][14] = 5;
  res[7][13] = 5;

  //diamonds
  res[19][4] = 6;
  res[18][18] = 6;

  //cloud
  res[3][3] = 7;
  res[3][4] = 7;
  res[3][5] = 7;
  res[3][6] = 7;
  res[2][4] = 7;
  res[2][5] = 7;

  //big cloud
  res[5][19] = 7;
  res[5][18] = 7;
  res[5][17] = 7;
  res[5][16] = 7;
  // res[5][15] = 7;
  // res[5][14] = 7;
  // res[5][13] = 7;
  // res[5][12] = 7;
  // res[5][11] = 7;
  // res[5][10] = 7;
  res[4][19] = 7;
  res[4][18] = 7;
  res[4][17] = 7;
  res[4][16] = 7;
  res[4][15] = 7;
  res[4][14] = 7;
  res[3][19] = 7;
  res[3][18] = 7;
  res[3][17] = 7;
  res[3][16] = 7;
  res[3][15] = 7;
  res[2][19] = 7;
  res[2][18] = 7;
  res[2][17] = 7;

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
        case 7:
          newTile.classList.add(textures.cloud);
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
  } else if (miningPossible[selectedToolType].includes(tileToMine)) {
    const x = e.currentTarget.getAttribute("x");
    const y = e.currentTarget.getAttribute("y");
    boardMatrix[y][x] = 0;
    drawBoard(boardMatrix);
    inventory[tileToMine]++;
    refreshInventory();
    console.log(inventory);
    //recreate single tile only // TODO
  } else {
    selectedTool.classList.add("wrong");
    selectedTool.addEventListener("animationend", () => {
      selectedTool.classList.remove("wrong");
      //msg user?
    });
  }
}

function refreshInventory() {
  //display inventory refreshed
}
