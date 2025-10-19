import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserIcon, LockIcon, BellIcon, GlobeIcon, PaletteIcon, SaveIcon, ChevronRightIcon, XIcon, KeyIcon, CodeIcon } from 'lucide-react';
const Settings: React.FC = () => {
  const {
    user,
    verifyDeveloperPassword
  } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [developerPassword, setDeveloperPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [developerClicks, setDeveloperClicks] = useState(0);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const handleAIDeveloperClick = () => {
    setDeveloperClicks(prev => prev + 1);
    if (developerClicks >= 4) {
      setShowDeveloperModal(true);
      setDeveloperClicks(0);
    }
  };
  const handleDeveloperOptionClick = () => {
    setShowDeveloperModal(true);
  };
  const handlePasswordSubmit = () => {
    if (verifyDeveloperPassword(developerPassword)) {
      setShowDeveloperModal(false);
      setDeveloperPassword('');
      setPasswordError('');
      navigate('/secret-developer');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };
  return <div className="container mx-auto px-4 py-8">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3
    }}>
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-900 rounded-lg p-4">
            <nav className="space-y-1">
              {[{
              id: 'profile',
              label: 'Profile',
              icon: <UserIcon className="h-5 w-5" />
            }, {
              id: 'account',
              label: 'Account',
              icon: <LockIcon className="h-5 w-5" />
            }, {
              id: 'notifications',
              label: 'Notifications',
              icon: <BellIcon className="h-5 w-5" />
            }, {
              id: 'appearance',
              label: 'Appearance',
              icon: <PaletteIcon className="h-5 w-5" />
            }, {
              id: 'language',
              label: 'Language',
              icon: <GlobeIcon className="h-5 w-5" />
            }].map(item => <motion.button key={item.id} whileHover={{
              backgroundColor: 'rgba(75, 85, 99, 0.3)'
            }} onClick={() => handleTabChange(item.id)} className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md ${activeTab === item.id ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </div>
                  <ChevronRightIcon className="h-4 w-4" />
                </motion.button>)}
              {/* Hidden AI Developer button */}
              <div className="pt-4 mt-4 border-t border-gray-800">
                <button onClick={handleAIDeveloperClick} className="text-gray-900 hover:text-gray-900 text-xs">
                  AI Developer
                </button>
              </div>
            </nav>
          </div>
          {/* Content */}
          <div className="flex-1 bg-gray-900 rounded-lg p-6">
            {activeTab === 'profile' && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.2
          }}>
                <h2 className="text-xl font-medium mb-6">Profile Settings</h2>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="h-32 w-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                        {user?.avatar ? <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" /> : <UserIcon className="h-16 w-16 text-gray-400" />}
                      </div>
                      <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700">
                        Change Avatar
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Username
                      </label>
                      <input type="text" defaultValue={user?.username} className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Email
                      </label>
                      <input type="email" defaultValue={user?.email} className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Bio
                      </label>
                      <textarea rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Tell us about yourself..."></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Location
                      </label>
                      <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="City, Country" />
                    </div>
                    <div className="pt-4">
                      <motion.button whileHover={{
                    scale: 1.02
                  }} whileTap={{
                    scale: 0.98
                  }} className="px-4 py-2 bg-orange-500 text-white rounded-md flex items-center hover:bg-orange-600">
                        <SaveIcon className="h-4 w-4 mr-2" />
                        Save Changes
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>}
            {activeTab === 'account' && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.2
          }}>
                <h2 className="text-xl font-medium mb-6">Account Settings</h2>
                <p className="text-gray-400">
                  Account settings content goes here...
                </p>
              </motion.div>}
            {activeTab === 'notifications' && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.2
          }}>
                <h2 className="text-xl font-medium mb-6">
                  Notification Settings
                </h2>
                <p className="text-gray-400">
                  Notification settings content goes here...
                </p>
              </motion.div>}
            {activeTab === 'appearance' && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.2
          }}>
                <h2 className="text-xl font-medium mb-6">
                  Appearance Settings
                </h2>
                <p className="text-gray-400">
                  Appearance settings content goes here...
                </p>
              </motion.div>}
            {activeTab === 'language' && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.2
          }}>
                <h2 className="text-xl font-medium mb-6">Language Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Select Language
                    </label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese (Simplified)</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                  <div className="pt-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Advanced Options
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md hover:bg-gray-750">
                        <div className="flex items-center">
                          <div className="mr-3 p-1.5 bg-gray-700 rounded">
                            <GlobeIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <span className="text-sm text-gray-300">
                            Region Format
                          </span>
                        </div>
                        <select className="bg-gray-700 text-sm border-0 rounded py-1 px-2 text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                          <option>United States</option>
                          <option>Europe</option>
                          <option>Asia</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md hover:bg-gray-750 cursor-pointer" onClick={handleDeveloperOptionClick}>
                        <div className="flex items-center">
                          <div className="mr-3 p-1.5 bg-gray-700 rounded">
                            <CodeIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <span className="text-sm text-gray-300">
                            Developer Options
                          </span>
                        </div>
                        <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <motion.button whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} className="px-4 py-2 bg-orange-500 text-white rounded-md flex items-center hover:bg-orange-600">
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </motion.button>
                  </div>
                </div>
              </motion.div>}
          </div>
        </div>
      </motion.div>
      {/* Developer Password Modal */}
      <AnimatePresence>
        {showDeveloperModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
        }} className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-white">
                  Enter Secret Password
                </h3>
                <button onClick={() => setShowDeveloperModal(false)} className="text-gray-400 hover:text-white">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-300 mb-4">
                Please enter the secret password to access the developer panel.
              </p>
              <div className="mb-4">
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input type="password" value={developerPassword} onChange={e => setDeveloperPassword(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter secret password" />
                </div>
                {passwordError && <p className="mt-2 text-sm text-red-500">{passwordError}</p>}
              </div>
              <div className="flex justify-end">
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={handlePasswordSubmit} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                  Access Developer Panel
                </motion.button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>
    </div>;
};
export default Settings;