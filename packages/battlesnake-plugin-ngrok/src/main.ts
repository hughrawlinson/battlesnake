import { Ngrok } from "ngrok";
import { join } from "path";
const ngrok = require("ngrok");

interface BattlesnakeNgrokOptions {
  ngrokConfig?: Ngrok.Options;
  /**
   * By default, ngrok won't run when NODE_ENV is set to production. If you
   * would like it to run in production, set this value to true.
   */
  runInProduction?: boolean;
  /**
   * By default, ngrok won't run when NODE_ENV is set to test. If you
   * would like it to run in tests, set this value to true.
   */
  runInTest?: boolean;
}

export function battlesnakeNgrok(config?: BattlesnakeNgrokOptions) {
  const { authtoken } = config?.ngrokConfig ?? {};
  const binPath = join(__dirname, "../../../node_modules/ngrok/bin");
  const prod =
    (process.env.NODE_ENV === "production") != config?.runInProduction;
  const test = (process.env.NODE_ENV === "test") != config?.runInTest;
  return {
    async onListening(port: string, path: string) {
      // this is fiddly, but both of these flags are true if the env isn't
      // either production or test. can't think of a better name for these now,
      // sorry!
      if (prod && test) {
        const url = await ngrok.connect({
          authtoken,
          addr: port || config?.ngrokConfig?.addr,
          ...config,
          binPath: () => binPath,
        });
        console.log(`Ngrok forwarding: ${url}${path}`);
      }
    },
  };
}
