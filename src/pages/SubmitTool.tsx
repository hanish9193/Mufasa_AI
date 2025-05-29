
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "AI Assistant", "Writing", "Image Generation", "Video Generation", 
  "Audio & Music", "Coding & Development", "Design", "Business & Productivity",
  "Education & Learning", "Research", "Healthcare & Wellness", "Website Building",
  "Data Analysis", "Marketing"
];

const pricingModels = ["Free", "Freemium", "Paid", "Enterprise"];

const SubmitTool = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    category: "",
    pricing: "",
    tags: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Tool submitted successfully!",
      description: "Thank you for contributing to our AI tools directory. We'll review your submission soon.",
    });
    
    setFormData({
      name: "",
      description: "",
      website: "",
      category: "",
      pricing: "",
      tags: ""
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Plus size={32} className="text-white" />
            <h1 className="text-3xl md:text-5xl font-bold text-gradient-white">Submit AI Tool</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help grow our community by submitting your favorite AI tools. All submissions are reviewed before being added to our directory.
          </p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Tool Name *</label>
                <Input
                  type="text"
                  placeholder="Enter tool name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="glass-input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Website URL *</label>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="glass-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <Textarea
                placeholder="Describe what this AI tool does and its key features..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="glass-input min-h-[120px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full glass-input"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Pricing Model *</label>
                <select
                  value={formData.pricing}
                  onChange={(e) => handleInputChange("pricing", e.target.value)}
                  className="w-full glass-input"
                  required
                >
                  <option value="">Select pricing model</option>
                  {pricingModels.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <Input
                type="text"
                placeholder="AI, productivity, automation (comma separated)"
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
                className="glass-input"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Add relevant tags separated by commas to help users find this tool
              </p>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full black-to-dark-card py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Upload className="animate-spin" size={20} />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Check size={20} />
                    Submit Tool for Review
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="black-to-dark-card p-6 text-center">
            <h3 className="font-semibold mb-2">Quick Review</h3>
            <p className="text-sm text-muted-foreground">We review all submissions within 24-48 hours</p>
          </div>
          <div className="black-to-dark-card p-6 text-center">
            <h3 className="font-semibold mb-2">Quality Standards</h3>
            <p className="text-sm text-muted-foreground">Only high-quality, working AI tools are accepted</p>
          </div>
          <div className="black-to-dark-card p-6 text-center">
            <h3 className="font-semibold mb-2">Community Driven</h3>
            <p className="text-sm text-muted-foreground">Help others discover amazing AI tools</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubmitTool;
