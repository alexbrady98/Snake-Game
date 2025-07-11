import "./style.css";

// Firstly I should set up a grid system that will allow tracking off the snake and the food item
// Define the initial state of each item and the direction
type Position = { x: number; y: number };

let snake: Position[] = [{ x: 10, y: 10 }];
let food: Position = { x: 5, y: 5 };
let direction: Position = { x: 0, y: 0 };
let score: number = 0;

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

// I will need to create an event listener that handles the wasd keys and then map then to the buttons in put as well
// Alternatively I could just use the same direction event listener for the button i.e. -y -1 x 0 etc

// What else do I need to do?

// Handle user input either usinng an if statement or a switch
// e.key handles the keyboard event

// This function will update the game state
document.addEventListener("keypress", (e) => {
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

// Query Selector for the buttons. Doing a very similar thing to the WASD just instead using event listener rather than a switch.
//

document
    .querySelector(".btn--up")
    ?.addEventListener("click", () => (direction = { x: 0, y: -1 }));
document
    .querySelector(".btn--down")
    ?.addEventListener("click", () => (direction = { x: 0, y: 1 }));
document
    .querySelector(".btn--left")
    ?.addEventListener("click", () => (direction = { x: -1, y: 0 }));
document
    .querySelector(".btn--right")
    ?.addEventListener("click", () => (direction = { x: 1, y: 0 }));

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

// Setting a temporary game loop- check

function drawSnake() {
    snakeElement.style.left = `${snake[0].x * 10}px`;
    // Snake [0] is the snake head - first bit of the array "Snake"
    // // were moving the snake ten pixels when you press l or right  
    snakeElement.style.top = `${snake[0].y * 10}px`;
    /// Similarly the y works the same 
}

function drawFood() {
    // x and y gives the coordinates of the food
    foodElElement.style.left = `${food.x * 10}px`;
    foodElement.style.top = `${food.y * 10}px`;
}

setInterval(() => {
    moveSnake();
    drawSnake();
}, 400);


/// Adding food collision 
function checkFoodCollision() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        // Simple if statement tracking the overlap of food and head element 
        score++; // score is iterated upwards 
        updateScore();
        growSnake();
        randomiseFood();
    }
}



// Detect collision with food and increase the score

// Randomise food after collision

// Add collision with walls

// Add a game over state and reset the game
