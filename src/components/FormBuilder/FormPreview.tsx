
import { FormPreviewProps } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const FormPreview = ({ formConfig }: FormPreviewProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form Submitted",
      description: "Form data has been collected successfully",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Form Preview</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formConfig.elements.map((element) => (
          <div key={element.id} className="space-y-2">
            <Label htmlFor={element.id}>{element.label}</Label>
            <Input
              id={element.id}
              type={element.type}
              placeholder={element.placeholder}
              required={element.required}
            />
          </div>
        ))}
        <Button type="submit">Submit Form</Button>
      </form>
    </div>
  );
};

export default FormPreview;
