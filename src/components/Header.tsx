
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/30 bg-gradient-to-r from-slate-950 via-indigo-950/90 to-slate-950 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden text-blue-100 hover:bg-indigo-900/40">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-3">
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                duration: 0.5 
              }}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 opacity-90"></div>
              <FilePlus className="h-5 w-5 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 opacity-50"></div>
            </motion.div>
            <div className="flex flex-col">
              <motion.span 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="font-bold text-xl bg-gradient-to-r from-white via-blue-200 to-indigo-100 bg-clip-text text-transparent tracking-tight sm:inline-block"
              >
                Form Builder
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-xs font-medium text-indigo-400 -mt-1 tracking-wide sm:inline-block"
              >
                Pro
              </motion.span>
            </div>
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-between">
          <NavigationMenu className="hidden md:flex mx-6">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2 text-blue-100 hover:text-white hover:bg-indigo-900/40 rounded-xl transition-all duration-200")}>
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/forms">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2 text-blue-100 hover:text-white hover:bg-indigo-900/40 rounded-xl transition-all duration-200")}>
                    <FileText className="h-4 w-4" />
                    <span>Forms</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/create">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2 text-blue-100 hover:text-white hover:bg-indigo-900/40 rounded-xl transition-all duration-200")}>
                    <FilePlus className="h-4 w-4" />
                    <span>Create</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center justify-center gap-1">
            <Button variant="ghost" size="icon" asChild className="text-blue-100 hover:text-white hover:bg-indigo-900/40 rounded-xl transition-all duration-200">
              <Link to="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-blue-100 hover:text-white hover:bg-indigo-900/40 rounded-xl transition-all duration-200">
              <Link to="/forms">
                <FileText className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-blue-100 hover:text-white hover:bg-indigo-900/40 rounded-xl transition-all duration-200">
              <Link to="/create">
                <FilePlus className="h-5 w-5" />
              </Link>
            </Button>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-9 w-9 border border-indigo-600/30 ring-2 ring-indigo-500/10 shadow-md transition-all duration-200 hover:ring-indigo-500/40">
                      <AvatarImage src={user?.avatar || undefined} alt={user?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-700 to-indigo-900 text-indigo-100">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900/95 backdrop-blur-md border border-indigo-500/20 text-indigo-100 shadow-xl rounded-xl p-1">
                  <div className="flex items-center gap-3 p-3 border-b border-indigo-500/20">
                    <Avatar className="h-10 w-10 border border-indigo-600/30">
                      <AvatarImage src={user?.avatar || undefined} alt={user?.name || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-700 to-indigo-900 text-indigo-100">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-indigo-300">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuItem 
                    onClick={() => setSettingsOpen(true)}
                    className="cursor-pointer hover:bg-indigo-800/30 py-2.5 mt-1 rounded-lg transition-colors duration-200"
                  >
                    <Settings className="mr-2 h-4 w-4 text-indigo-400" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-indigo-500/20 my-1" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer hover:bg-red-900/20 py-2.5 rounded-lg text-red-300 transition-colors duration-200"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-red-400" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={handleOpenSignIn}
                  className="text-blue-100 hover:text-white hover:bg-indigo-900/40 rounded-xl transition-all duration-200"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleOpenSignUp}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white hidden sm:flex border-0 shadow-md rounded-xl transition-all duration-200"
                >
                  Register
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleOpenSignIn}
                  className="sm:hidden text-blue-100 hover:text-white hover:bg-indigo-900/40 rounded-xl transition-all duration-200"
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
