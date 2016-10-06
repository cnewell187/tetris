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
var xMid = 12;
var gameHeight = 460;
var gameWidth = 460;
var defaultSpeed = 65;
var currentSpeed = 65;
var teeState = "TransA"

var rightLegPos = [{
    x: xMid,
    y: 2
}, {
    x: xMid,
    y: 1
}, {
    x: xMid,
    y: 0
}, {
    x: xMid - 1,
    y: 2
}, ];

var leftLegPos = [{
    x: xMid,
    y: 2
}, {
    x: xMid,
    y: 1
}, {
    x: xMid,
    y: 0
}, {
    x: xMid + 1,
    y: 2
}, ];

var squarePos = [{
    x: xMid,
    y: 1
}, {
    x: xMid + 1,
    y: 1
}, {
    x: xMid + 1,
    y: 0
}, {
    x: xMid,
    y: 0
}, ];

var zigPos = [{
    x: xMid,
    y: 1
}, {
    x: xMid + 1,
    y: 1
}, {
    x: xMid + 1,
    y: 0
}, {
    x: xMid,
    y: 2
}, ];

var zagPos = [{
    x: xMid,
    y: 1
}, {
    x: xMid - 1,
    y: 1
}, {
    x: xMid - 1,
    y: 0
}, {
    x: xMid,
    y: 2
}, ];

var longPos = [{
    x: xMid,
    y: 1
}, {
    x: xMid - 1,
    y: 1
}, {
    x: xMid + 1,
    y: 1
}, {
    x: xMid + 2,
    y: 1
}, ];

var teePos = [{
    x: xMid,
    y: 1
}, {
    x: xMid - 1,
    y: 1
}, {
    x: xMid + 1,
    y: 1
}, {
    x: xMid,
    y: 0
}, ];

var fallenBlocks = [{
    x: xMid,
    y: 22,
}, {
    x: xMid + 1,
    y: 22,
}, {
    x: xMid - 1,
    y: 22,
}, ];

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
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    for (var i = 0; i < fallenBlocks.length; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(fallenBlocks[i].x * blockSize, fallenBlocks[i].y * blockSize, blockSize, blockSize);
    };
}

function fall() {

    //

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
        if (event.keyCode == 39) {
            // moves right
            for (var i = 0; i < activeSquare.position.length; i++) {
                activeSquare.position[i].x++
            }
            landScape();
            activeSquare.render();
            activeSquare.collision();

        }
        if (event.keyCode == 37) {
            // moves left
            for (var i = 0; i < activeSquare.position.length; i++) {
                activeSquare.position[i].x--
            }
            landScape();
            activeSquare.render();
            activeSquare.collision();

        }
        if (event.keyCode == 40) {
            // moves down
            for (var i = 0; i < activeSquare.position.length; i++) {
                activeSquare.position[i].y++
            }
            landScape();
            activeSquare.render();
            activeSquare.collision();
        }

        if (event.keyCode == 38) {
            rotate();

            // switch (activeSquare.state) {
            //
            //     case "TransA":
            //
            //         activeSquare.position[1].x = activeSquare.position[0].x + 1
            //         activeSquare.position[1].y = activeSquare.position[0].y
            //
            //         activeSquare.position[2].x = activeSquare.position[0].x
            //         activeSquare.position[2].y = activeSquare.position[0].y + 1
            //
            //         activeSquare.position[3].x = activeSquare.position[0].x
            //         activeSquare.position[3].y = activeSquare.position[0].y - 1
            //         activeSquare.state = "TransB"
            //         landScape();
            //         activeSquare.render();
            //         activeSquare.collision();
            //         break;
            //
            //     case "TransB":
            //         activeSquare.position[1].x = activeSquare.position[0].x
            //         activeSquare.position[1].y = activeSquare.position[0].y + 1
            //
            //         activeSquare.position[2].x = activeSquare.position[0].x - 1
            //         activeSquare.position[2].y = activeSquare.position[0].y
            //
            //         activeSquare.position[3].x = activeSquare.position[0].x + 1
            //         activeSquare.position[3].y = activeSquare.position[0].y
            //         activeSquare.state = "TransC"
            //         landScape();
            //         activeSquare.render();
            //         activeSquare.collision();
            //         break;
            //     case "TransC":
            //         activeSquare.position[1].x = activeSquare.position[0].x - 1
            //         activeSquare.position[1].y = activeSquare.position[0].y
            //
            //         activeSquare.position[2].x = activeSquare.position[0].x
            //         activeSquare.position[2].y = activeSquare.position[0].y - 1
            //
            //         activeSquare.position[3].x = activeSquare.position[0].x
            //         activeSquare.position[3].y = activeSquare.position[0].y + 1
            //         activeSquare.state = "TransD"
            //         landScape();
            //         activeSquare.render();
            //         activeSquare.collision();
            //         break;
            //     case "TransD":
            //         activeSquare.position[1].x = activeSquare.position[0].x
            //         activeSquare.position[1].y = activeSquare.position[0].y - 1
            //
            //         activeSquare.position[2].x = activeSquare.position[0].x + 1
            //         activeSquare.position[2].y = activeSquare.position[0].y
            //
            //         activeSquare.position[3].x = activeSquare.position[0].x - 1
            //         activeSquare.position[3].y = activeSquare.position[0].y
            //         activeSquare.state = "TransA"
            //         landScape();
            //         activeSquare.render();
            //         activeSquare.collision();
            //         break;
            // }

        }
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
            landScape();
            activeSquare.render();
            activeSquare.collision();
            break;

        case "TransB":
            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y + 1

            activeSquare.position[2].x = activeSquare.position[0].x - 1
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x + 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransC"
            landScape();
            activeSquare.render();
            activeSquare.collision();
            break;
        case "TransC":
            activeSquare.position[1].x = activeSquare.position[0].x - 1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y - 1

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y + 1
            activeSquare.state = "TransD"
            landScape();
            activeSquare.render();
            activeSquare.collision();
            break;
        case "TransD":
            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y - 1

            activeSquare.position[2].x = activeSquare.position[0].x + 1
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x - 1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransA"
            landScape();
            activeSquare.render();
            activeSquare.collision();
            break;
    }

};

