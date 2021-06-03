import { Battlesnake, isBattlesnakeArray } from "./Battlesnake";
import { Position, isPositionArray } from "./Position";

export type Board = {
  height: number;
  width: number;
  food: Position[];
  hazards: Position[];
  snakes: Battlesnake;
};

export function isBoard(value: any): value is Board {
  return (
    value &&
    value.height &&
    typeof value.height === "number" &&
    value.width &&
    typeof value.width === "number" &&
    isPositionArray(value.food) &&
    isPositionArray(value.hazards) &&
    isBattlesnakeArray(value.snakes)
  );
}
