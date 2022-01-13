var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    square = null,
    target = null,
    paused = false,
    speed = 9;

class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();

    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top  * (canvas.height / bbox.height)
    };
}

canvas.onmousedown = function (e) {
    e.preventDefault();
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    if (!paused) {
        if (e.button == 0) {
            square = new Square(loc.x, loc.y);
        }
        if (e.button == 2) {
            target = new Square(loc.x, loc.y);
        }
    }
};

canvas.oncontextmenu = function (e) {
    e.preventDefault();
}

function drawBackground() { // Ruled paper
    var STEP_Y = 12,
    TOP_MARGIN = STEP_Y * 4,
    LEFT_MARGIN = STEP_Y * 3,
    i = context.canvas.height;
    // Horizontal lines
    context.strokeStyle = 'lightgray';
    context.lineWidth = 0.5;
    while(i > TOP_MARGIN) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
        i -= STEP_Y;
    }

    // Vertical line
    context.strokeStyle = 'rgba(100,0,0,0.3)';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(LEFT_MARGIN,0);
    context.lineTo(LEFT_MARGIN,context.canvas.height);
    context.stroke();
}

function update() {
    if (square && target) {
        if (square.x == target.x && square.y == target.y) {
            target = null;
        } else {
            dx = target.x - square.x;
            dy = target.y - square.y;
            theta = Math.atan2(dy, dx);
            console.log(dx, dy, theta);
            if (dx > 0) {
                square.x = Math.min(target.x, square.x + speed * Math.cos(theta));
            }
            if (dx < 0) {
                square.x = Math.max(target.x, square.x + speed * Math.cos(theta));
            }
            if (dy > 0) {
                square.y = Math.min(target.y, square.y + speed * Math.sin(theta));
            }
            if (dy < 0) {
                square.y = Math.max(target.y, square.y + speed * Math.sin(theta));
            }
        }
    }
}

function draw() {
    if (square) {
        context.fillRect(square.x, square.y, 50, 50);
    }
    if (target) {
        context.strokeRect(target.x, target.y, 50, 50);
    }
}

function animate(time) {
    if (!paused) {
        context.clearRect(0,0,canvas.width,canvas.height);
        drawBackground();
        update();
        draw();
        window.requestNextAnimationFrame(animate);
    }
}

animateButton.onclick = function (e) {
    paused = paused ? false : true;
    if (paused) {
        animateButton.value = 'Animate';
    }
    else {
        window.requestNextAnimationFrame(animate);
        animateButton.value = 'Pause';
    }
};

// Initialization.....................................................
context.font = '48px Helvetica';
window.requestNextAnimationFrame(animate);