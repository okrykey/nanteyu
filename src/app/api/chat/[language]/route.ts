import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse, streamToResponse } from "ai";
import { prisma } from "@/lib/prismaClient";
import { getUser } from "@/lib/clerk";

const languageMap: Record<string, number> = {
  english: 1,
  spanish: 2,
  chinese: 3,
};

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(
  req: Request,
  { params }: { params: { language: string } }
) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  const user = await getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  let translationLanguage = "英語";
  switch (params.language) {
    case "spanish":
      translationLanguage = "スペイン語";
      break;
    case "chinese":
      translationLanguage = "中国語";
      break;
  }

  const promptQuestion = `『${lastMessage.content}』は${translationLanguage}でなんていう？`;

  const prompt = {
    role: "user" as ChatCompletionRequestMessageRoleEnum,
    content: `Given the Japanese phrase "${lastMessage.content}", provide its most direct translation in ${translationLanguage}. Then, offer an explanation of the translation in Japanese. It's essential that the explanation is entirely in Japanese and incorporates the ** symbol for emphasis, without fail. Use the format detailed below:

    ### 『${lastMessage.content}』は${translationLanguage}でこのように表現されます。
    - #### **(Provide the translation here)**
    
    ### ${translationLanguage}での "**(Repeat the translation here)**" の意味とは？
    (Repeat the translation)は「〜〜」という意味です。この言葉は、〜〜を表現する際に${translationLanguage}でよく使われます。
    
    類義語: **(Provide the other translation )**, **(Provide the other translation 2)**, **(Provide the other translation 3)**
    
    ### "**(Repeat the translation here)**" を用いた日常生活で使えるフレーズ
    - **~~** (そのフレーズの日本語訳)
    - **~~** (そのフレーズの日本語訳)
    - **~~** (そのフレーズの日本語訳)
    
    For reference, when translating the Japanese word "支離滅裂", the English equivalent is "Incoherent". Example sentences include:
    - **His explanation was incoherent.** (彼の説明は支離滅裂だった。)
    - **The speaker's words became increasingly incoherent.** (話者の言葉がますます支離滅裂になった。)
    - **The essay was full of incoherent thoughts.** (そのエッセイは支離滅裂な考えでいっぱいだった。)
    `,
  };

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0,
    messages: [prompt],
  });

  let createdPostId: number;

  const stream = OpenAIStream(response, {
    onStart: async () => {
      const newPost = await prisma.post.create({
        data: {
          userId: user.id,
          languageId: languageMap[params.language],
          question: promptQuestion,
          response: "",
        },
      });
      createdPostId = newPost.id;
    },
    onCompletion: async (completion) => {
      await prisma.post.update({
        where: { id: createdPostId },
        data: { response: completion },
      });
    },
  });

  return new StreamingTextResponse(stream);
}
