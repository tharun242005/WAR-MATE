
import type { User } from '@supabase/supabase-js';

// Define message types
export interface MessageType {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}


// Define analytics types
export interface MessageAnalytics {
  totalMessages: number;
  userMessages: number;
  botMessages: number;
  commandCategories: {
    category: string;
    count: number;
  }[];
  dailyActivity: {
    date: string;
    messages: number;
  }[];
}

// Define database models that extend Supabase types
export interface ChatMessage {
  id: string;
  user_id?: string | null;
  content: string;
  sender: string;
  created_at: string;
  command_category?: string | null;
}

// Type for chat message with user info
export interface ChatMessageWithUser extends ChatMessage {
  user?: User | null;
}
