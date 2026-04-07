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
    <div className="bg-[var(--color-surface)]/50 backdrop-blur-sm border-b border-[var(--color-border)]/50">
      <div className="py-2 px-3">
        <ol className="flex items-center flex-wrap gap-1 text-xs">
          <li className="flex items-center">
            <Link 
              href="/"
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] transition-colors"
            >
              Home
            </Link>
          </li>
          {paths.map((path, index) => (
            <li key={index} className="flex items-center">
              <IoChevronForward className="mx-1 text-[var(--color-muted-foreground)]/50" size={10} />
              <Link
                href={getHref(path)}
                className={`${
                  index === paths.length - 1
                    ? "text-[var(--color-accent)] font-medium"
                    : "text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)]"
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