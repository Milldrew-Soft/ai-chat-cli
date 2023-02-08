const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
if (!OPEN_AI_KEY) {
  throw new Error("OPEN_AI_KEY is not defined");
}
import fs from "fs";
import { PROMPT_FILE } from "./chat-app.js";
import fetch, { Response } from "node-fetch";
export async function openAiClient() {
  const PROMPT = readPrompt();
  console.log("==========");
  console.log(`Prompting open ai api...`);
  console.log(`PROMPT: ${PROMPT}`);
  console.log("==========");
  return await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: PROMPT,
      temperature: 0,
      max_tokens: 1500,
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
    let actualResponse;
    try {
      actualResponse = data.choices[0].text;
      console.log(actualResponse);
    } catch (error) {
      actualResponse = data;
      console.error(data);
    }
    console.log("==========");
    return actualResponse;
  });
}
function readPrompt() {
  const prompt = fs.readFileSync(PROMPT_FILE, "utf8");
  return prompt;
}
