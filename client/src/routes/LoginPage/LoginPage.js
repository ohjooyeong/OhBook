import React, { useState } from "react";
import { AuthContent, AuthButton, RightAlignedLink } from "../../components/Auth";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import oc from "open-color";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";
import { useAlert } from "react-alert";

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

function LoginPage(props) {
    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm();
    const [Error, setError] = useState(null);
    const alert = useAlert();

    const onSubmit = async (data) => {
        try {
            const response = await dispatch(loginUser(data));
            if (response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                alert.info("로그인되었습니다.");
                props.history.push("/");
            } else {
                throw Error();
            }
        } catch {
            setError("가입된 아이디가 아니거나, 비밀번호가 틀렸습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AuthContent title="로그인">
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
                    <Label>비밀번호</Label>
                    <Input
                        name="password"
                        placeholder="비밀번호"
                        type="password"
                        ref={register({ required: true })}
                    />
                    {!Error && errors.password && errors.password.type === "required" && (
                        <CautionP>비밀번호를 입력해주세요.</CautionP>
                    )}
                    {Error && <CautionP>{Error}</CautionP>}
                </Wrapper>
                <AuthButton>로그인</AuthButton>
                <RightAlignedLink to="/auth/register">아직 회원이 아니신가요?</RightAlignedLink>
            </AuthContent>
        </form>
    );
}

export default withRouter(LoginPage);
