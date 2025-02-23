
// import { ElementSettingsProps } from "./types";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const ElementSettings = ({ element, onUpdate, onClose }: ElementSettingsProps) => {
//   const handleInputChange = (field: string, value: any) => {
//     onUpdate({ ...element, [field]: value });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold flex items-center gap-2">
//           <X className="h-4 w-4 cursor-pointer" onClick={onClose} />
//           {element.type}
//         </h3>
//       </div>

//       <Tabs defaultValue="properties">
//         <TabsList className="w-full bg-gray-800">
//           <TabsTrigger value="properties">Properties</TabsTrigger>
//           <TabsTrigger value="layout">Layout</TabsTrigger>
//           <TabsTrigger value="validation">Validation</TabsTrigger>
//         </TabsList>

//         <TabsContent value="properties" className="space-y-4">
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label>Name</Label>
//               <Input
//                 value={element.name || ""}
//                 onChange={(e) => handleInputChange("name", e.target.value)}
//                 className="bg-gray-800"
//               />
//             </div>

//             {["text", "email", "password"].includes(element.type) && (
//               <div className="space-y-2">
//                 <Label>Input Type</Label>
//                 <Select 
//                   value={element.inputType || element.type}
//                   onValueChange={(value) => handleInputChange("inputType", value)}
//                 >
//                   <SelectTrigger className="bg-gray-800">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="text">Text</SelectItem>
//                     <SelectItem value="email">Email</SelectItem>
//                     <SelectItem value="password">Password</SelectItem>
//                     <SelectItem value="number">Number</SelectItem>
//                     <SelectItem value="tel">Phone</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label>Label</Label>
//               <Input
//                 value={element.label}
//                 onChange={(e) => handleInputChange("label", e.target.value)}
//                 className="bg-gray-800"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Tooltip</Label>
//               <Input
//                 value={element.tooltip || ""}
//                 onChange={(e) => handleInputChange("tooltip", e.target.value)}
//                 className="bg-gray-800"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Placeholder</Label>
//               <Input
//                 value={element.placeholder || ""}
//                 onChange={(e) => handleInputChange("placeholder", e.target.value)}
//                 className="bg-gray-800"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Description</Label>
//               <Textarea
//                 value={element.description || ""}
//                 onChange={(e) => handleInputChange("description", e.target.value)}
//                 className="bg-gray-800"
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <Label>Submit Data</Label>
//               <Switch
//                 checked={element.submitData || false}
//                 onCheckedChange={(checked) => handleInputChange("submitData", checked)}
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <Label>Nested Data</Label>
//               <Switch
//                 checked={element.nestedData || false}
//                 onCheckedChange={(checked) => handleInputChange("nestedData", checked)}
//               />
//             </div>
//           </div>
//         </TabsContent>

//         <TabsContent value="layout" className="space-y-4">
//           {/* Layout settings */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label>Auto Float</Label>
//               <Select
//                 value={element.autoFloat || "Default"}
//                 onValueChange={(value) => handleInputChange("autoFloat", value)}
//               >
//                 <SelectTrigger className="w-[120px] bg-gray-800">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Default">Default</SelectItem>
//                   <SelectItem value="Off">Off</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </TabsContent>

//         <TabsContent value="validation" className="space-y-4">
//           {/* Validation settings */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label>Required</Label>
//               <Switch
//                 checked={element.required}
//                 onCheckedChange={(checked) => handleInputChange("required", checked)}
//               />
//             </div>

//             {["text", "email", "password"].includes(element.type) && (
//               <>
//                 <div className="space-y-2">
//                   <Label>Min Length</Label>
//                   <Input
//                     type="number"
//                     value={element.validation?.minLength || ""}
//                     onChange={(e) =>
//                       handleInputChange("validation", {
//                         ...element.validation,
//                         minLength: parseInt(e.target.value) || undefined,
//                       })
//                     }
//                     className="bg-gray-800"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Max Length</Label>
//                   <Input
//                     type="number"
//                     value={element.validation?.maxLength || ""}
//                     onChange={(e) =>
//                       handleInputChange("validation", {
//                         ...element.validation,
//                         maxLength: parseInt(e.target.value) || undefined,
//                       })
//                     }
//                     className="bg-gray-800"
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default ElementSettings;

// import { ElementSettingsProps, FormElement } from "./types";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { X, Type, Mail, Lock, Calendar, CheckSquare, Check, List, Upload, Radio, Grid, Table2, 
//   ToggleLeft, Sliders, Image, Images, FileWarning, AlertTriangle, Heading1, Heading2, Heading3, 
//   Heading4, AlignLeft, Quote, Link2, SeparatorHorizontal, Code, Rows, LayoutGrid, Container, 
//   Columns2, Columns3, Columns4, ListTree } from "lucide-react";

