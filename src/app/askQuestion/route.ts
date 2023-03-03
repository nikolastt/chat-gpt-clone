import query from "@/lib/queryApi";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminDb } from "@/db/firebaseAdmin";
import { serverTimestamp } from "firebase/firestore";
import { type } from "os";

export async function POST(req: NextRequest, res: NextResponse) {
  const { messages, chatId, model, session } = await req.json();

  if (!messages) {
    return new NextResponse(
      JSON.stringify({ answer: "Please enter a messages" }),
      {
        status: 400,
      }
    );
  }

  if (!chatId) {
    return new NextResponse(
      JSON.stringify({ answer: "Please enter a chatId" }),
      {
        status: 400,
      }
    );
  }

  const response = await query(messages, chatId, model);

  const text =
    typeof response === typeof String
      ? { message: { content: response, role: "assistent" } }
      : response;

  const message: Message = {
    text: response as { message: { role: string; content: string } },

    createdAt: new Date(),

    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      role: "assistant",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  return NextResponse.json({ answer: message.text });
  // return NextResponse.json({ answer: "message.text" });
}
