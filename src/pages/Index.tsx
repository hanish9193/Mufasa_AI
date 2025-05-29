
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Make Spline 3D Background the main content */}
      <div className="absolute inset-0 w-full h-full">
        <Spline scene="https://prod.spline.design/XrtsjZL1tr6QhpVl/scene.splinecode" />
      </div>
      
      {/* Search Bar Overlay - positioned below MUFASA text */}
      <div className="absolute top-[53%] left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-10">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <Input 
              type="text"
              placeholder="Search AI tools..."
              className="bg-black/40 backdrop-blur-md border-gray-700 text-white py-3 pl-4 pr-12 rounded-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>

      {/* Black box to cover the Spline watermark in bottom right */}
      <div className="absolute bottom-0 right-0 w-52 h-14 bg-black z-20"></div>
    </div>
  );
};

export default Index;
