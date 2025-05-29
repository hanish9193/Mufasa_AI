
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
      ${scrollY > 50 
        ? 'backdrop-blur-2xl bg-black/40 border-b border-white/20 shadow-2xl shadow-black/30' 
        : 'backdrop-blur-xl bg-black/20 border-b border-white/10'
      }
    `}>
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-pulse opacity-50"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute top-4 right-1/3 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1 right-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between relative">
          
          {/* Enhanced Logo */}
          <Link to="/" className="group flex items-center gap-3 transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-2 rounded-xl border border-white/20 backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-white/90" />
              </div>
            </div>
            <div className="relative">
              <span className="font-bold text-3xl bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                Mufasa
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent blur-sm group-hover:blur-md transition-all duration-300"></div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {[
              { to: "/categories", label: "Categories" },
              { to: "/trending", label: "Trending" },
              { to: "/submit-tool", label: "Submit Tool" }
            ].map((item, index) => (
              <Link 
                key={item.to}
                to={item.to} 
                className="group relative px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Background glass effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"></div>
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-all duration-300"></div>
                
                {/* Text with gradient */}
                <span className="relative text-white/80 group-hover:text-white transition-all duration-300 font-medium tracking-wide">
                  {item.label}
                </span>
                
                {/* Hover underline effect */}
                <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-white/60 to-white/80 rounded-full group-hover:w-4/5 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative group">
              {/* Enhanced glass container */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-black/30 backdrop-blur-2xl border border-white/20 rounded-3xl p-1 group-hover:border-white/30 transition-all duration-300 shadow-xl">
                
                {/* Search icon with glow */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Search className="text-white/60 group-hover:text-white/80 h-5 w-5 transition-all duration-300" />
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                
                {/* Enhanced input */}
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  className="
                    w-80 pl-12 pr-6 py-3 
                    bg-transparent text-white placeholder:text-white/50
                    focus:outline-none focus:ring-0
                    text-sm font-medium tracking-wide
                    transition-all duration-300
                  "
                />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-focus-within:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 rounded-3xl blur-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu Toggle */}
          <button 
            className="lg:hidden group relative p-3 rounded-2xl transition-all duration-300 hover:scale-110" 
            onClick={toggleMenu}
          >
            {/* Glass background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"></div>
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
            
            {/* Icon with rotation animation */}
            <div className="relative transform transition-all duration-300 group-hover:rotate-90">
              {isMenuOpen ? 
                <X className="text-white w-6 h-6" /> : 
                <Menu className="text-white w-6 h-6" />
              }
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden relative">
          {/* Enhanced glass background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 backdrop-blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"></div>
          
          <div className="relative border-t border-white/20 shadow-2xl">
            <div className="container mx-auto px-6 py-6 space-y-4">
              
              {/* Enhanced Mobile Search */}
              <div className="relative group mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl blur-sm"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-1 group-hover:border-white/30 transition-all duration-300">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Search className="text-white/60 h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search AI tools..."
                    className="w-full pl-12 pr-6 py-3 bg-transparent text-white placeholder:text-white/40 focus:outline-none text-sm"
                  />
                </div>
              </div>
              
              {/* Enhanced Mobile Navigation Links */}
              <div className="space-y-3">
                {[
                  { to: "/categories", label: "Categories" },
                  { to: "/trending", label: "Trending" },
                  { to: "/submit-tool", label: "Submit Tool" }
                ].map((item, index) => (
                  <Link 
                    key={item.to}
                    to={item.to} 
                    className="group relative block"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    {/* Enhanced glass card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
                    
                    <div className="relative py-4 px-6 rounded-2xl transition-all duration-300 group-hover:scale-105">
                      <span className="text-white/80 group-hover:text-white transition-all duration-300 font-medium text-lg tracking-wide">
                        {item.label}
                      </span>
                      
                      {/* Animated accent */}
                      <div className="absolute left-6 bottom-2 w-0 h-0.5 bg-gradient-to-r from-white/60 to-white/80 rounded-full group-hover:w-8 transition-all duration-300"></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
