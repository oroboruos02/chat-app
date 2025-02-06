# 📝 Chat de Atención al Cliente 📢

Este es un **sistema de chat en tiempo real** diseñado para que los **agentes** puedan interactuar con **clientes** de manera eficiente.

🚀 **Desarrollado con:** Vue 3 + Pinia + CSS puro  
📂 **Persistencia de datos:** `localStorage`

---

## 🛠️ **Características del Proyecto**

✅ **Pantalla de Inicio: Lista de Chats**

- Se muestra una lista de **chats activos** con:
  - Nombre del cliente.
  - Último mensaje enviado.
  - Hora del último mensaje.
- Permite seleccionar un chat para atenderlo.

✅ **Ventana de Chat**

- Muestra el **historial de mensajes** entre el **agente** y el **cliente**.
- El **agente** puede enviar mensajes manualmente.
- El **cliente (simulación)** responde automáticamente con frases predefinidas según palabras clave.
- Se simula el estado **"El cliente está escribiendo..."** antes de responder.

✅ **Notificaciones en Tiempo Real**

- Si el **agente no tiene un chat seleccionado**, se muestra una **notificación visual** cuando llega un nuevo mensaje.

✅ **Diseño Responsivo 📱**

- Funciona perfectamente en **escritorio** y **móviles**.
- Adaptado con **CSS responsivo** para una experiencia fluida.

✅ **Persistencia de Datos 💾**

- Usa `localStorage` para **guardar los chats** y evitar la pérdida de datos al recargar la página.

---

## 🏗️ **Instalación y Configuración**

### 1️⃣ **Clonar el Repositorio**

```sh
git clone https://github.com/t/chat-atencion-cliente.git
cd chat-atencion-cliente
```
