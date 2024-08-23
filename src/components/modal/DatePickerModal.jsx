import React, { useEffect, useState } from 'react';
import './DatePickerModal.css'

const DateModal = ({ isOpen, onClose, children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  // Handle overlay click to close the modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {modalOpen && (
        <div className="modal_overlay" onClick={handleOverlayClick}>
          <div className="modal_content">
            <span className="close_button" onClick={closeModal}>
              &times;
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default DateModal;
