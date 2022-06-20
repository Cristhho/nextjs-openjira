import { useContext } from 'react';
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);
  return (
    <Drawer
      anchor='left'
      open={sideMenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{
        padding: '5px 10px',
        width: 250
      }}>
        <Typography variant='h4'>Menú</Typography>
      </Box>

      <List>
        {
          menuItems.map((item, index) => (
            <ListItemButton key={item}>
              <ListItemIcon>
                { index % 2 === 0 ? <InboxIcon /> : <MailIcon /> }
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          ))
        }
      </List>

      <Divider />

      <List>
        {
          menuItems.map((item, index) => (
            <ListItemButton key={item}>
              <ListItemIcon>
                { index % 2 === 0 ? <InboxIcon /> : <MailIcon /> }
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          ))
        }
      </List>
    </Drawer>
  );
};
