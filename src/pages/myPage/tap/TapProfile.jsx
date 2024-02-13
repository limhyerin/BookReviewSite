import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Avatar from '../avatar/Avatar';
import CustomButton from '../../../components/CustomButton';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // getDoc 함수 추가
import CustomLoading from '../../../components/CustomLoading';

const TapProfile = () => {
  const { userInfo } = useSelector(({ authReducer }) => authReducer);
  const [newNickname, setNewNickname] = useState(userInfo.nickname ? userInfo.nickname : '');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로딩 상태를 변경합니다.
    const fetchNickname = async () => {
      await new Promise((resolve) => setTimeout(resolve, 550));
      setLoading(false);
    };
    fetchNickname();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userInfo || !userInfo.uid) return; // userInfo 또는 userInfo.uid가 없는 경우 실행하지 않음

        const userDocRef = doc(db, 'users', userInfo.uid);
        const userDocSnap = await getDoc(userDocRef); // getDoc 함수 사용
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    fetchData();
  }, [userInfo]);

  useEffect(() => {
    // userData가 변경될 때마다 새로운 닉네임 설정
    if (userData) {
      setNewNickname(userData.nickname || '');
    }
  }, [userData]);

  const handleSaveClick = async () => {
    try {
      if (!userInfo) return; // userInfo가 유효하지 않으면 더 이상 실행하지 않음

      const userDocRef = doc(db, 'users', userInfo.uid);
      // 닉네임 업데이트
      await updateDoc(userDocRef, { nickname: newNickname });
      console.log('닉네임이 업데이트되었습니다.');
    } catch (error) {
      console.error('닉네임 업데이트 오류:', error);
    }
    window.location.reload();
    //닉네임 변경 후 리로딩
  };

  const handleAvatarChange = async (profile) => {
    try {
      if (!userInfo || !userInfo.uid) return; // userInfo가 유효하지 않으면 더 이상 실행하지 않음

      const userDocRef = doc(db, 'users', userInfo.uid);
      // 프로필 이미지 업데이트
      await updateDoc(userDocRef, { profile });
      console.log('프로필 이미지가 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 이미지 업데이트 오류:', error);
    }
  };

  const handleChange = (event) => {
    setNewNickname(event.target.value);
  };

  return loading ? (
    // 로딩 중일 때 로딩 컴포넌트를 표시합니다.
    <LoadingContainer>
      <StyledLoading>
        <CustomLoading />
      </StyledLoading>
    </LoadingContainer>
  ) : (
    <UserInfo>
      <User>
        <Avatar onChange={handleAvatarChange} />
        <div>
          <NicknameInput type="text" value={newNickname} onChange={handleChange} />
        </div>
      </User>
      <div>{userData && userData.nickname ? <CustomButton text={'수정하기'} onClick={handleSaveClick} /> : null}</div>
    </UserInfo>
  );
};

const UserInfo = styled.div`
  display: flex;
  max-width: 600px;
  min-width: 300px;
  height: 30rem;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  margin: 0 auto;

  border-radius: 10px;
  border: 1px solid #ccc;
  position: relative;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const NicknameInput = styled.input`
  max-width: 250px;
  min-width: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
`;

const StyledLoading = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default TapProfile;
