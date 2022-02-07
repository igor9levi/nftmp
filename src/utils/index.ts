import { ERC721, ERC1155, ChainIds } from '../const';
import { CovalentTokenBalanceData, IToken } from '../types';

export const noop = (): void => {
  // do nothing
};

export const urlBuilder = ({
  chainId = ChainIds.Mainnet,
  account,
}: {
  chainId?: number;
  account: string;
}): string => {
  return (
    `https://api.covalenthq.com/v1/${chainId}/address/${account}/balances_v2/` +
    `?quote-currency=USD` +
    `&format=JSON` +
    `&nft=true` +
    `&no-nft-fetch=false` +
    `&key=${process.env.REACT_APP_COVALENTHQ_API_KEY}`
  );
};

export const outboundLinkBuilder = (address: string): string => {
  return `https://etherscan.io/address/${address}`;
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

// TODO:  remove any type, uncomment filterNFTsOnly

export const filterNFTsOnly = (nft: any): any =>
  isNFT(nft.supports_erc) && nft.nft_data?.length > 0;

export const parseNFTdata = (nftToken: any): IToken => {
  return nftToken.nft_data.map(
    (nft: any) =>
      ({
        types: nftToken.supports_erc,
        contractAddress: nftToken.contract_address,
        tokenId: nft.token_id,
        thumbnail: nft.external_data.image,
        externalUrl: nft.external_data?.external_url,
        tokenUrl: nftToken.token_url,
      } as IToken),
  );
};
