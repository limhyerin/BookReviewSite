import styled from 'styled-components';
import bookieLogo from '../../assets/bookieLogo.png';
import CustomButton from '../../components/CustomButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import bookieProfile from '../../assets/bookieProfile.png';
import { useSelector } from 'react-redux';
const StyledHeader = styled.header`
  position: fixed;
  top: 0px;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 1.2rem;
  background-color: #333;
`;

const StyledFigure = styled(Link)`
  img {
    width: 150px;
    background-color: inherit;
  }
`;

const StyledButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 11rem;
`;

const StyledProfile = styled(Link)`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 1px 1px 1px black;
    object-fit: cover;
    background-color: #fff;
  }
`;
const LogoutButton = styled.div`
  div > button {
    color: black;
    background-color: inherit !important;
    box-shadow: none;
  }
`;
const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useSelector(({ authReducer }) => authReducer);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigateToSignIn = () => {
    navigate('/signin');
  };
  const navigateToSignUp = () => {
    navigate('/signup');
  };
  return (
    <StyledHeader>
      <StyledFigure to={'/'}>
        <img src={bookieLogo} alt="logo" />
      </StyledFigure>
      {isLoggedIn && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <StyledProfile to={'/mypage'}>
            <img src={userInfo.profile || bookieProfile} alt="profile" />
          </StyledProfile>
        </div>
      )}
      {!pathname.includes('sign') && !isLoggedIn && (
        <StyledButtonBox>
          <CustomButton onClick={navigateToSignIn} color="main" text={'Sign In'} />
          <CustomButton onClick={navigateToSignUp} color="main" text={'Sign Up'} />
        </StyledButtonBox>
      )}
    </StyledHeader>
  );
};

export default Header;
