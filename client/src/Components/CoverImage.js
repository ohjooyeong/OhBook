import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    font-size: 12px;
    cursor: pointer;
`;

const BLink = styled(Link)``;

const Image = styled.div`
    background-image: url(${(props) => props.coverUrl});
    width: 100%;
    height: 350px;
    background-size: cover;
    background-position: center center;
`;

const ImageContainer = styled.div`
    margin-bottom: 0.5rem;
    background-color: black;
    transition: all 0.8s linear;
    &:hover {
        transform: rotateY(35deg);
    }
`;

const Title = styled.span`
    display: block;
    width: 100%;
    font-weight: 600;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 1rem;
    padding: 12px;
`;

const CoverImage = ({ imageUrl, title, isbn }) => (
    <Container>
        <BLink to={`/book/${isbn}`}>
            <ImageContainer>
                <Image coverUrl={imageUrl} />
            </ImageContainer>
            <Title>{title}</Title>
        </BLink>
    </Container>
);

export default CoverImage;
