const MATRIX_WIDTH = 20;
const MATRIX_HEIGHT = 20;

const textures = {
  dirt: "dirt",
  grass: "grass",
  sky: "sky",
  wood: "wood",
  leaves: "leaves",
};

// const miningPossible = {
//   tool1: [wood, leaves],
//   tool2: [2],

// };   //TODO why is this breaking the code??

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
  return res;
}

function initTools() {
  const toolsDiv = document.querySelectorAll(".tool");
  toolsDiv.forEach((tool) => tool.addEventListener("click", selectTool));
}


// let selectedTool = "";

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
  const selectedTool =
    document.querySelector(".selected").getAttribute("data-toolType") || ""; //TODO no error when no tool selected
  const tileToMine = e.currentTarget.classList[0];
  if (
      // tileToMine is included in selectedTool.allowedToMine
    (selectedTool === "shovel" && tileToMine === "dirt" ||
    selectedTool === "shovel" && tileToMine === "grass")
  ) { // else: make tool red. maybe msg user?
    console.log(e.currentTarget);
    const x = e.currentTarget.getAttribute("x");
    const y = e.currentTarget.getAttribute("y");
    boardMatrix[y][x] = 0;
    drawBoard(boardMatrix);
    //create tile only // TODO
  } else {
    document.querySelector(".selected").style.animation = "wrongTool 1s linear";
      // give color of failed attempt for like 0.5 seconds
  }
}
