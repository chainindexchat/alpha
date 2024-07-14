'use client';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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
import ListItemText from '@mui/material/ListItemText';
import LoadingButton from '@mui/lab/LoadingButton';
import { usePathname, useRouter } from 'next/navigation';
import { useChatId } from '@lib/chat';
import { Add, AddLink } from '@mui/icons-material';
import Link from 'next/link';
import { Tooltip } from '@mui/material';

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

export default function PersistentDrawerLeft({ children, navItems }: any) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const chatId = useChatId({ pathname })

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleCreateChat = React.useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: "" }),
    });
    const json = await res.json();
    if (json.status === "success") router.push(`/chats/${json.chat.id}`)
    setLoading(false);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ "&.MuiToolbar-root": { paddingLeft: open ? 0 : 3 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Tooltip title="New chat">
          <LoadingButton size="small" variant="contained" sx={{ marginLeft: 2, marginRight: 2 }} onClick={handleCreateChat} loading={loading}>
            <Add />
          </LoadingButton>
          </Tooltip>
          <Link href={`/chats`}>
            <Typography variant="h6" noWrap component="div">
              ChainIndexChat
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Coming soon...">

            <LoadingButton size="small" variant="contained" sx={{ marginLeft: 2, marginRight: 0, position: "relative" }} onClick={() => { }} loading={loading}>
              <AddLink /> Connect
            </LoadingButton>
          </Tooltip>
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
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ paddingTop: 0 }}>
          {navItems?.map(({ title, chatId: id }: any, index: number) => (

            <ListItem key={index} disablePadding sx={{ display: 'block' }} selected={id === chatId}>
              <Link key={index} href={`/chats/${id}`}>

                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >


                  {open && (<ListItemText primary={<Typography className="truncate" style={{
                    fontSize: '0.8rem', overflow: 'hidden', whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}>{title}</Typography>} className="text-sm" />
                  )}

                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} sx={{ height: "100vh", display: 'flex', flexDirection: "column", justifyContent: 'space-between', flexGrow: 1 }}>

        <DrawerHeader />
        {children}

      </Main>
    </Box>
  );
}
