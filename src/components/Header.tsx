
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/40 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 backdrop-blur-lg supports-[backdrop-filter]:bg-gray-900/70">
      <div className="w-full flex h-16 items-center px-4 md:px-6">
        <div className="mr-8 flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 md:hidden text-gray-300 hover:bg-gray-800">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center space-x-3">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                duration: 0.5 
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
            >
              <FilePlus className="h-4 w-4 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="hidden font-bold text-xl bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent sm:inline-block">Form Builder</span>
              <span className="hidden text-xs text-blue-400 -mt-1 sm:inline-block">Pro</span>
            </div>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2 text-gray-300 hover:text-white hover:bg-gray-800")}>
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/forms">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2 text-gray-300 hover:text-white hover:bg-gray-800")}>
                    <FileText className="h-4 w-4" />
                    <span>Forms</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/create">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2 text-gray-300 hover:text-white hover:bg-gray-800")}>
                    <FilePlus className="h-4 w-4" />
                    <span>Create</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center space-x-1">
            <Button variant="ghost" size="icon" asChild className="text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl">
              <Link to="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl">
              <Link to="/forms">
                <FileText className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl">
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
                    <Avatar className="h-10 w-10 border border-slate-600 shadow-md transition-all duration-200 hover:border-blue-500">
                      <AvatarImage src={user?.avatar || undefined} alt={user?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-900 text-gray-200">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700 text-gray-200 shadow-xl rounded-xl">
                  <div className="flex items-center justify-start gap-2 p-3 border-b border-slate-700">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || undefined} alt={user?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-900 text-gray-200">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuItem 
                    onClick={() => setSettingsOpen(true)}
                    className="cursor-pointer hover:bg-slate-700 py-2.5 mt-1"
                  >
                    <Settings className="mr-2 h-4 w-4 text-blue-400" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer hover:bg-slate-700 py-2.5"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-red-400" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  onClick={handleOpenSignIn}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleOpenSignUp}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white hidden sm:flex border-0 shadow-md rounded-xl"
                >
                  Register
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleOpenSignIn}
                  className="sm:hidden text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl"
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
