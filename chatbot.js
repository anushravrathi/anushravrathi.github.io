(() => {
    const chatbotCSS = `
      .chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 300px;
        font-family: Arial, sans-serif;
      }
  
      .chatbot-toggle {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
      }
  
      .chat-window {
        background: white;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
  
      .chat-header {
        background: #007bff;
        color: white;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
  
      .chat-body {
        height: 250px;
        overflow-y: auto;
        padding: 10px;
      }
  
      .message {
        padding: 8px;
        margin: 5px;
        border-radius: 5px;
        max-width: 80%;
      }
  
      .user {
        background: #007bff;
        color: white;
        align-self: flex-end;
      }
  
      .bot {
        background: #f1f1f1;
        color: black;
        align-self: flex-start;
      }
  
      .chat-input {
        display: flex;
        padding: 10px;
        border-top: 1px solid #ddd;
      }
  
      .chat-input input {
        flex: 1;
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
  
      .chat-input button {
        background: #007bff;
        color: white;
        border: none;
        padding: 5px 10px;
        margin-left: 5px;
        cursor: pointer;
      }
    `;
  
    function injectStyles() {
      const style = document.createElement("style");
      style.innerHTML = chatbotCSS;
      document.head.appendChild(style);
    }
  
    function createChatbot() {
      const container = document.createElement("div");
      container.classList.add("chatbot-container");
      container.innerHTML = `
        <button class="chatbot-toggle">Chat with us!</button>
        <div class="chat-window" style="display: none;">
          <div class="chat-header">
            <h3>Chat with us!</h3>
            <button onclick="this.parentElement.parentElement.style.display = 'none'">✖</button>
          </div>
          <div class="chat-body"></div>
          <div class="chat-input">
            <input type="text" placeholder="Write a message..." id="chat-input-field">
            <button id="chat-send-btn">Send</button>
          </div>
        </div>
      `;
  
      document.body.appendChild(container);
  
      const toggleButton = container.querySelector(".chatbot-toggle");
      const chatWindow = container.querySelector(".chat-window");
      const chatBody = container.querySelector(".chat-body");
      const inputField = container.querySelector("#chat-input-field");
      const sendButton = container.querySelector("#chat-send-btn");
  
      toggleButton.addEventListener("click", () => {
        chatWindow.style.display = chatWindow.style.display === "none" ? "block" : "none";
      });
  
      sendButton.addEventListener("click", sendMessage);
      inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
      });
  
      function sendMessage() {
        const input = inputField.value.trim();
        if (!input) return;
  
        appendMessage(input, "user");
        inputField.value = "";
  
        fetch("https://hhsdk-backend.onrender.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input, userId: "user123" }),
        })
          .then((res) => res.json())
          .then((data) => appendMessage(data.response, "bot"))
          .catch(() => appendMessage("Error sending message.", "bot"));
      }
  
      function appendMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }
  
    injectStyles();
    createChatbot();
  })();
  