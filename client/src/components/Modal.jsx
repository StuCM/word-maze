import { useContext, useEffect, useRef } from "react";
import { GlobalState } from "../App";


function Modal({ children }) {
    const dialogRef = useRef();
    const {modalState} = useContext(GlobalState)

    useEffect(() => {
        if(modalState.isModalOpen) {
            dialogRef.current.showModal();
        }
        else{ dialogRef.current.close(); }
    }, [modalState.isModalOpen])

    return (
        <dialog data-testid="dialog" className="relative w-11/12 rounded-lg bg-transparent my-auto max-w-md max-h-100 focus:outline-none focus:border-none" ref={dialogRef}>
            {children}
        </dialog>
    )
}

export default Modal;