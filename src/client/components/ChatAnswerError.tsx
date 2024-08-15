const ChatAnswerError = ({ error }: any) => {
  return (
    <>
      <code>{error?.error?.code || error}</code>
    </>
  );
};

export default ChatAnswerError;
