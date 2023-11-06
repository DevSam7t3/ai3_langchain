import * as dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { OpenAI } from "langchain/llms/openai";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";

const server = express();
server.use(cors());
server.use(express.json());

const model = new OpenAI({
  temperature: 0,
});

const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    hl: "en",
    gl: "us",
  }),
  new Calculator(),
];

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "zero-shot-react-description",
});
console.log("Loaded the agent..");

server.post("/generate", async (req, res) => {
  const { input } = req.body;

  const data = await executor.call({
    input,
  });

  res.json({ data });
});

const port = 9999;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
