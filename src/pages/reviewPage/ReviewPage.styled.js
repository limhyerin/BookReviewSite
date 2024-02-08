import styled from 'styled-components';

export const StyledSidebar = styled.div`
  // flex: 1;
  position: sticky;
  //position: -webkit-sticky;
  top: 0;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.mainBlack};
  color: #fff;
`;
