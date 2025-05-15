import React from 'react';
import { Tag } from 'antd';
import 'tailwindcss/tailwind.css';

const badgeVariants = {
  default: {
    className: 'bg-blue-500 text-white hover:bg-blue-500/80 border-transparent',
  },
  secondary: {
    className: 'bg-gray-500 text-white hover:bg-gray-500/80 border-transparent',
  },
  destructive: {
    className: 'bg-red-500 text-white hover:bg-red-500/80 border-transparent',
  },
  outline: {
    className: 'bg-transparent text-gray-800 border-gray-300 hover:bg-gray-100/80',
  },
  success: {
    className: 'bg-green-500 text-white hover:bg-green-500/80 border-transparent',
  },
};

const Badge = ({ className, variant = 'default', children, ...props }) => {
  const variantStyles = badgeVariants[variant] || badgeVariants.default;

  return (
    <Tag
      className={`
        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${variantStyles.className}
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
};

export { Badge, badgeVariants };