#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from "commander";
import chalk from "chalk";
import crypto from "crypto";
const program = new Command();
const warn = (message) => {
    console.log(chalk.yellow("Warning: ") + message);
};
const error = (message) => {
    console.log(chalk.red("Error: ") + message);
    process.exit(0);
};
const types = ["base64", "hex", "base64url"];
const generateSecretKey = (length, type) => __awaiter(void 0, void 0, void 0, function* () {
    return crypto.randomBytes(length).toString(type);
});
program
    .version("1.0.0")
    .description("An example command line tool to generate random secret keys")
    .option("-b, --length <length>", "length of the secret key", "256")
    .option("-t, --type <type>", "type of the secret key (base64, hex, base64url)", "base64")
    .parse(process.argv);
const options = program.opts();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
        let secretKey = yield generateSecretKey(+length, type);
        if (type === "base64") {
            secretKey = secretKey.slice(0, -2);
        }
        console.log("\n" + chalk.blue("Your secret key is: ") + "\n");
        console.log(secretKey);
    });
}
main();
//# sourceMappingURL=index.js.map