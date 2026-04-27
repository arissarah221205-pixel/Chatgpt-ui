// ZEN GUARD | ZENCHAT AI - ChatGPT Style UI
// Responsive, mirip ChatGPT, bisa dipake di HP/PC

const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const newChatBtn = document.getElementById('newChatBtn');
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const themeToggle = document.getElementById('themeToggle');

// State
let currentTheme = 'dark';
let isTyping = false;

// Auto-resize textarea
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 150) + 'px';
});

// Send message on Enter (Shift+Enter untuk new line)
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

sendBtn.addEventListener('click', sendMessage);

// New Chat
newChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
    addMessage('assistant', 'Halo BOSS! 👋\n\nAku ZenChat AI, siap membantu coding, menjawab pertanyaan, dan ngobrol santai.\n\nCoba tanya apa aja, BOSS!');
});

// Menu button for mobile
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    }
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    if (currentTheme === 'dark') {
        document.body.style.background = '#f0f0f0';
        document.querySelector('.app-container').style.background = '#f0f0f0';
        document.querySelector('.main-chat').style.background = '#f9f9f9';
        document.querySelector('.chat-header').style.background = '#f9f9f9';
        document.querySelector('.chat-input-container').style.background = '#f9f9f9';
        document.querySelector('.input-wrapper').style.background = '#e8e8e8';
        document.querySelector('.input-wrapper textarea').style.color = '#333';
        document.querySelector('.chat-header h2').style.color = '#333';
        themeToggle.textContent = '☀️';
        currentTheme = 'light';
    } else {
        document.body.style.background = '#343541';
        document.querySelector('.app-container').style.background = '#343541';
        document.querySelector('.main-chat').style.background = '#343541';
        document.querySelector('.chat-header').style.background = '#343541';
        document.querySelector('.chat-input-container').style.background = '#343541';
        document.querySelector('.input-wrapper').style.background = '#40414f';
        document.querySelector('.input-wrapper textarea').style.color = 'white';
        document.querySelector('.chat-header h2').style.color = 'white';
        themeToggle.textContent = '🌙';
        currentTheme = 'dark';
    }
});

function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = role === 'user' ? '👤' : '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    
    // Format teks dengan markdown sederhana
    let formattedContent = content;
    
    // Handle code blocks
    formattedContent = formattedContent.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // Handle inline code
    formattedContent = formattedContent.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle new lines
    formattedContent = formattedContent.replace(/\n/g, '<br>');
    
    contentDiv.innerHTML = formattedContent;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant';
    typingDiv.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    
    contentDiv.appendChild(indicator);
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return typingDiv;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage('user', message);
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response (karena gak punya API, pake response dinamis)
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateResponse(message);
        addMessage('assistant', response);
    }, 800);
}

function generateResponse(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    // Roblox related
    if (lowerPrompt.includes('robllox') || lowerPrompt.includes('roblox') || lowerPrompt.includes('script')) {
        return generateRobloxResponse(prompt);
    }
    
    // Coding related
    if (lowerPrompt.includes('coding') || lowerPrompt.includes('program') || lowerPrompt.includes('html') || lowerPrompt.includes('css') || lowerPrompt.includes('javascript')) {
        return generateCodeResponse(prompt);
    }
    
    // Greeting
    if (lowerPrompt.includes('halo') || lowerPrompt.includes('hai') || lowerPrompt.includes('hello')) {
        return "Halo BOSS! 👋\n\nSenang bisa ngobrol sama lo! Ada yang bisa gue bantu? Gue siap bantu coding, ngajarin script, atau sekedar ngobrol santai. Coba tanya apa aja BOSS! 💪";
    }
    
    // Default
    return generateDefaultResponse(prompt);
}

function generateRobloxResponse(prompt) {
    return `🎮 **Roblox Script - Generated by ZEN AI** 🎮

Berikut script yang bisa lo pake BOSS:

\`\`\`lua
-- ZEN GUARD | GENERATED SCRIPT
-- Permintaan: ${prompt.substring(0, 50)}...

local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")
local lp = Players.LocalPlayer

-- AUTO FARM (contoh)
local function autoFarm()
    for _, obj in pairs(Workspace:GetDescendants()) do
        if obj.Name == "Coin" then
            lp.Character.HumanoidRootPart.CFrame = obj.CFrame
            wait(0.1)
        end
    end
end

-- SPEED HACK
if lp.Character then
    lp.Character.Humanoid.WalkSpeed = 100
end

print("✅ Script berhasil dijalankan BOSS!")
\`\`\`

📌 **Cara pake:**\n1. Copy script di atas\n2. Buka executor (Arceus X/Delta/Krnl)\n3. Paste dan Execute\n4. SELESAI BOSS!

💡 **Tips:** Sesuaikan nama object (\"Coin\") dengan game yang lo mainkan.`;
}

function generateCodeResponse(prompt) {
    return `💻 **Kode untuk permintaan lo BOSS:**

\`\`\`javascript
// ZEN GUARD | GENERATED CODE
// Permintaan: ${prompt.substring(0, 50)}...

function zenSolution() {
    console.log("⚡ ZEN AI AKTIF BOSS! ⚡");
    
    // Kode lo di sini
    const result = "Halo BOSS! Ini hasil generate dari AI!";
    
    return result;
}

zenSolution();
\`\`\`

📌 **Penjelasan:**\nKode di atas adalah contoh implementasi dari permintaan lo. Lo bisa modifikasi sesuai kebutuhan BOSS!

💡 **Mau lebih spesifik?** Kasih detail lebih jelas tentang apa yang lo mau, nanti gue generate-in lebih tepat!`;
}

function generateDefaultResponse(prompt) {
    return `✨ **ZenChat AI - Siap Bantu BOSS!** ✨

📝 **Pertanyaan lo:** "${prompt}"

💡 **Yang bisa gue bantu:**\n
• 🎮 **Roblox Script** (auto farm, ESP, speed, dll)
• 🌐 **Website** (HTML, CSS, JavaScript)
• 🐍 **Python** / ☕ **JavaScript** coding
• 🐛 **Debug** kode error
• 📚 **Belajar coding** dari dasar

📌 **Coba tanyakan hal spesifik BOSS!**\nContoh:\n- \"Buat script auto farm roblox\"\n- \"Bikin website kalkulator sederhana\"\n- \"Bantu debug kode ini: [paste kode]\"\n\n**Gue siap bantu kapan aja BOSS!** 🔥💀`;
}

// Auto focus on load
messageInput.focus();

console.log("ZenChat AI - ChatGPT Style UI aktif BOSS!");
