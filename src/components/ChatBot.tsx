import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm ErgoAssist, your insurance companion. Ask me anything about insurance terms or get help with the onboarding process!",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useOnboarding();
  const location = useLocation();

  const getPageContext = () => {
    const path = location.pathname;
    let currentStep = '';
    let pageContent = '';

    if (path === '/onboarding') {
      currentStep = 'onboarding';
      pageContent = 'The user is filling out vehicle information, policy preferences, and owner details.';
    } else if (path === '/quotes') {
      currentStep = 'quote selection';
      pageContent = 'The user is reviewing insurance plan options and comparing coverage.';
    } else if (path === '/confirmation') {
      currentStep = 'confirmation';
      pageContent = 'The user is reviewing their selected plan before proceeding to buy.';
    }

    return { currentStep, pageContent };
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const context = {
        ...getPageContext(),
        formData: data,
      };

      const { data: responseData, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          messages: messages
            .filter(m => m.id !== '1') // Don't send initial greeting
            .map(m => ({
              role: m.isBot ? 'assistant' : 'user',
              content: m.text,
            }))
            .concat([{ role: 'user', content: userInput }]),
          context,
        },
      });

      if (error) throw error;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseData.message || "I'm sorry, I couldn't process that. Please try again.",
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glow hover:scale-110 transition-transform"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] bg-card border border-border rounded-3xl shadow-card overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4">
              <h3 className="text-lg font-bold text-background">ErgoAssist</h3>
              <p className="text-sm text-background/80">Your AI Insurance Companion</p>
            </div>

            {/* Messages */}
            <ScrollArea className="h-[340px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="bg-background border-border rounded-xl h-10"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  disabled={isLoading}
                  className="rounded-xl h-10 w-10 bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
