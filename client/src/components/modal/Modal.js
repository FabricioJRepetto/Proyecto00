import './Modal.css'

const Modal = ({ children, isOpen, closeModal }) => {
    //const clickHandler = (e) => e.stopPropagation();
   
    return (
        <article className={`modal ${isOpen && 'is-open'}`} 
            //onClick={closeModal}
            >
            <div className='modal-container' 
                //</article>onClick={clickHandler}
                >
                { children }
            </div>
        </article>
    )
}

export default Modal