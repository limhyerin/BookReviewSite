import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/mainPage/MainPage';
import MyPage from '../pages/myPage/MyPage';
import ReviewDetailPage from '../pages/reviewDetailPage/ReviewDetailPage';
import ReviewPage from '../pages/reviewPage/ReviewPage';
import SignInPage from '../pages/signInPage/SignInPage';
import SignUpPage from '../pages/signUpPage/SignUpPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import Layout from '../pages/layout/Layout';

const Router = () => {
  const [authState, setAuthState] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthState(user);
      console.log('user', user);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout authState={authState} />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/review-detail/:id" element={<ReviewDetailPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
