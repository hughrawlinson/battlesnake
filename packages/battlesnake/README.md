# `battlesnake`

[![npm version](https://badge.fury.io/js/battlesnake.svg)](https://badge.fury.io/js/battlesnake)

Stop worrying about networking and start focusing on your snake brain!

`battlesnake` is an SDK to help you build Battlensnakes quickly. It provides a
simple API to create snakes, and respond to game events. It also handles plugins

## Features

- Complete types to catch some types of bugs before you deploy them
- Docstrings for documentation you can see in your editor as you work
- A plugin system to extend the functionality of the SDK
- A simple event system to handle game events

## Usage

_If you're starting with a new snake, I recommend using the `create-battlesnake`
snake generator to scaffold a new project. It uses the `battlesnake` package
in the projects it creates._

The core component of the SDK is the `BattleSnake` class. You can import it as
shown below:

```ts
import { BattleSnake } from 'battlesnake';
```

The `BattleSnake` class stores information about your snake, and spins up a
server to handle requests from the Battlesnake game engine. Get started by
creating an instance of the `BattleSnake` class:

```ts
const mySnake = new BattleSnake({
  apiversion: "1",
  author: "",
  color: "#888888",
  head: "default",
  tail: "default",
  version: "0.0.1",
});
```

From there,

## Plugins

The `BattleSnake` class can take an array of plugins in its configuration.
Plugins can hook into lifecycle events, and can help abstract behavior so that
you don't have to write it manually, or manage it by hand.

Check out [battlesnake-plugin-ngrok] as an example of a plugin.

## Feature requests and bugs

Please feel free to file feature requests and bugs at the issue tracker.

[battlesnake-plugin-ngrok]: ../battlesnake-plugin-ngrok
