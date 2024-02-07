import { useContext, useEffect, useRef } from "react";
import { GlobalState } from "../App";

function Modal({ isModalOpen, children }) {
    const { setIsModalOpen } = useContext(GlobalState);
    const dialogRef = useRef();

    useEffect(() => {
        if(isModalOpen) {
            dialogRef.current.showModal();
        }
        else{ dialogRef.current.close(); }
    }, [isModalOpen])

    return (
        <dialog ref={dialogRef}>
            {children}
            <button onClick={ () => setIsModalOpen(false) }>Close</button>
        </dialog>
    )
}

export default Modal;