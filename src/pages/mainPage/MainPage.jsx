import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { genreList } from '../../common/constants';
import { useState } from 'react';
import { getAuth } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

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

const StyledBtn = styled.div`
  /* background-color: lightgreen; */
  width: 500px;
  text-align: center;
  display: row;
  margin: 50px auto auto auto;
`;

const MainPage = () => {
  const navigate = useNavigate();
  const [ isLoggedIn, setIsLoggedIn ] = useState(true);

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

  const greet = isLoggedIn ? <h1><StyleTitle>Bookie</StyleTitle>에 오신 것을 환영합니다</h1> 
  : <h1><StyleTitle>{nickname}</StyleTitle>님, 환영합니다</h1>;

  const handleButtonClick = (genre) => {
    navigate(`/reviewPage/${genre}`);
  };
  return (
    <div>
      <StyledHeader>
        <StyledLogoLocation>
          <StyledLogo alt="logo" src={`${process.env.PUBLIC_URL}/public_assets/logo.png`}/>
        </StyledLogoLocation>
        <StyledSign>
          <StyledButtonWrap onClick={() => {
            navigate(`/signin`);
          }}>Sign In</StyledButtonWrap>
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
          <h2>선호하시는 장르를 선택해주세요</h2>
        </StyledSelect>
        <StyledBtn>
          {genreList.map((genre, index) => (
            <button key={index} onClick={() => handleButtonClick(genre)}>
              {genre}
            </button>
          ))}
        </StyledBtn>
      </main>
      <footer>
      </footer>
    </div>
  )
}

export default MainPage;
