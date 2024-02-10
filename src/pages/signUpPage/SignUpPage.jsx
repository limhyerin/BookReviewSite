import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import CustomButton from '../../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;
  padding: 4rem;
  border: 1px solid black;
  border-radius: 10px;
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
const SignUpPage = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    password: '',
    nickname: '',
    profile: ''
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
      const { user } = await createUserWithEmailAndPassword(auth, userId, password);
      console.log(user.uid);
      const signUpData = doc(db, 'users', user.uid);
      await setDoc(signUpData, { ...userInfo, uid: user.uid });

      navigate('/review');
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
      </SignUpWrapper>
    </>
  );
};

export default SignUpPage;
