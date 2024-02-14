import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setIsLogged, setUserInfo } from '../redux/modules/authReducer';
import MainPage from '../pages/mainPage/MainPage';
import MyPage from '../pages/myPage/MyPage';
import ReviewDetailPage from '../pages/reviewDetailPage/ReviewDetailPage';
import ReviewPage from '../pages/reviewPage/ReviewPage';
import SignInPage from '../pages/signInPage/SignInPage';
import SignUpPage from '../pages/signUpPage/SignUpPage';
import Layout from '../pages/layout/Layout';
import NotFoundPage from '../pages/notFound/NotFoundPage';
import KakaoSignInPage from '../pages/signInPage/kakaoSignInPage/KakaoSignInPage';
import KaKaoSignUpPage from '../pages/signUpPage/kakaoSignUpPage/KaKaoSignUpPage';

const Router = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const d = await getDoc(doc(db, 'users', user.uid));
        if (d.data()) dispatch(setIsLogged(true));
        dispatch(setUserInfo(d.data()));
        localStorage.setItem('isLoggedIn', true);
      } else {
        dispatch(setIsLogged(false));
        localStorage.removeItem('isLoggedIn');
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/review-detail/:id" element={<ReviewDetailPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signin/kakaosignin" element={<KakaoSignInPage />} />
          <Route path="/signup/kakaosignup" element={<KaKaoSignUpPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
