import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Avatar from '../avatar/Avatar';
import CustomButton from '../../../components/CustomButton';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'; // Firebase 인증 모듈에서 필요한 함수 가져오기

const TapProfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // 사용자 로그인 상태 변경 감지
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // 로그인된 사용자가 없으면 null을 반환
    });

    return () => unsubscribe();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateProfile(currentUser, {
        displayName: newNickname
      });
      setIsEditing(false);
      console.log('닉네임이 업데이트되었습니다.');
    } catch (error) {
      console.error('닉네임 업데이트 오류:', error);
    }
  };

  const handleChange = (event) => {
    setNewNickname(event.target.value);
  };

  return (
    <UserInfo>
      <User>
        <Avatar />
        <div>
          {currentUser && currentUser.displayName ? (
            isEditing ? (
              <NicknameInput type="text" value={newNickname} onChange={handleChange} placeholder="새로운 닉네임 입력" />
            ) : (
              <p>{currentUser.displayName}</p>
            )
          ) : (
            <p>사용자가 로그인되어 있지 않습니다.</p>
          )}
        </div>
      </User>
      <div>
        {currentUser && currentUser.displayName && isEditing ? (
          <CustomButton text={'수정 완료'} onClick={handleSaveClick} />
        ) : (
          <CustomButton text={'수정하기'} onClick={handleEditClick} />
        )}
      </div>
    </UserInfo>
  );
};

const UserInfo = styled.div`
  display: flex;
  width: 20rem;
  height: 30rem;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  margin: -7rem 20rem;
  border-radius: 10px;
  border: 1px solid #ededed;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const NicknameInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
`;

export default TapProfil;
