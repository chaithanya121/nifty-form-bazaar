
// export type FormElementType = 
//   | "text" | "email" | "password" | "date" | "file" | "textarea" | "checkbox" 
//   | "radio" | "select" | "h1" | "h2" | "h3" | "h4" | "p" | "divider" | "container"
//   | "matrix" | "matrix-table" | "tabs" | "steps" | "grid" | "2-columns" | "3-columns"
//   | "4-columns" | "table" | "list" | "nested-list" | "url" | "phone" | "hidden-input"
//   | "multiselect" | "checkbox-group" | "checkbox-blocks" | "checkbox-tabs"
//   | "radio-group" | "radio-blocks" | "radio-tabs" | "toggle" | "slider"
//   | "range-slider" | "vertical-slider" | "file-upload" | "multi-file-upload"
//   | "image-upload" | "multi-image-upload" | "gallery" | "paragraph" | "quote"
//   | "image" | "link" | "danger-button" | "static-html";

// export interface FormElement {
//   id: string;
//   type: string;
//   label: string;
//   required: boolean;
//   placeholder?: string;
//   options?: string[];
//   value?: string;
//   description?: string;
//   validation?: {
//     pattern?: string;
//     min?: number;
//     max?: number;
//     minLength?: number;
//     maxLength?: number;
//   };
//   tooltip?: string;
//   nestedData?: boolean;
//   name?: string;
//   submitData?: boolean;
//   autoFloat?: "Default" | "Off";
//   decorators?: {
//     required?: boolean;
//     readonly?: boolean;
//     disabled?: boolean;
//   };
//   inputType?: string;
// }

// export interface FormConfig {
//   name: string;
//   elements: FormElement[];
//   settings: {
//     preview: {
//       width: "Full" | number;
//       nesting: boolean;
//     };
//     validation: {
//       liveValidation: "Default" | "On" | "Off";
//     };
//     layout: {
//       size: "Default" | "Small" | "Medium" | "Large";
//       columns: {
//         default: boolean;
//         tablet: boolean;
//         desktop: boolean;
//       };
//       labels: "Default" | "On" | "Off";
//       placeholders: "Default" | "On" | "Off";
//       errors: "Default" | "On" | "Off";
//       messages: "Default" | "On" | "Off";
//     };
//   };
// }

// export interface DragStartProps {
//   onDragStart: (e: React.DragEvent<HTMLDivElement>, elementType: string) => void;
// }

// export interface FormCanvasProps {
//   elements: FormElement[];
//   setFormConfig: React.Dispatch<React.SetStateAction<FormConfig>>;
//   onSelectElement: (element: FormElement) => void;
//   selectedElement?: FormElement;
// }

// export interface FormPreviewProps {
//   formConfig: FormConfig;
// }

// export interface ElementSettingsProps {
//   element: FormElement;
//   onUpdate: (updatedElement: FormElement) => void;
//   onClose: () => void;
// }

export type FormElementType = 
  | "text" | "email" | "password" | "date" | "file" | "textarea" | "checkbox" 
  | "radio" | "select" | "h1" | "h2" | "h3" | "h4" | "p" | "divider" | "container"
  | "matrix" | "matrix-table" | "tabs" | "steps" | "grid" | "2-columns" | "3-columns"
  | "4-columns" | "table" | "list" | "nested-list" | "url" | "phone" | "hidden-input"
  | "multiselect" | "checkbox-group" | "checkbox-blocks" | "checkbox-tabs"
  | "radio-group" | "radio-blocks" | "radio-tabs" | "toggle" | "slider"
  | "range-slider" | "vertical-slider" | "file-upload" | "multi-file-upload"
  | "image-upload" | "multi-image-upload" | "gallery" | "paragraph" | "quote"
  | "image" | "link" | "danger-button" | "static-html";

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  value?: string;
  description?: string;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    step?: number;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
  };
  tooltip?: string;
  nestedData?: boolean;
  name?: string;
  submitData?: boolean;
  autoFloat?: "Default" | "Off";
  decorators?: {
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
  };
  inputType?: string;
  styles?: {
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    fontFamily?: string;
  };
  labelStyles?: {
    margin?: string;
    padding?: string;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    fontFamily?: string;
  };
  fieldStyles?: {
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    fontFamily?: string;
  };
}

export interface FormConfig {
  name: string;
  elements: FormElement[];
  settings: {
    preview: {
      width: "Full" | number;
      nesting: boolean;
    };
    validation: {
      liveValidation: "Default" | "On" | "Off";
    };
    layout: {
      size: "Default" | "Small" | "Medium" | "Large";
      columns: {
        default: boolean;
        tablet: boolean;
        desktop: boolean;
      };
      labels: "Default" | "On" | "Off";
      placeholders: "Default" | "On" | "Off";
      errors: "Default" | "On" | "Off";
      messages: "Default" | "On" | "Off";
    };
    canvasStyles?: {
      backgroundColor?: string;
      backgroundImage?: string;
      padding?: string;
      margin?: string;
      borderRadius?: string;
    };
    termsAndConditions: {
      enabled: boolean;
      required: boolean;
      text: string;
      helpText?: string;
    };
    submitButton: {
      enabled: boolean;
      text: string;
      styles?: {
        margin?: string;
        padding?: string;
        width?: string;
        height?: string;
        backgroundColor?: string;
        border?: string;
        borderRadius?: string;
        fontSize?: string;
        fontWeight?: string;
        color?: string;
        fontFamily?: string;
      };
    };
  };
}

export interface DragStartProps {
  onDragStart: (e: React.DragEvent<HTMLDivElement>, elementType: string) => void;
}

export interface FormCanvasProps {
  elements: FormElement[];
  setFormConfig: React.Dispatch<React.SetStateAction<FormConfig>>;
  onSelectElement: (element: FormElement) => void;
  onUpdate: (updatedElement: FormElement) => void;
  selectedElement?: FormElement;
  formConfig: FormConfig;
}

export interface FormPreviewProps {
  formConfig: FormConfig;
}

export interface ElementSettingsProps {
  element: FormElement;
  onUpdate: (updatedElement: FormElement) => void;
  onClose: () => void;
}