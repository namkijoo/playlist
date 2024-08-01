import styled from "styled-components";
import Search from "../components/Album/Search";

function Album() {
  return (
    <Container>
      <Search />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Album;
