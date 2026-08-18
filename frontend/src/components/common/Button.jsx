const variants = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-sm disabled:opacity-50",
  secondary:
    "bg-white text-ink border border-border hover:bg-canvas disabled:opacity-50",
  ghost: "text-muted hover:text-ink hover:bg-canvas disabled:opacity-50",
  danger:
    "bg-white text-accent-coral border border-accent-coral/30 hover:bg-accent-coral/5 disabled:opacity-50",
};

const sizes = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className = "",
  icon: Icon,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-150 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        Icon && <Icon className="h-4 w-4" strokeWidth={2} />
      )}
      {children}
    </button>
  );
};

export default Button;
