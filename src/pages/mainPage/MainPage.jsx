import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import ImageSlide from './ImageSlide';

// greeting : 인사문구 css
const StyledHello = styled.div`
  text-align: center;
  width: 800px;
  height: 50px;
  font-size: 50px;
  color: #222222;
  margin: 50px auto 30px auto;
`;

// bookie, 닉네임 굵기 지정
const StyleTitle = styled.span`
  font-weight: large;
`;

// 나머지 환영 문구 굵기 지정
const StyleGreet = styled.span`
  font-weight: normal;
`;

// 세부설명
const StyledExplan = styled.div`
  text-align: center;
  width: 800px;
  height: 20px;
  font-size: 20px;
  color: #616161;
  margin: 5px auto 5px auto;
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
const StyledSliderWrapperRight = styled.div`
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
    const { userInfo }=useSelector(({authReducer})=>authReducer);
    const isLoggedIn = localStorage.getItem('isLoggedIn')
      
    // 로그인 여부에 따라 문구 변경
    const greet = isLoggedIn ? (
        <h1><StyleTitle>{userInfo.nickname}</StyleTitle><StyleGreet>님, 환영합니다</StyleGreet></h1>
      ) : (
        <h1><StyleTitle>BOOKIE</StyleTitle><StyleGreet> 에 오신 것을 환영합니다</StyleGreet></h1> 
      );
  
    // 로그인 여부에 따라 이동 페이지 변경
    const pagemove = isLoggedIn ? (
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
        <StyledHello>{ greet }</StyledHello>
        <StyledExplan>부기와 함께하는 독서 기록</StyledExplan>
        <StyledContainer>
            <ImageSlide StyledSliderWrapper={StyledSliderWrapperRight} imageUrls={imageUrlsTop}/>
            <ImageSlide StyledSliderWrapper={StyledSliderWrapperLeft} imageUrls={imageUrlsBottom}/>
        </StyledContainer>
        <StyledBtn>{ pagemove }</StyledBtn>
    </>
  )
}

export default MainPage;
