import styled from "styled-components";
import Menu from "../components/Album/Menu";
import Search from "../components/Album/Search";

function Album() {
  return (
    <Container>
      <Menu />
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
