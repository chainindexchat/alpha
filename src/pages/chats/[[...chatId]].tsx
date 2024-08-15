import ChatItems from '@/client/components/ChatItems';
import Layout from '@/client/components/layout/Layout';
import { Box } from '@mui/material';
import { ReactElement } from 'react';
import { wrapper } from '@/client/store';
import { useGetChatQuery } from '@/client/store/chainindexApi';

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context: any) => {
    try {
      const {
        query: { chatId },
      } = context;

      if (!chatId) {
        return { props: {} };
      }
      // TODO enable ssr
      // store.dispatch(chainindexApi.endpoints.getChat.initiate(chatId));
      // await Promise.all(
      //   store.dispatch(chainindexApi.util.getRunningQueriesThunk())
      // );

      return {
        props: {
          chatId,
        },
      };
    } catch (e) {
      console.log(e);
      return { redirect: { destination: '/500', permanent: false } };
    }
  }
);

export default function ChatPage(props: { chatId: string }) {
  // TODO hydrate from redux wrapper here

  const { chatId } = props;
  const { data, error } = useGetChatQuery(chatId);

  if (!data || error) return null;

  const { promptIds, sqlGenerationIds } = data;
  if (!promptIds) return null;
  if (!sqlGenerationIds) return null;
  return (
    <Box className="flex grow m-0 p-0">
      <Box className="flex flex-col-reverse h-full w-full max-h-[90vh]">
        <Box className="flex-grow-[9] flex items-end justify-center px-0 overflow-scroll">
          <ChatItems
            promptIds={promptIds}
            sqlGenerationIds={sqlGenerationIds}
          />
        </Box>
      </Box>
    </Box>
  );
}
ChatPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
