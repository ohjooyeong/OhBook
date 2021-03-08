import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BOOK_API_URL } from "../../config";
import BookLanding from "../../components/BookLanding";
import LoadingPage from "../../components/LoadingPage";
import { Helmet } from "react-helmet";

const Container = styled.div`
    padding: 20px;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const Section = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 50px;
    padding-top: 30px;
    width: 80%;
`;

const Title = styled.div`
    display: flex;
    margin-top: 50px;
    font-size: 1.5rem;
    font-weight: 800;
    font-size: 30px;
    color: black;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 1rem;
`;

const SearchPage = (props) => {
    const {
        match: {
            params: { term },
        },
    } = props;
    const [SearchBookResult, setSearchBookResult] = useState([]);
    const [SearchTerm, setSearchTerm] = useState(term);
    const [Error, setError] = useState(null);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const searchBook = async () => {
            try {
                const {
                    data: {
                        response: { item: books },
                    },
                } = await axios.post(`${BOOK_API_URL}/search`, {
                    params: {
                        SearchTerm: SearchTerm,
                    },
                });
                setSearchTerm(SearchTerm);
                setSearchBookResult(books);
            } catch (error) {
                setError("책을 찾을 수 없습니다.");
            } finally {
                setLoading(false);
            }
        };
        searchBook();
    }, [SearchTerm]);

    return (
        <>
            {Loading ? (
                <LoadingPage />
            ) : (
                <>
                    <Title>"{SearchTerm}"에 대한 도서 목록</Title>
                    <Container>
                        <Helmet>
                            <title>{SearchTerm} | 검색</title>
                        </Helmet>
                        {SearchBookResult && SearchBookResult.length > 0 && (
                            <Section>
                                {SearchBookResult.map((book) => (
                                    <BookLanding
                                        key={book.itemId}
                                        title={book.title}
                                        isbn={book.isbn}
                                        author={book.author}
                                        description={book.description}
                                        coverImage={book.coverLargeUrl}
                                    />
                                ))}
                            </Section>
                        )}
                    </Container>
                </>
            )}
        </>
    );
};

export default SearchPage;
