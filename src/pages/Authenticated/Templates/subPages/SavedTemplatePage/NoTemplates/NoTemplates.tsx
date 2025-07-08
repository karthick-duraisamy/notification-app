import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import NoDataFound from '../../../../NoDataFound/NoDataFound';

const NoTemplates = () => {
  const navigate = useNavigate();

  // Handle for create New template
  const handleClick = () => {
    navigate('/templates/new/default');
  };
  return (
    <div className="NoTemplates text-center">
      <NoDataFound />
      <h2 className="f-sbold">You have not Saved any templates</h2>
      <p>Click “ New template ” option to create a template</p>
      <Button type="primary" onClick={handleClick}>
        New template
      </Button>
    </div>
  );
};
export default NoTemplates;
