
import { DragEvent, useState } from "react";
import { Card } from "@/components/ui/card";
import { FormElement, FormConfig } from "./types";
import FormElementLibrary from "./FormElementLibrary";
import FormCanvas from "./FormCanvas";
import FormPreview from "./FormPreview";
import ElementSettings from "./ElementSettings";
import { Button } from "@/components/ui/button";
import { Eye, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      type: elementType,
      label: `New ${elementType}`,
      required: false,
      placeholder: `Enter ${elementType}`,
      nestedData: false,
      description: "",
      name: elementType.toLowerCase(),
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
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Create account</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Theme</span>
              <Button variant="outline" size="sm">
                Dark
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span>Language</span>
              <Button variant="outline" size="sm">
                English
              </Button>
            </div>
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)} className="gap-2">
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
                />
              </Card>
              <Card className="col-span-3 bg-gray-800 border-gray-700 p-4">
                {selectedElement ? (
                  <ElementSettings
                    element={selectedElement}
                    onUpdate={handleElementUpdate}
                    onClose={() => setSelectedElement(undefined)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Select an element to edit its properties
                  </div>
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
