import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchIcon, FilterIcon, CheckCircleIcon, LockIcon } from 'lucide-react';
import { mockProblems, Problem } from '../utils/mockData';
const Problems: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>(mockProblems);
  const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    let filtered = [...mockProblems];
    // Apply difficulty filter
    if (filter !== 'All') {
      filtered = filtered.filter(problem => problem.difficulty === filter);
    }
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(problem => problem.title.toLowerCase().includes(lowercasedSearch) || problem.tags.some(tag => tag.toLowerCase().includes(lowercasedSearch)));
    }
    setProblems(filtered);
  }, [filter, searchTerm]);
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Hard':
        return 'text-red-500';
      default:
        return 'text-gray-500';
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
        <h1 className="text-2xl font-bold mb-6">Problems</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            {['All', 'Easy', 'Medium', 'Hard'].map(option => <motion.button key={option} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => setFilter(option as 'All' | 'Easy' | 'Medium' | 'Hard')} className={`px-4 py-2 rounded-md text-sm font-medium ${filter === option ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                {option}
              </motion.button>)}
          </div>
          <div className="relative w-full md:w-64">
            <input type="text" placeholder="Search problems..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-gray-800 rounded-md py-2 px-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-left">
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">
                    #
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">
                    Title
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-400">
                    <div className="flex items-center">
                      Difficulty
                      <FilterIcon className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-400 hidden md:table-cell">
                    Acceptance
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-400 hidden lg:table-cell">
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, index) => <motion.tr key={problem.id} initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: index * 0.05
              }} className="border-t border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-gray-300">{problem.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {problem.isCompleted && <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />}
                        <Link to={`/problem/${problem.id}`} className="text-white hover:text-orange-400 transition-colors flex items-center">
                          {problem.title}
                          {problem.isPremium && <LockIcon className="h-4 w-4 text-yellow-500 ml-2 flex-shrink-0" />}
                        </Link>
                      </div>
                    </td>
                    <td className={`py-3 px-4 font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </td>
                    <td className="py-3 px-4 text-gray-300 hidden md:table-cell">
                      {problem.acceptance}
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.slice(0, 2).map((tag, idx) => <span key={idx} className="inline-block px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded">
                            {tag}
                          </span>)}
                        {problem.tags.length > 2 && <span className="inline-block px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded">
                            +{problem.tags.length - 2}
                          </span>}
                      </div>
                    </td>
                  </motion.tr>)}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-400 bg-gray-700 hover:bg-gray-600">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Showing <span className="font-medium">1</span> to{' '}
                  <span className="font-medium">15</span> of{' '}
                  <span className="font-medium">2423</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md bg-gray-700 text-sm font-medium text-gray-400 hover:bg-gray-600">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" aria-current="page" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600">
                    1
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-700 hover:bg-gray-600">
                    2
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-700 hover:bg-gray-600">
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-700">
                    ...
                  </span>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-700 hover:bg-gray-600">
                    97
                  </a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-gray-700 text-sm font-medium text-gray-400 hover:bg-gray-600">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>;
};
export default Problems;