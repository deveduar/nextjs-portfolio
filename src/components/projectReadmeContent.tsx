interface ProjectReadmeContentProps {
  readmeContent?: {
    title?: string;
    fileName?: string;
    sections?: Record<string, any>;
  };
  size?: 'sm' | 'md';
}

const parseInlineText = (text: string): string => {
  if (!text) return '';
  
  let s = String(text);
  
  s = s.replace(/&amp;/g, '&');
  s = s.replace(/&lt;/g, '<');
  s = s.replace(/&gt;/g, '>');
  s = s.replace(/&#39;/g, "'");
  s = s.replace(/&quot;/g, '"');
  
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/`(.+?)`/g, '<code>$1</code>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-600 hover:underline">$1</a>');
  
  return s;
};

const isTableText = (text: string) => {
  const lines = text.split(/\r?\n/).filter(Boolean);
  return lines.length >= 2 && /\|/.test(lines[0]) && lines[1].includes('|');
};

const renderMarkdownTable = (text: string, key: string | number) => {
  const allRows = text.trim().split(/\r?\n/).filter(Boolean);
  
  const filteredRows = allRows.filter((row) => {
    const cleaned = row.replace(/\|/g, '').trim();
    return !/^[-:]+$/.test(cleaned) && !/^[-:\s]+$/.test(cleaned);
  });
  
  if (filteredRows.length < 2) {
    return <pre key={key} className="overflow-x-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-800 p-4 text-sm font-mono">{text.trim()}</pre>;
  }

  const [headerRow, ...bodyRows] = filteredRows;
  const headers = headerRow.replace(/^\s*\|?/, '').replace(/\|?\s*$/, '').split(/\s*\|\s*/);
  const rows = bodyRows.map((row) => row.replace(/^\s*\|?/, '').replace(/\|?\s*$/, '').split(/\s*\|\s*/));

  return (
    <div key={key} className="overflow-x-auto my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            {headers.map((cell, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold text-slate-900 dark:text-white" dangerouslySetInnerHTML={{ __html: parseInlineText(cell.trim()) }} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-slate-100 dark:border-slate-800">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: parseInlineText(cell.trim()) }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const isTaskList = (lines: string[]) => {
  return lines.some((line) => /^\s*[-*]?\s*\[\s*[ x]\s*\]/.test(line));
};

const renderTaskList = (lines: string[], key: string | number): JSX.Element => {
  return (
    <ul key={key} className="space-y-2 ml-4">
      {lines.map((line, idx) => {
        const match = line.match(/^\s*[-*]?\s*\[\s*([ x])\s*\]\s*(.*)$/i);
        if (!match) {
          const content = line.replace(/^[\s]*[-*][\s]*/, '');
          return (
            <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
              <span className="text-slate-400">•</span>
              <span dangerouslySetInnerHTML={{ __html: parseInlineText(content) }} />
            </li>
          );
        }

        const checked = match[1].toLowerCase() === 'x';
        const text = match[2] || '';

        return (
          <li key={idx} className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-blue-600"
            />
            <span className={`flex-1 leading-relaxed ${checked ? 'text-slate-500 line-through dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
              <span dangerouslySetInnerHTML={{ __html: parseInlineText(text) }} />
            </span>
          </li>
        );
      })}
    </ul>
  );
};

const renderList = (lines: string[], key: string | number): JSX.Element => {
  if (isTaskList(lines)) {
    return renderTaskList(lines, key);
  }
  
  return (
    <ul key={key} className="space-y-2 text-slate-700 dark:text-slate-300 ml-4">
      {lines.map((line, idx) => {
        const indentMatch = line.match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[1].length : 0;
        const level = Math.floor(indent / 2);
        
        let content = line.trim();
        
        const dashMatch = content.match(/^-\s+/);
        const starMatch = content.match(/^\*\s+/);
        
        if (dashMatch) {
          content = content.substring(dashMatch[0].length);
        } else if (starMatch) {
          content = content.substring(starMatch[0].length);
        }
        
        const htmlContent = parseInlineText(content);
        
        const bullet = level === 0 ? '•' : level === 1 ? '○' : '‣';
        
        return (
          <li key={idx} className="flex items-start gap-2 leading-relaxed" style={{ paddingLeft: level + 'rem' }}>
            <span className="text-slate-400 mt-1">{bullet}</span>
            <span className="flex-1" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </li>
        );
      })}
    </ul>
  );
};

const renderCode = (codeObj: { type: string; lang?: string; value?: string }, key: string | number): JSX.Element => {
  const code = codeObj.value || '';
  const lang = codeObj.lang || '';
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <pre key={key} className="overflow-x-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-800 p-4 my-3 text-sm relative group">
      {lang && <span className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2 block">{lang}</span>}
      <code className="text-gray-800 dark:text-gray-200 font-mono text-sm">{code}</code>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </pre>
  );
};

const isListItem = (item: string): boolean => {
  return /^\s*[-*]\s/.test(item);
};

const isTaskItem = (item: string): boolean => {
  return /^\s*[-*]?\s*\[\s*[ x]\s*\]/.test(item);
};

const renderSectionValue = (value: any, key: string | number): JSX.Element => {
  if (Array.isArray(value)) {
    const codeItems = value.filter((item) => typeof item === 'object' && item?.type === 'code');
    const taskItems = value.filter((item) => typeof item === 'string' && isTaskItem(item));
    const listItems = value.filter((item) => typeof item === 'string' && isListItem(item));
    
    // Pure task list
    if (taskItems.length > 0 && taskItems.length === value.length) {
      const lines = value.map((item) => String(item));
      return renderTaskList(lines, key);
    }
    
    // Pure code items
    if (codeItems.length > 0 && codeItems.length === value.length) {
      return (
        <div key={key} className="space-y-3">
          {codeItems.map((item, idx) => renderCode(item, `${key}-${idx}`))}
        </div>
      );
    }
    
    // Mixed content - render each item based on its type
    if (codeItems.length > 0) {
      return (
        <div key={key} className="space-y-3">
          {value.map((item, idx) => {
            if (typeof item === 'object' && item?.type === 'code') {
              return renderCode(item, `${key}-${idx}`);
            }
            if (typeof item === 'string' && isTaskItem(item)) {
              return (
                <ul key={idx} className="space-y-2 ml-4">
                  {renderTaskList([item], `${key}-${idx}`)}
                </ul>
              );
            }
            if (typeof item === 'string' && isListItem(item)) {
              const indentMatch = item.match(/^(\s*)/);
              const indent = indentMatch ? indentMatch[1].length : 0;
              const level = Math.floor(indent / 2);
              const content = item.trim().replace(/^[-*]\s*/, '');
              const bullet = level === 0 ? '•' : level === 1 ? '○' : '‣';
              return (
                <li key={idx} className="flex items-start gap-2 leading-relaxed text-slate-700 dark:text-slate-300" style={{ paddingLeft: level + 'rem' }}>
                  <span className="text-slate-400 mt-1">{bullet}</span>
                  <span className="flex-1" dangerouslySetInnerHTML={{ __html: parseInlineText(content) }} />
                </li>
              );
            }
            return <div key={idx} className="text-slate-700 dark:text-slate-300">{renderSectionValue(item, `${key}-${idx}`)}</div>;
          })}
        </div>
      );
    }
    
    // Check if all items are list items
    if (listItems.length === value.length && value.every((item: any) => typeof item === 'string')) {
      const lines = value.map((item: string) => String(item));
      return renderList(lines, key);
    }
    
    // Mixed content - render each item based on its type
    if (listItems.length > 0) {
      return (
        <div key={key} className="space-y-3">
          {value.map((item: any, idx: number) => {
            if (typeof item === 'string' && isTaskItem(item)) {
              return (
                <ul key={idx} className="space-y-2 ml-4">
                  {renderTaskList([item], `${key}-${idx}`)}
                </ul>
              );
            }
            if (typeof item === 'string' && isListItem(item)) {
              const indentMatch = item.match(/^(\s*)/);
              const indent = indentMatch ? indentMatch[1].length : 0;
              const level = Math.floor(indent / 2);
              const content = item.trim().replace(/^[-*]\s*/, '');
              const bullet = level === 0 ? '•' : level === 1 ? '○' : '‣';
              return (
                <li key={idx} className="flex items-start gap-2 leading-relaxed text-slate-700 dark:text-slate-300" style={{ paddingLeft: level + 'rem' }}>
                  <span className="text-slate-400 mt-1">{bullet}</span>
                  <span className="flex-1" dangerouslySetInnerHTML={{ __html: parseInlineText(content) }} />
                </li>
              );
            }
            return <div key={idx} className="leading-relaxed text-slate-700 dark:text-slate-300">{renderSectionValue(item, `${key}-${idx}`)}</div>;
          })}
        </div>
      );
    }
    
    return (
      <div key={key} className="space-y-3">
        {value.map((item, idx) => <div key={idx}>{renderSectionValue(item, `${key}-${idx}`)}</div>)}
      </div>
    );
  }

  if (value && typeof value === 'object') {
    if (value.type === 'code') return renderCode(value, key);
    return (
      <div key={key} className="space-y-4">
        {Object.entries(value).map(([title, val]) => (
          <div key={title}>
            <h5 className="font-semibold text-slate-900 dark:text-white mt-4">{title}</h5>
            <div className="mt-2">{renderSectionValue(val, `${key}-${title}`)}</div>
          </div>
        ))}
      </div>
    );
  }

  const text = String(value);
  if (isTableText(text)) return renderMarkdownTable(text, key);
  
  const lines = text.split('\n').filter(Boolean);
  const isList = lines.length > 0 && lines.some((line) => /^\s*[-*]/.test(line) || /^\s*\*\*/.test(line));
  if (isList) return renderList(lines, key);

  return <p key={key} className="leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line"><span dangerouslySetInnerHTML={{ __html: parseInlineText(text) }} /></p>;
};

const ProjectReadmeContent = ({ readmeContent, size = 'md' }: ProjectReadmeContentProps) => {
  if (!readmeContent?.sections) return null;

  if (size === 'sm') {
    return (
      <div className="space-y-1">
        {Object.entries(readmeContent.sections).map(([title, value]) => (
          <div key={title} className="p-2 rounded bg-gray-100 dark:bg-gray-800">
            <h4 className="text-xs font-semibold mb-1">{title}</h4>
            <div className="text-[10px]">{renderSectionValue(value, title)}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(readmeContent.sections).map(([title, value]) => (
        <section key={title} className="space-y-3">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h4>
          <div className="pl-4">{renderSectionValue(value, title)}</div>
        </section>
      ))}
    </div>
  );
};

export default ProjectReadmeContent;
