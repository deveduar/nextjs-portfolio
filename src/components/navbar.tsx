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
        className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-border/70 bg-background/95 backdrop-blur-md"
      >
        <div className="h-full px-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
              className="rounded-lg p-2 transition-colors hover:bg-surface"
            >
              <IoMenuOutline size={20} className="text-muted" />
            </button>
            <Link href="/" className="hidden md:block flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">Deveduar Portfolio</span>
            </Link>
            <Link href="/" className="md:hidden flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">Dev</span>
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
                      ? 'bg-accent/15 text-accent' 
                      : 'text-muted hover:bg-surface hover:text-foreground'
                    }`}
                  title={item.label}
                >
                  <item.icon size={18} />
                </Link>
              ))}
            </div>
            <button
              onClick={handleContactClick}
              className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
              title="Contact"
            >
              <IoMailOutline size={18} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleSearch(); }}
              className="rounded-lg p-2 transition-colors hover:bg-surface"
            >
              <IoSearchOutline size={18} className="text-muted" />
            </button>
            <div onClick={(e) => { e.stopPropagation(); }}>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </nav>

       {sidebarOpen && (
          <div className="fixed inset-0 z-50" onClick={handleOverlayClick} onTouchMove={(e) => e.preventDefault()} onWheel={(e) => e.preventDefault()}>
            <div className="absolute top-14 bottom-0 left-0 right-0 bg-black/60 animate-overlayFadeIn cursor-pointer" onTouchMove={(e) => e.stopPropagation()} onWheel={(e) => e.stopPropagation()} />
           <aside 
             className="sidebar-content absolute top-0 left-0 bottom-0 z-60 flex w-72 flex-col border-r border-border/70 bg-background animate-sidebarSlideIn"
             onClick={(e) => e.stopPropagation()}
             onTouchMove={(e) => e.stopPropagation()}
             onWheel={(e) => e.stopPropagation()}
           >
            <div className="flex shrink-0 items-center justify-between border-b border-border/70 p-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); closeSidebar(); }}
                  className="rounded-lg p-1.5 transition-colors hover:bg-surface"
                >
                  <IoClose size={18} className="text-muted" />
                </button>
                <Link href="/" onClick={closeSidebar} className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">Deveduar</span>
                </Link>
              </div>
              <span className="text-xs text-muted">Portfolio</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <nav className="p-4 space-y-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setProjectsExpanded(!projectsExpanded); }}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-colors
                    ${pathname === '/projects'
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-foreground hover:bg-surface'
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
                
                {/* Project search and list - only show when expanded */}
                {projectsExpanded && (
                  <div className="mt-2">
                    <div className="relative">
                      <IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" size={12} />
                      <input
                        type="text"
                        placeholder="Filter projects..."
                        value={sidebarSearch}
                        onChange={(e) => setSidebarSearch(e.target.value)}
                        className="w-full rounded-lg border border-border/60 bg-surface py-1.5 pl-7 pr-6 text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent/40"
                      />
                      {sidebarSearch && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSidebarSearch(''); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
                        >
                          <IoClose size={12} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-2 mt-2 flex-1 min-h-0">
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
                            onClick={(e) => { e.stopPropagation(); closeSidebar(); }}
                            className={`block px-2 py-1.5 text-xs rounded-lg truncate transition-colors
                              ${pathname === `/project/${slugify(project.title)}`
                                ? 'bg-accent/15 font-medium text-accent'
                                : 'text-muted hover:bg-surface hover:text-accent'
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

            <div className="shrink-0 space-y-3 border-t border-border/70 p-4">
              <button
                onClick={(e) => { e.stopPropagation(); openContactModal(); closeSidebar(); }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-foreground transition-colors hover:bg-surface"
              >
                <IoMailOutline size={18} />
                <span className="text-sm font-medium">Contact</span>
              </button>
              
              <div className="flex items-center justify-center gap-3">
                <Link 
                  href={profile.socialLinks.linkedin} 
                  target="_blank"
                  className="rounded-lg bg-surface p-1.5 transition-colors hover:bg-surface-alt"
                >
                  <FaLinkedin className="h-4 w-4 text-muted" />
                </Link>
                <Link 
                  href={profile.socialLinks.twitter} 
                  target="_blank"
                  className="rounded-lg bg-surface p-1.5 transition-colors hover:bg-surface-alt"
                >
                  <FaTwitter className="h-4 w-4 text-muted" />
                </Link>
                <Link 
                  href={profile.socialLinks.github} 
                  target="_blank"
                  className="rounded-lg bg-surface p-1.5 transition-colors hover:bg-surface-alt"
                >
                  <FaGithub className="h-4 w-4 text-muted" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50" onClick={handleOverlayClick}>
          <div className="absolute top-14 bottom-0 left-0 right-0 bg-black/60 animate-overlayFadeIn cursor-pointer" />
          <div 
            ref={searchContainerRef}
            className="absolute top-14 left-0 right-0 border-b border-border/70 bg-background p-4 animate-overlayFadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search projects..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => searchValue.trim() && setShowDropdown(true)}
                  autoFocus
                  className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {searchValue ? (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
                  >
                    <IoClose size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
                  >
                    <IoClose size={18} />
                  </button>
                )}
              </div>
              
              {showDropdown && filteredProjects.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-xl border border-border/70 bg-surface py-2 shadow-theme custom-scrollbar">
                  {filteredProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={(e) => { e.stopPropagation(); handleProjectClick(slugify(p.title)); }}
                      className="group flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-surface-alt"
                    >
                      <div className="min-w-0 flex-1 mr-2">
                        <span className="block truncate text-sm font-medium text-foreground">{p.title}</span>
                        <p className="truncate text-xs text-muted">{p.description}</p>
                      </div>
                      <IoChevronForward size={16} className="shrink-0 text-muted transition-colors group-hover:text-foreground" />
                    </button>
                  ))}
                </div>
              )}

              {showDropdown && searchValue.trim() && filteredProjects.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border/70 bg-surface py-4 text-center shadow-theme">
                  <p className="text-sm text-muted">No projects found</p>
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
