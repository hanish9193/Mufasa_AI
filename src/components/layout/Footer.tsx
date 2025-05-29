
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-10 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CraftAIHub</h3>
            <p className="text-muted-foreground text-sm">
              Discover the perfect AI tools for your creative and professional needs.
              A curated directory of the best AI tools across various categories.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/categories" className="text-muted-foreground hover:text-foreground text-sm">Categories</Link></li>
              <li><Link to="/trending" className="text-muted-foreground hover:text-foreground text-sm">Trending Tools</Link></li>
              <li><Link to="/new" className="text-muted-foreground hover:text-foreground text-sm">New Additions</Link></li>
              <li><Link to="/recommendations" className="text-muted-foreground hover:text-foreground text-sm">Recommendations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contribute</h3>
            <ul className="space-y-2">
              <li><Link to="/submit-tool" className="text-muted-foreground hover:text-foreground text-sm">Submit a Tool</Link></li>
              <li><Link to="/feedback" className="text-muted-foreground hover:text-foreground text-sm">Send Feedback</Link></li>
              <li><Link to="/updates" className="text-muted-foreground hover:text-foreground text-sm">Request Updates</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm">Contact</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Twitter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 CraftAIHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
