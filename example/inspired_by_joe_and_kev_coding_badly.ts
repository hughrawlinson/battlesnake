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

// function directionVectorToDirection({ x, y }: Position) {
//   if (x === 0) {
//     return y > 0 ? "up" : "down";
//   } else {
//     return x > 0 ? "right" : "left";
//   }
// }

// function currentDirection(gameData: GameData): Position {
//   return {
//     x: gameData.you.body[0].x - gameData.you.head.x,
//     y: gameData.you.body[0].y - gameData.you.head.y,
//   };
// }

function filterOwnBody(moves: PossibleMove[], gameData: GameData) {
  let remainingMoves = moves.slice(0);
  let headPosition = gameData.you.head;
  gameData.you.body.forEach((bodyChunkPosition) => {
    if (bodyChunkPosition.x === headPosition.x) {
      if (headPosition.y - 1 === bodyChunkPosition.y) {
        remainingMoves = remainingMoves.filter((move) => move !== "left");
      }
      if (headPosition.y + 1 === bodyChunkPosition.y) {
        remainingMoves = remainingMoves.filter((move) => move !== "right");
      }
    }
    if (bodyChunkPosition.y === headPosition.y) {
      if (headPosition.x - 1 === bodyChunkPosition.x) {
        remainingMoves = remainingMoves.filter((move) => move !== "down");
      }
      if (headPosition.x + 1 === bodyChunkPosition.x) {
        remainingMoves = remainingMoves.filter((move) => move !== "up");
      }
    }
  });
  return remainingMoves;
}

function filterWalls(moves: PossibleMove[], gameData: GameData) {
  let remainingMoves = moves.slice(0);
  if (gameData.you.head.x === 0) {
    remainingMoves.filter((option) => option !== "right");
  } else if (gameData.you.head.x === gameData.board.width) {
    remainingMoves.filter((option) => option !== "right");
  }
  return remainingMoves;
}

mySnake.onEndGame(() => {});
mySnake.onStartGame(() => {});
mySnake.onMove((gameData) => {
  console.log(gameData);
  const moveOptions = possibleMoves.slice(0);
  const moveOptionsMinusWalls = filterWalls(moveOptions, gameData);
  const moveOptionsMinusWallsMinusBody = filterOwnBody(
    moveOptionsMinusWalls,
    gameData
  );
  const move = moveOptions[Math.floor(Math.random() * 4)];
  console.log(move);
  return {
    move,
  };
});

mySnake.start();
