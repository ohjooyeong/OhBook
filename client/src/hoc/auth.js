import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

function Auth(SpecificComponent, option, adminRoute = null) {
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입이 불가능한 페이지
    const alert = useAlert();

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then((response) => {
                // 로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push("/login");
                        alert.error("로그인을 해주세요");
                    }
                } else {
                    // 로그인 한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        // admin 유저가 아닐 때
                        props.history.push("/");
                    } else {
                        if (option === false) {
                            props.history.push("/");
                            alert.error("잘못된 접근입니다");
                        }
                    }
                }
            });
        });
        return <SpecificComponent />;
    }

    return AuthenticationCheck;
}

export default Auth;
