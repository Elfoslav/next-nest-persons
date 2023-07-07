import React, { FC } from 'react';
import { useRouter } from 'next/router';

interface ButtonProps {
  text?: string;
  href?: string;
  icon?: React.ElementType;
  color?: string;
  size?: number;
  rounded?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ text, href, icon: Icon, color, size, rounded, onClick, className }) => {

  const router = useRouter();

  const getClassName = () => {
    let _className = `flex items-center justify-center text-white`;

    if (className) {
      _className += ` ${className}`;
    }

    if (color) {
      _className += ` bg-${color}-500 hover:bg-${color}-600`;
    } else {
      _className += ' bg-blue-500 hover:bg-blue-600';
    }

    if (rounded) {
      _className += ' rounded-full';
      if (size) {
        _className += ` px-${size} py-${size}`;
      } else {
        _className += ' px-2 py-2';
      }
    } else {
      _className += ' rounded-md';
      if (size) {
        _className += ` px-${size * 2} py-${size}`;
      } else {
        _className += ' px-4 py-2';
      }
    }

    return _className;
  }

  const _onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      router.push(href);
    }

    if (onClick) {
      onClick(e);
    }
  }

  return (
    <button
      onClick={_onClick}
      className={getClassName()}
    >
      {Icon && <Icon className={`w-5 h-5 text-white${text ? ' mr-2' : ''}`} />}
      {text}
    </button>
  );
};

export default Button;
