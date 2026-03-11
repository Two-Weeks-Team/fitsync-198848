export default function StatePanel({ state }: { state: 'loading' | 'empty' | 'error' | 'success' }) {
  const messages: Record<string, string> = {
    loading: 'Loading…',
    empty: 'No data available.',
    error: 'Something went wrong. Please try again.',
    success: 'All set!'
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <p className="text-muted">{messages[state] ?? ''}</p>
    </div>
  );
}
