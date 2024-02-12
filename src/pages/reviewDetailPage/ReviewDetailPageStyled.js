import styled from 'styled-components';
import CustomButton from '../../components/CustomButton';

export const StyledReviewDetailUi = styled.div`
  width: 800px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px auto 0px auto;
`;

export const StyledReviewBox = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const StyledTitleAndUbtnAndDbtn = styled.div`
  width: 800px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  align-items: center;
`;
export const StyledLogoAndNicknameAndDate = styled.div`
  width: 800px;
  height: 50px;
  border-bottom: 1px solid black;
`;
export const StyledReviewText = styled.div`
  width: 800px;
  height: 200px;
  border-bottom: 1px solid black;
`;
export const StyledReviewTags = styled.div`
  width: 800px;
  height: 50px;
  border-bottom: 1px solid black;
`;
export const StyledBookInfo = styled.div`
  width: 800px;
  height: 150px;
  border-bottom: 1px solid black;
  margin-bottom: 30px;
`;
export const StyledHomeBtn = styled(CustomButton)`
  width: 100px;
  margin: 20px auto 0px auto;
`;
export const StyledReviewTitle = styled.p`
  font-size: 12px;
`;
//커스텀버튼 re커스터마이징
export const StyledUBtn = styled(CustomButton)`
  margin-right: 10px;
`;
//커스텀버튼 re커스터마이징
export const StyledDBtn = styled(CustomButton)`
  margin-left: 10px;
`;
export const StyledBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between; // 버튼을 양쪽 끝으로 이동
  width: 130px; //이렇게하면 버튼 오른쪽으로 이동 후 사이 간격 설정가능
`;
export const StyledLogo = styled.div`
  width: 45px;
  height: 45px;
  margin-left: 10px;
  margin-top: 4px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const StyledBookCover = styled.div`
  width: 50px;
  height: 100px;
  margin-left: 10px;
  margin-top: 4px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
