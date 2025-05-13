
import { FormElementRendererProps } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Star, Send, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FormElementRenderer = ({
  element,
  value,
  onChange = () => {},
  error,
}: FormElementRendererProps) => {
  const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate ? selectedDate.toISOString() : "");
  };

  const renderElement = () => {
    switch (element.type) {
      case "text":
      case "email":
      case "password":
        return (
          <Input
            type={element.type}
            id={element.id}
            value={value || ""}
            onChange={handleChange}
            placeholder={element.placeholder}
            required={element.required}
            style={element.fieldStyles || {}}
          />
        );
      case "textarea":
        return (
          <textarea
            id={element.id}
            value={value || ""}
            onChange={handleChange}
            placeholder={element.placeholder}
            required={element.required}
            style={element.fieldStyles || {}}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        );
      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger style={element.fieldStyles || {}}>
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
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={element.id}
              checked={value || false}
              onCheckedChange={onChange}
              style={element.fieldStyles || {}}
            />
            <label
              htmlFor={element.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {element.placeholder || element.label}
            </label>
          </div>
        );
      case "radio":
        return (
          <RadioGroup value={value} onValueChange={onChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id={element.id} style={element.fieldStyles || {}} />
              <label
                htmlFor={element.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {element.placeholder || element.label}
              </label>
            </div>
          </RadioGroup>
        );
      case "address":
      case "street-address":
      case "street-address-line2":
      case "city":
      case "state-province":
      case "postal-code":
        return (
          <Input
            type="text"
            id={element.id}
            value={value || ""}
            onChange={handleChange}
            placeholder={element.placeholder}
            required={element.required}
            style={element.fieldStyles || {}}
          />
        );
      case "name":
      case "first-name":
      case "last-name":
        return (
          <Input
            type="text"
            id={element.id}
            value={value || ""}
            onChange={handleChange}
            placeholder={element.placeholder}
            required={element.required}
            style={element.fieldStyles || {}}
          />
        );
      case "appointment":
        return (
          <Input
            type="datetime-local"
            id={element.id}
            value={value || ""}
            onChange={handleChange}
            placeholder={element.placeholder}
            required={element.required}
            style={element.fieldStyles || {}}
          />
        );
      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
                style={element.fieldStyles || {}}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>{element.placeholder || "Select a date"}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        );
      case "rating":
        return (
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                className={`text-${
                  value >= rating ? "yellow" : "gray"
                }-500 hover:text-yellow-500 focus:text-yellow-500`}
                onClick={() => onChange(rating)}
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
              type="text"
              id={element.id}
              value={value || ""}
              onChange={handleChange}
              className="mt-2"
              placeholder="Enter the code above"
              required={element.required}
              style={element.fieldStyles || {}}
            />
          </div>
        );
      case "form_submit":
        return (
          <Button 
            type="submit" 
            style={element.fieldStyles || {}}
            className="w-full"
          >
            {element.label || "Submit"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
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
    <div className="space-y-2">
      {!["h1", "h2", "h3", "p", "checkbox", "radio", "form_submit"].includes(element.type) && (
        <Label htmlFor={element.id} style={element.labelStyles || {}}>{element.label}</Label>
      )}
      {renderElement()}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormElementRenderer;
