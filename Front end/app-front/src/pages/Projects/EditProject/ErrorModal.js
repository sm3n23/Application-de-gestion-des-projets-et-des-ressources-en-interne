// ErrorModal.js
import React from 'react';
import ReactDOM from 'react-dom';
import './ErrorModal.css'; // Ensure this is imported for custom styles

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
    if (!isOpen) return null;

    

    const modalContent = (
        <div className="modal-overlay-custom">
            <div className="modal-content-custom">
                <img src="/images/error.png" alt="Error" className="error-image" />
                <div className="error-message-content">
                    <h2>Erreur</h2>
                    <p>{errorMessage}</p>
                    
                </div>
                <button className="btn btn-orange-primary-edit btm my-4" onClick={onClose}>Fermer</button>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.body
    );
};

export default ErrorModal;
