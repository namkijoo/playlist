import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { GoHome } from "react-icons/go";
import { IoAlbumsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

const FooterButton = styled.button`
  background: none;
  border: none;
  color: ${({ isActive }) => (isActive ? "#08379c" : "black")};
  font-size: 28px;
  cursor: pointer;
  &:hover {
    color: #3b5998;
  }
`;

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <FooterContainer>
      <FooterButton
        onClick={() => navigate("/")}
        isActive={location.pathname === "/"}
      >
        <GoHome />
      </FooterButton>
      <FooterButton
        onClick={() => navigate("/list")}
        isActive={location.pathname === "/list"}
      >
        <IoAlbumsOutline />
      </FooterButton>
      <FooterButton
        onClick={() => navigate("/login")}
        isActive={location.pathname === "/login"}
      >
        <CiUser />
      </FooterButton>
    </FooterContainer>
  );
};

export default Navigation;
