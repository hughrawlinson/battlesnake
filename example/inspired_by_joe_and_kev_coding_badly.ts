import {
  BattleSnake,
  possibleMoves,
  PossibleMove,
  GameData,
} from "../src/main";

const mySnake = BattleSnake("hugh-fun-times-snake", {
  apiversion: "1",
  author: "hughrawlinson",
  color: "#00FF00",
  head: "default",
  tail: "default",
  version: "0.0.1",
});

function filterOwnBody(moves: PossibleMove[], gameData: GameData) {
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

function filterWalls(moves: PossibleMove[], gameData: GameData) {
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

mySnake.onEndGame((gameData) => {
  console.log("game over: " + gameData.game.id);
});
mySnake.onStartGame((gameData) => {
  console.log("game started: " + gameData.game.id);
});
mySnake.onMove((gameData) => {
  const moveOptions = possibleMoves.slice(0);
  const moveOptionsMinusWalls = filterWalls(moveOptions, gameData);
  const moveOptionsMinusWallsMinusBody = filterOwnBody(
    moveOptionsMinusWalls,
    gameData
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
