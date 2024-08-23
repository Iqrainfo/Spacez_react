import React from 'react';
import Modal from 'react-bootstrap/Modal'; // Assuming you have Modal component from react-bootstrap

const SellModal = ({ showModal, setShowModal, confirmSell, coinDetails }) => {
    const { coin, quantity, currentPrice } = coinDetails || {};

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Sell</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {coinDetails ? (
                    <div>
                        <p>Are you sure you want to sell <br></br>
                            <b><span style={{ color: 'red' }}>{quantity} {coin}</span></b>?
                        </p>


                        <p><b>Current Price:</b> ${currentPrice.toFixed(2)}</p>
                        <p><b>Total Amount:</b> ${quantity * currentPrice.toFixed(2)}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={confirmSell}>Sell</button>
            </Modal.Footer>
        </Modal>
    );
};

export default SellModal;
