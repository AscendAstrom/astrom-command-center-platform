
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { NavigationItem } from "./types";
import { useSidebarHelpers } from "./useSidebarHelpers";

interface NavigationSectionProps {
  items: NavigationItem[];
  collapsed: boolean;
  title: string;
}

const NavigationSection = ({ items, collapsed, title }: NavigationSectionProps) => {
  const { isActive, getNavCls } = useSidebarHelpers();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current || collapsed) return;

    // Stagger animation for navigation items
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set([titleRef.current, ...itemsRef.current], {
      opacity: 0,
      x: -20
    });

    // Animate title first
    tl.to(titleRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out"
    });

    // Then stagger animate items
    tl.to(itemsRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, [collapsed]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      itemsRef.current[index] = el;
    }
  };

  if (collapsed) return null;

  return (
    <div ref={sectionRef} className="flex-1 px-3 space-y-2">
      <h3 
        ref={titleRef}
        className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3"
      >
        {title}
      </h3>
      <nav className="space-y-1">
        {items.map((item, index) => {
          const active = isActive(item.url);
          return (
            <div 
              key={item.url}
              ref={(el) => addToRefs(el, index)}
            >
              <Link
                to={item.url}
                className={getNavCls(item, active)}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                  });
                }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 ${item.iconBg}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-semibold truncate">{item.title}</span>
                  {item.subtitle && (
                    <span className="text-xs opacity-80 truncate">{item.subtitle}</span>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default NavigationSection;
