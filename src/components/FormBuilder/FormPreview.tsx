import { FormConfig, FormElement } from "./types";
import FormElementRenderer from "./FormElementRenderer";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FormPreviewProps {
  formConfig: FormConfig;
  values?: Record<string, any>;
  onChange?: (values: Record<string, any>) => void;
  onSubmit?: (values: Record<string, any>) => void;
  isSubmission?: boolean;
}

const FormPreview = ({ formConfig, values, onChange, onSubmit, isSubmission = false }: FormPreviewProps) => {
  const [formData, setFormData] = useState<Record<string, any>>(values || {});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { toast } = useToast();

  const handleChange = (elementId: string, value: any) => {
    const updatedData = {
      ...formData,
      [elementId]: value,
    };
    
    setFormData(updatedData);
    
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted && formConfig.settings.termsAndConditions?.required) {
      toast({
        title: "Error",
        description: "You must accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    } else {
      toast({
        title: "Form Submitted",
        description: "Your form has been submitted successfully.",
      });
      console.log("Form data:", formData);
    }
  };

  // Group elements by row layout for visual organization
  const groupElementsByLayout = (elements: FormElement[]) => {
    const result: { row: string | null, elements: FormElement[] }[] = [];
    const rowGroups = new Map<string, FormElement[]>();
    const standaloneElements: FormElement[] = [];
    
    // First, collect elements by row ID
    elements.forEach(element => {
      if (element.layout?.inRow && element.layout.rowId) {
        const rowId = element.layout.rowId;
        if (!rowGroups.has(rowId)) {
          rowGroups.set(rowId, []);
        }
        rowGroups.get(rowId)?.push(element);
      } else {
        standaloneElements.push(element);
      }
    });
    
    // Sort elements in each row by position
    rowGroups.forEach((rowElements, rowId) => {
      const sortedElements = [...rowElements].sort((a, b) => 
        (a.layout?.rowPosition || 0) - (b.layout?.rowPosition || 0)
      );
      result.push({ row: rowId, elements: sortedElements });
    });
    
    // Add standalone elements
    standaloneElements.forEach(element => {
      result.push({ row: null, elements: [element] });
    });
    
    return result;
  };

  const groupedElements = groupElementsByLayout(formConfig.elements);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isSubmission && <h1 className="text-2xl font-bold mb-6">{formConfig.name}</h1>}

      <div className="space-y-4">
        {groupedElements.map((group) => (
          <div 
            key={group.row || group.elements[0].id} 
            className={group.row ? "flex gap-4" : ""}
          >
            {group.elements.map((element) => {
              // Skip the submit button in the preview renderer
              if (element.type === "form_submit") return null;
              
              return (
                <div 
                  key={element.id} 
                  className={`${group.row ? "flex-1" : "w-full"} space-y-2`}
                  style={element.fieldStyles}
                >
                  <FormElementRenderer
                    element={element}
                    value={formData[element.id]}
                    onChange={(value) => handleChange(element.id, value)}
                    error=""
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Terms & Conditions Checkbox */}
      {formConfig.settings.termsAndConditions?.enabled && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {formConfig.settings.termsAndConditions.text}
          </label>
        </div>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        className={`${isSubmission ? 'bg-blue-600 hover:bg-blue-700' : ''} w-full`}
      >
        {formConfig.settings.submitButton?.text || "Submit"}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

export default FormPreview;
