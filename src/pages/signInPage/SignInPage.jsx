import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../../firebase/firebase';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModal';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const SignInWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const SignInForm = styled.form`
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
const SocialSignInBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
const SocialIcon = styled.button`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
`;
const SignInPage = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    password: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const onChangeUserInfo = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // auth.getUsers().then((i) => console.log(i));

  const onSignIn = async (event) => {
    event.preventDefault();
    const { userId, password } = userInfo;
    try {
      await signInWithEmailAndPassword(auth, userId, password);
      navigate('/');
    } catch (error) {
      setIsOpen(true);
      console.error(error);
    }
  };
  const onClickGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const d = await getDoc(doc(db, 'users', result.user.uid));
      if (d.data()) {
        navigate('/');
      } else {
        const signUpData = {
          userId: result.user.providerData[0].email,
          password: '',
          nickname: result.user.providerData[0].displayName,
          profile: '',
          uid: result.user.uid
        };
        await setDoc(doc(db, 'users', result.user.uid), signUpData);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onClickGithubSignIn = async (event) => {
    event.preventDefault();
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const d = await getDoc(doc(db, 'users', result.user.uid));
      if (d.data()) {
        navigate('/');
      } else {
        const signUpData = {
          userId: result.user.providerData[0].email,
          password: '',
          nickname: result.user.providerData[0].displayName,
          profile: '',
          uid: result.user.uid
        };
        await setDoc(doc(db, 'users', result.user.uid), signUpData);
        navigate('/');
      }
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
          <SocialSignInBox>
            <SocialIcon type="button" onClick={onClickGoogleSignIn}>
              Google
            </SocialIcon>
            <SocialIcon type="button" onClick={onClickGithubSignIn}>
              GitHub
            </SocialIcon>
            <SocialIcon type="button">kakao</SocialIcon>
          </SocialSignInBox>
        </SignInForm>
      </SignInWrapper>
    </>
  );
};

export default SignInPage;
