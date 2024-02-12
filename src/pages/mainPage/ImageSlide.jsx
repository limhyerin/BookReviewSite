import React from 'react'
import styled from 'styled-components';

const StyledBox = styled.div`
  position: relative;
  width: 1200px;
  height: 280px;
  margin: 20px auto;
  overflow: hidden;
`;

const StyledSlider = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1200px;
`;

const StyledSlide = styled.div`
  width: 190px;
  height: 280px;
  margin-left: 50px;
  background-position: center;
  background-size: cover;
`;

const StyledSlideImg = styled(StyledSlide)`
  width: 190px;
  height: 280px;
  margin-left: 50px;
`;

const ImageSlide = ({StyledSliderWrapper, imageUrls}) => {
  return (
    <>
        <StyledBox>
            <StyledSliderWrapper>
            <StyledSlider>
                {imageUrls.map((url, index) => (
                    <StyledSlideImg key={index} style={{ backgroundImage: `url(${url})` }} />
                ))}
            </StyledSlider>
            <StyledSlider>
                {imageUrls.map((url, index) => (
                    <StyledSlideImg key={index} style={{ backgroundImage: `url(${url})` }} />
                ))}
            </StyledSlider>
            </StyledSliderWrapper>
        </StyledBox>
    </>
  )
}

export default ImageSlide