import React, { useState } from 'react';
import useFirestore from '../../hooks/useFirestore';

const ReviewForm = ({ selectedBook, setReviews, reviews, setIsModalOpen }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addData } = useFirestore('book-reviews');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const addReview = async () => {
    const newReviewData = {
      title: title,
      content: content,
      image: selectedBook.image,
      bookAuthor: selectedBook.author,
      bookTitle: selectedBook.title,
      createdAt: new Date()
    };
    const docId = await addData(newReviewData);
    newReviewData.id = docId;
    setReviews([newReviewData, ...reviews]);
    setIsModalOpen(false);
    // console.log('docId', docId);
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <img style={{ width: '100%', height: '150px' }} src={selectedBook.image} alt={selectedBook.title} />
          <p>{selectedBook.title}</p>
          <p>{selectedBook.author}</p>
        </div>
        <select name="카테고리">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <form>
        <input type="text" value={title} onChange={onChangeTitle} name="title" placeholder="제목을 입력해 주세요" />
        <textarea
          type="text"
          value={content}
          onChange={onChangeContent}
          name="content"
          placeholder="내용을 입력해 주세요"
        />
        <input
          type="button"
          value="확인"
          onClick={() => {
            addReview();
          }}
        />
      </form>
    </div>
  );
};

export default ReviewForm;
