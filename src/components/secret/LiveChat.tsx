import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { mockMessages, Message } from '../../utils/mockData';
import { SendIcon, CheckIcon, CheckCheckIcon, TrashIcon, MessageCircleIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import PowerExit from './PowerExit';
interface LiveChatProps {
  onExit?: () => void;
}
const LiveChat: React.FC<LiveChatProps> = ({
  onExit
}) => {
  const {
    user
  } = useAuth();
  const [messages, setMessages] = useState<Message[]>(mockMessages.slice(0, 5));
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOtherUserOnline] = useState(true);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, isOtherUserTyping]);
  // Mark messages as read when they are viewed
  useEffect(() => {
    setMessages(prevMessages => prevMessages.map(msg => msg.sender === 'other' && !msg.isRead ? {
      ...msg,
      isRead: true
    } : msg));
  }, []);
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
      isRead: false
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
    // Simulate typing indicator
    setIsOtherUserTyping(true);
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    // Simulate response after a delay
    typingTimeoutRef.current = setTimeout(() => {
      setIsOtherUserTyping(false);
      const responses = ["I'm really enjoying our conversation!", "That's an interesting point. What do you think about...", 'I was just thinking about that too!', "Let's talk more about this later.", "I'm glad you brought that up!"];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'other',
        text: randomResponse,
        timestamp: new Date(),
        isRead: false
      };
      setMessages(prev => [...prev, responseMsg]);
    }, 2000 + Math.random() * 1000);
  };
  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const formatMessageTime = (date: Date) => {
    return formatDistanceToNow(date, {
      addSuffix: true
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };
  return <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Lover&background=random" alt="Lover" className="h-full w-full object-cover" />
            </div>
            {isOtherUserOnline && <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></span>}
          </div>
          <div className="ml-3">
            <h3 className="text-white font-medium">Lover</h3>
            <p className="text-xs text-gray-400">
              {isOtherUserTyping ? 'Typing...' : isOtherUserOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <PowerExit onExit={onExit} />
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300 flex items-center">
            <span className="mr-1">Live Chat</span>
            <MessageCircleIcon className="h-3 w-3 text-blue-500" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => <motion.div key={msg.id} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.2
      }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'other' && <div className="h-8 w-8 rounded-full bg-gray-700 flex-shrink-0 mr-2 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Lover&background=random" alt="Lover" className="h-full w-full object-cover" />
              </div>}
            <div className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-white rounded-bl-none'}`}>
              <div className="flex flex-col">
                <p className="break-words">{msg.text}</p>
                <div className={`flex items-center text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70 justify-end' : 'text-gray-400'}`}>
                  <span>{formatMessageTime(msg.timestamp)}</span>
                  {msg.sender === 'user' && <span className="ml-1">
                      {msg.isRead ? <CheckCheckIcon className="h-3 w-3" /> : <CheckIcon className="h-3 w-3" />}
                    </span>}
                </div>
              </div>
            </div>
            {msg.sender === 'user' && <>
                <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => handleDeleteMessage(msg.id)} className="ml-2 text-gray-500 hover:text-red-500 self-end mb-2">
                  <TrashIcon className="h-4 w-4" />
                </motion.button>
                <div className="h-8 w-8 rounded-full bg-gray-700 flex-shrink-0 ml-2 overflow-hidden">
                  <img src={user?.avatar || 'https://ui-avatars.com/api/?name=You&background=random'} alt="You" className="h-full w-full object-cover" />
                </div>
              </>}
          </motion.div>)}
        {isOtherUserTyping && <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex-shrink-0 mr-2 overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Lover&background=random" alt="Lover" className="h-full w-full object-cover" />
            </div>
            <div className="bg-gray-800 rounded-lg px-4 py-2 inline-flex items-center">
              <span className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          </div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="flex-1 relative">
            <textarea value={newMessage} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Type a message..." className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-10 max-h-32" style={{
            minHeight: '40px',
            maxHeight: '120px'
          }} />
          </div>
          <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} onClick={handleSendMessage} disabled={!newMessage.trim()} className="p-2 bg-blue-600 text-white rounded-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <SendIcon className="h-5 w-5" />
          </motion.button>
        </div>
        <div className="mt-3 text-xs text-gray-500 flex items-center justify-center">
          <p>Long press the space bar to power exit</p>
        </div>
      </div>
    </div>;
};
export default LiveChat;