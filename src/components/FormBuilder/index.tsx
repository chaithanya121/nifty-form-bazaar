
// import { DragEvent, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { FormElement, FormConfig, FormElementType } from "./types";
// import FormElementLibrary from "./FormElementLibrary";
// import FormCanvas from "./FormCanvas";
// import FormPreview from "./FormPreview";
// import ElementSettings from "./ElementSettings";
// import { Button } from "@/components/ui/button";
// import { Eye, Code } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const DEFAULT_CONFIG: FormConfig = {
//   name: "Create account",
//   elements: [],
//   settings: {
//     preview: {
//       width: "Full",
//       nesting: true,
//     },
//     validation: {
//       liveValidation: "Default",
//     },
//     layout: {
//       size: "Default",
//       columns: {
//         default: true,
//         tablet: false,
//         desktop: false,
//       },
//       labels: "Default",
//       placeholders: "Default",
//       errors: "Default",
//       messages: "Default",
//     },
//   },
// };

// const FormBuilder = () => {
//   const [formConfig, setFormConfig] = useState<FormConfig>(DEFAULT_CONFIG);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [selectedElement, setSelectedElement] = useState<FormElement | undefined>();
//   const { toast } = useToast();

//   const handleDragStart = (e: DragEvent<HTMLDivElement>, elementType: string) => {
//     e.dataTransfer.setData("elementType", elementType);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const elementType = e.dataTransfer.getData("elementType");
//     const newElement: FormElement = {
//       id: `element-${Date.now()}`,
//       type: elementType as FormElementType,
//       label: `New ${elementType}`,
//       required: false,
//       placeholder: `Enter ${elementType}`,
//       nestedData: false,
//       description: "",
//       name: elementType.toLowerCase(),
//       options: [],
//     };

//     setFormConfig((prev) => ({
//       ...prev,
//       elements: [...prev.elements, newElement],
//     }));