// const ElementSettings = ({ element, onUpdate, onClose }: ElementSettingsProps) => {
//   const handleInputChange = (field: string, value: any) => {
//     onUpdate({ ...element, [field]: value });
//   };

//   const handleOptionsChange = (options: string[]) => {
//     onUpdate({ ...element, options });
//   };

//   const addOption = () => {
//     const currentOptions = element.options || [];
//     handleOptionsChange([...currentOptions, '']);
//   };

//   const updateOption = (index: number, value: string) => {
//     const newOptions = [...(element.options || [])];
//     newOptions[index] = value;
//     handleOptionsChange(newOptions);
//   };

//   const removeOption = (index: number) => {
//     const newOptions = [...(element.options || [])];
//     newOptions.splice(index, 1);
//     handleOptionsChange(newOptions);
//   };

//   const isFieldElement = FIELD_ELEMENTS.some(item => item.type === element.type);
//   const isStaticElement = STATIC_ELEMENTS.some(item => item.type === element.type);
//   const isStructureElement = STRUCTURE_ELEMENTS.some(item => item.type === element.type);
//   const hasOptions = ["select", "multiselect", "radio-group", "checkbox-group", "radio-blocks", "checkbox-blocks", "radio-tabs", "checkbox-tabs"].includes(element.type);
//   const isSlider = ["slider", "range-slider", "vertical-slider"].includes(element.type);
//   const isFileUpload = ["file-upload", "multi-file-upload", "image-upload", "multi-image-upload", "gallery"].includes(element.type);

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold flex items-center gap-2">
//           <X className="h-4 w-4 cursor-pointer" onClick={onClose} />
//           {element.type}
//         </h3>
//       </div>

//       <Tabs defaultValue="properties">
//         <TabsList className="w-full bg-gray-800">
//           <TabsTrigger value="properties">Properties</TabsTrigger>
//           <TabsTrigger value="layout">Layout</TabsTrigger>
//           {isFieldElement && <TabsTrigger value="validation">Validation</TabsTrigger>}
//           {isSlider && <TabsTrigger value="range">Range</TabsTrigger>}
//           {isFileUpload && <TabsTrigger value="upload">Upload Settings</TabsTrigger>}
//         </TabsList>

//         <TabsContent value="properties" className="space-y-4">
//           <div className="space-y-4">
//             {/* Common properties for all elements */}
//             <div className="space-y-2">
//               <Label>Name</Label>
//               <Input
//                 value={element.name || ""}
//                 onChange={(e) => handleInputChange("name", e.target.value)}
//                 className="bg-gray-800"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Label</Label>
//               <Input
//                 value={element.label}
//                 onChange={(e) => handleInputChange("label", e.target.value)}
//                 className="bg-gray-800"
//               />
//             </div>

//             {/* Field element specific properties */}
//             {isFieldElement && (
//               <>
//                 {["text", "email", "password"].includes(element.type) && (
//                   <div className="space-y-2">
//                     <Label>Input Type</Label>
//                     <Select 
//                       value={element.inputType || element.type}
//                       onValueChange={(value) => handleInputChange("inputType", value)}
//                     >
//                       <SelectTrigger className="bg-gray-800">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="text">Text</SelectItem>
//                         <SelectItem value="email">Email</SelectItem>
//                         <SelectItem value="password">Password</SelectItem>
//                         <SelectItem value="number">Number</SelectItem>
//                         <SelectItem value="tel">Phone</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 )}

//                 <div className="space-y-2">
//                   <Label>Placeholder</Label>
//                   <Input
//                     value={element.placeholder || ""}
//                     onChange={(e) => handleInputChange("placeholder", e.target.value)}
//                     className="bg-gray-800"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Properties for both field and static elements */}
//             {(isFieldElement || isStaticElement) && (
//               <>
//                 <div className="space-y-2">
//                   <Label>Tooltip</Label>
//                   <Input
//                     value={element.tooltip || ""}
//                     onChange={(e) => handleInputChange("tooltip", e.target.value)}
//                     className="bg-gray-800"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Description</Label>
//                   <Textarea
//                     value={element.description || ""}
//                     onChange={(e) => handleInputChange("description", e.target.value)}
//                     className="bg-gray-800"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Options section moved here from separate tab */}
//             {hasOptions && (
//               <div className="space-y-4 mt-6 pt-6 border-t border-gray-700">
//                 <Label className="text-lg">Options</Label>
//                 <Button onClick={addOption} variant="outline" className="w-full">
//                   Add Option
//                 </Button>
//                 {(element.options || []).map((option, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <Input
//                       value={option}
//                       onChange={(e) => updateOption(index, e.target.value)}
//                       placeholder={`Option ${index + 1}`}
//                       className="bg-gray-800"
//                     />
//                     <Button 
//                       variant="destructive" 
//                       size="icon"
//                       onClick={() => removeOption(index)}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Structure element specific properties */}
//             {isStructureElement && (
//               <>
//                 <div className="space-y-2">
//                   <Label>Container Type</Label>
//                   <Select 
//                     value={element.type}
//                     onValueChange={(value) => handleInputChange("type", value)}
//                   >
//                     <SelectTrigger className="bg-gray-800">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {STRUCTURE_ELEMENTS.map((item) => (
//                         <SelectItem key={item.type} value={item.type}>
//                           {item.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </>
//             )}
//           </div>
//         </TabsContent>

