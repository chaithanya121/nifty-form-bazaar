
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ChevronRight,
  Gauge,
  LucideIcon,
  MousePointerClick,
  PenTool,
  Share2,
  CheckCircle2
} from 'lucide-react';

interface StepProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay: number;
}

const Step: React.FC<StepProps> = ({ title, description, icon: Icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-start gap-4 bg-gray-800/50 p-5 rounded-xl border border-gray-700/50"
    >
      <div className="p-2 bg-blue-500/20 rounded-full">
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

interface GetStartedProps {
  onClose: () => void;
  onSignUp: () => void;
}

const GetStarted: React.FC<GetStartedProps> = ({ onClose, onSignUp }) => {
  const steps = [
    {
      title: "Create Your Account",
      description: "Sign up in just a few seconds to get started with Form Builder Pro.",
      icon: CheckCircle2,
      delay: 0.1
    },
    {
      title: "Design Your Form",
      description: "Use our drag-and-drop builder to create beautiful forms that match your brand.",
      icon: PenTool,
      delay: 0.2
    },
    {
      title: "Configure Settings",
      description: "Set up validation rules, notifications, and integrations for your form.",
      icon: Gauge,
      delay: 0.3
    },
    {
      title: "Publish & Share",
      description: "Generate a link to share your form or embed it directly on your website.",
      icon: Share2,
      delay: 0.4
    },
    {
      title: "Collect Responses",
      description: "Track submissions in real-time and analyze the data collected.",
      icon: MousePointerClick,
      delay: 0.5
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-xl"
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Get Started with Form Builder Pro</h2>
              <p className="text-gray-400">Follow these simple steps to create your first form</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-400 hover:text-white rounded-full"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </Button>
          </div>
          
          <div className="relative mb-8 overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=400&q=80" 
              alt="Form Builder Dashboard Preview" 
              className="w-full h-auto rounded-xl object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">Powerful Form Building Made Simple</h3>
                <p className="text-gray-300 text-sm">Join thousands of users creating beautiful forms with our platform</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <Step 
                key={index} 
                title={step.title} 
                description={step.description} 
                icon={step.icon} 
                delay={step.delay} 
              />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onSignUp}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-8 py-6 rounded-xl text-lg font-medium"
            >
              Create Your Account
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-gray-800/50 text-white border-gray-600 hover:bg-gray-700/50 px-8 py-6 rounded-xl text-lg font-medium"
            >
              Explore First
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GetStarted;
