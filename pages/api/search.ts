// write a search function that returns a list of posts by pinging the OpenAI API
// and then return the results as JSON

import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");

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

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompting,
    temperature: 0.5,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  // return openai response as JSON
  res.status(200).json(response.data.choices[0]);
};

export default search;
