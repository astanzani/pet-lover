import React, { useState } from 'react';

export function useMenuToggle(): [
  HTMLElement | null,
  (e: React.MouseEvent<HTMLElement>) => void,
  () => void
] {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };

  return [anchorEl, open, close];
}
