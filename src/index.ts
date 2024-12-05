#! /usr/bin/env node

import { Command } from "commander";
import Clipboard from "clipboardy";
import chalk from "chalk";
import crypto from "crypto";
import { PKG_DESCRIPTION, PKG_VERSION } from "./version.js";

const program = new Command();

const warn = (message: string, supress?: boolean) => {
    if (supress) {
        return;
    }

    console.log(chalk.yellow("Warning: ") + message);
};

const error = (message: string) => {
    console.log(chalk.red("Error: ") + message);
    process.exit(0);
};

const info = (message: string, supress?: boolean) => {
    if (supress) {
        return;
    }

    console.log(chalk.blue(message));
};

const types = ["base64", "hex", "base64url"];

const generateSecretKey = async (length: number, type: BufferEncoding) => {
    return crypto.randomBytes(length).toString(type);
};

program
    .version(PKG_VERSION)
    .description(PKG_DESCRIPTION)

    .option(
        "-l, --length <length>",
        "length of the secret key (between 4 and 268435456)",
        "256",
    )
    .option(
        "-t, --type <type>",
        "type of the secret key (base64, hex, base64url)",
        "base64",
    )
    .option("-c, --clipboard", "copy the key to the clipboard", false)
    .option(
        "-ch, --clipboard_hide",
        "copy to the clipboard and hide token",
        false,
    )
    .option("-std, --std", "print only the key (useful for piping)", false)
    .parse(process.argv);

const options = program.opts();

async function main() {
    const { length, type, clipboard, clipboard_hide, std } = options;

    const supress = !!std;

    if (isNaN(length)) {
        error("Length must be a number");
    }

    if (length < 4) {
        error("Length must be greater than 4");
    }

    if (length > 268435456) {
        error("Length must be less than 268435456");
    }

    if (length < 128) {
        warn(
            "It is recommend to have a minimum length of 128 bits for secret keys",
            supress,
        );
    }

    if (!types.includes(type)) {
        error("Type must be one of base64, hex or base64url");
    }
    if (type === "hex") {
        warn("It is recommend to not using hex for secret keys", supress);
    }

    let secretKey = await generateSecretKey(+length, type);

    if (type === "base64") {
        secretKey = secretKey.slice(0, -2);
    }

    if (!!clipboard || !!clipboard_hide) {
        await Clipboard.write(secretKey);

        info("\nCopied key to clipboard", supress);
    }

    if (!!clipboard_hide) {
        return;
    }

    if (!supress) {
        info("\nYour secret key is: ");
    }

    console.log(secretKey);
}

main();
