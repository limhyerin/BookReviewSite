import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';

const TapList = ({ onSelectTab, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const onActiveList = (e) => {
    if (e.target === e.currentTarget) return;
    setActiveTab(e.target.textContent);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onSelectTab(tab);
  };

  const handleSingOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <>
      <TabsWrapper onClick={onActiveList}>
        <TapListWrapper>
          <Tap $activeTab={activeTab} onClick={() => handleTabClick('내 정보 수정')}>
            내 정보 수정
          </Tap>
          <Tap $activeTab={activeTab} onClick={() => handleTabClick('내 리뷰 보기')}>
            내 리뷰 보기
          </Tap>
        </TapListWrapper>
        <Tap onClick={handleSingOut}>Sign Out</Tap>
      </TabsWrapper>
    </>
  );
};

const TabsWrapper = styled.ul`
  height: 500px;
  width: 20rem;
  margin: 2rem 2rem;
  padding: 4rem 1rem;
  background-color: #fff;
  color: #222222;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 15rem;
`;

const TapListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Tap = styled.li`
  display: flex;
  cursor: pointer;
  font-size: 1rem;

  ${(props) => {
    if (props.$activeTab === props.children) {
      return css`
        color: #feeb60;
        font-weight: bolder;
      `;
    }
    return css`
      color: #222222;
    `;
  }}
`;

export default TapList;
