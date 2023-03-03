"use client";

import { db } from "@/db/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const [active, setactive] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (!pathName) return;
    setactive(pathName.includes(id));
  }, [pathName, id]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  const [messages, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "desc")
      )
  );

  messages?.docs.map((message) => console.log(message.data()));

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="w-5 h-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages.docs.length - 1]?.data().text.message
          .content || "New Chat"}
      </p>
      <TrashIcon
        onClick={removeChat}
        className="w-5 h-5 text-gray-700 hover:text-red-500 transition-all duration-200 ease-out z-20"
      />
    </Link>
  );
}

export default ChatRow;
