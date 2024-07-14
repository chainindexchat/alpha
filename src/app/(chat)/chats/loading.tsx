import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <Box className="flex grow m-0 p-0">
    <Box className="flex flex-col h-full overflow-hidden w-full px-20 max-h-[90vh]">
      <Box className="flex-grow-[9.5] flex items-center justify-center px-10" >
        <CircularProgress />
      </Box>
    </Box>
  </Box>
  }