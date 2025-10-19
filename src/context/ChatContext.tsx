import React, { useEffect, useState, createContext, useContext } from 'react';
interface ChatContextType {
  userName: string;
  partnerName: string;
  setUserName: (name: string) => void;
  setPartnerName: (name: string) => void;
}
const defaultContext: ChatContextType = {
  userName: 'You',
  partnerName: 'Lover',
  setUserName: () => {},
  setPartnerName: () => {}
};
const ChatContext = createContext<ChatContextType>(defaultContext);
export const ChatProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  // Load names from localStorage if available
  const [userName, setUserNameState] = useState<string>(localStorage.getItem('chat_user_name') || 'You');
  const [partnerName, setPartnerNameState] = useState<string>(localStorage.getItem('chat_partner_name') || 'Lover');
  // Save names to localStorage when they change
  const setUserName = (name: string) => {
    setUserNameState(name);
    localStorage.setItem('chat_user_name', name);
  };
  const setPartnerName = (name: string) => {
    setPartnerNameState(name);
    localStorage.setItem('chat_partner_name', name);
  };
  return <ChatContext.Provider value={{
    userName,
    partnerName,
    setUserName,
    setPartnerName
  }}>
      {children}
    </ChatContext.Provider>;
};
export const useChat = () => {
  return useContext(ChatContext);
};