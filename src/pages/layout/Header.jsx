import styled from 'styled-components';
import bookieLogo from '../../assets/bookieLogo.jpg';
import CustomButton from '../../components/CustomButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const StyledHeader = styled.header`
  position: sticky;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 1.2rem;
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

const StyledProfile = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 50%;
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
  return (
    <StyledHeader>
      <StyledFigure to={'/'}>
        <img src={bookieLogo} alt="logo" />
      </StyledFigure>
      {authState ? (
        <StyledProfile />
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
