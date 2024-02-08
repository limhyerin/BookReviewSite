import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, addDoc, orderBy } from 'firebase/firestore';
import { setReview } from '../redux/modules/reviewsReducer';
import { useDispatch } from 'react-redux';
const useFirestore = (collectionName) => {
  const [data, setData] = useState([]); // Firestore에서 가져온 데이터를 저장할 상태
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Firestore 인스턴스 생성

        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));

        const snapshot = await getDocs(q); // 컬렉션의 모든 문서 가져오기

        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() // 문서 데이터를 객체로 변환
        }));
        //!SECTIONsetData(fetchedData); // 상태 업데이트
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
  }, [collectionName, setData, dispatch]); // collectionName이 변경될 때마다 useEffect 재실행

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

  return { data, loading, addData }; // 컬렉션 데이터를 반환
};

export default useFirestore;
