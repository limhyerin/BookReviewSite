import styled from 'styled-components';
import bookieLogo from '../../assets/bookieLogo.jpg';
import CustomButton from '../../components/CustomButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import bookieProfile from '../../assets/bookieProfile.jpg';
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
  border: 1px solid black;
  background-color: white;
`;

const StyledFigure = styled(Link)`
  img {
    width: 150px;
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
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 1px 1px 1px black;
    object-fit: contain;
  }
`;
const LogoutButton = styled.div`
  div > button {
    color: black;
    background-color: inherit !important;
    box-shadow: none;
  }
`;
const Header = ({ authState }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigateToSignIn = () => {
    navigate('/signin');
  };
  const navigateToSignUp = () => {
    navigate('/signup');
  };

  const onClickLogout = async () => {
    await signOut(auth);
  };

  const info = useSelector(({ authReducer }) => authReducer.userInfo);

  const isLogged = JSON.parse(sessionStorage.getItem('accessToken'));
  return (
    <StyledHeader>
      <StyledFigure to={'/'}>
        <img src={bookieLogo} alt="logo" />
      </StyledFigure>
      {isLogged ? (
        <div style={{ display: 'flex' }}>
          <StyledProfile to={'/mypage'}>
            <img src={info.profile || bookieProfile} alt="profile" />
          </StyledProfile>
          <LogoutButton>
            <CustomButton onClick={onClickLogout} text={'logout'} />
          </LogoutButton>
        </div>
      ) : (
        pathname.includes('sign') || (
          <StyledButtonBox>
            <CustomButton onClick={navigateToSignIn} text={'Sign In'} />
            <CustomButton onClick={navigateToSignUp} text={'Sign Up'} />
          </StyledButtonBox>
        )
      )}
    </StyledHeader>
  );
};

export default Header;