//         <TabsContent value="layout" className="space-y-4">
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label>Auto Float</Label>
//               <Select
//                 value={element.autoFloat || "Default"}
//                 onValueChange={(value) => handleInputChange("autoFloat", value)}
//               >
//                 <SelectTrigger className="w-[120px] bg-gray-800">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Default">Default</SelectItem>
//                   <SelectItem value="Off">Off</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </TabsContent>

//         {isFieldElement && (
//           <TabsContent value="validation" className="space-y-4">
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <Label>Required</Label>
//                 <Switch
//                   checked={element.required}
//                   onCheckedChange={(checked) => handleInputChange("required", checked)}
//                 />
//               </div>

//               {["text", "email", "password"].includes(element.type) && (
//                 <>
//                   <div className="space-y-2">
//                     <Label>Min Length</Label>
//                     <Input
//                       type="number"
//                       value={element.validation?.minLength || ""}
//                       onChange={(e) =>
//                         handleInputChange("validation", {
//                           ...element.validation,
//                           minLength: parseInt(e.target.value) || undefined,
//                         })
//                       }
//                       className="bg-gray-800"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Max Length</Label>
//                     <Input
//                       type="number"
//                       value={element.validation?.maxLength || ""}
//                       onChange={(e) =>
//                         handleInputChange("validation", {
//                           ...element.validation,
//                           maxLength: parseInt(e.target.value) || undefined,
//                         })
//                       }
//                       className="bg-gray-800"
//                     />
//                   </div>
//                 </>
//               )}
//             </div>
//           </TabsContent>
//         )}

//         {isSlider && (
//           <TabsContent value="range" className="space-y-4">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Min Value</Label>
//                 <Input
//                   type="number"
//                   value={element.validation?.min || 0}
//                   onChange={(e) =>
//                     handleInputChange("validation", {
//                       ...element.validation,
//                       min: parseInt(e.target.value),
//                     })
//                   }
//                   className="bg-gray-800"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Max Value</Label>
//                 <Input
//                   type="number"
//                   value={element.validation?.max || 100}
//                   onChange={(e) =>
//                     handleInputChange("validation", {
//                       ...element.validation,
//                       max: parseInt(e.target.value),
//                     })
//                   }
//                   className="bg-gray-800"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Step</Label>
//                 <Input
//                   type="number"
//                   value={element.validation?.step || 1}
//                   onChange={(e) =>
//                     handleInputChange("validation", {
//                       ...element.validation,
//                       step: parseInt(e.target.value),
//                     })
//                   }
//                   className="bg-gray-800"
//                 />
//               </div>
//             </div>
//           </TabsContent>
//         )}

//         {isFileUpload && (
//           <TabsContent value="upload" className="space-y-4">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Accepted File Types</Label>
//                 <Input
//                   value={element.validation?.accept || ""}
//                   onChange={(e) =>
//                     handleInputChange("validation", {
//                       ...element.validation,
//                       accept: e.target.value,
//                     })
//                   }
//                   placeholder=".jpg,.png,.pdf"
//                   className="bg-gray-800"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Max File Size (MB)</Label>
//                 <Input
//                   type="number"
//                   value={element.validation?.maxSize || ""}
//                   onChange={(e) =>
//                     handleInputChange("validation", {
//                       ...element.validation,
//                       maxSize: parseInt(e.target.value),
//                     })
//                   }
//                   className="bg-gray-800"
//                 />
//               </div>
//               {["multi-file-upload", "multi-image-upload", "gallery"].includes(element.type) && (
//                 <div className="space-y-2">
//                   <Label>Max Number of Files</Label>
//                   <Input
//                     type="number"
//                     value={element.validation?.maxFiles || ""}
//                     onChange={(e) =>
//                       handleInputChange("validation", {
//                         ...element.validation,
//                         maxFiles: parseInt(e.target.value),
//                       })
//                     }
//                     className="bg-gray-800"
//                   />
//                 </div>
//               )}
//             </div>
//           </TabsContent>
//         )}
//       </Tabs>
//     </div>
//   );
// };

