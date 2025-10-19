import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from 'lucide-react';
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    login,
    socialLogin
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
  const handleSocialLogin = async (provider: string) => {
    setError('');
    setIsLoading(true);
    try {
      const success = await socialLogin(provider);
      if (success) {
        navigate('/');
      } else {
        setError(`Failed to login with ${provider}`);
      }
    } catch (err) {
      setError('An error occurred during social login');
    } finally {
      setIsLoading(false);
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-gray-900 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Sign In
        </h2>
        {error && <div className="mb-4 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded">
            {error}
          </div>}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-white border-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter your email" required />
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-400 text-sm font-bold" htmlFor="password">
              Password
            </label>
            <a className="text-sm text-orange-500 hover:text-orange-400" href="#">
              Forgot Password?
            </a>
          </div>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-white border-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter your password" required />
        </div>
        <div className="flex items-center justify-between mb-6">
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </div>
        <div className="flex items-center justify-center mb-6">
          <span className="border-b border-gray-700 w-full"></span>
          <span className="px-2 text-sm text-gray-500">OR</span>
          <span className="border-b border-gray-700 w-full"></span>
        </div>
        <div className="flex flex-col space-y-3">
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} type="button" onClick={() => handleSocialLogin('Google')} className="flex items-center justify-center w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
            Continue with Google
          </motion.button>
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} type="button" onClick={() => handleSocialLogin('GitHub')} className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            <GithubIcon className="w-5 h-5 mr-2" />
            Continue with GitHub
          </motion.button>
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} type="button" onClick={() => handleSocialLogin('LinkedIn')} className="flex items-center justify-center w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <LinkedinIcon className="w-5 h-5 mr-2" />
            Continue with LinkedIn
          </motion.button>
        </div>
      </form>
      <div className="text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-orange-500 hover:text-orange-400">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>;
};
export default LoginForm;