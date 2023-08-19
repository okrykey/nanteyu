import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request

  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  const prompt = {
    role: "user" as ChatCompletionRequestMessageRoleEnum,
    content: `Translate the Japanese phrase "${lastMessage.content}" into English(easy phrase) and explain its meaning in Japanese. Use the following format:

## 『${lastMessage.content}』は英語ではこのように表現します。
- ### **英単語**  

### "**英単語**"の意味と使い方
**英単語**は「〜〜」という意味で、〜〜のための英語です。この単語は、〜〜を描表す際に使われます。
類義語：**~**, **~**, **~**

### "**英単語**"を使った日常生活で使える英語のフレーズ
- **〜〜(〜〜の日本語訳)**
- **〜〜(〜〜の日本語訳)**
- **〜〜(〜〜の日本語訳)**
`,
  };

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [prompt],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
