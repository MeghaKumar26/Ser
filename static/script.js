// Array of motivational quotes
const quotes = [
    "Keep calm and carry on.",
    "This too shall pass.",
    "Every moment is a fresh beginning.",
    "Believe you can and you're halfway there.",
    "Happiness is a direction, not a place."
];

// Display a random quote
const quoteElement = document.getElementById("quote");
quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];

// Send message function
function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    const chatBox = document.getElementById("chat-box");

    if (!userInput) return;

    // Add user message to chat box
    const userMessage = `<div class="message user">${userInput}</div>`;
    chatBox.innerHTML += userMessage;

    // Clear input field
    document.getElementById("user-input").value = "";

    // Send user message to the backend
    fetch("/get-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
        .then(response => response.json())
        .then(data => {
            // Add bot response to chat box
            const botMessage = `<div class="message bot">${data.response}</div>`;
            chatBox.innerHTML += botMessage;

            // Scroll to the bottom of the chat box
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            const errorMessage = `<div class="message bot">Error: Could not get a response.</div>`;
            chatBox.innerHTML += errorMessage;
        });
}

// Handle Enter key press
function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
