import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, ChevronRight, ChevronDown, User, Navigation, Cloud, Clock } from 'lucide-react';
import ChatMessage, { MessageType } from '../components/ChatMessage';
import VoiceButton from '../components/VoiceButton';
import CommandSuggestion from '../components/CommandSuggestion';
import { Link } from 'react-router-dom';
import { getChatMessages, saveChatMessage, clearChatHistory } from '@/services/chatService';
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from '@/components/Footer';

const ChatPage = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: "Welcome soldier. I'm WarMate, your combat assistant. How can I support your mission today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(25); // Default in Celsius
  const [localTime, setLocalTime] = useState<string>('');
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Declare Web Speech API types for TypeScript



  // Enhanced command suggestions
  const commandSuggestions = [
    "Request med-evac",
    "Check teammate status",
    "Weather update",
    "Current location",
    "Emergency backup",
    "Tactical options",
    "Supply request",
    "Enemy positions",
    "Battlefield intel",
    "Communications check"
  ];


  
  useEffect(() => {
    // Update local time every minute
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    };
    
    updateTime(); // Initial call
    const timeInterval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(timeInterval);
  }, []);
  
  // Clear chat history and start fresh on each visit
  useEffect(() => {
    const initChat = async () => {
      try {
        // Fixed the error with the UUID by removing the clearChatHistory call
        // Instead, we'll just load messages on component mount
        // await clearChatHistory();
        const chatMessages = await getChatMessages();
        if (chatMessages.length === 0) {
          // Only use initial welcome message if no history exists
          setMessages([{
            id: '1',
            content: "Welcome soldier. I'm WarMate, your combat assistant. How can I support your mission today?",
            sender: 'bot',
            timestamp: new Date()
          }]);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };
    
    initChat();
  }, []);
  
  // Scroll to bottom only when shouldScrollToBottom is true
  useEffect(() => {
  if (shouldScrollToBottom && !userHasScrolled) {
    scrollToBottom();
    setShouldScrollToBottom(false);
  }
}, [shouldScrollToBottom, userHasScrolled]);

 const scrollToBottom = () => {
  if (viewportRef.current) {
    viewportRef.current.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }
};
  // Track user scrolling - now with improved logic
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (viewportRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = viewportRef.current;
      // If user is near bottom (within 20px), treat as if they're at the bottom
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 20;
      
      setUserHasScrolled(!isAtBottom);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    sendMessage(inputValue);
    setInputValue('');
    // When user sends a message, we want to scroll to bottom
    setShouldScrollToBottom(true);
    setUserHasScrolled(false);
  };

  const determineCommandCategory = (content: string): string | null => {
    const lowerContent = content.toLowerCase();
    
    // Enhanced command detection with more flexibility
    if (lowerContent.includes('med-evac') || lowerContent.includes('medical') || 
        lowerContent.includes('evacuation') || lowerContent.includes('medic') || 
        lowerContent.includes('wounded') || lowerContent.includes('hurt')) {
      return 'medical';
    } else if (lowerContent.includes('teammate') || lowerContent.includes('squad') || 
              lowerContent.includes('team status') || lowerContent.includes('ally') || 
              lowerContent.includes('soldiers')) {
      return 'team';
    } else if (lowerContent.includes('weather') || lowerContent.includes('temperature') || 
              lowerContent.includes('climate') || lowerContent.includes('rain') || 
              lowerContent.includes('forecast')) {
      return 'environment';
    } else if (lowerContent.includes('location') || lowerContent.includes('position') || 
              lowerContent.includes('where am i') || lowerContent.includes('coordinates') || 
              lowerContent.includes('gps')) {
      return 'navigation';
    } else if (lowerContent.includes('backup') || lowerContent.includes('help') || 
              lowerContent.includes('support') || lowerContent.includes('assist') || 
              lowerContent.includes('reinforce')) {
      return 'support';
    } else if (lowerContent.includes('tactical') || lowerContent.includes('options') || 
              lowerContent.includes('plan') || lowerContent.includes('strategy') || 
              lowerContent.includes('approach')) {
      return 'tactics';
    } else if (lowerContent.includes('supply') || lowerContent.includes('ammo') || 
              lowerContent.includes('equipment') || lowerContent.includes('weapons')) {
      return 'supplies';
    } else if (lowerContent.includes('enemy positions') || lowerContent.includes('hostile') || 
              lowerContent.includes('opponent') || lowerContent.includes('threat')) {
      return 'enemy';
    } else if (lowerContent.includes('intel') || lowerContent.includes('information') || 
              lowerContent.includes('report') || lowerContent.includes('data')) {
      return 'intelligence';
    } else if (lowerContent.includes('comms') || lowerContent.includes('radio') || 
              lowerContent.includes('communication') || lowerContent.includes('contact')) {
      return 'communications';
    }
    
    return null;
  };

  const sendMessage = async (content: string) => {
    const commandCategory = determineCommandCategory(content);
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      await saveChatMessage({
        content,
        sender: 'user',
        command_category: commandCategory,
        user_id: null
      });
      
      simulateBotResponse(content);
    } catch (error) {
      console.error('Error saving message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    }
  };

  // Enhanced bot responses
  const botResponses: Record<string, string> = {
    "med-evac": "Initiating med-evac protocol. Transmitting your current coordinates and casualty information to nearest medical response team. ETA is 8 minutes. Please secure landing zone if possible. Continue to monitor vital signs and apply necessary first aid.",
    "teammate": "Teammate status: All squad members online. Alpha team located 300m northwest, advancing to objective. Bravo team holding position at coordinates 34.0522° N, 118.2437° W. All vital signs nominal.",
    "weather": `Current weather conditions: Temperature ${temperature}°C, wind speed 13 km/h from northeast, humidity 45%, clear skies with good visibility. No significant weather changes expected in the next 6 hours.`,
    "location": "Your current location: 34.0522° N, 118.2437° W, elevation 87 meters. You are approximately 400 meters southeast of Checkpoint Alpha. Nearest friendly forces are 300 meters to your northwest.",
    "backup": "Emergency backup request initiated. QRF notified and mobilizing to your position. ETA 12 minutes. Secure your perimeter and report any changes in situation. Transmitting your coordinates continuously.",
    "tactical": "Analyzing tactical options based on current terrain and mission parameters. Recommended approaches: 1) Utilize natural ridge 200m west for cover, 2) Small unit tactics with northern approach provides best concealment, 3) Wait for additional air support scheduled in 20 minutes before proceeding.",
    "supply": "Supply request logged. Available resources for immediate dispatch: 5.56mm ammunition (500 rounds), medical supplies (3 field kits), MREs (24 hour supply), and water (20 liters). Delivery drone en route to your coordinates, ETA 15 minutes. Confirm your position and prepare secure landing zone.",
    "enemy": "Scanning area for hostile activity... Satellite imagery shows enemy concentration 1.5km northeast of your position. Approximately 12-15 combatants with light vehicles moving south. Drone reconnaissance detects two machine gun positions at grid reference 872453. Alert: enemy patrol likely moving through your sector within 20 minutes.",
    "intel": "URGENT BATTLEFIELD INTELLIGENCE UPDATE: Eastern sector reports increased enemy movement with armored vehicles spotted at grid 652871. Airborne reconnaissance confirms hostile reinforcements moving from north. Intercepted communications indicate planned operation at 0400 hours. Critical chokepoint identified at valley entrance 3km southeast of your position. Civilian reports confirm enemy supply convoy vulnerable at river crossing.",
    "comms": "Communications check complete. Primary tactical network operational. Encrypted channels Alpha through Delta secure and verified. Command post acknowledges your status. Adjacent units connected and synchronized. Satellite uplink available for priority transmissions. SIGINT reports no detection of enemy intercept activity in your sector. Emergency frequencies monitored continuously."
  };

  const simulateBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // More sophisticated pattern matching for improved responses
    const lowerMessage = userMessage.toLowerCase();
    
    setTimeout(async () => {
      let responseContent = "I understand your message, but I need more specific information to assist effectively. Could you provide more details or try one of the suggested commands?";
      let commandCategory = null;
      
      // Enhanced flexible command detection
      if (lowerMessage.includes('enemy') || lowerMessage.includes('hostile') || lowerMessage.includes('opponent') || lowerMessage.includes('threat') || lowerMessage.includes('target')) {
  responseContent = botResponses["enemy"];
  commandCategory = 'enemy';
} else if (lowerMessage.includes('med') || lowerMessage.includes('evac') || lowerMessage.includes('medical') || lowerMessage.includes('hurt') || lowerMessage.includes('wounded') || lowerMessage.includes('injury')) {
  responseContent = botResponses["med-evac"];
  commandCategory = 'medical';
} else if (lowerMessage.includes('team') || lowerMessage.includes('squad') || lowerMessage.includes('status') || lowerMessage.includes('ally') || lowerMessage.includes('friend')) {
  responseContent = botResponses["teammate"];
  commandCategory = 'team';
} else if (lowerMessage.includes('weather') || lowerMessage.includes('temperature') || lowerMessage.includes('rain') || lowerMessage.includes('climate')) {
  responseContent = botResponses["weather"];
  commandCategory = 'environment';
} else if (lowerMessage.includes('location') || lowerMessage.includes('position') || lowerMessage.includes('where') || lowerMessage.includes('map') || lowerMessage.includes('gps')) {
  responseContent = botResponses["location"];
  commandCategory = 'navigation';
} else if (lowerMessage.includes('backup') || lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('assist') || lowerMessage.includes('reinforcement')) {
  responseContent = botResponses["backup"];
  commandCategory = 'support';
} else if (lowerMessage.includes('tactic') || lowerMessage.includes('option') || lowerMessage.includes('plan') || lowerMessage.includes('strategy') || lowerMessage.includes('approach')) {
  responseContent = botResponses["tactical"];
  commandCategory = 'tactics';
} else if (lowerMessage.includes('supply') || lowerMessage.includes('ammo') || lowerMessage.includes('equipment') || lowerMessage.includes('resource') || lowerMessage.includes('weapon')) {
  responseContent = botResponses["supply"];
  commandCategory = 'supplies';
} else if (lowerMessage.includes('intel') || lowerMessage.includes('info') || lowerMessage.includes('report') || lowerMessage.includes('data') || lowerMessage.includes('situation')) {
  responseContent = botResponses["intel"];
  commandCategory = 'intelligence';
} else if (lowerMessage.includes('comm') || lowerMessage.includes('radio') || lowerMessage.includes('contact') || lowerMessage.includes('message') || lowerMessage.includes('signal')) {
  responseContent = botResponses["comms"];
  commandCategory = 'communications';
}

      
      const botMessage: MessageType = {
        id: Date.now().toString(),
        content: responseContent,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      try {
        await saveChatMessage({
          content: responseContent,
          sender: 'bot',
          command_category: commandCategory,
          user_id: null
        });
      } catch (error) {
        console.error('Error saving bot message:', error);
        toast({
          title: "Error",
          description: "Failed to save bot response",
          variant: "destructive"
        });
      }
      
      setIsTyping(false);
      // After bot responds, we may want to scroll to bottom
      setShouldScrollToBottom(true);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceStart = () => {
    setIsListening(true);
  };



  const handleVoiceEnd = (transcript: string) => {
  setIsListening(false);
  if (transcript) {
    setInputValue(transcript);
    sendMessage(transcript);
    setUserHasScrolled(false);
  }
};


  const handleSuggestionClick = (command: string) => {
    sendMessage(command);
    // When clicking a suggestion, should scroll to bottom
    setShouldScrollToBottom(true);
    setUserHasScrolled(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-battlefield-cyberBlack">
      {/* Header */}
      <header className="glass-morphism border-b border-battlefield-cyberDarkGray p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-battlefield-cyberTeal/20 flex items-center justify-center mr-3 tech-border">
              <span className="font-bold text-white">WM</span>
            </div>
            <h1 className="text-2xl font-bold text-white">WarMate</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Status indicators */}
            <div className="hidden sm:flex items-center">
              <div className="flex items-center mr-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-green-500">System Online</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-battlefield-cyberTeal mr-2"></div>
                <span className="text-sm text-battlefield-cyberTeal">Voice Ready</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4">
        {/* Chat messages - Using ScrollArea component with improved scroll handling */}
        <ScrollArea 
          className="flex-1 mb-4 px-2"
          style={{ height: 'calc(100vh - 350px)' }}
          viewportRef={viewportRef}
          onScroll={handleScroll}
        >
          <div>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <div className="w-6 h-6 border-2 border-battlefield-cyberTeal border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : messages.length > 0 ? (
              <div>
                {messages.map((message, index) => (
                  <ChatMessage key={message.id} message={message} index={index} />
                ))}
                {isTyping && (
                  <div className="flex mb-4">
                    <div className="glass-morphism p-4 rounded-lg flex items-center">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-battlefield-cyberTeal animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-battlefield-cyberTeal animate-pulse delay-100"></div>
                        <div className="w-2 h-2 rounded-full bg-battlefield-cyberTeal animate-pulse delay-200"></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-400">WarMate is responding...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex justify-center p-4">
                <p className="text-gray-400">No messages yet. Start a conversation!</p>
              </div>
            )}
          </div>
        </ScrollArea>
      
        {/* Command suggestions */}
        {showSuggestions && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-400">SUGGESTED COMMANDS</h3>
              <button 
                onClick={() => setShowSuggestions(false)} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-wrap">
              {commandSuggestions.map((command) => (
                <CommandSuggestion
                  key={command}
                  command={command}
                  onClick={handleSuggestionClick}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        {!showSuggestions && (
          <button 
            onClick={() => setShowSuggestions(true)}
            className="flex items-center justify-center text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="ml-1 text-sm">Show suggestions</span>
          </button>
        )}
        
        {/* Situational Awareness Panel */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          <div className="glass-morphism p-3 rounded-lg flex items-center">
            <Navigation className="h-4 w-4 text-battlefield-cyberTeal mr-2" />
            <div>
              <div className="text-xs text-gray-400">LOCATION</div>
              <div className="text-sm">34.0522° N, 118.2437° W</div>
            </div>
          </div>
          
          <div className="glass-morphism p-3 rounded-lg flex items-center">
            <User className="h-4 w-4 text-battlefield-cyberTeal mr-2" />
            <div>
              <div className="text-xs text-gray-400">TEAM STATUS</div>
              <div className="text-sm">All Units Online</div>
            </div>
          </div>
          
          <div className="glass-morphism p-3 rounded-lg flex items-center">
            <Cloud className="h-4 w-4 text-battlefield-cyberTeal mr-2" />
            <div>
              <div className="text-xs text-gray-400">WEATHER</div>
              <div className="text-sm">{temperature}°C, Clear Sky</div>
            </div>
          </div>
          
          <div className="glass-morphism p-3 rounded-lg flex items-center">
            <Clock className="h-4 w-4 text-battlefield-cyberTeal mr-2" />
            <div>
              <div className="text-xs text-gray-400">LOCAL TIME</div>
              <div className="text-sm">{localTime}</div>
            </div>
          </div>
        </motion.div>
        
        {/* Input area */}
        <form 
          onSubmit={handleSubmit} 
          className="glass-morphism border border-battlefield-cyberDarkGray/50 rounded-lg p-3 flex items-end"
        >
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type or use voice command..."
            className="flex-1 bg-gray-800 border-none focus:outline-none text-white placeholder-gray-400 resize-none h-10 max-h-32 pt-2"
            style={{ minHeight: '40px' }}
            rows={1}
          />
          
          <div className="flex space-x-2 ml-2">
            <VoiceButton 
              onVoiceStart={handleVoiceStart} 
              onVoiceEnd={handleVoiceEnd}
              isListening={isListening}
            />
            
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className={`
                rounded-full p-3
                ${inputValue.trim() 
                  ? 'bg-battlefield-cyberTeal hover:bg-battlefield-darkCyberTeal' 
                  : 'bg-gray-700 cursor-not-allowed'}
                transition-colors
              `}
            >
              <Send className="h-6 w-6 text-black" />
            </button>
          </div>
        </form>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChatPage;
