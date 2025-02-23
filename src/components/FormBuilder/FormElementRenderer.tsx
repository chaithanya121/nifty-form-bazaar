import { FormElement } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface FormElementRendererProps {
  element: FormElement;
  onChange?: (value: any) => void;
}

const FormElementRenderer = ({ element, onChange }: FormElementRendererProps) => {
  switch (element.type) {
    case "select":
      return (
        <div className="w-full">
          <Label>{element.label}</Label>
          <Select onValueChange={onChange} value={element.value}>
            <SelectTrigger className="w-full">
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
        </div>
      );

    default:
      return null;
  }
};

export default FormElementRenderer;