import { checkDirectory } from "./checkDirectory.js";
import { checkFile } from "./checkFile.js";
import { openAiClient } from "./openAiClient.js";
import { watchFileChange } from "./watchFile.js";
const HOME_DIR =
  process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
if (!HOME_DIR) {
  throw new Error("Environment variable HOME_DIR is not defined.");
}
const CHAT_DIR = `${HOME_DIR}/.chat`;
export const PROMPT_FILE = `${CHAT_DIR}/prompt.txt`;
const HISTORY_DIR = `${CHAT_DIR}/history`;

checkDirectory(CHAT_DIR);
checkDirectory(HISTORY_DIR);
checkFile(PROMPT_FILE);
watchFileChange(PROMPT_FILE, openAiClient);
console.log(`Watching for changes ${PROMPT_FILE}...`);
