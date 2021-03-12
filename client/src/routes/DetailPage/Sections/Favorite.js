import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";
import { FAVORITE_API_URL } from "../../../config";
import { useSelector } from "react-redux";

const FavoriteButton = styled.div`
    width: 4rem;
    height: 1.8rem;
    font-size: 18px;
    color: ${(props) => (props.Favorited ? "rgb(252, 168, 22)" : "black")};
    font-weight: 600;
    background-color: white;
    border: ${(props) => (props.Favorited ? "1px solid rgb(252, 168, 22)" : "1px solid black")};
    box-shadow: 0px 1px 3px 2px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

function Favorite(props) {
    const bookId = props.bookId;
    const userFrom = props.userFrom;
    const bookTitle = props.bookInfo.title;
    const bookPost = props.bookInfo.coverLargeUrl;
    const bookAuthor = props.bookInfo.author;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    const user = useSelector((state) => state.user);

    let bookInfo = {
        userFrom,
        bookId,
        bookTitle,
        bookPost,
        bookAuthor,
    };

    useEffect(() => {
        axios.post(`${FAVORITE_API_URL}/favoriteNumber`, bookInfo).then((response) => {
            if (response.data.success) {
                setFavoriteNumber(response.data.favoriteNumber);
            } else {
                alert("숫자 정보를 가져오는 데 실패했습니다");
            }
        });
        axios.post(`${FAVORITE_API_URL}/favorited`, bookInfo).then((response) => {
            if (response.data.success) {
                setFavorited(response.data.favorited);
            } else {
                alert("정보를 가져오는 데 실패했습니다");
            }
        });
    }, []);

    const onClickFavorite = () => {
        if (user.userData.isAuth) {
            if (Favorited) {
                axios.post(`${FAVORITE_API_URL}/removeFromFavorite`, bookInfo).then((response) => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    } else {
                        alert("즐겨찾기 리스트에서 지우는 걸 실패했습니다");
                    }
                });
            } else {
                axios.post(`${FAVORITE_API_URL}/addToFavorite`, bookInfo).then((response) => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert("즐겨찾기 리스트에 추가하는 걸 실패했습니다");
                    }
                });
            }
        }
    };

    return (
        <FavoriteButton Favorited={Favorited} onClick={onClickFavorite}>
            {Favorited ? (
                <FaStar style={{ marginRight: "0.4rem" }} />
            ) : (
                <FaRegStar style={{ marginRight: "0.4rem" }} />
            )}{" "}
            {FavoriteNumber}
        </FavoriteButton>
    );
}

export default Favorite;
