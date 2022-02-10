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

// Utils
import { getErrorMessage, isERC721, isNFT } from '../../utils';

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
  const [message, setMessage] = useState('');
  const { library, account } = useWeb3React();
  const { currentAddress } = useAddress();

  const isTransferPossible = (): boolean => {
    if (!token) {
      setError('NFT data missing');
      return false;
    }

    if (!transferAddress) {
      setError('Please put destination address');
      return false;
    }

    if (!token.type && !isNFT(token.type)) {
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

    if (isERC721(token?.type)) {
      ABI = erc721abi;
    } else {
      ABI = erc1155abi;
    }

    let contract = null;

    if (token?.type) {
      contract = new Contract(token.contractAddress, ABI, signerOrProvider);
    }

    return contract;
  };

  const initiateTransfer = async (): Promise<null> => {
    if (!isTransferPossible()) {
      return null;
    }

    const ContractInstance = createContractInstance();

    if (!ContractInstance) {
      return null;
    }

    const transferMethod = isERC721(token?.type)
      ? 'transferFrom'
      : 'safeTransferFrom';

    let transaction;
    const from = currentAddress || account;
    const to = transferAddress;
    const tokenId = token?.tokenId;

    try {
      // Get tokenURI metadata from contract only on erc721
      const metadata =
        isERC721(token?.type) &&
        (await ContractInstance.tokenURI(token?.tokenId));
      // eslint-disable-next-line no-console
      console.log('tokerURI metadata: ', metadata);

      transaction = await ContractInstance[transferMethod](from, to, tokenId);

      const receipt = await transaction.wait(1);

      if (receipt) {
        setMessage('NFT was successfully transfered.');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }

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
          {message && <Text className={styles.message}>{message}</Text>}
          <Button className={styles.submit} onClick={initiateTransfer}>
            Transfer
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default TransferModal;
