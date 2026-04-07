import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";

interface BadgeProps {
  label: string;
  href?: string;
}

const Badge: React.FC<BadgeProps> = ({ label, href }) => {
  const content = (
    <div className="flex items-center gap-0.5 rounded bg-success px-1.5 py-0.5 text-[10px] font-medium text-background-alt">
      <BiLinkExternal className="w-2.5 h-2.5" />
      <span>{label}</span>
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
