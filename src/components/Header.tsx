
import { Button } from "@/components/ui/button";
import { Menu, Home, FileText, FilePlus, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center">
        <div className="mr-8 flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center space-x-3">
            <FilePlus className="h-6 w-6 text-primary" />
            <span className="hidden font-bold text-xl text-primary sm:inline-block">Form Builder</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between">
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/templates">
                <FileText className="h-4 w-4" />
                <span>Form Templates</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/create">
                <FilePlus className="h-4 w-4" />
                <span>Form Create</span>
              </Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center space-x-1">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/templates">
                <FileText className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/create">
                <FilePlus className="h-5 w-5" />
              </Link>
            </Button>
          </nav>

          {/* Auth Button - Always visible */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/login">
                <UserCircle className="h-4 w-4" />
                <span className="hidden sm:inline-block">Login / Sign Up</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
