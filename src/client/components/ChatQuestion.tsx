import { Box, ListItem, ListItemText } from '@mui/material';
import { useGetPromptQuery } from '../store/chainindexApi';

const ChatQuestion = ({ promptId }: any) => {
  const { data, error } = useGetPromptQuery(promptId);
  if (!data || error) return null;

  const { prompt } = data;
  return (
    <>
      <ListItem className="flex my-1" sx={{ justifyContent: 'flex-end' }}>
        <Box
          className="flex shrink p-2 rounded-3xl"
          sx={{ backgroundColor: '#4d4d4d' }}
        >
          <ListItemText primary={`${prompt.text}`} />
        </Box>
      </ListItem>
    </>
  );
};
export default ChatQuestion;
