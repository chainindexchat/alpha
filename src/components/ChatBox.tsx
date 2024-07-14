'use client'
import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { usePathname } from 'next/navigation';
import { useChatId } from '@lib/chat';
import { Box, CircularProgress } from '@mui/material';
import useEscapeKey from '@lib/keybindings';
import revalidateChat from '@lib/actions';

const ChatBox = () => {
  const pathname = usePathname();
  const chatId = useChatId({ pathname });
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const onChange = useCallback((event: any) => setValue(event.target.value), []);
  const onClear = useCallback(() => setValue(""), []);
  const onSubmit = useCallback(async () => {
    setLoading(true);
    const resPrompt = await fetch('/api/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, text: value }),
    });
    const { prompt } = await resPrompt.json();
    fetch(`/api/chats/${chatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: value }),
    });
    const resSql = await fetch('/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, promptId: prompt.id, promptEngineId: prompt.engineResponseId, text: value }),
    });
    await resSql.json();

    revalidateChat();
    setLoading(false);
    setValue("");
  }, [value]);
  useEscapeKey(onSubmit)
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

        disabled={!chatId || loading}
        variant="outlined"
        value={value}
        onChange={onChange}
        placeholder="Ask a question..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {!loading && <IconButton onClick={onSubmit} disabled={!chatId || loading}>
                <SearchIcon />
              </IconButton>}
              {loading && <CircularProgress />}
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton onClick={onClear} disabled={!chatId || loading}>
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
