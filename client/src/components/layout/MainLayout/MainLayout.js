import React from 'react';
import NavBar from '../../features/NavBar/NavBar';
import PageContainer from '../PageContainer/PageContainer';

const MainLayout = ({ children }) => (
  <PageContainer>
    <NavBar />
    {children}
  </PageContainer>
)

export default MainLayout;
