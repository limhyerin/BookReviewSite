import React, { useState } from 'react';
import styled from 'styled-components';

const SignInWrapper = styled.div`
  max-width: 600px;
  border: 1px solid black;
`;
const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const InputBox = styled.div``;
const SignInButton = styled.button``;
const SocialSignInBox = styled.div``;
const SocialIcon = styled.button`
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
`;
const SignInPage = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    password: ''
  });
  const onChangeUserInfo = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const onSignIn = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <SignInWrapper>
        <SignInForm onSubmit={onSignIn}>
          <InputBox>
            <input
              type="email"
              name="userId"
              placeholder="아이디를 입력해 주세요"
              value={userInfo.userId}
              onChange={onChangeUserInfo}
            />
          </InputBox>
          <InputBox>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              minLength={10}
              maxLength={16}
              value={userInfo.password}
              onChange={onChangeUserInfo}
            />
          </InputBox>
          <SignInButton type="submit">로그인하기</SignInButton>
        </SignInForm>
        <SocialSignInBox>
          <SocialIcon>Google</SocialIcon>
          <SocialIcon>kakao</SocialIcon>
          <SocialIcon>GitHub</SocialIcon>
        </SocialSignInBox>
      </SignInWrapper>
    </>
  );
};

export default SignInPage;
