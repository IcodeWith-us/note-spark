function IconButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="p-2 rounded-full hover:bg-gray-200 focus:outline-none cursor-pointer"
    >
      {children}
    </button>
  );
}

export default IconButton;
