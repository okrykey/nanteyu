"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className=" w-full py-2 flex flex-col stretch">
      <form onSubmit={handleSubmit}>
        <input
          className=" w-full border border-gray-300 rounded mb-4 p-2"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />

        <button
          className="rounded px-1 border hover:border-blue-500"
          type="submit"
        >
          Send
        </button>
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
