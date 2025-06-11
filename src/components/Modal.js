import React from 'react';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const contentStyle = {
  width: '90%',
  maxWidth: '600px',
  maxHeight: '80vh',
  overflowY: 'auto',
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  boxSizing: 'border-box',
  position: 'relative',
};

function Modal({ onClose, children }) {
  return (
    <div style={modalStyle} onClick={onClose} role="dialog" aria-modal="true">
      <div
        style={contentStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            fontSize: '18px',
            border: 'none',
            background: 'none',
          }}
          aria-label="Close detail view"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;