"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, BaseSyntheticEvent } from "react";
import { Message } from "@prisma/client";

export default function Home() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const handleInputChange = (event: BaseSyntheticEvent) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 dark:bg-gray-950">
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="mx-auto max-w-md space-y-4">

          {/* Render a list of existing messages */}
          {messages.map((message, index) => (
            <div key={index} className="flex items-end justify-end space-x-2">
              <div className="max-w-[65%] rounded-lg rounded-br-none bg-blue-500 p-3 text-white">
                <p>{message.body}</p>
              </div>
              <span />
              <div className="h-8 w-8 rounded-full bg-gray-400" />
            </div>
          ))}

          {/* Capture and render new messages */}
          {events.map((event, index) => (
            <div key={index} className="flex items-end space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-400" />
              <div className="max-w-[65%] rounded-lg rounded-bl-none bg-gray-200 p-3 text-gray-900 dark:bg-gray-800 dark:text-gray-50">
                <p>{event.created.body}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Create a new message */}
      <div className="flex items-center border-t bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
        <Input
          className="flex-1 rounded-lg border-none bg-gray-100 px-4 py-2 text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-gray-50"
          placeholder="Type your message..."
          type="text"
          onChange={handleInputChange}
        />
        <Button className="ml-2" onClick={() => alert(`${newMessage}`)}>Send</Button>
      </div>
    </div>
  );
}
