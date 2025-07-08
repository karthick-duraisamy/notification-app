import { lazy } from 'react';
import { Login } from '../pages/Landing/Login/Login';
import { ForgotPassword } from '../pages/Landing/ForgotPassword/ForgotPassword';
const LandingLayout = lazy(() => import('../layouts/Landing/Landing'));
const TemplateLayout = lazy(() => import('../layouts/Template/Template'));

// const Login = lazy(() => import('../pages/Landing/Login/Login'));
// const ForgotPassword = lazy(() => import('../pages/Landing/ForgotPassword/ForgotPassword.lazy'));
const ResetPassword = lazy(() => import('../pages/Landing/ResetPassword/ResetPassword.lazy'));

const HomeLayout = lazy(() => import('../layouts/Home/Home'));
const Dashboard = lazy(() => import('../pages/Authenticated/Dashboard/Dashbard'));
const Templates = lazy(() => import('../pages/Authenticated/Templates/Templates'));
const Editor = lazy(() => import('../pages/Authenticated/Templates/subPages/Editor/Editor'));
const Project = lazy(() => import('../pages/Authenticated/Project/Project'));
const ProjectForm = lazy(() => import('../pages/Authenticated/Project/ProjectForm'));
const Settings = lazy(() => import('../pages/Authenticated/Settings/Settings.lazy'));
const SettingsForm = lazy(() => import('../pages/Authenticated/Settings/SettingsForm'));
const noDataFound = lazy(() => import('../pages/Authenticated/NoDataFound/NoDataFound'));
const Integration = lazy(() => import('../pages/Authenticated/Integration/Integration'));
const Mailer = lazy(() => import('../pages/Authenticated/Mailer/Mailer'));
const MailerOperations = lazy(() => import('../pages/Authenticated/Mailer/MailerForm'));
const Contacts = lazy(() => import('../pages/Authenticated/Contacts/Contacts'));
const ContactsForm = lazy(() => import('../pages/Authenticated/Contacts/ContactsForm'));
const Variables = lazy(() => import('../pages/Authenticated/Variables/Variables'));
const VariablesForm = lazy(() => import('../pages/Authenticated/Variables/VariablesForm'));
const Tracking = lazy(() => import('../pages/Authenticated/Tracking/Tracking'));
const Campaign = lazy(() => import('../pages/Authenticated/Campaign_V3/CampaignList/CampaignList'));
const CampaignForm = lazy(() => import('../pages/Authenticated/Campaign_V3/CampaignForm/CampaignForm'));
const ViewCampaign = lazy(() => import('../pages/Authenticated/Campaign_V3/ViewCampaign/ViewCampaign'));
const ManageGroup = lazy(() => import('../pages/Authenticated/ManageGroup/ManageGroup'));
const ManageGroupForm = lazy(() => import('../pages/Authenticated/ManageGroup/ManageGroupForm/ManageGroupForm'));
const GroupViewPage = lazy(() => import('../pages/Authenticated/ManageGroup/ManageGroupForm/GroupView/GroupView'));
const Segments = lazy(() => import('../pages/Authenticated/Segments/Segments'));
const CreateSegment = lazy(() => import('../pages/Authenticated/Segments/CreateSegment/CreateSegment'));
const ViewSegment = lazy(() => import('../pages/Authenticated/Segments/ViewSegments/ViewSegment'));
const HtmlEditor = lazy(() => import('../pages/Authenticated/Templates/subPages/NewTemplatePage/HtmlEditor'));
const InboxApp = lazy(() => import('../pages/Authenticated/InboxApp/InboxApp'));

// version 2 Pages
const Project_V2 = lazy(() => import('../pages/Authenticated/Project_V2/Project'));
const ManageGroup_V2 = lazy(() => import('../pages/Authenticated/ManageGroup_V2/ManageGroup'));
const GroupViewPage_V2 = lazy(
  () => import('../pages/Authenticated/ManageGroup_V2/ManageGroupForm/GroupView/GroupView')
);
// const CampaignForm_v2 = lazy(() => import('../pages/Authenticated/Campaign_v2/CampaignForm/CampaignForm'));
// const ViewCampaign_V2 = lazy(() => import('../pages/Authenticated/Campaign_v2/ViewCampaign/ViewCampaign'));
// const Campaign_V2 = lazy(() => import('../pages/Authenticated/Campaign_v2/CampaignList/CampaignList'));

// version 3 Pages
const ManageGroup_V3 = lazy(() => import('../pages/Authenticated/ManageGroup_V3/ManageGroup'));
const GroupViewPage_V3 = lazy(
  () => import('../pages/Authenticated/ManageGroup_V3/ManageGroupForm/GroupView/GroupView')
);
// const Campaign_V3 = lazy(() => import('../pages/Authenticated/Campaign_V3/CampaignList/CampaignList'));

const Components = new Map();
Components.set('Login', Login);
Components.set('ForgotPassword', ForgotPassword);
Components.set('ResetPassword', ResetPassword);
Components.set('Dashboard', Dashboard);
Components.set('Editor', Editor);
Components.set('Templates', Templates);
Components.set('HtmlEditor', HtmlEditor);
Components.set('Project', Project);
Components.set('ProjectForm', ProjectForm);
Components.set('Mailer', Mailer);
Components.set('noDataFound', noDataFound);
Components.set('MailerOperations', MailerOperations);
Components.set('Variables', Variables);
Components.set('VariablesForm', VariablesForm);
Components.set('Settings', Settings);
Components.set('Integration', Integration);
Components.set('SettingsForm', SettingsForm);
Components.set('Tracking', Tracking);
Components.set('Contacts', Contacts);
Components.set('ContactsForm', ContactsForm);
Components.set('ManageGroup', ManageGroup);
Components.set('ManageGroupForm', ManageGroupForm);
Components.set('GroupViewPage', GroupViewPage);
Components.set('Campaign', Campaign);
Components.set('CampaignForm', CampaignForm);
Components.set('ViewCampaign', ViewCampaign);
Components.set('Segments', Segments);
Components.set('CreateSegment', CreateSegment);
Components.set('ViewSegment', ViewSegment);
Components.set('InboxApp', InboxApp);
// Components.set('CampaignForm_v2', CampaignForm_v2);

// version 2 commponents
Components.set('Project_V2', Project_V2);
Components.set('ManageGroup_V2', ManageGroup_V2);
Components.set('GroupViewPage_V2', GroupViewPage_V2);
// Components.set('ViewCampaign_V2', ViewCampaign_V2);
// Components.set('Campaign_V2', Campaign_V2);

// version 3 components
Components.set('ManageGroup_V3', ManageGroup_V3);
Components.set('GroupViewPage_V3', GroupViewPage_V3);
// Components.set('Campaign_V3', Campaign_V3);

const Layouts = new Map();
Layouts.set('LandingLayout', LandingLayout);
Layouts.set('HomeLayout', HomeLayout);
Layouts.set('TemplateLayout', TemplateLayout);

export { Components, Layouts };
