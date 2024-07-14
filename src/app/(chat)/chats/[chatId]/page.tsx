
import ChatItems from "@components/ChatItems";
import { Box } from "@mui/material";

async function getChat(chatId: string) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_FQDN}/chats/${chatId}`,
    { next: { tags: ['chat'] } }
  )

  const json = await res.json()

  return { ...json, promptIds: json.promptIds.slice().reverse() };
}

export default async function Page({
  params: { chatId },
}: {
  params: { chatId: string }
}) {

  const { promptIds } = await getChat(chatId);

  return (
    <Box className="flex grow m-0 p-0">
      <Box className="flex flex-col-reverse h-full w-full max-h-[90vh]">
        <Box className="flex-grow-[9] flex items-end justify-center px-0 overflow-scroll" >
          <ChatItems promptIds={promptIds} />
        </Box>
      </Box>
    </Box>
  );
}