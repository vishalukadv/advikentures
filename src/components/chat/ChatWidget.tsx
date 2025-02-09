import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendNotificationEmail } from '../../lib/email';
import { analytics } from '../../lib/analytics';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm your Advikentures assistant. How can I help you today?"
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Track user interaction
      analytics.trackEvent({
        name: 'chatbot_message',
        properties: { type: 'user_message' }
      });

      // Process message and get response
      const response = await processMessage(userMessage, messages);
      
      // Add assistant response
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);

      // Track bot response
      analytics.trackEvent({
        name: 'chatbot_message',
        properties: { type: 'bot_response' }
      });
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again or use our contact form for assistance."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const processMessage = async (message: string, context: Message[]): Promise<string> => {
    // Simple keyword-based response system
    const lowercaseMsg = message.toLowerCase();
    
    // Check for booking/package related queries
    if (lowercaseMsg.includes('book') || lowercaseMsg.includes('package') || lowercaseMsg.includes('price')) {
      return "I can help you with booking information! Our packages start from ₹19,999. Would you like to know more about specific packages or locations? You can also use our booking form to make a reservation.";
    }

    // Check for activity related queries
    if (lowercaseMsg.includes('activity') || lowercaseMsg.includes('adventure') || lowercaseMsg.includes('sport')) {
      return "We offer a wide range of adventure activities including bungee jumping, river rafting, paragliding, and more. Which activity interests you the most?";
    }

    // Check for location queries
    if (lowercaseMsg.includes('location') || lowercaseMsg.includes('where') || lowercaseMsg.includes('place')) {
      return "We operate in several locations across India including Manali, Rishikesh, Spiti Valley, and more. Each location offers unique experiences. Would you like to know more about a specific location?";
    }

    // Check for contact/support queries
    if (lowercaseMsg.includes('contact') || lowercaseMsg.includes('support') || lowercaseMsg.includes('help')) {
      // Create support ticket
      try {
        const lastMessages = context.slice(-5).map(m => `${m.role}: ${m.content}`).join('\n');
        
        const { error: enquiryError } = await supabase
          .from('enquiries')
          .insert([{
            name: "Chat Support",
            email: "chat@advikentures.com",
            subject: "Chat Support Request",
            message: `Chat History:\n${lastMessages}`,
            status: 'pending'
          }]);

        if (enquiryError) throw enquiryError;

        await sendNotificationEmail({
          type: 'enquiry',
          data: {
            name: "Chat Support",
            email: "chat@advikentures.com",
            phone: "",
            packageName: "Support Request",
            bookingDate: new Date().toISOString(),
            travelers: 0,
            price: "",
            subject: "New Chat Support Request",
            message: `Chat History:\n${lastMessages}`
          }
        });

        return "I've created a support ticket for you. Our team will contact you soon. In the meantime, you can reach us at info@advikentures.com or call us at +916395406996.";
      } catch (error) {
        console.error('Failed to create support ticket:', error);
        return "You can reach our support team at info@advikentures.com or call us at +916395406996.";
      }
    }

    // Default response for unhandled queries
    return "I understand you're interested in our services. To better assist you, would you like to know more about our packages, activities, or locations? You can also contact our team directly for personalized assistance.";
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 p-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-colors z-50"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-[450px] bg-white rounded-lg shadow-xl flex flex-col z-50">
          {/* Header */}
          <div className="p-3 bg-orange-600 text-white rounded-t-lg">
            <h3 className="text-sm font-semibold">Advikentures Assistant</h3>
            <p className="text-xs opacity-90">Ask me anything about our services!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 resize-none border rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-600"
                rows={1}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;