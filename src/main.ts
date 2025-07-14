import "./style.css";

// Firstly I should set up a grid system that will allow tracking off the snake and the food item
// Define the initial state of each item and the direction
type Position = { x: number; y: number };

let snake: Position[] = [{ x: 10, y: 10 }];
let food: Position; // Need to change the starting position of food so that it should be randomised rather than defined here constantly
let direction: Position = { x: 0, y: 0 };
let score: number = 0;
let started = false; // add a started function so that the game the game doesn't trigger a game over state immediately

// Grabbing each element with a query selector
const stageElement = document.querySelector<HTMLDivElement>(
    ".main--container__stage"
) as HTMLDivElement;
const snakeElement = document.querySelector<HTMLDivElement>(
    ".main--container__stage-snake"
) as HTMLDivElement;
const foodElement = document.querySelector<HTMLDivElement>(
    ".main--container__stage-food"
) as HTMLDivElement;
const scoreElement = document.querySelector<HTMLSpanElement>(
    ".main--container__score-label span"
) as HTMLSpanElement;

// Initialise the food at a random location once the DOM is ready
randomiseFood();

// I will need to create an event listener that handles the wasd keys and then map then to the buttons in put as well
// Alternatively I could just use the same direction event listener for the button i.e. -y -1 x 0 etc

// What else do I need to do?

// Handle user input either usinng an if statement or a switch
// e.key handles the keyboard event

// This function will update the game state
document.addEventListener("keydown", (e) => {
    if (!started) started = true;
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

document.querySelector(".btn--up")?.addEventListener("click", () => {
    direction = { x: 0, y: -1 };
    started = true;
});
document.querySelector(".btn--down")?.addEventListener("click", () => {
    direction = { x: 0, y: 1 };
    started = true;
});
document.querySelector(".btn--left")?.addEventListener("click", () => {
    direction = { x: -1, y: 0 };
    started = true;
});
document.querySelector(".btn--right")?.addEventListener("click", () => {
    direction = { x: 1, y: 0 };
    started = true;
});

// Drawing and moving the snake around the grid - this took some brain power
function moveSnake() {
    const head = { ...snake[0] };
    // clone the head of the snake with a curly braces because I want to create a new object - not mutating the original - we want to kee original snake
    head.x += direction.x;
    // adds the firection to the head of the snake
    head.y += direction.y;
    snake.unshift(head);
    // adding the new head to the front of the snake array
    snake.pop();
    // while pop removes teh last element from the snake array simiulating the snake moving forward
}

function drawSnake() {
    snakeElement.style.left = `${snake[0].x * 10}px`;
    // Snake [0] is the snake head - first bit of the array "Snake"
    // // were moving the snake ten pixels when you press l or right
    snakeElement.style.top = `${snake[0].y * 10}px`;
    /// Similarly the y works the same
}

function drawFood() {
    // x and y gives the coordinates of the food
    foodElement.style.left = `${food.x * 10}px`;
    foodElement.style.top = `${food.y * 10}px`;
}

/// Adding food collision
function checkFoodCollision() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        // Simple if statement tracking the overlap of food and head element
        score++; // score is iterated upwards
        updateScore(); // tick
        growSnake(); // tick
        randomiseFood(); //tick
    }
}

// Grow snake function
// Not sure Why I left this so late to do its causing confusion in my code - need to be more methodical here

function growSnake() {
    const tail = snake[snake.length - 1]; // finding the index of the tail
    const newSegment = { ...tail }; // copying the tail
    snake.push(newSegment); // adding the new segment to the tail
}

// Now I need to randomise the food after its eaten and add a new segment to the snake array
// Math.ceil? and Maath floor.
// Math Ceil is randomising a decimal bewtween 0 - 1 * by width& height then round it down to a full number

function randomiseFood() {
    const gridWidth = 30;
    const gridHeight = 35;

    food = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight),
    };
    return drawFood();
}

// Update the score screen afterwards
function updateScore() {
    scoreElement.textContent = score.toString();
}

// Add collision with walls and the snake array

function checkWallCollision() {
    const head = snake[0];
    const gridWidth = 30;
    const gridHeight = 35;

    if (
        head.x < 0 ||
        head.x >= gridWidth ||
        head.y < 0 ||
        head.y >= gridHeight
    ) {
        gameOver();
    }
}

// GameOver state  ----- causing a game over straight away because my snake was hitting its tail straight away
function gameOver() {
    alert("Game Over! Your score was " + score);
    location.reload(); // Resetting the location of food and the snake
}

// Add a game over state and reset the game
setInterval(() => {
    if (!started) return;

    moveSnake();
    checkWallCollision();
    checkFoodCollision();
    drawFood();
    drawSnake();
}, 400);

// removing game over from every loop - why i ran into a persistent issue

// Issues
// Snake element - remains outside the stage after I fail so constant fail thereafter
// Food randomises indefinitely and when i use draw food in the loop it does not randomise when collided with
// Snake can go outside of the stage

// To do after fixing bugs
// add self collision with longer snake body
// add a game over screen
//
// Optional - add harder levels if I have time
