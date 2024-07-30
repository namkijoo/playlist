import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../components/Footer/Navigation";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding-bottom: 60px; /* Footer의 높이만큼 여유 공간 */
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Content>
        <Outlet />
      </Content>
      <Navigation />
    </LayoutContainer>
  );
};

export default Layout;
