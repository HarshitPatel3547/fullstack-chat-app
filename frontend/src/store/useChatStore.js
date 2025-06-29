
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      console.log("🔍 Fetching users from /messages/users");
      const res = await axiosInstance.get("/messages/users");
      console.log("✅ API Response:", res);
      console.log("📊 Users data:", res.data);
      console.log("📈 Number of users:", res.data?.length);
      set({ users: res.data });
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      console.error("📝 Error response:", error.response?.data);
      console.error("🔢 Error status:", error.response?.status);
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // getMessages: async (userId) => {
  //   set({ isMessagesLoading: true });
  //   try {
  //     const res = await axiosInstance.get(`/messages/${userId}`);
  //     set({ messages: res.data });
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   } finally {
  //     set({ isMessagesLoading: false });
  //   }
  // },
    getMessages: async (userId) => {
  if (!userId) {
    console.warn("getMessages called without userId");
    toast.error("No user selected.");
    return;
  }
  set({ isMessagesLoading: true });
  try {
    const res = await axiosInstance.get(`/messages/${userId}`);
    set({ messages: res.data });
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch messages");
  } finally {
    set({ isMessagesLoading: false });
  }
},
  //   sendMessage: async (messageData) => {
  //   const { selectedUser, messages } = get();
  //   try {
  //     const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
  //     set({ messages: [...messages, res.data] });
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // },
    sendMessage: async (messageData) => {
  const { selectedUser, messages } = get();
  if (!selectedUser?._id) {
    console.warn("sendMessage called without a selectedUser");
    toast.error("No user selected.");
    return;
  }
  try {
    const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
    set({ messages: [...messages, res.data] });
  } catch (error) {
    toast.error(error.response?.data?.message || "Message sending failed");
  }
},
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
    
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
