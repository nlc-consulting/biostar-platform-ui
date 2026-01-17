import { Admin, Authenticated, CustomRoutes, defaultTheme, Resource } from 'react-admin';
import { createTheme } from '@mui/material/styles';
import ContactList from './contacts/ContactList';
import ContactEdit from './contacts/ContactEdit';
import ContactCreate from './contacts/ContactCreate';
import GroupList from './groups/GroupList.tsx';
import GroupEdit from './groups/GroupEdit.tsx';
import GroupCreate from './groups/GroupCreate.tsx';
import OpportunityList from './opportunities/OpportunityList.tsx';
import ProgramList from './programs/ProgramList.tsx';
import ProgramCreate from './programs/ProgramCreate.tsx';
import ProgramEdit from './programs/ProgramEdit.tsx';
import OpportunityCreate from './opportunities/OpportunityCreate.tsx';
import OpportunityEdit from './opportunities/OpportunityEdit.tsx';
import { Route } from 'react-router-dom';
import DashboardPage from './dashboard/Dashboard.tsx';
import ProjectList from './projects/ProjectList.tsx';
import ProjectEdit from './projects/ProjectEdit.tsx';
import ProjectCreate from './projects/ProjectCreate.tsx';
import ProjectContactEdit from './project-contacts/ProjectContactEdit.tsx';
import { authProvider } from './authProvider.ts';
import dataProvider from './dataProvider.ts';
import CustomLayout from './CustomLayout.tsx';
import ReportsLandingPage from './reports/ReportsLandingPage.tsx';
import PipelineReportPage from './reports/PipelineReportPage.tsx';
import WonReportPage from './reports/WonReportPage.tsx';
import CompanyList from './companies/CompanyList.tsx';
import CompanyEdit from './companies/CompanyEdit.tsx';
import CompanyCreate from './companies/CompanyCreate.tsx';
import IntroductionsReportPage from './reports/IntroductionsReportPage.tsx';
import LostButTrackPage from './reports/LostButTrackPage.tsx';
import GroupEventEdit from './events/GroupEventEdit.tsx';
import LeadList from './leads/LeadList.tsx';
import LeadCreate from './leads/LeadCreate.tsx';
import LeadEdit from './leads/LeadEdit.tsx';
import LeadShow from './leads/LeadShow.tsx';
import UserList from './users/UserList.tsx';
import UserCreate from './users/UserCreate.tsx';
import LoginPage from './LoginPage.tsx';

const theme = createTheme({
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      ...defaultTheme.palette?.primary,
      main: '#204487'
    },
    secondary: {
      ...defaultTheme.palette?.secondary,
      main: '#204487'
    }
  }
});

export const AppAdmin = () => (
  <Admin
    dataProvider={dataProvider}
    dashboard={DashboardPage}
    authProvider={authProvider}
    theme={theme}
    loginPage={LoginPage}
    layout={CustomLayout}
  >
    <CustomRoutes>

      <Route
        path="/"
        element={
          <Authenticated>
            <DashboardPage />
          </Authenticated>
        }
      />
      <Route
        path="/reports"
        element={
          <Authenticated>
            <ReportsLandingPage />
          </Authenticated>
        }
      />
      <Route
        path="/reports/pipeline"
        element={
          <Authenticated>
            <PipelineReportPage />
          </Authenticated>
        }
      />
      <Route
        path="/reports/introductions"
        element={
          <Authenticated>
            <IntroductionsReportPage />
          </Authenticated>
        }
      />

      <Route
        path="/reports/won"
        element={
          <Authenticated>
            <WonReportPage />
          </Authenticated>
        }
      />

      <Route
        path="/reports/lost-but-tracked"
        element={
          <Authenticated>
            <LostButTrackPage />
          </Authenticated>
        }
      />
    </CustomRoutes>

    <Resource name="companies" list={CompanyList} edit={CompanyEdit} create={CompanyCreate} />

    <Resource name="leads" list={LeadList} edit={LeadEdit} create={LeadCreate} show={LeadShow} />
    <Resource name="contacts" list={ContactList} edit={ContactEdit} create={ContactCreate} />
    <Resource name="groups" list={GroupList} edit={GroupEdit} create={GroupCreate} />
    <Resource name="group-events" edit={GroupEventEdit} />

    <Resource
      name="opportunities"
      list={OpportunityList}
      edit={OpportunityEdit}
      create={OpportunityCreate}
    />
    <Resource name="projects" list={ProjectList} edit={ProjectEdit} create={ProjectCreate} />
    <Resource name="project-contacts" edit={ProjectContactEdit} />
    <Resource name="programs" list={ProgramList} edit={ProgramEdit} create={ProgramCreate} />
    <Resource name="users" list={UserList} create={UserCreate} />
  </Admin>
);
