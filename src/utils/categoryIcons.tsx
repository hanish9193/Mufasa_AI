
import React from "react";
import { 
  Code, Image, Pen, Bot, Music, Box, Brain, 
  Briefcase, Sparkles, LineChart, FileText, 
  Speech, LayoutGrid, Wallet, VideoIcon 
} from "lucide-react";

// Mapping of icons to category names with black glassmorphic design
export const categoryIcons: {[key: string]: React.ReactNode} = {
  'Text Generation': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Code size={28} className="text-white" />
  </div>,
  'Image Generation': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Image size={28} className="text-white" />
  </div>,
  'Voice & Speech': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Speech size={28} className="text-white" />
  </div>,
  'Video Generation': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <VideoIcon size={28} className="text-white" />
  </div>,
  'Code Assistance': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <LayoutGrid size={28} className="text-white" />
  </div>,
  'Data Analysis': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Brain size={28} className="text-white" />
  </div>,
  'Design': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Pen size={28} className="text-white" />
  </div>,
  'Research': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Briefcase size={28} className="text-white" />
  </div>,
  'Productivity': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Sparkles size={28} className="text-white" />
  </div>,
  'Marketing': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <LineChart size={28} className="text-white" />
  </div>,
  'Writing': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <FileText size={28} className="text-white" />
  </div>,
  'Chat & Conversation': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Bot size={28} className="text-white" />
  </div>,
  'Music Generation': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Music size={28} className="text-white" />
  </div>,
  'Education': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Box size={28} className="text-white" />
  </div>,
  'Business': <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Wallet size={28} className="text-white" />
  </div>
};

// Utility function to get icon for a category
export const getCategoryIcon = (categoryName: string): React.ReactNode => {
  return categoryIcons[categoryName] || <div className="w-12 h-12 flex items-center justify-center black-to-dark-card rounded-lg pulse-glow">
    <Box size={28} className="text-white" />
  </div>;
};

// Utility function to format category ID
export const formatCategoryId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};
