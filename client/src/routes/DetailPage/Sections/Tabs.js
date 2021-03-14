import styled from "styled-components";
import Comments from "./Comments";

const Container = styled.div`
    margin-top: 20px;
    height: 69%;
`;

const TabList = styled.ul`
    display: flex;
    align-items: center;
`;

const Tab = styled.li`
    height: 50px;
    width: 100px;
    font-size: 16px;
    font-weight: 600;
    background-color: rgb(20, 20, 20);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    margin-right: 10px;
    border: 1px solid gray;
    border-bottom: none;
    cursor: pointer;
    background-color: ${(props) => (props.current ? "#FFFFFF" : "#141414")};
    color: ${(props) => (props.current ? "#141414" : "#FFFFFF")};
`;

const Item = styled.div`
    height: 80%;
    overflow: auto;
    background-color: white;
    padding: 10px 0px;
    border-radius: 5px;
    border: 1px solid gray;
`;

const Tabs = ({ activeId, onClickHandler, postId }) => {
    const tabObj = {
        0: {
            title: `댓글`,
            comp: <Comments postId={postId} />,
        },
    };

    return (
        <Container>
            <TabList>
                <Tab onClick={() => onClickHandler(0)} current={activeId === 0}>
                    {tabObj[0].title}
                </Tab>
            </TabList>
            <Item>{tabObj[activeId].comp}</Item>
        </Container>
    );
};

export default Tabs;
