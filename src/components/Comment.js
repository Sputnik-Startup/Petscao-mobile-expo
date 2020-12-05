import React from "react";
import styled from "styled-components/native";
import { formatDistance, parseISO } from "date-fns";
import { ptBR } from "date-fns/esm/locale";

const CommentContainer = styled.View`
  width: 100%;
  margin: 15px 5px;
  flex-direction: row;
  padding: 0 10px;
`;

const ImageProfile = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 65px;
`;

const CommentItens = styled.View`
  width: 300px;
  margin-left: 10px;
  padding-right: 10px;
`;

const NameText = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;

const CommentText = styled.Text`
  font-size: 12px;
  color: #262626;
`;

const CommentDate = styled.Text`
  font-size: 10px;
  color: #9e9e9e;
`;

export default function Comment({ comment }) {
  return (
    <CommentContainer>
      <ImageProfile
        source={{
          uri:
            comment.employee?.avatar.devMobileUrl ||
            comment.customer?.avatar.devMobileUrl,
        }}
      />
      <CommentItens>
        <NameText>{comment.employee?.name || comment.customer?.name}</NameText>
        <CommentText>{comment.content}</CommentText>
        <CommentDate>
          {formatDistance(parseISO(comment.createdAt), new Date(), {
            locale: ptBR,
          })}
        </CommentDate>
      </CommentItens>
    </CommentContainer>
  );
}
