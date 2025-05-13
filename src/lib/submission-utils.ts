
import { v4 as uuidv4 } from 'uuid';

export interface FormSubmission {
  id: string;
  formId: string;
  timestamp: string;
  data: Record<string, any>;
}

// Save a new form submission
export const saveFormSubmission = (formId: string, submissionData: Record<string, any>): void => {
  // Create new submission object
  const newSubmission: FormSubmission = {
    id: uuidv4(),
    formId,
    timestamp: new Date().toISOString(),
    data: submissionData
  };

  // Get existing submissions
  let submissions: FormSubmission[] = [];
  const storedSubmissionsJson = localStorage.getItem('form-submissions');
  
  if (storedSubmissionsJson) {
    try {
      submissions = JSON.parse(storedSubmissionsJson);
    } catch (error) {
      console.error('Error parsing stored submissions:', error);
    }
  }

  // Add new submission
  submissions.push(newSubmission);
  
  // Save back to localStorage
  localStorage.setItem('form-submissions', JSON.stringify(submissions));

  // Update form submission count
  updateFormSubmissionCount(formId);
};

// Update the submission count for a form
const updateFormSubmissionCount = (formId: string): void => {
  const storedFormsJson = localStorage.getItem('nifty-forms');
  
  if (storedFormsJson) {
    try {
      const forms = JSON.parse(storedFormsJson);
      const updatedForms = forms.map((form: any) => {
        if (form.id === formId) {
          return {
            ...form,
            submissions: (form.submissions || 0) + 1
          };
        }
        return form;
      });
      
      localStorage.setItem('nifty-forms', JSON.stringify(updatedForms));
    } catch (error) {
      console.error('Error updating form submission count:', error);
    }
  }
};

// Get submissions for a specific form
export const getFormSubmissions = (formId: string): FormSubmission[] => {
  const storedSubmissionsJson = localStorage.getItem('form-submissions');
  let submissions: FormSubmission[] = [];
  
  if (storedSubmissionsJson) {
    try {
      const allSubmissions = JSON.parse(storedSubmissionsJson);
      submissions = allSubmissions.filter((sub: FormSubmission) => sub.formId === formId);
    } catch (error) {
      console.error('Error getting form submissions:', error);
    }
  }
  
  return submissions;
};
