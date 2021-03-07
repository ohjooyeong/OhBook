import React, { useState } from "react";
import styled from "styled-components";

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

const useSearch = (push) => {
    const [searchTerm, setSearchTerm] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            push(`/search/${searchTerm}`);
            window.location.reload();
        }
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setSearchTerm(value);
    };

    return { onChange, handleSubmit };
};

function SearchForm(props) {
    const {
        history: { push },
    } = props;
    const { onChange, handleSubmit } = useSearch(push);
    return (
        <Form onSubmit={handleSubmit}>
            <Input placeholder="검색" onChange={onChange}></Input>
        </Form>
    );
}

export default SearchForm;
