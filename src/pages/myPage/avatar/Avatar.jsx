import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Avatar = ({ profile }) => {
  const [selectedImage, setSelectedImage] = useState(profile);

  useEffect(() => {
    // 페이지 로드 시, 로컬 스토리지에서 이미지 데이터 가져오기
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, []);

  // 이미지 변경 핸들러
  const handleImageChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    // 파일 읽기
    reader.onloadend = () => {
      setSelectedImage(reader.result); // 이미지 변경
      // 로컬 스토리지에 이미지 데이터 저장
      localStorage.setItem('profileImage', reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <AvatarContainer>
      <ImageWrapper>
        <Image src={selectedImage} alt="avatar" />
      </ImageWrapper>
      <ImageInput type="file" id="avatarInput" onChange={handleImageChange} accept="image/*" />
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
  object-fit: cover;
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
