import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
    margin-top: 1.2rem;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;
    width: 435px;

    background: #fcbb49;
    color: white;
    font-weight: 900;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    border-radius: 5px;

    cursor: pointer;
    user-select: none;
    border: none;
    transition: 0.2s all;

    &:hover {
        background: rgb(252, 171, 32);
        box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.7);
    }

    &:active {
        background: rgb(247, 163, 19);
    }
`;

const AuthButton = ({ children }) => <Wrapper>{children}</Wrapper>;

export default AuthButton;
