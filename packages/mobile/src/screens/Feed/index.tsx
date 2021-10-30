import { useGetFeedPostsQuery } from '@generated/graphql';
import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoHeader, UserCard, PostCard } from '@components';

import getStyles from './styles';

export function Feed() {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { data, loading, error } = useGetFeedPostsQuery();

  // console.log('DATA: ');
  // console.log(JSON.stringify(data, null, 2));
  // console.log('ERROR: ');
  // console.log(JSON.stringify(error, null, 2));

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !data) {
    console.error(error);
    throw new Error('Could not fetch user info!');
  }

  const {
    feedPosts: { items: posts },
  } = data;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <LogoHeader right={<UserCard />} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <PostCard
            key={post.postId}
            title={post.pet.name}
            text={post.text}
            pictures={post.pictures}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
