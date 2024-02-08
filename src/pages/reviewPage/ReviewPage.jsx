import React, { useEffect, useState } from 'react';
import BookSearch from './BookSearch';
import useFirestore from '../../hooks/useFirestore';
import CustomModal from '../../components/CustomModal';
import ReviewForm from './ReviewForm';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { genreList } from '../../common/constants';
import {
  StyledReviewPageContainer,
  StyledReviews,
  StyledReviewsContainer,
  StyledSidebar,
  StyledSidebarUl
} from './ReviewPage.styled';
import CustomButton from '../../components/CustomButton';

const ReviewPage = () => {
  const reviews = useSelector((state) => state.reviewsReducer).reviews;
  const { loading } = useFirestore('book-reviews');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (loading) {
      console.log('loading...');
    } else {
      console.log('done');
    }
  }, [loading]);
  return (
    <div>
      ReviewPage
      <hr />
      <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
        {!selectedBook && (
          <BookSearch books={books} setBooks={setBooks} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
        )}
        {selectedBook && <ReviewForm setIsModalOpen={setIsModalOpen} selectedBook={selectedBook} reviews={reviews} />}
      </CustomModal>
      <StyledReviewPageContainer>
        <StyledSidebar style={{ flex: 1 }}>
          <StyledSidebarUl>
            {genreList.map((genre) => (
              <li>{genre}</li>
            ))}
          </StyledSidebarUl>
        </StyledSidebar>
        <StyledReviewsContainer>
          <div className="pageTitleWrap">
            <p className="pageTitle">소설</p>
            <CustomButton text="작성하기" color="main" onClick={openModal}></CustomButton>
          </div>
          <StyledReviews>
            {reviews.map((review) => (
              <li>
                <Link key={review.id} to={`/review-detail/${review.id}`}>
                  <div className="card">
                    <p className="userWrap">
                      <span className="profile">{/* <img src="프사" alt="프사" /> */}</span>
                      <span>쌀짱</span>
                    </p>
                    <div className="imgWrapper">
                      <img src={review.image} alt={review.title} />
                    </div>
                    <p className="bookTitle">
                      {review.bookAuthor} - {review.bookTitle}
                    </p>
                    <p className="title">{review.title}:</p>
                  </div>
                </Link>
              </li>
            ))}
          </StyledReviews>
        </StyledReviewsContainer>
      </StyledReviewPageContainer>
    </div>
  );
};

export default ReviewPage;
