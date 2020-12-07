import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const PostView = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

const HeaderPost = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`;

const PostUsername = styled.View`
  width: 40%;
  height: 12px;
  background-color: #e3e3e3;
  margin-bottom: 7px;
`;

const ProfileImage = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #e3e3e3;
`;

const ImageSkeleton = styled.View`
  width: 100%;
  height: 350px;
  background-color: #e3e3e3;
`;

const PostInfo = styled.View`
  width: 100%;
  padding: 10px;
`;

const DateNews = styled.View`
  width: 30%;
  height: 8px;
  background-color: #e3e3e3;
`;

export default function Skeleton() {
  const fade = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),

      {
        iterations: 10,
      }
    ).start();
  }, [fade]);

  return (
    <Animated.View style={{ width: '100%', opacity: fade }}>
      <PostView>
        <HeaderPost>
          <ProfileImage />
          <PostInfo>
            <PostUsername></PostUsername>
            <DateNews></DateNews>
          </PostInfo>
        </HeaderPost>
        <ImageSkeleton />
      </PostView>
      <PostView>
        <HeaderPost>
          <ProfileImage />
          <PostInfo>
            <PostUsername></PostUsername>
            <DateNews></DateNews>
          </PostInfo>
        </HeaderPost>
        <ImageSkeleton />
      </PostView>
      <PostView>
        <HeaderPost>
          <ProfileImage />
          <PostInfo>
            <PostUsername></PostUsername>
            <DateNews></DateNews>
          </PostInfo>
        </HeaderPost>
        <ImageSkeleton />
      </PostView>
    </Animated.View>
  );
}
