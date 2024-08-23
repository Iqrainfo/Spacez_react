import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const PaymentSuccessModal = ({ show, setShowModal }) => {
    const handleClose = () => {
        setShowModal(false); // Close the success modal
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Payment Successful!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="success-message">
                    Your payment has been successfully processed.
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentSuccessModal;
