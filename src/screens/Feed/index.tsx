import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Auth } from '@aws-amplify/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LogoHeader, UserCard, PostCard } from '@components';
import getStyles from './styles';

export function Feed() {
  const theme = useTheme();
  const styles = getStyles(theme);

  const s = async () => {
    await Auth.signOut();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LogoHeader right={<UserCard />} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <PostCard title="Card 1" />
        <PostCard title="Card 2" />
        <PostCard title="Card 3" />
      </ScrollView>
    </SafeAreaView>
  );
}
