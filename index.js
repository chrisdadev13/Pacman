var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var canvas = document.querySelector("canvas");
var scoreEl = document.querySelector("#score");
var score = 0;
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
    function Player(position, velocity, color) {
        if (color === void 0) { color = "yellow"; }
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.color = color;
    }
    Player.prototype.draw = function () {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
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
var Ghost = /** @class */ (function () {
    function Ghost(position, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.prevCollisions = [];
        this.speed = Ghost.speed;
    }
    Ghost.prototype.draw = function () {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "red";
        c.fill();
        c.closePath();
    };
    Ghost.prototype.move = function () {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    };
    Ghost.speed = 2;
    return Ghost;
}());
var Pellet = /** @class */ (function () {
    function Pellet(position) {
        this.position = position;
        this.radius = 3;
    }
    Pellet.prototype.draw = function () {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "white";
        c.fill();
        c.closePath();
    };
    return Pellet;
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
var pellets = [];
var ghosts = [
    new Ghost({
        x: Boundary.width * 7 + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    }, { x: Ghost.speed, y: 0 }),
];
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
            case ".": {
                pellets.push(new Pellet({
                    x: j * Boundary.width + Boundary.width / 2,
                    y: i * Boundary.height + Boundary.height / 2
                }));
                break;
            }
        }
    });
});
function characterCollideWithBlock(character, position, velocity, block) {
    var padding = Boundary.width / 2 - character.radius - 1;
    return (position.y - character.radius + velocity.y <=
        block.position.y + block.height + padding &&
        position.x + character.radius + velocity.x >= block.position.x - padding &&
        position.y + character.radius + velocity.y >= block.position.y - padding &&
        position.x - character.radius + velocity.x <=
            block.position.x + block.width + padding);
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (keys.up.pressed && lastKey === "up") {
        blocks.forEach(function (block) {
            if (characterCollideWithBlock(player, player.position, player.velocity, block)) {
                player.velocity.y = 0;
            }
            else {
                player.velocity.y = -5;
            }
        });
    }
    else if (keys.right.pressed && lastKey == "right") {
        blocks.forEach(function (block) {
            if (characterCollideWithBlock(player, player.position, player.velocity, block)) {
                player.velocity.x = 0;
            }
            else {
                player.velocity.x = 5;
            }
        });
    }
    else if (keys.down.pressed && lastKey == "down") {
        blocks.forEach(function (block) {
            if (characterCollideWithBlock(player, player.position, player.velocity, block)) {
                player.velocity.y = 0;
            }
            else {
                player.velocity.y = +5;
            }
        });
    }
    else if (keys.left.pressed && lastKey == "left") {
        blocks.forEach(function (block) {
            if (characterCollideWithBlock(player, player.position, player.velocity, block)) {
                player.velocity.x = 0;
            }
            else {
                player.velocity.x = -5;
            }
        });
    }
    pellets.forEach(function (pellet, i) {
        pellet.draw();
        if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) <
            pellet.radius + player.radius) {
            pellets.splice(i, 1);
            score += 10;
            scoreEl.innerHTML = score.toString();
        }
    });
    blocks.forEach(function (block) {
        block.draw();
        if (characterCollideWithBlock(player, player.position, player.velocity, block)) {
            player.velocity.x = 0;
            player.velocity.y = 0;
        }
    });
    player.move();
    ghosts.forEach(function (ghost) {
        ghost.move();
        var collisions = [];
        blocks.forEach(function (block) {
            if (!collisions.includes("right") &&
                characterCollideWithBlock(ghost, ghost.position, __assign(__assign({}, ghost.velocity), { x: Ghost.speed, y: 0 }), block)) {
                collisions.push("right");
            }
            if (!collisions.includes("left") &&
                characterCollideWithBlock(ghost, ghost.position, __assign(__assign({}, ghost.velocity), { x: -Ghost.speed, y: 0 }), block)) {
                collisions.push("left");
            }
            if (!collisions.includes("up") &&
                characterCollideWithBlock(ghost, ghost.position, __assign(__assign({}, ghost.velocity), { x: 0, y: -Ghost.speed }), block)) {
                collisions.push("up");
            }
            if (!collisions.includes("down") &&
                characterCollideWithBlock(ghost, ghost.position, __assign(__assign({}, ghost.velocity), { x: 0, y: Ghost.speed }), block)) {
                collisions.push("down");
            }
        });
        if (collisions.length > ghost.prevCollisions.length) {
            ghost.prevCollisions = collisions;
            console.log(ghost.prevCollisions);
            console.log(JSON.stringify(collisions));
            console.log(JSON.stringify(ghost.prevCollisions));
        }
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            console.log("googog");
            console.log(ghost.prevCollisions);
            console.log(collisions);
            if (ghost.velocity.x > 0) {
                ghost.prevCollisions.push("right");
            }
            else if (ghost.velocity.x < 0) {
                ghost.prevCollisions.push("left");
            }
            else if (ghost.velocity.y < 0) {
                ghost.prevCollisions.push("up");
            }
            else if (ghost.velocity.y > 0) {
                ghost.prevCollisions.push("down");
            }
            var pathways = ghost.prevCollisions.filter(function (collision) {
                return !collisions.includes(collision);
            });
            console.log(pathways);
            var direction = pathways[Math.floor(Math.random() * pathways.length)];
            console.log(direction);
            switch (direction) {
                case "down":
                    ghost.velocity.y = Ghost.speed;
                    ghost.velocity.x = 0;
                    break;
                case "up":
                    ghost.velocity.y = -Ghost.speed;
                    ghost.velocity.x = 0;
                    break;
                case "right":
                    ghost.velocity.y = 0;
                    ghost.velocity.x = Ghost.speed;
                    break;
                case "left":
                    ghost.velocity.y = 0;
                    ghost.velocity.x = -Ghost.speed;
                    break;
            }
            ghost.prevCollisions = [];
        }
    });
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
