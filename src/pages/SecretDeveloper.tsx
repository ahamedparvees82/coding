import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircleIcon, EyeIcon, FileTextIcon, ArrowLeftIcon, ClockIcon, UserIcon, XIcon, EditIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import Chat from '../components/secret/Chat';
import EphemeralMessages from '../components/secret/EphemeralMessages';
import SharedNotepad from '../components/secret/SharedNotepad';
import LiveChat from '../components/secret/LiveChat';
import NameEditor from '../components/secret/NameEditor';
type Panel = 'chat' | 'ephemeral' | 'live' | 'notepad';
const SecretDeveloper: React.FC = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const {
    userName,
    partnerName
  } = useChat();
  const [activePanel, setActivePanel] = useState<Panel>('chat');
  const [ephemeralMessages, setEphemeralMessages] = useState<string[]>([]);
  const [showHeader, setShowHeader] = useState(true);
  const [isNameEditorOpen, setIsNameEditorOpen] = useState(false);
  // Handle sending ephemeral messages from chat
  const handleSendEphemeralMessage = (message: string) => {
    setEphemeralMessages([...ephemeralMessages, message]);
  };
  const handlePowerExit = () => {
    navigate('/settings');
  };
  return <div className="container mx-auto px-4 py-8 h-full flex flex-col">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3
    }} className="flex flex-col h-full">
        {showHeader && <div className="flex items-center justify-between mb-6 bg-gray-900 rounded-lg p-4 shadow-lg">
            <div className="flex items-center">
              <motion.button whileHover={{
            x: -3
          }} onClick={() => navigate('/settings')} className="mr-4 text-gray-400 hover:text-white">
                <ArrowLeftIcon className="h-5 w-5" />
              </motion.button>
              <h1 className="text-2xl font-bold text-white">Secret Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700">
                    <img src={user?.avatar || 'https://ui-avatars.com/api/?name=You&background=random'} alt={userName} className="h-full w-full object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-gray-900"></span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-300">
                  {userName}
                </span>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-gray-700">
                    <img src={`https://ui-avatars.com/api/?name=${partnerName}&background=random`} alt={partnerName} className="h-full w-full object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-gray-900"></span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-300">
                  {partnerName}
                </span>
              </div>
              <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setIsNameEditorOpen(true)} className="text-blue-400 hover:text-blue-300 p-1 rounded-full hover:bg-gray-800" title="Edit Names">
                <EditIcon className="h-5 w-5" />
              </motion.button>
              <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => setShowHeader(false)} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800">
                <XIcon className="h-5 w-5" />
              </motion.button>
            </div>
          </div>}
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-16 bg-gray-900 rounded-l-lg border-r border-gray-800 flex flex-col items-center py-4 space-y-6">
            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setActivePanel('chat')} className={`p-3 rounded-full flex items-center justify-center ${activePanel === 'chat' ? 'bg-yellow-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`} title="WhatsApp Style">
              <ClockIcon className="h-5 w-5" />
            </motion.button>
            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setActivePanel('ephemeral')} className={`p-3 rounded-full flex items-center justify-center ${activePanel === 'ephemeral' ? 'bg-yellow-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'} relative`} title="Snap Style">
              <EyeIcon className="h-5 w-5" />
              {ephemeralMessages.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 flex items-center justify-center rounded-full text-white">
                  {ephemeralMessages.length}
                </span>}
            </motion.button>
            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setActivePanel('live')} className={`p-3 rounded-full flex items-center justify-center ${activePanel === 'live' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`} title="Live Chat">
              <MessageCircleIcon className="h-5 w-5" />
            </motion.button>
            <div className="flex-1"></div>
            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setActivePanel('notepad')} className={`p-3 rounded-full flex items-center justify-center ${activePanel === 'notepad' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`} title="Daily Notes">
              <FileTextIcon className="h-5 w-5" />
            </motion.button>
            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={() => !showHeader && setShowHeader(true)} className="p-3 rounded-full bg-gray-800 text-gray-400 hover:text-white" title="Show Header">
              <UserIcon className="h-5 w-5" />
            </motion.button>
          </div>
          {/* Main Content */}
          <div className="flex-1 bg-gray-900 rounded-r-lg overflow-hidden shadow-lg border-t border-r border-b border-gray-800">
            {activePanel === 'chat' && <Chat onSendEphemeralMessage={handleSendEphemeralMessage} onExit={handlePowerExit} />}
            {activePanel === 'ephemeral' && <EphemeralMessages onExit={handlePowerExit} />}
            {activePanel === 'live' && <LiveChat onExit={handlePowerExit} />}
            {activePanel === 'notepad' && <SharedNotepad />}
          </div>
        </div>
      </motion.div>
      {/* Name Editor Modal */}
      <NameEditor isOpen={isNameEditorOpen} onClose={() => setIsNameEditorOpen(false)} />
    </div>;
};
export default SecretDeveloper;