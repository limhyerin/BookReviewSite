import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ReviewDetailPage = ({ newReviewData }) => {
  const { id } = useParams();
  const newReviewDetail = newReviewData.find((item) => item.id === id);
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

const StyledReviewDetailUi = styled.div`
  background-color: black;
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 100px auto 0px auto;
`;
const StyledTitleAndUbtnAndDbtn = styled.div`
  width: 500px;
  height: 50px;
  background-color: blue;
`;
const StyledLogoAndNicknameAndDate = styled.div`
  width: 500px;
  height: 50px;
  background-color: purple;
`;
const StyledReviewText = styled.div`
  width: 500px;
  height: 200px;
  background-color: brown;
`;
const StyledReviewTags = styled.div`
  width: 500px;
  height: 50px;
  background-color: yellow;
`;
const StyledBookInfo = styled.div`
  width: 500px;
  height: 150px;
  background-color: pink;
`;
const StyledHomeBtn = styled.button`
  width: 100px;
  margin: 20px 0px 0px 650px;
`;
const StyledReviewTitle = styled.p`
  font-size: 12px;
`;
const StyledUBtn = styled.p``;
const StyledDBtn = styled.p``;
