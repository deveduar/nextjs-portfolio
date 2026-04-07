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
    <div className="flex items-center gap-0.5 p-0.5 bg-[var(--color-surface-alt)] rounded-md">
      {views.map(({ mode, icon, label }) => (
        <button
          key={mode}
          onClick={() => onViewChange(mode)}
          className={`p-1.5 rounded transition-colors ${
            currentView === mode
              ? 'bg-[var(--color-surface)] text-[var(--color-accent)] shadow-sm'
              : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
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