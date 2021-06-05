export type Position = {
  x: number;
  y: number;
};
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
