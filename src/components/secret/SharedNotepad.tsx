import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { mockNotes, Note } from '../../utils/mockData';
import { FileTextIcon, PlusIcon, SaveIcon, TrashIcon, ClockIcon, UserIcon, HeartIcon, FilterIcon } from 'lucide-react';
import { format } from 'date-fns';
interface NoteWithLikes extends Note {
  likes: number;
  isLiked?: boolean;
}
const SharedNotepad: React.FC = () => {
  const {
    user
  } = useAuth();
  const [notes, setNotes] = useState<NoteWithLikes[]>(mockNotes.map(note => ({
    ...note,
    likes: Math.floor(Math.random() * 5)
  })));
  const [newNote, setNewNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState<'all' | 'user' | 'other'>('all');
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setIsSaving(true);
    // Simulate saving delay
    setTimeout(() => {
      const note: NoteWithLikes = {
        id: Date.now().toString(),
        text: newNote,
        createdAt: new Date(),
        author: 'user',
        likes: 0
      };
      setNotes([note, ...notes]);
      setNewNote('');
      setIsSaving(false);
    }, 500);
  };
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  const handleLikeNote = (id: string) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          likes: note.isLiked ? note.likes - 1 : note.likes + 1,
          isLiked: !note.isLiked
        };
      }
      return note;
    }));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };
  const handleFilterChange = (newFilter: 'all' | 'user' | 'other') => {
    setFilter(newFilter);
  };
  const filteredNotes = notes.filter(note => {
    if (filter === 'all') return true;
    if (filter === 'user') return note.author === 'user';
    if (filter === 'other') return note.author === 'other';
    return true;
  });
  return <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-white flex items-center">
            <FileTextIcon className="h-5 w-5 mr-2 text-blue-500" />
            Daily Dose Notepad
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Share your daily notes, thoughts and reminders
          </p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => handleFilterChange('all')} className={`px-2 py-1 text-xs rounded-md flex items-center ${filter === 'all' ? 'bg-gray-700 text-white' : 'text-gray-400 bg-gray-800'}`}>
            <FilterIcon className="h-3 w-3 mr-1" />
            All
          </button>
          <button onClick={() => handleFilterChange('user')} className={`px-2 py-1 text-xs rounded-md flex items-center ${filter === 'user' ? 'bg-blue-600 text-white' : 'text-gray-400 bg-gray-800'}`}>
            <UserIcon className="h-3 w-3 mr-1" />
            You
          </button>
          <button onClick={() => handleFilterChange('other')} className={`px-2 py-1 text-xs rounded-md flex items-center ${filter === 'other' ? 'bg-purple-600 text-white' : 'text-gray-400 bg-gray-800'}`}>
            <UserIcon className="h-3 w-3 mr-1" />
            Lover
          </button>
        </div>
      </div>
      <div className="p-4 border-b border-gray-800">
        <div className="flex flex-col">
          <textarea value={newNote} onChange={e => setNewNote(e.target.value)} onKeyDown={handleKeyDown} placeholder="What's on your mind today?" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" rows={3} />
          <div className="flex justify-end mt-2">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={handleAddNote} disabled={!newNote.trim() || isSaving} className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSaving ? <>
                  <SaveIcon className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </> : <>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Note
                </>}
            </motion.button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {filteredNotes.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FileTextIcon className="h-12 w-12 mb-2" />
            <p>No notes yet</p>
            <p className="text-sm mt-1">Add your first note above</p>
          </div> : <div className="space-y-4">
            {filteredNotes.map((note, index) => <motion.div key={note.id} initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.2,
          delay: index * 0.05
        }} className={`p-4 rounded-lg ${note.author === 'user' ? 'bg-blue-900/20 border-l-4 border-blue-500' : 'bg-purple-900/20 border-l-4 border-purple-500'}`}>
                <div className="flex justify-between items-start">
                  <motion.div className="flex items-center cursor-pointer" whileHover={{
              scale: 1.02
            }} onClick={() => handleFilterChange(note.author === 'user' ? 'user' : 'other')}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${note.author === 'user' ? 'bg-blue-500/20' : 'bg-purple-500/20'}`}>
                      <UserIcon className={`h-4 w-4 ${note.author === 'user' ? 'text-blue-500' : 'text-purple-500'}`} />
                    </div>
                    <div className="ml-2">
                      <h3 className="font-medium text-white">
                        {note.author === 'user' ? 'You' : 'Lover'}
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {format(note.createdAt, 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </motion.div>
                  <div className="flex items-center">
                    <motion.button whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.9
              }} onClick={() => handleLikeNote(note.id)} className={`flex items-center mr-2 px-2 py-1 rounded-full text-xs ${note.isLiked ? 'bg-red-500/20 text-red-500' : 'bg-gray-800 text-gray-400 hover:text-red-500'}`}>
                      <HeartIcon className={`h-3 w-3 mr-1 ${note.isLiked ? 'fill-red-500' : ''}`} />
                      <span>{note.likes}</span>
                    </motion.button>
                    {note.author === 'user' && <motion.button whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.9
              }} onClick={() => handleDeleteNote(note.id)} className="text-gray-500 hover:text-red-500">
                        <TrashIcon className="h-4 w-4" />
                      </motion.button>}
                  </div>
                </div>
                <div className="mt-3 text-gray-200 whitespace-pre-wrap">
                  {note.text}
                </div>
              </motion.div>)}
          </div>}
      </div>
    </div>;
};
export default SharedNotepad;