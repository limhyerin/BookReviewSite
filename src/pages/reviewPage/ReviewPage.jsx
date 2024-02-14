import React, { useState } from 'react';
import BookSearch from './BookSearch';
import useFirestore from '../../hooks/useFirestore';
import CustomModal from '../../components/CustomModal';
import ReviewForm from './ReviewForm';
import { useSelector } from 'react-redux';
import { genreList } from '../../common/constants';
import CustomSidebar from './CustomSidebar';
import CustomLoading from '../../components/CustomLoading';
import styled from 'styled-components';
import ReviewsContainer from './ReviewsContainer';

const ReviewPage = () => {
  const reviews = useSelector((state) => state.reviewsReducer).reviews;
  const { loading } = useFirestore('book-reviews');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('전체');

  const newGenreLists = ['전체', ...genreList];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setBooks([]);
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div>
      <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
        {!selectedBook && (
          <BookSearch books={books} setBooks={setBooks} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
        )}
        {selectedBook && (
          <ReviewForm
            setSelectedBook={setSelectedBook}
            setIsModalOpen={setIsModalOpen}
            selectedBook={selectedBook}
            reviews={reviews}
          />
        )}
      </CustomModal>
      <StyledReviewPageContainer>
        <CustomSidebar items={newGenreLists} setItem={setSelectedGenre} selectedItem={selectedGenre} />
        {!loading && <ReviewsContainer openModal={openModal} selectedGenre={selectedGenre} reviews={reviews} />}
        {loading && (
          <div className="loadingIcon">
            <CustomLoading />
          </div>
        )}
      </StyledReviewPageContainer>
    </div>
  );
};

export default ReviewPage;

const StyledReviewPageContainer = styled.div`
  display: flex;
  padding: 30px;
  .loadingIcon {
    flex: 6;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
