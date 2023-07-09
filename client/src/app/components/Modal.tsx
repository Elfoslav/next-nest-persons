import React, { FC } from 'react';
import Button from './Button';
import './Modal.scss';

interface ModalProps {
  title: string,
  text: string,
  isOpen: boolean,
  onClose: () => void;
  onSubmit: () => void;
}

const Modal: FC<ModalProps> = ({ title, text, isOpen, onClose, onSubmit }) => {
  const onOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75"
      onClick={onOutsideClick}
    >
      <div className="w-[400px] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl animate-modal">
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {text}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 px-3 py-3 flex flex-row-reverse sm:px-4">
          <Button
            color="green"
            text="Submit"
            onClick={onSubmit}
          />
          <Button
            text="Cancel"
            className="mr-2"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
