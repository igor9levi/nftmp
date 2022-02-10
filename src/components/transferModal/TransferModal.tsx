import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import Modal from 'react-modal';

// Styles
import styles from './transferModal.module.scss';
import Button from '../../common/button';
import Text from '../../common/text';

// Hooks
import { useModal } from '../../hooks/useModal';
import { useAddress } from '../../hooks/useAddress';

// ABI
import erc721abi from '../../contracts/erc721-abi.json';
import erc1155abi from '../../contracts/erc1155-abi.json';
import { ERC1155, ERC721 } from '../../const';

Modal.setAppElement('#modal');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const TransferModal = (): JSX.Element => {
  const { isModalOpen, token, close } = useModal();
  const [transferAddress, setTransferAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { library, account } = useWeb3React();
  const { currentAddress } = useAddress();

  const isERC721 = (): boolean => token?.type === ERC721;
  const isERC1155 = (): boolean => token?.type === ERC1155;

  const isTransferPossible = (): boolean => {
    if (!token) {
      setError('NFT data missing');
      return false;
    }

    if (!transferAddress) {
      setError('Please put destination address');
      return false;
    }

    if (!token.type) {
      setError('Unrecognized token type');
      return false;
    }

    if (!token.contractAddress || token.contractAddress === AddressZero) {
      setError(
        `Invalid 'contractAddress' parameter '${token.contractAddress}'.`,
      );
      return false;
    }

    return true;
  };

  const createContractInstance = (): Contract | null => {
    const signerOrProvider = account
      ? library.getSigner(account).connectUnchecked()
      : library;

    let ABI;

    if (isERC721()) {
      ABI = erc721abi;
    } else if (isERC1155()) {
      ABI = erc1155abi;
    }

    if (!token?.contractAddress || !ABI) {
      return null;
    }

    console.log('creating contract: ', token?.contractAddress, ABI);
    // return new Contract(token.contractAddress, ABI, signerOrProvider);
    return new Contract(token.contractAddress, erc1155abi, signerOrProvider);
  };

  const initiateTransfer = async (): Promise<null> => {
    if (!isTransferPossible()) {
      return null;
    }

    const ContractInstance = createContractInstance();

    if (!ContractInstance) {
      return null;
    }

    console.log(ContractInstance);

    const transferMethod =
      // token?.type === ERC721 ? 'transferFrom' : 'safeBatchTransferFrom';
      token?.type === ERC721 ? 'transferFrom' : 'safeTransferFrom';

    let transaction;

    console.log('METHOSL : ', ContractInstance[transferMethod]);
    console.log('safeTransferFrom : ', ContractInstance.safeTransferFrom);
    console.log('1155 transferFrom : ', ContractInstance.transferFrom);
    console.log('transferFrom : ', ContractInstance.transferFrom);
    console.log('CONtract Address : ', ContractInstance.address);

    try {
      // Get tokenURI metadata from contract only on erc721
      // const metadata = await ContractInstance.tokenURI(token?.tokenId);
      // const metadata = await ContractInstance.uri(token?.tokenId);
      // eslint-disable-next-line no-console
      // console.log('tokerURI metadata: ', metadata);

      // TODO: Use account from input

      // TODO: Transfer if nft721
      // data = await ContractInstance.Transfer(

      // transaction = await ContractInstance[transferMethod](
      //   // currentAddress || account,
      //   '0xE0fF737685fdE7Fd0933Fc280D53978b3d0700D5',
      //   transferAddress,
      //   token?.tokenId,
      // );

      // await transaction.wait(1);
      console.log(account, transferAddress, token?.tokenId);

      // TODO: call transfer if nft1155
    } catch (err) {
      console.error(err);
      // setError(err.message);
      return null;
    }

    console.log('CONTRACRT: ', transaction);
    console.log('TOKEN URI: ', ContractInstance.tokenURI);

    // TODO: implement
    // create contract instance
    // get token type and rest metadata
    // call to transaction
    // swich accounts
    return null;
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={close}
      style={customStyles}
      contentLabel="NFT Transfer Modal"
    >
      <div className={styles.container}>
        <Button size="sm" className={styles.closeButton} onClick={close}>
          X
        </Button>
        <h2 className={styles.title}>Input transfer address</h2>
        <form className={styles.form}>
          <input
            className={styles.input}
            onChange={(e) => setTransferAddress(e.target.value)}
          />
          {error && <Text className={styles.error}>{error}</Text>}
          <Button className={styles.submit} onClick={initiateTransfer}>
            Transfer
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default TransferModal;
