import React from 'react';

import { User } from '../interfaces/types';

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});