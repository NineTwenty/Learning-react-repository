import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'data/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useReferrerPath(): string {
  // Get redirected page path
  const location = useLocation();
  const state = location.state as
    | {
        referrer: string;
      }
    | undefined;
  const path = state?.referrer;

  if (path && path !== '/') return path;
  // Default redirect path
  return '/profile';
}

/**
 * Wrapper to avoid repetitive string to number conversions
 */

export function useIdParam(): number | undefined {
  const { id } = useParams();
  return id !== undefined ? +id : undefined;
}
