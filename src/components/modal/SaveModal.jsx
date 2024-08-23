
import React from 'react';
import './FileUpload.css';
import { FaCircleCheck } from "react-icons/fa6";


const SaveModal = ({ isOpen, onClose }) => {

    return (
        <div style={{ display: isOpen ? 'block' : 'none' }}>
            <div className='modal_overlay'>
                <div className="custom_modal_success">
                    <div className="modal_body_close_save">
                        <div className="file-upload-container">
                            <div className='close_section'>
                                <span>
                                    <FaCircleCheck className='close_icon' />
                                    <label className='close_text'>Your request successfully Saved.</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="modalf">
                        <button className="close_button_model" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaveModal