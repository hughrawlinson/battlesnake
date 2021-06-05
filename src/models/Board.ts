import { Battlesnake, isBattlesnakeArray } from "./Battlesnake";
import { Position, isPositionArray } from "./Position";

export type Board = {
  height: number;
  width: number;
  food: Position[];
  hazards: Position[];
  snakes: Battlesnake;
};

function debugValidity(value: any) {
  console.log(
    value && value.hasOwnProperty("height") && typeof value.height === "number"
      ? "board.height is valid"
      : "board.height is invalid"
  );
  console.log(
    value && value.hasOwnProperty("width") && typeof value.width === "number"
      ? "board.width is valid"
      : "board.width is invalid"
  );
  console.log(
    value && value.hasOwnProperty("food") && isPositionArray(value.food)
      ? "board.food is valid"
      : "board.food is invalid"
  );
  console.log(
    value && value.hasOwnProperty("hazards") && isPositionArray(value.hazards)
      ? "board.hazards is valid"
      : "board.hazards is invalid"
  );
  console.log(
    value && value.snakes && isBattlesnakeArray(value.game, true)
      ? "board.snakes is valid"
      : "board.snakes is invalid"
  );
}

export function isBoard(value: any, debug: boolean = false): value is Board {
  if (debug) {
    debugValidity(value);
  }
  return (
    value &&
    value.hasOwnProperty("height") &&
    typeof value.height === "number" &&
    value.hasOwnProperty("width") &&
    typeof value.width === "number" &&
    value.hasOwnProperty("food") &&
    isPositionArray(value.food) &&
    value.hasOwnProperty("hazards") &&
    isPositionArray(value.hazards) &&
    value.hasOwnProperty("snakes") &&
    isBattlesnakeArray(value.snakes)
  );
}
