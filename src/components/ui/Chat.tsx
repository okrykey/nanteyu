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

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className=" w-full py-2 flex flex-col">
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />

        <div className="flex justify-between">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="言語を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">英語</SelectItem>
              <SelectItem value="dark">スペイン語</SelectItem>
              <SelectItem value="system">中国語</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit">言い換え</Button>
        </div>
      </form>
      <div className="pt-4">
        {messages.map((m) => (
          <div key={m.id} className="py-1">
            <div className="border py-4">
              {m.role === "user" ? (
                <div>『{m.content}』は言語でなんていう？</div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  components={{
                    p: ({ children }) => (
                      <p style={{ marginBottom: "1em" }}>{children}</p>
                    ),
                  }}
                  className="markdown"
                >
                  {m.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
