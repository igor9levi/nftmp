import { ERC721, ERC1155 } from '../const';

export const noop = (): void => {
  // do nothing
};

export const urlBuilder = ({
  chainId,
  address,
}: {
  chainId: string;
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