//     toast({
//       title: "Element Added",
//       description: `Added new ${elementType} element to the form`,
//     });
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleElementSelect = (element: FormElement) => {
//     setSelectedElement(element);
//   };

//   const handleElementUpdate = (updatedElement: FormElement) => {
//     setFormConfig((prev) => ({
//       ...prev,
//       elements: prev.elements.map((el) =>
//         el.id === updatedElement.id ? updatedElement : el
//       ),
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="container mx-auto p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">Create account</h1>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <span>Theme</span>
//               <Button variant="outline" size="sm">
//                 Dark
//               </Button>
//             </div>
//             <div className="flex items-center gap-2">
//               <span>Language</span>
//               <Button variant="outline" size="sm">
//                 English
//               </Button>
//             </div>
//             <Button variant="outline" onClick={() => setPreviewMode(!previewMode)} className="gap-2">
//               {previewMode ? <Code /> : <Eye />}
//               {previewMode ? "Edit" : "Preview"}
//             </Button>
//           </div>
//         </div>

//         <div className="grid grid-cols-12 gap-4">
//           {!previewMode ? (
//             <>
//               <Card className="col-span-3 bg-gray-800 border-gray-700 p-4">
//                 <FormElementLibrary onDragStart={handleDragStart} />
//               </Card>
//               <Card
//                 className="col-span-6 bg-gray-800 border-gray-700 p-4 min-h-[calc(100vh-10rem)]"
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//               >
//                 <FormCanvas
//                   elements={formConfig.elements}
//                   setFormConfig={setFormConfig}
//                   onSelectElement={handleElementSelect}
//                   selectedElement={selectedElement}
//                 />
//               </Card>
//               <Card className="col-span-3 bg-gray-800 border-gray-700 p-4">
//                 {selectedElement ? (
//                   <ElementSettings
//                     element={selectedElement}
//                     onUpdate={handleElementUpdate}
//                     onClose={() => setSelectedElement(undefined)}
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-gray-400">
//                     Select an element to edit its properties
//                   </div>
//                 )}
//               </Card>
//             </>
//           ) : (
//             <Card className="col-span-12 bg-gray-800 border-gray-700 p-4">
//               <FormPreview formConfig={formConfig} />
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormBuilder;

import { DragEvent, useState } from "react";
import { Card } from "@/components/ui/card";
import { FormElement, FormConfig, FormElementType } from "./types";
import FormElementLibrary from "./FormElementLibrary";
import FormCanvas from "./FormCanvas";
import FormPreview from "./FormPreview";
import ElementSettings from "./ElementSettings";
import { Button } from "@/components/ui/button";
import { Eye, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

const DEFAULT_CONFIG: FormConfig = {
  name: "Create account",
  elements: [],
  settings: {
    preview: {
      width: "Full",
      nesting: true,
    },
    validation: {
      liveValidation: "Default",
    },
    layout: {
      size: "Default",
      columns: {
        default: true,
        tablet: false,
        desktop: false,
      },
      labels: "Default",
      placeholders: "Default",
      errors: "Default",
      messages: "Default",
    },
  },
};



const PRESET_STYLES = {
  "Light Theme": {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
  },
  "Dark Theme": {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
  },
  "Gradient Background": {
    backgroundImage: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#ffffff",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
  },
};
const FormBuilder = () => {
  const [formConfig, setFormConfig] = useState<FormConfig>(DEFAULT_CONFIG);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<FormElement | undefined>();
  const { toast } = useToast();

  const handleDragStart = (e: DragEvent<HTMLDivElement>, elementType: string) => {
    e.dataTransfer.setData("elementType", elementType);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("elementType");
    const newElement: FormElement = {
      id: `element-${Date.now()}`,
      type: elementType as FormElementType,
      label: `New ${elementType}`,
      required: false,
      placeholder: `Enter ${elementType}`,
      nestedData: false,
      description: "",
      name: elementType.toLowerCase(),
      options: [],
    };

    setFormConfig((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));

    toast({
      title: "Element Added",
      description: `Added new ${elementType} element to the form`,
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleElementSelect = (element: FormElement) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (updatedElement: FormElement) => {
    setFormConfig((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === updatedElement.id ? updatedElement : el
      ),
    }));

    // Update the selectedElement state
    setSelectedElement(updatedElement);
  };

  const handleCanvasStyleChange = (field: string, value: string) => {
    const updatedCanvasStyles = { ...formConfig.settings.canvasStyles, [field]: value };
    setFormConfig((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        canvasStyles: updatedCanvasStyles,
      },
    }));
  };

  const applyPresetStyle = (presetName: string) => {
    const presetStyles = PRESET_STYLES[presetName];
    setFormConfig((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        canvasStyles: {
          ...prev.settings.canvasStyles,
          ...presetStyles,
        },
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Create account</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Theme</span>
              <Button variant="outline" size="sm" className="bg-gray-800 text-blage hover:bg-gray-700">
                Dark
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span>Language</span>
              <Button variant="outline" size="sm" className="bg-gray-800 text-white hover:bg-gray-700">
                English
              </Button>
            </div>
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)} className="gap-2 bg-gray-800 text-white hover:bg-gray-700">
              {previewMode ? <Code /> : <Eye />}
              {previewMode ? "Edit" : "Preview"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {!previewMode ? (
            <>
              <Card className="col-span-3 bg-gray-800 border-gray-700 p-4">
                <FormElementLibrary onDragStart={handleDragStart} />
              </Card>
              <Card
                className="col-span-6 bg-gray-800 border-gray-700 p-4 min-h-[calc(100vh-10rem)]"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <FormCanvas
                  elements={formConfig.elements}
                  setFormConfig={setFormConfig}
                  onSelectElement={handleElementSelect}
                  selectedElement={selectedElement}
                  formConfig={formConfig}
                />
              </Card>
              <Card className="col-span-3 bg-gray-800 border-gray-700 p-4">
                {selectedElement ? (
                  <ElementSettings
                    key={selectedElement.id} // Force re-render when selectedElement changes
                    element={selectedElement}
                    onUpdate={handleElementUpdate}
                    onClose={() => setSelectedElement(undefined)}
                  />
                ) : (
                  // <div className="space-y-4">
                  //   <h4 className="text-lg font-semibold text-white">Canvas Styling</h4>

                  //   {/* Preset Styles Dropdown */}
                  //   <div className="space-y-2">
                  //     <Label className="text-white">Preset Styles</Label>
                  //     <Select onValueChange={(value) => applyPresetStyle(value)}>
                  //       <SelectTrigger className="bg-gray-800 text-white">
                  //         <SelectValue placeholder="Select a preset style" />
                  //       </SelectTrigger>
                  //       <SelectContent>
                  //         {Object.keys(PRESET_STYLES).map((presetName) => (
                  //           <SelectItem key={presetName} value={presetName}>
                  //             {presetName}
                  //           </SelectItem>
                  //         ))}
                  //       </SelectContent>
                  //     </Select>
                  //   </div>

                  //   {/* Custom Canvas Styling */}
                  //   <div className="space-y-4">
                  //     <div className="space-y-2">
                  //       <Label className="text-white">Background Color</Label>
                  //       <Input
                  //         value={formConfig.settings.canvasStyles?.backgroundColor || ""}
                  //         onChange={(e) => handleCanvasStyleChange("backgroundColor", e.target.value)}
                  //         placeholder="e.g., #ffffff"
                  //         className="bg-gray-800 text-white"
                  //       />
                  //     </div>
                  //     <div className="space-y-2">
                  //       <Label className="text-white">Background Image</Label>
                  //       <Input
                  //         value={formConfig.settings.canvasStyles?.backgroundImage || ""}
                  //         onChange={(e) => handleCanvasStyleChange("backgroundImage", e.target.value)}
                  //         placeholder="e.g., https://example.com/image.jpg"
                  //         className="bg-gray-800 text-white"
                  //       />
                  //     </div>
                  //     <div className="space-y-2">
                  //       <Label className="text-white">Padding</Label>
                  //       <Input
                  //         type="number"
                  //         value={formConfig.settings.canvasStyles?.padding?.replace("px", "") || ""}
                  //         onChange={(e) => handleCanvasStyleChange("padding", `${e.target.value}px`)}
                  //         placeholder="e.g., 10"
                  //         className="bg-gray-800 text-white"
                  //       />
                  //     </div>
                  //     <div className="space-y-2">
                  //       <Label className="text-white">Margin</Label>
                  //       <Input
                  //         type="number"
                  //         value={formConfig.settings.canvasStyles?.margin?.replace("px", "") || ""}
                  //         onChange={(e) => handleCanvasStyleChange("margin", `${e.target.value}px`)}
                  //         placeholder="e.g., 10"
                  //         className="bg-gray-800 text-white"
                  //       />
                  //     </div>
                  //     <div className="space-y-2">
                  //       <Label className="text-white">Border Radius</Label>
                  //       <Input
                  //         type="number"
                  //         value={formConfig.settings.canvasStyles?.borderRadius?.replace("px", "") || ""}
                  //         onChange={(e) => handleCanvasStyleChange("borderRadius", `${e.target.value}px`)}
                  //         placeholder="e.g., 5"
                  //         className="bg-gray-800 text-white"
                  //       />
                  //     </div>
                  //   </div>
                  // </div>
                  <Tabs defaultValue="canvas-styling">
      <TabsList   className="bg-gray-700 mb-4"
                style={{ width: "fit-content", gap: "13px" }}
                > 
        <TabsTrigger value="canvas-styling">Canvas Styling</TabsTrigger>
        <TabsTrigger value="import">Import</TabsTrigger>
      </TabsList>

      {/* Canvas Styling Tab */}
      <TabsContent value="canvas-styling" className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Canvas Styling</h4>

        {/* Preset Styles Dropdown */}
        <div className="space-y-2">
          <Label className="text-white">Preset Styles</Label>
          <Select onValueChange={(value) => applyPresetStyle(value)}>
            <SelectTrigger className="bg-gray-800 text-white">
              <SelectValue placeholder="Select a preset style" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(PRESET_STYLES).map((presetName) => (
                <SelectItem key={presetName} value={presetName}>
                  {presetName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Canvas Styling */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Background Color</Label>
            <Input
              value={formConfig.settings.canvasStyles?.backgroundColor || ""}
              onChange={(e) => handleCanvasStyleChange("backgroundColor", e.target.value)}
              placeholder="e.g., #ffffff"
              className="bg-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Background Image</Label>
            <Input
              value={formConfig.settings.canvasStyles?.backgroundImage || ""}
              onChange={(e) => handleCanvasStyleChange("backgroundImage", e.target.value)}
              placeholder="e.g., https://example.com/image.jpg"
              className="bg-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Padding</Label>
            <Input
              type="number"
              value={formConfig.settings.canvasStyles?.padding?.replace("px", "") || ""}
              onChange={(e) => handleCanvasStyleChange("padding", `${e.target.value}px`)}
              placeholder="e.g., 10"
              className="bg-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Margin</Label>
            <Input
              type="number"
              value={formConfig.settings.canvasStyles?.margin?.replace("px", "") || ""}
              onChange={(e) => handleCanvasStyleChange("margin", `${e.target.value}px`)}
              placeholder="e.g., 10"
              className="bg-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Border Radius</Label>
            <Input
              type="number"
              value={formConfig.settings.canvasStyles?.borderRadius?.replace("px", "") || ""}
              onChange={(e) => handleCanvasStyleChange("borderRadius", `${e.target.value}px`)}
              placeholder="e.g., 5"
              className="bg-gray-800 text-white"
            />
          </div>
        </div>
      </TabsContent>

      {/* Import Tab */}
      <TabsContent value="import" className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Import</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Import JSON</Label>
            <Input
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const importedConfig = JSON.parse(event.target?.result as string);
                      setFormConfig(importedConfig);
                      toast({
                        title: "Import Successful",
                        description: "Form configuration has been imported.",
                      });
                    } catch (error) {
                      toast({
                        title: "Import Failed",
                        description: "Invalid JSON file.",
                        variant: "destructive",
                      });
                    }
                  };
                  reader.readAsText(file);
                }
              }}
              className="bg-gray-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Export JSON</Label>
            <Button
              variant="outline"
              className="w-full bg-gray-800 text-white hover:bg-gray-700"
              onClick={() => {
                const jsonString = JSON.stringify(formConfig, null, 2);
                const blob = new Blob([jsonString], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "form-config.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Export Configuration
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
                )}
              </Card>
            </>
          ) : (
            <Card className="col-span-12 bg-gray-800 border-gray-700 p-4">
              <FormPreview formConfig={formConfig} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;