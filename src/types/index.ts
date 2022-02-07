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

export type PokemonData = {
  id: string;
  number: string;
  name: string;
  image: string;
  fetchedAt: string;
  attacks: {
    special: Array<{
      name: string;
      type: string;
      damage: number;
    }>;
  };
};

// Covalent API Response
export type CovalentNFTExternalData = {
  animation_url: string | null;
  attributes: Record<string, string | number>[];
  description: string;
  external_url: string | null;
  image: string;
  image_256: string;
  image_512: string;
  image_1024: string;
  name: string;
  owner: string | null;
};

export type CovalentNFTData = {
  burned: null | unknown;
  external_data: Record<string, CovalentNFTExternalData>;
  original_owner: string;
  owner: string;
  owner_address: string | null;
  supports_erc: string[];
  token_balance: string;
  token_id: string;
  token_price_wei: null | unknown;
  token_quote_rate_eth: null | unknown;
  token_url: string;
};

export type CovalentTokenBalanceData = {
  balance: string | null;
  balance_24h: string | null;
  contract_address: string;
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string | null;
  last_transferred_at: Date | null;
  logo_url: string;
  nft_data: CovalentNFTData[] | null;
  quote: number | null;
  quote_24h: number | null;
  quote_rate: number | null;
  quote_rate_24h: number | null;
  supports_erc: string[];
  type: string;
};
