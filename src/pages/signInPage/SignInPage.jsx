import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase/firebase';
import CustomModal from '../../components/CustomModal';
import { Link, useNavigate } from 'react-router-dom';

import CustomLoading from '../../components/CustomLoading';
import SignForm from '../../components/SignForm';

const SignInWrapper = styled.div`
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
  a {
    font-size: ${({ theme }) => theme.fontSize.xl};
    text-decoration: none;
  }
  a:link {
    text-decoration: none;
  }
  a:visited,
  a:active {
    color: inherit;
  }
`;

const SignInPage = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    password: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({
    userId: false,
    password: false
  });
  const [submitCheck, setSubmitCheck] = useState('');
  const navigate = useNavigate();

  const checkLoginRedirect = async () => {
    try {
      setIsLoading(true);
      const result = await getRedirectResult(auth);
      if (result) {
        navigate('/');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkLoginRedirect();
  }, []);

  const onSignIn = async (event) => {
    event.preventDefault();
    const { userId, password } = userInfo;
    if (!validation.userId || !validation.password) {
      if (userId === '' && password === '') {
        setSubmitCheck('로그인 정보를 입력해주세요.');
      } else if (userId === '') {
        setSubmitCheck('아이디를 입력해주세요');
      } else if (password === '') {
        setSubmitCheck('비밀번호를 입력해주세요');
      }
      return;
    }
    try {
      setSubmitCheck('');
      await signInWithEmailAndPassword(auth, userId, password);
      navigate('/');
    } catch (error) {
      console.error(error);
      setSubmitCheck('아이디, 비밀번호를 다시 확인해주세요.');
    }
  };
  const onClickGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };
  const onClickGithubSignIn = async (event) => {
    event.preventDefault();
    try {
      const provider = new GithubAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickKakaoSignIn = () => {
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_SIGNIN_REDIRECT_URI;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=profile_nickname,account_email,openid`;
  };

  return isLoading ? (
    <SignInWrapper>
      <CustomLoading />
    </SignInWrapper>
  ) : (
    <>
      <CustomModal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        아이디, 비밀번호를 알맞게 입력해주세요.
      </CustomModal>
      <SignInWrapper>
        <h1>로그인</h1>
        <SignForm
          userInfo={userInfo}
          onSubmit={onSignIn}
          setUserInfo={setUserInfo}
          setValidation={setValidation}
          submitCheck={submitCheck}
          setSubmitCheck={setSubmitCheck}
          onClickGoogle={onClickGoogleSignIn}
          onClickGithub={onClickGithubSignIn}
          onClickKakaoSignIn={onClickKakaoSignIn}
        />
        <Link to={'/signup'}>{`> 회원가입 하러가기`}</Link>
      </SignInWrapper>
    </>
  );
};

export default SignInPage;
