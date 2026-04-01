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
      return <IoArrowUp size={12} className="text-slate-400" />;
    } else if (currentSort.includes('desc')) {
      return <IoArrowDown size={12} className="text-slate-400" />;
    }
    return <IoArrowUp size={12} className="text-slate-400" />;
  };

  return (
    <div className="relative flex items-center bg-gray-100 dark:bg-gray-900 rounded-md overflow-hidden">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="appearance-none bg-transparent border-none px-2 py-1.5 pr-6 text-xs text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-0"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white dark:bg-gray-800">
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">
        {getSortIcon()}
      </div>
    </div>
  );
};

export default SortDropdown;