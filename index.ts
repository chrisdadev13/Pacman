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

  static width = 40;
  static height = 40;

  constructor(position: Position) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
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
  ["-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-"],
];

let blocks: Array<Boundary> = [];

const player = new Player(
  {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  { x: 0, y: 0 }
);

player.draw();

mapping.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-": {
        blocks.push(
          new Boundary({
            x: Boundary.width * j,
            y: Boundary.height * i,
          })
        );
        break;
      }
    }
  });
});

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach((block) => {
    block.draw();
    if (
      player.position.y - player.radius + player.velocity.y <=
        block.position.y + block.height &&
      player.position.x + player.radius + player.velocity.x >=
        block.position.x &&
      player.position.y + player.radius + player.velocity.y >=
        block.position.y &&
      player.position.x - player.radius + player.velocity.x <=
        player.position.x + block.width
    ) {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });

  player.move();
  player.velocity.x = 0;
  player.velocity.y = 0;

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
