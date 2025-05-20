
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage, ChatMessageWithUser } from "@/types/chatTypes";
import { Database } from "@/integrations/supabase/types";

// Get all chat messages
export const getChatMessages = async (): Promise<ChatMessage[]> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .order('created_at', { ascending: true }); // Changed to ascending order
  
  if (error) {
    console.error('Error fetching chat messages:', error);
    return [];
  }
  
  return data as ChatMessage[];
};

// Save a new chat message
export const saveChatMessage = async (message: Omit<ChatMessage, 'id' | 'created_at'>): Promise<ChatMessage | null> => {
  // Ensure sender is a valid value before saving
  if (message.sender !== 'user' && message.sender !== 'bot') {
    console.error('Invalid sender value:', message.sender);
    return null;
  }
  
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([message])
    .select()
    .single();
  
  if (error) {
    console.error('Error saving chat message:', error);
    return null;
  }
  
  return data as ChatMessage;
};

// Get chat analytics
export const getChatAnalytics = async () => {
  // Get message count by sender using raw SQL
  const { data: countData, error: countError } = await supabase
    .rpc('get_message_count_by_sender');
  
  if (countError) {
    console.error('Error fetching message counts:', countError);
    return null;
  }
  
  // Get command categories using raw SQL
  const { data: categoryData, error: categoryError } = await supabase
    .rpc('get_command_category_counts');
  
  if (categoryError) {
    console.error('Error fetching command categories:', categoryError);
    return null;
  }
  
  // Get daily activity
  const { data: dailyData, error: dailyError } = await supabase
    .from('chat_messages')
    .select('created_at')
    .order('created_at', { ascending: true });
  
  if (dailyError) {
    console.error('Error fetching daily activity:', dailyError);
    return null;
  }
  
  // Process the data
  const userMessages = countData?.find(d => d.sender === 'user')?.count || 0;
  const botMessages = countData?.find(d => d.sender === 'bot')?.count || 0;
  
  const commandCategories = categoryData?.map(c => ({
    category: c.command_category || 'other',
    count: c.count
  })) || [];
  
  // Process daily activity
  const dailyActivity: Record<string, number> = {};
  dailyData?.forEach(msg => {
    if (msg.created_at) {
      const date = new Date(msg.created_at).toISOString().split('T')[0];
      dailyActivity[date] = (dailyActivity[date] || 0) + 1;
    }
  });
  
  const formattedDailyActivity = Object.entries(dailyActivity).map(([date, messages]) => ({
    date,
    messages
  }));
  
  return {
    totalMessages: userMessages + botMessages,
    userMessages,
    botMessages,
    commandCategories,
    dailyActivity: formattedDailyActivity
  };
};

// Clear all chat messages - Fixed to handle deletion properly
export const clearChatHistory = async (): Promise<boolean> => {
  const { error } = await supabase
    .from('chat_messages')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Using neq instead of not eq for proper syntax
  
  if (error) {
    console.error('Error clearing chat history:', error);
    return false;
  }
  
  return true;
};
