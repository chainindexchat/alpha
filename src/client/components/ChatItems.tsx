import React from 'react';
import List from '@mui/material/List';
import { Box } from '@mui/material';
import ChatQuestion from './ChatQuestion';
import { zip } from 'lodash';
import ChatAnswer from './ChatAnswer';
export interface ChatItemsProps {
  promptIds: string[];
  sqlGenerationIds: string[];
}
const ChatItems = ({ promptIds, sqlGenerationIds }: ChatItemsProps) => {
  return (
    <List className="w-full">
      {zip(promptIds, sqlGenerationIds).map(
        ([promptId, sqlGenerationId], zipIndex: any) => {
          return (
            <Box key={zipIndex}>
              <ChatQuestion promptId={promptId} />
              {sqlGenerationId && (
                <ChatAnswer sqlGenerationId={sqlGenerationId} />
              )}
            </Box>
          );
        }
      )}
    </List>
  );
};

export default ChatItems;
