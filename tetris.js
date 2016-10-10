var score = 0;
var long;
var tee;
var zig;
var zag;
var rightLeg;
var leftLeg;
var square;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var blockSize = 20;
var xMid = 11;
var gameHeight = 460;
var gameWidth = 460;
var defaultSpeed = 65;
var currentSpeed = 80;
var teeState = "TransA"

var rightLegPos = [{
    x: xMid,
    y: 2,
    color: '#059B9F',
}, {
    x: xMid,
    y: 1,
    color: '#059B9F',
}, {
    x: xMid,
    y: 0,
    color: '#059B9F',
}, {
    x: xMid - 1,
    y: 2,
    color: '#059B9F',
}, ];

var leftLegPos = [{
    x: xMid,
    y: 2,
    color: '#ff1493',
}, {
    x: xMid,
    y: 1,
    color: '#ff1493',
}, {
    x: xMid,
    y: 0,
    color: '#ff1493',
}, {
    x: xMid + 1,
    y: 2,
    color: '#ff1493',
}, ];

var squarePos = [{
    x: xMid,
    y: 1,
    color: 'orange',
}, {
    x: xMid + 1,
    y: 1,
    color: 'orange',
}, {
    x: xMid + 1,
    y: 0,
    color: 'orange',
}, {
    x: xMid,
    y: 0,
    color: 'orange',
}, ];

var zigPos = [{
    x: xMid,
    y: 1,
    color: 'green',
}, {
    x: xMid + 1,
    y: 1,
    color: 'green',
}, {
    x: xMid + 1,
    y: 0,
    color: 'green',
}, {
    x: xMid,
    y: 2,
    color: 'green',
}, ];

var zagPos = [{
    x: xMid,
    y: 1,
    color: 'red',
}, {
    x: xMid - 1,
    y: 1,
    color: 'red',
}, {
    x: xMid - 1,
    y: 0,
    color: 'red',
}, {
    x: xMid,
    y: 2,
    color: 'red',
}, ];

var longPos = [{
    x: xMid,
    y: 1,
    color: 'blue',
}, {
    x: xMid - 1,
    y: 1,
    color: 'blue',
}, {
    x: xMid + 1,
    y: 1,
    color: 'blue',
}, {
    x: xMid + 2,
    y: 1,
    color: 'blue',
}, ];

var teePos = [{
    x: xMid,
    y: 1,
    color: 'purple',
}, {
    x: xMid - 1,
    y: 1,
    color: 'purple',
}, {
    x: xMid + 1,
    y: 1,
    color: 'purple',
}, {
    x: xMid,
    y: 0,
    color: 'purple',
}, ];

var fallenBlocks = [{}, ];

tee = {
    name: 'tee',
    color: 'purple',
    state: "TransA",
    position: JSON.parse(JSON.stringify(teePos)),
};

long = {
    name: 'long',
    color: 'blue',
    state: "TransA",
    position: JSON.parse(JSON.stringify(longPos)),
};
zig = {
    name: "zig",
    color: 'green',
    state: "TransA",
    position: JSON.parse(JSON.stringify(zigPos)),
};
zag = {
    name: "zag",
    color: 'red',
    state: "TransA",
    position: JSON.parse(JSON.stringify(zagPos)),
};
rightLeg = {
    name: "rightLeg",
    color: '#059B9F',
    state: "TransA",
    position: JSON.parse(JSON.stringify(rightLegPos)),
};
leftLeg = {
    name: "leftLeg",
    color: '#ff1493',
    state: "TransA",
    position: JSON.parse(JSON.stringify(leftLegPos)),
};
square = {
    name: "square",
    color: 'orange',
    state: "TransA",
    position: JSON.parse(JSON.stringify(squarePos)),
};

var shapeArray = [JSON.parse(JSON.stringify(tee)), JSON.parse(JSON.stringify(long)),
    JSON.parse(JSON.stringify(zig)), JSON.parse(JSON.stringify(zag)), JSON.parse(JSON.stringify(rightLeg)),
    JSON.parse(JSON.stringify(leftLeg)), JSON.parse(JSON.stringify(square))
];

function random7int() {
    return Math.floor(Math.random() * (7 - 1 + 1)) + 1;
}

