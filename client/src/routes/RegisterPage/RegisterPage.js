import React, { useRef } from "react";
import { AuthContent, AuthButton, RightAlignedLink } from "../../components/Auth";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import oc from "open-color";

const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

const Label = styled.div`
    font-size: 1rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.4rem;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    ::placeholder {
        color: ${oc.gray[3]};
    }
`;

const CautionP = styled.p`
    color: #bf1650;
    font-size: 0.8rem;
    margin-top: 7px;
    ::before {
        display: inline;
        content: "⚠ ";
    }
`;

const RegisterPage = () => {
    const { register, watch, errors, handleSubmit } = useForm();
    const password = useRef();
    password.current = watch("password");
    const onSubmit = (data) => {
        // console.log("data", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AuthContent title="회원가입">
                <Wrapper>
                    <Label>이메일</Label>
                    <Input
                        name="email"
                        placeholder="이메일"
                        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    />
                    {errors.email && errors.email.type === "required" && (
                        <CautionP>이메일을 입력해주세요.</CautionP>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                        <CautionP>잘못된 이메일 형식입니다.</CautionP>
                    )}
                </Wrapper>
                <Wrapper>
                    <Label>이름</Label>
                    <Input
                        name="name"
                        placeholder="이름"
                        ref={register({ required: true, maxLength: 10 })}
                    />
                    {errors.name && errors.name.type === "required" && (
                        <CautionP>이름을 입력해주세요.</CautionP>
                    )}
                    {errors.name && errors.name.type === "maxLength" && (
                        <CautionP>이름이 너무 깁니다.</CautionP>
                    )}
                </Wrapper>
                <Wrapper>
                    <Label>비밀번호</Label>
                    <Input
                        name="password"
                        placeholder="비밀번호"
                        type="password"
                        ref={register({ required: true, minLength: 6 })}
                    />
                    {errors.password && errors.password.type === "required" && (
                        <CautionP>비밀번호를 입력해주세요.</CautionP>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <CautionP>비밀번호가 너무 짧습니다</CautionP>
                    )}
                </Wrapper>
                <Wrapper>
                    <Label>비밀번호 확인</Label>
                    <Input
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        type="password"
                        ref={register({
                            required: true,
                            validate: (value) => value === password.current,
                        })}
                    />
                    {errors.passwordConfirm && errors.passwordConfirm.type === "required" && (
                        <CautionP>비밀번호는 필수 요소입니다.</CautionP>
                    )}
                    {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && (
                        <CautionP>비밀번호가 맞지 않습니다.</CautionP>
                    )}
                </Wrapper>
                <AuthButton>회원가입</AuthButton>
                <RightAlignedLink to="/auth/login">
                    이미 가입하셨다면, 로그인을 해주세요!
                </RightAlignedLink>
            </AuthContent>
        </form>
    );
};

export default RegisterPage;
