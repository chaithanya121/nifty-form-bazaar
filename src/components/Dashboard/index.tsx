import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  BarChart2, 
  FileText, 
  Users, 
  Settings, 
  Trash2, 
  Edit3,
  Copy
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

interface FormData {
  id: string;
  name: string;
  createdAt: string | Date;
  lastModified: string | Date;
  submissions: number;
  config: FormConfig;
}

const Dashboard = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [stats, setStats] = useState({
    totalForms: 0,
    totalSubmissions: 0,
    activeUsers: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [newFormName, setNewFormName] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load forms from localStorage
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
    
    // If no stored forms are found, use empty array
    setForms(storedForms || []);
    
    // Update stats based on loaded forms
    setStats({
      totalForms: storedForms.length,
      totalSubmissions: storedForms.reduce((acc, form) => acc + form.submissions, 0),
      activeUsers: Math.floor(Math.random() * 100) // This is still mock data since we don't track real users
    });
  }, [toast]);

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

    // Update state
    const updatedForms = [newForm, ...forms];
    setForms(updatedForms);
    
    // Update localStorage
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
    // Remove from state
    const updatedForms = forms.filter(form => form.id !== formId);
    setForms(updatedForms);
    
    // Update localStorage
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
      submissions: 0
    };

    // Update state
    const updatedForms = [duplicatedForm, ...forms];
    setForms(updatedForms);
    
    // Update localStorage
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
      // Parse the ISO string to a Date object
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString();
    }
    
    // It's already a Date object
    return dateValue.toLocaleDateString();
  };

  const filteredForms = forms.filter(form => 
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <Sidebar defaultWidth={250} variant="sidebar">
          <SidebarContent>
            <div className="flex flex-col gap-4 p-4">
              <Button variant="ghost" className="justify-start gap-2">
                <BarChart2 className="h-5 w-5" />
                Overview
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <FileText className="h-5 w-5" />
                Forms
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Users className="h-5 w-5" />
                Submissions
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Dialog open={isCreateFormOpen} onOpenChange={setIsCreateFormOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Create Form
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Form</DialogTitle>
                  <DialogDescription>
                    Give your form a name to get started
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Form Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter form name"
                      value={newFormName}
                      onChange={(e) => setNewFormName(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleCreateForm} className="w-full">
                    Create Form
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Total Forms</h3>
              <p className="text-3xl font-bold">{stats.totalForms}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Total Submissions</h3>
              <p className="text-3xl font-bold">{stats.totalSubmissions}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
              <p className="text-3xl font-bold">{stats.activeUsers}</p>
            </Card>
          </div>

          {/* Recent Forms */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Forms</h2>
              <Input
                placeholder="Search forms..."
                className="max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredForms.map((form) => (
                <Card key={form.id} className="p-4 hover:shadow-lg transition-shadow">
                  <h3 className="font-medium mb-2">{form.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Last modified {formatDate(form.lastModified)}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {form.submissions} submissions
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDuplicateForm(form)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/form-builder/${form.id}`)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteForm(form.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
