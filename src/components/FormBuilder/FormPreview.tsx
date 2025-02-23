import { FormPreviewProps, FormElement } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MoreVertical, Download, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const FormPreview = ({ formConfig }: FormPreviewProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { toast } = useToast();

  const validateField = (element: FormElement, value: any): string => {
    if (element.required && !value) {
      return `${element.label} is required`;
    }

    if (value && element.validation) {
      switch (element.type) {
        case "email":
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            return "Please enter a valid email address";
          }
          break;
        case "text":
          if (element.validation.minLength && value.length < element.validation.minLength) {
            return `Minimum length is ${element.validation.minLength} characters`;
          }
          if (element.validation.maxLength && value.length > element.validation.maxLength) {
            return `Maximum length is ${element.validation.maxLength} characters`;
          }
          break;
      }
    }
    return "";
  };

  const handleInputChange = (element: FormElement, value: any) => {
    setFormData(prev => ({ ...prev, [element.id]: value }));
    const error = validateField(element, value);
    setErrors(prev => ({ ...prev, [element.id]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;
    
    formConfig.elements.forEach(element => {
      const error = validateField(element, formData[element.id]);
      if (error) {
        newErrors[element.id] = error;
        hasErrors = true;
      }
    });

    if (!termsAccepted) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please accept the terms and conditions to proceed",
        variant: "destructive",
      });
      return;
    }

    if (hasErrors) {
      setErrors(newErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Form Submitted",
      description: "Form data has been collected successfully",
    });

    console.log("Form Data:", formData);
  };

  const handleExportForm = () => {
    const formData = {
      ...formConfig,
      // Add any additional data you want to export
    };
    
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Form Exported",
      description: "Your form configuration has been exported successfully",
    });
  };

  const handleSaveForm = () => {
    // Add your save form logic here
    toast({
      title: "Form Saved",
      description: "Your form has been saved successfully",
    });
  };

  const renderFormElement = (element: FormElement) => {
    switch (element.type) {
      case "text":
      case "email":
      case "password":
      case "date":
      case "file":
        return (
          <Input
            id={element.id}
            type={element.type}
            placeholder={element.placeholder}
            required={element.required}
            value={formData[element.id] || ""}
            onChange={(e) => handleInputChange(element, e.target.value)}
            style={element.fieldStyles}
            className={errors[element.id] ? "border-red-500" : ""}
          />
        );
      case "textarea":
        return (
          <textarea
            id={element.id}
            className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors[element.id] ? "border-red-500" : ""}`}
            placeholder={element.placeholder}
            required={element.required}
            value={formData[element.id] || ""}
            onChange={(e) => handleInputChange(element, e.target.value)}
            style={element.fieldStyles}
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox 
              id={element.id} 
              checked={formData[element.id] || false} 
              onCheckedChange={(checked) => handleInputChange(element, checked)}
            />
            <label htmlFor={element.id} className="text-sm font-medium leading-none">
              {element.placeholder}
            </label>
          </div>
        );
      case "radio":
        return (
          <RadioGroup 
            defaultValue="default" 
            onValueChange={(value) => handleInputChange(element, value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id={element.id} />
              <label htmlFor={element.id} className="text-sm font-medium leading-none">
                {element.placeholder}
              </label>
            </div>
          </RadioGroup>
        );
      case "select":
        return (
          <Select onValueChange={(value) => handleInputChange(element, value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={element.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {element.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              )) || (
                <SelectItem value="default">Default Option</SelectItem>
              )}
            </SelectContent>
          </Select>
        );
      case "h1":
        return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{element.label}</h1>;
      case "h2":
        return <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">{element.label}</h2>;
      case "h3":
        return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{element.label}</h3>;
      case "p":
        return <p className="leading-7 [&:not(:first-child)]:mt-6">{element.label}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4" style={formConfig.settings.canvasStyles}>
      <h2 className="text-lg font-semibold">Form Preview</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formConfig.elements.map((element) => (
          <div key={element.id} className="space-y-2">
            {!["h1", "h2", "h3", "p"].includes(element.type) && (
              <Label htmlFor={element.id} style={element.labelStyles}>
                {element.label}
                {element.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            )}
            {renderFormElement(element)}
            {errors[element.id] && (
              <p className="text-sm text-red-500 mt-1">{errors[element.id]}</p>
            )}
          </div>
        ))}

        <div className="space-y-4">
          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            />
            <label 
              htmlFor="terms" 
              className="text-sm text-muted-foreground cursor-pointer"
            >
              I accept the terms and conditions
            </label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full"
            style={formConfig.settings.submitButton?.styles}
          >
            {formConfig.settings.submitButton?.text || "Submit"}
          </Button>
        </div>
      </form>

      <div className="fixed bottom-6 right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="icon" 
              className="h-12 w-12 rounded-full shadow-lg bg-primary text-white"
            >
              <MoreVertical className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportForm}>
              <Download className="mr-2 h-4 w-4" />
              Export Form
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSaveForm}>
              <Save className="mr-2 h-4 w-4" />
              Save Form
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FormPreview;
