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
        <dialog data-testid="dialog" className="relative w-11/12 rounded-lg" ref={dialogRef}>
            {children}
            <button className='absolute right-0 top-0 m-2' onClick={ () => setIsModalOpen(false) }>
                <FontAwesomeIcon icon={faX} className='text-lg' />
            </button>
            
        </dialog>
    )
}

export default Modal;