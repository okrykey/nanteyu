"use client";

import { useChat } from "ai/react";
import { Button } from "./button";
import { Input } from "./input";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className=" w-full py-2 flex flex-col">
      <form
        className="flex flex-col items-end  space-y-4"
        onSubmit={handleSubmit}
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />

        <Button className="flex items-end" type="submit">
          言い換え
        </Button>
      </form>
      {messages.map((m) => (
        <div key={m.id}>
          <div className="border py-4">
            {m.role === "user" ? "User: " : "AI: "}

            {m.content}
          </div>
        </div>
      ))}
    </div>
  );
}
