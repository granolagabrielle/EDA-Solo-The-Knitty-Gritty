import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import GestureRoundedIcon from '@mui/icons-material/GestureRounded';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import BungalowRoundedIcon from '@mui/icons-material/BungalowRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import './MuiDrawer.css';

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
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navToPage = (text) => {
    console.log('submit clicked');
    if (text === 'Yarn Stash') {
      history.push('/yarn');
      setOpen(false);
    } else if (text === 'Add Yarn') {
      history.push('/addyarn');
      setOpen(false);
    } else if (text === 'Pattern Library') {
      history.push('/patterns');
      setOpen(false);
    } else if (text === 'Add Pattern') {
      history.push('/addpattern');
      setOpen(false);
    } else if (text === 'Project Tracker') {
      history.push('/projects');
      setOpen(false);
    } else if (text === 'Start New Project') {
      history.push('/addproject');
      setOpen(false);
    } else if (text === 'Log Out') {
      dispatch({ type: 'LOGOUT' });
      setOpen(false);
    } else if (text === 'Home') {
      history.push('/home');
      setOpen(false);
    }
  };

  const goHome = () => {
    history.push('/home');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open} style={{ backgroundColor: 'darkslategrey' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div' onClick={goHome}>
            The Knitty Gritty
          </Typography>
        </Toolbar>
      </AppBar>
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
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
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
