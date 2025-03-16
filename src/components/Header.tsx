
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Home, FileText, FilePlus, UserCircle, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthDialog } from "./auth/AuthDialog";
import { UserSettings } from "./settings/UserSettings";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const handleOpenSignIn = () => {
    setAuthTab("signin");
    setAuthDialogOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthTab("signup");
    setAuthDialogOpen(true);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="w-full flex h-16 items-center px-4 md:px-6">
        <div className="mr-8 flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 md:hidden">
            <Menu className="h-5 w-5 text-gray-300" />
          </Button>
          <Link to="/" className="flex items-center space-x-3">
            <FilePlus className="h-6 w-6 text-blue-500" />
            <span className="hidden font-bold text-xl text-white sm:inline-block">Form Builder</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between">
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild className="gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
              <Link to="/forms">
                <FileText className="h-4 w-4" />
                <span>Forms</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
              <Link to="/create">
                <FilePlus className="h-4 w-4" />
                <span>Create</span>
              </Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center space-x-1">
            <Button variant="ghost" size="icon" asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
              <Link to="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
              <Link to="/forms">
                <FileText className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
              <Link to="/create">
                <FilePlus className="h-5 w-5" />
              </Link>
            </Button>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-gray-700">
                      <AvatarImage src={user?.avatar || undefined} alt={user?.name || ""} />
                      <AvatarFallback className="bg-gray-700 text-gray-200">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 text-gray-200">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem 
                    onClick={() => setSettingsOpen(true)}
                    className="cursor-pointer hover:bg-gray-700"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer hover:bg-gray-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  onClick={handleOpenSignIn}
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleOpenSignUp}
                  className="bg-blue-600 hover:bg-blue-700 text-white hidden sm:flex"
                >
                  Register
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleOpenSignIn}
                  className="sm:hidden text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <UserCircle className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
        defaultTab={authTab}
      />

      {/* User Settings Dialog */}
      <UserSettings 
        isOpen={settingsOpen} 
        onOpenChange={setSettingsOpen} 
      />
    </header>
  );
};

export default Header;
