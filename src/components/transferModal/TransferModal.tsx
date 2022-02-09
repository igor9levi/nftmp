import React, { useState } from 'react';
import Modal from 'react-modal';

// Styles
import styles from './transferModal.module.scss';
import Button from '../../common/button';

// Hooks
import { useModal } from '../../hooks/useModal';

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

  const initiateTransfer = (): null => {
    // TODO: implement
    return null;
  };

  return (
    <Modal
      isOpen={isModalOpen}
      // onAfterOpen={afterOpenModal}
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
          <Button className={styles.submit} onClick={initiateTransfer}>
            Transfer
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default TransferModal;
