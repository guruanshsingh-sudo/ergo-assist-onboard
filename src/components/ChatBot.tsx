import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      text: "Hi! I'm ErgoAssist, your insurance companion. Ask me anything about insurance terms like IDV, NCB, Premium, or any other questions!",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Mock bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('idv')) {
      return "IDV (Insured Declared Value) is the current market value of your vehicle. It's the maximum amount you'll receive if your vehicle is stolen or completely damaged. It decreases every year due to depreciation.";
    } else if (lowerQuery.includes('ncb') || lowerQuery.includes('no claim bonus')) {
      return "NCB (No Claim Bonus) is a discount you get on your premium for not making any claims in the previous year. It can range from 20% to 50% and helps reduce your insurance costs!";
    } else if (lowerQuery.includes('premium')) {
      return "Premium is the amount you pay to the insurance company for your coverage. It's calculated based on factors like your vehicle's IDV, age, location, and coverage type.";
    } else if (lowerQuery.includes('deductible')) {
      return "A deductible is the amount you pay from your pocket before the insurance kicks in. A higher deductible means lower premium, but you'll pay more during claims.";
    } else if (lowerQuery.includes('comprehensive')) {
      return "Comprehensive insurance covers both third-party liabilities and own damage to your vehicle. It's the most complete protection available for your vehicle.";
    } else if (lowerQuery.includes('third party')) {
      return "Third-party insurance covers damages or injuries you cause to others. It's mandatory by law but doesn't cover your own vehicle's damages.";
    } else {
      return "I'm here to help! Try asking about common insurance terms like IDV, NCB, Premium, Deductible, Comprehensive coverage, or Third-party insurance.";
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
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="bg-background border-border rounded-xl h-10"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="rounded-xl h-10 w-10 bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
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
