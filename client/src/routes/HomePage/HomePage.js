import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import LoadingPage from "../../components/LoadingPage";
import { BOOK_API_URL } from "../../config";

const Container = styled.div`
    padding: 20px;
`;

const Section = styled.div`
    :not(:last-child) {
        margin-bottom: 50px;
    }
`;

const Title = styled.span`
    font-size: 16px;
    font-weight: 600;
`;

function HomePage() {
    const [BestSellers, setBestSellers] = useState([]);
    const [Recommends, setRecommends] = useState([]);
    const [NewBooks, setNewBooks] = useState([]);
    const [Error, setError] = useState(null);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const allBook = async () => {
            try {
                const {
                    data: {
                        response: { item: bestSeller },
                    },
                } = await axios.get(`${BOOK_API_URL}/bestseller`);

                const {
                    data: {
                        response: { item: recommend },
                    },
                } = await axios.get(`${BOOK_API_URL}/recommend`);

                const {
                    data: {
                        response: { item: newBook },
                    },
                } = await axios.get(`${BOOK_API_URL}/newbook`);
                setBestSellers(bestSeller);
                setRecommends(recommend);
                setNewBooks(newBook);
            } catch (error) {
                setError("책을 찾을 수 없습니다.");
            } finally {
                setLoading(false);
            }
        };
        allBook();
    }, []);
    return (
        <>
            <Helmet>
                <title>Oh! Books</title>
            </Helmet>
            {Loading ? (
                <LoadingPage />
            ) : (
                <Container>
                    {BestSellers && BestSellers.length > 0 && (
                        <Section>
                            <Title>베스트 셀러</Title>
                            {BestSellers.map((book) => (
                                <React.Fragment key={book.itemId}>
                                    <div style={{ marginRight: "10px" }}>{book.title}</div>
                                </React.Fragment>
                            ))}
                        </Section>
                    )}
                    {NewBooks && NewBooks.length > 0 && (
                        <Section>
                            <Title>신간 도서</Title>
                            {NewBooks.map((book) => (
                                <React.Fragment key={book.itemId}>
                                    <div style={{ marginRight: "10px" }}>{book.title}</div>
                                </React.Fragment>
                            ))}
                        </Section>
                    )}
                    {Recommends && Recommends.length > 0 && (
                        <Section>
                            <Title>추천 도서</Title>
                            {Recommends.map((book) => (
                                <React.Fragment key={book.itemId}>
                                    <div style={{ marginRight: "10px" }}>{book.title}</div>
                                </React.Fragment>
                            ))}
                        </Section>
                    )}
                </Container>
            )}
        </>
    );
}

export default HomePage;
