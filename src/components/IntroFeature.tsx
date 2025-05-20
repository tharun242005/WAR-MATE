
import React from 'react';
import { motion } from 'framer-motion';

interface IntroFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const IntroFeature: React.FC<IntroFeatureProps> = ({ 
  icon, 
  title, 
  description 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-morphism p-6 flex flex-col items-center text-center"
    >
      <div className="text-primary mb-4 text-4xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export default IntroFeature;
