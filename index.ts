const canvas = document.querySelector("canvas") as HTMLCanvasElement;

const c = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = innerWidth;
canvas.height = innerHeight;

type Position = {
  x: number;
  y: number;
};

type Velocity = {
  x: number;
  y: number;
};

class Boundary {
  position: Position;
  width: number;
  height: number;
  image: CanvasImageSource;

  static width = 40;
  static height = 40;

  constructor(position: Position, image: CanvasImageSource) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  draw() {
    //c.fillStyle = "blue";
    //c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Player {
  position: Position;
  velocity: Velocity;
  radius: number;

  constructor(position: Position, velocity: Velocity) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }

  move() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }
}

class Pellet {
  position: Position;
  radius: number;
  constructor(position: Position) {
    this.position = position;
    this.radius = 3;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "white";
    c.fill();
    c.closePath();
  }
}

let keys = {
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let lastKey: string;

const mapping = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

let blocks: Array<Boundary> = [];
let pellets: Array<Pellet> = [];
const player = new Player(
  {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  { x: 0, y: 0 }
);

player.draw();

function createSprite(src: string) {
  const sprite = new Image();
  sprite.src = src;
  return sprite;
}

mapping.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-": {
        blocks.push(
          new Boundary(
            {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            createSprite("./assets/pipeHorizontal.png")
          )
        );
        break;
      }
      case "|": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/pipeVertical.png")
          )
        );
        break;
      }
      case "1": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/pipeCorner1.png")
          )
        );
        break;
      }
      case "2": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/pipeCorner2.png")
          )
        );
        break;
      }
      case "3": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/pipeCorner3.png")
          )
        );
        break;
      }
      case "4": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/pipeCorner4.png")
          )
        );
        break;
      }
      case "b": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/block.png")
          )
        );
        break;
      }
      case "[": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/capLeft.png")
          )
        );
        break;
      }
      case "]": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/capRight.png")
          )
        );
        break;
      }
      case "_": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/capBottom.png")
          )
        );
        break;
      }
      case "^": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/capTop.png")
          )
        );
        break;
      }
      case "+": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/pipeCross.png")
          )
        );
        break;
      }
      case "5": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/pipeConnectorTop.png")
          )
        );
        break;
      }
      case "6": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/pipeConnectorRight.png")
          )
        );
        break;
      }
      case "7": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/pipeConnectorBottom.png")
          )
        );
        break;
      }
      case "8": {
        blocks.push(
          new Boundary(
            { x: Boundary.width * j, y: Boundary.height * i },
            createSprite("./assets/pipeConnectorLeft.png")
          )
        );
        break;
      }
      case ".": {
        pellets.push(
          new Pellet({
            x: j * Boundary.width + Boundary.width / 2,
            y: i * Boundary.height + Boundary.height / 2,
          })
        );
        break;
      }
    }
  });
});

const test = new Boundary(
  { x: 3, y: 3 },
  createSprite("./assets/pipeHorizontal.png")
);

function characterCollideWithBlock(player: Player, block: Boundary) {
  return (
    player.position.y - player.radius + player.velocity.y <=
      block.position.y + block.height &&
    player.position.x + player.radius + player.velocity.x >= block.position.x &&
    player.position.y + player.radius + player.velocity.y >= block.position.y &&
    player.position.x - player.radius + player.velocity.x <=
      block.position.x + block.width
  );
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  pellets.forEach((pellet) => {
    pellet.draw();
  });
  blocks.forEach((block) => {
    block.draw();
    if (characterCollideWithBlock(player, block)) {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });
  player.move();

  if (keys.up.pressed && lastKey === "up") {
    player.velocity.y = -5;
  } else if (keys.down.pressed && lastKey === "down") {
    player.velocity.y = 5;
  } else if (keys.right.pressed && lastKey === "right") {
    player.velocity.x = 5;
  } else if (keys.left.pressed && lastKey === "left") {
    player.velocity.x = -5;
  }
}

animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowUp": {
      keys.up.pressed = true;
      lastKey = "up";
      break;
    }
    case "ArrowDown": {
      keys.down.pressed = true;
      lastKey = "down";
      break;
    }
    case "ArrowRight": {
      keys.right.pressed = true;
      lastKey = "right";
      break;
    }
    case "ArrowLeft": {
      keys.left.pressed = true;
      lastKey = "left";
      break;
    }
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "ArrowUp": {
      keys.up.pressed = false;
      break;
    }
    case "ArrowDown": {
      keys.down.pressed = false;
      break;
    }
    case "ArrowRight": {
      keys.right.pressed = false;
      break;
    }
    case "ArrowLeft": {
      keys.left.pressed = false;
      break;
    }
  }
});
