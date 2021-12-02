const MATRIX_WIDTH = 20;
const MATRIX_HEIGHT = 20;

const textures = {
  dirt: "dirt",
  grass: "grass",
  sky: "sky",
  wood: "wood",
  leaves: "leaves",
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
  return res;
}

function initTools() {
  const tools = document.querySelectorAll(".tool");
  tools.forEach((tool) => tool.addEventListener("click", selectTool));
}

let selectedTool = "";

const boardMatrix = initMatrix();

let boardContainer = document.querySelector(".boardContainer");

function drawBoard(boardMatrix, boardContainer) {
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

drawBoard(boardMatrix, boardContainer);

initTools();

function selectTool(e) {
  const allTools = document.querySelectorAll(".tool");
  allTools.forEach((t) => {
    t.classList.remove("selected");
  });
  e.currentTarget.classList.add("selected");
}

function tryMining(e) {
  console.log(e.target);
  const selectedTool =
    document.querySelector(".selected").getAttribute("data-toolType") || ""; //TODO no error when no tool selected
  const tileToMine = e.currentTarget.classList[0];
  if (selectedTool === "shovel" && tileToMine === "dirt") {
    console.log(e.currentTarget);
    // const y = e.currentTarget.y;
    // const x = e.currentTarget.x;
    // boardMatrix[x][y] = 0;
    //create tile only
    //background cont sky color?
  }
}
