import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { GoHome } from "react-icons/go";
import { IoAlbumsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { useGoogleLogin } from "@react-oauth/google";

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: white;
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

  const login = useGoogleLogin({
    flow: "implicit", // 'auth-code' 대신 'implicit' 플로우 사용
    onSuccess: (tokenResponse) => {
      localStorage.setItem("token", tokenResponse.access_token);
      console.log(tokenResponse.access_token);
    },
    onError: (errorResponse) => console.log(errorResponse),
    scope: "https://www.googleapis.com/auth/youtube.force-ssl",
  });
  return (
    <FooterContainer>
      <FooterButton
        onClick={() => navigate("/")}
        isActive={location.pathname === "/"}
      >
        <GoHome />
      </FooterButton>
      <FooterButton
        onClick={() => navigate("/album")}
        isActive={location.pathname === "/album"}
      >
        <IoAlbumsOutline />
      </FooterButton>
      <FooterButton onClick={login}>
        <CiUser />
      </FooterButton>
    </FooterContainer>
  );
};

export default Navigation;
