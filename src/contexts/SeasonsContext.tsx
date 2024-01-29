import React from 'react';

import { SeasonsListDataType } from '../interfaces/types';

interface SeasonsListContextProps {
  season: SeasonsListDataType | null;
  setSeason: React.Dispatch<React.SetStateAction<SeasonsListDataType | null>>;
}

export const SeasonsListContext = React.createContext<SeasonsListContextProps>({
    season: null,
    setSeason: () => {},
});