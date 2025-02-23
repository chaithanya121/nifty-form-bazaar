
// import { Card } from "@/components/ui/card";
// import { DragStartProps } from "./types";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { 
//   Type, 
//   AlignLeft, 
//   Check,
//   CheckSquare, 
//   ToggleLeft, 
//   Calendar, 
//   Upload, 
//   List,
//   Mail,
//   Lock,
//   Hash,
//   Radio,
//   Link2,
//   Phone,
//   Map,
//   Globe,
//   Rows,
//   Table2,
//   Heading1,
//   Heading2,
//   Heading3,
//   Heading4,
//   Quote,
//   Image,
//   SeparatorHorizontal,
//   Code,
//   Grid,
//   Columns2,
//   Columns3,
//   Columns4,
//   LayoutGrid,
//   Container,
//   ListTree,
//   Sliders,
//   FileWarning,
//   AlertTriangle,
//   Images
// } from 'lucide-react';
// import { Input } from "@/components/ui/input";

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

// const FormElementLibrary = ({ onDragStart }: DragStartProps) => {
//   return (
//     <div className="space-y-4">
//       <Input 
//         type="search" 
//         placeholder="Search elements" 
//         className="bg-gray-800 border-gray-700 text-white"
//       />
//       <Tabs defaultValue="fields" className="w-full" >
//         <TabsList className="grid w-full grid-cols-3 bg-gray-800 text-white">
//           <TabsTrigger value="fields">Fields</TabsTrigger>
//           <TabsTrigger value="static">Static</TabsTrigger>
//           <TabsTrigger value="structure">Structure</TabsTrigger>
//         </TabsList>
//         <TabsContent value="fields" className="mt-2">
//           <div className="grid gap-2" style={{    height: '705px',overflowY: 'auto'}}>
//             {FIELD_ELEMENTS.map((element) => (
//               <Card
//                 key={element.type}
//                 className="p-3 cursor-move hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700 text-white"
//                 draggable
//                 onDragStart={(e) => onDragStart(e, element.type)}
//               >
//                 <div className="flex items-center gap-2">
//                   <element.icon className="h-4 w-4" />
//                   <div className="flex flex-col">
//                     <span className="text-sm font-medium">{element.label}</span>
//                     <span className="text-xs text-gray-400">{element.description}</span>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//         <TabsContent value="static" className="mt-2">
//           <div className="grid gap-2">
//             {STATIC_ELEMENTS.map((element) => (
//               <Card
//                 key={element.type}
//                 className="p-3 cursor-move hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700  text-white"
//                 draggable
//                 onDragStart={(e) => onDragStart(e, element.type)}
//               >
//                 <div className="flex items-center gap-2">
//                   <element.icon className="h-4 w-4" />
//                   <div className="flex flex-col">
//                     <span className="text-sm font-medium">{element.label}</span>
//                     <span className="text-xs text-gray-400">{element.description}</span>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//         <TabsContent value="structure" className="mt-2">
//           <div className="grid gap-2">
//             {STRUCTURE_ELEMENTS.map((element) => (
//               <Card
//                 key={element.type}
//                 className="p-3 cursor-move hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700  text-white"
//                 draggable
//                 onDragStart={(e) => onDragStart(e, element.type)}
//               >
//                 <div className="flex items-center gap-2">
//                   <element.icon className="h-4 w-4" />
//                   <div className="flex flex-col">
//                     <span className="text-sm font-medium">{element.label}</span>
//                     <span className="text-xs text-gray-400">{element.description}</span>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default FormElementLibrary;



import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { DragStartProps } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Type, 
  AlignLeft, 
  Check,
  CheckSquare, 
  ToggleLeft, 
  Calendar, 
  Upload, 
  List,
  Mail,
  Lock,
  Hash,
  Radio,
  Link2,
  Phone,
  Map,
  Globe,
  Rows,
  Table2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Quote,
  Image,
  SeparatorHorizontal,
  Code,
  Grid,
  Columns2,
  Columns3,
  Columns4,
  LayoutGrid,
  Container,
  ListTree,
  Sliders,
  FileWarning,
  AlertTriangle,
  Images,
  Subm
} from 'lucide-react';
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
  { type: 'multiselect', icon: List, label: 'Multiselect', description: 'Multiple select input' },
  { type: 'date-range', icon: Calendar, label: 'Date range', description: 'Date picker that allows date range' },
  { type: 'slider', icon: Sliders, label: 'Slider', description: 'Horizontal slider' },
  { type: 'range-slider', icon: Sliders, label: 'Range slider', description: 'Horizontal slider with range' },
  { type: 'vertical-slider', icon: Sliders, label: 'Vertical slider', description: 'Vertical slider' },
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
  // { type: 'form_submit', icon: Submit, label: 'Static HTML', description: 'Plain HTML element' },


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

const FormElementLibrary = ({ onDragStart }: DragStartProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('fields');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filterElements = (elements: any[]) => {
    return elements.filter(element =>
      element.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getFilteredElements = () => {
    switch (activeTab) {
      case 'fields':
        return filterElements(FIELD_ELEMENTS);
      case 'static':
        return filterElements(STATIC_ELEMENTS);
      case 'structure':
        return filterElements(STRUCTURE_ELEMENTS);
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4">
      <Input 
        type="search" 
        placeholder="Search elements" 
        className="bg-gray-800 border-gray-700 text-white"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Tabs defaultValue="fields" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 text-white">
          <TabsTrigger value="fields">Fields</TabsTrigger>
          <TabsTrigger value="static">Static</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="fields" className="mt-2">
          <div className="grid gap-2" style={{ height: '705px', overflowY: 'auto' }}>
            {getFilteredElements().map((element) => (
              <Card
                key={element.type}
                className="p-3 cursor-move hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700 text-white"
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
            {getFilteredElements().map((element) => (
              <Card
                key={element.type}
                className="p-3 cursor-move hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700 text-white"
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
            {getFilteredElements().map((element) => (
              <Card
                key={element.type}
                className="p-3 cursor-move hover:bg-gray-700 transition-colors bg-gray-800 border-gray-700 text-white"
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