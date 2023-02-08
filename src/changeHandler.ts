import fs from "fs";
import { CHAT_DIR, HISTORY_DIR } from "./chat-app.js";
import { openAiClient } from "./openAiClient.js";
export async function changeHandler() {
  const response = await openAiClient();
  writeResponse(response);
}

function writeResponse(response: string) {
  const historyLog = `${HISTORY_DIR}/${Date().replace(/\s/g, "-")}.txt`;
  const latestResponseFile = `${CHAT_DIR}/latest-response.txt`;
  fs.writeFileSync(latestResponseFile, response);
  fs.writeFileSync(historyLog, response);
}
