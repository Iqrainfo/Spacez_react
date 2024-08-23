
import React from 'react';
import './FileUpload.css';
import { FaCircleCheck } from "react-icons/fa6";
import { CiWarning } from "react-icons/ci";



const CommonModal = ({ type, IconType, title, isOpen, onClose, requestId, onClickDelete ,onClickSubmitYes,onClickSaveYes,onClickReject,onClickApprove}) => {

    let content;

    if (IconType === 'done' && type === 'submit') {
        content = <FaCircleCheck className='close_icon' />;
    }
    else if (IconType === 'done' ) {
        content = <FaCircleCheck className='close_icon' />;
    }
    else if (IconType === 'alert' ) {
        content = <CiWarning className='close_icon' />;
    }
    else {
        content = <CiWarning className='close_icon' />;
    }

    return (
        <div style={{ display: isOpen ? 'block' : 'none' }}>
            <div className='modal_overlay'>
                <div className="custom_modal_success">
                    <div className="modal_body_close">
                        <div className="file-upload-container">
                            <div className='close_section'>
                                <span>
                                    {content}
                                    <label className='close_text'>{title}</label>
                                </span>
                                {requestId && (
                                    <label className='close_name'>Request <q>{requestId}</q> have been submitted, you will be soon notified.</label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modalf">
                        <button className="cancel-button" onClick={onClose}>Close</button>
                        {type === 'delete' && (<button className="yes-button-model" onClick={onClickDelete}>Yes</button>)}
                        {type === 'submit' && IconType ==='alert' && (<button className="yes-button-model" onClick={onClickSubmitYes}>Yes</button>)}
                        {type === 'save' && IconType ==='alert' && (<button className="yes-button-model" onClick={onClickSaveYes}>Yes</button>)}
                        {type === 'reject' && IconType ==='alert' && (<button className="yes-button-model" onClick={onClickReject}>Yes</button>)}
                        {type === 'approve' && IconType ==='alert' && (<button className="yes-button-model" onClick={onClickApprove}>Yes</button>)}
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonModal