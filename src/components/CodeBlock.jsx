import React from 'react';

// Simple syntax highlighter for Python code
const highlightPython = (code) => {
  if (!code) return '';
  
  const keywords = ['def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'finally', 'with', 'as', 'import', 'from', 'raise', 'pass', 'break', 'continue', 'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False', 'self', 'async', 'await', 'yield', 'lambda', 'global', 'nonlocal', 'assert', 'del'];
  const builtins = ['print', 'len', 'str', 'int', 'float', 'bool', 'list', 'dict', 'set', 'tuple', 'type', 'isinstance', 'hasattr', 'getattr', 'setattr', 'range', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'sum', 'max', 'min', 'any', 'all', 'open', 'super'];
  const types = ['Optional', 'Dict', 'List', 'Any', 'Tuple', 'Union', 'Set', 'Callable', 'str', 'int', 'float', 'bool'];

  // Split by lines to preserve structure
  return code.split('\n').map((line, lineIndex) => {
    const parts = [];
    let remaining = line;
    let keyIndex = 0;

    // Handle comments first
    const commentIndex = remaining.indexOf('#');
    let commentPart = '';
    if (commentIndex !== -1) {
      commentPart = remaining.substring(commentIndex);
      remaining = remaining.substring(0, commentIndex);
    }

    // Process the non-comment part
    // Match strings (both single and double quotes)
    const stringRegex = /(["'`])(?:(?!\1)[^\\]|\\.)*?\1|f(["'])(?:(?!\2)[^\\]|\\.)*?\2/g;
    let lastIndex = 0;
    let match;
    const segments = [];

    while ((match = stringRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: 'code', text: remaining.substring(lastIndex, match.index) });
      }
      segments.push({ type: 'string', text: match[0] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < remaining.length) {
      segments.push({ type: 'code', text: remaining.substring(lastIndex) });
    }

    // Process each segment
    segments.forEach((segment, segIndex) => {
      if (segment.type === 'string') {
        parts.push(<span key={`${lineIndex}-${keyIndex++}`} className="string">{segment.text}</span>);
      } else {
        // Process code for keywords, decorators, etc.
        let text = segment.text;
        
        // Handle decorators
        if (text.trim().startsWith('@')) {
          const decoratorMatch = text.match(/^(\s*)(@\w+)/);
          if (decoratorMatch) {
            parts.push(<span key={`${lineIndex}-${keyIndex++}`}>{decoratorMatch[1]}</span>);
            parts.push(<span key={`${lineIndex}-${keyIndex++}`} className="decorator">{decoratorMatch[2]}</span>);
            text = text.substring(decoratorMatch[0].length);
          }
        }

        // Tokenize remaining text
        const tokenRegex = /(\b\w+\b|[^\w\s]+|\s+)/g;
        let tokenMatch;
        while ((tokenMatch = tokenRegex.exec(text)) !== null) {
          const token = tokenMatch[0];
          if (keywords.includes(token)) {
            parts.push(<span key={`${lineIndex}-${keyIndex++}`} className="keyword">{token}</span>);
          } else if (builtins.includes(token)) {
            parts.push(<span key={`${lineIndex}-${keyIndex++}`} className="builtin">{token}</span>);
          } else if (types.includes(token)) {
            parts.push(<span key={`${lineIndex}-${keyIndex++}`} className="class-name">{token}</span>);
          } else if (/^\d+\.?\d*$/.test(token)) {
            parts.push(<span key={`${lineIndex}-${keyIndex++}`} className="number">{token}</span>);
          } else if (/^[=+\-*/<>!&|%^~]+$/.test(token)) {
            parts.push(<span key={`${lineIndex}-${keyIndex++}`} className="operator">{token}</span>);
          } else if (/^[()[\]{},.:;]+$/.test(token)) {
            parts.push(<span key={`${lineIndex}-${keyIndex++}`} className="punctuation">{token}</span>);
          } else {
            parts.push(<span key={`${lineIndex}-${keyIndex++}`}>{token}</span>);
          }
        }
      }
    });

    // Add comment if present
    if (commentPart) {
      parts.push(<span key={`${lineIndex}-${keyIndex++}`} className="comment">{commentPart}</span>);
    }

    return (
      <React.Fragment key={lineIndex}>
        {parts}
        {lineIndex < code.split('\n').length - 1 && '\n'}
      </React.Fragment>
    );
  });
};

const CodeBlock = ({ code, language = 'python', className = '' }) => {
  return (
    <pre className={`code-snippet ${className}`}>
      {language === 'python' ? highlightPython(code) : code}
    </pre>
  );
};

export const InlineCode = ({ children }) => {
  return <code className="code-block">{children}</code>;
};

export default CodeBlock;
