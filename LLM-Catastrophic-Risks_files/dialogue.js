const messages = Array.from(document.querySelectorAll('.dialogue-message')).slice(1); // 除 System
const button = document.getElementById('dialogue-startBtn');

async function typeWriter(element, speed = 20) {
    const clone = element.cloneNode(true);
    const nodes = Array.from(clone.childNodes);
    element.innerHTML = '';

    for (const node of nodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            for (let i = 0; i < text.length; i++) {
                element.append(text[i]);
                await new Promise(r => setTimeout(r, speed));
            }
        } else {
            element.appendChild(node);
        }
    }
}

async function showMessages() {
    button.disabled = true;
    for (const message of messages) {
        message.style.display = 'block';
        await typeWriter(message, 15);
        window.scrollTo(0, document.body.scrollHeight); // ⬇️ 滚动到底部
        await new Promise(r => setTimeout(r, 300));
    }
    button.textContent = '结束';
}

button.addEventListener('click', showMessages);
