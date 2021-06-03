import { isBattlesnake, You } from "./Battlesnake";
import { Board, isBoard } from "./Board";
import { Game, isGame } from "./RuleSet";

/**
 * GameData is a fun thing
 *
 * @param - game: A representation of the game
 */
export type GameData = {
  game: Game;
  turn: number;
  board: Board;
  you: You;
};

export function isGameData(value: any): value is GameData {
  return (
    value &&
    value.game &&
    isGame(value.game) &&
    value.turn &&
    typeof value.turn === "number" &&
    value.board &&
    isBoard(value.board) &&
    value.you &&
    isBattlesnake(value.you)
  );
}
