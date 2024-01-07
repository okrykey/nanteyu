"use client";
import { useChat } from "ai/react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

type LanguageCode = "english" | "spanish" | "chinese";

const languageDisplayNames: Record<LanguageCode, string> = {
  english: "英語",
  spanish: "スペイン語",
  chinese: "中国語",
};

export default function UserIdtoChatEnglish() {
  const [selectedLanguage] = useState<LanguageCode>("english");
  const { messages } = useChat({
    api: `/api/chat/${selectedLanguage}`,
  });
  return (
    <div>
      {messages.map((m) => (
        <div key={m.id} className="py-1">
          <div className="border py-4">
            {m.role === "user" ? (
              <div>
                『{m.content}』は{languageDisplayNames[selectedLanguage]}
                でなんていう？
              </div>
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
  );
}
