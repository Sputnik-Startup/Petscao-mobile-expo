import React, { useContext, useEffec, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  Container,
  Scroller,
  HeaderPost,
  GoBackIcon,
  CommentArea,
  CommentInput,
  CommentProfile,
  ButtonArea,
  TextButton,
  HeaderTitle,
} from "./styles";
import { View, Text } from "react-native";

import PostList from "../../components/PostList";

import Comment from "../../components/Comment";
import { UserContext } from "../../contexts/UserContext";
import { format } from "date-fns/esm";
import { ptBR } from "date-fns/esm/locale";
import { api } from "../../services/api";

export default ({ route, navigation }) => {
  const { post: postProp } = route.params;
  const scrollRef = useRef(null);
  const { user } = useContext(UserContext);

  const [commentContent, setCommentContent] = useState("");
  const [post, setPost] = useState(postProp);

  const handleComment = async () => {
    if (commentContent) {
      const comment = {
        content: commentContent,
        customer_id: user.id,
        customer: { name: user.name, avatar: user.avatar },
        employee_id: null,
        createdAt: format(new Date(), "yyyy-MM-dd hh:mm", { locale: ptBR }),
      };

      api({
        method: "post",
        url: `/posts/comment?p=${post.id}&context=customer`,
        data: {
          content: commentContent,
        },
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });

      setPost({ ...post, comments: [...post.comments, comment] });
      setCommentContent("");
    }
  };

  return (
    <Container>
      <HeaderPost>
        <GoBackIcon
          onPress={() => navigation.navigate("Home", { post })}
          style={{ marginRight: 10 }}
        >
          <Icon name="chevron-left" size={22} color="#fff" />
        </GoBackIcon>
        <HeaderTitle>Publicação</HeaderTitle>
      </HeaderPost>
      <Scroller
        ref={scrollRef}
        onContentSizeChange={(width, height) =>
          scrollRef.current.scrollTo({ y: height })
        }
      >
        <PostList seeMore={false} post={post} withoutComments />
        {!post.comments[0] && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 30,
              width: "100%",
            }}
          >
            <Text style={{ color: "#b3b3b3", fontWeight: "700" }}>
              Nenhum comentário
            </Text>
          </View>
        )}
        {post.comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </Scroller>
      <CommentArea>
        <CommentProfile source={{ uri: user.avatar?.devMobileUrl }} />
        <CommentInput
          placeholder="Adicione um comentário..."
          onChangeText={(text) => setCommentContent(text)}
          value={commentContent}
        />
        <ButtonArea onPress={handleComment}>
          <TextButton>Publicar</TextButton>
        </ButtonArea>
      </CommentArea>
    </Container>
  );
};
