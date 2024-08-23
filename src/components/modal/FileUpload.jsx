
import React, { useEffect, useState } from 'react';
import './FileUpload.css';
import { LuUpload } from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";


const FileUpload = ({ isOpen, onClose, onSelectFile, handleFileUpload }) => {
    const [fileModal, setFileModal] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files;
        // console.log('files data modal', file);
        setSelectedFile(file);
        if (file.length > 1) {
            setSelectedFileName(`${file.length} files selected`);
            onSelectFile(`${file.length} files selected`);
        }
        else {
            setSelectedFileName(file[0].name);
            onSelectFile(file[0].name);
        }
    };

    const handleUpload = () => {
        handleFileUpload(selectedFile);
        setSelectedFile(null);
        setFileModal(false);
    };
    const onSuccesClose = () => {
        setSelectedFileName('')
        onClose()
        setFileModal(true)
    }

    useEffect(() => {
        setFileModal(true)

        return () => {
            setFileModal(true)
        }
    }, [])

    return (
        <div style={{ display: isOpen ? 'block' : 'none' }}>
            {fileModal ? (
                <div className='modal_overlay'>
                    <div className="custom-modal">
                        <div className="modalh">
                            <label className='model_htext'>
                                <b>Upload Document:</b> DOC-056
                            </label>
                            <label className='model_htext model_text_la'>
                                Mandatory Fields <sup style={{ color: 'red' }}>*</sup>
                            </label>
                        </div>
                        <div className="modal-body">
                            <div className="file-upload-container">
                                <div className='icon_section'>
                                    <LuUpload className='upload-icon' onClick={() => document.getElementById('fileInput').click()} />
                                    <input id="fileInput" type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                                </div>
                                <div className='file_detials'>
                                    <label >Click here or drag file to upload</label><br />
                                    <label >(Upload the same .xls or .xlsl template)</label><br />
                                    <label className='file_name'>{selectedFileName ? (`${'File Name :'} ${selectedFileName}`) : ('')}</label><br />
                                    <label className='last_label'>File size should be less than 25 MB</label>
                                </div>

                            </div>
                        </div>

                        <div className="modalf">
                            <button className="cancel-button" onClick={onClose}>Cancel</button>
                            <button className="upload-button" onClick={handleUpload} disabled={!selectedFile}>Upload</button>

                        </div>
                    </div>
                </div>
            ) : (
                <div className='modal_overlay'>
                    <div className="custom_modal_success">
                        <div className="modal_body_close">
                            <div className="file-upload-container">
                                <div className='close_section'>
                                    <span>
                                        <FaCircleCheck className='close_icon' />
                                        <label className='close_text'>File Added Successfully !</label>
                                    </span>
                                    <label className='close_name'>File DOC-056,<q>{selectedFileName}</q> have been successfully added</label>
                                </div>
                            </div>
                        </div>
                        <div className="modalf">
                            <button className="close_button_model" onClick={onSuccesClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default FileUpload