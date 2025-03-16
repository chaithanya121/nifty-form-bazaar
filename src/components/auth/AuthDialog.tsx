
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "signin" | "signup";
}

export function AuthDialog({ isOpen, onOpenChange, defaultTab = "signin" }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(defaultTab);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {activeTab === "signin" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            {activeTab === "signin" 
              ? "Sign in to your account to continue" 
              : "Register to create forms and collect responses"}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          defaultValue={activeTab} 
          onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
          className="w-full mt-4"
        >
          <TabsList className="grid w-full grid-cols-2 bg-gray-700">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignInForm onSuccess={() => onOpenChange(false)} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm onSuccess={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
