import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
const ReviewCard = ({ review }) => {
  return (
    <StyledReviewCard key={review.id}>
      <Link key={review.id} to={`/review-detail/${review.id}`}>
        <div className="card">
          <p className="userWrap">
            <span className="profile">
              <img src={review.authorProfile} alt="프사" />
            </span>
            <span>{review.authorName}</span>
          </p>
          <div className="imgWrapper">
            <img src={review.image} alt={review.title} />
          </div>
          <p className="bookTitle">{/* {review.bookAuthor} - {review.bookTitle} */}</p>
          <p className="title"> {review.title}</p>
          <p className="content"> {review.content}</p>
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

    padding: 10px 10px 30px 10px;
    /* overflow: hidden;
    white-space: nowrap; */
    .userWrap {
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid ${(props) => props.theme.colors.mainGray};
    }
    .profile {
      width: 40px;
      height: 40px;
      box-shadow: 1px 2px 2px hsl(0deg 0% 0% / 0.25);
      display: inline-block;
      border-radius: 30px;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
      }
    }
    .bookTitle {
      margin-top: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #333;
      font-size: ${(props) => props.theme.fontSize.xs};
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
      text-align: left;
    }
    .content {
      font-size: ${(props) => props.theme.fontSize.xs};
      color: #666;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      text-align: left;
      padding: 0 10px 20px 10px;
      height: 45px;
      line-height: 130%;
    }
  }
`;
