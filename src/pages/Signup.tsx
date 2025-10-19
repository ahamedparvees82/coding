import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignupForm from '../components/auth/SignupForm';
import { motion } from 'framer-motion';
const Signup: React.FC = () => {
  const {
    isAuthenticated
  } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.5
    }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <motion.div initial={{
          y: -20
        }} animate={{
          y: 0
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} className="text-3xl font-bold text-orange-500">
            LeetClone
          </motion.div>
          <motion.p initial={{
          y: -10
        }} animate={{
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.5
        }} className="text-gray-400 mt-2">
            Join our coding community
          </motion.p>
        </div>
        <SignupForm />
      </motion.div>
    </div>;
};
export default Signup;