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

const getTileFromNumber = {
  0: textures.sky,
  1: textures.dirt,
  2: textures.grass,
  3: textures.rock,
  4: textures.wood,
  5: textures.leaves,
  6: textures.diamonds,
  7: textures.cloud,
};

getNumfromTile = (tileType) => {
  return Object.keys(getTileFromNumber).find(
    (key) => getTileFromNumber[key] === tileType
  );
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
  //grass
  res[12][4] = 2;
  res[12][3] = 2;
  res[12][19] = 2;
  res[12][18] = 2;
  res[12][17] = 2;
  res[12][16] = 2;

  //wood
  res[12][2] = 4;
  res[11][2] = 4;

  res[12][13] = 4;
  res[11][13] = 4;
  //leaves
  res[10][1] = 5;
  res[10][2] = 5;
  res[10][3] = 5;
  res[9][1] = 5;
  res[9][2] = 5;
  res[9][3] = 5;
  res[8][2] = 5;

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
  res[18][2] = 6;
  res[18][18] = 6;
  res[19][10] = 6;

  //heart cloud
  res[5][4] = 7;
  res[4][3] = 7;
  res[4][4] = 7;
  res[4][5] = 7;
  res[3][5] = 7;
  res[3][2] = 7;
  res[3][3] = 7;
  res[3][4] = 7;
  res[3][5] = 7;
  res[3][6] = 7;
  res[2][3] = 7;
  res[2][5] = 7;

  //big cloud
  res[5][19] = 7;
  res[5][18] = 7;
  res[5][17] = 7;
  res[5][16] = 7;
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
  const isSelectedTool = document.querySelector(".selectedTool");
  if (isSelectedTool) {
    isSelectedTool.classList.remove("selectedTool");
  }
}

function initInventory() {
  for (const resource in inventory) {
    inventory[resource] = 0;
  }
}

refreshInventoryDisplay();

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
      newTile.classList.add(getTileFromNumber[boardMatrix[i][j]]);
      boardContainer.appendChild(newTile);
      newTile.addEventListener("click", tryMining);
    }
  }
}

drawBoard(boardMatrix);

initTools();

function initCursor() {
  const body = document.querySelector("body");
  body.style.cursor = "default";
}

const cursorList = {
  axe: "assets/cursors/axe-cursor.cur",
  pickaxe: "assets/cursors/pickaxe-cursor.cur",
  shovel: "assets/cursors/shovel-cursor.cur",
  dirt: "/assets/cursors/dirt-cursor.cur",
  grass: "/assets/cursors/grass-cursor.cur",
  rock: "/assets/cursors/rock-cursor.cur",
  wood: "/assets/cursors/wood-cursor.cur",
  leaves: "/assets/cursors/leaves-cursor.cur",
  diamonds: "/assets/cursors/diamond-cursor.cur",
};

let miningMode = true;
// when false, build mode

const mineSound = new Audio("/assets/sounds/mine-sound-short.mp3");
const buildSound = new Audio("/assets/sounds/build-sound-short.mp3");

userMessage("hi there, pick a tool and start mining");

document.querySelector(".restartContainer").addEventListener("click", restart);

document.querySelector(".startGame").addEventListener("click", startGame);
document
  .querySelector(".instructionsButton")
  .addEventListener("click", showInstructions);
document
  .querySelector(".instructionsClose")
  .addEventListener("click", closeInstructions);

function showInstructions() {
  document.querySelector(".instructionsDisplay").style.display = "flex";
}
function closeInstructions() {
  document.querySelector(".instructionsDisplay").style.display = "none";
}

document.querySelector("main").style.display = "none";
document.querySelector(".sidebar").style.display = "none";

function startGame() {
  document.querySelector(".splashScreen").style.display = "none";
  document.querySelector("main").style.display = "flex";
  document.querySelector(".sidebar").style.display = "block";
}

function restart() {
  const r = window.confirm("Are you sure you want to restart game?");
  if (r) {
    initTools();

    initCursor();

    initInventory();

    refreshInventoryDisplay();

    miningMode = true;

    boardMatrix = initMatrix();

    drawBoard(boardMatrix);

    userMessage("hi there, pick a tool and start mining");
  }
}

