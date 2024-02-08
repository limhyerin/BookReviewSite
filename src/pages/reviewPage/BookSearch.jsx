import React, { useState } from 'react';
import axios from 'axios';

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
          display: 10 // 가져올 검색 결과의 수
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
    <div style={{ width: 400, margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      <ul style={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
        {books.map((book, index) => (
          <li
            key={index}
            onClick={() => {
              setSelectedBook(book);
            }}
            style={{ width: '90px', cursor: 'pointer' }}
          >
            <img style={{ width: '100%', height: '150px' }} src={book.image} alt={book.title} />
            <p>{book.title}</p>
            <p>{book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;
