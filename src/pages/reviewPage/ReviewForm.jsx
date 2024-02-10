import React, { useState } from 'react';
import useFirestore from '../../hooks/useFirestore';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../redux/modules/reviewsReducer';
import { genreList } from '../../common/constants';
import { StyledReviewFormContainer } from './ReviewPage.styled';
import CustomButton from '../../components/CustomButton';
import { DropdownProvider } from '../../components/DropdownContext';
import Dropdown from '../../components/Dropdown';

const ReviewForm = ({ selectedBook, setIsModalOpen, setSelectedBook }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addData } = useFirestore('book-reviews');
  const dispatch = useDispatch();
  const [selectedGenre, setSelectedGenre] = useState('소설');
  const { userInfo } = useSelector((state) => state.authReducer);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const addReviewHandler = async (e) => {
    e.preventDefault();

    if (title === '' || content === '') {
      return;
    }
    const newReviewData = {
      title: title,
      content: content,
      image: selectedBook.image,
      bookAuthor: selectedBook.author,
      bookTitle: selectedBook.title,
      createdAt: new Date(),
      genre: selectedGenre,
      author: userInfo ? userInfo.uid : '',
      authorName: userInfo ? userInfo.nickname : ''
    };
    const docId = await addData(newReviewData);
    newReviewData.id = docId;
    dispatch(addReview(newReviewData));
    setIsModalOpen(false);
    setSelectedBook('');
  };

  // Select 요소 변경 핸들러
  // const onSelectChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedGanre(selectedValue);
  // };

  return (
    <StyledReviewFormContainer>
      <div className="selectWrap">
        <div className="imgWrap">
          <img src={selectedBook.image} alt={selectedBook.title} />
          <p>제목:{selectedBook.title}</p>
          <p>저자:{selectedBook.author}</p>
        </div>
        <DropdownProvider>
          <div>
            {/* <h3>Dropdown Item</h3> */}
            <Dropdown setSelectedItem={setSelectedGenre} items={genreList} />
          </div>
        </DropdownProvider>
        {/* <select className="category" name="category" onChange={onSelectChange}>
          {genreList.map((genre) => {
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            );
          })}
        </select> */}
      </div>
      <form
        onChange={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" value={title} onChange={onChangeTitle} name="title" placeholder="제목을 입력해 주세요" />
        <textarea
          type="text"
          value={content}
          onChange={onChangeContent}
          name="content"
          placeholder="내용을 입력해 주세요"
        />
        <CustomButton
          text="완료"
          color="main"
          onClick={(e) => {
            addReviewHandler(e);
          }}
        />
      </form>
    </StyledReviewFormContainer>
  );
};

export default ReviewForm;
