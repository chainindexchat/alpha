import { Box, ListItem, ListItemText } from "@mui/material";
import ChatAnswer from "./ChatAnswer";

async function getPrompt(promptId:string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_FQDN}/prompts/${promptId}`)

    const json = res.json()
    
    return json;
  }
  
const ChatQuestion = async ({promptId}:any)=>{
    const {prompt, sqlGenerationIds} = await getPrompt(promptId);
    
        return <>
          <ListItem  className="flex my-1" sx={{ justifyContent:"flex-end"}}>
            <Box className="flex shrink p-2 rounded-3xl"sx={{ backgroundColor: "#4d4d4d"}}>
            <ListItemText primary={`${prompt.text}`}/>
            </Box>
          </ListItem>
          <ChatAnswer sqlGenerationIds={sqlGenerationIds}/>
          </>
}
export default ChatQuestion;