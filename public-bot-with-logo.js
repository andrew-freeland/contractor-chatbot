// public-bot-with-logo.js — Chatbot with logo placeholder + clean styling for SquareSpace

var OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

function initPublicBot() {
  var chatBox = document.getElementById("chat-interface");
  if (!chatBox) return;
  chatBox.innerHTML = '' +
    // Logo placeholder
    '<div style="text-align:center; margin-bottom:12px;">' +
      '<img src="https://via.placeholder.com/120x40?text=Logo" alt="Your Logo" style="max-width: 100%; height: auto;" />' +
    '</div>' +

    // Greeting
    '<h2 style="font-size: 18px; font-weight: bold; font-family: \"Archivo Black\", sans-serif; margin-bottom: 12px;">Hello! In a few words, how can we help you today?</h2>' +

    // Buttons
    '<div class="chat-buttons" style="margin-bottom: 12px;">' +
      "<button style='margin: 4px 0; padding: 6px 12px;' onclick=\"handleOption('services')\">Learn about our services</button>" +
      "<button style='margin: 4px 0; padding: 6px 12px;' onclick=\"handleOption('schedule')\">Schedule a call</button>" +
      "<button style='margin: 4px 0; padding: 6px 12px;' onclick=\"handleOption('login')\">Access account data</button>" +
    '</div>' +

    // Chat input and response area
    '<div id="freeform-chat" style="margin-top: 20px;">' +
      '<input id="freeInput" type="text" placeholder="Ask a question..." style="width: 100%; padding: 8px;" />' +
      '<button onclick="handlePublicMessage()" style="margin-top: 8px; padding: 8px 12px;">Send</button>' +
      '<div id="aiResponse" style="margin-top: 16px; font-style: italic;"></div>' +
    '</div>' +

    // Summary box
    '<div id="summaryBox" style="margin-top: 16px; display: none;">' +
      '<strong>The Short of It:</strong>' +
      '<div id="summaryContent" style="margin-top: 8px; background: #f0f0f0; padding: 10px; border-radius: 6px;"></div>' +
    '</div>';
}

function handleOption(action) {
  if (action === 'services') {
    document.getElementById("freeInput").value = "Can you tell me more about your services?";
    handlePublicMessage();
  } else if (action === 'schedule') {
    alert("We'll load your calendar here.");
  } else if (action === 'login') {
    window.location.href = "/login";
  }
}

function handlePublicMessage() {
  var userInput = document.getElementById("freeInput").value;
  var display = document.getElementById("aiResponse");
  var summaryBox = document.getElementById("summaryBox");
  var summaryContent = document.getElementById("summaryContent");
  display.textContent = "Thinking...";
  summaryBox.style.display = "none";
  summaryContent.textContent = "";

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI assistant that explains Contractor Solutions services and guides new visitors." },
        { role: "user", content: userInput }
      ]
    })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    var reply = data.choices[0].message.content;
    display.textContent = reply;

    return fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Summarize the following chat into a 1-2 sentence overview for a new client. Label it 'The Short of It:'" },
          { role: "user", content: reply }
        ]
      })
    });
  })
  .then(function(res) { return res.json(); })
  .then(function(summaryData) {
    var summary = summaryData.choices[0].message.content;
    summaryBox.style.display = "block";
    summaryContent.textContent = summary;
  })
  .catch(function(err) {
    console.error("OpenAI error:", err);
    display.textContent = "Sorry, I couldn't generate a reply right now.";
  });
}

initPublicBot();
