# Battlesnake JS

_This package isn't yet on a package registry, I don't want to namesquat._

A wrapper library and types for Battlesnake, written in Typescript. Should work,
but ymmv for now!

Battlesnake JS makes it really easy to write Battlesnakes in Typescript or
Javascript. Features include:

- TSDoc annotations for in-editor docs and intellisense
- A concise, type safe API for implementing snakes, without worrying about HTTP
  or infra dependencies, so that you can focus on your snake logic
- Built in tunneling using ngrok, so you don't have to think about it in
  development

### Example Battlesnake

```ts
import { BattleSnake } from "battlesnake-js-bindings-and-types";

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
import { BattleSnake } from 'battlesnake-js-bindings-and-types';
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

Todo:

- [ ] Plugin: Metrics API endpoint
  - Number of requests handled
  - Average latency
  - Most recent game started
  - Whatever else is interesting
- [ ] Plugin: Game State API?
- [ ] Plugin: Monitoring site
  - Watch games live
  - View fun stuff
- [ ] CLI
  - [ ] Scaffolding
  - [ ] Ngroking
  - [ ] Pushing to \[repl.it/glitch/netlify/whatever\]