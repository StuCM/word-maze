import { useEffect, useRef } from "react";


function Modal({ isModalOpen, children }) {
    const dialogRef = useRef();

    useEffect(() => {
        if(isModalOpen) {
            dialogRef.current.showModal();
        }
        else{ dialogRef.current.close(); }
    }, [isModalOpen])

    return (
        <dialog data-testid="dialog" className="relative w-11/12 rounded-lg bg-transparent my-auto max-w-md max-h-100" ref={dialogRef}>
            {children}
        </dialog>
    )
}

export default Modal;