import styled from "styled-components";

function Menu({ currentTab, onTabChange }) {
  return (
    <Container>
      <Tab2
        active={currentTab === "플레이리스트"}
        onClick={() => onTabChange("플레이리스트")}
      >
        플레이리스트
      </Tab2>
      <Tab1 active={currentTab === "추가"} onClick={() => onTabChange("추가")}>
        추가
      </Tab1>
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
  margin-bottom: 20px;
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
  background-color: ${(props) => (props.active ? "white" : "#e4e1e1")};
`;

const Tab2 = styled.div`
  background-color: ${(props) => (props.active ? "white" : "#e4e1e1")};
`;

export default Menu;
