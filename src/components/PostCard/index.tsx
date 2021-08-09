import React from 'react';
import { View } from 'react-native';
import {
  Card,
  Paragraph,
  IconButton,
  Caption,
  useTheme,
} from 'react-native-paper';

import getStyles from './styles';

const EXAMPLE_IMG =
  'https://www.vets4pets.com/siteassets/species/dog/large-dog-on-walk-looking-over-hills.jpg?width=1040';

interface Props {
  title: string;
}

export function PostCard({ title }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Card style={styles.root}>
      <Card.Title title={title} />
      <Card.Content>
        <Paragraph>Text Content</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: EXAMPLE_IMG }} />
      <Card.Actions style={styles.actions}>
        <View style={styles.actionButtonGroup}>
          <IconButton
            icon="heart-outline"
            size={28}
            color={theme.colors.heart}
          />
          <IconButton icon="comment-processing-outline" size={28} />
          <IconButton icon="share-outline" size={28} />
        </View>
        <Caption>100 Comments</Caption>
      </Card.Actions>
    </Card>
  );
}
