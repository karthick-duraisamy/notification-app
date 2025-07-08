import { Breadcrumb as AntBreadcrumb } from 'antd';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import './Breadcrumb.scss';

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/').filter(Boolean);
  const pathCount = pathSegments.length - 1;

  if (pathname.includes('template')) {
    const { pathname, search } = window.location;
    localStorage.setItem('lastLocation', pathname + search);
  }

  const breadcrumbItems = [
    {
      title: <a href="/">Home</a>,
    },
    ...pathSegments.map((value, index) => {
      let label = decodeURIComponent(value);
      if (value === 'new') {
        label = 'new template';
      } else if (value === 'layout') {
        label = 'template layout';
      } else if (value === 'saved') {
        label = 'my saved templates';
      }

      return {
        title:
          index === pathCount ? (
            <StyledLabel as="span">{label}</StyledLabel>
          ) : (
            <StyledLabel as="div">{label}</StyledLabel>
          ),
      };
    }),
  ];

  return <AntBreadcrumb data-testid="breadcrum" items={breadcrumbItems} />;
};

const StyledLabel = styled.span`
  display: inline-block;

  &::first-letter {
    text-transform: uppercase;
  }
`;

export { Breadcrumb };
