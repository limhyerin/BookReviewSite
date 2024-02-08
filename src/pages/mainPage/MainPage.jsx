import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

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
  background-color: lightgreen;
  width: 500px;
  text-align: center;
  display: row;
  margin: 50px auto auto auto;
`;

const MainPage = () => {
  const navigate = useNavigate();
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
          <h1><StyleTitle>Bookie</StyleTitle>에 오신 것을 환영합니다</h1>
        </StyledHello>
        <StyledSelect>
          <h2>선호하시는 장르를 선택해주세요</h2>
        </StyledSelect>
        <StyledBtn>
          <div>
            <button>소설</button>
            <button>시/에세이</button>
            <button>과학</button>
            <button>동화</button>
            <button>인문</button>
          </div>
          <div>
            <button>가정/육아</button>
            <button>요리</button>
            <button>자기계발</button>
            <button>정치/사회</button>
            <button>역사/문화</button>
          </div>
        </StyledBtn>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default MainPage;
