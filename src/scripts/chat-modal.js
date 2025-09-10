class ChatModal {
    constructor(token) {
        this.token = token;
        this.isOpen = false;
        this.isTyping = false;
        this.messageQueue = [];
        this.createElements();
        this.initializeEventListeners();
    }

    createElements() {
        // 创建对话框结构
        const modalHTML = `
            <div class="chat-modal-overlay">
                <div class="chat-modal">
                    <div class="chat-header">
                        <div class="chat-avatar">花</div>
                        <div class="chat-title">
                            <h3>花桥小智</h3>
                            <p>您的智能助手</p>
                        </div>
                        <button class="chat-close">✕</button>
                    </div>
                    <div class="chat-messages"></div>
                    <div class="chat-input">
                        <div class="chat-input-wrapper">
                            <textarea 
                                placeholder="输入您的问题..."
                                rows="1"
                                onInput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'"
                            ></textarea>
                            <button class="send-button">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 2L11 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 添加到 body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // 保存元素引用
        this.overlay = document.querySelector('.chat-modal-overlay');
        this.modal = document.querySelector('.chat-modal');
        this.messagesContainer = document.querySelector('.chat-messages');
        this.input = document.querySelector('.chat-input textarea');
        this.sendButton = document.querySelector('.send-button');
        this.closeButton = document.querySelector('.chat-close');
    }

    initializeEventListeners() {
        // 打开对话框
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.cursor = 'pointer';
            heroImage.addEventListener('click', () => this.open());
        }

        // 关闭对话框
        this.closeButton.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // 发送消息
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 自动调整输入框高度
        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = this.input.scrollHeight + 'px';
        });
    }

    open() {
        this.isOpen = true;
        this.overlay.classList.add('active');
        this.modal.classList.add('active');
        this.input.focus();
        
        // 添加欢迎消息
        if (this.messagesContainer.children.length === 0) {
            this.addMessage('您好！我是花桥小智，很高兴为您服务。请问有什么我可以帮您的吗？（需要申请公司APIkey，当前不可用）', 'bot');
        }
    }

    close() {
        this.isOpen = false;
        this.overlay.classList.remove('active');
        this.modal.classList.remove('active');
    }

    addMessage(content, type = 'user') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        this.messagesContainer.appendChild(messageDiv);
        
        // 滚动到底部
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        
        return messageDiv;
    }

    showTyping() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.innerHTML = `
            <div class="typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        return typingDiv;
    }

    hideTyping(typingDiv) {
        this.isTyping = false;
        if (typingDiv && typingDiv.parentNode) {
            typingDiv.remove();
        }
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // 清空输入框
        this.input.value = '';
        this.input.style.height = 'auto';

        // 添加用户消息
        this.addMessage(message, 'user');

        // 显示输入中动画
        const typingDiv = this.showTyping();

        try {
            // 模拟API调用延迟
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // 隐藏输入中动画
            this.hideTyping(typingDiv);
            
            // 添加提示消息
            this.addMessage('抱歉，当前API服务不可用。需要申请公司APIkey才能使用对话功能。', 'bot');
        } catch (error) {
            console.error('发送消息失败:', error);
            this.hideTyping(typingDiv);
            this.addMessage('抱歉，发送消息失败，请稍后重试。', 'bot');
        }
    }
}

// 初始化对话框
document.addEventListener('DOMContentLoaded', () => {
    window.chatModal = new ChatModal('d26d4f48988d40ccb70fdda47753864f');
});
