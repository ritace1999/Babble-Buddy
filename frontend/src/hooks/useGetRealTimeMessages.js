import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSocketContext } from "@context/socketContext";
import { setMessages } from "@store/reducers/conversationReducer";

const useGetRealTimeMessages = () => {
  const { socket } = useSocketContext();
  const { messages } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });

    return () => socket?.off("newMessage");
  }, [socket, dispatch, messages]);
};
export default useGetRealTimeMessages;
