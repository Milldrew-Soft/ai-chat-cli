import * as fs from "fs";
export function checkFile(file: string) {
  try {
    fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    console.error(`${file} is being created.`);
    fs.writeFileSync(file, "");
  }
}
