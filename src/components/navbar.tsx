"use client"
import { useState, useEffect, useRef, createContext, useContext, ReactNode } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useReadmes } from "@/hooks/useReadmes";
import ThemeSwitch from "./themeswitch";
import { 
  IoSearchOutline, 
  IoClose, 
  IoHomeOutline, 
  IoFolderOutline, 
  IoPersonOutline, 
  IoMailOutline,
  IoMenuOutline,
  IoChevronForward
} from "react-icons/io5";
import ContactModal from "./contactModal";
import { slugify } from '@/lib/slug';
import profile from '@/data/profile';
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

interface SearchContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
  openContactModal: () => void;
}

const SearchContext = createContext<SearchContextType>({
  searchValue: '',
  setSearchValue: () => {},
  openContactModal: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = useState('');
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const openContactModal = () => setContactModalOpen(true);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue, openContactModal }}>
      {children}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </SearchContext.Provider>
  );
}

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { readmes } = useReadmes();
  const { searchValue, setSearchValue, openContactModal } = useSearchContext();

  const isProjectsPage = pathname === '/projects';
  const isProjectDetail = pathname.startsWith('/project/') && pathname !== '/projects';

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchValue.trim()) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchValue]);

  useEffect(() => {
    closeSidebar();
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const normalizeText = (text: string) => 
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filteredProjects = searchValue.trim() && readmes
    ? readmes.filter(p => {
        const search = normalizeText(searchValue);
        return normalizeText(p.title).includes(search) ||
          normalizeText(p.description || '').includes(search) ||
          p.technologies.some(t => normalizeText(t).includes(search));
      }).slice(0, 6)
    : [];

  const handleProjectClick = (slug: string) => {
    setSearchValue('');
    setShowDropdown(false);
    setSearchOpen(false);
    router.push(`/project/${slug}`);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setShowDropdown(false);
  };

  const handleOverlayClick = () => {
    setSearchOpen(false);
    closeSidebar();
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openContactModal();
  };

  const navItems = [
    { href: "/projects", icon: IoFolderOutline, label: "Projects" },
  ];

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 h-14 bg-gray-100/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800 z-40"
      >
        <div className="h-full px-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <IoMenuOutline size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
            <Link href="/" className="hidden md:block flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Deveduar Portfolio</span>
            </Link>
            <Link href="/" className="md:hidden flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Dev</span>
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-2 rounded-lg transition-colors
                    ${pathname === item.href 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  title={item.label}
                >
                  <item.icon size={18} />
                </Link>
              ))}
            </div>
            <button
              onClick={handleContactClick}
              className="p-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              title="Contact"
            >
              <IoMailOutline size={18} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleSearch(); }}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <IoSearchOutline size={18} className="text-gray-700 dark:text-gray-300" />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); }}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <ThemeSwitch />
            </button>
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50" onClick={handleOverlayClick}>
          <div className="absolute top-14 bottom-0 left-0 right-0 bg-black/50 animate-overlayFadeIn cursor-pointer" />
          <aside 
            className="sidebar-content absolute top-0 left-0 bottom-0 w-72 bg-gray-100 dark:bg-gray-950 border-r border-gray-200/50 dark:border-gray-800 animate-sidebarSlideIn z-60 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800 shrink-0">
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); closeSidebar(); }}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <IoClose size={18} className="text-gray-700 dark:text-gray-300" />
                </button>
                <Link href="/" onClick={closeSidebar} className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Deveduar</span>
                </Link>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Portfolio</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <nav className="p-4 space-y-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setProjectsExpanded(!projectsExpanded); }}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-colors
                    ${pathname === '/projects'
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <IoFolderOutline size={18} />
                    <span className="text-sm font-medium">Projects</span>
                  </div>
                  <IoChevronForward 
                    size={16} 
                    className={`transition-transform ${projectsExpanded ? 'rotate-90' : ''}`} 
                  />
                </button>
                
                {projectsExpanded && readmes && readmes.length > 0 && (
                  <div className="mt-2 ml-2 space-y-2">
                    <div className="relative">
                      <IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                      <input
                        type="text"
                        placeholder="Filter projects..."
                        value={sidebarSearch}
                        onChange={(e) => setSidebarSearch(e.target.value)}
                        className="w-full pl-7 pr-6 py-1.5 text-xs rounded-lg bg-white dark:bg-gray-900 
                          border border-gray-200/30 dark:border-gray-700/30
                          text-gray-900 dark:text-white
                          placeholder-gray-400 dark:placeholder-gray-500
                          focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                      />
                      {sidebarSearch && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSidebarSearch(''); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <IoClose size={12} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                      {readmes
                        .filter(p => {
                          const search = normalizeText(sidebarSearch);
                          return !sidebarSearch || 
                            normalizeText(p.title).includes(search) ||
                            normalizeText(p.description || '').includes(search) ||
                            p.technologies.some(t => normalizeText(t).includes(search));
                        })
                        .map(project => (
                          <Link
                            key={project.id}
                            href={`/project/${slugify(project.title)}`}
                            onClick={(e) => e.stopPropagation()}
                            className={`block px-2 py-1.5 text-xs rounded-lg truncate transition-colors
                              ${pathname === `/project/${slugify(project.title)}`
                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                          >
                            {project.title}
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </nav>
            </div>

            <div className="p-4 border-t border-gray-200/50 dark:border-gray-800 shrink-0 space-y-3">
              <button
                onClick={(e) => { e.stopPropagation(); openContactModal(); closeSidebar(); }}
                className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <IoMailOutline size={18} />
                <span className="text-sm font-medium">Contact</span>
              </button>
              
              <div className="flex items-center justify-center gap-3">
                <Link 
                  href={profile.socialLinks.linkedin} 
                  target="_blank"
                  className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaLinkedin className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </Link>
                <Link 
                  href={profile.socialLinks.twitter} 
                  target="_blank"
                  className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaTwitter className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </Link>
                <Link 
                  href={profile.socialLinks.github} 
                  target="_blank"
                  className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaGithub className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50" onClick={handleOverlayClick}>
          <div className="absolute top-14 bottom-0 left-0 right-0 bg-black/50 animate-overlayFadeIn cursor-pointer" />
          <div 
            ref={searchContainerRef}
            className="absolute top-14 left-0 right-0 p-4 bg-gray-100 dark:bg-gray-950 border-b border-gray-200/50 dark:border-gray-800 animate-overlayFadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search projects..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => searchValue.trim() && setShowDropdown(true)}
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-white dark:bg-gray-900 
                    border border-gray-200/50 dark:border-gray-700
                    text-gray-900 dark:text-white text-sm
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                {searchValue ? (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <IoClose size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <IoClose size={18} />
                  </button>
                )}
              </div>
              
              {showDropdown && filteredProjects.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700 shadow-xl max-h-80 overflow-y-auto custom-scrollbar">
                  {filteredProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={(e) => { e.stopPropagation(); handleProjectClick(slugify(p.title)); }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between group"
                    >
                      <div className="min-w-0 flex-1 mr-2">
                        <span className="block text-sm font-medium text-gray-900 dark:text-white truncate">{p.title}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{p.description}</p>
                      </div>
                      <IoChevronForward size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {showDropdown && searchValue.trim() && filteredProjects.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 py-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700 shadow-xl text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No projects found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-14" />
    </>
  );
};

export default Navbar;
