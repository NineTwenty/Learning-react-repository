import { User } from 'common/entities.types';
import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from 'redux/entities';
import { selectCurrentUserId } from '../redux';

const currentUserContext = React.createContext<User | undefined>(undefined);

type CurrentUserProviderProps = {
  children: React.ReactNode;
};

export const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const assignError = new Error(
    'Attempt to assign value while user not authorized'
  );

  // Get user id
  const id = useSelector(selectCurrentUserId);

  if (!id) throw assignError;

  // Get user
  const currentUser = useSelector(selectUserById(id));

  if (!currentUser) throw assignError;

  return (
    <currentUserContext.Provider value={currentUser}>
      {children}
    </currentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const currentUser = useContext(currentUserContext);

  if (currentUser === undefined) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }

  return currentUser;
};
