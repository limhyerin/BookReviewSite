import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/mainPage/MainPage';
import MyPage from '../pages/myPage/MyPage';
import ReviewDetailPage from '../pages/reviewDetailPage/ReviewDetailPage';
import ReviewPage from '../pages/reviewPage/ReviewPage';
import SignInPage from '../pages/signInPage/SignInPage';
import SignUpPage from '../pages/signUpPage/SignUpPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import Layout from '../pages/layout/Layout';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/modules/authReducer';

const Router = () => {
  const [authState, setAuthState] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setAuthState(user);
      if (user) {
        const d = await getDoc(doc(db, 'users', user.uid));
        console.log(d.data());
        dispatch(setAuth(d.data()));
        sessionStorage.setItem('accessToken', JSON.stringify(user.accessToken));
      } else {
        sessionStorage.removeItem('accessToken');
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout authState={authState} />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/review-detail/:id" element={<ReviewDetailPage /*newReviewData={}*/ />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
