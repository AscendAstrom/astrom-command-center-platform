
import { cn } from "@/lib/utils";

interface LogoIconProps {
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-8 h-8", 
  lg: "w-12 h-12",
  xl: "w-16 h-16"
};

const LogoIcon = ({ size = "md", animate = true, className }: LogoIconProps) => {
  const sizeClass = sizeMap[size];
  
  return (
    <div className={cn("relative flex items-center justify-center", sizeClass, className)}>
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))"
        }}
      >
        {/* Background glow */}
        <defs>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.5" />
          </radialGradient>
          
          <linearGradient id="particleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" />
            <stop offset="100%" stopColor="rgb(147, 51, 234)" />
          </linearGradient>
          
          <linearGradient id="particleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" />
          </linearGradient>
          
          <linearGradient id="particleGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(249, 115, 22)" />
            <stop offset="100%" stopColor="rgb(16, 185, 129)" />
          </linearGradient>
          
          <linearGradient id="particleGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(236, 72, 153)" />
            <stop offset="100%" stopColor="rgb(249, 115, 22)" />
          </linearGradient>
        </defs>
        
        {/* Central Intelligence Core */}
        <circle
          cx="32"
          cy="32"
          r="8"
          fill="url(#coreGradient)"
          className={animate ? "animate-pulse-glow" : ""}
        />
        
        {/* Inner ring of core details */}
        <circle
          cx="32"
          cy="32"
          r="6"
          fill="none"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="0.5"
          className={animate ? "animate-spin" : ""}
          style={{ animationDuration: "8s", animationDirection: "reverse" }}
        />
        
        {/* Orbital particles */}
        {animate && (
          <>
            {/* Particle 1 - Inner orbit */}
            <circle
              cx="32"
              cy="32"
              r="2"
              fill="url(#particleGradient1)"
              className="opacity-90"
              style={{
                animation: "orbit-inner 4s linear infinite",
                transformOrigin: "32px 32px"
              }}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 32 32;360 32 32"
                dur="4s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="16 0;16 0"
                dur="4s"
                repeatCount="indefinite"
                additive="sum"
              />
            </circle>
            
            {/* Particle 2 - Inner orbit offset */}
            <circle
              cx="32"
              cy="32"
              r="1.5"
              fill="url(#particleGradient2)"
              className="opacity-80"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="120 32 32;480 32 32"
                dur="4s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="16 0;16 0"
                dur="4s"
                repeatCount="indefinite"
                additive="sum"
              />
            </circle>
            
            {/* Particle 3 - Middle orbit */}
            <circle
              cx="32"
              cy="32"
              r="1.8"
              fill="url(#particleGradient3)"
              className="opacity-85"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 32 32;-360 32 32"
                dur="6s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="22 0;22 0"
                dur="6s"
                repeatCount="indefinite"
                additive="sum"
              />
            </circle>
            
            {/* Particle 4 - Middle orbit offset */}
            <circle
              cx="32"
              cy="32"
              r="1.3"
              fill="url(#particleGradient4)"
              className="opacity-70"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="180 32 32;-180 32 32"
                dur="6s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="22 0;22 0"
                dur="6s"
                repeatCount="indefinite"
                additive="sum"
              />
            </circle>
            
            {/* Particle 5 - Outer orbit */}
            <circle
              cx="32"
              cy="32"
              r="1.6"
              fill="url(#particleGradient1)"
              className="opacity-75"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="60 32 32;420 32 32"
                dur="8s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="26 0;26 0"
                dur="8s"
                repeatCount="indefinite"
                additive="sum"
              />
            </circle>
            
            {/* Particle 6 - Outer orbit offset */}
            <circle
              cx="32"
              cy="32"
              r="1.2"
              fill="url(#particleGradient2)"
              className="opacity-65"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="300 32 32;-60 32 32"
                dur="8s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="26 0;26 0"
                dur="8s"
                repeatCount="indefinite"
                additive="sum"
              />
            </circle>
          </>
        )}
        
        {/* Static particles for non-animated state */}
        {!animate && (
          <>
            <circle cx="48" cy="32" r="2" fill="url(#particleGradient1)" className="opacity-90" />
            <circle cx="16" cy="32" r="1.5" fill="url(#particleGradient2)" className="opacity-80" />
            <circle cx="32" cy="10" r="1.8" fill="url(#particleGradient3)" className="opacity-85" />
            <circle cx="32" cy="54" r="1.3" fill="url(#particleGradient4)" className="opacity-70" />
            <circle cx="45" cy="19" r="1.6" fill="url(#particleGradient1)" className="opacity-75" />
            <circle cx="19" cy="45" r="1.2" fill="url(#particleGradient2)" className="opacity-65" />
          </>
        )}
        
        {/* Orbit paths (subtle guides) */}
        <circle
          cx="32"
          cy="32"
          r="16"
          fill="none"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="0.5"
        />
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="rgba(147, 51, 234, 0.1)"
          strokeWidth="0.5"
        />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="rgba(16, 185, 129, 0.1)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
};

export default LogoIcon;
