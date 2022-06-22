import { createContext } from 'react';

export interface UIContextProps {
  sideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  isAddingEntry: boolean;
  setIsAddingEntry: (isAdding: boolean) => void;
  isDragging: boolean;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as UIContextProps);
