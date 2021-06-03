import { BattleSnake } from "../src/main";

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
