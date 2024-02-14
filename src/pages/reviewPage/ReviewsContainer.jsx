import React from 'react';
import CustomButton from '../../components/CustomButton';
import ReviewCard from './ReviewCard';
import styled from 'styled-components';

const WholeReviews = ({ selectedGenre, reviews }) => {
  if (selectedGenre === '전체') {
    if (reviews.length > 0) {
      return reviews.map((review) => <ReviewCard key={review.id} review={review} />);
    } else {
      return <StyledNoReviews>작성된 리뷰가 없습니다.</StyledNoReviews>;
    }
  }
};

const FilteredReviews = ({ reviews, selectedGenre }) => {
  if (selectedGenre !== '전체') {
    const filteredReviews = reviews.filter((review) => review.genre === selectedGenre);
    if (filteredReviews.length > 0) {
      return filteredReviews.map((review) => <ReviewCard key={review.id} review={review} />);
    } else {
      return <StyledNoReviews>작성된 리뷰가 없습니다.</StyledNoReviews>;
    }
  }
};

const ReviewsContainer = ({ openModal, selectedGenre, reviews }) => {
  return (
    <StyledReviewsContainer>
      <div className="pageTitleWrap">
        <p className="pageTitle">{selectedGenre}</p>
        <CustomButton text="작성하기" color="main" onClick={openModal}></CustomButton>
      </div>
      <StyledReviews>
        <ul>
          <WholeReviews selectedGenre={selectedGenre} reviews={reviews} />
          <FilteredReviews reviews={reviews} selectedGenre={selectedGenre} />
        </ul>
      </StyledReviews>
    </StyledReviewsContainer>
  );
};

export default ReviewsContainer;

const StyledReviewsContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;

  .pageTitleWrap {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    width: 90%;
    margin: 0 auto;
    .pageTitle {
      font-size: ${(props) => props.theme.fontSize.xl2};
    }
  }
`;

const StyledReviews = styled.div`
  ul {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-content: center;
    margin-top: 30px;
    gap: 2rem;
    a {
      text-decoration: none;
      color: black;
    }
  }
`;

const StyledNoReviews = styled.div`
  margin-top: 20px;
  font-size: ${(props) => props.theme.fontSize.xl};
`;
