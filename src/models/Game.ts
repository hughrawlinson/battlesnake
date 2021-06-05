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

export interface Game {
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
}

function debugValidity(value: any) {
  console.log(
    value && value.id && typeof value.id == "string"
      ? "game.id is valid"
      : "game.id is invalid"
  );
  console.log(
    value && value.ruleset && isRuleSet(value.ruleset)
      ? "game.ruleset is valid"
      : "game.ruleset is invalid"
  );
  console.log(
    value && value.timeout
      ? typeof value.timeout === "number"
      : true
      ? "game.timeout is valid"
      : "game.timeout is valid"
  );
}

export function isGame(value: any, debug: boolean = false): value is Game {
  if (debug) {
    debugValidity(value);
  }
  return value &&
    value.id &&
    typeof value.id === "string" &&
    value.ruleset &&
    isRuleSet(value.ruleset) &&
    value.timeout
    ? typeof value.timeout === "number"
    : true;
}
