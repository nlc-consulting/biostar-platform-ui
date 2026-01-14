// CustomLayout.tsx
import { Layout, type LayoutProps } from 'react-admin';
import CustomMenu from './CustomMenu';

const CustomLayout = (props: LayoutProps) => {
  return <Layout {...props} menu={CustomMenu} />;
};

export default CustomLayout;
