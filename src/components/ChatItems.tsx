import React from 'react';
import List from '@mui/material/List';
import {  Box } from '@mui/material';
import ChatQuestion from './ChatQuestion';

const ChatItems = ({ promptIds}: any) => {
  
  return (
    <List className="w-full" >
      {promptIds.map((promptId:any, promptIndex: any) => {
        return (
        <Box key={promptIndex}>
          <ChatQuestion promptId={promptId}/>
        </Box>
      )})}
    </List>
  );
};

export default ChatItems;
