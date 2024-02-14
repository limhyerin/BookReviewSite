import {
  StyledReviewDetailUi,
  StyledTitleAndUbtnAndDbtn,
  StyledReviewTitle,
  StyledUBtn,
  StyledDBtn,
  StyledUserInfo,
  StyledReviewContent,
  StyledBookInfo,
  StyledBtnWrapper,
  StyledReviewBox,
  StyledLogo,
  StyledHomeBtn,
  StyledBookCover,
  StyledTitleInput,
  StyledContentTextarea,
  StyledCustomLoading,
  StyledBookTitle,
  StyledBookAuthor,
  StyledBookTitleAuthor,
  StyledBookGenre,
  StyledInfo,
  StyledPage,
  StyledTitle
} from './ReviewDetailPageStyled.js';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import book from '../../assets/book.jpg';
import { updateReview, deleteReview } from '../../redux/modules/reviewsReducer.js';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.js';
import useFirestore from '../../hooks/useFirestore.js';
import CustomLoading from '../../components/CustomLoading.jsx';
import { getAuth } from 'firebase/auth';
import useUserData from '../../hooks/useUserData.js';

const ReviewDetailPage = () => {
  const { loading } = useFirestore('book-reviews');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/signin');
    }
  }, [navigate]);
  //id값 설정
  const { id } = useParams();
  const reviews = useSelector((state) => state.reviewsReducer.reviews); //useSelector로 리뷰데이터 가져오기
  const newReviewDetail = reviews.find((review) => review.id === id) || {}; // 가져온 데이터를 useParams아이디랑 매치시키기

  //상태업데이트
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState(newReviewDetail.title || '');
  const [content, setContent] = useState(newReviewDetail.content || '');

  //작성자 아이디와 현재 아이디 비교하기위한 코드
  const reviewAuthorId = newReviewDetail.authorId;
  const [currentUserId, setCurrentUserId] = useState('');

  const { userData } = useUserData(newReviewDetail.authorId);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      // 현재 로그인한 사용자의 UID
      setCurrentUserId(user.uid);
    }
  }, []);

  //newReviewDetail.createdAt을 호출하기위한 코드

  const getReviewDate = () => {
    // timestamp를 Date 객체로 변환
    if (!newReviewDetail.createdAt) return;
    const seconds = newReviewDetail.createdAt.seconds;
    const nanoseconds = newReviewDetail.createdAt.nanoseconds;

    // 주어진 초와 나노초를 밀리초로 변환
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);

    const date = new Date(milliseconds);

    // 날짜 부분 가져오기
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해준 후 두 자리로 만들어줍니다.
    const day = String(date.getDate()).padStart(2, '0'); // 일도 두 자리로 만들어줍니다.

    // 시간 부분 가져오기
    const hours = String(date.getHours()).padStart(2, '0'); // 시간을 두 자리로 만들어줍니다.
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 분도 두 자리로 만들어줍니다.

    // 원하는 형식으로 조합
    const formattedDate = `${year}.${month}.${day}. ${hours}:${minutes}`;

    return formattedDate;
  };

  //수정상태로 전환,롤백
  const editHandler = () => setUpdate(true);
  const rollbackHandler = () => setUpdate(false);
  //fire base 업데이트로직
  const saveHandler = async () => {
    const reviewRef = doc(db, 'book-reviews', id); //db는 초기화된 Firestore 인스턴스, 'book-reviews'는 컬렉션의 이름, id는 ReviewDetailPage의 ID.
    await updateDoc(reviewRef, { title, content });
    dispatch(updateReview(id, { title, content }));
    setUpdate(false);
    navigate(`/review-detail/${id}`);
  };
  //fire base 삭제로직
  const deleteHandler = async () => {
    if (window.confirm('이 리뷰를 삭제하시겠습니까?')) {
      const reviewRef = doc(db, 'book-reviews', id);
      await deleteDoc(reviewRef);
      dispatch(deleteReview(id));
      navigate('/review');
    }
  };

  return (
    //삼항연산자 이용, update의 초기값을 false로 놓고 false면 리뷰구현 true면 수정부분구현
    <StyledPage>
      {' '}
      {!loading &&
        (update ? (
          <>
            <>
              <StyledReviewDetailUi>
                <StyledReviewBox>
                  <StyledTitleAndUbtnAndDbtn>
                    <StyledTitleInput
                      maxLength={20}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></StyledTitleInput>
                    <StyledBtnWrapper>
                      <StyledUBtn text="저장" color="main" onClick={saveHandler} />
                      <StyledDBtn text="취소" color="red" onClick={rollbackHandler} />
                    </StyledBtnWrapper>
                  </StyledTitleAndUbtnAndDbtn>
                  <StyledUserInfo>
                    <StyledLogo>
                      <img
                        src={userData ? userData.profile : process.env.PUBLIC_URL + '/images/bookieProfile.png'}
                        alt="Profile"
                      />
                    </StyledLogo>
                    <StyledTitle>{userData ? userData.nickname : ''}</StyledTitle>
                    <StyledInfo>{getReviewDate()}</StyledInfo>
                  </StyledUserInfo>
                  <StyledContentTextarea
                    maxLength={200}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></StyledContentTextarea>
                  <StyledBookInfo>
                    <StyledBookCover>
                      <img src={newReviewDetail.image || book} alt="Book Cover" />
                    </StyledBookCover>
                    <StyledBookTitleAuthor>
                      <StyledBookTitle> {newReviewDetail.bookTitle}</StyledBookTitle>
                      <StyledBookAuthor> {newReviewDetail.bookAuthor} 지음</StyledBookAuthor>
                      <StyledBookGenre> 장르 : {newReviewDetail.genre}</StyledBookGenre>
                    </StyledBookTitleAuthor>
                  </StyledBookInfo>
                </StyledReviewBox>
                <StyledHomeBtn
                  text="뒤로가기"
                  color="white"
                  onClick={() => {
                    navigate(`/review`);
                  }}
                ></StyledHomeBtn>
              </StyledReviewDetailUi>
            </>
          </>
        ) : (
          <>
            <StyledReviewDetailUi>
              <StyledReviewBox>
                <StyledTitleAndUbtnAndDbtn>
                  <StyledReviewTitle>{newReviewDetail.title}</StyledReviewTitle>
                  <StyledBtnWrapper>
                    <StyledUBtn text="수정" color="main" onClick={editHandler} />
                    <StyledDBtn text="삭제" color="white" onClick={deleteHandler} />
                  </StyledBtnWrapper>
                  {reviewAuthorId === currentUserId && (
                    <StyledBtnWrapper>
                      <StyledUBtn text="수정" color="main" onClick={editHandler} />
                      <StyledDBtn text="삭제" color="white" onClick={deleteHandler} />
                    </StyledBtnWrapper>
                  )}
                </StyledTitleAndUbtnAndDbtn>
                <StyledUserInfo>
                  <StyledLogo>
                    <img
                      src={userData ? userData.profile : process.env.PUBLIC_URL + '/images/bookieProfile.png'}
                      alt="Profile"
                    />
                  </StyledLogo>
                  <StyledTitle>{userData ? userData.nickname : ''}</StyledTitle>
                  <StyledInfo>{getReviewDate()}</StyledInfo>
                </StyledUserInfo>
                <StyledReviewContent>{newReviewDetail.content}</StyledReviewContent>
                <StyledBookInfo>
                  <StyledBookCover>
                    <img src={newReviewDetail.image || book} alt="Book Cover" />
                  </StyledBookCover>
                  <StyledBookTitleAuthor>
                    <StyledBookTitle>{newReviewDetail.bookTitle}</StyledBookTitle>
                    <StyledBookAuthor>{newReviewDetail.bookAuthor} 지음</StyledBookAuthor>
                    <StyledBookGenre> 장르 : {newReviewDetail.genre}</StyledBookGenre>
                  </StyledBookTitleAuthor>
                </StyledBookInfo>
              </StyledReviewBox>
              <StyledHomeBtn
                text="뒤로가기"
                color="white"
                onClick={() => {
                  navigate(`/review`);
                }}
              ></StyledHomeBtn>
            </StyledReviewDetailUi>
          </>
        ))}
      {loading && (
        <StyledCustomLoading>
          <CustomLoading />
        </StyledCustomLoading>
      )}
    </StyledPage>
  );
};

export default ReviewDetailPage;
