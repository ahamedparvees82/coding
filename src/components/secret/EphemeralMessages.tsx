import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeOffIcon, ClockIcon, XIcon, CheckIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import PowerExit from './PowerExit';
interface EphemeralMessage {
  id: string;
  text: string;
  timestamp: Date;
  viewed: boolean;
  sender: 'user' | 'other';
}
interface EphemeralMessagesProps {
  onExit?: () => void;
}
const EphemeralMessages: React.FC<EphemeralMessagesProps> = ({
  onExit
}) => {
  const [messages, setMessages] = useState<EphemeralMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<EphemeralMessage | null>(null);
  const [showMessageContent, setShowMessageContent] = useState(false);
  const [isViewedStamp, setIsViewedStamp] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  // Add ephemeral message
  const addMessage = (text: string, sender: 'user' | 'other' = 'user') => {
    const newMessage: EphemeralMessage = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      viewed: false,
      sender
    };
    setMessages(prev => [...prev, newMessage]);
  };
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    addMessage(newMessage);
    setNewMessage('');
    // Simulate response after a delay
    setTimeout(() => {
      addMessage('Got your message! This will self-destruct after viewing.', 'other');
    }, 2000);
  };
  // For demo purposes, add some example messages on component mount
  useEffect(() => {
    const demoMessages = [{
      id: '1',
      text: "Here's the solution to the hard problem we discussed. Don't share it with anyone else!",
      timestamp: new Date(Date.now() - 3600000 * 2),
      viewed: false,
      sender: 'other' as const
    }, {
      id: '2',
      text: 'I found a security vulnerability in the platform. Check it out quickly!',
      timestamp: new Date(Date.now() - 3600000),
      viewed: false,
      sender: 'other' as const
    }, {
      id: '3',
      text: "The password for the test account is 'leetcode123'. Delete this after reading.",
      timestamp: new Date(Date.now() - 1800000),
      viewed: false,
      sender: 'user' as const
    }];
    setMessages(demoMessages);
  }, []);
  // Handle viewing a message
  const handleViewMessage = (message: EphemeralMessage) => {
    setSelectedMessage(message);
    setShowMessageContent(true);
    // After 1 second, show viewed stamp
    setTimeout(() => {
      setIsViewedStamp(true);
      // After another 1 second, hide message
      setTimeout(() => {
        setShowMessageContent(false);
        setIsViewedStamp(false);
        // After animation completes, mark as viewed
        setTimeout(() => {
          setMessages(prev => prev.map(msg => msg.id === message.id ? {
            ...msg,
            viewed: true
          } : msg));
          setSelectedMessage(null);
        }, 300);
      }, 1000);
    }, 1000);
  };
  // Close message modal
  const handleCloseModal = () => {
    setShowMessageContent(false);
    setIsViewedStamp(false);
    // After animation completes, mark as viewed
    setTimeout(() => {
      if (selectedMessage) {
        setMessages(prev => prev.map(msg => msg.id === selectedMessage.id ? {
          ...msg,
          viewed: true
        } : msg));
      }
      setSelectedMessage(null);
    }, 300);
  };
  // Format timestamp
  const formatMessageTime = (date: Date) => {
    return formatDistanceToNow(date, {
      addSuffix: true
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Lover&background=random" alt="Lover" className="h-full w-full object-cover" />
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
          </div>
          <div className="ml-3">
            <h3 className="text-white font-medium">Lover</h3>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <PowerExit onExit={onExit} />
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300 flex items-center">
            <span className="mr-1">Snap Style</span>
            <EyeIcon className="h-3 w-3 text-yellow-500" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <EyeOffIcon className="h-12 w-12 mb-2" />
            <p>No ephemeral messages</p>
          </div> : <div className="space-y-3">
            <AnimatePresence>
              {messages.filter(msg => !msg.viewed).map(message => <motion.div key={message.id} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            height: 0
          }} transition={{
            duration: 0.2
          }} className={`${message.sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[80%] bg-gray-800 border border-yellow-500/50 rounded-lg p-4 cursor-pointer hover:bg-gray-750`} onClick={() => handleViewMessage(message)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <EyeIcon className="h-5 w-5 text-yellow-500 mr-2" />
                        <div>
                          <h3 className="font-medium text-white">
                            {message.sender === 'user' ? 'You' : 'Lover'}
                          </h3>
                          <p className="text-sm text-gray-400 flex items-center mt-1">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {formatMessageTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="bg-yellow-500 text-xs px-2 py-1 rounded-full text-black font-medium">
                        Tap to view
                      </div>
                    </div>
                  </motion.div>)}
            </AnimatePresence>
          </div>}
      </div>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="flex-1 relative">
            <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder="Send a one-time view message..." className="w-full bg-gray-800 border border-yellow-500 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none h-10 max-h-32" style={{
            minHeight: '40px',
            maxHeight: '120px'
          }} />
          </div>
          <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} onClick={handleSendMessage} disabled={!newMessage.trim()} className="p-2 bg-yellow-500 text-white rounded-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <EyeIcon className="h-5 w-5" />
          </motion.button>
        </div>
        <p className="text-xs text-yellow-500 mt-2 flex items-center">
          <EyeOffIcon className="h-3 w-3 mr-1" />
          Messages will disappear after being viewed once
        </p>
        <div className="mt-3 text-xs text-gray-500 flex items-center justify-center">
          <p>Long press the space bar to power exit</p>
        </div>
      </div>
      {/* Message viewing modal */}
      <AnimatePresence>
        {selectedMessage && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.9
        }} transition={{
          duration: 0.2
        }} className="bg-gray-900 rounded-lg p-6 w-full max-w-md m-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <EyeIcon className="h-5 w-5 mr-2 text-yellow-500" />
                  {selectedMessage.sender === 'user' ? 'Your Message' : 'From Lover'}
                </h3>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-400 flex items-center">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  Received {formatMessageTime(selectedMessage.timestamp)}
                </p>
              </div>
              <div className="border border-gray-700 rounded-lg p-4 bg-gray-800 relative">
                <AnimatePresence mode="wait">
                  {showMessageContent ? <motion.p key="content" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }} className="text-white">
                      {selectedMessage.text}
                    </motion.p> : <motion.div key="loading" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }} className="flex flex-col items-center py-4">
                      <div className="w-full bg-gray-700 h-4 rounded mb-2"></div>
                      <div className="w-full bg-gray-700 h-4 rounded mb-2"></div>
                      <div className="w-3/4 bg-gray-700 h-4 rounded"></div>
                    </motion.div>}
                </AnimatePresence>
                {isViewedStamp && <motion.div initial={{
              opacity: 0,
              scale: 0.5
            }} animate={{
              opacity: 1,
              scale: 1
            }} className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center">
                      <CheckIcon className="h-4 w-4 mr-1" />
                      <span>Viewed</span>
                    </div>
                  </motion.div>}
              </div>
              <div className="mt-4 text-center">
                <p className="text-yellow-500 text-sm flex items-center justify-center">
                  <EyeOffIcon className="h-4 w-4 mr-1" />
                  This message will disappear after viewing
                </p>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>
    </div>;
};
export default EphemeralMessages;