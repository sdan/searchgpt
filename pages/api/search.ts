// write a search function that returns a list of posts by pinging the OpenAI API
// and then return the results as JSON

import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi, ChatCompletion } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  // fetch query from request body
  const { q } = req.body;
  const prompting =
    process.env.GPT3_PROMPT +
    q +
    "\nSearch Results: \n";

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
    {"role":"system","content":process.env.GPT3_PROMPT},
    {"role":"system","content":q},
    {"role":"system","content":"\nSearch Results: \n"},
  ]
});
  // return openai response as JSON
  res.status(200).json(response.data.choices[0].message.content);
};

export default search;
