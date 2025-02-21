
import { Card } from "@/components/ui/card";
import { DragStartProps } from "./types";
import {
  Type,
  Mail,
  Lock,
  Calendar,
  CheckSquare,
  Check,
  List,
  Upload,
} from "lucide-react";

const FORM_ELEMENTS = [
  { type: "text", icon: Type, label: "Text Input" },
  { type: "email", icon: Mail, label: "Email Input" },
  { type: "password", icon: Lock, label: "Password Input" },
  { type: "date", icon: Calendar, label: "Date Picker" },
  { type: "checkbox", icon: CheckSquare, label: "Checkbox" },
  { type: "radio", icon: Check, label: "Radio Button" },
  { type: "select", icon: List, label: "Dropdown" },
  { type: "file", icon: Upload, label: "File Upload" },
  { type: "textarea", icon: Type, label: "Text Area" },
];

const FormElementLibrary = ({ onDragStart }: DragStartProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Form Elements</h2>
      <div className="grid gap-2">
        {FORM_ELEMENTS.map((element) => (
          <Card
            key={element.type}
            className="p-3 cursor-move hover:bg-accent transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
            draggable
            onDragStart={(e) => onDragStart(e, element.type)}
          >
            <div className="flex items-center gap-2">
              <element.icon className="h-4 w-4" />
              <span className="text-sm">{element.label}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FormElementLibrary;
