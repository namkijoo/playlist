import styled from "styled-components";
import Playlist from "../components/Main/Playlist";

function Main() {
  return (
    <Container>
      <Playlist />
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

export default Main;
