import { FormCanvasProps, FormElement } from "./types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Send, Star, GripVertical, MoveHorizontal, MoveVertical } from "lucide-react";
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
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [isSelectingMultiple, setIsSelectingMultiple] = useState(false);

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
      case "text":
      case "email":
      case "password":
        return (
          <Input
            id={element.id}
            type={element.type}
            placeholder={element.placeholder}
            required={element.required}
          />
        );
      case "textarea":
        return (
          <textarea
            id={element.id}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={element.placeholder}
            required={element.required}
          />
        );
      case "address":
      case "street-address":
      case "street-address-line2":
      case "city":
      case "state-province":
      case "postal-code":
        return (
          <Input
            id={element.id}
            type="text"
            placeholder={element.placeholder}
            required={element.required}
            variant="address"
          />
        );
      case "name":
      case "first-name":
      case "last-name":
        return (
          <Input
            id={element.id}
            type="text"
            placeholder={element.placeholder}
            required={element.required}
            variant="name"
          />
        );
      case "appointment":
        return (
          <Input
            id={element.id}
            type="datetime-local"
            placeholder={element.placeholder}
            required={element.required}
            variant="appointment"
          />
        );
      case "rating":
        return (
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className="text-gray-400 hover:text-yellow-500 focus:text-yellow-500"
              >
                <Star className="h-6 w-6" />
              </button>
            ))}
          </div>
        );
      case "captcha":
        return (
          <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="bg-gray-200 h-12 w-32 flex items-center justify-center text-gray-500">
                CAPTCHA
              </div>
              <Button size="sm" variant="outline">
                Refresh
              </Button>
            </div>
            <Input
              id={element.id}
              type="text"
              className="mt-2"
              placeholder="Enter the code above"
              required={element.required}
              variant="captcha"
            />
          </div>
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={element.id} />
            <label
              htmlFor={element.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {element.placeholder}
            </label>
          </div>
        );
      case "radio":
        return (
          <RadioGroup defaultValue="default">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id={element.id} />
              <label
                htmlFor={element.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {element.placeholder}
              </label>
            </div>
          </RadioGroup>
        );
      case "select":
        return (
          <Select>
            <SelectTrigger>
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

  // Replace instances of ArrowsHorizontal with MoveHorizontal
  const toggleElementsDirection = (ids: string[], makeRow: boolean) => {
    if (ids.length <= 1) {
      toast({
        title: "Selection Required",
        description: "Select multiple elements to arrange them",
        variant: "destructive",
      });
      return;
    }

    setFormConfig(prev => {
      const updatedElements = [...prev.elements];
      
      // Find elements to update
      const elementsToUpdate = updatedElements.filter(el => ids.includes(el.id));
      
      // Update layout properties
      elementsToUpdate.forEach(el => {
        el.layout = {
          ...(el.layout || {}),
          inRow: makeRow,
          rowPosition: makeRow ? ids.indexOf(el.id) : undefined
        };
      });
      
      return {
        ...prev,
        elements: updatedElements
      };
    });

    // Reset selection after arranging
    setSelectedElements([]);
    setIsSelectingMultiple(false);
    
    toast({
      title: "Layout Updated",
      description: `Elements arranged in ${makeRow ? "row" : "column"} layout`,
    });
  };

  // Determine if element is selected for multiselect
  const isElementSelected = (elementId: string) => {
    return selectedElements.includes(elementId);
  };

  // Handle element selection (single or multi)
  const handleElementSelect = (element: FormElement, e: React.MouseEvent) => {
    if (isSelectingMultiple) {
      // For multi-select mode
      setSelectedElements(prev => {
        if (prev.includes(element.id)) {
          return prev.filter(id => id !== element.id);
        } else {
          return [...prev, element.id];
        }
      });
    } else {
      // Single select - standard behavior
      onSelectElement(element);
    }
  };

  // Toggle multi-select mode
  const toggleMultiSelectMode = () => {
    setIsSelectingMultiple(prev => !prev);
    if (!isSelectingMultiple) {
      setSelectedElements([]);
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

  // Group elements by row layout
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

  const groupedElements = groupElementsByLayout(elements);

  return (
    <div className="space-y-4" style={formConfig.settings.canvasStyles}>
      {isSelectingMultiple && selectedElements.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-primary/20 rounded-md mb-4">
          <span>{selectedElements.length} elements selected</span>
          <Button 
            size="sm" 
            onClick={() => toggleElementsDirection(selectedElements, true)}
            className="gap-1"
          >
            <MoveHorizontal className="h-4 w-4" />
            Arrange in Row
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => toggleElementsDirection(selectedElements, false)}
            className="gap-1"
          >
            <MoveVertical className="h-4 w-4" />
            Arrange in Column
          </Button>
        </div>
      )}

      <div className="flex justify-end mb-2">
        <Button 
          size="sm" 
          variant={isSelectingMultiple ? "default" : "outline"} 
          onClick={toggleMultiSelectMode}
          className="gap-1"
        >
          <GripVertical className="h-4 w-4" />
          {isSelectingMultiple ? "Exit Multi-select" : "Select Multiple"}
        </Button>
      </div>

      {elements.length === 0 ? (
        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Drag and drop form elements here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {groupedElements.map((group) => (
            <div 
              key={group.row || group.elements[0].id} 
              className={group.row ? "flex gap-4" : ""}
            >
              {group.elements.map((element) => (
                <div
                  key={element.id}
                  className={`group relative p-4 border rounded-lg transition-colors ${
                    isSelectingMultiple 
                      ? isElementSelected(element.id) 
                        ? "ring-2 ring-primary bg-primary/10" 
                        : "hover:bg-muted/50"
                      : selectedElement?.id === element.id
                        ? "ring-2 ring-primary bg-primary/10"
                        : "hover:bg-muted/50"
                  } ${group.row ? "flex-1" : "w-full"}`}
                  onClick={(e) => handleElementSelect(element, e)}
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
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
