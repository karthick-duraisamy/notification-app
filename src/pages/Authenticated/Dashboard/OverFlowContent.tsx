import { Badge, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';

const OverFlowContent: React.FC<{ text: string; prefix?: string; maxWidth?: string; type?: string }> = ({
  text,
  prefix,
  maxWidth,
  type
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsOverflowing(element.scrollWidth > element.clientWidth);
    }
  }, [text]);

  return (
    <Tooltip
      title={isOverflowing ? text : null}
      overlayInnerStyle={{
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '4px'
      }}
    >
      <div
        ref={textRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
          maxWidth
        }}
      >
        {type ? (
          <>
            <Badge status="error" />
            <span style={{ color: '#ff0000', marginLeft: '5px' }}>{text}</span>
          </>
        ) : (
          <>
            {prefix && <strong>{prefix}</strong>} {text}
          </>
        )}
      </div>
    </Tooltip>
  );
};

export default OverFlowContent;
