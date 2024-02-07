import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const SignUpWrapper = styled.div`
  max-width: 600px;
  border: 1px solid black;
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const InputBox = styled.div``;
const SignUpButton = styled.button``;
const SocialSignUpBox = styled.div``;
const SocialIcon = styled.button`
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
`;
const SignUpPage = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    password: '',
    nickname: ''
  });
  const onChangeUserInfo = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const onSignUp = (event) => {
    event.preventDefault();
    const { userId, password } = userInfo;
    createUserWithEmailAndPassword(auth, userId, password);
  };
  return (
    <>
      <SignUpWrapper>
        <SignUpForm onSubmit={onSignUp}>
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
              minLength={3}
              maxLength={16}
              value={userInfo.password}
              onChange={onChangeUserInfo}
            />
          </InputBox>
          <InputBox>
            <input
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해 주세요"
              value={userInfo.nickname}
              onChange={onChangeUserInfo}
            />
          </InputBox>
          <SignUpButton type="submit">로그인하기</SignUpButton>
        </SignUpForm>
        <SocialSignUpBox>
          <SocialIcon>Google</SocialIcon>
          <SocialIcon>kakao</SocialIcon>
          <SocialIcon>GitHub</SocialIcon>
        </SocialSignUpBox>
      </SignUpWrapper>
    </>
  );
};

export default SignUpPage;
