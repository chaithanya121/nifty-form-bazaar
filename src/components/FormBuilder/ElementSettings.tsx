
import { ElementSettingsProps } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ElementSettings = ({ element, onUpdate, onClose }: ElementSettingsProps) => {
  if (!element) return null;

  const handleInputChange = (field: string, value: any) => {
    const updatedElement = {
      ...element,
      [field]: value
    };
    console.log('Updating element field:', field, 'with value:', value);
    onUpdate(updatedElement);
  };

  const handleValidationChange = (field: string, value: any) => {
    const updatedElement = {
      ...element,
      validation: {
        ...(element.validation || {}),
        [field]: value
      }
    };
    console.log('Updating validation field:', field, 'with value:', value);
    onUpdate(updatedElement);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <X className="h-4 w-4 cursor-pointer" onClick={onClose} />
          {element.type}
        </h3>
      </div>

      <Tabs defaultValue="properties">
        <TabsList className="w-full bg-gray-800">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                defaultValue={element.name || ""}
                onBlur={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-800"
              />
            </div>

            {["text", "email", "password"].includes(element.type) && (
              <div className="space-y-2">
                <Label>Input Type</Label>
                <Select 
                  defaultValue={element.inputType || element.type}
                  onValueChange={(value) => handleInputChange("inputType", value)}
                >
                  <SelectTrigger className="bg-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="tel">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                defaultValue={element.label || ""}
                onBlur={(e) => handleInputChange("label", e.target.value)}
                className="bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label>Tooltip</Label>
              <Input
                defaultValue={element.tooltip || ""}
                onBlur={(e) => handleInputChange("tooltip", e.target.value)}
                className="bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                defaultValue={element.placeholder || ""}
                onBlur={(e) => handleInputChange("placeholder", e.target.value)}
                className="bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                defaultValue={element.description || ""}
                onBlur={(e) => handleInputChange("description", e.target.value)}
                className="bg-gray-800"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Submit Data</Label>
              <Switch
                checked={element.submitData || false}
                onCheckedChange={(checked) => handleInputChange("submitData", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Nested Data</Label>
              <Switch
                checked={element.nestedData || false}
                onCheckedChange={(checked) => handleInputChange("nestedData", checked)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Auto Float</Label>
              <Select
                defaultValue={element.autoFloat || "Default"}
                onValueChange={(value) => handleInputChange("autoFloat", value)}
              >
                <SelectTrigger className="w-[120px] bg-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Default">Default</SelectItem>
                  <SelectItem value="Off">Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Required</Label>
              <Switch
                checked={element.required || false}
                onCheckedChange={(checked) => handleInputChange("required", checked)}
              />
            </div>

            {["text", "email", "password"].includes(element.type) && (
              <>
                <div className="space-y-2">
                  <Label>Min Length</Label>
                  <Input
                    type="number"
                    defaultValue={element.validation?.minLength || ""}
                    onBlur={(e) => handleValidationChange("minLength", parseInt(e.target.value) || undefined)}
                    className="bg-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Max Length</Label>
                  <Input
                    type="number"
                    defaultValue={element.validation?.maxLength || ""}
                    onBlur={(e) => handleValidationChange("maxLength", parseInt(e.target.value) || undefined)}
                    className="bg-gray-800"
                  />
                </div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElementSettings;