function landScape() {
    // background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    //side walls
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, 120, 460)
    // ctx.fillRect(320, 0, 140, 460)
    var grd = ctx.createLinearGradient(0, 460, 0, 0);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "gray");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 120, 460)
    ctx.fillRect(320, 0, 140, 460)


    ctx.fillStyle = "black";
    ctx.fillRect(17 * blockSize - 1, 1 * blockSize - 1, blockSize * 6, blockSize * 5);
    ctx.fillStyle = "white";
    ctx.fillRect(17 * blockSize, 1 * blockSize, blockSize * 6 - 2, blockSize * 5 - 2);
    ctx.fillStyle = "black";
    ctx.font = "20px Georgia";
    ctx.fillText("Score: " + score, 370, 160);

    for (var i = 0; i < nextShape.position.length; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect((nextShape.position[i].x + 8) * blockSize, (nextShape.position[i].y + 2) * blockSize, blockSize, blockSize);
        ctx.fillStyle = nextShape.color;
        ctx.fillRect((nextShape.position[i].x + 8) * blockSize, (nextShape.position[i].y + 2) * blockSize, blockSize - 1, blockSize - 1);
    };

    blockClearCheck();

    for (var i = 0; i < fallenBlocks.length; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(fallenBlocks[i].x * blockSize, fallenBlocks[i].y * blockSize, blockSize, blockSize);
        ctx.fillStyle = fallenBlocks[i].color;
        ctx.fillRect(fallenBlocks[i].x * blockSize, fallenBlocks[i].y * blockSize, blockSize - 1, blockSize - 1);
    };
}

function fall() {

    if (this.speed === this.go)
        for (var i = 0; i < this.position.length; i++) {
            this.position[i].y++
                this.speed = currentSpeed;
        }
    else {
        this.speed++;
    }
}

function control() {

    document.onkeydown = function(event) {
        if (event.keyCode == 39 && activeSquare.active === true) {
            // moves right

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x >= 15) {
                    return;
                }
                for (var j = 0; j < fallenBlocks.length; j++) {
                    if (activeSquare.position[i].x === fallenBlocks[j].x - 1 &&
                        activeSquare.position[i].y === fallenBlocks[j].y) {
                        return;
                    }
                }
            };
            for (var i = 0; i < activeSquare.position.length; i++) {
                activeSquare.position[i].x++
            }

        }
        if (event.keyCode == 37 && activeSquare.active === true) {
            // moves left

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x <= 6) {
                    return;
                }
                for (var j = 0; j < fallenBlocks.length; j++) {
                    if (activeSquare.position[i].x === fallenBlocks[j].x + 1 &&
                        activeSquare.position[i].y === fallenBlocks[j].y) {
                        return;
                    }
                }
            };
            for (var i = 0; i < activeSquare.position.length; i++) {
                activeSquare.position[i].x--
            }

        }
        if (event.keyCode == 40 && activeSquare.active === true) {
            // moves down
            for (var i = 0; i < activeSquare.position.length; i++) {
                activeSquare.position[i].y++
            }
        }

        if (event.keyCode == 38 && activeSquare.active === true) {
            rotate();

        }

        landScape();
        activeSquare.render();

    }
}

function rotate() {
    switch (activeSquare.name) {
        case "tee":
            rotateTee();
            break;
        case "long":
            rotateLong();
            break;
        case "zig":
            rotateZig();
            break;
        case "zag":
            rotateZag();
            break;
        case "square":
            break;
        case "leftLeg":
            rotateLeftLeg();
            break;
        case "rightLeg":
            rotateRightLeg();
            break;
    }


};

function rotateTee() {
    switch (activeSquare.state) {

        case "TransA":



            activeSquare.position[1].x = activeSquare.position[0].x + 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y + 1

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y - 1
            activeSquare.state = "TransB"




            break;

        case "TransB":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 6) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x + 1;
                    }
                    break;
                }
            }
            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y + 1

            activeSquare.position[2].x = activeSquare.position[0].x - 1
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x + 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransC"




            break;
        case "TransC":
            activeSquare.position[1].x = activeSquare.position[0].x - 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransD"




            break;
        case "TransD":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 15) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x - 1;
                    }
                    break;
                }
            }
            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x + 1
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransA"




            break;
    }

};

