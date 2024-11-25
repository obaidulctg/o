const chatContainer = document.getElementById("chat-container");
const toggleBtn = document.getElementById("chat-toggle-btn");
const closeBtn = document.getElementById("close-btn");
const minimizeBtn = document.getElementById("minimize-btn");
const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Levenshtein Distance function to calculate similarity
function getLevenshteinDistance(a, b) {
    const tmp = [];
    let i, j, alen = a.length, blen = b.length, res;
    for (i = 0; i <= alen; i++) {
        tmp[i] = [i];
    }
    for (j = 0; j <= blen; j++) {
        tmp[0][j] = j;
    }
    for (i = 1; i <= alen; i++) {
        for (j = 1; j <= blen; j++) {
            res = a[i - 1] === b[j - 1] ? 0 : 1;
            tmp[i][j] = Math.min(tmp[i - 1][j] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j - 1] + res);
        }
    }
    return tmp[alen][blen];
}

// Fuzzy match function to find the closest match
function fuzzyMatch(query, responses) {
    let minDistance = Infinity;
    let bestMatch = "default"; // default fallback in case no close match is found

    // Iterate through all the predefined questions in responses
    for (let key in responses) {
        if (responses.hasOwnProperty(key)) {
            let distance = getLevenshteinDistance(query.toLowerCase(), key.toLowerCase());
            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = key;
            }
        }
    }

    return bestMatch;
}

// FAQ Responses object
const responses = {
  "hi":"Hello there! How could I help you?",
    "hello": "Hi there! How could I assist you?",
    "what is your name?": "I am your friendly FAQ chatbot.",
    "how does this work?": "Simply type your question and I will do my best to answer.",
    "bye": "Goodbye! Have a great day!",
    "what do you do?": "I am a web developer specializing in responsive and user-friendly websites.",
    "where are you located?": "I am based in Chattogram , Bangladesh.",
    "how can I contact you?": "You can contact me via email at mohammedobaidulhoquectg@gmail.com.",
    "do you work as a freelancer?": "Yes, I am available for freelance projects.",
    "what technologies do you work with?": "I work with HTML, CSS, JavaScript, React, and Node.js, Etc.",
    "how long have you been a developer?": "I have been working as a web developer for over two years.",
    "do you create mobile-friendly websites?": "Yes, all my websites are mobile-responsive.",
    "do you offer SEO services?": "Yes, I include basic SEO and advanced SEO as an add-on.",
    "can you improve my website?": "Absolutely! I specialize in redesigns and optimizations.",
    "what is your development process?": "My process includes planning, design, development, testing, and deployment.",
    "do you build e-commerce websites?": "Yes, I have experience with platforms like Shopify and custom solutions.",
    "what is your pricing model?": "Pricing depends on project scope. I offer both hourly and fixed rates.",
    "do you offer post-launch support?": "Yes, I provide maintenance and updates after launch.",
    "can you integrate APIs?": "Yes, I have experience integrating third-party APIs.",
    "what is your typical project turnaround time?": "It depends on the project but usually ranges from 2-8 weeks.",
    "do you work with startups?": "Yes, I enjoy working with startups to bring their ideas to life.",
    "can you train me to manage my website?": "Yes, I offer training for website management.",
    "do you use templates or create custom designs?": "I create custom designs tailored to your brand.",
    "do you work on small projects?": "Yes, I am happy to work on projects of any size.",
    "what is your educational background?": "I hold a degree in Computer Science and have certifications in web development.",
    "can you help with domain and hosting setup?": "Yes, I can assist with domain and hosting setup.",
    "do you work remotely?": "Yes, I work with clients globally and communicate online.",
    "what tools do you use for design?": "I use tools like Figma, Adobe XD, and Photoshop for design.",
    "do you offer a portfolio of your work?": "Yes, you can view my portfolio on this website.",
    "what are your working hours?": "I am usually available from 9 AM to 6 PM Dhaka (UTC+6).",
    "can you create animations for websites?": "Yes, I can create animations using CSS, JavaScript, and libraries like GSAP.",
    "do you offer custom web applications?": "Yes, I can develop custom web applications tailored to your needs.",
    "how do you ensure website security?": "I follow best practices for securing websites, including HTTPS, secure coding, and regular updates.",
    "do you build WordPress websites?": "Yes, I have experience building WordPress websites.",
    "can you optimize websites for speed?": "Yes, I ensure that all websites are optimized for fast loading times.",
    "do you provide documentation?": "Yes, I provide clear documentation for all projects.",
    "do you work with teams?": "Yes, I collaborate with teams and other developers if needed.",
    "can you build multilingual websites?": "Yes, I can create websites with multilingual support.",
    "do you offer graphic design services?": "Yes, I provide basic graphic design for web elements.",
    "do you provide analytics integration?": "Yes, I can integrate tools like Google Analytics for tracking.",
    "can you assist with branding?": "Yes, I offer basic branding services like logo design and color schemes.",
    "do you provide email setup?": "Yes, I can set up business emails for your domain.",
    "what if I don’t like the design?": "I will work with you to revise the design until you’re satisfied.",
    "do you offer discounts for nonprofits?": "Yes, I offer discounts for nonprofit organizations.",
    "can you work on urgent projects?": "Yes, I can take on urgent projects depending on availability.",
    "do you offer hosting services?": "I don’t offer hosting directly, but I can recommend reliable providers.",
    "how do you handle feedback?": "I value client feedback and make changes accordingly.",
    "what payment methods do you accept?": "I accept payments via PayPal, bank transfer, and other methods.",
    "default": "I'm sorry, I don't understand that. Please try a different question."
};

// Toggle chat visibility
toggleBtn.addEventListener("click", () => {
    chatContainer.classList.toggle("hidden");
});

// Close chat
closeBtn.addEventListener("click", () => {
    chatContainer.classList.add("hidden");
});

// Minimize chat
let isMinimized = false; // Track minimized state
minimizeBtn.addEventListener("click", () => {
    if (isMinimized) {
        // Expand chat
        chatContainer.style.height = "500px";
        chatBody.style.display = "block";
        isMinimized = false;
    } else {
        // Minimize chat
        chatContainer.style.height = "50px";
        chatBody.style.display = "none";
        isMinimized = true;
    }
});

// Display message
function displayMessage(message, sender = "bot") {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message", sender);

    const textElement = document.createElement("div");
    textElement.classList.add("text");
    textElement.textContent = message;

    messageContainer.appendChild(textElement);
    chatBody.appendChild(messageContainer);

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;
    return typingIndicator;
}

function hideTypingIndicator(typingIndicator) {
    if (typingIndicator) chatBody.removeChild(typingIndicator);
}

// Handle input
function handleInput() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    displayMessage(userMessage, "user");

    // Get the closest matching question from responses using fuzzy matching
    const matchedQuestion = fuzzyMatch(userMessage, responses);
    const botResponse = responses[matchedQuestion];

    const typingIndicator = showTypingIndicator();
    setTimeout(() => {
        hideTypingIndicator(typingIndicator);
        displayMessage(botResponse, "bot");
    }, 2000);

    userInput.value = "";
}

sendBtn.addEventListener("click", handleInput);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleInput();
});


