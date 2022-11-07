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
    this.radius = 10;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }
}

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

blocks.forEach((block) => {
  block.draw();
});
