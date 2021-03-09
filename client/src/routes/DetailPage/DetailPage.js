import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BOOK_API_URL } from "../../config";
import LoadingPage from "../../components/LoadingPage";

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

const ItemContainer = styled.div`
    margin: 20px 0;
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

function DetailPage(props) {
    const [Result, setResult] = useState(null);
    const [Error, setError] = useState(null);
    const [Loading, setLoading] = useState(true);

    const content = {
        id: props.match.params.bookId,
    };

    useEffect(() => {
        const getResult = async () => {
            try {
                const {
                    data: {
                        response: { item: book },
                    },
                } = await axios.post(`${BOOK_API_URL}/detail`, content);
                setResult(...book);
            } catch {
                setError("책을 찾을 수 없습니다.");
            } finally {
                setLoading(false);
            }
        };
        getResult();
    }, [Result]);

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
                                <Title>{Result.title}</Title>
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
                                </ItemContainer>
                                <Overview>{Result.description}</Overview>
                            </Data>
                        </Content>
                    </Container>
                </>
            )}
        </>
    );
}

export default DetailPage;
