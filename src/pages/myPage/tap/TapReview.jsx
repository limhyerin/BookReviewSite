import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ReviewCard from '../../reviewPage/ReviewCard';
import useFirestore from '../../../hooks/useFirestore';
import CustomLoading from '../../../components/CustomLoading';

const TapReview = () => {
  const { loading } = useFirestore('book-reviews');
  const reviews = useSelector((state) => state.reviewsReducer).reviews;
  const { userInfo } = useSelector((state) => state.authReducer);
  const userReviews = reviews.filter((review) => review.author === userInfo.uid);

  return (
    <>
      {loading ? (
        <StyledLoadingContainer>
          <CustomLoading />
        </StyledLoadingContainer>
      ) : (
        <Container>
          {userReviews.length > 0 ? (
            userReviews.map((review) => <ReviewCard key={review.id} review={review} />)
          ) : (
            <p>등록하신 리뷰가 없습니다.</p>
          )}
        </Container>
      )}
    </>
  );
};
const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Container = styled.div`
  width: 90%;
  justify-content: center;
  margin: 0 auto;
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

export default TapReview;
