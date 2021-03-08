import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import logoImage from "../assets/logo.JPG";
import SearchForm from "./SearchForm";

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
        &:active {
            background: rgb(247, 160, 9);
        }
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
            box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.2);
            transition-property: background-color, color;
            transition-duration: 0.1s;
            transition-timing-function: ease-out;
        }
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

function Header({ history }) {
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
                            <DLink to="/book/category/117">경제/경영</DLink>
                            <DLink to="/book/category/122">컴퓨터</DLink>
                            <DLink to="/book/category/126">건강/뷰티</DLink>
                            <DLink to="/book/category/118">자기계발</DLink>
                        </DropDownContent>
                    </DropDown>
                </List>
                <List style={{ justifySelf: "center" }}>
                    <SearchForm history={history} />
                </List>
                <List style={{ justifySelf: "end" }}>
                    <Item>
                        <SLink to="/auth/login">로그인</SLink>
                    </Item>
                    <Item>
                        <SLink to="/auth/register">회원가입</SLink>
                    </Item>
                </List>
            </Wrraper>
        </SHeader>
    );
}

export default withRouter(Header);
