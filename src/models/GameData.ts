import { isBattlesnake, You } from "./Battlesnake";
import { Board, isBoard } from "./Board";
import { Game, isGame } from "./Game";

/**
 * GameData is an object representing the current state of the game.
 *
 */
export interface GameData {
  /**
   * Data about the game in question
   */
  game: Game;
  /**
   * An integer, n+1 where n is the number of turns that have already elapsed
   */
  turn: number;
  /**
   * An object containing the current state of the game board
   */
  board: Board;
  /**
   * An object representing the position and state of your own battlesnake
   */
  you: You;
}

function debugValidity(value: any) {
  console.log(
    value && value.game && isGame(value.game, true)
      ? "gamedata.game is valid"
      : "gamedata.game is invalid"
  );
  console.log(
    value && value.hasOwnProperty("turn") && typeof value.turn === "number"
      ? "gamedata.turn is valid"
      : "gamedata.turn is invalid"
  );
  console.log(
    value && value.board && isBoard(value.board, true)
      ? "gamedata.board is valid"
      : "gamedata.board is invalid"
  );
  console.log(
    value && value.you && isBattlesnake(value.you)
      ? "gamedata.you is valid"
      : "gamedata.you is invalid"
  );
}

export function isGameData(
  value: any,
  debug: boolean = false
): value is GameData {
  if (debug) {
    debugValidity(value);
  }
  return (
    value &&
    value.game &&
    isGame(value.game) &&
    value.hasOwnProperty("turn") &&
    typeof value.turn === "number" &&
    value.board &&
    isBoard(value.board) &&
    value.you &&
    isBattlesnake(value.you)
  );
}
