import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';

const StyledLayout = styled.div`
  min-height: 100vh;
  margin: 0 auto;
`;
const StyledMain = styled.main`
  height: 100vh;
  padding-top: 70px;
  background-color: ${({ theme }) => theme.colors.bg};
`;
const Layout = () => {
  return (
    <StyledLayout>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledLayout>
  );
};

export default Layout;
