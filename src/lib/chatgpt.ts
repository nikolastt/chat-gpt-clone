import { Configuration } from "openai";
import { OpenAIApi } from "openai/dist/api";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET,
});

const openai = new OpenAIApi(configuration);

export default openai;
