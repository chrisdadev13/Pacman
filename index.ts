const canvas = document.querySelector("canvas") as HTMLCanvasElement;

const c = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = innerWidth;
canvas.height = innerHeight;

type Position = {
  x: number;
  y: number;
};

class Boundary {
  position: Position;
  width: number;
  height: number;

  constructor(position: Position) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.y, this.position.x, this.width, this.height);
  }
}

const mapping = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

let blocks: Array<Boundary> = [];

mapping.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-": {
        blocks.push(new Boundary({ x: 40 + j, y: 40 }));
        break;
      }
    }
  });
});

blocks.forEach((block) => {
  block.draw();
});
