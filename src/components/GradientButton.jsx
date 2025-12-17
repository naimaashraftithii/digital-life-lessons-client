const gradients = {
  bluePink: "linear-gradient(90deg, #3494e6, #ec6ead)",
  greenBlue: "linear-gradient(90deg, #67b26f, #4ca2cd)",
  pinkRed: "linear-gradient(90deg, #ec008c, #fc6767)",
};

const GradientButton = ({
  children,
  variant = "bluePink",
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      style={{
        background: gradients[variant],
      }}
      className={`
        text-white
        font-semibold
        px-5 py-2.5
        rounded-xl
        transition-all duration-300
        hover:scale-[1.03] active:scale-95
        shadow-md hover:shadow-lg
        bg-cover bg-center
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default GradientButton;
