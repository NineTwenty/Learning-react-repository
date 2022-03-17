import { User } from 'common/entities.types';
import React, { useContext } from 'react';

import { useSelector } from 'react-redux';
import { selectUserById } from 'data/entities';
import { selectCurrentUserId } from 'data';

const currentUserContext = React.createContext<User | undefined>(undefined);

type CurrentUserProviderProps = {
  children: React.ReactNode;
};

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
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
}

export const useCurrentUser = () => {
  const currentUser = useContext(currentUserContext);

  if (currentUser === undefined) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }

  return currentUser;
};
