import styled from 'styled-components';

const Avatar = ({ imageUrl }) => {
  return (
    <AvatarContainer>
      <ImageWrapper>
        <Image src={imageUrl} alt="avatar" />
      </ImageWrapper>
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
  object-fit: cover;
`;

export default Avatar;
