import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  return (
    <Link href={`/chat/${id}`} className="chatRow justify-center">
      <ChatBubbleLeftIcon className="w-5 h-5" />
      <p className="flex-1 hidden md:inline-flex truncate"></p>
      <TrashIcon className="w-5 h-5 text-gray-700 hover:text-red-500 transition-all duration-200 ease-out" />
    </Link>
  );
}

export default ChatRow;
