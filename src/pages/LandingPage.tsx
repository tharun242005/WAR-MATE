
import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, Zap, Radio, Lock } from 'lucide-react';
import Logo3D from '@/components/Logo3D';
import IntroFeature from '@/components/IntroFeature';
import FeatureHighlight from '@/components/FeatureHighlight';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const LandingPage = () => {
  return (
    <div className="bg-battlefield-cyberBlack min-h-screen">
      <HelmetProvider>
        <Helmet>
          <title>WarMate - Military Intelligence Assistant</title>
          <meta name="description" content="Advanced AI-powered battlefield assistant for military personnel" />
        </Helmet>
      </HelmetProvider>

      <header className="border-b border-battlefield-cyberDarkGray/50">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="w-10 h-10 bg-battlefield-cyberTeal/20 rounded-full flex items-center justify-center mr-3 tech-border">
              <span className="font-bold text-white">WM</span>
            </span>
            <h1 className="text-2xl font-bold text-white">WarMate</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-battlefield-cyberTeal transition-colors">Features</a>
            <a href="warmate research paper.docx" className="text-gray-300 hover:text-battlefield-cyberTeal transition-colors">Resources</a>
            <a href="mailto:run40081@gmail.com" className="text-gray-300 hover:text-battlefield-cyberTeal transition-colors">Support</a>
          </nav>

          <Link to="/chat">
            <Button className="bg-battlefield-cyberTeal hover:bg-battlefield-darkCyberTeal text-black font-medium">
              Launch Console <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="pt-12 pb-20 px-4 container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                <span className="text-battlefield-cyberTeal">WarMate</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-battlefield-cyberTeal to-battlefield-darkCyberTeal">
                  Battlefield Intelligence
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8">
                Advanced AI-powered assistant for military operations, providing real-time intelligence and mission support.
              </p>

              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Link to="/chat">
                  <Button className="w-full sm:w-auto text-lg py-6 px-8 bg-battlefield-cyberTeal hover:bg-battlefield-darkCyberTeal text-battlefield-cyberBlack font-bold">
                    Start Mission
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-[350px] md:h-[400px] w-full max-w-md mx-auto"
            >
              <Logo3D />
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20 bg-battlefield-cyberDarkGray/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="text-battlefield-cyberTeal">Advanced</span> Features
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <IntroFeature 
                icon={<Shield className="h-10 w-10 text-battlefield-cyberTeal" />} 
                title="Tactical Awareness" 
                description="Real-time information on terrain, enemy positions, and tactical options to enhance mission success."
              />
              <IntroFeature 
                icon={<Radio className="h-10 w-10 text-battlefield-cyberTeal" />} 
                title="Secure Communications" 
                description="End-to-end encrypted communication channels for sensitive information exchange."
              />
              <IntroFeature 
                icon={<Zap className="h-10 w-10 text-battlefield-cyberTeal" />} 
                title="Quick Response" 
                description="Instant situation assessment and recommendations for rapid decision-making in critical scenarios."
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Why Choose <span className="text-battlefield-cyberTeal">WarMate</span>?
            </h2>

            <div className="space-y-24">
              <FeatureHighlight 
                icon={<Radio className="h-6 w-6" />}
                title="Voice-Activated Interface"
                description="Hands-free operation allows soldiers to maintain situational awareness while accessing critical information."
              />
              
              <FeatureHighlight 
                icon={<Shield className="h-6 w-6" />}
                title="Real-Time Intelligence"
                description="Constant updates on battlefield conditions, weather, and enemy movements to keep you one step ahead."
              />
              
              <FeatureHighlight 
                icon={<Lock className="h-6 w-6" />}
                title="Emergency Protocols"
                description="Immediate medical evacuation coordination and backup request systems for critical situations."
              />
            </div>
          </div>
        </section>

        <section className="py-16 glass-morphism border-y border-battlefield-cyberDarkGray/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Deploy?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Experience the future of battlefield intelligence with WarMate. Advanced AI support for every mission.
            </p>
            
            <Link to="/chat">
              <Button className="bg-battlefield-cyberTeal hover:bg-battlefield-darkCyberTeal text-black font-bold px-8 py-6 text-lg">
                Launch Console <ChevronRight size={18} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
