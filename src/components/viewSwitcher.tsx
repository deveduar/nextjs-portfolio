"use client";
import { IoListOutline, IoGridOutline, IoMenuOutline } from "react-icons/io5";

type ViewMode = 'list' | 'grid' | 'table';

interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ currentView, onViewChange }) => {
  const views: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'list', icon: <IoListOutline size={14} />, label: 'List' },
    { mode: 'grid', icon: <IoGridOutline size={14} />, label: 'Grid' },
    { mode: 'table', icon: <IoMenuOutline size={14} />, label: 'Table' },
  ];

  return (
    <div className="flex items-center gap-0.5 p-0.5 bg-gray-100 dark:bg-gray-900 rounded-md">
      {views.map(({ mode, icon, label }) => (
        <button
          key={mode}
          onClick={() => onViewChange(mode)}
          className={`p-1.5 rounded transition-colors ${
            currentView === mode
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          title={label}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default ViewSwitcher;