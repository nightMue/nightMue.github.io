var rotateIndex = 1;
var clickNum = 0;
var rotateDegrees = 90;
var currentDeg = 0;
var box = document.getElementById("box");
var wheel = document.getElementById("wheel");
var root = document.documentElement;
var squareHeight;
var squareWidth;

function getDementions(){
    squareHeight = window.innerHeight;
    squareWidth = window.innerWidth;
    if(squareHeight < squareWidth)
    {
        //squareHeight = squareHeight / 2;
        root.style.setProperty('--square-height', squareHeight + "px");
        root.style.setProperty('--square-width', squareHeight + "px");
    }
    else
    {
        //squareWidth = squareWidth / 2;
        root.style.setProperty('--square-height', squareWidth + "px");
        root.style.setProperty('--square-width', squareWidth + "px");
    }
}

function rotatePageLeft(){
    clickNum = clickNum + 1;
    pageSwitch(clickNum);
}

function rotatePageRight(){
    clickNum = clickNum - 1;
    pageSwitch(clickNum);
}

function pageSwitch(modifiedClickNum)
{
    currentDeg = rotateDegrees * modifiedClickNum;
    switch (rotateIndex) {
        case 1:
        root.style.setProperty('--rotate-string', 'rotate(' + currentDeg + 'deg)');
        box.className = 'box r1';
        wheel.className = 'Wheel r1';
        rotateIndex = rotateIndex + 1;
        break;
        case 2:
        root.style.setProperty('--rotate-string', 'rotate(' + currentDeg + 'deg)');
        box.className = 'box r2';
        wheel.className = 'Wheel r2';
        rotateIndex = rotateIndex + 1;
        break;
        case 3:
        root.style.setProperty('--rotate-string', 'rotate(' + currentDeg + 'deg)');
        box.className = 'box r3';
        wheel.className = 'Wheel r3';
        rotateIndex = rotateIndex + 1;
        break;
        case 4:
        root.style.setProperty('--rotate-string', 'rotate(' + currentDeg + 'deg)');
        box.className = 'box r4';
        wheel.className = 'Wheel r4';
        rotateIndex = 1;
        break
    }
}