export interface Position {
  /**
   * The x-axis component of a two dimensional coordinate representing a point
   * on the Battlesnake board.
   */
  x: number;
  /**
   * The y-axis component of a two dimensional coordinate representing a point
   * on the Battlesnake board.
   */
  y: number;
}
export function isPosition(value: any): value is Position {
  return (
    value &&
    value.hasOwnProperty("x") &&
    typeof value.x === "number" &&
    value.hasOwnProperty("y") &&
    typeof value.y === "number"
  );
}
export function isPositionArray(value: any): value is Position[] {
  return (
    value &&
    Array.isArray(value) &&
    value.reduce((acc, position) => isPosition(position), true)
  );
}
