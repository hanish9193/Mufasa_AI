
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  tags: string[];
  rating: number;
  priceModel: "Free" | "Freemium" | "Paid" | "Enterprise";
  url: string;
  trending?: boolean;
}

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <div className="black-to-dark-card overflow-hidden relative">
      {tool.trending && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="trending-badge text-xs px-2 py-1">Trending</Badge>
        </div>
      )}
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg black-to-dark-card flex items-center justify-center overflow-hidden pulse-glow">
            <span className="text-2xl font-bold text-white">{tool.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{tool.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="truncate">{tool.category}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-border mx-1"></span>
              <span className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-3 h-3 text-white fill-white" />
                {tool.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">{tool.description}</p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1 mb-3">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-white/20 text-gray-300">{tag}</Badge>
            ))}
            {tool.tags.length > 3 && (
              <Badge variant="outline" className="text-xs border-white/20 text-gray-300">+{tool.tags.length - 3}</Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <Badge 
              variant="secondary"
              className={`
                ${tool.priceModel === "Free" ? "bg-gray-900/30 text-gray-300 border-gray-600/30 hover:bg-gray-900/40" : ""}
                ${tool.priceModel === "Freemium" ? "bg-gray-800/30 text-gray-200 border-gray-500/30 hover:bg-gray-800/40" : ""}
                ${tool.priceModel === "Paid" ? "bg-gray-700/30 text-gray-100 border-gray-400/30 hover:bg-gray-700/40" : ""}
                ${tool.priceModel === "Enterprise" ? "bg-gray-600/30 text-white border-gray-300/30 hover:bg-gray-600/40" : ""}
              `}
            >
              {tool.priceModel}
            </Badge>
            <a 
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white hover:text-gray-300 hover:underline transition-colors"
            >
              Visit Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
