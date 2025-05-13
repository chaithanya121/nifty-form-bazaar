
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Download, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

interface FormData {
  id: string;
  name: string;
  submissions: number;
}

interface FormSubmission {
  id: string;
  formId: string;
  timestamp: string;
  data: Record<string, any>;
}

const Submissions = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [viewingSubmission, setViewingSubmission] = useState<FormSubmission | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load forms and submissions data
  useEffect(() => {
    // Load forms from localStorage
    const storedFormsJson = localStorage.getItem('nifty-forms');
    let storedForms: FormData[] = [];
    
    if (storedFormsJson) {
      try {
        storedForms = JSON.parse(storedFormsJson);
        setForms(storedForms);
        
        // If we have forms, select the first one by default
        if (storedForms.length > 0 && !selectedFormId) {
          setSelectedFormId(storedForms[0].id);
        }
      } catch (error) {
        console.error('Error parsing stored forms:', error);
      }
    }

    // Load submissions from localStorage
    const storedSubmissionsJson = localStorage.getItem('form-submissions');
    if (storedSubmissionsJson) {
      try {
        const storedSubmissions = JSON.parse(storedSubmissionsJson);
        setSubmissions(storedSubmissions);
      } catch (error) {
        console.error('Error parsing stored submissions:', error);
      }
    }
  }, [selectedFormId]);

  // Get filtered submissions based on selected form and search term
  const getFilteredSubmissions = () => {
    if (!selectedFormId) return [];
    
    // Filter by selected form
    let filtered = submissions.filter(sub => sub.formId === selectedFormId);
    
    // Apply search if provided
    if (searchTerm) {
      filtered = filtered.filter(sub => {
        // Search in submission data values
        const values = Object.values(sub.data || {});
        const valuesString = values.join(' ').toLowerCase();
        return valuesString.includes(searchTerm.toLowerCase());
      });
    }
    
    // Sort submissions
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    
    return filtered;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? 'Invalid date' 
      : date.toLocaleString();
  };

  const handleDeleteSubmission = (submissionId: string) => {
    // Filter out the submission to delete
    const updatedSubmissions = submissions.filter(sub => sub.id !== submissionId);
    setSubmissions(updatedSubmissions);
    
    // Update localStorage
    localStorage.setItem('form-submissions', JSON.stringify(updatedSubmissions));
    
    // Update form submission count
    const updatedForms = forms.map(form => {
      if (form.id === selectedFormId) {
        return { ...form, submissions: Math.max(0, form.submissions - 1) };
      }
      return form;
    });
    
    setForms(updatedForms);
    localStorage.setItem('nifty-forms', JSON.stringify(updatedForms));
    
    toast({
      title: "Success",
      description: "Submission deleted successfully"
    });
  };

  const exportSubmissionsToCSV = () => {
    const filteredSubmissions = getFilteredSubmissions();
    if (filteredSubmissions.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no submissions to export",
        variant: "destructive"
      });
      return;
    }
    
    // Get all unique fields across submissions
    const allFields = new Set<string>();
    filteredSubmissions.forEach(submission => {
      Object.keys(submission.data || {}).forEach(key => allFields.add(key));
    });
    
    // Create CSV header row
    const fields = Array.from(allFields);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Submission ID,Timestamp," + fields.join(",") + "\n";
    
    // Add data rows
    filteredSubmissions.forEach(submission => {
      let row = `"${submission.id}","${formatDate(submission.timestamp)}"`;
      fields.forEach(field => {
        const value = submission.data[field] || '';
        row += `,"${String(value).replace(/"/g, '""')}"`;
      });
      csvContent += row + "\n";
    });
    
    // Create download link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `submissions-${selectedFormId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Success",
      description: "Submissions exported successfully"
    });
  };

  const selectedForm = forms.find(form => form.id === selectedFormId);
  const filteredSubmissions = getFilteredSubmissions();

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200">
            Form Submissions
          </span>
        </h1>
        <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
          View and manage all form submissions
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
            <Select value={selectedFormId || ''} onValueChange={(value) => setSelectedFormId(value)}>
              <SelectTrigger className="w-[250px] bg-gray-700/70 border-gray-600 text-white">
                <SelectValue placeholder="Select a form" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {forms.map(form => (
                  <SelectItem key={form.id} value={form.id} className="text-white hover:bg-gray-700">
                    {form.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
              
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search submissions..."
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
                <SelectItem value="date" className="text-white hover:bg-gray-700">Date</SelectItem>
                <SelectItem value="name" className="text-white hover:bg-gray-700">Field Values</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              className="gap-2 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              onClick={exportSubmissionsToCSV}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {selectedFormId ? (
          <Card className="bg-gray-800/80 border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <h3 className="text-white font-medium">
                  {selectedForm?.name || 'Selected Form'} - {filteredSubmissions.length} Submissions
                </h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                onClick={() => navigate(`/form-builder/${selectedFormId}`)}
              >
                Edit Form
              </Button>
            </div>
            <div className="bg-gray-800/80 rounded-lg overflow-x-auto">
              {filteredSubmissions.length > 0 ? (
                <Table>
                  <TableHeader className="bg-gray-800/90">
                    <TableRow className="hover:bg-gray-700/50">
                      <TableHead className="text-white">Timestamp</TableHead>
                      <TableHead className="text-white">Data Preview</TableHead>
                      <TableHead className="text-white text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow 
                        key={submission.id} 
                        className="hover:bg-gray-700/50"
                      >
                        <TableCell className="font-medium text-gray-300">
                          {formatDate(submission.timestamp)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {submission.data && typeof submission.data === 'object' ? (
                            <div className="max-w-md truncate">
                              {Object.entries(submission.data)
                                .slice(0, 3)
                                .map(([key, value], i) => (
                                  <span key={i} className="mr-2">
                                    <span className="text-gray-400">{key}:</span> {String(value).substring(0, 20)}
                                    {String(value).length > 20 ? '...' : ''}{i < 2 ? ', ' : ''}
                                  </span>
                              ))}
                              {Object.keys(submission.data).length > 3 ? '...' : ''}
                            </div>
                          ) : (
                            <span className="text-gray-400">No data</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                              onClick={() => setViewingSubmission(submission)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                              onClick={() => handleDeleteSubmission(submission.id)}
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
                <div className="text-center py-12">
                  <div className="mx-auto bg-gray-700/30 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="text-lg text-gray-300 font-medium mb-2">No submissions found</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-4">
                    {searchTerm ? 
                      "Try adjusting your search terms to find submissions" :
                      "This form doesn't have any submissions yet"
                    }
                  </p>
                  <Button
                    variant="outline"
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    onClick={() => navigate(`/form/${selectedFormId}`)}
                  >
                    Go to Form
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <div className="text-center py-12 bg-gray-800/50 rounded-lg">
            <div className="mx-auto bg-gray-700/30 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-lg text-gray-300 font-medium mb-2">No form selected</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-4">
              Select a form from the dropdown to view its submissions
            </p>
          </div>
        )}
      </motion.div>

      {/* Submission Details Dialog */}
      <Dialog open={!!viewingSubmission} onOpenChange={() => setViewingSubmission(null)}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Submitted on {viewingSubmission && formatDate(viewingSubmission.timestamp)}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {viewingSubmission && viewingSubmission.data && (
              <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
                {Object.entries(viewingSubmission.data).map(([key, value], index) => (
                  <div key={index} className="mb-3">
                    <div className="text-sm text-gray-400 mb-1">{key}</div>
                    <div className="text-white break-words">{String(value)}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end">
              <Button 
                onClick={() => setViewingSubmission(null)}
                className="bg-gray-700 hover:bg-gray-600"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Submissions;
