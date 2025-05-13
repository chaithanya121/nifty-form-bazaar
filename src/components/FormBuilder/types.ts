
import React from "react";

export type FormElementType =
  | "text"
  | "email"
  | "password"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "address"
  | "street-address"
  | "street-address-line2"
  | "city"
  | "state-province"
  | "postal-code"
  | "name"
  | "first-name"
  | "last-name"
  | "appointment"
  | "rating"
  | "captcha"
  | "date"
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "form_submit";

export interface FormConfig {
  name: string;
  elements: FormElement[];
  settings: FormSettings;
}

export interface FormSettings {
  termsAndConditions?: {
    enabled: boolean;
    required: boolean;
    text: string;
  };
  submitButton?: {
    enabled: boolean;
    text: string;
  };
  preview: {
    width: "Full" | "Contained";
    nesting: boolean;
  };
  validation: {
    liveValidation: "Default" | "Custom";
  };
  layout: {
    size: "Default" | "Small" | "Large";
    columns: {
      default: boolean;
      tablet: boolean;
      desktop: boolean;
    };
    labels: "Default" | "Floating" | "Hidden";
    placeholders: "Default" | "Hide Labels" | "Custom";
    errors: "Default" | "Custom";
    messages: "Default" | "Custom";
  };
  canvasStyles?: React.CSSProperties;
}

export interface FormCanvasProps {
  elements: FormElement[];
  setFormConfig: React.Dispatch<React.SetStateAction<FormConfig>>;
  onSelectElement: (element: FormElement) => void;
  selectedElement?: FormElement;
  formConfig: FormConfig;
  onUpdate: (element: FormElement) => void;
}

// Export types
export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  name?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  nestedData?: boolean;
  options?: string[];
  value?: string;
  labelStyles?: React.CSSProperties;
  fieldStyles?: React.CSSProperties;
  layout?: {
    inRow?: boolean;
    rowPosition?: number;
    rowId?: string;
  };
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    step?: number;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
  };
  tooltip?: string;
  inputType?: string;
  submitData?: boolean;
}

export interface FormElementProps {
  element: FormElement;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

// Add missing interfaces
export interface ElementSettingsProps {
  element: FormElement;
  onUpdate: (element: FormElement) => void;
  onClose: () => void;
}

export interface DragStartProps {
  onDragStart: (e: React.DragEvent<HTMLDivElement>, elementType: string) => void;
}

export interface FormElementRendererProps {
  element: FormElement;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
}
