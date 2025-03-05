import { DragEvent, useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FormElement, FormConfig, FormElementType } from "./types";
import FormElementLibrary from "./FormElementLibrary";
import FormCanvas from "./FormCanvas";
import FormPreview from "./FormPreview";
import ElementSettings from "./ElementSettings";
import { Button } from "@/components/ui/button";
import { Eye, Code, Save, Layers, ArrowLeft, Globe, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { useNavigate, useParams } from "react-router-dom";

const DEFAULT_CONFIG: FormConfig = {
  name: "Create account",
  elements: [],
  settings: {
    termsAndConditions: {
      enabled: true,
      required: true,
      text: "I accept the Terms & Conditions & Privacy Policy",
    },
    submitButton: {
      enabled: true,
      text: "Submit",
    },
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
    backgroundImage: "",
  },
  "Dark Theme": {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
    backgroundImage: "",
  },
  "Gradient Background": {
    backgroundColor: "",
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
  const [isPublished, setIsPublished] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const formInitialized = useRef(false);

  useEffect(() => {
    if (id && !formInitialized.current) {
      formInitialized.current = true;
      try {
        const storedFormsJson = localStorage.getItem('nifty-forms');
        if (storedFormsJson) {
          const storedForms = JSON.parse(storedFormsJson);
          const formToEdit = storedForms.find((form: any) => form.id === id);
          if (formToEdit) {
            setFormConfig(formToEdit.config);
            setIsPublished(formToEdit.published || false);
            toast({
              title: "Form Loaded",
              description: `Editing form: ${formToEdit.name}`,
            });
          } else {
            toast({
              title: "Error",
              description: "Form not found",
              variant: "destructive"
            });
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error loading form:', error);
        toast({
          title: "Error",
          description: "Failed to load form data",
          variant: "destructive"
        });
      }
    }
  }, [id, navigate, toast]);

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

  const getStyleStringValue = (style: string | number | undefined): string => {
    if (style === undefined) return '';
    
    if (typeof style === 'string') {
      return style.replace('px', '');
    }
    
    return String(style);
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
    
    toast({
      title: "Style Applied",
      description: `Applied ${presetName} style to the form`,
    });
  };

  const handleSaveForm = () => {
    const formId = id || `form-${Date.now()}`;
    const existingFormsJson = localStorage.getItem('nifty-forms');
    const existingForms = existingFormsJson ? JSON.parse(existingFormsJson) : [];
    const formIndex = existingForms.findIndex((form: any) => form.id === id);
    
    // If the form doesn't exist yet, create a new one
    if (formIndex < 0) {
      const formObject = {
        id: formId,
        name: formConfig.name,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        submissions: 0,
        published: isPublished,
        config: formConfig
      };
      existingForms.push(formObject);
    } else {
      // Update the existing form
      existingForms[formIndex] = {
        ...existingForms[formIndex],
        lastModified: new Date().toISOString(),
        config: formConfig
      };
    }
    
    localStorage.setItem('nifty-forms', JSON.stringify(existingForms));
    toast({
      title: "Form Saved",
      description: "Your form has been saved successfully",
    });
    navigate('/');
  };

  const handlePublishForm = () => {
    const formId = id || `form-${Date.now()}`;
    const existingFormsJson = localStorage.getItem('nifty-forms');
    const existingForms = existingFormsJson ? JSON.parse(existingFormsJson) : [];
    const formIndex = existingForms.findIndex((form: any) => form.id === id);
    
    // If the form doesn't exist yet, save it first
    if (formIndex < 0) {
      const formObject = {
        id: formId,
        name: formConfig.name,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        submissions: 0,
        published: true,
        config: formConfig
      };
      existingForms.push(formObject);
    } else {
      // Update the existing form to be published
      existingForms[formIndex] = {
        ...existingForms[formIndex],
        published: true,
        lastModified: new Date().toISOString(),
        config: formConfig
      };
    }
    
    localStorage.setItem('nifty-forms', JSON.stringify(existingForms));
    setIsPublished(true);
    toast({
      title: "Form Published",
      description: "Your form has been published and is now available for submissions",
    });
  };

  const handleShareLink = () => {
    const formId = id || `form-${Date.now()}`;
    const shareableLink = `${window.location.origin}/form/${formId}`;
    navigator.clipboard.writeText(shareableLink);
    toast({
      title: "Link Copied",
      description: "Shareable form link copied to clipboard"
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-300 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </button>
              <div className="flex items-center gap-2">
                <Layers className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Form Builder
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

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
            <Button 
              onClick={handlePublishForm} 
              className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Globe className="h-4 w-4" />
              Publish
            </Button>
            {isPublished && (
              <Button 
                onClick={handleShareLink} 
                className="gap-2 bg-purple-600 text-white hover:bg-purple-700"
              >
                <Link className="h-4 w-4" />
                Share
              </Button>
            )}
            <Button 
              onClick={handleSaveForm} 
              className="gap-2 bg-green-600 text-white hover:bg-green-700"
            >
              <Save className="h-4 w-4" />
              Save Form
            </Button>
          </div>
        </div>

        <div className={previewMode ?'justify-center align-center': "grid grid-cols-12 gap-4"} style={{display: previewMode ? 'flex' : 'grid'}}>
          {!previewMode ? (
            <>
              <Card className="col-span-3 bg-gray-800 border-gray-700 p-4">
                <FormElementLibrary onDragStart={handleDragStart} />
              </Card>
              <Card
                className="col-span-6 bg-gray-800 border-gray-700 p-4"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                  overflow: 'hidden'
                }}
              >
                <FormCanvas
                  elements={formConfig.elements}
                  setFormConfig={setFormConfig}
                  onSelectElement={handleElementSelect}
                  selectedElement={selectedElement}
                  formConfig={formConfig}
                  onUpdate={handleElementUpdate}
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
                  <Tabs defaultValue="canvas-styling">
                    <TabsList   className="bg-gray-700 mb-4"
                      style={{ width: "fit-content", gap: "13px" }}
                    > 
                      <TabsTrigger value="canvas-styling">Canvas Styling</TabsTrigger>
                      <TabsTrigger value="import">Import</TabsTrigger>
                    </TabsList>

                    <TabsContent value="canvas-styling" className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Canvas Styling</h4>

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
                            value={getStyleStringValue(formConfig.settings.canvasStyles?.padding)}
                            onChange={(e) => handleCanvasStyleChange("padding", `${e.target.value}px`)}
                            placeholder="e.g., 10"
                            className="bg-gray-800 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Margin</Label>
                          <Input
                            type="number"
                            value={getStyleStringValue(formConfig.settings.canvasStyles?.margin)}
                            onChange={(e) => handleCanvasStyleChange("margin", `${e.target.value}px`)}
                            placeholder="e.g., 10"
                            className="bg-gray-800 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Border Radius</Label>
                          <Input
                            type="number"
                            value={getStyleStringValue(formConfig.settings.canvasStyles?.borderRadius)}
                            onChange={(e) => handleCanvasStyleChange("borderRadius", `${e.target.value}px`)}
                            placeholder="e.g., 5"
                            className="bg-gray-800 text-white"
                          />
                        </div>
                      </div>
                    </TabsContent>

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
            <Card 
              className="col-span-12 bg-gray-800 border-gray-700 p-4 "
              style={{
                backgroundColor: formConfig.settings.canvasStyles?.backgroundColor || '',
                backgroundImage: formConfig.settings.canvasStyles?.backgroundImage || '',
                padding: formConfig.settings.canvasStyles?.padding || '',
                margin: formConfig.settings.canvasStyles?.margin || '',
                borderRadius: formConfig.settings.canvasStyles?.borderRadius || '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 'auto',
                width: '46%'
              }}
            >
              <FormPreview formConfig={formConfig} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
