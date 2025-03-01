
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
import { useState, useEffect, useRef } from "react";

const FormCanvas = ({ elements, setFormConfig, onSelectElement, selectedElement, formConfig, onUpdate}: FormCanvasProps) => {    
  const { toast } = useToast();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [draggedElement, setDraggedElement] = useState<FormElement | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<'left' | 'right' | 'above' | 'below' | null>(null);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);

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

  const handleDragStart = (e: React.DragEvent, element: FormElement) => {
    e.stopPropagation();
    setDraggedElement(element);
    e.dataTransfer.setData('text/plain', element.id);
    // Create a ghost image that's smaller than the original
    const ghostElement = document.createElement('div');
    ghostElement.textContent = element.label;
    ghostElement.style.padding = '8px';
    ghostElement.style.background = '#f0f0f0';
    ghostElement.style.border = '1px solid #ccc';
    ghostElement.style.borderRadius = '4px';
    ghostElement.style.position = 'absolute';
    ghostElement.style.top = '-1000px';
    document.body.appendChild(ghostElement);
    
    e.dataTransfer.setDragImage(ghostElement, 0, 0);
    
    setTimeout(() => {
      document.body.removeChild(ghostElement);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent, targetElement: FormElement) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedElement || draggedElement.id === targetElement.id) return;
    
    setDropTargetId(targetElement.id);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    
    // Determine drop position (left/right/above/below)
    if (x < width * 0.25) {
      setDropPosition('left');
    } else if (x > width * 0.75) {
      setDropPosition('right');
    } else if (y < height * 0.5) {
      setDropPosition('above');
    } else {
      setDropPosition('below');
    }
  };

  const handleDragLeave = () => {
    setDropTargetId(null);
    setDropPosition(null);
  };

  const handleDrop = (e: React.DragEvent, targetElement: FormElement) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedElement || !dropPosition) return;
    
    setFormConfig(prev => {
      const updatedElements = [...prev.elements];
      const sourceIndex = updatedElements.findIndex(el => el.id === draggedElement.id);
      const targetIndex = updatedElements.findIndex(el => el.id === targetElement.id);
      
      if (sourceIndex === -1 || targetIndex === -1) return prev;
      
      // Remove the source element from its original position
      const [movedElement] = updatedElements.splice(sourceIndex, 1);
      
      // Handle different drop positions
      if (dropPosition === 'left' || dropPosition === 'right') {
        // Create or join a row
        const newRowId = `row-${Date.now()}`;
        
        // Check if target is already in a row
        if (targetElement.layout?.inRow && targetElement.layout.rowId) {
          // Join existing row
          const rowId = targetElement.layout.rowId;
          movedElement.layout = {
            inRow: true,
            rowId,
            rowPosition: dropPosition === 'left' ? targetElement.layout.rowPosition! - 0.5 : targetElement.layout.rowPosition! + 0.5
          };
          
          // Update all elements in this row to have integer positions after sorting
          const rowElements = updatedElements.filter(el => el.layout?.rowId === rowId);
          rowElements.push(movedElement);
          
          // Sort by position
          rowElements.sort((a, b) => (a.layout?.rowPosition || 0) - (b.layout?.rowPosition || 0));
          
          // Reassign integer positions
          rowElements.forEach((el, idx) => {
            el.layout = {
              ...el.layout,
              rowPosition: idx
            };
          });
        } else {
          // Create new row with the two elements
          const rowElements = [targetElement, movedElement];
          rowElements.forEach((el, idx) => {
            el.layout = {
              inRow: true,
              rowId: newRowId,
              rowPosition: dropPosition === 'left' ? 
                (idx === 0 ? 1 : 0) : 
                idx
            };
          });
        }
      } else {
        // Above or below - remove from row if it was in one
        if (movedElement.layout?.inRow) {
          movedElement.layout = {}; // Remove row information
        }
        
        // Insert at the appropriate position
        const newTargetIndex = dropPosition === 'above' ? targetIndex : targetIndex + 1;
        updatedElements.splice(newTargetIndex, 0, movedElement);
      }
      
      // Clean up any empty rows
      const rowIds = new Set<string>();
      updatedElements.forEach(el => {
        if (el.layout?.rowId) rowIds.add(el.layout.rowId);
      });
      
      // For each row, ensure we have at least 2 elements, otherwise remove row formatting
      rowIds.forEach(rowId => {
        const rowElements = updatedElements.filter(el => el.layout?.rowId === rowId);
        if (rowElements.length < 2) {
          rowElements.forEach(el => {
            el.layout = {}; // Remove row information
          });
        }
      });
      
      toast({
        title: "Layout Updated",
        description: `Element moved ${dropPosition} target`,
      });
      
      return {
        ...prev,
        elements: updatedElements
      };
    });
    
    // Reset drag state
    setDraggedElement(null);
    setDropTargetId(null);
    setDropPosition(null);
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

  // Group elements by row layout
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

  // Get classes for drop indicators based on drop position
  const getDropIndicatorClasses = (elementId: string) => {
    if (dropTargetId !== elementId || !dropPosition) return "";
    
    const baseClasses = "absolute pointer-events-none border-2 border-primary z-10";
    
    switch (dropPosition) {
      case 'left':
        return `${baseClasses} left-0 top-0 bottom-0 w-1 border-r-0 border-b-0 border-t-0`;
      case 'right':
        return `${baseClasses} right-0 top-0 bottom-0 w-1 border-l-0 border-b-0 border-t-0`;
      case 'above':
        return `${baseClasses} left-0 right-0 top-0 h-1 border-r-0 border-l-0 border-b-0`;
      case 'below':
        return `${baseClasses} left-0 right-0 bottom-0 h-1 border-r-0 border-l-0 border-t-0`;
      default:
        return "";
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

  const groupedElements = groupElementsByLayout(elements);

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
          {groupedElements.map((group) => (
            <div 
              key={group.row || group.elements[0].id} 
              className={group.row ? "flex gap-4" : ""}
            >
              {group.elements.map((element) => (
                <div
                  key={element.id}
                  className={`group relative p-4 border rounded-lg transition-colors cursor-move
                    ${selectedElement?.id === element.id
                      ? "ring-2 ring-primary bg-primary/10"
                      : "hover:bg-muted/50"
                    } ${group.row ? "flex-1" : "w-full"}`}
                  onClick={() => onSelectElement(element)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, element)}
                  onDragOver={(e) => handleDragOver(e, element)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, element)}
                >
                  <div className={getDropIndicatorClasses(element.id)}></div>
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
