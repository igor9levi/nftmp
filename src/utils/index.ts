import { ERC721, ERC1155 } from '../const';
import { IToken } from '../types';

export const noop = (): void => {
  // do nothing
};

export const urlBuilder = ({
  chainId,
  address,
}: {
  chainId: number;
  address: string;
}): string => {
  return `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${process.env.REACT_APP_COVALENTHQ_API_KEY}`;
};

export const isNFT = (token: string[] | string): boolean => {
  if (Array.isArray(token)) {
    return token.includes(ERC1155) || token.includes(ERC721);
  }
  if (typeof token === 'string') {
    const tokenType = token.toLowerCase();
    return tokenType === ERC721 || tokenType === ERC721;
  }

  return false;
};

// TODO: define nft type from endpoint
export const filterNFTsOnly = <T>(nft: any): T =>
  isNFT(nft.supports_erc) && nft.nft_data?.[0];

export const parseNFTdata = (nft: any): IToken =>
  ({
    // TODO: nft_data can be array of more then 1 element
    // TODO:  token_url & external_link to show address 0x00...
    tokenId: nft.nft_data[0]?.token_id,
    thumbnail: nft.nft_data[0]?.external_data.image,
    tokenAddress: nft.nft_data[0]?.token_url,
    link: nft.nft_data[0]?.external_data?.external_url,
  } as IToken);
