const cols = 7;
const rows = 6;
const w = 100;
const dw = 80;
const board = Array(6)
  .fill()
  .map(() => Array(7).fill(0));

let player = 1;
let playerPos;
let win = 0;

let starSize;

function setup() {
  var canvas = createCanvas(cols * w, rows * w + w);
  canvas.parent('portrait');
}

function hasWon() {
  // Test Horizontal
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i <= cols - 4; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j][i + k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  // Test Vertical
  for (let j = 0; j <= rows - 4; j++) {
    for (let i = 0; i < cols; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j + k][i] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  // Test Diagonal
  for (let j = 0; j <= rows - 4; j++) {
    for (let i = 0; i <= cols - 4; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j + k][i + k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  // Test Antidiagonal
  for (let j = 0; j <= rows - 4; j++) {
    for (let i = 4; i < cols; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j + k][i - k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  return false;
}

function draw() {
  background(43, 34, 22);

  playerPos = floor(mouseX / w);

  stroke(0);
  fill(255);
  rect(-1, -1, width + 2, w);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      fill(255);
      if (board[j][i] == 1) {
        fill(0, 0, 255);
      } else if (board[j][i] == 2) {
        fill(255, 0, 0);
      }
      // ellipse(i*w + w/2, j*w + 3*w/2, dw);
      // rect(i*w + w/8, j*w + 3*w/2.7, dw);
      drawStar(i * w + w / 2, j * w + (3 * w) / 2, dw / 1.5, dw / 3, 5);
    }
  }

  stroke(102, 102, 0);
  for (let x = w; x < width; x += w) {
    line(x, w, x, height);
  }

  if (win != 0) {
    noStroke();
    fill(0);
    if (win == 1) {
      fill(0, 0, 255);
    } else if (win == 2) {
      fill(255, 0, 0);
    }
    textAlign(CENTER, CENTER);
    textSize(64);
    if (win == 4) {
      text("Game Over!", width / 2, w / 2);
    } else if (win == 3) {
      text("It is a tie.", width / 2, w / 2);
    } else {
      text(`${win > 1 ? "Red" : "Blue"} won!`, width / 2, w / 2);
    }
    noLoop();
  }

  // Add this at the end of your draw function
  textSize(54);
  fill(0); // Black text color
  noStroke();
  if (win == 0) {
    // Only show "turn" text when game is ongoing
    if (player == 1) {
      fill("blue");
      text("Blue's turn", width / 3.3, 70);
    } else if (player == 2) {
      fill("red");
      text("Red's turn", width / 3.3, 70);
    }
  }
}

function keyPressed() {
  if (win != 0) {
    return;
  }

  if (keyCode === LEFT_ARROW) {
    playerPos = 0;
  } else if (keyCode === UP_ARROW) {
    playerPos = 1;
  } else if (keyCode === DOWN_ARROW) {
    playerPos = 2;
  } else if (keyCode === RIGHT_ARROW) {
    playerPos = 3;
  } else if (keyCode === 68) {
    // 'D' key
    playerPos = 4;
  } else if (keyCode === 87) {
    // 'W' key
    playerPos = 6;
  } else if (keyCode == 65) {
    // 'A' key
    playerPos = 5;
  } else {
    return;
  }

  if (board[0][playerPos] != 0) {
    win = 4;
  }

  board[0][playerPos] = player;
  let i = 0;
  while (true) {
    if (i >= rows - 1) {
      break;
    }
    if (board[i + 1][playerPos] != 0) {
      //editor.p5js.org/Tien9702/sketches
      https: break;
    }
    [board[i + 1][playerPos], board[i][playerPos]] = [
      board[i][playerPos],
      board[i + 1][playerPos],
    ];
    i++;
  }

  if (hasWon()) {
    win = player;
  } else {
    let drop = true;
    for (let i = 0; i < cols; i++) {
      if (board[rows - 1][i] == 0) {
        drop = false;
      }
    }
    //This is the part that make the rectangles cleared when the row is filled
    // if (drop) {
    //   for (let j = rows-2; j >= 0; j--) {
    //     for (let i = 0; i < cols; i++) {
    //       board[j+1][i] = board[j][i];
    //     }
    //   }
    //   for (let i = 0; i < cols; i++) {
    //     board[0][i] = 0;
    //   }
    // }
  }

  player = 3 - player;
}

// Function to draw a star
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
