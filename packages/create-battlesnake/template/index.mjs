import { BattleSnake } from "battlesnake";
import { battlesnakeNgrok } from "battlesnake-plugin-ngrok";

const {{snakeNameCamel}} = BattleSnake("{{snakename}}", {
  apiversion: "1",
  author: "{{codername}}",
  color: "{{color}}",
  head: "{{head}}",
  tail: "{{tail}}",
  version: "0.0.1",
}, {
	plugins: [battlesnakeNgrok()]
});

{{snakeNameCamel}}.onStartGame((gameData) => {
  console.log(gameData);

  console.log("START");
});

{{snakeNameCamel}}.onMove((gameData) => {
  console.log(gameData);

  var possibleMoves = ["up", "down", "left", "right"];
  var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

  console.log("MOVE: " + move);
  return {
    move,
  };
});

{{snakeNameCamel}}.onEndGame((gameData) => {
  console.log(gameData);

  console.log("END");
});

{{snakeNameCamel}}.start();