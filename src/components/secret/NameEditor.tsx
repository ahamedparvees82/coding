import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../context/ChatContext';
import { XIcon, EditIcon, CheckIcon, UserIcon } from 'lucide-react';
interface NameEditorProps {
  isOpen: boolean;
  onClose: () => void;
}
const NameEditor: React.FC<NameEditorProps> = ({
  isOpen,
  onClose
}) => {
  const {
    userName,
    partnerName,
    setUserName,
    setPartnerName
  } = useChat();
  const [tempUserName, setTempUserName] = useState(userName);
  const [tempPartnerName, setTempPartnerName] = useState(partnerName);
  const handleSave = () => {
    if (tempUserName.trim()) setUserName(tempUserName.trim());
    if (tempPartnerName.trim()) setPartnerName(tempPartnerName.trim());
    onClose();
  };
  return <AnimatePresence>
      {isOpen && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
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
                <EditIcon className="h-5 w-5 mr-2 text-blue-500" />
                Edit Chat Names
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input type="text" value={tempUserName} onChange={e => setTempUserName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Partner's Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input type="text" value={tempPartnerName} onChange={e => setTempPartnerName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Partner's name" />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={onClose} className="px-4 py-2 bg-gray-700 text-white rounded-md mr-2">
                Cancel
              </motion.button>
              <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center">
                <CheckIcon className="h-4 w-4 mr-2" />
                Save Names
              </motion.button>
            </div>
          </motion.div>
        </div>}
    </AnimatePresence>;
};
export default NameEditor;