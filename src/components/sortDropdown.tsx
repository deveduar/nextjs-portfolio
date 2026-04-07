"use client";
import { useEffect, useRef, useState } from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";

type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ currentSort, onSortChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const options: { value: SortOption; label: string }[] = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'date-asc', label: 'Date (Oldest)' },
    { value: 'date-desc', label: 'Date (Newest)' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = options.find((option) => option.value === currentSort) ?? options[0];
  const getSortIcon = (value: SortOption) =>
    value.includes("asc")
      ? <IoArrowUp size={12} className="text-muted" />
      : <IoArrowDown size={12} className="text-muted" />;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-lg bg-surface-alt px-2 py-1.5 text-xs text-foreground transition-colors hover:bg-surface border border-border/10 focus:outline-none focus:ring-1 focus:ring-accent/30"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {getSortIcon(currentSort)}
        <span>{currentOption.label}</span>
      </button>

      <div
        className={`absolute right-0 top-[calc(100%+0.35rem)] z-20 min-w-full rounded-lg border border-border/20 bg-surface shadow-soft transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul role="listbox" className="py-1">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onSortChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs transition-colors ${
                  option.value === currentSort
                    ? "bg-accent/10 text-foreground"
                    : "text-foreground hover:bg-surface-alt"
                }`}
              >
                {getSortIcon(option.value)}
                <span>{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortDropdown;
