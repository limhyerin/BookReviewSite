import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import { getAuth } from "firebase/auth";
import { db } from '../../firebase/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

// greeting
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

// review page로 이동하는 버튼
const StyledBtn = styled.div`
  text-align: center;
  width: 800px;
  height: 50px;
  font-size: 30px;
  margin: 30px auto auto auto;
`;

// animation
// 오른쪽에서 왼쪽 방향 애니메이션
const StyledSlideright = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1200px); /* 변경: X축으로 -1200px만큼 이동하여 왼쪽으로 슬라이드 */
  }
`;
// 왼쪽에서 오른쪽 방향 애니메이션
const StyledSlideLeft = keyframes`
  0% {
    transform: translateX(-1200px);
  }
  100% {
    transform: translateX(0); /* 변경: X축으로 -1200px만큼 이동하여 왼쪽으로 슬라이드 */
  }
`;

const StyledSliderWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 2400px; /* 변경: 슬라이더 전체 너비를 총 이미지 너비의 합인 2400px로 설정 */
  animation: ${StyledSlideright} 11s linear infinite; /* 변경: 슬라이드 애니메이션을 20초 동안 선형으로 무한 반복 */
`;

const StyledSliderWrapperLeft = styled.div`
  position: absolute;
  display: flex;
  width: 2400px; /* 변경: 슬라이더 전체 너비를 총 이미지 너비의 합인 2400px로 설정 */
  animation: ${StyledSlideLeft} 11s linear infinite; /* 변경: 슬라이드 애니메이션을 20초 동안 선형으로 무한 반복 */
`;

const StyledContainer = styled.div`
  position: relative;
  width: 1200px;
  height: 600px;
  margin: 0 auto 10px auto;
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
  width: 190px;
  height: 280px;
  margin-left: 50px;
  background-position: center;
  background-size: cover;
`;

const StyledSlideImg = styled(StyledSlide)`
  width: 190px;
  height: 280px;
  margin-left: 50px;
`;

  // Define an array of image URLs
  const imageUrlsTop = [
    'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791198530325.jpg',
    'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791193128428.jpg',
    'https://img.ridicdn.net/cover/2155023408/xxlarge',
    'https://image.aladin.co.kr/product/33029/76/cover500/e362532114_1.jpg',
    'https://image.yes24.com/Goods/123318244/XL'
  ];

  // Define an array of image URLs
  const imageUrlsBottom = [
    'https://image.yes24.com/goods/123451481/XL',
    'https://image.yes24.com/Goods/118040295/XL',
    'https://img.ridicdn.net/cover/606002474/xxlarge',
    'https://ibookpark.com/wp-content/uploads/2022/04/x9791187142560.jpg',
    'https://image.yes24.com/goods/124027690/XL'
  ];

const MainPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const fetchNickname = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          const userData = userDoc.data();
          if (userData && userData.nickname) {
            setNickname(userData.nickname);
          }
        } catch (error) {
          console.error('Error fetching nickname:', error);
        }
      }
    };

    fetchNickname();
  }, []);

  const greet = nickname ? (
      <h1><StyleTitle>{nickname}</StyleTitle>님, 환영합니다</h1>
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
              {imageUrlsTop.map((url, index) => (
                <StyledSlideImg key={index} style={{ backgroundImage: `url(${url})` }} />
              ))}
              </StyledSlider>
              <StyledSlider>
              {imageUrlsTop.map((url, index) => (
                <StyledSlideImg key={index} style={{ backgroundImage: `url(${url})` }} />
              ))}
              </StyledSlider>
            </StyledSliderWrapper>
          </StyledBox>
          <StyledBox>
            <StyledSliderWrapperLeft>
              <StyledSlider>
              {imageUrlsBottom.map((url, index) => (
                <StyledSlideImg key={index} style={{ backgroundImage: `url(${url})` }} />
              ))}
              </StyledSlider>
              <StyledSlider>
              {imageUrlsBottom.map((url, index) => (
                <StyledSlideImg key={index} style={{ backgroundImage: `url(${url})` }} />
              ))}
              </StyledSlider>
            </StyledSliderWrapperLeft>
          </StyledBox>
        </StyledContainer>
    </>
  )
}

export default MainPage;
