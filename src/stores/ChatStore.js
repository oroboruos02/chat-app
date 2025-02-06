import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    chats: JSON.parse(localStorage.getItem("chatData")) || [
      // 📌 Cargar desde localStorage si existe
      {
        id: 1,
        name: "Carlos",
        messages: [{ sender: "client", text: "Hola", time: "10:00 AM" }],
        unread: false,
      },
      {
        id: 2,
        name: "Juan",
        messages: [
          { sender: "client", text: "Tengo una consulta.", time: "10:05 AM" },
        ],
        unread: false,
      },
    ],
    selectedChat: null,
  }),

  actions: {
    selectChat(chat) {
      this.selectedChat = chat;
      chat.unread = false; // Marcar como leído al abrirlo
      this.saveMessagesToStorage(); // 📌 Guardar cambios
    },

    sendMessage(chatId, text) {
      const chat = this.chats.find((c) => c.id === chatId);
      if (chat) {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        chat.messages.push({
          sender: "agent",
          text,
          time: formattedTime,
        });

        this.saveMessagesToStorage(); // 📌 Guardar cambios
      }
    },

    receiveMessage(chatId, text) {
      const chat = this.chats.find((c) => c.id === chatId);
      if (chat) {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        chat.messages.push({
          sender: "client",
          text,
          time: formattedTime,
        });

        if (!this.selectedChat || this.selectedChat.id !== chatId) {
          chat.unread = true;
        }

        this.saveMessagesToStorage(); // 📌 Guardar cambios
      }
    },

    // 📌 Guardar mensajes en localStorage cada vez que se actualicen
    saveMessagesToStorage() {
      localStorage.setItem("chatData", JSON.stringify(this.chats));
    },

    // 📌 Cargar mensajes al iniciar la aplicación
    loadMessagesFromStorage() {
      const savedChats = localStorage.getItem("chatData");
      if (savedChats) {
        this.chats = JSON.parse(savedChats);
      }
    },
  },
});
