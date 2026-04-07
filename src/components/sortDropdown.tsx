"use client";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";

type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ currentSort, onSortChange }) => {
  const options: { value: SortOption; label: string }[] = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'date-asc', label: 'Date (Oldest)' },
    { value: 'date-desc', label: 'Date (Newest)' },
  ];

  const getSortIcon = () => {
    if (currentSort.includes('asc')) {
      return <IoArrowUp size={12} className="text-muted" />;
    } else if (currentSort.includes('desc')) {
      return <IoArrowDown size={12} className="text-muted" />;
    }
    return <IoArrowUp size={12} className="text-muted" />;
  };

  return (
    <div className="relative flex items-center bg-surface-alt rounded-lg border border-border/30 overflow-hidden">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="appearance-none bg-transparent border-none px-2 py-1.5 pr-6 text-xs text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent/30"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-surface text-foreground">
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        {getSortIcon()}
      </div>
    </div>
  );
};

export default SortDropdown;