import { useLocation } from 'react-router';
import './LandingImage.scss';

const LandingImage = () => {
  const { pathname } = useLocation();
  const imageClass: string = (pathname as any).replaceAll('/', '');

  return (
    <div className="LandingImage" data-testid="landingimage">
      <div className={imageClass}></div>
    </div>
  );
};

export { LandingImage };
