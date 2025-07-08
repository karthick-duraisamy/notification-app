import React from 'react';

interface JSONViewerProps {
  jsonEditorValue: any;
}

const JSONViewer: React.FC<JSONViewerProps> = ({ jsonEditorValue }) => {
  const renderJson = (json: any) => {
    if (typeof json === 'string') {
      return <span style={{ color: '#dd4b0f' }}>"{json}"</span>; // Orange for string values
    }
    if (typeof json === 'number' || typeof json === 'boolean') {
      return <span style={{ color: '#116ab3' }}>{String(json)}</span>; // Green for numbers/booleans
    }
    if (Array.isArray(json)) {
      return (
        <span style={{ color: '#000000' }}>
          [
          {json.map((item, index) => (
            <React.Fragment key={index}>
              {renderJson(item)}
              {index < json.length - 1 && ', '}
            </React.Fragment>
          ))}
          ]
        </span>
      );
    }
    if (typeof json === 'object' && json !== null) {
      const entries = Object.entries(json);
      return (
        <span style={{ color: '#000000' }}>
          {'{'}
          {entries.map(([key, value], index) => (
            <div key={key} style={{ paddingLeft: '20px' }}>
              <span style={{ color: '#569cd6' }}>"{key}"</span>: {renderJson(value)}
              {index < entries.length - 1 && ','}
            </div>
          ))}
          {'}'}
        </span>
      );
    }
    return <span>{String(json)}</span>;
  };

  return (
    <pre
      style={{
        backgroundColor: '#ebebeb',
        padding: '10px',
        borderRadius: '4px',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#d4d4d4',
        whiteSpace: 'pre-wrap',
        overflowX: 'auto',
        maxWidth: '100%'
      }}
    >
      {renderJson(jsonEditorValue)}
    </pre>
  );
};

export default JSONViewer;
