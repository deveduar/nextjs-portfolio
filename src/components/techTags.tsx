interface TechTagsProps {
  technologies: string[];
  limit?: number;
  className?: string;
  overlayStyle?: boolean;
  showMore?: boolean;
  colorful?: boolean;
}

const techColors: { [key: string]: string } = {
  "react": "bg-blue-400/30 text-blue-700 dark:text-blue-300",
  "next.js": "bg-black/30 text-gray-700 dark:text-gray-300",
  "typescript": "bg-blue-500/30 text-blue-800 dark:text-blue-200",
  "javascript": "bg-yellow-400/30 text-yellow-700 dark:text-yellow-300",
  "tailwind": "bg-cyan-400/30 text-cyan-700 dark:text-cyan-300",
  "node.js": "bg-green-400/30 text-green-700 dark:text-green-300",
  "express": "bg-gray-400/30 text-gray-700 dark:text-gray-300",
  "mongodb": "bg-green-500/30 text-green-800 dark:text-green-200",
  "postgresql": "bg-blue-600/30 text-blue-800 dark:text-blue-200",
  "python": "bg-yellow-500/30 text-yellow-800 dark:text-yellow-200",
  "django": "bg-green-600/30 text-green-800 dark:text-green-200",
  "html": "bg-orange-400/30 text-orange-700 dark:text-orange-300",
  "css": "bg-blue-400/30 text-blue-700 dark:text-blue-300",
  "sass": "bg-pink-400/30 text-pink-700 dark:text-pink-300",
  "docker": "bg-blue-400/30 text-blue-700 dark:text-blue-300",
  "git": "bg-orange-500/30 text-orange-800 dark:text-orange-200",
};
  
  const TechTags: React.FC<TechTagsProps> = ({ 
    technologies, 
    limit = 5,
    className = "",
    overlayStyle = false,
    showMore = true,
    colorful = false
  }) => {
       const getTagStyle = (tech: string) => {
        if (colorful) {
            const normalizedTech = tech.toLowerCase();
            return techColors[normalizedTech] || "bg-gray-400/30 text-gray-700 dark:text-gray-300";
        }
        return overlayStyle 
            ? "bg-black/30 backdrop-blur-sm text-white"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300";
    };

    return (
        <div className={`flex gap-1 items-center ${className}`}>
            {technologies.slice(0, limit).map((tech, index) => (
                <div key={index} className="flex-shrink-0">
                    <span className={`px-2 py-0.5 text-xs rounded-md ${getTagStyle(tech)} ${showMore ? '' : 'max-w-[5rem] min-w-[1rem]'} inline-block truncate text-center align-middle max-w-[100px] min-w-[40px]`}>
                        {tech}
                    </span>
                </div>
            ))}
            {showMore && technologies.length > limit && (
                <div className="flex-shrink-0">
                    <span className={`px-2 py-0.5 text-xs rounded-md ${overlayStyle ? 'bg-black/30 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} inline-block text-center align-middle`}>
                        +{technologies.length - limit}
                    </span>
                </div>
            )}
        </div>
    );
};
  
  export default TechTags;