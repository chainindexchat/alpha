import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useChatId } from '../lib/chat';
import { useGetAllChatsQuery } from '../store/chainindexApi';

export default function ChatList({ open }: { open: boolean }) {
  const router = useRouter();
  const chatId = useChatId(router);

  const { data, error } = useGetAllChatsQuery();
  if (!data || error) return null;

  const { chats } = data;

  return (
    <List sx={{ paddingTop: 0 }}>
      {chats?.map(({ title, chatId: id }: any, index: number) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: 'block' }}
          selected={id === chatId}
        >
          <Link key={index} href={`/chats/${id}`}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              {open && (
                <ListItemText
                  primary={
                    <Typography
                      className="truncate"
                      style={{
                        fontSize: '0.8rem',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {title}
                    </Typography>
                  }
                  className="text-sm"
                />
              )}
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
