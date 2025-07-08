import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';
import './DocumentHead.scss';

const DocumentHead = (props?: any) => {
  const { pathname } = useLocation();
  const localationData = props?.data ? props.data : pathname;
  let title, description;

  switch (localationData) {
    case '/login':
      [title, description] = ['Login', 'Login to your account'];
      break;
    case '/forgot-password':
      [title, description] = ['Forgot  password', 'Forgot your password'];
      break;
    case '/reset-password':
      [title, description] = ['Reset  password', 'Reset your password'];
      break;
    case '/dashboard':
    default:
      [title, description] = ['GRM Notification', 'Welcome to the GRM Notification'];
  }

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export { DocumentHead };
