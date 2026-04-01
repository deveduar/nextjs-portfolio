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
  
  // Bold FIRST: **text**
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Then italic: *text*  
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  s = s.replace(/`(.+?)`/g, '<code>$1</code>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  
  return s;
};

const isTableText = (text: string) => {
  const lines = text.split(/\r?\n/).filter(Boolean);
  return lines.length >= 2 && /\|/.test(lines[0]) && lines[1].includes('|');
};

const renderMarkdownTable = (text: string, key: string | number) => {
  const rows = text.trim().split(/\r?\n/).filter(Boolean)
    .map((row) => row.replace(/^\s*\|?/, '').replace(/\|?\s*$/, '').split(/\s*\|\s*/));

  if (rows.length < 2) {
    return <pre key={key} className="overflow-x-auto rounded-2xl bg-slate-100 p-4 text-sm text-slate-900 dark:bg-gray-700">{text.trim()}</pre>;
  }

  const [headerRow, ...bodyRows] = rows;
  return (
    <div key={key} className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-gray-800">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-slate-100 dark:bg-gray-700">
          <tr>{headerRow.map((cell, i) => <th key={i} className="border-b px-4 py-3 text-left font-semibold">{parseInlineText(cell.trim())}</th>)}</tr>
        </thead>
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-slate-50 dark:bg-gray-700'}>
              {row.map((cell, ci) => <td key={ci} className="border-b px-4 py-3">{parseInlineText(cell.trim())}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const renderList = (lines: string[], key: string | number): JSX.Element => {
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

const renderSectionValue = (value: any, key: string | number): JSX.Element => {
  if (Array.isArray(value)) {
    const hasListMarkers = value.some((item) => typeof item === 'string' && (/^\s*[-*]/.test(item) || /^\s*\*\*/.test(item)));
    if (hasListMarkers) {
      const allLines = value.map((item) => String(item)).join('\n');
      const lines = allLines.split('\n').filter(Boolean);
      const isList = lines.some((line) => /^\s*[-*]/.test(line) || /^\s*\*\*/.test(line));
      if (isList) return renderList(lines, key);
    }
    return (
      <div key={key} className="space-y-3">
        {value.map((item, idx) => <div key={idx}>{renderSectionValue(item, `${key}-${idx}`)}</div>)}
      </div>
    );
  }

  if (value && typeof value === 'object') {
    if (value.type === 'code') return <pre key={key} className="rounded-2xl bg-slate-100 p-4 text-sm dark:bg-gray-700"><code>{value.value}</code></pre>;
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
          <div className="border-l-2 border-slate-200 pl-4 dark:border-slate-700">{renderSectionValue(value, title)}</div>
        </section>
      ))}
    </div>
  );
};

export default ProjectReadmeContent;
