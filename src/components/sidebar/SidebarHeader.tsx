
import { useEffect, useRef } from "react";
import { LayoutDashboard } from "lucide-react";
import { gsap } from "gsap";

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader = ({ collapsed }: SidebarHeaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial animation when component mounts
    const tl = gsap.timeline();
    
    if (!collapsed && iconContainerRef.current && titleRef.current && subtitleRef.current) {
      // Set initial states
      gsap.set([iconContainerRef.current, titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 20
      });

      // Animate in
      tl.to(iconContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");

      // Add a subtle floating animation to the icon
      gsap.to(iconContainerRef.current, {
        y: -2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    return () => {
      tl.kill();
      gsap.killTweensOf([iconContainerRef.current, titleRef.current, subtitleRef.current]);
    };
  }, [collapsed]);

  if (collapsed) return null;

  return (
    <div ref={containerRef} className="flex-shrink-0 p-4 mb-2">
      <div className="flex items-center gap-3 mb-3">
        <div 
          ref={iconContainerRef}
          className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
        >
          <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 
            ref={titleRef}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            ASTROM
          </h1>
          <p 
            ref={subtitleRef}
            className="text-sm text-muted-foreground font-medium"
          >
            Intelligence Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
