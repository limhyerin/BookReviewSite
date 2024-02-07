import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from '../pages/mainPage/MainPage';
import MyPage from '../pages/myPage/Mypage';
import ReviewDetailPage from '../pages/reviewDetailPage/ReviewDetailPage';
import ReviewPage from '../pages/reviewPage/ReviewPage';
import SignInPage from '../pages/signInPage/SignInPage';
import SignUpPage from '../pages/signUpPage/SignUpPage';


const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/mypage" element={<MyPage/>} />
        <Route path="/review-detail/:id" element={<ReviewDetailPage/>} />
        <Route path="/review" element={<ReviewPage/>} />
        <Route path="/signin" element={<SignInPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
     </Routes>
    </BrowserRouter>
  )
}

export default router