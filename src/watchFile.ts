import fs from "fs";
import choki from "chokidar";
import { PROMPT_FILE } from "./chat-app.js";
type ChangeHandler = () => void;
export function watchFileChange(path: string, changeHandler: ChangeHandler) {
  const watcher = choki.watch(path, {
    ignoreInitial: true,
  });

  watcher.on("change", (path) => {
    console.log(`File ${path} has been changed`);
    changeHandler();
  });
}

function readPromt() {
  const prompt = fs.readFileSync(PROMPT_FILE, "utf8");
  return prompt;
}
