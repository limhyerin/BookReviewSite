import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import SignForm from '../../components/SignForm';

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
  const [validation, setValidation] = useState({
    userId: false,
    password: false
  });

  const navigate = useNavigate();

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
  return (
    <>
      <SignUpWrapper>
        <h1>회원가입</h1>
        <SignForm userInfo={userInfo} setUserInfo={setUserInfo} setValidation={setValidation} onSubmit={onSignUp} />
      </SignUpWrapper>
    </>
  );
};

export default SignUpPage;
