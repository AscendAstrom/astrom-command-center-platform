
import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { gsap } from "gsap";

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter = ({ collapsed }: SidebarFooterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !iconRef.current || !sparklesRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    
    // Animate the icon container
    tl.to(iconRef.current, {
      scale: 1.1,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(iconRef.current, {
      scale: 1,
      duration: 1,
      ease: "power2.inOut",
    });

    // Animate the sparkles icon
    gsap.to(sparklesRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    // Sparkle effect
    gsap.fromTo(sparklesRef.current, 
      { opacity: 0.7 },
      { 
        opacity: 1,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      }
    );

    return () => {
      tl.kill();
      gsap.killTweensOf([iconRef.current, sparklesRef.current]);
    };
  }, []);

  if (collapsed) return null;

  return (
    <div 
      ref={containerRef}
      className="flex-shrink-0 mt-4 mx-3 mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border border-green-200/50 dark:border-green-800/30"
    >
      <div className="flex items-center gap-3">
        <div 
          ref={iconRef}
          className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
        >
          <Sparkles 
            ref={sparklesRef}
            className="h-6 w-6 text-white" 
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold text-green-700 dark:text-green-300">AI Powered</span>
          <span className="text-xs text-green-600/80 dark:text-green-400/80 font-medium">Data Analytics</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
