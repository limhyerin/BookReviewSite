import styled from 'styled-components';

export const StyledReviewPageContainer = styled.div`
  display: flex;
`;

export const StyledSidebar = styled.div`
  // flex: 1;
  position: sticky;
  //position: -webkit-sticky;
  top: 0;
  height: 100vh;
  background-color: #fff;
  color: ${(props) => props.theme.colors.mainBlack};
  border: 1px solid ${(props) => props.theme.colors.mainGray};
  border-radius: 10px;
  font-size: ${(props) => props.theme.fontSize.base};
  padding: 10px;
  text-align: center;
  cursor: pointer;
`;

export const StyledSidebarUl = styled.ul`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const StyledReviewsContainer = styled.div`
  flex: 6;
  display: flex;
  //justify-content: space-between;
  flex-direction: column;

  .pageTitleWrap {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    width: 90%;
    margin: 0 auto;
    .pageTitle {
      font-size: ${(props) => props.theme.fontSize.xl2};
    }
  }
`;

export const StyledReviews = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
  gap: 3%;
  a {
    text-decoration: none;
    color: black;
  }
  > li {
    list-style: none;
    //width: 22%;
    min-width: 200px;
    max-width: 300px;

    margin-bottom: 20px;
  }
  .card {
    /* border: 1px solid ${(props) => props.theme.colors.mainGray}; */
    padding: 10px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.25);

    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
    .userWrap {
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid ${(props) => props.theme.colors.mainGray};
    }
    .profile {
      width: 30px;
      height: 30px;
      background-color: #ccc;
      display: inline-block;
      border-radius: 30px;
      margin-right: 5px;
    }
    .bookTitle {
      margin-top: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .imgWrapper {
      height: 270px;
      overflow: hidden;
    }
    img {
      width: 70%;
    }
    .title {
      border-top: 1px solid ${(props) => props.theme.colors.mainGray};
      margin-top: 10px;
      padding: 10px;
    }
  }
`;
