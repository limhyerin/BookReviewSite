import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase/firebase';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModal';

const SignInWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem;
  border: 1px solid black;
  border-radius: 10px;
`;
const SignInForm = styled.form`
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
const SocialSignInBox = styled.div`
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
const SignInPage = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    password: ''
  });
  const [isOpen, setIsOpen] = useState(false);

  const onChangeUserInfo = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const onSignIn = async (event) => {
    event.preventDefault();
    const { userId, password } = userInfo;
    try {
      await signInWithEmailAndPassword(auth, userId, password);
    } catch (error) {
      setIsOpen(true);
      console.error(error);
    }
  };
  const onClickGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };
  const onClickGithubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithRedirect(auth, provider);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <CustomModal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        로그인 정보가 틀렸습니다.
      </CustomModal>
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
              minLength={6}
              maxLength={16}
              value={userInfo.password}
              onChange={onChangeUserInfo}
            />
          </InputBox>
          <StyledButtonBox>
            <CustomButton text={'로그인'} />
          </StyledButtonBox>
        </SignInForm>
        <SocialSignInBox>
          <SocialIcon onClick={onClickGoogleSignIn}>Google</SocialIcon>
          <SocialIcon>kakao</SocialIcon>
          <SocialIcon onClick={onClickGithubSignIn}>GitHub</SocialIcon>
        </SocialSignInBox>
      </SignInWrapper>
    </>
  );
};

export default SignInPage;
