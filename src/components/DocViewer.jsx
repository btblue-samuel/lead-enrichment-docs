import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DocViewer = () => {
  const { filename } = useParams();
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filename) return;

    // Decode filename because it's URL encoded in the route
    const decodedFilename = decodeURIComponent(filename);

    fetch(`/docs/${decodedFilename}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load documentation');
        }
        return response.text();
      })
      .then(text => {
        setContent(text);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load the documentation file. Please make sure it exists.');
        setContent('');
      });
  }, [filename]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="markdown-body">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
};

export default DocViewer;
