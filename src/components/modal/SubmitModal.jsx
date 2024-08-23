
import React from 'react';
import './FileUpload.css';
import { FaCircleCheck } from "react-icons/fa6";


const SumbitModal = ({ isOpen, onClose,requestId }) => {

    // const requestNumber = '#RID-456789'

    return (
        <div style={{ display: isOpen ? 'block' : 'none' }}>
            <div className='modal_overlay'>
                <div className="custom_modal_success">
                    <div className="modal_body_close">
                        <div className="file-upload-container">
                            <div className='close_section'>
                                <span>
                                    <FaCircleCheck className='close_icon' />
                                    <label className='close_text'>Your request successfully submitted !</label>
                                </span>
                                <label className='close_name'>Request <q>{requestId}</q>
                                    have been submitted, you will be soon notified.</label>
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

export default SumbitModal