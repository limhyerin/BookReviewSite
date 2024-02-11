import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
const ReviewCard = ({ review }) => {
  return (
    <StyledReviewCard key={review.id}>
      <Link key={review.id} to={`/review-detail/${review.id}`}>
        <div className="card">
          <p className="userWrap">
            <span className="profile">{/* <img src="프사" alt="프사" /> */}</span>
            <span>{review.authorName}</span>
          </p>
          <div className="imgWrapper">
            <img src={review.image} alt={review.title} />
          </div>
          <p className="bookTitle">
            {review.bookAuthor} - {review.bookTitle}
          </p>
          <p className="title">{review.title}</p>
        </div>
      </Link>
    </StyledReviewCard>
  );
};

export default ReviewCard;

const StyledReviewCard = styled.li`
  cursor: pointer;
  list-style: none;
  //width: 22%;
  border-radius: 10px;
  background-color: #fff;
  .card {
    /* border: 1px solid ${(props) => props.theme.colors.mainGray}; */
    padding: 10px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);

    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
    .userWrap {
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid ${(props) => props.theme.colors.mainGray};
    }
    .profile {
      width: 30px;
      height: 30px;
      background-color: #ccc;
      display: inline-block;
      border-radius: 30px;
      margin-right: 5px;
    }
    .bookTitle {
      margin-top: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .imgWrapper {
      height: 270px;
      overflow: hidden;
    }
    img {
      width: 70%;
    }
    .title {
      border-top: 1px solid ${(props) => props.theme.colors.mainGray};
      margin-top: 10px;
      padding: 10px;
    }
  }
`;
