import React from 'react';

import { UserDataType } from '../interfaces/types';

interface LoginContextProps {
  user: UserDataType | null;
  setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>;
}

export const LoginContext = React.createContext<LoginContextProps>({
  user: null,
  setUser: () => {},
});