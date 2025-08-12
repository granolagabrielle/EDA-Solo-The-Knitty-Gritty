import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import GestureRoundedIcon from '@mui/icons-material/GestureRounded';
import BungalowRoundedIcon from '@mui/icons-material/BungalowRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './MuiDrawer.css';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navToPage = (text) => {
    switch (text) {
      case 'Yarn Stash':
        history.push('/yarn');
        break;
      case 'Add Yarn':
        history.push('/addyarn');
        break;
      case 'Pattern Library':
        history.push('/patterns');
        break;
      case 'Add Pattern':
        history.push('/addpattern');
        break;
      case 'Project Tracker':
        history.push('/projects');
        break;
      case 'Start New Project':
        history.push('/addproject');
        break;
      case 'Log Out':
        dispatch({ type: 'LOGOUT' });
        break;
      case 'Home':
        history.push('/home');
        break;
    }
  };

  const goHome = () => {
    history.push('/home');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader className='app-name-container'>
          <Typography className='app-name' variant='h6' noWrap component='div' onClick={goHome}>
            The Knitty Gritty
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 1 === 0 ? <BungalowRoundedIcon /> : ''}</ListItemIcon>
                <ListItemText primary={text} onClick={() => navToPage(text)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Yarn Stash', 'Add Yarn'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <GestureRoundedIcon /> : <AddToPhotosRoundedIcon />}</ListItemIcon>
                <ListItemText primary={text} onClick={() => navToPage(text)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Pattern Library', 'Add Pattern'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InventoryIcon /> : <AddToPhotosRoundedIcon />}</ListItemIcon>
                <ListItemText primary={text} onClick={() => navToPage(text)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Project Tracker', 'Start New Project'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <ChecklistRoundedIcon /> : <AddToPhotosRoundedIcon />}</ListItemIcon>
                <ListItemText primary={text} onClick={() => navToPage(text)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Log Out'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 1 === 0 ? <LogoutIcon /> : ''}</ListItemIcon>
                <ListItemText primary={text} onClick={() => navToPage(text)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}></Main>
    </Box>
  );
}
