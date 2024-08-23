import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PaymentSuccessModal from '../../../components/modal/paymentModal/paymentalert'; // Assuming this file is in the same directory

const PaymentModal = ({ showModal, setShowModal }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCVC] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control the success modal

    const handleInputChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
        value = value.substring(0, 16); // Limit to 16 digits

        // Add spaces after every 4 digits
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

        setCardNumber(value);
    };

    const handlePayment = () => {
        // Simulating payment processing delay with setTimeout
        setTimeout(() => {
            // Perform payment processing here (mocked for demonstration)
            setShowModal(false); // Close the payment modal
            setShowSuccessModal(true); // Show the success modal after payment processing
        }, 1500); // Simulating a delay of 1.5 seconds
    };

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCardHolderName">
                            <Form.Label>Card Holder Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Card holder name"
                                value={cardHolderName}
                                onChange={(e) => setCardHolderName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter card number"
                                value={cardNumber}
                                onChange={handleInputChange}
                                maxLength="19" // 16 digits + 3 spaces
                            />
                        </Form.Group>
                        <Form.Group controlId="formExpiryDate">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCVC">
                            <Form.Label>CVC</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CVC"
                                value={cvc}
                                onChange={(e) => {
                                    // Ensure only numbers and max length of 3
                                    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
                                    setCVC(value);
                                }}
                                maxLength="3" // Maximum length of 3 digits
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handlePayment}>Pay</Button>
                </Modal.Footer>
            </Modal>

            {/* Payment Success Modal */}
            <PaymentSuccessModal
                show={showSuccessModal}
                setShowModal={setShowSuccessModal}
            />
        </>
    );
};

export default PaymentModal;
