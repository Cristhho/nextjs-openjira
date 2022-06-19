import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const Sidebar = () => {
  return (
    <Drawer
      anchor='left'
      open={false}
      onClose={() => console.log('closeDrawer()')}
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
