import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { Tooltip } from '@mui/material';
import { useGetPingQuery, usePostChatMutation } from '../store/chainindexApi';
import { isNil } from 'lodash';
import ChatList from './ChatList';
import WalletConnect from './WalletConnect';

import CustomImage from './CustomImage';

const drawerWidth = 240;

const Main = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

export default function PersistentDrawerLeft({ children }: any) {
  const theme = useTheme();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const { data, error } = useGetPingQuery();
  React.useEffect(() => {
    if (!data || error) {
      console.log('error', error);
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [data, error]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [postChat] = usePostChatMutation();
  const handleCreateChat = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await postChat({ title: 'hello world' });
    if (!data || error) {
      setLoading(false);
      console.log('failed to post chat');
      return;
    }
    const { chat } = data;
    if (!isNil(chat)) router.push(`/chats/${chat.id}`);
    setLoading(false);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ '&.MuiToolbar-root': { paddingLeft: open ? 0 : 3 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: 'none' }),
            }}
            disabled={!isAuthenticated}
          >
            <MenuIcon />
          </IconButton>
          <Tooltip title="New chat">
            <div>
              <LoadingButton
                size="small"
                variant="contained"
                sx={{ marginLeft: 2, marginRight: 2 }}
                onClick={handleCreateChat}
                loading={loading}
                disabled={!isAuthenticated}
              >
                <CustomImage
                  src="/img/favicon.ico"
                  width={25}
                  height={25}
                  alt="ChainIndexChat"
                />
              </LoadingButton>
            </div>
          </Tooltip>
          <Link href={`/chats`}>
            <Typography variant="h6" noWrap component="div">
              ChainIndexChat
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <WalletConnect />
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
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ChatList open={open} />
      </Drawer>
      <Main
        open={open}
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
