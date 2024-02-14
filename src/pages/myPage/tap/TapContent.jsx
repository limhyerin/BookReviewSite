import styled from 'styled-components';
import TapProfile from './TapProfile';
import TapReview from './TapReview';

const TapContent = ({ activeTab }) => {
  return (
    <Container>
      {activeTab === '내 정보 수정' && <TapProfile />}
      {activeTab === '내 리뷰 보기' && <TapReview />}
    </Container>
  );
};

const Container = styled.div`
  flex: 6;
  margin-top: 2rem;
`;

export default TapContent;
