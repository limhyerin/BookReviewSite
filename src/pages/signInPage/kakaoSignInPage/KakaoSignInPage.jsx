import { useEffect } from 'react';
import CustomLoading from '../../../components/CustomLoading';

const KakaoSignInPage = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  // 2. access Token 요청
  const getToken = async (code) => {
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`;
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    };
    try {
      const response = await fetch(URL, option);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (code) {
      getToken(code).then((res) => {
        console.log(res.access_token);
      });
    }
  }, []);
  return <CustomLoading />;
};

export default KakaoSignInPage;
