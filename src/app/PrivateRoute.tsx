import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedInStatus } from 'data';

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const loggedIn = useSelector(selectLoggedInStatus);
  const { component, render, exact, path, strict, sensitive } = rest;
  return (
    <Route
      {...{ component, render, exact, path, strict, sensitive }}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { referrer: location },
            }}
          />
        )
      }
    />
  );
}
