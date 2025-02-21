
import { Card } from "@/components/ui/card";
import { DragStartProps } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Input } from "@/components/ui/input";

const FIELD_ELEMENTS = [
  { type: "text", icon: Type, label: "Text Input", description: "Single line text input" },
  { type: "email", icon: Mail, label: "Email Input", description: "Text field that expects an email" },
  { type: "password", icon: Lock, label: "Password", description: "Text field that expects a password" },
  { type: "date", icon: Calendar, label: "Date Picker", description: "Date picker input" },
  { type: "checkbox", icon: CheckSquare, label: "Checkbox", description: "Plain checkbox input" },
  { type: "radio", icon: Check, label: "Radio Button", description: "Plain radio input" },
  { type: "select", icon: List, label: "Select", description: "Select input" },
  { type: "file", icon: Upload, label: "File Upload", description: "File upload input" },
  { type: "textarea", icon: Type, label: "Textarea", description: "Single line or multiline text area" }
];

const STATIC_ELEMENTS = [
  { type: "h1", icon: Type, label: "H1 header", description: "HTML <h1> tag" },
  { type: "h2", icon: Type, label: "H2 header", description: "HTML <h2> tag" },
  { type: "h3", icon: Type, label: "H3 header", description: "HTML <h3> tag" },
  { type: "p", icon: Type, label: "Paragraph", description: "HTML <p> tag" },
  { type: "divider", icon: Type, label: "Divider", description: "HTML <hr> tag" },
];

const STRUCTURE_ELEMENTS = [
  { type: "container", icon: Type, label: "Container", description: "A container to group elements" },
  { type: "2columns", icon: Type, label: "2 columns", description: "Two columns next to each other" },
  { type: "3columns", icon: Type, label: "3 columns", description: "Three columns next to each other" },
  { type: "4columns", icon: Type, label: "4 columns", description: "Four columns next to each other" },
];

const FormElementLibrary = ({ onDragStart }: DragStartProps) => {
  return (
    <div className="space-y-4">
      <Input 
        type="search" 
        placeholder="Search elements" 
        className="bg-gray-800 border-gray-700"
      />
      <Tabs defaultValue="fields" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="fields">Fields</TabsTrigger>
          <TabsTrigger value="static">Static</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="fields" className="mt-2">
          <div className="grid gap-2">
            {FIELD_ELEMENTS.map((element) => (
              <Card
                key={element.type}
                className="p-3 cursor-move hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700"
                draggable
                onDragStart={(e) => onDragStart(e, element.type)}
              >
                <div className="flex items-center gap-2">
                  <element.icon className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{element.label}</span>
                    <span className="text-xs text-gray-400">{element.description}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="static" className="mt-2">
          <div className="grid gap-2">
            {STATIC_ELEMENTS.map((element) => (
              <Card
                key={element.type}
                className="p-3 cursor-move hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700"
                draggable
                onDragStart={(e) => onDragStart(e, element.type)}
              >
                <div className="flex items-center gap-2">
                  <element.icon className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{element.label}</span>
                    <span className="text-xs text-gray-400">{element.description}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="structure" className="mt-2">
          <div className="grid gap-2">
            {STRUCTURE_ELEMENTS.map((element) => (
              <Card
                key={element.type}
                className="p-3 cursor-move hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700"
                draggable
                onDragStart={(e) => onDragStart(e, element.type)}
              >
                <div className="flex items-center gap-2">
                  <element.icon className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{element.label}</span>
                    <span className="text-xs text-gray-400">{element.description}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormElementLibrary;
