import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
import "../../App.css";

const StyledHeader = styled.header`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
`;

const StyledSign = styled.div`
  display: flex;
`;

const StyledLogoLocation = styled.div`
  margin-top : 10px;
  margin-left: 10px;
`;
const StyledLogo = styled.img`
  width: 230px;
`;

const StyledHello = styled.div`
  text-align: center;
  width: 800px;
  height: 50px;
  font-size: 50px;

  margin: 150px auto auto auto;
  
  /* background-color: lightgreen; */
`;

const StyledSelect = styled.div`
  text-align: center;
  width: 800px;
  height: 50px;
  font-size: 30px;

  margin: 30px auto auto auto;
  
  /* background-color: lightcoral; */
`;

const StyleTitle = styled.span`
  color: #8abd7a;
`;


// 슬라이더 애니메이션
const StyledSlider = styled.div`
  display: flex;
  overflow: hidden;
`;

const StyledSlide = styled.img`
  min-width: 100%;
  height: auto;
  transition: transform 0.3s ease-in-out;
`;

const StyledBooks = styled.div`
  width: 120px;
`;

const MainPage = () => {
  const navigate = useNavigate();
  const [ isLoggedIn, setIsLoggedIn ] = useState(true);

  // 이미지 URL 배열
  const images = [
    'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791198530325.jpg',
    'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791193128428.jpg',
    'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788956608556.jpg',
    // 추가적인 이미지 URL
  ];

  // 현재 로그인한 사용자 가져오기
  const auth = getAuth();
  const user = auth.currentUser;
  let nickname = "";
  let uid = "";

  // if (user !== null) {
  //   nickname = user.nickname;
  //   uid = user.uid;
  //   setIsLoggedIn(true);
  // }

  // const db = getFirestore();
  // const docRef = doc(db, "users", user.uid);
  // const docSnap = await getDoc(docRef);
  // if (docSnap.exists()) {
  //   console.log("Document Data: ", docSnap.data().nickname);
  // } else {
  //   console.log("No such document!");
  // }

  const greet = isLoggedIn ? (
    <h1>
      <StyleTitle>Bookie</StyleTitle>에 오신 것을 환영합니다
    </h1> 
    ) : (
    <h1>
      <StyleTitle>{nickname}</StyleTitle>님, 환영합니다
    </h1>
    );

  return (
    <div>
      <StyledHeader>
        <StyledLogoLocation>
          <StyledLogo alt="logo" src={`${process.env.PUBLIC_URL}/public_assets/logo.png`}/>
        </StyledLogoLocation>
        <StyledSign>
          <button onClick={() => {
            navigate(`/signin`);
          }}>Sign In</button>
          <button onClick={() => {
            navigate(`/signup`);
          }}>Sign Up</button>
        </StyledSign>
      </StyledHeader>
      <main>
        <StyledHello>
          { greet }
        </StyledHello>
        <StyledSelect>
          <button>시작하기</button>
        </StyledSelect>
        {/* 새로운 사진 갤러리 */}
        <StyledBooks>
        <div class="box">
        <div class="slider-wrapper">
          <div class="slider1">
            <div class="slide1"></div>
            <div class="slide2"></div>
            <div class="slide3"></div>
            <div class="slide1"></div>
            <div class="slide2"></div>
            <div class="slide3"></div>
          </div>
          <div class="slider2">
            <div class="slide1"></div>
            <div class="slide2"></div>
            <div class="slide3"></div>
            <div class="slide1"></div>
            <div class="slide2"></div>
            <div class="slide3"></div>
          </div>
        </div>
        </div>

        </StyledBooks>
      </main>
      <footer>
      </footer>
    </div>
  )
}

export default MainPage;
