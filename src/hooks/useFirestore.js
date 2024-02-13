import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, addDoc, orderBy } from 'firebase/firestore';
import { setReview } from '../redux/modules/reviewsReducer';
import { useDispatch } from 'react-redux';
const useFirestore = (collectionName) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() // 문서 데이터를 객체로 변환
        }));
        dispatch(setReview(fetchedData));
        setLoading(false);
        console.log('fetchedData', fetchedData);
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData(); // 데이터 가져오기 함수 호출

    // 컴포넌트 언마운트 시 정리 함수
    return () => {
      // 필요하다면 클린업 코드를 작성할 수 있음
    };
  }, [collectionName, dispatch]);

  const addData = async (newData) => {
    try {
      const collectionRef = collection(db, collectionName);
      const docRef = await addDoc(collectionRef, newData);
      console.log('Data added successfully!', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return { loading, addData };
};

export default useFirestore;
