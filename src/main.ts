const express = require("express");
const bodyParser = require("body-parser");
import { Express, Request } from "express";
import { Board } from "./models/Board";
import { Battlesnake, You } from "./models/Battlesnake";
import { BattlesnakeInfo } from "./models/BattlesnakeInfo";
import { GameData, isGameData } from "./models/GameData";
import { Game } from "./models/Game";
import { Position } from "./models/Position";
import { PluginInterface } from "./PluginInterface";

export const possibleMoves = ["up", "down", "left", "right"] as const;
export type PossibleMove = typeof possibleMoves[number];

interface MoveResponse {
  move: "up" | "down" | "left" | "right";
  shout?: string;
}

interface EventHandlers {
  getBattlesnake: () => BattlesnakeInfo;
  startGame: (request: GameData) => any;
  move: (request: GameData) => MoveResponse;
  endGame: (request: GameData) => any;
}

class BadRequestError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 422;
  }
}

function processGameData(req: Request): GameData {
  let gameData = req.body;

  if (!isGameData(gameData)) {
    isGameData(gameData);
    throw new BadRequestError(
      `Received invalid game data from on post to ${req.path}.\n\n${
        JSON.stringify(gameData) || gameData
      }`
    );
  }

  return gameData;
}

function setUpRequestHandlers(
  app: Express,
  eventHandlers: EventHandlers,
  snake: BattlesnakeInfo
) {
  app.get("/", (req, res) => {
    // @ts-ignore
    console.log("pre-handler: " + new Date() - req.startTime);
    res.status(200).json(snake);
  });

  app.post("/start", (req, res) => {
    // @ts-ignore
    res.status(200).send("ok");
    let gameData = processGameData(req);
    eventHandlers.startGame(gameData);
  });

  app.post("/move", (req, res) => {
    let gameData = processGameData(req);
    let response = eventHandlers.move(gameData);
    res.status(200).json(response);
  });

  app.post("/end", (req, res) => {
    let gameData = processGameData(req);
    eventHandlers.endGame(gameData);
    res.status(200).send("ok");
  });
}

function isCompleteHandlers(
  eventHandlers: Partial<EventHandlers>
): asserts eventHandlers is EventHandlers {
  switch (true) {
    case !eventHandlers.getBattlesnake:
      throw new Error(
        "You must define your getBattlesnake handler before starting your snake"
      );
    case !eventHandlers.startGame:
      throw new Error(
        "You must define your startGame handler before starting your snake"
      );
    case !eventHandlers.move:
      throw new Error(
        "You must define your move handler before starting your snake"
      );
    case !eventHandlers.endGame:
      throw new Error(
        "You must define your endGame handler before starting your snake"
      );
  }
}

function setUpErrorHandler(app: Express) {
  // @types/express doesn't have a signature for registering an error handler
  // @ts-ignore
  // app.use(function (err, req, res, next) {
  //   //@ts-ignore
  //   res.json({
  //     status: "error",
  //     // @ts-ignore
  //     message: err.message,
  //   });
  // next();
  // });
}

function makeBaseUrl(name: string, snakeInfo: BattlesnakeInfo) {
  return `/snake/${name}/${snakeInfo.version}`;
}

interface BattleSnakeOptions {
  baseUrl?: string;
  app?: Express;
  plugins?: PluginInterface[];
}

/**
 * BattleSnake - a constructor for your Battlesnake
 *
 * @param battlesnakeOptions - A callback that will be called when the Battlesnake
 * server requests a move from your snake. Must be called before
 * Battlesnake.start.
 */
export function BattleSnake(
  snakeName: string,
  battlesnakeInfo: BattlesnakeInfo,
  options?: BattleSnakeOptions
) {
  const plugins = [...(options?.plugins ?? [])];
  const app: Express = (options && options.app) || express();
  const snakeApp: Express = express();
  // snakeApp.use((req, res, next) => {
  //   // @ts-ignore
  //   req.startTime = new Date();
  //   req.on("close", () => {
  //     //@ts-ignore
  //     let elapsedMilliseconds = new Date() - req.startTime;
  //     console.log("endpoint: " + req.path);
  //     console.log("timeout: " + elapsedMilliseconds);
  //   });
  //   next();
  // });
  app.use(bodyParser.json());
  const baseUrl =
    (options && options.baseUrl) || makeBaseUrl(snakeName, battlesnakeInfo);
  app.use(baseUrl, snakeApp);
  const eventHandlers: Partial<EventHandlers> = {
    getBattlesnake: () => battlesnakeInfo,
  };

  return {
    /**
     * onStartGame: Register your handler to be notified when games start. Must
     * be called before Battlesnake.start();
     *
     * @param startHandler - A function that will be called with the start data of a
     * game. Values returned from this function will be ignored.
     *
     * ```
     * mySnake.onStartGame((gameData) => {
     *   console.log(gameData);
     * });
     * ```
     */
    onStartGame(startHandler: EventHandlers["startGame"]) {
      eventHandlers.startGame = startHandler;
    },
    /**
     * onMove: Register your handler for when the Battlesnake server requests a
     * move from your snake. Must be called before Battlesnake.start().
     *
     * @param handler - A callback that will be called when the Battlesnake
     * server requests a move from your snake. Must be called before
     * Battlesnake.start.
     */
    onMove(handler: EventHandlers["move"]) {
      eventHandlers.move = handler;
    },
    /**
     * onEndGame: Register your handler for when the Battlesnake server tells
     * your snake that the game is over. Must be called before
     * Battlesnake.start().
     *
     * @param handler - A callback that will be called when the Battlesnake
     * server tells your snake that the game is over. Must be called before
     * Battlesnake.start.
     */
    onEndGame(handler: EventHandlers["endGame"]) {
      eventHandlers.endGame = handler;
    },
    /**
     * Once all your event handlers are registered, call this method to start
     * your Battlesnake's server. All event handlers must be registered before
     * starting, otherwise a detailed error will be thrown.
     */
    start() {
      isCompleteHandlers(eventHandlers);

      // snakeApp.use((req, res, next) => {
      //   console.log(req.path);
      //   next();
      // });

      // Sorry about the 'as', as you can see we've done this check above, but
      // typescript doesn't understand it.
      setUpRequestHandlers(snakeApp, eventHandlers, battlesnakeInfo);

      setUpErrorHandler(snakeApp);

      const port = process.env.PORT || "5000";
      app.listen(port, () => {
        console.log(
          `BattleSnake ${snakeName} reporting for duty!\n\nhttp://0.0.0.0:${port}${baseUrl}`
        );
        plugins.forEach((plugin) => {
          if (typeof plugin.onListening === "function") {
            plugin.onListening(port, baseUrl);
          }
        });
      });
    },
    app: snakeApp,
  };
}

export { GameData, Position, Battlesnake, You, BattlesnakeInfo, Board, Game };
