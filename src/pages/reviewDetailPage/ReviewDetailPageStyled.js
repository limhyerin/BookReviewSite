import styled from 'styled-components';
import CustomButton from '../../components/CustomButton';

export const StyledReviewDetailUi = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledReviewBox = styled.div`
  background-color: ivory;
  border-radius: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

export const StyledTitleAndUbtnAndDbtn = styled.div`
  width: 800px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const StyledUserInfo = styled.div`
  margin-right: 20px;
  width: 780px;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid black;
`;
export const StyledReviewContent = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: 760px;
  height: 200px;
`;
export const StyledBookInfo = styled.div`
  width: 700px;
  height: 200px;
  padding: 10px;
  display: flex;
  margin-bottom: 10px;
  background-color: lightgray;
  border: 0px solid;
  border-radius: 15px;
`;
export const StyledHomeBtn = styled(CustomButton)`
  width: 100px;
  margin: 20px auto 0px auto;
`;
export const StyledReviewTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
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
  margin-left: 50px;
  margin-top: 4px;
  display: flex;
  justify-content: left;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const StyledBookCover = styled.div`
  width: 100px;
  height: 140px;
  margin: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledTitleInput = styled.input`
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
`;
export const StyledContentTextarea = styled.textarea`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: 760px;
  height: 200px;
`;

export const StyledCustomLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50vh;
`;
export const StyledBookTitleAuthor = styled.div`
  margin: 20px;
  width: 300px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;
`;

export const StyledBookTitle = styled.div`
  margin-bottom: 40px;
  font-weight: bolder;
`;

export const StyledBookAuthor = styled.div`
  margin-bottom: 40px;
`;
export const StyledBookGenre = styled.div`
  font-size: 12px;
`;

export const StyledInfo = styled.div`
  display: flex;
  margin-left: 530px;
`;
