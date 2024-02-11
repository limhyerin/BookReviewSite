import {
  StyledReviewDetailUi,
  StyledTitleAndUbtnAndDbtn,
  StyledReviewTitle,
  StyledUBtn,
  StyledDBtn,
  StyledLogoAndNicknameAndDate,
  StyledReviewText,
  StyledReviewTags,
  StyledBookInfo,
  StyledHomeBtn
} from './ReviewDetailPageStyled.js';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReviewDetailPage = ({ newReviewData }) => {
  //newReviewData 데이터 연결
  const { id } = useParams();
  const newReviewDetail = newReviewData.find((item) => item.id === id);
  const [update, setUpdate] = useState(false);
  return (
    <div>
      <StyledReviewDetailUi>
        <StyledTitleAndUbtnAndDbtn>
          <StyledReviewTitle>{newReviewDetail.title}</StyledReviewTitle>
          <StyledUBtn>수정</StyledUBtn>
          <StyledDBtn>삭제</StyledDBtn>
        </StyledTitleAndUbtnAndDbtn>
        <StyledLogoAndNicknameAndDate>
          로고 {newReviewDetail.authorName} {newReviewDetail.createdAt}
        </StyledLogoAndNicknameAndDate>
        <StyledReviewText>{newReviewDetail.content}</StyledReviewText>
        <StyledReviewTags>#</StyledReviewTags>
        <StyledBookInfo>책정보</StyledBookInfo>
      </StyledReviewDetailUi>
      <StyledHomeBtn>홈버튼</StyledHomeBtn>
    </div>
  );
};

export default ReviewDetailPage;
