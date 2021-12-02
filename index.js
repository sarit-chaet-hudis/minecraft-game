const MATRIX_WIDTH = 20;
const MATRIX_HEIGHT = 20;

const textures = {
  dirt: "dirt",
  sky: "sky",
  wood: "wood",
  leaves: "leaves",
};

function initMatrix() {
  let row = [];
  for (let i = 0; i < MATRIX_HEIGHT; i++) {
    row[i] = []
    
    for (let j = 0; j < MATRIX_WIDTH; j++) {
      
      row[i].push = 0;
    }
  }
  return row;
  //   return Array(MATRIX_HEIGHT).fill(Array(MATRIX_WIDTH).fill(0));
}

const boardMatrix = initMatrix();
boardMatrix[3][2] = 1;
console.log(boardMatrix);

const boardContainer = document.querySelector(".boardContainer");

function drawBoard(boardMatrix, boardContainer) {
  boardContainer.innerHTML = "";
  for (let i = 0; i < MATRIX_HEIGHT; i++) {
    //rows
    for (let j = 0; j < MATRIX_WIDTH; j++) {
      //cols
      const newTile = document.createElement("div");
      newTile.style.gridRowStart = i + 1;
      newTile.style.gridColumnStart = j + 1;
      switch (boardMatrix[i][j]) {
        case 0:
          newTile.classList.add(textures.sky);
          break;
        case 1:
          newTile.classList.add(textures.dirt);
          break;
        default:
          newTile.classList.add(textures.dirt);
          break;
      }
      boardContainer.appendChild(newTile);
    }
  }
}


// drawBoard(boardMatrix, boardContainer);

// maybe later do drawTile ?

// function addTile(tile, boardContainer) {}
