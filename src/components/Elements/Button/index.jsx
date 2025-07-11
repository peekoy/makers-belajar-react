import React from 'react';

const Button = React.memo((props) => {
  const { children, classname, onClick = () => {}, type = 'button' } = props;
  return (
    <button
      className={`h-10 px-6 font-semibold rounded-md ${classname} text-white cursor-pointer`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default Button;
