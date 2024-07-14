import { Box, ListItem } from "@mui/material";
import ChatAnswerSQL from "./ChatAnswerSQL";
import ChatAnswerError from "./ChatAnswerError";

async function getSqlGeneration(sqlGenerationId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_FQDN}/sql_generations/${sqlGenerationId}`)

  return res.json()
}

const ChatAnswer = async ({ sqlGenerationIds }: any) => {
  const firstId = sqlGenerationIds[0] || null;
  if (!firstId) return null;
  const { engineResponse, error: errorParsed } = await getSqlGeneration(firstId);
  const { sql, error: engineError } = engineResponse;

  return <>
    <ListItem className="flex my-1" sx={{ justifyContent: "flex-start" }}>
      <Box className="flex shrink p-2 rounded-3xl" sx={{ backgroundColor: "#4d4d4d" }}>
        {engineError && <ChatAnswerError error={errorParsed || engineError} />}
        {!engineError && <ChatAnswerSQL sql={sql} />}
      </Box>
    </ListItem>
  </>
}
export default ChatAnswer;