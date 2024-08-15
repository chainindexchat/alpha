import { Box, ListItem } from '@mui/material';
import { useGetSqlGenerationsQuery } from '../store/chainindexApi';
import ChatAnswerSQL from './ChatAnswerSQL';
import ChatAnswerError from './ChatAnswerError';

const ChatAnswer = ({ sqlGenerationId }: any) => {
  const { data, error } = useGetSqlGenerationsQuery(sqlGenerationId);

  if (!data || error) return null;

  const { engineResponse, error: errorParsed } = data;

  const { sql, error: engineError } = engineResponse;

  return (
    <ListItem className="flex my-1" sx={{ justifyContent: 'flex-start' }}>
      <Box
        className="flex shrink p-2 rounded-3xl"
        sx={{ backgroundColor: '#4d4d4d' }}
      >
        {engineError && <ChatAnswerError error={errorParsed || engineError} />}
        {!engineError && <ChatAnswerSQL sql={sql} />}
      </Box>
    </ListItem>
  );
};
export default ChatAnswer;
