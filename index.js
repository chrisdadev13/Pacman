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
        this.radius = 15;
    }
    Player.prototype.draw = function () {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "yellow";
        c.fill();
        c.closePath();
    };
    Player.prototype.move = function () {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    };
    return Player;
}());
var keys = {
    up: {
        pressed: false
    },
    down: {
        pressed: false
    },
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
};
var lastKey;
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
function characterCollideWithBlock(player, block) {
    return (player.position.y - player.radius + player.velocity.y <=
        block.position.y + block.height &&
        player.position.x + player.radius + player.velocity.x >= block.position.x &&
        player.position.y + player.radius + player.velocity.y >= block.position.y &&
        player.position.x - player.radius + player.velocity.x <=
            block.position.x + block.width);
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    blocks.forEach(function (block) {
        block.draw();
        if (characterCollideWithBlock(player, block)) {
            player.velocity.x = 0;
            player.velocity.y = 0;
        }
    });
    player.move();
    if (keys.up.pressed && lastKey === "up") {
        player.velocity.y = -5;
    }
    else if (keys.down.pressed && lastKey === "down") {
        player.velocity.y = 5;
    }
    else if (keys.right.pressed && lastKey === "right") {
        player.velocity.x = 5;
    }
    else if (keys.left.pressed && lastKey === "left") {
        player.velocity.x = -5;
    }
}
animate();
addEventListener("keydown", function (_a) {
    var key = _a.key;
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
addEventListener("keyup", function (_a) {
    var key = _a.key;
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
