const canvas = document.querySelector("canvas") as HTMLCanvasElement;

const c = canvas.getContext("2d");

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
    c?.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
