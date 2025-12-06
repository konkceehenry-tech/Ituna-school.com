import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatIcon } from './icons/ChatIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SendIcon } from './icons/SendIcon';

interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: { web: { uri: string; title: string; } }[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const chatInstance = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the chat session when the component mounts
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatInstance.current = ai.chats.create({
      model: 'gemini-2.5-flash-lite',
      config: {
        systemInstruction: 'You are Konkcee AI, a helpful and friendly assistant for the Ituna secondary School Portal. Your name is spelled K-O-N-K-C-E-E. Always introduce yourself in the first message. Keep your responses concise and informative, suitable for students, teachers, and parents.',
        tools: [{googleSearch: {}}],
      },
    });

    // Send an initial message to get the welcome text
    const initializeChat = async () => {
        setIsLoading(true);
        try {
            const response = await chatInstance.current?.sendMessage({ message: "Hello" });
            if (response) {
                setMessages([{ role: 'model', text: response.text }]);
            }
        } catch (error) {
            console.error("Error initializing chat:", error);
            setMessages([{ role: 'model', text: 'Hello! I am Konkcee AI. How can I help you today?' }]);
        } finally {
            setIsLoading(false);
        }
    };

    initializeChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chatInstance.current) return;

    const userMessage: Message = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await chatInstance.current.sendMessage({ message: userInput });
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      const sources = groundingMetadata?.groundingChunks?.length > 0 ? groundingMetadata.groundingChunks : undefined;
      
      const modelMessage: Message = { 
        role: 'model', 
        text: response.text,
        sources,
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-3">
        <span className="text-gray-400">Konkcee AI is thinking</span>
        <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></div>
    </div>
  );

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
        <button
          onClick={toggleChat}
          className="bg-black dark:bg-white text-white dark:text-black rounded-full p-4 shadow-lg hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-900"
          aria-label="Open Konkcee AI Chat"
        >
          <ChatIcon className="w-8 h-8" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[70vh] max-h-[600px] flex flex-col bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-2xl chat-widget-enter">
          <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
            <h3 className="font-bold text-lg text-black dark:text-white">Konkcee AI</h3>
            <button
              onClick={toggleChat}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Close chat"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </header>

          <div className="flex-grow p-4 overflow-y-auto chat-messages">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md lg:max-w-xs px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-sky-500 text-white rounded-br-lg' : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-bl-lg'}`}>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    {msg.sources && (
                        <div className="mt-3 pt-2 border-t border-t-gray-300 dark:border-t-gray-700">
                            <h4 className="text-xs font-bold mb-1">Sources:</h4>
                            <ul className="space-y-1">
                                {msg.sources.map((source, i) => (
                                    source.web?.uri && (
                                        <li key={i} className="text-xs truncate">
                                            <a 
                                                href={source.web.uri} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-gray-600 dark:text-gray-300 hover:underline"
                                                title={source.web.title || source.web.uri}
                                            >
                                            {source.web.title || source.web.uri}
                                            </a>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500"
                disabled={isLoading}
                aria-label="Chat input"
              />
              <button
                type="submit"
                className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-colors disabled:bg-sky-800 disabled:cursor-not-allowed"
                disabled={isLoading || !userInput.trim()}
                aria-label="Send message"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;