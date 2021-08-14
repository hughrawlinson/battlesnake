#!/usr/bin/env node
import inquirer from "inquirer";
import { execSync } from "child_process";
import { mkdir, readFile, writeFile, stat } from "fs/promises";
import { chdir } from "process";
import { paramCase, camelCase } from "change-case";
import Handlebars from "handlebars";

let gitname;
try {
  gitname = execSync("git config --get user.name").toString().trim();
} catch (e) {}

const promptAnswers = await inquirer.prompt([
  {
    type: "input",
    name: "snakename",
    message: "What is your new battlesnake called?",
  },
  {
    type: "input",
    name: "color",
    default: "#888888",
    message:
      "What color do you want it to be?\nhttps://docs.battlesnake.com/references/personalization#choosing-a-color",
  },
  {
    type: "input",
    name: "head",
    message:
      "What head do you want it to have?\nhttps://docs.battlesnake.com/references/personalization#choosing-a-head-and-tail",
    default: "default",
  },
  {
    type: "input",
    name: "tail",
    message:
      "What tail do you want it to have?\nhttps://docs.battlesnake.com/references/personalization#choosing-a-head-and-tail",
    default: "default",
  },
  {
    type: "input",
    name: "codername",
    default: gitname,
    message: "What's your name?",
  },
  {
    type: "confirm",
    name: "typescript",
    message: "Do you want to use TypeScript?",
  },
]);

if (!promptAnswers.snakename) {
  console.log("You must enter a snakename!");
  process.exit(1);
}

const workdir = `./${paramCase(promptAnswers.snakename)}`;

try {
  await stat(workdir);
  console.log(`${workdir} already exists.`);
  process.exit(1);
} catch (e) {}

console.dir(promptAnswers);

const templateString = promptAnswers.typescript
  ? "./template/index.ts.hbs"
  : "./template/index.mjs.hbs";
const template = Handlebars.compile(
  await readFile(new URL(templateString, import.meta.url), "utf8")
);

await mkdir(workdir);

chdir(workdir);
await execSync(`git init`);
console.log("Initializing git repo");
console.log(`Installing npm dependencies`);
await execSync(`npm init -y`);
await execSync(`npm install --save battlesnake battlesnake-plugin-ngrok`);
const populatedTemplate = template({
  ...promptAnswers,
  snakeNameCamel: camelCase(promptAnswers.snakename),
});

console.log(`Installed npm dependencies`);

let packagejsonDefaults = {
  name: `battlesnake-${paramCase(promptAnswers.snakename)}`,
  description: `${promptAnswers.codername}'s awesome battlesnake`,
  private: true,
  scripts: {
    start: "node index.mjs",
  },
  engines: {
    node: ">=14.0.0",
  },
};

if (promptAnswers.typescript) {
  await writeFile("./index.ts", populatedTemplate);
  await execSync(`npm install --save-dev typescript @kirbysayshi/ts-run`);
  await execSync(`tsc --init`);
  packagejsonDefaults = {
    ...packagejsonDefaults,
    main: "index.ts",
    scripts: {
      ...packagejsonDefaults.scripts,
      start: "ts-run index.ts",
    },
  };
} else {
  await writeFile("./index.mjs", populatedTemplate);
}

const packagejson = JSON.parse(await readFile("./package.json", "utf8"));
await writeFile(
  "./package.json",
  JSON.stringify(
    {
      ...packagejson,
      ...packagejsonDefaults,
      scripts: {
        ...packagejson.scripts,
        ...packagejsonDefaults.scripts,
      },
    },
    null,
    2
  )
);

await execSync(`git add .`);
await execSync(`git commit -m "Initial Commit"`);

console.log(`Success! created ${promptAnswers.snakeName} at ${workdir}`);

console.log(`
We suggest that you begin by typing:

  cd ${workdir}
  npm start
`);
