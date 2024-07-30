import { useState } from "react";
import styled from "styled-components";

function Playlists({ imgSrc, title, onClick, isActive }) {
  const [timer, setTimer] = useState(null);

  const handleTouchStart = () => {
    // 3초 후에 알림을 표시하도록 타이머 설정
    const newTimer = setTimeout(() => {
      window.confirm("이미지를 삭제하시겠습니까?");
    }, 2000);
    setTimer(newTimer);
  };

  const handleTouchEnd = () => {
    // 터치가 끝나면 타이머를 취소
    clearTimeout(timer);
    setTimer(null);
  };
  return (
    <Container
      onClick={onClick}
      isActive={isActive}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Thumbnail src={imgSrc} alt={title} />
      <Circle2 />
      <Circle1 />
    </Container>
  );
}

const Container = styled.div`
  margin: auto 5px;
  flex: 0 0 auto;
  border-radius: 100%;
  border: 3px solid #3b5998;
  width: ${({ isActive }) => (isActive ? "90px" : "70px")};
  height: ${({ isActive }) => (isActive ? "90px" : "70px")};
  position: relative;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const Circle1 = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const Circle2 = styled.div`
  width: 25px;
  height: 25px;
  background-color: lightgray;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
export default Playlists;
