import React, { useEffect, useState } from 'react';
import BookSearch from './BookSearch';
import useFirestore from '../../hooks/useFirestore';
import CustomModal from '../../components/CustomModal';
import ReviewForm from './ReviewForm';
import { Link } from 'react-router-dom';

const ReviewPage = () => {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { loading } = useFirestore('book-reviews', setReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log('review update', reviews);
  }, [reviews]);

  return (
    <div>
      {/*  */}
      ReviewPage
      <hr />
      <button onClick={openModal}>작성하기</button>
      <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
        {!selectedBook && (
          <BookSearch books={books} setBooks={setBooks} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
        )}
        {selectedBook && (
          <ReviewForm
            setIsModalOpen={setIsModalOpen}
            selectedBook={selectedBook}
            reviews={reviews}
            setReviews={setReviews}
          />
        )}
      </CustomModal>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {reviews.map((review) => (
          <Link to={`/review-detail/${review.id}`}>
            <div key={review.id} style={{ border: '1px solid #000', padding: '10px', marginRight: '10px' }}>
              <img style={{ width: '100px' }} src={review.image} alt={review.title} />
              <p>{review.title}:</p>
              <p>{review.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
