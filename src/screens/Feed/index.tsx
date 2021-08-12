import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useQuery } from '@apollo/client';

import { LogoHeader, UserCard, PostCard } from '@components';
import getStyles from './styles';

export function Feed() {
  const { data, error, loading } = useQuery(
    gql`
      query Me {
        me
      }
    `
  );

  console.log('DATA: ', data);
  console.log('LOADING: ', loading);
  console.log('ERRRO: ', error);

  const theme = useTheme();
  const styles = getStyles(theme);

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
