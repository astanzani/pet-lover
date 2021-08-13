import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LogoHeader, UserCard, PostCard } from '@components';
import getStyles from './styles';

export function Feed() {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <LogoHeader right={<UserCard />} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <PostCard title="Card 1" />
        <PostCard title="Card 2" />
        <PostCard title="Card 3" />
      </ScrollView>
    </SafeAreaView>
  );
}
