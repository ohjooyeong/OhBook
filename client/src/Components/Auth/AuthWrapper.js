import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
    width: 500px;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.5);
`;

// 로고
const LogoWrapper = styled.div`
    background: #fcbb49;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logo = styled(Link)`
    color: white;
    font-family: cursive;
    font-size: 2.4rem;
    font-weight: 600;
    letter-spacing: 5px;
    text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    font-weight: 700;
    padding: 2rem;
    height: auto;
`;

const AuthWrapper = ({ children }) => (
    <Positioner>
        <ShadowedBox>
            <LogoWrapper>
                <Logo to="/">Oh Book</Logo>
            </LogoWrapper>
            <Contents>{children}</Contents>
        </ShadowedBox>
    </Positioner>
);

export default AuthWrapper;
