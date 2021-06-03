import { Position, isPositionArray, isPosition } from "./Position";

export type Battlesnake = {
  id: string;
  name: string;
  health: number;
  body: Position[];
  latency: string;
  head: Position;
  length: number;
  shout: string;
  squad: string;
};
export function isBattlesnake(value: any): value is Battlesnake {
  return (
    value &&
    value.id &&
    typeof value.id === "string" &&
    value.name &&
    typeof value.name === "string" &&
    value.health &&
    typeof value.health === "number" &&
    value.body &&
    isPositionArray(value.body) &&
    value.latency &&
    typeof value.latency === "string" &&
    value.head &&
    isPosition(value.head) &&
    value.length &&
    typeof value.length === "number" &&
    value.shout &&
    typeof value.shout === "string" &&
    value.squad &&
    typeof value.squad === "string"
  );
}
export function isBattlesnakeArray(value: any): value is Position[] {
  return (
    value &&
    Array.isArray(value) &&
    value.reduce((acc, position) => isBattlesnake(position), true)
  );
}

export type You = Battlesnake;
