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

  const getHref = (path: string, index: number, totalPaths: number) => {
    if (index === totalPaths - 1 && projectTitle) {
      return `/project/${path}`;
    }
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
    <div>
      <div className="py-2 px-3 max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        <ol className="flex items-center flex-wrap gap-1 text-xs">
          <li className="flex items-center">
            <Link 
              href="/"
              className="text-muted hover:text-accent transition-colors"
            >
              Home
            </Link>
          </li>
          {paths.map((path, index) => (
            <li key={index} className="flex items-center">
              <IoChevronForward className="mx-1 text-muted/50" size={10} />
              <Link
                href={getHref(path, index, paths.length)}
                className={`${
                  index === paths.length - 1
                    ? "text-accent font-medium truncate max-w-[150px] sm:max-w-none"
                    : "text-muted hover:text-accent"
                } transition-colors`}
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