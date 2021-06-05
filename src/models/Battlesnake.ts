import { Position, isPositionArray, isPosition } from "./Position";

export interface Battlesnake {
  id: string;
  name: string;
  health: number;
  body: Position[];
  latency: string;
  head: Position;
  length: number;
  shout: string;
  squad?: string;
}
function debugValidity(value: any) {
  console.log(
    value && value.id && typeof value.id === "string"
      ? "you.id is valid"
      : "you.id is invalid"
  );
  console.log(
    value && value.name && typeof value.name === "string"
      ? "you.name is valid"
      : "you.name is invalid"
  );
  console.log(
    value && value.health && typeof value.health === "number"
      ? "you.health is valid"
      : "you.health is invalid"
  );
  console.log(
    value && value.body && isPositionArray(value.body)
      ? "you.body is valid"
      : "you.body is invalid"
  );
  console.log(
    value &&
      value.hasOwnProperty("latency") &&
      typeof value.latency === "string"
      ? "you.latency is valid"
      : "you.latency is invalid"
  );
  console.log(
    value && value.head && isPosition(value.head)
      ? "you.head is valid"
      : "you.head is invalid"
  );
  console.log(
    value && value.length && typeof value.length === "number"
      ? "you.length is valid"
      : "you.length is invalid"
  );
  console.log(
    value && value.hasOwnProperty("shout") && typeof value.shout === "string"
      ? "value.shout is valid"
      : "value.shout is invalid"
  );
  console.log(
    value && value.squad
      ? typeof value.squad === "string"
      : true
      ? "value.squad is valid"
      : "value.squad is invalid"
  );
}

export function isBattlesnake(
  value: any,
  debug: boolean = false
): value is Battlesnake {
  if (debug) {
    debugValidity(value);
  }
  return value &&
    value.id &&
    typeof value.id === "string" &&
    value.name &&
    typeof value.name === "string" &&
    value.health &&
    typeof value.health === "number" &&
    value.body &&
    isPositionArray(value.body) &&
    value.hasOwnProperty("latency") &&
    typeof value.latency === "string" &&
    value.head &&
    isPosition(value.head) &&
    value.length &&
    typeof value.length === "number" &&
    value.hasOwnProperty("squad") &&
    typeof value.shout === "string" &&
    value.squad
    ? typeof value.squad === "string"
    : true;
}
export function isBattlesnakeArray(
  value: any,
  debug: boolean = false
): value is Position[] {
  if (debug) {
    debugValidity(value);
  }
  return (
    value &&
    Array.isArray(value) &&
    value.reduce((acc, position) => isBattlesnake(position), true)
  );
}

export type You = Battlesnake;
