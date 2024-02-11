import styled from 'styled-components';
import TapList from '../../components/tap/TapList';
import TapContent from '../../components/tap/TapContent';
import React, { useState } from 'react';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('내 정보 수정');

  // 선택된 탭을 업데이트하는 핸들러
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <TapList onSelectTab={handleTabSelect} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TapContent activeTab={activeTab} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 4rem;
`;

export default MyPage;
