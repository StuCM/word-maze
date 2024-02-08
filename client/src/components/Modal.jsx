import { useContext, useEffect, useRef } from "react";
import { GlobalState } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

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
            <button className='py-2 px-3.5 bg-seconday mt-4 rounded-full shadow-lg' onClick={ () => setIsModalOpen(false) }>
                <FontAwesomeIcon icon={faX} className='text-lg text-textPrim' />
            </button>
        </dialog>
    )
}

export default Modal;