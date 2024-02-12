import React from 'react';
import styled from 'styled-components';
import bookieProfileImage from '../../../assets/bookieProfile.jpg';

const TapReview = () => {
  return (
    <Container>
      <Styleimg />
      <p>등록하신 리뷰가 없습니다.</p>
    </Container>
  );
};

const Container = styled.div`
  margin-left: 13rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Styleimg = styled.div`
  width: 370px;
  height: 250px;
  margin-right: 4rem;
  background-image: url(${bookieProfileImage});
  background-size: cover;
  background-position: center;
`;

export default TapReview;
