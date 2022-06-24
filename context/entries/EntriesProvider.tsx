import { FC, PropsWithChildren, useEffect, useReducer } from 'react';

import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../api';

export interface EntriesState {
  entries: Entry[];
}

const  ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description });

    dispatch({ type: 'Entry - Add Entry', payload: data });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: 'Entry - Update', payload: entry });
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: 'Entry - Get All', payload: data });
  }

  useEffect(() => {
    refreshEntries();
  }, []);
  

  return (
    <EntriesContext.Provider value={{
      ...state,
      addEntry,
      updateEntry
    }}>
      {children}
    </EntriesContext.Provider>
  );
}
