import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import IconFa from "react-native-vector-icons/FontAwesome5";
import { parseISO, formatRelative } from "date-fns";

import AutoImage from "react-native-auto-height-image";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";

import Verified from "../assets/verified.png";
import { api } from "../services/api";
import AsyncStorage from "@react-native-community/async-storage";
import { ptBR } from "date-fns/locale";
import { UserContext } from "../contexts/UserContext";

const PostView = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

const HeaderPost = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 65px;
`;

const PostInfo = styled.View`
  width: 100%;
  padding: 10px;
`;

const TitleNews = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-right: 5px;
`;

const DateNews = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: #9e9e9e;
`;

const PostImage = styled.Image`
  width: ${Dimensions.get("screen").width};
  height: 200px;
  margin-top: 5px;
`;

const SeePost = styled.Text`
  font-size: 12px;
  color: #b3b3b3;
  font-weight: 700;
`;

const SeePostArea = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-start;
  padding-left: 10px;
`;

const TextPost = styled.Text`
  width: 100%;
  padding: 0 10px;
  padding-bottom: 3px;
`;

const StrongName = styled.Text`
  font-size: 13px;
  font-weight: bold;
`;

const TextPostInfo = styled.Text`
  font-size: 13px;
  color: #262626;
`;

const Reactions = styled.View`
  width: 100%;
  height: 40px;
  padding: 0 15px;
  flex-direction: row;
  align-items: center;
`;

const Reaction = styled.Text`
  font-weight: 700;
  margin-right: 20px;
`;

export default function PostList({
  seeMore = true,
  post: postProp,
  withoutComments,
  onOpenPost,
}) {
  const [post, setPost] = useState(postProp);
  const { user } = useContext(UserContext);

  useEffect(() => setPost(postProp), [postProp]);

  const handleLike = () => {
    if (post.isLiked) {
      api({
        method: "delete",
        url: `/customer/post/like?p=${post.id}`,
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      setPost({
        ...post,
        isLiked: false,
        likes: post.likes.slice(0, post.likes.length - 1),
      });
    } else {
      api({
        method: "post",
        url: `/customer/post/like?p=${post.id}`,
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      setPost({ ...post, isLiked: true, likes: [...post.likes, []] });
    }
  };

  return (
    <PostView>
      <HeaderPost>
        <ProfileImage source={{ uri: post?.employee.avatar.devMobileUrl }} />
        <PostInfo>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <TitleNews>{post?.employee.name}</TitleNews>
            <Image
              source={Verified}
              style={{ width: 15, height: 15, resizeMode: "contain" }}
            />
          </View>
          <DateNews>
            Equipe Petscão -{" "}
            {formatRelative(parseISO(post?.createdAt), new Date(), {
              locale: ptBR,
            })}
          </DateNews>
        </PostInfo>
      </HeaderPost>
      <AutoImage
        width={Dimensions.get("window").width}
        source={{ uri: post.midia.devMobileUrl }}
        maxHeight={350}
      />
      <Reactions>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLike}>
          {post.isLiked ? (
            <IconFa name="heart" size={20} color="#fb6340" solid />
          ) : (
            <IconFa name="heart" size={20} color="#fb6340" regular />
          )}
        </TouchableOpacity>
        <Reaction style={{ color: post.isLiked ? "#fb6340" : "#7A8FA6" }}>
          {post.likes.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </Reaction>
        {!withoutComments && (
          <>
            <TouchableOpacity style={{ marginRight: 10 }} onPress={onOpenPost}>
              <IconFa name="comment-alt" size={20} color="#7A8FA6" solid />
            </TouchableOpacity>
            <Reaction style={{ color: "#7A8FA6" }}>
              {post.comments.length
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Reaction>
          </>
        )}
      </Reactions>
      <TextPost>
        <StrongName>{post?.employee.name}: </StrongName>
        <TextPostInfo>{post?.title}</TextPostInfo>
      </TextPost>
      {seeMore && (
        <SeePostArea onPress={onOpenPost}>
          <SeePost>Ver Comentários</SeePost>
        </SeePostArea>
      )}
    </PostView>
  );
}
