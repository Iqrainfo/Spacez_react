import React from 'react'
import { Toast } from 'primereact/toast';

function Toaster({ show, type }) {
    const toast = useRef(null);


    if (condition) {

    }
    

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 });
    }

    const showInfo = () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
    }

    const showWarn = () => {
        toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Message Content', life: 3000 });
    }

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
    }


    return (
        <>
            <Toast ref={toast} />
        </>
    )
}

export default Toaster