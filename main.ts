import { Args, parseArgs } from "./deps.ts";
import help from "./src/arguments/help.ts";
import version from "./src/arguments/version.ts";
import bootstrap from "./src/bootstrap.ts";
import { app } from "./src/constants.ts";
import all from "./src/subcommands/all/all.ts";
import assets from "./src/subcommands/assets/assets.ts";
import database from "./src/subcommands/database/database.ts";

import { Command } from "./types.ts";

/** The command definition. */
const command: Command = {
	run: run,
	aliases: [],
	description: app.description,
	subcommands: [all, assets, database],
	optionalArguments: [version, help],
};

/** The arguments entered by the user. */
const userEnteredArgs = parseArgs(Deno.args);

/** The command entered by the user. */
const userEnteredCommand = userEnteredArgs._.shift() as string;

/**
 * Process the command(s) and/or argument(s) entered by the user.
 *
 * @param args The arguments entered by the user.
 */
async function run(args: Args) {
	await bootstrap(command, userEnteredCommand, args);
}

command.run(userEnteredArgs);

export default command;
