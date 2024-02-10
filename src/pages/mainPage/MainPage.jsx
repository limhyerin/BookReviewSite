import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import CustomButton from '../../components/CustomButton';
// import { doc, getDoc } from "firebase/firestore";

// 인사문구
const StyledHello = styled.div`
  text-align: center;
  width: 800px;
  height: 50px;
  font-size: 50px;
  margin: 50px auto auto auto;

`;

// bookie 인사말 색상
const StyleTitle = styled.span`
  color: #8abd7a;
`;

// review 페이지 이동하는 버튼
const StyledBtn = styled.div`
  text-align: center;
  width: 800px;
  height: 50px;
  font-size: 30px;
  margin: 30px auto auto auto;
`;

// animation
// 오른쪽에서 왼쪽 애니메이션
const StyledSlideright = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1200px); /* 변경: X축으로 -1200px만큼 이동하여 왼쪽으로 슬라이드 */
  }
`;

const StyledSliderWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 2400px; /* 변경: 슬라이더 전체 너비를 총 이미지 너비의 합인 2400px로 설정 */
  animation: ${StyledSlideright} 20s linear infinite; /* 변경: 슬라이드 애니메이션을 20초 동안 선형으로 무한 반복 */
`;

const StyledSlideLeft = keyframes`
  0% {
    transform: translateX(-1200px);
  }
  100% {
    transform: translateX(0); /* 변경: X축으로 -1200px만큼 이동하여 왼쪽으로 슬라이드 */
  }
`;

const StyledSliderWrapperLeft = styled.div`
  position: absolute;
  display: flex;
  width: 2400px; /* 변경: 슬라이더 전체 너비를 총 이미지 너비의 합인 2400px로 설정 */
  animation: ${StyledSlideLeft} 20s linear infinite; /* 변경: 슬라이드 애니메이션을 20초 동안 선형으로 무한 반복 */
`;

const StyledContainer = styled.div`
  position: relative;
  width: 1200px;
  height: 280px;
  height: 80%;
  margin: 10px auto;
  overflow: hidden;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    z-index: 2;
  }

  ::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    z-index: 2;
  }
`;


const StyledBox = styled.div`
  position: relative;
  width: 1200px;
  height: 280px;
  margin: 10px auto;
  overflow: hidden;
`;

const StyledSlider = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1200px; /* 변경: 슬라이드 그룹의 너비를 1200px로 설정 */
`;

const StyledSlide = styled.div`
  width: 200px;
  height: 500px; /* 변경: 슬라이드의 높이를 박스의 높이와 동일하게 설정 */
  background-position: center;
  background-size: cover;
`;

const StyledSlide1 = styled(StyledSlide)`
  background-image: url('https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791198530325.jpg');
  width: 190px;
  height: 280px;
  margin-left: 50px;
`;

const StyledSlide2 = styled(StyledSlide)`
  background-image: url('https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791193128428.jpg');
  width: 190px;
  height: 280px;
  margin-left: 50px;
`;

const StyledSlide3 = styled(StyledSlide)`
  background-image: url('https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788956608556.jpg');
  width: 190px;
  height: 280px;
  margin-left: 50px;
`;

const MainPage = () => {
  const navigate = useNavigate();

  // 현재 로그인한 사용자 프로필 가져오기
  const auth = getAuth();
  const user = auth.currentUser;
  let checkLoggedIn = false;
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
  
    const uid = user.uid;
    checkLoggedIn = true;
  }

  const greet = user ? (
      <h1><StyleTitle></StyleTitle>님, 환영합니다</h1>
      //{displayName}
    ) : (
      <h1><StyleTitle>BOOKIE</StyleTitle> 에 오신 것을 환영합니다</h1> 
    );

  return (
    <>
        <StyledHello>
          { greet }
        </StyledHello>

        <StyledBtn>
          <CustomButton text="시작하기" color="main" onClick={() => {
            navigate(`/review`);
          }}></CustomButton>
        </StyledBtn>
        <StyledContainer>
          <StyledBox>
            <StyledSliderWrapper>
              <StyledSlider>
                <StyledSlide1 />
                <StyledSlide2 />
                <StyledSlide3 />
                <StyledSlide1 />
                <StyledSlide2 />
                <StyledSlide3 />
              </StyledSlider>
              <StyledSlider>
                <StyledSlide1 />
                <StyledSlide2 />
                <StyledSlide3 />
                <StyledSlide1 />
                <StyledSlide2 />
                <StyledSlide3 />
              </StyledSlider>
            </StyledSliderWrapper>
          </StyledBox>
        </StyledContainer>

        <StyledContainer>
          <StyledBox>
            <StyledSliderWrapperLeft>
              <StyledSlider>
                <StyledSlide1 />
                <StyledSlide2 />
                <StyledSlide3 />
                <StyledSlide1 />
                <StyledSlide2 />
                <StyledSlide3 />
              </StyledSlider>
              <StyledSlider>
                <StyledSlide1 />
                <StyledSlide2 />
                <StyledSlide3 />
                <StyledSlide1 />
                <StyledSlide2 />
                <StyledSlide3 />
              </StyledSlider>
            </StyledSliderWrapperLeft>
          </StyledBox>
        </StyledContainer>
    </>
  )
}

export default MainPage;
