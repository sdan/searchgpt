// write a search function that returns a list of posts by pinging the OpenAI API
// and then return the results as JSON

import { NextApiRequest, NextApiResponse } from 'next'
const { Configuration, OpenAIApi } = require("openai");



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  

const search = async (req: NextApiRequest, res: NextApiResponse) => {
    // fetch query from request body
    const { q } = req.body


  console.log("api in search function", q)
  const prompting = "You are a search engine that provides useful information to a given search query. Given a query you are to act like a search engine and give search results or an answer that is relevant and useful for the user. If you can provide valid links, provide them. If not do not add a link, instead answer the question to your best ability. Here is the query:\n"+q+"\nSearch Results: \n"



  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompting,
    temperature: 0.5,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  console.log("api response", response.data.choices[0])
  // return openai response as JSON
    res.status(200).json(response.data.choices[0])
    
}

export default search







