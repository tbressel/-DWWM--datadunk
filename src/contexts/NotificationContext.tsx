import React from 'react';

import { NotificationDataType } from '../interfaces/types';

interface NotificationContextProps {
  msg: NotificationDataType | null;
  setMsg: React.Dispatch<React.SetStateAction<NotificationDataType | null>>;
}

export const NotificationContext = React.createContext<NotificationContextProps>({
  msg: null,
  setMsg: () => {},
});