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
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default MainPage