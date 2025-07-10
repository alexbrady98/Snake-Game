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
const scoreElement = document.querySelector<HTMLDivElement>(
    ".main-container__score-label span"
) as HTMLSpanElement;

// I will need to create an event listener that handles the wasd keys and then map then to the buttons in put as well
// Alternatively I could just use the same direction event listener for the button i.e. -y -1 x 0 etc

// What else do I need to do?

// Handle user input either usinng an if statement or a switch
// e.key handles the keyboard event

document.addEventListener("keydown", (e) => {
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

// Detect collision with food and increase the score

// Randomise food after collision

// Add collision with walls

// Add a game over state and reset the game
