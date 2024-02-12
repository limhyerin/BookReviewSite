import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Avatar from '../avatar/Avatar';
import CustomButton from '../../../components/CustomButton';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

const TapProfil = () => {
  const { userInfo } = useSelector(({ authReducer }) => authReducer);
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userInfo || !userInfo.uid) return; // userInfo 또는 userInfo.uid가 없는 경우 실행하지 않음

        const docRef = doc(db, 'users', userInfo.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    fetchData();
  }, [userInfo]);

  const handleSaveClick = async () => {
    try {
      if (!userInfo) return; // userInfo가 유효하지 않으면 더 이상 실행하지 않음

      const docRef = doc(db, 'users', userInfo.uid);
      // 닉네임 업데이트
      await updateDoc(docRef, { nickname: newNickname });
      setIsEditing(false);
      console.log('닉네임이 업데이트되었습니다.');
    } catch (error) {
      console.error('닉네임 업데이트 오류:', error);
    }
    window.location.reload();
    //닉네임 변경 후 리로딩
  };

  const handleChange = (event) => {
    setNewNickname(event.target.value);
  };

  return (
    <UserInfo>
      <User>
        <Avatar />
        <div>
          {userData && userData.nickname ? (
            isEditing ? (
              <NicknameInput type="text" value={newNickname} onChange={handleChange} placeholder="새로운 닉네임 입력" />
            ) : (
              <p>{userData.nickname}</p>
            )
          ) : null}
        </div>
      </User>
      <div>
        {userData && userData.nickname && isEditing ? (
          <CustomButton text={'수정 완료'} onClick={handleSaveClick} />
        ) : (
          <CustomButton text={'수정하기'} onClick={() => setIsEditing(true)} />
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
