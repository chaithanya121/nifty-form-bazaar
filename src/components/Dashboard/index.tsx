import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  BarChart2, 
  FileText, 
  Users, 
  Settings, 
  Trash2, 
  Edit3,
  Copy,
  Search,
  Filter,
  ChevronDown,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Layers,
  Layout,
  Code,
  Palette,
  Sliders,
  Globe,
  Link,
  LogIn,
  UserPlus,
  FileImage,
  Heading,
  Play,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormConfig } from '@/components/FormBuilder/types';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { SignInForm } from '../auth/SignInForm';
import { SignUpForm } from '../auth/SignUpForm';
import DemoVideo from '../DemoVideo';

interface FormData {
  id: string;
  name: string;
  createdAt: string | Date;
  lastModified: string | Date;
  submissions: number;
  published: boolean;
  config: FormConfig;
}

// Featured form templates for inspiration
const formTemplates = [
  { 
    name: "Contact Form", 
    description: "Collect user inquiries and contact information",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80"
  },
  { 
    name: "Event Registration", 
    description: "Register attendees for your next event",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80"
  },
  { 
    name: "Customer Survey", 
    description: "Gather feedback from your customers",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80"
  },
];

// Features list
const builderFeatures = [
  {
    icon: <Layout className="h-6 w-6 text-blue-400" />,
    title: "Drag & Drop Builder",
    description: "Intuitive form building with no coding required"
  },
  {
    icon: <Palette className="h-6 w-6 text-purple-400" />,
    title: "Custom Themes",
    description: "Brand your forms with custom colors and styles"
  },
  {
    icon: <FileImage className="h-6 w-6 text-orange-400" />,
    title: "Media Support",
    description: "Add images and videos to your forms"
  },
  {
    icon: <Code className="h-6 w-6 text-green-400" />,
    title: "Logic Rules",
    description: "Create conditional logic for dynamic forms"
  },
  {
    icon: <Globe className="h-6 w-6 text-indigo-400" />,
    title: "Instant Publishing",
    description: "Share your forms with a single click"
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-red-400" />,
    title: "Advanced Analytics",
    description: "Track submissions and analyze responses"
  },
];

