// import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

const Integration = () => {
  //to get Readme file here
  const input = require('../../../../README.md');
  const [markdown, setmarkdown] = useState('');

  useEffect(() => {
    fetch(input)
      .then((res) => res.text())
      .then((text) => setmarkdown(text));
  }, []);
  return (
    <div data-color-mode="light">
      <MarkdownPreview source={markdown} />
    </div>
  );
};

export default Integration;
