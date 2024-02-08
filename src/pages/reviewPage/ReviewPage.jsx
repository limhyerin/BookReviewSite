import React, { useEffect, useState } from 'react';
import BookSearch from './BookSearch';
import useFirestore from '../../hooks/useFirestore';
import CustomModal from '../../components/CustomModal';
import ReviewForm from './ReviewForm';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ReviewPage = () => {
  const reviews = useSelector((state) => state.reviewsReducer).reviews;
  const { loading } = useFirestore('book-reviews');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

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
      <button onClick={openModal}>작성하기</button>
      <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
        {!selectedBook && (
          <BookSearch books={books} setBooks={setBooks} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
        )}
        {selectedBook && <ReviewForm setIsModalOpen={setIsModalOpen} selectedBook={selectedBook} reviews={reviews} />}
      </CustomModal>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {reviews.map((review) => (
          <Link key={review.id} to={`/review-detail/${review.id}`}>
            <div style={{ border: '1px solid #000', padding: '10px', marginRight: '10px' }}>
              <img style={{ width: '100px' }} src={review.image} alt={review.title} />
              <p>{review.title}:</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
