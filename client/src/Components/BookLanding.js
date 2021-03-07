import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 45%;
    background-color: white;
    margin-bottom: 70px;
    font-weight: 300;
    padding: 20px;
    border-radius: 5px;
    color: black;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

const BImage = styled.img`
    position: relative;
    top: -50px;
    max-width: 150px;
    width: 100%;
    margin-right: 30px;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3),
        0 -12px 36px -8px rgba(0, 0, 0, 0.025);
    transition: all 0.2s linear;
`;

const BLink = styled(Link)`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    text-decoration: none;
    color: inherit;
    &:hover {
        ${BImage} {
            transform: translateY(25px);
        }
    }
`;

const Title = styled.div`
    margin: 0;
    font-weight: 700;
    margin-bottom: 5px;
    font-size: 18px;
    color: black;
`;

const Author = styled.div`
    margin: 0;
    font-weight: 500;
    margin-top: 10px;
    font-size: 16px;
`;

const Description = styled.p`
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    line-height: 130%;
    font-weight: 400;
    letter-spacing: 0.5px;
`;

const BookLanding = ({ isbn, title, author, description, coverImage }) => {
    return (
        <Container>
            <BLink>
                <BImage src={coverImage} />
                <div>
                    <Title>{title}</Title>
                    <Author>{author}</Author>
                    <Description>{description.slice(0, 90)}...</Description>
                </div>
            </BLink>
        </Container>
    );
};

export default BookLanding;
