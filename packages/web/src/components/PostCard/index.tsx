import React from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  CardMedia,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';
import { Comment, Favorite, Pets, Share } from '@mui/icons-material';
import { formatDistance, parseISO } from 'date-fns';

import { PostWithPet } from 'generated/graphql';
import { ImageGallery } from '../ImageGallery';

interface Props {
  post: PostWithPet;
}

export function PostCard({ post }: Props) {
  return (
    <>
      <Card sx={{ margin: 1 }}>
        <CardHeader
          avatar={
            <Avatar src={post.pet.picture ?? undefined}>
              <IconButton>
                <Pets />
              </IconButton>
            </Avatar>
          }
          title={post.pet.name}
          subheader={
            formatDistance(parseISO(post.createdAt), new Date()) + ' ago'
          }
        />
        {post.pictures && post.pictures.length > 0 && (
          <ImageGallery images={post.pictures} />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing={true}>
          <IconButton>
            <Favorite fontSize="small" />
          </IconButton>
          <IconButton>
            <Comment fontSize="small" />
          </IconButton>
          <IconButton>
            <Share fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
      <Divider />
    </>
  );
}
