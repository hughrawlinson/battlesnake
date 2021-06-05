import { Position, isPositionArray, isPosition } from "./Position";

export interface Battlesnake {
  /**
   * A unique identifier for this Battlesnake in the context of the current Game
   *
   * _Example: "totally-unique-snake-id"_
   */
  id: string;
  /**
   * Name given to this Battlesnake by its author.
   *
   * _Example: "Sneky McSnek Face"_
   */
  name: string;
  /**
   * Health value of this Battlesnake, between 0 and 100 inclusively.
   *
   * _Example: 54_
   */
  health: number;
  /**
   * Array of coordinates representing this Battlesnake's location on the game
   * board. This array is ordered from head to tail.
   *
   * _Example: [{"x":0,"y":0},...,{"x":2,"y":0}]_
   */
  body: Position[];
  /**
   * The previous response time of this Battlesnake, in milliseconds'. "0" means
   * the Battlesnake timed out and failed to respond.
   *
   * _Example: "450"_
   */
  latency: string;
  /**
   * Coordinates for this Battlesnake's head. Equivalent to the first element of
   * the body array.
   *
   * _Example: {"x": 0, "y": 0}_
   */
  head: Position;
  /**
   * Length of this Battlesnake from head to tail. Equivalent to the length of
   * the body array.
   *
   * _Example: 3_
   */
  length: number;
  /**
   * Message shouted by this Battlesnake on the previous turn.
   *
   * _Example: "why are we shouting??"_
   */
  shout: string;
  /**
   * The squad that the Battlesnake belongs to. Used to identify squad members
   * in Squad Mode games.
   *
   * _Example: "1"_
   */
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
