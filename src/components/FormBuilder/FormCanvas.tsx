import { FormCanvasProps, FormElement } from "./types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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

const FormCanvas = ({ elements, setFormConfig, onSelectElement, selectedElement, formConfig }: FormCanvasProps) => {    
  const { toast } = useToast();

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

  const renderFormElement = (element: FormElement) => {
    switch (element.type) {
      case "text":
      case "email":
      case "password":
      case "date":
      case "file":
      case "url":
      case "phone":
      case "hidden-input":
        return (
          <Input
            style={element.fieldStyles}
            type={element.type === "hidden-input" ? "text" : element.type}
            placeholder={element.placeholder}
            required={element.required}
          />
        );
        
      case "textarea":
        return (
          <textarea 
            style={element.fieldStyles}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={element.placeholder}
            required={element.required}
          />
        );

      case "checkbox":
      case "checkbox-group":
      case "checkbox-blocks":
      case "checkbox-tabs":
        return (
          <div className={`space-y-2 ${element.type === 'checkbox-blocks' ? 'grid grid-cols-2 gap-2' : ''}`} style={element.fieldStyles}>
            {element.options.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center ${
                  element.type === 'checkbox-blocks' 
                    ? 'p-4 border rounded-lg hover:border-primary' 
                    : element.type === 'checkbox-tabs'
                    ? 'inline-block mr-2'
                    : 'space-x-2'
                }`}
              >
                <Checkbox id={`${element.id}-${index}`} />
                <label
                  htmlFor={`${element.id}-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case "radio":
      case "radio-group":
      case "radio-blocks":
      case "radio-tabs":
        return (
          <RadioGroup defaultValue="option-1">
            <div className={`space-y-2 ${element.type === 'radio-blocks' ? 'grid grid-cols-2 gap-2' : ''}`} style={element.fieldStyles}>
              {element.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${
                    element.type === 'radio-blocks' 
                      ? 'p-4 border rounded-lg hover:border-primary' 
                      : element.type === 'radio-tabs'
                      ? 'inline-block mr-2'
                      : 'space-x-2'
                  }`}
                >
                  <RadioGroupItem value={`option-${index + 1}`} id={`${element.id}-${index}`} />
                  <label
                    htmlFor={`${element.id}-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case "select":
      case "multiselect":
        return (
          <Select>
            <SelectTrigger style={element.fieldStyles}>
              <SelectValue placeholder={element.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {element.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              )) || (
                <SelectItem value="default">Add options in settings</SelectItem>
              )}
            </SelectContent>
          </Select>
        );

      case "toggle":
        return (
          <div className="flex items-center" style={element.fieldStyles}>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4"></div>
            </div>
          </div>
        );

      case "slider":
      case "range-slider":
      case "vertical-slider":
        return (
          <div className={element.type === 'vertical-slider' ? 'h-32 w-full flex items-center justify-center' : 'w-full'} style={element.fieldStyles}>
            <input 
              type="range"
              className={`w-full ${element.type === 'vertical-slider' ? 'rotate-270 origin-center -translate-y-4' : ''}`}
            />
          </div>
        );

      case "file-upload":
      case "multi-file-upload":
      case "image-upload":
      case "multi-image-upload":
      case "gallery":
        return (
          <div className="flex items-center justify-center w-full" style={element.fieldStyles}>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF ({element.type.includes('multi') ? 'max 10 files' : 'max. 800x400px'})</p>
              </div>
              <input type="file" className="hidden" multiple={element.type.includes('multi')} />
            </label>
          </div>
        );

      case "matrix":
      case "matrix-table":
        return (
          <div className="overflow-x-auto" style={element.fieldStyles}>
            <table className="min-w-full divide-y border rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2"></th>
                  {['Option 1', 'Option 2', 'Option 3'].map((header, i) => (
                    <th key={i} className="px-4 py-2 text-sm text-muted-foreground">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {['Row 1', 'Row 2', 'Row 3'].map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 text-sm text-muted-foreground">{row}</td>
                    {[1, 2, 3].map((_, j) => (
                      <td key={j} className="px-4 py-2">
                        {element.type === 'matrix' ? (
                          <RadioGroup defaultValue={`${i}-${j}`}>
                            <RadioGroupItem value={`${i}-${j}`} />
                          </RadioGroup>
                        ) : (
                          <Input type="text" className="w-full" />
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
        return (
          <div className="space-y-4" style={element.fieldStyles}>
            <div className="border-b">
              <nav className="-mb-px flex space-x-8">
                {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, i) => (
                  <button
                    key={i}
                    className={`py-2 px-1 border-b-2 ${
                      i === 0 ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-4 border rounded-lg">Tab content area</div>
          </div>
        );

      case "steps":
        return (
          <div className="space-y-4" style={element.fieldStyles}>
            <div className="flex justify-between">
              {['Step 1', 'Step 2', 'Step 3'].map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {i + 1}
                  </div>
                  {i < 2 && (
                    <div className="w-full h-1 bg-muted mx-2">
                      <div className={`h-full ${i === 0 ? 'bg-primary' : ''}`} style={{ width: '0%' }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border rounded-lg">Step content area</div>
          </div>
        );

      case "table":
        return (
          <div className="overflow-x-auto" style={element.fieldStyles}>
            <table className="min-w-full divide-y border rounded-lg">
              <thead>
                <tr>
                  {['Header 1', 'Header 2', 'Header 3'].map((header, i) => (
                    <th key={i} className="px-4 py-2 text-sm text-muted-foreground">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 3 }).map((_, j) => (
                      <td key={j} className="px-4 py-2 text-sm">
                        Cell {i + 1}-{j + 1}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "list":
        return (
          <div className="space-y-2" style={element.fieldStyles}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg flex items-center justify-between">
                <span className="text-sm">List Item {i + 1}</span>
                <Button variant="ghost" size="sm" className="text-destructive">×</Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              + Add Item
            </Button>
          </div>
        );

      case "nested-list":
        return (
          <div className="space-y-2" style={element.fieldStyles}>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="border rounded-lg">
                <div className="p-4 border-b bg-muted flex items-center justify-between">
                  <span className="font-medium">Group {i + 1}</span>
                  <Button variant="ghost" size="sm" className="text-destructive">×</Button>
                </div>
                <div className="p-4 space-y-2">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <span className="text-sm">Item {j + 1}</span>
                      <Button variant="ghost" size="sm" className="text-destructive">×</Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    + Add Item
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              + Add Group
            </Button>
          </div>
        );

      case "h1":
        return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" style={element.labelStyles}>{element.label || "Heading 1"}</h1>;
      case "h2":
        return <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight" style={element.labelStyles}>{element.label || "Heading 2"}</h2>;
      case "h3":
        return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" style={element.labelStyles}>{element.label || "Heading 3"}</h3>;
      case "h4":
        return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" style={element.labelStyles}>{element.label || "Heading 4"}</h4>;
      case "paragraph":
        return <p className="leading-7 [&:not(:first-child)]:mt-6" style={element.labelStyles}>{element.label || "Sample paragraph text"}</p>;
      case "quote":
        return <blockquote className="pl-4 border-l-4 border-muted italic text-muted-foreground" style={element.labelStyles}>{element.label || "Sample quote text"}</blockquote>;
      case "divider":
        return <hr className="my-4 border-muted" style={element.fieldStyles}/>;
      case "image":
        return (
          <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground" style={element.fieldStyles}>
            Image placeholder
          </div>
        );
      case "link":
        return <a href="#" className="text-primary hover:underline" style={element.fieldStyles}>{element.label || "Sample link"}</a>;
      case "danger-button":
        return (
          <Button variant="destructive" style={element.fieldStyles}>
            {element.label || "Danger Button"}
          </Button>
        );
      case "static-html":
        return <div className="p-4 border rounded bg-muted" style={element.fieldStyles}>Custom HTML content</div>;
      case "container":
      case "2-columns":
      case "3-columns":
      case "4-columns":
      case "grid":
        const columns = {
          'container': 'grid-cols-1',
          '2-columns': 'grid-cols-2',
          '3-columns': 'grid-cols-3',
          '4-columns': 'grid-cols-4',
          'grid': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }[element.type];
        
        return (  
          <div className={`grid ${columns} gap-4`} style={element.fieldStyles}>
            {Array.from({ length: element.type === 'container' ? 1 : parseInt(element.type) || 3 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg bg-muted">
                Column {i + 1}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

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
      </div>
    )}
  </div>
  );
};

export default FormCanvas;
