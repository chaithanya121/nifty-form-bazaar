
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { LayoutDashboard, FileText, Send, FileBarChart } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormData {
  id: string;
  name: string;
  submissions?: number;
  published?: boolean;  // Added this property to fix the type error
}

const DashboardOverview = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  
  useEffect(() => {
    // Load forms data from localStorage
    const storedFormsJson = localStorage.getItem('nifty-forms');
    let storedForms: FormData[] = [];
    
    if (storedFormsJson) {
      try {
        storedForms = JSON.parse(storedFormsJson);
        setForms(storedForms);
        
        // Calculate total submissions
        const total = storedForms.reduce((acc, form) => acc + (form.submissions || 0), 0);
        setTotalSubmissions(total);
      } catch (error) {
        console.error('Error parsing stored forms:', error);
      }
    }
  }, []);

  const stats = [
    {
      title: "Total Forms",
      value: forms.length,
      icon: FileText,
      color: "bg-blue-500/20",
      iconColor: "text-blue-500"
    },
    {
      title: "Published Forms",
      value: forms.filter(form => form.published).length,
      icon: Send,
      color: "bg-green-500/20",
      iconColor: "text-green-500"
    },
    {
      title: "Total Submissions",
      value: totalSubmissions,
      icon: FileBarChart,
      color: "bg-purple-500/20",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-indigo-500/20">
          <LayoutDashboard className="h-6 w-6 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
          >
            <Card className="bg-gray-800/60 border-gray-700 p-5 hover:border-gray-500 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardOverview;
