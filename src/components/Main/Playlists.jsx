import styled from "styled-components";

function Playlists({ imgSrc, title, onClick }) {
  return (
    <Container onClick={onClick}>
      <Wrapper>
        <Thumbnail src={imgSrc} alt={title} />
        <Circle2 />
        <Circle1 />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  margin: 5px;
`;

const Wrapper = styled.div`
  border-radius: 100%;
  width: 70px;
  height: 70px;
  position: relative;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  margin-right: 10px;
  border-radius: 100%;
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
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
  z-index: 1;
`;

const Circle2 = styled.div`
  width: 2px;
  height: 2px;
  background-color: black;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;
export default Playlists;
