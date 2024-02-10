import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';

const StyledLayout = styled.main`
  max-width: 1440px;
  margin: 0 auto;
`;

const Layout = ({ authState }) => {
  return (
    <StyledLayout>
      <Header authState={authState} />
      <Outlet />
    </StyledLayout>
  );
};

export default Layout;
