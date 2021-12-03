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

function initResources() {
  const resourcesDivs = document.querySelectorAll(".resource");
  resourcesDivs.forEach((resource) =>
    resource.addEventListener("click", selectResource)
  );
}

refreshInventoryDisplay();

let boardMatrix = initMatrix();

let boardContainer;

getTileFromNumber = (num) => {
  switch (num) {
    case 0:
      return textures.sky;
    case 1:
      return textures.dirt;
    case 2:
      return textures.grass;
    case 3:
      return textures.rock;
    case 4:
      return textures.wood;
    case 5:
      return textures.leaves;
    case 6:
      return textures.diamonds;
    case 7:
      return textures.cloud;
    default:
      return textures.sky;
  }
};

function drawBoard(boardMatrix) {
  boardContainer = document.querySelector(".boardContainer");
  boardContainer.innerHTML = "";
  for (let i = 0; i < MATRIX_HEIGHT; i++) {
    for (let j = 0; j < MATRIX_WIDTH; j++) {
      const newTile = document.createElement("div");
      newTile.setAttribute("y", i);
      newTile.setAttribute("x", j);
      newTile.addEventListener("click", tryMining);
      newTile.classList.add(getTileFromNumber(boardMatrix[i][j]));
      boardContainer.appendChild(newTile);
    }
  }
}

drawBoard(boardMatrix);

initTools();

initResources();

function selectTool(e) {
  const allTools = document.querySelectorAll(".tool");
  allTools.forEach((t) => t.classList.remove("selectedTool"));
  e.currentTarget.classList.add("selectedTool");
  const boardElement = document.querySelector(".boardContainer");
  let allBoardDivs = boardElement.querySelectorAll(":scope > div");
  allBoardDivs.forEach((d) => {
    d.removeEventListener("click", tryBuilding);
    d.addEventListener("click", tryMining);
  });
}

function selectResource(e) {
  const allResouces = document.querySelectorAll(".resource");
  allResouces.forEach((r) => r.classList.remove("selectedResource"));
  e.currentTarget.classList.add("selectedResource");
  const boardElement = document.querySelector(".boardContainer");
  let allBoardDivs = boardElement.querySelectorAll(":scope > div");
  allBoardDivs.forEach((d) => {
    d.removeEventListener("click", tryMining);
    d.addEventListener("click", tryBuilding);
  });
}

function tryMining(e) {
  const selectedTool = document.querySelector(".selectedTool"); //TODO no error when no tool selected
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
    refreshInventoryDisplay();
    //recreate single tile only? // TODO
  } else {
    selectedTool.classList.add("wrong");
    selectedTool.addEventListener("animationend", () => {
      selectedTool.classList.remove("wrong");
      //msg user?
    });
  }
}

function tryBuilding(e) {
  const selectedResource = document.querySelector(".selectedResource");
  const selectedResourceType =
    selectedResource.getAttribute("data-resourceType");
  const tileToBuild = e.currentTarget.classList[0];
  if (tileToBuild === "sky" || tileToBuild === "cloud") {
    //change tile (matrix + div)
    //reduce inventory
    refreshInventoryDisplay();
  }
}

function refreshInventoryDisplay() {
  const resourcesDisplay = document.querySelectorAll(".resource");
  Object.entries(inventory).forEach(([key, value], index) => {
    if (value > 0) {
      resourcesDisplay[index].innerText = value;
      resourcesDisplay[index].style.background = "blue";
    }
  });
}

// function udpateTile (x,y,newTile) {

// }
// gets x, y, new tile  >
// replaces it in matrix
// changes class of current div to newTile
// gets called on mining and on building
