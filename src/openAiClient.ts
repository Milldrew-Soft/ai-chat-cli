import fetch from "node-fetch";
export function openAiClient() {
  fetch("https://example.com").then((res) => {
    console.log(res);
  });
}
