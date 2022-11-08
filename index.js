var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
var Boundary = /** @class */ (function () {
    function Boundary(position, image) {
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image;
    }
    Boundary.prototype.draw = function () {
        //c.fillStyle = "blue";
        //c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.drawImage(this.image, this.position.x, this.position.y);
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
var blocks = [];
var player = new Player({
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2
}, { x: 0, y: 0 });
player.draw();
function createSprite(src) {
    var sprite = new Image();
    sprite.src = src;
    return sprite;
}
mapping.forEach(function (row, i) {
    row.forEach(function (symbol, j) {
        switch (symbol) {
            case "-": {
                blocks.push(new Boundary({
                    x: Boundary.width * j,
                    y: Boundary.height * i
                }, createSprite("./assets/pipeHorizontal.png")));
                break;
            }
            case "|": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/pipeVertical.png")));
                break;
            }
            case "1": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/pipeCorner1.png")));
                break;
            }
            case "2": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/pipeCorner2.png")));
                break;
            }
            case "3": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/pipeCorner3.png")));
                break;
            }
            case "4": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/pipeCorner4.png")));
                break;
            }
            case "b": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/block.png")));
                break;
            }
            case "[": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/capLeft.png")));
                break;
            }
            case "]": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/capRight.png")));
                break;
            }
            case "_": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/capBottom.png")));
                break;
            }
            case "^": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/capTop.png")));
                break;
            }
            case "+": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/pipeCross.png")));
                break;
            }
            case "5": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/pipeConnectorTop.png")));
                break;
            }
            case "6": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/pipeConnectorRight.png")));
                break;
            }
            case "7": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/pipeConnectorBottom.png")));
                break;
            }
            case "8": {
                blocks.push(new Boundary({ x: Boundary.width * j, y: Boundary.height * i }, createSprite("./assets/pipeConnectorLeft.png")));
                break;
            }
        }
    });
});
var test = new Boundary({ x: 3, y: 3 }, createSprite("./assets/pipeHorizontal.png"));
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
