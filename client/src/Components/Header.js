import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import logoImage from "../assets/logo.JPG";

const SHeader = styled.header`
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: white;
    z-index: 10;
    opacity: 0.9;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.7);
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
    font-size: 16px;
    margin-left: 10px;
    &:hover {
        color: white;
        background-color: #fab231;
        border-radius: 15px;
        transition-property: background-color, color;
        transition-duration: 0.1s;
        transition-timing-function: ease-out;
    }
`;

const DropDownBtn = styled.button`
    background-color: white;
    color: black;
    padding: 16px;
    font-size: 16px;
    font-weight: 700;
    border: none;
    cursor: pointer;
`;

const DropDownContent = styled.div`
    display: none;
    position: absolute;
    background-color: white;
    min-width: 98px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 10;
    &:last-child {
        border-radius: 0 0 15px 15px;
    }
`;

const DLink = styled(Link)`
    color: black;
    padding: 10px;
    display: block;
    &:hover {
        background-color: rgb(250, 188, 71, 0.7);
        color: white;
        &:last-child {
            border-radius: 0 0 15px 15px;
        }
    }
`;

const DropDown = styled.div`
    width: 98px;
    height: 50px;
    text-align: center;
    font-size: 16px;
    margin-left: 100px;
    &:hover {
        ${DropDownContent} {
            display: block;
        }
        ${DropDownBtn} {
            color: white;
            background-color: #fab231;
            border-radius: 15px 15px 0 0;
            transition-property: background-color, color;
            transition-duration: 0.3s;
            transition-timing-function: ease-out;
        }
    }
`;

const Form = styled.form`
    width: 100%;
`;

const Input = styled.input`
    padding: 7px 10px;
    width: 100%;
    border-radius: 5px;
    font-size: 14px;
    color: black;
    font-weight: 600;
    text-align: center;
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

const MyLogo = styled.img`
    height: 50px;
`;

MyLogo.defaultProps = {
    src: logoImage,
};

function Header() {
    return (
        <SHeader>
            <Wrraper>
                <List>
                    <Item>
                        <LogoLink to="/">
                            <MyLogo />
                        </LogoLink>
                    </Item>
                    <DropDown>
                        <DropDownBtn>카테고리</DropDownBtn>
                        <DropDownContent>
                            <DLink>경제/경영</DLink>
                            <DLink>컴퓨터</DLink>
                            <DLink>건강/뷰티</DLink>
                            <DLink>자기계발</DLink>
                        </DropDownContent>
                    </DropDown>
                </List>
                <List style={{ justifySelf: "center" }}>
                    <Form>
                        <Input placeholder="검색" />
                    </Form>
                </List>
                <List style={{ justifySelf: "end" }}>
                    <Item>
                        <SLink to="/login">로그인</SLink>
                    </Item>
                    <Item>
                        <SLink to="/register">회원가입</SLink>
                    </Item>
                </List>
            </Wrraper>
        </SHeader>
    );
}

export default withRouter(Header);
