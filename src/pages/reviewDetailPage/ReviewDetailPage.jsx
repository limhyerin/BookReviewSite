import {
  StyledReviewDetailUi,
  StyledTitleAndUbtnAndDbtn,
  StyledReviewTitle,
  StyledUBtn,
  StyledDBtn,
  StyledLogoAndNicknameAndDate,
  StyledReviewContent,
  StyledBookInfo,
  StyledBtnWrapper,
  StyledReviewBox,
  StyledLogo,
  StyledHomeBtn,
  StyledBookCover
} from './ReviewDetailPageStyled.js';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import bookieProfile from '../../assets/bookieProfile.jpg';
import book from '../../assets/book.jpg';
import { updateReview, deleteReview } from '../../redux/modules/reviewsReducer.js';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';

const ReviewDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const reviews = useSelector((state) => state.reviewsReducer.reviews); //useSelector로 리뷰데이터 가져오기
  const newReviewDetail = reviews.find((review) => review.id === id) || {}; // 가져온 데이터를 useParams아이디랑 매치시키기
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState(newReviewDetail.title || '');
  const [content, setContent] = useState(newReviewDetail.content || '');
  let reviewDate = ''; // 초기 상태는 빈 문자열로 설정
  if (newReviewDetail.createdAt && newReviewDetail.createdAt.toDate) {
    // createdAt이 정의되어 있고 toDate 메서드를 가지고 있는 경우에만 toDate 호출
    const date = newReviewDetail.createdAt.toDate();
    reviewDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  }
  //수정상태로 전환,롤백
  const editHandler = () => setUpdate(true);
  // const rollbackHandler = ()
  //fire base 업데이트로직!
  const saveHandler = async () => {
    const reviewRef = doc(db, 'reviews', id);
    await updateDoc(reviewRef, { title, content });
    dispatch(updateReview(id, { title, content }));
    setUpdate(false);
    navigate('/review');
  };
  //fire base 삭제로직!
  const deleteHandler = async () => {
    if (window.confirm('이 리뷰를 삭제하시겠습니까?')) {
      const reviewRef = doc(db, 'reviews', id);
      await deleteDoc(reviewRef);
      dispatch(deleteReview(id));
      navigate('/review');
    }
  };
  console.log(newReviewDetail.createdAt);
  return (
    //삼항연산자 이용, update의 초기값을 false로 놓고 false면 리뷰구현 true면 수정부분구현
    <div>
      {update ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <StyledBtnWrapper>
            <StyledUBtn text="저장" color="main" onClick={saveHandler}></StyledUBtn>
            <StyledDBtn text="취소" color="main" onClick={1}></StyledDBtn>
          </StyledBtnWrapper>
        </>
      ) : (
        <>
          <StyledReviewDetailUi>
            <StyledReviewBox>
              <StyledTitleAndUbtnAndDbtn>
                <StyledReviewTitle>{newReviewDetail.title}</StyledReviewTitle>
                <StyledBtnWrapper>
                  <StyledUBtn text="수정" color="main" onClick={editHandler}></StyledUBtn>
                  <StyledDBtn text="삭제" color="main" onClick={deleteHandler}></StyledDBtn>
                </StyledBtnWrapper>
              </StyledTitleAndUbtnAndDbtn>
              <StyledLogoAndNicknameAndDate>
                <StyledLogo>
                  <img src={bookieProfile} alt="Profile" />
                </StyledLogo>
                {newReviewDetail.authorName} {reviewDate}
              </StyledLogoAndNicknameAndDate>
              <StyledReviewContent>{newReviewDetail.content}</StyledReviewContent>
              <StyledBookInfo>
                <StyledBookCover>
                  <img src={newReviewDetail.image || book} alt="Book Cover" />
                </StyledBookCover>
                {newReviewDetail.bookTitle} {newReviewDetail.authorName}
              </StyledBookInfo>
            </StyledReviewBox>
            <StyledHomeBtn
              text="뒤로가기"
              color="main"
              onClick={() => {
                navigate(`/review`);
              }}
            ></StyledHomeBtn>
          </StyledReviewDetailUi>
        </>
      )}
    </div>
  );
};

export default ReviewDetailPage;
