import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase/firebase';
import { useSelector } from 'react-redux';
import bookieProfile from '../../../assets/bookieProfile.png';

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const Avatar = ({ onChange }) => {
  const { userInfo } = useSelector(({ authReducer }) => authReducer);
  const [imageUrl, setImageUrl] = useState(userInfo.profile || bookieProfile);

  useEffect(() => {
    console.log(imageUrl); // 이미지 URL 출력
  }, [imageUrl]); // imageUrl이 변경될 때마다 실행

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage);
    const fileRef = ref(storageRef, file.name);

    await uploadBytes(fileRef, file);
    const imageUrl = await getDownloadURL(fileRef);

    setImageUrl(imageUrl); // 이미지 URL을 상태에 저장
    onChange(imageUrl); // 부모 컴포넌트로 이미지 URL 전달
  };

  return (
    <AvatarContainer>
      <ImageWrapper>
        {/* 이미지를 표시합니다. */}
        <Image src={imageUrl} alt="avatar" />
      </ImageWrapper>
      {/* 파일 업로드 인풋을 추가합니다. */}
      <ImageInput type="file" id="avatarInput" onChange={handleImageChange} accept="image/*" />
      {/* 파일 업로드 버튼을 추가합니다. */}
      <ImageInputLabel htmlFor="avatarInput">이미지 변경</ImageInputLabel>
    </AvatarContainer>
  );
};

const AvatarContainer = styled.div`
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ImageInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  visibility: hidden;
`;

const ImageInputLabel = styled.label`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export default Avatar;
