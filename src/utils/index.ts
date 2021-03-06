import { ERC721, ERC1155, ChainIds } from '../const';
import { CovalentTokenBalanceData, CovalentNFTData, IToken } from '../types';

export const noop = (): void => {
  // do nothing
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const isERC721 = (type: string | undefined): boolean => type === ERC721;

export const isERC1155 = (type: string | undefined): boolean =>
  type === ERC1155;

export const isNFT = (tokenType: string): boolean => {
  return isERC721(tokenType) || isERC1155(tokenType);
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

export const extractType = (types: string[] | null): string => {
  if (!types) {
    return '';
  }

  let tokenType = '';

  types.forEach((type) => {
    const currentType = type.toLowerCase();
    if (isNFT(currentType)) {
      tokenType = currentType;
    }
  });

  return tokenType;
};

export const containsNFT = (tokenTypes: string[]): boolean => {
  const tokenType = extractType(tokenTypes);

  return isNFT(tokenType);
};

export const filterNFTsOnly = (nft: CovalentTokenBalanceData): boolean =>
  Boolean(
    nft.supports_erc && containsNFT(nft.supports_erc) && nft.nft_data?.length,
  );

export const parseNFTdata = (nftToken: CovalentTokenBalanceData): IToken[] => {
  if (!nftToken.nft_data) return [];

  return nftToken.nft_data.map(
    (nft: CovalentNFTData) =>
      ({
        types: nftToken.supports_erc,
        type: extractType(nftToken.supports_erc),
        contractAddress: nftToken.contract_address,
        tokenId: nft.token_id,
        thumbnail: nft.external_data.image,
        externalUrl: nft.external_data?.external_url,
        tokenUrl: nft.token_url,
      } as IToken),
  );
};
