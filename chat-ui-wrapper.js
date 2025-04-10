// chat-ui-wrapper.js — Adds floating chat icon, expand/collapse, and styling

function initChatWrapper() {
  // Create floating button
  var chatLauncher = document.createElement("div");
  chatLauncher.id = "chat-launcher";
  chatLauncher.style.position = "fixed";
  chatLauncher.style.bottom = "20px";
  chatLauncher.style.right = "20px";
  chatLauncher.style.zIndex = "9999";
  chatLauncher.style.width = "56px";
  chatLauncher.style.height = "56px";
  chatLauncher.style.background = "#EB760F";
  chatLauncher.style.borderRadius = "50%";
  chatLauncher.style.display = "flex";
  chatLauncher.style.alignItems = "center";
  chatLauncher.style.justifyContent = "center";
  chatLauncher.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  chatLauncher.style.cursor = "pointer";
  chatLauncher.title = "Chat with us";
  chatLauncher.innerHTML = "💬";
  document.body.appendChild(chatLauncher);

  // Create chat window container
  var chatFrame = document.createElement("div");
  chatFrame.id = "chat-interface";
  chatFrame.style.position = "fixed";
  chatFrame.style.bottom = "90px";
  chatFrame.style.right = "20px";
  chatFrame.style.zIndex = "9998";
  chatFrame.style.width = "360px";
  chatFrame.style.maxHeight = "80vh";
  chatFrame.style.background = "#fff";
  chatFrame.style.borderRadius = "16px";
  chatFrame.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
  chatFrame.style.padding = "20px";
  chatFrame.style.overflow = "auto";
  chatFrame.style.display = "none";
  chatFrame.style.fontFamily = "'Space Grotesk', sans-serif";
  document.body.appendChild(chatFrame);

  // Create close button
  var closeBtn = document.createElement("button");
  closeBtn.textContent = "✖";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "10px";
  closeBtn.style.border = "none";
  closeBtn.style.background = "transparent";
  closeBtn.style.fontSize = "16px";
  closeBtn.style.cursor = "pointer";
  closeBtn.title = "Minimize chat";
  closeBtn.onclick = function () {
    chatFrame.style.display = "none";
    chatLauncher.style.display = "flex";
  };
  chatFrame.appendChild(closeBtn);

  // Show bot when launcher is clicked
  chatLauncher.onclick = function () {
    chatFrame.style.display = "block";
    chatLauncher.style.display = "none";
    if (typeof initPublicBot === "function") initPublicBot();
  };
}

window.addEventListener("DOMContentLoaded", initChatWrapper);
