import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useChatId } from '@/client/lib/chat';
import { Box, CircularProgress } from '@mui/material';
import useEscapeKey from '@/client/lib/keybindings';
import { useRouter } from 'next/router';
import {
  useGetPingQuery,
  usePostPromptMutation,
  usePostSqlGenerationMutation,
  usePutChatMutation,
} from '../store/chainindexApi';

const ChatBox = () => {
  const router = useRouter();
  const { isReady } = router;
  const chatId = useChatId(router);

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const { data, error } = useGetPingQuery();
  React.useEffect(() => {
    if (!data || error) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [data, error, chatId]);
  const onChange = useCallback(
    (event: any) => setValue(event.target.value),
    []
  );
  const onClear = useCallback(() => setValue(''), []);

  const [putChat] = usePutChatMutation();
  const [postPrompt] = usePostPromptMutation();
  const [postSqlGeneration] = usePostSqlGenerationMutation();

  const onSubmit = useCallback(async () => {
    if (!chatId) return;
    setLoading(true);
    const { data, error } = await postPrompt({ chatId, text: value });
    if (!data || error) {
      setLoading(false);
      console.log('failed to post prompt');
      return;
    }

    const { prompt } = data;

    // update chat title with last prompt message
    await putChat({ chatId, body: { title: prompt.text } });

    const { data: sqlData, error: sqlError } = await postSqlGeneration({
      chatId,
      promptId: prompt.id,
      promptEngineId: prompt.engineResponseId,
    });
    if (!sqlData || sqlError) {
      setLoading(false);
      console.log('failed to post sql generation');
      return;
    }

    setLoading(false);
    setValue('');
  }, [chatId, value, isReady]);
  useEscapeKey(onSubmit);
  return (
    <Box
      className="w-full"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '500px',
      }}
    >
      <TextField
        disabled={!chatId || loading || !isAuthenticated}
        variant="outlined"
        value={value}
        onChange={onChange}
        placeholder="Ask a question..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {!loading && (
                <IconButton
                  onClick={onSubmit}
                  disabled={!chatId || loading || !isReady || !isAuthenticated}
                >
                  <SearchIcon />
                </IconButton>
              )}
              {loading && <CircularProgress />}
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                onClick={onClear}
                disabled={!chatId || loading || !isReady || !isAuthenticated}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </Box>
  );
};

export default ChatBox;
