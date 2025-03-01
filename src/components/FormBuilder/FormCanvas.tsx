
import { FormCanvasProps, FormElement } from "./types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Send } from "lucide-react";  // Changed Subm to Send
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useState, useEffect } from "react";

const FormCanvas = ({ elements, setFormConfig, onSelectElement, selectedElement, formConfig, onUpdate}: FormCanvasProps) => {    
  const { toast } = useToast();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleDelete = (id: string) => {
    setFormConfig((prev) => ({
      ...prev,
      elements: prev.elements.filter((element) => element.id !== id),
    }));
    toast({
      title: "Element Removed",
      description: "Form element has been removed",
    });
  };

  const handleSubmit = () => {
    if (!termsAccepted) {
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
    // Handle form submission logic here
  };

  const renderFormElement = (element: FormElement) => {
    switch (element.type) {
      // ... (existing cases)
      default:
        return null;
    }
  };

  useEffect(() => {
    // Fix: We need to update single elements, not an array
    const checkbox: FormElement = {
      id: `element-${Date.now()}`,
      type: "checkbox",
      label: `New Checkbox`,
      required: false,
      placeholder: `Enter Checkbox`,
      nestedData: false,
      description: "",
      name: 'checkbox',
      options: [],
    };
    
    onUpdate(checkbox);
    
    // Add a small delay before adding the submit button
    setTimeout(() => {
      const submit: FormElement = {
        id: `element-${Date.now() + 100}`,
        type: "form_submit",
        label: `Submit`,
        required: false,
        placeholder: `Submit`,
        nestedData: false,
        description: "",
        name: "submit",
        options: [],
      };
      onUpdate(submit);
    }, 100);
  }, []);


  return (
    <div className="space-y-4" style={formConfig.settings.canvasStyles}>
      {elements.length === 0 ? (
        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Drag and drop form elements here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {elements.map((element) => (
            <div
              key={element.id}
              className={`group relative p-4 border rounded-lg transition-colors ${
                selectedElement?.id === element.id
                  ? "ring-2 ring-primary bg-primary/10"
                  : "hover:bg-muted/50"
              }`}
              onClick={() => onSelectElement(element)}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                  {!["h1", "h2", "h3", "p"].includes(element.type) && (
                    <Label style={element.labelStyles}>{element.label}</Label>
                  )}
                  {renderFormElement(element)}
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(element.id);
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <Trash2 className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>Delete Element</TooltipContent>
                  </Tooltip>
                </Button>
              </div>
            </div>
          ))}

          {/* Add Terms & Conditions Checkbox */}
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
              I accept the Terms & Conditions & Privacy Policy
            </label>
          </div>

          {/* Add Submit Button */}
          <div
            className={`group relative p-4 border rounded-lg transition-colors ${
              selectedElement?.type === "form_submit"
                ? "ring-2 ring-primary bg-primary/10"
                : "hover:bg-muted/50"
            }`}
            onClick={() =>
              onSelectElement({
                id: `element-${Date.now()}`,
                type: "form_submit",
                label: `Submit`,
                required: true,
                nestedData: false,
                name: "submit",
                fieldStyles: {},
                labelStyles: {},
              })
            }
          >
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 space-y-2" style={{alignItems: 'center',justifyContent: 'center',display: 'flex'}}>
                <Button
                  type="submit"
                  style={selectedElement?.type === "form_submit" ? {...selectedElement.fieldStyles,width:'fit-content'} : {}}
                  onClick={handleSubmit}
                >
                  {selectedElement?.type === "form_submit" ? selectedElement.label : "Submit"} 
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default FormCanvas;
