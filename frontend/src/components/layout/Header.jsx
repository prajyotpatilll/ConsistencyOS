const Header = ({ title, subtitle }) => {
  return (
    <header className="border-b border-border bg-surface px-5 py-5 md:px-8 md:py-6">
      <h1 className="font-display text-xl font-semibold text-ink md:text-2xl">
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </header>
  );
};

export default Header;
