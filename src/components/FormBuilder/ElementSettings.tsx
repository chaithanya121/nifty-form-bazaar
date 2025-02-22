
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
  const handleInputChange = (field: string, value: any) => {
    const updatedElement = { ...element };
    
    // Handle nested validation properties
    if (field === "validation") {
      updatedElement.validation = {
        ...(updatedElement.validation || {}),
        ...value,
      };
    } else {
      updatedElement[field] = value;
    }
    
    onUpdate(updatedElement);
  };

  const handleValidationChange = (field: string, value: any) => {
    const validation = {
      ...(element.validation || {}),
      [field]: value,
    };
    handleInputChange("validation", validation);
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
                value={element.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-800"
              />
            </div>

            {["text", "email", "password"].includes(element.type) && (
              <div className="space-y-2">
                <Label>Input Type</Label>
                <Select 
                  value={element.inputType || element.type}
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
                value={element.label}
                onChange={(e) => handleInputChange("label", e.target.value)}
                className="bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label>Tooltip</Label>
              <Input
                value={element.tooltip || ""}
                onChange={(e) => handleInputChange("tooltip", e.target.value)}
                className="bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={element.placeholder || ""}
                onChange={(e) => handleInputChange("placeholder", e.target.value)}
                className="bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={element.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
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
                value={element.autoFloat || "Default"}
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
                checked={element.required}
                onCheckedChange={(checked) => handleInputChange("required", checked)}
              />
            </div>

            {["text", "email", "password"].includes(element.type) && (
              <>
                <div className="space-y-2">
                  <Label>Min Length</Label>
                  <Input
                    type="number"
                    value={element.validation?.minLength || ""}
                    onChange={(e) => handleValidationChange("minLength", parseInt(e.target.value) || undefined)}
                    className="bg-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Max Length</Label>
                  <Input
                    type="number"
                    value={element.validation?.maxLength || ""}
                    onChange={(e) => handleValidationChange("maxLength", parseInt(e.target.value) || undefined)}
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
