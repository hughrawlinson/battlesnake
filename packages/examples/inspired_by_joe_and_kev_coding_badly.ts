import {
  BattleSnake,
  possibleMoves,
  PossibleMove,
  GameState,
} from "battlesnake";

import { battlesnakeNgrok } from "battlesnake-plugin-ngrok";

const mySnake = BattleSnake(
  "hugh-fun-times-snake",
  {
    apiversion: "1",
    author: "hughrawlinson",
    color: "#00FF00",
    head: "default",
    tail: "default",
    version: "0.0.1",
  },
  {
    plugins: [battlesnakeNgrok()],
  }
);

function filterOwnBody(moves: PossibleMove[], gameData: GameState) {
  let remainingMoves = moves.slice(0);
  let headPosition = gameData.you.head;
  [gameData.you.head, ...gameData.you.body].forEach((bodyChunkPosition) => {
    if (bodyChunkPosition.x === headPosition.x) {
      if (headPosition.y - 1 === bodyChunkPosition.y) {
        remainingMoves = remainingMoves.filter((move) => move !== "down");
      }
      if (headPosition.y + 1 === bodyChunkPosition.y) {
        remainingMoves = remainingMoves.filter((move) => move !== "up");
      }
    }
    if (bodyChunkPosition.y === headPosition.y) {
      if (headPosition.x - 1 === bodyChunkPosition.x) {
        remainingMoves = remainingMoves.filter((move) => move !== "left");
      }
      if (headPosition.x + 1 === bodyChunkPosition.x) {
        remainingMoves = remainingMoves.filter((move) => move !== "right");
      }
    }
  });
  return remainingMoves;
}

function filterWalls(moves: PossibleMove[], gameData: GameState) {
  let remainingMoves = moves.slice(0);
  if (gameData.you.head.x === 0) {
    remainingMoves = remainingMoves.filter((option) => option !== "left");
  } else if (gameData.you.head.x === gameData.board.width - 1) {
    remainingMoves = remainingMoves.filter((option) => option !== "right");
  }
  if (gameData.you.head.y === 0) {
    remainingMoves = remainingMoves.filter((option) => option !== "down");
  } else if (gameData.you.head.y === gameData.board.height - 1) {
    remainingMoves = remainingMoves.filter((option) => option !== "up");
  }
  return remainingMoves;
}

mySnake.onEndGame((gameState) => {
  console.log("game over: " + gameState.game.id);
});
mySnake.onStartGame((gameState) => {
  console.log("game started: " + gameState.game.id);
});
mySnake.onMove((gameState) => {
  const moveOptions = possibleMoves.slice(0);
  const moveOptionsMinusWalls = filterWalls(moveOptions, gameState);
  const moveOptionsMinusWallsMinusBody = filterOwnBody(
    moveOptionsMinusWalls,
    gameState
  );
  const move =
    moveOptionsMinusWallsMinusBody[
      Math.floor(Math.random() * moveOptionsMinusWallsMinusBody.length)
    ];
  console.log(move);
  return {
    move,
  };
});

mySnake.start();
