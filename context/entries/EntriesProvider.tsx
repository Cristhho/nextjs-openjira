import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description });

    dispatch({ type: 'Entry - Add Entry', payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar: boolean = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
      dispatch({ type: 'Entry - Update', payload: data });
      enqueueSnackbar('Entrada actualizada', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });
    } catch (error) {
      console.error(error);
    }
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
