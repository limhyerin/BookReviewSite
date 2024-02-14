import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avatar from '../avatar/Avatar';
import CustomButton from '../../../components/CustomButton';
import CustomModal from '../../../components/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { db, storage } from '../../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateNickname, updateProfile } from '../../../redux/modules/authReducer';
import bookieProfile from '../../../assets/bookieProfile.png';
import CustomLoading from '../../../components/CustomLoading';

const TapProfile = () => {
  const { userInfo } = useSelector(({ authReducer }) => authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.profile) {
      setImageUrl(userInfo.profile);
    } else {
      setImageUrl(bookieProfile);
    }
  }, [userInfo]);

  const handleSaveClick = async (event) => {
    event.preventDefault();
    try {
      if (!userInfo) return;
      setIsLoading(true);
      const file = event.target.avatarInput.files[0];
      const newNickname = event.target.nickNameInput.value;
      const userDocRef = doc(db, 'users', userInfo.uid);
      const storageRef = ref(storage);
      const fileRef = ref(storageRef, file.name);
      await uploadBytes(fileRef, file);
      const newImageUrl = await getDownloadURL(fileRef);
      await updateDoc(userDocRef, { nickname: newNickname, profile: newImageUrl });

      dispatch(updateNickname(newNickname));
      dispatch(updateProfile(newImageUrl));
      setIsLoading(false);
      setShowModal(true);
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      setImageUrl(data.target.result);
    };
  };

  return (
    <UserInfo>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <>
          <User>
            <ProfileWrapper>
              <Avatar imageUrl={imageUrl} isLoading={isLoading} />
              <ImageInputLabel htmlFor="avatarInput">이미지 변경</ImageInputLabel>
            </ProfileWrapper>
            <form onSubmit={handleSaveClick}>
              <ImageInput
                type="file"
                id="avatarInput"
                name="avatarInput"
                onChange={handleImageChange}
                accept="image/*"
              />
              <NicknameInput type="text" name={'nickNameInput'} defaultValue={userInfo.nickname} />
              <CustomButton text={'수정하기'} />
            </form>
          </User>
          <CustomModal isOpen={showModal} closeModal={closeModal}>
            <StyledModalWrap>
              <p>수정이 완료되었습니다!</p>
            </StyledModalWrap>
          </CustomModal>
        </>
      )}
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
  gap: 2rem;
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

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  visibility: hidden;
`;

const ImageInputLabel = styled.label`
  background-color: #ffffff;
  padding: 8px 16px;
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledModalWrap = styled.div`
  align-self: center;
  padding: 10px 50px;
  font-size: 20px;
`;

export default TapProfile;
