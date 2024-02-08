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
        <dialog data-testid="dialog" className="relative w-11/12 rounded-lg bg-transparent" ref={dialogRef}>
            {children}
        </dialog>
    )
}

export default Modal;