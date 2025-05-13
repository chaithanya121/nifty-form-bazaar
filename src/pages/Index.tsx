
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FormBuilder from "@/components/FormBuilder";

const MotionCard = motion(Card);

const Index = () => {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 mt-6"
      >
        <h1 className="text-3xl font-bold tracking-tight text-white mb-3 md:text-4xl lg:text-5xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200">
            Build Beautiful Forms
          </span>
        </h1>
        <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
          Create professional forms with our intuitive drag-and-drop form builder
        </p>
      </motion.div>

      <div className="bg-slate-900/60 backdrop-blur-sm border border-indigo-800/20 rounded-xl shadow-xl p-3">
        <FormBuilder />
      </div>
    </div>
  );
};

export default Index;
