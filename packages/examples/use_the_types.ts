import { GameState } from "battlesnake";

// Parse a GameState object from a string or a JSON object and get a correctly
// typed battlesnake GameState object, as used in the Battlesnake move request
// payload, complete with docstrings for intellisense.
const incomingGameState: GameState = GameState.parse("");

function displayGameState(gameState: GameState) {
  console.log(`Game state for game: ${gameState.game.id}:`);
  console.log(
    `  ruleset: ${gameState.game.ruleset.name}@${gameState.game.ruleset.version}`
  );
  console.log(`  turn: ${gameState.turn}`);
  console.log(`  board:`);
  console.log(`    width: ${gameState.board.width}`);
  console.log(`    height: ${gameState.board.height}`);
  console.log(`    food:`);
  gameState.board.food.forEach((food) => {
    console.log(`      ${food.x}, ${food.y}`);
  });
  console.log(`    snakes:`);
  gameState.board.snakes.forEach((snake) => {
    console.log(`      ${snake.id}`);
    console.log(`        name: ${snake.name}`);
    console.log(`        health: ${snake.health}`);
    console.log(`        body:`);
    snake.body.forEach((body) => {
      console.log(`          ${body.x}, ${body.y}`);
    });
  });
}

displayGameState(incomingGameState);
