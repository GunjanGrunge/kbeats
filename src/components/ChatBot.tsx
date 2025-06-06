'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const formatTime = (isoString: string) => {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showClearWarning, setShowClearWarning] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    [
      {
        text: "Hi! I'm Ria from K BEATS. How can I assist you with your music production needs today?",
        isUser: false,
        timestamp: new Date().toISOString(),
      },
    ]
  );
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClearChat = () => {
    setShowClearWarning(true);
  };

  const confirmClearChat = async () => {
    // Reset messages to initial state
    setMessages([
      {
        text: "Hi! I'm Ria from K BEATS. How can I assist you with your music production needs today?",
        isUser: false,
        timestamp: new Date().toISOString(),
      },
    ]);
      // Clear chat history on the server
    try {
      await fetch('/api/chat', {
        method: 'DELETE',
      });
      toast.success('Chat history cleared successfully!');
    } catch (error) {
      console.error('Error clearing chat history:', error);
      toast.error('Failed to clear chat history');
    }
    
    setShowClearWarning(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map((msg) => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text,
          })).concat({
            role: 'user',
            content: inputMessage,
          }),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }      const data = await response.json();

      const botMessage: Message = {
        text: data.reply,
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        text: "I'm having trouble connecting right now. Please email us at artists@kebeatsofficial.com for immediate assistance.",
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 animate-pulse group"
      >
        <div className="absolute inset-0 rounded-full border-4 border-[#DAF222] bg-[#020126] shadow-[0_0_15px_rgba(218,242,34,0.5)] group-hover:shadow-[0_0_20px_rgba(218,242,34,0.7)] transition-shadow"></div>
        <div className="w-full h-full rounded-full overflow-hidden">
          <Image
            src="/chatbot-avatar.png"
            alt="K Beats Chat Assistant"
            width={96}
            height={96}
            className="object-cover w-full h-full scale-110 group-hover:scale-125 transition-transform duration-300"
          />
        </div>
      </button>
    );
  }

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-96 max-w-[90vw] bg-[#020126] rounded-xl shadow-2xl border border-[#DAF222]/20 overflow-hidden backdrop-blur-md">
          {/* Header */}
          <div className="p-4 border-b border-[#DAF222]/20 flex items-center justify-between bg-[#020126]/90">
            <div className="flex items-center space-x-3">              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <div className="absolute inset-0 rounded-full border-2 border-[#DAF222] bg-[#020126] shadow-[0_0_8px_rgba(218,242,34,0.3)]"></div>
                <Image
                  src="/chatbot-avatar.png"
                  alt="K Beats Chat Assistant"
                  width={32}
                  height={32}
                  className="relative object-cover w-full h-full scale-110"
                />
              </div>
              <h3 className="text-[#ECF241] font-medium">Ria</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClearChat}
                className="text-[#ECF241] hover:text-[#A6A049] p-2"
                title="Clear chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#ECF241] hover:text-[#A6A049]"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.isUser
                      ? 'bg-[#DAF222] text-[#020126]'
                      : 'bg-[#8A8C87] text-[#ECF241]'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 rounded-lg px-4 py-2">
                  Ria is typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-600">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6F00]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-[#DAF222] text-[#020126] px-4 py-2 rounded hover:bg-[#ECF241] transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Clear Chat Warning Modal */}
      {showClearWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Clear Chat History?</h3>
            <p className="text-gray-600 mb-6">
              This will delete all messages and reset the conversation. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowClearWarning(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearChat}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