// const FIELD_ELEMENTS = [
//   { type: "text", icon: Type, label: "Text Input", description: "Single line text input" },
//   { type: "email", icon: Mail, label: "Email Input", description: "Text field that expects an email" },
//   { type: "password", icon: Lock, label: "Password", description: "Text field that expects a password" },
//   { type: "date", icon: Calendar, label: "Date Picker", description: "Date picker input" },
//   { type: "checkbox", icon: CheckSquare, label: "Checkbox", description: "Plain checkbox input" },
//   { type: "radio", icon: Check, label: "Radio Button", description: "Plain radio input" },
//   { type: "select", icon: List, label: "Select", description: "Select input" },
//   { type: "file", icon: Upload, label: "File Upload", description: "File upload input" },
//   { type: "textarea", icon: Type, label: "Textarea", description: "Single line or multiline text area" },
//   { type: 'checkbox-group', icon: CheckSquare, label: 'Checkbox group', description: 'Plain checkbox options' },
//   { type: 'checkbox-blocks', icon: CheckSquare, label: 'Checkbox blocks', description: 'Checkbox options as blocks' },
//   { type: 'checkbox-tabs', icon: CheckSquare, label: 'Checkbox tabs', description: 'Checkbox options masked as tabs' },
//   // { type: 'radio', icon: Radio, label: 'Radio', description: 'Plain radio input' },
//   { type: 'radio-group', icon: Radio, label: 'Radio group', description: 'Plain radio options' },
//   { type: 'radio-blocks', icon: Radio, label: 'Radio blocks', description: 'Radio options as blocks' },
//   { type: 'radio-tabs', icon: Radio, label: 'Radio tabs', description: 'Radio options masked as tabs' },
//   { type: 'matrix', icon: Grid, label: 'Matrix', description: 'A matrix of input fields' },
//   { type: 'matrix-table', icon: Table2, label: 'Matrix table', description: 'Spreadsheet like table of text inputs' },
//   { type: 'toggle', icon: ToggleLeft, label: 'Toggle', description: 'Toggle / switch button' },
//   // { type: 'select', icon: List, label: 'Select', description: 'Select input' },
//   { type: 'multiselect', icon: List, label: 'Multiselect', description: 'Multiple select input' },
//   { type: 'date-range', icon: Calendar, label: 'Date range', description: 'Date picker that allows date range' },
//   { type: 'slider', icon: Sliders, label: 'Slider', description: 'Horizontal slider' },
//   { type: 'range-slider', icon: Sliders, label: 'Range slider', description: 'Horizontal slider with range' },
//   { type: 'vertical-slider', icon: Sliders, label: 'Vertical slider', description: 'Vertical slider' },
//   { type: 'file-upload', icon: Upload, label: 'File upload', description: 'File upload input' },
//   { type: 'multi-file-upload', icon: Upload, label: 'Multi-file upload', description: 'Multi-file upload input' },
//   { type: 'image-upload', icon: Image, label: 'Image upload', description: 'File upload with image only' },
//   { type: 'multi-image-upload', icon: Images, label: 'Multi-image upload', description: 'Multi-file upload with images only' },
//   { type: 'gallery', icon: Images, label: 'Gallery', description: 'Multi-image upload with gallery view' },
//   { type: 'captcha', icon: FileWarning, label: 'Captcha', description: 'Prevents submission by robots' },
//   { type: 'hidden-input', icon: Lock, label: 'Hidden input', description: 'Single line or multiline text area' },

// ];

// const STATIC_ELEMENTS = [
//   // { type: "h1", icon: Type, label: "H1 header", description: "HTML <h1> tag" },
//   // { type: "h2", icon: Type, label: "H2 header", description: "HTML <h2> tag" },
//   // { type: "h3", icon: Type, label: "H3 header", description: "HTML <h3> tag" },
//   // { type: "p", icon: Type, label: "Paragraph", description: "HTML <p> tag" },
//   // { type: "divider", icon: Type, label: "Divider", description: "HTML <hr> tag" },
//   { type: 'danger-button', icon: AlertTriangle, label: 'Danger button', description: 'Button with danger color' },
//       { type: 'h1', icon: Heading1, label: 'H1 header', description: 'HTML <h1> tag' },
//       { type: 'h2', icon: Heading2, label: 'H2 header', description: 'HTML <h2> tag' },
//       { type: 'h3', icon: Heading3, label: 'H3 header', description: 'HTML <h3> tag' },
//       { type: 'h4', icon: Heading4, label: 'H4 header', description: 'HTML <h4> tag' },
//       { type: 'paragraph', icon: AlignLeft, label: 'Paragraph', description: 'HTML <p> tag' },
//       { type: 'quote', icon: Quote, label: 'Quote', description: 'HTML <quote> tag' },
//       { type: 'image', icon: Image, label: 'Image', description: 'HTML <img> tag' },
//       { type: 'link', icon: Link2, label: 'Link', description: 'HTML <a> tag' },
//       { type: 'divider', icon: SeparatorHorizontal, label: 'Divider', description: 'HTML <hr> tag' },
//       { type: 'static-html', icon: Code, label: 'Static HTML', description: 'Plain HTML element' },
// ];

