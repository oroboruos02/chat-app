<template>
  <div class="chat-list">
    <h2>Chats Activos</h2>
    <div
      v-for="chat in chats"
      :key="chat.id"
      class="chat-item"
      :class="{ active: chat.id === selectedChat?.id }"
      @click="selectChat(chat)"
    >
      <div class="chat-info">
        <strong class="chat-name">{{ chat.name }}</strong>
        <span v-if="chat.messages.length" class="message-time">
          {{ chat.messages[chat.messages.length - 1].time }}
        </span>
      </div>
      <p class="last-message">
        {{
          chat.messages.length
            ? chat.messages[chat.messages.length - 1].text
            : "Sin mensajes"
        }}
      </p>
      <span v-if="chat.unread" class="notification-dot"></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useChatStore } from "../stores/chatStore";

const chatStore = useChatStore();
const chats = computed(() => chatStore.chats);
const selectedChat = computed(() => chatStore.selectedChat);

const selectChat = (chat) => {
  chatStore.selectChat(chat);
};
</script>

<style scoped>
.chat-list {
  width: 30%;
  background: #1c1c1c;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 📌 Estilos generales de los chats */
.chat-item {
  background: #2a2a2a;
  padding: 14px;
  margin: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s;
  position: relative;
  display: flex;
  flex-direction: column;
}

.chat-item:hover {
  background: #444;
}

.chat-item.active {
  background: #007bff;
  color: white;
  transform: scale(1.02);
  box-shadow: 0px 0px 15px rgba(0, 123, 255, 0.6);
}

/* 📌 Información del chat */
.chat-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-name {
  font-size: 1rem;
  font-weight: bold;
}

.message-time {
  font-size: 0.85rem;
  color: #bbb;
}

/* 📌 Último mensaje más legible */
.last-message {
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}

/* 📌 Notificación de mensaje no leído con animación */
.notification-dot {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  position: absolute;
  top: 12px;
  right: 12px;
  box-shadow: 0 0 6px rgba(255, 0, 0, 0.8);
  animation: pulse 1.5s infinite alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

/* 📌 Diseño móvil mejorado */
@media (max-width: 768px) {
  .chat-list {
    width: 90%;
    height: auto;
    padding: 15px;
    max-height: 50vh;
  }

  .chat-item {
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }

  .chat-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .chat-name {
    font-size: 1rem;
    font-weight: bold;
  }

  .message-time {
    font-size: 0.85rem;
    color: #bbb;
    text-align: right;
  }

  .last-message {
    font-size: 0.9rem;
    color: #ddd;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 5px;
  }

  .notification-dot {
    width: 10px;
    height: 10px;
    top: 10px;
    right: 10px;
  }
}
</style>
