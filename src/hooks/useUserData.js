import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../firebase/firebase';

const useUserData = (userId) => {
  const { userInfo } = useSelector(({ authReducer }) => authReducer);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userInfo || !userInfo.uid || !userId) return;
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          console.log(userDocSnap.data());
          setUserData(userDocSnap.data());
        }
      } catch (err) {
        console.error('Error getting document:', err);
      }
    };

    fetchData();
  }, [userInfo, userId]); // userId를 의존성 배열에 추가

  return { userData };
};

export default useUserData;
