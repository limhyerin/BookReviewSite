import styled from 'styled-components';
import TapProfil from './TapProfil';
import TapReview from './TapReview';

const TapContent = ({ activeTab }) => {
  return (
    // 선택된 탭에 따라 다른 컴포넌트를 렌더링
    <Container>
      {activeTab === '내 정보 수정' && <TapProfil />}
      {activeTab === '내 리뷰 보기' && <TapReview />}
    </Container>
  );
};

const Container = styled.div`
  /* background-color: green; */
  margin-top: 10rem;
  width: 50rem;
`;

export default TapContent;
