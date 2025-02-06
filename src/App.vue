<template>
  <div class="app-container">
    <ChatList v-if="!isMobile || !selectedChat" />
    <ChatWindow v-if="!isMobile || selectedChat" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ChatList from "./components/ChatList.vue";
import ChatWindow from "./components/ChatWindow.vue";
import { useChatStore } from "./stores/chatStore";

const chatStore = useChatStore();
const selectedChat = computed(() => chatStore.selectedChat);
const isMobile = ref(window.innerWidth < 768);

const updateMobileStatus = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", updateMobileStatus);
});
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

/* Modo responsivo */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
}
</style>
