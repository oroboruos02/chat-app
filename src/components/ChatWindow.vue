<template>
  <div class="chat-window">
    <button v-if="isMobile" @click="goBack" class="back-button">
      ⬅ Volver
    </button>

    <h2>{{ selectedChat ? selectedChat.name : "Selecciona un chat" }}</h2>

    <div v-if="selectedChat" class="chat-messages">
      <div
        v-for="message in selectedChat.messages"
        :key="message.id"
        :class="['chat-message', message.sender]"
      >
        <span class="message-text">{{ message.text }}</span>
        <span class="message-time">{{ message.time }}</span>
      </div>
      <div v-if="isTyping" class="typing-indicator">
        El cliente está escribiendo...
      </div>
    </div>

    <div v-else class="no-chat-selected">
      <p>Selecciona un chat para ver los mensajes</p>
    </div>

    <div v-if="selectedChat" class="chat-input">
      <input
        v-model="newMessage"
        placeholder="Escribe un mensaje..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage" class="send-button">Enviar</button>
    </div>

    <!-- 📌 Respuestas rápidas del agente -->
    <div v-if="selectedChat" class="quick-replies">
      <button
        v-for="reply in quickReplies"
        :key="reply"
        @click="sendQuickReply(reply)"
        class="quick-reply-button"
      >
        {{ reply }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useChatStore } from "../stores/chatStore";

const chatStore = useChatStore();
const selectedChat = computed(() => chatStore.selectedChat);
const newMessage = ref("");
const isTyping = ref(false);
const quickReplies = [
  "¡Hola! ¿En qué puedo ayudarte?",
  "¿Necesitas asistencia?",
  "Ok",
  "¿Requieres soporte técnico?",
];
const isMobile = ref(window.innerWidth < 768);

const updateMobileStatus = () => {
  isMobile.value = window.innerWidth < 768;
};

// 📌 Cargar mensajes almacenados en `localStorage`
onMounted(() => {
  window.addEventListener("resize", updateMobileStatus);
  chatStore.loadMessagesFromStorage();
});

// 📌 Guardar mensajes en `localStorage` cada vez que cambian
watch(() => chatStore.chats, chatStore.saveMessagesToStorage, { deep: true });

onUnmounted(() => {
  window.removeEventListener("resize", updateMobileStatus);
});

const goBack = () => {
  chatStore.selectedChat = null;
};

// 📌 Enviar mensaje desde el agente y simular respuesta automática del cliente
const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedChat.value) return;

  const chatId = selectedChat.value.id;
  const text = newMessage.value.trim();
  newMessage.value = "";

  // ✅ El agente envía el mensaje manualmente
  chatStore.sendMessage(chatId, text, "agent");

  isTyping.value = true; // Simula que el cliente está escribiendo

  setTimeout(() => {
    // 📌 Lista de respuestas inteligentes del cliente
    const clientReplies = [
      {
        keywords: ["hola", "buenos días"],
        response: "¡Hola! ¿Me darias mas información?",
      },
      {
        keywords: ["ayuda", "asistencia"],
        response: "Sí, necesito ayuda con un problema.",
      },
      {
        keywords: ["problema", "error"],
        response: "Estoy teniendo un problema con el servicio.",
      },
      {
        keywords: ["precio", "costo"],
        response: "¿Puedes decirme cuánto cuesta este servicio?",
      },
      {
        keywords: ["gracias", "ok"],
        response: "¡Gracias a ti por tu ayuda!",
      },
      {
        keywords: ["soporte", "técnico"],
        response: "¿Cómo puedo contactar con el soporte técnico?",
      },
    ];

    let reply = "No estoy seguro de qué responder, ¿puedes explicarme mejor?";

    // 📌 Busca una respuesta que coincida con el mensaje del agente
    for (let item of clientReplies) {
      if (item.keywords.some((word) => text.toLowerCase().includes(word))) {
        reply = item.response;
        break;
      }
    }

    // ✅ El cliente responde automáticamente
    chatStore.receiveMessage(chatId, reply, "client");
    isTyping.value = false;
  }, 2000);
};

// 📌 Enviar respuesta rápida
const sendQuickReply = (text) => {
  newMessage.value = text;
  sendMessage();
};
</script>

<style scoped>
.chat-window {
  width: 70%;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Botón de volver en móviles */
.back-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  width: fit-content;
  transition: background 0.3s ease, transform 0.2s;
}

.back-button:hover {
  background: #0056b3;
  transform: scale(1.05);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 10px;
}

.chat-message {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 8px;
  max-width: 75%;
  margin-bottom: 10px;
  font-size: 1rem;
  word-wrap: break-word;
}

.chat-message.agent {
  background: #007bff; /* Azul */
  color: white;
  align-self: flex-end;
}

.chat-message.client {
  background: #e0e0e0; /* Gris */
  color: black;
  align-self: flex-start;
}

.message-text {
  font-size: 1rem;
}

.message-time {
  font-size: 0.75rem;
  color: gray;
  text-align: right;
  margin-top: 4px;
}

.typing-indicator {
  font-style: italic;
  color: gray;
}

.chat-input {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.chat-input button {
  background: #007bff;
  color: white;
  padding: 12px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.chat-input button:hover {
  background: #0056b3;
}

/* Botones de respuestas rápidas */
.quick-replies {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
}

.quick-reply-button {
  background: #f8f9fa;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.quick-reply-button:hover {
  background: #007bff;
  color: white;
}

@media (max-width: 768px) {
  .chat-window {
    width: 100%;
    height: 100vh;
    padding: 15px;
  }
}
</style>
