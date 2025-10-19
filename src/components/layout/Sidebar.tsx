import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HashIcon, BarChartIcon, TagIcon, ListIcon, BookmarkIcon, StarIcon, TrendingUpIcon, UsersIcon, CheckCircleIcon, FolderIcon, ChevronRightIcon, ChevronDownIcon } from 'lucide-react';
interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  items?: {
    name: string;
    count: number;
  }[];
  defaultOpen?: boolean;
}
const Category: React.FC<CategoryProps> = ({
  title,
  icon,
  items = [],
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return <div className="mb-2">
      <motion.button whileHover={{
      backgroundColor: 'rgba(75, 85, 99, 0.3)'
    }} onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-3 py-2 text-gray-300 hover:text-white rounded-md">
        <div className="flex items-center">
          {icon}
          <span className="ml-2 text-sm font-medium">{title}</span>
        </div>
        {items.length > 0 && (isOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />)}
      </motion.button>
      {isOpen && items.length > 0 && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }} className="ml-8 mt-1">
          {items.map((item, idx) => <Link key={idx} to="#" className="flex items-center justify-between py-1 px-2 text-xs text-gray-400 hover:text-white rounded-md hover:bg-gray-800">
              <span>{item.name}</span>
              <span className="text-gray-500">{item.count}</span>
            </Link>)}
        </motion.div>}
    </div>;
};
const Sidebar: React.FC = () => {
  const location = useLocation();
  return <motion.div initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    duration: 0.3
  }} className="w-64 bg-gray-900 border-r border-gray-800 h-full overflow-y-auto hidden md:block">
      <div className="py-4 px-3">
        <Category title="Problems" icon={<HashIcon className="h-4 w-4" />} defaultOpen={location.pathname.includes('/problems')} items={[{
        name: 'All Problems',
        count: 2423
      }, {
        name: 'Algorithms',
        count: 1829
      }, {
        name: 'Database',
        count: 194
      }, {
        name: 'Shell',
        count: 15
      }, {
        name: 'Concurrency',
        count: 28
      }]} />
        <Category title="Lists" icon={<ListIcon className="h-4 w-4" />} items={[{
        name: 'Top 100 Liked',
        count: 100
      }, {
        name: 'Top Interview',
        count: 145
      }, {
        name: 'Favorite',
        count: 0
      }]} />
        <Category title="Topics" icon={<TagIcon className="h-4 w-4" />} items={[{
        name: 'Arrays',
        count: 542
      }, {
        name: 'Strings',
        count: 483
      }, {
        name: 'Dynamic Programming',
        count: 344
      }, {
        name: 'Math',
        count: 329
      }, {
        name: 'Greedy',
        count: 214
      }]} />
        <Category title="Explore" icon={<FolderIcon className="h-4 w-4" />} items={[{
        name: 'Learn',
        count: 0
      }, {
        name: 'Interview',
        count: 0
      }, {
        name: 'Contest',
        count: 0
      }, {
        name: 'Study Plan',
        count: 0
      }]} />
        <div className="mt-6 border-t border-gray-800 pt-4">
          <Category title="Progress" icon={<BarChartIcon className="h-4 w-4" />} />
          <Category title="Bookmarks" icon={<BookmarkIcon className="h-4 w-4" />} />
          <Category title="Completed" icon={<CheckCircleIcon className="h-4 w-4" />} />
          <Category title="Leaderboard" icon={<TrendingUpIcon className="h-4 w-4" />} />
          <Category title="Premium" icon={<StarIcon className="h-4 w-4 text-yellow-500" />} />
          <Category title="Community" icon={<UsersIcon className="h-4 w-4" />} />
        </div>
      </div>
    </motion.div>;
};
export default Sidebar;