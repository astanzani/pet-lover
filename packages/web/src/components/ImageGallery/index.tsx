import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Circle } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface Props {
  images: string[];
}

export function ImageGallery({ images }: Props) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const currentSrc = images[currentImageIdx];

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <img
        style={{
          maxWidth: '100%',
          height: 'auto',
          maxHeight: '400px',
          marginTop: 8,
          marginBottom: 8,
        }}
        src={currentSrc}
        alt=""
      />
      {images.length > 1 && (
        <Box display="flex">
          {images.map((src, idx) => (
            <IconButton
              key={src}
              onClick={setCurrentImageIdx.bind(null, idx)}
              sx={{ fontSize: '.9rem' }}
              color={currentImageIdx === idx ? 'primary' : 'default'}
            >
              <Circle fontSize="inherit" />
            </IconButton>
          ))}
        </Box>
      )}
    </Box>
  );
}
