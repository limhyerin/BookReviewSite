import {
  StyledReviewDetailUi,
  StyledTitleAndUbtnAndDbtn,
  StyledReviewTitle,
  StyledUBtn,
  StyledDBtn,
  StyledLogoAndNicknameAndDate,
  StyledReviewText,
  StyledBookInfo,
  StyledBtnWrapper,
  StyledReviewBox,
  StyledLogo,
  StyledHomeBtn,
  StyledBookCover
} from './ReviewDetailPageStyled.js';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import bookieProfile from '../../assets/bookieProfile.jpg';
import book from '../../assets/book.jpg';

const ReviewDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const reviews = useSelector((state) => state.reviewsReducer.reviews); //useSelector로 리뷰데이터 가져오기
  const newReviewDetail = reviews.find((review) => review.id === id) || {}; // 가져온 데이터를 useParams아이디랑 매치시키기
  const [update, setUpdate] = useState(false);
  const [inputValue, setInputValue] = useState(newReviewDetail.content || '');

  console.log(reviews);
  const uBtnHandler = () => (update ? TextAreaUBtnHandler() : setUpdate(!update));

  const TextAreaUBtnHandler = () => {
    if (window.confirm('이대로 수정하시겠습니까?')) {
      if (newReviewDetail.content === inputValue) {
        alert('변경된 내용이 없습니다.');
      }
      setUpdate(!update);
      alert('수정되었습니다.');
      navigate('/review');
    }
  };
  const uDtnHandler = () => navigate('/review');

  return (
    <div>
      <StyledReviewDetailUi>
        <StyledReviewBox>
          <StyledTitleAndUbtnAndDbtn>
            <StyledReviewTitle>{newReviewDetail.title}</StyledReviewTitle>
            <StyledBtnWrapper>
              <StyledUBtn text="수정" color="main" onClick={uBtnHandler}></StyledUBtn>
              <StyledDBtn text="삭제" color="main" onClick={uDtnHandler}></StyledDBtn>
            </StyledBtnWrapper>
          </StyledTitleAndUbtnAndDbtn>
          <StyledLogoAndNicknameAndDate>
            <StyledLogo>
              <img src={bookieProfile} alt="Profile" />
            </StyledLogo>
            {/* {newReviewDetail.authorName} {newReviewDetail.createdAt} */}
          </StyledLogoAndNicknameAndDate>
          <StyledReviewText>{newReviewDetail.content}</StyledReviewText>
          <StyledBookInfo>
            <StyledBookCover>
              <img src={newReviewDetail.image || book} alt="Book Cover" />
            </StyledBookCover>
            {newReviewDetail.bookTitle} {newReviewDetail.authorName}
          </StyledBookInfo>
        </StyledReviewBox>
        <StyledHomeBtn
          text="뒤로가기"
          color="main"
          onClick={() => {
            navigate(`/review`);
          }}
        ></StyledHomeBtn>
      </StyledReviewDetailUi>
    </div>
  );
};

export default ReviewDetailPage;
