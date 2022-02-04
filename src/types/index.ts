import React from 'react';

export type TokenType = 'ERC721' | 'ERC1155';

export interface IToken {
  tokenId: string;
  /**
   * ERC721 | ERC1155
   */
  type: TokenType;
  /**
   * NFT token image
   */
  thumbnail: string;
  tokenAddress: string;
  /**
   * Link to view token
   */
  link: string;
}

// Sizes
export type Size = 'sm' | 'md' | 'lg';

// Image
export interface IImage {
  src: string;
  alt?: string;
  className?: string;
}

// Text
export interface IText {
  className?: string;
  children: React.ReactNode;
  size: Size;
}
