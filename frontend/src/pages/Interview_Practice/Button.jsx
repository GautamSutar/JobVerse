const Button = ({ children, onClick, disabled }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  