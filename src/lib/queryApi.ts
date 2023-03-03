import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
} from "openai";
import openai from "./chatgpt";

type Messages = {
  message: {
    role: string;
    content: string;
  };
};

const query = async (messages: Messages[], chatId: string, model: string) => {
  const formatMessages = messages.map(
    (message) => message.message
  ) as ChatCompletionRequestMessage[];

  const res = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: formatMessages,
    })
    .then((res) => res.data.choices[0])
    .catch(
      (err) =>
        `ChatGPT was unable to find an answer for that! (Error: ${err.message})`
    );

  return res;
};

export default query;
