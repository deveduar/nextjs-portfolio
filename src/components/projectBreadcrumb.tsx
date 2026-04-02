"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoChevronForward } from "react-icons/io5";

interface ProjectBreadcrumbProps {
  projectTitle?: string;
}

const ProjectBreadcrumb: React.FC<ProjectBreadcrumbProps> = ({ projectTitle }) => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(path => path);

  const getPathName = (path: string) => {
    const pathMap: { [key: string]: string } = {
      'projects': 'Projects',
      'project': 'Projects',
      'about': 'About',
      'contact': 'Contact'
    };
    return pathMap[path.toLowerCase()] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  const getHref = (path: string) => {
    const hrefMap: { [key: string]: string } = {
      'projects': '/projects',
      'project': '/projects',
      'contact': '/contact'
    };
    return hrefMap[path.toLowerCase()] || `/${path}`;
  };

  if (paths.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="py-2 px-3">
        <ol className="flex items-center flex-wrap gap-1 text-xs">
          <li className="flex items-center">
            <Link 
              href="/"
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
          </li>
          {paths.map((path, index) => (
            <li key={index} className="flex items-center">
              <IoChevronForward className="mx-1 text-gray-400" size={10} />
              <Link
                href={getHref(path)}
                className={`${
                  index === paths.length - 1
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                } transition-colors truncate max-w-[150px]`}
              >
                {index === paths.length - 1 && projectTitle 
                  ? projectTitle
                  : getPathName(path)}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ProjectBreadcrumb;