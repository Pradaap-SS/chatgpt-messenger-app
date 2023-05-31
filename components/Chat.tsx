"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Message from "./Message";
import { useEffect, useRef } from "react";

type Props = {
    chatId: string
};

function Chat({chatId}: Props) {
  const {data:session} = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  
    const [messages] =useCollection(session && query(
      collection(db, "users", session?.user?.email!, "chats", chatId,
      "messages"),
      orderBy("createdAt", "asc")
    )
    );

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      scrollToBottom();
      // console.log("Scroll to bottom")
    }, [messages?.docs.length]);
    
      return (
          <div className="flex-1 rounded-lg overflow-y-auto overflow-x-hidden">
          {messages?.empty && (
            <>
                <p className="mt-10 text-center text-white"> Type in a prompt below to get started! </p>
                <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce"/>
            </>
          )}
                {messages?.docs.map((message) => (<Message key={message.id} message={message.data()}/>))}
                <div ref={messagesEndRef} />
          </div>
      );
}

export default Chat;