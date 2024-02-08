import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import CustomButton from '../../components/CustomButton';
import { useNavigate } from 'react-router-dom';

const SignUpWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem;
  border: 1px solid black;
  border-radius: 10px;
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const InputBox = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid black;
  input {
    font-size: ${(props) => props.theme.fontSize.lg};
    border: none;
    outline: none;
  }
`;
const StyledButtonBox = styled.div`
  button {
    width: 100%;
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;
const SocialSignUpBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
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
  const navigate = useNavigate();
  const onChangeUserInfo = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const onSignUp = async (event) => {
    event.preventDefault();
    const { userId, password } = userInfo;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userId, password);
      navigate('review');
      console.log(userCredential);
    } catch (error) {
      console.error(error);
    }
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
              minLength={6}
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
          <StyledButtonBox>
            <CustomButton text={'가입하기'} />
          </StyledButtonBox>
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
