export type TokenType = 'ERC721' | 'ERC1155';

export interface IToken {
  token: {
    id: string;
    type: TokenType;
    thumbnail: string;
    tokenAddress: string;
    link: string;
  };
}

// Image
export interface IImage {
  src: string;
  alt?: string;
  className?: string;
}
