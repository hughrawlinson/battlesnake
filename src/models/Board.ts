import { Battlesnake, isBattlesnakeArray } from "./Battlesnake";
import { Position, isPositionArray } from "./Position";

export interface Board {
  /**
   * Height of the game board.
   *
   * _Example: 11_
   */
  height: number;
  /**
   * Width of the game board.
   *
   * _Example: 11_
   */
  width: number;
  /**
   * Array of coordinates representing food locations on the game board.
   *
   * _Example: [{"x": 5, "y": 5}, ..., {"x": 2, "y": 2}]_
   */
  food: Position[];
  /**
   * Array of coordinates representing hazardous locations on the game board.
   * These will only appear in some game modes.
   *
   * _Example: [{"x": 0, "y": 1}, ..., {"x": 0, "y": 1}]_
   */
  hazards: Position[];
  /**
   * Array of Battlesnake Objects representing all Battlesnakes remaining on the game board (including yourself if you haven't been eliminated).
   *
   * _Example: [{"id": "snake-one", ...}, ...]_
   */
  snakes: Battlesnake;
}

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
