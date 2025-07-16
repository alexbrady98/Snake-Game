import "./style.scss";

const GRID_WIDTH = 29;
const GRID_HEIGHT = 34;

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

// Handle user input either usinng an if statement or a switch
// e.key handles the keyboard event
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
    document.querySelectorAll(".snake-segment").forEach((seg) => seg.remove());

    // Removes previous segments that were in this class - "moving the snake"

    // Then loop through the snake array and draw each part

    snake.forEach((segment) => {
        const segmentEl = document.createElement("div");
        // After removing previous element i'm adding a new element to snake segment
        segmentEl.classList.add("snake-segment");
        // Below is where its getting moved
        segmentEl.style.left = `${segment.x * 10}px`;
        segmentEl.style.top = `${segment.y * 10}px`;
        // Adding the div to the stage making it actually appear
        stageElement.appendChild(segmentEl);
    });
}

function drawFood() {
    // x and y gives the coordinates of the food
    foodElement.style.left = `${food.x * 10}px`;
    foodElement.style.top = `${food.y * 10}px`;
}

/// Adding food collision
function checkFoodCollision(newHead: Position): boolean {
    return newHead.x === food.x && newHead.y === food.y;
}
//adding self collision
function checkSelfCollision() {
    const [head, ...body] = snake;
    return body.some((segment) => segment.x === head.x && segment.y === head.y);
}

// Now I need to randomise the food after its eaten and add a new segment to the snake array
// Math.ceil? and Math.floor.
// Math.floor is randomising a decimal between 0 - 1 * by width & height then round it down to a full number
function randomiseFood() {
    const gridWidth = 29;
    const gridHeight = 31.5;

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
    const head = snake[0];
  
    if (
        head.x < 0 ||
        head.x >= GRID_WIDTH ||
        head.y < 0 ||
        head.y >= GRID_HEIGHT
    ) {
        gameOver();
    }
}

// GameOver state  ----- causing a game over straight away because my snake was hitting its tail straight away
function gameOver() {
    alert("Game Over! Your score was " + score);
    clearInterval(gameLoop);
    const playAgain = confirm("Play Again?");
    if (playAgain) location.reload();
}

// Add a game over state and reset the game
const gameLoop = setInterval(() => {
    if (!started) return;
    // Only run the game loop if the game has started

    const newHead = moveSnake();
    // Move the snake by adding a new head in the direction of movement

    checkWallCollision();
    // Check if the snake has collided with the wall boundaries

    // Adding snake collision game over
    if (checkSelfCollision()) {
        gameOver();
        return;
    }
    const ateFood = checkFoodCollision(newHead);
    // Check if the new head position overlaps with the food position

    if (ateFood) {
        score++;
        // If the snake eats the food, increase the score

        updateScore();
        // Update the score display on the page

        randomiseFood();
        // Move the food to a new random location

        // We don’t call snake.pop() here, which causes the snake to grow
    } else {
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
