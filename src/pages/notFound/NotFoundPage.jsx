import React from 'react';
import bookieNotFound from '../../assets/bookieNotFound.png';
import styled from 'styled-components';

const StyledNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  img {
    width: 130px;
  }
  p {
    color: #666;
    margin-top: 15px;
    font-size: ${(props) => props.theme.fontSize.xl2};
  }
`;

const NotFoundPage = () => {
  return (
    <StyledNotFound>
      <img src={bookieNotFound} alt="notFound" />
      <p>페이지를 찾을 수 없습니다</p>
    </StyledNotFound>
  );
};

export default NotFoundPage;
