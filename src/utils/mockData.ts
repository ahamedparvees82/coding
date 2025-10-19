// Mock data for problems
export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: string;
  frequency: number;
  tags: string[];
  isPremium: boolean;
  isCompleted: boolean;
}
export const mockProblems: Problem[] = [{
  id: 1,
  title: 'Two Sum',
  difficulty: 'Easy',
  acceptance: '49.3%',
  frequency: 100,
  tags: ['Array', 'Hash Table'],
  isPremium: false,
  isCompleted: true
}, {
  id: 2,
  title: 'Add Two Numbers',
  difficulty: 'Medium',
  acceptance: '37.8%',
  frequency: 85,
  tags: ['Linked List', 'Math', 'Recursion'],
  isPremium: false,
  isCompleted: false
}, {
  id: 3,
  title: 'Longest Substring Without Repeating Characters',
  difficulty: 'Medium',
  acceptance: '33.8%',
  frequency: 90,
  tags: ['Hash Table', 'String', 'Sliding Window'],
  isPremium: false,
  isCompleted: false
}, {
  id: 4,
  title: 'Median of Two Sorted Arrays',
  difficulty: 'Hard',
  acceptance: '34.5%',
  frequency: 65,
  tags: ['Array', 'Binary Search', 'Divide and Conquer'],
  isPremium: false,
  isCompleted: false
}, {
  id: 5,
  title: 'Longest Palindromic Substring',
  difficulty: 'Medium',
  acceptance: '31.5%',
  frequency: 75,
  tags: ['String', 'Dynamic Programming'],
  isPremium: false,
  isCompleted: false
}, {
  id: 6,
  title: 'Zigzag Conversion',
  difficulty: 'Medium',
  acceptance: '41.8%',
  frequency: 45,
  tags: ['String'],
  isPremium: false,
  isCompleted: false
}, {
  id: 7,
  title: 'Reverse Integer',
  difficulty: 'Medium',
  acceptance: '26.6%',
  frequency: 60,
  tags: ['Math'],
  isPremium: false,
  isCompleted: false
}, {
  id: 8,
  title: 'String to Integer (atoi)',
  difficulty: 'Medium',
  acceptance: '16.6%',
  frequency: 55,
  tags: ['String', 'Math'],
  isPremium: false,
  isCompleted: false
}, {
  id: 9,
  title: 'Palindrome Number',
  difficulty: 'Easy',
  acceptance: '52.5%',
  frequency: 70,
  tags: ['Math'],
  isPremium: false,
  isCompleted: false
}, {
  id: 10,
  title: 'Regular Expression Matching',
  difficulty: 'Hard',
  acceptance: '28.1%',
  frequency: 50,
  tags: ['String', 'Dynamic Programming', 'Recursion'],
  isPremium: true,
  isCompleted: false
}, {
  id: 11,
  title: 'Container With Most Water',
  difficulty: 'Medium',
  acceptance: '53.5%',
  frequency: 80,
  tags: ['Array', 'Two Pointers', 'Greedy'],
  isPremium: false,
  isCompleted: false
}, {
  id: 12,
  title: 'Integer to Roman',
  difficulty: 'Medium',
  acceptance: '59.7%',
  frequency: 40,
  tags: ['Math', 'String'],
  isPremium: false,
  isCompleted: false
}, {
  id: 13,
  title: 'Roman to Integer',
  difficulty: 'Easy',
  acceptance: '58.2%',
  frequency: 75,
  tags: ['Math', 'String'],
  isPremium: false,
  isCompleted: true
}, {
  id: 14,
  title: 'Longest Common Prefix',
  difficulty: 'Easy',
  acceptance: '39.2%',
  frequency: 65,
  tags: ['String', 'Trie'],
  isPremium: false,
  isCompleted: false
}, {
  id: 15,
  title: '3Sum',
  difficulty: 'Medium',
  acceptance: '31.3%',
  frequency: 85,
  tags: ['Array', 'Two Pointers', 'Sorting'],
  isPremium: false,
  isCompleted: false
}];
// Mock data for problem detail
export interface ProblemDetail {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
  };
}
export const problemDetail: ProblemDetail = {
  id: 1,
  title: 'Two Sum',
  difficulty: 'Easy',
  description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
  examples: [{
    input: 'nums = [2,7,11,15], target = 9',
    output: '[0,1]',
    explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
  }, {
    input: 'nums = [3,2,4], target = 6',
    output: '[1,2]'
  }, {
    input: 'nums = [3,3], target = 6',
    output: '[0,1]'
  }],
  constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
  starterCode: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
};`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
    }
}`
  }
};
// Mock chat messages
export interface Message {
  id: string;
  sender: 'user' | 'other';
  text: string;
  timestamp: Date;
  isRead?: boolean;
  isEphemeral?: boolean;
}
export const mockMessages: Message[] = [{
  id: '1',
  sender: 'other',
  text: 'Hey, how are you doing with the coding challenge?',
  timestamp: new Date(Date.now() - 86400000),
  // 1 day ago
  isRead: true
}, {
  id: '2',
  sender: 'user',
  text: 'Working on the Two Sum problem. Almost got it!',
  timestamp: new Date(Date.now() - 82800000),
  // 23 hours ago
  isRead: true
}, {
  id: '3',
  sender: 'other',
  text: 'Nice! Remember to check for edge cases.',
  timestamp: new Date(Date.now() - 79200000),
  // 22 hours ago
  isRead: true
}, {
  id: '4',
  sender: 'user',
  text: 'Good point. I need to handle empty arrays and duplicates.',
  timestamp: new Date(Date.now() - 75600000),
  // 21 hours ago
  isRead: true
}, {
  id: '5',
  sender: 'other',
  text: 'Exactly! Let me know if you need any help.',
  timestamp: new Date(Date.now() - 72000000),
  // 20 hours ago
  isRead: true
}, {
  id: '6',
  sender: 'other',
  text: 'Have you looked at the hash map approach? It can reduce the time complexity to O(n).',
  timestamp: new Date(Date.now() - 43200000),
  // 12 hours ago
  isRead: false
}, {
  id: '7',
  sender: 'other',
  text: 'This is a one-time view message. It will disappear after you read it!',
  timestamp: new Date(Date.now() - 3600000),
  // 1 hour ago
  isRead: false,
  isEphemeral: true
}];
// Mock notes
export interface Note {
  id: string;
  text: string;
  createdAt: Date;
  author: 'user' | 'other';
}
export const mockNotes: Note[] = [{
  id: '1',
  text: 'Need to review dynamic programming concepts',
  createdAt: new Date(Date.now() - 172800000),
  // 2 days ago
  author: 'user'
}, {
  id: '2',
  text: "Let's work on graph problems tomorrow",
  createdAt: new Date(Date.now() - 86400000),
  // 1 day ago
  author: 'other'
}, {
  id: '3',
  text: 'Remember to check out the new weekly contest',
  createdAt: new Date(Date.now() - 43200000),
  // 12 hours ago
  author: 'user'
}];