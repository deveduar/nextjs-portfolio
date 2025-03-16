import Link from "next/link";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/data/icons";

const SocialIcons = () => {
  return (
    <div className="flex justify-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl">
      <Link 
        href="http://www.linkedin.com/in/deveduar" 
        target="_blank" 
        className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary hover:scale-110 transition-all duration-300"
      >
        {LinkedInIcon}
      </Link>
      <Link 
        href="https://twitter.com/deveduar" 
        target="_blank" 
        className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary hover:scale-110 transition-all duration-300"
      >
        {TwitterIcon}
      </Link>
      <Link 
        href="https://github.com/deveduar" 
        target="_blank" 
        className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary hover:scale-110 transition-all duration-300"
      >
        {GitHubIcon}
      </Link>
    </div>
  );
};

export default SocialIcons;