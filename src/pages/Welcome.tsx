import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Lock } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Logo Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
              <Shield className="w-8 h-8 text-background" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-foreground">ErgoAssist</h1>
              <p className="text-sm text-muted-foreground">by HDFC Ergo</p>
            </div>
          </div>
          
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
            { icon: Zap, title: 'Instant Quotes', desc: 'Get personalized plans in seconds' },
            { icon: Shield, title: 'Comprehensive Coverage', desc: 'Tailored to your needs' },
            { icon: Lock, title: 'Secure & Trusted', desc: 'Your data is safe with us' },
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
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
          <Button
            onClick={() => navigate('/auth')}
            size="lg"
            className="w-full md:w-auto px-12 py-6 text-lg font-semibold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Join thousands of satisfied customers
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
