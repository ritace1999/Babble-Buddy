import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const conversationInitialState = {
  selectedConversation: null,
  messages: [],
};

// Create conversation slice
const conversationSlice = createSlice({
  name: "conversation",
  initialState: conversationInitialState,
  reducers: {
    setSelectedConversation(state, action) {
      state.selectedConversation = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

// Extract action creators and reducer from the slice
const { actions, reducer: conversationReducer } = conversationSlice;

// Export action creators and reducer
export const { setSelectedConversation, setMessages } = actions;
export default conversationReducer;
