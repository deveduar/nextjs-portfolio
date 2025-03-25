"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoChevronForward } from "react-icons/io5";

interface BreadcrumbProps {
  projectTitle?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ projectTitle }) => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(path => path);

  const getPathName = (path: string) => {
    const pathMap: { [key: string]: string } = {
      'project': 'Projects',
      'projects': 'Projects'
    };
    return pathMap[path.toLowerCase()] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  const getPathHref = (path: string, index: number) => {
    if (path.toLowerCase() === 'project') return '/projects';
    return `/${paths.slice(0, index + 1).join('/')}`;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
      <ol className="flex items-center flex-wrap gap-2">
        <li className="flex items-center">
          <Link 
            href="/"
            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors"
          >
            Home
          </Link>
        </li>
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            <IoChevronForward className="mx-2 text-gray-400" />
            <Link
              href={getPathHref(path, index)}
              className={`${
                index === paths.length - 1
                  ? 'text-blue-600 dark:text-blue-400 cursor-default'
                  : 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
              } text-sm font-medium transition-colors`}
            >
              {index === paths.length - 1 && projectTitle 
                ? projectTitle
                : getPathName(path)}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;