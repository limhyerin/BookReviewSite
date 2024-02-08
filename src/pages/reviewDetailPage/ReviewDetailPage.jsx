import React from 'react';
import styled from 'styled-components';
const ReviewDetailUi = styled.div`
  background-color: black;
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 100px auto 0px auto;
`;
const TitleAndUbtnAndDbtn = styled.div`
  width: 500px;
  height: 50px;
  background-color: blue;
`;
const LogoAndNicknameAndDate = styled.div`
  width: 500px;
  height: 50px;
  background-color: purple;
`;
const ReviewText = styled.div`
  width: 500px;
  height: 200px;
  background-color: brown;
`;
const ReviewTags = styled.div`
  width: 500px;
  height: 50px;
  background-color: yellow;
`;
const BookInfo = styled.div`
  width: 500px;
  height: 150px;
  background-color: pink;
`;
const HomeBtn = styled.button`
  width: 100px;
  margin: 20px 0px 0px 650px;
`;
const ReviewTitle = styled.p`
  font-size: 12px;
`;
const UBtn = styled.p``;
const DBtn = styled.p``;

const ReviewDetailPage = () => {
  return (
    <div>
      <ReviewDetailUi>
        <TitleAndUbtnAndDbtn>
          <ReviewTitle>제목</ReviewTitle>
          <UBtn>수정</UBtn>
          <DBtn>삭제</DBtn>
        </TitleAndUbtnAndDbtn>
        <LogoAndNicknameAndDate>로고 이름 날짜</LogoAndNicknameAndDate>
        <ReviewText>텍스트</ReviewText>
        <ReviewTags>#</ReviewTags>
        <BookInfo>책정보</BookInfo>
      </ReviewDetailUi>
      <HomeBtn>홈버튼</HomeBtn>
    </div>
  );
};

export default ReviewDetailPage;
