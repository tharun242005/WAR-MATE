
import React from 'react';
import { motion } from 'framer-motion';

interface CommandSuggestionProps {
  command: string;
  onClick: (command: string) => void;
}

const CommandSuggestion: React.FC<CommandSuggestionProps> = ({ command, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(command)}
      className="tech-border px-4 py-2 rounded-lg text-sm mr-2 mb-2 hover:bg-primary/20 transition-all"
    >
      {command}
    </motion.button>
  );
};

export default CommandSuggestion;
