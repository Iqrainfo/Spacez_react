import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../../components/modal/buyModal/BuyModal.css';

const BuyModal = ({ showModal, setShowModal, selectedCoinDetails, confirmBuy, openPaymentModal }) => {

    const handleConfirmBuy = () => {
        confirmBuy(); // Confirm the purchase logic

        // Close BuyModal and open PaymentModal
        setShowModal(false); // Close BuyModal
        openPaymentModal(); // Open PaymentModal
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedCoinDetails && (
                    <div>
                        <p><strong>Coin:</strong> {selectedCoinDetails.coin}</p>
                        <p><strong>Quantity:</strong> {selectedCoinDetails.quantity}</p>
                        <p><strong>Current Price:</strong> ${selectedCoinDetails.currentPrice.toFixed(2)}</p>
                        <p><strong>Total Amount:</strong> ${selectedCoinDetails.totalAmount.toFixed(2)}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                <Button variant="primary" onClick={handleConfirmBuy}>Confirm Purchase</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BuyModal;
