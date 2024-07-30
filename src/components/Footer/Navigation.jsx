import React from "react";
import { useNavigate } from "react-router-dom";
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
  color: black;
  font-size: 28px;
  cursor: pointer;
  &:hover {
    color: #3b5998;
  }
`;

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <FooterButton onClick={() => navigate("/")}>
        <GoHome />
      </FooterButton>
      <FooterButton onClick={() => navigate("/list")}>
        <IoAlbumsOutline />
      </FooterButton>
      <FooterButton onClick={() => navigate("/login")}>
        <CiUser />
      </FooterButton>
    </FooterContainer>
  );
};

export default Navigation;
