

import { Box } from '@mui/material';
import NavDrawer from '@components/NavDrawer';
import ChatBox from '@components/ChatBox';


async function getAllChats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_FQDN}/chats`);

    const json = await res.json();

    const chatsSorted = json?.chats?.slice().sort((a: any, b: any) => {
      return (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any);
    }) || [];

    return { chats: chatsSorted };
  } catch (e) {
    return Response.error();
  }
}

export default async function ChatsEmpty({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const data = await getAllChats()
  const { chats } = data as { chats: any };
  return (
    <section>
      <Box className="flex flex-col justify-between max-h-screen overflow-hidden ">
        <Box className="w-full">
          <NavDrawer navItems={chats}>
            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                marginLeft: {
                  xs: '4px',  // Margin for extra-small screens
                  sm: '8px', // Margin for small screens
                  md: '12px', // Margin for medium screens
                  lg: '300px', // Margin for large screens
                  xl: '400px', // Margin for extra-large screens
                },
                marginRight: {
                  xs: '4px',  // Margin for extra-small screens
                  sm: '8px', // Margin for small screens
                  md: '12px', // Margin for medium screens
                  lg: '300px', // Margin for large screens
                  xl: '400px', // Margin for extra-large screens
                },
              }}>

              {children}
              <Box className="flex items-center px-10 pb-10">
                <ChatBox />
              </Box>
            </Box>
          </NavDrawer>
        </Box>
      </Box>
    </section>
  )
}