import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import BookLanding from "../../components/BookLanding";
import LoadingPage from "../../components/LoadingPage";
import { BOOK_API_URL } from "../../config";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";

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

const Title = styled.div`
    display: flex;
    width: 1200px;
    margin-top: 50px;
    font-size: 1.5rem;
    font-weight: 800;
    font-size: 30px;
    color: black;
    padding: 5px;
    border-radius: 5px;
`;

const CategoryPage = (props) => {
    const [CategoryBook, setCategoryBook] = useState([]);
    const [Loading, setLoading] = useState(true);
    const alert = useAlert();

    const categoryBook = useCallback(async () => {
        try {
            const {
                data: {
                    response: { item: books },
                },
            } = await axios.post(`${BOOK_API_URL}/category`, {
                categoryId: props.match.params.categoryId,
            });
            setCategoryBook(books);
        } catch (error) {
            alert.error("책을 찾을 수 없습니다.");
        } finally {
            setLoading(false);
        }
    }, [alert, props.match.params.categoryId]);

    useEffect(() => {
        categoryBook();
    }, [categoryBook]);

    return (
        <>
            {Loading ? (
                <LoadingPage />
            ) : (
                <>
                    <Title>
                        카테고리 :{" "}
                        {CategoryBook &&
                            CategoryBook[0].categoryName.slice(
                                5,
                                CategoryBook[0].categoryName.length
                            )}
                    </Title>
                    <Container>
                        <Helmet>
                            <title>
                                {CategoryBook &&
                                    CategoryBook[0].categoryName.slice(
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
                </>
            )}
        </>
    );
};

export default withRouter(CategoryPage);
