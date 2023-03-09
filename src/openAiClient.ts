const messages: Message[] = [];
type Message = {
  role: "user" | "agent" | "assistant";
  content: string;
};
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
if (!OPEN_AI_KEY) {
  throw new Error("OPEN_AI_KEY is not defined");
}
import fs from "fs";
import { PROMPT_FILE } from "./chat-app.js";
import fetch, { Response } from "node-fetch";
export async function openAiClient() {
  const PROMPT = readPrompt();
  const message: Message = { role: "user", content: PROMPT }; // this is the message from the user
  messages.push(message);
  console.log("==========");
  console.log(`Prompting open ai api...`);
  console.log(`PROMPT: ${PROMPT}`);
  console.log("==========");
  return await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo-0301",
      messages,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPEN_AI_KEY}`,
    },
  }).then(async (res: Response) => {
    let actualResponse;
    const response: any = await res.json();
    const gptResponseMessage: Message = response.choices[0].message;
    messages.push(gptResponseMessage);
    console.log({ messages });
    console.log(`Open AI response:`);
    console.log("==========");
    try {
      actualResponse = gptResponseMessage.content;
      console.log(actualResponse);
    } catch (error) {
      console.error(error);
      return "error";
    }
    console.log("==========");
    return actualResponse;
  }, console.error);
}
function readPrompt() {
  const prompt = fs.readFileSync(PROMPT_FILE, "utf8");
  return prompt;
}
