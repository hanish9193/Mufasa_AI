
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Create a background effect with animated particles
  useEffect(() => {
    // Create canvas element for background
    const canvas = document.createElement('canvas');
    canvas.id = 'backgroundCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Animation logic
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Particle properties
      const particles: {
        x: number; 
        y: number; 
        size: number; 
        speedX: number; 
        speedY: number; 
        opacity: number;
        color: string;
      }[] = [];
      const particleCount = 80;
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          color: i % 5 === 0 ? 'rgba(139, 92, 246, ' : 'rgba(255, 255, 255, '
        });
      }
      
      // Animation function
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(p => {
          // Update position
          p.x += p.speedX;
          p.y += p.speedY;
          
          // Handle edge cases
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.03)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        
        // Create occasional "pulse" effect
        if (Math.random() > 0.99) {
          const pulseX = Math.random() * canvas.width;
          const pulseY = Math.random() * canvas.height;
          
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
          ctx.fill();
          
          // Ripple effect
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 20, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 35, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
          ctx.stroke();
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
