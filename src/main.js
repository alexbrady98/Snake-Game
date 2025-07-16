"use strict";
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
var snake = [{ x: 10, y: 10 }];
var food; // Need to change the starting position of food so that it should be randomised rather than defined here constantly
var direction = { x: 0, y: 0 };
var score = 0;
var started = false; // add a started function so that the game the game doesn't trigger a game over state immediately
// Grabbing each element with a query selector
var stageElement = document.querySelector(".main--container__stage");
var foodElement = document.querySelector(".main--container__stage-food");
var scoreElement = document.querySelector(".main--container__score-label span");
// Initialise the food at a random location once the DOM is ready
randomiseFood();
// I will need to create an event listener that handles the wasd keys and then map then to the buttons in put as well
// Alternatively I could just use the same direction event listener for the button i.e. -y -1 x 0 etc
// Handle user input either usinng an if statement or a switch
// e.key handles the keyboard event
document.addEventListener("keydown", function (e) {
    if (!started)
        started = true;
    switch (e.key) {
        case "w":
            direction = { x: 0, y: -1 };
            break;
        case "s":
            direction = { x: 0, y: 1 };
            break;
        case "a":
            direction = { x: -1, y: 0 };
            break;
        case "d":
            direction = { x: 1, y: 0 };
            break;
    }
});
// have to use "keydown" not key press apparently
// Query Selector for the buttons. Doing a very similar thing to the WASD just instead using event listener rather than a switch.
(_a = document.querySelector(".btn--up")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    direction = { x: 0, y: -1 };
    started = true;
});
(_b = document.querySelector(".btn--down")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    direction = { x: 0, y: 1 };
    started = true;
});
(_c = document.querySelector(".btn--left")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    direction = { x: -1, y: 0 };
    started = true;
});
(_d = document.querySelector(".btn--right")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    direction = { x: 1, y: 0 };
    started = true;
});
// Drawing and moving the snake around the grid - this took some brain power
function moveSnake() {
    var head = __assign({}, snake[0]);
    // clone the head of the snake with a curly braces because I want to create a new object - not mutating the original - we want to keep original snake
    head.x += direction.x;
    // adds the direction to the head of the snake
    head.y += direction.y;
    snake.unshift(head);
    // adding the new head to the front of the snake array
    return head;
    // return the new head so we can decide whether to pop the tail later
}
// Fixed draw snake function without pop and push as it was causeing issues in the loop
function drawSnake() {
    // First, remove any previously drawn snake segments
    document.querySelectorAll(".snake-segment").forEach(function (seg) { return seg.remove(); });
    // Removes previous segments that were in this class - "moving the snake"
    // Then loop through the snake array and draw each part
    snake.forEach(function (segment) {
        var segmentEl = document.createElement("div");
        // After removing previous element i'm adding a new element to snake segment
        segmentEl.classList.add("snake-segment");
        // Below is where its getting moved
        segmentEl.style.left = "".concat(segment.x * 10, "px");
        segmentEl.style.top = "".concat(segment.y * 10, "px");
        // Adding the div to the stage making it actually appear
        stageElement.appendChild(segmentEl);
    });
}
function drawFood() {
    // x and y gives the coordinates of the food
    foodElement.style.left = "".concat(food.x * 10, "px");
    foodElement.style.top = "".concat(food.y * 10, "px");
}
/// Adding food collision
function checkFoodCollision(newHead) {
    return newHead.x === food.x && newHead.y === food.y;
}
// Now I need to randomise the food after its eaten and add a new segment to the snake array
// Math.ceil? and Math.floor.
// Math.floor is randomising a decimal between 0 - 1 * by width & height then round it down to a full number
function randomiseFood() {
    var gridWidth = 30;
    var gridHeight = 35;
    food = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight),
    };
    drawFood();
}
// Update the score screen afterwards
function updateScore() {
    scoreElement.textContent = score.toString();
}
// Add collision with walls and the snake array
function checkWallCollision() {
    var head = snake[0];
    var gridWidth = 30;
    var gridHeight = 35;
    if (head.x < 0 ||
        head.x >= gridWidth ||
        head.y < 0 ||
        head.y >= gridHeight) {
        gameOver();
    }
}
// GameOver state  ----- causing a game over straight away because my snake was hitting its tail straight away
function gameOver() {
    alert("Game Over! Your score was " + score);
    clearInterval(gameLoop);
    var playAgain = confirm("Play Again?");
    if (playAgain)
        location.reload();
}
// Add a game over state and reset the game
var gameLoop = setInterval(function () {
    if (!started)
        return;
    // Only run the game loop if the game has started
    var newHead = moveSnake();
    // Move the snake by adding a new head in the direction of movement
    checkWallCollision();
    // Check if the snake has collided with the wall boundaries
    var ateFood = checkFoodCollision(newHead);
    // Check if the new head position overlaps with the food position
    if (ateFood) {
        score++;
        // If the snake eats the food, increase the score
        updateScore();
        // Update the score display on the page
        randomiseFood();
        // Move the food to a new random location
        // We don’t call snake.pop() here, which causes the snake to grow
    }
    else {
        snake.pop();
        // If food was not eaten, remove the tail segment
        // This keeps the snake the same length while appearing to move
    }
    drawSnake();
    // Update the snake's position visually
    drawFood();
    // Update the food's position visually
}, 100);
// Issues
// Snake element - remains outside the stage after I fail so constant fail thereafter// fixed 
// Food randomises indefinitely and when i use draw food in the loop it does not randomise when collided with // fixed
// Snake can go outside of the stage
// Snake is shifting and popping regardless of wether the snake ate food or not - need to fix in the interval function// fixed
//^ above is now causing multiple gameovers making it difficult to restart // Fixed declaring the loop in a variable and putting it in gameOver function
// To do after fixing bugs
// add self collision with longer snake body
// add a game over screen
//
// Optional - add harder levels if I have time
