
import { DragEvent, useState } from "react";
import { Card } from "@/components/ui/card";
import { FormElement, FormConfig } from "./types";
import FormElementLibrary from "./FormElementLibrary";
import FormCanvas from "./FormCanvas";
import FormPreview from "./FormPreview";
import { Button } from "@/components/ui/button";
import { Eye, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_CONFIG: FormConfig = {
  name: "Create account",
  elements: [],
  settings: {
    preview: {
      width: "Full",
      nesting: true
    },
    validation: {
      liveValidation: "Default"
    },
    layout: {
      size: "Default",
      columns: {
        default: true,
        tablet: false,
        desktop: false
      },
      labels: "Default",
      placeholders: "Default",
      errors: "Default",
      messages: "Default"
    }
  }
};

const FormBuilder = () => {
  const [formConfig, setFormConfig] = useState<FormConfig>(DEFAULT_CONFIG);
  const [previewMode, setPreviewMode] = useState(false);
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Form Builder</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className="gap-2"
            >
              {previewMode ? <Code /> : <Eye />}
              {previewMode ? "Edit" : "Preview"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {!previewMode ? (
            <>
              <Card className="md:col-span-3 p-4 bg-gray-800 border-gray-700">
                <FormElementLibrary onDragStart={handleDragStart} />
              </Card>
              <Card
                className="md:col-span-9 p-4 min-h-[500px] bg-gray-800 border-gray-700"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <FormCanvas
                  elements={formConfig.elements}
                  setFormConfig={setFormConfig}
                />
              </Card>
            </>
          ) : (
            <Card className="md:col-span-12 p-4 bg-gray-800 border-gray-700">
              <FormPreview formConfig={formConfig} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
