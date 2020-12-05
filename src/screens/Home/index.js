import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container, Scroller } from "./styles";
import { Alert } from "react-native";
import { api } from "../../services/api";

import PostList from "../../components/PostList";
import { UserContext } from "../../contexts/UserContext";
import { useFocusEffect } from "@react-navigation/native";

export default ({ navigation, route }) => {
  const post = route.params?.post;
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  const handleNewPostIsPassed = useCallback(() => {
    if (post) {
      setPosts((state) =>
        state.map((postParam) => {
          if (postParam.id === post.id) {
            return post;
          }

          return postParam;
        })
      );
    }
  }, [post]);

  useFocusEffect(handleNewPostIsPassed, [post]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api({
          method: "get",
          url: "/posts",
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });

        setPosts(response.data);
      } catch (error) {
        Alert.alert(error.response?.data.error || error.message);
      }
    })();
  }, []);

  const handleClick = (post) => {
    navigation.navigate("PostItem", {
      post,
    });
  };

  return (
    <Container>
      <Scroller>
        {posts.map((post) => (
          <PostList
            post={post}
            key={post.id}
            onOpenPost={() => handleClick(post)}
          />
        ))}
      </Scroller>
    </Container>
  );
};
