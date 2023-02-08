const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
console.log(OPEN_AI_KEY);
if (!OPEN_AI_KEY) {
  throw new Error("OPEN_AI_KEY is not defined");
}
import fs from "fs";
import { PROMPT_FILE } from "./chat-app.js";
import fetch, { Response } from "node-fetch";
export function openAiClient() {
  const PROMPT = readPrompt();
  console.log("==========");
  console.log(`Prompting opeanai api...`);
  console.log(`PROMPT: ${PROMPT}`);
  console.log("==========");
  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: PROMPT,
      temperature: 0,
      max_tokens: 2000,
      stop: ["{}"],
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPEN_AI_KEY}`,
    },
  }).then(async (res: Response) => {
    const text = await res.text();
    const data = JSON.parse(text);
    console.log(`Open AI response:`);
    console.log("==========");
    try {
      console.log(data.choices[0].text);
    } catch (error) {
      console.error(data);
    }
    console.log("==========");
  });
}
function readPrompt() {
  const prompt = fs.readFileSync(PROMPT_FILE, "utf8");
  return prompt;
}
