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
  StyledBtnWrapper,
  StyledReviewBox
} from './ReviewDetailPageStyled.js';
import CustomButton from '../../components/CustomButton';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewDetailPage = ({ newReviewData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const newReviewDetail = 1; //newReviewData 데이터 연결 지금연결하면 오류발생
  const [update, setUpdate] = useState(false);
  const [inputValue, setInputValue] = useState(newReviewDetail.content);

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
            로고 {newReviewDetail.authorName} {newReviewDetail.createdAt}
          </StyledLogoAndNicknameAndDate>
          <StyledReviewText>{newReviewDetail.content}</StyledReviewText>
          <StyledReviewTags>#</StyledReviewTags>
          <StyledBookInfo>책정보</StyledBookInfo>
        </StyledReviewBox>
        <CustomButton
          text="뒤로가기"
          color="main"
          onClick={() => {
            navigate(`/review`);
          }}
        ></CustomButton>
      </StyledReviewDetailUi>
    </div>
  );
};

export default ReviewDetailPage;