function rotateLeftLeg() {
    switch (activeSquare.state) {

        case "TransA":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 6) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x + 1;
                    }
                    break;
                }
            }

            activeSquare.position[0].x = activeSquare.position[0].x - 1
            activeSquare.position[0].y = activeSquare.position[0].y - 1

            activeSquare.position[1].x = activeSquare.position[0].x + 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x + 2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransB"




            console.log("Trans to B")
            break;

        case "TransB":
            activeSquare.position[0].x = activeSquare.position[0].x + 1
            activeSquare.position[0].y = activeSquare.position[0].y - 1


            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y + 1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y + 2

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransC"




            console.log("Trans to C")
            break;
        case "TransC":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 15) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x - 1;
                    }
                    break;
                }
            }
            activeSquare.position[0].x = activeSquare.position[0].x + 1
            activeSquare.position[0].y = activeSquare.position[0].y + 1

            activeSquare.position[1].x = activeSquare.position[0].x - 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x - 2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y - 1
            activeSquare.state = "TransD"




            console.log("Trans to D")
            break;
        case "TransD":
            activeSquare.position[0].x = activeSquare.position[0].x - 1
            activeSquare.position[0].y = activeSquare.position[0].y + 1

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y - 2

            activeSquare.position[3].x = activeSquare.position[0].x + 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransA"




            console.log("Trans to A")
            break;
    }

};

function rotateRightLeg() {
    switch (activeSquare.state) {

        case "TransA":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 15) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x - 1;
                    }
                    break;
                }
            }

            activeSquare.position[0].x = activeSquare.position[0].x - 1
            activeSquare.position[0].y = activeSquare.position[0].y - 1

            activeSquare.position[1].x = activeSquare.position[0].x + 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x + 2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y - 1
            activeSquare.state = "TransB"




            console.log("Trans to B")
            break;

        case "TransB":
            activeSquare.position[0].x = activeSquare.position[0].x + 1
            activeSquare.position[0].y = activeSquare.position[0].y - 1


            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y + 1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y + 2

            activeSquare.position[3].x = activeSquare.position[0].x + 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransC"




            console.log("Trans to C")
            break;
        case "TransC":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 6) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x + 1;
                    }
                    break;
                }
            }
            activeSquare.position[0].x = activeSquare.position[0].x + 1
            activeSquare.position[0].y = activeSquare.position[0].y + 1

            activeSquare.position[1].x = activeSquare.position[0].x - 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x - 2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransD"




            console.log("Trans to D")
            break;
        case "TransD":
            activeSquare.position[0].x = activeSquare.position[0].x - 1
            activeSquare.position[0].y = activeSquare.position[0].y + 1

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y - 2

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransA"




            console.log("Trans to A")
            break;
    }

};


function rotateLong() {
    switch (activeSquare.state) {

        case "TransA":

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y + 1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y + 2

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y - 1
            activeSquare.state = "TransB"




            break;

        case "TransB":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 6) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x + 1;
                    }
                    break;
                }
            }

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 15) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x - 2;
                    }
                    break;
                }
            }
            activeSquare.position[1].x = activeSquare.position[0].x + 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x + 2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransA"




            break;

    }

};

function rotateZig() {
    switch (activeSquare.state) {

        case "TransA":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 6) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x + 1;
                    }
                    break;
                }
            }

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x - 1
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x + 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransB"




            break;

        case "TransB":
            activeSquare.position[1].x = activeSquare.position[0].x + 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x + 1
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransA"




            break;

    }

};

function rotateZag() {
    switch (activeSquare.state) {

        case "TransA":

            for (var i = 0; i < activeSquare.position.length; i++) {
                if (activeSquare.position[i].x === 15) {
                    for (var i = 0; i < activeSquare.position.length; i++) {
                        activeSquare.position[i].x = activeSquare.position[i].x - 1;
                    }
                    break;
                }
            }

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x + 1
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransB"




            break;

        case "TransB":
            activeSquare.position[1].x = activeSquare.position[0].x - 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x - 1
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransA"




            break;

    }

};


