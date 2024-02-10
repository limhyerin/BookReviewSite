import React, { useState } from 'react';
import axios from 'axios';
import { StyledBookSearchContainer, StyledBookSearchList } from './ReviewPage.styled';
import { IoSearchSharp } from 'react-icons/io5';

function BookSearch({ setSelectedBook, books, setBooks }) {
  const [query, setQuery] = useState('');

  const searchBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_NAVER_API_URL}/v1/search/book.json`, {
        headers: {
          'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET
        },
        params: {
          query: query,
          display: 8 // 가져올 검색 결과의 수
          // 네이버 책 검색 API에 필요한 인증 헤더를 추가합니다.
        }
      });
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchBooks();
  };

  return (
    <StyledBookSearchContainer>
      <form onSubmit={handleSubmit}>
        <input className="searchInput" type="text" value={query} onChange={handleInputChange} />
        <button type="submit">
          <IoSearchSharp size="20px" />
        </button>
      </form>
      <StyledBookSearchList>
        {books.length > 0 ? (
          <ul>
            {books.map((book, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedBook(book);
                  setBooks([]);
                }}
              >
                <img src={book.image} alt={book.title} />
                <p>제목:{book.title}</p>
                <p>저자:{book.author}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </StyledBookSearchList>
    </StyledBookSearchContainer>
  );
}

export default BookSearch;
