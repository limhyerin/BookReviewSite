import styled from 'styled-components';
import CustomButton from '../../components/CustomButton';

export const StyledReviewDetailUi = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledReviewBox = styled.div`
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
`;

export const StyledTitleAndUbtnAndDbtn = styled.div`
  padding: 20px;
  width: 800px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const StyledUserInfo = styled.div`
  padding: 30px 15px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;
export const StyledReviewContent = styled.div`
  margin: 20px;
  width: 760px;
  height: 200px;
`;
export const StyledBookInfo = styled.div`
  width: 800px;
  height: 120px;
  padding: 5px;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;
  background-color: #eee;
  border: 0px solid;
  border-radius: 15px;
  padding: 10px;
`;
export const StyledHomeBtn = styled(CustomButton)`
  width: 100px;
  margin: 20px auto 0px auto;
`;
export const StyledReviewTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  width: 300px;
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
  border-radius: 40px;
  width: 40px;
  height: 40px;
  margin-right: 5px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
export const StyledBookCover = styled.div`
  width: 80;
  height: 100px;
  margin-left: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledTitleInput = styled.input`
  width: 300px;
  font-weight: bold;
  font-size: 20px;
`;
export const StyledContentTextarea = styled.textarea`
  margin: 20px;
  width: 760px;
  height: 180px;
`;

export const StyledCustomLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50vh;
`;
export const StyledBookTitleAuthor = styled.div`
  margin-left: 20px;
  /* width: 300px; */
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: start;
`;

export const StyledBookTitle = styled.div`
  width: 700px;
  margin-bottom: 20px;
  font-weight: bolder;
`;

export const StyledBookAuthor = styled.div`
  width: 700px;
  margin-bottom: 20px;
`;
export const StyledBookGenre = styled.div`
  width: 700px;
  font-size: 12px;
`;

export const StyledInfo = styled.div`
  width: 200px;
  display: flex;
  //margin-left: 380px;
  margin-left: 10px;
  color: #666;
`;

export const StyledPage = styled.div`
  background-color: #eeee;
  height: 90vh;
`;

export const StyledTitle = styled.div`
  font-size: 1.2rem;
  /* margin-left: 20px; */
  /* width: 200px; */
`;
