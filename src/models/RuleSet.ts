type RuleSet = {
  name: string;
  version: string;
};
function isRuleSet(value: any): value is RuleSet {
  return (
    value &&
    value.name &&
    typeof value.name === "string" &&
    value.version &&
    typeof value.version === "string"
  );
}
export type Game = {
  /**
   * A unique identifier for this Game.
   * _Example: "totally-unique-game-id"_
   */
  id: string;
  /**
   * Information about the ruleset being used to run this game.
   * _Example: {"name":"standard", "version": "v1.2.3"}_
   */
  ruleset: RuleSet;
  /**
   * How many milliseconds your snake has to respond to requests for this Game.
   * _Example: 500_
   */
  timeout?: number;
};
export function isGame(value: any): value is Game {
  return value &&
    value.id &&
    typeof value.id === "string" &&
    value.ruleset &&
    isRuleSet(value.ruleset) &&
    value.timeout
    ? typeof value.timeout === "number"
    : true;
}
