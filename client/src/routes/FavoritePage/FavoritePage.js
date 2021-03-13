import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FAVORITE_API_URL } from "../../config";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAlert } from "react-alert";

const Container = styled.div`
    width: 80%;
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Line = styled.div`
    width: 100%;
    border-bottom: 1px solid #ced4da;
`;

const Title = styled.div`
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
`;

const List = styled.div`
    display: grid;
    grid-template-columns: 60% 30% 10%;
    font-size: 18px;
    font-weight: 800;
    background-color: #fabb46;
`;

const ListItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    &:nth-child(2) {
        border-right: 1px solid #ced4da;
        border-left: 1px solid #ced4da;
    }
`;

const ModalTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
`;

const SubList = styled.div`
    display: grid;
    grid-template-columns: 60% 30% 10%;
    font-size: 14px;
    font-weight: 500;
`;

const SubListItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    &:nth-child(2) {
        border-right: 1px solid #ced4da;
        border-left: 1px solid #ced4da;
    }
`;

const KeyDiv = styled.div``;

const RemoveBtn = styled.button`
    background-color: rgb(250, 187, 70, 0.7);
`;

const Image = styled.img`
    width: 100%;
`;

function FavoritePage() {
    const [FavoriteList, setFavoriteList] = useState([]);
    const alert = useAlert();

    useEffect(() => {
        axios
            .post(`${FAVORITE_API_URL}/getFavoredBook`, {
                userFrom: localStorage.getItem("userId"),
            })
            .then((response) => {
                if (response.data.success) {
                    setFavoriteList(response.data.favoriteList);
                } else {
                    alert.error("정보를 가져오는 데 실패했습니다.");
                }
            });
    }, [FavoriteList, alert]);

    const onClickDelete = (bookId, userFrom) => {
        const value = {
            bookId,
            userFrom,
        };
        axios.post(`${FAVORITE_API_URL}/removeFromFavorite`, value).then((response) => {
            if (response.data.success) {
                alert.info("삭제되었습니다");
            } else {
                alert.error("리스트에서 지우는 데 실패했습니다.");
            }
        });
    };

    const renderCards = FavoriteList.map((favorite, index) => {
        const content = (
            <div>
                <ModalTitle>{favorite.bookTitle}</ModalTitle>
                <Line style={{ margin: "10px 0px" }} />
                {favorite.bookPost ? <Image src={favorite.bookPost} /> : "No Image"}
            </div>
        );
        return (
            <KeyDiv key={favorite.bookId}>
                <SubList>
                    <Popup
                        trigger={
                            <SubListItem style={{ cursor: "pointer" }}>
                                {favorite.bookTitle}
                            </SubListItem>
                        }
                        position="left center"
                    >
                        {content}
                    </Popup>
                    <SubListItem>{favorite.bookAuthor}</SubListItem>
                    <SubListItem>
                        <RemoveBtn
                            onClick={() => onClickDelete(favorite.bookId, favorite.userFrom)}
                        >
                            X
                        </RemoveBtn>
                    </SubListItem>
                </SubList>
                <Line />
            </KeyDiv>
        );
    });

    return (
        <Container>
            <Title>즐겨찾기 목록</Title>
            <Line />
            <List>
                <ListItem>제목</ListItem>

                <ListItem>저자</ListItem>

                <ListItem>즐삭</ListItem>
            </List>
            <Line />
            {renderCards}
        </Container>
    );
}

export default FavoritePage;
