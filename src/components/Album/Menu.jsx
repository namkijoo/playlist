import styled from "styled-components";

function Menu() {
  return (
    <Container>
      <Tab1>검색</Tab1>
      <Tab2>플레이리스트</Tab2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 50px;
  background-color: #e4e1e1;
  padding: 10px;
  margin-top: 20px;
  > div {
    width: 48%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

const Tab1 = styled.div`
  background-color: white;
`;

const Tab2 = styled.div``;

export default Menu;
