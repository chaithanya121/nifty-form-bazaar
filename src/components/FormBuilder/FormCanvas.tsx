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
  const renderElement = () => {
    switch (element.type) {
      case "text":
      case "email":
      case "password":
      case "street-address":
      case "street-address-line2":
      case "city":
      case "state-province":
      case "postal-code":
      case "first-name":
      case "last-name":
      case "phone":
        return (
          <Input
            type={element.type === "phone" ? "tel" : element.type}
            id={element.id}
            value={value || ""}
            onChange={handleChange}
            placeholder={element.placeholder}
            required={element.required}
            style={element.fieldStyles}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={element.id}
            value={value || ""}
            onChange={handleChange}
            placeholder={element.placeholder}
            required={element.required}
            style={element.fieldStyles}
          />
        );

      case "select":
      case "multiselect":
        return (
          <Select 
            value={value || (element.type === "multiselect" ? [] : "")}
            onValueChange={onChange}
            multiple={element.type === "multiselect"}
          >
            <SelectTrigger className="w-full" style={element.fieldStyles}>
              <SelectValue 
                placeholder={element.placeholder || "Select an option"} 
                className="w-full"
              />
            </SelectTrigger>
            <SelectContent>
              {(element.options || []).map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={element.id}
              checked={value || false}
              onCheckedChange={onChange}
              style={element.fieldStyles}
            />
            <label
              htmlFor={element.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {element.placeholder || element.label}
            </label>
          </div>
        );

      case "checkbox-group":
      case "checkbox-blocks":
      case "checkbox-tabs":
        const checkboxOptions = element.options || [];
        return (
          <div className={`
            ${element.type === "checkbox-blocks" ? "grid grid-cols-2 gap-4" : "space-y-2"}
            ${element.type === "checkbox-tabs" ? "flex flex-wrap gap-2" : ""}
          `}>
            {checkboxOptions.map((option) => (
              <div
                key={option}
                className={`
                  ${element.type === "checkbox-blocks" 
                    ? "border rounded-lg p-4 hover:bg-accent transition-colors" 
                    : element.type === "checkbox-tabs"
                    ? "min-w-[120px]"
                    : ""
                  }
                  ${element.type === "checkbox-tabs" && (value || []).includes(option)
                    ? "bg-primary text-primary-foreground"
                    : ""
                  }
                `}
              >
                {element.type === "checkbox-tabs" ? (
                  <button
                    type="button"
                    className="w-full px-4 py-2 rounded-md text-sm font-medium"
                    onClick={() => {
                      const newValue = (value || []).includes(option)
                        ? (value || []).filter((v: string) => v !== option)
                        : [...(value || []), option];
                      onChange(newValue);
                    }}
                  >
                    {option}
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${element.id}-${option}`}
                      checked={(value || []).includes(option)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(value || []), option]
                          : (value || []).filter((v: string) => v !== option);
                        onChange(newValue);
                      }}
                    />
                    <label
                      htmlFor={`${element.id}-${option}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option}
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "radio":
      case "radio-group":
      case "radio-blocks":
      case "radio-tabs":
        const radioOptions = element.options || [];
        return (
          <RadioGroup value={value || ""} onValueChange={onChange}>
            <div className={`
              ${element.type === "radio-blocks" ? "grid grid-cols-2 gap-4" : "space-y-2"}
              ${element.type === "radio-tabs" ? "flex flex-wrap gap-2" : ""}
            `}>
              {radioOptions.map((option) => (
                <div
                  key={option}
                  className={`
                    ${element.type === "radio-blocks" 
                      ? "border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer" 
                      : element.type === "radio-tabs"
                      ? "min-w-[120px]"
                      : ""
                    }
                    ${element.type === "radio-tabs" && value === option
                      ? "bg-primary text-primary-foreground"
                      : ""
                    }
                  `}
                >
                  {element.type === "radio-tabs" ? (
                    <button
                      type="button"
                      className="w-full px-4 py-2 rounded-md text-sm font-medium"
                      onClick={() => onChange(option)}
                    >
                      {option}
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${element.id}-${option}`} />
                      <Label
                        htmlFor={`${element.id}-${option}`}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case "date":
      case "date-range":
        if (element.type === "date-range") {
          return (
            <div className="flex space-x-2">
              <Input
                type="date"
                value={(value?.start || "")}
                onChange={(e) => onChange({ ...value, start: e.target.value })}
                style={element.fieldStyles}
              />
              <Input
                type="date"
                value={(value?.end || "")}
                onChange={(e) => onChange({ ...value, end: e.target.value })}
                style={element.fieldStyles}
              />
            </div>
          );
        }
        return (
          <Input
            type="date"
            id={element.id}
            value={value || ""}
            onChange={handleChange}
            style={element.fieldStyles}
          />
        );

      case "slider":
      case "range-slider":
      case "vertical-slider":
        const isRange = element.type === "range-slider";
        const isVertical = element.type === "vertical-slider";
        const min = element.min || 0;
        const max = element.max || 100;
        const step = element.step || 1;

        return (
          <div className={cn(
            "relative",
            isVertical ? "h-[200px] py-4" : "py-6"
          )}>
            <Slider
              defaultValue={isRange ? [min, max] : [min]}
              value={
                isRange 
                  ? [value?.min ?? min, value?.max ?? max]
                  : [value ?? min]
              }
              min={min}
              max={max}
              step={step}
              onValueChange={isRange 
                ? (vals) => onChange({ min: vals[0], max: vals[1] })
                : (vals) => onChange(vals[0])
              }
              orientation={isVertical ? "vertical" : "horizontal"}
              className={cn(
                isVertical && "h-full",
                !isVertical && "w-full"
              )}
            />
            <div className={cn(
              "flex text-xs text-muted-foreground",
              isVertical ? "flex-col h-full justify-between items-start absolute -right-6 top-0" : "justify-between mt-2"
            )}>
              <span>{min}</span>
              <span>{max}</span>
            </div>
          </div>
        );

      case "rating":
        const maxRating = element.maxRating || 5;
        return (
          <div className="flex items-center space-x-1">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
              <button
                key={rating}
                type="button"
                className={cn(
                  "rounded-md p-1 transition-colors hover:bg-accent",
                  value >= rating ? "text-yellow-400" : "text-muted hover:text-yellow-400"
                )}
                onClick={() => onChange(rating)}
              >
                <Star className={cn(
                  "h-6 w-6",
                  value >= rating && "fill-current"
                )} />
              </button>
            ))}
          </div>
        );

      case "toggle":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={element.id}
              checked={value || false}
              onCheckedChange={onChange}
            />
            <Label htmlFor={element.id}>{element.placeholder || element.label}</Label>
          </div>
        );

      case "file-upload":
      case "multi-file-upload":
      case "image-upload":
      case "multi-image-upload":
      case "gallery":
        const isImage = element.type.includes("image");
        const isMulti = element.type.includes("multi");
        const isGallery = element.type === "gallery";
        const acceptTypes = isImage ? "image/*" : ".pdf,.doc,.docx,.txt";

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = Array.from(e.target.files || []);
          if (files.length === 0) return;

          if (isMulti) {
            onChange(files);
          } else {
            onChange(files[0]);
          }
        };

        const removeFile = (index: number) => {
          if (isMulti && Array.isArray(value)) {
            const newFiles = value.filter((_, i) => i !== index);
            onChange(newFiles);
          } else {
            onChange(null);
          }
        };

        const renderPreview = () => {
          if (!value) return null;

          if (isMulti && Array.isArray(value)) {
            return (
              <div className={isGallery ? "grid grid-cols-3 gap-4" : "space-y-2"}>
                {value.map((file: File, index: number) => (
                  <div key={index} className="relative group">
                    {isImage ? (
                      <div className="relative aspect-square">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-lg transition-opacity">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-2 border rounded-lg bg-background">
                        <span className="truncate flex-1">{file.name}</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          } else if (!isMulti && value instanceof File) {
            return (
              <div className="relative group">
                {isImage ? (
                  <div className="relative aspect-square">
                    <img
                      src={URL.createObjectURL(value)}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-lg transition-opacity">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFile(0)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2 border rounded-lg bg-background">
                    <span className="truncate flex-1">{value.name}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFile(0)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            );
          }
          return null;
        };

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor={element.id}
                className={cn(
                  "flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors",
                  value ? "h-24" : "h-64"
                )}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isImage ? (
                    <ImageIcon className="w-8 h-8 mb-4 text-muted-foreground" />
                  ) : (
                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                  )}
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isImage ? "PNG, JPG, GIF up to 10MB" : "PDF, DOC, TXT up to 10MB"}
                  </p>
                </div>
                <Input
                  id={element.id}
                  type="file"
                  className="hidden"
                  accept={acceptTypes}
                  multiple={isMulti}
                  onChange={handleFileChange}
                  required={element.required}
                />
              </label>
            </div>
            {renderPreview()}
          </div>
        );

      case "address":
        return (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Street Address"
              value={value?.street || ""}
              onChange={(e) => onChange({ ...value, street: e.target.value })}
              style={element.fieldStyles}
            />
            <Input
              type="text"
              placeholder="Apt, Suite, etc. (optional)"
              value={value?.street2 || ""}
              onChange={(e) => onChange({ ...value, street2: e.target.value })}
              style={element.fieldStyles}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="City"
                value={value?.city || ""}
                onChange={(e) => onChange({ ...value, city: e.target.value })}
                style={element.fieldStyles}
              />
              <Input
                type="text"
                placeholder="State/Province"
                value={value?.state || ""}
                onChange={(e) => onChange({ ...value, state: e.target.value })}
                style={element.fieldStyles}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="ZIP/Postal Code"
                value={value?.zip || ""}
                onChange={(e) => onChange({ ...value, zip: e.target.value })}
                style={element.fieldStyles}
              />
              <Select
                value={value?.country || ""}
                onValueChange={(val) => onChange({ ...value, country: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "name":
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="First Name"
              value={value?.first || ""}
              onChange={(e) => onChange({ ...value, first: e.target.value })}
              style={element.fieldStyles}
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={value?.last || ""}
              onChange={(e) => onChange({ ...value, last: e.target.value })}
              style={element.fieldStyles}
            />
          </div>
        );

      case "appointment":
        return (
          <div className="space-y-4">
            <Input
              type="date"
              value={value?.date || ""}
              onChange={(e) => onChange({ ...value, date: e.target.value })}
              style={element.fieldStyles}
            />
            <Select
              value={value?.time || ""}
              onValueChange={(val) => onChange({ ...value, time: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i.toString().padStart(2, "0");
                  return (
                    <SelectItem key={hour} value={`${hour}:00`}>
                      {`${hour}:00`}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
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
              type="text"
              id={element.id}
              value={value || ""}
              onChange={handleChange}
              className="mt-2"
              placeholder="Enter the code above"
              required={element.required}
              style={element.fieldStyles}
            />
          </div>
        );

      case "h1":
        return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{element.label}</h1>;
      case "h2":
        return <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">{element.label}</h2>;
      case "h3":
        return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{element.label}</h3>;
      case "h4":
        return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{element.label}</h4>;
      case "paragraph":
        return <p className="leading-7 [&:not(:first-child)]:mt-6">{element.label}</p>;
      case "quote":
        return <blockquote className="mt-6 border-l-2 pl-6 italic">{element.label}</blockquote>;
      case "divider":
        return <hr className="my-4 border-t" />;
      case "link":
        return (
          <a
            href={element.url || "#"}
            className="text-primary hover:underline"
            target={element.newTab ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {element.label}
          </a>
        );
      case "image":
        return (
          <img
            src={element.url}
            alt={element.label}
            className="rounded-lg"
            style={element.fieldStyles}
          />
        );
      case "static-html":
        return <div dangerouslySetInnerHTML={{ __html: element.content || "" }} />;

      case "matrix":
      case "matrix-table":
      case "matrix-rating":
        const rows = element.rows || ["Row 1", "Row 2", "Row 3"];
        const cols = element.columns || ["Column 1", "Column 2", "Column 3"];
        const isRating = element.type === "matrix-rating";
        const isTable = element.type === "matrix-table";

        return (
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border-b"></th>
                  {cols.map((col, i) => (
                    <th key={i} className="p-3 border-b text-center font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="p-3 border-b font-medium">{row}</td>
                    {cols.map((col, j) => (
                      <td key={j} className="p-3 border-b text-center">
                        {isRating ? (
                          <div className="flex justify-center space-x-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                className={`text-${
                                  (value?.[i]?.[j] || 0) >= rating ? "yellow" : "gray"
                                }-400 hover:text-yellow-400 focus:outline-none transition-colors`}
                                onClick={() => {
                                  const newValue = { ...(value || {}) };
                                  if (!newValue[i]) newValue[i] = {};
                                  newValue[i][j] = rating;
                                  onChange(newValue);
                                }}
                              >
                                <Star className={`h-4 w-4 ${(value?.[i]?.[j] || 0) >= rating ? "fill-current" : ""}`} />
                              </button>
                            ))}
                          </div>
                        ) : isTable ? (
                          <Input
                            type="text"
                            value={value?.[i]?.[j] || ""}
                            onChange={(e) => {
                              const newValue = { ...(value || {}) };
                              if (!newValue[i]) newValue[i] = {};
                              newValue[i][j] = e.target.value;
                              onChange(newValue);
                            }}
                            className="w-full h-8 min-h-8"
                          />
                        ) : (
                          <RadioGroup
                            value={value?.[i]?.[j] || ""}
                            onValueChange={(val) => {
                              const newValue = { ...(value || {}) };
                              if (!newValue[i]) newValue[i] = {};
                              newValue[i][j] = val;
                              onChange(newValue);
                            }}
                          >
                            <div className="flex justify-center">
                              <RadioGroupItem value={col} id={`${element.id}-${i}-${j}`} />
                            </div>
                          </RadioGroup>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "tabs":
        const tabsValue = activeTab.toString();
        return (
          <Tabs value={tabsValue} onValueChange={(val) => setActiveTab(parseInt(val))} className="w-full">
            <TabsList className="w-full grid" style={{ 
              gridTemplateColumns: `repeat(${element.tabs?.length || 1}, 1fr)`,
              marginBottom: "1rem"
            }}>
              {element.tabs?.map((tab, index) => (
                <TabsTrigger 
                  key={index} 
                  value={index.toString()}
                  className="w-full"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {element.tabs?.map((tab, index) => (
              <TabsContent key={index} value={index.toString()}>
                <Card className="p-6">
                  <div className="space-y-4">
                    {tab.elements?.map((childElement) => (
                      <FormElementRenderer
                        key={childElement.id}
                        element={childElement}
                        value={value?.[childElement.id]}
                        onChange={(val) => {
                          const newValue = { ...(value || {}) };
                          newValue[childElement.id] = val;
                          onChange(newValue);
                        }}
                        error={error?.[childElement.id]}
                      />
                    ))}
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        );

      case "steps":
        return (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute left-0 top-1/2 h-0.5 w-full bg-muted transform -translate-y-1/2" />
              <div className="relative flex justify-between">
                {element.steps?.map((step, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background transition-colors relative",
                      index <= activeStep 
                        ? "border-primary text-primary" 
                        : "border-muted text-muted-foreground"
                    )}
                    role="button"
                    onClick={() => setActiveStep(index)}
                  >
                    <span className="absolute -bottom-6 text-sm whitespace-nowrap">
                      {step.label}
                    </span>
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                {element.steps?.[activeStep]?.elements?.map((childElement) => (
                  <FormElementRenderer
                    key={childElement.id}
                    element={childElement}
                    value={value?.[childElement.id]}
                    onChange={(val) => {
                      const newValue = { ...(value || {}) };
                      newValue[childElement.id] = val;
                      onChange(newValue);
                    }}
                    error={error?.[childElement.id]}
                  />
                ))}
              </div>
            </Card>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
              >
                Previous
              </Button>
              {activeStep === (element.steps?.length || 1) - 1 ? (
                <Button
                  type="submit"
                  onClick={() => onChange(value)}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={() => setActiveStep(Math.min((element.steps?.length || 1) - 1, activeStep + 1))}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        );

      case "grid":
        return (
          <div 
            className="grid gap-4" 
            style={{ 
              gridTemplateColumns: `repeat(${element.columns || 2}, 1fr)`,
              gridTemplateRows: `repeat(${element.rows || 2}, 1fr)`
            }}
          >
            {element.elements?.map((childElement) => (
              <FormElementRenderer
                key={childElement.id}
                element={childElement}
                value={value?.[childElement.id]}
                onChange={(val) => {
                  const newValue = { ...(value || {}) };
                  newValue[childElement.id] = val;
                  onChange(newValue);
                }}
              />
            ))}
          </div>
        );

      case "table":
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {element.headers?.map((header, i) => (
                    <th key={i} className="p-2 border">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {element.rows?.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-2 border">
                        {typeof cell === "object" ? (
                          <FormElementRenderer
                            element={cell}
                            value={value?.[i]?.[j]}
                            onChange={(val) => {
                              const newValue = { ...(value || {}) };
                              if (!newValue[i]) newValue[i] = {};
                              newValue[i][j] = val;
                              onChange(newValue);
                            }}
                          />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "container":
        return (
          <div className="p-4 border rounded-lg" style={element.containerStyles}>
            {element.elements?.map((childElement) => (
              <FormElementRenderer
                key={childElement.id}
                element={childElement}
                value={value?.[childElement.id]}
                onChange={(val) => {
                  const newValue = { ...(value || {}) };
                  newValue[childElement.id] = val;
                  onChange(newValue);
                }}
              />
            ))}
          </div>
        );

      case "2-columns":
      case "3-columns":
      case "4-columns":
        const columns = element.type === "2-columns" ? 2 : element.type === "3-columns" ? 3 : 4;
        return (
          <div className={`grid grid-cols-${columns} gap-4`}>
            {element.elements?.map((childElement) => (
              <FormElementRenderer
                key={childElement.id}
                element={childElement}
                value={value?.[childElement.id]}
                onChange={(val) => {
                  const newValue = { ...(value || {}) };
                  newValue[childElement.id] = val;
                  onChange(newValue);
                }}
              />
            ))}
          </div>
        );

      case "list":
      case "nested-list":
        const items = value || [{}];
        return (
          <div className="space-y-4">
            {items.map((item: any, index: number) => (
              <div key={index} className="relative border rounded-lg p-4">
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => {
                    const newItems = items.filter((_: any, i: number) => i !== index);
                    onChange(newItems);
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                {element.type === "nested-list" ? (
                  element.elements?.map((childElement) => (
                    <FormElementRenderer
                      key={childElement.id}
                      element={childElement}
                      value={item[childElement.id]}
                      onChange={(val) => {
                        const newItems = [...items];
                        newItems[index] = { ...newItems[index], [childElement.id]: val };
                        onChange(newItems);
                      }}
                    />
                  ))
                ) : (
                  <FormElementRenderer
                    element={element.element!}
                    value={item}
                    onChange={(val) => {
                      const newItems = [...items];
                      newItems[index] = val;
                      onChange(newItems);
                    }}
                  />
                )}
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onChange([...items, {}])}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        );

      case "hidden-input":
        return (
          <Input
            type="hidden"
            id={element.id}
            value={value || ""}
            onChange={handleChange}
          />
        );

      case "danger-button":
        return (
          <Button 
            variant="destructive" 
            onClick={element.onClick}
            className="w-full"
          >
            {element.label}
          </Button>
        );

      case "form_submit":
        return (
          <Button 
            type="submit" 
            className="w-full"
            style={{
              backgroundColor: element.fieldStyles?.backgroundColor,
              color: element.fieldStyles?.color,
            }}
          >
            {element.label || "Submit"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        );

      default:
        return null;
    }
  };
  const groupElementsByLayout = (elements: FormElement[] = []) => {
    const result: { row: string | null, elements: FormElement[] }[] = [];
    const rowGroups = new Map<string, FormElement[]>();
    const standaloneElements: FormElement[] = [];
    
    // First, collect elements by row ID
    if (elements && Array.isArray(elements)) {
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
    }
    
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
