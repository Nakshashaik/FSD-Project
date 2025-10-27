const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotContainer = document.getElementById("chatbotContainer");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");


chatbotToggle.addEventListener("click", () => {
  chatbotContainer.classList.add("show");
  chatbotToggle.style.display = "none";
});

closeChat.addEventListener("click", () => {
  chatbotContainer.classList.remove("show");
  setTimeout(() => chatbotToggle.style.display = "block", 400);
});


function addMessage(text, type) {
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", type);

  const avatarUrl = type === "incoming" ? "assets/bot-avatar.jpg" : "assets/user-avatar.jpg";

  msgDiv.innerHTML = `
    ${type === "incoming" ? `<img src="${avatarUrl}" class="avatar">` : ""}
    <div class="msg-content">
      <p>${text}</p>
      <span class="time">${time}</span>
    </div>
    ${type === "outgoing" ? `<img src="${avatarUrl}" class="avatar">` : ""}
  `;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

const botReplies = {
  hello: "Hi there! 👋 How can I help you?",
  hi: "Hello! How are you doing today?",
  gnits: "GNITS is one of Hyderabad's top engineering colleges for women.",
  placements: "GNITS placements include companies like Amazon, Infosys, TCS, and Deloitte.",
  courses: "We offer B.Tech programs in CSE, ECE, IT, and EEE.",
  faculty: "GNITS has experienced faculty dedicated to excellence in education.",
  default: "I'm not sure about that 🤔. Try asking about GNITS, courses, or placements!"
};

function botResponse(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  let reply = botReplies.default;
  for (let key in botReplies) {
    if (lowerMsg.includes(key)) {
      reply = botReplies[key];
      break;
    }
  }
  setTimeout(() => addMessage(reply, "incoming"), 700);
}


sendBtn.addEventListener("click", () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addMessage(msg, "outgoing");
  chatInput.value = "";
  botResponse(msg);
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
