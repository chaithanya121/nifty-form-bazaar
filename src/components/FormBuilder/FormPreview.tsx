
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

const FormPreview = ({ formConfig }: FormPreviewProps) => {

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form Submitted",
      description: "Form data has been collected successfully",
    });
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
    const elementStyles = element.fieldStyles || {}; // Use the element's styles or an empty object
  
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
            style={elementStyles} // Apply styles here
          />
        );
      case "textarea":
        return (
          <textarea
            id={element.id}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={element.placeholder}
            required={element.required}
            style={elementStyles} // Apply styles here
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2" style={elementStyles}> {/* Apply styles here */}
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
          <RadioGroup defaultValue="default" style={elementStyles}> {/* Apply styles here */}
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
            <SelectTrigger style={elementStyles}> {/* Apply styles here */}
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
        return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" style={elementStyles}>{element.label}</h1>;
      case "h2":
        return <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight" style={elementStyles}>{element.label}</h2>;
      case "h3":
        return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" style={elementStyles}>{element.label}</h3>;
      case "p":
        return <p className="leading-7 [&:not(:first-child)]:mt-6" style={elementStyles}>{element.label}</p>;
      case "divider":
        return <hr className="my-4 border-gray-700" style={elementStyles} />;
      case "container":
        return <div className="p-4 border rounded-lg border-gray-700" style={elementStyles}>{element.label}</div>;
      case "2-columns":
        return (
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg border-gray-700" style={elementStyles}>
            {element.label}
          </div>
        );
      case "3-columns":
        return (
          <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg border-gray-700" style={elementStyles}>
            {element.label}
          </div>
        );
      case "4-columns":
        return (
          <div className="grid grid-cols-4 gap-4 p-4 border rounded-lg border-gray-700" style={elementStyles}>
            {element.label}
          </div>
        );
      case "grid":
        return (
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg border-gray-700" style={elementStyles}>
            {element.label}
          </div>
        );
      case "table":
        return (
          <table className="w-full border-collapse border border-gray-700" style={elementStyles}>
            <thead>
              <tr>
                <th className="border border-gray-700 p-2">Header 1</th>
                <th className="border border-gray-700 p-2">Header 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-700 p-2">Data 1</td>
                <td className="border border-gray-700 p-2">Data 2</td>
              </tr>
            </tbody>
          </table>
        );
      case "list":
        return (
          <ul className="list-disc list-inside p-4 border rounded-lg border-gray-700" style={elementStyles}>
            <li>{element.label}</li>
          </ul>
        );
      case "nested-list":
        return (
          <div className="p-4 border rounded-lg border-gray-700" style={elementStyles}>
            <ul className="list-disc list-inside">
              <li>{element.label}</li>
            </ul>
          </div>
        );
      case "tabs":
        return (
          <div className="p-4 border rounded-lg border-gray-700" style={elementStyles}>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-800 rounded-lg">Tab 1</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg">Tab 2</button>
            </div>
            <div className="mt-4">{element.label}</div>
          </div>
        );
      case "steps":
        return (
          <div className="p-4 border rounded-lg border-gray-700" style={elementStyles}>
            <div className="flex space-x-4">
              <div className="px-4 py-2 bg-gray-800 rounded-lg">Step 1</div>
              <div className="px-4 py-2 bg-gray-800 rounded-lg">Step 2</div>
            </div>
            <div className="mt-4">{element.label}</div>
          </div>
        );
      case "image":
        return (
          <img
            src={element.label}
            alt="Image"
            className="w-full h-auto rounded-lg"
            style={elementStyles} // Apply styles here
          />
        );
      case "link":
        return (
          <a
            href={element.label}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            style={elementStyles} // Apply styles here
          >
            {element.label}
          </a>
        );
      case "quote":
        return (
          <blockquote className="p-4 border-l-4 border-gray-700 italic" style={elementStyles}>
            {element.label}
          </blockquote>
        );
      case "danger-button":
        return (
          <Button variant="destructive" className="w-full" style={elementStyles}> {/* Apply styles here */}
            {element.label}
          </Button>
        );
      case "static-html":
        return (
          <div
            className="p-4 border rounded-lg border-gray-700"
            dangerouslySetInnerHTML={{ __html: element.label }}
            style={elementStyles} // Apply styles here
          />
        );
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
              <Label htmlFor={element.id} style={element.labelStyles}>{element.label}</Label>
            )}
            {renderFormElement(element)}
          </div>
        ))}
        {/* <Button type="submit">Submit Form</Button> */}
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
