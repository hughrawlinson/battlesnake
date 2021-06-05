export type BattlesnakeInfo = {
  /**
   * Version of the Battlesnake API implemented by this Battlesnake.
   *
   * _Example: "1"_
   */
  apiversion: string;
  /**
   * Username of the author of this Battlesnake. If provided, this will be used
   * to verify ownership.
   *
   * _Example: "BattlesnakeOfficial"_
   */
  author: string;
  /**
   * Hex color code used to display this Battlesnake. Must start with "#" and be
   * 7 characters long.
   *
   * _Example: #888888_
   */
  color: string;
  /**
   * Displayed head of this Battlesnake. See Personalization Docs for available
   * options.
   *
   * _Example: "default"_
   */
  head: string;
  /**
   * Displayed tail of this Battlesnake. See Personalization Docs for available
   * options.
   *
   * _Example: "default"_
   */
  tail: string;
  /**
   * A version number or tag for your snake.
   */
  version: string;
};
