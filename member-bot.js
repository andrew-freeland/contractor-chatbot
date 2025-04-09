// member-bot.js — Legacy-compatible version for SquareSpace

var SHEET_LOOKUP_URL = "https://script.google.com/macros/s/AKfycbz_jH4VWi7Jl8JZZ6i8eQyGRcbP-8GsDC8gBkht9pyMW-2o0_GgOMcsCJBps_zE94Xk/exec";
var REQUEST_LOG_URL = "https://script.google.com/macros/s/AKfycbwcoBy4tinrFV6C0Yh6xxANFojcqs7879uxSVoQKRrVdlYDSFEL6gchjczx5Ob4x-23/exec";

function initMemberBot(companyName) {
  var chatBox = document.getElementById("chat-interface");
  if (!chatBox) return;
  chatBox.innerHTML = '' +
    '<h1>Welcome back, ' + companyName + '! What do you need help with today?</h1>' +
    '<div class="chat-buttons">' +
      "<button onclick=\"handleMemberOption('get-document')\">Get a document</button>" +
      "<button onclick=\"handleMemberOption('submit-request')\">Submit a request</button>" +
      "<button onclick=\"handleMemberOption('view-reminders')\">View my reminders</button>" +
    '</div>' +
    '<div id="member-chat"></div>';
}

function handleMemberOption(action) {
  var chatArea = document.getElementById("member-chat");
  chatArea.innerHTML = "";
  if (action === 'get-document') {
    chatArea.innerHTML = '' +
      '<p>What type of documents? And from what year(s)?</p>' +
      '<input id="docQuery" placeholder="e.g. license 2025" style="width: 100%; padding: 8px;" />' +
      '<button onclick="submitDocQuery()" style="margin-top: 8px; padding: 6px 12px;">Search</button>';
  } else if (action === 'submit-request') {
    chatArea.innerHTML = '' +
      '<p>Describe the service you need help with:</p>' +
      '<textarea id="requestText" style="width: 100%; padding: 8px;"></textarea>' +
      '<button onclick="submitServiceRequest()" style="margin-top: 8px; padding: 6px 12px;">Submit</button>';
  } else if (action === 'view-reminders') {
    chatArea.innerHTML = '<p>Reminder features are coming soon.</p>';
  }
}

function submitDocQuery() {
  var query = document.getElementById("docQuery").value;
  var chatArea = document.getElementById("member-chat");
  chatArea.innerHTML = "Looking up your documents...";

  fetch(SHEET_LOOKUP_URL + '?query=' + encodeURIComponent(query))
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (!data.files || data.files.length === 0) {
        chatArea.innerHTML = "Sorry, I couldn't find any documents matching that request.";
        return;
      }
      var confirmMsg = '<p>Are these documents what you are looking for?</p>';
      for (var i = 0; i < data.files.length; i++) {
        confirmMsg += '<div><a href="' + data.files[i].url + '" target="_blank">' + data.files[i].name + '</a></div>';
      }
      chatArea.innerHTML = confirmMsg;
    })
    .catch(function(err) {
      console.error("Doc lookup error:", err);
      chatArea.innerHTML = "Something went wrong fetching your documents.";
    });
}

function submitServiceRequest() {
  var text = document.getElementById("requestText").value;
  var chatArea = document.getElementById("member-chat");
  chatArea.innerHTML = "Submitting your request...";

  fetch(REQUEST_LOG_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ request: text })
  })
    .then(function(res) { return res.text(); })
    .then(function(response) {
      chatArea.innerHTML = "Thanks! Your request has been logged.";
    })
    .catch(function(err) {
      console.error("Request submission error:", err);
      chatArea.innerHTML = "Something went wrong submitting your request.";
    });
}