// const STRUCTURE_ELEMENTS = [
//   { type: 'tabs', icon: Rows, label: 'Tabs', description: 'Break forms into tabs' },
//   { type: 'steps', icon: List, label: 'Steps', description: 'Break forms into steps' },
//   { type: 'grid', icon: LayoutGrid, label: 'Grid', description: 'Create complex layouts' },
//   { type: 'table', icon: Table2, label: 'Table', description: 'Organize data in rows and columns' },
//   { type: 'container', icon: Container, label: 'Container', description: 'A container to group elements' },
//   { type: '2-columns', icon: Columns2, label: '2 columns', description: 'Two columns next to each other' },
//   { type: '3-columns', icon: Columns3, label: '3 columns', description: 'Three columns next to each other' },
//   { type: '4-columns', icon: Columns4, label: '4 columns', description: 'Four columns next to each other' },
//   { type: 'list', icon: List, label: 'List', description: 'Repeatable single element' },
//   { type: 'nested-list', icon: ListTree, label: 'Nested list', description: 'Repeatable elements in an object' },
// ];

// export default ElementSettings;


import { ElementSettingsProps, FormElement } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Type, Mail, Lock, Calendar, CheckSquare, Check, List, Upload, Radio, Grid, Table2, 
  ToggleLeft, Sliders, Image, Images, FileWarning, AlertTriangle, Heading1, Heading2, Heading3, 
  Heading4, AlignLeft, Quote, Link2, SeparatorHorizontal, Code, Rows, LayoutGrid, Container, 
  Columns2, Columns3, Columns4, ListTree,ChevronDown, ChevronUp } from "lucide-react";
  
  import { useState } from "react";

  const ElementSettings = ({ element, onUpdate, onClose }: ElementSettingsProps) => {

    

    const [isLabelStylingExpanded, setIsLabelStylingExpanded] = useState(true); // Default: expanded
    const [isFieldStylingExpanded, setIsFieldStylingExpanded] = useState(false); 
    
    const handleInputChange = (field: string, value: any) => {
      onUpdate({ ...element, [field]: value });
    };
  
    const handleOptionsChange = (options: string[]) => {
      const updatedElement: FormElement = {
        ...element,
        options: options || [], // Ensure options is always an array
        value: element.value || (options.length > 0 ? options[0] : undefined),
      };
      onUpdate(updatedElement);
    };
  
    const addOption = () => {
      const currentOptions = Array.isArray(element.options) ? element.options : []; // Fallback to empty array
      const newOptionIndex = currentOptions.length + 1;
      const newOption = `Option ${newOptionIndex}`;
      handleOptionsChange([...currentOptions, newOption]);
    };
  
    const updateOption = (index: number, value: string) => {
      const currentOptions = Array.isArray(element.options) ? [...element.options] : [];
      currentOptions[index] = value.trim() || `Option ${index + 1}`;
      handleOptionsChange(currentOptions);
    };
  
    const removeOption = (index: number) => {
      if (!Array.isArray(element.options)) return;
      const currentOptions = [...element.options];
      currentOptions.splice(index, 1);
      handleOptionsChange(currentOptions);
    };
  

    const handleLabelStyleChange = (field: string, value: string) => {
      const updatedLabelStyles = { ...element.labelStyles, [field]: value };
      onUpdate({ ...element, labelStyles: updatedLabelStyles });
    };
  
    const handleFieldStyleChange = (field: string, value: string) => {
      const updatedFieldStyles = { ...element.fieldStyles, [field]: value };
      onUpdate({ ...element, fieldStyles: updatedFieldStyles });
    };
  
    
  const isFieldElement = FIELD_ELEMENTS.some(item => item.type === element.type);
  const isStaticElement = STATIC_ELEMENTS.some(item => item.type === element.type);
  const isStructureElement = STRUCTURE_ELEMENTS.some(item => item.type === element.type);
  const hasOptions = ["select", "multiselect", "radio-group", "checkbox-group", "radio-blocks", "checkbox-tabs","checkbox","radio"].includes(element.type);
  const isSlider = ["slider", "range-slider", "vertical-slider"].includes(element.type);
  const isFileUpload = ["file-upload", "multi-file-upload", "image-upload", "multi-image-upload", "gallery"].includes(element.type);

  console.log("Current element:", element);
  console.log("Has options:", hasOptions);
  console.log("Current options:", element.options);

  return (
    <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
          <X className="h-4 w-4 cursor-pointer" onClick={onClose} />
          {element.type}
        </h3>
      </div>

      <Tabs defaultValue="properties">
        <TabsList className="w-full bg-gray-800">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          {isFieldElement && <TabsTrigger value="validation">Validation</TabsTrigger>}
          {isSlider && <TabsTrigger value="range">Range</TabsTrigger>}
          {isFileUpload && <TabsTrigger value="upload">Upload Settings</TabsTrigger>}
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Name</Label>
              <Input
                value={element.name || ""}
                disabled={true}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Label</Label>
              <Input
                value={element.label}
                onChange={(e) => handleInputChange("label", e.target.value)}
                className="bg-gray-800 text-white"
              />
            </div>

            {isFieldElement && (
              <>
                {["text", "email", "password"].includes(element.type) && (
                  <div className="space-y-2">
                    <Label className="text-white">Input Type</Label>
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
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={element.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-gray-800 text-white"
                  />
                </div>
              </>
            )}

{hasOptions && (
              <div className="space-y-4 mt-6 pt-6 border-t border-gray-700">
                <Label className="text-lg text-white">Options</Label>
                <Button
                  onClick={addOption}
                  variant="outline"
                  className="w-full bg-gray-800 text-white hover:bg-gray-700"
                >
                  Add Option
                </Button>
                {Array.isArray(element.options) &&
                  element.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="bg-gray-800 text-white"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
            {/* {hasOptions && (
              <div className="space-y-4 mt-6 pt-6 border-t border-gray-700">
                <Label className="text-lg text-white">Options</Label>
                <Button
                  onClick={addOption}
                  variant="outline"
                  className="w-full bg-gray-800 text-white hover:bg-gray-700"
                >
                  Add Option
                </Button>
                {Array.isArray(element.options) &&
                  element.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="bg-gray-800 text-white"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            )} */}

            {isStructureElement && (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Container Type</Label>
                  <Select 
                    value={element.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger className="bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STRUCTURE_ELEMENTS.map((item) => (
                        <SelectItem key={item.type} value={item.type}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
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
                checked={element.nestedData ?? false}
                onCheckedChange={(checked) => handleInputChange("nestedData", checked)}
              />
            </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <div className="space-y-4">
    <div
      className="flex items-center justify-between cursor-pointer"
      onClick={() => setIsLabelStylingExpanded(!isLabelStylingExpanded)}
    >
      <Label className="text-white">Label Styling</Label>
      <Button variant="ghost" size="icon">
        {isLabelStylingExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
    </div>
    {isLabelStylingExpanded && (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white">Label Margin</Label>
          <Input
          type="number"
            value={element.labelStyles?.margin?.replace("px", "") || ""}
            onChange={(e) => handleLabelStyleChange("margin",  `${e.target.value}px`)}
            placeholder="e.g., 10"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Label Padding</Label>
          <Input
          type="number"
            value={element.labelStyles?.padding?.replace("px", "") || ""}
            onChange={(e) => handleLabelStyleChange("padding",  `${e.target.value}px`)}
            placeholder="e.g., 10"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Label Font Size</Label>
          <Input
          type="number"
            value={element.labelStyles?.fontSize?.replace("px", "") || ""}
            onChange={(e) => handleLabelStyleChange("fontSize",  `${e.target.value}px`)}
            placeholder="e.g., 16"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Label Font Weight</Label>
          <Input
          type="number"
            value={element.labelStyles?.fontWeight || ""}
            onChange={(e) => handleLabelStyleChange("fontWeight", e.target.value)}
            placeholder="e.g., bold"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Label Color</Label>
          <Input
            value={element.labelStyles?.color || ""}
            onChange={(e) => handleLabelStyleChange("color", e.target.value)}
            placeholder="e.g., #000000"
            className="bg-gray-800 text-white"
          />
        </div>
      </div>
    )}
  </div>

  {/* Field Styling Section */}
  <div className="space-y-4">
    <div
      className="flex items-center justify-between cursor-pointer"
      onClick={() => setIsFieldStylingExpanded(!isFieldStylingExpanded)}
    >
      <Label className="text-white">Field Styling</Label>
      <Button variant="ghost" size="icon">
        {isFieldStylingExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
    </div>
    {isFieldStylingExpanded && (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white">Field Margin</Label>
          <Input
          type="number"
            value={element.fieldStyles?.margin?.replace("px", "") || ""}
            onChange={(e) => handleFieldStyleChange("margin",  `${e.target.value}px`)}
            placeholder="e.g., 10"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Field Padding</Label>
          <Input
          type="number"
            value={element.fieldStyles?.padding?.replace("px", "") || ""}
            onChange={(e) => handleFieldStyleChange("padding",  `${e.target.value}px`)}
            placeholder="e.g., 10"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Field Width</Label>
          <Input  
          type="number"
            value={element.fieldStyles?.width?.replace("px", "") || ""}
            onChange={(e) => handleFieldStyleChange("width",  `${e.target.value}px`)}
            placeholder="e.g., 100%"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Field Height</Label>
          <Input  
          type="number"
            value={element.fieldStyles?.height?.replace("px", "") || ""}
            onChange={(e) => handleFieldStyleChange("height",  `${e.target.value}px`)}
            placeholder="e.g., 50"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Field Background Color</Label>
          <Input
            value={element.fieldStyles?.backgroundColor || ""}
            onChange={(e) => handleFieldStyleChange("backgroundColor", e.target.value)}
            placeholder="e.g., #ffffff"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Field Border</Label>
          <Input
            value={element.fieldStyles?.border || ""}
            onChange={(e) => handleFieldStyleChange("border", e.target.value)}
            placeholder="e.g., 1px solid #000000"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Field Border Radius</Label>
          <Input
          type="number"
            value={element.fieldStyles?.borderRadius?.replace("px", "") || ""}
            onChange={(e) => handleFieldStyleChange("borderRadius",  `${e.target.value}px`)}
            placeholder="e.g., 5"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Field Font Size</Label>
          <Input  
          type="number"
            value={element.fieldStyles?.fontSize?.replace("px", "") || ""}
            onChange={(e) => handleFieldStyleChange("fontSize",  `${e.target.value}px`)}
            placeholder="e.g., 16"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Field Font Weight</Label>
          <Input  
            value={element.fieldStyles?.fontWeight || ""}
            onChange={(e) => handleFieldStyleChange("fontWeight", e.target.value)}
            placeholder="e.g., bold"
            className="bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Field Color</Label>
          <Input
            value={element.fieldStyles?.color || ""}
            onChange={(e) => handleFieldStyleChange("color", e.target.value)}
            placeholder="e.g., #000000"
            className="bg-gray-800 text-white"
          />
        </div>
      </div>
    )}
  </div>
        
        </TabsContent>

        {isFieldElement && (
          <TabsContent value="validation" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Required</Label>
                <Switch
                  checked={element.required}
                  onCheckedChange={(checked) => handleInputChange("required", checked)}
                />
              </div>

              {["text", "email", "password"].includes(element.type) && (
                <>
                  <div className="space-y-2">
                    <Label className="text-white">Min Length</Label>
                    <Input
                      type="number"
                      value={element.validation?.minLength || ""}
                      onChange={(e) =>
                        handleInputChange("validation", {
                          ...element.validation,
                          minLength: parseInt(e.target.value) || undefined,
                        })
                      }
                      className="bg-gray-800 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Max Length</Label>
                    <Input
                      type="number"
                      value={element.validation?.maxLength || ""}
                      onChange={(e) =>
                        handleInputChange("validation", {
                          ...element.validation,
                          maxLength: parseInt(e.target.value) || undefined,
                        })
                      }
                      className="bg-gray-800 text-white"
                    />
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        )}

        {isSlider && (
          <TabsContent value="range" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Min Value</Label>
                <Input
                  type="number"
                  value={element.validation?.min || 0}
                  onChange={(e) =>
                    handleInputChange("validation", {
                      ...element.validation,
                      min: parseInt(e.target.value),
                    })
                  }
                  className="bg-gray-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Max Value</Label>
                <Input
                  type="number"
                  value={element.validation?.max || 100}
                  onChange={(e) =>
                    handleInputChange("validation", {
                      ...element.validation,
                      max: parseInt(e.target.value),
                    })
                  }
                  className="bg-gray-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Step</Label>
                <Input
                  type="number"
                  value={element.validation?.step || 1}
                  onChange={(e) =>
                    handleInputChange("validation", {
                      ...element.validation,
                      step: parseInt(e.target.value),
                    })
                  }
                  className="bg-gray-800 text-white"
                />
              </div>
            </div>
          </TabsContent>
        )}

        {isFileUpload && (
          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Accepted File Types</Label>
                <Input
                  value={element.validation?.accept || ""}
                  onChange={(e) =>
                    handleInputChange("validation", {
                      ...element.validation,
                      accept: e.target.value,
                    })
                  }
                  placeholder=".jpg,.png,.pdf"
                  className="bg-gray-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Max File Size (MB)</Label>
                <Input
                  type="number"
                  value={element.validation?.maxSize || ""}
                  onChange={(e) =>
                    handleInputChange("validation", {
                      ...element.validation,
                      maxSize: parseInt(e.target.value),
                    })
                  }
                  className="bg-gray-800 text-white"
                />
              </div>
              {["multi-file-upload", "multi-image-upload", "gallery"].includes(element.type) && (
                <div className="space-y-2">
                  <Label className="text-white">Max Number of Files</Label>
                  <Input
                    type="number"
                    value={element.validation?.maxFiles || ""}
                    onChange={(e) =>
                      handleInputChange("validation", {
                        ...element.validation,
                        maxFiles: parseInt(e.target.value),
                      })
                    }
                    className="bg-gray-800 text-white"
                  />
                </div>
              )}
            </div>
            
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

const FIELD_ELEMENTS = [
  { type: "text", icon: Type, label: "Text Input", description: "Single line text input" },
  { type: "email", icon: Mail, label: "Email Input", description: "Text field that expects an email" },
  { type: "password", icon: Lock, label: "Password", description: "Text field that expects a password" },
  { type: "date", icon: Calendar, label: "Date Picker", description: "Date picker input" },
  { type: "checkbox", icon: CheckSquare, label: "Checkbox", description: "Plain checkbox input" },
  { type: "radio", icon: Check, label: "Radio Button", description: "Plain radio input" },
  { type: "select", icon: List, label: "Select", description: "Select input" },
  { type: "file", icon: Upload, label: "File Upload", description: "File upload input" },
  { type: "textarea", icon: Type, label: "Textarea", description: "Single line or multiline text area" },
  { type: 'checkbox-group', icon: CheckSquare, label: 'Checkbox group', description: 'Plain checkbox options' },
  { type: 'checkbox-blocks', icon: CheckSquare, label: 'Checkbox blocks', description: 'Checkbox options as blocks' },
  { type: 'checkbox-tabs', icon: CheckSquare, label: 'Checkbox tabs', description: 'Checkbox options masked as tabs' },
  { type: 'radio-group', icon: Radio, label: 'Radio group', description: 'Plain radio options' },
  { type: 'radio-blocks', icon: Radio, label: 'Radio blocks', description: 'Radio options as blocks' },
  { type: 'radio-tabs', icon: Radio, label: 'Radio tabs', description: 'Radio options masked as tabs' },
  { type: 'matrix', icon: Grid, label: 'Matrix', description: 'A matrix of input fields' },
  { type: 'matrix-table', icon: Table2, label: 'Matrix table', description: 'Spreadsheet like table of text inputs' },
  { type: 'toggle', icon: ToggleLeft, label: 'Toggle', description: 'Toggle / switch button' },
  { type: 'file-upload', icon: Upload, label: 'File upload', description: 'File upload input' },
  { type: 'multi-file-upload', icon: Upload, label: 'Multi-file upload', description: 'Multi-file upload input' },
  { type: 'image-upload', icon: Image, label: 'Image upload', description: 'File upload with image only' },
  { type: 'multi-image-upload', icon: Images, label: 'Multi-image upload', description: 'Multi-file upload with images only' },
  { type: 'gallery', icon: Images, label: 'Gallery', description: 'Multi-image upload with gallery view' },
  { type: 'captcha', icon: FileWarning, label: 'Captcha', description: 'Prevents submission by robots' },
  { type: 'hidden-input', icon: Lock, label: 'Hidden input', description: 'Single line or multiline text area' },
];

const STATIC_ELEMENTS = [
  { type: 'danger-button', icon: AlertTriangle, label: 'Danger button', description: 'Button with danger color' },
  { type: 'h1', icon: Heading1, label: 'H1 header', description: 'HTML <h1> tag' },
  { type: 'h2', icon: Heading2, label: 'H2 header', description: 'HTML <h2> tag' },
  { type: 'h3', icon: Heading3, label: 'H3 header', description: 'HTML <h3> tag' },
  { type: 'h4', icon: Heading4, label: 'H4 header', description: 'HTML <h4> tag' },
  { type: 'paragraph', icon: AlignLeft, label: 'Paragraph', description: 'HTML <p> tag' },
  { type: 'quote', icon: Quote, label: 'Quote', description: 'HTML <quote> tag' },
  { type: 'image', icon: Image, label: 'Image', description: 'HTML <img> tag' },
  { type: 'link', icon: Link2, label: 'Link', description: 'HTML <a> tag' },
  { type: 'divider', icon: SeparatorHorizontal, label: 'Divider', description: 'HTML <hr> tag' },
  { type: 'static-html', icon: Code, label: 'Static HTML', description: 'Plain HTML element' },
];

const STRUCTURE_ELEMENTS = [
  { type: 'tabs', icon: Rows, label: 'Tabs', description: 'Break forms into tabs' },
  { type: 'steps', icon: List, label: 'Steps', description: 'Break forms into steps' },
  { type: 'grid', icon: LayoutGrid, label: 'Grid', description: 'Create complex layouts' },
  { type: 'table', icon: Table2, label: 'Table', description: 'Organize data in rows and columns' },
  { type: 'container', icon: Container, label: 'Container', description: 'A container to group elements' },
  { type: '2-columns', icon: Columns2, label: '2 columns', description: 'Two columns next to each other' },
  { type: '3-columns', icon: Columns3, label: '3 columns', description: 'Three columns next to each other' },
  { type: '4-columns', icon: Columns4, label: '4 columns', description: 'Four columns next to each other' },
  { type: 'list', icon: List, label: 'List', description: 'Repeatable single element' },
  { type: 'nested-list', icon: ListTree, label: 'Nested list', description: 'Repeatable elements in an object' },
];

export default ElementSettings;