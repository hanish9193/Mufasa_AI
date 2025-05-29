
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, ThumbsUp, Share2, Bookmark, Check, Loader2 } from "lucide-react";
import { useToolDetail } from "@/hooks/useToolDetail";

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { tool, loading, error } = useToolDetail(id);
  const [bookmarked, setBookmarked] = useState(false);
  const [upvoted, setUpvoted] = useState(false);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading tool information...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !tool) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The tool you're looking for doesn't exist or has been removed."}
          </p>
          <Button asChild>
            <Link to="/search">Browse All Tools</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/categories" className="hover:text-foreground">Categories</Link>
            <span className="mx-2">/</span>
            <Link to={`/categories/${tool.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-foreground">
              {tool.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{tool.name}</span>
          </div>
        </div>
        
        {/* Tool Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
            {tool.logo_url ? (
              <img src={tool.logo_url} alt={tool.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold">{tool.name.charAt(0)}</span>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">{tool.name}</h1>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`gap-2 ${upvoted ? 'bg-ai-purple-100 border-ai-purple-300 text-ai-purple-700' : ''}`}
                  onClick={() => setUpvoted(!upvoted)}
                >
                  {upvoted ? <Check size={16} /> : <ThumbsUp size={16} />}
                  <span>{upvoted ? 'Upvoted' : 'Upvote'}</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`gap-2 ${bookmarked ? 'bg-ai-purple-100 border-ai-purple-300 text-ai-purple-700' : ''}`}
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <Bookmark size={16} />
                  <span>{bookmarked ? 'Saved' : 'Save'}</span>
                </Button>
                
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 size={16} />
                  <span>Share</span>
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="outline">{tool.category}</Badge>
              {tool.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.round(tool.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300 fill-gray-300"}
                    />
                  ))}
                </div>
                <span className="font-medium">{tool.rating.toFixed(1)}</span>
              </div>
              
              <div>
                <Badge 
                  variant="secondary"
                  className={`
                    ${tool.pricing_model === "Free" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    ${tool.pricing_model === "Freemium" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : ""}
                    ${tool.pricing_model === "Paid" ? "bg-orange-100 text-orange-800 hover:bg-orange-100" : ""}
                    ${tool.pricing_model === "Enterprise" ? "bg-purple-100 text-purple-800 hover:bg-purple-100" : ""}
                  `}
                >
                  {tool.pricing_model}
                </Badge>
              </div>
              
              <div className="text-muted-foreground">
                Views: {tool.view_count}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description and Features */}
          <div className="lg:col-span-2">
            <div className="border rounded-lg bg-card p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">About {tool.name}</h2>
              <p className="text-muted-foreground mb-6">{tool.description}</p>
              
              <Button asChild size="lg" className="gap-2">
                <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink size={16} />
                </a>
              </Button>
            </div>
            
            {tool.features.length > 0 && (
              <div className="border rounded-lg bg-card p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {tool.screenshots.length > 0 && (
              <div className="border rounded-lg bg-card p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tool.screenshots.map((screenshot, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <img src={screenshot} alt={`${tool.name} screenshot ${index + 1}`} className="w-full h-auto" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {tool.use_cases.length > 0 && (
              <div className="border rounded-lg bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tool.use_cases.map((useCase, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-background">
                      <p>{useCase}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Pricing and Related */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg bg-card p-6 mb-8 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Pricing</h2>
              {tool.pricing_tiers.length > 0 ? (
                <div className="space-y-4">
                  {tool.pricing_tiers.map((tier, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-background">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{tier.tier_name}</h3>
                        <span className="font-bold">{tier.price}</span>
                      </div>
                      <ul className="space-y-1">
                        {tier.features.map((feature, fIndex) => (
                          <li key={fIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg p-4 bg-background">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Pricing</h3>
                    <span className="font-bold">{tool.pricing_model}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Visit the website for detailed pricing information.
                  </p>
                </div>
              )}
              
              <div className="mt-6">
                <Button asChild className="w-full">
                  <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                    Visit Official Website
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ToolDetail;
