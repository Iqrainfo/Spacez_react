
import React from 'react';
import './FileUpload.css';
import { CiWarning } from "react-icons/ci";



const AlertModal = ({ isOpen, onClose }) => {

    return (
        <div style={{ display: isOpen ? 'block' : 'none' }}>
            <div className='modal_overlay'>
                <div className="custom_modal_success">
                    <div className="modal_body_close_save">
                        <div className="file-upload-container">
                            <div className='close_section'>
                                <span>
                                    <CiWarning className='close_icon' />
                                    <label className='close_text'>Please fill the all Mandatory(*) fields.</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="modalf">
                        <button className="close_button_model" onClick={onClose}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertModal