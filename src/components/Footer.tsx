
import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
          <p className="text-gray-300">
            <a href="mailto:run40081@gmail.com" className="block mb-2 hover:text-cyan-400 transition-colors">
              Email: run40081@gmail.com
            </a>
            <a href="https://github.com/tharun242005/WAR-MATE" target="_blank" rel="noopener noreferrer" className="block hover:text-cyan-400 transition-colors">
              github.com/tharun242005
            </a>
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
            <li><a href="mailto:run40081@gmail.com" className="hover:text-cyan-400 transition-colors">Support</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Team Members</h3>
          <ul className="space-y-1 text-gray-300">
            <li>THARUN P</li>
            <li>M M MANYA MUTHAMMA</li>
            <li>DARSHAN MG</li>
            <li>BM SPANDANA</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-gray-500">
        <p>© TP 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
