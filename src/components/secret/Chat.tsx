import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { mockMessages, Message } from '../../utils/mockData';
import { SendIcon, CheckIcon, CheckCheckIcon, TrashIcon, EyeIcon, ClockIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import PowerExit from './PowerExit';
interface ChatProps {
  onSendEphemeralMessage: (message: string) => void;
  onExit?: () => void;
}
const Chat: React.FC<ChatProps> = ({
  onSendEphemeralMessage,
  onExit
}) => {
  const {
    user
  } = useAuth();
  const {
    userName,
    partnerName
  } = useChat();
  const [messages, setMessages] = useState<(Message & {
    disappearAt?: Date;
    disappeared?: boolean;
  })[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isEphemeral, setIsEphemeral] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOtherUserOnline] = useState(true); // In a real app, this would be determined via websockets
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  // Mark messages as read when they are viewed
  useEffect(() => {
    setMessages(prevMessages => prevMessages.map(msg => msg.sender === 'other' && !msg.isRead ? {
      ...msg,
      isRead: true
    } : msg));
  }, []);
  // Check for disappearing messages
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setMessages(prevMessages => prevMessages.map(msg => {
        if (msg.disappearAt && now >= msg.disappearAt && !msg.disappeared) {
          return {
            ...msg,
            disappeared: true
          };
        }
        return msg;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    if (isEphemeral) {
      onSendEphemeralMessage(newMessage);
      setNewMessage('');
      setIsEphemeral(false);
      return;
    }
    const now = new Date();
    const disappearAt = isEphemeral ? new Date(now.getTime() + 20 * 1000) : undefined; // 20 seconds
    const newMsg: Message & {
      disappearAt?: Date;
    } = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: now,
      isRead: false,
      disappearAt
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
    // Simulate response after a delay
    setTimeout(() => {
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'other',
        text: "Thanks for your message. I'll look into this and get back to you soon.",
        timestamp: new Date(),
        isRead: false
      };
      setMessages(prev => [...prev, responseMsg]);
    }, 3000);
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
  return <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              <img src={`https://ui-avatars.com/api/?name=${partnerName}&background=random`} alt={partnerName} className="h-full w-full object-cover" />
            </div>
            {isOtherUserOnline && <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></span>}
          </div>
          <div className="ml-3">
            <h3 className="text-white font-medium">{partnerName}</h3>
            <p className="text-xs text-gray-400">
              {isOtherUserOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <PowerExit onExit={onExit} />
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300 flex items-center">
            <span className="mr-1">WhatsApp Style</span>
            {isEphemeral && <ClockIcon className="h-3 w-3 text-yellow-500" />}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => <AnimatePresence key={msg.id} mode="wait">
            {(!msg.isEphemeral || !msg.isRead) && !msg.disappeared && <motion.div initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.8
        }} transition={{
          duration: 0.2
        }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-gray-800 text-white rounded-bl-none'} ${msg.disappearAt ? 'border border-yellow-500' : ''}`}>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {msg.disappearAt && <ClockIcon className="h-4 w-4 text-yellow-500 mr-1" />}
                      <p className="break-words">{msg.text}</p>
                    </div>
                    <div className={`flex items-center text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70 justify-end' : 'text-gray-400'}`}>
                      <span>{formatMessageTime(msg.timestamp)}</span>
                      {msg.sender === 'user' && <span className="ml-1">
                          {msg.isRead ? <CheckCheckIcon className="h-3 w-3" /> : <CheckIcon className="h-3 w-3" />}
                        </span>}
                    </div>
                  </div>
                </div>
                {msg.sender === 'user' && <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => handleDeleteMessage(msg.id)} className="ml-2 text-gray-500 hover:text-red-500 self-end mb-2">
                    <TrashIcon className="h-4 w-4" />
                  </motion.button>}
              </motion.div>}
            {msg.disappeared && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 0.7
        }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} px-4`}>
                <div className="flex items-center text-xs text-gray-500">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  <span>Message disappeared</span>
                </div>
              </motion.div>}
          </AnimatePresence>)}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <button onClick={() => setIsEphemeral(!isEphemeral)} className={`p-2 rounded-full mr-2 ${isEphemeral ? 'bg-yellow-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
            <ClockIcon className="h-5 w-5" />
          </button>
          <div className="flex-1 relative">
            <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder={isEphemeral ? 'Send a disappearing message (20s)...' : 'Type a message...'} className={`w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 ${isEphemeral ? 'focus:ring-yellow-500 border-yellow-500' : 'focus:ring-orange-500'} resize-none h-10 max-h-32`} style={{
            minHeight: '40px',
            maxHeight: '120px'
          }} />
          </div>
          <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} onClick={handleSendMessage} disabled={!newMessage.trim()} className="p-2 bg-orange-500 text-white rounded-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <SendIcon className="h-5 w-5" />
          </motion.button>
        </div>
        {isEphemeral && <p className="text-xs text-yellow-500 mt-2 flex items-center">
            <ClockIcon className="h-3 w-3 mr-1" />
            This message will disappear after 20 seconds
          </p>}
        <div className="mt-3 text-xs text-gray-500 flex items-center justify-center">
          <p>Long press the space bar to power exit</p>
        </div>
      </div>
    </div>;
};
export default Chat;