const Dashboard = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [stats, setStats] = useState({
    totalForms: 0,
    totalSubmissions: 0,
    activeUsers: 0,
    completionRate: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [newFormName, setNewFormName] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'submissions'>('date');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'archived' | 'published' | 'draft'>('all');
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const storedFormsJson = localStorage.getItem('nifty-forms');
      let storedForms: FormData[] = [];
      
      if (storedFormsJson) {
        try {
          storedForms = JSON.parse(storedFormsJson);
        } catch (error) {
          console.error('Error parsing stored forms:', error);
          toast({
            title: "Error",
            description: "Failed to load saved forms",
            variant: "destructive"
          });
        }
      }
      
      setForms(storedForms || []);
      
      setStats({
        totalForms: storedForms.length,
        totalSubmissions: storedForms.reduce((acc, form) => acc + form.submissions, 0),
        activeUsers: Math.floor(Math.random() * 100),
        completionRate: storedForms.length > 0 ? 
          Math.round((storedForms.filter(f => f.published).length / storedForms.length) * 100) : 0
      });
    }
  }, [toast, isAuthenticated]);

  const handleCreateForm = () => {
    if (!newFormName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form name",
        variant: "destructive"
      });
      return;
    }

    const newForm: FormData = {
      id: `form-${Date.now()}`,
      name: newFormName,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      submissions: 0,
      published: false,
      config: {
        name: newFormName,
        elements: [],
        settings: {
          termsAndConditions: {
            enabled: true,
            required: true,
            text: "I accept the Terms & Conditions & Privacy Policy",
          },
          submitButton: {
            enabled: true,
            text: "Submit",
          },
          preview: {
            width: "Full",
            nesting: true,
          },
          validation: {
            liveValidation: "Default",
          },
          layout: {
            size: "Default",
            columns: {
              default: true,
              tablet: false,
              desktop: false,
            },
            labels: "Default",
            placeholders: "Default",
            errors: "Default",
            messages: "Default",
          },
        },
      }
    };

    const updatedForms = [newForm, ...forms];
    setForms(updatedForms);
    
    localStorage.setItem('nifty-forms', JSON.stringify(updatedForms));
    
    setStats(prev => ({
      ...prev,
      totalForms: prev.totalForms + 1
    }));
    setIsCreateFormOpen(false);
    setNewFormName('');
    navigate(`/form-builder/${newForm.id}`);
  };

  const handleDeleteForm = (formId: string) => {
    const updatedForms = forms.filter(form => form.id !== formId);
    setForms(updatedForms);
    
    localStorage.setItem('nifty-forms', JSON.stringify(updatedForms));
    
    setStats(prev => ({
      ...prev,
      totalForms: prev.totalForms - 1
    }));
    toast({
      title: "Success",
      description: "Form deleted successfully"
    });
  };

  const handleDuplicateForm = (form: FormData) => {
    const duplicatedForm: FormData = {
      ...form,
      id: `form-${Date.now()}`,
      name: `${form.name} (Copy)`,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      submissions: 0,
      published: false
    };

    const updatedForms = [duplicatedForm, ...forms];
    setForms(updatedForms);
    
    localStorage.setItem('nifty-forms', JSON.stringify(updatedForms));
    
    setStats(prev => ({
      ...prev,
      totalForms: prev.totalForms + 1
    }));
    toast({
      title: "Success",
      description: "Form duplicated successfully"
    });
  };

  const formatDate = (dateValue: string | Date): string => {
    if (!dateValue) return 'Unknown date';
    
    if (typeof dateValue === 'string') {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString();
    }
    
    return dateValue.toLocaleDateString();
  };

  const sortForms = (formsToSort: FormData[]) => {
    switch (sortBy) {
      case 'name':
        return [...formsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case 'date':
        return [...formsToSort].sort((a, b) => 
          new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
        );
      case 'submissions':
        return [...formsToSort].sort((a, b) => b.submissions - a.submissions);
      default:
        return formsToSort;
    }
  };

  const getStatusColor = (submissions: number) => {
    if (submissions > 50) return "text-green-500";
    if (submissions > 20) return "text-yellow-500";
    return "text-gray-500";
  };

  const filteredAndSortedForms = sortForms(
    forms.filter(form => {
      const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesStatus = true;
      if (filterStatus === 'published') {
        matchesStatus = form.published === true;
      } else if (filterStatus === 'draft') {
        matchesStatus = form.published === false;
      }
      
      return matchesSearch && matchesStatus;
    })
  );

  // Unauthenticated view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 max-w-4xl"
            >
              <div className="relative mx-auto w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Layers className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -right-4 -bottom-2 bg-green-500 rounded-full p-2 border-2 border-gray-900">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Form Builder Pro
                </span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gray-300 text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
              >
                Create stunning forms with our intuitive drag-and-drop builder. No coding required.
                Perfect for surveys, registration forms, lead generation, and more.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                <Button 
                  onClick={() => setAuthTab('signup')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-8 py-6 rounded-xl text-lg font-medium border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-gray-800/50 text-white border-gray-600 hover:bg-gray-700/50 px-8 py-6 rounded-xl text-lg font-medium shadow-lg transition-all duration-300"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </motion.div>
              
              {/* Form Preview Image */}
              <div className="relative mx-auto max-w-4xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
                <motion.div 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80" 
                    alt="Form Builder Dashboard" 
                    className="w-full h-auto opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent flex items-end">
                    <div className="p-6 text-left">
                      <h3 className="text-2xl font-bold text-white mb-2">Beautiful Form Builder</h3>
                      <p className="text-gray-300">Create forms with our intuitive drag-and-drop interface.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg my-16">
              <div className="flex mb-6">
                <button
                  className={`flex-1 py-2 px-4 text-center ${
                    authTab === 'signin'
                      ? 'bg-blue-600 text-white rounded-l-lg'
                      : 'bg-gray-700 text-gray-300 rounded-l-lg'
                  }`}
                  onClick={() => setAuthTab('signin')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </div>
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-center ${
                    authTab === 'signup'
                      ? 'bg-blue-600 text-white rounded-r-lg'
                      : 'bg-gray-700 text-gray-300 rounded-r-lg'
                  }`}
                  onClick={() => setAuthTab('signup')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </div>
                </button>
              </div>

              {authTab === 'signin' ? (
                <SignInForm onSuccess={() => {
                  navigate("/");
                }} />
              ) : (
                <SignUpForm onSuccess={() => {
                  navigate("/");
                }} />
              )}
            </div>
            
            {/* Features Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="w-full py-16"
            >
              <h2 className="text-3xl font-bold mb-2">Powerful Features</h2>
              <p className="text-gray-400 mb-10">All the tools you need to create and manage forms</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {builderFeatures.map((feature, index) => (
                  <motion.div 
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="p-3 bg-gray-700/50 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-blue-900/30 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Templates Section */}
            <div className="w-full py-16">
              <h2 className="text-3xl font-bold mb-2">Ready-to-Use Templates</h2>
              <p className="text-gray-400 mb-10">Jump start your form creation with our professionally-designed templates</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {formTemplates.map((template, index) => (
                  <motion.div 
                    key={template.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 * index }}
                    className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={template.image} 
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-semibold text-white">{template.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-400 mb-4">{template.description}</p>
                      <Button onClick={() => setAuthTab('signup')} variant="secondary" size="sm" className="w-full">
                        Use Template
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Demo Video Modal */}
            <DemoVideo open={isVideoOpen} onOpenChange={setIsVideoOpen} />
            
            {/* Testimonials */}
            <div className="w-full py-16 bg-gradient-to-b from-transparent to-gray-800/30 rounded-2xl my-10">
              <h2 className="text-3xl font-bold mb-16">Trusted by Businesses</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-white">A</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Alex Johnson</h4>
                      <p className="text-sm text-gray-400">Marketing Director</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"Form Builder Pro transformed how we collect lead information. Our conversion rate increased by 40% in just one month!"</p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-white">S</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Sarah Miller</h4>
                      <p className="text-sm text-gray-400">Event Manager</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"The event registration templates saved us countless hours. Setting up our conference registration was a breeze."</p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-white">M</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Michael Chen</h4>
                      <p className="text-sm text-gray-400">Product Owner</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"The analytics dashboard gives us incredible insights into our customer feedback. It's become an essential tool for our product team."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="border-t border-gray-800 py-12 mt-12 bg-gray-900/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="h-6 w-6 text-blue-500" />
                  <span className="text-xl font-bold text-white">Form Builder Pro</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">Create beautiful forms in minutes with our intuitive drag-and-drop form builder.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Templates</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Integrations</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Guides</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">© 2025 Form Builder Pro. All rights reserved.</p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Authenticated view - Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section with User Profile */}
        {user && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name || "User"} className="rounded-full w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{user.name || 'User'}</span>!
                </h1>
                <p className="text-gray-400">Create and manage your forms with our powerful builder</p>
              </div>
              <div className="ml-auto hidden md:flex">
                <Button
                  onClick={() => setIsCreateFormOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-6 py-6 rounded-xl text-lg font-medium border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create New Form
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Dashboard Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
        >
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-850 border-gray-700 shadow-lg backdrop-blur-sm rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Total Forms</p>
                  <h3 className="text-2xl font-bold text-white">{stats.totalForms}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-850 border-gray-700 shadow-lg backdrop-blur-sm rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-green-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Submissions</p>
                  <h3 className="text-2xl font-bold text-white">{stats.totalSubmissions}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-850 border-gray-700 shadow-lg backdrop-blur-sm rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-purple-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Active Users</p>
                  <h3 className="text-2xl font-bold text-white">{stats.activeUsers}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-850 border-gray-700 shadow-lg backdrop-blur-sm rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-orange-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md">
                  <BarChart2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Completion Rate</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">{stats.completionRate}%</h3>
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                        style={{ width: `${stats.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Form Builder Tools */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50 shadow-lg"
        >
          <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Heading className="h-5 w-5 text-blue-400" />
            Form Builder Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateFormOpen(true)}
              className="bg-gradient-to-br from-gray-800 to-gray-850 hover:from-gray-750 hover:to-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 group"
            >
              <div className="p-3 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors">
                <PlusCircle className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-white">New Form</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-gray-800 to-gray-850 hover:from-gray-750 hover:to-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 group"
            >
              <div className="p-3 bg-purple-500/10 rounded-full group-hover:bg-purple-500/20 transition-colors">
                <Layout className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-white">Templates</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-gray-800 to-gray-850 hover:from-gray-750 hover:to-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 group"
            >
              <div className="p-3 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition-colors">
                <Sliders className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-sm font-medium text-white">Form Settings</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-gray-800 to-gray-850 hover:from-gray-750 hover:to-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 group"
            >
              <div className="p-3 bg-orange-500/10 rounded-full group-hover:bg-orange-500/20 transition-colors">
                <Palette className="h-6 w-6 text-orange-400" />
              </div>
              <span className="text-sm font-medium text-white">Themes</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50 shadow-lg"
        >
          <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-gray-800/70 rounded-lg">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Edit3 className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">You edited <span className="font-medium">Contact Form</span></p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/70 rounded-lg">
              <div className="p-2 bg-green-500/10 rounded-full">
                <PlusCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">You created <span className="font-medium">Feedback Survey</span></p>
                <p className="text-xs text-gray-400">Yesterday</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/70 rounded-lg">
              <div className="p-2 bg-purple-500/10 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">New submission on <span className="font-medium">Registration Form</span></p>
                <p className="text-xs text-gray-400">2 days ago</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl mb-8 border border-gray-700/50 shadow-lg"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Dialog open={isCreateFormOpen} onOpenChange={setIsCreateFormOpen}>
                <DialogTrigger asChild>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Create Form
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 rounded-xl shadow-xl backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle className="text-white text-xl">Create New Form</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Give your form a name to get started
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-white">Form Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter form name..."
                        value={newFormName}
                        onChange={(e) => setNewFormName(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCreateForm}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
                    >
                      Create Form
                    </motion.button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search forms..."
                    className="pl-10 bg-gray-700/70 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40 bg-gray-700/70 border-gray-600 text-white rounded-lg">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 rounded-lg shadow-xl">
                  <SelectItem value="name" className="text-white hover:bg-gray-700">Name</SelectItem>
                  <SelectItem value="date" className="text-white hover:bg-gray-700">Last Modified</SelectItem>
                  <SelectItem value="submissions" className="text-white hover:bg-gray-700">Submissions</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-40 bg-gray-700/70 border-gray-600 text-white rounded-lg">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 rounded-lg shadow-xl">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">All Forms</SelectItem>
                  <SelectItem value="published" className="text-white hover:bg-gray-700">Published</SelectItem>
                  <SelectItem value="draft" className="text-white hover:bg-gray-700">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Forms Grid */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Your Forms
          </h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAndSortedForms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-gradient-to-br from-gray-800 to-gray-850 border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="p-6 relative">
                    <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-white truncate flex items-center gap-2">
                        {form.name}
                        {form.published ? (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Published</span>
                        ) : (
                          <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full">Draft</span>
                        )}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 rounded-lg shadow-xl">
                          <DropdownMenuLabel className="text-gray-400">Form Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem 
                            className="hover:bg-gray-700 cursor-pointer" 
                            onClick={() => navigate(`/form-builder/${form.id}`)}
                          >
                            <Edit3 className="h-4 w-4 mr-2 text-blue-500" />
                            Edit Form
                          </DropdownMenuItem>
                          {form.published && (
                            <>
                              <DropdownMenuItem 
                                className="hover:bg-gray-700 cursor-pointer"
                                onClick={() => navigate(`/form/${form.id}`)}
                              >
                                <Eye className="h-4 w-4 mr-2 text-green-400" />
                                View Form
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="hover:bg-gray-700 cursor-pointer"
                                onClick={() => {
                                  const shareableLink = `${window.location.origin}/form/${form.id}`;
                                  navigator.clipboard.writeText(shareableLink);
                                  toast({
                                    title: "Link Copied",
                                    description: "Shareable form link copied to clipboard"
                                  });
                                }}
                              >
                                <Link className="h-4 w-4 mr-2 text-blue-400" />
                                Copy Shareable Link
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem 
                            className="hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleDuplicateForm(form)}
                          >
                            <Copy className="h-4 w-4 mr-2 text-green-500" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              const updatedForms = forms.map(f => {
                                if (f.id === form.id) {
                                  return {
                                    ...f,
                                    published: !f.published,
                                    lastModified: new Date().toISOString()
                                  };
                                }
                                return f;
                              });
                              setForms(updatedForms);
                              localStorage.setItem('nifty-forms', JSON.stringify(updatedForms));
                              toast({
                                title: form.published ? "Form Unpublished" : "Form Published",
                                description: form.published ? 
                                  "The form is now in draft mode" : 
                                  "The form is now available for submissions"
                              });
                            }}
                          >
                            <Globe className="h-4 w-4 mr-2 text-purple-500" />
                            {form.published ? "Unpublish" : "Publish"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem 
                            className="hover:bg-red-900/30 text-red-400 hover:text-red-300 cursor-pointer"
                            onClick={() => handleDeleteForm(form.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4 text-gray-500" />
                        Last modified {formatDate(form.lastModified)}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(form.submissions)}`}>
                            <CheckCircle2 className="h-3 w-3" />
                            <span>{form.submissions} submissions</span>
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/form-builder/${form.id}`)}
                          className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition-colors"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Empty State */}
        {filteredAndSortedForms.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 px-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg"
          >
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gray-800 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-500" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No forms found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              {searchTerm ? "Try adjusting your search terms or clear filters to see all forms" : "Get started by creating your first form and begin collecting submissions"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateFormOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
            >
              <PlusCircle className="h-4 w-4" />
              Create Form
            </motion.button>
          </motion.div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-500" />
              <span className="text-lg font-bold text-white">Form Builder Pro</span>
            </div>
            
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Form Builder Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
