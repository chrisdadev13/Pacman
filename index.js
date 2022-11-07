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
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    Boundary.width = 40;
    Boundary.height = 40;
    return Boundary;
}());
var Player = /** @class */ (function () {
    function Player(position, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 10;
    }
    Player.prototype.draw = function () {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "yellow";
        c.fill();
        c.closePath();
    };
    return Player;
}());
var mapping = [
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", " ", " ", " ", " ", " ", " ", "-"],
    ["-", " ", " ", " ", " ", " ", " ", "-"],
    ["-", " ", "-", "-", "-", "-", " ", "-"],
    ["-", " ", " ", " ", " ", " ", " ", "-"],
    ["-", " ", " ", " ", " ", " ", " ", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
];
var blocks = [];
var player = new Player({
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2
}, { x: 0, y: 0 });
player.draw();
mapping.forEach(function (row, i) {
    row.forEach(function (symbol, j) {
        switch (symbol) {
            case "-": {
                blocks.push(new Boundary({
                    x: Boundary.width * j,
                    y: Boundary.height * i
                }));
                break;
            }
        }
    });
});
blocks.forEach(function (block) {
    block.draw();
});
