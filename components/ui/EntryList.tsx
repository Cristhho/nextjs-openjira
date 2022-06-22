import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

type EntryListProps = {
  status: EntryStatus;
}

export const EntryList: FC<EntryListProps> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(() => entries.filter((entry) => entry.status === status), [entries]);

  const onDropHandler = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('id');
    
    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  const onDragOverHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={onDropHandler}
      onDragOver={onDragOverHandler}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper sx={{
        height: 'calc(100vh - 250px)',
        overflowY: 'scroll',
        backgroundColor: 'transparent',
        padding: 2
      }}>
        <List sx={{
          opacity: isDragging ? 0.3 : 1,
          transition: 'all .3s'
        }}>
          {
            entriesByStatus.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  );
}
