import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

function Playlists({ imgSrc, title, onClick }) {
  return (
    <Container onClick={onClick}>
      <Wrapper>
        <img src={imgSrc}></img>
        <p>{title}</p>
      </Wrapper>
      <button type="button">
        <FaTrash />
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  height: 70px;
  background-color: black;
  padding: 10px;
  > button {
    background-color: black;
    color: white;
    border: none;
  }
`;

const Wrapper = styled.div`
  color: aliceblue;
  display: flex;
  height: 100%;
  width: 90%;
  > img {
    margin-right: 10px;
  }
  > p {
    margin-top: 5px;
    word-break: break-all;
    overflow: auto;
    font-size: 10px;
    font-weight: bold;
  }
`;

export default Playlists;
