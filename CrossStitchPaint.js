// Setting the Global stitch variables
var stitchLength = 22;  //Actual length of the stitch
var stitchThick = 6; //Thickness of the diagnal stitch

//Length of the side of the whole square the stitch takes up
var stitchSide = stitchLength / Math.sqrt(2) + stitchThick;

//Setting up the base cloth grid
var canvasBase = document.getElementById('base');
var base = canvasBase.getContext('2d');

//Making the background a
base.fillStyle = '#F5F6CE';
base.fillRect(0, 0, canvasBase.width, canvasBase.height);

//Setting line width and color
//an equation to make the line width the same as cross part of the cross stitch
base.lineWidth = Math.sqrt(2) * stitchThick;
base.strokeStyle = '#BDBDBD';

//A method that draws the grid background
function drawAida(){

    for(var i = 0; i * stitchSide + stitchSide < canvasBase.height - stitchSide; i ++){
        base.beginPath();
        base.moveTo(stitchSide + stitchSide * i, stitchSide);
        base.lineTo(stitchSide + stitchSide * i, stitchSide);
        base.lineTo(stitchSide + stitchSide * i, canvasBase.height - stitchSide);
        base.closePath();
        base.stroke();

        base.beginPath();
        base.moveTo(stitchSide, stitchSide + stitchSide * i);
        base.lineTo(stitchSide, stitchSide + stitchSide * i);
        base.lineTo(canvasBase.width - stitchSide, stitchSide + stitchSide * i);
        base.closePath();
        base.stroke();
    }
}

drawAida();

/*********************Start of Cross Stitch Canvas*****************************/
//Where the outline stitches go
var canvasOutline = document.getElementById('outline');
var outline = canvasOutline.getContext('2d');

//The canvas where the crossStitches go
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var mouseDown = false;

canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mousemove", onMouseMove, false);
canvas.addEventListener("mouseup", onMouseUp, false);

//prints an x where you clicked.
function onMouseDown(event){
  if(boundsCheck(event.pageX, event.pageY)){
    printStitch(event.pageX, event.pageY);
  }
  mouseDown = true;
}

//makes it so that mouseDown is false
function onMouseUp(event){
  mouseDown = false;
}

//Prints an x as long as the mouse is moving and held down
function onMouseMove(event){
  if(mouseDown){
      if(boundsCheck(event.pageX, event.pageY)){
      printStitch(event.pageX, event.pageY);
    }
  }
}

//Checks to see if the mouse is in the bounds
function boundsCheck(x, y){
    if(x < 2 * stitchSide){
      return false;
    }

    if(x > canvasBase.width - 2 * stitchSide){
      return false;
    }

    if(y < 2 * stitchSide){
      return false;
    }

    if(y > canvasBase.height - 2 * stitchSide){
      return false;
    }

    return true;
}

//Prints a red cross stitch to the closest overlap point on the grid
function printStitch(x, y){
  rightCrossStitch(Math.round(x/stitchSide) * stitchSide,
  Math.round(y/stitchSide) * stitchSide, stitchThick, stitchLength, 'red');
}

//Setting the line width for the outline of the stitches
ctx.lineWidth = 1;

//Draws one diagnal stitch
function drawDiagnalStitch(x,y,width,height,rad, color){

    ctx.save();

    //Set the origin to the center of coordinates given
    ctx.translate(x, y);

    //Rotate the canvas
    ctx.rotate(rad * Math.PI);

    //sets the color and draws and fills a rectangle
    ctx.fillStyle = color;
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.strokeRect(-width / 2, -height / 2, width, height);

    //reset the canvas
    ctx.restore();
}

//Draws a cross stitch where the stitch going from left to right is on top
function rightCrossStitch(x, y, width, height, color){
    drawDiagnalStitch(x, y, width, height, 3/4, color);
    drawDiagnalStitch(x, y, width, height, 1/4, color);
}

//Draws a cross stitch where the stitch going from right to left is on top
function leftCrossStitch(x, y, width, height, color){
    drawDiagnalStitch(x, y, width, height, 1/4, color);
    drawDiagnalStitch(x, y, width, height, 3/4, color);
}
/*******************************Start of Outline Canvas************************/
