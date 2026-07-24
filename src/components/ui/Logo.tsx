import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  dark?: boolean;
}

export function Logo({ className, dark = false }: LogoProps) {
  const textColor = dark ? "fill-white" : "fill-[#0f172a]"; // slate-900

  return (
    <svg 
      viewBox="40 20 347 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-auto h-8", className)}
    >
      <g className={textColor}>
        {/* N */}
        <path d="M40 20 h22 l30 40 V20 h20 v60 H90 L60 40 v40 H40 V20 Z" />
        
        {/* A */}
        {/* We use a custom A with a slanted crossbar to match the design */}
        <path d="M125 80 l25 -60 h20 l25 60 h-22 l-6 -15 h-26 l-6 15 h-20 Z" />
        {/* Slanted crossbar of A - overextending slightly */}
        <path d="M130 50 l38 -10 l5 12 l-38 10 Z" />

        {/* V */}
        <path d="M190 20 h22 l18 45 l18 -45 h22 l-30 60 h-20 l-30 -60 Z" />

        {/* I */}
        <path d="M280 20 h20 v60 h-20 V20 Z" />

        {/* N */}
        <path d="M315 20 h22 l30 40 V20 h20 v60 h-22 l-30 -40 v40 h-20 V20 Z" />
      </g>
    </svg>
  );
}
