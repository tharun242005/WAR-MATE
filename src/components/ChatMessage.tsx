
import React from 'react';
import { motion } from 'framer-motion';

export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
  index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, index }) => {
  const isUser = message.sender === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div 
        className={`
          max-w-[80%] rounded-lg p-4 
          ${isUser 
            ? 'bg-primary/20 border border-primary/30 text-white' 
            : 'glass-morphism border border-gray-700/50 text-white'}
        `}
      >
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center mr-2">
              <span className="font-bold text-xs text-white">WM</span>
            </div>
            <span className="font-bold">WarMate</span>
            <span className="ml-2 text-xs text-gray-400">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
        
        <div className="whitespace-pre-wrap">{message.content}</div>
        
        {isUser && (
          <div className="text-right mt-1">
            <span className="text-xs text-gray-400">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
