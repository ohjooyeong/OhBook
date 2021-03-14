import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { COMMENT_API_URL } from "../../../config";
import styled from "styled-components";

const Container = styled.div``;

const KeyDiv = styled.div``;

const Form = styled.form`
    width: 80%;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
`;

const Textarea = styled.textarea`
    resize: none;
`;

const Button = styled.button`
    margin-top: 10px;
    background-color: rgb(245, 189, 77);
    font-weight: 600;
    cursor: pointer;
`;

const SingleComment = styled.div`
    padding: 12px;
    border-bottom: 1px solid rgb(198, 193, 190, 0.8);
`;

const FirstContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const CommentTop = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CommentName = styled.div`
    letter-spacing: -0.3px;
    line-height: 1.38;
    font-size: 13px;
    color: #868e96;
    font-weight: 700;
    margin-bottom: 12px;
`;

const CommentText = styled.div`
    margin-bottom: 12px;
    line-height: 1.6;
    letter-spacing: -0.3px;
    color: #495057;
    font-size: 15px;
    white-space: pre-line;
`;

const CommentDate = styled.div`
    font-size: 12px;
    color: rgb(173, 181, 189);
`;

const DeleteButton = styled.button`
    height: 1.5rem;
    width: 1.5rem;
`;

function Comments(props) {
    const user = useSelector((state) => state.user);
    const [Comment, setComment] = useState("");
    const [CommentLists, setCommentLists] = useState([]);

    const alert = useAlert();

    const refreshComments = useCallback(() => {
        axios
            .post(`${COMMENT_API_URL}/getComments`, { id: props.postId })
            .then((response) => {
                if (response.data.success) {
                    setCommentLists(response.data.comments);
                } else {
                    alert.error("댓글을 불러오는 데 실패했습니다");
                }
            })
            .catch((err) => alert.error("댓글을 불러오는 데 실패했습니다"));
    }, [alert, props.postId]);

    useEffect(() => {
        refreshComments();
    }, [refreshComments]);

    const handleChage = (e) => {
        setComment(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (Comment === "") {
            return;
        }

        if (user.userData && !user.userData.isAuth) {
            setComment("");
            return alert.info("로그인 시 이용가능합니다.");
        }

        const value = {
            content: Comment,
            postId: props.postId,
            writer: user.userData._id,
        };

        axios
            .post(`${COMMENT_API_URL}/saveComment`, value, { withCredentials: true })
            .then((response) => {
                if (response.data.success) {
                    setComment("");
                    updateComment(response.data.result);
                } else {
                    alert.error("댓글 저장에 실패했습니다");
                }
            });
    };
    const onRemove = (id) => {
        axios.post(`${COMMENT_API_URL}/removeComments`, { id: id }).then((response) => {
            if (response.data.success) {
                refreshComments();
                alert.info("삭제 완료되었습니다");
            } else {
                alert.error("댓글 삭제를 실패했습니다");
            }
        });
    };

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment));
    };

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Textarea onChange={handleChage} value={Comment} />
                <Button onClick={onSubmit}>댓글 등록</Button>
            </Form>
            {CommentLists &&
                CommentLists.map((comment, index) => (
                    <KeyDiv key={comment._id}>
                        <SingleComment>
                            <CommentTop>
                                <CommentName>{comment.writer.name}</CommentName>
                                {user.userData._id === comment.writer._id ? (
                                    <DeleteButton onClick={() => onRemove(comment._id)}>
                                        X
                                    </DeleteButton>
                                ) : (
                                    <div></div>
                                )}
                            </CommentTop>
                            <CommentText>{comment.content}</CommentText>
                            <CommentDate>{comment.createdAt.substring(0, 10)}</CommentDate>
                        </SingleComment>
                    </KeyDiv>
                ))}
            {CommentLists && CommentLists.length === 0 && (
                <FirstContent>처음으로 책에 대한 정보나, 감상평을 남겨주세요!</FirstContent>
            )}
        </Container>
    );
}

export default Comments;
