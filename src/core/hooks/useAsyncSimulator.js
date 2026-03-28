import { useState, useCallback } from 'react';

/**
 * useAsyncSimulator
 * Wraps an async function with loading / error / data state.
 *
 * Usage:
 *   const { data, loading, error, run } = useAsyncSimulator(myAsyncFn);
 *   useEffect(() => { run(); }, []);
 */
export default function useAsyncSimulator(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: false, error: null });

  const run = useCallback(async (...args) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await asyncFn(...args);
      setState({ data, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: e.message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, run };
}

/**
 * usePersist
 * useState backed by localStorage. Falls back to initial value gracefully.
 *
 * Usage:
 *   const [issues, setIssues] = usePersist('issues_key', []);
 */
export function usePersist(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  const set = useCallback((value) => {
    setVal(value);
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore localStorage write errors */ }
  }, [key]);

  return [val, set];
}
