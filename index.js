var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
var Boundary = /** @class */ (function () {
    function Boundary(position) {
        this.position = position;
        this.width = 40;
        this.height = 40;
    }
    Boundary.prototype.draw = function () {
        c.fillStyle = "blue";
        c.fillRect(this.position.y, this.position.x, this.width, this.height);
    };
    return Boundary;
}());
var mapping = [
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", " ", " ", " ", " ", " ", "-"],
    ["-", " ", " ", " ", " ", " ", "-"],
    ["-", " ", " ", " ", " ", " ", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
];
var blocks = [];
mapping.forEach(function (row, i) {
    row.forEach(function (symbol, j) {
        switch (symbol) {
            case "-": {
                blocks.push(new Boundary({ x: 40 + j, y: 40 }));
                break;
            }
        }
    });
});
blocks.forEach(function (block) {
    block.draw();
});
console.log(blocks);
