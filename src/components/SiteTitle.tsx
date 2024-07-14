

import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LinkIcon from '@mui/icons-material/Link';
import ListItemText from '@mui/material/ListItemText';
import { ListItemIcon } from '@mui/material';

const SiteTitle = () => {
  return (
    <List className="p-0">
      <ListItem button>
        <ListItemIcon><LinkIcon /></ListItemIcon>
        <ListItemText primary={'ChainIndexChat'} />
      </ListItem>
    </List>
  );
};

export default SiteTitle;
