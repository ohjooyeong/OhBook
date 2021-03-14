import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BOOK_API_URL } from "../../config";
import LoadingPage from "../../components/LoadingPage";
import { withRouter } from "react-router-dom";
import Favorite from "./Sections/Favorite";
import { useAlert } from "react-alert";
import Tabs from "./Sections/Tabs";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Cover = styled.div`
    width: 50%;
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    height: 100%;
    border-radius: 5px;
    margin-right: 20px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 26px;
    font-weight: 700;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
    line-height: 1.6;
    letter-spacing: -0.3px;
`;

const Item = styled.span`
    opacity: 0.9;
    font-size: 16px;
    font-weight: 600;
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 14px;
    opacity: 0.9;
    line-height: 2;
    width: 100%;
`;

const ILink = styled.a`
    opacity: 0.9;
    font-size: 16px;
    font-weight: 600;
    color: #fabb46;
`;

function DetailPage(props) {
    const [Result, setResult] = useState(null);
    const [Loading, setLoading] = useState(true);
    const [activeId, setactiveId] = useState(0);

    const alert = useAlert();
    const {
        match: {
            params: { bookId },
        },
    } = props;
    const getResult = useCallback(async () => {
        try {
            const {
                data: {
                    response: { item: book },
                },
            } = await axios.post(`${BOOK_API_URL}/detail`, { id: bookId });

            setResult(...book);
        } catch {
            alert.error("책을 찾을 수 없습니다.");
        } finally {
            setLoading(false);
        }
    }, [bookId, alert]);
    useEffect(() => {
        getResult();
    }, [getResult]);

    const onClickHandler = (id) => {
        setactiveId(id);
    };

    return (
        <>
            {Loading ? (
                <LoadingPage />
            ) : (
                <>
                    <Container>
                        <Content>
                            <Cover bgImage={Result.coverLargeUrl} />
                            <Data>
                                <TitleContainer>
                                    <Title>{Result.title}</Title>
                                    <Favorite
                                        bookInfo={Result}
                                        bookId={bookId}
                                        userFrom={localStorage.getItem("userId")}
                                    />
                                </TitleContainer>
                                <ItemContainer>
                                    <Item>
                                        재인 : {Result.pubDate.substring(0, 4)} /{" "}
                                        {Result.pubDate.substring(4, 6)}
                                    </Item>
                                    <Divider> </Divider>
                                    <Item>지은이 : {Result.author}</Item>
                                    <Divider> </Divider>
                                    <Item>분류 : {Result.categoryName}</Item>
                                    <Divider> </Divider>
                                    <Item>출판사 : {Result.publisher}</Item>
                                    <Divider> </Divider>
                                    <ILink href={Result.link} target="_blank">
                                        도서 링크
                                    </ILink>
                                </ItemContainer>
                                <Overview>{Result.description}</Overview>
                                <Tabs
                                    activeId={activeId}
                                    onClickHandler={onClickHandler}
                                    postId={bookId}
                                />
                            </Data>
                        </Content>
                    </Container>
                </>
            )}
        </>
    );
}

export default withRouter(DetailPage);
