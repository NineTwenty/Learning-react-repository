import SplashScreen from 'components/SplashScreen/SplashScreen';
import { useAppDispatch } from 'utils/hooks/hooks';
import { initialization, selectIsAppInitialized } from 'data';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

type ClientInitializerProps = {
  children: JSX.Element;
};

export default function ClientInitializer({
  children,
}: ClientInitializerProps) {
  const isInitialized = useSelector(selectIsAppInitialized);
  const dispatch = useAppDispatch();

  // Initialization
  useEffect(() => {
    if (!isInitialized) {
      void dispatch(initialization());
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  return children;
}
