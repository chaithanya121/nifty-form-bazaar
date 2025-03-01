import React, { useState } from "react";
import { FormConfig, FormElement } from "./types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import FormElementRenderer from "./FormElementRenderer";

// Group elements by layout
const groupElementsByLayout = (elements: FormElement[]) => {
  const result: { row: string | null, elements: FormElement[] }[] = [];
  const rowElements = new Map<string, FormElement[]>();
  const standaloneElements: FormElement[] = [];
  
  // First, collect row elements
  elements.forEach(element => {
    if (element.layout?.inRow) {
      const rowId = `row-${element.layout.rowPosition}-${element.id}`;
      if (!rowElements.has(rowId)) {
        rowElements.set(rowId, []);
      }
      rowElements.get(rowId)?.push(element);
    } else {
      standaloneElements.push(element);
    }
  });
  
  // Sort row elements by position
  Array.from(rowElements.entries()).forEach(([rowId, elements]) => {
    const sortedElements = elements.sort((a, b) => 
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

const FormPreview = ({ formConfig }: { formConfig: FormConfig }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formConfig.settings.termsAndConditions?.required && !termsAccepted) {
      toast({
        title: "Error",
        description: "You must accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Form Submitted",
      description: "Your form has been submitted successfully.",
    });
  };

  const handleInputChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const groupedElements = groupElementsByLayout(formConfig.elements);

  return (
    <form onSubmit={handleSubmit} className="space-y-6" style={formConfig.settings.canvasStyles}>
      <div className="space-y-6">
        {groupedElements.map((group) => (
          <div 
            key={group.row || group.elements[0].id} 
            className={group.row ? "flex gap-4" : ""}
          >
            {group.elements.map((element) => (
              <div 
                key={element.id} 
                className={`space-y-2 ${group.row ? "flex-1" : "w-full"}`}
              >
                <FormElementRenderer
                  element={element}
                  value={formData[element.id]}
                  onChange={(value) => handleInputChange(element.id, value)}
                  error={errors[element.id]}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {formConfig.settings.termsAndConditions?.enabled && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="preview-terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            required={formConfig.settings.termsAndConditions.required}
          />
          <label
            htmlFor="preview-terms"
            className="text-sm font-medium leading-none"
          >
            {formConfig.settings.termsAndConditions.text || "I accept the Terms & Conditions"}
          </label>
        </div>
      )}

      {formConfig.settings.submitButton?.enabled !== false && (
        <Button type="submit">
          {formConfig.settings.submitButton?.text || "Submit"}
        </Button>
      )}
    </form>
  );
};

export default FormPreview;
