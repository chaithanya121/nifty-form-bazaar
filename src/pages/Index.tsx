
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Filter, PlusCircle, Edit3, Eye, Trash2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FormData {
  id: string;
  name: string;
  createdAt: string | Date;
  lastModified: string | Date;
  submissions: number;
  published: boolean;
}

const Index = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'submissions'>('date');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
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
    
    setForms(storedForms || []);
  }, [toast]);

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

  const handleDeleteForm = (formId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedForms = forms.filter(form => form.id !== formId);
    setForms(updatedForms);
    
    localStorage.setItem('nifty-forms', JSON.stringify(updatedForms));
    
    toast({
      title: "Success",
      description: "Form deleted successfully"
    });
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
            All Forms
          </span>
        </h1>
        <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
          View and manage all your created forms
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl mb-8 border border-gray-700/50 shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button 
              onClick={() => navigate('/create')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Form
            </Button>
              
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search forms..."
                className="pl-10 bg-gray-700/70 border-gray-600 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40 bg-gray-700/70 border-gray-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="name" className="text-white hover:bg-gray-700">Name</SelectItem>
                <SelectItem value="date" className="text-white hover:bg-gray-700">Last Modified</SelectItem>
                <SelectItem value="submissions" className="text-white hover:bg-gray-700">Submissions</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-40 bg-gray-700/70 border-gray-600 text-white">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">All Forms</SelectItem>
                <SelectItem value="published" className="text-white hover:bg-gray-700">Published</SelectItem>
                <SelectItem value="draft" className="text-white hover:bg-gray-700">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-lg overflow-hidden">
          {filteredAndSortedForms.length > 0 ? (
            <Table>
              <TableHeader className="bg-gray-800/90">
                <TableRow className="hover:bg-gray-700/50">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Last Modified</TableHead>
                  <TableHead className="text-white text-right">Submissions</TableHead>
                  <TableHead className="text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedForms.map((form) => (
                  <TableRow 
                    key={form.id} 
                    className="hover:bg-gray-700/50 cursor-pointer"
                    onClick={() => navigate(`/form-builder/${form.id}`)}
                  >
                    <TableCell className="font-medium text-white">{form.name}</TableCell>
                    <TableCell>
                      {form.published ? (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                          Published
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full">
                          Draft
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-300 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      {formatDate(form.lastModified)}
                    </TableCell>
                    <TableCell className="text-right text-gray-300">{form.submissions}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/form-builder/${form.id}`);
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        {form.published && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/form/${form.id}`);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                          onClick={(e) => handleDeleteForm(form.id, e)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 px-4">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-gray-700/50 rounded-full mb-4">
                  <Filter className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No forms found</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  {searchTerm || filterStatus !== 'all' ? 
                    "Try adjusting your search terms or filters to see all forms" : 
                    "Get started by creating your first form"
                  }
                </p>
                <Button 
                  onClick={() => navigate('/create')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Form
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
