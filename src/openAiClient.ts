import fs from "fs";
import { PROMPT_FILE } from "./chat-app.js";
import fetch from "node-fetch";
export function openAiClient() {
  fetch("https://example.com").then((res) => {
    console.log(res);
  });
}
function readPromt() {
  const prompt = fs.readFileSync(PROMPT_FILE, "utf8");
  return prompt;
}
