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

const FormCanvas = ({ elements, setFormConfig, onSelectElement, selectedElement }: FormCanvasProps) => {
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
        return (
          <Input
            type={element.type}
            placeholder={element.placeholder}
            required={element.required}
          />
        );
      case "textarea":
        return (
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={element.placeholder}
            required={element.required}
          />
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
                <SelectItem value="default">Add options in settings</SelectItem>
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
      case "divider":
        return <hr className="my-4 border-gray-700" />;
      case "container":
        return <div className="p-4 border rounded-lg border-gray-700">{element.label}</div>;
      case "2columns":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg border-gray-700">Column 1</div>
            <div className="p-4 border rounded-lg border-gray-700">Column 2</div>
          </div>
        );
      case "3columns":
        return (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg border-gray-700">Column 1</div>
            <div className="p-4 border rounded-lg border-gray-700">Column 2</div>
            <div className="p-4 border rounded-lg border-gray-700">Column 3</div>
          </div>
        );
      case "4columns":
        return (
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg border-gray-700">Column 1</div>
            <div className="p-4 border rounded-lg border-gray-700">Column 2</div>
            <div className="p-4 border rounded-lg border-gray-700">Column 3</div>
            <div className="p-4 border rounded-lg border-gray-700">Column 4</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Form Preview</h2>
      {elements.length === 0 ? (
        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            Drag and drop form elements here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {elements.map((element) => (
            <Card 
              key={element.id} 
              className={`p-4 cursor-pointer transition-colors ${
                selectedElement?.id === element.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onSelectElement(element)}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                  {!["h1", "h2", "h3", "p", "divider"].includes(element.type) && (
                    <Label>{element.label}</Label>
                  )}
                  {renderFormElement(element)}
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(element.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormCanvas;