function rotateLong() {
    switch (activeSquare.state) {

        case "TransA":

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y+1

            activeSquare.position[2].x = activeSquare.position[0].x
            activeSquare.position[2].y = activeSquare.position[0].y+2

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y-1
            activeSquare.state = "TransB"
            landScape();
            activeSquare.render();
            activeSquare.collision();
            break;

        case "TransB":
            activeSquare.position[1].x = activeSquare.position[0].x+1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x+2
            activeSquare.position[2].y = activeSquare.position[0].y

            activeSquare.position[3].x = activeSquare.position[0].x-1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransA"
            landScape();
            activeSquare.render();
            activeSquare.collision();
            break;

    }

};

function rotateZig() {
    switch (activeSquare.state) {

        case "TransA":

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y-1

            activeSquare.position[2].x = activeSquare.position[0].x-1
            activeSquare.position[2].y = activeSquare.position[0].y-1

            activeSquare.position[3].x = activeSquare.position[0].x+1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransB"
            landScape();
            activeSquare.render();
            activeSquare.collision();
            break;

        case "TransB":
        activeSquare.position[1].x = activeSquare.position[0].x+1
        activeSquare.position[1].y = activeSquare.position[0].y

        activeSquare.position[2].x = activeSquare.position[0].x+1
        activeSquare.position[2].y = activeSquare.position[0].y-1

        activeSquare.position[3].x = activeSquare.position[0].x
        activeSquare.position[3].y = activeSquare.position[0].y+1
            activeSquare.state = "TransA"
            landScape();
            activeSquare.render();
            activeSquare.collision();
            break;

    }

};

function rotateZag() {
    switch (activeSquare.state) {

        case "TransA":

            activeSquare.position[1].x = activeSquare.position[0].x
            activeSquare.position[1].y = activeSquare.position[0].y-1

            activeSquare.position[2].x = activeSquare.position[0].x+1
            activeSquare.position[2].y = activeSquare.position[0].y-1

            activeSquare.position[3].x = activeSquare.position[0].x-1
            activeSquare.position[3].y = activeSquare.position[0].y
            activeSquare.state = "TransB"
            landScape();
            activeSquare.render();
            activeSquare.collision();
            break;

        case "TransB":
            activeSquare.position[1].x = activeSquare.position[0].x-1
            activeSquare.position[1].y = activeSquare.position[0].y

            activeSquare.position[2].x = activeSquare.position[0].x-1
            activeSquare.position[2].y = activeSquare.position[0].y-1

            activeSquare.position[3].x = activeSquare.position[0].x
            activeSquare.position[3].y = activeSquare.position[0].y+1
            activeSquare.state = "TransA"
            landScape();
            activeSquare.render();
            activeSquare.collision();
            break;

    }

};




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
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position[i].x * blockSize, this.position[i].y * blockSize, blockSize, blockSize);
        };
    }

    this.fall = fall;
    this.control = control;

    this.collision = function() {
        for (var i = 0; i < this.position.length; i++) {
            for (var j = 0; j < fallenBlocks.length; j++)
                if ((this.position[i].y === fallenBlocks[j].y - 1 &&
                        this.position[i].x === fallenBlocks[j].x) ||
                    (this.position[i].y === 22)) {
                    this.active = false;
                    //teeState = "TransA"
                    //activeSquare = blockCreate(tee);
                    for (var k = 0; k < this.position.length; k++) {
                        fallenBlocks.push(this.position[k]);
                    }
                    return this;
                }
        };


    }

    return this;
}

var activeSquare = blockCreate(tee);

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
        var rando = random7int();
        console.log(rando);
        activeSquare = blockCreate(shapeArray[rando - 1]);

    }

}



function play() {
    landScape();
    setInterval(function() {
        update();
    }, 10)
}
