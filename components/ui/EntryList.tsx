import { List, Paper } from '@mui/material';

import { EntryCard } from './EntryCard';

export const EntryList = () => {
  return (
    <div>
      <Paper sx={{
        height: 'calc(100vh - 250px)',
        overflowY: 'scroll',
        backgroundColor: 'transparent',
        padding: 2
      }}>
        <List sx={{
          opacity: 1
        }}>
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
        </List>
      </Paper>
    </div>
  );
}
