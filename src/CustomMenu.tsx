import { Menu, MenuItemLink } from 'react-admin';
import {
  InsertChart
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const CustomMenu = () => {
  const location = useLocation();

  return (
    <Menu>
      <Menu.DashboardItem />
        <MenuItemLink
          to="/leads"
          primaryText="Leads"
          leftIcon={<InsertChart />}
          selected={location.pathname === '/leads'}
        />
      {/*<MenuItemLink*/}
      {/*  to="/reports"*/}
      {/*  primaryText="Reports"*/}
      {/*  leftIcon={<InsertChart />}*/}
      {/*  selected={location.pathname === '/reports'}*/}
      {/*/>*/}
      {/*<MenuItemLink*/}
      {/*  to="/contacts"*/}
      {/*  primaryText="Contacts"*/}
      {/*  leftIcon={<People />}*/}
      {/*  selected={location.pathname.startsWith('/contacts')}*/}
      {/*/>*/}
      {/*<MenuItemLink*/}
      {/*  to="/companies"*/}
      {/*  primaryText="Companies"*/}
      {/*  leftIcon={<Store />}*/}
      {/*  selected={location.pathname.startsWith('/companies')}*/}
      {/*/>*/}
      {/*<MenuItemLink*/}
      {/*  to="/groups"*/}
      {/*  primaryText="Groups"*/}
      {/*  leftIcon={<GroupIcon />}*/}
      {/*  selected={location.pathname.startsWith('/groups')}*/}
      {/*/>*/}
      {/*<MenuItemLink*/}
      {/*  to="/opportunities"*/}
      {/*  primaryText="Opportunities"*/}
      {/*  leftIcon={<Work />}*/}
      {/*  selected={location.pathname.startsWith('/opportunities')}*/}
      {/*/>*/}
      {/*<MenuItemLink*/}
      {/*  to="/projects"*/}
      {/*  primaryText="Projects"*/}
      {/*  leftIcon={<Assignment />}*/}
      {/*  selected={location.pathname.startsWith('/projects')}*/}
      {/*/>*/}
      {/*<MenuItemLink*/}
      {/*  to="/programs"*/}
      {/*  primaryText="Programs"*/}
      {/*  leftIcon={<Settings />}*/}
      {/*  selected={location.pathname.startsWith('/programs')}*/}
      {/*/>*/}
    </Menu>
  );
};

export default CustomMenu;
