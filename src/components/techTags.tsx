"use client";

import { useTheme } from "@/context/ThemeContext";
import { getTechTone } from "@/lib/themes";

interface TechTagsProps {
  technologies: string[];
  limit?: number;
  className?: string;
  overlayStyle?: boolean;
  showMore?: boolean;
  colorful?: boolean;
}
  
  const TechTags: React.FC<TechTagsProps> = ({ 
    technologies, 
    limit = 5,
    className = "",
    overlayStyle = false,
    showMore = true,
    colorful = false
  }) => {
    const { palette } = useTheme();

    const getTagStyle = (tech: string) => {
      if (colorful) {
        const tone = getTechTone(tech, palette);

        return {
          backgroundColor: `${tone}33`,
          color: tone,
          borderColor: `${tone}55`,
        };
      }

      if (overlayStyle) {
        return {
          backgroundColor: "rgb(var(--color-backgroundAlt) / 0.7)",
          color: "rgb(var(--color-foreground))",
          backdropFilter: "blur(10px)",
          borderColor: "rgb(var(--color-border) / 0.55)",
        };
      }

      return {
        backgroundColor: "rgb(var(--color-surfaceAlt) / 0.85)",
        color: "rgb(var(--color-mutedForeground))",
        borderColor: "rgb(var(--color-border) / 0.6)",
      };
    };

    return (
        <div className={`flex flex-wrap gap-1 items-center ${className}`}>
            {technologies.slice(0, limit).map((tech, index) => (
                <div key={index}>
                    <span
                      className="inline-block min-w-[40px] whitespace-nowrap rounded-md border px-2 py-0.5 text-center align-middle text-xs"
                      style={getTagStyle(tech)}
                    >
                        {tech}
                    </span>
                </div>
            ))}
            {showMore && technologies.length > limit && (
                <div>
                    <span
                      className="inline-block whitespace-nowrap rounded-md border px-2 py-0.5 text-center align-middle text-xs"
                      style={overlayStyle ? getTagStyle("more") : {
                        backgroundColor: "rgb(var(--color-surfaceAlt) / 0.85)",
                        color: "rgb(var(--color-mutedForeground))",
                        borderColor: "rgb(var(--color-border) / 0.6)",
                      }}
                    >
                        +{technologies.length - limit}
                    </span>
                </div>
            )}
        </div>
    );
};
  
  export default TechTags;
