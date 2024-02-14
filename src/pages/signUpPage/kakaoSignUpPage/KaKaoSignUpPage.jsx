import { useEffect } from 'react';
import CustomLoading from '../../../components/CustomLoading';
import { auth, db } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const KaKaoSignUpPage = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_SIGNUP_REDIRECT_URI;
  const BASE_URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  };
  const navigate = useNavigate();
  const getToken = async (code) => {
    try {
      const response = await fetch(BASE_URL, option);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const kakaoSignUp = async () => {
      try {
        if (code) {
          const { access_token } = await getToken(code);
          const {
            data: {
              kakao_account: {
                email,
                profile: { nickname }
              }
            }
          } = await axios.post(
            'https://kapi.kakao.com/v2/user/me',
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          );
          const { user } = await createUserWithEmailAndPassword(auth, email, 'password');
          const signUpData = doc(db, 'users', user.uid);
          await setDoc(signUpData, { userId: email, password: 'password', nickname, uid: user.uid });
          navigate('/');
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    };

    kakaoSignUp();
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CustomLoading />
    </div>
  );
};

export default KaKaoSignUpPage;
