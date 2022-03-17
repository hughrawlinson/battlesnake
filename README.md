# Battlesnake JS

Battlesnake JS makes it really easy to write Battlesnakes in Typescript or
Javascript. Features include:

- Scaffolding new Battlesnakes with `create-battlesnake`
- TSDoc annotations for in-editor docs and intellisense
- A concise, type safe API for implementing snakes, without worrying about HTTP
  or infra dependencies, so that you can focus on your snake logic
- Built in tunneling using ngrok, so you don't have to think about it in
  development

## Getting Started

1. Check that you've got a recent version of Node.js installed
2. Run `npx create-battlesnake` and answer the questions
3. `cd` into the newly created directory
4. `npm run start` to run your snake!

The ngrok plugin is installed by default. An ngrok tunnel will be created for
your snake, and the url will be printed for you to copy and paste into your
snake configuration on [play.battlesnake.com](https://play.battlesnake.com).

Now you can focus on writing code to handle how your snake moves in the
`onMove` handler! Happy hacking!

### Example Battlesnake

```ts
import { BattleSnake } from "battlesnake";

const mySnake = BattleSnake("super-perfect-snake", {
  apiversion: "1",
  author: "",
  color: "#888888",
  head: "default",
  tail: "default",
  version: "0.0.1",
});

mySnake.onStartGame((gameData) => {
  console.log(gameData);

  console.log("START");
});

mySnake.onMove((gameData) => {
  console.log(gameData);

  var possibleMoves = ["up", "down", "left", "right"] as const;
  var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

  console.log("MOVE: " + move);
  return {
    move,
  };
});

mySnake.onEndGame((gameData) => {
  console.log(gameData);

  console.log("END");
});

mySnake.start();
```

## Built in ngrok support

Using the ngrok plugin, you can run ngrok inside your snake process, and not
have to worry about keeping a separate terminal window open. The ngrok plugin
will also automatically not run in production or test NODE_ENVs (unless you tell
it to), so you don't need to worry about writing that logic.

### Ngrok Example

```ts
import { BattleSnake } from "battlesnake";
import { battlesnakeNgrok } from "battlesnake-plugin-ngrok";

const mySnake = BattleSnake(
  "your-snake",
  {
    apiversion: "1",
    author: "",
    color: "#000000",
    head: "default",
    tail: "default",
    version: "0.0.1",
  },
  {
    plugins: [battlesnakeNgrok()],
  }
);

// ... your snake implementation
```

## Using just the types

Although I recommend using the project generator, and the BattleSnake server
wrapper, and the ngrok plugin to get the best developer experience out of this
package, you can use the types directly if you want.

```ts
import { GameState } from "battlesnake";

// Parser takes a string or an object, and throws if it encounters an invalid
// game state.
const newGameState = GameState.parse(request.body);

// Now newGameState is a fully typed GameState object representing the payload
// of the move request from the battlesnake server, complete with documentation
// comments for hover-over intellisense.
console.log(newGameState.turn);
```
