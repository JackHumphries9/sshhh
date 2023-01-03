#! /usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import crypto from "crypto";
import { PKG_DESCRIPTION, PKG_VERSION } from "./version.js";

const program = new Command();

const warn = (message: string) => {
	console.log(chalk.yellow("Warning: ") + message);
};

const error = (message: string) => {
	console.log(chalk.red("Error: ") + message);
	process.exit(0);
};

const types = ["base64", "hex", "base64url"];

const generateSecretKey = async (length: number, type: BufferEncoding) => {
	return crypto.randomBytes(length).toString(type);
};

program
	.version(PKG_VERSION)
	.description(PKG_DESCRIPTION)

	.option("-b, --length <length>", "length of the secret key", "256")
	.option(
		"-t, --type <type>",
		"type of the secret key (base64, hex, base64url)",
		"base64"
	)
	.parse(process.argv);

const options = program.opts();

async function main() {
	const { length, type } = options;

	if (isNaN(length)) {
		error("Length must be a number");
	}

	if (length < 128) {
		warn("We recommend a minimum length of 128 bits for secret keys");
	}

	if (!types.includes(type)) {
		error("Type must be one of base64, hex or base64url");
	}
	if (type === "hex") {
		warn("We recommend not using hex for secret keys");
	}

	let secretKey = await generateSecretKey(+length, type);

	if (type === "base64") {
		secretKey = secretKey.slice(0, -2);
	}

	console.log("\n" + chalk.blue("Your secret key is: ") + "\n");

	console.log(secretKey);
}

main();
