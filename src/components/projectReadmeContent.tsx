interface ProjectReadmeContentProps {
  readmeContent?: {
    title?: string;
    fileName?: string;
    sections?: Record<string, any>;
  };
  size?: 'sm' | 'md';
}

let inlineKey = 0;

const createInlineKey = () => `${Date.now()}-${inlineKey++}`;

const parseInlineText = (text: string): Array<string | JSX.Element> => {
  const patterns = [
    { type: 'wikiImage', regex: /!\[([^\]]*)\]\(\[\[([^\]]+)\]\]\)/ },
    { type: 'image', regex: /!\[([^\]]*)\]\(([^)]+)\)/ },
    { type: 'link', regex: /\[([^\]]+)\]\(([^)]+)\)/ },
    { type: 'code', regex: /`([^`]+)`/ },
    { type: 'strong', regex: /\*\*([^*]+)\*\*/ },
    { type: 'em', regex: /\*([^*]+)\*/ },
  ];

  const nodes: Array<string | JSX.Element> = [];
  let remaining = text;

  while (remaining.length) {
    let earliestMatch: { type: string; match: RegExpExecArray; index: number } | null = null;

    for (const pattern of patterns) {
      const match = pattern.regex.exec(remaining);
      if (match && (earliestMatch === null || match.index < earliestMatch.index)) {
        earliestMatch = { type: pattern.type, match, index: match.index };
      }
    }

    if (!earliestMatch) {
      nodes.push(remaining);
      break;
    }

    const { type, match, index } = earliestMatch;
    if (index > 0) {
      nodes.push(remaining.slice(0, index));
    }

    const [fullMatch, content, href] = match;
    const rest = remaining.slice(index + fullMatch.length);

    if (type === 'wikiImage' || type === 'image') {
      const imgSrc = type === 'wikiImage' ? match[2] : match[2].split(' ')[0];
      nodes.push(
        <img
          key={createInlineKey()}
          src={imgSrc}
          alt={content || 'Image'}
          className="max-w-full h-auto rounded-lg my-2"
        />
      );
    } else if (type === 'link') {
      nodes.push(
        <a
          key={createInlineKey()}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline decoration-blue-400 transition hover:text-blue-700 dark:text-blue-300 dark:decoration-blue-500"
        >
          {parseInlineText(content)}
        </a>
      );
    } else if (type === 'code') {
      nodes.push(
        <code
          key={createInlineKey()}
          className="rounded bg-slate-100 px-1 py-0.5 text-[0.85rem] text-slate-900 dark:bg-gray-700 dark:text-slate-100"
        >
          {content}
        </code>
      );
    } else if (type === 'strong') {
      nodes.push(
        <strong key={createInlineKey()} className="font-semibold">
          {parseInlineText(content)}
        </strong>
      );
    } else if (type === 'em') {
      nodes.push(
        <em key={createInlineKey()} className="italic">
          {parseInlineText(content)}
        </em>
      );
    }

    remaining = rest;
  }

  return nodes;
};

const isTableText = (text: string) => {
  const lines = text.split(/\r?\n/).filter(Boolean);
  return (
    lines.length >= 2 &&
    /\|/.test(lines[0]) &&
    /^\s*\|?[\s:-|]+\|?\s*$/.test(lines[1])
  );
};

const renderMarkdownTable = (text: string, key: string | number) => {
  const rows = text
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((row) => row.replace(/^\s*\|?/, '').replace(/\|?\s*$/, '').split(/\s*\|\s*/));

  if (rows.length < 2) {
    return (
      <pre key={key} className="overflow-x-auto rounded-2xl bg-slate-100 p-4 text-[0.85rem] text-slate-900 dark:bg-gray-700 dark:text-slate-100">
        {text.trim()}
      </pre>
    );
  }

  const [headerRow, ...bodyRows] = rows;

  return (
    <div key={key} className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-gray-800">
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead className="bg-slate-100 dark:bg-gray-700">
          <tr>
            {headerRow.map((cell, index) => (
              <th
                key={`th-${key}-${index}`}
                className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-100"
              >
                {parseInlineText(cell.trim())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr
              key={`tr-${key}-${rowIndex}`}
              className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-slate-50 dark:bg-gray-700'}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`td-${key}-${rowIndex}-${cellIndex}`}
                  className="border-b border-slate-200 px-4 py-3 text-slate-700 break-words dark:border-slate-700 dark:text-slate-300"
                >
                  {parseInlineText(cell.trim())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const renderTextBlock = (text: string, key: string | number) => {
  const trimmed = text.trim();

  if (isTableText(trimmed)) {
    return renderMarkdownTable(trimmed, key);
  }

  const lines = trimmed.split(/\r?\n/).filter(Boolean);
  
  const isCheckboxList = lines.every((line) => /^\s*\[([ xX])\]\s*/u.test(line.trim()));
  const isRegularList = lines.every((line) => /^\s*([-*]|\d+\.|[✅✔•])/u.test(line.trim()));

  if (isCheckboxList) {
    return (
      <ul key={key} className="space-y-2 text-slate-700 dark:text-slate-300">
        {lines.map((line, index) => {
          const match = line.match(/^\s*\[([ xX])\]\s*(.*)$/u);
          const isChecked = match && match[1].toLowerCase() === 'x';
          const content = match ? match[2] : line;
          
          return (
            <li key={index} className="flex items-start gap-2 leading-relaxed break-words">
              <span className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${isChecked ? 'bg-green-500 border-green-500' : 'border-slate-400 dark:border-slate-500'}`}>
                {isChecked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={`flex-1 ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                {parseInlineText(content)}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  if (isRegularList) {
    return (
      <ul key={key} className="space-y-2 text-slate-700 dark:text-slate-300">
        {lines.map((line, index) => {
          const content = line.replace(/^\s*([-*]|\d+\.|[✅✔•])\s*/u, '');
          return (
            <li key={index} className="flex items-start gap-2 leading-relaxed break-words">
              <span className="text-slate-400 mt-1 select-none">•</span>
              <span className="flex-1">{parseInlineText(content)}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <p key={key} className="leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line break-words">
      {parseInlineText(trimmed)}
    </p>
  );
};

const renderSectionValue = (value: any, key: string | number) => {
  if (Array.isArray(value)) {
    return (
      <div key={key} className="space-y-3">
        {value.map((item, itemIndex) => (
          <div key={`${key}-${itemIndex}`}>
            {renderSectionValue(item, `${key}-${itemIndex}`)}
          </div>
        ))}
      </div>
    );
  }

  if (value && typeof value === 'object') {
    if (value.type === 'code' && typeof value.value === 'string') {
      return (
        <pre
          key={key}
          className="overflow-x-auto rounded-2xl bg-slate-100 p-4 text-sm text-slate-900 dark:bg-gray-700 dark:text-slate-100"
        >
          <code>{value.value}</code>
        </pre>
      );
    }

    return (
      <div key={key} className="space-y-4">
        {Object.entries(value).map(([subTitle, subValue]) => (
          <div key={`${key}-${subTitle}`}>
            <h5 className="text-base font-semibold text-slate-900 dark:text-white mt-4">
              {subTitle}
            </h5>
            <div className="mt-2 space-y-3">
              {renderSectionValue(subValue, `${key}-${subTitle}`)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return renderTextBlock(String(value), key);
};

const ProjectReadmeContent = ({ readmeContent, size = 'md' }: ProjectReadmeContentProps) => {
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs';
  const headingSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const padding = size === 'sm' ? 'p-1' : 'p-2';
  
  const renderSimple = () => {
    if (!readmeContent?.sections || Object.keys(readmeContent.sections).length === 0) {
      return null;
    }

    return (
      <div className="space-y-1">
        {Object.entries(readmeContent.sections).map(([sectionTitle, sectionValue]) => (
          <div key={sectionTitle} className={`${padding} rounded bg-gray-100 dark:bg-gray-800`}>
            <h4 className={`${headingSize} font-semibold text-gray-700 dark:text-gray-300 mb-1`}>
              {sectionTitle}
            </h4>
            <div className={`${textSize} text-gray-600 dark:text-gray-400`}>
              {renderSectionValue(sectionValue, sectionTitle)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (size === 'sm') {
    return renderSimple();
  }

  if (!readmeContent?.sections || Object.keys(readmeContent.sections).length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {Object.entries(readmeContent.sections).map(([sectionTitle, sectionValue]) => (
        <section key={sectionTitle} className="space-y-3">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
            {sectionTitle}
          </h4>
          <div className="space-y-3 border-l-2 border-slate-200 pl-4 dark:border-slate-700">
            {renderSectionValue(sectionValue, sectionTitle)}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProjectReadmeContent;
