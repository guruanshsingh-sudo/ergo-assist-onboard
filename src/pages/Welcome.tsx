import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Welcome = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGetStarted = () => {
    setIsTransitioning(true);
    setTimeout(() => navigate('/auth'), 800);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Liquid fill transition effect */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-primary via-secondary to-accent"
            initial={{ clipPath: 'circle(0% at 50% 100%)' }}
            animate={{ clipPath: 'circle(150% at 50% 100%)' }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Constantly moving animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full relative z-10"
      >
        {/* Logo Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow relative"
              animate={{
                boxShadow: [
                  "0 0 40px hsl(180 100% 50% / 0.2)",
                  "0 0 60px hsl(180 100% 50% / 0.4)",
                  "0 0 40px hsl(180 100% 50% / 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Shield className="w-8 h-8 text-background" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-foreground">ErgoAssist</h1>
              <p className="text-sm text-muted-foreground">by HDFC Ergo</p>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-3"
          >
            Smart, Simple, Secure Auto Insurance
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg"
          >
            Your AI-powered insurance companion
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-4 mb-12"
        >
          {[
            { icon: Zap, title: 'Instant Quotes', desc: 'Get personalized plans in seconds', color: 'from-primary/20 to-primary/5' },
            { icon: Shield, title: 'Comprehensive Coverage', desc: 'Tailored to your needs', color: 'from-secondary/20 to-secondary/5' },
            { icon: Lock, title: 'Secure & Trusted', desc: 'Your data is safe with us', color: 'from-accent/20 to-accent/5' },
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 400 }
              }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-card group-hover:shadow-glow transition-all duration-500 backdrop-blur-sm h-full flex flex-col">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-8 h-8 text-primary mb-3" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground flex-grow">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="relative w-full md:w-auto px-12 py-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <span className="relative flex items-center gap-2">
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-muted-foreground mt-4"
          >
            Join thousands of satisfied customers
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
