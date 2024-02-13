import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from '../avatar/Avatar';
import CustomButton from '../../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore'; // getDoc 함수 추가
import { updateProfile } from '../../../redux/modules/authReducer';

const TapProfile = () => {
  const { userInfo } = useSelector(({ authReducer }) => authReducer);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   // 로딩 상태를 변경합니다.
  //   const fetchNickname = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 550));
  //     setLoading(false);
  //   };
  //   fetchNickname();
  // }, []);

  console.log(userInfo.uid);
  const handleSaveClick = async (event) => {
    event.preventDefault();
    try {
      if (!userInfo) return; // userInfo가 유효하지 않으면 더 이상 실행하지 않음
      const newNickname = event.target.nickNameInput.value;
      const userDocRef = doc(db, 'users', userInfo.uid);
      // 닉네임 업데이트
      await updateDoc(userDocRef, { nickname: newNickname });
      console.log('닉네임이 업데이트되었습니다.');
    } catch (error) {
      console.error('닉네임 업데이트 오류:', error);
    }
    //닉네임 변경 후 리로딩
  };

  const handleAvatarChange = async (profile) => {
    try {
      if (!userInfo || !userInfo.uid) return; // userInfo가 유효하지 않으면 더 이상 실행하지 않음
      const userDocRef = doc(db, 'users', userInfo.uid);
      // 프로필 이미지 업데이트
      await updateDoc(userDocRef, { profile });
      console.log(profile);
      dispatch(updateProfile(profile));
      setLoading(false);
      console.log('프로필 이미지가 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 이미지 업데이트 오류:', error);
    }
  };

  return (
    <UserInfo>
      <User>
        <Avatar onChange={handleAvatarChange} loading={loading} setLoading={setLoading} />
        <form onSubmit={handleSaveClick}>
          <NicknameInput type="text" name={'nickNameInput'} defaultValue={userInfo.nickname} />
          <CustomButton text={'수정하기'} />
        </form>
      </User>
    </UserInfo>
  );
};
// loading ? (
//   // 로딩 중일 때 로딩 컴포넌트를 표시합니다.
//   <LoadingContainer>
//     <StyledLoading>
//       <CustomLoading />
//     </StyledLoading>
//   </LoadingContainer>
// ) :

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
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const NicknameInput = styled.input`
  max-width: 250px;
  min-width: 200px;
  margin: 2rem;
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
