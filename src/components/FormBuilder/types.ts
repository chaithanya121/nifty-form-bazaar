
export interface FormElement {
  id: string;
  type: string;
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
  };
  tooltip?: string;
  nestedData?: boolean;
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
  };
}

export interface DragStartProps {
  onDragStart: (e: React.DragEvent<HTMLDivElement>, elementType: string) => void;
}

export interface FormCanvasProps {
  elements: FormElement[];
  setFormConfig: React.Dispatch<React.SetStateAction<FormConfig>>;
}

export interface FormPreviewProps {
  formConfig: FormConfig;
}
