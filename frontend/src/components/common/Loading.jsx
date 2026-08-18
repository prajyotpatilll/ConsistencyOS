const Loading = ({ label = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default Loading;
