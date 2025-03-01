
import { FormElement, FormElementRendererProps } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const FormElementRenderer = ({ element, value, onChange, error }: FormElementRendererProps) => {
  switch (element.type) {
    case "text":
    case "email":
    case "password":
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
          <Input 
            type={element.type} 
            placeholder={element.placeholder} 
            value={value} 
            onChange={(e) => onChange?.(e.target.value)}
            style={element.fieldStyles}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    
    case "textarea":
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={element.placeholder}
            value={value} 
            onChange={(e) => onChange?.(e.target.value)}
            style={element.fieldStyles}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    
    case "select":
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-full" style={element.fieldStyles}>
              <SelectValue placeholder={element.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {element.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    
    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={element.id} 
            checked={value} 
            onCheckedChange={onChange}
          />
          <Label htmlFor={element.id}>{element.label}</Label>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    
    case "radio":
      return (
        <RadioGroup value={value} onValueChange={onChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={element.id} id={element.id} />
            <Label htmlFor={element.id}>{element.label}</Label>
          </div>
        </RadioGroup>
      );
    
    case "address":
    case "street-address":
    case "street-address-line2":
    case "city":
    case "state-province":
    case "postal-code":
    case "name":
    case "first-name":
    case "last-name":
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
          <Input 
            type="text" 
            placeholder={element.placeholder} 
            value={value} 
            onChange={(e) => onChange?.(e.target.value)}
            style={element.fieldStyles}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    
    case "appointment":
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
          <Input 
            type="datetime-local" 
            value={value} 
            onChange={(e) => onChange?.(e.target.value)}
            style={element.fieldStyles}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    
    case "rating":
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => onChange?.(star)}
                className={`text-${value >= star ? 'yellow' : 'gray'}-500 hover:text-yellow-500 focus:text-yellow-500`}
              >
                <Star className="h-6 w-6" />
              </button>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    
    case "captcha":
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
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
              className="mt-2"
              placeholder="Enter the code above"
              value={value} 
              onChange={(e) => onChange?.(e.target.value)}
              style={element.fieldStyles}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
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

export default FormElementRenderer;
