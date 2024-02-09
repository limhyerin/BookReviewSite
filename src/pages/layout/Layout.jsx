import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';

const StyledLayout = styled.div`
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
`;

// const OutletWrapper = styled.div`
//   padding-top: 70px;
// `;

const Layout = ({ authState }) => {
  return (
    <StyledLayout>
      <Header authState={authState} />
      <Outlet />
      {/* <OutletWrapper>
      </OutletWrapper> */}
    </StyledLayout>
  );
};

export default Layout;
