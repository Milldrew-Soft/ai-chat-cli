import * as fs from "fs";
export function checkDirectory(directory: string) {
  try {
    fs.accessSync(directory, fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    console.error(`${directory} is not accessible.`);
    process.exit(1);
  }
}
