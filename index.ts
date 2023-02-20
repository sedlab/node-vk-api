import { Request } from "node-vk-api";

const TOKEN = ""; // access_token.

const vk = new Request(TOKEN);

// Возвращает найденные аудиозаписи.
vk.request("audio.search", { q: "Надо ли — ЕГОР КРИД", count: 1 })
  .then((data) => {
    console.log("audio.search");
    console.log(data, { showHidden: true, depth: null });
  })
  .catch((error) => {
    console.error("audio.search");
    console.error(error, { showHidden: true, depth: null });
  });
