import styled from 'styled-components';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';
import bookieProfile from '../../../assets/bookieProfile.png';
import { storage } from '../../../firebase/firebase';
import CustomLoading from '../../../components/CustomLoading';

const Avatar = ({ loading, setLoading, onChange }) => {
  const { userInfo } = useSelector(({ authReducer }) => authReducer);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage);
    const fileRef = ref(storageRef, file.name);
    setLoading(true);
    await uploadBytes(fileRef, file);
    const imageUrl = await getDownloadURL(fileRef);
    onChange(imageUrl); // 부모 컴포넌트로 이미지 URL 전달
  };

  return (
    <AvatarContainer>
      <ImageWrapper>
        {/* 이미지를 표시합니다. */}
        {loading ? <CustomLoading /> : <Image src={userInfo.profile || bookieProfile} alt="avatar" />}
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
  display: flex;
  justify-content: center;
  align-items: center;
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
