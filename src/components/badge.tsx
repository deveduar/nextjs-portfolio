import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";

interface BadgeProps {
  label: string;
  href?: string;
}

const Badge: React.FC<BadgeProps> = ({ label, href }) => {
  const content = (
    <div className=" bg-green-500 dark:bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 backdrop-blur-sm justify-center text-center">
      <BiLinkExternal className="w-3 h-3" />
      <span>{label}</span>
      {/* <span className="text-xs">Live</span> */}
    </div>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:scale-105 transition-transform duration-200"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Badge;