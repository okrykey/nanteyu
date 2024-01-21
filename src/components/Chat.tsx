"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CopyButton from "@/components/copyButton";

type LanguageCode = "english" | "spanish" | "chinese";

const languageDisplayNames: Record<LanguageCode, string> = {
  english: "英語",
  spanish: "スペイン語",
  chinese: "中国語",
};

const Chat = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageCode>("english");

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chat/${selectedLanguage}`,
  });

  const router = useRouter();

  return (
    <div className=" w-full py-2flex flex-col">
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={input}
          onChange={handleInputChange}
          placeholder="好きな単語やフレーズを入力..."
        />

        <div className="flex justify-between">
          <Select
            onValueChange={(value) =>
              setSelectedLanguage(value as LanguageCode)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="言語を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">英語</SelectItem>
              <SelectItem value="spanish">スペイン語</SelectItem>
              <SelectItem value="chinese">中国語</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit">言い換え</Button>
          <Button onClick={() => void router.push("/answer")}>go</Button>
        </div>
      </form>
      <div className="pt-4">
        {messages.map((m) => (
          <div key={m.id} className="py-1">
            <div className="border p-4">
              {m.role === "user" ? (
                <div>
                  『{m.content}』は{languageDisplayNames[selectedLanguage]}
                  でなんていう？
                </div>
              ) : (
                <>
                  <ReactMarkdown
                    remarkPlugins={[remarkBreaks]}
                    components={{
                      p: ({ children }) => <p className="mb-4">{children}</p>,
                    }}
                    className="markdown"
                  >
                    {m.content}
                  </ReactMarkdown>
                  <CopyButton copyText={m.content} />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
