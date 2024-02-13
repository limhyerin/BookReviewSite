import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithRedirect
} from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import SignForm from '../../components/SignForm';
import CustomLoading from '../../components/CustomLoading';

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  * {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
  h1 {
    font-size: ${({ theme }) => theme.fontSize.xl4};
  }
`;

const SignUpPage = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    password: '',
    nickname: '',
    profile: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({
    userId: false,
    password: false
  });

  const navigate = useNavigate();

  const checkLoginRedirect = async () => {
    try {
      setIsLoading(true);
      const result = await getRedirectResult(auth);
      console.log(result);
      if (result) {
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkLoginRedirect();
  }, []);

  const onSignUp = async (event) => {
    event.preventDefault();
    if (!validation.userId || !validation.password) return;

    const { userId, password } = userInfo;
    try {
      const { user } = await createUserWithEmailAndPassword(auth, userId, password);
      console.log(user.uid);
      const signUpData = doc(db, 'users', user.uid);
      await setDoc(signUpData, { ...userInfo, uid: user.uid });

      navigate('/review');
    } catch (error) {
      console.log(error);
    }
  };

  const onClickGoogleSignUp = async (event) => {
    event.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };
  const onClickGithubSignUp = async (event) => {
    event.preventDefault();
    try {
      const provider = new GithubAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickKakaoSignUp = () => {
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_SIGNUP_REDIRECT_URI;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=profile_nickname,account_email,openid`;
  };
  return isLoading ? (
    <SignUpWrapper>
      <CustomLoading />
    </SignUpWrapper>
  ) : (
    <>
      <SignUpWrapper>
        <h1>회원가입</h1>
        <SignForm
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setValidation={setValidation}
          onSubmit={onSignUp}
          onClickGoogle={onClickGoogleSignUp}
          onClickGithub={onClickGithubSignUp}
          onClickKakaoSignUp={onClickKakaoSignUp}
        />
      </SignUpWrapper>
    </>
  );
};

export default SignUpPage;
