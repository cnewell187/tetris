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

long = [{
    x: 0,
    y: 1
}, {
    x: 1,
    y: 1
}, {
    x: 2,
    y: 1
}, {
    x: 3,
    y: 1
}, ];

var teePos = [{
    x: xMid - 1,
    y: 1
}, {
    x: xMid,
    y: 1
}, {
    x: xMid + 1,
    y: 1
}, {
    x: xMid,
    y: 0
}, ];

tee = {
  color: 'purple',
  position: teePos,
}

function landScape() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function blockCreate(shapeType) {
    this.position = shapeType.position.slice(0);
    this.color = shapeType.color; //will change later
    this.speed = 30;
    this.go = 50;
    this.active= true;
    this.render = function() {
        for (var i = 0; i < this.position.length; i++) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position[i].x * blockSize, this.position[i].y * blockSize, blockSize, blockSize);
        };
    }

    this.fall = function() {
        if ( this.speed === this.go)
            for (var i = 0; i < this.position.length; i++) {
              this.position[i].y ++
              console.log(this.position)
            }
       else{
         this.speed++;
         //console.log(this.speed);
       }
    }
    return this;
}

var activeSquare = blockCreate(tee);

function update() {
    landScape();
    activeSquare.render();
    activeSquare.fall();
    console.log("loop1")

}


function play() {
    landScape();
    setInterval(function(){
      update();
    }, 100)
}
