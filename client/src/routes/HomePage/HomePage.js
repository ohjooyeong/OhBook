import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import LoadingPage from "../../components/LoadingPage";
import { BOOK_API_URL } from "../../config";
import SwiperSection from "../../components/SwiperSection";
import { SwiperSlide } from "swiper/react";
import CoverImage from "../../components/CoverImage";
import { useAlert } from "react-alert";

const Container = styled.div`
    padding: 20px;
`;

function HomePage() {
    const [BestSellers, setBestSellers] = useState([]);
    const [Recommends, setRecommends] = useState([]);
    const [NewBooks, setNewBooks] = useState([]);

    const [Loading, setLoading] = useState(true);
    const alert = useAlert();

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
                alert.error("책을 찾을 수 없습니다.");
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
                        <SwiperSection title="베스트 셀러">
                            {BestSellers.map((book) => (
                                <SwiperSlide key={book.itemId}>
                                    <CoverImage
                                        imageUrl={book.coverLargeUrl}
                                        title={book.title}
                                        author={book.author}
                                        isbn={book.isbn}
                                    />
                                </SwiperSlide>
                            ))}
                        </SwiperSection>
                    )}

                    {NewBooks && NewBooks.length > 0 && (
                        <SwiperSection title="신작 도서">
                            {NewBooks.map((book) => (
                                <SwiperSlide key={book.itemId}>
                                    <CoverImage
                                        imageUrl={book.coverLargeUrl}
                                        title={book.title}
                                        author={book.author}
                                        isbn={book.isbn}
                                    />
                                </SwiperSlide>
                            ))}
                        </SwiperSection>
                    )}
                    {Recommends && Recommends.length > 0 && (
                        <SwiperSection title="추천 도서">
                            {Recommends.map((book) => (
                                <SwiperSlide key={book.itemId}>
                                    <CoverImage
                                        imageUrl={book.coverLargeUrl}
                                        title={book.title}
                                        author={book.author}
                                        isbn={book.isbn}
                                    />
                                </SwiperSlide>
                            ))}
                        </SwiperSection>
                    )}
                </Container>
            )}
        </>
    );
}

export default HomePage;
