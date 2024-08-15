import { Box } from '@mui/material';
import NavDrawer from '@/client/components/NavDrawer';
import ChatBox from '@/client/components/ChatBox';

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Box className="flex flex-col justify-between max-h-screen overflow-hidden ">
        <Box className="w-full">
          <NavDrawer>
            <Box
              sx={{
                // position: 'fixed',

                bottom: 0,
                marginLeft: {
                  xs: '4px', // Margin for extra-small screens
                  sm: '8px', // Margin for small screens
                  md: '12px', // Margin for medium screens
                  lg: '300px', // Margin for large screens
                  xl: '400px', // Margin for extra-large screens
                },
                marginRight: {
                  xs: '4px', // Margin for extra-small screens
                  sm: '8px', // Margin for small screens
                  md: '12px', // Margin for medium screens
                  lg: '300px', // Margin for large screens
                  xl: '400px', // Margin for extra-large screens
                },
              }}
            >
              {children}
              <Box className="flex items-center px-10 pb-10">
                <ChatBox />
              </Box>
            </Box>
          </NavDrawer>
        </Box>
      </Box>
    </section>
  );
}