function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function blockCreate(shapeType) {
    // var shapeCopy = Object.assign({}, shapeType)
    this.position = shapeType.position.slice(0);
    this.color = shapeType.color; //will change later
    this.speed = currentSpeed;
    this.go = 100;
    this.name = shapeType.name;
    this.state = shapeType.state;
    this.active = true;
    this.render = function() {
        for (var i = 0; i < this.position.length; i++) {
            ctx.fillStyle = "black";
            ctx.fillRect(this.position[i].x * blockSize, this.position[i].y * blockSize, blockSize, blockSize);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position[i].x * blockSize, this.position[i].y * blockSize, blockSize - 1, blockSize - 1);
        };
    }

    this.fall = fall;
    this.control = control;

    this.collision = function() {
        for (var i = 0; i < this.position.length; i++) {
            for (var j = 0; j < fallenBlocks.length; j++) {
                if ((this.position[i].y === fallenBlocks[j].y - 1 &&
                        this.position[i].x === fallenBlocks[j].x) ||
                    (this.position[i].y === 22)) {
                    this.active = false;
                    for (var k = 0; k < this.position.length; k++) {
                        fallenBlocks.push(JSON.parse(JSON.stringify(this.position[k])));
                    }
                    long.position = JSON.parse(JSON.stringify(longPos))
                    tee.position = JSON.parse(JSON.stringify(teePos))
                    zig.position = JSON.parse(JSON.stringify(zigPos))
                    zag.position = JSON.parse(JSON.stringify(zagPos))
                    square.position = JSON.parse(JSON.stringify(squarePos))
                    leftLeg.position = JSON.parse(JSON.stringify(leftLegPos))
                    rightLeg.position = JSON.parse(JSON.stringify(rightLegPos))
                        // shapeArray = [JSON.parse(JSON.stringify(tee)), JSON.parse(JSON.stringify(long)),
                        //     JSON.parse(JSON.stringify(zig)), JSON.parse(JSON.stringify(zag)), JSON.parse(JSON.stringify(rightLeg)),
                        //     JSON.parse(JSON.stringify(leftLeg)), JSON.parse(JSON.stringify(square))
                        // ];
                    return this;
                }

            }

        }

    }
    return this;
}
var rando1 = random7int();
var activeSquare = blockCreate(shapeArray[rando1 - 1]);
var rando2 = random7int();
var nextShape = shapeArray[rando2 - 1]

function update() {
    landScape();

    if (activeSquare.active === true) {
        activeSquare.render();
        activeSquare.fall();
        activeSquare.control();
        activeSquare.collision();
    } else {


        //reset shape function

        shapeArray = [JSON.parse(JSON.stringify(tee)), JSON.parse(JSON.stringify(long)),
            JSON.parse(JSON.stringify(zig)), JSON.parse(JSON.stringify(zag)), JSON.parse(JSON.stringify(rightLeg)),
            JSON.parse(JSON.stringify(leftLeg)), JSON.parse(JSON.stringify(square))
        ];


        activeSquare = blockCreate(nextShape);
        var rando = random7int();
        nextShape = shapeArray[rando - 1]

    }



}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function blockClearCheck() {

    for (var i = 22; i >= 0; i--) {
        var count = 0;
        for (var j = 0; j < fallenBlocks.length; j++) {
            if (fallenBlocks[j].y === i) {
                count++;
            }
        }
        if (count > 9) {



            for (var j = 0; j < fallenBlocks.length; j++) {
                ctx.fillStyle = "black";
                ctx.fillRect(fallenBlocks[j].x * blockSize, fallenBlocks[j].y * blockSize, blockSize, blockSize);
                ctx.fillStyle = getRandomColor();
                ctx.fillRect(fallenBlocks[j].x * blockSize, fallenBlocks[j].y * blockSize, blockSize - 1, blockSize - 1);
                console.log("WHAT IT DO!!")
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, gameWidth, gameHeight);
            }


            score = score + 10;
            // sleep(1000);
            fallenBlocks = fallenBlocks.filter(function(item) {
                return item.y != i;
            })

            for (var j = 0; j < fallenBlocks.length; j++) {

                if (fallenBlocks[j].y < i) {
                    fallenBlocks[j].y = fallenBlocks[j].y + 1;
                }
            }

            count = 0;


        }
    }
    
};




function play() {
    setInterval(function() {
        update();
    }, 10)
}
