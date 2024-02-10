import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';

const StyledLayout = styled.div`
  min-height: 100vh;
  margin: 0 auto;
`;
const StyledMain = styled.main`
  height: calc(100vh - 70px);
  padding-top: 70px;
`;
const Layout = ({ authState }) => {
  return (
    <StyledLayout>
      <Header authState={authState} />
      <StyledMain style={{ paddingTop: '70px', height: 'calc(100vh - 70px)' }}>
        <Outlet />
      </StyledMain>
    </StyledLayout>
  );
};

export default Layout;
