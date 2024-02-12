import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// greeting : 인사문구 css
const StyledHello = styled.div`
  text-align: center;
  width: 800px;
  height: 50px;
  font-size: 50px;
  font-weight: 600;
  color: #807e79;
  margin: 50px auto 30px auto;
`;

// bookie 색상
const StyleTitle = styled.span`
  color: #8abd7a;
`;

// 페이지 이동 버튼
const StyledBtn = styled.div`
  position:sticky;
  bottom: 50px;
  text-align: center;
  width: 800px;
  height: 50px;
  margin: 30px auto auto auto;
`;

// animation
// 오른쪽에서 왼쪽 방향 애니메이션
const StyledSlideright = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1200px);
  }
`;

const StyledSliderWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 2400px;
  animation: ${StyledSlideright} 11s linear infinite;
`;

// 왼쪽에서 오른쪽 방향 애니메이션
const StyledSlideLeft = keyframes`
  0% {
    transform: translateX(-1200px);
  }
  100% {
    transform: translateX(0);
  }
`;
const StyledSliderWrapperLeft = styled.div`
  position: absolute;
  display: flex;
  width: 2400px;
  animation: ${StyledSlideLeft} 11s linear infinite;
`;

// 전체 좌우 흐림 효과 적용
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
  margin: 20px auto;
  overflow: hidden;
`;

const StyledSlider = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1200px;
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

  // top : 이미지 url 목록
  const imageUrlsTop = [
    'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791198530325.jpg',
    'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791193128428.jpg',
    'https://img.ridicdn.net/cover/2155023408/xxlarge',
    'https://image.aladin.co.kr/product/33029/76/cover500/e362532114_1.jpg',
    'https://image.yes24.com/Goods/123318244/XL'
  ];

  // bottom : 이미지 url 목록
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
    const isLogged = JSON.parse(sessionStorage.getItem('accessToken'));
    const info = useSelector(({ authReducer }) => authReducer.userInfo);
  
    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user && info) {
          setNickname(info.nickname); 
        } else {
          setNickname('');
        }
      });
    }, [info]);
      
    // 로그인 여부에 따라 문구 변경
    const greet = isLogged ? (
        <h1><StyleTitle>{nickname}</StyleTitle>님, 환영합니다</h1>
      ) : (
        <h1><StyleTitle>BOOKIE</StyleTitle> 에 오신 것을 환영합니다</h1> 
      );
  
    // 로그인 여부에 따라 이동 페이지 변경
    const pagemove = isLogged ? (
      // 로그인시, 버튼 클릭 후 리뷰페이지로 이동
      <CustomButton text="시작하기" size="large" radius="circle"  color="main" onClick={() => {
        navigate(`/review`);
      }}></CustomButton>
    ) : (
      // 비로그인시, 버튼 클릭 후 로그인 페이지로 이동
      <CustomButton text="시작하기" size="large" radius="circle" color="main" onClick={() => {
        navigate(`/signin`);
      }}></CustomButton>
    );

  return (
    <>
        <StyledHello>
          { greet }
        </StyledHello>
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
        <StyledBtn>
          { pagemove }
        </StyledBtn>
    </>
  )
}

export default MainPage;
