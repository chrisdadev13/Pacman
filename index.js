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
        c === null || c === void 0 ? void 0 : c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    return Boundary;
}());
