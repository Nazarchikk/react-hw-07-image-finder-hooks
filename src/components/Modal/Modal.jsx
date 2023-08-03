import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ imgBigSrc, imgTag, onClose }) {
  useEffect(() => {
    const handleKeyDownEscape = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDownEscape);
    return () => {
      window.removeEventListener('keydown', handleKeyDownEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }; 

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <img src={imgBigSrc} alt={imgTag} className={css.modal} />
    </div>,
    modalRoot
  );
}