function selectTool(e) {
  //make sure only one is selected
  const allTools = document.querySelectorAll(".tool");
  allTools.forEach((t) => t.classList.remove("selectedTool"));
  e.currentTarget.classList.add("selectedTool");
  // unselect resource if one is currently selected
  const isSelectedResource = document.querySelector(".selectedResource");
  if (isSelectedResource) {
    isSelectedResource.classList.remove("selectedResource");
  }
  // change board to mining Mode if its not already
  if (!miningMode) {
    miningMode = true;
    const boardElement = document.querySelector(".boardContainer");
    let allBoardDivs = boardElement.querySelectorAll(":scope > div");
    allBoardDivs.forEach((d) => {
      d.removeEventListener("click", tryBuilding);
      d.addEventListener("click", tryMining);
    });
  }
  // set custom cursor
  const currentTool = e.currentTarget.getAttribute("data-toolType");
  const body = document.querySelector("body");
  body.style.cursor = `url(${cursorList[currentTool]}), auto`;
}

function selectResource(e) {
  //make sure only one is selected
  const prevSelected = document.querySelector(".selectedResource");
  if (prevSelected) {
    prevSelected.classList.remove("selectedResource");
  }
  e.currentTarget.classList.add("selectedResource");
  // unselect tool if one is currently selected
  const isSelectedTool = document.querySelector(".selectedTool");
  if (isSelectedTool) {
    isSelectedTool.classList.remove("selectedTool");
  }
  // change board to build Mode if its not already
  if (miningMode) {
    miningMode = false;
    const boardElement = document.querySelector(".boardContainer");
    let allBoardDivs = boardElement.querySelectorAll(":scope > div");
    allBoardDivs.forEach((d) => {
      d.removeEventListener("click", tryMining);
      d.addEventListener("click", tryBuilding);
    });
  }
  // set custom cursor
  const currResource = e.currentTarget.getAttribute("data-resourcetype");
  const body = document.querySelector("body");
  body.style.cursor = `url(${cursorList[currResource]}), auto`;
}

function tryMining(e) {
  const selectedTool = document.querySelector(".selectedTool");
  if (selectedTool) {
    const selectedToolType = selectedTool.getAttribute("data-toolType");
    const tileToMine = e.currentTarget.classList[0];
    if (tileToMine === "sky" || tileToMine === "cloud") {
      return;
    } else if (miningPossible[selectedToolType].includes(tileToMine)) {
      mineSound.play();
      replaceTile(e.currentTarget, 0);
      inventory[tileToMine]++;
      refreshInventoryDisplay();
    } else {
      selectedTool.classList.add("wrong");
      userMessage(`you can't mine ${tileToMine} with ${selectedToolType}`);
      selectedTool.addEventListener("animationend", () => {
        selectedTool.classList.remove("wrong");
      });
    }
  } else {
    userMessage("please select tool");
  }
}

function tryBuilding(e) {
  const selectedResource = document.querySelector(".selectedResource");
  if (selectedResource) {
    const resourceType = selectedResource.getAttribute("data-resourceType");
    const placeToBuild = e.currentTarget.classList[0];
    if (placeToBuild === "sky" || placeToBuild === "cloud") {
      buildSound.play();
      replaceTile(e.currentTarget, getNumfromTile(resourceType));
      inventory[resourceType]--;
      if (inventory[resourceType] === 0) {
        initCursor();
      }
      refreshInventoryDisplay(resourceType);
    } else {
      return;
    }
  } else {
    userMessage(
      "please select available resource from inventory, or tool to mine"
    );
  }
}

function refreshInventoryDisplay(selected = null) {
  const resourcesDisplay = document.querySelector(".inventory");
  resourcesDisplay.innerHTML = "";
  Object.entries(inventory).forEach(([inventoryKey, value]) => {
    const newResource = document.createElement("div");
    newResource.classList.add("resource");
    newResource.setAttribute("data-resourceType", inventoryKey);
    if (value > 0) {
      newResource.innerText = value;
      newResource.classList.add(inventoryKey);
      resourcesDisplay.prepend(newResource);
      newResource.addEventListener("click", selectResource);
      if (selected === inventoryKey) {
        newResource.classList.add("selectedResource");
      }
    } else {
      newResource.classList.add("empty");
      resourcesDisplay.append(newResource);
    }
  });
}

function replaceTile(tileToReplace, newTileType) {
  // Update matrix:
  const x = tileToReplace.getAttribute("x");
  const y = tileToReplace.getAttribute("y");
  boardMatrix[y][x] = newTileType;
  // Update classes of div to change display:
  tileToReplace.classList.remove(tileToReplace.classList[0]);
  tileToReplace.classList.add(getTileFromNumber[newTileType]);
}

function userMessage(msg) {
  const messageDiv = document.querySelector(".userMessage");
  messageDiv.innerText = msg;
  messageDiv.style.display = "block";
  window.setTimeout(() => (messageDiv.style.display = "none"), 3450);
}

// TODO use initGame to initialize game in one func
// instead of all the init calls..

// TODO when building on a cloud and mining, cloud turns to sky.
// the skies should be treated as background/ display only
