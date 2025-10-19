import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { problemDetail } from '../utils/mockData';
import Editor from '@monaco-editor/react';
import { PlayIcon, CheckCircleIcon, BookmarkIcon, ThumbsUpIcon, ThumbsDownIcon, ChevronDownIcon, ChevronUpIcon, LightbulbIcon, MessageSquareIcon, ShareIcon } from 'lucide-react';
// Sample starter code for different languages
const starterCodes = {
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your code here
};`,
  python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{0, 0};
    }
}`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        return {0, 0};
    }
};`
};
const ProblemEditor: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState(starterCodes.javascript);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
  // Update code when language changes
  useEffect(() => {
    setCode(starterCodes[language] || starterCodes.javascript);
  }, [language]);
  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(''); // Clear previous output
    // Simulate code execution
    setTimeout(() => {
      setOutput('Running test cases...\n\nTest Case 1: [2,7,11,15], target = 9\nOutput: [0,1]\nExpected: [0,1]\nResult: ✓\n\nTest Case 2: [3,2,4], target = 6\nOutput: [1,2]\nExpected: [1,2]\nResult: ✓\n\nTest Case 3: [3,3], target = 6\nOutput: [0,1]\nExpected: [0,1]\nResult: ✓\n\nAll test cases passed!');
      setIsRunning(false);
    }, 1500);
  };
  const handleSubmitCode = () => {
    setIsRunning(true);
    setOutput(''); // Clear previous output
    // Simulate submission
    setTimeout(() => {
      setOutput('Submitting solution...\n\nRuntime: 68 ms, faster than 95.02% of JavaScript online submissions.\nMemory Usage: 42.5 MB, less than 53.72% of JavaScript online submissions.\n\nAccepted');
      setIsRunning(false);
    }, 2000);
  };
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };
  // Map language to Monaco editor language
  const getMonacoLanguage = () => {
    const languageMap = {
      javascript: 'javascript',
      python: 'python',
      java: 'java',
      cpp: 'cpp'
    };
    return languageMap[language] || 'javascript';
  };
  return <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row h-full">
        {/* Problem Description Panel */}
        <motion.div initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.3
      }} className="w-full md:w-2/5 bg-gray-900 overflow-y-auto border-r border-gray-800">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold text-white">
                  {id}. {problemDetail.title}
                </h1>
                <div className="flex items-center mt-2 space-x-3">
                  <span className={`text-sm font-medium px-2 py-1 rounded ${problemDetail.difficulty === 'Easy' ? 'bg-green-900/30 text-green-500' : problemDetail.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-500' : 'bg-red-900/30 text-red-500'}`}>
                    {problemDetail.difficulty}
                  </span>
                  <button className="text-gray-400 hover:text-white">
                    <BookmarkIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-green-500">
                    <ThumbsUpIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-red-500">
                    <ThumbsDownIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} className="text-gray-400 hover:text-white p-1">
                {isDescriptionExpanded ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
              </button>
            </div>
            {isDescriptionExpanded && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} exit={{
            opacity: 0,
            height: 0
          }} transition={{
            duration: 0.3
          }} className="mt-4">
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-gray-300 whitespace-pre-line">
                    {problemDetail.description}
                  </p>
                  <h3 className="text-white font-medium mt-6 mb-2">
                    Examples:
                  </h3>
                  {problemDetail.examples.map((example, index) => <div key={index} className="mb-4 bg-gray-800 p-3 rounded-md">
                      <div className="mb-2">
                        <span className="text-gray-400 font-medium">
                          Input:
                        </span>{' '}
                        <code className="text-orange-400">{example.input}</code>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-400 font-medium">
                          Output:
                        </span>{' '}
                        <code className="text-orange-400">
                          {example.output}
                        </code>
                      </div>
                      {example.explanation && <div>
                          <span className="text-gray-400 font-medium">
                            Explanation:
                          </span>{' '}
                          <span className="text-gray-300">
                            {example.explanation}
                          </span>
                        </div>}
                    </div>)}
                  <h3 className="text-white font-medium mt-6 mb-2">
                    Constraints:
                  </h3>
                  <ul className="list-disc list-inside text-gray-300">
                    {problemDetail.constraints.map((constraint, index) => <li key={index}>{constraint}</li>)}
                  </ul>
                  <div className="flex space-x-4 mt-6">
                    <button className="flex items-center text-gray-400 hover:text-yellow-500">
                      <LightbulbIcon className="h-5 w-5 mr-1" />
                      <span>Hint</span>
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-blue-500">
                      <MessageSquareIcon className="h-5 w-5 mr-1" />
                      <span>Discuss</span>
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-green-500">
                      <CheckCircleIcon className="h-5 w-5 mr-1" />
                      <span>Solution</span>
                    </button>
                  </div>
                </div>
              </motion.div>}
          </div>
        </motion.div>
        {/* Code Editor Panel */}
        <motion.div initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.3
      }} className="flex-1 flex flex-col h-full bg-gray-950">
          <div className="border-b border-gray-800 p-2 flex justify-between items-center">
            <div className="flex space-x-2">
              <button onClick={() => handleLanguageChange('javascript')} className={`px-3 py-1 text-sm rounded ${language === 'javascript' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                JavaScript
              </button>
              <button onClick={() => handleLanguageChange('python')} className={`px-3 py-1 text-sm rounded ${language === 'python' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                Python
              </button>
              <button onClick={() => handleLanguageChange('java')} className={`px-3 py-1 text-sm rounded ${language === 'java' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                Java
              </button>
              <button onClick={() => handleLanguageChange('cpp')} className={`px-3 py-1 text-sm rounded ${language === 'cpp' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                C++
              </button>
            </div>
            <div className="flex space-x-2">
              <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={handleRunCode} disabled={isRunning} className="px-3 py-1 text-sm bg-gray-700 text-white rounded flex items-center hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <PlayIcon className="h-4 w-4 mr-1" />
                Run
              </motion.button>
              <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={handleSubmitCode} disabled={isRunning} className="px-3 py-1 text-sm bg-orange-500 text-white rounded flex items-center hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                Submit
              </motion.button>
            </div>
          </div>
          <div className="flex-1">
            <Editor height="100%" language={getMonacoLanguage()} theme="vs-dark" value={code} onChange={value => setCode(value || '')} options={{
            minimap: {
              enabled: false
            },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on'
          }} />
          </div>
          <div className="h-1/3 border-t border-gray-800 overflow-y-auto">
            <div className="p-2 border-b border-gray-800 bg-gray-900 text-gray-300 text-sm font-medium">
              Console Output
            </div>
            <pre className="p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap h-full overflow-y-auto">
              {isRunning ? 'Running...' : output}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>;
};
export default ProblemEditor;