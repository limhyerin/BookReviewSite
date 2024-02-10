import styled from 'styled-components';

export const StyledReviewPageContainer = styled.div`
  display: flex;
  padding: 30px;
`;

export const StyledSidebar = styled.div`
  // flex: 1;
  position: sticky;
  //position: -webkit-sticky;

  top: 100px;
  height: 500px;
  background-color: #fff;
  color: ${(props) => props.theme.colors.mainBlack};
  border: 1px solid ${(props) => props.theme.colors.mainGray};
  border-radius: 10px;
  font-size: ${(props) => props.theme.fontSize.base};
  padding: 30px;
  text-align: center;
  cursor: pointer;
  > ul {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
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

export const StyledBookSearchContainer = styled.div`
  width: 400px;
  height: 400px;
  margin: 0 auto;
  text-align: center;
  button {
    background-color: transparent;
    border: none;
  }
  > form {
    // margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  .searchInput {
    margin-right: 10px;
  }
`;

export const StyledBookSearchList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  > ul {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: center;
    > li {
      list-style: none;
      width: 90px;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      > img {
        width: 100%;
        height: 150px;
        margin-bottom: px;
      }
      > p {
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        font-size: ${(props) => props.theme.fontSize.xs};
      }
      > p:nth-child(1) {
        margin-bottom: 5px;
      }
    }
  }
`;

export const StyledReviewFormContainer = styled.div`
  width: 400px;
  .selectWrap {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    align-items: center;
    margin-bottom: 30px;
  }

  .imgWrap {
    margin-right: 20px;
    text-align: center;
    img {
      height: 150px;
    }
    p {
      font-size: ${(props) => props.theme.fontSize.xs};
    }
    p:nth-child(1) {
      margin-bottom: 5px;
    }
  }
  .category {
    flex: 2;
    display: inline-block;
  }
  form {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    input {
      margin-bottom: 20px;
      height: 30px;
    }
    textarea {
      margin-bottom: 20px;
      height: 100px;
    }
  }
`;
