"use client";

import { db } from "@/db/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { toast } from "react-hot-toast";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");

  const { data: session } = useSession();

  // use to get model
  const model = "text-davinci-003";
  const [messages, loading, error] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  const formatMessages = messages?.docs.map((message) => message.data().text);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: {
        message: {
          content: input,
          role: "user",
        },
      },
      createdAt: new Date(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        role: "user",
        avatar:
          session?.user?.image! ||
          `http://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    //Toast notification
    const notification = toast.loading("Chat GPT is thinking...");

    const messages = [
      ...(formatMessages as any[]),
      { message: { content: input, role: "user" } },
    ];

    await fetch("/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        chatId,
        model,
        session,
      }),
    })
      .then(() => {
        // Toas notification
        toast.success("ChatGPT has responded successfully!", {
          id: notification,
        });
      })
      .catch(() => {
        toast.error("An error occurred"),
          {
            id: notification,
          };
      });
  };

  return (
    <div>
      <div className="bg-gray-700 text-gray-400 rounded-lg text-sm">
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex ">
          <input
            type="text"
            value={prompt}
            placeholder="Digite sua mensagem aqui..."
            className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!prompt || !session}
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
