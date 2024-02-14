import { useState } from 'react';
import styled from 'styled-components';
import { validateValue } from '../common/validation';
import CustomButton from './CustomButton';
import { useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { RiKakaoTalkFill } from 'react-icons/ri';

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;
  padding: 4rem;
  border: 1px solid black;
  border-radius: 10px;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid black;
  input {
    font-size: ${(props) => props.theme.fontSize.lg};
    border: none;
    background-color: inherit;
    outline: none;
  }
  span {
    padding-top: 0.5rem;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: red;
  }
`;
const StyledButtonBox = styled.div`
  button {
    width: 100%;
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;
const SocialSignInBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const GoogleButton = styled(FcGoogle)`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;
const GithubButton = styled(BsGithub)`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;
const KakaoButton = styled(RiKakaoTalkFill)`
  width: 4rem;
  height: 4rem;
  padding: 0.5rem;
  color: #371d1e;
  background-color: #fae100;
  border-radius: 50%;
  cursor: pointer;
`;

const SignForm = ({
  userInfo,
  setUserInfo,
  setValidation,
  onSubmit,
  onClickGoogle,
  onClickGithub,
  onClickKakaoSignIn,
  onClickKakaoSignUp
}) => {
  const { pathname } = useLocation();
  const [errorMsg, setErrorMsg] = useState({
    userId: '',
    password: '',
    result: ''
  });

  const onChangeUserInfo = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    if (validateValue(name, value)) {
      setValidation((prev) => ({ ...prev, [name]: true }));
      setErrorMsg((prev) => ({ ...prev, [name]: '' }));
    } else {
      setValidation((prev) => ({ ...prev, [name]: false }));
      setErrorMsg((prev) => {
        if (name === 'userId') {
          return { ...prev, [name]: '아이디는 email 형식입니다.' };
        }
        if (name === 'password') {
          return { ...prev, [name]: '최소 8 자, 하나 이상의 특수문자 포함한 문자와 숫자를 입력해주세요' };
        }
        if (name === 'nickname') {
          return { ...prev, [name]: '닉네임은 2 ~ 15 글자로 입력해주세요.' };
        }
      });
    }
  };
  return (
    <SignUpForm onSubmit={onSubmit}>
      <InputBox>
        <input
          type="email"
          name="userId"
          placeholder="아이디를 입력해 주세요"
          value={userInfo.userId}
          onChange={onChangeUserInfo}
        />
        <span>{errorMsg.userId}</span>
      </InputBox>
      <InputBox>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          minLength={8}
          maxLength={16}
          value={userInfo.password}
          onChange={onChangeUserInfo}
        />
        <span>{errorMsg.password}</span>
      </InputBox>
      {pathname === '/signup' ? (
        <>
          <InputBox>
            <input
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해 주세요"
              value={userInfo.nickname}
              onChange={onChangeUserInfo}
            />
          </InputBox>
          <StyledButtonBox>
            <CustomButton text={'가입하기'} />
          </StyledButtonBox>
          <SocialSignInBox>
            <GoogleButton type="button" onClick={onClickGoogle} />
            <GithubButton type="button" onClick={onClickGithub} />
            <KakaoButton type="button" onClick={onClickKakaoSignUp} />
          </SocialSignInBox>
        </>
      ) : (
        <>
          <StyledButtonBox>
            <CustomButton text={'로그인'} />
          </StyledButtonBox>
          <SocialSignInBox>
            <GoogleButton type="button" onClick={onClickGoogle} />
            <GithubButton type="button" onClick={onClickGithub} />
            <KakaoButton type="button" onClick={onClickKakaoSignIn} />
          </SocialSignInBox>
        </>
      )}
    </SignUpForm>
  );
};

export default SignForm;
