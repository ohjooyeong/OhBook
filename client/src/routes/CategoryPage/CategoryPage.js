import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BOOK_API_URL } from "../../config";
import BookLanding from "../../components/BookLanding";
import { Helmet } from "react-helmet";
import LoadingPage from "../../components/LoadingPage";

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
    padding-top: 70px;
    width: 80%;
`;

const CategoryPage = (props) => {
    const [CategoryBook, setCategoryBook] = useState([]);
    const [Error, setError] = useState(null);
    const [Loading, setLoading] = useState(true);

    const category = {
        categoryId: props.match.params.categoryId,
    };
    useEffect(() => {
        const categoryBook = async () => {
            try {
                const {
                    data: {
                        response: { item: books },
                    },
                } = await axios.post(`${BOOK_API_URL}/category`, category);
                setCategoryBook(books);
            } catch (error) {
                setError("책을 찾을 수 없습니다.");
            } finally {
                setLoading(false);
            }
        };
        categoryBook();
    }, [category.categoryId]);

    return (
        <>
            {Loading ? (
                <LoadingPage />
            ) : (
                <Container>
                    <Helmet>
                        <title>
                            {CategoryBook[0].categoryName.slice(
                                5,
                                CategoryBook[0].categoryName.length
                            )}{" "}
                            | 카테고리
                        </title>
                    </Helmet>
                    {CategoryBook && CategoryBook.length > 0 && (
                        <Section>
                            {CategoryBook.map((book) => (
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
            )}
        </>
    );
};

export default CategoryPage;