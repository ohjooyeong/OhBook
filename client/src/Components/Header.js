import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import logoImage from "../assets/logo.JPG";

const SHeader = styled.header`
    color: #fab231;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: white;
    z-index: 10;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.7);
    border-radius: 5px;
`;

const Wrraper = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: center center;
    align-items: center;
`;

const List = styled.ul`
    display: flex;
    font-weight: 700;
`;

const Item = styled.li`
    width: 80px;
    height: 50px;
    text-align: center;
`;

const Form = styled.form`
    width: 100%;
`;

const Input = styled.input`
    padding: 7px 10px;
    width: 100%;
    border-radius: 5px;
    font-size: 14px;
    color: $black;
    font-weight: 600;
    &::placeholder {
        font-weight: 300;
        color: rgba(0, 0, 0, 0.7);
    }
`;

const SLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoLink = styled(Link)``;

function Header({ location: { pathname } }) {
    return (
        <SHeader>
            <Wrraper>
                <List>
                    <Item current={pathname === "/"}>
                        <LogoLink>
                            <img src={logoImage} style={{ height: "50px" }} />
                        </LogoLink>
                    </Item>
                </List>
                <List style={{ justifySelf: "center" }}>
                    <Form>
                        <Input />
                    </Form>
                </List>
                <List style={{ justifySelf: "end" }}>
                    <Item current={pathname === "/login"}>
                        <SLink>로그인</SLink>
                    </Item>
                    <Item current={pathname === "/search"}>
                        <SLink>회원가입</SLink>
                    </Item>
                </List>
            </Wrraper>
        </SHeader>
    );
}

export default Header;
