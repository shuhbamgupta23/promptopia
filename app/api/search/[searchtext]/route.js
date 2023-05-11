import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {

  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    const searchUserName = prompts.filter((prompt) => {
      if (prompt?.creator.username === params.searchtext) return prompt;
    });
    const searchTag = prompts.filter((prompt) => {
      if (prompt?.tag === params.searchtext) {
        if (searchUserName.includes(prompt) === false) return prompt;
      }
    });
    const result = [...searchUserName, ...searchTag];
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch", { status: 404 });
  }
};
