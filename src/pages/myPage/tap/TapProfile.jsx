import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from '../avatar/Avatar';
import CustomButton from '../../../components/CustomButton';
import CustomModal from '../../../components/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updateNickname, updateProfile } from '../../../redux/modules/authReducer';

const StyledModalWrap = styled.div`
  padding: 10px 50px;
  font-size: 20px;
`;

const TapProfile = () => {
  const { userInfo } = useSelector(({ authReducer }) => authReducer);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempProfile, setTempProfile] = useState(userInfo.profile);

  const dispatch = useDispatch();

  const handleSaveClick = async (event) => {
    event.preventDefault();
    try {
      if (!userInfo) return;
      const newNickname = event.target.nickNameInput.value;
      const userDocRef = doc(db, 'users', userInfo.uid);

      await updateDoc(userDocRef, { nickname: newNickname, profile: tempProfile });
      dispatch(updateNickname(newNickname));
      dispatch(updateProfile(tempProfile));
      setShowModal(true);
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
    }
  };

  const handleAvatarChange = (profile) => {
    setTempProfile(profile);
  };

  const closeModal = () => {
    setShowModal(false);
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
      <CustomModal isOpen={showModal} closeModal={closeModal}>
        <StyledModalWrap>
          <p>수정이 완료되었습니다!</p>
        </StyledModalWrap>
      </CustomModal>
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

export default TapProfile;
